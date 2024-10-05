function opera(b,c){
    let veces = 0;
    for (let x=b; x<=c; x++){
        if (item2(x)){
            veces++;
        }
    }
    return veces;
}

function item7(a){
    for (let i=0; i<a.length-1; i++){
        a[i] = opera(i, a.length-1);
    }
}

let info = [4, 7, 21, 10, 11, 13, 23];
console.log(item7(info));

/*
ANALISIS DE INTRUCCIONES:
function opera(b,c){
let veces = 0; --> c1
x=b --> c2
x<=c --> c3
x++ --> c4
if (item2(x)){ --> c5
veces++; --> c6
return veces; --> c7

function item7(a){
i=0 --> c8
i<a.length-1 --> c9
i++ --> c10
a[i] = opera(i, a.length-1); --> c11
let info = [4, 7, 21, 10, 11, 13, 23]; --> c12
console.log(item7(info)); --> c12

INSTRUCCIONES opera(b,c)
Tinstrucciones (n) =c1+(c2+c3+c4)*(c-b+1)+c5-1+3*(c-b+1)+1-3(c-b+1)+2
c es n, el array.length.
O(n)

INSTRUCCIONES item7
Tinstrucciones (n) = c6+c7*(n-1)
o(n) por el termino n

COMPLEJIDAD TEMPORAL
Tinstrucciones (n) = O(n)*O(n)
O(n^2)

*/