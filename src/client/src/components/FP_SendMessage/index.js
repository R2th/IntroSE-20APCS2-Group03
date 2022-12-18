import * as React from "react";
import styles from "./styles.module.scss";
//import Communications from "react-native-communications";
import Astronaut from "assets/svg/astronaut.svg";

const SendMessage = ({ setToken }) => {
  const Email_Phone = "BytesGo@gmail.com";
  const [inputCode, setInputCode] = React.useState("");
  const [errorForm, setErrorForm] = React.useState({});
  const [CodeVerification, setCodeVerification] = React.useState("123456");

  const onChangeInputCode = (e) => {
    setInputCode(e.target.value);
  };

  const onSetCodeVerification = () => {
    var ranCode = parseInt(
      (Math.random() * (1000000 - 100000) + 100000).toString()
    );
    setCodeVerification(ranCode);
    alert("Code after try again: " + ranCode);
  };
  const onForgotPassword = async () => {
    setErrorForm(validate());
    //
    //Communications.phonecall("0797961526", true);
    // const { token } = await loginUser({ phone_or_mail });
    // if (token) {
    //   setToken(token);
    //   window.location.reload(true);
    // }
  };

  const validate = () => {
    const err = {};
    if (!inputCode) {
      err.inputCode = "Please enter code.";
    } else if (inputCode.length < 6) {
      err.inputCode =
        "You only entered " +
        inputCode.length.toString() +
        " numbers. Please check the code and try again.";
    } else if (inputCode.length > 6) {
      err.inputCode =
        "You have entered more than 6 numbers. Please check your code and try again.";
    } else if (inputCode.localeCompare(CodeVerification)) {
      err.inputCode =
        "The number you entered does not match the code. Please try again.";
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
        <div className={styles.title}>Enter the Security Code</div>
        <div className={styles.input_code}>
          <div>
            <div>
              Please check the code in your email or phone number. This code
              consists of 6 numbers.{" "}
            </div>{" "}
            <div> We sent you the code to: {Email_Phone}</div>
            <input
              value={inputCode}
              onChange={onChangeInputCode}
              placeholder="Verification Code"
              className={styles.input_field}
            />
          </div>
          <p className={styles.validationText}>{errorForm.inputCode}</p>
        </div>
        <div className={styles.send_button} onClick={onForgotPassword}>
          SEND
        </div>
        <div className={styles.BottomText}>
          Can not get the message?
          <div className={styles.BottomLink} onClick={onSetCodeVerification}>
            Try again
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
