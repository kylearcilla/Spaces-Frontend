import { FC } from "react";
import { YoutubePlaylist } from "../../../../../context/types";
import { Button } from "../../../../../elements";
import "../YoutubeSettings.css";

interface SubmitChosenListProps {
  isLoggedIn: boolean;
  currentClicked: YoutubePlaylist;
  handleChoosePlayList: () => void;
  listLength: number;
}

const SubmitChosenList: FC<SubmitChosenListProps> = ({
  isLoggedIn,
  currentClicked,
  handleChoosePlayList,
  listLength,
}) => {
  return (
    <>
      {Object.keys(currentClicked).length !== 0 ? (
        <Button
          name={`Choose  "${currentClicked.title}"`}
          onHandleClick={() => handleChoosePlayList()}
          type="youtube-playlist-choose-new"
        />
      ) : (
        <div className="empty-state-text-button">
          {isLoggedIn
            ? listLength !== 0
              ? "Choose a Playlist!"
              : "This account has no playlists"
            : "No Account Selected"}
        </div>
      )}
    </>
  );
};

export default SubmitChosenList;
