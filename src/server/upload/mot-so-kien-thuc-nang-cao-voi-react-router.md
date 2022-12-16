Trước khi tìm hiểu về những khái niệm nâng cao, hãy đảm bảo rằng bạn đã biết những kiến thức cơ bản trong React Router:
- Cung cấp khả năng định tuyến cho các ứng dụng SPA tích hợp React
- Khai báo các định tuyến cho các ứng dụng React

Giờ thì bắt đầu thôi!

## Code Splitting

Hiểu đơn giản, `Code Splitting` là một trong những cách hiệu quả để tăng tốc độ load JS, qua đó giúp cải thiện hiệu năng ứng dụng.

Như ta đã biết, một website thường có các thành phần cơ bản như html, css, JS và một số media như images, fonts … Và JS là một trong những thứ làm chậm tốc độ load page nhất. 1 byte xử lý của JS cần nhiều thời gian hơn so với 1 byte css hay images.

Bằng cách sử dụng Code Splitting, một tệp JS lớn có thể được tách thành các thành phần nhỏ hơn và chỉ load khi có yêu cầu. Điều này cho phép chúng ta gửi một bundle nhỏ hơn, load dần ứng dụng và bổ sung mã JS cần thiết khi người dùng đã truy cập vào các trang cụ thể của ứng dụng. Kỹ thuật này cũng tương tự như lazy load.

Trong React, có thể thực hiện kỹ thuật Code Splitting bằng cách sử dụng `webpack`, `@babel/plugin-syntax-dynamic-import` hoặc `loadable-components`. 

Các SPA hiện nay đã phần đều cần một bundler như `webpack` với chức năng build, minify và tạo các file bundle như JS, css, html. Khi mà ứng dụng trở nên lớn hơn, có nhiều file JS hơn thì nhiệm vụ của webpack lúc này là đóng gói và tối ưu những file này thành các file nhỏ hơn.

![](https://images.viblo.asia/83020218-577c-46d8-9324-316106c06e3b.png)

`webpack` có hỗ trợ tích hợp để dynamic imports. Tuy nhiên, nếu bạn sử dụng Babel (ví dụ: để biên dịch JSX sang JS) thì bạn sẽ cần sử dụng plugin`@babel/plugin-syntax-dynamic-import`. Đây là một plugin thuần syntax, có nghĩa là `Babel` sẽ không thực hiện bất kỳ chuyển đổi bổ sung nào. Plugin chỉ đơn giản là cho phép Babel phân tích cú pháp import động để webpack có thể bundle chúng lại dưới dạng một code split. `.Babelrc` sẽ trông giống như thế này:

```js
{
  "presets": ["@babel/preset-react"],
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

`react-loadable` là một thư viện nhỏ dùng để load các components có dynamic imports. Nó tự động xử lý tất cả các trường hợp cạnh và làm việc tách mã trở nên dễ dàng hơn.

Một ví dụ đơn giản sử dụng `loadable-components`:

```js
import loadable from "@loadable/component";
import Loading from "./Loading.js";

const LoadableComponent = loadable(() => import("./Dashboard.js"), {
  fallback: <Loading />
});

export default class LoadableDashboard extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}
```

Một giải pháp khác nữa để thực hiện `Code Splitting` là chia nhỏ mã theo `Route`. Mỗi trang là một route tương ứng với một url, chúng ta sẽ chia nhỏ bundle file thành nhiều file khác nhau. Ví dụ:

```js
import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { baseUrl } from './helpers'

const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

export default function Routes() (
  <Router>
    <Suspense fallback={null}>
      <Switch>
        <Route 
          exact
          path={`${baseUrl()}`}
 		  component={Home}
        />
        <Route
          exact
          path={`${baseUrl()}/about`}
          component={About}
        />
        <Route
          exact
          path={`${baseUrl()}/contact`}
          component={Contact}
        />
      </Switch>
    </Suspense>
  </Router>
)
```

## Animated transitions
Nó cung cấp một luồng dễ dàng để điều hướng một trang. Có khá nhiều plugin React hỗ trợ việc này nhưng trong phạm vi bài viết chúng ta sẽ chỉ tìm hiểu plugin `react-router-transition`.

[Ví dụ,](https://github.com/yomete/advanced-react-router-usage/blob/animated-transitions/src/routes/index.js)

```js
import { AnimatedSwitch, spring } from 'react-router-transition'
```

Helper React Motion `spring` dùng để chỉ định cấu hình spring cho animation. `AnimatedSwitch` là một `<Switch />` nhưng nó sẽ chuyển tiếp khi route con thay đổi.

```js
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

