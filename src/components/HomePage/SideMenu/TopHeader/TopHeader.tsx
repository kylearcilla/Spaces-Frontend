import { FC } from "react";
import moment from "moment";
import { AppLogo } from "../../../../elements";
import "./TopHeader.css";

interface TopHeaderProps {
  isLeftBarClicked: boolean;
}

const TopHeader: FC<TopHeaderProps> = ({ isLeftBarClicked }) => {
  return (
    <div className={"side-menu-top-header"}>
      <div className={`side-menu-top-header logo-container ${isLeftBarClicked ? "clicked" : ""}`}>
        <AppLogo />
      </div>
      <div className={`side-menu-top-header today-header ${isLeftBarClicked ? "left-clicked" : ""}`}>
        <h1>Today</h1>
        <h4>{moment(new Date()).format("ddd, MMM DD")}</h4>
      </div>
    </div>
  );
};

export default TopHeader;
