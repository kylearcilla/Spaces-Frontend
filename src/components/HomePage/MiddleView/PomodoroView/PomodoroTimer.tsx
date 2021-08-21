import { useState, useEffect, useContext, FC } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import ProgressBar from "../../../../elements/Bars/ProgressBar";
import SessionMessage from "./PomElements/SessionMessage";
import PomIconButton from "./PomElements/PomIconButton";
import "../../../../elements/Buttons/Buttons.css";

type PomodoroInterface = {
  isPaused: boolean;
  isInSession: boolean;
  handleMenuClicked: () => void;
  handleFinishPeriod: () => void;
  continueToNextPeriod: () => void;
  newSessionHandler: () => void;
  period: number
};

const PomodoroTimer: FC<PomodoroInterface> = (props) => {
  const [isPaused, setPaused] = useState(props.isPaused);
  const [finished, setFinished] = useState(props.isPaused);
  const { sessionObject, updateSession, isLeftBarClicked: isLeft, isRightBarClicked: isRight } = useContext(GlobalContext);

  const progress = () => {
    if (!props.isInSession || !sessionObject) return 0;
    const percentage =
      (sessionObject.currentTime.minutes * 60 + sessionObject.currentTime.seconds) / (props.period * 60);
    return percentage;
  };
  const checkCurrentTime = () => {
    if (!props.isInSession || !sessionObject) return "--";
    const currTimeDisplay = `${sessionObject.currentTime.minutes}:${
      sessionObject.currentTime.seconds < 10 ? "0" : ""
    }${sessionObject.currentTime.seconds}`;
    return currTimeDisplay;
  };
  const leftRightBarStatus = () => {
    return `${isLeft ? "isLeftClicked": "" } ${isRight ? "isRightClicked": "" }`;
  }

  useEffect(() => {
    setPaused(props.isPaused);
    let interval: ReturnType<typeof setTimeout>;

    if (sessionObject && props.isInSession && !isPaused && !sessionObject.isFinished) {
      interval = setInterval(() => {
        const updatedSession = sessionObject;
        if (sessionObject.currentTime.minutes === props.period) {
          sessionObject.currentTime.minutes = 0;
          sessionObject.currentTime.seconds = 0;

          props.handleFinishPeriod();
          setFinished(true);
          setPaused(true);
        } else if (sessionObject.currentTime.seconds === 59) {
          sessionObject.currentTime.minutes = sessionObject.currentTime.minutes + 1;
          sessionObject.currentTime.seconds = 0;

          updateSession({ ...sessionObject, ...updatedSession});
        } else if (sessionObject.currentTime.seconds <= 58) {
          sessionObject.currentTime.seconds = sessionObject.currentTime.seconds + 1;

          updateSession({ ...sessionObject,  ...updatedSession, });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [finished, isPaused, sessionObject, props.isPaused]);

  return (
    <div className="pomodoro-container">
      <div className="pomodoro-session-details-container">
        <PomIconButton
          newSessionHandler={props.newSessionHandler}
          isInSession={props.isInSession}
          continueToNextPeriod={props.continueToNextPeriod}
        />
        <span className={`pom-details session-name ${props.isInSession} ${leftRightBarStatus()}`}>
          {sessionObject?.sessionName ?? "Start a New Session"}
        </span>
        {sessionObject && 
          <span className={`pom-details session-cycle ${leftRightBarStatus()}`}>
            {sessionObject.currentCycle + "/" + sessionObject.cycles}
          </span>
        }
      </div>
      {sessionObject && (
        <div className="pomodoro-message-container">
          <SessionMessage
            isPaused={isPaused}
            hasJustFinished={sessionObject.isJustFinishedPeriod}
            continueToNextPeriod={props.continueToNextPeriod}
          />
        </div>
      )}
      <div className={`pomodoro-progress-bar-container ${sessionObject !== null} ${props.isInSession}`}>
        <ProgressBar
          isInSession={props.isInSession} percent={progress()} color={sessionObject ? "ff8b9c" : "09090A"}
          currentPeriod={sessionObject?.currentPeriod}
          sessionObject={sessionObject!}
          checkCurrentTime={checkCurrentTime}
          period={props.period}
          handleMenuClicked={props.handleMenuClicked}
        />
      </div>
    </div>
  );
};

export default PomodoroTimer;
