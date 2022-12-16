Xin chào tất cả các bạn, hôm nay mình sẽ giới thiệu về React router v4 và cách sử dụng với redux.

Bạn không nên install trực tiếp react-router mà thay vào đó là:
- Nếu bạn viết cho Web thì sử dụng react-router-dom: https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom
- Nếu là native thì react-router-native: https://github.com/ReactTraining/react-router/tree/master/packages/react-router-native


Trong các ưng dụng sử dụng redux thì ta hay dùng thêm connected-react-redux: https://github.com/supasate/connected-react-router

Việc config với redux khá đơn giản
```
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
const initialState = {};
const enhancers = [];
const middleware = [thunk];
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const store = createStore(rootReducer, initialState, composedEnhancers);

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
```

Với React với Web browser thì có 2 Router là <BrowserRouter/> và <HashRouter/>.
HashRouter thích hợp với server serve static file
Với các page web thông thường thì ta sử dụng <BrowserRouter/>.

BrowserRouter cung cấp cho ta History API của HTML5. History API là một object cho phép chúng ta các method như history.location, history.push, history.replace.


### <Route/> path 

Để navigate giũa các page ta sử dụng <Route/> . Component này render page nếu current URL trùng với path props của component. Route giống như một bộ định tuyến quy định Component sẽ được render nếu URL match với path routes.
```
import About from './about'
<Route path="/about" component={About} />
```
Switch là component để wrap Route. Khi user vào một page thì Route đầu tiên match URL sẽ được hiển thị.
Các bạn cần wrap Routes trong Switch như sau

VD: 

Nếu URL là http://localhost:3000/roster thì Component được render ra sẽ là Roster
```
import { Switch, Route } from 'react-router-dom'
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/roster' component={Roster}/>
      <Route path='/schedule' component={Schedule}/>
    </Switch>
  </main>
)
```


### Nested Routing
Để có các URL nested nhau chúng ta có thể làm như sau.

Nested URL cho phép chúng ta có thể wrap được các URL theo workspace.

VD: Employee có các page show, new. Các bạn có thể wrap Show và new trong Route path như sau.

```
const Employee = () => (
  <Switch>
    <Route path='/employee/:employee_id' component={Employee}>
        <Route path="show" component={Show} />
        <Route path="New" component={New} />
    </Route>
  </Switch>
)
```

### Path Params

Khi sử dụng react-router thì chắc chắn bạn sẽ phải lấy các biến như id trên URL. Ví dụ khi muốn show employee thì ta phải lấy được id của employee. Khi đó thì chúng ta sẽ sử dụng **this.props.match.params.employeeid**

Khi sử dụng react-router thì component của các bạn được render sẽ có các props match.

Match object với các properties như:
- url: pathname của location hiện tại  
- path: route path 
- isExact: true nếu pathname === path 
- params: chứa các giá trị value trong pathname



### Link
Link là Component điều hướng trong React. Các bạn có thể hình dung Link giống với thẻ <a/> trong html, tuy nhiên Link trong React router chỉ navigate URL sử dụng history API chứ không tải lại trang. 
VD: 
```
import { Link } from 'react-router-dom'
const App = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
      </ul>
    </nav>
  </header>
)
```

### Redirect
Render <Redirect/> sẽ navigate một location khác, tuy nhiên khác với Link là Redirect sẽ override location hiện tại trong history stack, giống với redirect trên server.

```
<Redirect from='/session' to='/' />
```

### PrivateRoute 
Sử dụng React router thì thường chúng ta sẽ phải custom Route để sử dụng PrivateRoute với mục đich Authenticate
VD: Sử dụng Route để check loggin, nếu loggedIn false thì sẽ Redirect ra login path.

```
function PrivateRoute ({component: Component, requireLogin, isLoggedIn, ...props}) {
  return (
    return !isLoggedIn && requireLogin ?
    <Redirect to={Path.login} />
    :
    <Route component={withLayout(Component, isLoggedIn)} {...props} />
    />
  )
}
```

```
<Route path='/' exact component={Home} />
<Route path='/login' component={Login} />
<Route path='/register' component={Register} />
<PrivateRoute exact requireLogin path={Path.profile} component={Profile} />

```

Trên đây là một số kiến thức cơ bản khi sử dụng React router, khi vào dự án thực tế thì có thể sẽ có thêm một vài điều khác cần lưu ý. Cảm ơn các bạn đã đọc.