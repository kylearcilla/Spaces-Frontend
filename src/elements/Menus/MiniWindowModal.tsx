import { FC, ReactNode } from "react";
import { IconButton } from "..";
import "./Menus.css";

interface MiniWindowModalProps {
  isShowing: boolean;
  children?: ReactNode;
  handleCloseModal: () => void;
  type?: string;
}

const MiniWindowModal: FC<MiniWindowModalProps> = ({ isShowing, children, handleCloseModal, type }) => {
  return isShowing ? (
    <div className={`mini-window-bg ${type}`}>
      <IconButton
        iconName="fas fa-times"
        type="modal-close-button"
        onHandleClick={() => handleCloseModal()}
      />
      {children}
    </div>
  ) : (
    <div></div>
  );
};

export default MiniWindowModal;
