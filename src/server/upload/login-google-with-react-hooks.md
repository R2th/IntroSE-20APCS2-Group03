Hôm nay mình muốn giới thiệu cho các bạn một tính năng **login google** sử dụng **Reactjs**. 
Mình không phải là một FE develop chính vì thế mình đã search google để tìm hiểu cách thực hiện công việc này. Sau khi xem xét nhiều thông tin, mình đã tìm thấy nhiều ví dụ sử dụng các khái niệm và công nghệ như **bộ định tuyến** public và private, **oAuth2** của Google và Hooks.
Sau đó, mình quyết định phát triển giải pháp của mình bằng cách sử dụng ba công nghệ đó.

Trong bài đăng này, tôi sẽ mô tả từng bước cách chúng ta có thể **phát triển hệ thống xác thực cơ bản cho ứng dụng React**.
Bài đăng sẽ chia thành ba phần chính:

* **Basic Navigation.**
* **Setup login and logout.**
* **Setup public and private router.**

Trong bài đăng này, mình sẽ mô tả từng bước cách chúng ta có thể phát triển hệ thống xác thực cơ bản cho ứng dụng React.

Trước tiên cần có ứng dụng đang hoạt động và **ClientID** từ bảng điều khiển dành cho **nhà phát triển của Google**.

Để có được chúng bạn truy cập đường dẫn: **https://console.developers.google.com/apis/credentials**

Chọn vào **Credentials** > Sau đó click chọn **create credentials** > chọn **Oauth client id**

