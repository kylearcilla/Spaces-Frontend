import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import PomodoroControls from "./PomodoroControls";
import "../MiddleView.css";
import "./Pomodoro.css";

const PomodoroView = () => {
  const { currentModal, setModal } = useContext(GlobalContext);
  const [pomodoroState, setPomodoroState] = useState({
    hasModal: false,
    isPaused: false,
  });

  useEffect(() => {
    // when a modal is closed, make sure to set everything back to false
    if (currentModal === "" && pomodoroState.hasModal) {
      setPomodoroState((p) => {
        return { ...p, isPaused: false, hasModal: false };
      });
    }
  }, [currentModal, pomodoroState.hasModal]);

  const handleRenameModal = () => {
    setModal("Rename Session");
    setPomodoroState((p) => { return { ...p, hasModal: true }; });
  };
  const handleNewSessionModal = () => {
    setModal("New Session");
    setPomodoroState((p) => { return { ...p, hasModal: true }; });
  };
  const handlePause = (isPaused: boolean) => {
    setPomodoroState((p) => { return { ...p, isPaused }; });
  };

  return (
    <>
      <PomodoroControls
        setModal={() => handleRenameModal()}
        isPaused={pomodoroState.isPaused}
        setIsPaused={(isPaused: boolean) => handlePause(isPaused)}
        newSessionHandler={() => handleNewSessionModal()}
      />
    </>
  );
};

export default PomodoroView;
