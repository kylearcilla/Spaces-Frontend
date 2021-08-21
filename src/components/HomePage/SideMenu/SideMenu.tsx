import { useContext, FC } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { IconButton } from "../../../elements";
import MenuView from "./MenuView/MenuView";
import TopHeader from "./TopHeader/TopHeader";
import "./SideMenu.css";

const SideMenu: FC<{handleLeftClicked: (e: any) => void }> = ({ handleLeftClicked }) => {
  const { isLeftBarClicked } = useContext(GlobalContext);

  return (
    <>
    <div className={`side-menu ${isLeftBarClicked}`}>
      <TopHeader isLeftBarClicked={isLeftBarClicked} />
      <IconButton
        iconName={`${isLeftBarClicked ? "fas fa-angle-double-right" : "fas fa-angle-double-left"} `}
        onHandleClick={handleLeftClicked}
        type={`left-side-button ${isLeftBarClicked ? "isClicked" : "notClicked"}`}
      ></IconButton>
      <MenuView/>
    </div>
    </>
  );
};

export default SideMenu;
