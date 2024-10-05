
/*
ESTRUCTURA DE DATOS Y ALGORITMOS 1
TALLER: ANALISIS DE ALGORITMOS - CORTE 2
ESTUDIANTE: BALMER VALENCIA:2227097  - LEANDRO RIVERA RIOS:2226651
PROFESOR: JOHN ALEXANDER VARGAS

Determina lo que hacen los siguientes fragmentos de código
y calcula el número total de instrucciones ejecutadas en el peor caso.
*/

// Se declara la función item2, la cual toma un número entero n (se espera que esté entre 2 y 20).
function item2(n){
	// Declara una variable 'tope' y le asigna el valor obtenido de la raíz cuadrada de n,
	// redondeando la raíz al número entero más cercano por debajo.
	let tope = Math.floor(Math.sqrt(n));

	// Declara una variable 'res' de tipo booleano con una asignación verdadera.
	// Esta variable se utiliza para determinar si n es primo.

	let res = true;

	// Se ejecuta un bucle for desde 2 hasta 'tope'.
	// Evalúa si n es divisible por i. Si es así, 'res' se establece en false y el bucle se interrumpe.
	for (let i = 2; i <= tope; i++) {

		// Esto imprime el valor de n en cada iteración (puede ser eliminado si no se requiere).
		if (n % i == 0) {
			res = false; // n no es primo
			break; // Se interrumpe el bucle al encontrar un divisor.
		}
	}

	return res; // Devuelve true si n es primo, false si no lo es.
}

// Se ejecuta un bucle for desde 2 hasta 20.
// Por cada número, se imprime si es primo o no.
for (let pos = 2; pos <= 20; pos++) {
	console.log(pos + ' ' + item2(pos)); // Imprime el número y su estado de primalidad.
}

//console.log("total de instrucciones: " + iCounter++)

/*
ANALISIS DE INTRUCCIONES:
FUNCION
let tope = Math.floor(Math.sqrt(n)); --> C1
let res = true; --> C2
let i = 2 --> C3
i <= tope; --> C4
i++ --> C5
if (n % i == 0) --> C5
res = false; --> C7
break; --> C8
return res; --> C9
CICLO EXTERNO
pos = 2 --> C10
pos <= 20 --> C11
pos++ --> C12
console.log(pos + ' ' + item2(pos))

T total​ (n)=T instructions​ (n)+T external
TOTAL DE INSTRUCCIONES COMBINADAS
T total (n)=(c1​ +c2​ +c3​ +(c4​ + c5​ )⋅ n​ +c6​ ⋅ n​ +c7​ + c8​ +c9​ )+(c10​ + c11​ ⋅19+ c12​ ⋅19+ c13​ ⋅19)

COMPLEJIDAD TEMPORAL
O(sqrt(n))
*/

/*
Prueba de escritorio.
Resultado de la raiz cuadrada de: 2 tope: 1 mySqrt: 1.4142135623730951
2 true
Resultado de la raiz cuadrada de: 3 tope: 1 mySqrt: 1.7320508075688772
3 true
Resultado de la raiz cuadrada de: 4 tope: 2 mySqrt: 2
4 false
Resultado de la raiz cuadrada de: 5 tope: 2 mySqrt: 2.23606797749979
5 true
Resultado de la raiz cuadrada de: 6 tope: 2 mySqrt: 2.449489742783178
6 false
Resultado de la raiz cuadrada de: 7 tope: 2 mySqrt: 2.6457513110645907
7 true
Resultado de la raiz cuadrada de: 8 tope: 2 mySqrt: 2.8284271247461903
8 false
Resultado de la raiz cuadrada de: 9 tope: 3 mySqrt: 3
9 false
Resultado de la raiz cuadrada de: 10 tope: 3 mySqrt: 3.1622776601683795
10 false
Resultado de la raiz cuadrada de: 11 tope: 3 mySqrt: 3.3166247903554
11 true
Resultado de la raiz cuadrada de: 12 tope: 3 mySqrt: 3.4641016151377544
12 false
Resultado de la raiz cuadrada de: 13 tope: 3 mySqrt: 3.605551275463989
13 true
Resultado de la raiz cuadrada de: 14 tope: 3 mySqrt: 3.7416573867739413
14 false
Resultado de la raiz cuadrada de: 15 tope: 3 mySqrt: 3.872983346207417
15 false
Resultado de la raiz cuadrada de: 16 tope: 4 mySqrt: 4
16 false
Resultado de la raiz cuadrada de: 17 tope: 4 mySqrt: 4.123105625617661
17 true
Resultado de la raiz cuadrada de: 18 tope: 4 mySqrt: 4.242640687119285
18 false
Resultado de la raiz cuadrada de: 19 tope: 4 mySqrt: 4.358898943540674
19 true
Resultado de la raiz cuadrada de: 20 tope: 4 mySqrt: 4.47213595499958
20 false

*/