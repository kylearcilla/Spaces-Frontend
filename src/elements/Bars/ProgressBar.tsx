import { FC, useState, useEffect, useContext } from "react";
import { useWindow, calcProgressWidthInSession } from "../../utils";
import "../../App.css";
import { GlobalContext } from "../../context/GlobalState";
import { SessionObject } from "../../context/types";

type ProgressBarProps = {
  isInSession: boolean;
  percent: number;
  color: string;
  currentPeriod: string | undefined;
  sessionObject: SessionObject;
  checkCurrentTime: () => string;
  period: number;
  handleMenuClicked: () => void;
};

const ProgressBar: FC<ProgressBarProps> = ({ isInSession, percent, color, currentPeriod, sessionObject, checkCurrentTime, period, handleMenuClicked }) => {
  // hook allows access to viewport's height and width
  const { width } = useWindow();
  const { isLeftBarClicked: isLeft, isRightBarClicked: isRight, handleSideBarClicked } = useContext(GlobalContext);

  // width percentage is used to set a dynamically changing percentage to be multiplied...
  // to the current width to allow a dynamic bar that changes changes in pomodoro UI ...

  // width is used to get a changing ratio to calc a dynamic width
  // this is handled here since, the progress bar needs a refrence to the outline bar to calc its witdth
  const [widthPercentage, setWidthPercentage] = useState(0.2);

  useEffect(() => {
    if (width <= 950 && (!isLeft || !isRight)) {
      handleSideBarClicked(true, true);
    }
    const res = calcProgressWidthInSession(sessionObject ? true : false, width, isLeft, isRight);
    setWidthPercentage(res);
  }, [isLeft, isRight, width, widthPercentage, sessionObject]);

  const progressOutlineStyle = {
    width: `${width * ((width / 1600) * widthPercentage)}px`,
    backgroundColor: percent === 1 ? `${color}` : "transparent",
  };

  return (
    <div className="progress-bar-container">
      <span className="pom-time current">{checkCurrentTime()}</span>
      <div 
        className={`progress-outline ${isInSession} ${currentPeriod}`}
        style={progressOutlineStyle}
      >
        <div style={{width: `${percent * width * ((width / 1600) * widthPercentage) + 3}px`,}}
          className={`progress ${isInSession} ${currentPeriod}`}
        />
      </div>
      <span className="pom-time pom-period">
          {sessionObject ? `${period}:00` : `--`}
        </span>
        {sessionObject && (
          <button onClick={handleMenuClicked}
            className={`clear-button menu-icon-dots ${
              sessionObject ? true : false
            }`} >
            •••
          </button>
        )}
    </div>
  );
};

export default ProgressBar;
