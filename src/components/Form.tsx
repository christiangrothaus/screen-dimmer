import { useContext } from 'react';
import { SelectedDisplayContext } from '../context/SelectedDisplayContext';
import DisplaySelector from './DisplaySelector';
import PercentageInput from './PercentageInput';

const Form = () => {
  const { display } = useContext(SelectedDisplayContext);

  return (
    <div>
      <DisplaySelector />
      <PercentageInput label="Dim Percentage" name={`displays.${display?.id}.percentage`} />
    </div>
  );
};

export default Form;
