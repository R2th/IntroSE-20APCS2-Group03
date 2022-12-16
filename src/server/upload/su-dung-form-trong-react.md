Form ?? Cái tên rất quen thuộc đối với bất kì lập trình viên nào nhưng liêụ bạn đã bao giờ tự đặt câu hỏi nó là gì một cách cụ thể và sử dụng chúng trong một ứng dụng React như thế nào chưa ? 

Hôm nay chúng ta sẽ cùng tìm hiểu cách sử dụng forms trong một ứng dụng React cơ bản.



### 1. Form là gì ?
**Định nghĩa**
> The HTML <form> element defines a form that is used to collect user input.
*Định nghĩa từ:  [w3schools](https://www.w3schools.com/html/html_forms.asp)*

Về cơ bản, form là một đối tượng html được sử dụng để có thể tương tác với người dùng. Một HTML form bao chứa lấy các phần tử bên trong của nó. Các phần tử html được sử dụng trong form tương đối đa dạng nhưng được sử dụng thông dụng nhất như input, checkbox, radio button, submit button...

**Form được sử dụng ở đâu ?**
Thông thường, form được sử dụng để:
1. Tìm kiếm
2. Contact forms (Form liên lạc)
3. Shopping carts checkout
4. Login and registration
...
![](https://images.viblo.asia/f0931db0-6b36-477c-86ca-61ffe08f2656.png)
*Một ví dụ về việc sử dụng form đăng kí*


### 2. React Form


Việc sử dụng forms trong React có thể làm cho form trở nên linh hoạt và tương tác nhiều hơn. Có hai cách xử lý form trong React, chúng khác nhau chủ yếu trong cách quản lý dữ liệu:
*     Nếu dữ liệu được xử lý bởi DOM, chúng ta gọi là `uncontrollerd components`
*     Nếu dữ liệu được xử lý bởi components, chúng ta gọi chúng là `controlled componens`

Như bạn có thể tưởng tượng, `controlled components` là những thành phần bạn sẽ sử dụng trong hầu hết thời gian tương tác với React. Nhưng thỉnh thoảng bạn vẫn cần sử dụng tới `uncontrolled components`, ví dụ như <input type="file">

    

Khi thay đổi các trạng thái trên form được quản lý bởi các component, chúng ta sử dụng `onChange`:
```
class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: '' }
  }

  handleChange(event) {}

  render() {
    return (
      <form>
        Username:
        <input
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}
```


Trong class components, cập nhật trạng thái mới, chúng ta phải sử dụng `this` để có thể bind tới phương thức `handleChange`
```
class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  render() {
    return (
      <form>
        <input
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}
```

Tương tự, chúng ta sử dụng `onSubmit` để submit data khi form được gửi đi.
    
```
class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    alert(this.state.username)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
```
    
 Sử dụng validate trong form có thể được xử lý ngay bên trong hàm `handleChange`. Bạn có thể truy cập vào giá trị của state trước đó và thay đổi của state ngay sau khi người dùng tương tác trên DOM.
    
 Dưới đây là một số ví dụ đối với các phần tử HTML khác của forms khi sử dụng trong React:
Textarea:
```
<textarea value={this.state.address} onChange={this.handleChange} />
```
select tag: 
```
<select value="{this.state.age}" onChange="{this.handleChange}">
  <option value="teen">Less than 18</option>
  <option value="adult">18+</option>
</select>
 ```
Trên đây mình đã giới thiệu về forms và cách sử dụng form để validate trực tiếp dữ liệu trên DOM, cách submit data sử dụng forms trong React. Rất mong nhận đươc ý kiến đóng góp từ mọi người.
    
### 3. Tham khảo
https://flaviocopes.com/react-forms/