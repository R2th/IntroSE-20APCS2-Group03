Trong những website thông thường khi điều hướng từ page này sang page khác, chúng ta sẽ sử dụng thẻ `<a>` để làm điều đó, nhưng trong React JS thường được sử dụng để xây dựng nhữmg Single Page Application (SPA) khi chúng ta làm như vậy thì sẽ reloading lại toàn bộ page từ server, điều đó là không hiệu quả đối với 1 SPA. Thực chất SPA chỉ có 1 html page, nhưng bao gồm nhiều page views (components), và sẽ load ra page view tương ứng dựa trên route chứa component đó.

Và như vậy khái niệm routing ra đời dung để điều hướng từ page này sang page khác trong SPA mà không cần refresh browser. Trong bài này chúng ta sẽ giới thiệu đến 1 thư viện routing phổ biến và mạnh mẽ đó là `React Router`

### Bắt đầu
Chúng ta cần tạo 1 React project dùng để demo sử dụng thư viện này
```
create-react-app react-router-demo
```

`React Router` là thư viện thứ 3 dùng để điều hướng trong React app, nó xây dựng trên browser history API dùng để render ra component UI đồng bộ với URL của browser, nó gồm 3 packages sau:

`react-router` 

`react-router-dom`

`react-router-native`

Mỗi package sẽ có 1 cách sử dụng khác nhau, `react-router` là thành phần core để sử dụng cho `react-router-dom` và `react-router-native`. `react-router-dom` sử dụng khi xây dựng web app; `react-router-native` dùng khi xây dựng React Native(mobile) app. Như vậy chúng ta sẽ sử dụng package `react-router-dom` trong bài viết này.

Add `react-router-dom` vào project:
```
npm install react-router-dom
```

Sau khi install xong thì chúng ta run app lên bằng command `npm start`, default là màn hình home http://localhost:3000/

Chúng ta sẽ tìm hiểu 3 thành phần chính của React router là `BrowserRouter`, `Route` và `Link`

`BrowserRouter`: dùng để wrap tất cả route component

`Route`: dùng để ẩn/hiện component (page) mà nó chứa

`Link`: generate các link để di chuyển tới page mà ta mong muốn

### BrowserRouter
Đây là một ví dụ đơn giản về `BrowserRouter`. Import nó từ `react-router-dom` và sử dụng nó để wrap tất cả app của bạn

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router>
      <div>
        <!-- -->
      </div>
  </Router>,
  document.getElementById('app')
)
```

`BrowserRouter` chỉ có thể chứa 1 child component, vì vậy ta có thể wrap trong 1 thẻ `div` hoặc  react fragment `<>`

### Route
Để tạo 1 route, import nó từ `react-router-dom`

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const Home = () => (
  <div>
    <h1>Home Component</h1>
  </div>
)

const About = () => (
  <div>
    <h1>About Component</h1>
  </div>
)

ReactDOM.render(
  <Router>
      <div>
            <Route path='/' component={Home} />
            <Route path='/about' component={About} />
      </div>
  </Router>,
  document.getElementById('app')
)
```

