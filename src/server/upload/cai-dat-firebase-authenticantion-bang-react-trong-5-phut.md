Trong bài viết ngày hôm nay, mình sẽ hướng dẫn các bạn sử dụng Firebare để xác thực bằng tài khoản Google một cách đơn giản và nhanh gọn nhất. Chính vì tiêu chí của bài viết là 'nhanh gọn' nên mình sẽ bỏ qua 1 số case của việc xác thực như hiển thị messages lỗi,.. mà sẽ tập trung vào việc xác thực vào webapp bằng tài khoản Google.
Bài viết của mình sẽ sử dụng một số project mã nguồn mở sau:
* https://github.com/nodejs/node
* https://github.com/facebook/react
* https://github.com/facebook/create-react-app
* https://github.com/armand1m/react-with-firebase-auth

# Setup:
Hãy chắc chắn rằng bạn đã cài đặt bản mới nhất của [Node.js](https://nodejs.org/en/) và chỉ thế thôi ;)

# Tạo một sample project:
Chúng ta sẽ sử dụng **create-react-app** để tạo 1 project mới.

Mở terminal của bạn lên và chạy những câu lệnh sau:
```
    # tạo một app react
    npx create-react-app react-firebase-authentication
    # truy cập vào thư mục project
    cd ./react-firebase-authentication
    # chạy project trong develop mode
    npm start
```

# Cài đặt Firebase:
Nếu bạn chưa có 1 project Firebase nào hãy tạo cho riêng mình 1 project tại [đây](https://console.firebase.google.com/u/0/)

Tiếp theo, di chuyển đến trang Authentication.

Chọn 'Sign-in method' tab và hãy chắc chắn bạn kích hoạt Google trong mục provider.
![](https://images.viblo.asia/e76638c0-2d3f-4bb1-b628-da72f9a736fb.png)

Cuộn xuống để check rằng bạn đã để Authorized Domain là **localhost**:
![](https://images.viblo.asia/1b147f90-e5e1-4a1f-ae2f-23468af44d6d.png)

Trong trang Authentication, chọn **Web Setup**, một modal như sau sẽ đựoc hiện ra:
![](https://images.viblo.asia/05d553d9-2e53-4c62-8e03-2374218e24b0.png)

Coppy phần **Config** và dán vào file **firebaseConfig.js**, hãy nhớ export nó ra nhé. File của bạn sẽ có dạng như sau:
```
const config = {
    apiKey: "***",
    authDomain: "***",
    databaseURL: "***",
    projectId: "***",
    storageBucket: "***",
    messagingSenderId: "***",
};
export default config;
```
Lưu file này ở **src** nhé.

Mở Terminal và chạy lệnh sau để cài đặt thư viện Firebase:

```npm install --save firebase react-with-firebase-auth```

# Code:
Cuối cùng chúng ta cũng di chuyển tới phần thú vị nhất của bài viết này.

Hiện tại, app của chúng ta đang đơn thuần là 1 app React sơ sinh, không có gì đặc biệt cả. Để tạo nên điều kỳ diệu, bước đầu tiên chũng ta sẽ chỉnh sửa lại component  **src/App.js**

Trên cùng của file, thêm vào 4 dòng imports sau:
```
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
```

Dùng config sau để khởi tạo Firebase app:
```
const firebaseApp = firebase.initializeApp(firebaseConfig);
```

Cài đặt provider mà chúng ta muốn app support (nếu bạn nào quên thì ở đây chúng ta sẽ dùng Google nhé ^^) và truy cập vào thư viện auth:
```
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
```

Bọc phần export của component  **App** bằng HOC (Hight Order Component) **withFirebaseAuth**:
```
export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
```

Bây giờ chúng ta đã có thể truy cập vào những props được cung cấp bởi **withFirebaseAuth** từ trong component **App**.

Chúng ta sẽ sử dụng **user**, **error** và phương thức **signIn** cùng với **signOut** .
Hãy thêm những props trên vào method render:
```
const {
  user,
  signOut,
  signInWithGoogle,
} = this.props;
```

Sau đó chũng ta sẽ thêm yêu cầu đăng ký và đăng nhập cho user như sau:
```
return (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      {
        user 
          ? <p>Hello, {user.displayName}</p>
          : <p>Please sign in.</p>
      }
      {
        user
          ? <button onClick={signOut}>Sign out</button>
          : <button onClick={signInWithGoogle}>Sign in with Google</button>
      }
    </header>
  </div>
);
```

Và thế là xong!!

Nếu bạn truy cập vào trang local của mình, bạn sẽ thấy màn hình sau:
![](https://images.viblo.asia/fc2e14c9-ddde-4236-9b01-daa566b8b97a.png)

Bạn có thể click vào nút **Sign in with Google** để hiển thị Modal Login của Google.
Và sau khi Login thành công bạn sẽ thấy màn hình hiển thị như sau:
![](https://images.viblo.asia/2332ab1f-53b3-48d1-b74b-bad2ea66c19f.png)

Nếu bạn refresh lại trang, tài khoản của bạn vẫn sẽ được login cho tới khi nào mà Firebase vẫn xác định được rằng thông tin của bạn là hợp lệ.

# Lời kết:
Hi vọng bài viết nho nhỏ này sẽ giúp ích cho các bạn trong việc tiếp cận với việc authen bằng Google nói chung và bằng Firebase nói riêng.
Cảm ơn các bạn đã đón đọc và hẹn gặp lại các bạn trong bài viết tiếp theo nhé ❤

Source: https://medium.com/firebase-developers/how-to-setup-firebase-authentication-with-react-in-5-minutes-maybe-10-bb8bb53e8834