import { cloneDeep, toPath } from 'lodash'; // Assuming you have a utility function to convert names to paths
import { useContext } from 'react';
import { FormContext } from '../context/FormContext';

interface UseFormValueReturn<T> {
  value: T
  setValue: (newValue: T) => void
}

const useFormValue = <T,>(name: string): UseFormValueReturn<T> => {
  const { form, setForm } = useContext(FormContext);

  const valuePath = toPath(name);
  const value = valuePath.reduce((acc, key) => acc && acc[key], form) as T;
  console.log(value);

  const setValue = (newValue: T) => {
    const updatedForm = cloneDeep(form);
    let current = updatedForm;

    valuePath.forEach((key, idx) => {
      if (idx === valuePath.length - 1) {
        current[key] = newValue; // Set the new value at the end of the path
      }
      else {
        current = current[key]; // Move deeper into the object
      }
    });

    setForm(updatedForm);
  };

  return {
    value,
    setValue,
  };
};

export default useFormValue;
