## Introduction
![component](https://images.viblo.asia/c3dedbed-2f7e-49fc-b7f2-3bd82f8dd37a.jpg)

* Các component trong reactjs đóng vai trò giống như các function trong js, nhưng chúng hoạt động độc lập và có nhiệm vụ trả về các thành phần html thông qua hàm `render`
* Có 2 loại component là *Function component* và *Class component*
## Function and Class Components
### Function Component
Trong ReactJS, cách dễ nhất để định nghĩa 1 component là viết một JavaScript function, với response trả về là html:
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
Đây cũng chính là cách để định nghĩa một *Function component*
### Class Component
Chúng ta cũng có thể sử dụng `ES6 Class` để định nghĩa một component, đây được gọi là *Class component* trong ReactJS:
```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
Cả 2 component trong vd trên đều trả về cùng 1 response html tương tự nhau.
## Rendering a Component
React element không chỉ biểu diễn cho thẻ DOM, chúng ta còn có thể dùng nó để biểu diễn các components tự định nghĩa: 
```javascript
const element = <Welcome name="Thanos" />;
```
Khi React phát hiện 1 element là 1 component tự định nghĩa, nó sẽ truyền các JSX attribute vào component đó, và ta gọi các attribute này là `props`:
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Thanos" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
Cùng nhìn vd trên:
* Ta thực hiện call `ReactDOM.render()` với element `<Welcome name="Thanos" />`
* React sẽ call component `Welcome` với `props` là `{name="Thanos"}`
* Component `Welcome` sẽ trả về html response: `<h1>Hello, Thanos</h1>`
* React DOM sẽ lo nốt việc còn lại, đó là update lại DOM tương ứng để match với html response từ Component `Welcome`

Lưu ý là React sẽ phân biệt DOM tags và Component bằng chữ cái đầu tiên, nếu viết thường sẽ là DOM tags (vd: `<div />`), còn nếu chữ cái đầu in hoa sẽ là component (vd: `<Welcome />`). Cho nên tên của component lúc nào cũng phải bắt đầu bằng chữ in hoa.
## Composing Components
Các component có thể tham chiếu đến nhau ở output của chúng. Điều này giúp cho chúng ta có thể sử dụng kết hợp và tùy biến các component, vd như 1 component render đến nhiều component khác:
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Thanos" />
      <Welcome name="Thor" />
      <Welcome name="Iron Man" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
## Extracting Components
Một component có thể được chia thành nhiều các component nhỏ khác nhau bên trong nó.
Xét vd dưới, ta định nghĩa 1 function component `Comment`:
```javascript
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
props ở trên bao gồm `author` là object, `text` là string  và `date` là date. Với những Component có props dạng nested như trên thường rất khó cho việc thay đổi logic hoặc tái sử dụng các thành phần bên trong. Chúng ta có thể chia nhỏ các thẻ html thành các component con tương ứng.

Đầu tiên sẽ là `Avatar`:
```javascript
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```
Vì ta tách `Avatar` thành 1 component riêng không chỉ dùng ở trong component `Comment`, nên không nhất thiết tên props phải là `author`. Khi tách riêng component để tái sử dụng ở nhiều chỗ thì nên đặt tên props phù hợp với chức năng của component đó hơn là ngữ cảnh ở nơi mà component được sử dụng.

Bây giờ component `Comment` sẽ được rút gọn lại 1 chút:
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
Để thuận tiện hơn, ta sẽ tách phần `UserInfo` thành 1 component riêng, và render cả component `Avatar` bên trong nó:
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
Bây giờ component `Comment` đã khá gọn gàng, và component `UserInfo` có thể được tái sử dụng ở bất cứ đâu chúng ta muốn:
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
## Props are Read-Only
Dù khởi tạo component thuộc loại *function* hay *class*, component cũng không bao giờ thay đổi props của chính nó. Mặc dù ReactJS khá linh hoạt nhưng nó có một quy tắc chung là *"Tất cả các component đều phải là pure function, không được thay đổi giá trị của input và output phải luôn cùng kiểu định dạng"*. Vì thế chúng ta nên sử dụng props cho các component nào mà luôn hiển thị cùng 1 đầu ra cho cùng 1 đầu vào, điều này giúp chúng ta dễ dàng kiểm soát nó hơn.

Nhưng dữ liệu ở UI thường là động và thay đổi liên tục theo thời gian, trong trường hợp chúng ta muốn thay đổi output của component tương ứng với response mà không vi phạm đến quy tắc trên, ta sẽ tìm hiểu về `State` ở bài tiếp theo.

## Summary
Bài viết nhằm chia sẻ về *Component* và *Props* trong reactJS. Cảm ơn bạn đã dành thời gian theo dõi.

Source: https://reactjs.org/docs/components-and-props.html