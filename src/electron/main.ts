import {app,BrowserWindow} from 'electron';
import * as path from 'path';



app.on("ready" , () =>{
    const mainWindow = new BrowserWindow({});
    mainWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
});
