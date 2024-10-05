// Función que devuelve el valor máximo de un arreglo
function acota(A) {
    return Math.max(...A); // Devuelve el valor máximo del arreglo A
}
// Función recursiva que busca el valor máximo en el arreglo A entre los índices i y j
function recursivos2(A, i, j) {
    if (i > j) {
        return acota(A); // Cuando i supera j, devuelve el valor máximo del arreglo
    } else {
        return Math.max(A[i], recursivos2(A, i + 1, j)); // Compara el elemento actual con el máximo del resto
    }
}
// Arreglo de prueba
let info = [4, 7, 21, 10, 11, 13, 23];
// Llama a la función recursiva y muestra el resultado en la consola
console.log(recursivos2(info, 0, info.length - 1));

//Donde acota es O(lg n)
//Resolucion de la concurrencia
// T(n) = T(n−1) + O(1)
// T(n) = T(n−1)+O(1)T(n-1) = T(n-2)+O(1)T(n-2)= T(n-3)+O(1)
// T(n) = T(O)+O(n)
// T(n)= O(n)

