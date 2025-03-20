const { ipcRenderer } = require('electron');

document.getElementById('buscar').addEventListener('click', async () => {
  const tipoBusqueda = document.querySelector('input[name="tipo"]:checked').value;
  const valorBusqueda = document.getElementById('valor').value;

  if (valorBusqueda) {
    const resultado = await ipcRenderer.invoke('hacer-scraping', tipoBusqueda, valorBusqueda);

    let output = '';
    if (tipoBusqueda === 'autor') {
      output = resultado.length > 0
        ? `<ul>${resultado.map(manga => `<li>${manga}</li>`).join('')}</ul>`
        : 'No se encontraron mangas para ese autor.';
    } else if (tipoBusqueda === 'titulo') {
      if (resultado.titulo) {
        output = `
          <h3>${resultado.titulo}</h3>
          <p><strong>Argumento:</strong> ${resultado.argumento}</p>
          <p><strong>Fecha de Lanzamiento:</strong> ${resultado.fechaLanzamiento}</p>
        `;
      } else {
        output = 'No se encontró manga con ese título.';
      }
    }

    document.getElementById('resultado').innerHTML = output;
  } else {
    alert('Por favor, ingresa un valor para buscar.');
  }
});