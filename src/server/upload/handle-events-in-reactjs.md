Hello mọi người, đây là bài viết thứ 3 trong seri tìm hiểu về reactjs của mình. Trong bài viết trước mình đã giới thiệu sơ qua về State, Props và vòng đời của component, hôm nay chúng ta sẽ cùng tìm hiểu về cách handle event trong Reactjs nha. OK chúng ta bắt đầu ngay thôi nào :grinning:

## Event
Về cơ bản thì việc bắt các sự kiện trong React elements thì cũng tương tự như với việc bắt sự kiện trong DOM elements. Nhưng chúng có một số điểm khác biệt như sau:
* Tên của các sự kiện trong React sử dụng kiểu camelCase, trong khi DOM sử dụng lowercase.
* Với JSX thì bạn sẽ truyền vào một function để xử lý các sự kiện đó

Ví dụ, khi sử dụng HTML:
```
<button onclick="activateLasers()">
  Activate Lasers
</button>
```
sẽ có một chút khác biệt so với React:
```
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
Một điểm khác biệt nữa là bạn không thể return `false` để thẻ link hay button submit có thể `prevent default` (thông thường trong HTML thuần, khi bạn click vào một link thì nó sẽ chuyển hướng luôn đến trang mới, bạn có thể gán `prevent default` cho thẻ link đó và khi đó bạn có thể bắt sự kiện onclick và xử lý trong đó trước khi chuyển hướng sang trang mới) trong React bạn phải gọi đến method `preventDefault`.
Ví dụ, khi sử dụng HTML thuần bạn có thể `prevent default` bằng cách `return false` trong thẻ `link`:
```
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```
Khi sử dụng React:
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
`e` là tổng hợp của sự kiện. Nó được định nghĩa tại [`W3C spec`](https://www.w3.org/TR/DOM-Level-3-Events/), nên bạn không cần phải lo lắng về sự tương thích đối với các trình duyệt khác nhau. Các sự kiện trong React không hoạt động giống như `native events`. Bạn có thể tìm đọc thêm tại [Synthetic Event](https://reactjs.org/docs/events.html).
When sử dụng React, bạn không cần gọi đến phương thức `addEventListener` để thêm `listeners` vào DOM element sau khi sự kiện được tạo. Thay vào đó, chỉ cần cung cấp một `listener` khi element được render.
Khi bạn định nghĩa một component sử dụng ES6, thông thường sẽ truyền vào event một method của class. Ví dụ, component `Toggle` render một button cho phép người dùng toggle giữa `ON` và `OFF`.
```
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
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
Bạn nên cẩn thận khi sử dụng `this` trong JSX callback. Trong Javasctipt, class method không được mặc định `bind`. Nếu bạn không `bind` `this.handleClick`, `this` sẽ báo lỗi `undefined` khi function được gọi.
Nó không phải là trường hợp đặt biệt trong Reactjs, nó là một phần của [`how functions work in Javascript`](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/). Thông thường, nếu bạn gọi đến một method mà không có `()` như là `onClick={this.handleClick}`, bạn nên `bind` method đó.
Nếu bạn không muốn sử dụng `bind`, có 2 cách khác để xử lý trường hợp này. Bạn có thể sử dụng class fields để thay thế cho bind:
```
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
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
`Create React App` cho phép bạn sử dụng syntax trên.
Còn nếu bạn không sử dụng `class fields` syntax, bạn có thể sử dụng `arrow function`trong callback.
```
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```
Vấn đề khi sử dụng `arrow function` như trên là mỗi lần `LoggingButton` được render thì các callback khác nhau lại được khởi tạo. Trong hầu hết trường hợp thì nó sẽ không bị ảnh hưởng. Tuy nhiên, nếu callback được truyền như là một props từ component cha thì những component đó có thể được render lại nhiều lần. Nên mình khuyên mọi người nên sử dụng binding trong constructor hoặc sử dụng `class fields` syntax để tránh các vấn đề về performance.

## Passing arguments to Event Handlers
Ví dụ trong loop, bạn sẽ thường xuyên muốn truyền các argument vào event handler. Ví dụ:
```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
Hai dòng trên là tương đương nhau. Trong cả hai trường hợp, `e` argument đại diện cho sự kiện `onClick` sẽ được truyền vào như là argument thứ 2, sau ID. Đối với `arrow function`, chúng ta cần truyền trực tiếp, nhưng khi sử dụng `bind` nó sẽ được tự động truyền vào.

## Tài liệu tham khảo
* https://reactjs.org/docs/handling-events.html

Âu ki chào các bạn, hôm nay chúng ta đến đây thôi nha :+1: