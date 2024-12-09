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
        this.soat = soat;
    }

    obtenerEstadoEsperado() {
        let estado = "No circula";
        if (this.modelo >= 2020) {
            estado = "Circulara por 5 años";
        } else if (this.modelo >= 2015) {
            estado = "Circulara por 3 años";
        } else if (this.modelo >= 2010) {
            estado = "Circulara por 1 años";
        }

        return estado;
    }

    toString() {
        return "Placa:" + this.placa + " Modelo:" + this.modelo + " SOAT: " + this.soat.toString();
    }
}
