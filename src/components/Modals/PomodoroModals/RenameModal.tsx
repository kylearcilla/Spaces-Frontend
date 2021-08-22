import { FC, useContext } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { Button, LineInput, Modal } from "../../../elements";
import { useForm } from "../../../utils";

interface RenameModalProps {
  handleCloseModal: () => void;
}

export const RenameModal: FC<RenameModalProps> = ({ handleCloseModal }) => {
  const { renameSession } = useContext(GlobalContext);
  const { values, onChangeHandler, onSubmitHandler, resetValues } = useForm(renameSessionHandler, { newSessionName: "" });

  function renameSessionHandler() {
    renameSession(values.newSessionName);
    handleCloseModal();
  }
  function handleSubmitButton(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.classList[2] === "cancel") {
      resetValues();
      handleCloseModal();
      return;
    }
    onSubmitHandler(e);
    handleCloseModal();
  }
  
  return (
    <>
      <Modal>
        <div className="pomodoro-modal">
          <LineInput
            title={"Edit Session Name"}
            onChangeHandler={onChangeHandler}
            values={values.newSessionName}
            type={"newSessionName"}
            hasEerror={values.newSessionName.length > 16}
            errorMessage={"Cannot be more than 16 characters."}
            placeHolder={"New Title Name"}
          />
          <div className="pomodoro-modal-buttons">
            <Button
              isDisabled={values.newSessionName === "" || values.newSessionName.length > 16}
              name={"Submit"}
              onHandleClick={handleSubmitButton}
              type={"form-submit newSessionName"}
            ></Button>
            <Button
              name={"Cancel"}
              onHandleClick={handleSubmitButton}
              type={"form-submit cancel"}
            ></Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
