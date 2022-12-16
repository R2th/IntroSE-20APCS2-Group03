Xin chào các bạn hôm nay chúng ta tiếp tục tìm hiểu về ReactJs nhé mn. Và bài hôm nay chúng ta sẽ nói về Form

### Forms
Với các ứng dụng web thì form là một trong những thành phần không thể thiếu,v à với ReactJS cũng vậy. Tuy nhiên Form trong ReactJs có vài sự khác biệt so với là HTML Form. Với HTML form thì việc thay đổi giá trị các property sẽ được quản lý một cách nội bộ và gần như chúng ta sẽ khó để handle giá trị trước khi thay đổi.

Ví dụ về một HTML Form

```Javascript
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

Đây là một ví dụ điển hình về HTML Form, với chức năng chính là di chuyển tới 1 trang mới khi người dùng submit form. Với cấu trúc trên thì các bạn có thể trong ReactJS một cách thoải mái và nó sẽ hoạt động bình thường.

Nhưng trong hầu hết các trường hợp thật tiện lợi khi có một hàm JavaScript xử lý việc submit form và cho phép chúng ta có quyền truy cập vào các giá trị của form. Một trong những cách để thực hiện điều đó là sử dụng kỹ thuật "Controlled Components".

### Controlled Components
Với HTML thì các phần tử như `<input>`  `<textarea>` `<select>` là các phần tử thường được sử dụng để thay đổi giá trị của form và các thay đổi này sẽ được update dựa trên việc người dùng thay đổi input.

Chúng ta nhắc lại một chút về React State. Chúng ta có local state, nó cho phép chúng ta khởi tạo và lưu trữ các object cần thiết cho component, các giá trị này chỉ được update thông qua `setState()`

Và chúng ta có thể kết hợp form và React State để có được "Controlled component". Nó có thể hiểu như sau:
 - React Component sẽ render form cùng các control.
 - Và khi user thay đổi giá trị của input thì chúng ta có thể sử dụng `setState()` để update cho component state luôn

Với việc kết hợp này chúng ta có thể dễ dàng handle được việc các giá trị thay đổi, cũng như khi submit form.

Ví dụ như sau, thay vì chuyển tới một trang mới chúng ta sẽ log lại các giá trị thay đổi khi submit form, và chúng ta sẽ sử dụng "Controlled component"

```Javascript

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

Khi `value` được gán cho control trong form thì giá trị hiển thị luôn là giá trị mới nhất của state `this.state.value`.
>  making the React state the source of truth
>  
Và khi tất cả các control trong form sử dụng data từ state thì sau này chúng ta mong muốn làm việc gì thì chỉ việc lấy từ state ra và sử dụng thôi, nó sẽ đảm bảo được giá trị trong state là giá trị chuẩn nhất.
Sau khi đã set `value` control từ state thì để update state thì chúng ta sẽ định nghĩa function để update nó, trong ví dụ trên là function `handleChange`, khi user có bất kỳ hành động nào update input thì `handleChange` sẽ được chạy và update state, state được update thì UI cũng sẽ đc render lại.

```Javascript
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```

### The textarea Tag
Trong html thì `<textarea>` được định nghĩa để xử lý text.
```Javascript
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

Còn đối với React thì thẻ `<textarea>` sử dụng attribute `value` thay vì sử dụng các phần tử con của nó.

```Javascript
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

> Notice that this.state.value is initialized in the constructor, so that the text area starts off with some text in it.
> 
một khuyến cáo được đưa ra là khi sử dụng thẻ `<textarea>` thì giá trị ban đầu phải được khởi tạo.

### The select Tag
Trong HTML thì thẻ `<select>` sẽ tạo ra 1 drop down list.

ví dụ:

```Javascript
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

Còn với React thì nó sẽ cú pháp như sau:

```Javascript

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

```

Bạn có thể đưa một array vào `value` của thẻ `<select>` nhưng nhớ set attribute `multiple`.

```
<select multiple={true} value={['B', 'C']}>
```

Điểm khác biệt giữa HTML thuần và React khi sử dụng thẻ  `<select>` như sau:
 - HTML sử dụng attribute `selected` để xác định option được select, còn với React thì sử dụng attribute `value`


> Cả 3 thẻ `<input type="text">`, `<textarea>`, and `<select>` đều chấp nhận attribute `value`

### The file input Tag
Trong HTML thì thẻ input có `type="file"` sẽ cho phép người dùng chọn file từ thiết bị lưu trũ. Nhưng `value` của nó là read only nên sẽ ko đề cập tới trong bài ngày hôm nay

```
<input type="file" />
```

### Handling Multiple Inputs
Từ đầu bài viết thì chúng ta chỉ làm việc với 1 form chỉ có 1 control thôi nhưng trong thực tế thì khi làm việc với form chắc chắn sẽ có rất nhiều control. Vậy làm sao để chúng ta có thể handle được việc đó.

Khi chúng ta cần handle nhiều control trong một form thì cần phải nhớ những điều sau:
 - Cần phải add attribute `name` cho mỗi control.
 - Chúng ta có thể access control thông qua giá trị của `event.target.name`

Ví dụ như sau:

```Javascript
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

Một note nhỏ khi các bạn sử dụng version của ES (ECMAScript).
Với các phiên bản ES6 thì cho phép các bạn access key một cách đơn giản như sau

```Javascript
this.setState({
  [name]: value
});
```

Còn đối với các phiên bản ES5 thì chúng ta cần phải thực hiện như sau:

```Javascript
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

### Controlled Input Null Value.

Hiểu đơn giản là khi chúng ta set cứng value cho input thì giá trị của input sẽ ko bị thay đổi bởi người dùng (khoá luôn ko cho sửa).

Còn nếu các  bạn muốn cho phép người dùng thay đổi giá trị thì set value cho nó bằng Null

```
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
```