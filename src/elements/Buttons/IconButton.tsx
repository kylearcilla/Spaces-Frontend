import { FC } from "react";

interface IconButtonProps {
  iconName: string;
  type: string;
  onHandleClick: any;
  disabled?: boolean;
}

const IconButton: FC<IconButtonProps> = ({ iconName, onHandleClick, type, disabled = false}) => {
  return (
    <>
      <button className={`button clear-button ${type}`} onClick={onHandleClick} disabled={disabled}>
        <i className={`${iconName} ${type}`}></i>
      </button>
    </>
  );
};

export default IconButton;
