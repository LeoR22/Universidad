

/*
ESTRUCTURA DE DATOS Y ALGORITMOS 1
TALLER: ANALISIS DE ALGORITMOS - CORTE 2
ESTUDIANTE: BALMER VALENCIA:2227097  - LEANDRO RIVERA RIOS:2226651
PROFESOR: JOHN ALEXANDER VARGAS

Determina lo que hacen los siguientes fragmentos de código
y calcula el número total de instrucciones ejecutadas en el peor caso.
*/

// Declara una función llamada item1 que toma un arreglo como parámetro.
function item1(a) {
    // Crea un arreglo vacío llamado 'result' para almacenar los resultados de las comparaciones.
    let result = [];
    // Declara una variable 'final' y le asigna el índice del último elemento del arreglo 'a'.
    let final = a.length - 1;
    // Ejecuta un bucle for que itera desde i = 0 hasta la mitad del arreglo (a.length / 2).
    // Esto evita comparaciones redundantes, ya que se evalúan pares de elementos
    // desde los extremos hacia el centro.
    for (let i = 0; i < a.length / 2; i++) {
        // En cada iteración, compara el elemento en la posición 'i' con el elemento
        // en la posición 'final'.
        // Si son diferentes, inserta "no se cumple" en el arreglo 'result'.
        // Si son iguales, inserta "si se cumple" en el arreglo 'result'.
        if (a[i] != a[final]) {
            result.push("no se cumple");
        } else {
            result.push("si se cumple");
        }
        // Decrementa la variable 'final' para comparar con el siguiente elemento
        // desde el final del arreglo.
        final--;
    }
    // Devuelve el arreglo 'result', que contiene "si se cumple" o "no se cumple"
    // según las comparaciones realizadas.
    return result;
}

// Declara el arreglo 'info' con números enteros.
let info = [10, 5, 8, 7, 8, 5, 10];

// Imprime un mensaje indicando que se está llamando a la función item1.
// console.log("Llamando a la función item1.");
// Llama a la función item1 y le pasa el arreglo 'info'.
// Imprime el resultado obtenido de la función item1, que es un arreglo
// con los resultados de las comparaciones.
// Se evalúan pares de elementos desde los extremos hacia el centro.
console.log("Resultado: " + item1(info));

/*
ANALISIS DE INTRUCCIONES:
let result = [];  --> c1
let final = a.length - 1; --> c2
let i = 0 --> c3
i < a.length / 2 --> c4
i++ --> c5
        if (a[i] != a[final]) {           --> c6
            result.push("no se cumple");
        } else {
            result.push("si se cumple");
        }
final--;	--> c7
return result;--> c8
let info = [10, 5, 8, 7, 8, 5, 10];   --> c9
console.log("Resultado: " + item1(info));  --> c10
TOTAL INSTRUCCIONES
Tinstruciones(n) = c1 + c2 + c3 + c4(n/2) + c5n + c6 + c7 + c8 + c9 + c10
Tinstruciones(n) = C + c4(n/2) + c5n
Identifacar el termino dominante:
n(c4/2+c5)
Tinstruciones(n) = O(n)
COMPLEJIDAD TEMPORAL
O(n)

*/