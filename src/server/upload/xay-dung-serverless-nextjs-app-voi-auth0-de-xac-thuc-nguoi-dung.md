Hãy cùng tìm hiểu cách chúng ta có thể xác thực người dùng một cách đơn giản trong một ứng dụng serverless Next.js bằng cách sử dụng **Auth0** nhé. Chúng ta sẽ sử dụng package là `@auth0/nextjs-auth0` để làm được điều đó.

Một trong những dự án phụ gần đây mà tôi làm là xây dựng trang web thương mại điện tử serverless Next.js. Trang này thì bao gồm cả việc xác thực người dùng, có thể bạn sẽ dặt ra một câu hỏi trong đầu

```
Làm thế nào để xác thực người dùng trong một serverless Next.js app?
```

Hãy cùng tìm hiểu nhé!

## 1. Luồng xác thực là gì?

Trước khi viết bất kỳ đoạn code nào thì chúng ta phải thực sự hiểu những gì chúng ta sắp làm và cách hoạt động của chúng. Bài viết dưới đây sẽ cung cấp cho bạn một cái nhìn tổng quan nhất về cách sử dụng **Auth0** để xác thực.

**[Auth0 - Hướng dẫn cơ bản để xác thực với Auth0 trên Next.js](https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/)**

Luồng đăng nhập của ứng dụng nó sẽ trông như thế này 

