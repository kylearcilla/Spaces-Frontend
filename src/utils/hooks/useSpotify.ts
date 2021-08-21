import { useEffect } from "react";

// dyncamically appending Spotify SDK Script to DOM
const useSpotify = () => {
  useEffect(() => {
    if (!window.Spotify) {
      const script = document.createElement("script");
      script.id = "spotify-sfk";
      script.src = "https://sdk.scdn.co/spotify-player.js";
      document.head.appendChild(script);
    }
  }, []);
};

export default useSpotify;
