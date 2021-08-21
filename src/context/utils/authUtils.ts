import firebase from "firebase";
import auth from "../../utils/misc/firebase";
import { getUserPlaylists } from "../../utils";

export const handleUserGoogleLogin = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/youtube.readonly");
  const res = await auth.signInWithPopup(provider);
  const credential = res.credential as firebase.auth.OAuthCredential;

  const user = {
    name: res.user?.displayName ?? "",
    googleEmail: res.user?.email ?? "",
    googleProfileImgUrl: res.user?.photoURL ?? "",
    isLoggedInApp: false,
  };
  const youtubeDetails = {
    name: user.name,
    email: user.googleEmail,
    profileImgUrl: user.googleProfileImgUrl,
    playlists: [],
  };
  const youtubeCreds = {
    refreshToken: res.user?.refreshToken ?? "",
    accessToken: credential.accessToken ?? "",
    idToken: credential.idToken ?? "",
  };
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

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("youtubeCreds", JSON.stringify(youtubeCreds));
  localStorage.setItem("youtubeDetails", JSON.stringify(youtubeDetails));

  return {
    user,
    youtubeDetails,
    youtubeCreds,
  };
};
