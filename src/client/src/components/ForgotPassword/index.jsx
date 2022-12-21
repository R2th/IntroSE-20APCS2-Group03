import * as React from 'react';

// eslint-disable-next-line
import Astronaut from 'assets/svg/astronaut.svg';
import styles from './styles.module.scss';

function ForgotPassword() {
  const [phoneOrMail, setPhoneOrMail] = React.useState('');
  const [errorForm, setErrorForm] = React.useState({});
  const onChangeMail = (e) => {
    setPhoneOrMail(e.target.value);
  };

  const validate = () => {
    const err = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

    if (!regex.test(phoneOrMail) && !regexPhone.test(phoneOrMail)) {
      err.phoneOrMail = 'Invalid Email or Phone Number';
    }
    return err;
  };

  const onForgotPassword = async () => {
    setErrorForm(validate());
    // const { token } = await loginUser({ phoneOrMail });
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
            <p>Forgot Password</p>
            <div className={styles.frame_phone_mail}>
              <div>
                <input
                  value={phoneOrMail}
                  onChange={onChangeMail}
                  placeholder="Phone number or Email"
                  className={styles.inputField}
                />
              </div>
              {/* eslint-disable-next-line max-len */}
              {errorForm.phoneOrMail && <span className={styles.validationText}>{errorForm.phoneOrMail}</span>}
              <div className={styles.send_message} onClick={onForgotPassword} aria-hidden>
                SUBMIT
              </div>
            </div>
            <div className={styles.BottomText}>
              Back to &nbsp;
              <a className={styles.BottomLink} href="login">
                LOG IN
              </a>
              page
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
