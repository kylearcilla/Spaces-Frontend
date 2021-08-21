import { useContext, useState } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import { YoutubeVid } from "../../../../context/types";
import {
  uiState,
  useYoutube,
  getChannelDetails,
  getVideoDetails,
} from "../../../../utils";
import "./VideoView.css";
import VideoDetails from "./VideViewComponents/VideoDetails";

const VideoView = () => {
  const { youtubeDetails, isLeftBarClicked, isRightBarClicked } = useContext(GlobalContext);
  const [currentVid, setCurrentVid] = useState<YoutubeVid | null>();
  const [isBroken, setBroken] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const emptyState = youtubeDetails?.currentPlaylist ? "non-empty" : "empty";
  const state = uiState(
    isLeftBarClicked,
    "isLeft",
    isRightBarClicked,
    "isRight",
    !youtubeDetails?.email,
    "isLoggedOff"
  );

  let isFirstRender = true;
  let player: YT.Player;

  useYoutube(loadVideo);
  function loadVideo() {
    if (emptyState === "empty") return;
    (window as any).YT.ready(function () {
      player = new window.YT.Player("player", {
        height: "100%",
        width: "100%",
        events: {
          onReady: onReady,
          onStateChange: onStateChange,
          onError: onError,
        },
      });
    });
  }
  function onError() {
    localStorage.setItem("currentVidID", "");
    localStorage.setItem("currentVidIndex", "0");
    setBroken(true);
  }
  function onReady() {
    const index = JSON.parse(localStorage.getItem("currentVidIndex") ?? "0");
    player.loadPlaylist({
      list: `${youtubeDetails?.currentPlaylist?.id}`,
      listType: "playlist",
      index: index,
    });
    setIsEmpty(false);
  }
  async function onStateChange() {
    if (typeof player.getPlaylist !== "function") return;
    
    const id = player.getPlaylist()[player.getPlaylistIndex()];
    const storedId = JSON.parse(localStorage.getItem("currentVidID") ?? "");
    if (storedId === id && !isFirstRender) return;

    isFirstRender = false;
    localStorage.setItem("currentVidID", JSON.stringify(id));
    localStorage.setItem("currentVidIndex", JSON.stringify(player.getPlaylistIndex()));
    getDetails(id);
  }
  async function getDetails(id: string) {
    const vidRes = await getVideoDetails(id);
    const vidDetails = vidRes?.items[0];
    if (!vidDetails) {
      setIsEmpty(true);
      return;
    }
    const channelRes = await getChannelDetails(vidDetails.snippet.channelId);
    const channelDetails = channelRes?.items[0];
    if (!channelDetails) {
      setIsEmpty(true);
      return;
    }
    const currentVidObject = {
      id: vidDetails.id,
      title: vidDetails.snippet.title,
      likeCount: vidDetails.statistics.likeCount,
      viewCount: vidDetails.statistics.viewCount,
      publishedAt: vidDetails.snippet.publishedAt,
      channelName: vidDetails.snippet.channelTitle,
      channelImg: channelDetails.snippet.thumbnails.default.url,
      channelSubs: channelDetails.statistics.subscriberCount,
    };
    setCurrentVid(() => { return { ...currentVidObject } });
  }

  return (
    <div className="youtube-container">
      <div className="youtube-header">
        <div className="youtube-header-details">
          <span className="sessions-title youtube youtube-section"> Video Player</span>
          <i className={`fab fa-youtube settings-icon youtube youtube-section ${state}`}></i>
        </div>
        <div className="youtube-header-playlist-details">
          <span className="youtube-playlist-title">Current Playlist:</span>
          <span className="youtube-playlist-name">
            {isEmpty ? "No Playlist Selected" : youtubeDetails?.currentPlaylist?.title}
          </span>
        </div>
      </div>
      <div className={`youtube-video-container ${state}`}>
        <div id="player" className="youtube-video-frame">
          {isEmpty && <p className="no-playlist-text">No playlist selected</p>}
        </div>
      </div>
      <VideoDetails isBroken={isBroken} isEmpty={isEmpty} vid={currentVid} />
    </div>
  );
};

export default VideoView;
