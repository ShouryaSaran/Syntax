import {app,BrowserWindow,ipcMain} from 'electron';
import * as path from 'path';
import { isDev } from './util.js';
import { fileURLToPath } from "url";



app.on("ready" , () =>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false,            
        autoHideMenuBar: true,   
        titleBarStyle: "hidden", 
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
    if(isDev()){
        mainWindow.loadURL('http://localhost:5123');
    }
    else {
        mainWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
    }
    ipcMain.on("window:minimize", () => {
  mainWindow.minimize();
});

ipcMain.on("window:maximize", () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on("window:close", () => {
  mainWindow.close();
});

});



