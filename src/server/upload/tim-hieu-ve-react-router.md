## Tại sao lại cần React Router
Việc SPA bị giới hạn trong 1 view trong khi ứng dụng của chúng ta cần hiển thị rẩt nhiều view. Do đó ta cần bỏ qua giới hạn đó để học cách hiển thị nhiều view trên cùng 1 SPA. Đồng thời việc routing cho ứng dụng SPA củng giúp cho việc đồng bộ dữ liệu hiển thị với URL, mang lại trải nghiệm tốt hơn và quen thuộc cho người dùng.

## Tìm hiểu về thư viện react-router-dom


react-router-dom là 1 thư viện JavaScript hỗ trợ việc routing trong ứng dụng ReactJS. Ta có thể cài đặt thư viện này thông qua npm hoặc yarn.
```
npm install --save react-router-dom
```

Và sau đó bạn có thể import thư viện để sử dụng trong các components của mình
```
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
```

```
  <Router>
    <div>
        <ul>
            <li> <Link to=”/” > Home </Link> </li>
            <li> <Link to=”/products” > Products </Link> </li>
        </ul>
      <Route path="/" exact component={Index} />
      <Route path="/products" component={Products} />
    </div>
  </Router>
```
### Router
Cốt lõi của React Router là component Router(Browser Router). Mỗi Router sẽ sử dụng HTML5 history API (pushState, replaceState và popstate event) để giữ giao diện UI đồng bộ với URL. Các thuộc tính của Router bao gồm 
* basename: tương tự namespace.
* getUserConfirmation(function): Gọi phương thức xác nhận điều hướng, mặc định sẽ là window.confirm.
* forceRefresh(boolean): nếu true Router sẽ refresh trang được điều hướng.
* KeyLength: độ dài của location.key, mặc định là 6.

```
<Router
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App/>
</Router>
```

### Route
Mỗi route sẽ được xác đinh bởi một Route Component và chúng ta sẽ truyền vào các thuộc tính cho router này bao gồm:

* path: đường dẫn
* component: chỉ định component sẽ hiển thị khi url path được gọi đến
```
<Route path="/products/:productName" exact component={Products} />
```
Ở đây thì ứng với từng từng path sẽ có các component tương ứng và component đó sẽ được hiển thị nếu path match với url. thuộc tính exact yêu cầu đường dẫn chính xác. ':productName' chính là parameter của url. Nếu url match thì 1 object match sẽ được tạo ra, object này có những thuộc tính sau
```
{"path": "/products/:productName", url: "/products/laptop", "isExact": true,"params": {"productName": "laptop"}}
```

Ta cần chú ý đến thuộc tính params, thuộc tính params là một object chứa các các param đã được xác định trong Route.

### Link
Khi tạo các kiên kết routes ta phải sử dụng <Link to=””> thay vì dùng <a href””>`

```
<Link to=”/” > Home </Link>
```

## Lời kết
Trên đây mình đã giới thiệu React Router thông qua thư viện react-router-dom, hi vọng bài viết này hữu ích cho các bạn đang trên con đường chinh phục ReactJS.