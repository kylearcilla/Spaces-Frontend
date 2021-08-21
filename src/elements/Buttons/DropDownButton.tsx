import { FC } from "react";

interface ButtonProps {
  name: string;
  type: string;
  onHandleClick?: () => void;
  isClicked: boolean;
  isDisabled?: boolean;
}

const DropDownButton: FC<ButtonProps> = ({ name, type, onHandleClick, isClicked, isDisabled }) => {
  return (
    <>
      <button
        onClick={onHandleClick}
        className={`button drop-down-button ${isClicked} ${type}`}
        disabled={isDisabled}
      >
        <span className="drop-down-button-text">{name}</span>
        <i className="fas fa-caret-left"></i>
      </button>
    </>
  );
};

export default DropDownButton;
