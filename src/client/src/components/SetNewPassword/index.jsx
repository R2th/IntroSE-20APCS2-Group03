import * as React from 'react';
import Astronaut from 'assets/svg/astronaut.svg';
import styles from './styles.module.scss';

function SetNewPassword() {
  const [newPassword, setNewPassword] = React.useState({
    content: '',
    isHide: true,
  });
  // const [isHidepass, setIsHidePassword] = React.useState("password");
  const [confirmPassword, setConfirmPassword] = React.useState({
    content: '',
    isHide: true,
  });
  const [errorForm, setErrorForm] = React.useState({});
  // const [isHideconfirmpass, setIsHideConfirmPassword] = React.useState("password");

  const onChangePassword = (e) => {
    setNewPassword(e.target.value);
  };

  const onChangeHidePassword = () => {
    setNewPassword({ ...newPassword, isHide: !newPassword.isHide });
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

  const validate = () => {
    const err = {};
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;
    if (!regex.test(newPassword)) {
      err.newPassword = 'Password must be at least 8 characters, A-Z, a-z, 0-9';
    }
    if (newPassword !== confirmPassword) {
      err.confirmPassword = 'Password does not match.';
    }
    return err;
  };

  const onSetNewPassword = async () => {
    setErrorForm(validate());
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
            <p>Set New Password</p>
            <div className={styles.frame_set_pass}>
              <div>
                <div style={{ margin: 'auto' }}>
                  <i className="fa fa-lock styles.icon" aria-hidden="true" style={{ left: 3 }} />
                  <input
                    value={newPassword.content}
                    onChange={onChangePassword}
                    placeholder="Create new password"
                    className={styles.inputField}
                    type={newPassword.isHide ? 'text' : 'password'}
                  />
                  <i
                    className={newPassword.isHide ? 'fa fa-eye' : 'fa fa-eye-slash'}
                    style={{
                      right: 15,
                      cursor: 'pointer',
                    }}
                    aria-hidden="true"
                    onClick={onChangeHidePassword}
                  />
                </div>
              </div>
              {errorForm.newPassword && <span className={styles.validationText}>{errorForm.newPassword}</span>}
              <div>
                <div style={{ margin: 'auto' }}>
                  <i className="fa fa-lock styles.icon" aria-hidden="true" style={{ left: 3 }} />
                  <input
                    value={confirmPassword.content}
                    onChange={onChangeConfirmPassword}
                    placeholder="Confirm new password"
                    className={styles.inputField}
                    type={confirmPassword.isHide ? 'text' : 'password'}
                  />
                  <i
                    className={confirmPassword.isHide ? 'fa fa-eye' : 'fa fa-eye-slash'}
                    style={{
                      right: 15,
                      cursor: 'pointer',
                    }}
                    aria-hidden="true"
                    onClick={onChangeHideConfirmPassword}
                  />
                </div>
              </div>
              {errorForm.confirmPassword && <span className={styles.validationText}>{errorForm.confirmPassword}</span>}
              <div className={styles.send_message} onClick={onSetNewPassword} aria-hidden>
                CHANGE
              </div>
            </div>
            <div className={styles.BottomText}>
              Back to&nbsp;
              <a className={styles.BottomLink} href="/login">
                LOG IN&nbsp;
              </a>
              page
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetNewPassword;
