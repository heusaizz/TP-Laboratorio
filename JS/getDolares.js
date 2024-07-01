const nombreMapping = {
    "Oficial": "Dólar Oficial",
    "Blue": "Dólar Blue",
    "Bolsa": "Dólar MEP",
    "Contado con liquidación": "Dólar CCL",
    "Mayorista": "Dólar Mayor",
    "Cripto": "Dólar Cripto",
    "Tarjeta": "Dólar Tarjeta"
};

const cargarCotizaciones = async () => {
    try {
        const respuesta = await fetch("https://dolarapi.com/v1/dolares");

        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            let cotizaciones = '';
            datos.forEach(cotizacion => {
                const displayName = nombreMapping[cotizacion.nombre] || cotizacion.nombre;
                cotizaciones += `
                    <div class="cotizacion">
                        <h3 class="nombre">${displayName}</h3> 
                        <div class="precio-compra">
                            <span>Compra:</span>
                            <span class="compra">${cotizacion.compra}</span>
                        </div>
                        <div class="precio-venta">
                            <span>Venta:</span>
                            <span class="venta">${cotizacion.venta}</span>
                        </div>
                        <button class="btn" onclick="guardarFavorito('${cotizacion.nombre}', '${cotizacion.compra}', '${cotizacion.venta}')"><i class="fas fa-star fa-custom-size"></i></button>
                    </div>
                `;
            });

            document.getElementById("grilla-cotizaciones").innerHTML = cotizaciones;
        }

    } catch (error) {
        console.log(error);
    }
}

function actualizarFecha() {
    const ultimaActualizacion = document.querySelector('.ultima-actualizacion');
    if (ultimaActualizacion) {
        ultimaActualizacion.textContent = `Última actualización: ${new Date().toLocaleString()}`;
    }
}

function guardarFavorito(nombre, compra, venta) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const fechaActual = new Date().toLocaleDateString();

    // La cotización no existe, la agregamos
    favoritos.push({ nombre, compra, venta, fecha: fechaActual });
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    alert('Cotización agregada a favoritos el día ' + fechaActual + '!');

    console.log(JSON.parse(localStorage.getItem('favoritos')));
}

// Llama a la función inicialmente
actualizarFecha();

// Configura un intervalo para actualizar cada 5 minutos (300000 milisegundos)
setInterval(actualizarFecha, 300000);


cargarCotizaciones();
