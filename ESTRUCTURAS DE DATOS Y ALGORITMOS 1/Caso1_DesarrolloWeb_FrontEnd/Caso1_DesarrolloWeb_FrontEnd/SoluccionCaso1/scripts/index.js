import { calcularCuotaMensual, reporteTotal, reporteMasGanan } from './computos.js';

// Arreglo para almacenar los datos procesados
let infoCuotas = [];

// Referencias a los elementos del DOM
const btnFuncionalidad = document.getElementById("procesar");
const txtA_Respuesta = document.getElementById("laRespuesta");

// Event listener para el botón
btnFuncionalidad.addEventListener('click', procesarFuncionalidad);

// Función para manejar la lógica principal
function procesarFuncionalidad() {
    console.log("Boton ejecutado")
    const opcion = document.getElementById("laOpcion").value;

    switch (opcion) {
        case "Calcular":
            procesarEntrada();
            break;
        case "ListarTodos":
            mostrarReporte1();
            break;
        case "ListarGanan":
            mostrarReporte2();
            break;
    }
}

// Función para procesar la entrada y calcular la cuota
function procesarEntrada() {
    // Obtener los valores de los inputs
    const nombre = document.getElementById("elNombre").value;
    const prestamo = parseFloat(document.getElementById("elPrestamo").value);
    const meses = parseInt(document.getElementById("losMeses").value);
    const interes = parseFloat(document.getElementById("elInteres").value);

    // Calcular la cuota mensual
    const cuota = calcularCuotaMensual(prestamo, interes, meses);

    // Crear un objeto con la información obtenida
    const info = {
        nombre,
        prestamo,
        meses,
        interes,
        cuota
    };

    // Almacenar el objeto en el arreglo
    infoCuotas.unshift(info);

    // Mostrar el resultado en el área de texto
    txtA_Respuesta.value = `${nombre} debe pagar $${cuota} cada mes por el préstamo de $${prestamo} a ${meses} meses con un interés del ${interes}%`;
}

// Función para mostrar el primer reporte (todos los préstamos)
function mostrarReporte1() {
    txtA_Respuesta.value = reporteTotal(infoCuotas);
}

// Función para mostrar el segundo reporte (préstamos mayores a $1,000,000)
function mostrarReporte2() {
    txtA_Respuesta.value = reporteMasGanan(infoCuotas);
}