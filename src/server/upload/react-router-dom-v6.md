![React router dom V6](https://images.viblo.asia/020ffdb6-2a03-4caa-9879-8ebd5cf26962.png)

[React router dom V6](https://reactrouter.com/) xuất hiện sử dụng các tính năng tốt nhất từ các phiên bản trước đã kết thúc một thập kỉ định tuyến phía client, nó tương thích với react từ 16.8 trở lên. Bài viết này mình sẽ tổng hợp những kiến thức cơ bản đến nâng cao về `react-router-dom`, các ví dụ được viết và chỉnh sửa trên codesandbox để dễ theo dõi, yêu cầu cần có kiến thức cơ bản về `html` `css` `javascript` `reactJS`.

## 1. Cài đặt
```
# Tạo ứng dụng ReactJS
npx create-react-app react-router-tutorial

# Cài thư viện
cd react-router-tutorial
npm install react-router-dom@6
```
Thêm bootstrap V5 vào file `public/index.html` để xây dựng giao diện cho nhanh
```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
/>
```
## 2. Giao diện và cấu trúc component
- Giao diện

![image.png](https://images.viblo.asia/c5344681-07b1-44e0-898c-c0811063d632.png)

- Cấu trúc component
```
- App
  |-- Sidebar
  |-- Content
```
- Code demo: https://codesandbox.io/s/giao-dien-ban-dau-rfcnd

## 3. Configuring Routes
Đầu tiên muốn kết nối ứng dụng của bạn với URL của trình duyệt thì phải import [BrowserRouter](https://reactrouter.com/en/6.4.0/router-components/browser-router) và bọc nó bên ngoài toàn bộ ứng dụng chính là component `App`

```jsx
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
)
```

Tại component [Sidebar](https://codesandbox.io/s/giao-dien-ban-dau-rfcnd?file=/src/components/Sidebar.js) ở giao diện ban đầu chúng ta mới chỉ sử dụng thẻ a, giờ để điều hướng ta sử dụng [Link](https://reactrouter.com/en/6.4.0/components/link)
```jsx
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <ul>
      <li>
        <Link to='/' className='nav-link'>Dashboard</Link>
      </li>
      <li>
        <Link to='/orders' className='nav-link'>Orders</Link>
      </li>
      <li>
        <Link to='/products' className='nav-link'>Products</Link>
      </li>
      <li>
        <Link to='/customers' className='nav-link'>Customers</Link>
      </li>
    </ul>
  )
}
```
Như vậy tại `Sidebar` chúng ta đã điều hướng sang các URL khác nhau, giờ với các URL đó sẽ load các component tương ứng sử dụng Routes và Route, tại component `App` sửa lại
```jsx
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/products' element={<Products />} />
      <Route path='/customers' element={<Customers />} />
    </Routes>
  )
}
```
Code demo: https://codesandbox.io/s/configuring-routes-c87nm

## 4. Active Link
Ở phần trước tại component `Sidebar` khi chúng ta sử dụng  `<Link>` thì output thực tế ra HTML như này
```jsx
<Link className='nav-link' to='/orders'>Orders</Link>

// html
<a class="nav-link" href="/orders">Orders</a>
```
Vẫn khá là ok nhưng giờ chúng ta muốn có thêm class `active` hoặc style gì đó đặc biệt cho link đang xem thì sẽ không dùng cách này được.

### 4-1. Active link với tên class là active
Nếu class tên là  `active` thì easy rồi chúng ta chỉ việc thay `Link` thành [NavLink](https://reactrouter.com/docs/en/v6/components/nav-link) các bạn sẽ thấy việc output ra html cũng đã khác nhau rồi.
```jsx
<NavLink className='nav-link' to='/orders'>Orders</NavLink>

// html
<a aria-current="page" class="nav-link active" href="/orders">Orders</a>
```
Code demo: https://codesandbox.io/s/active-link-class-active-ubh4h?file=/src/components/Sidebar.js

### 4-2. Active link với tên class khác
Nếu chúng ta muốn tên class khi được active khác đi như `activated` hay `current-page` thì viết kiểu function như này
```jsx
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const navLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link activated' : 'nav-link'
  }
  return (
    <ul>
      <li>
        <NavLink to='/' className={navLinkClass}>Dashboard</NavLink>
      </li>
    </ul>
  )
}
```
Code demo: https://codesandbox.io/s/active-link-class-activated-crjtu?file=/src/components/Sidebar.js

### 4-3. Active link với style
Nếu không muốn trạng thái active viết theo kiểu class mà viết kiểu style thì làm như này
```jsx
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? '#fff' : '',
    backgroundColor: isActive ? '#0d6efd' : ''
  })

  return (
    <ul>
      <li>
        <NavLink to='/' className='nav-link' style={navLinkStyle}>
          Dashboard
        </NavLink>
      </li>
    </ul>
  )
}
```
Code demo: https://codesandbox.io/s/active-link-style-xbyei?file=/src/components/Sidebar.js

### 4-4. Custom active link
Nhiều khi đời không như mơ, vì vài lí do nào đó mà chúng ta không thể đặt class active hay style active vào chính thẻ a mà phải đặt ở thẻ cha của nó như thẻ li chẳng hạn
```php:html
<li>
  <a href="/" class="active">Dashboard</a>
</li>

// chuyển sang như này
<li class="active">
  <a href="/">Dashboard</a>
</li>
```
Ví dụ sau trình bày cách tạo một **Custom Active Link**  sử dụng useMatch và useResolvedPath trong react router

```jsx
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

const Sidebar = () => {
  const CustomLink = ({ children, to, ...props }) => {
    const resolved = useResolvedPath(to)
    const match = useMatch({ path: resolved.pathname, end: true })
    return (
      <li className={match ? 'active' : ''}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }

  return (
    <ul>
      <CustomLink to='/'>Dashboard</CustomLink>
      <CustomLink to='/orders'>Orders</CustomLink>
      <CustomLink to='/products'>Products</CustomLink>
      <CustomLink to='/customers'>Customers</CustomLink>
    </ul>
  )
}

export default Sidebar
```
Code demo: https://codesandbox.io/s/custom-active-link-83m1q?file=/src/components/Sidebar.js

## 5. Navigate programmatically
Ở các phần ví dụ trên khi người dùng click vào các link ở `Sidebar` thì chuyển trang được rồi nhưng nếu trường hợp chúng ta muốn chuyển trang tự động thì sao? Ví dụ chúng ta có một form đăng nhập khi login thành công thì chuyển hướng họ đến một trang nào đó, để làm được yêu cầu này chúng ta sử dụng đến hook useNavigate

### 5-1. useNavigate với 1 tham số
Ví dụ bên dưới khi click vào button thì sẽ chuyển đến trang `orders`
```jsx
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate('orders')}>
      Go to Orders
    </button>
  )
}
```
Code demo: https://codesandbox.io/s/use-navigate-1-f512r?file=/src/components/Dashboard.js

### 5-2. useNavigate với history
Trường hợp bạn muốn sử dụng `go`, `goBack`, `goForward` trong lịch sử trình duyệt.
```jsx
import { useNavigate } from 'react-router-dom'

export default function App() {
  const navigate = useNavigate()

  return (
    <>
      <button onClick={() => navigate(-2)}>Go 2 pages back</button>
      <button onClick={() => navigate(-1)}>Go back</button>
      <button onClick={() => navigate(1)}>Go forward</button>
      <button onClick={() => navigate(2)}>Go 2 pages forward</button>
    </>
  )
}
```
Code demo: https://codesandbox.io/s/use-navigate-2-885g1?file=/src/components/Orders.js

### 5-3. useNavigate với replace true
Sử dụng tham số thứ hai của `navigate` để chỉ thay đổi URL chứ không muốn URL đó lưu lại trong lịch sử trình duyệt. Kiểu như tại trang A đi tới trang B, tại trang B chúng ta click back trên trình duyệt thì sẽ không quay trở lại trang A nữa.
```jsx
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <button onClick={() => navigate('orders', { replace: true })}>
      Go to Orders
    </button>
  )
}
```
Code demo: https://codesandbox.io/s/use-navigate-3-sb4oi?file=/src/components/Dashboard.js

### 5-4. Component Navigate
Sử dụng component [Navigate](https://reactrouter.com/docs/en/v6/components/navigate) để chuyển trang trong phần return ở function

```jsx
import { Navigate } from 'react-router-dom'
import Dashboard from './Dashboard'

const PrivateRoutes = () => {
  const isAuth = true

  return isAuth ? <Dashboard /> : <Navigate to='/login' />
}
```

## 6. Not Found Routes - 404
Trường hợp này xảy ra nếu người dùng nhập vào một URL không hợp lệ như  `https://example.com/abcdef` thì chúng ta sẽ điều hướng tới trang 404. Chúng ta để  `Not Found Routes` này ở dưới cùng để nếu các route ở trên không cái nào trùng khớp thì sẽ đến route này.
```jsx
<Routes>
  <Route path='/' element={<Dashboard />} />
  <Route path='*' element={<NotFound />} />
</Routes>
```
Code demo: https://codesandbox.io/s/not-found-routes-404-y5gjs?file=/src/App.js

## 7. Nested Routes
Nested Routes để lồng component con vào trong component cha.
```jsx
<Routes>
  <Route path='/' element={<Dashboard />} />
  <Route path='/products' element={<Products />}>
    <Route path='laptop' element={<Laptop />} />
    <Route path='desktop' element={<Desktop />} />
  </Route>
</Routes>
```
```jsx:Products.js
import { Outlet } from 'react-router-dom'

const Products = () => (
  <>
    <h1>Products</h1>
    <Outlet />
  </>
)
```
Như code ở trên
- Nếu truy cập vào **localhost:3000/products** sẽ load component `Products`
- Nếu truy cập vào **localhost:3000/products/laptop** sẽ load  `Products` bên trong có component `Laptop`
- Nếu truy cập vào **localhost:3000/products/desktop** sẽ load  `Products` bên trong có component `Desktop`
- Lưu ý tại component cha là `Products` ta sử dụng [Outlet](https://reactrouter.com/docs/en/v6/components/outlet) để xác định vị trí hiển thị component con khi route trùng khớp
- Code demo: https://codesandbox.io/s/nested-routes-ub8ee?file=/src/App.js

## 8. Index routes
- Như ví dụ ở trên thì khi truy cập vào **localhost:3000/products** sẽ load component `Products` và không hiển thị conponent con nào cả
- Điều chúng ta mong muốn là vẫn URL như vậy nhưng hiển thị một conponent con nào đó ở ngay component cha
- Để làm được điều này ta sử dụng **index** và truyền conponent con muốn được hiển thị
- Ví dụ bên dưới: nếu truy cập vào `localhost:3000/products` sẽ load component `Products` bên trong có component `BestSeller`

```jsx
<Routes>
  <Route path='/products' element={<Products />}>
    <Route index element={<BestSeller />} />
    <Route path='laptop' element={<Laptop />} />
    <Route path='desktop' element={<Desktop />} />
  </Route>
</Routes>
```
- Code demo: https://codesandbox.io/s/index-routes-znjlj?file=/src/App.js

## 9. Dynamic routes
```jsx
<Routes>
  <Route path='/' element={<Dashboard />} />
  <Route path='/courses' element={<Courses />} />
  <Route path='/courses/:courseId' element={<CourseDetail />} />
</Routes>
```
```jsx
import { useParams } from 'react-router-dom'

const CustomerDetail = () => {
  const params = useParams()
  return <h2>Chi tiết khóa học: {params.courseId}</h2>
}
```
- Dynamic routes giúp chúng ta giải quyết các routes động, routes thay đổi theo một cấu trúc đã được định nghĩa sẵn.
- Ví dụ ta có URL theo kiểu `courses/html`, `courses/css`, `courses/javascript` thì có thể mô hình hóa nó thành `courses/:courseId`
- Tại `CourseDetail` ta sử dụng hook [useParams](https://reactrouter.com/docs/en/v6/hooks/use-params) để lấy tham số trên URL.
- Nếu ta định nghĩa route là `courses/:courseId` thì lúc lấy giá trị cũng lấy đúng tên là `params.courseId`
- Code demo: https://codesandbox.io/s/dynamic-routes-1iedr?file=/src/App.js

### 9-1. Dynamic routes với các route cố định
```jsx
<Routes>
  <Route path='/courses' element={<Courses />} />
  <Route path='/courses/:courseId' element={<CourseDetail />} />
  <Route path='/courses/add-course' element={<AddCourse />} />
  <Route path='/courses/edit-course' element={<EditCourse />} />
</Routes>
```
- Khi sử dụng Dynamic routes ta có URL theo kiểu `courses/html`, `courses/css`, `courses/javascript` thì đã mô hình hóa nó thành `courses/:courseId`
- Trong một vài trường hợp route cố định như `courses/add-course` hay `courses/edit-course` thì ta sẽ khai báo route để bắt các trường hợp này
- Code demo: https://codesandbox.io/s/dynamic-routes-2-zb3h2?file=/src/App.js

### 9-2. Multiple dynamic routes
```jsx
<Routes>
  <Route path='/courses' element={<Courses />} />
  <Route path='/courses/:courseType/' element={<CourseType />} />
  <Route path='/courses/:courseType/:courseId' element={<CourseDetail />} />
</Routes>
```
- Đoạn code trên áp dụng với trường hợp nhiều URL Parameters
- Code demo: https://codesandbox.io/s/dynamic-routes-3-1dzf2?file=/src/App.js

## 10. Search params

```jsx
import { useSearchParams } from 'react-router-dom'

let [searchParams, setSearchParams] = useSearchParams()
````
Hook [useSearchParams](https://reactrouter.com/docs/en/v6/hooks/use-search-params) được sử dụng để đọc và sửa đổi query string trên URL, hook này trả về một mảng gồm hai giá trị: tham số tìm kiếm và một hàm để thay đổi.

**Để thay đổi searchParams**
```jsx
<button onClick={() => setSearchParams({product: 'laptop'})}>
  Laptop
</button>
<button onClick={() => setSearchParams({product: 'laptop', stock: 'in-stock'})}>
  Còn hàng
</button>
<button onClick={() => setSearchParams({})}>
  Clear
</button>
```
- Khi click vào button Laptop  =>  `https://example.com/?product=laptop`
- Khi click vào button Còn hàng => `https://example.com/?product=laptop&stock=in-stock`
- Khi click vào button Clear => `https://example.com`

**Để đọc searchParams**
```jsx  
const productType = searchParams.get('product'); // laptop
const stock = searchParams.get('stock'); // in-stock
```
Code demo: https://codesandbox.io/s/search-params-9s77sh?file=/src/components/Dashboard.js

## 11. Protected routes
Giả sử ứng dụng của chúng ta có hai phần: **public** và **private**.
- Phần public thì ai cũng có thể truy cập được như trang chủ, tin tức...
- Phần private thì phải đăng nhập vào mới xem được như trang cá nhân, trang account...

Về hành vi đối với người dùng
- Nếu đăng nhập rồi thì truy cập được tất cả các link của public hay private...
- Nếu chưa thì chỉ truy cập được các trang public, nếu người dùng vẫn cố truy cập vào các trang private thì ta điều hướng họ sang trang login hay trang nào thì tùy nghiệp vụ.

Bước 1: Nhóm các route cần bảo vệ vào trong PrivateRoutes
```jsx
<Routes>
  <Route path='/' element={<Home />} />
  <Route path='/news' element={<News />} />
  <Route element={<PrivateRoutes />}>
    <Route path='/personal' element={<Personal />} />
    <Route path='/account' element={<Account />} />
  </Route>
</Routes>
```
Bước 2: Trong PrivateRoutes sẽ kiểm tra login hay chưa để xử lý
```jsx:PrivateRoutes.js
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  const isAuth = true

  return isAuth ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes
```
Code demo: https://codesandbox.io/s/protected-routes-wnd2p2?file=/src/App.js
## 12. Lazy loading
Lazy Loading là một kỹ thuật để tối ưu hoá ứng dụng, khi chuyển trang ứng dụng sẽ chỉ load những component cần thiết, điều này giúp trang web chuyển động mượt mà, nhanh chóng, tăng trải nghiệm người dùng.

Code bên dưới khi chưa áp dụng **Lazy Loading** cho component `About`
```jsx
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import About from './components/About'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/about' element={<About />} />
    </Routes>
  )
}
```
Còn bên dưới khi đã áp dụng **Lazy Loading** cho component `About`
```jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
const LazyAbout = React.lazy(() => import('./components/About'))

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route
        path='/about'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <LazyAbout />
          </React.Suspense>
        }
      />
    </Routes>
  )
}
```
Code demo: https://codesandbox.io/s/lazy-loading-qdi5n?file=/src/App.js

Để áp dụng kĩ thuật **Lazy Loading** chúng ta cần:
- `Dynamic import trong React`
- `React.lazy()`
- `React.Suspense()`
- Vì ứng dụng sử dụng `create-react-app` nên đã cài đặt và cấu hình sẵn `webpack`
- Khi ta dùng `import About from './components/About'` thì webpack đã đóng gói nó cả trong một file js ban đầu nên khá nặng.
- Khi người dùng lần đầu tiên vào ứng dụng thì sẽ phải tải và thực thi code bên trong nên sẽ mất thời gian.
- Việc sử dụng `Lazy Load` thì ta đã tách riêng file js của trang `About` theo kiểu [code splitting](https://viblo.asia/p/webpack-tu-a-den-a-webpack-code-splitting-1Je5EyPG5nL) ra khỏi file js ban đầu.
- Khi người dùng vào  trang `/about` thì hiện loading và bắt đầu tải, thực thi file js riêng này.

## 13. Route Objects
Hook [useRoutes](https://reactrouter.com/en/main/hooks/use-routes) cho phép bạn xác định các tuyến đường dưới dạng object thuần javascript  thay cho `<Routes>` và `<Route>`. Đây chỉ là một phong cách tùy chọn cho những người không muốn sử dụng JSX.

Code bên dưới áp dụng `<Routes>` và `<Route>`
```jsx 
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/products' element={<Products />}>
        <Route index element={<BestSeller />} />
        <Route path='laptop' element={<Laptop />} />
        <Route path='desktop' element={<Desktop />} />
      </Route>
      <Route path='*' element={<NoMatch />} />
    </Routes>
  )
}
```
Code bên dưới áp dụng hook `useRoutes`
```jsx 
import { useRoutes } from 'react-router-dom'

export default function App() {
  let routes = [
    { path: '/', element: <Dashboard /> },
    {
      path: '/products',
      element: <Products />,
      children: [
        { index: true, element: <BestSeller /> },
        { path: 'laptop', element: <Laptop /> },
        { path: 'desktop', element: <Desktop /> }
      ]
    },
    { path: '*', element: <NoMatch /> }
  ]

  let element = useRoutes(routes)

  return element
}
``` 
Code demo: https://codesandbox.io/s/route-objects-dvfdwx

## 14. Scroll to top

Trong thực tế chúng ta hay gặp phải trường hợp đang ở trang A và cuộn đến cuối trang này, khi chuyển sang trang B thì thanh cuộn vẫn ở dưới gây chút khó chịu. Demo tại đây: https://codesandbox.io/s/scroll-to-top-mg2o39

Để fix vấn đề này chúng ta có thể tạo 1 component `scrollToTop` và thêm nó vào trong đoạn `config route`

```jsx:config-routes
<div>
  <ScrollToTop />
  <Routes>
    <Route path='/' element={<Dashboard />} />
    <Route path='/orders' element={<Orders />} />
    <Route path='/products' element={<Products />} />
  </Routes>
</div>
```

```jsx:ScrollToTop.js
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window && window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
```
Demo đã fix lỗi tại đây: https://codesandbox.io/s/scroll-to-top-ngon-vwhklx?file=/src/App.js

## 15. Can't setState on unmounted component

- Khi chúng ta đang ở trang Home và lấy dữ liệu từ API
- Dữ liệu chưa GET xong thì người dùng chuyển sang trang About
- Component Home lúc đó đã bị unmount
- Sau đó dữ liệu từ API được trả về và setState()
- Component Home không còn để update

![can't setState on unmounted component](https://images.viblo.asia/c3a4655c-c1f1-4bc6-ab47-d0ce8fc160f1.png)
```jsx
async function handleSubmit() {
  setPending(true)
  await post('/someapi') // component might unmount while we're waiting
  setPending(false)
}
```

```jsx
let isMountedRef = useRef(false)
useEffect(() => {
  isMountedRef.current = true
  return () => {
    isMountedRef.current = false
  }
}, [])

async function handleSubmit() {
  setPending(true)
  await post('/someapi')
  if (isMountedRef.current) {
    setPending(false)
  }
}
```

-----

Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo!

- Liên hệ: trungnt256
- Hướng dẫn sử dụng Font Awesome 5 bản miễn phí tại [đây](https://viblo.asia/p/huong-dan-font-awesome-5-ban-mien-phi-gGJ59Qyj5X2)
- Hướng dẫn tìm hiểu SCSS cơ bản tại [đây](https://viblo.asia/p/sass-co-ban-den-cang-co-Az45bqEwlxY)