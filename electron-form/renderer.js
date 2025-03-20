const { ipcRenderer } = require('electron');

// Escuchar los datos del backend y mostrarlos en la UI
ipcRenderer.on('manga-data', (event, data) => {
  const mangaList = document.getElementById('manga-list');
  mangaList.innerHTML = '';  // Limpiar lista antes de agregar nuevos datos
  
  data.forEach(manga => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <a href="${manga.link}" target="_blank">${manga.title}</a><br>
      <strong>Autor:</strong> ${manga.author}
    `;
    mangaList.appendChild(listItem);
  });
});