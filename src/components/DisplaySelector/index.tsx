import useDisplays from '../../hooks/useDisplays';
import Label from '../Label';
import Display from './Display';

const DisplaySelector = () => {
  const { displays } = useDisplays();

  return (
    <div className="input-wrapper">
      <Label>Select Display</Label>
      <fieldset>
        {displays.map(display => (
          <Display key={display.id} display={display} />
        ))}
      </fieldset>
    </div>
  );
};

export default DisplaySelector;
