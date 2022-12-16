## 1. Khái niệm React Router
React Router là một thư viện điều hướng tiêu chuẩn trong React. Nó giúp cho UI được đồng bộ với URL. Nó có API đơn giản nhưng mạnh mẽ, có thể giúp giải quyết được rất nhiều vấn đề.
## 2. Cài đặt
React Router được chia ra làm nhiều package nhỏ như sau:
```
react-router :  chứa những core functions/components của React Router và không cần phải cài đặt
react-router-dom : thư viện được dùng cho Web
react-router-native : thư viện được dùng cho Web
```
Bạn có thể lên trang chủ của React Router tại đây: https://reacttraining.com/react-router/

Ở đây mình dùng xây dựng website nên sẽ dùng package *react-router-dom*. Chạy lệnh

- Đối với npm
```
npm install --save react-router-dom
```
* Đối với yarn
```
yarn add react-router-dom
```
## 3. React Router Basics

```php
<Router>
  <Route exact path="/" component={Home}/>
  <Route path="/category" component={Category}/>
  <Route path="/login" component={Login}/>
  <Route path="/products" component={Products}/>
</Router>
```
### 3.1. Router
Để thiết lập bộ định tuyến ta có 2 loại:

* ***<BrowserRouter>*** : Được sử dụng phổ biến vì nó sử dụng History API có trong HTML5 để theo dõi lịch sử bộ định tuyến.
* ***<HashRouter>*** : Sử dụng *hash* của *URL (window.location.hash)* để ghi nhớ mọi thứ.

 Bọc component ***<App>*** bên trong component ***<BrowserRouter>*** .
```php
// index.js
    
import { BrowserRouter as Router} from 'react-router-dom';  // 'react-router-dom': thư viện để sử dụng API

ReactDOM.render(
    <Router>
        <App />
    </Router>
    , document.getElementById('root'));
```
    
   ***Lưu ý***: Một thành phần bộ định tuyến chỉ có thể có một phần tử con duy nhất. Phần tử con có thể là một phần tử HTM (như thẻ div hoặc 1 react component)
 
### 3.2. history
 - Là một thư viện JavaScript cho phép dễ dàng quản lý lịch sử phiên làm việc ở bất cứ nơi nào JavaScript chạy. 
- Cung cấp một API tối thiểu cho phép quản lý ngăn xếp của lịch sử, điều hướng, xác nhận điều hướng và trạng thái tồn tại giữa các phiên -[ React Training docs](https://github.com/ReactTraining/history)

Mỗi thành phần của bộ định tuyến tạo ra một đối tượng history theo dõi vị trí hiện tại (`history.location`) và các vị trí trước đó trong một stack. Khi vị trí hiện tại thay đổi, trang sẽ được điều hướng. Vậy làm thế nào để thay đổi vị trí hiện tại? 
    
Đối tượng history có các phương thức như `history.push() `và `history.replace()` để xử lý vấn đề đó
*   ***history.push()*** : được gọi khi click **<Link>** component
* ***history.replace()*** : được gọi khi sử dụng **<Redirect>**
### 3.3. <Route>
 - là thành phần chính của React Router
- Nó render một cái component theo pathname của location hiện tại
- Mỗi một component <Route> đều yêu cầu 1 prop `path` để định nghĩa đường dẫn mà component đó trỏ đến.

- Ví dụ
    ```php
    import { Route } from 'react-router-dom';
    
   <Route path="/" exact component={Home} /> // trỏ đến trang Home
   <Route path="/category" component={Category} />  // trỏ đến trang Category
    
Ở đây` / `match với cả `/` và` /category`. Do đó, cả hai route đều khớp và render ra nội dung bên trong của cả 2 component `Home` và `Category`. Vậy làm thế nào để tránh điều đó? 
    
Chúng ta sẽ truyền thêm props `exact` cho router có `path="/"` để có thể biết được chính xác nên render ra component nào.
    
### 3.4. <Link> và <NavLink>
###    Link
  
   -  Tương đương như thẻ <a> dùng để chuyển hướng 
```php
 import { Link } from 'react-router-dom';
    
<Link to="/category">Category</Link>
```
*    ***to*** : Giống như thuộc tính `href` trong thẻ <a>.

### NavLink

*   GIống như thẻ <Link> nhưng được hỗ trợ thêm vài thuộc tính như ****activeClassName**** khi nó trùng khớp thì nó sẽ được active, ***activeStyle*** có thể thêm style cho nó
```php
 import { Link } from 'react-router-dom';
    
<NavLink className="nav-link" activeClassName="active" exact  to="/category">Category</NavLink>
```
 Nếu muốn hiểu thêm cách sử dụng của 2 thằng này, mọi người có thể tham khảo bài [Using the Link and NavLink Components to Navigate to a Route](https://www.codementor.io/packt/using-the-link-and-navlink-components-to-navigate-to-a-route-rieqipp42)
## 4. Nested Routing
   Để tạo các router lồng nhau, chúng ta cần hiểu rõ hơn về cách hoạt động của `<Route>`.
   
   Routes sẽ có 3 props để định nghĩa việc chúng ta sẽ render cái gì, và chỉ duy nhất 1 prop path được phép truyền vào <Route> component.
    
*    ***component***  : Truyền vào React Component. Khi đường dẫn trên trình duyệt đúng với `prop path` nó sẽ render ra Component này.
*    ***render*** : Truyền vào một function, function này sẽ trả về React Component. Nó cũng sẽ được gọi khi trỏ đúng đường dẫn. Cái này tương tự như prop nhưng tiện hơn khi cần render một cái component theo dạng inline. Hoặc khi cần pass thêm những props khác.
*   ***children*** : Cũng là một function trả về một React Component. Nhưng không giống 2 cái trên, Component bên trong props này sẽ luôn luôn được render, mặc cho có đúng đường dẫn dẫn hay không.

```php
<Route path='/page' component={Page} />
const extraProps = { color: 'red' };
<Route path='/page' render={(props) => ( <Page {...props} data={extraProps}/> )}/>
<Route path='/page' children={(props) => ( 
    props.match
    ? <Page {...props}/>
    : <EmptyPage {...props}/>
)}/>
```
###  4.1. Path và match
###  path
 - Được sử dụng để xác định URL mà route phải match
- Nếu đường dẫn router và vị trí được match thành công, một object được tạo, gọi là đối tượng `match`

### match
 - Mang nhiều thông tin về URL và đường dẫn. Thông tin này có thể truy cập thông qua các thuộc tính của nó

   `match.url `: trả về phần trùng khớp của url. Hữu ích trong `<Link>` lồng
  
    `match.path` : được định nghĩa trong route, 
  
    `match.isExact `: kiểm tra xem có khớp không nếu gắn thêm prop exact vào.
  
    `match.params` : object chứa những giá trị từ pathname được bắt bởi thư viện path-to-regexp.
    
### 4.2. Switch Component
   - Nhóm các router lại với nhau
- Nó lặp qua các phần tử con (routes) và chỉ render đầu tiên phù hợp với tên đường dẫn hiện tại. 

```php
     import { Switch } from 'react-router-dom';
    
    <Route exact path="/" component={Home}/>
    <Route path="/products" component={Products}/>
    <Route path="/category" component={Category}/>
    <Route path="/:id" render = {()=> (<p> I want this text to show up for all routes other than '/', '/products' and '/category' </p>)}/>
```
 Nếu URL là `/products`, tất cả các routes match với location `/products` đều được render ra. Vì vậy, `<Route>` với path `:id` sẽ lấy ra từng sản phẩm mà chúng ta muốn xem. Đây là thiết kế. Tuy nhiên, nếu đây không phải là điều mà bạn mong đợi, bạn nên thêm thành phần `<Switch> `vào các routes . Với `<Switch>`, chỉ `<Route>` đầu tiên match mới đươc hiển thị.
###  4.3. Ví dụ về nested routing
###  src/App.js
```php
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Category from './Category';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            <li><Link to="/">Homes</Link></li>
            <li><Link to="/category">Category</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
       </nav>

        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/category" component={Category}/>
          <Route path="/products" component={Products}/>
        </Switch>
    </div>
    );
  }
}
export default App;

