Đây là những react patterns được tổng hợp tại trang [https://reactpatterns.com/](https://reactpatterns.com/), rất hữu ích cho những ai mới tiếp cận với React. Khá nhiều nên mình sẽ tách thành 2 bài viết.

## Stateless function

[Stateless functions](https://facebook.github.io/react/docs/components-and-props.html) thường dùng để viết các components nhỏ có tính tái sử dụng cao. Chúng không có `state`, chúng chỉ là những functions.

```js
const Greeting = () => <div>Hi there!</div>
```

Có thể truyền vào  `props` và `context`.

```js
const Greeting = (props, context) =>
  <div style={{color: context.color}}>Hi {props.name}!</div>
```

Có thể định nghĩa các biến local sử dụng trong function.

```js
const Greeting = (props, context) => {
  const style = {
    fontWeight: "bold",
    color: context.color,
  }

  return <div style={style}>{props.name}</div>
}
```

Bạn cũng có thể nhận được kết quả tương tự bằng cách sử dụng những functions khác.

```js
const getStyle = context => ({
  fontWeight: "bold",
  color: context.color,
})

const Greeting = (props, context) =>
  <div style={getStyle(context)}>{props.name}</div>
```

Cũng có thể định nghĩa  `defaultProps`, `propTypes` và `contextTypes` như các React components.

```js
Greeting.propTypes = {
  name: PropTypes.string.isRequired
}
Greeting.defaultProps = {
  name: "Guest"
}
Greeting.contextTypes = {
  color: PropTypes.string
}
```


## JSX spread attributes

Spread Attributes là một tính năng của JSX. Nó là cú pháp để truyền tất cả các properties của một object như là JSX attributes.

Hai ví dụ này là tương đương nhau.
```js
// props truyền vào bằng JSX attributes
<main className="main" role="main">{children}</main>

// props được "spread"  từ object
<main {...{className: "main", role: "main", children}} />
```

Sử dụng cách này để truyền toàn bộ `props` vào các components.

```js
const FancyDiv = props =>
  <div className="fancy" {...props} />
```

Bây giờ, chúng ta thêm các props cho `FancyDiv` dưới dạng attributes.

```js
<FancyDiv data-id="my-fancy-div">So Fancy</FancyDiv>

// Đây là output: <div className="fancy" data-id="my-fancy-div">So Fancy</div>
```

Hãy nhớ rằng theo thứ tự ưu tiên, nếu `props.className`được định nghĩa, nó sẽ ghi đè `className` được định nghĩa bởi `FancyDiv`

```js
<FancyDiv className="my-fancy-div" />

// Đây là output: <div className="my-fancy-div"></div>
```

Chúng ta có thể khiến cho  className của  `FancyDiv` luôn luôn được ưu tiên bằng cách đặt nó sau props `({...props})`.

```js
//  `className` sẽ luôn ghi đè `className` từ props
const FancyDiv = props =>
  <div {...props} className="fancy" />
```

Đôi khi bạn muốn giữ cả 2 className vì chỉ muốn custom lại style chẳng hạn. Bạn có thể gộp lại chúng như sau.

```js
const FancyDiv = ({ className, ...props }) =>
  <div
    className={["fancy", className].join(' ')}
    {...props}
  />
```


## destructuring arguments

[Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) là một tính năng của ES2015. Nó kết hợp tuyệt vời với `props` trong các Stateless Functions.

These examples are equivalent.
```js
const Greeting = props => <div>Hi {props.name}!</div>

const Greeting = ({ name }) => <div>Hi {name}!</div>
```

Cú pháp sử dụng [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) (`...`) cho phép bạn thu thập tất cả những properties còn lại trong một object.

```js
const Greeting = ({ name, ...props }) =>
  <div>Hi {name}!</div>
```

Chúng ta cũng có thể dùng `JSX Spread Attributes` để truyền toàn bộ `props` tới component.

```js
const Greeting = ({ name, ...props }) =>
  <div {...props}>Hi {name}!</div>
```

Để tránh truyền các `props` không phải DOM tới các components. Destructuring làm cho việc này trở nên dễ dàng bởi vì bạn có thể tạo `props` object mới  **không bao gồm** các `props` đã được chỉ định.


## conditional rendering

Bạn không thể sử dụng các điều kiện if/else thông thường bên trọng định nghĩa của component. Toán tử điều kiện [conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) là cách làm phù hợp.

`if`

```js
{condition && <span>Render khi `true`</span> }
```

`unless`

```js
{condition || <span>Render khi `false`</span> }
```

`if-else` (Ít code, chỉ 1 dòng)

```js
{condition
  ? <span>Render khi `true`</span>
  : <span>Render khi `false`</span>
}
```

`if-else` (Nhiều code, nhiều dòng)

```js
{condition ? (
  <span>
    Rendered when `truthy`
  </span>
) : (
  <span>
    Rendered when `falsey`
  </span>
)}
```


## Children types

React có thể render `children` thuộc nhiều types. Trong hầu hết các trường hợp là một `array` hoặc một `string`.

`string`

```js
<div>
  Hello World!
</div>
```

`array`

```js
<div>
  {["Hello ", <span>World</span>, "!"]}
</div>
```

Functions cũng có thể sử dụng như children. Tuy nhiên, nó đòi hỏi việc kết hợp với parent component phải hiệu quả.

`function`

```js
<div>
  {(() => { return "hello world!"})()}
</div>
```


## Children dạng array

Cung cấp một array như `children` là rất phổ biết. Nó là cách các list được render trong React.

Chúng ta sử dụng `map()` để tạo một mảng React Elements cho mỗi giá trị trong mảng.

```js
<ul>
  {["first", "second"].map((item) => (
    <li>{item}</li>
  ))}
</ul>
```

Điều đó tương đương với việc cung cấp một `array` thông thường.

```js
<ul>
  {[
    <li>first</li>,
    <li>second</li>,
  ]}
</ul>
```

Pattern này có thể kết hợp với destructuring, JSX Spread Attributes, và các components khác.

```js
<ul>
  {arrayOfMessageObjects.map(({ id, ...message }) =>
    <Message key={id} {...message} />
  )}
</ul>
```


## Children dạng function

Sử dụng function như là `children` vốn không hữu ích lắm.

```js
<div>{() => { return "hello world!"}()}</div>
```

Tuy nhiên, nó có thể được sử dụng trong một số components trong một số trường hợp đặc biệt. Kỹ thuật này thường được gọi là `render callbacks`.

Đây là một kỹ thuật mãnh mẽ được sử dụng bởi các thư viện [ReactMotion](https://github.com/chenglou/react-motion). Khi được áp dụng, rendering logic có thể được chứa trong owner component, thay vì được được uỷ quyền.

Xem `Render callbacks` trong bài viết này để biết thêm.

## Render callback

Đây là một component sử dụng một Render callback. Nó không hữu ích, nhưng đó là một minh hoạ để bắt đầu

```js
const Width = ({ children }) => children(500)
```

Component gọi `children` như một function, với một số arguments. Ở đây chúng ta truyền vào `500`.

Để sử dụng component này, chúng ta cần truyền vào nó một `children` kiểu function.

```js
<Width>
  {width => <div>window is {width}</div>}
</Width>
```

Chúng ta sẽ nhận được output.

```js
<div>window is 500</div>
```

Với thiết lập này, chúng ta có thể sử dụng `width` này để  đưa ra quyết định render.

```js
<Width>
  {width =>
    width > 600
      ? <div>min-width đáp ứng yêu cầu!</div>
      : null
  }
</Width>
```

Nếu chúng ta có kế hoạch sử dụng condition này nhiều lần, Chúng ta có thể định nghĩa các components khác để gói gọn những logic được tái sử dụng.

```js
const MinWidth = ({ width: minWidth, children }) =>
  <Width>
    {width =>
      width > minWidth
        ? children
        : null
    }
  </Width>
```

Rõ ràng là một static `Width` component là  không có ý nghĩa lắm nhưng một component theo dõi sự thay đổi kích thước của màn hình đôi khi cũng được sử dụng. Đây là ví dụ:

```js
class WindowWidth extends React.Component {
  constructor() {
    super()
    this.state = { width: 0 }
  }

  componentDidMount() {
    this.setState(
      {width: window.innerWidth},
      window.addEventListener(
        "resize",
        ({ target }) =>
          this.setState({width: target.innerWidth})
      )
    )
  }

  render() {
    return this.props.children(this.state.width)
  }
}
```

## Phần 2
Bạn có thể đọc phần 2 của loạt bài viết React patterns tại đây: [React patterns - Phần 2](https://viblo.asia/p/react-patterns-phan-2-gGJ59WJxZX2).