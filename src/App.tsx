import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Form from './components/Form';
import { FormModel, FormProvider } from './context/FormContext';
import './index.css';

const App = () => {
  const [form, setForm] = useState<FormModel>({ displays: {} });

  const setFormWrapped = (form: FormModel) => {
    setForm(form);
    window.api.saveForm(form);
  };

  useEffect(() => {
    Object.entries(form.displays).forEach(([id, { percentage }]) => {
      window.api.dimWindow(Number(id), percentage / 100);
    });
  }, [form]);

  useEffect(() => {
    window.api.getForm().then((retrievedForm) => {
      setForm(retrievedForm);
    });
  }, []);

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl mb-2 font-bold">Screen Dimmer</h1>
      <FormProvider value={{ form, setForm: setFormWrapped }}>
        <Form />
      </FormProvider>
    </div>
  );
};

createRoot(document.getElementById('app') as HTMLElement).render(<App />);
