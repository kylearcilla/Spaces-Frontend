import { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import {
  getCurrentTrack,
  pauseTrack,
  skipToNext,
  skipToPrev,
  seekPosition,
  setVolume,
  uiState,
  playPlaylist,
  setShuffle,
} from "../../../../utils";
import SpotifyControls from "./SpotifyControls/SpotifyControls";
import SpotifyControlsMini from "./SpotifyControls/SpotifyControlsMini";

const SpotifyPlayer = () => {
  const {
    isRightBarClicked,
    spotifyPlayerDetails,
    configureSpotifyPlayer,
    spotifyCreds,
    spotifyDetails,
  } = useContext(GlobalContext);

  const state = uiState(
    isRightBarClicked,
    "isRight",
    !spotifyDetails?.currentTrack,
    "emptyTrack"
  );

  const togglePlay = async () => {
    configureSpotifyPlayer("setLoadingTrue");
    if (spotifyPlayerDetails.isPaused) {
      await playPlaylist(
        spotifyCreds?.accessToken,
        spotifyCreds?.deviceId,
        spotifyDetails?.currentPlaylist?.id ?? "0",
        spotifyDetails?.currentTrack?.trackUri ?? "0",
        spotifyPlayerDetails.currentTrackProgressMs - 200
      );
    } else {
      // const res = await getCurrentTrack(spotifyCreds?.accessToken);
      // setProgress(res.progress_ms + 290);
      await pauseTrack(spotifyCreds?.accessToken, spotifyCreds?.deviceId);
    }
    configureSpotifyPlayer("togglePlay");
  };
  const toggleShuffle = async () => {
    configureSpotifyPlayer("setLoadingTrue");
    await setShuffle(
      !spotifyPlayerDetails?.isShuffled,
      spotifyCreds.deviceId,
      spotifyCreds.accessToken
    );
    configureSpotifyPlayer("toggleShuffle");
  };
  const handleSkipToNext = async () => {
    configureSpotifyPlayer("setLoadingTrue");
    await skipToNext(spotifyCreds.accessToken, spotifyCreds?.deviceId);
    if (spotifyDetails?.currentTrack.currentType === "track") {
      return;
    }

    const res = await getCurrentTrack(spotifyCreds?.accessToken);
    configureSpotifyPlayer("setToPrevPosition", res.progress_ms + 400);
  };
  const handleSkiptToPrev = async () => {
    configureSpotifyPlayer("setLoadingTrue");
    await skipToPrev(spotifyCreds.accessToken, spotifyCreds?.deviceId);
    if (spotifyDetails?.currentTrack.currentType === "track") {
      return;
    }

    const res = await getCurrentTrack(spotifyCreds?.accessToken);
    configureSpotifyPlayer("setToPrevPosition", res.progress_ms + 400);
  };
  const handleSeek = async (seekedPoint: number) => {
    configureSpotifyPlayer("setLoadingTrue");
    await seekPosition(
      spotifyCreds.accessToken,
      seekedPoint,
      spotifyCreds?.deviceId
    );
  };
  const handleChangeVolume = async (newVolume: number) => {
    configureSpotifyPlayer("setLoadingTrue");
    await setVolume(
      spotifyCreds.accessToken,
      spotifyPlayerDetails?.volume,
      spotifyCreds?.deviceId
    );
    configureSpotifyPlayer("setLoadingFalse");
  };

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (
      !spotifyPlayerDetails?.isPaused &&
      !state.includes("emptyTrack") &&
      !spotifyPlayerDetails?.isLoading
    ) {
      interval = setInterval(() => {
        configureSpotifyPlayer("updateTimeProgress");
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [
    spotifyDetails?.currentTrack,
    spotifyPlayerDetails.isPaused,
    spotifyPlayerDetails.isLoading,
  ]);

  return (
    <>
      {isRightBarClicked ? (
        <SpotifyControlsMini
          togglePlay={togglePlay}
          handleSkipToNext={handleSkipToNext}
          handleSkiptToPrev={handleSkiptToPrev}
        />
      ) : (
        <SpotifyControls
          togglePlay={togglePlay}
          toggleShuffle={toggleShuffle}
          handleSkipToNext={handleSkipToNext}
          handleSkiptToPrev={handleSkiptToPrev}
          handleSeek={handleSeek}
          handleChangeVolume={handleChangeVolume}
        />
      )}
    </>
  );
};

export default SpotifyPlayer;
