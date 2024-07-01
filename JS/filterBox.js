async function getCotizaciones() {
    try {
        const respuesta = await fetch("https://dolarapi.com/v1/cotizaciones");
        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            let cotizacionesHTML = '';
            datos.forEach(cotizacion => {
                const displayName = nombreMapping[cotizacion.nombre] || cotizacion.nombre;
                cotizacionesHTML += `
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
            document.getElementById("grilla-cotizaciones").innerHTML = cotizacionesHTML;
        }
    } catch (error) {
        console.error("Error fetching or processing data:", error); 
    }
}

function consultarCotizacion() {
    const selectedValue = document.getElementById('currencySelector').value;
    let url;

    switch (selectedValue) {
        case 'TODAS':
            getCotizaciones();
            break;
        case 'oficial':
            url = 'https://dolarapi.com/v1/dolares/oficial';
            break;
        case 'blue':
            url = 'https://dolarapi.com/v1/dolares/blue';
            break;
        case 'bolsa':
            url = 'https://dolarapi.com/v1/dolares/bolsa';
            break;
        case 'contadoconliqui':
            url = 'https://dolarapi.com/v1/dolares/contadoconliqui';
            break;
        case 'tarjeta':
            url = 'https://dolarapi.com/v1/dolares/tarjeta';
            break;
        case 'mayorista':
            url = 'https://dolarapi.com/v1/dolares/mayorista';
            break;
        case 'cripto':
            url = 'https://dolarapi.com/v1/dolares/cripto';
            break;
        case 'eur':
            url = 'https://dolarapi.com/v1/cotizaciones/eur';
            break;
        case 'brl':
            url = 'https://dolarapi.com/v1/cotizaciones/brl';
            break;
        case 'clp':
            url = 'https://dolarapi.com/v1/cotizaciones/clp';
            break;
        case 'uyu':
            url = 'https://dolarapi.com/v1/cotizaciones/uyu';
            break;
        default:
            // Handle the 'TODAS' option or any invalid selection
            console.log("Invalid selection or 'TODAS' selected");
            return; // Exit the function 
    }
    if (url) {
        fetchData(url)
            .then(displayData);
    }
}

async function
    fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
function displayData(data) {
    const displayArea = document.getElementById('grilla-cotizaciones');
    if (displayArea) {
        if (data) {
            console.log(data);

            // Clear the existing content of the grid
            displayArea.innerHTML = '';
            // Add the filtered quote to the grid
            displayArea.innerHTML += `
                <div class="cotizacion">
                    <h3 class="nombre">${data.nombre}</h3> 
                    <div class="precio-compra">
                        <span>Compra:</span>
                        <span class="compra">${data.compra}</span>
                    </div>
                    <div class="precio-venta">
                        <span>Venta:</span>
                        <span class="venta">${data.venta}</span>
                    </div>
                    <button class="btn" onclick="guardarFavorito('${data.nombre}', '${data.compra}', '${data.venta}')"><i class="fas fa-star fa-custom-size"></i></button> 
                </div>`;
        } else {
            displayArea.innerHTML = 'Error fetching data';
        }
    } else {
        console.error("Element with ID 'grilla-cotizaciones' not found.");
    }
}

document.getElementById('buscar').addEventListener('click', consultarCotizacion);
