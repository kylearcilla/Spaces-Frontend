import { displayMonthSessions, displayWeekSessions } from "../../../../utils";
import { SmallerSessionItem, SmallSessionItem } from "../../../../elements";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../../context/GlobalState";

export const ThisWeekSessions = () => {
  const [sessions, setSessions] = useState<any>();
  const [hasError, setError] = useState(false);
  const { user, appToken } = useContext(GlobalContext);
  useEffect(() => getUserSessionForToday(), []);
  
  function getUserSessionForToday() {
    displayWeekSessions(user!.googleEmail, appToken!).then((data: any) => {
      if (data.error) { setError(true); return; }
      setSessions(() => {
        return {
          length: data.sessionsLength,
          data: data.sessionsData,
        };
      });
    });
  }

  return (
    <div className="sessions-container">
      {hasError && <span className="error-message">Sessions could not be fetched.</span>}
      {!hasError && sessions && [...sessions.data.keys()].map((day: string) => {
        return (
          <div className="sessions time-container">
            <h3 className="sessions-time-title small">{day}</h3>
            <div className="sessions sessions-grid small">
              {sessions.data.get(day).length > 0 ? sessions.data.get(day).map((session: any) => (
                <SmallSessionItem key={session.id} session={session} />
              )) : <span className="empty-session">-</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const ThisMonthSessions = () => {
  const [sessions, setSessions] = useState<any>();
  const [hasError, setError] = useState(false);
  const { user, appToken } = useContext(GlobalContext);
  useEffect(() =>  getUserSessionForMonth(), []);

  function getUserSessionForMonth() {
    displayMonthSessions(user!.googleEmail, appToken!).then((data: any) => {
      if (data.error) { setError(true); return; }
      setSessions(() => {
        return {
          length: data.sessionsLength,
          weekCount: data.weekCount,
          data: data.sessionsData,
        };
      });
    });
  }
  let count = sessions ? sessions.weekCount : 0;

  return (
    <div className="error-message sessions-container">
      {hasError && <span className="error-message">Sessions could not be fetched.</span>}
      {!hasError && sessions && [...sessions.data.keys()].map((week: string) => {
        return (
          <div className="sessions time-container">
            <div className="sessions time-container-header">
              <h3 className="sessions-time-title small weekly week">{`Week ${count--}`}</h3>
              <h3 className="sessions-time-title small weekly period">{week}</h3>
            </div>
            <div className="divider session-stats-weekly"></div>
            <div className="sessions sessions-grid small weekly">
              {sessions.data.get(week).length > 0 ? sessions.data.get(week).map((session: any) => (
                <SmallerSessionItem key={session.id} session={session} />
              )) : <span className="empty-session weekly">-</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
