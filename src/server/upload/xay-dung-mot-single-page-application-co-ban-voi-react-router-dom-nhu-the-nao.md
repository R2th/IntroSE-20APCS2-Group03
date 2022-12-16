# Mở đầu

Trong những website thông thường khi điều hướng từ page này sang page khác, chúng ta sẽ sử dụng thẻ <a> để làm điều đó, nhưng trong React JS thường được sử dụng để xây dựng nhữmg Single Page Application (SPA) khi chúng ta làm như vậy thì sẽ reloading lại toàn bộ page từ server, điều đó là không hiệu quả đối với 1 SPA. Thực chất SPA chỉ có 1 html page, nhưng bao gồm nhiều page views (components), và sẽ load ra page view tương ứng dựa trên route chứa component đó.
    
Và như vậy khái niệm routing ra đời dung để điều hướng từ page này sang page khác trong SPA mà không cần refresh browser. React Router được tạo ra với vai trò là 1 thư viện routing phổ biến và mạnh mẽ. Trong bài này ta sẽ tìm cách sử dụng thư viện này để xây dụng 1 SPA cơ bản nhé!
    
# Cài đặt
    
Đầu tiên ta sẽ khởi tạo project theo cách thông dụng nhất bây giờ 
```
npx create-react-app my-app
cd my-app
npm start
```
Và tiếp đó, sẽ cài đặt thêm các thư viện mà ta sẽ sử dụng trong dự án demo này  
`yarn add @atlaskit/css-reset @material-ui/core @material-ui/icons react-router-dom styled-components`

Tiếp theo, bạn có thể tham khảo cấu trúc thư mục như sau

