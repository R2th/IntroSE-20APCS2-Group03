Đây là phần 2, cũng là phần cuối cùng của loạt bài viết React patterns. Bạn có thể đọc phần đầu tiên [React patterns - Phần 1](https://viblo.asia/p/react-patterns-phan-1-yMnKM1GEK7P).

## Children pass-through

Tạo một component truyền vào `children` một số `context` và render nó.

```js
class SomeContextProvider extends React.Component {
  getChildContext() {
    return {some: "context"}
  }

  render() {
    // Làm thế nào tốt nhất để return `children`?
  }
}
```

Bạn đang phải đối diện với một quyết định. Bao ngoài `children` bằng thẻ `<div />` hay return `children` trực tiếp. Option 1 thêm thẻ div bên ngoài (có thể sẽ bị lỗi stylesheets). Option 2 sẽ trả về unhelpful errors.

```js
// option 1: Thẻ div bao ngoài
return <div>{children}</div>

// option 2: unhelpful errors
return children
```

Cách tốt nhất để khiến `children` như một kiểu dữ liệu mở. React cung cấp `React.Children` để xử lý `children` một cách thích hợp.

```js
return React.Children.only(this.props.children)
```

## Proxy component

Các buttons sử dụng mọi nơi trong các web apps. Và mỗi button đều có `type` attribute với giá trị "button".

```js
<button type="button">
```

Viết attribute này hàng trăm lần có thể gây ra lỗi. Chúng ta có thể viết một component với level cao hơn để proxy `props`  tới một  `button` component với level thấp hơn.

```js
const Button = props =>
  <button type="button" {...props}>
```

Chúng ta có thể sử dụng `Button` ở những chỗ sử dụng `button` và đảm bảo rằng `type` attribute được áp dụng nhất quán ở mọi nơi.

```js
<Button />
// <button type="button"><button>

<Button className="CTA">Send Money</Button>
// <button type="button" class="CTA">Send Money</button>
```

## Style component

Đây là một [Proxy component](#proxy-component) được áp dụng cho các practices của style.

Giả sử chúng to có một button. Nó sử dụng các classes để styled như một "primary" button.

```js
<button type="button" className="btn btn-primary">
```

Chúng ta có thể tạo ra kết quả này bằng cách sử dụng một component có mục đích duy nhất.

```js
import classnames from 'classnames'

const PrimaryBtn = props =>
  <Btn {...props} primary />

const Btn = ({ className, primary, ...props }) =>
  <button
    type="button"
    className={classnames(
      "btn",
      primary && "btn-primary",
      className
    )}
    {...props}
  />
```

Nó có thể được hình dung như thế này.

```js
PrimaryBtn()
  ↳ Btn({primary: true})
    ↳ Button({className: "btn btn-primary"}, type: "button"})
      ↳ '<button type="button" class="btn btn-primary"></button>'
```

Tất cả những cách dưới đây đều trả về kết quả như nhau.
```js
<PrimaryBtn />
<Btn primary />
<button type="button" className="btn btn-primary" />
```

Làm như này giúp cho việc maintain style trở nên dễ dàng. Gói tất cả những style cần thiết vào một single component.

## Event switch


Khi viết các event handlers,  thường áp dụng quy ước đặt tên `handle{eventName}` .

```js
handleClick(e) { /* do something */ }
```

Đối với các components handle nhiều event types, tên các function có thể lặp lại. Tên của chúng không cung cấp nhiều giá trị, vì chúng chỉ đơn giản là uỷ quyền cho các actions/functions.

```js
handleClick() { require("./actions/doStuff")(/* action stuff */) }
handleMouseEnter() { this.setState({ hovered: true }) }
handleMouseLeave() { this.setState({ hovered: false }) }
```

Cân nhắc viết một event handler duy nhất cho component và switch dựa vào `event.type`.

```js
handleEvent({type}) {
  switch(type) {
    case "click":
      return require("./actions/doStuff")(/* action dates */)
    case "mouseenter":
      return this.setState({ hovered: true })
    case "mouseleave":
      return this.setState({ hovered: false })
    default:
      return console.warn(`No case for event type "${type}"`)
  }
}
```

Ngoài ra, đối với các components đơn giản, bạn có thể import các actions/functions trực tiếp từ các components sử dụng các arrow functions.

```js
<div onClick={() => someImportedAction({ action: "DO_STUFF" })}
```

Đừng quá băn khoăn về việc tối ưu performance cho tới khi bạn gặp vấn đề.


## Layout component


Layout components result in some form of static DOM element. Nó không cần cập nhật thường xuyên.

Consider a component that renders two `children` side-by-side.

```js
<HorizontalSplit
  leftSide={<SomeSmartComponent />}
  rightSide={<AnotherSmartComponent />}
/>
```

Chúng ta có thể optimize component này.

`HorizontalSplit` là `parent`  của cả 2 components, nó sẽ không bao giờ là `owner` của chúng. Chúng ta có thể làm cho nó không bao giờ update, mà không làm gián đoạn lifecycle của các components bên trong.

```js
class HorizontalSplit extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    <FlexContainer>
      <div>{this.props.leftSide}</div>
      <div>{this.props.rightSide}</div>
    </FlexContainer>
  }
}
```


## Container component

"A container does data fetching and then renders its corresponding sub-component. That’s it."&mdash;[Jason Bonta](https://twitter.com/jasonbonta) (Một container fetch data và render chúng trong sub-component. Chỉ vậy thôi.)

Tạo một stateless component `CommentList`.

```js
const CommentList = ({ comments }) =>
  <ul>
    {comments.map(comment =>
      <li>{comment.body}-{comment.author}</li>
    )}
  </ul>
```

Chúng ta tạo một component mới đảm nhận việc fetch dữ liệu và render `CommentList` component.

```js
class CommentListContainer extends React.Component {
  constructor() {
    super()
    this.state = { comments: [] }
  }

  componentDidMount() {
    $.ajax({
      url: "/my-comments.json",
      dataType: 'json',
      success: comments =>
        this.setState({comments: comments});
    })
  }

  render() {
    return <CommentList comments={this.state.comments} />
  }
}
```

Chúng ta có thể viết containers khác nhau cho bối cách sử dụng khác nhau.


## Higher-order component

Một [higher-order function](https://en.wikipedia.org/wiki/Higher-order_function) là một function nhận và trả một function. Nó không có gì phức tạp hơn thế. Vậy thì higher-order component là gì?

Nếu bạn đang sử dụng [container components](#container-component), đây chỉ là các containers được bao bởi một function.

Hãy bắt đầu với một stateless component `Greeting`.

```js
const Greeting = ({ name }) => {
  if (!name) { return <div>Connecting...</div> }

  return <div>Hi {name}!</div>
}
```

Nếu `props.name` có giá trị, nó sẽ render "Hi {name}!". Nếu không nó sẽ render "Connecting...". Đây cũng có thể coi là higher-order.

```js
const Connect = ComposedComponent =>
  class extends React.Component {
    constructor() {
      super()
      this.state = { name: "" }
    }

    componentDidMount() {
      // this would fetch or connect to a store
      this.setState({ name: "Michael" })
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          name={this.state.name}
        />
      )
    }
  }
```

Đây chỉ là function trả về component mà chúng ta truyền vào component như là một argument.

Bước cuối cùng, chúng ta cần bao `Greeting` component trong `Connect`.

```js
const ConnectedMyComponent = Connect(Greeting)
```

Đây là một pattern mạnh mẽ cho cung cấp khả năng fetching và cung cấp dữ liệu cho bất kỳ số lượng của [stateless function components](#stateless-function).

## State hoisting
**Stateless functions** sẽ không giữ state (cái tên nói nên tất cả).

Events thay đổi trong state.
Data của chúng cần được chuyển tới stateful **container components** parents.

Đây gọi là "state hoisting".
Nó được thược hiện bằng cách truyền tới callback từ một container component tới child component.

```js
class NameContainer extends React.Component {
  render() {
    return <Name onChange={newName => alert(newName)} />
  }
}

const Name = ({ onChange }) =>
  <input onChange={e => onChange(e.target.value)} />
```

`Name` nhận một `onChange` callback từ `NameContainer` và gọi các events.

Đoạn `alert` phía trên chỉ dụng để test và không thay đổi state.
Hãy thay đổi internal state của `NameContainer`.

```js
class NameContainer extends React.Component {
  constructor() {
    super()
    this.state = {name: ""}
  }

  render() {
    return <Name onChange={newName => this.setState({name: newName})} />
  }
}
```

State được _hoisted_ tới container, bằng cách cung cấp callback, và được sử dụng để update local state.
Điều này tận dụng tối đa khẳ năng tái sử dụng của stateless function và tạo ra ranh giới rõ ràng với stateful component.

Pattern này không bị giới hạn bởi các stateless functions.
Bới vì stateless function không có các lifecycle events,
Bạn cũng có thể sử dụng pattern này với các component classes.

***Controlled input** là một pattern quan trọng cần phải biết khi sử dụng với state hoisting*

*(Tốt nhất là xử lý event object trên stateful component)*


## Controlled input
Thật khó để nói controlled inputs là như thế nào.
Chúng ta sẽ bắt đầu với uncontrolled input thông thường.

```js
<input type="text" />
```

Trên trình duyệt bạn có thể thay đội nội dung của input một cách bình thường.

Tuy nhiên controlled input không cho phép các DOM mutations thực hiện điều này.
Bạn thay đổi `value` của input trong component và nó không thể bị thay đổi trong DOM.

```js
<input type="text" value="Cái này sẽ không thay đổi. Thử xem." />
```

Rõ ràng static inputs không mang lại giá trị.
Vì vậy chúng ta lấy `value` từ state.

```js
class ControlledNameInput extends React.Component {
  constructor() {
    super()
    this.state = {name: ""}
  }

  render() {
    return <input type="text" value={this.state.name} />
  }
}
```

Sau đó, khi thay đổi input, chúng ta  sẽ cập nhật component state.

```js
    return (
      <input
        value={this.state.name}
        onChange={e => this.setState({ name: e.target.value })}
      />
    )
```

Đây là một controlled input.
Nó chỉ cập nhật DOM khi state đã thay đổi trong component.