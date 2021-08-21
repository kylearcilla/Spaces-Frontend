import { FC, useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import { MenuItemButton } from "../../../../../elements";
import "./MenuItem.css";

interface MenuItemProps {
  text: string;
  type: string;
  iconName: string;
  handleOnClick: any;
  clicked: string;
}

const MenuItem: FC<MenuItemProps> = ({ text, type, iconName, handleOnClick, clicked }) => {
  const { isLeftBarClicked: leftClicked } = useContext(GlobalContext);

  return (
    <>
      <div onClick={handleOnClick}
           className={`side-menu-item-container ${type} ${leftClicked ? "left-clicked" : "not-left-clicked"}  ${clicked === type && "isClicked"}`}>
          <div className="side-menu-item-icon">
            <MenuItemButton
              iconName={iconName}
              type={`side-menu-item ${type}`}
              onHandleClick={(e: React.ChangeEvent<HTMLInputElement>) => handleOnClick(e)}
              />
          </div>
          <span className={`side-menu-item-text ${type} ${leftClicked && "left-clicked"}`}>
              {text}
          </span>
      </div>
    </>
  );
};
export default MenuItem;
