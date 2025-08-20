import { app } from 'electron';
import _ from 'lodash';
import { readFileSync, writeFile } from 'original-fs';
import { FormModel } from '../context/FormContext';
import WindowDimmer from './window-dimmer';

const FORM_PATH = '/form.json';

class Storage {
  private static form?: FormModel = undefined;

  static saveForm = _.debounce((form: FormModel) => {
    writeFile(app.getPath('userData') + FORM_PATH, JSON.stringify(form), (err) => {
      if (err) {
        console.error('Error saving form:', err);
      }
    });
  }, 300);

  static getForm(): FormModel {
    if (!Storage.form) {
      return Storage.loadForm();
    }

    return Storage.form;
  }

  private static loadForm(): FormModel {
    try {
      const data = readFileSync(app.getPath('userData') + FORM_PATH, 'utf-8');
      Storage.form = JSON.parse(data);

      if (Storage.form) {
        const cleanedDisplays = Object.entries(Storage.form?.displays || {}).reduce<FormModel['displays']>((acc, [id, display]) => {
          const isExistingScreen = WindowDimmer.getScreenById(Number(id));
          if (isExistingScreen) {
            acc[id] = display;
          }
          return acc;
        }, {});

        Storage.form.displays = cleanedDisplays;
        this.saveForm(Storage.form);
      }
    }
    catch (error) {
      console.error('Error loading form:', error);
    }

    return Storage.form || { displays: {} };
  }
}

export default Storage;
