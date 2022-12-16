# Render theo điều kiện
Nếu đang viết câu render theo điều kiện như bên dưới.
![](https://images.viblo.asia/e59b126d-a15d-48dd-8902-b732671cbfc6.png)

Cách viết ở trên có sẽ dễ rơi vào tình trạng mất kiểm soát khi có nhiều hơn 1 câu điều kiện rút gọn ở trước hàm render. Bạn phải mò mẫm lại các hàm bên trong để biết element nào sẽ được render.

Xem xét cách viết sau
![](https://images.viblo.asia/6f7d527e-5c6e-45c3-af28-546ab30ec8fd.png)
Nếu giá trị của condition là false, đoạn sau && sẽ ko được đếm xỉa.

# Truyền prop xuống các component children
Khi chúng ta cần truyền các prop xuống các component bên dưới, dùng kiểu destructuring object, không cần quan tâm đến tên chính xác truyền qua từng prop
```
const Details = ( { name, language } ) => (
	<div>
		<p>{ name } works with { language }</p>
	</div>
);

const Layout = ( { title, ...props } ) => (
	<div>
		<h1>{title}</h1>
		<Details {...props}/>
	</div>
);

const App = () => (
	<Layout
		title="I'm here to stay"
		language="Javascript"
		name="Alex"
	/>
);
```

# Provider
Nếu chúng ta muốn gửi data thông qua prop cho các component con, thí dụ như 15 component con bên dưới? Không dùng Redux, chúng ta có thể dùng React Context, pattern sử dụng như bên dưới.
```
class MousePositionProvider extends React.Component {
	constructor() {
		super();
		this.state = {};
		this.onMouseMove = this.onMouseMove.bind(this);
	}

	getChildContext() {
		return {
			posX: this.state.posX,
			posY: this.state.posY
		};
	}

	componentDidMount() {
		window.addEventListener("mousemove", this.onMouseMove);
	}

	onMouseMove(e) {
		this.setState({ posX: e.clientX, posY: e.clientY });
	}

	render() {
		return this.props.children;
	}
}

MousePositionProvider.childContextTypes = {
	posX: PropTypes.number,
	posY: PropTypes.number,
};

class MousePositionConsumer extends React.Component {
	return() {
		return (
			<div>Your position is ( {this.context.posX},{this.context.posY} )</div>
		)
	}
}

MousePositionConsumer.contextTypes = {
	posX: PropTypes.number,
	posY: PropTypes.number
}

<MousePositionProvider>
	<div>
		<MousePositionConsumer/>
		<MousePositionConsumer/>
	</div>
</MousePositionProvider>
```

# Higher Order Component
React đã bỏ React.createElement và mixins, HOCs là lựa chọn còn lại duy nhất khi bạn muốn sử dụng cùng 1 component với nhiều version khác nhau.
```
const withProps = (newProps) => ( WrappedComponent ) => {
	const ModifiedComponent = (ownProps) => (
		<WrappedComponent {...ownProps} {...newProps} />
	);

	return ModifiedComponent;
}

const Details = ({ name, title, language }) => (
	<div>
		<h1> {title} </h1>
		<p>{name} works with {language}</p>
	</div>
)

const newProps = { name: "An" };
const ModifiedDetails = withProps(newProps)(Details);

const App = () => (
	<ModifiedDetails
		title="I'm here to stay"
		language="Javascript”
	/>
)
```
Nếu bạn quá thích HOC, có thể tham khảo để dùng thêm thư viện này https://github.com/acdlite/recompose

# Server-side rendering để tối ưu SEO
Với các ứng dụng Single Page App, có 2 issue thường được đề cập.

Load lần đầu, javascript không được cache. Và nếu file javascript ban đầu quá lớn thì sẽ ảnh hưởng tới tốc độ load (lazy load sẽ giải quyết vấn đề này)
Vì javascript sẽ đảm nhiệm render ở client, các con crawler của search engine sẽ không thể đọc được nội dung trang.
Chúng ta giải quyết các issue này bằng Server Side Rendering. Tuy nhiên chi phí phát triển sẽ tăng lên bởi chúng ta buộc phải mua server chạy Node/Express.

Trong trường hợp bạn chỉ quan tâm tới Server Rendering vì SEO, thì google giờ đây đã cập nhập con crawler của nó để đọc được nội dung file javascript, Google đã phát triển nó từ năm 2016 và giờ đây thuật toán đã chạy hết sức trơn tru.

Trường hợp bạn quan tâm tới một số lợi ích khác của SSR như cache file, thì xài Next.js luôn chứ đừng ngồi mò config thủ công mất thời gian công sức.

# Inline style và CSS Import
React khuyến khích chúng ta nhìn ứng dụng trên góc độ các component, stylesheet được khuyến khích "dính" chặt với từng component.

Có rất nhiều cách được giới thiệu để viết CSS chung trong file JS. Kiểu inline style cũng được dùng rộng rãi trong React Native.
```
const divStyle = {
	margin: '40px',
	border: '5px solid pink'
};

const pStyle = {
	fontSize: '15px',
	textAlign: 'center'
};

const TextBox = () => (
	<div style={divStyle}>
		<p style={pStyle}>Yeah!</p>
	</div>
)
```

Chúng ta không còn phải import CSS, tuy nhiên bạn có bao giờ nghĩ đến chuyện maintain và đọc lại những đoạn code CSS như thế ?. Bạn cũng không có media queries nữa, pseudo class và pseudo element cũng không còn.

Nếu cảm thấy mệt với kiểu inline style, bạn xem thử cách sau, CSS-in-JS, hay còn gọi styled-component.
```
const Text = styled.div`
  color: white,
  background: black
`
<Text>This is CSS-in-JS</Text>
```

Lúc render thì nó sẽ thành như vầy

```
<style>
.hash234dd2 {
  background-color: black;
  color: white;
}
</style>

<p class="hash234dd3">This is CSS-in-JS</p>
```

Khác với kiểu render inline, nó vẫn render thẻ style và CSS

Các Pattern để viết trong React có thể nói phát triển không ngừng, bạn thấy cái nào tiện và hay thì dùng, không thì tự tạo ra một kiểu riêng của mình cũng là ý hay.