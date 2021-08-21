import { SessionItem } from "../../../../elements";
import { FC } from "react";

export const TodayDisplay: FC<{ sessions: any }> = ({ sessions }) => {
  return (
    <div className="sessions-container">
      {sessions &&
        [...sessions.keys()].map((time: string) => {
          return (
            <div className="sessions time-container">
              <h3 className="sessions-time-title">
                {time.charAt(0) === "0" ? time.substring(1) : time}
              </h3>
              <div className="sessions sessions-grid">
                {sessions.get(time).map((session: any) => (
                  <SessionItem key={session.id} session={session} />
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};
