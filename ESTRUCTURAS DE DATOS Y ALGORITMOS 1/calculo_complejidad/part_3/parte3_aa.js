function item3(a) {
    let cont = 0;
    let suma = 0;
    for (let i=2; i>a.length-2; i++){
        for(let j=0; j<=a.length/2; j++){
            if (a[j]%2==0){
                cont++;
            }else{
                suma += a[j];
                a[j]+=2;
            }
        }
    }
    return cont;
}    

// Ejemplo de uso
let info = [4, 7, 21, 10, 11, 13, 23];
console.log(item3(info)); // Muestra el resultado


//Resolucion de la concurrencia
//T(n) = O(n)
//O(n)