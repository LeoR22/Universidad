/*
ESTRUCTURA DE DATOS Y ALGORITMOS 1
TALLER: ANALISIS DE ALGORITMOS - CORTE 2
ESTUDIANTE: BALMER VALENCIA:2227097  - LEANDRO RIVERA RIOS:2226651
PROFESOR: JOHN ALEXANDER VARGAS

Determinar que hacen los siguientes
fragmentos de código y calcular el número total
de instrucciones
ejecutadas en el peor caso.
*/

function item3(a) {
    // Declara la variable 'cont' para contar números pares y la inicializa en 0
    let cont = 0;
    // Declara la variable 'suma' para almacenar la suma de números impares y la inicializa en 0
    let suma = 0;

    // Declara un bucle for que itera desde el índice 2 hasta el tamaño del arreglo menos 2.
    // Para el arreglo de prueba con tamaño 7, este bucle se ejecutará 3 veces (i = 2, 3, 4).
    for (let i = 2; i < a.length - 2; i++) {
        // Declara un segundo bucle for, inicializado en 0 y que va hasta la mitad del tamaño del arreglo.
        // Este bucle alcanzará las posiciones 0, 1, 2 y 3 del arreglo.
        for (let j = 0; j <= Math.floor(a.length / 2); j++) {
            // Dentro del segundo bucle se evalúa si el número en la posición 'j' del arreglo es par.
            // Si es par, se incrementa la variable 'cont'.
            if (a[j] % 2 == 0) {
                cont++;
            } else {
                // Si el número no es par, se suma a 'suma' el valor en 'a[j]' y se incrementa 'a[j]' en 2.
                suma += a[j];
                a[j] += 2;
            }
        }
    }
    // Al final del bucle for, se regresa el valor acumulado en 'cont',
    // que permite determinar cuántos números pares existen en el arreglo 'info'.
    return cont;
}

// Se declara un arreglo 'info' con números enteros.
let info = [4, 7, 21, 10, 11, 13, 23];

// Se imprime el resultado que regresa la función item3.
console.log(item3(info));




/*

ANALISIS DE INTRUCCIONES:
let cont = 0; --> c1
let suma = 0; --> c2
i = 2 --> c3
i < a.length - 2 --> c4
i++ --> c5
let j = 0 --> c6
j <= Math.floor(a.length / 2) --> c7
j++ --> c8
if (a[j] % 2 == 0)  --> c9
cont++; --> c10
suma += a[j]; --> c11
a[j] += 2; --> c12
return cont; --> c13
let info = [4, 7, 21, 10, 11, 13, 23]; --> c14
console.log(item3(info)); --> c15

TOTAL INSTRUCCIONES
Tinstruciones(n) = c1+c2+(c3+c4+c5)*(n−2)+(c6+c7+c8)*(n/2+1)*(n−2)+(c9+c10+c11+c12)*(n/2+1)
Tinstruciones(n) = (n−2)(n/2+1)(n−2)(n/2+1)

condiciones del ciclo extern
(c3+c4+c5)*(n−2) --> es un termino lineal en n
(c6+c7+c8)*(n/2+1)*(n−2) es aproximadamente O(n^2) por que se multipica por (n-2)
(c9+c10+c11+c12)*(n/2+1) --> tambien es lineal

COMPLEJIDAD TEMPORAL
T(n) = O(n^2)

*/

/*
Prueba de escritorio
El progama evalua  si los valores del arreglo son pares al dividirlos entre 2,
solo se efectua la validacion entre las posiciones del arreglo 0 a 3

Array: 4,7,21,10,11,13,23
Array: 4,9,21,10,11,13,23
Array: 4,9,23,10,11,13,23
Array: 4,11,23,10,11,13,23
Array: 4,11,25,10,11,13,23
Array: 4,13,25,10,11,13,23
Array: 4,13,27,10,11,13,23
6
*/