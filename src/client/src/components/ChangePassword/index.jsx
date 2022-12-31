import React from 'react';
import styles from './styles.module.scss';

const ChangePassword = () => {
  const [oldpass, setOldPassword] = React.useState({
    content: '',
    isHide: true,
  });
  const [newpass, setNewPassword] = React.useState({
    content: '',
    isHide: true,
  });
  const [confirmnewpass, setConfirmPassword] = React.useState({
    content: '',
    isHide: true,
  });

  const [formErrors, setFormErrors] = React.useState({});

  const onChangeOldPassword = (e) => {
    setOldPassword({ ...oldpass, content: e.target.value });
  };

  const onChangeHideOldPassword = () => {
    setOldPassword({ ...oldpass, isHide: !oldpass.isHide });
  };

  const onChangeNewPassword = (e) => {
    setNewPassword({ ...newpass, content: e.target.value });
  };

  const onChangeHideNewPassword = () => {
    setNewPassword({ ...newpass, isHide: !newpass.isHide });
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword({ ...confirmnewpass, content: e.target.value });
  };

  const onChangeHideConfirmPassword = () => {
    setConfirmPassword({ ...confirmnewpass, isHide: !confirmnewpass.isHide });
  };

  const validate = () => {
    const err = {};
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;

    if (!oldpass.content) {
      err.password = 'Please enter your password';
    } else if (oldpass.content) {
      err.password = 'Check from DB';
    }
    if (!newpass.content) {
      err.newpass = 'Please enter new password';
    } else if (!regexPass.test(newpass.content)) {
      err.newpass = 'Password must be at least 8 characters, A-Z, a-z, 0-9';
    }
    if (!confirmnewpass.content) {
      err.confirmnewpass = 'Please enter your new password';
    } else if (confirmnewpass.content !== newpass.content) {
      err.confirmnewpass = 'Passwords do not match';
    }
    return err;
  };

  const onChangePass = async () => {
    setFormErrors(validate());

    // const { token } = await SignupUser({
    //   username,
    //   email,
    //   password,
    // });
    // if (token) {
    //   setToken(token);
    //   window.location.reload(true);
    // }
  };

  return (
    <div className="ccjz">
      <div>
        <i className="fa fa-lock styles.icon" aria-hidden="true" style={{ left: 3 }} />
        <input
          value={oldpass.content}
          type={oldpass.isHide ? 'text' : 'password'}
          onChange={onChangeOldPassword}
          placeholder="Old Password"
          className={styles.inputField}
        />
        <i
          class={oldpass.isHide ? 'fa fa-eye' : 'fa fa-eye-slash'}
          aria-hidden="true"
          onClick={onChangeHideOldPassword}
          style={{
            right: 15,
            cursor: 'pointer',
          }}
        ></i>
      </div>
      {formErrors.oldpass && <span className={styles.validationText}>{formErrors.oldpass}</span>}
      <div>
        <i className="fa fa-lock styles.icon" aria-hidden="true" style={{ left: 3 }} />
        <input
          value={newpass.content}
          type={newpass.isHide ? 'text' : 'password'}
          onChange={onChangeNewPassword}
          placeholder="New Password"
          className={styles.inputField}
        />
        <i
          class={newpass.isHide ? 'fa fa-eye' : 'fa fa-eye-slash'}
          aria-hidden="true"
          onClick={onChangeHideNewPassword}
          style={{
            right: 15,
            cursor: 'pointer',
          }}
        ></i>
      </div>
      {formErrors.newpass && <span className={styles.validationText}>{formErrors.newpass}</span>}
      <div>
        <i className="fa fa-lock styles.icon" aria-hidden="true" style={{ left: 3 }} />
        <input
          value={confirmnewpass.content}
          type={confirmnewpass.isHide ? 'text' : 'password'}
          onChange={onChangeConfirmPassword}
          placeholder="Confirm Password"
          className={styles.inputField}
        />
        <i
          class={confirmnewpass.isHide ? 'fa fa-eye' : 'fa fa-eye-slash'}
          aria-hidden="true"
          onClick={onChangeHideConfirmPassword}
          style={{
            right: 15,
            cursor: 'pointer',
          }}
        ></i>
      </div>
      {formErrors.confirmnewpass && <span className={styles.validationText}>{formErrors.confirmnewpass}</span>}
      <button>Change</button>
    </div>
  );
};

export default ChangePassword;
