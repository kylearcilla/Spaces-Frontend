import { FC } from "react";
import "./Misc.css";

interface ErrorDetailsProps {
  hasError: boolean;
  errorMessage: string;
  type?: string;
}

const ErrorDetails: FC<ErrorDetailsProps> = ({ hasError, errorMessage }) => {
  return <div className={`error-details ${hasError}`}>{errorMessage}</div>;
};

export default ErrorDetails;
