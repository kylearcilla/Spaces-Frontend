import { useState, useContext, FC } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import { Button, LineInput, Modal } from "../../../../../elements";
import { useForm, getPlayListDetails } from "../../../../../utils";
import "../YoutubeSettings.css";

interface CustomPlayListModalProps {
  isIdFormClicked: boolean;
  handleCloseId: () => void;
  handleEmptyClicked: () => void;
}

const CustomPlayListModal: FC<CustomPlayListModalProps> = ({ isIdFormClicked, handleCloseId, handleEmptyClicked}) => {
  const { updateCurrentYoutubePlaylist, youtubeCreds } = useContext(GlobalContext);
  const [isIdValid, setIsIdValid] = useState(true);
  const { values, onChangeHandler, resetValues } = useForm(validateList, { ytListId: "" });

  const resetAllValues = () => {
    handleCloseId();
    handleEmptyClicked();
    resetValues();
  };
  async function validateList() {
    const res = await getPlayListDetails(values.ytListId, youtubeCreds?.accessToken ?? "");
    if (res.items.length === 0) {
      setIsIdValid(false);
      return;
    }
    resetAllValues();
    const playlist = res.items[0];
    updateCurrentYoutubePlaylist({
      id: playlist.id,
      title: playlist.snippet.title,
      thumbnailURL: playlist.snippet.thumbnails.high,
      description: playlist.snippet.description,
    });
  }

  return isIdFormClicked ? (
    <Modal>
      <div className="pomodoro-modal">
        <LineInput
          title={"Submit a Playlist ID"}
          onChangeHandler={onChangeHandler}
          values={values.ytListId}
          type={"ytListId"}
          hasEerror={!isIdValid}
          errorMessage={"Id is not a valid playlist ID."}
          placeHolder={"PLzbwD_XvqPtcxlJGz0bxo17aQm67EhLh5"}
        />
        <div className="pomodoro-modal-buttons">
          <Button
            name={"Submit"}
            onHandleClick={() => validateList()}
            type={"form-submit newSessionName"}
          ></Button>
          <Button
            name={"Cancel"}
            onHandleClick={() => handleCloseId()}
            type={"form-submit cancel"}
          ></Button>
        </div>
      </div>
    </Modal>
  ) : (
    <></>
  );
};
export default CustomPlayListModal;
