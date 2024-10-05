function item4(a) {
    let veces = 0;
    for (let i = 0; i<a.length; i++) {
        a[i] += item5(a,i);
        if (a[i]>2){
            veces++;
        }
    }
    return veces;
}

function item5(a,b){
    let cont=0;

    for (let i=0; i<a.length; i++){
        if (i!=b){
            if (a[i]>a[b]){
                cont++;
            }
        }
    }
    return cont;
}

// Ejemplo de uso
let info = [4, 7, 21, 10, 11, 13, 23];
console.log(item4(info)); // Muestra el resultado

//Resolucion de la concurrencia
//T(n) = n⋅T(n) + O(n)
//T(n) = n⋅O(n) = O(n^2)
//O(n^2)