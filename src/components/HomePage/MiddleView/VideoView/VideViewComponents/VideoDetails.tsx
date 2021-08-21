import moment from "moment";
import { FC } from "react";
import { IconButton, spinner } from "../../../../../elements";
import { addCommasToNum, shortenNumber } from "../../../../../utils";
import "../VideoView.css";

interface VideoDetailsProps {
  isBroken: boolean;
  isEmpty: boolean;
  vid: any;
}

const VideoDetails: FC<VideoDetailsProps> = ({ isBroken, isEmpty, vid }) => {
  return (
    <div className="youtube-video-details-container">
      {isBroken && (
        <>
          <p className="no-playlist-text broken-playlist">This playlist can't be played. </p>
          <a
            className="anchor-link"
            target="_blank"
            href="https://support.google.com/youtube/answer/97363?hl=en"
            rel="noreferrer"
          >
            More info on unplayable embeded playlists.
          </a>
        </>
      )}
      {(!isEmpty && !isBroken && !vid?.title) && <img src={spinner} className="spinner youtube-details-container" alt="loading"/>}
      {vid?.title && (
        <>
          <div className="youtube-video-header">
            {isEmpty ? "-" : vid.title}
            <div className="youtube-like-metric">
              <IconButton
                iconName="fas fa-heart"
                onHandleClick={() => {}}
                type="youtube-metrics like"
              />
              <span className="video-metrics-like-count">{isEmpty ? "-" : `${shortenNumber(vid.likeCount)}`}</span>
            </div>
          </div>
          <div className="youtube-video-details">
            <span className="youtube-video-details views">
              {isEmpty ? "-" : `${addCommasToNum(vid.viewCount) + " Views"}`}
            </span>
            <span className="youtube-video-details date">
              {isEmpty ? "-" : `${moment(vid.publishedAt).format("MMMM Do YYYY")}`}</span>
          </div>
          <div className="youtube-channel-details-container">
            {isEmpty ? (<div className="youtube-channel-img"></div>) : (
              <img src={vid.channelImg} className="youtube-channel-img"  alt="yt-channel" />
            )}
            <div className="youtube-channel-details">
              <span className="youtube-channel-name">{isEmpty ? "-" : vid.channelName}</span>
              <span className="youtube-channel-subs">
                {isEmpty ? "-" : `${shortenNumber(vid.channelSubs)} Subscribers`}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoDetails;
