## Giới thiệu
Chào bạn, bài viết ngày hôm nay mình sẽ chia sẻ về một Pattern khá thú vị trong React đó chính là Render Props.

Nhìn chung, đây là một kĩ thuật dùng để chia sẻ dữ liệu (state) giữa các React component theo một cách rõ ràng và không bị ràng buộc lẫn nhau. 

Bên cạnh Render Props, còn các các kĩ thuật khác cũng được sử dụng vì mục đích tái sử dụng code, chia sẻ dữ liệu (state) giưã các component mà bạn có thể tìm hiểu thêm, điển hình phải kể đến là HOC (Higher-Order Components - https://reactjs.org/docs/higher-order-components.html

## Nội dung

Khi làm việc với React, một pattern phổ biến được sử dụng để chia sẻ state giưã các components đó chính là prop `children`.

Bên trong một JSX component, bạn có thể render `{this.props.children}`, component này sẽ nhận vào bất kì JSX component nào được truyền vào như là một children. Ví dụ:

```JSX
class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { /*...*/ }
  }

  render() {
    return <main role="main">{this.props.children}</main>
  }
}

const Children1 = () => {}

const Children2 = () => {}

const App = () => (
  <Parent>
    <Children1 />
    <Children2 />
  </Parent>
)
```

Tuy nhiên, có một vấn đề ở đây đó là state của parent component không thể được truy cập từ những children component.

Chính vì vậy, để chia sẻ state, bạn cần sử dụng pattern render prop component.

Thay vì pass những component như một children đến parent component, bạn sẽ pass một function dưới dạng `{this.props.children()}`, hàm này chấp nhận arguments. Ví dụ:

```JSX
class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: 'Sy Dinh' }
  }

  render() {
    return <main role="main">{this.props.children(this.state.name)}</main>
  }
}

const Children = props => {
  return <h1>{props.name}</h1>
}

const App = () => <Parent>{name => <Children name={name} />}</Parent>
```

Thay vì sử dụng `children` prop, bạn có thể sử dụng bất kì prop nào, và có thể sử dụng pattern này nhiều lần trên cùng một component.

```JSX
class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: 'Sy Dinh', age: 23 }
  }

  render() {
    return (
      <main role="main">
        <h1>Hi there !</1>
        {this.props.someprop1(this.state.name)}
        {this.props.someprop2(this.state.age)}
      </main>
    )
  }
}

const Children1 = props => {
  return <p>{props.name}</p>
}

const Children2 = props => {
  return <p>{props.age}</p>
}

const App = () => (
  <Parent
    someprop1={name => <Children1 name={name} />}
    someprop2={age => <Children2 age={age} />}
  />
)

ReactDOM.render(<App />, document.getElementById('app'))
```

## Kết luận

Trên đây mình truyền tải nội dung Render Props trong React theo cách nhìn nhận chủ quan của mình. 

Bạn có thể tìm thấy nhiều chi tiết hơn ở official docs của React nhé https://reactjs.org/docs/render-props.html

Cảm ơn các bạn đã đọc bài viết.

Chúc các bạn học tốt !