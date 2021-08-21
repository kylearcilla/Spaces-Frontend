import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { SpotifyPlayList } from "../../../../context/types";
import "./SpotifyPlaylistCard.css";

interface SpotifyPlaylistCardProps {
  playlistId: string;
  playlist: SpotifyPlayList;
  isClicked: boolean;
  isChosen: boolean;
  handleClickItem: (details: any) => void;
}

const SpotifyPlaylistCard: FC<SpotifyPlaylistCardProps> = ({
  playlistId,
  playlist,
  isClicked,
  isChosen,
  handleClickItem
}) => {
  const state = `${isClicked ? "clicked" : "notClicked"} ${isChosen ? "chosen" : "notChosen"}`;

  return (
    <div
      className={`spotify-playlist-card ${state}`}
      onClick={() => {
        if (isChosen) return;
        handleClickItem({
          id: playlistId,
          title: playlist.title,
          thumbnailURL: playlist.thumbnailURL,
          desription: playlist.desription,
          playlistCount: playlist.playlistCount,
        });
      }}
    >
      <LazyLoadImage
        className={`spotify-playlist-card-img ${state}`}
        src={playlist?.thumbnailURL}
        alt="profile"
      />
      <div className="spotify-playlist-card-details">
        <div className="youtube-card-playlist-title-container">
          <h1 className="spotify-playlist-card-title">{playlist?.title}</h1>
          <span className="playlist-item-chosen-check">{`${isChosen ? "✓" : ""}`}</span>
        </div>
        <p className="spotify-playlist-card-item-count">{playlist?.playlistCount} Items</p>
        <p className="spotify-playlist-card-description">{playlist?.desription}</p>
      </div>
    </div>
  );
};

export default SpotifyPlaylistCard;
