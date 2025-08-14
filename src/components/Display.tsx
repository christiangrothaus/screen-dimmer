import PercentageInput from './PercentageInput';

interface DisplayProps {
  display: Electron.Display
};

const Display = ({ display }: DisplayProps) => {
  return (
    <div className="drop-shadow-zinc-950 drop-shadow bg-zinc-850 p-4 rounded-md flex flex-col gap-2 items-center min-w-(grid-min-width)">
      <PercentageInput label={display.label || display.id} name={`displays.${display.id}.percentage`} />
    </div>
  );
};

export default Display;
