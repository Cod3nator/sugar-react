import logo from "../assets/logo.svg";
import down_arw from "../assets/down_arw.svg";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

const Top_bar = () => {
  const [showPop, setShowPop] = useState(false);

  const openPop = useCallback(() => {
    setShowPop((showPop) => !showPop);
  }, []);

  function handleClick() {
    console.log("clicked");
  }
  const navigate = useNavigate(null);

  function switchAccount() {
    navigate("/Roles");
  }
  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("selectedRole");
    localStorage.removeItem("loginAs");
    navigate("/");
  }
  return (
    <div className="top-bar">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="profile-btn">
        <div className="name">Lorem, ipsum dolor.</div>
        <div className="drop-btn">
          <img src={down_arw} alt="" onClick={openPop} />
          {showPop && (
            <div className="drop-content">
              <div className="drop-btn switch-acc" onClick={switchAccount}>
                Switch Accounts
              </div>
              <div className="drop-btn" onClick={handleClick}>
                Settings
              </div>
              <div className="drop-btn" onClick={handleClick}>
                Change Password
              </div>
              <div className="drop-btn" onClick={logOut}>
                Log Out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Top_bar;
