import { FC, useState, useEffect, useContext } from "react";
import "./PomModals.css";
import {
  Button,
  LineInput,
  Modal,
  DropDownButton,
  DropDownMenu,
  InfoHover,
} from "../../../elements";
import { calulateTimePeriod, useForm } from "../../../utils";
import { GlobalContext } from "../../../context/GlobalState";

interface NewSessionModalProps {
  handleCloseModal: () => void;
}

export const NewSessionModal: FC<NewSessionModalProps> = ({ handleCloseModal }) => {
  const { createSession  } = useContext(GlobalContext);
  const [dropDown, setDropDown] = useState<string>("");
  const [options, setOptions] = useState<any>([]);
  const [timePeriod, setTimePeriod] = useState<string>();
  const [cutOff, setCuttOff] = useState<number>(0);

  const { values, onChangeHandler, onSubmitHandler, resetValues } = useForm(newSessionHandler, {
     sessionName: "", 
     pomodoroPeriod: 25, 
     breakPeriod: 5, 
     cycles: 3, 
     startTime: new Date() 
  });

  function newSessionHandler() {
    createSession(values);
    handleCloseModal();
  }
  function handleSubmitButton(e: any) {
    if (e.target.classList[2] === "cancel") {
      resetValues();
      handleCloseModal();
      return;
    }
    onSubmitHandler(e);
  }
  useEffect(() => {
    setDropDown("");
    const result = calulateTimePeriod(
      new Date(),
      values.cycles,
      values.pomodoroPeriod,
      values.breakPeriod
    );
    const n = result.starts.length + result.ends.length;
    if (n === 14) {
      setCuttOff(18);
    } else if (n === 15) {
      setCuttOff(19);
    } else {
      setCuttOff(20);
    }
    setTimePeriod(`${result.starts} - ${result.ends} ${result.hours} ${result.minutes}`);
  }, [timePeriod, values]);

  useEffect(() => {
    switch (dropDown) {
      case "pomodoroPeriod":
        setOptions([1, 25, 30, 35, 40, 45, 50, 55, 60]);
        break;
      case "breakPeriod":
        setOptions([1, 5, 10, 15, 20, 25, 30]);
        break;
      default:
        setOptions([1, 2, 3, 4, 5]);
        break;
    }
  }, [dropDown]);

  const handleDropDownClicked = (type: string) => {
    setDropDown(dropDown === type ? "" : type);
  };

  return (
    <>
      <Modal>
        <div className="pomodoro-modal">
          <InfoHover type="new-session-info">
            <p>
              The closer you end your session to the calculated end time below,
              the greater your productivity + performance is for the session.
            </p>
            <p>Levels of Performance:</p>
            <p>🥇🥈🥉</p>
            <p>
              Note: you must complete at least one cycle for the session to
              count.
            </p>
          </InfoHover>
          <LineInput
            title={"Create a New Session"}
            onChangeHandler={onChangeHandler}
            values={values.sessionName}
            type={"sessionName"}
            hasEerror={values.sessionName.length > 16}
            errorMessage={"Cannot be more than 16 characters."}
            placeHolder="Name of Session"
          />
          <div className="pomodoro-new-session-period-container">
            <div className="pom-periods-options-container pomodoro-period">
              <span>Pomodoro Time</span>
              <DropDownButton
                name={values.pomodoroPeriod > 1 ? `${values.pomodoroPeriod} mins` : `${values.pomodoroPeriod} min`}
                type={"pom-dropdown cycle"}
                onHandleClick={() => handleDropDownClicked("pomodoroPeriod")}
                isClicked={dropDown === "pomodoroPeriod"}
              ></DropDownButton>
            </div>
            <div className="pom-periods-options-container break-period">
              <span>Break Time</span>
              <DropDownButton
                name={values.cycles !== 1 ? values.breakPeriod > 1 ? `${values.breakPeriod} mins` : `${values.breakPeriod} min` : "NA"}
                type={"pom-dropdown"}
                onHandleClick={() => handleDropDownClicked("breakPeriod")}
                isClicked={dropDown === "breakPeriod"}
                isDisabled={values.cycles === 1}
              ></DropDownButton>
            </div>
            <div className="pom-periods-options-container cyles-period">
              <span>Cycles</span>
              <DropDownButton
                name={`${values.cycles} ${values.cycles > 1 ? "cycles" : "cycle"}`}
                type={"pom-dropdown"}
                onHandleClick={() => handleDropDownClicked("cycles")}
                isClicked={dropDown === "cycles"}
              ></DropDownButton>
            </div>
          </div>
          <div className="pomodoro-period-options">
            <DropDownMenu
              isShowing={dropDown.length > 0}
              options={options}
              type={`new-session ${dropDown}`}
              handlePomMenuClicked={onChangeHandler}
            />
          </div>
          <span className="new-session-time">{timePeriod?.slice(0, cutOff)}</span>
          <span className="new-session-elapsed">{timePeriod?.slice(cutOff)}</span>
          <div className="pomodoro-modal-buttons">
            <Button 
              isDisabled={values.sessionName === "" || values.sessionName.length > 16}
              name={"Submit"}
              onHandleClick={handleSubmitButton}
              type={"form-submit new-session"}
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
