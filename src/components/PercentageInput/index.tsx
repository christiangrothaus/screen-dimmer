import { useRef } from 'react';
import useFormValue from '../../hooks/useFormValue';
import Label from '../Label';
import AdjustmentButton from './AdjustmentButton';

interface PercentageInputProps {
  label: string | number
  name: string
}

const SHIFT_CREMENT_AMOUNT = 5;
const REGULAR_CREMENT_AMOUNT = 1;
const CREMENT_RATE = 250;

const PercentageInput = ({ label, name }: PercentageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isShiftPressed = useRef<boolean>(false);
  const decrementIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const incrementIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { value = 0, setValue } = useFormValue<number>(name);

  const getCrementAmount = () => {
    return isShiftPressed.current ? SHIFT_CREMENT_AMOUNT : REGULAR_CREMENT_AMOUNT;
  };

  const updateValue = (newValue: number) => {
    setValue(Math.min(100, Math.max(0, newValue)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    updateValue(Number(newValue));
  };

  const handleIncrement: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    isShiftPressed.current = e.shiftKey;
    updateValue((inputRef.current?.valueAsNumber || 0) + getCrementAmount());

    incrementIntervalRef.current = setInterval(() => {
      updateValue((inputRef.current?.valueAsNumber || 0) + getCrementAmount());
    }, CREMENT_RATE);
  };

  const handleMouseDownDecrement: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    isShiftPressed.current = e.shiftKey;
    updateValue((inputRef.current?.valueAsNumber || 0) - getCrementAmount());

    decrementIntervalRef.current = setInterval(() => {
      updateValue((inputRef.current?.valueAsNumber || 0) - getCrementAmount());
    }, CREMENT_RATE);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    isShiftPressed.current = e.shiftKey;
  };

  const handleKeyUp: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    isShiftPressed.current = e.shiftKey;
  };

  const handleMouseLeaveDecrement = () => {
    handleMouseUpDecrement();
    isShiftPressed.current = false;
  };

  const handleMouseLeaveIncrement = () => {
    handleMouseUpIncrement();
    isShiftPressed.current = false;
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
        <AdjustmentButton onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} onMouseDown={handleMouseDownDecrement} onMouseUp={handleMouseUpDecrement} onMouseLeave={handleMouseLeaveDecrement}>
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
          className="max-w-1/3 text-center"
        />
        <AdjustmentButton onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} onMouseDown={handleIncrement} onMouseUp={handleMouseUpIncrement} onMouseLeave={handleMouseLeaveIncrement}>
          +
        </AdjustmentButton>
      </div>
    </div>
  );
};

export default PercentageInput;
