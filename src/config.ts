import * as path from 'path';
import { BrowserWindowConstructorOptions, MenuItemConstructorOptions, MenuItem, shell } from 'electron';

import { globalShared } from './main';

export const homepage = process.env.MARS_BOX_HOME_PAGE || 'https://fox.mn';

export const window: BrowserWindowConstructorOptions = {
  width: 800,
  height: 600,
  minWidth: 800,
  minHeight: 600,
  autoHideMenuBar: true,
  webPreferences: {
    nodeIntegration: true,
    preload: path.join(__dirname, 'preload.js'),
  },
};

export const trayConfig = {
  toolTip: 'foxmn',
  aboutPage: 'https://fox.mn'
};

export function getTrayMenus(): Array<MenuItemConstructorOptions | MenuItem> {
  return [
    {
      label: '关于',
      click: () => {
        shell.openExternal(trayConfig.aboutPage);
      },
    },
    {
      label: '重新加载',
      role: 'reload',
      // click: () => globalShared.mainWindow.reload(),
    },
    {
      label: '退出',
      role: 'quit',
      // click: () => app.quit(),
    },
  ];
}
