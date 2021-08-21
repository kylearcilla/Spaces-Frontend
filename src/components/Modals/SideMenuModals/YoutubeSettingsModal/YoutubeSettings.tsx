import { FC, useState, useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import { WindowModal } from "../../../../elements";
import CustomPlayListModal from "./YTSettingsComponents/CustomPlayListModal";
import SubmitChosenList from "./YTSettingsComponents/SubmitChosenList";
import YoutubePlaylists from "./YTSettingsComponents/YoutubePlaylists";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../SpotifySettingsModal/VideoMusic.css";
import "./YoutubeSettings.css";
import { YoutubePlaylist } from "../../../../context/types";

interface YoutubeSettingsProps {
  handleCloseModal: () => void;
}

const YoutubeSettings: FC<YoutubeSettingsProps> = ({ handleCloseModal }) => {
  const {
    youtubeDetails,
    updateCurrentYoutubePlaylist,
    youtubeLogIn,
    youtubeLogOut,
  } = useContext(GlobalContext);
  const initialClicked = {} as YoutubePlaylist
  const [currentClicked, setClicked] = useState<YoutubePlaylist>(initialClicked);
  const [isIdFormClicked, setIdForm] = useState(false);
  const isLoggedIn = youtubeDetails?.name ? true : false;

  const handleChoosePlayList = () => {
    setClicked(initialClicked);
    updateCurrentYoutubePlaylist(currentClicked);
  };

  return (
    <>
      <WindowModal
        isShowing={true}
        handleCloseModal={handleCloseModal}
        type={`youtube-settings ${!isLoggedIn && "notLoggedIn"}`}
      >
        <div className="video-music-top-settings">
          <div className="video-music-settings header">
            <span className="sessions-title youtube">Youtube</span>
            <i className={`fab fa-youtube settings-icon youtube ${!isLoggedIn && "loggedOff"}`}></i>
          </div>
          <div className="video-music-settings-profile-container youtube">
            <div className="video-muic-profile-img-container">
              {youtubeDetails?.name && (
                <LazyLoadImage
                  src={youtubeDetails?.profileImgUrl}
                  className="video-music-settings-profile-img spotify"
                  alt="profile"
                />
              )}
            </div>
            <div className="video-music-settings-main-settings youtube">
              <div className="video-music-settings-details profile">
                <h4>Your Google Youtube Profile:</h4>
                <p>{youtubeDetails?.name ?? "-"}</p>
              </div>
              <div className="video-music-settings-details playlist">
                <h4>Current Playlist</h4>
                <p>{youtubeDetails?.currentPlaylist?.title ?? "-"}</p>
              </div>
              <div className="video-music-settings-buttons-display">
                {isLoggedIn ? (
                  <>
                    <button
                      className="clear-button settings-buttons"
                      onClick={() => youtubeLogIn(true)}
                    >
                      Replace Youtube Account
                    </button>
                    <button
                      className="clear-button settings-buttons"
                      onClick={() => setIdForm(true)}
                    >
                      Use an id to get a Playlist.
                    </button>
                    <button
                      className="clear-button settings-buttons disconnect"
                      onClick={() => youtubeLogOut(true)}
                    >
                      Disconnect Account
                    </button>
                  </>
                ) : (
                  <button
                    className="clear-button settings-buttons"
                    onClick={() => youtubeLogIn(true)}
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
          <YoutubePlaylists
            isLoggedIn={isLoggedIn}
            handleClickPlaylist={(playlist: YoutubePlaylist) => setClicked({ ...playlist })}
            currentClicked={currentClicked}
          />
        </div>
        <CustomPlayListModal
          isIdFormClicked={isIdFormClicked}
          handleCloseId={() => setIdForm(false)}
          handleEmptyClicked={() => setClicked(initialClicked)}
        />
        <SubmitChosenList
          isLoggedIn={isLoggedIn}
          listLength={youtubeDetails?.playlists?.length ?? 0}
          currentClicked={currentClicked}
          handleChoosePlayList={() => handleChoosePlayList()}
        />
      </WindowModal>
    </>
  );
};

export default YoutubeSettings;
