import { useState } from "react";
import { useNavigate } from "react-router-dom";

//   const token=response.data;
// localStorage.setItem('token',token);

const LoginScreen = () => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const url = "https://stagingapi.sugarlogger.com/login";
  const resBody = {
    username: emailOrMobile,
    password: password,
  };

  const handleLogin = () => {
    console.log(password, emailOrMobile);
    console.log("Login button clicked");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const { token_type, access_token, refresh_token } = data;
        localStorage.setItem("token", `${token_type} ${access_token}`);
        localStorage.setItem("refresh_token", `${refresh_token}`);

        console.log(token_type + " " + access_token + " " + refresh_token);
        // console.log(data.success);
        navigate("./Roles");
      })
      .catch((error) => {
        console.error("error during login: " + error);
      });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <div className="input-container">
          <label htmlFor="emailOrMobile">Email or Mobile:</label>
          <input
            type="text"
            id="emailOrMobile"
            value={emailOrMobile}
            onChange={(e) => setEmailOrMobile(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginScreen;