const bounceTransition = {
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};
```

Hàm `mapStyles()` sử dụng đối số `styles` để trả về giá trị cho opacity (độ mờ) và transform, sẽ được sử dụng trong việc set cấu hình các transitions sau này.

Hàm `bounce()` gói helper spring từ React Motion đưa vào cấu hình bouncy và object `bounceTransition` xác định cách các matches sẽ thực hiện transition như thế nào tại các vị trí khác nhau như **atEnter**, **atLeave** và **atActive**.

```js
class Routes extends React.Component {
  render () {
    return (
      <Router history={history}>
        <div>
          <header className="header container">
            <nav className="navbar">
              <div className="navbar-brand">
                <Link to="/">
                  <span className="navbar-item">Home</span>
                </Link>
              </div>
            </nav>
          </header>
          <AnimatedSwitch
            atEnter={bounceTransition.atEnter}
            atLeave={bounceTransition.atLeave}
            atActive={bounceTransition.atActive}
            mapStyles={mapStyles}
            className="route-wrapper"
          >
            <Route exact path="/" component={Home} />
            <Route path="/p/1" component={One} />
            <Route path="/p/2" component={Two} />
            <Route path="*" component={NotFound} />
          </AnimatedSwitch>
        </div>
      </Router>
    )
  }
}
```

Nó vẫn hoạt động như một Switch bình thường mặc dù có thêm một số props bổ sung như `atEnter`, `atLeave`, `atActive` và `mapStyles`.

Kết quả,
![](https://images.viblo.asia/5f95234d-daba-49d0-a278-7c0ef5877f76.gif)

## Scroll restoration

Nó là giải pháp rất hữu ích trong các trường hợp sau:
- Khi bạn muốn đảm bảo rằng người dùng sẽ quay lại đầu trang khi chuyển routes hoặc điều hướng tới một trang khác. Trang sẽ được cuộn lên trên điều hướng để chúng ta không phải bắt đầu một màn mới với thanh scroll ở dưới cùng.
- Khi người dùng quay lại một trang rất dài sau khi đã điều hướng tới một trang khác. Chúng ta có thể restore scroll trở lại đúng vị trí mà user đã dừng trước đó để họ có thể tiếp tục thao tác (chỉ dùng với thao tác click "back" hoặc "forward", click "Link" không sử dụng được).

Ngày nay, các trình duyệt như Chrome đang bắt đầu xử lý khôi phục cuộn với `history.pushState` theo cách tương tự như khi xử lý với điều hướng trình duyệt thông thường. Và nó đã hoạt động một cách rất hiệu quả. 

Vì các trình duyệt đang bắt đầu xử lý các "trường hợp mặc định" và các ứng dụng có nhu cầu cuộn khác nhau, nên React Router không cung cấp tính năng quản lý cuộn mặc định. Do vậy, chúng ta có thể tùy chỉnh thực hiện bất kỳ nhu cầu cuộn nào mà mình muốn.

[Ví dụ,](https://github.com/yomete/advanced-react-router-usage/blob/scroll-restoration/src/routes/index.js)

```js
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'

class Routes extends Component {
    render () {
        return (
            <Router history={history}>
                <ScrollToTop>
                    <div>
                        <header className="header container">
                            <nav className="navbar">
                                <div className="navbar-brand">
                                    <Link to="/">
                                        <span className="navbar-item">Home</span>
                                    </Link>
                                </div>

                                <div className="navbar-end">
                                    <Link to="/about">
                                        <span className="navbar-item">About</span>
                                    </Link>

                                    <Link to="/somepage">
                                        <span className="navbar-item">404 page</span>
                                    </Link>
                                </div>
                            </nav>
                        </header>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/about" component={About} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </div>
                </ScrollToTop>
            </Router>
        )
    }
}

