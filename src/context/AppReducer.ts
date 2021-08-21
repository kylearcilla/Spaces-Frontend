export const AppReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        isLoggedIn: true,
        appToken: action.payload,
      };
    case "GOOGLE_LOGIN":
      return {
        ...state,
        user: action.payload[0],
        youtubeCreds: action.payload[1],
        youtubeDetails: action.payload[2],
      };
    case "LOGOUT":
      return {
        ...state,
        currentModal: "",
        isLoggedIn: false,
        appToken: null,
        user: null,
      };
    case "TO_DEFAULT_BG":
      return {
        ...state,
        hasCustomBackGround: false,
      };
    case "TO_CUSTOM_BG":
      return {
        ...state,
        hasCustomBackGround: true,
      };
    case "TOGGLE_MODAL":
      return {
        ...state,
        currentModal: action.payload,
      };
    case "UPDATE_BAR_CLICKED":
      if (action.payload.isBoth) {
        return {
          ...state,
          isLeftBarClicked: true,
          isRightBarClicked: true,
        };
      }
      if (action.payload.isLeft) {
        return {
          ...state,
          isLeftBarClicked: !state.isLeftBarClicked,
        };
      } else {
        return {
          ...state,
          isRightBarClicked: !state.isRightBarClicked,
        };
      }
    case "YOUTUBE_LOGIN":
      return {
        ...state,
        youtubeCreds: action.payload[0],
        youtubeDetails: action.payload[1],
      };
    case "YOUTUBE_LOGOUT":
      return {
        ...state,
        youtubeCreds: {},
        youtubeDetails: {},
      };
    case "UPDATE_CURRENT_YT_PLAYLIST":
      return {
        ...state,
        youtubeDetails: action.payload,
      };
    case "SPOTIFY_LOGIN":
      return {
        ...state,
        spotifyCreds: action.payload[0],
        spotifyDetails: action.payload[1],
      };
    case "UPDATE_CURR_SPOTIFY_PLAYLIST":
      return {
        ...state,
        spotifyDetails: action.payload,
      };
    case "CONFIGURE_SPOTIFY_DEVICE":
      return {
        ...state,
        spotifyCreds: action.payload,
      };
    case "SET_CURRENT_SPOTIFY_TRACK":
      const newSpotifyDetails = action.payload;
      const updatedDetails = state.spotifyPlayerDetails;
      updatedDetails.currentTrackLength = newSpotifyDetails.currentTrack.length;
      return {
        ...state,
        spotifyPlayerDetails: updatedDetails,
        spotifyDetails: newSpotifyDetails,
      };
    case "UPDATE_SPOTIFY_PLAYER":
      return {
        ...state,
        spotifyPlayerDetails: action.payload,
      };
    case "DISCONNECT_SPOTIFY":
      return {
        ...state,
        spotifyCreds: {},
        spotifyDetails: {},
        spotifyPlayerDetails: {
          isShuffled: false,
          isPaused: false,
          volume: 50,
          isLoading: false,
        },
      };
    case "CREATE_SESSION":
      return {
        ...state,
        hasCustomBackGround: state.hasCustomBackGround,
        user: state.user,
        sessionObject: action.payload,
      };
    case "UPDATE_SESSION":
      return {
        ...state,
        sessionObject: { ...state.sessionObject, ...action.payload },
      };
    case "RENAME_SESSION":
      return {
        ...state,
        sessionObject: { ...state.sessionObject, sessionName: action.payload },
      };
    case "FINISH_SESSION":
      return {
        ...state,
        sessionObject: action.payload,
      };
    case "DELETE_SESSION":
      return {
        ...state,
        sessionObject: null,
      };
    default:
      return state;
  }
};
