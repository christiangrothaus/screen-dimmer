import { createContext } from 'react';

export interface FormModel {
  displays: {
    [id: string]: {
      percentage: number
    }
  }
  [key: string]: any
}

interface FormContextModel {
  form: FormModel
  setForm: (form: FormModel) => void
}

export const FormContext = createContext<FormContextModel>({
  form: { displays: {} },
  setForm: () => {},
});

interface FormProviderProps {
  children: React.ReactNode
  value: { form: FormModel, setForm: (form: FormModel) => void }
};

export const FormProvider = ({ children, value }: FormProviderProps) => {
  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};
