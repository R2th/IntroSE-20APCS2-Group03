# 1. Giới thiệu 
Ngày nay việc sử dụng SPA (Single Page Application) đã khá phổ biến so hơn trước. So với các ứng dụng SSR(Server-Side Rendering) thì một trong những ưu điểm vượt trội hơn của SPA chính là khi chúng ta làm việc với **routing**.

Nếu như với SSR mỗi khi chúng ta chuyển trang thì trang web của chúng ta lại phải load trang, còn với SPA thì khác nó giúp ta khắc phục được điều này khi nó chỉ load một lần duy nhất.

**React** giúp chúng ta làm việc tốt với các ứng dụng SPA, nhưng làm sao để chúng ta có thể xử lý các vấn đề liên quan đến URL thì mình xin giới thiệu với các bạn một thư viện rất phổ biến mà hầu như ai cũng sử dụng đó chính là **React Router**.

![](https://images.viblo.asia/b3afff99-47e0-48a4-8b0d-ee6103197baf.png)

Để sử dụng được React Router thì chúng ta cần phải cài đặt thư viện `react-router-dom` này vào ứng dụng React trước.

`react-router-dom` được dùng để xử lý routing trong các ứng dụng web. Còn ai mà đang chuẩn bị học thêm về React Native thì thư viện để xử lý routing thì sẽ là `react-router-native` nhé các pạn.

Để bắt đầu, trước tiên chúng ta cùng cài đặt thư viện này vào project chúng ta với cú pháp
```bash
npm install --save react-router-dom

# hoặc

yarn add react-router-dom
```
# 2. Tìm hiểu thui
Coi như xong bước cài đặt đơn giản như đan rổ, bây giờ chúng ta đi tìm hiểu xem **React Router** có gì và làm được những gì ?

Có vài thành phần thường sử dụng nhất ở những dự án đó chính là : `BrowserRouter`, `Switch`, `Route`, `Link`.

Để sử dụng các thành phần này các bạn cần phải import vào trong code 
```javascript
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
```

## 2.1. Router Component
Trong React Router có 2 Router component đáng chú ý đó là 
* `BrowserRouter`
* `HashRouter`

Hai loại Router này có cấu trúc URL khác nhau
```javascript
<BrowserRouter>
// http://localhost:8000/home

<HashRouter>
// http://localhost:8000/#/home
```

Thêm một sự khác biệt nữa ở đây là đối với `BrowserRouter` thì nó sử dụng History API, các bạn có thể hiểu đơn  giản là nó giúp chúng ta sử dụng được lịch sử các đường dẫn mà bạn đã truy cập vào (`window.history`). Còn đối với `HashRouter` sử dụng `window.location.hash` 

## 2.2. BrowserRouter
Thành phần này thường nằm ngoài cùng, bao lấy các Route khác của ứng dụng.

Một `BrowserRouter` bao gồm các thuộc tính
```html
<BrowserRouter
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App />
</BrowserRouter>
```
Trong đó:
* `basename`: Nắm vai trò là base URL trong ứng dụng, kiểu như thế này

```html
<BrowserRouter basename="/product">
    <Link to="/id"/>  <!-- /product/today -->
    <Link to="/tomorrow"/>  <!-- /product/tomorrow -->
    ...
</BrowserRouter>
```
* `forceRefresh`: Giá trị của forceRefresh là kiểu boolean, nếu giá trị là true thì khi trang web chúng ta được điều hướng thì sẽ refresh lại.
* `getUserConfirmation`:  thuộc tính này để xác nhận điều hướng. Ví dụ trong những trường hợp bạn lỡ tay bấm link khác khi đang làm một công việc như nhập/sửa dữ liệu, thì thuộc tính này sẽ được sử dụng để đảm bảo chắc chắn rằng bạn có muốn chuyển trang hay không. 
* `keyLength`: độ dài của location.key được đặt mặc định là 6.

## 2.3. Route
Đây có lẽ là phần quan trọng nhất trong React Router mà chúng ta cần phải nắm được. Hiểu đơn giản nhất là tương ứng với một URL thì nó sẽ render ra một component tương ứng mà chúng ta định nghĩa.

Một Route được viết đơn giản nhất sẽ là như thế này
```html
<Route path="/">
   <Home />
</Route>
<Route path="/about">
   <About />
</Route>
```
hoặc là có thể viết như thế này
```html
<Route path="/" component={Home} />
<Route path="/about" component={About} />
```

Nghĩa là với đường dẫn là `/` thì sẽ render ra component là `Home`, `/about` thì sẽ render ra component `About`.

Với:
* `path`: đường dẫn ở trên URL
* `component`: component sẽ được render tương ứng với route đó.

![](https://images.viblo.asia/16be7a3a-9d78-43c5-b5a0-ecb81afa0c51.gif)

Tuy nhiên đối với đường dẫn là `/about` thì nó render ra cả component `Home` lẫn `About` vì với `path` này bắt đầu vào `path` là `/` nên component `Home` cũng được render ra. 

Để xử lí thì chúng ta sẽ sử dụng thêm thuộc tính là `exact` để `path` mà chúng ta định nghĩa mapping tuyệt đối với URL. Giá trị của `exact` là kiểu boolean, mặc định là false. Để xử lý trong trường hợp này thì chúng ta cần khai báo thêm thuộc tính này vào Route là được.
```html
<Route exact path="/" component={Home} />
```

![](https://images.viblo.asia/5ca4903f-fdaf-4fad-9756-65e9170c07c5.png)

Kết quả bị chuẩn luôn :rofl::rofl::rofl:

* `sensitive`:  Thuộc tính này dùng để phân biệt các kí tự hoa thường của path. Giá trị của `sensitive` là boolean. Nếu giá trị là true nó sẽ kiểm tra hoa thường.



|  path | location.pathname | sensitive | match? |
| -------- | -------- | -------- |------|
| /about     | /about | true     |yes|
|/About|/about|true|no|
|/About|/about|false|yes|
```html
<Route sensitive path="/about">
  <About />
</Route>
```

## 2.4. Link
`Link` ở trong React cũng tương tự như thẻ `a` trong HTML mà chúng ta thường dùng để điều hướng trang web, F12 trình duyệt lên thì khi render ra HTML thì `Link` cũng được biên dịch ra thẻ `a`. `Link` sẽ giúp chúng ta chuyển qua lại giữa các component mà không bị refresh lại trang web.

Cú pháp
```html
<Link to="/">Home</Link>
<Link to="/about">About</Link>
```
trong đó `to` tương ứng như `href` trong thẻ `a` bên HTML.

Ngoài ra chúng ta có thể truyền vào `to` một `object` hoặc một `function`. Nếu muốn truyền thêm `query` hay `hash` vào đường dẫn hãy truyền vào `to` một đối tượng bao gồm các thuộc tính
```html
<Link
   to={{
      pathname: '/about',
      search: '?sort=name',
      hash: '#hash',
   }}
>
   About
 </Link>
```
Đường dẫn tương ứng sẽ là `/about?sort=name#hash`.
## 2.5. NavLink
Tương tự với `Link` thì `NavLink` cũng có chức năng điều hướng tương tự thế nhưng `NavLink` có vẻ "cao cấp" hơn một chút khi có thêm các thuộc tính `activeStyle` và `activeClassName`.
* `activeClassName`: truyền vào giá trị là 1 string, nó sẽ tạo class mới giá trị truyền vào khi mà URL trùng khớp với giá trị `to` của `NavLink`. Mặc định class khi URL trùng với `to` là `active`.
* `activeStyle`: truyền vào là một object, để chúng ta css cho class khi chúng ta đang active 1 link.

```html
<NavLink
   exact
   to="/home"
   activeStyle={{
     fontWeight: "bold",
      color: "red",
   }}
 >
     Home
</NavLink>
```
Kết quả kiểu như thế này

![](https://images.viblo.asia/60beea44-2d12-4cf0-8827-5089dd9ed0c1.gif)

# 3. Kết luận
Bài viết nào rồi cũng có hồi kết, đây là những gì mà mình muốn nói trong bài viết lần này. Hy vọng mọi người sẽ enjoy nó =)).

Tài liệu tham khảo: https://reactrouter.com/web/guides/quick-start