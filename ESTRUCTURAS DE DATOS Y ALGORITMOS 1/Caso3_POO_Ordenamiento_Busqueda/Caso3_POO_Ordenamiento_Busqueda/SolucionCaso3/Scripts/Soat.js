/*
*  Clase Soat
*  Creado por: Orlando Arboleda Molina
*  Fecha: 12-Abril-2024
*
*  Descripción: 
*  Clase que será incluida en Vehiculo, 
*  para el curso de EDyA1 en la Universidad Autónoma de Occidente
*/

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

