![](https://images.viblo.asia/2d435ba1-cad4-43f8-b21b-404070bb0e7c.png)

Xin chào tất cả các bạn, dạo này mình bắt đầu tìm hiểu về một công nghệ mới đó là **ReactJS**. Mới đầu rất hào hứng xong đọc doc cũng có phân chút khó khắn, cũng google translate các kiểu mới hiểu chút chút về công nghệ này. Hôm nay mình sẽ chia sẽ một chút những thứ gì đó rất là cơ bản, mong rằng nó có thể làm giúp các bạn phần nào được. Nội dung chủ yếu mình tìm hiểu qua [trang chủ](https://reactjs.org/) của React.
# Một số vấn đề ta cầm tìm hiểu
## ReactJS là gì ?
Khi mình bắt đầu tìm hiểu một cái gì đó mình thường trả lời các câu hỏi What? How ? Why?. Nào đầu tiên chúng mình trả lời câu hỏi `What?` nhé. Như các bạn biết đấy cứ nhắc đến JS là người ra lại nghĩa ngay đến phần bên font-end, nhưng theo mình nếu mà xử lý bên font-end thì mình dùng thư viện JQuery cũng quá toẹt vời rồi :)))(theo cá nhân mình là thế). 

`ReactJS` là thư viện javascipt giúp render ra phần view, nó không phải là framwork JS nào hết. Có thể hiểu nó được sử dụng cho việc xây dựng các thành phần UI có khả năng tái sử dụng. Là thằng trung gian trong việc xử lý load dữ liệu.

Tại sao chúng ta lại sử dụng ReactJS?
* `Declarative`: khả năng load dữ liệu nhanh với các kiểu SPA(Single Page Application). Tức là chỉ thao tác một vùng mà không cần load lại toàn bộ dữ liệu, tương tác dữ liệu nhanh.
* `Component Based`: Đóng gói và quản lý theo logic component. Tức là trong mắt của JS muốn tạo một nút thì ta cũng phải tạo ra component, muốn tạo ra một `<div><h1>Hello</h1></div>` cũng phải tạo trong component. Điều này dễ dàng cho việc nâng cấp hoặc thay đổi chức năng thì chỉ thay đổi component đó thôi.
* `Learn Once, Write AnyWhere`: Học một lần mà viết ở mọi nơi. Vì theo triết lý component nên khi viết xong ứng dung, cần năng cấp thì bất kỳ lập trình viên nào có thể join vào xử lý mà không sợ phải đụng đến toàn bộ code.

Để cài đặt ReactJS các bạn cần đảm bảo cài NodeJS. Sau đó chạy 3 câu lệnh sau đây để start
* npm install -g create-react-app
* create-react-app <tên_project> --> Tạo cho chúng ta một cái khung để ta phát triển lên.
* sau đó ta di chuyển vào project của chũng ta và npm start để chạy project
## Component.
### Khái niệm
Ở trên mình cũng đã đề cập React được xây dựng xung quanh các component. Vậy chúng mình cũng tìm hiểu Component là gì nhé?

`Component`là một khối đóng gói trong đó có các thẻ HTML, props, state,... Các bạn cứ hiểu nó là môt thẻ HTML nhưng trong đó nó thực hiện các chức năng mà theo mình định nghĩa. Để làm việc với `ReactJS` chúng ta sẽ phải chuyển hết các thẻ HTML về dạng component.

