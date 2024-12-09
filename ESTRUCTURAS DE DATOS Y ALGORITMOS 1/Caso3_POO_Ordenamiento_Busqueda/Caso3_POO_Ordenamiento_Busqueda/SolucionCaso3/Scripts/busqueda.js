/*
*  Archivo busqueda.js
*  Creado por: Orlando Arboleda Molina
*  Fecha: 12-Abril-2024
*
*  Descripción: 
*  Archivo con implementación de algoritmo de búsqueda binaria, 
*  para el curso de EDyA1 en la Universidad Autónoma de Occidente.
*/

/*
   Función de búsqueda binaria basada en la placa.
   Parámetros:
   - A: Secuencia (arreglo de objetos con placas).
   - p: Índice inicial del arreglo.
   - q: Índice final del arreglo.
   - placaBuscada: Placa que se busca.
   
   Retorna la posición de la placa si se encuentra, o -1 si no.
*/
function busquedaBinaria_por_Placa(A, p, q, placaBuscada) {
    // Verificamos si el rango es válido
    if (p <= q) {
        let m = Math.trunc((p + q) / 2);  // Encuentra el punto medio

        if (A[m].placa === placaBuscada) {
            // Si se encuentra la placa en el medio, retorna la posición
            return m;
        } else if (A[m].placa.localeCompare(placaBuscada) > 0) {
            // Si la placa del medio es mayor, busca en la mitad izquierda
            return busquedaBinaria_por_Placa(A, p, m - 1, placaBuscada);
        } else {
            // Si la placa del medio es menor, busca en la mitad derecha
            return busquedaBinaria_por_Placa(A, m + 1, q, placaBuscada);
        }
    }
    // Retorna -1 si no se encuentra la placa
    return -1;
}

/*
   Función para buscar una placa en un arreglo de vehículos y manejar el caso
   de que no exista dicha placa en el sistema.
*/
function buscarPlaca(A, placaBuscada) {
    // Asegúrate de que el arreglo esté ordenado por la placa
    A.sort((a, b) => a.placa.localeCompare(b.placa));

    // Llamada a la función de búsqueda binaria
    const posicion = busquedaBinaria_por_Placa(A, 0, A.length - 1, placaBuscada);

    // Verifica si la placa fue encontrada
    if (posicion === -1) {
        console.log(`La placa ${placaBuscada} no se encuentra en el sistema.`);
    } else {
        console.log(`La placa ${placaBuscada} fue encontrada en la posición ${posicion}.`);
    }
}

// Exportar las funciones
export { busquedaBinaria_por_Placa, buscarPlaca };