![](https://images.viblo.asia/ed2ffc96-a47c-4597-b840-e175b338fae3.png)
    
Ý tưởng cho dự án demo: 
* Có layout chính đó là `ClientLayout` của các page như HomePage, AboutPage,... hoặc bạn có thể có tạo `AdminLayout` trong dự án của mình  
* Tiếp đó là thư mục pages chứa các pages được lọc theo từng layout ví dụ `HomePage` sẽ ở trong thư mục `Client`
* Folder components chứa các stateless component, hoặc các component nhỏ dùng để reuse, dùng để dùng trong features. Tạm thời ta sẽ chỉ có file `NotFound` để hiển thị trang 404 
* Thư mục features thường là stateful component hoặc là component connect với redux/store. Nên ta sẽ có một vài features như `Header`, `Post`, `LoginForm`,...
* Cuối cùng đó là các file routes.js là nơi chưa các routing được sử dụng trong ứng dụng 
#  Thực hiện
Ta sẽ bổ sung code tuần tự các file theo luồng hoạt động của React!
    
**1. src/index.js**
```
import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
```
Bổ sung thêm` @atlaskit/css-reset` ở đây để reset hết các thuộc tính mặc định của các thẻ trong HTML5 như margin-bottom của thẻ `<p>`,...

**2. src/App.js**
```
import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import routes from "./routes";

export default function App() {
  const renderRoutes =
    routes &&
    routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      );
    });

  return (
    <BrowserRouter>
      <Switch>{renderRoutes}</Switch>
    </BrowserRouter>
  );
}
```
File src/App.js ở đây sẽ có nhiệm vụ khởi tạo việc sử dụng React Router DOM:
* BrowserRouter: có nhiệm vụ khiến cho UI đồng bộ với URL 
* Switch sẽ tìm kiếm các Route tuần tự từ trên xuống dưới xem Route nào sẽ match với URL
* Route sẽ render components tương ứng kèm theo các thuộc tính như path, exac,...

Và ở đây ta thấy có `import routes from "./routes.";` gọi đến file` src/routes.js` để lấy dữ liệu và truyền vào thuộc tính trong component `Route`

**3. src/routes.js**
```
import React from "react";
import LoginPage from "./pages/Authentication/LoginPage.jsx";
import ClientLayout from "./layouts/ClientLayout";

const routes = [
  {
    path: "/login",
    exact: false,
    main: () => <LoginPage />,
  },
  {
    path: "",
    exact: true,
    main: () => <ClientLayout />,
  },
];

export default routes;
```
Ta sẽ có 2 route mẫu với các thuộc tính như sau:
* path: Chứa đường dẫn của Route. Ví dụ khi ta chay đường dẫn http://localhost:3000/login thì sẽ chạy tới AuthenticationLayout
* exact: Đặt là true cho đường dẫn mặc định. Ví dụ "/" để phân biệt với "/login" sẽ là 2 path khác nhau. Nếu đặt là false thì dù truy cập http://localhost:3000/login  nhưng react vẫn sẽ render ra ClientLayout
* main: Chứa component mà React sẽ render để hiển thị ra màn hình
    
**4. src/pages/Authentication/LoginPage.jsx**
```
import React from 'react';
import LoginForm from '../../features/LoginForm/LoginForm';

const LoginPage = () => {
  return <LoginForm/>
}

export default LoginPage
```
**5. src/features/LoginForm/LoginForm.jsx**
```
import React from "react";
import { Container } from '@material-ui/core';
import styled from 'styled-components';

const StyledBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`
const StyledForm = styled.div`
  height: 600px;
  width: 500px;
  background-color: gray;
  text-align: center;
  padding: 30px;
`

const LoginForm = () => {
  return (
    <Container maxWidth="lg">
      <StyledBox>
        <StyledForm>
          <h1 style={{ color: 'white' }}>Login Form</h1>
        </StyledForm>
      </StyledBox>
    </Container>
  );
};

export default LoginForm;
```
**6. src/layouts/ClientLayout/ClientLayout.jsx**
```
import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Header from "../features/Header/Header";
import routes from "../pages/Client/routes";

export default function ClientLayout() {
  let { path } = useRouteMatch();

  const renderRoutes = routes && routes.map((route, index) => {
    return (
      <Route key={index} path={path + route.path} exact={route.exact} component={route.main} />
    );
  });

  return (
    <div>
      <Switch>{renderRoutes}</Switch>
      <Header />
    </div>
  );
}
```
**7. src/pages/Client/routes.jsx**
```
import React from "react";
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import NotFound from '../../components/NotFound/NotFound';

const routes = [
  {
    path: "",
    exact: true,
    main: () => <HomePage />,
  },
  {
    path: "about",
    exact: false,
    main: () => <AboutPage />,
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />,
  },
];

export default routes;
```
**8. src/features/Header/Header.jsx**
```
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const menu = [
  {
    name: "Home",
    to: "/"
  },
  {
    name: "About",
    to: "/about"
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuItem: {
    color: 'white',
    '&:focus, &:hover': {
      color: "white",
      textDecoration: 'none',
      outline: 'none'
    },
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const showMenu = menu && menu.map((menuItem, index) => {
    return (
      <Button key={index}>
        <Link to={menuItem.to} className={classes.menuItem}>
          {menuItem.name}
        </Link>
      </Button>
    )
  })

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {showMenu}
        </Toolbar>
      </AppBar>
    </div>
  );
}
```
**9. src/pages/Client/AboutPage.jsx**
```
import React from "react";
import { Container } from "@material-ui/core";
import styled from "styled-components";

const StyleTitle = styled.h1`
  padding-top: 20px;
  text-align: center;
`

const AboutPage = () => {
  return (
    <Container maxWidth="lg">
      <StyleTitle>About Page</StyleTitle>
    </Container>
  );
};

export default AboutPage;
```
**10. src/pages/Client/NotFound.jsx**
```
import React from "react";
import { Container } from "@material-ui/core";
import styled from "styled-components";

const StyleTitle = styled.h1`
  padding-top: 20px;
  text-align: center;
`

const NotFound = () => {
  return (
    <Container maxWidth="lg">
      <StyleTitle>404 - Not Found</StyleTitle>
    </Container>
  );
};

export default NotFound;
```
**11. src/pages/Client/HomePage.jsx**
```
import React from "react";
import { Container } from "@material-ui/core";
import styled from "styled-components";
import Posts from '../../features/Posts/Posts';

const StyleTitle = styled.h1`
  padding-top: 20px;
  text-align: center;
`

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <StyleTitle>Home Page</StyleTitle>
      <Posts />
    </Container>
  );
};

export default HomePage;
```
**12. src/features/Posts/Posts.jsx**
```
import React from "react";
import Post from './Post';

const posts = [
  {
    "title": "Post 1"
  },
  {
    "title": "Post 2"
  },
  {
    "title": "Post 3"
  }
]

const Posts = () => {
  const showPosts = posts.length > 0 && posts.map((post, index) => {
    return (<Post post={post} key={index} />);
  });

  return (
    <div style={{display: 'flex'}}>{showPosts}</div>
  )
};

export default Posts;
```
**13. src/features/Posts/Post.jsx**
```
import React from "react";
import styled from "styled-components";

const StyleBox = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gray;
  margin-top: 20px;
  margin-right: 20px;
`

const Post = (props) => {
  const { post } = props
  return (
    <StyleBox>
      <h1>{post.title}</h1>
    </StyleBox>
  );
};

export default Post;
```
# Tổng kết
Và chúng ta sẽ có sản phẩm cuối cùng giống như sau:
![](https://images.viblo.asia/d13a7cf7-6bcd-44e7-8ca8-8566658ae0ca.gif)
Chúc các bạn sẽ học tập thật tốt và tìm được điều bạn cần từ bài viết này !
    
**Tài liệu tham khảo**

https://viblo.asia/p/routing-trong-react-js-phan-1-oOVlYp4VZ8W
https://reactrouter.com/web/guides/quick-start