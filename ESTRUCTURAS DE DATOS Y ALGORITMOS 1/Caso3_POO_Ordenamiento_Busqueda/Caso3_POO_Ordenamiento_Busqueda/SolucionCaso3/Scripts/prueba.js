<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--ajustar para invocar los archivos default.css e index.js-->
    <link rel="stylesheet" href="styles/default.css">
    <script type="module" src="scripts/main.js" ></script>
    <title>Caso 3 - UAO</title>
</head>
<body>
    <header>
        <img src="Images/Logo-50-años.png" alt="Logo 50 años">        
        <h1>Caso3 - POO, Ordenamiento y Busqueda</h1>
    </header>
    <main>
        <section>
            <p>Aplicativo para el ingreso de vehiculos de forma masiva, los cuales pueden ser Vehiculos Publicos con formato: 1 Empresa Placa Modelo SOAT o Vehiculos Particulares con formato: 2 Propietario Placa Modelo SOAT</p>
            <textarea id="laEntrada">1 Recreativo CBD156 2010 1234 MAFRE 1200000;2 Juan TAB291 2015 4254 SURA 900000;1 Papagayo FDA647 2019 9872 SURA 900000;2 Miriam DAC064 2021 7209 MAFRE 750000;1 Mio BPX870 2021 4903 MAFRE 2500000</textarea>
            <p>Los datos suministrados fueron</p>
            <textarea id="laRespuesta" readonly></textarea><br>
            <select id="laOpcion">
                <option value="IngresarOrdenar" selected>Ingresar-OrdenarPlaca</option><!-- Opción por defecto -->
                <option value="OrdenarModelo">Ordenar por Modelo</option>
                <option value="BuscarPlaca">Buscar por Placa</option> 
            </select> 
            <button id="procesar">Ejecutar funcionalidad</button>   
        </section>
    </main>
    <footer>
        <hr>
        <p>Creado por el profesor Orlando Arboleda Molina, para el curso de EDyA1 en el Universidad Autónoma de Occidente</p>
    </footer>
</body>
</html>--busqueda.js:function busquedaBinaria_por_Placa(A, p, q, r)
{
    let posicion = -1;
    if (p <= q)
    {
        // adicionar la lógica necesaria. No olvidar que m debe ser entero
        let m = Math.trunc((p+q)/2);

    }
    return posicion;
}   

export {busquedaBinaria_por_Placa};--main.js:import {Soat} from './Soat.js';
// incluir imports de VehiculoPublico y VehiculoParticular
import {VehiculoPublico} from './VehiculoPublico.js';
import {VehiculoParticular} from './VehiculoParticular.js';
import {quickSort_por_Placa, quickSort_por_Modelo, ordena_Placa, ordena_Modelo} from "./ordenamientos.js";
import {busquedaBinaria_por_Placa} from "./busqueda.js";

/* 
    obtiene referencias al boton y area de texto donde se va a desplegar la salida.
*/
const btnFuncionalidad = document.getElementById("procesar");
const txtA_Respuesta = document.getElementById("laRespuesta");

/*
let bdVehiculos = [
    new VehiculoParticular('Carlos Diaz','PQR 345', 2018, new Soat(345, 'MAFRE', 800000)),
    new VehiculoPublico('Recreativo','LMN 890', 2022, new Soat(890, 'SURA', 1200000)),
    new VehiculoParticular('Marina Hoyos','BCD 567', 2015, new Soat(567, 'ALLIANZ', 1400000)),
    new VehiculoPublico('MIO','FGH 234', 2021, new Soat(345, 'SOLIDARIA', 900000)),
    new VehiculoParticular('Juan Piña','STU 789', 2016, new Soat(789, 'SURA', 1500000)),
    new VehiculoPublico('Transur','PQR 901', 2018, new Soat(901, 'ALLIANZ', 950000))
];*/
let bdVehiculos = []

let ordenadoPlaca = false;
let ordenadoModelo = false;

/*
    addEventListener a btnFuncionalidad para que cuando se de un click se
    se ejecute la función procesarFuncionalidad 
*/
btnFuncionalidad.addEventListener('click',procesarFuncionalidad)


