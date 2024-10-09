/*
*  Archivo ordenamientos.js
*  Creado por: Orlando Arboleda Molina
*  Fecha: 12-Abril-2024
*
*  Descripción: 
*  Archivo con implementaciones de los algoritmos de ordenamiento, 
*  para el curso de EDyA1 en la Universidad Autónoma de Occidente
*/

/*
   funcion auxiliar para el método quicksort por placa
   los parametros son A que es la secuencia; p y r que son las posiciones
*/
 function particion_por_Placa(A, p, r){
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



export {quickSort_por_Placa, quickSort_por_Modelo, ordena_Placa, ordena_Modelo};