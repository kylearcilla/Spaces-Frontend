import { FC, useContext, useEffect, useState } from "react";
import { WindowModal } from "../../../../elements";
import { displayTodaySession } from "../../../../utils";
import { TodayDisplay } from "./SessionsDisplay";

import "./TodaySessionsModal";
import "../SideMenuModals.css";
import "./TodaySessions.css";
import { GlobalContext } from "../../../../context/GlobalState";

interface TodaySessionsModalInterface {
  handleCloseModal: () => void;
}

const TodaySessionsModal: FC<TodaySessionsModalInterface> = ({handleCloseModal}) => {
  const [sessions, setSessions] = useState<any>();
  const [hasError, setError] = useState(false);
  const { user, appToken } = useContext(GlobalContext);
  useEffect(() => getUserSessionForToday() , []);

  function getUserSessionForToday() {
    displayTodaySession(user!.googleEmail, appToken!).then((data) => {
      if (data.error) { setError(true); return; }
      if (!data) return;
      setSessions(() => {
        return {
          length: data.sessionsLength,
          data: data.sessionsData,
        };
      });
    });
  }

  return (
    <div>
      <WindowModal isShowing={true} handleCloseModal={handleCloseModal} type="today-sessions">
        <div className="sessions-modal">
          <div className="sessions-header">
            <h1 className="sessions-title">Today's Sessions</h1>
            <h3 className="sessions-subtitle">
              {!hasError && sessions && `${sessions?.data?.size} ${sessions?.data?.size !== 1 ? "sessions" : "session"}`}
            </h3>
          </div>
          {hasError && <span className="error-message">Sessions could not be fetched.</span>}
          {!hasError && sessions?.data?.size !== 0 ? <TodayDisplay sessions={sessions?.data}/> : <span className="sessions-subtitle">No Sessions For Today</span>}
        </div>
      </WindowModal>
    </div>
  );
};
export default TodaySessionsModal;
