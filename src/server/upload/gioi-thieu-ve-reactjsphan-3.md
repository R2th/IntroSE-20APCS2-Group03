Trong phần này, chúng ta sẽ tìm hiểu thêm một số thành phần rất quan trọng trong một component, đó là điều khiển các sự kiện trong component.
Xử lý các sự kiện với các phần tử React rất giống với việc xử lý các sự kiện trên các phần tử DOM. Tuy nhiên nó có một số khác biệt về mặt cú pháp:

- Các sự kiện được đặt tên bằng kiểu camelCase, thay vì chữ thường.
- Với JSXchúng ta phải chuyển một hàm để xử lý sự kiện, chứ không phải một chuỗi.

Ví dụ với HTM, chúng ta sẽ viết như sau
```
<button onclick="activateUsers()">
  Activate Users
</button>
```
Trong React sẽ viết:
```
<button onClick={activateUsers}>
  Activate Users
</button>
```
Một khác biệt nữa là chúng ta không thể trả về false để ngăn chặn các sự kiện trong React. Chúng ta phải gọi preventDefault một cách rõ ràng.
Ví dụ: với HTML thuần túy, để ngăn chặn hành vi liên kết mặc định của việc mở một trang mới, chúng ta có thể viết:
```
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```
Trong React, nó sẽ được viết thay thế thành
```
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```
Ở đây, e là một sự kiện tổng hợp. React định nghĩa các sự kiện tổng hợp này theo thông số của W3C, vì vậy chúng ta không cần phải lo lắng về khả năng tương thích giữa các trình duyệt. Khi sử dụng React, chúng ta thường không cần phải thêm `addEventListener`  vào một phần tử DOM sau khi nó được tạo ra. Thay vào đó, chỉ cần cung cấp một lắng nghe khi phần tử được hiển thị lúc ban đầu.

Khi chúng định nghĩa một component sử dụng một lớp theo chuẩn ES6, một phương thức xử lý sự kiện sẽ được viêt là một phương thức trên class. Ví dụ:  component `ToggleStatus` này hiển thị một nút cho phép người dùng chuyển đổi giữa trạng thái “BẬT” và “TẮT”:
```
class ToggleStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```
Chúng ta phải cẩn thận khi sử dụng `this` để gọi các phương thức JSX. Trong JavaScript, các phương thức của class không bị ràng buộc theo mặc định. Nếu chúng ta quên ràng buộc `this.handleClick` và chuyển nó đến onClick, `this` sẽ trở thành `underfined` khi hàm được gọi.

Đây không phải là yêu cầu đặc biệt trong React, nó chỉ là một phần cách thức hoạt động của các hàm trong Javascript. 
Nói chung, nếu chúng ta gọi đến một phương thức nào đó, chẳng hạn như onClick = {this.handleClick}, chúng ta nên liên kết với phương thức đó.

Nếu chúng ta cảm thấy phiền khi liên kết, thì chúng ta có hai cách có thể giải quyết vấn đề này. Nếu chúng ta đang sử dụng cú pháp public, chúng ta có thể sử dụng các class field để ràng buộc đúng các hàm callback:
```
class LoggingButton extends React.Component {
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```
Còn nếu không chúng ta có thể viết như sau:
```
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```
Vấn đề với cú pháp này là một callback khác nhau sẽ được tạo ra mỗi khi LoggingButton được render. Trong hầu hết các trường hợp, điều này là tốt. Tuy nhiên, nếu callback này được truyền như một prop cho các component con, thì các component đó có thể render lại. Do vậy, chúng ta  nên ràng buộc trong hàm contractor hoặc sử dụng cú pháp class field, để tránh vấn đề về hiệu suất này.

**Truyền đối số cho hàm xử lý sự kiện**

Bên trong một vòng lặp, nó là cách làm phổ biến để muốn thêm một tham số vào một xử lý sự kiện. Ví dụ: nếu `id` là ID của dòng, thì một trong các cách sau sẽ hoạt động:
```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
Trong cả hai trường hợp, đối số e biểu diễn sự kiện React sẽ được chuyển thành đối số thứ hai sau ID. Với chức năng của các dòng, chúng ta phải truyền nó một cách rõ ràng, nhưng với việc ràng buộc bất kỳ đối số nào khác sẽ được tự động chuyển tiếp.








.