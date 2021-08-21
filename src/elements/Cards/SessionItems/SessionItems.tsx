import { FC } from "react";
import moment from "moment";
import "./MenuSubItems.css";

// for today's sessions
export const SessionItem: FC<{ session: any }> = ({ session }) => {
  return (
    <div className="session-item-container">
      <h1 className="session-item-title">{session.name}</h1>
      <h3 className="session-item-subtitle">{session.time_period}</h3>
      <div className="session-item-bottom-details">
        <span className="session-item-pom-details">{`${session.pomodoro_period} min × ${session.cycles}`}</span>
        <span className="session-item-medal">{session.score}</span>
      </div>
    </div>
  );
};

// for this week's sessions
export const SmallSessionItem: FC<{ session: any }> = ({ session }) => {
  return (
    <div className="session-item-container small">
      <div className="session-item-bottom-details small">
        <span className="session-item-pom-details small">{`${session.pomodoro_period} min × ${session.cycles}`}</span>
        <span className="session-item-medal small">{session.score}</span>
      </div>
      <h1 className="session-item-title small">{session.name}</h1>
      <h3 className="session-item-subtitle small">{session.time_period}</h3>
    </div>
  );
};

// for this month's sessions
export const SmallerSessionItem: FC<{session: any}> = ({ session }) => {
  return (
    <div className="session-item-container small smaller">
      <div className="session-item-bottom-details small smaller">
        <span className="session-item-pom-details small smaller">{`${session.pomodoro_period} min × ${session.cycles}`}</span>
        <span className="session-item-medal small smaller">{session.score}</span>
      </div>
      <h1 className="session-item-title small smaller">{session.name}</h1>
      <div className="session-item-details small smaller">
        <span className="session-item-weekly-day">{moment(session.date_created).format('ddd')}</span>
        <span className="session-item-weekly-time">{moment(session.date_created).format('h A')}</span>
      </div>
    </div>
  );
};
