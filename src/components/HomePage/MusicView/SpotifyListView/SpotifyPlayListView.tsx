import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import { SpotifyTrackCard } from "../../../../elements";
import { SpotifyTrack } from "../../../../context/types";
import { uiState, getPlaylistTracks, playPlaylist } from "../../../../utils";
import CurrentTrack from "./CurrentTrack";
import InfiniteScroll from "react-infinite-scroll-component";
import "./SpotifyPlayListView.css";

export const SpotifyPlayListView = () => {
  const {
    isLeftBarClicked,
    isRightBarClicked,
    spotifyDetails,
    spotifyCreds,
    spotifyPlayerDetails,
    configureSpotifyPlayer,
    setCurrentTrack,
  } = useContext(GlobalContext);
  const state = uiState(
    isLeftBarClicked,
    "isLeft",
    isRightBarClicked,
    "isRight",
    !spotifyDetails?.userDetails?.name,
    "isLoggedOff",
    !spotifyDetails?.currentTrack,
    "isEmpty"
  );

  const [tracks, setTracks] = useState<SpotifyTrack[]>(spotifyDetails?.currentPlaylist?.tracks ?? []);

  useEffect(() => {
    setTracks(() => [...(spotifyDetails?.currentPlaylist?.tracks ?? [])]);
  }, [spotifyDetails?.currentPlaylist]);

  const handleClickOnTrackItem = async (track: SpotifyTrack) => {
    if (spotifyPlayerDetails.isPaused) configureSpotifyPlayer("togglePlay");
    configureSpotifyPlayer("setLoadingTrue");
    setCurrentTrack(track);
    await playPlaylist(
      spotifyCreds.accessToken,
      spotifyCreds.deviceId,
      spotifyDetails?.currentPlaylist?.id ?? "0",
      track.trackUri,
      0
    );
    configureSpotifyPlayer("setLoadingFalse");
  };
  const fetchMoreTrackItems = async () => {
    const res = await getPlaylistTracks(
      spotifyCreds.accessToken,
      spotifyDetails?.currentPlaylist?.id ?? "0",
      tracks.length
    );
    if (!res.items) return;
    const newTracks = res.items.map((t: any) => {
      return {
        length: t.track.duration_ms,
        title: t.track.name,
        albumTitle: t.track.album.name,
        artist: t.track.album.artists[0].name,
        trackUri: t.track.linked_from?.uri ?? t.track.uri,
        trackId: t.track.id,
        albumImgURL: t.track.album.images[1].url,
      };
    });
    setTracks((prev: SpotifyTrack[]) => [...prev, ...newTracks]);
  };

  return (
    <div className={`spotify-playlist-view ${state}`}>
      {!state.includes("isLoggedOff") && <CurrentTrack />}
      {state.includes("isLoggedOff") && !state.includes("isRight") && (
        <div className={`spotify-empty-message-container ${state}`}>
          <p className="spotify-empty-message">Log in using your account.</p>
          <p className="spotify-empty-message">
            Note: This player only supports premium Spotify members.
          </p>
        </div>
      )}
      <div className={`playlist-view-container ${state}`}>
        <InfiniteScroll
          className={`spotify-playlist-tracks ${state}`}
          dataLength={tracks.length}
          next={() => fetchMoreTrackItems()}
          height={state.includes("isRight") ? 220 : 400}
          hasMore={tracks.length < 100}
          loader={<></>}
        >
          {tracks.map((track: SpotifyTrack) => {
            return (
              <SpotifyTrackCard
                key={track.trackId}
                track={track}
                handleClickOnTrackItem={(track: SpotifyTrack) => handleClickOnTrackItem(track)}
              />
            );
          })}
          <div className={`dummy-space-spotify-playlist-view ${state}`}></div>
        </InfiniteScroll>
      </div>
    </div>
  );
};
