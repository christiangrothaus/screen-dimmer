import { useRef } from 'react';
import useFormValue from '../../hooks/useFormValue';
import Label from '../Label';
import AdjustmentButton from './AdjustmentButton';

interface PercentageInputProps {
  label: string | number
  name: string
}

const PercentageInput = ({ label, name }: PercentageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const decrementIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const incrementIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { value = 0, setValue } = useFormValue<number>(name);

  const updateValue = (newValue: number) => {
    setValue(Math.min(100, Math.max(0, newValue)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    updateValue(Number(newValue));
  };

  const handleIncrement = () => {
    updateValue((inputRef.current?.valueAsNumber || 0) + 1);

    incrementIntervalRef.current = setInterval(() => {
      updateValue((inputRef.current?.valueAsNumber || 0) + 1);
    }, 100);
  };

  const handleMouseDownDecrement = () => {
    updateValue((inputRef.current?.valueAsNumber || 0) - 1);

    decrementIntervalRef.current = setInterval(() => {
      updateValue((inputRef.current?.valueAsNumber || 0) - 1);
    }, 100);
  };

  const handleMouseUpDecrement = () => {
    if (decrementIntervalRef.current) clearInterval(decrementIntervalRef.current);
  };

  const handleMouseUpIncrement = () => {
    if (incrementIntervalRef.current) clearInterval(incrementIntervalRef.current);
  };

  return (
    <div className="input-wrapper">
      <Label name={name}>{label}</Label>
      <div className="flex w-full justify-center gap-2">
        <AdjustmentButton onMouseDown={handleMouseDownDecrement} onMouseUp={handleMouseUpDecrement} onMouseLeave={handleMouseUpDecrement}>
          -
        </AdjustmentButton>
        <input
          ref={inputRef}
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
        <AdjustmentButton onMouseDown={handleIncrement} onMouseUp={handleMouseUpIncrement} onMouseLeave={handleMouseUpIncrement}>
          +
        </AdjustmentButton>
      </div>
    </div>
  );
};

export default PercentageInput;
