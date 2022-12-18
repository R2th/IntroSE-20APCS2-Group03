import * as React from "react";
import styles from "./style.module.scss";

import Astronaut from "assets/astronaut.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/authContext";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState({
    content: "",
    isHide: true,
  });
  const [errorForm, setErrorForm] = React.useState({});
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
    setPassword({ ...password, content: e.target.value });
  };

  const onChangeHidePassword = () => {
    setPassword({ ...password, isHide: !password.isHide });
  };

  const validate = () => {
    const err = {};
    if (!username) {
      err.username = "Username can not be empty";
    }
    // else if () { //check from database
    //  err.username = "Invalid username or email";
    // }
    if (!password.content) {
      err.password = "Password can not be empty";
    }
    // else if (!password.content) { //check from database

    // }

    return err;
  };
  const onLogin = async () => {
    setErrorForm(validate());
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
              <i
                className="fa fa-envelope-o styles.icon"
                aria-hidden="true"
              ></i>
              <input
                value={username}
                onChange={onChangeMail}
                placeholder="Username or email"
                className={styles.inputField}
              />
            </div>
            <p className={styles.validationText}>{errorForm.username}</p>
            <div>
              <i className="fa fa-lock styles.icon" aria-hidden="true"></i>
              <input
                value={password.content}
                type={password.isHide ? "text" : "password"}
                onChange={onChangePassword}
                placeholder="Password"
                className={styles.inputField}
              />
              <i
                class={password.isHide ? "fa fa-eye" : "fa fa-eye-slash"}
                aria-hidden="true"
                onClick={onChangeHidePassword}
                style={{
                  right: 15,
                  cursor: "pointer",
                }}
              ></i>
            </div>
            <p className={styles.validationText}>{errorForm.password}</p>
            <p>
              <a href="/forgot_password">Forgot password?</a>
            </p>
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
