import { FC } from "react";
import { Button, Modal } from "../../../../../elements";
import "../VideoMusic.css";

interface LoggedInModalProps {
  modalClicked: boolean;
  handleCloseModal: any;
}

const LoggedInModal: FC<LoggedInModalProps> = ({
  modalClicked,
  handleCloseModal,
}) => {
  return modalClicked ? (
    <Modal>
      <div className="pomodoro-modal spotify-logged-in">
        <span className="spotify-user-signed-in-text">
          Spotify Sign in Successful!
        </span>
        <div className="pomodoro-modal-buttons">
          <Button
            name={"OK"}
            onHandleClick={() => handleCloseModal()}
            type={"form-submit cancel"}
          ></Button>
        </div>
      </div>
    </Modal>
  ) : (
    <></>
  );
};

export default LoggedInModal;
