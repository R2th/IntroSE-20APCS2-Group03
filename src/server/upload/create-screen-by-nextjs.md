### Install cần thiết

Chạy command sau để có thể viết được TypeScript

```
# Install required libraries because they are described in typescript
# Execute in the Next.js project root
npm install --save-dev typescript @types/react @types/react-dom @types/node
```

### Tạo template màn hình

Trước khi tạo các màn hình, tạo file mẫu.

Trong file mẫu lần này sẽ định nghĩa common cho phần header và footer.

※ Bài viết này không chú trọng vào phần style nên sẽ sử dụng bulma của CSS framework.

**Tạo file layout.tsx trong thư mục Components.**

```
// /src/app/components/layout.tsx
import * as React from 'react'
import Head from 'next/head'

type Props = {
  title?: string
  isHeader?: boolean
  isFooter?: boolean
}

function getHeader(title: string) {
  return (
    <header>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className='container'>
            <h1 className="title">{title}</h1>
          </div>
        </div>
      </section>
    </header>
  );
}

function getFooter() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>Next Test Screen</p>
      </div>
    </footer>
  );
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'Next Sample Screen Title',
  isHeader = true,
  isFooter = true,
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
      <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
      <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
    </Head>
    {isHeader && (getHeader(title))}
    <section className="section">
      <div className="container">
        {children}
      </div>
    </section>
    {isFooter && (getFooter())}
  </div>
)

export default Layout
```

Thông qua các hàm function getHeader() và function getFooter() để mô tả xử lý riêng bằng biến.

### Tạo màn hình gốc di chuyển

Tạo màn hình kiểu như màn hình login để làm màn hình gốc di chuyển.

**Tạo file login.tsx trong thư mục Pages.**

```
// /src/app/pages/login.tsx
import * as React from 'react'
import Router from 'next/router'

import Layout from '../components/layout'

interface LoginProps {}
interface LoginState {
  credentials: {
    email: string
    password: string
  }
  isLoading: boolean
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props)
    this.state = {
      credentials: {
        email: null,
        password: null,
      },
      isLoading: false
    }
  }

  handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { credentials } = this.state
    credentials[e.target.name] = e.target.value

    this.setState({ credentials })
  }

  handleLoginSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    this.setState({ isLoading: true })

    setTimeout(() => {
      this.setState({ isLoading: false })
      // Screen transition to / user when button is pressed
      Router.push('/user')
      // Router.replace('/user')
    }, 1000)
  }

  public render() {

    return (
      <Layout title="Login" isHeader={false} isFooter={false}>
        <form action="">
          <div className="login-area">
            <div>
              <h1 className=""><img src="/static/Nexttch_black.png" alt="my image" /></h1>
            </div>
            <article className="box is-rounded">
              <div className="field">
                <label className="label">Email</label>
                <p className="control has-icons-left">
                  <input className="input" type="email" placeholder="Email" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <p className="control has-icons-left">
                  <input className="input" type="password" placeholder="Password" />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="">
                  <button className="button is-medium is-info is-fullwidth" onClick={this.handleLoginSubmit}>ãƒã‚°ã‚¤ãƒ³</button>
                </p>
              </div>
            </article>
          </div>
        </form>
        <style jsx>
        {`
          .login-area {
            margin: 0 auto;
            min-width: 375px;
            max-width: 400px
          }
          .box {
            padding-top: 3rem;
          }
          h1 {
            padding: 3rem 6rem;
            text-align: center;
          }

          .field {
            padding-bottom: 1.5rem;
          }
        `}
        </style>
      </Layout>
    );
  }

}

export default Login;
```

### Tạo màn hình đích di chuyển

Tạo màn hình kiểu như màn hình My Page để làm màn hình đích di chuyển.

Install library cần thiết để có thể call được API.

```
# Install isomorphic-unfetch
npm install --save isomorphic-unfetch
```


**Tạo file user.tsx trong thư mục Pages


```
// /src/app/pages/user.tsx
import * as React from 'react'
import Layout from '../components/layout'
import fetch from "isomorphic-unfetch";

interface UserProps {
  data: {
    name: string
    enname: string
    birthday: string
    constellation: string
  }
}
class User extends React.Component<UserProps> {
  constructor(props: UserProps) {
    super(props)
  }
  static async getInitialProps(ctx: any) {
    try {
      let response;
      response = await fetch("http://localhost/api/user");
      const json = await response.json();
      return {
        data: json.data
      };
    } catch (e) {
      console.error(e);
      return {
        data: []
      };
    }
  }

  public render() {
    return (
      <Layout title="Next Sample Test Screen">
        <div className="message is-info user-area">
          <h1 className="message-header">Introduction</h1>
          <div className="description">
            <figure className="image is-128x128">
              <img className="is-rounded" src="/static/Nextgisawa.jpg" />
            </figure>
          </div>
    
          <p className="description name">{this.props.data.name}</p>
          <p className="description en-name">{this.props.data.enname}</p>
          <p className="description birthday">{this.props.data.birthday}</p>
          <p className="description constellation">{this.props.data.constellation}</p>
        </div>
        <style jsx>
          {`
            .user-area {
              margin: 0 auto;
              min-width: 375px;
              max-width: 600px;
              padding-bottom: 3rem;
              margin-bottom: 3rem;
            }
            .description {
              margin-top: .2rem;
              text-align: center;
            }
            .description figure {
              margin-top: 2rem;
              margin-bottom: 2rem;
              top: 0;
              left: 50%;
              -webkit-transform: translateX(-50%);
              transform: translateX(-50%);
            }
            .name {
              margin-top: 1rem;
              font-size: 1.4rem;
              font-weight: bold;
              line-height: 1.6rem;
            }
            .en-name {
              letter-spacing: -.05rem;
            }
            .birthday {
              font-size: .9rem;
              margin-top: .75rem;
            }
            .constellation {
              font-size: .9rem;
              margin-top: -.2rem;
            }
          `}
          </style>
      </Layout>
    );
  }
}

export default User
```
    
Khi hiển thị màn hình sẽ chạy hàm getInitialProps() và gọi API http://localhost/api/user

### Xử lý gọi API external

Tạo xử lý gọi bằng file đã tạo ở trên.

Dựa vào vị trí mô tả ở component và page, có thể chạy bằng bên server hoặc client đều được. Trường hợp là cấu trúc SSR thì không thể gọi API external bên client được. 

Sau đây là cách tạo để có thể gọi được API thông qua Next.js server.

**Tạo API gọi bên phía Next.js**

```
// /src/app/pages/api/user.ts
export default async(req, res) => {
  // Call external API
  const response = await fetch("http://study-next_web_1:8081/user.php");
  const data = await response.json();
  res.status(200).json(data);
}
```
    
***Chú ý:***
Phần study-next_web_1 là tên của container, nên hay thay đổi để phù hợp với tên container sử dụng. 

**Tạo xử lý API external**

Tạo user.php trong thư mục web, tạo php dùng để trả về bằng json.
    
```
<?php
// /src/web/user.php
$array = [
    'result' => 'OK',
    'data' => [
        'name' => 'NEXT SAMPLE',
        'enname' => 'NEXT SAMPLE',
        'birthday' => '1999.09.09',
        'constellation' => 'Virgo'
    ]
];
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($array);
```
 

### Lời cuối 

Trên đây là mô tả đơn giản về cách tạo màn hình theo template, di chuyển màn hình và lấy data từ external server.