import moment from "moment";
import { Data } from "../../elements";
import {
  AsyncFunction,
  ContextState,
  DefaultFunction,
  SessionObject,
  SpotifyCreds,
  SpotifyDetails,
  SpotifyPlayerDetails,
  SpotifyPlayList,
  SpotifyTrack,
  YoutubeDetails,
} from "../types";

export const setInitialState = () => {
  return {
    user: null,
    appToken: null,
    isLoggedIn: false,
    // auth
    loginOrRegister: {} as DefaultFunction,
    logout: {} as AsyncFunction,
    googleLogin: {} as () => any,
    // youtube
    youtubeDetails: {} as YoutubeDetails,
    youtubeCreds: null,
    youtubeLogIn: {} as AsyncFunction,
    youtubeLogOut: {} as AsyncFunction,
    updateYoutubeDetails: {} as (accessToken: string) => any,
    updateCurrentYoutubePlaylist: {} as (currentPlaylist: any) => void,
    // spotify
    spotifyCreds: {} as SpotifyCreds,
    spotifyPlayerDetails: {
      isShuffled: false,
      isPaused: true,
      volume: 50,
      isLoading: false,
    } as SpotifyPlayerDetails,
    spotifyDetails: {} as SpotifyDetails,
    updatedCurrentSpotifyPlaylist: {} as (currentPlaylist: SpotifyPlayList) => Promise<void>,
    setCurrentTrack: {} as (currentTrack: SpotifyTrack) => void,
    spotifyLogOut: {} as DefaultFunction,
    configureDeviceId: {} as (deviceId: string) => void,
    configureSpotifyPlayer: {} as (actionType: string, action?: any) => void,
    spotifyLogIn: {} as (credDetails: SpotifyCreds) => any,
    refreshSpotifyToken: {} as (credDetails: SpotifyCreds) => any,
    // ui
    currentModal: "",
    randomQuoteIndex: 0,
    sessionObject: null,
    isLeftBarClicked: false,
    isRightBarClicked: false,
    setModal: {} as (currentModal: string) => void,
    handleSideBarClicked: {} as (isLeft: boolean, isBoth?: boolean) => void,
    // sessions
    isPomTimerPaused: false,
    finishSession: {} as () => any,
    finishPeriod: {} as DefaultFunction,
    deleteSession: {} as DefaultFunction,
    renameSession: {} as (newName: string) => void,
    createSession: {} as (session: SessionObject) => void,
    updateSession: {} as (session: SessionObject) => void,
  };
};

export const configureContextState = (contextState: ContextState) => {
  const randomIndex = localStorage.getItem("randomQuoteIndex");
  const today = localStorage.getItem("todayDate");
  const appToken = localStorage.getItem("appToken");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const user = localStorage.getItem("user");
  const storedSession = localStorage.getItem("currentSession");

  const youtubeDetails = localStorage.getItem("youtubeDetails");
  const youtubeCreds = localStorage.getItem("youtubeCreds");

  const spotifyCreds = localStorage.getItem("spotifyCreds");
  const spotifyDetails = localStorage.getItem("spotifyDetails");
  const spotifyPlayerDetails = localStorage.getItem("spotifyPlayerDetails");

  if (isLoggedIn) {
    contextState.isLoggedIn = JSON.parse(isLoggedIn);
  }
  if (appToken) {
    contextState.appToken = appToken ?? "";
  }
  if (!localStorage.getItem("currentVidID")) {
    localStorage.setItem("currentVidID", JSON.stringify(""));
    localStorage.setItem("currentVidIndex", JSON.stringify("0"));
  }
  if (storedSession) {
    contextState.sessionObject = JSON.parse(storedSession);
  }
  if (user) {
    contextState.user = JSON.parse(user);
  }
  if (youtubeDetails) {
    contextState.youtubeDetails = JSON.parse(youtubeDetails);
  }
  if (youtubeCreds) {
    contextState.youtubeCreds = JSON.parse(youtubeCreds);
  }
  if (spotifyCreds) {
    contextState.spotifyCreds = JSON.parse(spotifyCreds);
  }
  if (spotifyDetails) {
    contextState.spotifyDetails = JSON.parse(spotifyDetails);
  }
  if (spotifyPlayerDetails) {
    const updatedPlayer = JSON.parse(spotifyPlayerDetails);
    updatedPlayer.isPaused = true;
    contextState.spotifyPlayerDetails = updatedPlayer;
  }

  // daily quote, if a new day, set a new day & random quote
  if (!today || !moment(JSON.parse(today)).isSame(new Date(), "day")) {
    const randomIndex = Math.floor(Math.random() * Data.quotes.length);

    localStorage.setItem("todayDate", JSON.stringify(new Date()));
    localStorage.setItem("randomQuoteIndex", JSON.stringify(randomIndex));
    contextState.randomQuoteIndex = randomIndex;
  } else {
    contextState.randomQuoteIndex =
      randomIndex !== null ? JSON.parse(randomIndex) : 0;
  }
};
