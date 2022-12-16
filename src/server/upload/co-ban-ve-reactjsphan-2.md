Trong phần này, chúng ta sẽ tập trung vào tìm hiểu Components và props trong react js.
Trong React, một component có thể được tạo từ một funtion hay một class. Nếu là một funtion thì component sẽ được viết như sau
```
function Hello(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
funtion này là một thành phần React hợp lệ vì nó chấp nhận các dữ liệu truyền vào thông qua các props và trả về một phần tử React. Chúng ta gọi các component này là “funtion” bởi vì chúng đúng là các hàm JavaScript.
Chúng ta cũng có thể sử dụng chuẩn ES6 để tạo môt component
```
class Hello extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
**Rendering một component**
Để render một component đầu tiên chúng ta phải có một element để render
```
const element = <div />;
```
chúng ta cũng có thể khai báo trực tiếp component và truyển dữ liệu vào nó
```
const element = <Welcome name="Test" />;
```
Khi React thấy một phần tử đại diện cho một component do người dùng định nghĩa, nó sẽ chuyển các thuộc tính JSX đến thành phần này dưới dạng một đối tượng duy nhất và chúng ta gọi đối tượng này là "props".
Với ví dụ trên chúng ta sẽ viết code như sau
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Test" />;
ReactDOM.render(
  element,
  document.getElementById('body')
);
```
**Thành phần component**
Các component có thể tham chiếu đến các component khác trong đầu ra của chúng. Điều này cho phép chúng ta sử dụng cùng một component cho bất kỳ chi tiết nào. Một button, một form, một dealog. Trong các ứng dụng React, tất cả các thành phần thường được thể hiện dưới dạng các component.
Vi dụ như chúng ta có thể tạo thêm component `App` để chứa nhiều component `Welcome`.
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Test1" />
      <Welcome name="Test2" />
    </div>
  );
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
**Phân tách các component**

Khi viết các component, chúng ta nên chia component thành các component nhỏ hơn.
ví dụ chúng ta có một component là `comment`như sau:
```
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
    </div>
  );
}
```
Component này có thể phức tạp để thay đổi vì chúng lồng nhau, và cũng khó để tái sử dụng các phần riêng lẻ của nó. Do vậy chúng ta sẽ tạo vài component từ nó.

Đầu tiên là component `Avatar`:
```
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```
Component `Avatar ` không cần biết rằng nó đang được hiển thị bên trong một Comment. Đây là lý do tại sao chúng ta chỉ cần cho prop của nó là một `user` chứ không phải `author`..
Bây giờ component `Comment` sẽ có cấu trúc như sau:
```
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
    </div>
  );
```
**Các Props chỉ  Read-Only**
Cho dù chúng ta  khai báo một component là một function hay một classs, thì cũng không bao giờ được sửa đổi các props của nó.
Hãy xem xét fuction sum sau:
```
function sum(a, b) {
  return a + b;
}
```
Các hàm như vậy được gọi là "pure" bởi vì chúng không cố gắng thay đổi giá trị các đầu vào của chúng và luôn trả về cùng một kết quả cho với các đầu vào.

Hàm dưới đây được gọi là impure
```
function sum(user, amount) {
  user.total -= amount;
}
```
React khá linh hoạt nhưng nó có một quy tắc nghiêm ngặt duy nhất là tất cả các component React phải hoạt động như các funtion pure đối với các props của chúng.