
function recursiveSum(n) {
    if (n === 0) {
        return 0;
    }
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += i;
    }
    return sum + recursiveSum(n - 1);
}

// Cambia el valor de n para probar con diferentes entradas
const n = 5; // Por ejemplo, 5
const result = recursiveSum(n);
console.log(`La suma recursiva hasta ${n} es: ${result}`);
