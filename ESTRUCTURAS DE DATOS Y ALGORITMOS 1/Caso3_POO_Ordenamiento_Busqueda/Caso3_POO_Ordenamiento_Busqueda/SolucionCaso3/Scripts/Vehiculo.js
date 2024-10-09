/*
*  Clase Vehiculo
*  Creado por: Orlando Arboleda Molina
*  Fecha: 12-Abril-2024
*
*  Descripción: 
*  Es una superclase que contiene su Soat, 
*  para el curso de EDyA1 en la Universidad Autónoma de Occidente
*/
//import {Soat} from './Soat.js';

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
}
