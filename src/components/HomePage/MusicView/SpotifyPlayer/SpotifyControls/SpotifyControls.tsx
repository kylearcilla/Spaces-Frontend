import { FC, useContext, useState } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import {
  IconButton,
  SpotifyProgressBar,
  SpotifyVolumeBar,
} from "../../../../../elements";
import { convertToTime, uiState } from "../../../../../utils";
import { DefaultFunction } from "../../../../../utils/types";
import "../SpotifyItems.css";

interface SpotifyControlsProps {
  togglePlay: DefaultFunction;
  toggleShuffle: DefaultFunction;
  handleSkipToNext: () => Promise<void>;
  handleSkiptToPrev: () => Promise<void>;
  handleSeek: (seekedPoint: number) => Promise<void>;
  handleChangeVolume: (newVolume: number) => Promise<void>;
}

const SpotifyControls: FC<SpotifyControlsProps> = ({
  togglePlay,
  toggleShuffle,
  handleSkipToNext,
  handleSkiptToPrev,
  handleSeek,
  handleChangeVolume,
}) => {
  const {
    isRightBarClicked,
    isLeftBarClicked,
    spotifyPlayerDetails,
    configureSpotifyPlayer,
  } = useContext(GlobalContext);

  const [isVolume, toggleVolume] = useState(false);
  const state = uiState(
    isLeftBarClicked,
    "isLeft",
    isRightBarClicked,
    "isRight",
    spotifyPlayerDetails?.isShuffled,
    "isShuffled",
    !spotifyPlayerDetails.currentTrackLength,
    "isLoggedOff"
  );

  const handleVolumeInputChange = (newVolume: number) => {
    configureSpotifyPlayer("setVolume", newVolume);
  };
  const handleProgressInputChange = (seekedPoint: number) => {
    configureSpotifyPlayer("seeking", seekedPoint);
  };

  return (
    <div className={`spotify-player-controls ${state}`}>
      <div className="spotify-player-container">
        <div className={`spotify-buttons-container ${state}`}>
          <IconButton
            iconName={"fas fa-volume-up"}
            type={`spotify-btn volume-btn`}
            onHandleClick={() => toggleVolume(!isVolume)}
            disabled={state.includes("isLoggedOff") || spotifyPlayerDetails.isDisabled}
          />

          <div className="spotify-main-buttons">
            <IconButton
              iconName={"fas fa-backward"}
              type={"spotify-btn back-btn"}
              onHandleClick={() => handleSkiptToPrev()}
              disabled={state.includes("isLoggedOff") || spotifyPlayerDetails.isDisabled}
            />
            <IconButton
              iconName={`${spotifyPlayerDetails.isPaused ? "fas fa-play" : "fas fa-pause"}`}
              type={"spotify-btn play-btn"}
              onHandleClick={() => togglePlay()}
              disabled={state.includes("isLoggedOff") || spotifyPlayerDetails.isDisabled}
            />
            <IconButton
              iconName={"fas fa-forward"}
              type={"spotify-btn forward-btn"}
              onHandleClick={() => handleSkipToNext()}
              disabled={state.includes("isLoggedOff") || spotifyPlayerDetails.isDisabled}
            />
          </div>
          <IconButton
            iconName={"fas fa-random"}
            type={`spotify-btn random-btn ${state}`}
            onHandleClick={() => toggleShuffle()}
            disabled={state.includes("isLoggedOff") || spotifyPlayerDetails.isDisabled}
          />
          {isVolume && (
            <SpotifyVolumeBar
              handleInputChange={handleVolumeInputChange}
              handleValueChange={(newVolume: number) => handleChangeVolume(newVolume)}
              currentVol={spotifyPlayerDetails.volume}
            />
          )}
        </div>
        <div className={`spotify-progress-container ${state}`}>
          <div className="spotify-progress-bar-container">
            <SpotifyProgressBar
              handleInputChange={(seekedPoint: number) => handleProgressInputChange(seekedPoint)}
              handleValueChange={(seekedPoint: number) => handleSeek(seekedPoint)}
              currentTime={spotifyPlayerDetails.currentTrackProgressMs}
              duration={spotifyPlayerDetails.currentTrackLength}
            />
          </div>
          <div className={`spotify-time-container ${state}`}>
            <span className="spotify-time elapsed-time">
              {spotifyPlayerDetails?.currentTrackProgressMs >= 0
                ? convertToTime(spotifyPlayerDetails?.currentTrackProgressMs)
                : "-"}
            </span>
            <span className="spotify-time song-length">
              {spotifyPlayerDetails?.currentTrackLength
                ? convertToTime(spotifyPlayerDetails?.currentTrackLength)
                : "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyControls;
