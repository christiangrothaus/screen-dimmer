interface LabelProps {
  name?: string
  children?: React.ReactNode
}

const Label = ({ children, name }: LabelProps) => {
  return (
    <label htmlFor={name} className="block text-lg mb-2">
      {children}
    </label>
  );
};

export default Label;
