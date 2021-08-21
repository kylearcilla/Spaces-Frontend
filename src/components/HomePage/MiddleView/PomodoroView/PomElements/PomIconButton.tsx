import { FC, useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import "./PomElements.css";

interface PomIconProps {
  isInSession?: boolean;
  continueToNextPeriod: () => void;
  newSessionHandler: () => void;
}

const PomIconButton: FC<PomIconProps> = ({ isInSession, continueToNextPeriod, newSessionHandler }) => {
  const { sessionObject } = useContext(GlobalContext);

  const pomIconType = () => {
    if (!sessionObject) return "fa-book pom";
    if (sessionObject.isJustFinishedPeriod) return "fa-arrow-right";
    return sessionObject.currentPeriod === "break" ? "fa-mug-hot pom" : "fa-book pom";
  };
  const buttonType = () => {
    if (!isInSession) return "false";
    if (sessionObject?.isJustFinishedPeriod) return "continue";
    return sessionObject?.currentPeriod === "break" ? "break" : "studying";
  };
  const handleClick = () => {
    if (!isInSession) {
      newSessionHandler();
      return;
    }
    continueToNextPeriod();
  };

  return (
    <>
      <button onClick={() => handleClick()} className={`button pom-icon-button ${buttonType()}`}>
        <i className={`fas ${pomIconType()}`}></i>
        <i className={`fas fa-plus pom-icon-button ${isInSession}`}></i>
      </button>
    </>
  );
};

export default PomIconButton;
