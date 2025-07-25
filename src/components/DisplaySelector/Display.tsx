import { Display as ElectronDisplay } from 'electron';
import { useContext } from 'react';
import { SelectedDisplayContext } from '../../context/SelectedDisplayContext';

interface DisplayProps {
  display: ElectronDisplay
}

const Display = ({ display }: DisplayProps) => {
  const { display: selectedDisplay, setSelectedDisplay } = useContext(SelectedDisplayContext);

  const isSelected = selectedDisplay?.id === display.id;

  return (
    <>
      <button
        className={`${isSelected ? '!bg-blue-500' : ''}`}
        onClick={() => setSelectedDisplay(display)}
      >
        {display.label || display.id}
      </button>
    </>
  );
};

export default Display;
