Hi All.
Hôm nay chúng ta sẽ đi tìm hiểu về chủ để "Conditional Rendering", hiểu nôm na là render có với điều kiện.
# Conditional Rendering
React là một thư viện được xây dựng dựa trên javascript nên nó sử dụng các hàm về điều kiện giống Javascript, chúng ta có thể kết hợp sử dụng state và các [conditional operator](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) để hiện thị những gì mà chúng ta muốn.

Ví dụ để hiện thị trạng thái đã đăng nhập chưa của user:

```javascript
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

Với 2 function trên chúng ta sẽ hiển thị trạng thái của User. và chúng ta thiết kế tiếp 1 component để điều khiển hiện thị như sau:

```javascript
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

Chỉ cần chúng ta thay đổi giá trị của biến **isLoggedIn** là có thể thay đổi hiển thị của **Greeting** Component rồi.

### Element Variables

các bạn có thể sử dụng variables (biến) để lưu trữ element. Nó khá là hữu ích khi sử dụng conditionally render, chúng ta chỉ render lại variables mà ko cần phải render các phần khác.
Ví dụ như sau:

Chúng ta có 2 button

```javascript
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

tiếp theo chúng ta sẽ thiết kế LoginControl component để điều khiển việc Login và Logout, việc điều khiển này sẽ dựa vào state.

```javascript
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```
Khi click button thì state thay đổi và làm thay đổi button variable, dẫn tới react sẽ rerender và button sẽ được update mà ko render lại các phần khác.

### Inline If with Logical && Operator
Đôi lúc chúng ta có những đoạn code kiểm tra điều kiện ngắn và bạn không muốn sử dụng cú pháp if else thì các bạn có thể sử dụng cú pháp **&&**

Cú pháp của nó như sau:

> true && expression
> 

Có nghĩa là nếu điều kiện trước đúng thì react sẽ thực hiện thực thi cú pháp phía sau **&&**, còn nếu điều kiện đứng trước sai thì react sẽ bỏ qua và không thực thi cú pháp phía sau **&&**


### Inline If-Else with Conditional Operator

Một dạng if else inline khác, loại này khác loại phía trên là sẽ có 2 vế và được bọc trong dấu {}.

Cú pháp của nó như sau:

> condition ? true : false.
> 

Nếu đúng thì thực hiện cú pháp true, nếu sai thì thực  hiện cú pháp false.

Ví dụ:

```javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

Bạn có thể sử dụng ở mức độ phức tạp hơn:

```javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

Nhưng với những xử lý phức tạp thì các bạn không nên xử lý trong html như này mà nên tách nó thành function xử lý riêng.

### Preventing Component from Rendering
Trong một số trường hợp thì các bạn chỉ muốn hiển thị component trong một số điều kiện nhất định. Ví dụ như hiển thị warning khi có message và ngược lại thì ẩn warning đi.
Để làm việc đó thì các bạn hãy sử dụng Conditional Rendering và trả về null trong case mà các bạn mong muốn ẩn component.

```javascript
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

> Returning null from a component’s render method does not affect the firing of the component’s lifecycle methods. For instance componentDidUpdate will still be called.
> 

[Ví dụ](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)