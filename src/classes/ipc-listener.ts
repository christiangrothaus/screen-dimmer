import { ipcMain, screen } from 'electron';
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
  }

  async getDisplays() {
    return await screen.getAllDisplays();
  }
}
