import * as React from "react";
import styles from "./styles.module.scss";
import Astronaut from "assets/svg/astronaut.svg";
const SetNewPassword = ({ setToken }) => {
  const [newPassword, SetNewPassword] = React.useState({
    content: "",
    isHide: true,
  });
  //const [isHidepass, setIsHidePassword] = React.useState("password");
  const [confirmPassword, setConfirmPassword] = React.useState({
    content: "",
    isHide: true,
  });
  const [errorForm, setErrorForm] = React.useState({});
  //const [isHideconfirmpass, setIsHideConfirmPassword] = React.useState("password");

  const onChangePassword = (e) => {
    SetNewPassword(e.target.value);
  };

  const onChangeHidePassword = () => {
    SetNewPassword({ ...newPassword, isHide: !newPassword.isHide });
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onChangeHideConfirmPassword = () => {
    setConfirmPassword({
      ...confirmPassword,
      isHide: !confirmPassword.isHide,
    });
  };

  const onSetNewPassword = async () => {
    setErrorForm(validate());
    // const { token } = await loginUser({ phone_or_mail });
    // if (token) {
    //   setToken(token);
    //   window.location.reload(true);
    // }
  };

  const validate = () => {
    const err = {};
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;
    if (!regex.test(newPassword)) {
      err.newPassword = "Password must be at least 8 characters, A-Z, a-z, 0-9";
    }
    if (newPassword !== confirmPassword) {
      err.confirmPassword = "Password does not match.";
    }
    return err;
  };

  React.useEffect(() => {
    var html = document.querySelector("body");
    html.style.setProperty("background-color", "#A78AF9");
  }, []);

  return (
    <div className={styles.form}>
      <div className={styles.art}>
        <div>
          <img src={Astronaut} alt="astronaut" />
          <p>Welcome to BytesGo</p>
        </div>
      </div>
      <div className={styles.frame}>
        <p>Set New Password</p>
        <div className={styles.frame_set_pass}>
          <div>
            <input
              value={newPassword.content}
              onChange={onChangePassword}
              placeholder="Create new password"
              className={styles.inputField}
              type={newPassword.isHide ? "text" : "password"}
            />
            <i
              class={
                newPassword.isHide
                  ? "fa fa-eye style.icon"
                  : "fa fa-eye-slash style.icon"
              }
              aria-hidden="true"
              onClick={onChangeHidePassword}
            ></i>
          </div>
          <p className={styles.validationText}>{errorForm.newPassword}</p>
          <div>
            <input
              value={confirmPassword.content}
              onChange={onChangeConfirmPassword}
              placeholder="Confirm new password"
              className={styles.inputField}
              type={confirmPassword.isHide ? "text" : "password"}
            />
            <i
              class={
                confirmPassword.isHide
                  ? "fa fa-eye style.icon"
                  : "fa fa-eye-slash style.icon"
              }
              aria-hidden="true"
              onClick={onChangeHideConfirmPassword}
            ></i>
          </div>
          <p className={styles.validationText}>{errorForm.confirmPassword}</p>
          <div className={styles.send_message} onClick={onSetNewPassword}>
            CHANGE
          </div>
          <div className={styles.BottomText}>
            Back to{" "}
            <a className={styles.BottomLink} href="/login">
              LOG IN
            </a>{" "}
            page
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