export default Routes
```

Component `ScrollToTop` thực hiện tất cả các công việc `nặng` khi thực hiện khôi phục cuộn và được sử dụng trong `Router` để bao gồm các routes được đặt trong `render()`.

[ScrollToTop.js](https://github.com/yomete/advanced-react-router-usage/blob/scroll-restoration/src/components/ScrollToTop/ScrollToTop.js)

```js
import React from 'react'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children
    }
}

export default withRouter(ScrollToTop)
```

`componentDidUpdate` sẽ kiểm tra xem nó có phải là trang mới không và sử dụng hàm `window.scroll` để trở về đầu trang.

Sau đó, `ScrollToTop` được gói trong `withRouter` đã export để cấp quyền truy cập vào các props của bộ định tuyến.

## Recursive Paths

Một `Recursive Paths` là một đường dẫn sử dụng các đường dẫn lồng nhau để hiển thị các view lồng nhau bằng cách gọi chúng trên cùng một component. 

Một ví dụ điển hình về `recursive paths` (đường dẫn đệ quy) là việc sử dụng `breadcrumb` phổ biến trên các trang web. “Breadcrumb” là một tập hợp những liên kết giúp người dùng xác định vị trí hiện tại của mình trong ứng dụng.

`Breadcrumbs` cung cấp cho người dùng một cách để theo dõi đường dẫn trở lại điểm đích ban đầu của họ ngay cả sau khi đi qua nhiều tuyến khác nhau. Và nó có thể được triển khai bằng cách sử dụng các hàm chức năng của React Router, cụ thể như object `match` - nó cung cấp khả năng viết các `recursive paths` cho các components con lồng nhau.

[Ví dụ,](https://github.com/yomete/advanced-react-router-usage/blob/recursive-paths/src/components/About/About.js)

```js
import React from 'react'
import './About.css'
import { Link, Route } from 'react-router-dom'

class About extends React.Component {

    componentDidMount () {
        console.log(this.props.match.url)
    }

    render () {
        return (
            <div className="container">
                <h1>Recursive paths</h1>
                <p>Keep clicking the links below for a recursive pattern.</p>
                <div>
                    <ul>
                        <li><Link className="active" to={this.props.match.url + "/1"}>Link 1</Link></li>
                        <li><Link className="active" to={this.props.match.url + "/2"}>Link 2</Link></li>
                        <li><Link className="active" to={this.props.match.url + "/3"}>Link 3</Link></li>
                    </ul>
                </div>
                <div>
                    <p className="recursive-links">New recursive content appears here</p>
                    <Route path={`${this.props.match.url}/:level`} component={About} />
                </div>
            </div>
        )
    }
}

