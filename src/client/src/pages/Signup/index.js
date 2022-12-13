import * as React from "react";
import { SignupUser } from "../../hooks/useAuth";
import "./style.scss";

import Astronaut from "assets/astronaut.svg";

const Signup = ({ setToken }) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmpassword, setConfirmPassword] = React.useState("");
  const [day, setDay] = React.useState();
  const [month, setMonth] = React.useState();
  const [year, setYear] = React.useState();
  const [formErrors, setFormerrors] = React.useState({});
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeMail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onChangeDay = (e) => {
    setDay(e.target.value);
  };

  const onChangeMonth = (e) => {
    setMonth(e.target.value);
  };

  const onChangeYear = (e) => {
    setYear(e.target.value);
  };

  const generateYear = () => {
    const arr = [];
    const start = 1900;
    const end = new Date().getFullYear();

    for (let i = end; i >= start; i--) {
      arr.push(<option value={i}>{i}</option>);
    }
    return arr;
  };

  const generateMonth = () => {
    const arr = [];
    const start = 1;
    const end = 12;

    for (let i = start; i <= end; i++) {
      arr.push(<option value={i}>{i}</option>);
    }
    return arr;
  };

  const generateDay = () => {
    const arr = [];
    const start = 1;
    const end = 31;

    for (let i = start; i <= end; i++) {
      arr.push(<option value={i}>{i}</option>);
    }
    return arr;
  };

  const validate = () => {
    const err = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!username) {
      err.username = "Please enter username";
    } else if (username.length < 6) {
      err.username = "Username must be at least 6 characters";
    }

    if (!email) {
      err.email = "Please enter your email";
    } else if (!regex.test(email)) err.email = "Invalid Email";

    if (!password) {
      err.password = "Please enter your password";
    } else if (password.length < 8)
      err.password = "Password must be at least 8 characters";

    if (!confirmpassword) {
      err.confirmpassword = "Please enter confirm password";
    } else if (password !== confirmpassword) {
      err.confirmpassword = "Your password must be the same";
    }

    return err;
  };

  const onSignUp = async () => {
    setFormerrors(validate());

    const { token } = await SignupUser({
      username,
      email,
      password,
    });
    if (token) {
      setToken(token);
      window.location.reload(true);
    }
  };

  React.useEffect(() => {
    var html = document.querySelector("body");
    html.style.setProperty("background-color", "#A78AF9");
  }, [formErrors]);

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
            <i className="fa fa-user-circle icon" aria-hidden="true"></i>
            <input
              value={username}
              onChange={onChangeUsername}
              placeholder="Username"
              className="input-field"
            />
            <p>{formErrors.username}</p>
          </div>
          <div>
            <i className="fa fa-envelope-o icon" aria-hidden="true"></i>
            <input
              value={email}
              onChange={onChangeMail}
              placeholder="Email"
              className="input-field"
            />
            <p>{formErrors.email}</p>
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
            <p>{formErrors.password}</p>
          </div>
          <div>
            <i className="fa fa-lock icon" aria-hidden="true"></i>
            <input
              value={confirmpassword}
              type="password"
              onChange={onChangeConfirmPassword}
              placeholder="Confirm Password"
              className="input-field"
            />
            <p>{formErrors.confirmpassword}</p>
          </div>
          <div>
            <div>Date of Birth</div>
            <span>
              <select
                aria-label="day"
                className="bd_day select"
                value={day}
                onChange={onChangeDay}
              >
                {generateDay()}
              </select>
              <select
                aria-label="month"
                className="bd_month select"
                value={month}
                onChange={onChangeMonth}
              >
                {generateMonth()}
              </select>
              <select
                aria-label="year"
                className="bd_year select"
                value={year}
                onChange={onChangeYear}
              >
                {generateYear()}
              </select>
            </span>
          </div>
        </div>
        <div className="login_options">
          <div className="login_button" onClick={onSignUp}>
            SIGN UP
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
            Already have account?{" "}
            <a className="BottomLink" href="/login">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
