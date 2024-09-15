/* Adicionar las siguientes funciones:
  . calcularCuotaMensual(prestamo, interes, meses)
  . reporteTotal(info)
  . reporteMasGanan(info)

function calcularCuotaMensual(prestamo, interes, meses){
    let aux = Math.pow((1 + interes), meses)
    let res = aux;
    return Math.round(res)
} */



// Función para calcular la cuota mensual del préstamo
function calcularCuotaMensual(prestamo, interes, meses) {
  let tasaMensual = interes / 100 / 12;  // Conversión a tasa mensual
  let aux = Math.pow(1 + tasaMensual, meses);
  let cuota = prestamo * tasaMensual * aux / (aux - 1);
  return Math.round(cuota);  // Redondear al entero más cercano
}

// Función para generar el reporte total
function reporteTotal(info) {
  let reporte = "Listado préstamos procesados son:\n";
  info.forEach(obj => {
    reporte += `${obj.nombre} -- $${obj.prestamo} -- $${obj.cuota} -- ${obj.meses} meses -- ${obj.interes}%\n`;
  });
  return reporte;
}

// Función para generar el reporte de préstamos por más de $1,000,000
function reporteMasGanan(info) {
  let reporte = "Listado de préstamos por más de $1,000,000:\n";
  info.filter(obj => obj.prestamo > 1000000).forEach(obj => {
    reporte += `${obj.nombre} -- $${obj.prestamo} -- $${obj.cuota}\n`;
  });
  return reporte;
}

// Exportar las funciones
export { calcularCuotaMensual, reporteTotal, reporteMasGanan };
