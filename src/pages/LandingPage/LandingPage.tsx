import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { logInUser, registerUser } from "../../utils";
import { AppLogo, ellipse, picOne, picTwo, picThree, picFour, picFive, Data } from "../../elements";
import "./LandingPage.css";

const LandingPage = () => {
  const { loginOrRegister, googleLogin } = useContext(GlobalContext);

  const handleRegister = (email: string) => {
    registerUser(email).then(() => {
      console.log(`User ${email} successfully registered`);
    });
  };
  const handleSignIn = () => {
    googleLogin().then((email: string) => {
      if (!email) return;
      logInUser(email).then((res: any) => {
        if (res?.error) throw new Error("Error logging in user");
        if (res.user.length === 0) handleRegister(email);
        loginOrRegister(res.token);
      });
    });
  };

  return (
    <div className="landing-page">
      <section className="landing-page-section landing landing-page-img">
        <div className="landing-header">
          <AppLogo />
          <h1 onClick={handleSignIn} className="landing-header-register-title">Sign In</h1>
        </div>
        <div className="landing-container">
          <div className="landing-ellipse-container">
            <div className="landing-ellipse-text">
              <h1>SPACES</h1>
              <div className="landing-ellipse-subtitle-container">
                <h4 className="landing-subtitle">For</h4>
                <span id="changing-text"></span>
              </div>
              <h5>Put all the things you need to focus all in one place.</h5>
            </div>
            <img src={ellipse} alt="ellipse" className="landing-ellipse-img landing-page-img"/>
          </div>
        </div>
      </section>
      <section className="landing-page-section app-info">
        <div className="app-info-left landing-page-img"></div>
        <div className="app-info-right landing-page-img">
          <h1 className="app-info-title">WHAT IT DOES.</h1>
          <div className="app-info-header flow">
            <h1>FLOW</h1>
            <i className="fas fa-leaf"></i>
          </div>
          <p className="app-info-text">{Data.landingPageText.paragraphOne}</p>
          <p className="app-info-text">{Data.landingPageText.paragraphTwo}</p>
          <p className="app-info-text short">{Data.landingPageText.paragraphThree}</p>
          <p className="app-info-text short">{Data.landingPageText.paragraphFour}</p>
          <div className="app-info-header productivity">
            <h1>PRODUCTIVITY</h1>
            <i className="far fa-lightbulb"></i>
          </div><p className="app-info-text">{Data.landingPageText.paragraphFive}</p>
        </div>
      </section>
      <section className="landing-page-section showcase first landing-page-img">
        <span className="showcase-title first">Everything you need all in one place!</span>
        <img src={picOne} className="showcase-img first" alt="showcase-1" />
      </section>
      <section className="landing-page-section showcase second landing-page-img">
        <div className="showcase-section">
          <img src={picTwo} className="showcase-img pic-two" alt="showcase-2" />
          <div className="showcase-text-contianer">
            <h1 className="showcase-title top">Customize your Sessions</h1>
          </div>
        </div>
        <div className="showcase-section">
          <div className="showcase-text-contianer">
            <h1 className="showcase-title bottom">See How Well You Did</h1>
          </div>
          <img src={picThree} className="showcase-img pic-three" alt="showcase-3" />
        </div>
      </section>
      <section className="landing-page-section showcase third landing-page-img">
        <div className="showcase-section">
          <img src={picFour} className="showcase-img three-a" alt="showcase-4" />
          <div className="showcase-text-contianer">
            <h1 className="showcase-title three-a">Track your Sesions...</h1>
          </div>
        </div>
        <div className="showcase-section">
          <div className="showcase-text-contianer">
            <h1 className="showcase-title three-b">Through the Hours/Days/Weeks...</h1>
          </div>
          <img src={picFive} className="showcase-img three-b" alt="showcase-5" />
        </div>
        <span className="app-details">
          This app was made by
          <a href="https://kylearcilla.com/" target="_blank" rel="noreferrer">Kyle Arcilla.</a>
        </span>
      </section>
    </div>
  );
};

export default LandingPage;
