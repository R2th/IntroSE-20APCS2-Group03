import * as React from 'react';
import Astronaut from 'assets/svg/astronaut.svg';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import { AuthContext } from '../../contexts/Auth/authContext';

function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState({
    content: '',
    isHide: true,
  });
  const [errorForm, setErrorForm] = React.useState({});
  const navigate = useNavigate();

  const { token, handleLogin } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, []);

  if (token) {
    return null;
  }

  const onChangeMail = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword((prev) => (({ ...prev, content: e.target.value })));
  };

  const onChangeHidePassword = () => {
    setPassword((prev) => ({ ...prev, isHide: !prev.isHide }));
  };

  const validate = () => {
    if (!username) {
      return { username: 'Username can not be empty' };
    }
    if (!password.content) {
      return {
        password: 'Password can not be empty',
      };
    }
    return null;
  };

  const onLogin = async () => {
    const errors = validate();
    if (errors) {
      setErrorForm(errors);
    } else {
      try {
        await handleLogin({ username, password: password.content });
      } catch (err) {
        setErrorForm({ error: err });
      }
    }
  };

  const onSubmitLogin = (e) => {
    if (e.keyCode === 13) {
      onLogin();
    }
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
            <p>Welcome</p>
            <div className={styles.frame_mail_pass}>
              <div>
                <i className="fa fa-envelope-o styles.icon" aria-hidden="true" />
                <input
                  value={username}
                  onChange={onChangeMail}
                  placeholder="Username or email"
                  className={styles.inputField}
                  onKeyDown={onSubmitLogin}
                />
              </div>
              {errorForm.username && <span className={styles.validationText}>{errorForm.username}</span>}
              <div>
                <div style={{ margin: 'auto' }}>
                  <i className="fa fa-lock styles.icon" aria-hidden="true" style={{ left: 3 }} />
                  <input
                    value={password.content}
                    type={!password.isHide ? 'text' : 'password'}
                    onChange={onChangePassword}
                    placeholder="Password"
                    onKeyDown={onSubmitLogin}
                    className={styles.inputField}
                  />
                  <i
                    className={!password.isHide ? 'fa fa-eye' : 'fa fa-eye-slash'}
                    aria-hidden="true"
                    onClick={onChangeHidePassword}
                    style={{
                      right: 15,
                      cursor: 'pointer',
                    }}
                  />
                </div>
              </div>
              {errorForm.password && <span className={styles.validationText}>{errorForm.password}</span>}
              {errorForm.error && (
              <span className={styles.validationText}>
                Login failed:
                {' '}
                {errorForm.error}
                !!
              </span>
              )}
            </div>
            <p className={styles.forgotPassword}>
              <a href="/auth/forgot_password">Forgot password?</a>
            </p>
            <div className={styles.login_options}>
              <div className={styles.login_button} tabIndex="0" onClick={onLogin} aria-hidden role="button">
                <span>LOG IN</span>
              </div>
              <div className={styles.separate_other}>
                <div
                  style={{
                    width: 30,
                    height: 10,
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
                <span>New to BytesGo? </span>
                <a className={styles.BottomLink} href="signup">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
