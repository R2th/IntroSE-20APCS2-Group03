# Mở đầu
Với bất kỳ một ứng dụng web nào, chắc hẳn sẽ có những đường dẫn hay một số phần của ứng dụng mà bạn không muốn những người dùng chưa đăng nhập được phép truy cập vào. Mặc dù React Router không cung cấp cho ta một chức năng cụ thể có sẵn để có thể thực hiện công việc này một cách dễ dàng, nhưng bằng việc sử dụng tổng hợp những tính năng cơ bản ta hoàn toàn có thể implement chức năng kiểm tra này. 

Trước khi thiết kế các protected route, ta cần phải có chức năng đăng nhập/ đăng xuất để có thể cho phép thay đổi trạng thái kiểm tra đăng nhập. Nhưng vì đây là bài viết hướng dẫn thiết kế các protected route cho React Router chứ không phải về việc thiết kế chức năng đăng nhập, nên ta sẽ sử dụng một dummy object (đối tượng giả) để có thể mô phỏng chức năng đăng nhập / đăng xuất của ứng dụng. Đối tượng đó bao gồm: một state `isAuthenticated` để lưu lại trạng thái kiểm tra người dùng đã đăng nhập hay chưa, một hàm `authenticate` để set cho state trạng thái đã đăng nhập, và một hàm `signout` để set lại về trạng thái chưa đăng nhập. 

```
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // tạo delay
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100) // tạo delay
  }
}
```

# Thực hiện
Giờ hãy cùng xây dựng các component sẽ được render bởi React khi một đường dẫn đến component đó người dùng truy cập vào. Ta sẽ có 3 component: một `Public` component, một `Protected` component và một `Login` component. `Public` component là nơi bất kỳ người dùng nào cũng có thể truy cập, `Protected` component chỉ dành cho người dùng đã đăng nhập và `Login` component dùng để đăng nhập có một chút phức tạp hơn nên ta tạm thời xây dựng mock cho nó để hoàn thiện sau.

```
const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
  render() {
    return (
      <div>
        Login
      </div>
    )
  }
}
```

Ta đã có các component để có thể render, bước tiếp theo là xây dựng các `Route` để truy cập và render ra các component đó. Trước khi đi sâu vào việc thiết kế các protected routes, ta cần render ra các component Route bình thường cho đường dẫn `/public `và `/login` cùng các component `Link` hiển thị cho người dùng truy cập đến các đường dẫn /public và /protected. Thông thường thì các component Route sẽ được viết vào một file riêng như `routes.js ` nhưng để bài hướng dẫn được tổng quan hơn thì chúng sẽ được viết chung với đoạn render html.

```
export default function AuthExample () {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/public">Public Page</Link></li>
          <li><Link to="/protected">Protected Page</Link></li>
        </ul>
        <Route path="/public" component={Public}/>
        <Route path="/login" component={Login}/>
      </div>
    </Router>
  )
}
```

Ý tưởng ở đây là bất kỳ ai cũng có thể truy cập đến đường dẫn `/public` thế nên có thể nhìn thấy `Public` component, nhưng khi những người dùng chưa đăng nhập truy cập đến đường dẫn `/protected` , họ sẽ bị redirect đến đường dẫn `/login`.

Bước tiếp theo đương nhiên sẽ là render ra component `Route` cho đường dẫn `/protected`. Nhưng vấn đề ở đây là nếu ta chỉ sử dụng một component `Route` được cung cấp bởi React Router như bình thường thì bất cứ ai cũng sẽ có thể truy cập vào đường dẫn đó, điều mà rõ ràng ta không hề mong muốn. Sẽ rất là tiện lợi nếu React Router cung cấp sẵn cho ta một component `PrivateRoute` như component `Route` đã có để chỉ render ra các component khi người dùng truy cập đến đã đăng nhập. Một component như thế này chẳng hạn:

```
<Route path="/public" component={Public} />
<Route path="/login" component={Login} />
<PrivateRoute path='/protected' component={Protected} />
```

