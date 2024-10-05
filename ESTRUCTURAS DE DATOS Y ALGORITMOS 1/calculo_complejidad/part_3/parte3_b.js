function obtenerMayor(A) {
    return Math.max(...A);
}

function recursivo3(A, i, j) {
    // Condición base: Si el rango entre i y j es muy pequeño, detener la recursión
    if (j - i < 2) {
        return (A[i] + A[j]) / 2; // Calcula la media si solo quedan dos elementos.
    } else {
        let res = obtenerMayor(A);  // Encuentra el valor máximo del array
        let parte = Math.trunc((j - i + 1) / 3);  // Calcula la partición

        // Si la partición es cero, ajusta para que los índices cambien.
        if (parte === 0) parte = 1;

        // Llamadas recursivas para dividir el array en tres partes
        res += recursivo3(A, i, i + parte - 1) +
            recursivo3(A, i + parte, i + 2 * parte - 1) +
            recursivo3(A, i + 2 * parte, j);

        return res;
    }
}
//Donde obtenerMayor es O(n)
let info = [4, 7, 21, 10, 11, 13, 23];
console.log(recursivo3(info, 0, info.length - 1));



//Resolucion de la concurrencia
//Donde obtenerMayor es O(n)
//T(n)=O(n)+3T(3/n​)
//logba = log3^3 = 1⟹n^logb^a = n^1= O(n)
//T(n)=Θ(nlogn)