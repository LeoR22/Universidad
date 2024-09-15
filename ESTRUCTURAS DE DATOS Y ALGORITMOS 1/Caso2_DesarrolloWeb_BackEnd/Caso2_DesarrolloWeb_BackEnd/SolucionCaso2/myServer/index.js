const util = require('./scripts/computos')

const express = require('express')

const app = express()
const port = 1234

// arreglo para almacenar los datos de cada procesamiento
let infoCuotas = [];

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
// define que la carpeta public tendrá recursos publicos



/*
    lógica para peticiones get
    Regresa la pagina index.html
    . procesarEntrada() - para calcular cuota para la entrada dada
    . mostrarReporte1() - despliega el primer reporte solicitado
    . mostrarReporte1() - despliega el segundo reporte solicitado 
*/ 
app.get('/', (req,res)=> {
    console.log('en get/procesaCuota')
    res.sendFile(__dirname+"/static/index.html")
})

/*
    lógica para peticiones post
    Si la opcion solicitada desde la pagina web, es:
    . Calcular - calcula la cuota para la entrada dada y en la variable salida asigna
                 la información a desplegar
    . ListarTodos - en la variable salida asigna la información del primer reporte
    . diferente a las anteriores - en la variable salida asigna la información del segundo reporte

    Luego obtiene una pagina dinamica con los datos leidos y la informacion almacenada en salida,
    la cual retorna al navegador web
*/ 
app.post('/procesarCuota', (req,res)=> {
    console.log('en post/calculaCuota')
    /* 
       obtiene los datos suministrados desde el formulario, en las variables:
       nombre, prestamo, meses, interes
    */
    const datos = req.body;
    const opcion = datos.laOpcion;
    const nombre = datos.elNombre;
    const prestamo = parseFloat(datos.elPrestamo);
    const meses = parseInt(datos.losMeses);
    const interes = parseFloat(datos.elInteres);
    // lee los datos restantes


    // obtiene en salida, la cadena a desplegar en el area de texto
    let salida = '';
    let cuota = 0;

    switch (opcion) {
        case "Calcular":
            const cuota = util.calcularCuotaMensual(prestamo, interes, meses);
            salida = `${nombre} debe pagar $${cuota.toFixed(2)} cada mes por el préstamo de $${prestamo} a ${meses} meses con un interés del ${interes}%`;

            let nvaCuota = { nombre, prestamo, meses, interes, cuota };
            infoCuotas.unshift(nvaCuota);
            break;
        case "ListarTodos":
            salida = util.reporteTotal(infoCuotas);
            break;
        case "ListarGanan":
            salida = util.reporteMasGanan(infoCuotas);
            break;
    }
    // Verifica si el cliente está solicitando JSON
    if (req.headers.accept === 'application/json') {
        res.json({
            nombre,
            prestamo,
            meses,
            interes,
            cuota,
            salida
        });
    } else {
        const nPage = util.crearPagina(nombre, prestamo, meses, interes, salida);
        res.send(nPage);

    }
});

app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:' + port+'/procesaCuota');
});