```
###  src/Category.jsx
```php
import React from 'react';
import { Link, Route } from 'react-router-dom';

const Category = ({ match }) => {
    return ( 
        <div> 
            <ul>
                <li><Link to={`${match.url}/shoes`}>Shoes</Link></li>
                <li><Link to={`${match.url}/boots`}>Boots</Link></li>
                <li><Link to={`${match.url}/footwear`}>Footwear</Link></li>
            </ul>
            <Route path={`${match.path}/:name`} render= {({match}) =>( <div> <h3> {match.params.name} </h3></div>)}/>
        </div>
    )
}
            
export default Category;
```
 Đầu tiên, chúng ta có 1 vài các nested routes (ở đây là category và products). Như đã đề cập trước đây,` match.url `sẽ được sử dụng để xây dựng các liên kết lồng nhau và `match.path` được định nghĩa trong route. Bạn có thể `console.log(match) ` để xem đầy đủ thông tin.
```php
<Route path={`${match.path}/:name`}
  render= {({match}) =>( <div> <h3> {match.params.name} </h3></div>)}/>
```
Ở đây để có thể lấy được thông tin của từng category thông qua tên của category đó, ta sẽ thêm params (`:name`) vào sau `category/`.
Vì vậy, một đường dẫn có pathname *category/shoes* sẽ tạo ra một đối tượng params như sau:
```php
{
  name: 'shoes'
}
```
Nó sẽ được bắt và lưu trữ trong `match.params` trong `props.match.params` phụ thuộc vào cách truyền props
## 5. prompt
    
*    Xác nhận trước khi chuyển trang

 Giả sử bạn đang nhập nội dung form và không may ấn phải nút back hay click phải trang khác khiến dữ liệu vừa nhập bị mất hết. Và prompt sinh ra để khác phục điều đó
```php
import {Prompt} from 'react-router-dom';

<Prompt 
    when={true} // true | false
    message={ (location) => (`Bạn có chắc muốn đến ${location.pathname} không?`) }
/>
```
##  6. Redirect
*   Dùng để chuyển trang.
*   Có thể truy xuất thông tin trang trước đó thông qua đối tượng `location`.

    Nếu muốn sử dụng `location` ta cần truyền thêm đối tượng `location` vào component mà cần sử dụng đối tượng `location` đó
```php
 <Route path="/login" component={({location}) => <Login location={location} />} />
```
**Nguồn tham khảo**
     
   https://www.sitepoint.com/react-router-v4-complete-guide/
  
  https://viblo.asia/p/co-ban-ve-router-trong-reactjs-07LKXzAElV4
     
https://medium.com/@khaiphan/react-router-v4-2df49046ed63