![](https://images.viblo.asia/f85a4a58-15a8-41ca-ad1d-4f6287d25f2c.png)

![](https://images.viblo.asia/23e2ab6b-711a-4e84-b0a3-e6abcd2909aa.png)

`Route` dùng để xác định component nào sẽ render ra tương ứng với `path` nào, `BrowserRouter` sẽ accept request URL của browser và sẽ match nó mới `path` của `Route` để render ra component mà route đó chứa, nếu không match với bất kì `path` nào của `Route` thì sẽ render ra `null`.

Ở ví dụ trên access `http://localhost:3000/` sẽ render ra component là `Home`, nếu `http://localhost:3000/about` thì render ra cả 2 component là `Home`  và `About`, nếu chúng ta muốn chỉ render ra component mà match chính xác với URL thì thêm `exact` property vào `Route`, như vậy sẽ chỉ render ra component mà match chính xác với `path` của `Route`.

![](https://images.viblo.asia/853dd130-479b-4f16-b681-506d052d6aa7.png)

Có 3 cách render sử dung `Route`:

1. `<Route component>`: Render ra component chỉ khi location match với path prop.
```js
<Route path='/' component={Home} />
```

2. `<Route render>`: Giống như cách trên, nhưng cách này có thể render ra inline component và có thể pass thêm các props khác cho component.
```js
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={routeProps => (
    <FadeIn>
      <Component {...routeProps}/>
    </FadeIn>
  )}/>
)

<FadingRoute path="/cool" component={Something}/>
```

3. `<Route children>`: Cách này sẽ luôn luôn render ra component, nhưng match props sẽ null nếu path không match với URL, vd: có thể dùng trong trường hợp để active menu bar item.
```js
const ListItemLink = ({ to, ...rest }) => (
  <Route
    path={to}
    children={({ match }) => (
      <li className={match ? "active" : ""}>
        <Link to={to} {...rest} />
      </li>
    )}
  />
);

<ul>
  <ListItemLink to="/somewhere" />
  <ListItemLink to="/somewhere-else" />
</ul>;
```

### Link
Để điều hướng giữa các trang, chúng ta sử dụng thẻ `<a>`. Tuy nhiên theo cách này sẽ refresh lại browser, như vậy sẽ không phù hợp đối với 1 SPA. Để tránh khỏi vấn đề đó, `React Router` cung cấp
1 component `Link` dùng để di chuyển qua lại giữa các page (component) mà không cần refresh browser.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

ReactDOM.render(
  <Router>
      <div>
           <nav>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
            </nav>
            <Route path='/' component={Home} />
            <Route path='/about' component={About} />
      </div>
  </Router>,
  document.getElementById('app')
)
```

Như ví dụ trên, mỗi `Link` component sẽ render ra 1 thẻ `<a>` trên HTML page, và sẽ di chuyển đến `Route` có `path` tương ứng với `to` props của `Link` đó.

Có 2 cách để define `Link` như sau:
1. `<Link to='path-name'>`: di chuyển đến `Route` mà không cần thêm bất kỳ state, hay search params nào cả.

2. `<Link to={{pathname: 'abc', state: { title: 'this is title' }}}>`: di chuyển đến Route và có thêm state đi kèm.

Mỗi lần click vào `Link` thì browser sẽ add 1 entry lưu lại state, params vào trong stack history, nếu back lại thì sẽ remove entry đó khỏi history.

### Dynamic Routing
Ở phần này, chúng ta sẽ tạo và sử dụng dynamic routes dựa trên query params như là `:id`. 

Kịch bản như sau: route `/posts` sẽ display danh sách title các posts, route `posts/:id` sẽ display id của mỗi post đó.

```js
function Child({ match }) {
  return (
      <div>
          <h3>ID: {match.params.id}</h3>
      </div>
  )
}

class Posts extends React.Component {
  state = {
      posts: [
          {
              id: 1,
              title: "Hello Blog World!"
          },
          {
              id: 2,
              title: "My second post"
          },
          {
              id: 3,
              title: "What is React Router?"
          }
      ]
  }

  render() {
      const { posts } = this.state
      return (
          <div className='posts'>
              <h1>Posts List</h1>
              <ul>
                  {posts.map(post => (
                      <li key={post.id}>
                          <Link to={`/posts/${post.id}`}>{post.title}</Link>
                      </li>
                  ))}
              </ul>
              <Route path='/posts/:id' component={Child} />
          </div>
      )
  }
}


ReactDOM.render(
  <Router>
    <div>
        <nav>
            <Link to='/' exact>Home</Link>
            <Link to='/about' exact>About</Link>
            <Link to='/posts' exact>Posts</Link>
        </nav>
        <Route path='/' exact component={Home} />
        <Route path='/about' component={About} />
        <Route path='/posts' component={Posts} />
    </div>
  </Router>,
  document.getElementById('app')
)
```

![](https://images.viblo.asia/16071e74-f03d-4632-bbb4-df785d71817e.png)

Ở ví dụ trên, ta sẽ get được `match` props của `Child` component, `match` props là một object có thể truy cập được các thông tin mà route cung cấp như `params`, `isExact`, `path`, `url`.
Có thể tham khảo official docs để hiểu thêm nhé https://reacttraining.com/react-router/web/api/match

### Kết luận
Bây giờ bạn đã làm quen với routing trong react và thư viện `React Router`, hy vọng bạn sẽ sử dụng nó để buid 1 react app tốt hơn nhé, mình sẽ giới thiệu đến các thành phần còn lại của `React Router` như `Redirect`, `Switch`,  `history` api, ... ở phần 2 nhé. Cảm ơn các bạn.

Refs:
* https://reacttraining.com/react-router/web/guides/quick-start
* https://sebhastian.com/react-router-introduction
* https://dev.to/amanhimself/using-react-router-to-optimize-single-page-applications-4mim
* https://flaviocopes.com/react-router/