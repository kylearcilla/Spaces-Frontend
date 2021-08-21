import { FC, useState } from "react";
import { HeaderTab, Higlighter, WindowModal } from "../../../../elements";
import { ThisWeekSessions, ThisMonthSessions } from "./SessionTypes";
import "./SessionStatsModal.css";

interface SessionsStatsModalProps {
  handleCloseModal: () => void;
}

const SessionsStatsModal: FC<SessionsStatsModalProps> = ({ handleCloseModal }) => {
  const [time, setTime] = useState("This Week");

  return (
    <div>
      <WindowModal
        isShowing={true}
        handleCloseModal={handleCloseModal}
        type="sesions-stats-sessions"
      >
        <div className="sessions-modal">
          <div className="sessions-header">
            <h1 className="sessions-title">{time}</h1>
          </div>
          <div className="sessions-tab-header sessions-stats">
            <HeaderTab
              type="session-tab"
              text={"This Week"}
              isClicked={time === "This Week"}
              onHandleClick={() => setTime("This Week")}
            />
            <HeaderTab
              type="session-tab"
              text={"This Month"}
              isClicked={time === "This Month"}
              onHandleClick={() => setTime("This Month")}
            />
            <Higlighter type={"sessions-stats"} state={time === "This Month"} />
          </div>
          {time === "This Week" ? <ThisWeekSessions /> : <ThisMonthSessions />}
        </div>
      </WindowModal>
    </div>
  );
};

export default SessionsStatsModal;
