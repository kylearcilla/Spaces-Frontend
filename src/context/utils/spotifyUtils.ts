import { getPlaylistTracks } from "../../utils";
import {
  SpotifyCreds,
  SpotifyDetails,
  SpotifyPlayerDetails,
  SpotifyPlayList,
} from "../types";

export const configureSpotifyDetails = (profileRes: any, playlistRes: any) => {
  const userDetails = {
    name: profileRes.display_name,
    email: profileRes.email,
    profileImgUrl: profileRes.images[0].url,
  };
  const currentPlaylist = null;
  const playlists = playlistRes.items.map((t: any) => {
    return {
      id: t.id,
      desription: t.description,
      thumbnailURL: t.images[0].url,
      playlistCount: t.tracks.total,
      title: t.name,
    };
  });

  return {
    userDetails,
    currentPlaylist,
    playlists,
  };
};

export const handleUpdateNewCurrentPlaylist = async (
  spotifyCreds: SpotifyCreds,
  currentPlaylist: SpotifyPlayList,
  spotifyDetails: SpotifyDetails
) => {
  spotifyDetails.currentPlaylist = currentPlaylist;
  const res = await getPlaylistTracks(
    spotifyCreds.accessToken,
    currentPlaylist.id,
    0
  );
  const tracks = res.items.map((t: any) => {
    return {
      currentType: t.track.type,
      length: t.track.duration_ms,
      title: t.track.name,
      albumTitle: t.track.album.name,
      artist: t.track.album.artists[0].name,
      trackUri: t.track.linked_from?.uri ?? t.track.uri,
      trackId: t.track.id,
      albumImgURL: t.track.album.images[1].url,
    };
  });

  spotifyDetails.currentPlaylist.tracks = tracks;
};

export const updateSpotifyPlayer = (
  spotifyPlayerDetails: SpotifyPlayerDetails,
  actionType: string,
  action?: any
) => {
  if (actionType === "togglePlay") {
    spotifyPlayerDetails.isPaused = !spotifyPlayerDetails.isPaused;
  }
  if (actionType === "disable") {
    spotifyPlayerDetails.isPaused = true;
    spotifyPlayerDetails.isDisabled = true;
  }
  if (actionType === "undisable") {
    spotifyPlayerDetails.isPaused = false;
    spotifyPlayerDetails.isDisabled = false;
  }
  if (actionType === "toggleShuffle") {
    spotifyPlayerDetails.isShuffled = !spotifyPlayerDetails.isShuffled;
  }
  if (actionType === "seeking") {
    spotifyPlayerDetails.currentTrackProgressMs = action;
  }
  if (actionType === "updateTimeProgress") {
    spotifyPlayerDetails.currentTrackProgressMs += 1000;
  }
  if (actionType === "setToPrevPosition") {
    spotifyPlayerDetails.currentTrackProgressMs = action;
  }
  if (actionType === "setVolume") {
    spotifyPlayerDetails.volume = action;
  }
  if (actionType === "setNewCurrentTrack") {
    spotifyPlayerDetails.currentTrackLength = action?.length;
    spotifyPlayerDetails.currentTrackProgressMs = 0;
  }
  spotifyPlayerDetails.isLoading = false;
  if (actionType === "setLoadingTrue") {
    spotifyPlayerDetails.isLoading = true;
  }

  return spotifyPlayerDetails;
};
