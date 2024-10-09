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

export class VehiculoParticular extends Vehiculo {
    constructor(propietario, placa, modelo, suSoat) {
        super(placa, modelo, suSoat);
        this.propietario = propietario;
    }  

    toString() {
        return "Propietario:" + this.propietario + "  " + super.toString();
    }    
}