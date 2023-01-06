import Astronaut from 'assets/svg/astronaut.svg';
import { AuthContext } from 'contexts/Auth/authContext';
import * as React from 'react';
import { useState } from 'react';
import { SignupUser } from '../../hooks/useAuth';
import styles from './styles.module.scss';

function Signup() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState({ content: '', isHide: false });
  const [confirmPassword, setConfirmPassword] = React.useState({
    content: '',
    isHide: false,
  });
  // const [day, setDay] = React.useState();
  // const [month, setMonth] = React.useState();
  // const [year, setYear] = React.useState();
  const [formErrors, setFormErrors] = React.useState({});

  const [nextForm, setNextForm] = React.useState(true);
  // const images = [Astronaut, Icon];
  // const [curSlide, setCurSLide] = React.useState(0);
  // let slideAnimation = React.useRef();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeMail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword({ ...password, content: e.target.value });
  };

  const onChangeHidePassword = () => {
    setPassword({ ...password, isHide: !password.isHide });
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword({ ...confirmPassword, content: e.target.value });
  };

  const onChangeHideConfirmPassword = () => {
    setConfirmPassword({ ...confirmPassword, isHide: !confirmPassword.isHide });
  };

  // const onChangeDay = (e) => {
  //   setDay(e.target.value);
  // };

  // const onChangeMonth = (e) => {
  //   setMonth(e.target.value);
  // };

  // const onChangeYear = (e) => {
  //   setYear(e.target.value);
  // };

  // const generateYear = () => {
  //   const arr = [];
  //   const start = 1900;
  //   const end = new Date().getFullYear();

  //   for (let i = end; i >= start; i -= 1) {
  //     arr.push(<option value={i}>{i}</option>);
  //   }
  //   return arr;
  // };

  // const generateMonth = () => {
  //   const MONTH = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  //   return (
  //     <>
  //       {MONTH.map((m) => <option value={m} key={m}>{m}</option>)}
  //     </>
  //   );
  // };

  // const generateDay = () => {
  //   const arr = [];
  //   const start = 1;
  //   const end = 31;

  //   for (let i = start; i <= end; i += 1) {
  //     arr.push(<option value={i}>{i}</option>);
  //   }
  //   return arr;
  // };

  const validate = () => {
    const err = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;
    if (!username) {
      err.username = 'Please enter username';
    } else if (username.length < 6) {
      err.username = 'Username must be at least 6 characters';
    }

    if (!email) {
      err.email = 'Please enter your email';
    } else if (!regex.test(email)) err.email = 'Invalid Email';

    if (!password.content) {
      err.password = 'Please enter your password';
    } else if (!regexPass.test(password.content)) err.password = 'Password must be at least 8 characters, A-Z, a-z, 0-9';

    if (!confirmPassword.content) {
      err.confirmPassword = 'Please enter confirm password';
    } else if (password.content !== confirmPassword.content) {
      err.confirmPassword = 'Your password must be the same';
    }

    return err;
  };

  // const animation = () => {
  //   if (curSlide === 0) {
  //     setCurSLide(1);
  //   } else setCurSLide(0);
  // };

  const switchNextForm = async () => {
    setFormErrors(validate());
    setNextForm(true);
  };

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
        <div className={styles.paper}>
          <div className={styles.dump}>
            {!nextForm ? (
              <>
                <p>Welcome</p>
                <div className={styles.frame_mail_pass}>
                  <div>
                    <i className="fa fa-user-circle styles.icon" aria-hidden="true" />
                    <input
                      value={username}
                      onChange={onChangeUsername}
                      placeholder="Username"
                      className={styles.inputField}
                    />
                  </div>
                  {formErrors.username && <span className={styles.validationText}>{formErrors.username}</span>}
                  <div>
                    <i className="fa fa-envelope-o styles.icon" aria-hidden="true" />
                    <input value={email} onChange={onChangeMail} placeholder="Email" className={styles.inputField} />
                  </div>
                  {formErrors.email && <span className={styles.validationText}>{formErrors.email}</span>}
                  <div>
                    <i className="fa fa-lock styles.icon" aria-hidden="true" style={{ left: 3 }} />
                    <input
                      value={password.content}
                      type={password.isHide ? 'text' : 'password'}
                      onChange={onChangePassword}
                      placeholder="Password"
                      className={styles.inputField}
                    />
                    <i
                      className={password.isHide ? 'fa fa-eye' : 'fa fa-eye-slash'}
                      aria-hidden="true"
                      onClick={onChangeHidePassword}
                      style={{
                        right: 15,
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                  {formErrors.password && <span className={styles.validationText}>{formErrors.password}</span>}
                  <div>
                    <div>
                      <i className="fa fa-lock styles.icon" aria-hidden="true" style={{ left: 3 }} />
                      <input
                        value={confirmPassword.content}
                        type={confirmPassword.isHide ? 'text' : 'password'}
                        onChange={onChangeConfirmPassword}
                        placeholder="Confirm Password"
                        className={styles.inputField}
                      />
                      <i
                        className={confirmPassword.isHide ? 'fa fa-eye' : 'fa fa-eye-slash'}
                        aria-hidden="true"
                        onClick={onChangeHideConfirmPassword}
                        style={{
                          right: 15,
                          cursor: 'pointer',
                        }}
                      />
                    </div>
                    {formErrors.confirmPassword && (
                    <span className={styles.validationText}>{formErrors.confirmPassword}</span>
                    )}
                  </div>
                  {/* <div>
                  <div
                    style={{
                      fontFamily: 'Arial',
                      fontStyle: 'normal',
                      fontWeight: 10,
                      fontSize: 12,
                      height: 20,
                      display: 'flex',
                      color: '#3949ab;',
                    }}
                  >
                    Date of birth
                  </div>
                  <span className="date_of_birth">
                    <select
                      aria-label="day"
                      className={classNames(styles.bd_day, styles.select)}
                      value={day}
                      onChange={onChangeDay}
                    >
                      {generateDay()}
                    </select>
                    <select
                      aria-label="month"
                      className={classNames(styles.bd_month, styles.select)}
                      value={month}
                      onChange={onChangeMonth}
                    >
                      {generateMonth()}
                    </select>
                    <select
                      aria-label="year"
                      className={classNames(styles.bd_year, styles.select)}
                      value={year}
                      onChange={onChangeYear}
                    >
                      {generateYear()}
                    </select>
                  </span>
                </div> */}
                </div>
              </>
            ) : (
              <EditProfile user={username} email={email} password={password} setNextForm={setNextForm} />
            )}
            <div className={styles.login_options}>
              {!nextForm && (
              <div className={styles.login_button} onClick={switchNextForm} aria-hidden>
                NEXT
              </div>
              )}
              <div className={styles.separate_other}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2,
                  }}
                >
                  <span>Or</span>
                </div>
                <div className={styles.hoz_line} />
              </div>
              <div className={styles.groupBtn}>
                <div className={styles.oAuth2Btn}>
                  <i className="fa fa-google" />
                  <p>Google</p>
                </div>
                <div className={styles.oAuth2Btn}>
                  <i className="fa fa-gitlab" />
                  <p>Gitlab</p>
                </div>
                <div className={styles.oAuth2Btn}>
                  <i className="fa fa-facebook" />
                  <p>Facebook</p>
                </div>
              </div>
              <div className={styles.BottomText}>
                <span>Already have account? </span>
                <a className={styles.BottomLink} href="login">
                  Log in
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function EditProfile({
  user, email, password, setNextForm,
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState(user);
  const [bio, setBio] = useState('');

  const { handleLogin } = React.useContext(AuthContext);

  const onSignUp = async () => {
    const { username } = await SignupUser({
      username: user,
      email,
      password: password.content,
      first_name: firstName,
      last_name: lastName,
      bio,
    });

    if (username) {
      await handleLogin({ username, password: password.content });
    }
  };

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeBio = (e) => {
    setBio(e.target.value);
  };

  return (
    <>
      <p
        style={{
          position: 'absolute',
          top: 0,
          color: 'rgba(117, 117, 117, 1)',
          fontSize: 14,
          fontWeight: 'normal',
          cursor: 'pointer',
        }}
        onClick={() => setNextForm(false)}
        aria-hidden
      >
        <i className="icon icon-back" style={{ fontSize: 'inherit', marginRight: 5 }} />
        Back
      </p>
      <p>
        Welcome
        {' '}
        {firstName}
        {' '}
        {lastName}
      </p>
      <div className={styles.frame_mail_pass}>
        <input value={firstName} placeholder="Your first name" onChange={onChangeFirstName} />
        <input value={lastName} placeholder="Your last name" onChange={onChangeLastName} />
        <input value={bio} placeholder="Some description" onChange={onChangeBio} />
        <button
          type="button"
          onClick={onSignUp}
          style={{

            backgroundColor: '#3949ab',
            color: 'white',
          }}
        >
          SIGN UP
        </button>
      </div>
    </>
  );
}

export default Signup;
