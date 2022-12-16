# React-Router
React-Router giúp chúng ta có thể điều hướng các website và xây dụng các single-page application (SPA)/
Tức là chỉ có 1 file HTML được gọi. Và khi người dùng nhập 1 đường dẫn mới, thay vì lấy dữ liệu từ server thì Router sẽ chuyển sang 1 component khác ứng với mỗi đường dẫn mới. Dễ hiểu là mỗi component đơn lẻ ứng với mỗi đường dẫn mới sẽ được render lại chứ không cần phải reload toàn bộ lại page.

# Package của React-Router
https://reacttraining.com/react-router/web/guides/philosophy

Cùng zô và tham khảo 1 chút về `eact router`nhé

![](https://images.viblo.asia/d58ff752-e214-4534-b8b0-849804e8dfe7.png)
React Router được chia làm 3 package nhỏ:
1. react-router-dom: sử dụng cho ứng dụng web
2. react-router-native: sử dụng cho ứng dụng mobile
3. react-router-core: sử dụng bất cử lúc nào với ứng dụng lõi
Vì vậy mình sẽ sử dụng react-router-dom để làm 1 website cho ứng dụng của mình ^^

# Cài đặt và cùng tìm hiểu
Sẽ dễ dàng hơn nếu lý thuyết đi cùng với thực hành phải không nào (mình luôn nghĩ vậy) vì vậy trước khi tìm hiểu mình sẽ tạo 1 react web application và cài đặt react-router-dom
1. `npx create-react-app demo-react-routers` // create react
2. `npm install react-router-dom` // install react-router dom

# Routers
Routers là cốt lõi cho mọi ứng dụng React Router.
Trong 1 dự án web, react-router-dom package sẽ cũng cấp cho bạn 2 thánh phần là `<BrowserRouter>` và `<HashRouter>`.

- `<BrowserRouter>` sẽ được sử dụng khi bạn có 1 máy chủ sử lý yêu cầu động.
    
- `<HashRouter>` sẽ được sử dụng cho các trang web tĩnh.

OK. vậy mình sẽ dùng `<BrowserRouter>` nhé. 

//index.js

![](https://images.viblo.asia/4ba3b1a2-c6ca-4d6a-8e23-19f4b7be7996.png) 

Vậy là <BrowserRouter> đã bao bọc ứng dựng <App> Component của mình nhằm giúp điều hướng các đường dẫn bên trong <App> Component.
    
#  Route Matching
Trước khi nói về Route Matching để cho các bạn có thể hiểu dễ dàng hơn và hiểu 1 cách đơn giản thì:
Routers các bạn cảm tưởng như 1 page to đùng to đoàng nó chứa các Route

Vậy các Route là j? 
Nó là các component khi người dùng thay đổi thì nó sẽ thay đổi url thì  các component tương ứng vs các route đó sẽ được load lên.

Có 2 Route Matching Component
- <Route>: được sử dụng khi bạn muốn render nội dụng trên location.
- <Switch>: được sử dụng để gộp các <Route> trên 1 Routers.

OK. Mình sẽ thực hiện ví dụ để mọi người dễ hiểu hơn chút nhé

1. Tạo 3 components đơn giản như sau:
   - cd src
   - mkdir components
   - cd components
   - touch Home.jsx NotFound.jsx Login.jsx
   - Add 3 nội dung vào 3 file tương ứng

     ```
     //Home.jsx
        import React from 'react'

        const Home = () => <div>This is Home Page</div>

        export default Home

        //Login.jsx
        import React from 'react'

        const Login = () => <div>This is Login Page</div>

        export default Login

        //NotFound.jsx
        import React from 'react'

        const NotFound = () => <div>This is Not Found Page</div>

        export default NotFound
   
     ```
  2. Ok. Giờ phần còn lại chỉ việc thay đổi `App.js` để hiển thị cho đúng 
  
     ```
        import React, { Component } from 'react';
        import { Route, Switch } from 'react-router-dom'
        import Home from './components/Home'
        import Login from './components/Login'
        import NotFound from './components/NotFound'

        class App extends Component {
          render() {
            return (
              <div>
                <Route path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='' component={NotFound} />
              </div>
            );
          }
        }

        export default App;
     ```
   3. Chạy yarn start và xem thành quả nào????
      ```
      //path http://localhost:3000/
      This is Home Page
      This is Not Found Page
      ```
      Khi path là root thì cả path='/' và path='' đều được load lên.
      Vậy tôi chỉ muốn trong số Route chỉ được load lên 1 component thì buộc tôi phải dùng <Switch> (switch ở đây cũng giống như bạn dùng ở js, ruby hay bất cứ ngôn ngữ lập trinh nào)
    `Path` sẽ được so sánh từ trên xuống dưới. Nếu thỏa mãn nó sẽ return và load lên component
      ```
      <Switch>
        <Route path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='' component={NotFound} />
      </Switch>
      ```
    
       Và kết quả sẽ trả ra đúng  như ta mong đợi `This is Home Page`
       
       *Giải thích*: 
       * path: đường dẫn route
       * component: render khi location đc matches với path.
       Note: 
       Route có 3 cách để hiển thị component tương ứng với path.
          - `component` sử dụng React.createElement để tạo 1 React element từ component truyền vào ex: `component={Home}`
          - `render` là 1 function trả về 1 phần tử React. Vì là 1 function nên bạn có thể truyền các tham sô props vào component
          
          ex:
            ```
            // App.js
            const name = 'Minh'
            <Route path='/login' render={(props) => (
              <Login {...props} data={name}/>
            )}/>
            
            //Login.jsx
            const Home = () => <div>This is {name}'s Home Page</div>
            
            //display
            This is Minh's Home Page
            ```
          - `children` cũng là 1 function trả về 1 phần tử React. Nhưng nó có thể check điều kiện với tham số truyền vào. If else để có thể render ra được component phù hợp
          
          ex:
          ```
          <Route path='' exact children={(props) => (
            props.match ? <NotFound /> : <Home />
          )} />
          ```
          
          Với `component` và `render` thì `component` sẽ được ưu tiên sử dụng nhiều hơn và không được sử dụng 2 loại trong cùng 1 <Route>
  4. Các bạn có thể đọc các Api và các props của nó trên trang chủ của nó https://reacttraining.com/react-router/web/api/
  
      Trong nội dung bài viết mình cũng không thể đề cập đến các props cũng như chức năng của từng cái 1 (vì nó khá dài cũng nhưng mình cũng chưa thể tìm hiểu hết được nhưng mình sẽ cố gắng đưa nhưng cơ ban nhất đến mọi người)
  5. VD ở trong `<Route />`  có 1 props là `exac` cần lưu ý và rất cần thiết
  các bạn thử thay đổi đường path như thế này xem sao?
      ```
      <Route path='/a/b/c' component={Login} />
      <Route path='/a/b' component={NotFound} />
      ```
      OK giờ check kết quả với đường path là:
      ```
      http://localhost:3000/a/b
      This is Login Page
      ```
      Rõ ràng là phải NotFound chứ nhỉ. sao lại là Login
      Vì khi check điều kiện với đường path /a/b thì thằng Login với đường path là '/a/b/c' cũng có nên nó sẽ return thằng Login chứ không phải thằng NotFound ở dưới. vì vậy chúng ta cần `exact` để so sánh tuyệt đối.
  
      `<Route path='/a/b/c' exact component={Login} />`
  
      Và giờ kết quả đã trả về đúng như ta mong đợi
# Link
   Tạo 1 link để điểu hướng các route.
   ```
   import { Link } from 'react-router-dom'
   
   <a href="/">HTML Links</a>
   <Link to="/">Home</Link>
   <Link to="/login">Login</Link>
   <Link to="About">About</Link>
   ```
   
   Rõ ràng khi click vào <a> tag thì page sẽ load lại. Vì vậy Router cung cấp cho chúng ta 1 thành phần là <Link> giúp chúng ta điều hướng route mà không làm reload lại trang
# Chỉnh sửa HTML Và Refactor Code ^^
  OK phần này thì không liên quan j tới react-router cho lắm. Nhưng add bootsrtrap zô cho dễ nhìn hơn 1 chút nhé

1. add bootstrapCDN vào index.html flie

    css: 
    `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">`

    js:
    `<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>`

2. Tạo Menu
   - Tạo file Menu.jsx trong thư mục components
   - thêm nội dung cho file
     ```
        import React from 'react';
        import {Route, Link} from 'react-router-dom';

        // định nghĩa menu
        const menus = [
          { name: "Home", to: "/" },
          { name: "Login", to: "/login" }
        ]
        
        // sử dụng Route để láy tham số match và sư dụng children để add class active của bootstrap
        // match là tham số của route kiểm tra xem path có match với URL hay không
        const MenuLink = ({label, to}) =>{
          return (
            <Route
              path={to} exact children={({match})=>{
                let active = match ? 'nav-item active' : 'nav-item';
                return (
                  <li className={active}>
                    <Link to={to} className="nav-link">{label}</Link>
                  </li>
                )
              }}
            />
          )
        }

        const showMenu = (menus) => {
          let result = null;
          if(menus.length > 0){
            result = menus.map((menu, index) => {
              return <MenuLink key={index} label={menu.name} to={menu.to} />
            })
          }
          return result;
        }

        const Menu = () => (
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse"  id="navbarNav">
              <ul className="navbar-nav">
                {showMenu(menus)}
              </ul>
            </div>
          </nav>
        )

        export default Menu;
        ```

   - Tạo file routes.js để quản lý các Routes
   - thêm nội dung cho file
     ```
     import React from 'react';
     import Home from './components/Home';
     import About from './components/About';
     import NotFound from './components/NotFound';
     import Login from './components/Login';

     const routes = [
       {
         path: '/',
         exact: true,
         main : () => <Home />
       },
       {
         path: '/login',
         exact: false,
         main: ({location}) => <Login location={location} />
       },
       {
         path: '',
         exact: false,
         main : () => <NotFound />
       }
     ]
 
     export default routes;
     ```
    - Chỉnh sửa lại file Login.jsx
      ```
        import React from 'react'

        const Login = ({name}) => (
          <div className="d-flex justify-content-center">
            <div className="w-50 p-3">
              <h1>This is Login Page</h1>
              <form>
                <legend>Login</legend>
                <div className="form-group">
                  <label>User Name</label>
                  <input type="text" className="form-control" id="userName"
                   placeholder="User Name" name="txtUserName" />
                </div>
                <div className="form-group">
                  <label>PassWord</label>
                  <input type="password" className="form-control" id="passWord"
                   placeholder="Input field" name="txtPassWord" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        )

        export default Login

      ```
  OK. Cơ bản là vậy đã. Hơi dài dòng cơ mà. Còn rất nhiều cái hay về sau nữa. Nên mình cứ làm cẩn thận và đẹp đẽ trước đã,
    
# Kết Luận
Bài này mình kết thúc ở đây. Bài sau mình sẽ để cập đến Login từ đó sẽ dẫn dắt và giới thiệu về Prompt, Redirect, StaticRouter, location, history,.. trong React-Router.