Dạo này mình bắt đầu tìm hiểu về React thế nên vừa học vừa viết bài xem mình hiểu đến đâu. Bắt đầu học nên có gì sai sót mong mọi người bỏ qua. Nội dung chủ yếu các bạn có thể xem chi tiết hơn tại trang [doc](https://reactjs.org/docs/getting-started.html) của React.
# Giới thiệu
ReactJs là thư viện Javascript được sử dụng cho việc xây dựng các thành phần UI có khả năng tái sử dụng. Nó khuyến khích việc tạo ra các thành phần giao diện người dùng có thể tái sử dụng và khả năng hiển thị dữ liệu thay đổi theo thời gian. Bạn có thể xem bất kỳ 1 trang Web nào thì hầu hết chúng đều có những thành phần cơ bản như header, footer, sidebar, body. Việc chia trang web thành từng thành phần riêng rồi tái sử dụng có vẻ rất hợp lý.
# Một số vấn đề trong React
## JSX = Javascript + XML
> JSX là 1 phần mở rộng cú pháp giống như XML cho EMCAScript. Nó được khuyến khích dùng trong React.
> 
**Ưu điểm mà JSX mang lại:**
* Nhanh hơn nhờ việc thực hiện tối ưu hóa trong khi biên dịch mã thành Javascript.
* An toàn và hầu hết các lỗi có thể bị bắt trong quá trình biên dịch.
* Giúp bạn viết template dễ dàng và nhanh hơn.

**Sử dụng JSX:**

* Cú pháp tương đối giống với HTML và có khả năng sử dụng biểu thức logic vào JSX
```js
class App extends React.Component {
   render() {
      return (
         <div>
            <h1>{ 1 + 1 }</h1>
         </div>
      );
   }
}
export default App;
```
* Định style sử dụng cú pháp **camelCase** và tự động thêm **px** sau giá trị là số của các phần tử.
```js
class App extends React.Component {
   render() {
      let myStyle = {
         fontSize: 100,
         color: '#FF0000'
      }
      return (
         <div>
            <h1 style = { myStyle }>Header</h1>
         </div>
      );
   }
}
export default App;
```
* Viết comment đặt trong cặp dấu `{ }`
* Têm commponent bắt đầu bằng chữ hoa **Uppercase**, sử dụng **className** và **htmlFor** thay vì **class** và **for**.
* JSX đại diện cho các đối tượng:
2 ví dụ sau đây đều cho kết quả tương tự nhau
```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```
```js
const element = React.createElement(
  'h1',
  {
      className: 'greeting'
  },
  'Hello, world!'
);
```
## Component
> Các component cho phép bạn tách giao diện người dùng thành các thành phần độc lập, có thể tái sử dụng.
> 
Component giống như các hàm Javascript. Chúng chấp nhận đầu vào 1 cách tùy ý (props) và trả về phần tử React xuất hiện trên màn hình.

**Tạo component**

Có 2 cách để khởi tạo component là dùng hàm hoặc dùng định nghĩa class.
```js
// Use function
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Or user class
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
**Component do người dùng định nghĩa**
```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Bui Hi" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
* Gọi `ReactDOM.render` với phần tử `<Welcome name="Bui Hi" />`
* React gọi component `Welcome` với `{name: 'Bui Hi'}` như là **props**
* Component `Welcome` trả về kết quả`<h1>Hello, Bui Hi</h1>`
* React DOM cập nhật DOM
## Props và State
Props và state là 2 kiểu dữ liệu trong React. State chỉ được thay đổi bên trong bản thân component. Props không bị kiểm soát bởi bản thân component.
### Props
Props là viết tắt của properties. Chúng là các giá trị đơn hoặc các đối tượng có chứa 1 tập hợp các giá trị được chuyển đến Component. Nó sử dụng quy ước đặt tên tương tự như các thuộc tính của thẻ HTML.

Props là cách để các component giao tiếp với nhau. Props được truyền từ component cha.  

Props chỉ để đọc. Cho dù bạn khai báo component dưới dạng hàm hay class thì nó vẫn không bao giờ có thể sửa đổi props của chính nó. 
```js
let text = 'React App';

class Form extends React.Component {
    render () {
        return (
            <div>
                <h3>
                    { this.props.text }
                </h3>
            </div>
        );
    }
}

class App extends React.Component {
    render () {
        return (
            <div>
                <h1>
                    Welcome to my app
                </h1>
                <Form text={ this.props.text } />
            </div>
        );
    }
}

ReactDOM.render(
    <App text={ text } />,
    document.getElementById('root')
);
```
* props được truyền vào trong App trong phương thức React.render()
* App component truy xuất biến `text` thông qua lời gọi `this.props.text`
* Form component hiển thị dữ liệu vào thẻ `<h3>` 
### State & Lifecycle
**State**

Khác với props là bất biến thì state có thể thay đổi. State được quản lý chỉ bởi duy nhất 1 component, nó cũng không thể truyền xuống cho component con.
```js
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { term: '' };
    }
    render() {
        return (
            <div className="search-bar">
                <input 
                    value={ this.state.term }
                    onChange={(event) => this.onInputChange(event.target.value)} />
                <p>
                    { this.state.term }
                </p>
            </div>
        );
    }
    onInputChange(term) {
        this.setState({ term });
    }
}

ReactDOM.render(
    <SearchBar />,
    document.getElementById('root')
);
```
**Lifecycle**

* **componentDidMount**: thực hiện chỉ 1 lần sau khi render ở phía client. Đây là nơi yêu cầu AJAX, cập nhật DOM hoặc cập nhật trạng thái nên xảy ra.
* **shouldComponentUpdate**: trả về giá trị **true** hoặc **false**. Nó xác định xem các component có được cập nhật hay không. Giá trị mặc định của nó là **true**. Nếu bạn chắc chắn không muốn component được render lại sau khi **state** hoặc **props** được cập nhật thì đặt giá trị cho nó là **false**.
* **componentDidUpdate**: được gọi ngay sau khi render.
* **componentWillUnmount**: gọi sau khi component được hủy khỏi DOM.
## Lists & Keys
Key rất hữu ích khi làm việc với các component được tạo động hoặc khi danh sách của bạn bị thay đổi bởi người dùng. Việc đặt giá trị key sẽ giữ cho các component được xác định là duy nhất sau khi thay đổi.
```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```
Không nên sử dụng các chỉ mục cho các khóa nếu thứ tự các mục có thể thay đổi. Điều này có thể tác động không tốt đến hiệu suất và gây ra các vấn đề với state của component. 

**Lưu ý:**
* Key chỉ có ý nghĩa trong hoàn cảnh mảng xung quanh các phần tử cần đánh key.
# Kết luận
Trên đây là 1 số nội dung mình tìm hiểu và liệt kê ra. Nội dung cũng chưa được chi tiết lắm nên mọi người thông cảm. Mình sẽ cố gắng tìm hiểu sâu hơn để có những bài viết chất lượng hơn.