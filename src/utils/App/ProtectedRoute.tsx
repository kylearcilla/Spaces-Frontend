import { FC, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

import HomePage from "../../pages/HomePage/HomePage";
import SpotifySettings from "../../components/Modals/SideMenuModals/SpotifySettingsModal/SpotifySettings";
import LandingPage from "../../pages/LandingPage/LandingPage";

const ProtectedRoute: FC<any> = ({ redirect, type, ...rest }) => {
  const { isLoggedIn } = useContext(GlobalContext);
  const isLanding = type === "landing";
  const isSettings = type === "spotify";

  const landingLogic = isLoggedIn ? <Redirect to={isSettings ? "/home/spotify" : "/home"} /> : <LandingPage />;
  const homeLogic = isLoggedIn ? (isSettings ? <SpotifySettings /> :  <HomePage />) : <Redirect to="/" />;

  return <Route {...rest} render={() => { return isLanding ? landingLogic : homeLogic; }}></Route>;
};

export default ProtectedRoute;
