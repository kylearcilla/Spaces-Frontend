import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./YoutubeCards.css";

interface YoutubePlaylistCardProps {
  playlistId: string;
  playlist: any;
  isClicked: boolean;
  isChosen: boolean;
  handleClickItem: any;
}

export const YoutubePlaylistCard: FC<YoutubePlaylistCardProps> = ({
  playlistId,
  playlist,
  isClicked,
  isChosen,
  handleClickItem,
}) => {
  const state = `${isClicked ? "clicked" : "notClicked"} ${
    isChosen ? "chosen" : "notChosen"
  }`;

  return (
    <div
      className={`youtube-card-playlist ${state}`}
      onClick={() =>
        handleClickItem({
          id: playlistId,
          title: playlist.title,
          thumbnailURL: playlist.thumbnailURL,
          desription: playlist.desription,
        })
      }
    >
      <div className={`video-music-playlist-img-container ${state}`}>
        <LazyLoadImage
          className={`youtube-card-playlist-img ${state}`}
          src={`${playlist.thumbnailURL}`}
          alt="youtube-vid"
        />
      </div>
      <div className="youtube-card-playlist-details">
        <div className="youtube-card-playlist-title-details">
          <div className="youtube-card-playlist-title-container">
            <h3 className="youtube-card-playlist-title">{`${playlist.title}`}</h3>
            <span className="playlist-item-chosen-check">{`${
              isChosen ? "✓" : ""
            }`}</span>
          </div>
          <div className="youtube-card-playlist-subtitle-container">
            <h3 className="youtube-card-playlist-sub-title">
              {" "}
              {`${playlist.itemCount} Videos`}{" "}
            </h3>
          </div>
        </div>
        <span className="youtube-card-playlist-description">{`${playlist.description}`}</span>
      </div>
    </div>
  );
};
