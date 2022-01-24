import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;


  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 800,//size.width,
    height: 800,//size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run e2e test with Spectron
      webSecurity: false,
    },
  });


  if (serve) {
    win.webContents.openDevTools();
    require('electron-reload')(__dirname, {
      electron: require(path.join(__dirname, '/../node_modules/electron'))
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.webContents.openDevTools();
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
       // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    win.loadURL(url.format({
      pathname: path.join(__dirname, pathIndex),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}
var SerialService = require('./serialPort');
var LedControllService = require('./ledControl');
var serialService;
var ledControllService;
try{

  ipcMain.handle('init', async (event, ...args) => {
    serialService = new SerialService({portName: args[0]})
    ledControllService = new LedControllService(serialService)
  })

  ipcMain.handle('getLedsGroupedByColor', async (event, ...args) => {
    let r = ledControllService.getLedsGroupedByColor(args[0]);
    return r;
  })

  ipcMain.handle('setLeds', async (event, ...args) => {
    ledControllService.setLeds(args[0],args[1]);
  })

  ipcMain.handle('setLed', async (event, ...args) => {
    ledControllService.setLed(args[0],args[1]);
  })

  ipcMain.handle('getLeds', async (event, ...args) => {
    ledControllService.getLeds(args[0]);
  })

}catch(e){

}

try {

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  event.preventDefault();
  callback(true);
});
  app.on('ready', () => setTimeout(createWindow, 400));
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
}
