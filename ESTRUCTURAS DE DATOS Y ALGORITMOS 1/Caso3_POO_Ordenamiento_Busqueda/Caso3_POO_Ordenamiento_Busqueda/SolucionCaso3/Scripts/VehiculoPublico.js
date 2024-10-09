/*
*  Clase VehiculoPublico
*  Creado por: Orlando Arboleda Molina
*  Fecha: 12-Abril-2024
*
*  Descripción: 
*  Es una subclase de la clase Vehiculo, 
*  para el curso de EDyA1 en la Universidad Autónoma de Occidente
*/
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