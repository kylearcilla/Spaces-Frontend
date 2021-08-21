import { FC, useState, useContext } from "react";
import PomodoroTimer from "./PomodoroTimer";
import { DropDownMenu } from "../../../../elements";
import { GlobalContext } from "../../../../context/GlobalState";
import "./Pomodoro.css";

interface PomodoroProps {
  setModal: () => void;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
  newSessionHandler: () => void;
}

const Pomodoro: FC<PomodoroProps> = ({ setModal, isPaused, setIsPaused, newSessionHandler }) => {
  const [isMenuClicked, setMenu] = useState(false);
  const {sessionObject, finishPeriod, updateSession, finishSession, deleteSession, } = useContext(GlobalContext);

  const options = ["Pause Timer", "Finish Session", "Rename", "Delete Session"];
  options[0] = isPaused ? "Continue" : "Pause Timer";

  const getPeriod = () => {
    if (!sessionObject) return 0;
    return sessionObject.currentPeriod === "study"  ? sessionObject.pomodoroPeriod : sessionObject.breakPeriod;
  };
  const continueToNextPeriod = () => {
    setIsPaused(false);
    updateSession({...sessionObject!, isJustFinishedPeriod: false });
  };
  const handlePomMenuClicked = (event: any): void => {
    event.preventDefault();
    setMenu(false);
    switch (event.target.outerText) {
      case options[0]:
        if (sessionObject?.isJustFinishedPeriod) continueToNextPeriod();
        setIsPaused(!isPaused);
        break;
      case options[1]:
        finishSession();
        setIsPaused(true);
        break;
      case options[2]:
        setModal();
        setIsPaused(true);
        break;
      default:
        setIsPaused(true);
        deleteSession();
        break;
    }
  };

  return (
      <div className={`pomodoro ${sessionObject !== null}`}>
        <PomodoroTimer
          isPaused={isPaused}
          isInSession={sessionObject ? true : false}
          handleFinishPeriod={() => { finishPeriod(); setIsPaused(true); }}
          handleMenuClicked={() => (setMenu(!isMenuClicked))}
          continueToNextPeriod={continueToNextPeriod}
          newSessionHandler={newSessionHandler}
          period={getPeriod()}
        />
        <DropDownMenu
          type="pomodoro-menu"
          isShowing={isMenuClicked}
          options={options}
          handlePomMenuClicked={handlePomMenuClicked}
        />
      </div>
  );
};

export default Pomodoro;
