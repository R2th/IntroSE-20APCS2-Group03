React xử lý việc re-render một cách rất hiệu quả và tiết kiệm tài nguyên. Nó chỉ render thành phần có sự thay đổi dữ liệu. Nội dung của trang sẽ luôn được cập nhật một cách nhanh chóng và làm tăng hiệu quả người dùng.

Có 2 cách được sử dụng cho việc quản lý sự thay đổi trạng thái của các phần tử thuộc form:
* Controlled Component
* Uncontrolled Component
# Single source of truth
Trước khi vào nội dung chính thì mình sẽ bàn một chút về nguyên tắc ***single source of truth*** ở trong React.

Thông thường với việc sử dụng HTML + JS, state hoặc giá trị của thẻ `<input />` được điều khiển bằng trình duyệt chứ không phải là do javascript. Nếu bạn cũng giữ giá trị của đầu vào như vậy trong javascript thì nó có nghĩa rằng có ít nhất "two sources of truth - 2 nguồn của sự thật".

Với controlled component trong React thì state và value luôn luôn khớp với nhau. Bởi vì, React luôn đảm bảo rằng giá trị của trình duyệt bằng với giá trị bạn cung cấp từ javascript. Nó chính là "single source of truth".
# Controlled Component
Nó lấy giá trị hiện tại thông qua **props** và thông báo sự thay đổi qua phương thức như là **onChange**. Nó cập nhật và lấy dữ liệu 1 cách liên tục chứ không phải chỉ lấy duy nhất 1 lần. 

Mình lấy ví dụ về Controlled Component ngay trong trang chủ của React:
```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
Giá trị của thẻ input sẽ luôn là `this.state.value`. Phương thức `handleChange` sẽ cập nhật giá trị state mỗi khi form được gửi.

Việc sử dụng Controlled Component thì mỗi biến state sẽ cần 1 hàm để xử lý cũng như cập nhật thay đổi. Điều này giúp cho việc thực hiện sửa đổi hay xác thực đầu vào 1 cách dễ dàng hơn. Ngoài ra thì các giá trị đầu vào đều có sẵn trong toàn bộ các component của React nên bạn không cần  gọi sự kiện kích hoạt hoặc truy cập DOM để lấy giá trị.

# Uncontrolled Component
## Refs và DOM
Trước khi nói đến Uncontrolled Component thì mình để nói về phần này trước. Vì tí nữa viết ra lại mất công đào ngược lại.

> Refs cung cấp cách để truy cập các node DOM hoặc phần tử React được tạo bởi phương thức **render**. (https://reactjs.org/docs/refs-and-the-dom.html)
> 
Refs dùng để trả về 1 tham chiếu của phần tử. Chúng ta nên hạn chế dùng đến refs trong nhiều trường hợp tuy nhiên nó hữu ích trong các trường hợp thêm phương thức vào component.

Chúng ta biết luồng dữ liệu trong React là từ cha đến con. Việc tương tác giữa component cha đến component con phụ thuộc vào việc sử dụng **props**. Mặt khác, bạn muốn sửa đổi con thì đồng nghĩa với việc bạn phải re-render lại với **props** mới. Thế để sửa đổi component con bên ngoài luồng dữ liệu thì như thế nào?
### Khi nào thì nên dùng Refs
* Quản lý tập trung, lựa chọn văn bản, phát lại đa phương tiện.
* Kích hoạt hình ảnh động một cách bắt buộc.
* Tích hợp với thư viện DOM của bên thứ 3.
### Sử dụng Refs
**Tạo Refs** sử dụng `React.createRef()` và đính kèm vào phần tử React thông qua thuộc tính `ref`.
```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

**Truy cập Refs**
 
Sử dụng thuộc tính `current` để có thể truy cập giá trị của refs.
```js
const node = this.myRef.current;
```
* Khi thuộc tính ref được sử dụng trên 1 phần tử HTML thì ref nhận phần tử DOM bên dưới làm thuộc tính hiện tại của nó.

Ví dụ 1 đoạn sau, mình thử cho in ra thuộc tính ref hiện tại:
```js
class Uncontrollerd extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = React.createRef();
    }
    
    handleSubmit(event) {
        console.log(this.input.current); // <input type="text">
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <label>
                    Name: 
                    <input type="text" ref={ this.input } />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
```
* Khi ref được dùng trong class thì đối tượng ref nhận 1 thể hiện của component như là `current`.
```js
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```
**Chú ý** `CustomTextInput` cũng cần được khai báo là 1 class được extends React.Component.
## Uncontrolled Component
Trong trường hợp mà bạn không muốn sử dụng **onChange** để lấy giá trị đầu vào. Giá trị đầu vào có thể được nạp bằng cách truy cập vào DOM hoặc từ một đối tượng sự kiện.

Cùng xem ví dụ tại trang chủ của React (https://reactjs.org/docs/uncontrolled-components.html)
```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
Ví dụ trên có sử dụng đến thuộc tính `ref` mà mình có đưa ra ở phần trước. Mọi người nên xem kỹ. 

Vì uncontrolled component giữ *source of truth*
trong DOM nên có khả năng dễ dàng tích hợp mã React hoặc non-React. Nếu bạn muốn viết mã 1 cách nhanh chóng và hơi lộn xộn thì nó là 1 cách để viết đoạn mã 1 cách ngắn hơn. 
# Kết luận
Controlled component là 1 cách tiếp cận thuận tiện và mạnh mẽ trong việc thực thi form, nhưng nó không phải là cách tốt nhất. Nó vẫn phụ thuộc vào cách tiếp cận hoặc tình huống mà bạn hướng tới.

Nếu form đơn giản chỉ thực hiện những yêu cầu đơn giản như người dùng nhập tên và họ thì sử dụng uncontrolled component là đã đủ tốt. Bạn chỉ cần truy xuất và xác thực các trị gửi trong form.

Tuy nhiên, còn với những trường hợp như xác nhận trường dữ liệu 1 cách tự động, vô hiệu hóa nút gửi trong khi dữ liệu chưa được xác thực.. bạn nên xem xét sử dụng controlled component.