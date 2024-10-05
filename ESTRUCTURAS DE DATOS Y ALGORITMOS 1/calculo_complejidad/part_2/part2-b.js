/*

b) de los métodos Java BubbleSort, printArray y main, existentes en
https://www.geeksforgeeks.org/bubble-sort/


a)-BubbleSort
COMPLEJIDAD TEMPORAL
*Peor caso:O(n²)
*Mejor caso: O(n) (cuando el array ya está ordenado)
*/

/*
import java.io.*;
@SuppressWarnings("unused")
class GFG {
static void bubbleSort(int arr[], int n){
    int i, j, temp;  
    * Declaración de variables (constante, O(1))
    boolean swapped; 
    * Variable booleana (constante, O(1))
    * Primer bucle for (se ejecuta n - 1 veces)
    for (i = 0; i < n - 1; i++) {  
    * Inicialización y condición de iteración O(n)
        swapped = false;  
        * Asignación constante O(1)
        *Segundo bucle for (se ejecuta n - i - 1 veces en cada iteración del primer bucle)
        for (j = 0; j < n - i - 1; j++) {  
        * Inicialización y condición de iteración O(n)
            *Comparación de dos elementos (O(1))
            if (arr[j] > arr[j + 1]) {
                * Intercambio de valores (O(1))
                temp = arr[j];  // O(1)
                arr[j] = arr[j + 1];  // O(1)
                arr[j + 1] = temp;  // O(1)
                * Actualización de variable swapped (O(1))
                swapped = true;
            }
        }
    }
}  


b)-printArray
COMPLEJIDAD TEMPORAL
* Complejidad temporal: O(n)
* Main Class
static void printArray(int arr[], int size) {
    int i;  // Declaración de variable (constante, O(1))
    *Bucle for para recorrer el array (O(n))
    for (i = 0; i < size; i++) {
        System.out.print(arr[i] + " ");  
        *Operación constante por iteración (O(1))
    }
    System.out.println();
    *Operación constante (O(1))




c)-main
COMPLEJIDAD TEMPORAL
* La complejidad dominante es la de bubbleSort, por lo tanto, la complejidad
* total es O(n²).
--Main Class
public static void main(String args[]) {
    int arr[] = { 64, 34, 25, 12, 22, 11, 90 }; // Inicialización del array (O(1))
    int n = arr.length; // Asignación del tamaño del array (O(1))
    * Llamada al método bubbleSort (su complejidad depende de bubbleSort, O(n²))
    bubbleSort(arr, n);

    * Mensaje de salida (O(1))
    System.out.println("Sorted array: ");

    * Llamada al método printArray (O(n))
    printArray(arr, n);
    }
}

 * Complejidad temporal total del método main:
 * - O(1) para la inicialización del array.
 * - O(1) para la asignación del tamaño del array.
 * - O(n²) debido a la llamada a bubbleSort (la operación más costosa).
 * - O(1) para el mensaje de salida.
 * - O(n) para imprimir el array.
 *
 * La complejidad dominante es la de bubbleSort, por lo tanto, la complejidad
 * total es O(n²).
 */
