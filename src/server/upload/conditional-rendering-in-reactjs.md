Hế lô mọi người, tiếp tục seri tìm hiểu về ReactJs, hôm nay mình sẽ giới thiệu đến mọi người một nội dung mới trong ReactJs mà chắc chắn sẽ được sử dụng rất nhiều trong các dự án thự tế. Đó là `Conditional rendering`. Ok chúng ta bắt đầu thôi nào.

## Conditional Rendering
Trong ReactJs, đôi khi bạn có một số component và tùy thuộc vào từng điều kiện ví dụ như trạng thái của state, props,... mà bạn muốn hiển thị một hoặc một số component nào đó. Khi đó bạn có thể sử dụng `Conditional rendering` để render ra component mà bạn mong muốn.

`Conditional rendering` trong ReactJs hoạt động tương tự như trong Javascript. sử dụng các câu lệnh điều kiện if, else kết hợp với các toán tử điều kiện đối với State. Khi đó, mỗi khi giá trị của state được thay đổi thì ReactJs sẽ tự động update UI tùy theo điều kiện được thiết lập.

Cùng xét ví dụ dưới đây:
```
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```
Chúng ta sẽ tạo thêm component `Greeting`, ở đó ra render ra `UserGreeting` hoặc `GuestGreeting` phụ thuộc vào trạng thái của User đã đăng nhập hay chưa.
```
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
Khi đó nếu `isLoggedIn = true` thì sẽ render ra `UserGreeting` component, còn nếu không thì render ra `GuestGreeting` component.

Một cách đơn giản hơn khi bạn có nhiều trường hợp cần phải check đó là sử dụng `switch...case` tương tự như khi sử dụng trong Javascript:
```
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  switch (isLoggedIn) {
    case true:
      return <UserGreeting />;
      break;
    case false:
      return <GuestGreeting />;
      break;
    default:
      return null;
  }

}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

## Element variables
Bạn có thể sử dụng biến state để lưu trữ trạng thái của component. Khi biến state thay đổi thì chỉ phần có chứa điều kiện liên quan đến state thay đổi được render lại, còn phần còn lại của component không thay đổi sẽ không cần render lại. Nó sẽ giúp performance hệ thống tốt hơn.

Chúng ta cùng nhìn vào hai component đại diện cho button Log in và Log out dưới đây:
```
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
Ở mỗi button chúng ta gọi đến props `props.onClick` là các function để xử lý khi mỗi button được click.

Tiếp theo chúng ta sẽ tạo ra component `LoginControl` để điều khiển trạng thái Log in, Log out của user. Nó sẽ render ra `<LoginButton />` hoặc `<LogoutButton />` tùy thuộc vào trạng thái của state. Cùng với đó là render ra component `<Greeting />` ở ví dụ trước đó.
```
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
Ví dụ hơi dài ha. Có một số phần bạn cần chú ý. Đó là state `isLoggedIn` và hai function `handleLoginClick` và `handleLogoutClick`.

State `isLoggedIn` dùng để lưu trạng thái của User xem đã login hay chưa. Hai hàm `handleLoginClick` và `handleLogoutClick` dùng để thay đổi giá trị của biến state `isLoggedIn` mỗi khi click vào mỗi button `Log in` hay `Log out`. Và phụ thuộc vào giá trị của biến state `isLoggedIn` để render ra button tương ứng là `<LogoutButton />` hay `<LoginButton />`.
```
if (isLoggedIn) {
  button = <LogoutButton onClick={this.handleLogoutClick} />;
} else {
  button = <LoginButton onClick={this.handleLoginClick} />;
}
```

## Shorter syntax
Sử dụng `Conditional rendering` trong ReactJs cũng khá đơn giản ha. Nhưng cách mình vừa giới thiệu cũng hơi dài dòng khi phải khai báo một biến const ở ngoài rồi truyền lại vào bên trong `return()`. Đôi khi bạn sẽ cần dùng những syntax rút gọn mà có thể sử dụng ngay bên trong `return()`. Rất may là JSX hỗ trợ rất tốt điều này.

### Inline If with Logical && Operator
Bạn cần phải đóng gói điều kiện trong dấu ngoặc nhọn. Bên trong nó bao gồm logic của Javascript và toán tử điều kiện `&&`
```
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```
Nó họat động bởi vì trong Javascript, `true && expression` tương đương với `expression` và `false && expression` tương đương với `false`. Do đó nếu điều kiện trước `&&` là true thì phần tử ngay phía sau toán tử `&&` sẽ được render ra. Còn nếu điều kiện là false thì sẽ không được render ra.

Chú ý rằng, việc trả về `falsy expression` sẽ làm cho phần tử ngay sau toán tử `&&` không được render ra nhưng nó vẫn sẽ render ra kết quả của `falsy expression`. Như trong ví dụ dưới đây, nó vẫn sẽ render ra `<div>0</div>`:
```
render() {
  const count = 0;
  return (
    <div>
      { count && <h1>Messages: {count}</h1>}
    </div>
  );
}
```

### Inline If-Else with Conditional Operator
Một cách khác nữa để có thể sử dụng `Conditinal rendering` là sử dụng các toán tử điều kiện của Javascript `condition ? true : false`

Trong ví dụ dưới đây, chúng ta sẽ sử dụng conditional rendering để render ra một đoạn text nhỏ.
```
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```
Nó cũng có thể sử dụng để render ra một component hay một đoạn code dài hơn:
```
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```
Không chỉ có một điều kiện, bạn có thể nối dài điều kiện ở phía sau tùy thích `condition1 ? true : condition2 ? true : false`. Tuy nhiên bạn nên hạn chế việc sử dụng quá nhiều điều kiện ở đây vì nó sẽ rất rối mắt và gây khó khăn khi đọc lại đoạn code của bạn :laughing:

### Preventing Component from Rendering
Trong một số trường hợp, bạn muốn ẩn đi component mà nó vẫn được render ở những chỗ khác bạn có thể sử dụng `return null` với điều kiện trước khi render ra nội dung của component đó.

Trong ví dụ dưới đây, `<WarningBanner />` được render tùy thuộc vào giá trị của props `warn`. Nếu giá trị của props là false thì component sẽ không được render:
```
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
Một component `return null` sẽ không hủy đi việc gọi đến các method trong component's lifecycle. Ví dụ như method `componentDidUpdate` vẫn sẽ được gọi.

## References
https://reactjs.org/docs/conditional-rendering.html