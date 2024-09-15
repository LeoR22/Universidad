/*
    funcion crearPagina(nombre, prestamo, meses, interes, cadSalida)
    Retorna una pagina similar a index.html, pero con los inputs enviados como
    parametros y con la cadSalida en el area de texto la cadena cadSalida

    Nota: se debe asegurar que cadSalida sea desplegada y que el formulario
          genere una peticion post a la ruta procesaCuota
*/
function crearPagina(nombre, prestamo, meses, interes, cadSalida) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/default.css">
        <link rel="stylesheet" href="scripts/asincronismo.js">
    <link rel="icon" type="image/png" sizes="120x120"
      href="https://www.uao.edu.co/wp-content/themes/uao-theme/assets/favicon/apple-icon-120x120.png">
    <title>Simulador Financiero - UAO</title>
  </head>
  <body>
    <header>
      <div class="logo-container">
        <img src="images/Logo-50-años.png" alt="Logo 50 años">
      </div>
      <h1>Simulador de Cuotas</h1>
    </header>
      <main>
        <section>
          <form action="/procesarCuota" method="post" enctype="application/x-www-form-urlencoded">
            <table>
              <caption>Simulador de Cuotas</caption>  
              <tr>
                  <td>Nombre</td>
                  <td>
                      <input type="text" value="${nombre}" name="elNombre">
                  </td>
              </tr>  
              <tr>
                  <td>Prestamo $</td>
                  <td>
                      <input type="number" value="${prestamo}" name="elPrestamo">
                  </td>
              </tr> 
              <tr>
                  <td>Interes (%)</td>
                  <td>
                      <input type="number" value="${interes}" name="elInteres">
                  </td>
              </tr>   
              <tr>
                  <td>Meses</td>
                  <td>
                      <input type="number" value="${meses}" name="losMeses">
                  </td>
              </tr>                                                         
            </table><br>
            <textarea name="laRespuesta" readonly>${cadSalida}</textarea><br>
            <select name="laOpcion">
                <option value="Calcular" selected>Calcular Cuota</option>
                <option value="ListarTodos">Listar todos</option> 
                <option value="ListarGanan">Listar ganan mas</option> 
            </select> 
            <button id="procesar" type="submit">Ejecutar funcionalidad</button>
          </form> 
        </section>
        </main>
  <footer>
    <hr>
    <p>Simulador financiero - UAO</p>
  </footer>
  </body>
</html>`;
}
 
function calcularCuotaMensual(prestamo, interes, meses) {
  let tasaMensual = interes / 100 / 12;
  let aux = Math.pow(1 + tasaMensual, meses);
  let cuota = prestamo * tasaMensual * aux / (aux - 1);
  return Math.round(cuota);
}

function reporteTotal(info) {
  let reporte = "Listado de préstamos procesados:\n";
  info.forEach(obj => {
    reporte += `${obj.nombre} -- $${obj.prestamo} -- $${obj.cuota} -- ${obj.meses} meses -- ${obj.interes}%\n`;
  });
  return reporte;
}

function reporteMasGanan(info) {
  let reporte = "Préstamos por más de $1,000,000:\n";
  info.filter(obj => obj.prestamo > 1000000).forEach(obj => {
    reporte += `${obj.nombre} -- $${obj.prestamo} -- $${obj.cuota}\n`;
  });
  return reporte;
}

module.exports = { crearPagina, calcularCuotaMensual, reporteTotal, reporteMasGanan };
