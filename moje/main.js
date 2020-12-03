const electron = require('electron'); 
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const someFunc = require('./someFunc')

let mainWindow;

app.on('ready',()=>{

  mainWindow = new BrowserWindow({
    height:500,
    width:800,
    webPreferences: {nodeIntegration:true}
  })

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed',()=>{
    mainWindow = null;
  })

ipc.on('klikniecie',()=>{
  const callBack =(param)=>{
mainWindow.webContents.send('feedback',param)
  }

  someFunc();
})


mainWindow.webContents.openDevTools();
})