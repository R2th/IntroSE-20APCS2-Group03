# React Form
## Thêm thành phần Form vào trong React 
### Thêm form input
Form nhập liệu là một thành phần quan trọng trong trang web. Vì nhờ `form` trang web có thể tương tác với người dùng, thu thập các thông tin từ phía người dùng.

Vì tầm quan trọng của nó nên react không thể thiếu `form`. 
Để thêm thành phần `form` vào trong react ta có thể dùng `jsx`:
```js
class NameForm extends React.Component {
  render() {
    return (
      <form>
        <h1>Hello</h1>
        <p>Enter name:</p>
        <input
          type="text"
        />
      </form>
    );
  }
}
ReactDOM.render(<NameForm />, document.getElementById('root'));
```
Form cho phép nhập sử dụng các thẻ như HTML thông thường
{@codepen: https://codepen.io/duongquangmanh/pen/rEKEGK}
    
Trong HTML, các thành phần của form như: `<input>`, `<textarea>`, `<select>` thường duy trì trạng thái riêng của chúng và cập nhật nó dựa trên các thay đổi đầu vào của người dùng. Trong React các trạng thái này có thể được cập nhật trong thuộc tính `state`. 

Chúng ta có thể hợp nhất các cách quản lý thay đổi trạng thái thành một cách duy nhất bằng React. 

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
          <h1>Hello</h1>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
Do `value={this.state.value}` nên giá trị `value`sẽ được cập nhật dự trên `state`. 

Hàm `handleChange` sẽ được gọi khi có sự thay đổi từ nhập liệu. Ta có thể chỉnh sửa `value` tại đây:
ví dụ:
```js
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```
Khi submit Form chúng ta có thể quản lý bằng sự kiện onSubmit trong thẻ <form>. 
    
Chú ý: khi thuộc tính `value` được xét bằng `this.state.value` thì các thay đổi `value` sẽ chỉ được thực hiện qua `state`. 
Có thể đặt `value="Nam"` sẽ mặc định giá trị là "Nam" và không thể thay đổi, nếu muốn đặt mặc định và có thể thay đổi ta đặt giá trị ban đầu cho `state value`:
```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'Hello'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  ...
```

### textarea 
Khác với cách sử dụng trong HTML:
```html
<textarea>
  Hello there, this is some text in a text area
</textarea>
```
Trong React, chúng ta sẽ sử dụng thuộc tính `value` để đặt giá trị text xuất hiện giống với cách làm của thẻ `input`:
```html
<textarea value={this.state.value} onChange={this.handleChange} />
```
### select
Tương tự như `textare` và`input` chúng ta cũng sử dụng `value` để đặt `option selected`:
```html
 <select value={this.state.value} onChange={this.handleChange}>
    <option value="grapefruit">Grapefruit</option>
    <option value="lime">Lime</option>
    <option value="coconut">Coconut</option>
    <option value="mango">Mango</option>
  </select>
```
### Xử lý nhiều đầu vào
Khi sử lý nhiều đầu vào (input, textarea,...) chúng ta có thể sử dụng thuộc tính `name` để đánh dấu phần tử và gọi bằng cách {event.target.name}
```js
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
Do `radio` có "name" trùng tên nhau nên cần phải nhận sự kiện thay đổi trên cả thẻ bao ngoài của chúng
ví dụ:
```js
<div onChange={this.handleChangeGender}>
    <input type="radio"
        name="gender"
        value="male" defaultChecked />Male
    <input type="radio"
        name="gender"
        value="female" />Female
</div>
```
Ngoài ra để xét thuộc tính `checked` cho `radio`, `checkbox` react sử dụng thuộc tính `"defaultChecked"` 
## Validate
Do có thể quản lý được những sự kiện thay đổi của thẻ nên việc `validate` cũng rất dễ dàng khi sử dụng:
```js
handleSubmit(e) {
    e.preventDefault();

    const name = ReactDOM.findDOMNode(this._nameInput).value;
    const email = ReactDOM.findDOMNode(this._emailInput).value;
    const password = ReactDOM.findDOMNode(this._passwordInput).value;

    const errors = validate(name, email, password);
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    // submit the data...
  }
    
  function validate(name, email, password) {
  // we are going to store errors for all fields
  // in a signle array
  const errors = [];

  if (name.length === 0) {
    errors.push("Name can't be empty");
  }

  if (email.length < 5) {
    errors.push("Email should be at least 5 charcters long");
  }
  if (email.split("").filter(x => x === "@").length !== 1) {
    errors.push("Email should contain a @");
  }
  if (email.indexOf(".") === -1) {
    errors.push("Email should contain at least one dot");
  }

  if (password.length < 6) {
    errors.push("Password should be at least 6 characters long");
  }

  return errors;
}
```
{@codepen: https://codepen.io/duongquangmanh/pen/mZzzqB}
                          
# Tài liệu tham khảo
Bài viết có tham khảo từ nguồn: [reactjs.org](https://reactjs.org/docs/forms.html)