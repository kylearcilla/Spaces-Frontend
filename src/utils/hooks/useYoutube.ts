import { useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

const useYoutube = (callback: any) => {
  const { youtubeDetails } = useContext(GlobalContext);
  useEffect(() => {
    if (!(window as any).YT) {
      var tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      tag.onload = callback;
    } else {
      callback();
    }
  }, [youtubeDetails?.currentPlaylist]);
};

export default useYoutube;
