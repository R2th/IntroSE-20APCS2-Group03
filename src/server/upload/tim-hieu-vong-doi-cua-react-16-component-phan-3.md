Chúng ta cùng quay trở lại với serial `Tìm hiểu về vòng đời của React16+ Component`. Nội dung của serial:
 1. [Phần 1: Vòng đời của React16+ Component là gì? Các quá trình của 1 component? Và quá trình mounting](https://duthaho.com/blogs/react-component-lifecycle)
 2. [Phần 2: Quá trình updating](https://duthaho.com/blogs/react-component-lifecycle-2)
 3. Phần 3: Quá trình mounting và Handle Error <== *you are here*
 
 Trong bài viết hôm nay, chúng ta sẽ lần lượt tìm hiểu về quá trình `unmounting` và `xử lý lỗi` trong React16+ component như thế nào nhé?

### The unmounting

Cũng giống như 2 phần đầu tiên, chúng ta sẽ đi qua các hàm sẽ được gọi trong quá trình `unmounting`. Đây là quá trình đơn giản nhất của component. Ai cũng muốn chết dễ dàng và thoải mái đúng không :D. Và React component cũng vậy, quá trình này chỉ có 1 hàm được gọi.

#### componentWillUnmount()

Hàm `componentWillUnmount` được gọi ngay trước khi component bị `unmounted` và `destroyed` khỏi browser. Đây là nơi thích hợp nhất để chúng ta thực hiện các công việc dọn dẹp cho quá trình cấp phát trong lúc component mounting. Ví dụ như dọn dẹp timers, hủy bỏ request, hay xóa những event đã được tạo:

```js
componentDidMount() {
	timer = setInterval(this.count, 1000)	
	el.addEventListener()
}

componentWillUnmount() {
	timer && clearInterval(timer) 
	el.removeEventListener() 
}
```

### Xử lý lỗi

Mà đời không bao giờ là mơ, code thèn dell nào mà chẳng có khi gặp bug. Khi có lỗi nào đó không mong muốn xảy ra trong component của bạn, ở mode develop thì một màn hình đỏ lè xuất hiện, nó báo cho bạn biết lỗi ở đâu để rồi giải quyết.

Trong môi trường production thì bạn chịu khó bật developer mode của trình duyệt lên và nhìn log. Lúc đó component của bạn không thể hoạt động tiếp, hay nói cách khác, code của bạn bị crash, người dùng không thể làm gì tiếp theo ngoài việc chờ và f5 trình duyệt.

Chính vì thế, React16+ đã giới thiệu quá trình xử lý lỗi cho component, hay còn được gọi là `ErrorBoundary`, chúng ta cùng tìm hiểu handle error như thế nào?

Thực ra `ErrorBoundary` cũng chỉ là 1 component trong React mà thôi, sau đây là implement của nó:

```js
import React, { Component } from 'react';

class ErrorBoundary extends Component {  
	state = {};  
	render() {    
		return null;  
	}
}

export default ErrorBoundary;
```

#### static getDerivedStateFromError()

Khi một lỗi xảy ra trong component con/cháu/chắt..., thì hàm này sẽ được gọi, và tham số truyền vào hàm này chính là error đó.

Và cũng giống như hàm `static getDerivedStateFromProps`, giá trị trả về của hàm này sẽ update lại state cho component đó..

Tiếp theo sửa lại  `ErrorBoundary`  để dùng  hàm này:

```js
import React, { Component } from "react";

class ErrorBoundary extends Component {  
	state = {};  
	
	static getDerivedStateFromError(error) {    
		console.log(`Lỗi: ${error}`);    
		return { hasError: true };  
	}  
	render() {    
		return null;  
	}
}

export default ErrorBoundary;
```

Vậy từ giờ, nếu có lỗi nào xảy ra ở componet con/cháu... thì hàm `static getDerivedStateFromError` được gọi và log lỗi được in ra `console.error(error)`, sau đó tate được update theo object được trả về với `hasError: true`.

#### componentDidCatch()

Cũng giống như hàm `static getDerivedStateFromError`, hàm  `componentDidCatch`  cũng được gọi sau khi có lỗi xảy ra ở compoent con/cháu.... Tuy nhiên có sự khác nhau là ngoài tham số `error` thì hàm này còn nhận thêm 1 tham số nữa là `infor` của lỗi đó.

```js
componentDidCatch(error, info) {}
```

1 điểm khác biệt quan trọng nữa so với `getDerivedStateFromError`, là hàm  `componentDidCatch` cho phép chúng ta làm các hoạt động side-effects như là gửi thông tin lỗi đến các service khác để lưu lại chẳng hạn:

```js
componentDidCatch(error, info) {	
	sendLogExternalService(error, info) // this is allowed.
}
```

Sửa lại `ErrorBoundary` dùng hàm này:

```js
import React, { Component } from "react";

class ErrorBoundary extends Component {  
	state = { hasError: false };  
	
	static getDerivedStateFromError(error) {    
		console.log(`Lỗi: ${error}`);    
		return { hasError: true };  
	}  
	
	componentDidCatch(error, info) {    
		console.log(`Lỗi: ${error}`);    
		console.log(info);  
	}  

	render() {    
		return null  
	}
}

export default ErrorBoundary;
```

Giờ chúng ta đã hiểu các hàm dùng để handle error, qua khái niệm ở trên thì ta đã biết chúng chỉ được gọi khi **component con/cháu/chắt/...** xảy ra lỗi. Vậy muốn xử lý lỗi cho 1 component bất kỳ, chúng ta phải dùng `ErrorBoundary` để wrapper component đó lại.

Update tiếp `ErrorBoundary` cho hàm render:

```js
render() {    
	if (this.state.hasError) {      
		return <h1>Có lỗi xảy ra ở đâu đó trong component con/cháu...</h1>;    
	}   
	return this.props.children; 
}
```

Tiếp theo wrapper `ErrorBoundary` bên ngoài component bạn muốn handle error:

```js
<ErrorBoundary>
	<AComponentYouWantHandleError />
</ErrorBoundary>
```

Bạn có thể checkout [repo](https://github.com/duthaho/points) được sử dụng cho demo trong serial của mình để xem `ErrorBoundary` hoạt đông như thế nào nhé!

Ngoài ra chúng ta còn 1 vài chú ý quan trong như là, `ErrorBoundary` không thể handle trong các trường hợp sau:

-   Xử lý sự kiện (Event handlers)
-   Code bất đồng bộ (ví dụ `setTimeout`  hoặc trong callbacks)
-   Render ở phí server (SSR)
-   Lỗi xảy ra ở chính `ErrorBoundary` component

Các bạn có thể tìm hiểu thêm trên [trang chủ](https://reactjs.org/docs/error-boundaries.html)
### Túm lại

Chúng ta đã kết thúc serial về `Vòng đời của React16+ componnet`, hy vọng qua serial này các bạn sẽ tiếp cận đến các kiến thức mới trong phiên bản mới nhất của React.

Hẹn gặp laị các bạn trong các serial sau về React.

Ghé thăm [blog](https://duthaho.com) của mình để ủng hộ nhé.