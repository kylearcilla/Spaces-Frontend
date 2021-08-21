import { FC } from "react";
import "./Forms.css";
import ErrorDetails from "../misc/ErrorDetails";

interface InputProps {
  title: string;
  onChangeHandler: any;
  values: any;
  type: string;
  hasEerror: boolean;
  errorMessage: string;
  placeHolder: string;
}

const LineInput: FC<InputProps> = ({ title, onChangeHandler, values, type, hasEerror, errorMessage, placeHolder }) => {
  return (
    <>
      <h3 className="line-input heading">{title}</h3>
      <input
        className={`input-form line-input ${type}`}
        placeholder={placeHolder}
        onChange={onChangeHandler}
        value={values}
      ></input>
      <ErrorDetails hasError={hasEerror} errorMessage={errorMessage} />
    </>
  );
};

export default LineInput;