/*
    funcion procesarFuncionalidad
    permite ingresar datos, listar,ordenar y buscar
*/ 
function procesarFuncionalidad(){ 
    const opcion = document.getElementById("laOpcion").value;
    let res;
    switch (opcion){
        case "IngresarOrdenar":
            let cadEntrada = document.getElementById("laEntrada").value;
            let losDatos = cadEntrada.split(';')

            let laPlaca
            let elModelo
            let laEmpresa
            let elPropietario
            let elNumero
            let laAseguradora
            let elValor

            for (let dato of losDatos){
                let elVehiculo = dato.split(' ')

                laPlaca = elVehiculo[2]
                elModelo = parseInt(elVehiculo[3])
                elNumero = parseInt(elVehiculo[4])
                laAseguradora = elVehiculo[5]
                elValor = parseFloat(elVehiculo[6])
                // crear 
                let suSoat= new Soat(elNumero,laAseguradora,elValor);
                if (elVehiculo[0]=='1')
                {
                    laEmpresa = elVehiculo[1]
                    // crea nuevo vehiculo publico y lo almacena en bdVehiculos
                    
                }else
                {
                    elPropietario = elVehiculo[1]
                    // crea nuevo vehiculo particular y lo almacena en bdVehiculos
                    
                }
            }

            // realiza ordenamiento usando el quickSort_por_Placa u ordena_Placa
            

            ordenadoPlaca = true;
            ordenadoModelo = false;   

            // despliega reporte
            res = 'Los vehiculos son:\n'
            bdVehiculos.forEach( x => {res+= ${x.toString()} \n Estado: ${x.obtenerEstadoEsperado()}\n\n} )  
            txtA_Respuesta.textContent = res; 
            break;
        case "OrdenarModelo":
            if (!ordenadoModelo){
                // realiza ordenamiento usando el Modelo u ordena_Modelo
                
                ordenadoModelo = true;
            }   

            // despliega reporte
            res = 'Los vehiculos son:\n'
            bdVehiculos.forEach( x => {res+= ${x.toString()} \n Estado: ${x.obtenerEstadoEsperado()}\n\n} )  
            txtA_Respuesta.textContent = res;     
            break;   
        default:  // buscar por placa
            console.log(bdVehiculos)
            if (!ordenadoPlaca){
                // realiza ordenamiento usando el quickSort_por_Placa u ordena_Placa
                
                ordenadoPlaca = true;
            } 

            console.log(bdVehiculos)
            let placaBuscada = prompt('Digite la placa a buscar')
            /* 
                Invocar al método de busqueda binaria por placa y asignar en la variable res:
                . No existe el vehiculo <placa>  - cuando NO se encuentra.
                . cadena con el siguiente formato - cuando SI lo encuentra
                  <posicion>. <toString del vehiculo> Estado:<obtenerEstadoEsperado del vehiculo>
            */
            let posicion = 0
            if (posicion == -1){
                res = No existe el vehiculo ${placaBuscada};                
            }else{
                res = ${posicion}.  ${bdVehiculos[posicion].toString()} \n Estado:${bdVehiculos[posicion].obtenerEstadoEsperado()}; 
            }
  
            txtA_Respuesta.textContent = res
    }
} --ordenamientos.js:function particion_por_Placa(A, p, r){
    let x = A[r];
    let i = p-1;
    let aux;

    for (let j = p; j <= r-1; j++)
    {
        // Completar la lógica basada en el algoritmo visto.
        // las Strings se pueden comparar con localeCompare o el operdaor relacional


    }
    // completar la lógica basada en el algoritmo visto
    aux = A[i+1];
    A[i+1] = A[r];
    A[r] = aux;

    return i+1;
}

/*
   método quicksort por placa
   los parametros son A que es la secuencia; p y r que son las posiciones
*/
function quickSort_por_Placa(A, p, r){
    if (p < r)
    {
        // completar invocaciones del algoritmo visto
        let q = 0

    }
}


/*
   funcion auxiliar para el método quicksort por modelo
   los parametros son A que es la secuencia; p y r que son las posiciones
*/
function particion_por_Modelo(A, p, r){
    let x = A[r];
    let i = p-1;
    let aux;

    for (let j = p; j <= r-1; j++)
    {
        // Completar la lógica basada en el algoritmo visto.

    }
    // completar la lógica basada en el algoritmo visto
    aux = A[i+1];
    A[i+1] = A[r];
    A[r] = aux;

    return i+1;
}

/*
   método quicksort por modelo
   los parametros son A que es la secuencia; p y r que son las posiciones
*/
function quickSort_por_Modelo(A, p, r){
    if (p < r)
    {
        // completar invocaciones del algoritmo visto
        let q = 0

    }
} 

/*
   ordenamiento por placa, usando el método sort
*/
function ordena_Placa(A){
    
} 

/*
   ordenamiento por modelo, usando el método sort
*/
function ordena_Modelo(A){
    
} 



export {quickSort_por_Placa, quickSort_por_Modelo, ordena_Placa, ordena_Modelo};--soat.js:
export class Soat {
    constructor(numero, aseguradora, valor) {
        this.numero = numero;
        this.aseguradora = aseguradora;
        this.valor = valor;
    }  

    toString() {
        return "Numero:" + this.numero +
            "  Aseguradora:" + this.aseguradora+
            "  Valor:" + this.valor;
    }    
}
 --vehiculo.js:
export class Vehiculo {
    constructor(placa, modelo, soat) {
        this.placa = placa;
        this.modelo = modelo;
        this.suSoat = soat;
    }  

    // implementar método
    obtenerEstadoEsperado() {
        let res = "MODERNO";

        return res;
    }

    toString() {
        return "Placa:" + this.placa + "  Modelo:" + this.modelo +
            "\n Soat:" + this.suSoat.toString();
    }    
} ---vehiculoparticular.js:
import {Vehiculo} from './Vehiculo.js';

export class VehiculoParticular extends Vehiculo {
    constructor(propietario, placa, modelo, suSoat) {
        super(placa, modelo, suSoat);
        this.propietario = propietario;
    }  

    toString() {
        return "Propietario:" + this.propietario + "  " + super.toString();
    }    
}---vehiculopublico.js:
import {Vehiculo} from './Vehiculo.js';

export class VehiculoPublico extends Vehiculo {
    constructor(empresa, placa, modelo, suSoat) {
        super(placa, modelo, suSoat);
        this.empresa = empresa;
    }  

    // implementar método
    obtenerAñoRenovacion() {
        return 0;
    }

    toString() {
        return "Empresa:" + this.empresa + "  " + super.toString();
    }    
}