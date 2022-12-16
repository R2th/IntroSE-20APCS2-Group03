Hi anh em,

Hôm nay chúng ta sẽ cùng nhau tìm hiểu cách routing trong reactjs qua thư viện **react-router-dom**. Hy vọng được thảo luận cùng anh em đang học reactjs. Không để mọi người chờ lâu, bắt đầu nào!

**Tại sao phải cần tìm hiểu về routing?**

Khi chúng ta truy cập 1 trang web. Nhập đường dẫn url sẽ load(render) ra các trang(Component) tương tứng. Để làm được điều này ta cần quản lý routing trong ứng dụng web của chúng ta.

Trong reactjs ta có thể dùng thư viện react-router-dom để làm việc này

Để cài đặt ta sử dụng lệnh:

`
npm i react-router-dom`

(Tham khảo: https://www.npmjs.com/package/react-router-dom)

**Các component trong react-router-dom**

### 1. Router:
Component bao bọc tất cả component khác của routing. Có rất nhiều loại router:

- **<BrowserRouter>** được dùng nhiều nhất. Ở bài này ta sẽ tập trung chủ yếu vào BrowserRouter.

**Note:** Bắt buộc phải có **<BrowserRouter>** bao bọc tất cả component, nếu không có sẽ xảy ra lỗi.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import './index.css';
import store from './app/store';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

- **<HashRouter>** là loại routing có dấu #

> https://developer.mozilla.org/en-US/docs/Web/API/URL#properties

- **<MemoryRouter>** giữ lịch sử của URL của bạn trong bộ nhớ. Thường sử dụng cho mục đích testing.

- **<StaticRouter>** được sử dụng cho server-side rendering.

### 2. Route:
Component này dùng để render component nếu đường dẫn url trùng với path props của Route component.

```js
</Route>
      <Route path="/blog">
        <BlogPost />
</Route>
```
### 3. Switch :

Gom nhóm các route và đảm bảo tại 1 thời điểm chỉ render duy nhất 1 component đầu tiên có url hiện tại trùng với path props của Route.
```js
 <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/blog">
        <BlogPost />
      </Route>
 </Switch>
```
### 4. Redirect:
Để chuyển hướng từ đường dẫn (path) này sang đường dẫn(path) khác.

```js
<Route exact path="/">
  {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
</Route>
```
### 5. Link:
Tương tự như thẻ a, giúp đi tới 1 đường dẫn nào đó

```js
<BrowserRouter basename="/calendar">
    <Link to="/today"/> // renders <a href="/calendar/today">
    <Link to="/tomorrow"/> // renders <a href="/calendar/tomorrow">
    ...
</BrowserRouter>
```
### 6. NavLink:
Là 1 phiên bản đặc biệt của component Link. Tương tự như Link nhưng ta có thể thêm thuộc tính giao diện cho từng element khi nó khớp với đường dẫn.

Ví dụ khi ta dùng NavLink làm menu. Khi click vào FAQs thì FAQs sẽ có được style css để biết là menu đó đang active

```
<NavLink to="/faq" activeClassName="selected">
  FAQs
</NavLink>
```
### 7. Thực hành routing   
Bác Hồ đã dạy: **Học với hành phải đi đôi. Học mà không hành thì vô ích. Hành mà không học thì hành không trôi chảy**

Vậy nên sau khi đi qua các component của **react-react-dom** ta sẽ ứng dụng vào 1 số bài toán cụ thể^^
    
    
 Source code github: https://github.com/TechMarDay/F8_Reactjs/tree/master/routing-reactjs
    

- **Dùng create-react-app để tạo mới 1 ứng dụng**
```js
npx create-react-app routing-reactjs
cd routing-reactjs
npm start
```
- **Cài đặt thư viện react-router-dom**
    
`npm i react-router-dom`
    
- Thêm **<BrowserRouter>** để bao bọc toàn bộ component của ứng dụng. Nếu không dùng <BrowserRouter> để bọc phía ngoài sẽ xảy ra lỗi
    
```js
//File src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
```

### **Bài toán 1:**
    
(sử dụng NavLink để tạo menu)

Ta có có 2 components Blog va Course. Yêu cầu tạo menu gồm 2 phần tử tương ứng để render đúng 2 component blog và course
![image.png](https://images.viblo.asia/1aea6417-2a4e-45ef-a31c-42b885f60fbd.png)
Tạo 2 components Blog và Course

    //src/components/Courses/index.jsx
```js
import React from 'react';

function Courses() {
  return (
    <p>
        Routing tới trang danh sách khóa học
    </p>
  );
}

export default Courses;
```
    
//src/components/Courses/Blog.jsx

```js
import React from 'react';

function Blog() {
  return (
    <p>
        Routing tới trang blogs
    </p>
  );
}

export default Blog;
```


//src/App.js

```js
import './App.css';
import {Route, Link, NavLink} from 'react-router-dom';
import Courses from './components/Courses';
import Blog from './components/Blog';

function App() {
  return (
    <div className='app'>
      {/* header */}
       <div className='header'>
          <h3>Menu (Dùng NavLink để tạo menu)</h3>
          <ul className='menu'>
              <li>
                <NavLink to="/Courses" activeClassName='active'>Danh sách khóa học</NavLink>
              </li>
              <li>
               <NavLink to="/blog" activeClassName='active'>Blog</NavLink>
              </li>
           </ul>
          <hr/>
       </div>
       {/* Content */}
       <h3>Content</h3>
          <div className='content'>
          <Route path="/courses" component={Courses} />
          <Route path="/blog" component={Blog} />
        </div>
        <hr/>
        {/* Footer */}
        <div className='footer'>
            <h3>Footer</h3>
        </div>
    
    </div>
  );
}

export default App;
```

Đầu tiên mình sẽ nhắc lại kiến thức ở mục 5-Link và mục 6-NavLink. Cả 2 thẻ này mục đích giống nhau đều tạo ra 1 link (tương tự thẻ a trong html) nhưng NavLink sẽ có thể thiết lập style css cho các item đã active(đang được click vào)

Như ở ví dụ trên khi ta click vào “Danh sách khóa học” sẽ có style css nhờ ta đã set attribute activeClassName=“active” trong thẻ NavLink và định nghĩa css cho class .active.

```css
.active{
  background-color: seagreen;
  color: #fff;
  text-decoration: none;
}
```
**Note:** Mặc định class name của NavLink nếu ta không set attribute là active. Ta có thể đổi tên class name tùy vào ngữ cảnh. ví dụ activeClassName=“active-top-menu”

![image.png](https://images.viblo.asia/590597ad-f449-4f8e-a716-37c67fd9257c.png)

### **Bài toán 2:**
    
Tại 1 thời điểm ta chỉ cho phép render 1 component nếu đường dẫn phù hợp với props path trong component route.

**Vấn đề:** nếu ta sử dụng Route cho nhiều component trùng nhau thì sẽ render ra các component bị lắp

ví dụ:
 ```js
          <Route path="/courses" component={Courses} />
          <Route path="/courses" component={Courses} />
          <Route path="/courses" component={Courses} />
          <Route path="/blog" component={Blog} />
```
    
    
Khi ta truy cập vào url: http://localhost:3000/Courses kết quả sẽ là 
    ![image.png](https://images.viblo.asia/3ff23380-2456-499c-9476-e20b67c28415.png)

**Mong muốn:** tại 1 thời điểm chỉ render 1 component duy nhất và đầu tiên match với đường dẫn url.

**Giải quyết:** sử dụng **Switch** để giải quyết vấn đề trên.

```js
import './App.css';
import {Route, Link, NavLink, Switch} from 'react-router-dom';
import Courses from './components/Courses';
import Blog from './components/Blog';

function App() {
  return (
    <div className='app'>
      {/* header */}
       <div className='header'>
          <h3>Menu (Dùng NavLink để tạo menu)</h3>
          <ul className='menu'>
              <li>
                <NavLink to="/Courses" activeClassName='active'>Danh sách khóa học</NavLink>
              </li>
              <li>
               <NavLink to="/blog" activeClassName='active'>Blog</NavLink>
              </li>
           </ul>
          <hr/>
       </div>
       {/* Content */}
       <h3>Content</h3>
          <div className='content'>
            <Switch>
              <Route path="/courses" component={Courses} />
              <Route path="/courses" component={Courses} />
              <Route path="/courses" component={Courses} />
              <Route path="/blog" component={Blog} />
            </Switch>
        </div>
        <hr/>
        {/* Footer */}
        <div className='footer'>
            <h3>Footer</h3>
        </div>
    
    </div>
  );
}

export default App;
```


    
Kết quả:

![image.png](https://images.viblo.asia/6b5ff377-9747-4217-a89f-bc0cb6d51b3b.png)

**Tổng kết:**
Qua bài này chúng ta đã cùng nhau tìm hiểu cơ bản về thử viện **react-router-dom** trong reactjs, thực hành về NavLink và Switch. Nếu có câu hỏi hay vấn đề muốn thảo luận trao đổi thì hãy comment dưới bài viết nhé. Hy vọng được thảo luận cùng anh em.

Nếu thấy bài viết hay và bổ ích thì cho mình xin 1 tym nhé. Cảm ơn và chúc các anh em một ngày cuối tuần tuyệt vời!

**Tham khảo:**

https://reactrouter.com/web/api/Route

https://wanago.io/2021/04/19/hashrouter-browserrouter-react/