# 1. The Component Lifecycle

Cho đến nay, khái niệm quan trọng nhất trong react là hiểu về vòng đời component. Vòng đời component chính xác như những gì nó nghe: nó chi tiết cuộc sống của một thành phần.  Dưới đây là hình ảnh minh họa cho một vòng đời của component:

![](https://images.viblo.asia/047cc2ca-7c4d-4992-a540-ec46704aff1a.png)

Mỗi hình chữ nhật nằm ngang có màu đại diện cho một method vòng đời (ngoại trừ bản cập nhật DOM React và DOM refs). Các cột đại diện cho các giai đoạn khác nhau trong component life.

## Mounting

Vì các thành phần class-based là các lớp, do đó có tên, nên phương thức đầu tiên chạy là phương thức constructor. Thông thường, hàm tạo là nơi bạn sẽ khởi tạo trạng thái component.

Tiếp theo, component chạy getDerivingStateFromProps. Ta sẽ bỏ qua method này vì nó hạn chế sử dụng.

Bây giờ chúng ta đến với method "render" trả về JSX của bạn. Bây giờ React đã "mounts" vào trên DOM.

Cuối cùng, moethd componentDidMount chạy. Đây là nơi bạn sẽ thực hiện bất kỳ cuộc gọi không đồng bộ nào tới databases hoặc trực tiếp thao tác với DOM nếu bạn cần. Cú như vậy, component được sinh ra.

Và thứ tự cụ thể của nó như sau:

constructor() => static getDerivedStateFromProps() => render => componentDidMount()

## Updating

Các phương thức này sẽ được gọi khi có sự thay đổi của state hoặc props. Giống như mouting getDerivedStateFromProps được gọi (nhưng không có constructor).

1. static getDerivedStateFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()
5. componentDidUpdate()

## Unmounting

Quá trình unmounting của component xảy ra khi component bị removed từ một DOM, React chạy componentWillUnmount. Đây là method duy nhất được sử dụng trong quá trình này.  Bạn nên sử dụng method này để dọn sạch mọi kết nối đang mở như WebSockets hoặc intervals.

## Other Lifecycle Methods

*forceUpdate* là một method trực tiếp gây ra re-render. Mặc dù có một vài trường hợp sử dụng nó, nhưng nó thường nên tránh.

*getDerivedStateFromError* là một method của vòng đời mà trực tiếp là một phần của vòng đời component. Trong trường hợp có lỗi trong một component, getDerivingStateFromError chạy và bạn có thể cập nhật state để phản ánh rằng đã xảy ra lỗi. Method này được sử dụng rất nhiều.

Đoạn mã CodePen dưới đây cho thấy các bước trong giai đoạn mounting:

```
class App extend React.Component {
	constructor(props) {
		super(props)
		console.log('Hello from constructor')
	}

	static getDerivedStateFromProps() {
		console.log('Hello from after mounting')
	}

	render() {
		console.log('Hello from render')

		return (
			<div> Hello! </div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementByIdc
);
```

# 2. Higher-Order Components
 Higher-order components(HOC), được định nghĩa trong tài liệu như sau:

*"A higher-order component is a function that takes a component and returns a new component."*

Một higher-order component là một một function nhận vào một component như một argument và trả về "phiên bản mở rộng" của component đó.

```
(InputComponent) => {
    return ExtendedComponent
}

// hoặc
InputComponent => ExtendedComponent
```

ExtendedComponent là một component container, nó trả về InputComponent với một số extend.

# 3. React State and setState()

Hầu hết các bạn có thể đã sử dụng state React. Nhưng điều quan trọng là phải hiểu rằng khi có một state thay đổi, React sẽ kích hoạt re-render trên component đó.

Bây giờ hãy để nói về cách chúng ta thay đổi state. Cách duy nhất bạn nên thay đổi state là thông qua phương thức setState. Phương thức này lấy một object và hợp nhất nó vào state hiện tại. 

React không cập nhật state một cách đồng bộ là do: React cố tình chờ khi tất cả Component gọi tới hàm setState() trước khi bắt đầu re-render, điều này làm tăng hiệu suất, tránh việc re-render không cần thiết.

Dưới đây là đoạn mã mô tả về state và setState:

```
class App extend React.Component {
	constructor(props) {
		super(props)
		this.state = {
			counter: 0
		}
	}

	onClick = () => {
		this.setState({ counter: this.state.counter + 1},
			() => console.log('callback: ' + this.state.counter)
		)
		console.log('after: ' + this.state.counter)
	}

	render() {
		return (
			<button onClick={this.onClick}> Click me </button>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
```

Ví dụ trên, cả hai hàm setState đều sử dụng trực tiếp this.state.counter  và như chúng ta đã biết trước đó, this.state.counter  vẫn sẽ bằng 0 sau khi setState đầu tiên được gọi. Do đó, chúng ta nhận được 1 thay vì 2 vì cả hai hàm setState đều đặt bộ đếm thành 1.
# 4. React Context

   React context chỉ global state cho các component. React context App cho phép bạn tạo các đối tượng bối cảnh toàn cầu có thể được cung cấp cho bất kỳ component nào bạn tạo. Điều này cho phép bạn chia sẻ dữ liệu mà không cần phải truyền props down toàn bộ cây DOM.
   
 Có 2 bước để setup React context trong ứng dụng của chúng ta:

1. Setup một Context Provider và định nghĩa các dữ liệu bạn cần chứa trong đó.

2. Sử dụng một Context Consumer bất cứ khi nào bạn cần sử dụng dữ liệu trong store.

Chúng ta có thể khởi tạo một Context Provider thông qua việc sử dụng hàm React.createContext. Chúng ta sẽ tạm gọi context này là AppContext:
```
const ContextObject = React.createContext({ foo: "bar" })
```

AppContext sẽ được sử dụng để tạo ra một context provider component. Provider này sẽ chứa dữ liệu chúng ta cần trong state của nó và nó sẽ gói toàn bộ nội dung của component. Sau khi đã setup xong provider, chúng ta có thể truy xuất data bằng cách sử dụng Context.

# 5. Stay up to date with React!

Khái niệm cuối cùng này có lẽ là dễ hiểu nhất. Nó chỉ đơn giản là theo kịp các bản phát hành mới nhất của React. React đã thực hiện một số thay đổi nghiêm trọng gần đây và nó sẽ chỉ tiếp tục thay đổi và phát triển.

Tài liệu tham khảo: https://medium.freecodecamp.org/these-are-the-concepts-you-should-know-in-react-js-after-you-learn-the-basics-ee1d2f4b8030