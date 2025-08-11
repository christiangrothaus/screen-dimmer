import { app, BrowserWindow } from 'electron';
import electronSquirrelStartup from 'electron-squirrel-startup';
import { updateElectronApp, UpdateSourceType } from 'update-electron-app';
import { IpcListener } from './classes/ipc-listener';

// This get added by Electorn Forge
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (electronSquirrelStartup) {
  app.quit();
}

export let mainWindow: BrowserWindow | null = null;

updateElectronApp({
  updateSource: {
    type: UpdateSourceType.ElectronPublicUpdateService,
    repo: 'christiangrothaus/screen-dimmer',
  },
  updateInterval: '1 hour',
});

const createWindow = () => {
  const window = new BrowserWindow({
    icon: `${__dirname}/assets/icon.png`,
    width: 840,
    height: 420,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  window.setMenuBarVisibility(false);
  window.setTitle('Screen Dimmer');

  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow = window;

  if (process.env.NODE_ENV === 'development') {
    window.webContents.on('did-finish-load', () => {
      window.webContents.openDevTools();
    });
  }
};

app.whenReady().then(() => {
  new IpcListener();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
