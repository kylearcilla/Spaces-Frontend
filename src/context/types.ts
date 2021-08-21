import { ReactNode } from "react";

// Types
export type DefaultFunction = (...args: any[]) => void;
export type AsyncFunction = (...args: any[]) => Promise<any>;
export type UserDetails = {
  name: string;
  googleEmail: string;
  googleProfileImgUrl: string;
};

// Session Types
export type CurrentTime = { minutes: number; seconds: number };
export type FinalSessionStats = {
  actualTime: string;
  userTime: string;
  medal: string;
};
export type SessionObject = {
  sessionName: string;
  currentTime: CurrentTime;
  pomodoroPeriod: number;
  breakPeriod: number;
  currentCycle: number;
  isEarly?: boolean;
  isFinished: boolean;
  isJustFinishedPeriod: boolean;
  cycles: number;
  startTime: Date;
  endTime: Date;
  userEndTime: Date;
  currentPeriod: string;
  stats?: FinalSessionStats;
};

// Youtube Types
export type YoutubeDetails = {
  name: string;
  email: string;
  profileImgUrl: string;
  playlists: [YoutubePlaylist] | null;
  currentPlaylist: YoutubePlaylist | null;
};
export type YoutubePlaylist = {
  id: string;
  itemCount?: number;
  title: string;
  description: string;
  thumbnailURL: string;
};
export type YoutubeCreds = {
  refreshToken: string;
  accessToken: string;
  idToken: string;
};
export type YoutubeVid = {
  id: string,
  title: string,
  likeCount: number,
  viewCount: number,
  publishedAt: string,
  channelName: string,
  channelImg: string,
  channelSubs: number
};

// Spotify Types
export type SpotifyCreds = {
  refreshToken: string;
  accessToken: string;
  expiresIn: number;
  deviceId: string;
};
export type SpotifyDetails = {
  userDetails: {
    name: string;
    email: string;
    profileImgUrl: string;
  };
  playlists: [SpotifyPlayList] | null;
  currentTrack: SpotifyTrack;
  currentPlaylist: SpotifyPlayList | null;
};
export type SpotifyPlayerDetails = {
  isPaused: boolean;
  isShuffled: boolean;
  volume: number;
  currentTrackLength: number;
  currentTrackProgressMs: number;
  currentTrackProgressTime: CurrentTime;
  isLoading: boolean;
  isDisabled: boolean;
};
export type SpotifyPlayList = {
  id: string;
  title: string;
  thumbnailURL: string;
  desription: string | null;
  playlistCount: number;
  tracks?: [SpotifyTrack];
};
export type SpotifyTrack = {
  currentType: string;
  length: number;
  title: string;
  albumTitle: string;
  artist: string;
  trackUri: string;
  trackId: string;
  albumImgURL: string;
};

// Interfaces
export interface ContextState {
  user: UserDetails | null;
  appToken: string | null;
  isLoggedIn: boolean;
  sessionObject: SessionObject | null;
  youtubeDetails: YoutubeDetails | null;
  youtubeCreds: YoutubeCreds | null;
  spotifyDetails: SpotifyDetails | null;
  currentModal: string;
  randomQuoteIndex: number;
  isPomTimerPaused: boolean;
  isLeftBarClicked: boolean;
  isRightBarClicked: boolean;
  spotifyPlayerDetails: SpotifyPlayerDetails;
  spotifyCreds: SpotifyCreds;
  logout: DefaultFunction;
  finishPeriod: DefaultFunction;
  deleteSession: DefaultFunction;
  spotifyLogOut: () => void;
  youtubeLogIn: AsyncFunction;
  youtubeLogOut: (isUserLogOut?: boolean) => void;
  loginOrRegister: (token: string) => void;
  configureSpotifyPlayer: (actionType: string, action?: any) => void;
  configureDeviceId: (deviceId: string) => void;
  googleLogin: () => any;
  setCurrentTrack: (currentTrack: SpotifyTrack) => void;
  createSession: (session: SessionObject) => void;
  updateSession: (session: SessionObject) => void;
  spotifyLogIn: (credDetails: SpotifyCreds) => void;
  refreshSpotifyToken: (credDetails: SpotifyCreds) => void;
  renameSession: (newName: string) => void;
  finishSession: () => void;
  handleSideBarClicked: (isLeft: boolean, isBoth?: boolean) => void;
  setModal: (currentModal: string) => void;
  updatedCurrentSpotifyPlaylist: (
    currentPlaylist: SpotifyPlayList
  ) => Promise<void>;
  updateCurrentYoutubePlaylist: (currentPlaylist: YoutubePlaylist) => void;
}

export interface ProviderProps {
  children: ReactNode;
}
