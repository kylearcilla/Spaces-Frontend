import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { Button, Modal } from "../../../elements";
import { performanceFeedback } from "../../../utils/Pomodoro/PomodoroScore";
import { LazyLoadImage } from "react-lazy-load-image-component";

const FinishSessionModal = () => {
  const { sessionObject, deleteSession } = useContext(GlobalContext);
  const [feedback, setFeedback] = useState<any>({});

  useEffect(() => {
    if (sessionObject!.isEarly) return;
    setFeedback(() => ({
      ...performanceFeedback(sessionObject!.stats!.medal),
    }));
  }, [sessionObject]);

  const timeStats = (
    <>
      <LazyLoadImage
        className="finished-session celebration-gif"
        src={feedback.gif}
        alt="celbrate-gif"
      />
      <h1 className="finished-session title">{feedback.title}</h1>
      <h3 className="finished-session subtitle">{feedback.subtitle}</h3>
      <div className="finished-session-stats times actual">
        <span className="finished-session-time-label">Session Period: </span>
        <span className="finished-session-time-text period">
          {sessionObject?.stats?.actualTime.slice(0, 19)}
        </span>
        <span className="finished-session-time-text duration">
          {`(${sessionObject?.stats?.actualTime.slice(19)})`}
        </span>
      </div>
      <div className="finished-session-stats times">
        <span className="finished-session-time-label">Your Time: </span>
        <span className="finished-session-time-text period">
          {sessionObject?.stats?.userTime.slice(0, 19)}
        </span>
        <span className="finished-session-time-text duration">
          {`(${sessionObject?.stats?.userTime.slice(19)})`}
        </span>
      </div>
      <div className="finished-session-stats times score">
        <span className="finished-session-time-label score">Score:</span>
        <span className="finished-session-time-text medal">
          {sessionObject?.stats?.medal}
        </span>
      </div>
    </>
  );

  return (
    <>
      <Modal>
        <div className="pomodoro-modal finished-session">
          {sessionObject?.isEarly ? (
            <>
              <h1 className="finished-session-stats title too-early">
                Session Finished!
              </h1>
              <div className="finished-session-stats times too-early">
                You must complete at least one cycle for a session to count.
              </div>
            </>
          ) : (
            timeStats
          )}
        </div>
        <div className="pomodoro-modal-buttons finished-session">
          <Button
            name={"OK"}
            onHandleClick={() =>  deleteSession()}
            type={"form-submit finishedSession"}
          ></Button>
        </div>
      </Modal>
    </>
  );
};

export { FinishSessionModal };
