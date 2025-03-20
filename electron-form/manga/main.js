const { app, BrowserWindow, ipcMain } = require('electron');
const puppeteer = require('puppeteer');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'), // Conectar con el renderer.js
      nodeIntegration: true
    }
  });

  win.loadFile('src/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Lógica para hacer scraping y devolver resultados
ipcMain.handle('hacer-scraping', async (event, tipoBusqueda, valor) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://mangaplus.shueisha.co.jp/updates');

  let resultado;

  if (tipoBusqueda === 'autor') {
    resultado = await page.evaluate((valor) => {
      let mangas = [];
      const items = document.querySelectorAll('.update-item');
      items.forEach((item) => {
        const autor = item.querySelector('.author').textContent.trim();
        if (autor.toLowerCase().includes(valor.toLowerCase())) {
          const titulo = item.querySelector('.title').textContent.trim();
          mangas.push(titulo);
        }
      });
      return mangas;
    }, valor);
  } else if (tipoBusqueda === 'titulo') {
    resultado = await page.evaluate((valor) => {
      let detalleManga = {};
      const items = document.querySelectorAll('.update-item');
      items.forEach((item) => {
        const titulo = item.querySelector('.title').textContent.trim();
        if (titulo.toLowerCase() === valor.toLowerCase()) {
          const argumento = item.querySelector('.synopsis').textContent.trim();
          const fechaLanzamiento = item.querySelector('.date').textContent.trim();
          detalleManga = { titulo, argumento, fechaLanzamiento };
        }
      });
      return detalleManga;
    }, valor);
  }

  await browser.close();
  return resultado;
});