## Intro
Đa số ứng dụng hiện này cần biết danh tính của người dùng để cho phép ứng dụng lưu dữ liệu của người dùng trên đám mây và cùng cập trải nghiệm qua tất cả các thiết bị của người dùng. Firebase Authentication cung cấp dịch vụ backend với SDK và nó hỗ trợ xác thực bằng mật khẩu, số điện thoại và một số mạng xã hội như Google, Facebook and Twitter, vv.. Trong bài viết này sẽ trình bày về tạo ứng dụng đăng nhập với Facebook và Github sử dụng Firebase Authentication.

## Init project
[Create React App](http://github.com/facebookincubator/create-react-app) là cách tốt nhất để khởi tạo ứng dụng react single page bởi vì nó giúp thiết lập môi trường phát triển và đã gồm các tính năng JavaScript mới nhất, cung cấp trải nghiệm cho developer và tối ưu hóa ứng dụng cho production. 
Create React App không xử lý các logic backend hoặc database mà nó chỉ xây dựng phía frontend vậy chúng ta có thể sử dụng nó với bất kỳ backend mà chúng ta muốn.
```
npm install -g create-react-app

create-react-app reactjs-social-oauth-login

cd reactjs-social-oauth-login

npm start
```
Sau khi chạy lệch trên nó sẽ mở browser và có nội dung như sau
![](https://images.viblo.asia/88ab6275-a4db-4426-b2d0-9cd4e920f407.png)

## Dependencies
Chúng ta cần thêm một số dependencies để bắt đầu phát triển ứng dụng 
```
npm install --only=dev --save re-base firebase
```
## Create components
Chúng ta sẽ xấy dựng 2 màn hình Login với 2 nút và màn hình hiển thị thông tin của user đã đăng nhập.

```
#Login
import React from "react";

const Login = props => (
  <div className="login">
    <p>Please click button below to sign in!</p>
    <button className="github">Log In With Gitub</button>
    <button className="facebook">Log In With Facebook</button>
  </div>
);

export default Login;
```

```
# UserInfo
import React, { Component } from "react";
import Login from "./Login";

class UserInfo extends Component {
  render() {
    return <Login />;
    return (
      <div className="user-info">
        <label>Email:</label>
        <span type="text" id="email">
          test@test.com
        </span>
      </div>
    );
  }
}

export default UserInfo;
```

Sửa lại file `App.js`
```
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import UserInfo from "./components/UserInfo";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to React JS Social Oauth Login App
          </h1>
        </header>
        <UserInfo />
      </div>
    );
  }
}

export default App;
```

Ở đây do return component `Login` nên phần thông tin của user không được hiển thị

![](https://images.viblo.asia/7e845e71-780c-4fcf-a053-bbbc3df959c0.png)

## Create Social App
### Firebase
Truy cập https://console.firebase.google.com tạo một project
Vào mục `Develope` -> `Authentication` -> `Sign-in method` -> chọn `Sign-in providers`

Facebook App Id và App Secret chúng ta sẽ có được từ phần dưới vì thực tế chúng ta cần phải làm song song.

![](https://images.viblo.asia/9337856f-def5-4a4a-98b6-5679cf60042e.png)

Github client id và client secret cũng phải tạo tương tự.

![](https://images.viblo.asia/dce9958c-4d66-491e-a061-6086e778b99d.png)

### Facebook
Truy cập https://developers.facebook.com/ -> `My apps` -> `Add New App`

![](https://images.viblo.asia/68a5be13-42f5-4b3a-bd3b-e052b9db9be3.png)

Phần `Add a Product` chọn `Set up` mục `Facebook Login`

![](https://images.viblo.asia/0a929d89-e625-4e5e-8eca-ab30ae79e2ba.png)

- Bật chức năng `Embedded Browser OAuth Login` và cho link `Valid OAuth Redirect URIs` lấy từ mục firebase -> `Save changes`

![](https://images.viblo.asia/08e71e22-25da-4f74-be0d-f0426a1f621e.png)
### Github
Truy cập https://github.com/settings/developers -> `New Oauth App` sau đó sẽ có được client id và client secret và điền mục `Authorization callback URL` từ firebase.

![](https://images.viblo.asia/27e27b2d-041a-4387-9694-143d8d28d74c.png)

## Client firebase config
Truy cập https://console.firebase.google.com ở mục `Project Overview` chọn `Add Firebase to your web app` và copy config từ đó 
Tiếp theo tạo một file `base.js` và cho config lúc nãy vào

```
import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_Auth_Domain",
  databaseURL: "YOUR_Database_URL"
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };
export default base;
```

## Authentication
Sửa component `Login` thêm provider cho các button
```
...
<button className="github" onClick={() => props.authenticate("Github")}>
      Log In With Github
    </button>
    <button className="facebook" onClick={() => props.authenticate("Facebook")}>
      Log In With Facebook
    </button>
...
```
Sửa lại component `UserInfo` trong đó có 3 phần: xác thực theo provider, authHandler xử lý sau khi xác thực, logout.
```
...
# xác thực theo provider
authenticate = provider => {
    console.log(provider);
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };
 
 # xử lý sau khi xác thực
 authHandler = async authData => {
    const user = authData.user;
    this.setState({
      email: user.email,
      displayName: user.displayName
    });
  };
  
  # đăng xuất
  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ email: null, displayName: null });
  };
```

Nếu chỉ làm như trên lúc reload page sẽ mất hết thông tin của user đã đăng nhập vậy cần thêm một đoạn nữa để xử lý việc đó
```
class UserInfo extends Component {
  state = {
    email: null,
    displayName: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }
  ...
}
```

### Testing
#### Facebook

- Tạo một user test

![](https://images.viblo.asia/1f7624a0-bd6c-46ef-8d07-1979699620e2.png)

- Khi click `Log In With Facebook` sẽ hiển thị pop up để điền thông tin

![](https://images.viblo.asia/1c091375-b9e5-4713-a5b6-fb2b5eee5d0a.png)

- Sau khi xác thực thành công thông tin của user được hiển thị.

![](https://images.viblo.asia/9767f0ac-1cec-45f2-8ac7-ee955933f31d.png)

#### Github

- Khi click `Log In With Github` sẽ hiển thị pop up để điền thông tin

![](https://images.viblo.asia/e2936fa4-91cd-4339-b6ea-95dd11d3b1d9.png)

- Sau khi xác thực thành công thông tin của user được hiển thị.

![](https://images.viblo.asia/36ae0bfe-8833-484a-88c7-50f189c8ef07.png)

### Wrapping up

Hy vọng bài này có thể giúp bạn hiểu thêm về oauth facebook và github với reactjs. Bạn có thể tham khảo [Source code](https://github.com/limkimhuor/reactjs-social-oauth-login/tree/develop) tại đây.

#### Tham khảo
https://reactjs.org/docs/add-react-to-a-new-app.html
https://reactjs.org/tutorial/tutorial.html
https://firebase.google.com/docs/auth/web/facebook-login
https://firebase.google.com/docs/auth/web/github-auth
https://firebase.google.com/docs/auth/web/manage-users