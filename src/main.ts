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

updateElectronApp({
  updateSource: {
    type: UpdateSourceType.ElectronPublicUpdateService,
    repo: 'christiangrothaus/screen-dimmer',
  },
  updateInterval: '1 hour',
});

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    icon: `${__dirname}/assets/icon.png`,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setTitle('Screen Dimmer');

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.openDevTools();
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
