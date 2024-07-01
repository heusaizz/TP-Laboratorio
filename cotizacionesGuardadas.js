function cargarCotizacionesFavoritas() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const tbody = document.querySelector('#tabla-cotizaciones tbody'); // Obtenemos el cuerpo de la tabla
    let htmlFilas = '';
    favoritos.forEach(cotizacion => {
        htmlFilas += `
            <tr>
                <td>${cotizacion.fecha}</td> 
                <td>${cotizacion.nombre}</td>
                <td>${cotizacion.compra}</td>
                <td>${cotizacion.venta}</td>
                <td><button class="btn" onclick="eliminarFavorito('${cotizacion.nombre}')"><i class="fa-solid fa-eraser fa-custom-size"></i></button></td>
            </tr>
        `;
    });
    tbody.innerHTML = htmlFilas; // Insertamos las filas en la tabla
}

function eliminarFavorito(nombre) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const indiceExistente = favoritos.findIndex(fav => fav.nombre === nombre);
    if (indiceExistente !== -1) {
        favoritos.splice(indiceExistente, 1); // Eliminar la cotización del array
        localStorage.setItem('favoritos', JSON.stringify(favoritos)); // Actualizar el localStorage
        cargarCotizacionesFavoritas(); // Actualizar la tabla
        alert('Cotización eliminada de favoritos!');
    }
}

// Llamamos a la función para cargar las cotizaciones al cargar la página
cargarCotizacionesFavoritas();

function imprimirRecuadro() {
    var contenido = document.getElementById('imprimir').innerHTML;
    var contenidoOriginal = document.body.innerHTML;
    document.body.innerHTML = contenido;
    window.print();
    document.body.innerHTML = contenidoOriginal;
}
