import * as React from "react";
import { loginUser } from "../../hooks/useAuth";
import styles from "./styles.module.scss";
//import Communications from "react-native-communications";
import Astronaut from "assets/astronaut.svg";

const SendMessage = ({ setToken }) => {
  const Email_Phone = "BytesGo_SE_Project@gmail.com";
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
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.form}>
        <div className={styles.art}>
          <div>
            <img src={Astronaut} alt="astronaut" />
            <p>Welcome to BytesGo</p>
          </div>
        </div>
        <div className={styles.frame}>
          <div className={styles.dump}>
            <p>Security Code</p>
            <div className={styles.title}> We sent you the code to</div>
            <div
              className={styles.title}
              style={{ color: "red", fontSize: 18 }}
            >
              {" "}
              <u>{Email_Phone}</u>
            </div>
            <div className={styles.input_code}>
              <div>
                <input
                  value={inputCode}
                  onChange={onChangeInputCode}
                  placeholder="Verification Code"
                  className={styles.inputField}
                />
              </div>
              {errorForm.inputCode && (
                <span className={styles.validationText}>
                  {errorForm.inputCode}
                </span>
              )}
            </div>

            <div className={styles.send_button} onClick={onForgotPassword}>
              SEND
            </div>
            <div className={styles.BottomText}>
              Can not get the message?
              <div
                className={styles.BottomLink}
                onClick={onSetCodeVerification}
              >
                Try again
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
