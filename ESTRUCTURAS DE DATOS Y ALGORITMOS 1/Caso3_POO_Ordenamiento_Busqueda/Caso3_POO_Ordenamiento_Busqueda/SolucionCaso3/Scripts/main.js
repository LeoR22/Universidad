/*
*  archivo main.js
*  Creado por: Orlando Arboleda Molina
*  Fecha: 12-Abril-2024
*
*  Descripción: 
*  Aplicativo para el almacenamiento, ordenamiento y busqueda de Vehiculos, 
*  para el curso de EDyA1 en la Universidad Autónoma de Occidente
*/

import {Soat} from './Soat.js';
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
            bdVehiculos.forEach( x => {res+= `${x.toString()} \n Estado: ${x.obtenerEstadoEsperado()}\n\n`} )  
            txtA_Respuesta.textContent = res; 
            break;
        case "OrdenarModelo":
            if (!ordenadoModelo){
                // realiza ordenamiento usando el Modelo u ordena_Modelo
                
                ordenadoModelo = true;
            }   

            // despliega reporte
            res = 'Los vehiculos son:\n'
            bdVehiculos.forEach( x => {res+= `${x.toString()} \n Estado: ${x.obtenerEstadoEsperado()}\n\n`} )  
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
                res = `No existe el vehiculo ${placaBuscada}`;                
            }else{
                res = `${posicion}.  ${bdVehiculos[posicion].toString()} \n Estado:${bdVehiculos[posicion].obtenerEstadoEsperado()}`; 
            }
  
            txtA_Respuesta.textContent = res
    }
}
