import { FC } from "react";
import "./Menus.css";

type DropDownMenuInterface = {
  type: string;
  isShowing: boolean;
  options: string[];
  handlePomMenuClicked: (event: any) => void;
};

// Drop Down Menu
const DropDownMenu: FC<DropDownMenuInterface> = ({ type, isShowing, options, handlePomMenuClicked }) => {
  const optionsList = options.map((o) => {
    return (
      <div onClick={handlePomMenuClicked} className={`mini-menu-item ${type}`}>
        {`${o}`}
      </div>
    );
  });

  return (
    <div className={`mini-menu ${type}`} style={isShowing ? { display: "block" } : { display: "none" }}>
      {optionsList}
    </div>
  );
};

export default DropDownMenu;
