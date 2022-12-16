Có thể chúng ta đã quá quen với việc sử dụng state trong React nhưng liệu đã thực thự hiểu về cách `state` sinh ra và hoạt động trong ứng dụng như thế nào ? 

Trong bài này tôi sẽ giới thiệu với các bạn cách tương tác giữa state và components trong một ứng dụng ReactJs. 

### 1. Khởi tạo State mặc định

Bên trong Component constructor, khởi tạo `this.state`. 

Chúng ta sẽ cùng nhau tìm hiểu `state` thông qua ví dụ `BlogPostExcerpt` để có thể hiểu rõ hơn về state:

```
class BlogPostExcerpt extends Component {
  constructor(props) {
    super(props)
    this.state = { clicked: false }
  }

  render() {
    return (
      <div>
        <h1>Title</h1>
        <p>Description</p>
      </div>
    )
  }
}
```
`BlogPostExcerpt` đã được khởi tạo một `state` là `clicked`.

### 2. Tương tác với state

`state` `clicked` được truy cập bằng cách tham chiếu `this.state.clicked`:

```
class BlogPostExcerpt extends Component {
  constructor(props) {
    super(props)
    this.state = { clicked: false }
  }

  render() {
    return (
      <div>
        <h1>Title</h1>
        <p>Description</p>
        <p>Clicked: {this.state.clicked}</p>
      </div>
    )
  }
}
```

### 3. Thay đổi state
Một state sẽ không bao giờ thay đổi bằng cách sử dụng
```
this.state.clicked = true
```

Thay vào đó, bạn nên luôn luôn sử dụng `setState()`, truyền cho nó một đối tượng:

```
this.setState({ clicked: true })
```
Đối tượng có thể chứa một tạp hợp con hoặc nhiều tập con của `state`. Chỉ các thuộc tính truy cập mới bị thay đổi, các thuộc tính không được đề cập sẽ giữ nguyên trạng thái của nó.

### 4. Tại sao luôn nên sử dụng setState()

Lý do là sử dụng phương pháp này, React biết rằng trạng thái đã thay đổi. Sau đó, nó sẽ bắt đầu chuỗi các sự kiện sẽ dẫn đến Component được kết xuất lại, cùng với bất kỳ cập nhật DOM nào.

### 5. Luồng dữ liệu đơn hướng

Mỗi `state` luôn được sở hữu bởi một `Component`. Bất kì dữ liệu nào bị ảnh hưởng bởi `state` này chỉ có thể ảnh hưởng tới các `Component` tương ứng: `con` của nó.

Thay đổi `state` trong một `Component` sẽ không ảnh hưởng tới component cha mẹ, hay anh chị em của nó mà chỉ ảnh hưởng tới các `Component` con của nó mà thôi.

Đây là lý do `state` thường được duy chuyển lên phía đầu của `Component`.

### 6. Di chuyển state lên đầu của component

Do quy tắc luồng dữ liệu đơn hướng, nếu hai thành phần cần chia sẻ `state`, `state` cần được di chuyển lên component `cha` của chúng.

Nhiều lần `component cha` gần nhất là nơi quản lý state nhưng đó không phải là 1 quy tắc bắt buộc.

`State` được truyền xuống các `component` thông qua `props`

```
class Converter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { currency: '€' }
  }

  render() {
    return (
      <div>
        <Display currency={this.state.currency} />
        <CurrencySwitcher currency={this.state.currency} />
      </div>
    )
  }
}
```

Giá trị của `state` có thể được thay đổi bởi `component` con bằng các truyền một hàm `mutating` xuống props. Cụ thể có thể xem ví dụ dưới đây:


```
class Converter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { currency: '€' }
  }

  handleChangeCurrency = event => {
    this.setState({ currency: this.state.currency === '€' ? '$' : '€' })
  }

  render() {
    return (
      <div>
        <Display currency={this.state.currency} />
        <CurrencySwitcher
          currency={this.state.currency}
          handleChangeCurrency={this.handleChangeCurrency}
        />
      </div>
    )
  }
}

const CurrencySwitcher = props => {
  return (
    <button onClick={props.handleChangeCurrency}>
      Current currency is {props.currency}. Change it!
    </button>
  )
}

const Display = props => {
  return <p>Current currency is {props.currency}.</p>
}
```