![](https://images.viblo.asia/fec5e947-2f07-48fe-b2c5-5f748666be79.jpeg)

Khi người dùng chưa xác thực click vào nút đăng nhập, họ sẽ được chuyển hướng đến form đăng nhập được cung cấp bởi **Auth0**. Sau khi điền và đăng nhập thành công thì sẽ được chuyển hướng về ứng dụng nơi mà chúng ta có thể lựa chọn.

Điều quan trọng ở đây là chúng ta không triển khai bất kỳ loại lưu trữ liên tục nào cho người dùng ở đây. Chúng ta không cần đến lưu trữ database cho một ứng dụng đơn giản như thế này.

## 2. Demo

{@embed: https://vimeo.com/557139230}

Các tính năng cơ bản bao gồm:

Trang chủ hướng dẫn người dùng chưa xác thực đăng nhập

Trang profile của người dùng sau khi đã xác thực

Trang profile là một dynamic route `/profile/username`

Nếu người dùng chưa đăng nhập mà truy cập đến trang profile thì sẽ được chuyển hướng đến trang đăng nhập

Cung cấp tuỳ chọn đăng xuất cho người dùng

Repo của demo ở [đây](https://github.com/kieran6roberts/Blog-Next-Auth0) nếu bạn muốn xem


## 3. Xây dựng ứng dụng

Để xử lý xác thực ứng dụng ta sử dụng package `@auth0/nextjs-auth0`. Package này dùng để hỗ trợ xác thực người dùng bằng **Auth0** trong ứng dụng Next.js. Để sử dụng bạn phải đáp ứng các điều kiện:

* `Node.js version ^10.13.0 || >=12.0.0`
* `Next.js version >=10`

### Initialize ứng dụng

Chúng ta sẽ bắt đầu ứng dụng này từ đầu. Bắt đầu bằng cách khởi tạo một project Next.js

```
npx create-next-app next-auth0
```

Cài đặt các package cần thiết

```
yarn add @auth0/nextjs-auth0 @emotion/react
```

* `@auth0/nextjs-auth0` - SDK để xử lý việc xác thực
* `@emotion/react` - package để styling CSS trong React

Tôi dùng Emotion react đế styling CSS và tất nhiên bạn có thể dùng bất kỳ library nào khác mà bạn muốn.

### Auth0 setup

Trước khi tiếp tục, chúng ta cần thiết lập một ứng dụng trên trang **Auth0** của họ. Bạn có thể đăng ký ở [đây](https://auth0.com/signup?place=header&type=button&text=sign%20up)

Sau khi đăng nhập ứng dụng bạn di chuyển đến tab **Applications**

Click vào **Create Application** và đặt cho nó một cái tên. Ở đây tôi đặt tên là `my-next-auth0` sau đó chọn tuỳ chọn là 'Regular Web Application'

![](https://images.viblo.asia/aa3f4594-0806-40a2-b3e5-8af8282f59a8.jpeg)

Trong ô select Chọn Next.js làm công nghệ của ứng dụng. Auth0 gần đây có bản cập nhật trên trang của họ và có cung cấp một tài liệu rất là hữu ích về cách bắt đầu Auth0 trong ứng dụng Next.js. Thông tin này nằm ở mục 'Quick Start' nếu bạn cần sự trợ giúp.

![](https://images.viblo.asia/45f5d0ba-e87f-4ebe-84d1-b11d0e7bd7e9.jpeg)

Bước tiếp theo là cấu hình một số cài đặt trong Auth0. Click vào tab 'Setting' chúng ta có 2 lựa chọn:

* Allowed Callback URLs - `http://localhost:3000/api/auth/callback`
* Allowed Logout URLs - `http://localhost:3000/`

![](https://images.viblo.asia/6803463a-6fb3-493e-8446-31a140dfb41a.jpeg)


Khi user nhấn bút đăng xuất chúng ta cần chỉ định một URL hợp lệ để **Auth0** trong trường hợp đăng xuất. Ở đây của tôi là `http://localhost:3000/` 

Package `@auth0/nextjs-auth0` yêu cầu các cài đặt trong dashboard của Auth0, vì vậy hãy kiểm tra chúng sao cho đúng.

* JWT Signature Algorithm - RS256
* OIDC Conformant - True

Bạn sẽ thấy nó trong 'Advanced Settings - OAuth'.

![](https://images.viblo.asia/1df6b32d-a208-474c-9ec6-8128c494863c.jpeg)


Bây giờ chúng ta sẽ cần một số const trong ứng dụng Next.js cái mà sẽ được lưu trong một biến môi trường. Tạo file `.env.local` ở thư mục gốc của ứng dụng

```
touch .env.local
```

và thêm một vài config

```
AUTH0_BASE_URL={{Base URL of your site, probably http://localhost:3000 in development}}
AUTH0_ISSUER_BASE_URL={{https://your auth app domain found in dashboard}}
AUTH0_SECRET={{Some secret used to encrypt the session cookie}}
AUTH0_DOMAIN={{https://your auth app domain found in dashboard}}
AUTH0_CLIENT_ID={{Auth0 app client id found in dashboard}}
AUTH0_CLIENT_SECRET={{Auth0 app client secret in dashboard}}
AUTH0_SCOPE={{The scopes we want to give to our authorized users, here I will use 'openid profile'}}
```

Package auth0 sẽ lấy thông tin từ file môi trường này nên hãy đảm bảo rằng bạn không bỏ lỡ việc này và điền đúng những tên như bên trên. 

Đối với biến `AUTH0_SECRET` thì bạn có thể tạo một cách bảo mật bằng cách dùng lệnh

```
openssl rand -hex 32
```

### Auth API route

Bây giờ chúng ta cần sử dụng Next.js API route. Nếu bạn cần giới thiệu nhanh thì có thể tham khảo tại [đây](https://blog.kieranroberts.dev/getting-started-with-nextjs-api-routes) 

Chúng ta cần tạo một API route để xử lý xác thực người dùng. Tạo file `pages/api/auth/[...auth0].js`

```
// project root
touch pages/api/auth/[...auth0].js
```

Sử dụng dynamic route sẽ khớp với tất cả các route được mở đầu bằng `/api/auth/` có nghĩa là nó sẽ chạy bất cứ khi nào bạn truy cập auth route của mình. 

* `/api/auth/login`
* `/api/auth/callback`
* `/api/auth/logout`
* `/api/auth/me`

```
import { handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth();
```

Chúng ta sẽ thêm một vài chức năng tuỳ chỉnh như ở dưới đây

### Auth Provider `_app.js`

Chúng ta có thể truy cập người dùng trên client hoặc server. Để truy cập người dùng trên client chúng ta cần bọc ứng dụng trong component `UserProvider` được cung cấp bởi `@auth0/nextjs-auth0` 

```
// _app.js
import { Global, css } from '@emotion/react';
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Global styles={css`
        *, *::after, *::before {
          box-sizing: border-box;
          font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
          padding: 0;
          margin: 0;
        }

        a {
          text-decoration: none;
        }

        ul {
          list-style: none;
        }
      `}
      />
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
```

Thêm một vài CSS cơ bản để trong dễ nhìn hơn 

Bước tiếp theo là xây dựng giao diện để cho người dùng biết rằng họ đang đăng nhập rồi hay là chưa.

### Home page

Bắt đầu với trang chủ, dưới đây là giao diện khi chưa xác thực người dùng.

![](https://images.viblo.asia/362e3725-3a62-4394-a12d-71b398454e80.jpeg)

Còn người dùng đã xác thực

![](https://images.viblo.asia/7d0bfa0a-6188-4f95-b8a8-b24756f8ea47.jpeg)

```
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { getSession } from '@auth0/nextjs-auth0';

import AuthLink from '../components/AuthLink';
import Nav from '../components/Nav';

export default function Home({ user }) {
  return (
    <div css={css`
      align-items: center;
      background: #ff00cc;
      background: -webkit-linear-gradient(to right, #333399, #ff00cc);
      background: linear-gradient(to right, #333399, #ff00cc);
      display: flex;
      height: 100vh;
      justify-content: center;
    `}
    >
      <div css={css`
        background-color: #fff;
        border-radius: 1rem;
        padding: 4rem 8rem;
        text-align: center;
        `}
      >
        <Nav user={user} />
        <h2 css={css`
          margin: 2rem 0;
        `}
        >
          {user?.name ?? 'Welcome User'}
        </h2 >
        <p css={css`
          margin-top: 2rem;
          margin-bottom: 3rem;
        `}
        >
          {user ? `It's great to have you here${user.given_name ? ` ${user.given_name}!!` : '!!'}` : 'I bet you would like to sign in to our app right? Click the Sign in button below'}
        </p>
        <div>
          {user ?
            <AuthLink path="/api/auth/logout">Sign Out</AuthLink>
          :
            <AuthLink path="/api/auth/login">Sign In</AuthLink>
          }
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const session = getSession(req, res);

  return {
    props: { user: session?.user ?? null }
  }
}
```

Như bạn có thể thấy đây là một trang khá đơn giản, nhưng tôi sẽ chỉ cho bạn một vài điểm sau đây

Trước hết chúng ta pre-rendering trang web trên server sử dụng `getServerSideProps()` 
Chúng ta sử dụng một hàm hỗ trợ `getSession()` để lấy các request và response object param và lấy các thông tin người dùng ở session hiện tại nếu nó tồn tại.

Lý do chính sử dụng server-rendering trang này đó là để biết chắc chắn có user hay không trước khi render page. Route user profile sẽ có dạng `/profile/username` 

Bạn có thể thấy rằng tôi đang import hai component khác đó là `Nav` và `AuthLink` ở Home page bởi vì chúng ta sẽ tái sử dụng nó ở những trang khác.

### `useUser()` hook

Một cách nữa để fetching thông tin người dùng đó là sử dụng custom hook `useUser()` . Chúng ta sẽ lấy được thông tin người dùng, hay thông báo lỗi và loading ở đây.

```
import { useUser } from '@auth0/nextjs-auth0';

// Inside your component
const { user, error, loading } = useUser();
```

### Nav component

Style cho `Nav` component một chút nào

```
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

const linkItem = css`margin: 0 2rem;`;
const link = css`color: #ff00cc; padding: 0.5rem 1rem;`;

const Nav = ({ user }) => {
  return (
    <nav>
      <ul css={css`
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
      `}
      >
        <li css={linkItem}>
          <a css={link}
          href="/"
          >
            Home
          </a>
        </li>
        <li css={linkItem}>
          <a css={link}
          href={`/profile/${user?.nickname ?? '_'}`}
          >
            Profile
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Nav;
```

Component này sẽ lấy oject user làm prop. Nếu người dùng tồn tại thì route link sẽ là `/profile/${user?.nickname ?? '_'}` . Nếu không sẽ chuyển hướng tới tran `/404`

### `AuthLink` component

```
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

const AuthLinkStyles = css`
  background-color: #ff00cc;
  border: 1px solid #ff00cc;
  border-radius: 0.5rem;
  color: #fff;
  display: block;
  margin: auto;
  padding: 1rem 2rem;
  width: max-content;
`;

const AuthLink = ({ children, path }) => (
  <a css={AuthLinkStyles} href={path}>{children}</a>
);

export default AuthLink;
```

### Profile page

Bây giờ ta tạo một dynamic route khác là `/profile/[profile].js` . Route này sẽ chỉ được access khi người dùng đã đăng nhập. Còn nếu chưa thì sẽ chuyển hướng sang trang đăng nhập.

![](https://images.viblo.asia/ca931e34-e968-4dc7-93b3-ba5c67559b29.jpeg)

Tạo các protected route bằng cách sử dụng một HOC được cũng cấp sẵn là `withPageAuthRequired` và bọc trong hàm `getServerSideProps()` 

```
// project root
touch pages/profile/[profile].js
```

```
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

import AuthLink from '../../components/AuthLink';
import Nav from '../../components/Nav';

const profileItem = css`margin: 2rem 0`;

export default function Profile({ user }) {
  return (
     <div css={css`
      align-items: center;
      background: #40E0D0;
      background: -webkit-linear-gradient(to right, #FF0080, #FF8C00, #40E0D0);
      background: linear-gradient(to right, #FF0080, #FF8C00, #40E0D0);

      display: flex;
      height: 100vh;
      justify-content: center;
    `}
    >
      <div css={css`
      background-color: #fff;
      border-radius: 1rem;
      padding: 4rem 8rem;
      text-align: center;
      `}
      >
        <Nav user={user} />
        <h2 css={css`margin: 2rem 0`}>Welcome to your profile {user.name}</h2>
        {user &&
          <img
          alt="user avatar"
          css={css`
          border-radius: 0.5rem
          `}
          src={user.picture}
          />
        }
        <ul css={css`margin-bottom: 2rem`}>
        {user.given_name ? <li css={profileItem}>First name: {user.given_name}</li> : null}
        {user.family_name ? <li css={profileItem}>Family name: {user.family_name}</li> : null}
        {user.nickname ? <li css={profileItem}>Nickname: {user.nickname}</li> : null}
        {user.favoriteFood ? <li css={profileItem}>Favorite Food: {user.favoriteFood}</li> : null}
        </ul>
        <AuthLink path="/api/auth/logout">Sign Out</AuthLink>
      </div>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const { req, res, query } = ctx;
    const { profile } = query;
    const session = getSession(req, res);

    if (profile !== session.user.nickname) {
      return {
        redirect: {
          destination: `/profile/${session.user.nickname}`,
          permanent: true
        }
      }
    }

    return {
      props: {}
    };
  }
});
```

### Custom auth helpers

```
import {
  handleAuth,
  handleCallback,
  handleLogin,
  handleLogout,
  handleProfile
} from '@auth0/nextjs-auth0';

const afterCallback = (req, res, session, state) => {
  // user is located in session
  session.user.favoriteFood = 'pizza';
  return session;
};

//Use this to store additional state for the user before they visit the Identity Provider to login.
const getLoginState = (req, loginOptions) => {
  console.log(loginOptions.authorizationParams.scope); // access scope
  return {}; // custom state value must be an object
};

// Use this to add or remove claims on session updates
const afterRefetch = (req, res, session) => {};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (err) {
        res.status(err.status ?? 500).end(err.message)
    }
  },
  async logout(req, res) {
    try {
      await handleLogout(req, res);
    } catch (err) {
        res.status(err.status ?? 500).end(err.message)
    }
  },
  async login(req, res) {
    try {
      await handleLogin(req, res, { getLoginState });
    } catch (err) {
        res.status(err.status ?? 500).end(err.message)
    }
  },
  async me(req, res) {
    try {
      await handleProfile(req, res, { afterRefetch });
    } catch (err) {
        res.status(err.status ?? 500).end(err.message)
    }
  }
});
```

### Kết thúc

Vậy là kết thúc phần trình bày về cách implement Auth0 vào để xác thực người dùng. Tôi nghĩ bạn cũng sẽ đồng ý rằng nó khá là dễ phải không nào. Bước tiếp theo có thể là thiết lập database để có thể duy trì nguwofi dùng và có thêm những tùy chỉnh trong ứng dụng


Bài viết được dịch từ: https://blog.kieranroberts.dev/lets-build-a-serverless-nextjs-app-with-auth0-for-authenticating-users