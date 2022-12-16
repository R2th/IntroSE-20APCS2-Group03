## Giới thiệu

Chúng ta có thể thấy rằng React hooks đang dần trở thành một thứ không thể thiếu trong tất cả các framework, các thư viện React hiện nay. Đây quả là một ý tưởng cực kì thành công của Facebook. Và React Router cũng không ngoại lệ với những nâng cấp đáng kể trong version 5.1. Vậy React Router v5.1 có gì mới, chúng ta hãy cũng điểm qua nhé! 


## Hook APIs

### `useParams`

Với React router v4, nếu chúng ta muốn lấy thông tin từ các `params`  , chúng ta phải lấy chúng từ `props` của `component` thông qua các `Route` hoặc thông qua phương thức `render prop` trong `Route` như sau:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// In the code below, BlogPost is used as both a <Route component>
// and in a <Route render> function. In both cases, it receives a `match`
// prop, which it uses to get the URL params.
function BlogPost({ match }) {
  let { slug } = match.params
  // ...
}

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        {/* Using the `component` prop */}
        <Route path="/blog/:slug" component={BlogPost} />

        {/* Using the `render` prop */}
        <Route
          path="/posts/:slug"
          render={({ match }) => <BlogPost match={match} />}
        />
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
)
```

Và nếu chúng ta muốn sử dụng nó trong các `child components`, chúng ta phải pass nó xuống các `props` của các `child components`. Tuy nhiên, đổi với React router v5.1, chúng ta chỉ cần sử dụng `useParams`:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function BlogPost() {
  // We can call useParams() here to get the params,
  // or in any child element as well!
  let { slug } = useParams()
  // ...
}

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        {/* No weird props here, just use
            regular `children` elements! */}
        <Route path="/posts/:slug">
          <BlogPost />
        </Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
)
```

### `useLocation`

`useLocation` sẽ trả về `location` object hiện tại. Nó sẽ giúp ích trong trường hợp chúng ta muốn lấy thông tin từ URL hiện tại.
Ví dụ như, bạn muốn gửi một sự kiện "page view" đến một analytics service mỗi khi URL thay đổi. Với `useLocation`, bạn chỉ cần làm như sau:

```js
import { Switch, useLocation } from 'react-router'

function usePageViews() {
  let location = useLocation()

  useEffect(
    () => {
      ga.send(['pageview', location.pathname])
    },
    [location]
  )
}

function App() {
  usePageViews()
  return <Switch>{/* your routes here */}</Switch>
}
```

### `useHistory`

Nếu bạn muốn sử dụng  `history` object cho các tác vụ điều hướng trong trang, bạn có thể sử dụng `useHistory` hook như sau:

```js
import { useHistory } from 'react-router'

function BackButton({ children }) {
  let history = useHistory()
  return (
    <button type="button" onClick={() => history.goBack()}>
      {children}
    </button>
  )
}
```

Trong tương lai, React Router sẽ cung cấp thêm cho chúng ta `useNavigate` hook, dành riêng cho các tác vụ điều hướng trong trang một cách thuận tiện hơn.

### `useRouteMatch`

Cuối cùng là `useRouteMatch` hook. Nó sẽ giúp ích khi chúng ta muốn sử dụng `Route` chỉ để get `match` param. Thay vì sử dụng `Route`, chúng ta có thể sử dụng `useRouteMatch`:

```js
// before
import { Route } from 'react-router'

function App() {
  return (
    <div>
      {/* ... */}
      <Route
        path="/BLOG/:slug/"
        strict
        sensitive
        render={({ match }) => {
          return match ? <BlogPost match={match} /> : <NotFound />
        }}
      />
    </div>
  )
}

// after
import { useRouteMatch } from 'react-router'

function App() {
  let match = useRouteMatch({
    path: '/BLOG/:slug/',
    strict: true,
    sensitive: true
  })

  return (
    <div>
      {/* ... */}
      {match ? <BlogPost match={match} /> : <NotFound />}
    </div>
  )
}
```

Cũng như `Route`, nếu chúng ta bỏ qua `path` prop, hook này sẽ trả về giá trị `match` của `Route` gần nhất.

## Tổng kết

Như vậy, chúng ta đã cùng điểm qua những nâng cấp mới của React Router v5.1, chủ yếu là các hooks. Các bạn có thể sử dụng nó ngay bây giờ hoặc chờ đợi một phiên bản nâng cấp hơn là React Router v6, nghe bảo là sẽ có trong đầu năm sau 2020 đấy nhé. Chúc các bạn thành công ^^

## Tham khảo
https://reacttraining.com/blog/react-router-v5-1/