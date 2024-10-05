
/*
ESTRUCTURA DE DATOS Y ALGORITMOS 1
TALLER: ANALISIS DE ALGORITMOS - CORTE 2
ESTUDIANTE: BALMER VALENCIA 2227097
PROFESOR: JOHN ALEXANDER VARGAS

Determinar que hacen los siguientes
fragmentos de código y calcular el número total
de instrucciones
ejecutadas en el peor caso.
*/

/*
Declara una función item4 que toma un arreglo como parámetro.
*/
function item4(a){
    /**
     Declara una variable veces y la inicializa con el valor 0.
     Esta variable va a contar cuántos elementos del arreglo a
     cumplen con la condición de ser mayores que 2.
     */
    let veces = 0;
    /**
     Define un bucle for que recorre todos los elementos del arreglo a.
     Se realizan dos operaciones por cada iteración.
     */
    for (let i = 0; i < a.length; i++){
        /* La primera operación del bucle for es llamar a la función items5,
        pasar el arreglo a y el valor actual de i. El valor devuelto por
        items5 se suma al valor actual de a[i]. */
        a[i] += items5(a, i);
        /* La segunda operación del bucle for es comparar si el valor
        del elemento a[i] es mayor que 2. Si es verdadero, incrementa
        la variable veces. */
        if (a[i] > 2){
            veces++;
        }
    }
    /* Retorna el valor de veces, que es el número de elementos del arreglo
    a que son mayores que 2 después de ser modificados. */
    return veces;
}

/*
Declara una función items5 que toma un arreglo y un número como parámetros.
*/
function items5(a, b){
    /**
    Declara una variable cont y la inicializa con el valor 0.
    Esta variable va a contar cuántos elementos del arreglo a
    son mayores que el elemento en la posición b.
    */
    let cont = 0;
    /**
    Define un bucle for que recorre todos los elementos del arreglo a.
    Se realizan dos operaciones por cada iteración.
    */
    for (let i = 0; i < a.length; i++){
        /* La primera operación del bucle for es comparar que el índice
        actual i no sea igual a b, para evitar comparar el elemento consigo mismo. */
        if (i != b){
            /* La segunda operación es validar si el elemento a[i]
            es mayor que el elemento a[b]. Si es verdadero, incrementa cont. */
            if (a[i] > a[b]){
                cont++;
            }
        }
    }
    /* Retorna el valor cont, que representa cuántos elementos en el arreglo a
    son mayores que el elemento en la posición a[b], excluyendo el elemento
    en la posición b. */
    return cont;
}

// let info = [4, 7, 21, 10, 11, 13, 23];
let info = [4, 7, 21, 10, 11, 13, 23];
/* Imprime el valor final, que es el número de elementos que eran
mayores a 2 después de ser actualizados en la función item4.
El resultado esperado es 7. */
console.log(item4(info));


/*

function item4
let veces = 0;  ---> c1
i = 0  ---> c2
i < a.length  ---> c3
i++  ---> c4
a[i] += items5(a, i);  ---> c5
if (a[i] > 2){  ---> c6
veces++;  ---> c7
return veces;  ---> c8

function items5
let cont = 0;  ---> c9
let i = 0  ---> c10
< a.length  ---> c11
i++  ---> c12
if (i != b){  ---> c12
if (a[i] > a[b]){  ---> c14
cont++;  ---> c15
return cont;  ---> c16

let info = [4, 7, 21, 10, 11, 13, 23];  ---> c17
console.log(item4(info));  ---> c18

ANALISIS DE INTRUCCIONES:
TinstruccionesO(items4) = (c1+c2+c3n+c4(n-1)+c5.O(itmes5)+c6n+c7+c8)+O(items5)
TinstruccionesO(items4) = O(n)
Tinstrucciones O(items5) = (c9+c10+c11n+c12(n-1)+c13n+c14n+c15n+c16)
TinstruccionesO(items5) = O(n)
TOTAL INSTRUCCIONES
Tinstrucciones(n) = O(n).O(n)

COMPLEJIDAD TEMPORAL
O(n^2)

*/

/*
Prueba de escritorio
(base) PS C:\12_Python\structures\calculo-complejidad\part-1> node part1-d.js
Valor inicial info: 4,7,21,10,11,13,23
El valor de elemento 0 before incremento es: 4
el valor a incrementar es: 6
El valor de elemento 0 despues del incremento es: 10
Cuenta cuantas veces 10 es mayor que 2
Valor acutal de info: 10,7,21,10,11,13,23
El valor de elemento 1 before incremento es: 7
el valor a incrementar es: 6
El valor de elemento 1 despues del incremento es: 13
Cuenta cuantas veces 13 es mayor que 2
Valor acutal de info: 10,13,21,10,11,13,23
El valor de elemento 2 before incremento es: 21
el valor a incrementar es: 1
El valor de elemento 2 despues del incremento es: 22
Cuenta cuantas veces 22 es mayor que 2
Valor acutal de info: 10,13,22,10,11,13,23
El valor de elemento 3 before incremento es: 10
el valor a incrementar es: 5
El valor de elemento 3 despues del incremento es: 15
Cuenta cuantas veces 15 es mayor que 2
Valor acutal de info: 10,13,22,15,11,13,23
El valor de elemento 4 before incremento es: 11
el valor a incrementar es: 5
El valor de elemento 4 despues del incremento es: 16
Cuenta cuantas veces 16 es mayor que 2
Valor acutal de info: 10,13,22,15,16,13,23
el valor a incrementar es: 5
El valor de elemento 4 despues del incremento es: 16
Cuenta cuantas veces 16 es mayor que 2
Valor acutal de info: 10,13,22,15,16,13,23
El valor de elemento 4 despues del incremento es: 16
Cuenta cuantas veces 16 es mayor que 2
Valor acutal de info: 10,13,22,15,16,13,23
Cuenta cuantas veces 16 es mayor que 2
Valor acutal de info: 10,13,22,15,16,13,23
Valor acutal de info: 10,13,22,15,16,13,23
El valor de elemento 5 before incremento es: 13
El valor de elemento 5 before incremento es: 13
el valor a incrementar es: 4
El valor de elemento 5 despues del incremento es: 17
Cuenta cuantas veces 17 es mayor que 2
Valor acutal de info: 10,13,22,15,16,17,23
El valor de elemento 6 before incremento es: 23
el valor a incrementar es: 0
El valor de elemento 6 despues del incremento es: 23
Cuenta cuantas veces 23 es mayor que 2
Valor acutal de info: 10,13,22,15,16,17,23
El numero de veces que se comparan los elementos de info > 2 es: 7
7
Valor final info: 10,13,22,15,16,17,23

*/