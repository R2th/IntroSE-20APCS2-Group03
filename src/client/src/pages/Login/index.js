import * as React from "react";
import { loginUser } from "../../hooks/useAuth";
import "./style.scss";

import Astronaut from "assets/astronaut.svg";

const Login = ({ setToken }) => {
  const [username, setUsername] = React.useState("handoikhongdoithu");
  const [password, setPassword] = React.useState("user12345");

  const onChangeMail = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onLogin = async () => {
    if (!username | (username === "")) {
      alert("Please enter a username or email address!!");
      return;
    }
    if (password | (password === "")) {
      alert("Please enter a password!!");
      return;
    }

    const { token } = await loginUser({ username, password });
    if (token) {
      setToken(token);
      window.location.reload(true);
    }
  };

  React.useEffect(() => {
    var html = document.querySelector("body");
    html.style.setProperty("background-color", "#A78AF9");
  }, []);

  return (
    <div className="form">
      <div className="art">
        <div>
          <img src={Astronaut} alt="astronaut" />
          <p>Welcome to BytesGo</p>
        </div>
      </div>
      <div className="paper">
        <p>Welcome</p>
        <div className="frame_mail_pass">
          <div>
            <i className="fa fa-envelope-o icon" aria-hidden="true"></i>
            <input
              value={username}
              onChange={onChangeMail}
              placeholder="Username or email"
              className="input-field"
            />
          </div>
          <div>
            <i className="fa fa-lock icon" aria-hidden="true"></i>
            <input
              value={password}
              type="password"
              onChange={onChangePassword}
              placeholder="Password"
              className="input-field"
            />
          </div>
          <p>Forget password?</p>
        </div>
        <div className="login_options">
          <div className="login_button" onClick={onLogin}>
            LOG IN
          </div>
          <div className="separate_other">
            <div
              style={{
                width: 30,
                height: 30,
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2,
              }}
            >
              Or
            </div>
            <div className="hoz_line"></div>
          </div>
          <div className="group-btn">
            <div className="Oauth2-btn">
              <i className="fa fa-google"></i>
              <p>Google</p>
            </div>
            <div className="Oauth2-btn">
              <i className="fa fa-gitlab"></i>
              <p>Gitlab</p>
            </div>
            <div className="Oauth2-btn">
              <i className="fa fa-facebook"></i>
              <p>Facebook</p>
            </div>
          </div>
          <div className="BottomText">
            New to BytesGo?{" "}
            <a className="BottomLink" href="/signup">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
