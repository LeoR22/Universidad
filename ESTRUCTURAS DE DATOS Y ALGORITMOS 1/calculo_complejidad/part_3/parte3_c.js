function recursivos4(A, i, j) {
    // Si el índice inicial es mayor que el índice final
    if (i > j) {
        return i; // Retorna 0 ya que no hay elementos a sumar
    }else{
    // Se realiza el cálculo del punto medio
        let parte = Math.floor((i + j) / 2);
    //  se realiza las llamadas recursivas para sumar la primera mitad y la segunda 
        return recursivos4(A, i, parte - 1) + A[parte] + recursivos4(A, parte + 1, j);
    }
}
// Ejemplo de uso
let info = [4, 7, 21, 10, 11, 13, 23];
console.log(recursivos4(info, 0, info.length - 1)); // Muestra el resultado
//Donde acota es O(lg n)

//Resolucion de la concurrencia
//Donde Donde acota es O(lg n)
//T(n)=T(n/2) +T(n/2)+O(1)
//T(n)-2T(n/2)+O(1)
//T(n)=Θ(n^logba)=Θ(n)