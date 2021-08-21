import { FC, useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./SpotifyTrackCard.css";
import { uiState } from "../../../../utils";
import { SpotifyTrack } from "../../../../context/types";

interface SpotifyTrackCardProps {
  track: any;
  handleClickOnTrackItem: (track: SpotifyTrack) => void;
}

const SpotifyTrackCard: FC<SpotifyTrackCardProps> = ({ track, handleClickOnTrackItem}) => {
  const { isLeftBarClicked, isRightBarClicked, spotifyDetails } = useContext(GlobalContext);
  const rightBarState = isRightBarClicked ? "isRight" : "";
  const state = uiState(
    isLeftBarClicked,
    "isLeft",
    isRightBarClicked,
    "isRight",
    spotifyDetails?.currentTrack?.trackId === track.trackId,
    "isPlaying"
  );

  return (
    <div
      onClick={() => !state.includes("isPlaying") && handleClickOnTrackItem(track)}
      className={`spotify-track-item-container ${state}`}
    >
      <div className={`spotify-track-img-container ${state}`}>
        <LazyLoadImage
          className={`spotify-track-img ${state}`}
          src={track.albumImgURL}
          alt="track"
        />
      </div>
      <div className={`spotify-track-item-details ${rightBarState}`}>
        <h2 className="track-item-title">{track.title}</h2>
        <p className="track-item-artist-title">{track.artist}</p>
      </div>
    </div>
  );
};

export default SpotifyTrackCard;
