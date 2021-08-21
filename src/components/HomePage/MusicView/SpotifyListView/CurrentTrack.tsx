import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import { uiState } from "../../../../utils";
import "./SpotifyPlayListView.css";

const CurrentTrack = () => {
  const { isLeftBarClicked, isRightBarClicked, spotifyDetails } = useContext(GlobalContext);
  const state = uiState(
    isLeftBarClicked,
    "isLeft",
    isRightBarClicked,
    "isRight",
    !spotifyDetails?.userDetails.name,
    "isLoggedOff",
    !spotifyDetails?.currentTrack,
    "emptyTrack"
  );

  const normalUI = (
    <>
      <div className={`current-track-img-container ${state}`}>
        {!state.includes("emptyTrack") && (
          <img src={`${spotifyDetails?.currentTrack?.albumImgURL}`} alt="current-song" />
        )}
      </div>
      <div className="current-track-details">
        <h3 className="current-track title">
          {spotifyDetails?.currentTrack?.title ?? "-"}
        </h3>
        <span className="current-track subtitles">
          {spotifyDetails?.currentTrack?.artist ?? "-"}
        </span>
      </div>
    </>
  );

  const minimizedUI = (
    <>
      <div className={`current-track-img-container-minimized ${state}`}>
        {!state.includes("emptyTrack") && (
          <img src={`${spotifyDetails?.currentTrack?.albumImgURL}`} alt="current-song"/>
        )}
      </div>
      <div className={`divider side-menu-divider spotify ${state}`}></div>
    </>
  );

  return <>{isRightBarClicked ? minimizedUI : normalUI}</>;
};

export default CurrentTrack;
