import { FC, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { IconButton } from "../../../elements";
import { SpotifyPlayListView } from "./SpotifyListView/SpotifyPlayListView";
import { uiState, useSpotify } from "../../../utils";

import TopHeader from "./SpotifyListView/TopHeader";
import SpotifyPlayer from "./SpotifyPlayer/SpotifyPlayer";
import { EventHandlerFunction } from "../../../utils/types";
import "./MusicView.css";

const MusicView: FC<{ handleRightClicked: (EventHandlerFunction) }> = ({ handleRightClicked }) => {
  const {
    isRightBarClicked,
    isLeftBarClicked,
    spotifyCreds,
    configureDeviceId,
    spotifyDetails,
    setCurrentTrack,
    configureSpotifyPlayer,
    spotifyPlayerDetails,
    refreshSpotifyToken,
  } = useContext(GlobalContext);

  const state = uiState(
    isLeftBarClicked,
    "isLeft",
    isRightBarClicked,
    "isRight",
    !spotifyDetails?.userDetails?.name,
    "isLoggedOff"
  );

  const credentials: any = {};
  // for refreshing the token
  useEffect(() => {
    if (!spotifyCreds.refreshToken || !spotifyCreds.expiresIn) {
      return;
    }
    const interval = setInterval(() => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      const refreshToken = spotifyCreds.refreshToken;

      fetch("https://safe-depths-40988.herokuapp.com/spotify-refresh", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ refreshToken: refreshToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          credentials.accessToken = data.accessToken;
          credentials.refreshToken = data.refreshToken;
          credentials.expiresIn = data.expiresIn;
          refreshSpotifyToken(credentials);
        })
        .catch((err) => console.log(err));

      return () => clearInterval(interval);
    }, (spotifyCreds.expiresIn - 60) * 1000);
  }, [spotifyCreds.expiresIn, spotifyCreds.refreshToken]);

  useSpotify();
  window.onSpotifyWebPlaybackSDKReady = () => {
    const token = spotifyCreds?.accessToken ?? "";
    if (token === "") return;
    const player = new Spotify.Player({
      name: "Spaces",
      getOAuthToken: (cb) => {
        cb(token);
      },
      volume: spotifyPlayerDetails.volume / 100,
    });

    // Error handling
    player.addListener("initialization_error", ({ message }) => {
      console.error(message);
    });
    player.addListener("authentication_error", ({ message }) => {
      console.error(message);
    });
    player.addListener("account_error", ({ message }) => {
      console.error(message);
    });
    player.addListener("playback_error", ({ message }) => {
      console.error(message);
    });

    // Playback status updates
    player.addListener("player_state_changed", (state) => {
      handleStateChange(state);
    });

    // Ready
    player.addListener("ready", ({ device_id }) => {
      configureDeviceId(device_id);
      console.log("Ready with Device ID", device_id);
    });

    // Not Ready
    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });

    // Connect to the player!
    player.connect();
  };

  async function handleStateChange(state: any) {
    const track = state?.track_window.current_track;
    // this is needed in cases when users play a track outisde of the web site
    if (!track) {
      configureSpotifyPlayer("disable");
      return;
    }
    if (spotifyPlayerDetails.isDisabled && track) {
      configureSpotifyPlayer("undisable");
    }
    if (spotifyPlayerDetails?.isLoading !== state?.loading) {
      state?.loading === true
        ? configureSpotifyPlayer("setLoadingTrue")
        : configureSpotifyPlayer("setLoadingFalse");
    }
    if (spotifyPlayerDetails?.isPaused !== state?.paused) {
      configureSpotifyPlayer("setLoadingTrue");
      configureSpotifyPlayer("togglePlay");
    }
    if (track.id === spotifyDetails?.currentTrack?.trackId) {
      return;
    }
    configureSpotifyPlayer("setLoadingTrue");
    const updatedTrack = {
      currentType: track.type,
      length: track.duration_ms,
      title: track.name,
      albumTitle: track.album.name,
      artist: track.artists[0].name,
      trackUri: track?.linked_from?.uri ?? track?.uri,
      trackId: track.id,
      albumImgURL: track.album.images[2].url,
    };
    setCurrentTrack(updatedTrack);
  }

  return (
    <div className={`music-view ${state}`}>
      <IconButton
        iconName={isRightBarClicked ? "fas fa-angle-double-left" : "fas fa-angle-double-right"}
        onHandleClick={handleRightClicked}
        type={`right-side-button isRightBarClicked ${isRightBarClicked ? "isClicked" : "notClicked"}`}
      />
      <TopHeader />
      <SpotifyPlayListView />
      {!state.includes("isLoggedOff") && <SpotifyPlayer />}
    </div>
  );
};

export default MusicView;
