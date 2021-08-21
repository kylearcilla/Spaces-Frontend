import { useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

const useSpotifyAuth = (code: string, callback: () => void) => {
  const { spotifyLogIn } = useContext(GlobalContext);

  let credentials: any = {};
  useEffect(() => {
    if (!code || code === "") return;
    fetch("https://safe-depths-40988.herokuapp.com/spotify-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then((data) => {
        credentials.accessToken = data.accessToken;
        credentials.refreshToken = data.refreshToken;
        credentials.expiresIn = data.expiresIn;
        spotifyLogIn(credentials);
        callback();
      })
      .catch((err) => console.log(err));
  }, [code]);

  return credentials;
};

export default useSpotifyAuth;
