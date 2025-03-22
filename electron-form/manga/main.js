const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: __dirname + '/renderer.js',
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);
