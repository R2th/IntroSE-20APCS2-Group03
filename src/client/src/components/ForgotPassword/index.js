import * as React from "react";
import { loginUser } from "../../hooks/useAuth";
import styles from "./styles.module.scss";

import Astronaut from "assets/astronaut.svg";
import FP_SendMessage from "components/FP_SendMessage";
const ForgotPassword = ({ setToken }) => {
  var [phone_or_mail, setPhone_or_Mail] = React.useState("");
  const [errorForm, setErrorForm] = React.useState({});
  var isSend = true;
  const onChangeMail = (e) => {
    setPhone_or_Mail(e.target.value);
  };

  const onForgotPassword = async () => {
    setErrorForm(validate());
    // const { token } = await loginUser({ phone_or_mail });
    // if (token) {
    //   setToken(token);
    //   window.location.reload(true);
    // }
  };

  const validate = () => {
    const err = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    // if (phone_or_mail.length < 10 && parseInt(phone_or_mail) > 0) {
    //   err.phone_or_mail = "Invalid phone number";
    //   isSend = false;
    // } else {
    //   if (!phone_or_mail) {
    //     err.phone_or_mail = "Please enter your email";
    //     isSend = false;
    //   } else if (
    //     !regex.test(phone_or_mail) &&
    //     !regexPhone.test(phone_or_mail)
    //   ) {
    //     err.phone_or_mail = "Invalid Email";
    //   }
    //   isSend = false;
    // }

    if (!regex.test(phone_or_mail) || !regexPhone.test(phone_or_mail)) {
      err.phone_or_mail = "Invalid Email or Phone Number";
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
        <p>Forgot Password</p>
        <div className={styles.frame_phone_mail}>
          <div>
            <input
              value={phone_or_mail}
              onChange={onChangeMail}
              placeholder="Phone number or Email"
              className={styles.inputField}
            />
            <p className={styles.validationText}>{errorForm.phone_or_mail}</p>
          </div>
          <div className={styles.send_message} onClick={onForgotPassword}>
            SEND
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

export default ForgotPassword;