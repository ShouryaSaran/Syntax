console.log("✅ PRELOAD FILE IS RUNNING");


import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  minimize: () => ipcRenderer.send("window:minimize"),
  maximize: () => ipcRenderer.send("window:maximize"),
  close: () => ipcRenderer.send("window:close"),
});
