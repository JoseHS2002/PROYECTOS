const { app, BrowserWindow } = require('electron');
const puppeteer = require('puppeteer');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL('data:text/html,<h1>Cargando...</h1>'); // Simple para mostrar mientras cargamos Puppeteer.

  scrapePage();
}

async function scrapePage() {
  try {
    // Lanzamos Puppeteer para realizar el scraping
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://mangaplus.shueisha.co.jp/updates');
    
    // Esperamos a que se cargue el contenido necesario
    await page.waitForSelector('.manga-list'); // Cambia este selector dependiendo del contenido que quieres capturar
    
    // Extraemos los datos (título y autor)
    const data = await page.evaluate(() => {
      const mangaElements = document.querySelectorAll('.manga-item'); // Cambia esto al selector correcto
      const mangaList = [];
      
      mangaElements.forEach(manga => {
        const title = manga.querySelector('.manga-title').innerText; // Selector de título
        const author = manga.querySelector('.manga-author') ? manga.querySelector('.manga-author').innerText : 'Desconocido'; // Selector de autor
        const link = manga.querySelector('a').href;
        mangaList.push({ title, author, link });
      });

      return mangaList;
    });

    // Enviar los datos extraídos al front-end
    mainWindow.webContents.send('manga-data', data);

    // Cerramos el navegador de Puppeteer
    await browser.close();
  } catch (error) {
    console.error('Error en el scraping:', error);
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