Việc chuyển đổi từ HTML sang Component làm tốn thời gian của chúng ta. Nhưng nhờ vậy chương trình có thể đóng gói các khối code thành một khối độc lập - chúng ta có thể áp dụng lập trình hướng đối tượng một cách bình thường.
### Các cách tạo Component
Kiểu hàm bình thường
```Javascript
function Demo()
{
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    );
}
Khi chúng ta sử dụng thì chúng ta có thể dùng <Demo/> hoặc <Demo></Demo>
```
Kiểu anonymous
```Javascript
var Demo = function () {
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    );
}
```
Kiểu theo cú pháp ES6
```Javascript
var Demo = () => (
    <div>
        <h1>Hello World</h1>
    </div>
)
```
Kiểu khai báo theo class
```Javascript
class Demo extends Component {
    render() {
        return (
            <div>
                <h1>Hello World</h1>
            </div>
        )
    }
}
```
Các bạn chú ý nhé khi return về một đoạn code khá dài thì chúng ta cần mở đóng ngoặc tròn rồi viết code thoải mái theo cách căn lề của bạn `()`. Còn nếu không thì bị lỗi đó :)))
## JSX
JSX là một phần mở rông cho cú pháp giống như XML cho EMCAScript. Nó được khuyến khích dùng trong React. Các bạn chú ý nhé khi chúng ta viết code HTML trong phần `render() { return (...)}` thì chúng ta cần chú ý chuyển các thuộc tính vd như `class` trong HTML thành `className`,... Mình thì suggest cho các bạn lên  [trang](https://magic.reactjs.net/htmltojsx.htm) để convert từ HTML sang JSX.
VD ta có đoạn mã HTML
```HTML
<div class="awesome" style="border: 1px solid red">
  <label for="name">Enter your name: </label>
  <input type="text" id="name" />
</div>
<p>Enter your HTML here</p>
```
Sau khi convert sang JSX thì nó sẽ được như nào
```PHP
<div>    
    <div className="awesome" style={{border: '1px solid red'}}>
      <label htmlFor="name">Enter your name: </label>
      <input type="text" id="name" />
    </div>
    <p>Enter your HTML here</p>
</div>
```
Khi ta muốn định nghĩa style thì chúng ta làm như sau
```Javascript
class Demo extends Component {
    render() {
        let myStyle = {
            'color': red
        }
        return (
            <div>
                <h1 style={ myStyle }>Hello World</h1>
            </div>
        )
    }
}
```
Ưu điểm của JSX:
* Nhanh hơn nhờ việc thực hiện tối ưu hóa trong khi biên dịch mã thành javascript.
* An toàn và hầu hết các lỗi có thể bị bắt trong quá trình biên dịch
* Giúp các bạn viết template dễ dàng và nhanh hơn.
## Props
`props` viết tắt của từ properties. Các thẻ HTML có các thuộc tính vd như `href, src, alt,...` Bây giờ thuộc tính của Component cũng được do mình tự đặt luôn. Lấy ví dụ cho các bạn hiểu nhé.
```Javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:null,
        };
    }
    render() {
        return (
            <div>
                <img src={this.props.linkanh}>
            </div>
        )
    }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Demo linkanh="https://kenh14cdn.com/2018/7/25/059a2314-15324896289341851803106.jpg"/>
      </div>
    );
  }
}

export default App;
```
Chú ý khi gọi ra giá trị ta dùng `{this.props.<tên_thuộc_tính>}`
Nếu mà chúng ta sử dụng function thì chúng ta sẽ in ra giá trị truyền vào Component như sau
```Javascript
var Demo = function (props) {
    render() {
        return (
            <div>
                <img src={props.linkanh}>
            </div>
        )
    }
}
```
## State
Theo Mình hiểu `state` là một biến trung gian hoạt động trong suốt quá trình thao tác với component, nó bị giới hạn trong class Component của nó. Đóng vai trò lưu trữ các biến, tham số cần thiết trong lúc lập trình với ReactJS. Nó lưu trữ không giới hạn tham số, vì nó là kiểu object.

```Javascript
constructor(props) {
        super(props);
        this.state = {
            <key>: <value>
        }
    }
```
Khi ta muốn set giá trị cho state ta sẽ dùng hàm `setState({key:value})`
```Javascript
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status : 0;
        }
    }
    render() {
        return (
            <div className="search-bar">
                <button onClick={() => this.setState({'status': 1}) }></button>
            </div>
        );
    } 
}
```
## Map
Các bạn cũng có thể tham khảo hàm `map()` -  nó cũng giống như `forEach()` dùng để duyệt các phần tử trong một mảng.
```Javascript
const so = [1,2,3,4,5,6];
const so1 = so.map((x) => (
    <div>
        <li>
            <button onClick={() => (alert(x))}>So: {x}</button>
        </li>
    </div>
));
```
# Kết luận
Trên đây là những phần cơ bản mình đã tìm hiểu được trong quá trình đọc documentation. Nếu có sai sót gì các anh chị bạn bè comment phía dưới nhá :)))
# Tham khảo
https://reactjs.org/tutorial/tutorial.html