import firebase from "firebase";
import auth from "../../utils/misc/firebase";
import { getUserPlaylists } from "../../utils";
import { YoutubeDetails, YoutubePlaylist } from "../types";

export const configureYoutubeDetails = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/youtube.readonly");
  const res = await auth.signInWithPopup(provider);
  const credential = res.credential as firebase.auth.OAuthCredential;

  const youtubeDetails = {
    name: res.user?.displayName ?? "",
    email: res.user?.email ?? "",
    profileImgUrl: res.user?.photoURL ?? "",
    playlists: [],
  };
  const youtubeCreds = {
    refreshToken: res.user?.refreshToken ?? "",
    accessToken: credential.accessToken ?? "",
    idToken: credential.idToken ?? "",
  };

  // get user's playlists
  const response =
    (await getUserPlaylists(youtubeCreds.accessToken ?? "")) ?? [];
  const playlists = response.items.map((p: any) => {
    return {
      id: p.id,
      itemCount: p.contentDetails.itemCount,
      title: p.snippet.localized.title,
      description: p.snippet.localized.description,
      thumbnailURL: p.snippet.thumbnails.high.url,
    };
  });
  youtubeDetails.playlists = playlists;

  localStorage.setItem("youtubeCreds", JSON.stringify(youtubeCreds));
  localStorage.setItem("youtubeDetails", JSON.stringify(youtubeDetails));

  return {
    youtubeDetails,
    youtubeCreds,
  };
};

export const handleUpdateYTPlaylist = (
  updatedYoutubeDetails: YoutubeDetails,
  currentPlaylist: YoutubePlaylist
) => {
  updatedYoutubeDetails.currentPlaylist = {
    id: currentPlaylist.id,
    title: currentPlaylist.title,
    thumbnailURL: currentPlaylist.thumbnailURL,
    description: currentPlaylist.description,
  };

  localStorage.setItem("youtubeDetails", JSON.stringify(updatedYoutubeDetails));

  return updatedYoutubeDetails;
};
