# Composition vs Inheritance
Nôm na là bài này chúng ta sẽ so sánh giữa 2 khái niệm "Thành phần" và "Kế thừa".

Một trong những thế mạnh của React đó chính là thiết kế theo hướng "Thành phần", chia nhỏ application thành nhiều Component, và React cũng khuyến cáo nên phát triển ứng dụng theo hướng "Thành phần" hơn là "Kế thừa" để thuận tiện hơn trong việc tái sử dụng giữa các Component.

Trong bài này thì chúng ta cùng đi tìm hiểu một số vấn đề liên quan tới việc kế thừa và làm cách nào để có thể giải quyết các vấn đề bằng cách chia nhỏ ra các "Thành phần".

### Containment

Trong khi làm dự án chúng ta có thể gặp một vài Component mà chúng chưa có detail mà phụ thuộc vào các thuộc tính truyền vào. Chẳng hạn như một số Component cơ bản được thiết kế để dùng chung cho nhiều nơi.

Ví dụ như 2 Component `Sidebar` hoặc là `Dialog`, 2 Component sẽ có content khác nhau ở mỗi màn hình và sẽ phụ thuộc vào cái gì truyền vào cho Chúng.

Và trong React để giải quyết bài toán này thì nhà sản xuất đã khuyến nghị nên sử dụng một prop đặc biệt, có tên là `children` để truyền các `element` vào Component.

```Javascript
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

Và component này sẽ được sử dụng như sau:

```Javascript
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

[Ví dụ tại đây](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)

Như ở ví dụ trên thì tất cả mọi thứ được bọc trong thẻ `FancyBorder` đều được gom vào prop `children` và khi Render thì component `FancyBorder` sẽ render `children` vào một thẻ Div như ví dụ trên.

Đó là một ví dụ đơn giản gửi một content vào Component, còn trong thực tế nhiều lúc chúng ta cần phải truyền nhiều content hơn vào thì làm như thế nào.

Trong những case như vậy thì các bạn có thể tự đặt ra các quy ước riêng và truyền vào như một custom prop thay vì sử dụng prop `children`

```Javascript
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```
[Xem ví dụ](https://codepen.io/gaearon/pen/gwZOJp?editors=0010)

Trong ví dụ trên thì 2 component `<Contact />` và `<Chat/>` là 2 object, và bạn có thể truyền nó vào Component khác như những kiểu data khác. Một trong những điểm mạnh của React chính là đây, 
 - Bạn không bị giới hạn về số lượng props truyền vào mỗi Component
 - Bạn khai báo và truyền vào Component object gì thì sẽ tìm thấy nó trong `this.props`

### Specialization
Trong React thì chúng ta hướng tới việc tách Application thành các `Thành Phần` Nơi mà các Component riêng biệt lại có nhiều điểm tương đồng.

Lật lại với ví dụ về Component `FancyBorder`.

Bây giờ chúng ta cần có một component như sau:
 - Nó là một Component giống như FancyBorder 
 - Nó có thể thay đổi data dựa theo input đầu vào
 
 ```Javascript
 function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />

  );
}
 ```
 
 [Xem ví dụ tại đây](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010).
 
 Việc chi nhỏ thành các thành phần nhỏ hơn sẽ tiện lợi và có thể sử dụng ở rất nhiều nơi, chẳng hạn như trong một class
 
 ```javascript
 function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />

        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
 ```
 
 [Xem ví dụ](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)
 
###  So What About Inheritance?
một trong những ứng dụng lớn nhất được xây dựng bằng React đó chính là Facebook, nó hoạt động dựa trên sự kết hợp của hàng ngàn component nhỏ, và tới nay thì nhà phát triển Facebook vẫn chưa tìm được bất cứ một trường hợp Component nào sử dụng việc kế thừa.

Với props và chia nhỏ Application ra nhiều thành phần thì nó sẽ giúp bạn có thể linh hoạt xử lý các Component của mình. Và luôn nhớ rằng Component có thể nhận vào bất cứ props nào bao gồm cả các giá trị cơ bản, React Element, hay có thể là một function.

Ngoài ra nếu các bạn muốn sử dụng các function giữa các Component thì chỉ cần Export, và Import mà không cần phải extend