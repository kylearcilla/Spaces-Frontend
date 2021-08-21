import { FC } from "react";

interface HeaderTabProps {
  type: string;
  text: string;
  isClicked: boolean;
  onHandleClick: () => void;
}

const HeaderTab: FC<HeaderTabProps> = ({type, text, isClicked, onHandleClick }) => {
  return (
    <>
      <button
        className={`button clear-button tab-button ${type} ${
          isClicked && "clicked"
        }`}
        onClick={onHandleClick}
      >
        <span className="tab-button-text">{text}</span>
      </button>
    </>
  );
};

export default HeaderTab;
