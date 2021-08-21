import { FC, useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { GlobalContext } from "../../../../context/GlobalState";
import { InfoHover, WindowModal, GoogleLogo } from "../../../../elements";
import { deleteAccount, replaceAccount } from "../../../../utils";
import "./SettingsModal.css";

interface SettingsModalInterface {
  handleCloseModal: () => void;
}

const SettingsModal: FC<SettingsModalInterface> = ({ handleCloseModal }) => {
  const { googleLogin, user, logout, loginOrRegister, appToken } = useContext(GlobalContext);

  const handleDeleteAccount = () => {
    deleteAccount(user!.googleEmail, appToken!).then((res: any) => {
      if (res.error) throw new Error(res.error);
      logout();
    });
  };
  const handleReplaceAccount = (oldEmail: string, newEmail: string) => {
    replaceAccount(oldEmail, newEmail, appToken!).then((res: any) => {
      if (res?.error) throw new Error(res.error);
      loginOrRegister(res.token);
    });
  };

  return (
    <>
      <WindowModal
        isShowing={true}
        handleCloseModal={handleCloseModal}
        type="settings-modal"
      >
        <div className="sessions-modal settings">
          <div className="sessions-header settings">
            <h1 className="sessions-title settings">Settings</h1>
          </div>
          <h2 className="settings-modal-title">Your Google Account Information</h2>
          <div className="settings-modal-details">
            <LazyLoadImage
              className="settings-modal-profile-img"
              alt="google-profile"
              src={user?.googleProfileImgUrl}
            />
            <div className="settings-modal-profile-details">
              <h3 className="settings-modal-subtitle email-title">Your Google Email</h3>
              <h3 className="settings-modal-subtitle email-name">{user?.googleEmail}</h3>
              <div className="settings-modal-buttons-container">
                <button className="clear-button settings-buttons settings" onClick={() => { handleCloseModal(); logout(); }}>
                  Log Out
                </button>
                <button className="clear-button settings-buttons disconnect settings" onClick={handleDeleteAccount}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              const oldEmail = user!.googleEmail;
              googleLogin().then((newEmail: string) => {
                if (!newEmail) return;
                handleReplaceAccount(oldEmail, newEmail);
              });
            }}
            className="button google-btn replace"
          >
            <img src={GoogleLogo} alt="google-logo" className="google-btn-replace icon" />
            Replace Account
          </button>
          <InfoHover type={"settings-hover-info"}>
            <p>Replace your current account with a different gmail.</p>
          </InfoHover>
        </div>
      </WindowModal>
    </>
  );
};

export default SettingsModal;
