const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
require('v8-compile-cache')

function createWindow() {

    // Create the browser window.     
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            spellcheck: true
        },
        show: false,
    })

    win.maximize()
    win.menuBarVisible = false

    // and load the index.html of the app.     
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.on('closed', function () {
        mainWindow = null
    })
}

app.commandLine.appendSwitch('js-flags', '--max-old-space-size=8192');

app.on('ready', createWindow)