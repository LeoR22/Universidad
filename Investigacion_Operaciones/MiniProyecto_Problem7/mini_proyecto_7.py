# Importar librerias requeridas ejecutar el siguientes comandos: 
# 1. crear variable de entorno: python -m venv venv 
# 2. activar variales de entorno:  venv\Scripts\activate  
# 3. Instalar librerias automaticamente: pip install -r requirements.txt 
# 4. ejecutar proyecto en terminal: python3 mini_proyecto_7.py
import gurobipy as gp
from gurobipy import GRB
import pandas as pd
from datetime import datetime

# Cargar los datos
df_current_plan = pd.read_csv('https://raw.githubusercontent.com/Gurobi/modeling-examples/master/aviation_planning/data/flight_rotations_2006-07-01.csv')
df_starting_positions = pd.read_csv('https://raw.githubusercontent.com/Gurobi/modeling-examples/master/aviation_planning/data/starting_positions.csv')
df_ending_positions = pd.read_csv('https://raw.githubusercontent.com/Gurobi/modeling-examples/master/aviation_planning/data/ending_positions.csv')
df_itineraries = pd.read_csv('https://raw.githubusercontent.com/Gurobi/modeling-examples/master/aviation_planning/data/flight_iterinaries.csv')
             
# Procesar los datos
df_current_plan['start_time'] = pd.to_datetime(df_current_plan['start_time'], format='%H:%M').dt.time
df_current_plan['end_time'] = pd.to_datetime(df_current_plan['end_time'], format='%H:%M').dt.time
df_itineraries['total_cost'] = df_itineraries['cost'] * df_itineraries['n_pass']
flight_revenue = df_itineraries.groupby('flight')['total_cost'].sum().to_dict()
flight_origin = df_current_plan.set_index('flight')['ori'].to_dict()
flight_dest = df_current_plan.set_index('flight')['des'].to_dict()
flight_start_time = df_current_plan.set_index('flight')['start_time'].to_dict()
flight_end_time = df_current_plan.set_index('flight')['end_time'].to_dict()
aircrafts_startpositions = df_starting_positions.set_index('aircraft')['airport'].to_dict()
aircrafts_endpositions = df_ending_positions.set_index('aircraft')['airport'].to_dict()

# Crear conjutos de datos
F = df_current_plan['flight'].tolist()
A = df_starting_positions['aircraft'].tolist()
N = list(set(df_current_plan['ori']).union(set(df_current_plan['des'])))
F_a = {a: df_current_plan[df_current_plan['aircraft'] == a]['flight'].tolist() for a in A}

# Crear transiciones factibles (E_a)
E_a = {a: [] for a in A}
for a in A:
    for f1 in F_a[a]:
        for f2 in F_a[a]:
            if flight_dest[f1] == flight_origin[f2]:
                t1 = datetime.strptime(str(flight_end_time[f1]), '%H:%M:%S')
                t2 = datetime.strptime(str(flight_start_time[f2]), '%H:%M:%S')
                if t1 < t2:
                    E_a[a].append((f1, f2))

# Capacidades de aeropuertos (valores de ejemplo; reemplazar con datos reales si están disponibles)
# llegadas maximas
C_arr = {i: 100 for i in N} 
# llegadas minimas 
C_dep = {i: 100 for i in N}  
# Nivel de interrupción del 50%
alpha = 0.5  

# Creación del modelo
model = gp.Model("airline_disruption")

# Variables de Decision 
x = model.addVars(F, vtype=GRB.BINARY, name="x")
y = model.addVars([(a, f1, f2) for a in A for (f1, f2) in E_a[a]], vtype=GRB.BINARY, name="y")
z = model.addVars([(a, f) for a in A for f in F_a[a]], vtype=GRB.BINARY, name="z")

# Minimizar la pérdida de ingresos
model.setObjective(gp.quicksum(flight_revenue[f] * (1 - x[f]) for f in F), GRB.MINIMIZE)

# Restricciones
# 1. Asignación de vuelos
for f in F:
    model.addConstr(gp.quicksum(z[a, f] for a in A if f in F_a[a]) == x[f], name=f"assign_{f}")

# 2. Conservación de flujo
for a in A:
    # Restricción de origen
    for f1 in F_a[a]:
        if flight_origin[f1] == aircrafts_startpositions[a]:
            model.addConstr(
                gp.quicksum(y[a, f1, f2] for f2 in F_a[a] if (f1, f2) in E_a[a]) == 1,
                name=f"source_{a}_{f1}"
            )
    # Flujo intermedio
    for f2 in F_a[a]:
        model.addConstr(
            gp.quicksum(y[a, f1, f2] for f1 in F_a[a] if (f1, f2) in E_a[a]) ==
            gp.quicksum(y[a, f2, f3] for f3 in F_a[a] if (f2, f3) in E_a[a]),
            name=f"flow_{a}_{f2}"
        )
    # Restricción de destino
    for f2 in F_a[a]:
        if flight_dest[f2] == aircrafts_endpositions[a]:
            model.addConstr(
                gp.quicksum(y[a, f1, f2] for f1 in F_a[a] if (f1, f2) in E_a[a]) == 1,
                name=f"sink_{a}_{f2}"
            )

# 3. Relación entre operación de vuelos y asignación de aeronaves
for a in A:
    for f in F_a[a]:
        model.addConstr(
            z[a, f] >= gp.quicksum(y[a, f1, f] for f1 in F_a[a] if (f1, f) in E_a[a]),
            name=f"link1_{a}_{f}"
        )
        model.addConstr(
            z[a, f] >= gp.quicksum(y[a, f, f2] for f2 in F_a[a] if (f, f2) in E_a[a]),
            name=f"link2_{a}_{f}"
        )

# 4. Restricciones de capacidad de aeropuertos
for i in N:
    model.addConstr(
        gp.quicksum(x[f] for f in F if flight_dest[f] == i) <= alpha * C_arr[i],
        name=f"arr_{i}"
    )
    model.addConstr(
        gp.quicksum(x[f] for f in F if flight_origin[f] == i) <= alpha * C_dep[i],
        name=f"dep_{i}"
    )

# Optimizar
model.optimize()

# Imprimir resultados
if model.status == GRB.OPTIMAL:
    print("Optimal solution found")
    print(f"Total revenue loss: ${model.objVal:.2f}")
    print("\nFlights to operate:")
    for f in F:
        if x[f].x > 0.5:
            print(f"Flight {f}: Operate (Origin: {flight_origin[f]}, Destination: {flight_dest[f]})")
    print("\nAircraft routes:")
    for a in A:
        print(f"Aircraft {a}:")
        route = []
        for f1, f2 in E_a[a]:
            if y[a, f1, f2].x > 0.5:
                route.append((f1, f2))
        if route:
            print("  Route:", " -> ".join([f"Flight {f1} to Flight {f2}" for f1, f2 in route]))
        else:
            print("  No route assigned")
else:
    print("No optimal solution found. Status:", model.status)

# # Guardar modelo para depuración
model.write("airline_disruption.lp")