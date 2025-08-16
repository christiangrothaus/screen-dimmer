import { Display, ipcRenderer } from 'electron';
import { FormModel } from './context/FormContext';

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
  saveForm: (form: FormModel): void => {
    ipcRenderer.send('save-form', form);
  },
  getForm: async (): Promise<FormModel> => ipcRenderer.invoke('get-form'),
};

window.api = api;
