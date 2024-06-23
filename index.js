// URL de la API
const apiUrl = ''; // Dolarapi .com, falta q liberen la segunda etapa del tp

// Hacer una solicitud GET a la API
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Procesar los datos recibidos
        const dataDiv = document.getElementById('data');
        dataDiv.innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud:', error);
    });