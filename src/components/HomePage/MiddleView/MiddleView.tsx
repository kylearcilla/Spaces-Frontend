import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import PomodoroView from "./PomodoroView/PomodoroView";
import VideoView from "./VideoView/VideoView";
import { uiState } from "../../../utils";
import "./MiddleView.css";

const MiddleView = () => {
  const { isLeftBarClicked, isRightBarClicked } = useContext(GlobalContext)
  const state = uiState(isRightBarClicked, "isRight", isLeftBarClicked, "isLeft")

  return (
    <>
      <div className={`home-page-section home-middle ${state}`}>
        <div className="home-middle top">
          <PomodoroView/>
        </div>
        <div className="divider home-middle-top"></div>
        <VideoView/>
      </div>
    </>
  );
};

export default MiddleView;