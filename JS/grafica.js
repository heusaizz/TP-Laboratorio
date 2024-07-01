const url = 'https://api.argentinadatos.com/v1/cotizaciones/dolares';
const etiquetas = []; // Array para almacenar las fechas de las cotizaciones
const datosBlue = []; // Array para almacenar los valores del dólar blue
const datosMayorista = []; // Array para almacenar los valores del dólar mayorista
const datosOficial = []; // Array para almacenar los valores del dólar oficial

async function obtenerCotizaciones() {
    try { 
        // Obtener las cotizaciones de la API mediante fetch
        const respuesta = await fetch(url); 
        // Si la solicitud fue exitosa (código de estado 200)
        if (respuesta.status === 200) {
            const datos = await respuesta.json(); // json guarda obj. Convierte la respuesta a un objeto JSON-> "Archivo" que guarda estados de api
            // Itera sobre cada cotización en los datos
            datos.forEach(cotizacion => { //parametro cotizacion: pide fecha, casa(nombre moneda), precio compra
                const fecha = cotizacion.fecha; 

                // Agrega la fecha al array 'etiquetas' si no está presente
                if (!etiquetas.includes(fecha)) { 
                    etiquetas.push(fecha);
                }
                // Clasifica las cotizaciones según su tipo y las agrega a los arrays correspondientes
                if (cotizacion.casa === 'blue') {
                    datosBlue.push(parseFloat(cotizacion.compra));
                } else if (cotizacion.casa === 'mayorista') {
                    datosMayorista.push(parseFloat(cotizacion.compra));
                } else if (cotizacion.casa === 'oficial') {
                    datosOficial.push(parseFloat(cotizacion.compra));
                }
            });

            const ctx = document.getElementById("miGrafica").getContext("2d");
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: etiquetas, // Etiquetas del eje X (fechas)
                    datasets: [
                        {
                            label: 'Dólar Blue', // Etiqueta para la línea del dólar blue
                            data: datosBlue, // Datos del dólar blue
                            borderColor: "rgba(255, 99, 132, 1)", // Color del borde de la línea
                            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color de fondo bajo la línea
                            borderWidth: 1, // Ancho del borde de la línea
                            fill: false // No rellena el área bajo la línea
                        },
                        {
                            label: 'Dólar Mayorista', // Etiqueta para la línea del dólar mayorista
                            data: datosMayorista, // Datos del dólar mayorista
                            borderColor: "rgba(54, 162, 235, 1)", // Color del borde de la línea
                            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo bajo la línea
                            borderWidth: 1, // Ancho del borde de la línea
                            fill: false // No rellena el área bajo la línea
                        },
                        {
                            label: 'Dólar Oficial', // Etiqueta para la línea del dólar oficial
                            data: datosOficial, // Datos del dólar oficial
                            borderColor: "rgba(75, 192, 192, 1)", // Color del borde de la línea
                            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo bajo la línea
                            borderWidth: 1, // Ancho del borde de la línea
                            fill: false // No rellena el área bajo la línea
                        }
                    ]
                }
            });
            // Fin de la configuración del gráfico
        } else {
            console.error(`Error al obtener cotización del dólar`); // Mensaje de error si la solicitud a la API falla
        }
    } catch (error) {
        console.error("Error fetching or processing data:", error); // Mensaje de error general en caso de cualquier otro error durante la obtención o procesamiento de datos
    }
}

obtenerCotizaciones();
