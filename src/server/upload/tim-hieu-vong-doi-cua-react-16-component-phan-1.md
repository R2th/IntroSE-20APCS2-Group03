Vòng đời trong **React** là gì? Có gì *hot* trong phiên bản **React16+**? Bạn có hiểu chúng thật sự là gì và sử dụng chúng như thế nào cho hợp lý không?

>Đã có nhiều bài viết về *vòng đời của React* nhưng đa số chưa được **update** với phiên bản **React** mới nhất

Nếu bạn có cùng các câu hỏi trên, cùng đọc tiếp bài viết nhé!

![](https://cdn-images-1.medium.com/max/1200/1*V41N0IZaN-X9kVYm_4X4iA@2x.png)

### Vòng đời của React là gì?

Giống như con người chúng ta, từ khi sinh ra đến lúc *nó đi rồi ông Giáo ạ* đều trải qua các giai đoạn: sơ sinh -> trưởng thành -> già -> chết. **React Component** cũng tương tự như thế, cũng trải qua nhiều giai đoạn khác nhau kể từ khi được tạo ra và khi biến mất.

Chúng ta tìm hiểu kỹ hơn ở ví dụ sau nhé!

`HelloWorld` component được tạo ra:

```javascript
class HelloWorld extends React.Component {
	render() {
		return <h1> Hello World </h1>
	}
}
```

Khi nó được vẽ (**render**) ra màn hình (**browser**):

![](https://cdn-images-1.medium.com/max/800/1*d3XwZCmQVc9EdCCEesDy4A.png)

Bất kỳ một component nào từ đơn giản đến phức tạp, từ khi được tạo ra đến khi render trên browser đều trải qua **3** trạng thái sau: **mounting, updating and unmounting.**

**mounting**  được ví như giai đoạn **sơ sinh** của một đứa bé. Đây là giai đoạn các **component** được tạo ra từ code của bạn và được chèn vào trong browser DOM.

Con người ta ai cũng phải **trưởng thành**. Đã đến lúc gọi tên anh chàng có tên  **updating**.

Hãy liên tưởng chuyện **Thánh Gióng** đến **React component** lifecycle, 3 năm *không ăn, không uống* nên *không lớn*, nếu không có giai đoạn **updating** thì component sẽ không bao giờ được update và mãi giữ nguyên trạng thái ban đầu lúc mouting cho đến khi mất đi.

Nhờ sự xuất hiện của sứ giả nên **Thánh Gióng** đã ăn liền một lúc *3 nong cơm*, cao to đến 10 trượng. Vậy **React component** dựa vào sự kiện gì để thực hiện quá trình **updating**? Đó là khi chúng ta thay đổi `state` và `props` của nó, hoặc khi `forceUpdate` được gọi.

Giai đoạn cuối cùng trong vòng đời của component là **unmounting.**

Ở giai đoạn này, component coi như **chết**. Nó bị biến mất khỏi thế giới của nó - *browser DOM*.

Chúng ta chỉ có 3 giai đoạn vậy thôi, nhưng để hiểu từng giai đoạn nó hoạt động như thế nào thì đọc tiếp nhé!

À khoan, có gì đó sai sai. Đó là ở các phiên bản trước, còn **React16+** component còn có thêm 1 giai đoạn nữa, đó chính là khi code của bạn có vấn đề, gây ra lỗi trong các giai đoạn trên. Lúc này component sẽ đi vào giai đoạn **error handling**. Giống như là bạn đi phẫu thuật thẫm mĩ thất bại và phải đi lại vậy :cry:.

Tổng hợp lại nhé.

1.  **Mounting** — giai đoạn component được tạo ra và chèn vào browser DOM
2.  **Updating** — giai đoạn component được *phát triển*
3.  **Unmounting** — giai đoạn component được xóa khỏi browser DOM
4.  **Error Handling** — *bug* đang ở đâu đấy anh :smile:

![](https://cdn-images-1.medium.com/max/800/1*rubjO6t-iBoNjS_K1rOkzQ.png)

**Note**: Một component có thể trong quá trình render sẽ không qua tất cả các vòng đời, có thể nó được mounted và unmounted— chứ không trải qua quá trình update và xử lý lỗi, như **Thánh Gióng** không lớn trong 3 năm đó nhé.

### Các hàm (method) được gọi trong mỗi giai đoạn là gì?

![](https://cdn-images-1.medium.com/max/1200/1*mn-ZLTS2qc1zhRZiZbL_gw.png)

Ở phần trước chúng ta đã tìm hiểu 4 giai đoạn trong vòng đời của một React component. Giờ chúng ta cùng tìm hiểu về các hàm sẽ được gọi trong mỗi giai đoạn nhé. Hay còn được gọi là **component lifecycle methods**

### The mounting

Sau đây là những hàm được gọi trong quá trình `mounting`, thứ tự gọi từ trên xuống dưới nhé.

#### 1. constructor()

>Đây là hàm đầu tiên được gọi khi component được tạo ra. Nó được gọi trước khi component được chèn vào DOM.

Thông thường, trong `constructor` chúng ta thường dùng để init `state`, bind các hàm xử lý trong component. Đối với ES6 và ES7 thì chúng ta có thể không còn dùng `constructor` nữa vì có thể dùng `static properties` cho state và `arrow function` cho hàm của component.

Ví dụ:

```javascript
const MyComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			points: 0
		}
		this.handlePoints = this.handlePoints.bind(this)
	}
}
```

>**Đừng**  xử lý side-effects hoặc dùng event handlers ở constructor.

#### 2. static getDerivedStateFromProps()

Đầu tiên chúng ta cần tìm hiểu hàm này được dùng như thế nào.

Ví dụ:

```javascript
const MyComponent extends React.Component {
	static getDerivedStateFromProps(props, state) {
		//do stuff here
	}
}
```
Nó nhận 2 tham số truyền vào là  `props`  và  `state`.

Và trả về 1 object chính là `state` mới của component muốn update:

```javascript
static getDerivedStateFromProps(props, state) {
	return {
		points: 200 // update state with this
	}
}
```

Hoặc trả về `null` nếu chúng ta không muốn update `state`:

```javascript
static getDerivedStateFromProps(props, state) {
	return null
}
```

Đây là hàm ít được sử dụng nhưng chúng lại cực kỳ quan trong trong các trường hợp cụ thể.

>Đây là hàm được gọi **trước** khi component được hiển thị trên DOM trong quá trình **mounting**.

Dưới đây là một ví dụ đơn giản để hiển thị số điểm của 1 đội bóng, *score* được lưu trong *state* của component:

```javascript
class App extends Component {
	state = {
		points: 10
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						You've scored {this.state.points} points.
					</p>
				</header>
			</div>
		);
	}
}
```

Kết quả:

![](https://cdn-images-1.medium.com/max/800/1*5w0IXEgr6Cea1c8v9cKiJg.png)

Giờ mình sẽ thử dùng hàm  `static getDerivedStateFromProps`, cùng dự đoán kết quả nhé?

```javascript
class App extends Component {
	state = {
		points: 10
	}

	static getDerivedStateFromProps(props, state) {
		return {
			points: 1000
		}
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						You've scored {this.state.points} points.
					</p>
				</header>
			</div>
		);
	}
}
```

Bạn có đoán được kết quả là gì không? Cùng nhớ lại khái niệm ở trên, hàm `getDerivedStateFromProps` được gọi trước khi component được hiển thị trên DOM. Vì vậy, `state` của component đã được update trước khi được hiển thị.

Và kết quả:

![](https://cdn-images-1.medium.com/max/800/1*Lgd3A9O6rJoI-kStrY4XPA.png)

Trên là ví dụ khá đơn giản để chúng ta có thể hiểu được cách sử dùng `getDerivedStateFromProps`, nhưng trong thực tế, không phải lúc nào chúng ta cũng dùng hàm này để update state, mà chỉ dùng nó ở các trường hợp nhất định.

Nói nhiều quá, vậy thì khi nào nên dùng  `static getDerivedStateFromProps`?

Không nói nhiều nữa, cái tên  `getDerivedStateFromProps`  nói lên tất cả, “_Get Derived State From Props_”.

>Điều đó có nghĩa là, chúng ta sử dụng hàm này trong trường hợp muốn update lại `state` của component cho phù hợp với sự thay đổi của `props`.

![](https://cdn-images-1.medium.com/max/800/1*5wnVTjwxxOrtd15-21FzZA.png)

Để có thể hiểu rõ hơn và tránh được những lỗi phổ biến khi dùng, bạn nên đọc [bài viết này](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#common-bugs-when-using-derived-state)  nhé.

#### 3. Render

Sau khi hàm `static getDerivedStateFromProps`  được gọi, hàm tiếp theo được gọi là  `render`.

```javascript
class MyComponent extends React.Component {
	// render is the only required method for a class component
	render() {
		return <h1> Hurray! </h1>
	}
}
```

Hàm `render` là nơi chúng ta return những **React element**, và những element này sau đó được hiển thị trên browser.

Bạn có thể trả về `string`

```javascript
class MyComponent extends React.Component {
	render() {
		return "Hurray"
	}
}
```

Hay `array`

```javascript
class MyComponent extends React.Component {
	render() {
		return [
			<div key="1">Hello</div>,
			<div key="2" >World</div>
		];
	}
}
```

Hoặc React `fragment`

```javascript
class MyComponent extends React.Component {
	render() {
		return <React.Fragment>
			<div>Hello</div>
			<div>World</div>
		</React.Fragment>
	}
}
```

Trong trường hợp bạn không muốn render bất kỳ cái gì trên browser, bạn có return `boolean` hoặc `null`

```javascript
class MyComponent extends React.Component {
	render() {
		return null
	}
}

class MyComponent extends React.Component {
	// Kết quả là gì???
	render() {
		return (2 + 2 === 5) && <div>Hello World</div>;
	}
}
```

Trong **React16+** bạn có thể return  [portal](https://reactjs.org/docs/portals.html "React Portals"), chúng ta sẽ tìm hiểu ở các bài viết sau nhé:

```javascript
class MyComponent extends React.Component {
	render() {
		return createPortal(this.props.children, document.querySelector("body"));
	}
}
```

>`render` nên là **pure function**, chúng ta không được gọi  `setState` hoặc tương tác với **external APIs** ở đây.

#### 4. componentDidMount()

Sau khi hàm `render` được gọi, component được hiển thị trên browser, và hàm `componentDidMount` được gọi sau đó.

Vì vậy, đây là nơi dùng để gọi các xử lý thao tác với DOM, gọi đến external APIs.

Ví dụ, update nội dung của modal:

```javascript
class ModalContent extends React.Component {
	el = document.createElement("section");

	componentDidMount() {
		document.querySelector("body).appendChild(this.el);
	}
}
```

Gọi external api:

```javascript
componentDidMount() {
	this.fetchListOfTweets()
}
```

Xử lý sự kiện:

```javascript
componentDidMount() {
	el.addEventListener()
}
```

**Note**: Sau khi `add event listener` thì chúng ta phải `remove` khi component bị **remove** khỏi browser. Chúng ta sẽ tìm hiểu sau ở hàm `componentWillUnmount`.

Chúng ta đã kết thúc quá trình **mouting**. Hẹn gặp lại các bạn ở phần 2, cùng tìm hiểu về các hàm trong quá trình **updating** của React component nhé!

Ghé thăm [blog](http://duthaho.com/blogs/react-component-lifecycle) để ủng hộ và cập nhật bài viết mới nhất của mình nha!