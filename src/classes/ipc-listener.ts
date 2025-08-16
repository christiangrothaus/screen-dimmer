import { ipcMain, screen } from 'electron';
import Storage from './storage';
import WindowDimmer from './window-dimmer';

export class IpcListener {
  constructor() {
    this.init();
  }

  init() {
    ipcMain.handle('get-displays', this.getDisplays);

    ipcMain.on('dim-window', (event, { id, opacity }) => {
      WindowDimmer.dimWindow(id, opacity);
    });

    ipcMain.on('save-form', (event, form) => {
      Storage.saveForm(form);
    });

    ipcMain.handle('get-form', Storage.getForm);
  }

  async getDisplays() {
    return await screen.getAllDisplays();
  }
}
