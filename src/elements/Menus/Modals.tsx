import { FC, ReactNode } from "react";
import { IconButton } from "..";
import "./Menus.css";

interface ModalProps {
  children?: ReactNode;
}

export const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <div className="modal-bg">
      <div className="modal-container">{children}</div>
    </div>
  );
};

interface WindowModalProps {
  isShowing: boolean;
  children?: ReactNode;
  handleCloseModal: () => void;
  type?: string;
}

export const WindowModal: FC<WindowModalProps> = ({
  isShowing,
  children,
  handleCloseModal,
  type,
}) => {
  return isShowing ? (
    <div className={`window-modal-bg ${type}`}>
      <div className={`window-modal-container ${type}`}>
        <IconButton
          iconName="fas fa-times"
          type="modal-close-button"
          onHandleClick={() => handleCloseModal()}
        />
        {children}
      </div>
    </div>
  ) : (
    <div></div>
  );
};
