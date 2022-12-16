Trở lại với serial `tìm hiểu về vòng đời của React 16+ component`, phần này chúng ta sẽ lần lượt tìm hiểu về giai đoạn `updating` (re-render).
Ở phần trước, chúng ta đã biết *vòng đời của 1 component là gì?* và các giai đoạn của nó?. Bạn nào chưa đọc thì xem [phần 1](https://viblo.asia/p/tim-hieu-vong-doi-cua-react-16-component-phan-1-bWrZn6rrZxw) trước nhé!

### The updating

Sau khi component được mount trên browser, nếu `props` hay `state` của nó thay đổi, hoặc lúc ta gọi `forceUpdate`, lúc này component sẽ được vẽ lại (re-rendered), hay nói cách khác, component được update, lúc này component chuyển qua giai đoạn `updating`.

Sau đây là những hàm được gọi trong quá trình `updating`?

#### 1. static getDerivedStateFromProps()

Bạn có thấy hàm này quen không? Vâng, chúng ta đã tìm hiểu nó ở phần 1, và tiếp tục, đây là hàm đầu tiên được gọi trong quá trình `updating`. Mình không giải thích thêm ở đây, đọc phần trước để hiểu nhé!

#### 2. shouldComponentUpdate()

Ngay sau khi hàm  `static getDerivedStateFromProps`  được gọi, hàm  `shouldComponentUpdate`  sẽ được réo tên.

Mặc định thì component sẽ được re-render khi `props` hoặc `state` thay đổi, nhưng có lúc nào bạn nghĩ sẽ không cho nó update không? Đó chính là lúc bạn cần đến hàm này.

![](https://cdn-images-1.medium.com/max/800/1*xpOue2D_CdBdQL2-MmoD8Q.png)

Ở hàm này bạn sẽ trả về một giá trị boolean — `true`  hoặc  `false`, nếu `true` thì component sẽ render (mặc định sẽ return `true`), ngược lại nếu `false` thì sẽ ngăn quá trình re-render.

Thật sự thì component sẽ re-render nếu component cha của nó được re-render dù cho `state` hay `props` của component con có thay đổi hay không. Vậy để xử lý trường hợp này, React đã giới thiệu [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) được dùng trong trường hợp bạn không muốn component con re-render nếu  `state` hoặc  `props`  của nó không thay đổi.

#### 3. render()

Sau khi gọi  `shouldComponentUpdate`,  `render`  là hàm tiếp theo được gọi để thực hiện việc re-render - tất nhiên là nó phải phụ thuộc vào kết quả trả về của hàm `shouldComponentUpdate`.

#### 4. getSnapshotBeforeUpdate()

Hàm tiếp theo trong quá trình `updating` là `getSnapshotBeforeUpdate`.

Hàm này mới được React16+ thêm vào. Hơi khó để giải thích nhưng mình sẽ cố :cry: Có thể mình sẽ ít dùng hàm này, nhưng nó được dùng trong 1 số trường hợp nhất định. Đặc biệt là khi chúng ta muốn lấy thông tin DOM element và cập nhật chúng sau khi `updating` xong.

Có thể bạn thấy vô cmn lý là hàm này được gọi sau khi `render`, thì lúc truy cập DOM element ở hàm này thì giá trị của DOM là giá trị sau khi `updating`. Nhưng không, đây là **1 chú ý quan trọng**, giá trị DOM được truy cập ở hàm `getSnapshotBeforeUpdate` sẽ là giá trị trước khi được `update`, mặc dù nó được gọi sau hàm `render`.

>Quá trình DOM `updating` được xảy ra bất đồng bộ (asynchronus) nhưng chắc chắn 1 điều là hàm `getSnapshotBeforeUpdate` sẽ được gọi trước khi DOM được updated.

Code thử xem nào, nói cm gì cho dài dòng. Chắc hẳn bạn đã từng sử dụng 1 ứng dụng chat bất kỳ, và khi có tin nhắn mới thì nó sẽ scroll xuống tin nhắn mới dưới cùng, đúng không? Hãy thử implement `Chat` list và handle tính năng trên nhé!

![](https://cdn-images-1.medium.com/max/800/1*mjRyC6lSmhq38vEhgYThJw.png)

Thêm `Chats`  component vào `App`:

```javascript
<ul className="chat-thread">
	<Chats chatList={this.state.chatList} />
</ul>
```

`Chats` component nhận vào 1 mảng các tin nhắn và hiển thị:

```js
class Chats extends Component {
	render() {
		return (
			<React.Fragment>
				{this.props.chatList.map((chat, i) => (
					<li key={i} className="chat-bubble">
						{chat}
					</li>
				))}
			</React.Fragment>
		);
	}
}
```

Khi click button `Add Chat` thì sẽ thêm *Hello!!!* vào mảng `chatList`.

```js
_handleAddChat = () => {
	this.setState(prevState => ({
		chatList: [...prevState.chatList, "Hello!!!"]
	}));
};
```

![](https://cdn-images-1.medium.com/max/800/1*B4cllvTOFasbw6pasGk4AQ.png)

Kết quả như sau:

![](https://cdn-images-1.medium.com/max/800/1*t7cLFKAjuAIstmDwZdSIYQ.gif)

Hẳn bạn đã nhận ra vấn đề? `Chats` component không tự động scroll xuống tin nhắn mới. Cái mà chúng ta muốn là kết quả dưới đây:

![](https://cdn-images-1.medium.com/max/800/1*T8NI8_od1UIBJPbmsRVS_Q.gif)

Hãy xem hàm  `getSnapshotBeforeUpdate` sẽ giúp chúng ta giải quyết vấn đề này như thế nào?..

Đây là cú pháp của hàm `getSnapshotBeforeUpdate`, nó nhận vào 2 tham số, `prevProps` và `prevState`:

```js
getSnapshotBeforeUpdate(prevProps, prevState) {   }
```

Và nhận kết quả trả về là một giá trị nào đó hoặc `null`:

```js
getSnapshotBeforeUpdate(prevProps, prevState) {
	return value || null // value ở đây là một giá trị nào đó
}
```

Tất nhiên là hàm nào cũng có mục đích của nó, và hàm này không tự hoạt động 1 cách riêng lẽ, `value` trả về ở đây sẽ được truyền vào 1 hàm lifecycle khác là `componentDidUpdate`, sẽ được mình trình bày bên dưới. Tạm gác vấn đề `Chats` list ở đây để xem `componentDidUpdate` là cái khỉ gì đã nhé.

#### 5. componentDidUpdate()

Như đã tiết lộ, hàm này sẽ được gọi sau `getSnapshotBeforeUpdate`. Và tham số của nó cũng giống như `getSnapshotBeforeUpdate`:

```js
componentDidUpdate(prevProps, prevState) { }
```

Chú lại xạo lol anh rồi, bên trên đã nói `value` từ `getSnapshotBeforeUpdate` được truyền xún hàm `componentDidUpdate` rồi còn gì. À đó là trường hợp phổ biến, còn nếu bạn dùng chung với `getSnapshotBeforeUpdate` thì có thêm tham số thứ ba (snapshot), chính là `value` được truyền đến:

```js
componentDidUpdate(prevProps, prevState, snapshot) { }
```
Đi vào giải quyết vấn đề thôi :smiley: Thêm code sau vào `App` component:

```js
getSnapshotBeforeUpdate(prevProps, prevState) {
	if (this.state.chatList.length > prevState.chatList.length) {
		const chatThreadRef = this.chatThreadRef.current;
		return chatThreadRef.scrollHeight - chatThreadRef.scrollTop;
	}
	return null;
}

componentDidUpdate(prevProps, prevState, snapshot) {
	if (snapshot !== null) {
		const chatThreadRef = this.chatThreadRef.current;
		chatThreadRef.scrollTop = chatThreadRef.scrollHeight - snapshot;
	}
}
```

Code dell hiểu cái quần què gì cả, giải thích xem nào:

Mình có sử dùng **React Ref** để xử lý với DOM, bạn có thể tìm hiểu tại [đây](https://reactjs.org/docs/refs-and-the-dom.html). Ở đây, DOM element mình muốn xử lý là thẻ `ul` bao bọc `Chats` list component:

```js
<ul className="chat-thread" ref={this.chatThreadRef}>   ...</ul>
```

Mình chỉ muốn scroll khi có tin nhắn mới chứ không phải lúc nào cũng vậy, thế nên phải thêm điều kiện để kiểm tra có tin nhắn mới hay không?

```js
getSnapshotBeforeUpdate(prevProps, prevState) {
	if (this.state.chatList.length > prevState.chatList.length) {
		// write logic here
	}
}
```

Nếu có tin nhắn mới, `getSnapshotBeforeUpdate` sẽ trả về một `value` nào đó. Không thì trả về `null`:

```js
getSnapshotBeforeUpdate(prevProps, prevState) {
	if (this.state.chatList.length > prevState.chatList.length) {
		// write logic here
	}
	return null
}
```
Hình bên dưới mô tả về `scrollTop` và `scrollHeight` được dùng để tính toán cho scroll.

![](https://cdn-images-1.medium.com/max/800/1*iSwbToUuE4Cj1cE_s1Jf6A.png)

Ban đầu, [scrollHeight](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight)  sẽ là chiều cao của `Chats` panel — trước khi tin nhắn mới được thêm vào DOM, scrollTop sẽ = 0, và giá trị trả về của hàm `getSnapshotBeforeUpdate` sẽ là `chatThreadRef.scrollHeight - 0`.

Giá trị này sẽ được chuyển đến `componentDidUpdate`:

```js
componentDidUpdate(prevProps, prevState, snapshot) {
	if (snapshot !== null) {
		const chatThreadRef = this.chatThreadRef.current;
		chatThreadRef.scrollTop = chatThreadRef.scrollHeight - snapshot;
	}
}
```

Chúng ta sẽ tính toán lại [scrollTop](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop), dựa theo giá trị truyền vào: `chatThreadRef.scrollHeight - snapshot;`.

Hãy nhìn hình dưới đây để dể hình dung, giá trị `snapshot` chính là `scrollHeight` trước khi DOM updated (previous scrollHeight), còn `chatThreadRef.scollHeight` chính là `scrollHeight` sau khi DOM updated (updated scrollHeight), vì thế khoảng cách (difference) chính là giá trị chúng ta cần scroll.

![](https://cdn-images-1.medium.com/max/800/1*8uQmkLjLXpzbZQN8JJ71UQ.png)

Set lại `scrollTop` theo `difference`.

![](https://cdn-images-1.medium.com/max/800/1*k2dioTIozf78at5G_G4_jg.png)

Và những gì chúng ta mong đợi.

![](https://cdn-images-1.medium.com/max/800/1*3DDset-1uLpUeQfvALluZQ.png)

Nếu vẫn còn chưa hiểu thì bạn hãy comment bên dưới nhé. Phần 2 chắc phải dừng lại ở đây. Đón xem phần 3 cũng là phần cuối ở vài viết sau nhé. Chúng ta sẽ tìm hiểu về 2 quá trình còn lại của React component.

Chào thân ái và quyết thắng. Ghé [blog](https://duthaho.com) để đọc nhiều bài viết hơn!