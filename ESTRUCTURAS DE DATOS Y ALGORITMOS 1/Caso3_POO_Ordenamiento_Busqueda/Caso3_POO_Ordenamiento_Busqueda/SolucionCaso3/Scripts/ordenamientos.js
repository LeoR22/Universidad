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
function particion_por_Placa(A, p, r) {
    let x = A[r];
    let i = p - 1;
    let aux;

    for (let j = p; j <= r - 1; j++) {
        if (A[j].placa.localeCompare(x.placa) <= 0) {
            i++;
            aux = A[i];
            A[i] = A[j];
            A[j] = aux;
        }
    }

    aux = A[i + 1];
    A[i + 1] = A[r];
    A[r] = aux;

    return i + 1;
}

function quickSort_por_Placa(A, p, r) {
    if (p < r) {
        let q = particion_por_Placa(A, p, r);
        quickSort_por_Placa(A, p, q - 1);
        quickSort_por_Placa(A, q + 1, r);
    }
}

function particion_por_Modelo(A, p, r) {
    let x = A[r];
    let i = p - 1;
    let aux;

    for (let j = p; j <= r - 1; j++) {
        if (A[j].modelo <= x.modelo) {
            i++;
            aux = A[i];
            A[i] = A[j];
            A[j] = aux;
        }
    }

    aux = A[i + 1];
    A[i + 1] = A[r];
    A[r] = aux;

    return i + 1;
}

function quickSort_por_Modelo(A, p, r) {
    if (p < r) {
        let q = particion_por_Modelo(A, p, r);
        quickSort_por_Modelo(A, p, q - 1);
        quickSort_por_Modelo(A, q + 1, r);
    }
}

function ordena_Placa(A) {
    A.sort((a, b) => a.placa.localeCompare(b.placa));
}

function ordena_Modelo(A) {
    A.sort((a, b) => a.modelo - b.modelo);
}

export { quickSort_por_Placa, quickSort_por_Modelo, ordena_Placa, ordena_Modelo };
