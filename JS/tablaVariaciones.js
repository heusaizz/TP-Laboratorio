function cargarCotizaciones() {
    // Obtiene las cotizaciones favoritas del almacenamiento local, si existen. Si no, inicializa un array vacío.
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    // Obtiene la tabla donde se mostrarán las cotizaciones.
    const tabla = document.querySelector('.table table tbody');

    // Limpia el contenido de la tabla.
    tabla.innerHTML = '';

    // Agrupa las cotizaciones por moneda en un objeto.
    const cotizacionesPorMoneda = {}; //objeto
    favoritos.forEach(cotizacion => {
        if (!cotizacionesPorMoneda[cotizacion.nombre]) {
            cotizacionesPorMoneda[cotizacion.nombre] = [];
        }
        cotizacionesPorMoneda[cotizacion.nombre].push(cotizacion);
    });

    // Crea filas en la tabla para cada moneda.
    for (const nombreMoneda in cotizacionesPorMoneda) {
        let filaMoneda = document.createElement('tr');
        filaMoneda.innerHTML = `<td colspan="5" class="db">${nombreMoneda}</td>`; // Crea una celda que abarca 5 columnas con el nombre de la moneda.
        tabla.appendChild(filaMoneda);
        // Crea filas para cada cotización de la moneda.
        cotizacionesPorMoneda[nombreMoneda].forEach((cotizacion, index) => {
            let filaCotizacion = document.createElement('tr');
            let variacionIcono = '';
            // Comparar variación con la cotización anterior
            if (index > 0) {
                // Si no es la primera cotización de la moneda, obtenemos la cotización anterior
                const cotizacionAnterior = cotizacionesPorMoneda[nombreMoneda][index - 1];
                
                // Comparamos el valor de compra de la cotización actual con la anterior
                if (parseFloat(cotizacion.compra) > parseFloat(cotizacionAnterior.compra)) {
                    variacionIcono = '<i class="fa-solid fa-arrow-up"></i>'; // Flecha arriba si subió
                } else if (parseFloat(cotizacion.compra) < parseFloat(cotizacionAnterior.compra)) {
                    variacionIcono = '<i class="fa-solid fa-arrow-down"></i>'; // Flecha abajo si bajó
                } else {
                    variacionIcono = '<i class="fa-solid fa-equals"></i>'; // Signo igual si no hubo variación
                }
            }
            // Agregamos el contenido a la fila de la tabla, incluyendo el icono de variación
            filaCotizacion.innerHTML = `
            <td></td>
            <td>${cotizacion.fecha}</td>
            <td>${cotizacion.compra}</td>
            <td>${cotizacion.venta}</td>
            <td>${variacionIcono}</td>
            `;
            tabla.appendChild(filaCotizacion); // Agregamos la fila a la tabla
        });
    }
}
// Llamamos a la función para cargar las cotizaciones al cargar la página
cargarCotizaciones();