![](https://images.viblo.asia/46bd1876-0358-4999-8fa9-fad4213b462e.png)

React Router làm thư viện phổ biến nhất dùng để thực hiện định tuyến cho ứng dụng React. Nó được phát hành vào tháng 5 năm 2014, sau đó được phát triển thử nghiệm và release theo các phiên bản React.

Ngược lại, các version của bộ định tuyến Router Reach được phát hành vào tháng 5 năm 2018. Reach Router được tạo ra bởi một trong những nhà phát triển chính của React Router, Ryan Florence, người đã học được tất cả các bài học từ việc phát triển React Router và thực hiện nó ở trên Reach Router.

Ở trong bài viết này, tôi sẽ giúp các bạn chọn lựa giữa 2 bộ thư viện này bằng cách xem mã hoạt động của nó như thế nào, cũng như API mà cả 2 thư viện cung cấp, triển khai vào ứng dụng của mình.

## **Cấu trúc route và trật tự**

Trong React Router, <BrowserRouter> component đóng vai trò cốt lõi trong ứng dụng của bạn. Component này sẽ chịu trách nhiệm giữ cho UI của bạn đồng bộ hóa với Url
    
```js
import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;
const Reports = () => <h1>Reports</h1>;
const App = () => (
 <div>
   <h1>Select your route</h1>
   <BrowserRouter>
     {/* code omitted for brevity.. */}
    </BrowserRouter>
  </div>
)
```
    
Để thay đổi route ứng dụng của bạn, bạn cần sử dụng component <Link>, nó sẽ chịu trách nhiệm cập nhật route hiện tại theo props của nó
    
```html
const App = () => (
  <div>
     <h1>Select your route</h1>
     <BrowserRouter>
       <ul>
         <li>
           <Link to="/">Home</Link>
         </li>
         <li>
           <Link to="/about">About</Link>
         </li>
         <li>
           <Link to="/reports">Reports</Link>
         </li>
       </ul>
       {/* code omitted for brevity.. */}
     </BrowserRouter>
   </div>
 )
```
    
Sau component <Link>, bạn sẽ cần đặt những route matching components vào ứng dụng của bạn để nó có thể render ra component tương ứng với route hiện tại.
    
React Router có nhiều route matching components, nhưng chỉ hai trong số chúng được sử dụng: ví dụ component <Switch> và <Route>
    
```html
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/reports" component={Reports} />
</Switch>
```
    
Component <Route> sẽ render ra các component props của nó nếu đường dẫn của các props khớp với url hiện tại. Tuy nhiên, <Route> component sẽ render ra component một cách trọn vẹn, có nghĩa là ứng dụng của bạn có thể render ra 2 Routes cùng lúc.
    
Ví dụ, url là `http://localhost/about` khớp với `/` và `/about`. Để ngăn chặn điều này, bạn cần sử dụng component <Switch>, sẽ chỉ render ra route đầu tiên khớp với url và bỏ qua các thành phần còn lại:
    
```html
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/reports" component={Reports} />
</Switch>
```
    
Nhưng điều này sẽ gây ra một vấn đề khác,
    
Vì url  http://localhost/about khớp với cả 2 đường dẫn là `/` và `/about`, nó sẽ render ra Home route và bỏ qua About route. Để sửa điều này, bạn cần truyền chính xác prop, làm cho Route component khớp 1 cách chính xác với url được chỉ định 
    
```html
<Route exact path="/" component={Home} />
```
    
Với prop `exact` được đặt ở trong, React Router sẽ hiển thị component chính xác theo url.
    
Bây giờ bạn đã hiểu được cách React Router hoạt động, và hãy xem với Reach Router trong cùng bối cảnh để hiểu xem nó hoạt động như thế nào nhé:
    
```js
import React from 'react';
import { Router, Link } from "@reach/router";

const Home = () => <h1>Home</h1>;

const About = () => <h1>About</h1>;

const Reports = () => <h1>Reports</h1>;

const App = () => (
	<div>
    <h1>Select your route</h1>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="about">About</Link>
      </li>
      <li>
        <Link to="reports">Reports</Link>
      </li>
    </ul>
    <Router>
      <Home path="/" />
      <About path="about" />
      <Reports path="reports" />
    </Router>
  </div>
)
export default App
```
    
Điều đầu tiên chúng ta nhận thấy trong Reach Router là chỉ cần import 2 thành phần thay vì 4 thành phần để thực hiện cùng 1 routing
    
Reach Router chỉ cần sử dụng <Router> và <Link> component. Bạn cũng sẽ không phải đặt component <Link> ở trong <Router>.
    
Thay vì sử dụng <Route>, bạn chỉ có thể chuyển component bạn muốn render vào trong thành phần con của <Router>. Đừng quên thêm props path để ứng dụng của bạn render ra nội dung tương ứng.
    
Ở trong Reach Router, không có API nào để bạn sắp xếp và ưu tiên các route của bạn như component <Switch>. Thay vì cho phép bạn tìm ra cách phù hợp để render ra các component của mình, Reach cung cấp hệ thống xếp smart path ranking để tối ưu route và render ra. Đó là lí do tại sao nó biết khi nào render ra component chính xác căn cứ trên url của bạn.
    
## **Rendering nested routes**
    
render ra các route lồng nhau sử dụng Reach Router dễ dàng hơn React Router. Hãy xem xét ví dụng về React Router:
    
```js
const Home = () => <h1>Home</h1>;

const About = () => <h1>About</h1>;

const Reports = () => (
  <>
    <h1>Reports</h1>
    <ul>
      <li>
        <Link to="/reports/invoice">Invoice</Link>
      </li>
      <li>
        <Link to="/reports/billing">Billing</Link>
      </li>
      <li>
        <Link to="/reports/101">101</Link>
      </li>
      <li>
        <Link to="/reports/201">201</Link>
      </li>
    </ul>
    <Switch>
      <Route path="/reports/invoice" component={Invoice} />
      <Route path="/reports/billing" component={Billing} />
      <Route path="/reports/:reportId" component={Report} />
    </Switch>
  </>
);

const Report = props => <h1>Report number: {props.match.params.reportId}</h1>;

const Invoice = () => <h1>Invoice</h1>;

const Billing = () => <h1>Billing</h1>;

export default (
	<div>
    <h1>Select your route</h1>
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/reports">Reports</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/reports" component={Reports} />
      </Switch>
    </BrowserRouter>
  </div>
)
```
    
Bạn sẽ thấy rằng trong React Router, bạn cần phải triển khai component <Switch> và <Route> cho <Reports> component với main route trong <App> component:
    
```js
// The route
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/reports" component={Reports} />
</Switch>
// The component
const Reports = () => (
  <>
    <h1>Reports</h1>
    <Switch>
      <Route path="/reports/invoice" component={Invoice} />
      <Route path="/reports/billing" component={Billing} />
      <Route path="/reports/:reportId" component={Report} />
    </Switch>
  </>
);
```
    
Với Reach Router, bạn có thể đặt các routes lồng nhau vào trong thành phần cha:
    
```
<Router>
      <Home path="/" />
      <About path="about" />
      <Reports path="reports">
        <Report path=":reportId" />
        <Billing path="billing" />
        <Invoice path="invoice" />
      </Reports>
    </Router>
```
    
Sau đó, bạn chỉ cần render các route bên trong component <Reports> bằng props.children:
    
```js
// The route
<Reports path="reports">
  <Report path=":reportId" />
  <Billing path="billing" />
  <Invoice path="invoice" />
</Reports>
// The component
const Reports = props => (
  <>
    <h1>Reports</h1>
    {props.children}
  </>
);
```
    
Bằng cách đặt tất cả các routes vào trong một cây document, bạn có thể xác định component nào có các routes lồng nhau khi nhìn vào nó. Điều đó không rõ ràng khi bạn sử dụng React Router.