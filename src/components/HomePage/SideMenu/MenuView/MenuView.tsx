import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../../../context/GlobalState";
import MenuItem from "./MenuItem/MenuItem";
import QuoteBox from "./MenuItem/QuoteBox";
import "./MenuView.css";


const MenuView = () => {
  const [clicked, setClicked] = useState("none");
  const history = useHistory();
  const { isLeftBarClicked: leftClicked, setModal } = useContext(GlobalContext);

  const handleOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    let className = e.target.classList[3]
    if (["side-menu-item-text", "side-menu-item-container"].includes(e.target.classList[0])) {
      className = e.target.classList[1];
    }

    if (className === clicked) { setClicked("none"); return; }
    if (className === "today-session") {
      setModal("Today's Sessions");
    } else if (className === "session-stats") {
      setModal("Session's Stats");
    } else if (className === "settings") {
      setModal("Settings");
    } else if (className === "youtube-settings") {
      setModal("Youtube Settings");
    } else if (className === "spotify-settings") {
      history.push("/home/spotify")
    }
  };

  return (
    <>
      <div className={`side-menu-view ${leftClicked && "left-clicked"}`}>
        <MenuItem
          text={"Today's Sessions"} type={"today-session"}
          iconName={"fas fa-clipboard-list"}
          handleOnClick={handleOnClick}
          clicked={clicked}
        />
        <MenuItem
          text={"Session Stats"} type={"session-stats"}
          iconName={"fas fa-calendar-alt"}
          handleOnClick={handleOnClick}
          clicked={clicked}
        />
        <div className={`divider side-menu-divider ${leftClicked && "left-clicked"}`}></div>
        <MenuItem
          text={"Youtube"} type={"youtube-settings"}
          iconName={"fab fa-youtube"} clicked={clicked}
          handleOnClick={handleOnClick}
        />
        <MenuItem
          text={"Spotify"} type={"spotify-settings"}
          iconName={"fab fa-spotify"} clicked={clicked}
          handleOnClick={handleOnClick}
        />
        <MenuItem
          text={"Settings"} type={"settings"}
          iconName={"fas fa-cog"} clicked={clicked}
          handleOnClick={handleOnClick}
        />
        <QuoteBox isHidden={leftClicked}/>
      </div>
    </>
  );
};
export default MenuView;
