Trong bài chia sẻ lần trước mình có nói về một hooks là [useMemo](https://viblo.asia/p/how-to-usememo-in-react-L4x5xvYaZBM).
Hôm nay mình sẽ giới thiệu thêm cho các bạn về một chút Advance Hooks trong React. Chúng mình cùng đi tìm hiểu nhé.

##### useState

```javascript
import React, {useState} form 'react';

function Count() {
	const [count, setCount] = useState(0);

	return(
		<div>
			<p>Click {count}</>
			<button onClick={() => setCount(count + 1)}>
				Click me
			</button>
		<div>
	)
}
```

Trên đây là một ví dụ, mình dùng một hook của react là `useState`. Hook phải được gọi bên trong function component. `useState` trả về một cặp dữ liệu, tham số thứ nhất là một local state được khai báo khi tạo một hook, tham số thứ 2 là một handler cho phép bạn thay đổi được giá trị của local state nó tương tự như  `this.state` được dùng ở class.Chúng ta có thể khai báo nhiều state hook cùng một lúc.

Điều quan trọng chú ý là khi `state` thay đổi thì sẽ `re-render` lại component.

##### useEffect
```javascript
import React, {useState, useEffect} form 'react';

function Count() {
	const [count, setCount] = useState(0);

	// giống như componentDidMount và componentDidUpdate
	useEffect(() => {
		console.log(1);
	}, []); // dependency

	return(
		<div>
			<p>Click {count}</>
			<button onClick={() => setCount(count + 1)}>
				Click me
			</button>
		<div>
	)
}
```
State này là sự kết hợp của 3 phương thức `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` kết hợp lại với nhau

`useEffect` cho phép chúng ta xử lý logic và được gọi mỗi khi có sự thay đổi.`useEffect` dựa vào `dependency` để quyết định có chạy hay không, khi bạn không truyền dependency vào thì nó sẽ chạy luôn khi component render.Hook này rất hay, khi chúng ta muốn cho func có chạy hay không.

##### Các quy tắc sử dụng Hooks
Hooks là các function javascript, có những quy luật bạn phait tuân theo khi sử dụng chúng.

* Chỉ sử dụng Hook ở trên cùng. Không gọi hook trong các vòng lặp, điều kiện hay các func lồng nhau.
* Chỉ gọi Hook ở trong function component hoặc từ custom Hook

Bạn có thể lên npm tải plugin [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) nó sẽ tự động kiểm tra xem bạn đã dùng đúng chưa và đưa ra cảnh báo.

Ok. Chắc chúng ta dừng ở đây nhỉ, để các bạn đọc hiểu thêm về hai hook này trước, bài sau mình sẽ giới thiệu thêm cho các bạn những hook hay ở bài tiếp theo. Mình khuyết khích các bạn đọc và tìm hiểu thêm trên [doc](https://reactjs.org/docs/hooks-intro.html) của reactjs.

##### Tổng kết
Qua vài những chia sẻ nhỏ ở trên của mình sẽ giúp được các bạn hiểu thêm về hook. Mình cảm ơn các bạn đã đọc bài viết của mình, nếu mình có nhầm chỗ nào mong các bạn góp ý giúp mình ạ
:grinning::grinning: