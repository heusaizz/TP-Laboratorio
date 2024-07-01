function getFavoriteQuotes() {
    const favoritesData = localStorage.getItem('favoritos');
    return favoritesData ? JSON.parse(favoritesData) : [];
}
function formatFavoriteQuotesForEmail(favorites) {
    let formattedData = '';
    favorites.forEach(quote => {
        formattedData += `Nombre: ${quote.nombre}\n`;
        formattedData += `Fecha: ${quote.fecha}\n`;
        formattedData += `Compra: ${quote.compra}\n`;
        formattedData += `Venta: ${quote.venta}\n`;
        formattedData += '---\n';
    });
    return formattedData;
}

document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        const favoriteQuotes = getFavoriteQuotes();
        const formattedQuotes = formatFavoriteQuotesForEmail(favoriteQuotes);

        document.getElementById('user_quotes').value = formattedQuotes

        btn.value = 'Sending...';

        const serviceID = 'default_service';//
        const templateID = 'template_zhqn7oi';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Send Email';
                alert('Sent!');
            }, (err) => {
                btn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
    });

    const btn = document.getElementById('button');
document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();
        btn.value = 'Sending...';
        sendEmail();
    });

function showPopup() {
    document.getElementById('emailPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('emailPopup').style.display = 'none';
}

document.getElementById('share-btn').addEventListener('click', showPopup);