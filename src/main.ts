// 引入electron并创建一个Browserwindow
import {
  app,
  BrowserWindow,
  Tray,
  Menu,
  shell,
  MenuItemConstructorOptions,
  MenuItem,
  Event
} from "electron";
import * as path from "path";
import * as url from "url";
import { window as windowConfig, trayConfig, homepage } from "./config";
// import { createTray } from './tray';
import * as electron from "electron";
// import { registerIpcMainEvent } from './ipcmainEvent';
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.

interface GlobalShared {
  mainWindow: BrowserWindow;
  tray: Tray;
}

export let globalShared: GlobalShared = {
  mainWindow: null,
  tray: null
};

function createWindow() {
  globalShared.mainWindow = new BrowserWindow({
    ...windowConfig
  });

  globalShared.mainWindow.loadURL(homepage);

  /**
   *
   * https://electronjs.org/docs/api/browser-window#event-close
   *
   */

  (globalShared.mainWindow as any).onbeforeunload = (e: Event) => {
    // nerver run here
    console.log("I do not want to be closed");

    if (globalShared.mainWindow.isMaximized()) {
    } else {
      if (process.platform === "darwin") {
        event.preventDefault();
        globalShared.mainWindow.minimize();
      } else {
        globalShared.mainWindow.hide();
        globalShared.mainWindow.setSkipTaskbar(true);
        event.preventDefault();
      }
    }
    // application.
    e.returnValue = false; // equivalent to `return false` but not recommended
    return false;
  };

  // 关闭window时触发下列事件.
  globalShared.mainWindow.on("closed", (e: Event) => {
    // second run here
    console.log("onclosed <-----------------");
    
  });

  // this  also cannot effect
  // (globalShared.mainWindow as any).addListener("beforeunload", (e: Event) => {

  //   globalShared.mainWindow.hide();
  //   globalShared.mainWindow.setSkipTaskbar(true);
  //   e.preventDefault();
  //   e.returnValue = false;
  //   return false;
  // })
}



app.on("ready", () => {
  // createTray();
  createWindow();
  // registerIpcMainEvent();
});

app.on("window-all-closed", (e: Event) => {
  // always first run here
  console.log("all-window closed");
});

app.on("activate", function() {
  if (globalShared.mainWindow === null) {
    createWindow();
  }
});
