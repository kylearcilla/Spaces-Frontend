import { FC, useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import { YoutubePlaylist } from "../../../../../context/types";
import { YoutubePlaylistCard } from "../../../../../elements";
import "../YoutubeSettings.css";

interface YoutubePlaylistProps {
  handleClickPlaylist: (playlist: YoutubePlaylist) => void;
  currentClicked: YoutubePlaylist;
  isLoggedIn: boolean;
}

const YoutubePlaylists: FC<YoutubePlaylistProps> = ({ isLoggedIn, handleClickPlaylist, currentClicked }) => {
  const { youtubeDetails } = useContext(GlobalContext);

  return (
    <>
      <div className={`video-music-settings playlist-header youtube ${!isLoggedIn && "notLoggedIn"}`}>
        <span className="video-music-subtitle youtube">Your Playlists</span>
        <span className="video-music-subtitle small youtube">
          {`${youtubeDetails?.playlists?.length} playlists` ?? "0"}
        </span>
      </div>
      <div className={`video-music-settings-playlist-container youtube ${!isLoggedIn && "notLoggedIn"}`}>
        {youtubeDetails?.playlists?.map((p) => {
          return (
            <YoutubePlaylistCard
              key={p.id}
              playlist={p}
              playlistId={p.id}
              isClicked={currentClicked.id === p.id}
              isChosen={youtubeDetails?.currentPlaylist?.id === p.id}
              handleClickItem={(playlistDetails: YoutubePlaylist) => handleClickPlaylist(playlistDetails)}
            />
          );
        }) ?? <div className="empty-container-text">No Playlists</div>}
      </div>
    </>
  );
};

export default YoutubePlaylists;
