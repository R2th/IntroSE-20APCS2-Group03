Trong bài viết này, tôi sẽ giới thiệu tới các bạn về Blockstack, một nền tảng trong công nghệ Blockchain đang không ngưng nóng bóng hiện nay.  Hy vọng sau bài viết này mọi người sẽ hứng thú nghiên cứu và yêu thích Blockchain nhiều hơn.

Bài viết này có vận dụng kiến thức về React.js. Nên các bạn có thể tìm hiểu thêm về **[React.js](https://reactjs.org/)** trước khi tiếp tục nhé.

Vậy đầu tiên, chúng ta sẽ đi tìm hiểu các khái niệm cơ bản về **Blockstack**:
## Tìm hiểu Blockstack
**Blockstack** là mạng lưới thế hệ mới cho các ứng dụng phi tập trung mà bạn truy cập thông qua trình duyệt **[Blockstack](https://blockstack.org/)**. Với Blockstack, có một thế giới ứng dụng mới cho phép bạn sở hữu dữ liệu và duy trì quyền riêng tư, bảo mật và tự do của mình.

**Blockstack** có ưu điểm giúp loại bỏ các điểm quan trọng của lỗ hổng. Bằng cách loại bỏ những điểm yếu, vốn thường xuyên trở thành nạn nhân của hack, Blockstack giúp dữ liệu người dùng trở nên an toàn hơn.
## Blockstack ứng dụng như thế nào?

Công nghệ Blockchain có thể rất phức tạp, nhưng khi bắt tay vào nghiên cứu chúng ta sẽ không phải như vậy. Blockstack là một bên thứ ba cung cấp sign in/sign up/authentication giúp bạn dễ dàng phát triển ứng dụng và phát hành nó trên các kho ứng dụng Decentralized như [App.co](https://app.co/) (tìm hiểu thêm khái niệm Decentralized [tại đây](https://kipalog.com/posts/Tim-hieu-Centralized-la-gi--Decentralized-la-gi--va-So-sanh-Centralized-va-Decentralized-Blockchain)).

Sau khi tích hợp Blockstack, bạn có thể tùy chọn gửi thông tin tài khoản người dùng duy nhất mà người dùng tạo từ Blockstack tới API của bạn và xây dựng đối tượng người dùng theo các đó hoặc sử dụng Gaia Storage, nhà cung cấp hệ thống phi tập trung Blockstack.
Chúng ta có thể kết hợp cả hai, trong đó thông tin người dùng riêng như số điện thoại và địa chỉ được mã hóa và lưu trữ trong Gaia Storage nhưng những thông tin public như nhận xét hoặc bài viết được lưu trữ trong public API.
## Xây dựng ứng dụng
Chúng ta sẽ bắt đầu thiết lập Sign in / Sign out / Authentication với Blockstack. 
1. Cài đặt trình duyệt **Blockstack**
2. Tạo ID Blockstack. (đảm bảo rằng Secret Recovery Key của bạn được lưu trữ an toàn).
3. Bắt đầu cài đặt ứng dụng với React App

* Cài đặt App với Terminal
```JS
npm init react-app blockstack-signin
cd blockstack-signin
npm install --save blockstack@19.0.0-alpha.2
npm install react-app-rewired --save-dev
```
> **Lưu ý**: nếu cài đặt npm install găp vấn đề, thử lại với yarn add:
```JS
yarn add blockstack@19.0.0-alpha.2
yarn add react-app-rewired --save-dev
```
* Tạo **constants.js** trong thư mục **src/utils** với nội dung sau: 

```JS
import { AppConfig } from 'blockstack'
export const appConfig = new AppConfig(['store_write', 'publish_data'])
```
*  Tạo **config-overrides.js** với nội dung sau:

```JS
module.exports = {
  webpack: function (config, env) {
    return config;
  },
  jest: function (config) {
    return config;
  },
  // configFunction is the original react-scripts function that creates the
  // Webpack Dev Server config based on the settings for proxy/allowedHost.
  // react-scripts injects this into your function (so you can use it to
  // create the standard config to start from), and needs to receive back a
  // function that takes the same arguments as the original react-scripts
  // function so that it can be used as a replacement for the original one.
  devServer: function (configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      // Edit config here - example: set your own certificates.
      //
      // const fs = require('fs');
      // config.https = {
      //   key: fs.readFileSync(process.env.REACT_HTTPS_KEY, 'utf8'),
      //   cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, 'utf8'),
      //   ca: fs.readFileSync(process.env.REACT_HTTPS_CA, 'utf8'),
      //   passphrase: process.env.REACT_HTTPS_PASS
      // };
   config.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    "Access-Control-Allow-Headers": "Content-Type"
   }
return config;
    };
  }
}
```

* Thay đổi **src/App.js** với nội dung:

``` JS
import React, { Component } from "react";
import { appConfig } from "./utils/constants";
import { UserSession } from "blockstack";
class App extends Component {
  state = {
    userSession: new UserSession({ appConfig })
  };
componentDidMount = async () => {
    const { userSession } = this.state;
if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
      const userData = await userSession.handlePendingSignIn();
if (!userData.username) {
        throw new Error("This app requires a username");
      }
window.location = "/";
    }
  };
handleSignIn = () => {
    const { userSession } = this.state;
    userSession.redirectToSignIn();
  };
handleSignOut = () => {
    const { userSession } = this.state;
    userSession.signUserOut();
    window.location = "/";
  };
render() {
    const { userSession } = this.state;
    return (
      <div className="App">
        {userSession.isUserSignedIn() ? (
          <button className="button" onClick={this.handleSignOut}>
            <strong>Sign Out</strong>
          </button>
        ) : (
          <button className="button" onClick={this.handleSignIn}>
            <strong>Sign In</strong>
          </button>
        )}
      </div>
    );
  }
}
export default App;
```
* Thay đổi nội dung **src/index.js** như sau: 

```JS
import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
ReactDOM.render(<App />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

* **App.css**

```CSS
.App {
  display: flex;
  text-align: center;
  height: 100vh;
}
.button {
  max-width: 8em;
  max-height: 4em;
  font-size: 1em;
  margin: auto;
  display: inline-block;
  padding: 1em;
  color: #000;
  transition: color 0.3s linear;
  border-color: #000;
  border-width: 2px;
}
.button:hover {
  color: white;
  border: 1px solid white;
  background-color: black;
}

.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
  pointer-events: none;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```
4. Bắt đầu chạy thử ứng dụng nào:
```
npm start
```
or
```
yarn start
```
* **Kết quả:**

![](https://images.viblo.asia/3ee6bfe3-f6a6-4339-b995-68f38f1b12f3.png)

**Awesome** ! Thật là đơn giản nhưng đầy mạnh mẽ. Như vậy chúng ta đã có thể kết nối được ứng ứng dụng của mình với **Blockstack**.

Bài viết này tôi đã hướng dẫn làm thế nào để Login / Signup với Blockstack trong series Connect Blockstack. Hy vọng các bạn sẽ có nhiều đóng góp để tôi có thể hoàn thiện hơn nội dung trong phần sắp tới.

> Tài liệu tham khảo tại:
> * https://reactjs.org/
>*  https://medium.com/better-programming/start-building-blockchain-apps-now-a1ebe8f35ee7
>*  https://browser.blockstack.org/