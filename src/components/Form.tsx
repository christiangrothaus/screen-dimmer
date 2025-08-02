import useDisplays from '../hooks/useDisplays';
import Display from './Display';

const Form = () => {
  const { displays } = useDisplays();

  if (displays.length === 0) {
    return <div>No displays found.</div>;
  }

  return (
    <div className="flex flex-row flex-wrap gap-4">
      {displays.map(display => (
        <Display
          key={display.id}
          display={display}
        />
      ))}
    </div>
  );
};

export default Form;
