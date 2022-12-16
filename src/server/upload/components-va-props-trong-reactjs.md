Components cho phép bạn chia UI thành các phần độc lập, có thể tái sử dụng và bạn có thể sử dụng chúng 1 cách độc lập. Trong bài viết này mình sẽ giới thiệu về components trong ReactJS.

Theo lý thuyết, components cũng giống như function JavaScript. Nó cho phép nhập vào các đầu vào tùy ý (props) và trả về những phần tử React mô tả những gì sẽ xuất hiện trên màn hình.

### Function and Class Components

Cách đơn giản nhất để định nghĩa 1 component là viết 1 JavaScript function:

```js
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
```

Function này là 1 component hợp lệ vì nó chấp nhận 1 tham số "props" với dữ liệu và trả về 1 phần tử React. Chúng ta có thể gọi những components như thế này là "function components" vì chúng là những function JavaScript hợp lệ.

Bạn cũng có thể sử dung ES6 để định nghĩa 1 component:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Hai cách trên là ttương đương theo quan điểm của React

### Rendering a Component

Trong React, Các phần tử có thể đại diện cho các components người dùng tự định nghĩa:

`const element = <Welcome name="Minh" />;`

Khi React nhận thấy 1 phần tử đại diện cho 1 component người dùng định nghĩa, nó sẽ chuyển các thuộc tính JSX và thằng con vào component như 1 đối tượng duy nhất.

Ví dụ:

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Minh" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

Ví dụ trên sẽ render ra màn hình "Hello, Minh" với các bước sau:
1. Đầu tiên, chúng ta gọi ReactDOM.render() với phần tử `<Welcome name="Minh" />`.
1. React gọi component Welcome với props: {name: "Minh"}.
1. Component Welcome trả về phần tử `<h1>Hello, Minh</h1>`.
1. ReactDOM sẽ update lại DOM cho khớp với `<h1>Hello, Minh</h1>`.

**!!!Chú ý: Luôn luôn bắt đầu component name với chữ cái in hoa**
React sẽ coi những component bắt đầu với chữ cái in thường là DOM tags. Ví dụ, `<div />` đại diện cho 1 thẻ div HTML, nhưng `<Welcome />` đại diện cho 1 component

### Composing Components

Các component có thể tham chiếu đến những component khác trong đầu ra. Điều này cho phép React sử dụng cùng một component trừ tượng cho bất kỳ component chi tiết nào. Button, Form, Dialog, Screen trong React app, tất cả nên để thành 1 component.

Ví dụ chúng ta có thể tạo 1 component App hiển thị Welcome nhiều lần:

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Minh" />
      <Welcome name="Cuong" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

### Extracting Components

Đừng ngại việc chia component thành các component nhỏ hơn 

Ví dụ, với 1 component Comment:

```js
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
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Nó cho phép chuyền `author`, `text`, `date` như props, và miêu tả 1 commnet trên mạng xã hội.

Component có thể sẽ khó thay đổi vì các phần lồng vào nhau, cà có khó có thể tái sử dụng như 1 phần độc lập. Hãy thử tách ra thành 1 vài component nhỏ hơn.

Đầu tiên, tách component Avatar:

```js
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

Avartar không cần thiết phải biết nó sẽ được render trong component Comment. Đó là lý do tại sao nên cho nó 1 prop chung chung là `user`.

Khi đó component Comment có thể viết lại:

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Chúng ta có thể tách tiếp phần UserInfo thành 1 component:

```js
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

Điều này cho phép có thể đơn gian hóa component Comment hơn:

```js
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Việc phân tách thành các component ban đầu có thể giống như một công việc khó khăn nhưng nó sẽ mang lại hiệu quả rất lớn trong việc tái sử dụng. Như với ví dụ ở trên khi tách UserInfo riêng ra 1 component có thể dễ dàng tái sử dụng với 1 giao diện khác như bài Post, FeedStory, ... 

### Props are Read-Only

Cho dù là khi khai báo 1 component bằng function hay class, nó không bao giờ được sửa đổi prop của chính nó. 

Ví dụ với function dười đây:

```js
function sum(a, b) {
  return a + b;
}
```

Đây là 1 pure function vì nó không cố gắng thay đổi đầu vào và luông trả về 1 kết quả với input giống nhau.

Ngược lại, function gọi là impure nếu nó làm thay đổi đầu vào:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React rất linh hoạt nhưng nó có 1 quy tắc rất nghiêm ngặt là:
**Tất cả các component phải hoạt động giống như 1 pure function với các giá trị prop của chúng.**

### Tống Kết

1, Component cho phép chia UI thành các thành phần nhỏ và độc lập, cho phép truyền các props tùy ý vả trả về phần tử React mô tả
những gì sẽ xuất hiện trên mà hình.

2, Component có thể được viết bằng function hoặc class.

3, Nên chia các phần tử UI (button, form, dialog, ...) thành các component để dễ dàng cho việc tái sử dụng.

4, Tất cả các component phải hoạt động giống như 1 pure function với các giá trị prop của chúng.

### Tài liệu
https://reactjs.org/docs/components-and-props.html