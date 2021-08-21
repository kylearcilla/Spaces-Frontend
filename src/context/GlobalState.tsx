import { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
import {
  createNewSession,
  getSpotfifyUserPlaylists,
  getSpotifyProfileDetails,
} from "../utils";
import {
  ContextState,
  SessionObject,
  SpotifyCreds,
  SpotifyPlayList,
  SpotifyTrack,
  ProviderProps,
  YoutubePlaylist,
} from "./types";
import {
  setInitialState,
  configureContextState,
  handleUserGoogleLogin,
  calculateFinishedSessionStats,
  checkIfSessionIsFinished,
  contiueToNextPeriod,
  setNewSessionObject,
  tooEarlyCheck,
  configureSpotifyDetails,
  handleUpdateNewCurrentPlaylist,
  updateSpotifyPlayer,
  configureYoutubeDetails,
  handleUpdateYTPlaylist,
} from "./utils";

const contextState = setInitialState();
configureContextState(contextState);

// Context API + Reducers
export const GlobalContext = createContext<ContextState>(contextState);

export const GlobalProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(AppReducer, contextState);

  // Authentication Functions
  const loginOrRegister = (token: string): void => {
    localStorage.setItem("appToken", token);
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    dispatch({ type: "LOGIN_USER", payload: token });
  };
  const googleLogin = async () => {
    try {
      const { user, youtubeDetails, youtubeCreds } = await handleUserGoogleLogin();
      dispatch({ type: "GOOGLE_LOGIN", payload: [user, youtubeCreds, youtubeDetails]});
      return user.googleEmail;
    } catch (error) {
      console.log(error);
    }
  };
  const logout = (): void => {
    localStorage.removeItem("appToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    youtubeLogOut(true);
    spotifyLogOut();
    dispatch({ type: "LOGOUT" });
  };

  // Youtube Stuff
  const youtubeLogIn = async (): Promise<void> => {
    try {
      const { youtubeDetails, youtubeCreds } = await configureYoutubeDetails();
      dispatch({ type: "YOUTUBE_LOGIN", payload: [youtubeCreds, youtubeDetails] });
    } catch (error) {
      console.log(error);
    }
  };
  const youtubeLogOut = async (isUserLogOut?: boolean): Promise<void> => {
    localStorage.removeItem("currentVidID");
    localStorage.removeItem("currentVidIndex");
    localStorage.removeItem("youtubeDetails");
    localStorage.removeItem("youtubeCreds");

    if (!isUserLogOut) window.location.reload();

    dispatch({ type: "YOUTUBE_LOGOUT" });
  };
  const updateCurrentYoutubePlaylist = (
    currentPlaylist: YoutubePlaylist
  ): void => {
    const updatedYoutubeDetails = state.youtubeDetails;
    handleUpdateYTPlaylist(updatedYoutubeDetails, currentPlaylist);

    dispatch({ type: "UPDATE_CURRENT_YT_PLAYLIST", payload: updatedYoutubeDetails });
  };

  // Spotify Stuff
  const spotifyLogIn = async (credDetails: SpotifyCreds): Promise<void> => {
    const profileRes = await getSpotifyProfileDetails(credDetails.accessToken);
    const playlistRes = await getSpotfifyUserPlaylists(credDetails.accessToken, 0);
    const spotifyDetails = configureSpotifyDetails(profileRes, playlistRes);

    localStorage.setItem("spotifyCreds", JSON.stringify(credDetails));
    localStorage.setItem("spotifyDetails", JSON.stringify(spotifyDetails));

    dispatch({ type: "SPOTIFY_LOGIN", payload: [credDetails, spotifyDetails] });
  };
  const spotifyLogOut = (): void => {
    localStorage.removeItem("spotifyCreds");
    localStorage.removeItem("spotifyDetails");
    localStorage.removeItem("spotifyPlayerDetails");
    
    window.location.reload();
    dispatch({ type: "DISCONNECT_SPOTIFY" });
  };
  const updatedCurrentSpotifyPlaylist = async (
    currentPlaylist: SpotifyPlayList
  ): Promise<void> => {
    const spotifyDetails = state.spotifyDetails;
    await handleUpdateNewCurrentPlaylist(state.spotifyCreds, currentPlaylist, spotifyDetails);

    localStorage.setItem("spotifyDetails", JSON.stringify(spotifyDetails));
    dispatch({ type: "UPDATE_CURR_SPOTIFY_PLAYLIST", payload: spotifyDetails });
  };
  const configureDeviceId = (deviceId: string): void => {
    const updatedSpotifyCreds = state.spotifyCreds;
    updatedSpotifyCreds.deviceId = deviceId;
    localStorage.setItem("spotifyCreds", JSON.stringify(updatedSpotifyCreds));

    dispatch({ type: "CONFIGURE_SPOTIFY_DEVICE", payload: updatedSpotifyCreds,});
  };
  const setCurrentTrack = (currentTrack: SpotifyTrack): void => {
    const updatedSpotifyDetails = state.spotifyDetails;
    updatedSpotifyDetails.currentTrack = currentTrack;

    configureSpotifyPlayer("setNewCurrentTrack", currentTrack);
    localStorage.setItem( "spotifyDetails", JSON.stringify(updatedSpotifyDetails));

    dispatch({ type: "SET_CURRENT_SPOTIFY_TRACK", payload: updatedSpotifyDetails });
  };
  const configureSpotifyPlayer = (actionType: string, action?: any): void => {
    const updatedDetails = updateSpotifyPlayer(
      state.spotifyPlayerDetails,
      actionType,
      action ?? ""
    );

    localStorage.setItem("spotifyPlayerDetails", JSON.stringify(updatedDetails));
    dispatch({ type: "UPDATE_SPOTIFY_PLAYER", payload: updatedDetails });
  };
  const refreshSpotifyToken = (credDetails: SpotifyCreds): void => {
    const spotifyCreds = state.spotifyCreds;
    const updatedCreds = { ...spotifyCreds, ...credDetails };

    localStorage.setItem("spotifyCreds", JSON.stringify(updatedCreds));
    dispatch({ type: "UPDATE_SPOTIFY_TOKEN", payload: updatedCreds });
  };

  // UI Related Stuff
  const handleSideBarClicked = (isLeft: boolean, isBoth?: boolean): void => {
    if (isBoth) {
      dispatch({ type: "UPDATE_BAR_CLICKED",payload: { isBoth: true }});
      return;
    }
    dispatch({ type: "UPDATE_BAR_CLICKED", payload: { isLeft } });
  };
  const setModal = (currentModal: string) => {
    dispatch({ type: "TOGGLE_MODAL", payload: currentModal });
  };

  // Session Functions
  const createSession = (values: any): void => {
    const newSession = setNewSessionObject(values);
    dispatch({ type: "CREATE_SESSION", payload: newSession });
  };
  const updateSession = (session: SessionObject): void => {
    localStorage.setItem("currentSession", JSON.stringify(session));
    dispatch({ type: "UPDATE_SESSION", payload: session });
  };
  const renameSession = (newName: string): void => {
    const updatedObject = state.sessionObject;
    updatedObject.sessionName = newName;
    localStorage.setItem("currentSession", JSON.stringify(updatedObject));
    dispatch({ type: "RENAME_SESSION", payload: newName });
  };
  const finishPeriod = (): void => {
    const updatedSession = state.sessionObject;
    if (updatedSession.cycles === 1) {
      state.sessionObject.isFinished = true;
      finishSession();
      return;
    }
    contiueToNextPeriod(updatedSession);
    checkIfSessionIsFinished(updatedSession, finishSession);

    // another conditional for checking if finishing early
    dispatch({ type: "UPDATE_SESSION", payload: updatedSession });
  };
  const finishSession = (): any => {
    const finishedObject = state.sessionObject;
    finishedObject.userEndTime = new Date();
    finishedObject.isFinished = true;
    finishedObject.isEarly = false;

    if (tooEarlyCheck(finishedObject)) {
      finishedObject.isEarly = true;
      dispatch({ type: "FINISH_SESSION", payload: finishedObject });
    }

    const scoredObject = calculateFinishedSessionStats(finishedObject);
    createNewSession(state.user.googleEmail, scoredObject, state.appToken);

    localStorage.setItem("currentSession", JSON.stringify(scoredObject));
    dispatch({ type: "FINISH_SESSION", payload: scoredObject });
    return;
  };
  const deleteSession = (): void => {
    localStorage.removeItem("currentSession");
    dispatch({ type: "DELETE_SESSION" });
  };

  return (
    <GlobalContext.Provider
      value={{
        googleLogin,
        appToken: state.appToken,
        logout,
        createSession,
        updateSession,
        finishPeriod,
        finishSession,
        renameSession,
        deleteSession,
        handleSideBarClicked,
        setModal,
        youtubeLogIn,
        youtubeCreds: state.youtubeCreds,
        youtubeLogOut,
        spotifyLogIn,
        updateCurrentYoutubePlaylist,
        updatedCurrentSpotifyPlaylist,
        setCurrentTrack,
        configureSpotifyPlayer,
        spotifyLogOut,
        configureDeviceId,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        loginOrRegister,
        refreshSpotifyToken,
        spotifyCreds: state.spotifyCreds,
        spotifyDetails: state.spotifyDetails,
        youtubeDetails: state.youtubeDetails,
        currentModal: state.currentModal,
        randomQuoteIndex: state.randomQuoteIndex,
        isLeftBarClicked: state.isLeftBarClicked,
        isRightBarClicked: state.isRightBarClicked,
        isPomTimerPaused: state.isPomTimerPaused,
        spotifyPlayerDetails: state.spotifyPlayerDetails,
        sessionObject: state.sessionObject,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
