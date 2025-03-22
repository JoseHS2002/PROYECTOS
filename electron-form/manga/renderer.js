const { ipcRenderer } = require('electron');
const axios = require('axios');
const cheerio = require('cheerio');

document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Cargando...';

    try {
        // Paso 1: Obtener la página de títulos
const titlesResponse = await axios.get('https://mangaplus.shueisha.co.jp/titles');
const $ = cheerio.load(titlesResponse.data);

// Paso 2: Buscar el manga en la lista
const mangaLink = $(`a:contains(${query})`).attr('href'); // Asegúrate de que el selector sea correcto

if (mangaLink) {
    // Paso 3: Acceder a la página del manga
    const mangaResponse = await axios.get(mangaLink);
    const mangaPage = cheerio.load(mangaResponse.data);

    // Paso 4: Extraer la información del manga
    const mangaName = mangaPage('.TitleDetailHeader-module_title_Iy33M').text();
    const mangaArgument = mangaPage('.TitleDetailHeader-module_overview_32fOi').text(); // Cambia esto por el selector correcto
    const nextRelease = mangaPage('.TitleDetail-module_updateHeader_Ku5ec').text(); // Cambia esto por el selector correcto

    resultDiv.innerHTML = `
        <h2>${mangaName}</h2>
        <p>Argumento: ${mangaArgument}</p>
        <p>Próximo lanzamiento: ${nextRelease}</p>
    `;
} else {
    resultDiv.innerHTML = 'Manga no encontrado.';
}
    } catch (error) {
        resultDiv.innerHTML = 'Error al cargar los datos.';
        console.error(error);
    }
});
