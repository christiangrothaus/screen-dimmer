import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Form from './components/Form';
import { FormModel, FormProvider } from './context/FormContext';
import useDisplays from './hooks/useDisplays';
import './index.css';

const App = () => {
  const { displays } = useDisplays();
  const [form, setForm] = useState<FormModel>({ displays: {} });

  useEffect(() => {
    if (form.displays) {
      Object.entries(form.displays).forEach(([id, { percentage }]) => {
        window.api.dimWindow(Number(id), percentage / 100);
      });
    }
  }, [form]);

  useEffect(() => {
    if (displays.length > 0) {
      if (!Object.keys(form.displays).length) {
        setForm({ displays: displays.reduce((acc, display) => {
          acc[display.id] = { percentage: 0 }; // Default percentage for each display
          return acc;
        }, {} as FormModel['displays']) });
      }
    }
  }, [displays, form.displays]);

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl mb-2 font-bold">Screen Dimmer</h1>
      <FormProvider value={{ form, setForm }}>
        <Form />
      </FormProvider>
    </div>
  );
};

createRoot(document.getElementById('app') as HTMLElement).render(<App />);
