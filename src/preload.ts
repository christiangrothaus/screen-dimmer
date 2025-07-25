import { Display, ipcRenderer } from 'electron';

declare global {
  interface Window {
    api: typeof api
  }
}

const api = {
  getDisplays: async (): Promise<Display[]> => ipcRenderer.invoke('get-displays'),
  dimWindow: (id: number, opacity: number): void => {
    ipcRenderer.send('dim-window', { id, opacity });
  },
};

window.api = api;
