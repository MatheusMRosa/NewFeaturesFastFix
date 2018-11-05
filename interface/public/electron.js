const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const nativeImage = electron.nativeImage;

let newIcon = nativeImage.createFromPath(path.join(__dirname, './src', 'config', 'images', 'logoFavicon.png'));


let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width: 1366, height: 768, icon:newIcon});
    mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});