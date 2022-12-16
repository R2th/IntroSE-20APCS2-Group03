![](https://images.viblo.asia/383e1c55-e4cc-4b53-954a-6b1d89213010.png)



React Router v6 đang được dần hoàn thiện và sẽ trình làng trong thời gian sắp tới.

Cùng tìm hiểu qua nhưng thay đổi tích cực của phiên bản v6 này so với phiên bản trước đó (v5) như nào nhé (go)
    
## 1. `<Switch>` is becoming `<Routes>`
 
`Component` ở mức cao nhất đã thay đổi tên từ `<Switch>` thành `<Routes>`, nhưng chủ yếu chức năng cũ của nó vẫn đựoc giữ nguyên
    
```
// v5
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/profile"><Profile /></Route>
      </Switch>
    </BrowserRouter>
  );
}
```
    
Với React Router v6, ta chỉ việc thay đổi bằng `<Routes>`

```
// v6
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile/*" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
    
```

## 2 Big Changes with `<Route>`

Ở phiên bản v6 `<Route>` dường như nhận được nhiều thay đổi hơn cả, những thay đổi mới làm cho các sử dụng cũng như hiểu trở nên đơn giản hơn rất nhiều
    
Các props `component` hay `render` trong v5 sẽ được thay đổi thành `element`
    
```  
import Profile from './Profile';

// v5
<Route path=":userId" component={Profile} />
<Route
  path=":userId"
  render={routeProps => (
    <Profile routeProps={routeProps} animate={true} />
  )}
/>

// v6
<Route path=":userId" element={<Profile />} />
<Route path=":userId" element={<Profile animate={true} />} />
```
    
**Note:**

- Ngoài ra `<Route exact />` đã bị lược bỏ đi, bởi vì tất cả `<Route>` paths đều mặc định là `exact`. Nếu bạn muốn tạo 1 đường dẫn cho nhiều `<Route>` với nhiều tùy chỉnh thì có thể sử dụng dấu `*` giống với ví dụ bên trên `<Route path="profile/*" element={<Profile />} />`
   
    
- Note `<Route path>` patterns
    
React Router v6 sử dụng format đơn giản, chỉ hỗ trợ 1 loại URL động đó là `:id` và `*`, với `*` chỉ được ở cuối url, không được đặt ở giữa
    
Những format route hợp lệ trong v6:
    
```
/groups
/groups/admin
/users/:id
/users/:id/messages
/files/*
/files/:id/*
/files-*
```
    
Những route được viết theo cấu trúc `RegExp` sẽ không hợp lệ ở v6:
    
```
/users/:id?
/tweets/:id(\d+)
/files/*/cat.jpg
```
    
Việc loại bỏ viết theo cấu trúc `RegExp`giúp giảm đi kích thước file khi bundle và giúp cho cú pháp của `Route` đơn giản, dễ đọc hơn

## 3. Nested Routes are Simpler
    
Nested routes trong v5 yêu cầu bạn phải xác định cụ thể url để có thể render chính xác component, yêu cầu phải sử dụng đến logic string-matching (ghép các string lại với nhau), ví dụ:

```
// v5
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

function Profile() {

  let match = useRouteMatch();

  return (
    <div>
      <nav>
        <Link to={`${match.url}/me`}>My Profile</Link>
      </nav>

      <Switch>
        <Route path={`${match.path}/me`}>
          <MyProfile />
        </Route>
        <Route path={`${match.path}/:id`}>
          <OthersProfile />
        </Route>
      </Switch>
    </div>
  );
}
```

Với React Router v6, bạn có thể bỏ qua phần logic string-matching (`match.path` như trên ví dụ), cũng không cần hook `useRouteMatch()` nữa. Những dòng code của bạn sẽ dễ đọc hơn nhiều:

```
// v6
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from 'react-router-dom';

// Approach #1
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile/*" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

function Profile() {
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>

      <Routes>
        <Route path="me" element={<MyProfile />} />
        <Route path=":id" element={<OthersProfile />} />
      </Routes>
    </div>
  );
}

// Ngoài ra, bạn cũng có thể định nghĩa tất cả routes trong một file, sau đó sử dụng `<Outlet>`
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />}>
          <Route path=":id" element={<MyProfile />} />
          <Route path="me" element={<OthersProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Profile() {
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>

      <Outlet />
    </div>
  )
}
```

Note: the <Outlet> component is used like {this.props.children} in React Router v6. This was a very popular feature from Reach Router!

- Note: `<Outlet> component` đựoc sử dụng giống  với `{this.props.children}` trong React Router v6.
    
    
## 4. `useNavigate` Instead of `useHistory`
    
Với các phiên bản trước chúng ta thường sử dụng `history` trong hook `useHistory` để điều hướng. Nhưng trong React Router v6 này, `useHistory` đã được thay đổi tên thành `useNavigate`

```
// v5
import { useHistory } from 'react-router-dom';

function MyButton() {
  let history = useHistory();
  function handleClick() {
    history.push('/home');
  };
  return <button onClick={handleClick}>Submit</button>;
};
```

`history.push()` sẽ được thay thế bằng `navigate()`:

```
// v6
import { useNavigate } from 'react-router-dom';

function MyButton() {
  let navigate = useNavigate();
  function handleClick() {
    navigate('/home');
  };
  return <button onClick={handleClick}>Submit</button>;
};
```

Trong một vài trường hợp, chúng ta lại muốn thay đổi URL chứ không muốn push URL mới:
    
```
// v5
history.push('/home');
history.replace('/home');
history.push('/home', {state: state});
```
    
```
// v6
navigate('/home');
navigate('/home', {replace: true});
navigate('/home', {state: state});
```
    
Còn với trường hợp bạn thường sử dụng `go`, `goBack`, `goForward` của `useHistory` thì với `useNavigate`, mọi thứ đều đựoc giản lược hết: 
    
```
// This is a React Router v5 app
import { useHistory } from 'react-router-dom';

function App() {
  const { go, goBack, goForward } = useHistory();

  return (
    <>
      <button onClick={() => go(-2)}>Go 2 pages back</button>
      <button onClick={goBack}>Go back</button>
      <button onClick={goForward}>Go forward</button>
      <button onClick={() => go(2)}>Go 2 pages forward</button>
    </>
  );
}
```
    
Với v6: 
    
```
// This is a React Router v6 app
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(-2)}>Go 2 pages back</button>
      <button onClick={() => navigate(-1)}>Go back</button>
      <button onClick={() => navigate(1)}>Go forward</button>
      <button onClick={() => navigate(2)}>Go 2 pages forward</button>
    </>
  );
}
```
       
    
## 5. From 20kb to 8kb
    
Hơn tất cả những thay đổi trên, React Router v6 còn nhỏ nhẹ hơn chỉ bằng 50% so với phiên bản v5 trước đó. Nhẹ hơn đồng nghĩa là sẽ tải và load thư viện sẽ nhanh hơn. Quá tuyệt.

![](https://images.viblo.asia/236bc9b3-8fae-453e-89ab-f22aea539520.png)

https://bundlephobia.com/result?p=react-router@5.1.2
    
https://bundlephobia.com/result?p=react-router@6.0.0-alpha.3

## 6. Tổng  kết
    
Qua bài viết trên, mình muốn giới thiệu những điểm nổi bật của React Router v6 so với phiên bản hiện tại là v5, hi vọng sẽ giúp ích cho mọi người
    
Cùng chờ đón bản release chính thức của React Router v6 nhé, [release note](https://github.com/ReactTraining/react-router/releases)
    
Cảm ơn mọi người đã theo dõi.
    
## 7. Tài liệu tham khảo
    
[React Router v6 Preview](https://reacttraining.com/blog/react-router-v6-pre)
    
[React Router v6 in alligator](https://alligator.io/react/react-router-v6/)
    
[Migrating React Router v5 to v6](https://github.com/ReactTraining/react-router/blob/dev/docs/advanced-guides/migrating-5-to-6.md)