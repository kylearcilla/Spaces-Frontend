import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

import { MiddleView, MusicView, SideMenu, ModalControl } from "../../components";
import { uiState } from "../../utils";
import "./HomePage.css";

const HomePage = () => {
  const { isLeftBarClicked, isRightBarClicked, handleSideBarClicked, spotifyDetails } = useContext(GlobalContext);

  const handleClicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.className.includes("left-side-button")) {
      handleSideBarClicked(true);
    } else {
      handleSideBarClicked(false);
    }
  }
  const state = uiState(
    isLeftBarClicked,
    "isLeft",
    isRightBarClicked,
    "isRight",
    !spotifyDetails?.userDetails?.name,
    "isLoggedOff",
    !spotifyDetails?.currentTrack,
    "isEmptyTrack"
  );

  return (
    <div className="home-page">
      <div className={`home-page-section home-left ${state}`}>
        <SideMenu handleLeftClicked={handleClicked}/>
      </div>
      <ModalControl/>
      <MiddleView />
      <div className={`home-page-section home-right ${state}`}>
        <MusicView handleRightClicked={handleClicked}/>
      </div>
    </div>
  );
};

export default HomePage;