import { FC, ReactNode } from "react";
import "./Misc.css";

interface InfoHoverProps {
  type: string;
  children?: ReactNode;
}

const InfoHover: FC<InfoHoverProps> = ({ type, children }) => {
  return (
    <div className={`info-hover-container ${type}`}>
      <div className={`info-hover-icon ${type}`}>?</div>
      <div className="info-hover-text">{children}</div>
    </div>
  );
};

export default InfoHover;
