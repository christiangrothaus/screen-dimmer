interface AdjustmentButtonProps {
  children?: React.ReactNode
  onMouseDown?: () => void
  onMouseUp?: () => void
  onMouseLeave?: () => void
}

const AdjustmentButton = ({ children, onMouseDown, onMouseUp, onMouseLeave }: AdjustmentButtonProps) => {
  return (
    <button
      className="max-h-full aspect-square max-w-fit text-2xl flex justify-center leading-0 items-center"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
};

export default AdjustmentButton;
