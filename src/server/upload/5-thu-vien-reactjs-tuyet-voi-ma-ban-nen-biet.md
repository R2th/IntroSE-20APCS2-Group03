![](https://images.viblo.asia/2aab1cd2-05c0-4921-9e1b-da9028ab88bd.png)

React đã và đang ngày càng trở nên phổ biến hơn trong vài năm qua. Cùng với nó là việc sự phát triển mạnh mẽ của các thư viện đi kèm, chúng mang đến cho chúng ta những kỹ thuật mới tuyệt vời giúp mọi thứ trở nên dễ dàng hơn. Trong phần này, tôi sẽ chỉ cho bạn năm thư viện mà tôi nghĩ là bạn nên biết.
## 1. react-portal
Portal trong React khá quen thuộc với hầu hết mọi người, ngay cả khi chúng ít được sử dụng. Mô tả về chúng trong tài liệu React:
> Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.


Thông thường, toàn bộ ứng dụng React được hiển thị chỉ trong một node DOM trong HTML. Nhưng với các portal, chúng ta có thể xác định các node bổ sung nơi chúng ta có thể gắn các phần của ứng dụng, chẳng hạn như các componets riêng lẻ.

Tuy nhiên, trong tài liệu chính thức, các portal được mô tả theo khá cồng kềnh và phức tạp, đó là lý do tại sao react-portal cung cấp cho chúng ta một giải pháp.
```js
import { Portal } from ‘react-portal’

<Portal node={document && document.getElementById(‘portal’)}>
  <p>This is portaled into the portal div!</p>
</Portal>
```
Chỉ cần gắn container portal của bạn trong code HTML của bạn với các selectors JavaScript điển hình, như ***getElementById***.
Trong file public/index.html của ứng dụng:
```js
<div id=”root”></div>

<div id=”portal”></div>
```
Như bạn có thể thấy, root-element mà mọi ứng dụng React cần đều có ở đó như bình thường và các portal bạn có thể tạo với thư viện này có thể nằm ngoài root.

***Thêm:*** Bạn có thể chuyển đổi portal của mình vì nó cũng chỉ là một React component:
```js
{this.state.show ? (
  <Portal node={document && document.getElementById(‘portal’)}>   
    <p>Portal content</p>
  </Portal>
) : null}
```
## 2. react-toastify
Cung cấp thông tin động cho end-user trên một trang web là cần thiết trong quá trình phát triển web hiện đại. Thật không may, hàm ***alert()*** trong JavaScript không phải là lựa chọn tốt cho mục đích này và đa phần mọi người cũng biết điều đó.

Đó là lý do mà react-toastify xuất hiện - một thư viện nhỏ nhưng rất dễ tùy biến tạo ra các toasts thực tế và đẹp mắt trong trình duyệt. Tham khảo bản [demo chính thức](https://fkhadra.github.io/react-toastify/)  này trước khi chúng ta sâu hơn.

Sử dụng nó trong ứng dụng:
```js
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({
  autoClose: 2000,
  draggable: false,
  position: toast.POSITION.TOP_LEFT
})
const notify = () => toast('Wow so easy !')

const App = () => (
  <div className="App">
    <button onClick={notify}>Notify !</button>
  </div>
)
```
Cụ thể,
- Đầu tiên chúng ta cần import thư viện, quan trọng là phải import CSS cần thiết sau đó.
- Tiếp theo, có thể cấu hình toast. ***autoClose*** có nghĩa là sau khoảng thời gian bao lâu thì toast sẽ tự động biến mất.
- Sử dụng hàm toast() để hiển thị toast.

**Nhiều tính năng thú vị**

Bạn có thể put out JSX trong toast:
```js
const notify = () => toast(<h1>Big Text</h1>)
```
Có thể thay thế ***autoClose*** bằng ***false*** để nó sẽ không bao giờ tự động đóng.
## 3. react-contextmenu
Ngày càng có nhiều ứng dụng web hướng đến desktop app, cung cấp hiệu năng tốt và nhiều tính năng mà bạn mong đợi.

Một trong những tính năng này là đánh giá right-click của người dùng, được sử dụng ngày càng nhiều trên các trang web. Tất nhiên, đó là những cái phức tạp hơn với nhiều elements UI. Cá nhân tôi biết tính năng này hầu như chỉ có trên Google Sheets và iCloud Keynote.

Có một thư viện React.js rất hữu ích, chủ yếu được sử dụng để hiển thị một menu context.
```js
import React from 'react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

const App = () => (
	<React.Fragment>
		<ContextMenuTrigger id="TriggerID"> {/* ID for every instance must be individual */} 
			<p>Right click on me!</p>
		</ContextMenuTrigger>

		<ContextMenu id="MenuID">
			<MenuItem onClick={() => alert('first ')}>
				<button>1. Item</button>
			</MenuItem>

			<MenuItem onClick={() => alert('second')}>
				<button>2. Item</button>
			</MenuItem>
		</ContextMenu>
	</React.Fragment>
)

export default App
```

**<ContextMothyTrigger>** sẽ là component mà chúng ta cần right-click để chuyển đổi menu. Bản thân menu được định nghĩa bên trong wrapper **<ContextMothy>**. Đối với mỗi item, có component **<MenuItem>** mà chúng ta có thể đưa ra một event ***onClick*** để xử lý input của người dùng.

## 4. react-lazy-load-image-component
Hiển thị rất nhiều hình ảnh trên trang web có thể mất một khoảng thời gian. Thông thường, các hình ảnh được tải sẵn và đột nhiên xuất hiện gây ra cho người dùng những trải nghiệm khó chịu với UI, điều mà chúng ta rất muốn tránh.

Một thư viện tuyệt vời để tối ưu hóa mọi thứ liên quan đến hình ảnh cho người dùng là ***react-lazy-load-image-component***. Chúng ta không chỉ có thể tạo hiệu ứng làm mờ đẹp như trong ví dụ bên dưới để bắc cầu loading ảnh, mà chúng ta còn có thể tải hình ảnh một cách ***lazy-load*** (tức là chỉ để chúng tải trên trang web khi cần). 
    
![](https://images.viblo.asia/770910fd-7d35-4bac-98bc-ed5682b09b26.gif)
    
Ví dụ cho hiệu ứng làm mờ trong khi hình ảnh đang tải:
```js
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const App = () => (
	<React.Fragment>
		<LazyLoadImage
			alt={'this is the alt'}
			width={'900px'}
			effect="blur"
			src={'https://<link>//'} 
		/>
	</React.Fragment>
)

export default App
```
## 5. react-onclickoutside
Một quy tắc quan trọng của thiết kế giao diện người dùng là đánh giá càng nhiều entries của người dùng càng tốt. Điều này cần phải rõ ràng với mọi người, và đôi khi có thể khó thực hiện.
    
Ví dụ, người dùng thu gọn một thanh menu. Nếu bạn muốn đóng menu lại, 90% người dùng có xu hướng chỉ cần click vào các khu vực "chết" của trang (tức là về các elements sẽ không tự phản ứng). Trên hầu hết tất cả các trang web chuyên nghiệp, điều này là hoàn toàn giống nhau. Để đóng menu, bạn chỉ cần nhấp vào bên cạnh một lần nữa thay vì trực tiếp click trên nó để chuyển đổi nó.
    
Một thư viện để react với các ý định như vậy là ***react-onclickoutside***, cho phép xử lý các event clickoutside.
    
Trong ví dụ sau, bạn có thể thấy cách chúng ta có thể thực hiện điều này cho một ***button*** và ***h1*** đơn giản. Chỉ khi bạn nhấp vào bất cứ thứ gì trừ hai element này, ***console.log*** sẽ output. Function xử lý chính xác event này phải được gọi là ***handleClickOutside***.
```js
import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'

class App extends Component {
	handleClickOutside = evt => {
		console.log('You clicked outside!')
	}

	render() {
		return (
			<div>
				<h1>Click outside!</h1>
				<button>Don't click me!</button>
			</div>
		)
	}
}

export default onClickOutside(App)
```
    
#### Tham khảo
[5 Awesome React.js Libraries You Should Know About](https://medium.com/better-programming/5-awesome-react-js-libraries-you-should-know-about-ef0274fe4a56)