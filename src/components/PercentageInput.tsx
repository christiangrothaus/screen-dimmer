import useFormValue from '../hooks/useFormValue';
import Label from './Label';

interface PercentageInputProps {
  label: string | number
  name: string
}

const PercentageInput = ({ label, name }: PercentageInputProps) => {
  const { value = 0, setValue } = useFormValue<number>(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(Math.min(100, Math.max(0, Number(newValue))));
  };

  return (
    <div className="input-wrapper">
      <Label name={name}>{label}</Label>
      <input
        value={value}
        name={name}
        id={name}
        type="number"
        min="0"
        max="100"
        step="1"
        onChange={handleChange}
        className="max-w-1/3"
      />
    </div>
  );
};

export default PercentageInput;
