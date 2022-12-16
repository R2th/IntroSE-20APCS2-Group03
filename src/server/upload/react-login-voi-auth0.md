Auth0 cho phép bạn thêm xác thực vào ứng dụng React của bạn một cách nhanh chóng và lấy được thông tin user. Ở bài này mình sẽ hướng dẫn cách tích hợp Auth0 vào ứng dụng React bằng Auth0 React SDK.

## Config Auth0

### Thiết lập Application Keys
Khi đăng ký tài khoản trên Auth0, một ứng dụng mới được tạo cho bạn, hoặc bạn có thể tạo mới một cái. Bạn cần một số thông tin chi tiết về ứng dụng để giao tiếp với Auth0. Bạn có thể lấy những thông tin này từ phần [Application Settings](https://manage.auth0.com/#/applications) trong Auth0 dashboard.

![App Dashboard](https://images.viblo.asia/e3088ea1-aa12-4f7d-968e-e249e63696d4.png)

Khi sử dụng Default App với Native hoặc Single Page Application, đảm bảo phải cập nhật Token Endpoint Authentication Method sang None và thiết lâp Application Type dạng SPA hoặc Native.

Bạn cần những thông tin sau:

```
Domain
Client ID
```

### Thiết lập Callback URLs

Callback URL là URL ứng dụng của bạn-nơi Auth0 chuyển hướng user sau khi họ đã xác thực. Callback URL ứng dụng của bạn phải được thêm vào trường **Allowed Callback URLs** trong [Application Settings](https://manage.auth0.com/#/applications) của bạn. Nếu trường này không được đặt, người dùng sẽ không thể đăng nhập vào ứng dụng và sẽ gặp lỗi.


### Thiết lập Logout URLs

Logout URL là URL trong ứng dụng của bạn mà Auth0 có thể return về sau khi user đã đăng xuất khỏi authorization server. Điều này được chỉ định trong param. Tương tự như Callback URL, Logout URL cũng phải được thêm vào trường **Allowed Logout URLs** trong [Application Settings](https://manage.auth0.com/#/applications). Nếu trường này không được đặt, người dùng sẽ không thể đăng xuất khỏi ứng dụng và sẽ gặp lỗi.


### Thiết lập Allowed Web Origins

Bạn cần thêm URL cho ứng dụng của mình vào trường **Allowed Web Origins** được phép trong [Application Settings](https://manage.auth0.com/#/applications/YOUR_CLIENT_ID/settings). Nếu bạn không đăng ký URL ứng dụng của mình tại đây, ứng dụng sẽ không thể refresh the authentication tokens  và user của ứng dụng chúng ta sẽ bị đăng xuất vào lần tiếp theo họ truy cập ứng dụng hoặc làm mới trang.

## Cài đặt Auth0 React SDK

Với npm:

```
npm install @auth0/auth0-react
```

Còn dùng yarn:

```
yarn add @auth0/auth0-react
```

SDK hỗ trợ methods và variables giúp bạn tích hợp Auth0 với ứng dụng React của mình một cách chủ động bằng cách sử dụng React Hooks hoặc các Higher-Order Components.

## Thiết lập Auth0Provider component

Về cơ bản, Auth0 React SDK sử dụng React Context để quản lý authentication state của users. Một cách để tích hợp Auth0 với ứng dụng React của bạn là bọc root component của bạn bằng `Auth0Provider` mà bạn có thể nhập từ SDK.

```
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="YOUR_DOMAIN"
    clientId="YOUR_CLIENT_ID"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
```

`Auth0Provider` component có các props sau:

* `domain` and `clientId`: Giá trị của các thuộc tính này tương ứng với giá trị "Domain" và "Client ID" có trong  "Settings" của single-page application mà bạn đã đăng ký trên Auth0.

> Nếu bạn đang sử dụng [custom domain với Auth0](https://auth0.com/docs/custom-domains), giá trị của thuộc tính domain là giá trị của custom domain thay vì giá trị được phản ánh trong tab "Cài đặt".

* `redirectUri`: URL-nơi bạn điều hướng user sau khi xác thực với Auth0.

`Auth0Provider` lưu trữ authentication state của user và state của SDK — cho dù Auth0 đã sẵn sàng để sử dụng hay chưa. Nó cũng hổ trợ các methods để user đăng nhập và đăng xuất, mà bạn có thể sử dụng bằng` useAuth0()` .

> Bây giờ bạn đã định cấu hình Auth0Provider, hãy chạy ứng dụng của bạn để xác minh rằng SDK đang khởi tạo chính xác và ứng dụng của bạn không gặp bất kỳ lỗi nào liên quan đến Auth0.

## Add Login vào ứng dụng của bạn

Auth0 React SDK cung cấp cho bạn các tool để dễ dàng implement xác thực người dùng cho ứng dụng React của bạn, chẳng hạn như button [Login](https://auth0.com/docs/login) bằng phương thức `loginWithRedirect ()` từ hook` useAuth0 ()`. Khi gọi phương thức `loginWithRedirect()` sẽ chuyển hướng user đến Auth0 Universal Login Page, nơi Auth0 có thể xác thực họ. Sau khi xác thực thành công, Auth0 sẽ chuyển hướng user trở lại ứng dụng của bạn.

```
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
```

> Hướng dẫn này tập trung vào việc sử dụng React Hook tùy chỉnh `useAuth0 ()`. Nếu bạn đang sử dụng các class components, hãy kiểm tra các mẫu này bằng cách sử dụng `withAuth0()` higher-order component.

> Thêm LoginButton component vào ứng dụng của bạn. Khi click nó, hãy xác minh rằng ứng dụng React chuyển hướng user đến trang [Auth0 Universal Login ](https://auth0.com/universal-login)và bây giờ user có thể đăng nhập hoặc đăng ký bằng username và password hoặc login với social provider. 
Sau khi hoàn tất, hãy xác minh rằng Auth0 chuyển hướng user đến ứng dụng của bạn bằng cách sử dụng giá trị của `redirectUri` mà lúc đầu ta config ở `Auth0Provider`.

![Auth0 Universal Login](https://images.viblo.asia/c33034e2-82bd-4061-8c08-f9d84f103c47.png)

> Auth0 cung cấp Google social provider mặc định đối với new tenants và cung cấp developer keys để test logging in với social identity providers. Tuy nhiên, các developer keys có một số hạn chế có thể khiến ứng dụng của bạn hoạt động khác. Để biết thêm chi tiết về hoạt động này cụ thể trông như thế nào và cách khắc phục, hãy tham khảo tài liệu [Test Social Connections with Auth0 Developer Keys](https://auth0.com/docs/connections/social/devkeys#limitations-of-developer-keys)

## Add Logout vào ứng dụng
Bây giờ user có thể login vào ứng dụng, bạn cần có chức năng [Logout](https://auth0.com/docs/logout/guides/logout-auth0). Bạn tạo button Logout sử dụng method `logout()` của `useAuth0()` hook. Khi thực hiện` logout()` sẽ chuyển hướng user đến [Auth0 logout endpoint](https://auth0.com/docs/api/authentication?javascript#logout) (https://YOUR_DOMAIN/v2/logout) và ngay lập tức chuyển hướng user đến ứng dụng của bạn.

```
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

export default LogoutButton;
```

## Hiển thị thông tin User
 Auth0 React SDK giúp bạn lấy thông tin user được liên kết với người dùng đã đăng nhập một cách nhanh chóng trong bất kỳ component nào bạn cần, chẳng hạn như tên hoặc ảnh của user để hiển thị trang thông tin user. Thông tin user có sẵn thông qua thuộc tính `user` đwuọc cung cấp bởi `useAuth0()` hook. Ví dụ Profile component dưới đây sẽ cho thấy rõ cách sử dụng nó:

```
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
```

Thuộc tính user chứa thông tin liên quan đến user's identity (những thông tin này sẽ không chứa có thông tin bảo mật của user như password). Như vậy, tính khả dụng của nó phụ thuộc vào trạng thái xác thực của người dùng. Để tránh bất kỳ lỗi kết xuất nào, hãy sử dụng thuộc tính `isAuthenticated` từ `useAuth0 ()` để kiểm tra xem Auth0 đã xác thực người dùng chưa trước khi React hiển thị bất kỳ thành phần nào sử dụng thuộc tính user. Đảm bảo rằng SDK đã loading xong trước khi truy cập thuộc tính `isAuthenticated`, bằng cách kiểm tra xem `isLoading` bằng `false` sai.

> Xác minh rằng bạn có thể hiện `user.name` hoặc bất kỳ [thuộc tính user nào khác](https://auth0.com/docs/users/user-profile-structure#user-profile-attributes) trong component một cách chính xác sau khi user đăng nhập.