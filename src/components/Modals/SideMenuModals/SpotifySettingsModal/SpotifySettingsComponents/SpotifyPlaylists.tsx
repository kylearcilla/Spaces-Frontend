import { useEffect } from "react";
import { FC, useContext, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { GlobalContext } from "../../../../../context/GlobalState";
import { SpotifyPlayList } from "../../../../../context/types";
import { SpotifyPlaylistCard } from "../../../../../elements";
import { getSpotfifyUserPlaylists } from "../../../../../utils";
import "../VideoMusic.css";

interface SpotifyPlaylistsProps {
  currentClicked: SpotifyPlayList | null | undefined;
  handleClickCard: (clicked: any) => void;
}

const SpotifyPlaylists: FC<SpotifyPlaylistsProps> = ({ currentClicked, handleClickCard }) => {
  const { spotifyDetails, spotifyCreds } = useContext(GlobalContext);
  const [playlists, setPlaylists] = useState<any>(spotifyDetails?.playlists);
  let currentLength = playlists.length;

  useEffect(() => {
    setPlaylists(spotifyDetails?.playlists);
  }, [spotifyDetails]);

  const fetchMorePlaylistItems = async () => {
    const res = await getSpotfifyUserPlaylists(
      spotifyCreds.accessToken,
      currentLength
    );
    if (!res.items) return;
    const newPlaylists = res.items.map((p: any) => {
      return {
        id: p.id,
        desription: p.description,
        thumbnailURL: p.images[0]?.url,
        playlistCount: p.tracks.total,
        title: p.name,
      };
    });
    setPlaylists((prev: any) => [...prev, ...newPlaylists]);
  };

  return (
    <div className="video-music-settings-playlist-container spotify">
      <div className="video-music-settings playlist-header">
        <span className="video-music-subtitle youtube">Your Playlists</span>
        <span className="video-music-subtitle small spotify">
          {currentLength + " Playlists"}
        </span>
      </div>
      <InfiniteScroll
        className="spotify-settings"
        dataLength={currentLength}
        next={() => fetchMorePlaylistItems()}
        height={280}
        hasMore={currentLength < 100}
        loader={<></>}
      >
        {playlists ? (
          playlists.map((p: any) => {
            return (
              <SpotifyPlaylistCard
                key={p.id}
                playlist={p}
                playlistId={p.id}
                isClicked={currentClicked?.id === p.id}
                isChosen={spotifyDetails?.currentPlaylist?.id === p.id}
                handleClickItem={(details: any) => handleClickCard(details)}
              />
            );
          })
        ) : (
          <div className="empty-container-text spotify">No Playlists</div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default SpotifyPlaylists;
