import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { GlobalContext } from "../../../../context/GlobalState";
import { Button, WindowModal } from "../../../../elements";
import { getLoginURL, useSpotifyAuth } from "../../../../utils";
import SpotifyPlaylists from "./SpotifySettingsComponents/SpotifyPlaylists";
import LoggedInModal from "./SpotifySettingsComponents/LoggedInModal";
import "./VideoMusic.css";
import { SpotifyPlayList } from "../../../../context/types";

const code = new URLSearchParams(window.location.search).get("code") ?? "";

const SpotifySettings = () => {
  const { spotifyDetails, updatedCurrentSpotifyPlaylist, spotifyLogOut } = useContext(GlobalContext);
  const [currentClicked, setClicked] = useState<SpotifyPlayList | null>();
  const [signedInModal, setSignedInModal] = useState(false);

  const history = useHistory();
  useSpotifyAuth(code, toggleSignInModal);

  const isLoggedIn = spotifyDetails?.userDetails ? true : false;
  const loggedinState = isLoggedIn ? "loggedIn" : "notLoggedIn";

  const handleSpotifyLogIn = () => {
    const url = getLoginURL([
      "streaming",
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-modify-playback-state",
      "playlist-read-private",
      "playlist-read-collaborative",
    ]);
    window.location.href = url;
  };
  const handleChoosePlayList = async () => {
    await updatedCurrentSpotifyPlaylist(currentClicked!);
    setClicked(null);
  };
  function toggleSignInModal() {
    setSignedInModal(true);
  }
  function okPressed() {
    setSignedInModal(false);
    window.location.href = "/home/spotify";
  }

  return (
    <WindowModal
      isShowing={true}
      handleCloseModal={() =>  history.push("/home")}
      type={`spotify-settings ${loggedinState}`}
    >
      <div className="video-music-settings">
        <div className="video-music-settings header">
          <span className="sessions-title spotify">Spotify</span>
          <i className={`fab fa-spotify settings-icon spotify ${!isLoggedIn && "no-user"}`}></i>
        </div>
        <div className="video-music-settings-profile-container youtube">
          <div className="video-muic-profile-img-container">
            {isLoggedIn && (
              <LazyLoadImage
                alt="spotify-profile"
                src={spotifyDetails?.userDetails?.profileImgUrl}
                className="video-music-settings-profile-img spotify"
              />
            )}
          </div>
          <div className="video-music-settings-main-settings">
            <div className="video-music-settings-details profile">
              <h4>Your Spotify Profile:</h4>
              <p>{isLoggedIn ? spotifyDetails?.userDetails?.name : "-"}</p>
            </div>
            <div className="video-music-settings-details playlist">
              <h4>Current Playlist</h4>
              <p>{isLoggedIn? spotifyDetails?.currentPlaylist ? spotifyDetails?.currentPlaylist?.title : "None Selected" : "-"}</p>
            </div>
            {isLoggedIn ? (
              <button className="clear-button settings-buttons disconnect spotify" onClick={() => spotifyLogOut()}>
                Disconnect
              </button>
            ) : (
              <button className="clear-button settings-buttons spotify" onClick={() => handleSpotifyLogIn()}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
      {isLoggedIn ? (
        <>
          <SpotifyPlaylists
            currentClicked={currentClicked}
            handleClickCard={(clicked: any) => setClicked(clicked)}
          />
          {currentClicked ? (
            <Button
              name={`Choose  "${currentClicked.title}"`}
              onHandleClick={() => handleChoosePlayList()}
              type="youtube-playlist-choose-new"
            />
          ) : (
            <div className="empty-state-text-button">Choose a Playlist!</div>
          )}
        </>
      ) : (
        <div className="empty-state-text-button">No Account Selected</div>
      )}
      <LoggedInModal
        modalClicked={signedInModal}
        handleCloseModal={okPressed}
      />
    </WindowModal>
  );
};
export default SpotifySettings;
