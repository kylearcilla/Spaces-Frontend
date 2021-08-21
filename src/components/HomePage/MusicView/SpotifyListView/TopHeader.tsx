import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import { uiState } from "../../../../utils";
import "./SpotifyPlayListView.css";

const TopHeader = () => {
  const { spotifyDetails, isLeftBarClicked, isRightBarClicked } = useContext(GlobalContext);
  const state = uiState(
    isLeftBarClicked,
    "isLeft",
    isRightBarClicked,
    "isRight",
    !spotifyDetails?.userDetails?.name,
    "isLoggedOff",
    !spotifyDetails?.currentPlaylist,
    "isEmpty"
  );

  const minimizedUI = (
    <div className={`spotify-view header-container minimized ${state}`}>
      <i className="fab fa-spotify settings-icon spotify"></i>
    </div>
  );

  const regularUI = (
    <>
      <div className={`spotify-view header-container ${state}`}>
        <h1>Spotify</h1>
        <i className="fab fa-spotify settings-icon spotify"></i>
      </div>
      <div className={`spotify-view playlist-header-container`}>
        {!state.includes("isLoggedOff") && (
          <>
            <div className="current-spotify-playlist-name">Playlist:</div>
            <div className="current-spotify-playlist-name">
              {spotifyDetails?.currentPlaylist?.title ?? "None Selected"}
            </div>
          </>
        )}
      </div>
    </>
  );

  return (
    <div className={`spotify-view-top-header ${state}`}>
      {state.includes("isRight") ? minimizedUI : regularUI}
    </div>
  );
};

export default TopHeader;
