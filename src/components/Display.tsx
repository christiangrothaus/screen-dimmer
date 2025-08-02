import PercentageInput from './PercentageInput';

interface DisplayProps {
  display: Electron.Display
};

const Display = ({ display }: DisplayProps) => {
  return (
    <div className="border-2 p-4 rounded-md flex flex-col gap-2 items-center min-w-64">
      <PercentageInput label={display.label || display.id} name={`displays.${display.id}.percentage`} />
    </div>
  );
};

export default Display;
