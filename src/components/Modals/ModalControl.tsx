import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import {
  SessionsStatsModal,
  SettingsModal,
  TodaySessionsModal,
  YoutubeSettings,
} from "./SideMenuModals";
import {
  FinishSessionModal,
  NewSessionModal,
  RenameModal,
} from "./PomodoroModals";

const ModalControl = () => {
  const { currentModal, setModal, sessionObject } = useContext(GlobalContext);

  const currentModalComponent = () => {
    if (sessionObject?.isFinished) return <FinishSessionModal />;
    switch (currentModal) {
      case "Today's Sessions":
        return <TodaySessionsModal handleCloseModal={() => setModal("")} />;
      case "Session's Stats":
        return <SessionsStatsModal handleCloseModal={() => setModal("")} />;
      case "Youtube Settings":
        return <YoutubeSettings handleCloseModal={() => setModal("")} />;
      case "Settings":
        return <SettingsModal handleCloseModal={() => setModal("")} />;
      case "New Session":
        return <NewSessionModal handleCloseModal={() => setModal("")} />;
      case "Rename Session":
        return <RenameModal handleCloseModal={() => setModal("")} />;
      default:
        return <div></div>;
    }
  };

  return <div>{currentModalComponent()}</div>;
};

export default ModalControl;
