# Giới thiệu chung
React Router là một thư viện nhẹ cho phép bạn quản lý và xử lý việc định tuyến cho ứng dụng React của mình.

Trong số các tính năng nổi bật nhất của React Router là route render methods, cho phép component của bạn truy cập các match, history, loaction của props. Các props này được sử dụng để truyền dữ liệu từ URL đến component và điều hướng ứng dụng React của bạn.

Ví dụ: nếu bạn muốn tạo nút quay lại, bạn có thể sử dụng hàm goBack () từ history props. Điều này khác nhau trong các môi trường hoặc trình duyệt web để bạn có thể quay lại trang web trước đó một cách đơn giản.
```
// a Route with component props
<Route path="/post/:number" component={Post} />

// The component itself
function Post(props) {
  return (
    <div>
      In React Router v4, you get the history object from props. <br />
      <button type="button" onClick={() => props.history.goBack()}>
        Go back
      </button>
    </div>
  );
}
```
React Router có một vài hook cho phép bạn truy cập trạng thái của router và thực hiện điều hướng từ bên trong các component của bạn. 
Xin lưu ý: Bạn cần phải sử dụng React> = 16.8 để sử dụng các hook sau:
* useHistory
* useLocation
* useParams
* useRouteMatch
## 1. useHistory

Hook useHistory cung cấp cho bạn quyền truy cập vào history  instance mà bạn có thể sử dụng để điều hướng
import { useHistory } from "react-router-dom";

```
function HomeButton() {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}
```

## 2. useLocation
Hook useLocation trả về đối tượng vị trí đại diện cho URL hiện tại. Bạn có thể nghĩ về nó giống như useState trả về một vị trí mới bất cứ khi nào URL thay đổi.
Điều này có thể thực sự hữu ích, ví dụ: trong tình huống mà bạn muốn kích hoạt sự kiện “page view” mới bằng cách sử dụng công cụ phân tích trang web của bạn bất cứ khi nào một trang mới tải, như trong ví dụ sau:
```
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";

function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    ga.send(["pageview", location.pathname]);
  }, [location]);
}

function App() {
  usePageViews();
  return <Switch>...</Switch>;
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  node
);
```
## 3.useParams

Hook useParams trả về một đối tượng gồm các cặp khóa / giá trị của tham số URL. Sử dụng nó để truy cập match.params của <Route> hiện tại.
```
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

function BlogPost() {
  let { slug } = useParams();
  return <div>Now showing post {slug}</div>;
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/blog/:slug">
        <BlogPost />
      </Route>
    </Switch>
  </Router>,
  node
);
```
## 4. useRouteMatch

Hook useRouteMatch match với URL hiện tại giống như cách mà <Route> sẽ làm. Nó chủ yếu hữu ích để có quyền truy cập vào dữ liệu không thực sự được render ở <Route>.
### Thay vì
```
import { Route } from "react-router-dom";

function BlogPost() {
  return (
    <Route
      path="/blog/:slug"
      render={({ match }) => {
        // Do whatever you want with the match...
        return <div />;
      }}
    />
  );
}
```
### Bạn chỉ cần 
```
import { useRouteMatch } from "react-router-dom";

function BlogPost() {
  let match = useRouteMatch("/blog/:slug");

  // Do whatever you want with the match...
  return <div />;
}
```

### Bạn có thể sử dụng Hook useRouteMatch:
* không nhận đối số và trả về đối tượng khớp của <Route> hiện tại
* nhận một đối số duy nhất, giống với đối số props của matchPath. Nó có thể là một tên đường dẫn dưới dạng một chuỗi (như ví dụ ở trên) hoặc một đối tượng với các props phù hợp mà Route chấp nhận, như sau:
```
const match = useRouteMatch({
  path: "/BLOG/:slug/",
  strict: true,
  sensitive: true
});
```
        
###  Tham khảo: 
*   https://reactrouter.com/web/api/Hooks
*   https://blog.logrocket.com/react-router-hooks-will-make-your-component-cleaner/