export default About
```

`Link` sử dụng `this.props.match.url` để dẫn đến URL hiện tại, sau đó được nối thêm bằng `/1`, `/2` hoặc `/3`. Đệ quy thực sự xảy ra bên trong `Route` chỗ `path` được set bằng `this.props.match.url` hiện tại với tham số `/:level` được thêm vào và `component` được sử dụng là `About`.

![](https://images.viblo.asia/9bd416ba-a220-4d33-af3d-5270ab00a634.png)

## Server Rendering (SSR)

Một trong những nhược điểm của việc sử dụng các framework JS như React, Angular hay VueJs là trang sẽ trống cho đến khi trình duyệt thực hiện bundle JS của ứng dụng. Quá trình này được gọi là client-side rendering:
- Quá trình này có thể dẫn đến thời gian chờ cao hơn nếu kết nối internet của người dùng kém.
- Một nhược điểm khác là trình thu thập dữ liệu web không quan tâm đến việc trang vẫn đang tải hay đang chờ request JS. Nếu trình thu thập thông tin không nhìn thấy bất kỳ thứ gì, rõ ràng điều đó không tốt cho SEO.

SSR giúp khắc phục điều đó bằng cách tải tất cả html, css và JS trong request ban đầu, tất cả nội dung được tải và đưa vào html cuối cùng mà trình thu thập thông tin web có thể thu thập thông tin.

Một ứng dụng React có thể được render trên server bằng cách sử dụng Node.js và sử dụng thư viện React Router để điều hướng trong ứng dụng. Hãy xem cách triển khai điều đó.

Xét [ví dụ,](https://github.com/yomete/advanced-react-router-usage/tree/server-side-rendering) file [webpack.development.config.js](https://github.com/yomete/advanced-react-router-usage/blob/server-side-rendering/webpack.development.config.js) chứa cấu hình `webpack` cần thiết cho ứng dụng React. File [server.js](https://github.com/yomete/advanced-react-router-usage/blob/server-side-rendering/server.js) dựng backend là Node.js chạy server. Một server web `Express` được setup để chạy ứng dụng và một server dev với `webpackDevMiddleware` và `webpackHotMiddleware`.  Sử dụng [requestHandler.js](https://github.com/yomete/advanced-react-router-usage/blob/server-side-rendering/requestHandler.js) để tạo view với `app.use(requestHandler)`.

SSR yêu cầu phải kết xuất các components thành các markups tĩnh và đó là lý do tại sao `renderToString` được import từ `react-dom/server` ở đầu file. Stateless `<StaticRouter>` cũng được import để gói ứng dụng thay `<BrowserRouter>` vì kết xuất trên máy chủ hơi khác một chút, tất cả đều stateless (không trạng thái). Nó được chuyền thêm url được request từ server để các routes có thể match và prop `context`.

Bất cứ khi nào có `<Redirect>` ở phía client, `history` của trình duyệt sẽ thay đổi trạng thái và chúng ta sẽ nhận được màn hình mới. Trong môi trường server tĩnh, không thể thay đổi state ứng dụng. Thay vào đó, chúng ta sẽ sử dụng prop `context` để tìm kết quả render. Nếu tìm thấy một `context.url`, điều đó có nghĩa là ứng dụng đã được chuyển hướng (server đã gửi một redirect thích hợp).

Vậy làm cách nào để xác định các tuyến và các components tương ứng? Cái này được định nghĩa trong [router-config.js](https://github.com/yomete/advanced-react-router-usage/blob/server-side-rendering/src/router-config.js) và [App.js](https://github.com/yomete/advanced-react-router-usage/blob/server-side-rendering/src/Components/App.js),

```js
import React from 'react'
import { Home, About, NotFound } from './components'

export const routes = [
   {
      'path':'/',
      'component': Home,
      'exact': true
   },
   {
      'path':'/about',
      'component': About
   },
   {
      'path':'*',
      'component': NotFound
   }
]
```
`routes` là mảng các object khác nhau, mỗi object chứa các `path` khác nhau cùng với component tương ứng với chúng. 

```js
import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import { routes } from '../router-config'
import { NotFound } from '../Components'

export default class App extends React.Component {
  render() {
    return (
      <div>
          <header className="header container">
            <nav className="navbar">
                <div className="navbar-brand">
                    <NavLink to="/" activeClassName="active">
                        <span className="navbar-item">Home</span>
                    </NavLink>
                </div>

                <div className="navbar-end">
                    <NavLink to="/about" activeClassName="active">
                        <span className="navbar-item">About</span>
                    </NavLink>
                    <NavLink to="/somepage" activeClassName="active">
                        <span className="navbar-item">404 Page</span>
                    </NavLink>
                </div>

            </nav>
          </header>

          <div className="container">
              <Switch>
                  {routes.map((route,index) => (
                      <Route key={index} path={route.path} component={route.component} exact={route.exact} />
                  ))}
                  <Route component={NotFound}/>
              </Switch>
          </div>
      </div>
    )
  }
}
```

Mảng `routes` trước đó được lặp bên trong component `<Switch>` để tạo các các `<Route>` khác nhau cần thiết cho ứng dụng.

Các bạn có thể tải toàn bộ [mã nguồn](https://github.com/yomete/advanced-react-router-usage) để chạy thử và kiểm tra xem ứng dụng có thực sự được render ở phía máy chủ hay không bằng cách nhấp chuột phải vào trang, chọn `View Page Source`, nội dung của trang được hiển thị toàn bộ chứ không phải được hiển thị từ file JS.

***Nguồn***

[Advanced React Router Concepts](https://blog.logrocket.com/advanced-react-router-concepts-code-splitting-animated-transitions-scroll-restoration-recursive-17096c0cf9db/)

Mình mới tìm hiểu và thực hành với React nên bài dịch có thể có nhiều thiếu xót, mong bạn đọc có thể thông cảm. Mình xin chân thành cảm ơn <3.