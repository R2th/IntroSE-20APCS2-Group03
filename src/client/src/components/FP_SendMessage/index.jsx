import * as React from 'react';

import Astronaut from 'assets/svg/astronaut.svg';
import styles from './styles.module.scss';
// import Communications from "react-native-communications";
const EMAIL_PHONE = 'BytesGo_SE_Project@gmail.com';

function SendMessage() {
  const [inputCode, setInputCode] = React.useState('');
  const [errorForm, setErrorForm] = React.useState({});
  const [CodeVerification, setCodeVerification] = React.useState('123456');

  const onChangeInputCode = (e) => {
    setInputCode(e.target.value);
  };

  const onSetCodeVerification = () => {
    const ranCode = parseInt((Math.random() * (1000000 - 100000) + 100000).toString(), 10);
    setCodeVerification(ranCode);
    alert(`Code after try again: ${ranCode}`);
  };

  const validate = () => {
    const err = {};
    if (!inputCode) {
      err.inputCode = 'Please enter code.';
    } else if (inputCode.length < 6) {
      err.inputCode = `You only entered ${inputCode.length.toString()} numbers. Please check the code and try again.`;
    } else if (inputCode.length > 6) {
      err.inputCode = 'You have entered more than 6 numbers. Please check your code and try again.';
    } else if (inputCode.localeCompare(CodeVerification)) {
      err.inputCode = 'The number you entered does not match the code. Please try again.';
    }
    return err;
  };

  const onForgotPassword = async () => {
    setErrorForm(validate());
    //
    // Communications.phonecall("0797961526", true);
    // const { token } = await loginUser({ phone_or_mail });
    // if (token) {
    //   setToken(token);
    //   window.location.reload(true);
    // }
  };

  React.useEffect(() => {
    const html = document.querySelector('body');
    html.style.setProperty('background-color', '#A78AF9');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.background} />
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
            <u>{EMAIL_PHONE}</u>
            <div className={styles.title} style={{ color: 'red', fontSize: 18 }}>
              {' '}
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
              {errorForm.inputCode && <span className={styles.validationText}>{errorForm.inputCode}</span>}
            </div>
            <div className={styles.send_button} onClick={onForgotPassword} aria-hidden>
              SEND
            </div>
            <div className={styles.BottomText}>
              Can not get the message?
              <div className={styles.BottomLink} onClick={onSetCodeVerification} aria-hidden>
                Try again
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendMessage;