Nhưng rất tiếc rằng việc đó không xảy ra và có lẽ điều này lại là tốt nhất cho chính chúng ta bởi ta có thể tự tạo ra component này và tùy biến nó, xử lý nó theo các trường hợp sử dụng riêng của ứng dụng.
Và đây là requirement cho component `PrivateRoute` của chúng ta:

1.  Có các tính năng, các thuộc tính y hệt như component `<Route />`
2.  Render ra một component `<Route />` và truyền tất cả các props được truyền vào cho component Route đó.
3.  Có khả năng xác thực người dùng đã đăng nhập hay chưa. Nếu họ đã đăng nhập thì render ra component được truyền vào còn không thì redirect họ đến đường dẫn `/login`.

Với các requirement trên hãy cùng xây dựng component `PrivateRoute`:

```
// Requirement 1.
// Có các thuộc tính  như component <Route />

const PrivateRoute = ({ component: Component, ...rest }) => (

)
```

```
// Requirement 2.
// Render ra một component <Route /> và truyền tất cả các props được truyền vào cho nó.

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={} />
)
```

```
// Requirement 3.
// Xác thực người dùng đã đăng nhập hay chưa
// Nếu đã đăng nhập thì render ra component được truyền vào
// không thì redirect họ đến đường dẫn /login.

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)
```

