Bài viết được dịch từ nguồn: https://hackernoon.com/rethinking-components-with-react-hooks-bdec3yi2

![](https://images.viblo.asia/4156c1c5-5d81-47d2-a3c6-5a4a6ad8280f.jpeg)

React Hook đã xuất hiện kể từ React 16.8 và vẫn phổ biến và được yêu thích hơn bao giờ hết. Họ đã giới thiệu một cách xử lý các thành phần hoàn toàn mới trong React, điều này có thể khiến bạn đánh giá lại cách tiếp cận của bạn đối với code ở cấp độ cơ bản. Đã được thiết lập như là frontend framework được yêu thích nhất theo các cuộc thăm dò mức độ phổ biến của Stackoverflow, React đã vượt lên trên cả sự giới thiệu của Hook.

Thoạt nhìn, React Hook có vẻ như là một sự thay thế cho các lớp hoặc thậm chí thay thế hoàn toàn. Nhiều người đã bày tỏ ý kiến ​​đó, tuy nhiên, điều đó là sai. React Hook không có cách nào so sánh tương đương với classes. Khái niệm này là khác nhau, cũng như nhận thức, vì vậy những gì có thể trông tương tự, là một khái niệm hoàn toàn mới khi đi vào thực tế.

Với Hook, có một nhu cầu về cách tiếp cận khai báo với logic toán học nghiêm ngặt của nó. Trong bản phát hành mới, React đã thay đổi cách tiếp cận với function programing, khiến OOP không được chú ý. Điều này tự trình bày theo một vài cách. Function giờ đây đóng vai trò quan trọng trong React, chuyển mức độ phụ thuộc ra khỏi classes. Kết quả là, chúng ta có một phương thức kết xuất hoàn toàn khác, mà chúng ta sẽ minh họa bằng các ví dụ sau.

Hãy bắt đầu với classes. Chúng tôi xác định một thành phần có giá trị bắt đầu bằng 0 và cũng sử dụng componentDidMount để đặt thời gian chờ khi trạng thái đạt giá trị 5000.

```
export default class App extends React.Component {

  state = {value:0}
  componentDidMount() {
  setTimeout(() => 
    console.log(this.state.value), 5000);
}
```

Thành phần của chúng tôi là một button sẽ trả về số lần nhấp trên mỗi lần render, được kích hoạt bởi sự thay đổi state. Với mỗi một cái nhấp chuột giá trị thay đổi thành value + 1.

```
render() {
	return (
		<button
		  onClick={() => this.setState(({ value }) => ({ value: value + 1 }))}
		>
          click on me
		</button>
	)
}
```

Global object này trong component (class) là một singleton với liên kết đến state ở mọi trường hợp. Nó sẽ giống nhau trong mỗi lần render, nghĩa là nếu bạn mở trang và nhấp vào nút một vài lần, số number xuất hiện trong console sẽ cho bạn biết chính xác bạn đã nhấp vào nút bao nhiêu lần. Điều này cho render tham chiếu đến một đối tượng duy nhất.

Với Hook, kết quả sẽ khá khác biệt và giống các hàm trong JS hơn. Trên mỗi lần render, một môi trường mới sẽ được tạo ra, vì vậy mỗi lần bạn sẽ nhận được một bộ dữ liệu mới.

Hãy cùng xem một ví dụ. Chúng tôi đặt trạng thái ban đầu là 0 với sự trợ giúp của `useState` Hook.

```
export default function App() {
  let [state, setState] = React.useState({ count: 0 });
}
```

Sau đó, chúng tôi sử dụng `useEffect` hook để đặt thời gian chờ khi số lần nhấp lên tới 5000. Trong ví dụ trước, chúng tôi đã đạt được điều này bằng cách sử dụng `componentDidMount`.

```
React.useEffect(() => {
  setTimeout(() => {
    console.log(state.count);
  }, 5000);
}, []);
```

Một lần nữa, chúng tôi sẽ đếm số lần nhấp vào button với mỗi lần nhấp trong một cái nhấp chuột trạng thái chuyển sang value + 1.

```
return (
  <button
    onClick={() => { setState(state => state +1); } }
  >
    increase count
  </button>
);
```

React `accounts` cho tất cả các thay đổi trong state Hook, gọi `function component` mỗi lần render. Điều này có nghĩa là tất cả các biến và hàm được đóng và do đó khác nhau trên mỗi render.

Trong thực tế, điều đó có nghĩa là gì, nếu chúng ta lấy ví dụ tương tự, nhưng thể hiện nó bằng React Hook, khi bạn nhấp vào nút trong khi kết xuất đang diễn ra, bạn sẽ nhận được số 0 ở đầu ra. Trên mỗi kết xuất, `state` và `useEffet` Sẽ khác.

Đây là một cái gì đó đáng để học hỏi và sử dụng trong code của bạn. Nếu bạn vẫn chưa chắc chắn về lý do cần thay đổi này, hãy tìm hiểu thêm về React Hook và lý do đằng sau phần giới thiệu của họ. Bạn sẽ thấy rằng Hook là một bổ sung tuyệt vời cho React và một khi bạn bắt đầu sử dụng chúng, bạn sẽ gặt hái được lợi ích ngay lập tức.

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn.