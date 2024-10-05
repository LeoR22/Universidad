function item6(a){
    for (let i=1; i<a.length-1; i++){
        for (let j=0; j<Math.trunc(Math.log2(a.length)); j++){
            console.log(a[i]+ ' '+a[j]);
        }
    }
}

let info = [4, 7, 21, 10, 11, 13, 23];
item6(info);


/**
 * EL CODIGO REGRESA LA COMBINACION DE LOS DOS PRIMEROS ELEMENTS DEL
 * ARRAY CON CADA UNO DE LOS OTROS ELEMENTOS.
 *
ANALISIS DE INTRUCCIONES:
i=1  --> c1
i<a.length-1  --> c2
i++  --> c3
j=0  --> c4
j<Math.trunc(Math.logs2(a.length))  --> c5
j++  --> c6
console.log(a[i]+ ' '+a[j]);  --> c7
let info = [4, 7, 21, 10, 11, 13, 23];  --> c8
item6(info);  --> c9

INSTRUCCIONES CICLO EXTERNO
Tinstrucciones (n) = (c1+c2+c3)*(n-2)

INSTRUCCIONES CICLO INTERNO
Tinstrucciones (n) = (c4+c5+c6+c7)*log2(n)*(n-2)

TOTAL INSTRUCCIONES
Tinstrucciones (n) = (c1+c2+c3)*(n-2)+(c4+c5+c6+c7)*log2(n)*(n-2)

COMPLEJIDAD TEMPORAL
T(n) = O(n.log2(n))

 */