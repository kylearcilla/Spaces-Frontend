import { FC } from "react";

interface ButtonProps {
  isDisabled?: boolean;
  name: string;
  type: string;
  onHandleClick: (e: any) => void;
}

const Button: FC<ButtonProps> = ({ isDisabled, name, onHandleClick, type }) => {
  return (
    <>
      <button
        disabled={isDisabled}
        onClick={onHandleClick}
        className={`button ${type}`}
      >
        {name}
      </button>
    </>
  );
};

export default Button;
