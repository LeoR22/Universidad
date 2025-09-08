# Importar librerias requeridas ejecutar el siguientes comandos: 
# 1. crear variable de entorno: python -m venv venv 
# 2. activar variales de entorno:  venv\Scripts\activate  
# 3. Instalar librerias automaticamente: pip install -r requirements.txt 
# 4. ejecutar proyecto en terminal: python3 mini_proyecto_7_pulp.py
import pulp
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

# Asegurar que los identificadores de vuelos sean del mismo tipo (convertir a entero)
df_current_plan['flight'] = df_current_plan['flight'].astype(int)
df_itineraries['flight'] = df_itineraries['flight'].astype(int)

# Reducir el conjunto de datos: seleccionar los 10 aeropuertos principales
n_airports = 10
airport_counts = pd.concat([df_current_plan['ori'], df_current_plan['des']]).value_counts()
top_airports = airport_counts.head(n_airports).index.tolist()
df_current_plan = df_current_plan[df_current_plan['ori'].isin(top_airports) & df_current_plan['des'].isin(top_airports)]

# Crear diccionario de ingresos por vuelo
flight_revenue = df_itineraries.groupby('flight')['total_cost'].sum().to_dict()
flight_origin = df_current_plan.set_index('flight')['ori'].to_dict()
flight_dest = df_current_plan.set_index('flight')['des'].to_dict()
flight_start_time = df_current_plan.set_index('flight')['start_time'].to_dict()
flight_end_time = df_current_plan.set_index('flight')['end_time'].to_dict()
aircrafts_startpositions = df_starting_positions.set_index('aircraft')['airport'].to_dict()
aircrafts_endpositions = df_ending_positions.set_index('aircraft')['airport'].to_dict()

# Crear conjuntos de datos
F = df_current_plan['flight'].tolist()
A = df_starting_positions['aircraft'].tolist()
N = list(set(df_current_plan['ori']).union(set(df_current_plan['des'])))
F_a = {a: df_current_plan[df_current_plan['aircraft'] == a]['flight'].tolist() for a in A}

# Filtrar aeronaves para incluir solo aquellas con vuelos en el conjunto reducido
A = [a for a in A if F_a[a]]

# Verificar factibilidad de las rutas de las aeronaves
for a in A:
    start = aircrafts_startpositions[a]
    end = aircrafts_endpositions[a]
    if start not in top_airports or end not in top_airports:
        print(f"Advertencia: Aeronave {a} no tiene rutas factibles (inicio: {start}, fin: {end})")
    elif not any(flight_origin[f] == start for f in F_a[a]) or not any(flight_dest[f] == end for f in F_a[a]):
        print(f"Advertencia: Aeronave {a} no tiene vuelos que conecten {start} con {end}")

# Verificar vuelos que no tienen ingresos definidos
missing_flights = [f for f in F if f not in flight_revenue]
if missing_flights:
    print(f"Advertencia: Los siguientes vuelos no tienen ingresos definidos: {missing_flights}")
    print("Asignando ingresos de 0 a estos vuelos.")
    for f in missing_flights:
        flight_revenue[f] = 0

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

# Capacidades de aeropuertos (aumentadas para evitar infactibilidad)
C_arr = {i: 200 for i in N}
C_dep = {i: 200 for i in N}
alpha = 0.5

# Creación del modelo
model = pulp.LpProblem("airline_disruption", pulp.LpMinimize)

# Variables de decisión
x = pulp.LpVariable.dicts("x", F, cat='Binary')
y = pulp.LpVariable.dicts("y", [(a, f1, f2) for a in A for (f1, f2) in E_a[a]], cat='Binary')
z = pulp.LpVariable.dicts("z", [(a, f) for a in A for f in F_a[a]], cat='Binary')

# Minimizar la pérdida de ingresos
model += pulp.lpSum(flight_revenue[f] * (1 - x[f]) for f in F)

# Restricciones
# 1. Asignación de vuelos
for f in F:
    model += pulp.lpSum(z[a, f] for a in A if f in F_a[a]) == x[f], f"assign_{f}"

# 2. Conservación de flujo (relajada para permitir rutas vacías)
for a in A:
    start_flights = [f for f in F_a[a] if flight_origin[f] == aircrafts_startpositions[a]]
    end_flights = [f for f in F_a[a] if flight_dest[f] == aircrafts_endpositions[a]]
    if start_flights:  # Solo agregar restricciones si hay vuelos desde el origen
        model += pulp.lpSum(y[a, f1, f2] for f1 in start_flights for f2 in F_a[a] if (f1, f2) in E_a[a]) <= 1, f"source_{a}"
    if end_flights:  # Solo agregar restricciones si hay vuelos al destino
        model += pulp.lpSum(y[a, f1, f2] for f2 in end_flights for f1 in F_a[a] if (f1, f2) in E_a[a]) <= 1, f"sink_{a}"
    for f2 in F_a[a]:
        model += pulp.lpSum(y[a, f1, f2] for f1 in F_a[a] if (f1, f2) in E_a[a]) == \
                 pulp.lpSum(y[a, f2, f3] for f3 in F_a[a] if (f2, f3) in E_a[a]), f"flow_{a}_{f2}"

# 3. Relación entre operación de vuelos y asignación de aeronaves
for a in A:
    for f in F_a[a]:
        model += z[a, f] >= pulp.lpSum(y[a, f1, f] for f1 in F_a[a] if (f1, f) in E_a[a]), f"link1_{a}_{f}"
        model += z[a, f] >= pulp.lpSum(y[a, f, f2] for f2 in F_a[a] if (f, f2) in E_a[a]), f"link2_{a}_{f}"

# 4. Restricciones de capacidad de aeropuertos
for i in N:
    model += pulp.lpSum(x[f] for f in F if flight_dest[f] == i) <= alpha * C_arr[i], f"arr_{i}"
    model += pulp.lpSum(x[f] for f in F if flight_origin[f] == i) <= alpha * C_dep[i], f"dep_{i}"

# Optimizar
model.solve()

# Imprimir resultados
if pulp.LpStatus[model.status] == 'Optimal':
    print("Solución óptima encontrada")
    print(f"Pérdida total de ingresos: ${pulp.value(model.objective):.2f}")
    print("\nVuelos a operar:")
    for f in F:
        if x[f].value() > 0.5:
            print(f"Vuelo {f}: Operar (Origen: {flight_origin[f]}, Destino: {flight_dest[f]})")
    print("\nRutas de aeronaves:")
    for a in A:
        print(f"Aeronave {a}:")
        route = []
        for f1, f2 in E_a[a]:
            if y[a, f1, f2].value() > 0.5:
                route.append((f1, f2))
        if route:
            print("  Ruta:", " -> ".join([f"Vuelo {f1} a Vuelo {f2}" for f1, f2 in route]))
        else:
            print("  Sin ruta asignada")
else:
    print("No se encontró una solución óptima. Estado:", pulp.LpStatus[model.status])

# Guardar modelo para depuración
model.writeLP("airline_disruption_pulp.lp")