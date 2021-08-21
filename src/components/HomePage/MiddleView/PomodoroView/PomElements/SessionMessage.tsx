import { FC, useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import "./PomElements.css";

interface SessionMessageProps {
  isPaused: boolean;
  hasJustFinished: boolean;
  continueToNextPeriod: () => void;
}

const SessionMessage: FC<SessionMessageProps> = (props) => {
  const { sessionObject, isLeftBarClicked: isLeft, isRightBarClicked: isRight } = useContext(GlobalContext);

  const notInSessionMessage = (
    <div className="not-in-session-message">Press Continue...</div>
  );
  const leftRightBarStatus = () => {
    const string = `${isLeft ? "isLeftClicked" : "notLeftClicked"} ${isRight ? "isRightClicked" : "notRightClicked"}`;
    return string;
  };
  const inSessionMessage = (
    <div>
      {sessionObject?.currentPeriod === "study"
        ? props.isPaused
          ? "Paused..."
          : "Grinding..."
        : props.isPaused
        ? "Break Paused..."
        : "On Break ..."}
    </div>
  );

  return (
    <span className={`pom-details session-message ${leftRightBarStatus()}`}>
      {sessionObject?.isFinished
        ? "...finishing"
        : props.hasJustFinished
        ? notInSessionMessage
        : inSessionMessage}
    </span>
  );
};

export default SessionMessage;
