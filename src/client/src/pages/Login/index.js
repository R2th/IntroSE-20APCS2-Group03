import * as React from "react";
import styles from "./style.module.scss";

import Astronaut from "assets/astronaut.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/authContext";

const Login = () => {
  const [username, setUsername] = React.useState("handoikhongdoithu");
  const [password, setPassword] = React.useState("user12345");
  const navigate = useNavigate();

  const { token, handleLogin } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (token) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, []);

  if (token) {
    return null;
  }

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

    await handleLogin({ username: username, password: password });
  };

  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.form}>
        <div className={styles.art}>
          <div>
            <img src={Astronaut} alt="astronaut" />
            <p>Welcome to BytesGo</p>
          </div>
        </div>
        <div className={styles.paper}>
          <p>Welcome</p>
          <div className={styles.frame_mail_pass}>
            <div>
              <i className="fa fa-envelope-o icon" aria-hidden="true"></i>
              <input
                value={username}
                onChange={onChangeMail}
                placeholder="Username or email"
                className={styles.inputField}
              />
            </div>
            <div>
              <i className="fa fa-lock icon" aria-hidden="true"></i>
              <input
                value={password}
                type="password"
                onChange={onChangePassword}
                placeholder="Password"
                className={styles.inputField}
              />
            </div>
            <p>Forgot password?</p>
          </div>
          <div className={styles.login_options}>
            <div className={styles.login_button} onClick={onLogin}>
              <span>LOG IN</span>
            </div>
            <div className={styles.separate_other}>
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
                <span>Or</span>
              </div>
              <div className={styles.hoz_line}></div>
            </div>
            <div className={styles.groupBtn}>
              <div className={styles.oAuth2Btn}>
                <i className="fa fa-google"></i>
                <p>Google</p>
              </div>
              <div className={styles.oAuth2Btn}>
                <i className="fa fa-gitlab"></i>
                <p>Gitlab</p>
              </div>
              <div className={styles.oAuth2Btn}>
                <i className="fa fa-facebook"></i>
                <p>Facebook</p>
              </div>
            </div>
            <div className={styles.BottomText}>
              <span>New to BytesGo? </span>
              <a className={styles.BottomLink} href="/signup">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