Một vài chú ý cho các đoạn code ở trên: Với component Route, nếu thuộc tính path không được cung cấp thì component Route đó sẽ match tất cả các đường dẫn. Vậy nên trong trường hợp trên, vì ta không cung cấp cho nó một prop path, do đó Route sẽ luôn được match và prop render sẽ luôn được gọi. Vì thế, tùy thuộc vào trạng thái xác thực của người dùng, ta sẽ render hoặc render ra một Redirect component hoặc render component được truyền vào. Và đó cũng là lý do ta phải destructure và thay đổi tên của prop component mặc định (component: Component) để ta có thể trả về một <Component /> thay vì trả về một biến bình thường {component}. Tham khảo [destructuring](https://codeburst.io/renaming-destructured-variables-in-es6-807549754972) của ES6.

Tổng hợp từ đầu tới giờ, thì đoạn code của chúng ta đã được như sau:

```
import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
  render() {
    return (
      <div>
        Login
      </div>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export default function AuthExample () {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/public">Public Page</Link></li>
          <li><Link to="/protected">Protected Page</Link></li>
        </ul>
        <Route path="/public" component={Public}/>
        <Route path="/login" component={Login}/>
        <PrivateRoute path='/protected' component={Protected} />
      </div>
    </Router>
  )
}
```

Vào thời điểm này, bạn đã có thể xem được `PrivateRoute` hoạt động như nào, nếu bạn click vào đường dẫn đến `ProtectedPage` bạn sẽ bị redirect đến đường dẫn `/login` thay vì được dẫn đến `/protected`.
Giờ tất cả những gì còn lại phải làm là hoàn thiện component `Login` để ta có thể thay đổi trạng thái xác thực.

Đầu tiên hãy thêm một hàm `login` để gọi đến `fakeAuth.authenticate` được cung cấp sẵn.

```
class Login extends React.Component {
  login = () => {
    fakeAuth.authenticate(() => {

    })
  }
  render() {
    return (
      <div>
        Login
      </div>
    )
  }
}
```

Điều ta muốn làm lúc này là khi người dùng xác thực thông qua hàm `login`, họ sẽ được redirect đến trang home ( `/ `). Có một vài cách tiếp cận khác nhau trong việc chuyển trang của React Router. Bạn có thể sử dụng phương pháp `history.push` hoặc sử dụng component `<Redirect />`. Trong trường hơp này, hãy sử dụng `<Redirect />`. Ta cần phải thêm một state cho component để biết được khi nào ta cần render component `<Redirect />`

```
class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render() {
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      <Redirect to='/' />
    }

    return (
      <div>
        Login
      </div>
    )
  }
}
```

Và giờ điều ta đang làm làm là khi người dùng xác thực, ta chuyển `redirectToReferrer` thành `true` để khởi động việc render ra component `<Redirect />` đưa người dùng đến đường dẫn `/`.

Ta cần phải thêm một nút để người dùng có thể ấn đăng nhập.

```
return (
  <div>
    <p>You must log in to view the page</p>
    <button onClick={this.login}>Log in</button>
  </div>
)
```

Vào thời điểm này, mọi thứ đều hoạt động rất tốt. Khi một người dùng chưa được xác thực cố truy cập vào đường dẫn `/protected`, họ sẽ bị redirect sang đường dẫn `/login`, và khi họ đã xác thực thì họ có thể truy cập vào đường dẫn `/protected`. Có một điểm ta cần thêm vào để UX được tốt hơn. Có một trường hợp mà có lẽ ai cũng đã trải qua đó là khi bạn cố truy cập một trang cụ thể, bạn bị redirect sang trang login, nhưng khi bạn đã xác thực thì thay vì đưa bạn về trang mà bạn đang muốn truy cập, bạn lại bị chuyển đến một trang không hề liên quan. Đó là một điểm trừ về trải nghiệm người dùng. Hãy cùng sửa nó.

Đầu tiên, bên trong component `PrivateRoute` khi ta redirect người dùng chưa được xác thực, ta cần truyền thêm vào đường dẫn mà họ đang truy cập để có thể quay lại đó sau khi họ đã xác thực. Ta có thể làm điều này bằng cách thay đổi thuộc tính `to` của `Redirect` từ string thành một object và truyền vào đó một key `state` với giá trị là `location` hiện tại của đường dẫn người dùng đang cố truy cập.

```
<Redirect to={{
  pathname: '/login',
  state: { from: props.location }
}} />
```

Giờ ta cần phải chỉnh sửa lại component `Login` để nếu người dùng bị redirect đến nó từ một đường dẫn khác, khi họ xác thực xong họ sẽ được đưa quay trở lại đường dẫn đó.

```
class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      <Redirect to={from} />
    }

    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}
```

Lúc này, khi người dùng xác thực xong, họ sẽ được đưa trở lại đường dẫn họ đang truy cập.

Chúng ta đã gần hoàn thiện được chức năng rồi. Chỉ có đúng một tính năng cần được bổ sung đó là khi người dùng đã đăng nhập thì họ có thể đăng xuất được. Để làm được điều này, ta sẽ tạo ra một component `AuthButton` để khi người dùng đăng nhập nó sẽ render ra nút đăng xuất và nếu người dùng chưa đăng nhập nó sẽ hiển thị ra dòng chữ "Bạn chưa đăng nhập". Sau khi ấn nút đăng xuất ta sẽ sử dụng `history.push` để đưa người dùng về trang `/` bởi ta không thể render ra component `<Redirect />` được. Nhưng vấn đề lớn gặp phải ở đây là `AuthButton` không được render bởi React Router thế nên ta sẽ không thể truy cập vào các thuộc tính `history` hay `location` hay `match`. Nhưng rất may React Router đã cung cấp chúng ta một Higher order component là `withRouter` giúp cho component con của ta có quyền sử dụng các thuộc tính đó.

```
// Vì ta bọc component của ta với withRouter
// component đó sẽ được truyền vào history thông qua prop

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))
```

Và ta đã có component AuthButton, điều còn lại duy nhất là render nó ra. Cuối cùng đây là toàn bộ đoạn code hoàn chỉnh của chúng ta.

```
import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      <Redirect to={from} />
    }

    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

export default function AuthExample () {
  return (
    <Router>
      <div>
        <AuthButton/>
        <ul>
          <li><Link to="/public">Public Page</Link></li>
          <li><Link to="/protected">Protected Page</Link></li>
        </ul>
        <Route path="/public" component={Public}/>
        <Route path="/login" component={Login}/>
        <PrivateRoute path='/protected' component={Protected} />
      </div>
    </Router>
  )
}
```

# Tham khảo
[1] https://reacttraining.com/react-router/web/example/auth-workflow.

[2] https://tylermcginnis.com/react-router-protected-routes-authentication/.

[3] https://codeburst.io/renaming-destructured-variables-in-es6-807549754972