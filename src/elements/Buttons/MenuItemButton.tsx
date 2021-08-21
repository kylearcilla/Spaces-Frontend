import { FC } from "react";

interface MenuItemButtonProps {
  iconName: string;
  type: string;
  onHandleClick?: (any);
}

const MenuItemButton: FC<MenuItemButtonProps> = ({ iconName, onHandleClick, type }) => {
  return (
    <>
      <button className={`button clear-button ${type}`} onClick={onHandleClick}>
        <i className={`${iconName} ${type}`}></i>
      </button>
    </>
  );
};

export default MenuItemButton;
