import { FC, useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import { DefaultFunction } from "../../../../../context/types";
import { IconButton } from "../../../../../elements";
import { convertToTime, uiState } from "../../../../../utils";
import "../SpotifyItems.css";

interface SpotifyControlsMiniProps {
  togglePlay: DefaultFunction;
  handleSkipToNext: () => Promise<void>;
  handleSkiptToPrev: () => Promise<void>;
}

const SpotifyControlsMini: FC<SpotifyControlsMiniProps> = ({ togglePlay, handleSkipToNext, handleSkiptToPrev }) => {
  const { isRightBarClicked, isLeftBarClicked, spotifyPlayerDetails } = useContext(GlobalContext);

  const state = uiState(
    isLeftBarClicked,
    "isLeft",
    isRightBarClicked,
    "isRight",
    !spotifyPlayerDetails.currentTrackLength,
    "isLoggedOff"
  );
  const currentTime =
    spotifyPlayerDetails?.currentTrackProgressMs >= 0
      ? convertToTime(spotifyPlayerDetails?.currentTrackProgressMs)
      : "-";
  const duration = spotifyPlayerDetails?.currentTrackLength
    ? convertToTime(spotifyPlayerDetails?.currentTrackLength)
    : "-";

  return (
    <div className={`spotify-player-controls mini ${state}`}>
      <div className="spotify-player-container mini">
        <div className={`spotify-progress-container mini ${state}`}>
          <div className={`spotify-time-container mini ${state}`}>
            <span className="spotify-time elapsed-time mini">
              {`${currentTime} - ${duration} `}
            </span>
          </div>
        </div>
        <div className={`spotify-buttons-container mini ${state}`}>
          <div className="spotify-main-buttons mini">
            <IconButton
              iconName={"fas fa-backward"}
              type={"spotify-btn back-btn mini"}
              onHandleClick={() => handleSkiptToPrev()}
              disabled={
                state.includes("isLoggedOff") || spotifyPlayerDetails.isDisabled
              }
            />
            <IconButton
              iconName={`${
                spotifyPlayerDetails.isPaused ? "fas fa-play" : "fas fa-pause"
              }`}
              type={"spotify-btn play-btn mini"}
              onHandleClick={() => togglePlay()}
              disabled={
                state.includes("isLoggedOff") || spotifyPlayerDetails.isDisabled
              }
            />
            <IconButton
              iconName={"fas fa-forward"}
              type={"spotify-btn forward-btn mini"}
              onHandleClick={() => handleSkipToNext()}
              disabled={
                state.includes("isLoggedOff") || spotifyPlayerDetails.isDisabled
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyControlsMini;
