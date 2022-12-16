# Mở đầu
&nbsp;&nbsp;&nbsp;&nbsp;Tiếp tục là chuỗi học reactjs của mình, sau đây mình tiếp tục tìm hiều về một chút cái `Lifecycle`.
# Nội dung
### 1. Một số hàm hay sử dụng
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {number: 0};
    }
    incrementCounter() {
        this.setState(
            (prevState, props) => ({
                seconds: prevState.number + 1
            })
        );
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.incrementCounter(),
            1000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div>
                <h2>Total: {this.state.number}</h2>
            </div>
        );
    }
}
```

bên trên mình có sử dụng một số hàm hay dùng, mình sẽ đi vào từng hàm một
### a. constructor(props)
&nbsp;&nbsp;&nbsp;&nbsp;Hàm này là hàm khởi tạo , là hàm chạy ngay sau khi component được tạo ra, đầu vào của hàm này là `props`  ( là `properties` của component được dùng để truyền dữ liệu từ bên ngoài vào).


&nbsp;&nbsp;&nbsp;&nbsp;Ở trong hàm này chúng ta có thể khởi tạo `state` cho component 

### b. componentDidMount()
&nbsp;&nbsp;&nbsp;&nbsp;Được gọi ngay khi giao diện được `render()` xong, có nghĩa là khi giao diện hiện lên sẽ gọi hàm này.

&nbsp;&nbsp;&nbsp;&nbsp;Trong hàm này ta có thể dùng để lấy dữ liệu từ api, server ... và `setState` dữ liệu ra.

&nbsp;&nbsp;&nbsp;&nbsp;Khi chạy đến hàm này thì các phần tử đã được sinh ra rồi. Chúng ta có thể tương tác với `DOM` bằng `JS` ở đây.

### c. componentWillUnmount()

&nbsp;&nbsp;&nbsp;&nbsp;Hàm này được gọi khi compnent loại bỏ khỏi `DOM`, thực hiện các thao tác dọn dẹp, loại bỏ những phần tử dư thừa và hủy các timer..như bên trên mình dùng để `clearInterval`.
### d. render
&nbsp;&nbsp;&nbsp;&nbsp;Hàm này là hàm bắt buộc, vì đây là đầu ra của component. Nó chịu trách nhiệm trả về một đối tượng `JSX` những gì chúng ta muốn hiển thị ra bên ngoài


&nbsp;&nbsp;&nbsp;&nbsp;Những hàm chúng ta vừa tìm hiểu là những hàm hay dùng..ngoài ra còn `componentWillReceiveProps(nextProps)`, `shouldComponentUpdate(nextProps, nextState)`, `componentWillUpdate(nextProps, nextState)`, `componentDidUpdate(prevProps, prevState)`, `componentWillMount()`


![](https://images.viblo.asia/673be761-7242-4f1b-9382-6e7e820de97c.png)


Mình có sưu tầm được sơ đồ về `Lifecycle`

&nbsp;&nbsp;&nbsp;&nbsp;Tiếp theo như sơ đồ thì ta tìm hiểu mấy hàm còn lại có công dụng gì

### e. componentWillMount()

&nbsp;&nbsp;&nbsp;&nbsp;Trước khi render sẽ gọi đến hàm này. Ở đây chúng ta có thể đăng kí các biến toàn cục và có thể dựa vào `prop` tính toán và setState nếu có.

### f. componentWillReceiveProps(nextProps)
&nbsp;&nbsp;&nbsp;&nbsp;Hàm này được gọi đến  mỗi khi props thay đổi. Do vậy được sử dụng  để thay đổi trạng thái (state) của component phụ thuộc props và Sử dụng các kết quả, khởi tạo biến có tính chất async.

### g. shouldComponentUpdate(nextProps, nextState)
 &nbsp;&nbsp;&nbsp;&nbsp;Hàm này được gọi khi state và props thay đổi và sẽ trả về kết quả true/false, bạn sẽ cần sử dụng đến hàm này để xử lý xem có cần update component không. Mặc định hàm này trả về true.
 ### h . componentWillUpdate(nextProps, nextState)
&nbsp;&nbsp;&nbsp;&nbsp; Hàm này được gọi dựa vào kết quả của hàm `shouldComponentUpdate`. Nếu hàm trên trả về false, thì React sẽ không gọi hàm này
 
### i . componentDidUpdate(prevProps, prevState)
&nbsp;&nbsp;&nbsp;&nbsp;Hàm này được gọi ngay sau khi component được render lại. Đây cũng là 1 cơ hội để thao tác với các phần tử DOM bằng JS.
# Kết Luận
  Như vậy chúng ta đã đi qua một số khái niệm và thứ tự được gọi, có thể dùng chúng khi nào. Từ đó ta có thể có cái nhìn tổng quan hơn khi code.
  
  # Tài liệu tham khảo
  
  [Tài liệu 1](https://viblo.asia/p/vong-doi-cua-mot-react-component-RQqKLMRzZ7z)
  
  [Tài liệu số 2](https://reactjs.org/docs/react-component.html)