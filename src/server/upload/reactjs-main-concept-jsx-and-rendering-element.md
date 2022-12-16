![](https://images.viblo.asia/2dd146ce-83b0-4f37-8c8e-8ea1678d79ee.png)

## Introducing JSX
```javascript
const element = <h1>Hello, world!</h1>;
```
Cú pháp trên không phải là string hay html, nó được gọi là `JSX`, là một javascript syntax extension. JSX sẽ tạo ra các react elements, được sử dụng để mô tả cấu trúc của UI output. 
### JSX Syntax
Cú pháp để viết JSX khá đơn giản, vì được dựa trên cú pháp của XML:
```javascript
<nodename>content</nodename>
```
trong đó nodename là tên của thẻ, có thể là các tag có sẵn của html hoặc chúng ta tự định nghĩa.

JSX không phải là html, vì thế nên ReactDOM sẽ sử dụng `camelCase` để khai báo các properties thay cho HTML attribute, vd `class` của html sẽ là `className` của JSX:
```javascript
<div className="sidebar"></div
```
### Why JSX?
Việc sử dụng JSX trong reactJS là không bắt buộc. Tuy nhiên có nhiều lí do khiến chúng ta muốn dùng đến nó hơn là chỉ dùng js đơn thuần, vd:
* JSX có cú pháp gần giống XML, nên sẽ dễ dàng hơn trong việc định nghĩa và quản lý các component có cấu trúc phức tạp. 
* JSX gần gũi với JS hơn, không làm thay đổi ngữ nghĩa của JS
### Embedding Expressions in JSX
Ta có thể nhúng bất kì JS expression nào trong JSX bằng cách sử dụng dấu ngoặc nhọn `{}`. Ví dụ như chúng ta định nghĩa 1 biến là `name` và dùng nó trong JSX:
```javascript
const name = 'Thanos';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```
Hoặc 1 vd khác, nhúng JS function `formatName(user)` vào thẻ `<h1>`
```javascript
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Tha',
  lastName: 'Nos'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```
### JSX is an Expression Too
JSX bản thân nó cũng chính là 1 expression, có nghĩa là chúng ta có thể sử dụng nó trong các logic thông thường như if else, loop, gán vào biến, giá trị trả về...
```javascript
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```
### Specifying Attributes with JSX
Ta có thể sử dụng dấu ngoặc kép để chỉ định các chuỗi literals:
```javascript
const element = <div tabIndex="0"></div>;
```
Hoặc dấu ngoặc nhọn để nhúng js expression vào attribute:
```javascript
const element = <img src={user.avatarUrl}></img>;
```
### Specifying Children with JSX
Với một thẻ trống, ta có thể đóng lại ngay lập tức với `/>`, như với XML:
```javascript
const element = <img src={user.avatarUrl} />;
```
Để định nghĩa thẻ con cho JSX, ta có thể viết như sau:
```javascript
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```
### JSX Prevents Injection Attacks
```javascript
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```
Chúng ta có thể nhúng các data mà user input vào JSX mà không sợ các vấn đề liên quan đến injection. Bởi vì mặc định thì React DOM sẽ escape các giá trị được nhúng vào JSX, convert tất cả thành string trước khi chúng được render. Việc này nhằm ngăn chặn nguy cơ bị tấn công XSS (cross-site-scripting)
## Rendering Element
### Rendering an Element into the DOM
Giả sử như chúng ta có 1 thẻ div:
```html
<div id="root"></div>
```
Chúng ta gọi nó là root DOM vì mọi thứ bên trong nó sẽ được quản lý bởi React DOM. Với những app chỉ được build bằng React thường sẽ chỉ có duy nhất 1 root DOM node. Nếu trường hợp thêm React vào app đã có sẵn, ta có thể có nhiều root DOM theo ý muốn.

Để render React element vào trong một root DOM, ta sẽ dùng `ReactDOM.render()`
```javascript
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```
### Updating the Rendered Element
Các React elements là bất biến. Tức là ta không thể thay đổi các element con hoặc các thuộc tính của chúng sau khi được khởi tạo. Mỗi react element giống như 1 cảnh trong bộ phim, nó đại diện cho UI ở một thời điểm nhất định, vì thế nên, để update UI thì chỉ có cách tạo thêm element mới, rồi sau đó truyền vào `ReactDOM.render()`

Cùng xem vd tik tok dưới đây:
```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```
Cứ mỗi 1 giây thì ReactDOM sẽ render ra element mới.
### React Only Updates What’s Necessary
ReactDOM sẽ so sánh element (và các element con của nó) với element cũ trước đó, và chỉ update các DOM cần thiết:
![](https://images.viblo.asia/1a2d6555-5704-45e5-9544-b37fcd88c437.gif)

Mặc dù ở bên trên ta tạo mới element mỗi lần gọi vào function `tick`, nhưng chỉ có những node bị thay đổi mới được ReactDOM update lại
## Summary
Bài viết nhằm giới thiệu về 2 trong số những khái niệm chính của ReactJS là *JSX* và *Rendering*. Cảm ơn bạn đã dành thời gian theo dõi.

Source:
- https://reactjs.org/docs/introducing-jsx.html
- https://reactjs.org/docs/rendering-elements.html