![](https://images.viblo.asia/c5f2d333-753b-4078-aa07-972090b69bf5.png)

Tiếp theo chọn **application type** là **web application.** 

Sau đó nhập tên ứng dụng 

Tiến hành add **Authorized javascript origin** > Vì ứng dụng chạy trên **localhost** nên url sẽ là **http://localhost:3000/**

![](https://images.viblo.asia/8726f1cd-e3b4-4eaa-b41f-80c62d1592b6.png)

Sau khi tạo **google app**.
Mình sẽ init project và các thư viện liên quan.

```
yarn create react-app react-auth-with-google
yarn add react-router-dom react-use-googlelogin
```

Chúng ta sẽ tạo một ví dụ login cơ bản.
Gồm 2 trang **private** và **public**.

Đơn giản khi người dùng **chưa đăng nhập** chỉ xem được thông tin ở trang public. Sau khi người đó thực hiện việc login với google thì có thể xem được thông tin ở trang private.

**public page**

```js
import React from 'react';

const PublicPage = () => {
    return (
        <h2> Đây là trang public Page </h2>
    );
};

export default PublicPage;
```

**private page**

```js
import React from 'react';

const PrivatePage = () => {
    return (
        <h2>Đây là trang private</h2>
    );
};

export default PrivatePage;
```

Hiện tại, mình sẽ sử dụng điều hướng cơ bản với **Route** và **BrowserRouter** trong App.

```js
import React from 'react';
import { Route, BrowserRouter} from 'react-router-dom';
import PrivatePage from './PrivatePage'
import PublicPage from './PublicPage'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={PublicPage} />
        <Route path="/private" component={PrivatePage} />      
      </BrowserRouter>
    </div>
  );
}

export default App;
```

![](https://images.viblo.asia/138ff050-4fda-439f-8af1-f0a2ab755fe9.gif)

Sau khi tạo được 2 trang là private và public ta sẽ tiền hành thực hiện thức năng đăng nhập và đăng xuất.

**Chức năng đăng nhập và đăng xuất**

mình sử dụng thư viện **dependency react-use-googlelogin**. Nó cung cấp những chức năng **cho phép người dùng** có thể sử dụng chức năng **đăng nhập google** trong ứng dụng của mình.

Để thực hiện ta có thể viết code như sau:

```js
import React from 'react'
import { useGoogleLogin } from 'react-use-googlelogin'

const GoogleAuthContext = React.createContext()

export const GoogleAuthProvider = ({ children }) => {
  const googleAuth = useGoogleLogin({
    clientId: process.env.GOOGLE_CLIENT_ID, // Your clientID from Google.
  })

  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      {children}
    </GoogleAuthContext.Provider>
  )
}

export const useGoogleAuth = () => React.useContext(GoogleAuthContext)
```

Chú ý đừng quên thêm clientId  vào app nha. Mình sẽ tạo các nút đăng nhập và đăng xuất bằng cách sử dụng hookGoogleAuth.

**LoginButton**

```js
import React from 'react';
import { useGoogleAuth } from './googleAuth';

const LoginButton = () => {

    const { signIn } = useGoogleAuth();

    return (
        <button onClick={signIn}>Login</button>
      );
};

export default LoginButton;
```

**LogoutButton**

```js
import React from 'react';
import { useGoogleAuth } from './googleAuth';

const LogoutButton = () => {
    const { signOut } = useGoogleAuth();

    return (
        <button onClick={signOut}>Logout</button>
      );
};

export default LogoutButton;
```

Bây giờ chúng ta sẽ **thêm** nút **đăng nhập** và **đăng xuất** lần lượt trên trang **public** và **private**.

PublicPage thêm button Login như sau.

```js
import React from 'react';
import LoginButton from './LoginButton';

const PublicPage = () => {
    return (
        <div>
            <h2> Đây là trang public </h2>
            <LoginButton/>
        </div>
    );
};

export default PublicPage;
```

PrivatePage tương tự ta sẽ thêm button logout như sau.

```js
import React from 'react';
import LogoutButton from './LogoutButton';

const PrivatePage = () => {
    return (
        <div>
            <h2> Đây là trang private </h2>
            <LogoutButton/>
        </div>
    );
};

export default PrivatePage;
```

Và ứng dụng sẽ được bọc trong **GoogleAuthProvider**.

index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GoogleAuthProvider } from './googleAuth';

ReactDOM.render(
    <GoogleAuthProvider>
      <App />
    </GoogleAuthProvider>,
  document.getElementById('root')
);
```

Đối với bước này, mình đã có thể **lấy được thông tin** đăng nhập và đăng xuất của người dùng bằng **oAuth2 và Hooks của Google**.

![](https://images.viblo.asia/71d5d9bc-1487-476d-ae39-1d82172d32b7.jpg)

Cuối cùng là **thiết lập bộ định tuyến** cho trang private và public.

Đoạn mã sẽ được thực hiện như sau: 
```js
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useGoogleAuth } from "./googleAuth";

const PublicRouter = ({component: Component, ...rest}) => {

    const { isSignedIn } = useGoogleAuth();

    return (
        <div>
            <Route {...rest} render={props => (
                !isSignedIn ?
                <Component {...props} /> : 
                <Redirect exact to="/private" />
            )} />    
        </div>
    );
};

export default PublicRouter;
```

PrivateRouter

```js
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useGoogleAuth } from "./googleAuth";

const PrivateRoute = ({component: Component, ...rest}) => {

    const { isSignedIn } = useGoogleAuth();

    return (
        <div>
            <Route {...rest} render={props => (
                isSignedIn ?
                <Component {...props} />: 
                <Redirect exact from="/private" to="/" />
            )} />
        </div>
    );
};

export default PrivateRoute;
```

Mình sẽ điều chỉnh các quy tắc điều hướng của mình, thêm các bộ định tuyến đã tạo.
và ứng dụng đã hoàn thành.

```js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PrivatePage from './PrivatePage'
import PublicPage from './PublicPage'
import PrivateRouter from './PrivateRoute';
import PublicRouter from './PublicRouter';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <PrivateRouter path="/private" component={PrivatePage} />                
          <PublicRouter path="/" component={PublicPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
```

Bây giờ chúng ta có một hệ thống xác thực cơ bản bằng cách sử dụng hook và oAuth2 của Google :D

![](https://images.viblo.asia/88caf5f3-26e8-48dc-908a-bcd626e7bc94.gif)

**Kết quả** cuối cùng sau khi thực hiện sẽ thông như sau: 

![](https://images.viblo.asia/bf7ef397-f199-4227-932e-9d68da8d7870.gif)

**Tài liệu tham khảo**
* https://github.com/asyarb/react-use-googlelogin
* https://blog.kommit.co/google-login-with-react-hooks-5cc502bc0845
* https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71