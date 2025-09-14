interface AdjustmentButtonProps {
  children?: React.ReactNode
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>
  onMouseUp?: React.MouseEventHandler<HTMLButtonElement>
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>
  onKeyUp?: React.KeyboardEventHandler<HTMLButtonElement>
}

const AdjustmentButton = ({ children, onMouseDown, onMouseUp, onMouseLeave, onKeyDown, onKeyUp }: AdjustmentButtonProps) => {
  return (
    <button
      className="max-h-full aspect-square max-w-fit text-2xl flex justify-center leading-0 items-center"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    >
      {children}
    </button>
  );
};

export default AdjustmentButton;
