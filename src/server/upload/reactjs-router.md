Xin chào tất cả các bạn, bài viết này mình xin chia sẻ một chút kiến thức mình tìm hiểu được về Router trong ReactJs. Vậy nên hôm nay mình xin giới thiệu một thư viện hỗ trợ công việc này đó là: `react-router` va trang chủ: [tại đây.](https://reactrouter.com/web/example/basic)
`Reat Router` cho phép chúng ta có thể tùy biến URL trong một dự án ReactJS.

#### Cài đặt Reactjs
Nếu bạn nào cài đặt rồi thì có thể bỏ qua phần này. Khi bạn cài đặt xong thì bạn vào thư mục vừa cài và chạy lệnh cuối để chạy project
```
npx create-react-app my-app
cd my-app
npm start or yarn start
```

![](https://images.viblo.asia/b230f107-d9b3-4ff2-bdeb-e7720ed3a190.png)


Cài đặt rất đơn giản đúng không, chỉ vài câu lệnh là chúng ta đã xong.Ok, bây giờ chúng ta cùng đi vào phần chính này là tìm hiểu về `react-router`

#### Cài đặt React Router
Bạn chạy câu lệnh phia dưới để install
```
npm i react-router-dom
or 
yarn add react-router-dom
```
Chúng ta đợi command line chạy xong là install thành công
#### Các thành phần của React Router
Có ba loại thành phần chính trong `React Router`:
* routers: gồm `<BrowserRouter>` và `<HashRouter>`
* route matchers: gồm `<Route>` và `<Switch>`
* navigation: gồm `<Link`>, `<NavLink>`, và `<Redirect>`

Tất cả các thành phần trên phải được import từ `react-router-dom`.
Các bạn vào trang chủ để đọc thêm về các thành phần trên [tại đây](https://reactrouter.com/web/guides/primary-components)

Bây giờ các bạn mở folder code mà vuằ chúng ta cài đặt lên và mình sẽ huớng dẫn các bạn cách sử dụng `react-router`

#### Sử dụng react-router trong reactjs

**Step 1: Tạo file App.js**

Trong thư mục `src`, chúng ta mở file App.js lên và copy đoạn code này vào
```javascript
// App.js

import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
        <div>
          <h2>Hello React Router</h2>
        </div>
    );
  }
}

export default App;
```
Bây giờ,mở file index.js các bạn xoá code cũ đi và copy đoạn code này vào. ở đây mình dùng `BrowserRouter`
```javascript
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ReactDOM from 'react-dom';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
```

**Step 2: Tạo các component**
Đầu tiên,bạn tạo một folder là `components` nằm trong `src` và trong folder `components` bạn tạo 1 file là `Home.js` và copy đoạn code này vào
```javascript
// Home.js

import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
        <div>
          <h2>Home</h2>
        </div>
    );
  }
}

export default Home;
```
Tiếp theo, bạn tạo tiếp một file`About.js` cũng nằm trong folder `components`
```javascript
// About.js

import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
        <div>
          <h2>About</h2>
        </div>
    );
  }
}

export default About;
```
Các bạn tạo tiếp cho mình 1 file nữa là `Contact.js`
```javascript
// Contact.js

import React, { Component } from 'react';

class Contact extends Component {
  render() {
    return (
        <div>
          <h2>Contact</h2>
        </div>
    );
  }
}

export default Contact;
```

**Step 3: Đăng ký các routes trong tệp App.js.**

Bây giờ file App.js của chúng ta sẽ như này
```javascript
// App.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <h2>Hello React Router</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to='/' className="nav-link"> Home </Link></li>
            <li><Link to='/contact' className="nav-link">Contact</Link></li>
            <li><Link to='/about' className="nav-link">About</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/contact' component={Contact} />
              <Route path='/about' component={About} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
```

Ok như vậy là đã xong, bây giờ bạn chạy `npm start or yarn star`t để xem kết quả nhé :heart_eyes::heart_eyes::heart_eyes:

Đây là https://github.com/khanh2205/react-route-demo/tree/master repository của mình, nếu bạn nào bị lỗi có thể xem lại ở đây

Hẹn các bạn ở những bài viết khác. Cảm ơn các bạn đã đọc