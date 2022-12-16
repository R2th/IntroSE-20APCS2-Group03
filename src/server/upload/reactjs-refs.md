Trong bài viết hôm nay chúng ta sẽ cùng nhau tìm hiểu về `Refs (References)`, đây là một tính năng cho phép `React components` có thể tương tác với các `child element` của chúng. Trong hầu hết các trường hợp, `refs` được sử dụng để tương tác với các UI element hay chính là các element nhận input từ người dùng. Ví dụ như một HTML form. 
Để đơn giản và dễ hiểu chúng ta sẽ tạo một ReactJs project nhỏ, đặt tên là `refs-demo`
```gradle
create-react-app refs-demo
```
Chúng ta thu được project như sau (ở đây mình dùng VSCode nhé :D)
![](https://images.viblo.asia/3e64b04c-0a95-4ced-a842-067ffbc34343.png)
Chạy thử project
```gradle
npm start
```
Project sẽ được chạy trên `localhost:3000` ở trình duyệt mặc định của máy. Để đơn giản chúng ta sẽ chỉ tạo một form gồm một `input` và một `button`.
```javascript
class App extends Component {
  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="title" required />
        <button>Add</button>
      </form>
    )
  }
}
```
Khi người dùng ấn button `Add`, trình duyệt sẽ thông báo nội dung trong `input` lên màn hình và reset lại form (clear nội dung trong `input`). Ở đây chúng ta sẽ sử dụng `refs` để tương tác với các element trong form.
```javascript
class App extends Component {
  
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit(e) {
    const {_title} = this.refs
    e.preventDefault()
    alert(_title.value)
    _title.value = ''
    _title.focus()
  }
  
  render() {
    return (
      <form onSubmit={this.submit}>
        <input ref="_title" type="text" placeholder="title" required />
        <button>Add</button>
      </form>
    )
  }
}
```
Chú ý ở đây chúng ta cần bind `this` trong constructor để định nghĩa this trong hàm `submit` nhé. Để lấy các `refs`, chúng ta sử dụng `this.refs`. Định nghĩa `ref="_title"` tức là `_title` chính là `input`, do đó `_title.value` chính là value của input. Còn khi chúng ta muốn reset input, chúng ta chỉ cần gán lại giá chị rỗng cho thẻ input bằng cách `_title.value = ""`. Thật đơn giản phải không nào :D  

### Inverse Data Flow
Phần tiếp theo này chúng ta tìm hiểu cách có thể gửi dữ liệu từ component hiện tại cho một function nào đó nằm ngoài component. Đây được gọi là `inverse data flow`. Nó thỉnh thoảng cũng được mô tả như `two-way data binding`. Cách làm cũng rất đơn giản, chúng ta sẽ truyền một `callback` function cho component như một `property`, do đó component có thể truyền ngược dữ liệu như một tham số của `callback`.
Như ở ví dụ trên, chúng ta sẽ không thông báo trực tiếp trong component mà chúng ta sẽ thông bảo ở ngoài commponent như sau

**index.js**
```javascript
const notify = title => alert(title)

ReactDOM.render(<App notify={notify} />, document.getElementById('root'));
registerServiceWorker();
```
Như vậy chúng ta đã truyền function notify như một property của App component. Bây giờ chúng ta sẽ sử dụng nó trong App component

**App Component**
```javasript
  submit(e) {
    const {_title} = this.refs
    e.preventDefault()
    // callback
    this.props.notify(_title.value)
    _title.value = ''
    _title.focus()
  }
```

Dòng lệnh `this.props.notify(_title.value)` có tác dụng truyền giá trị của input cho function `notify` trong `index.js`. 

Chạy lại project, chúng ta thu được kết quả tương tự!![](https://images.viblo.asia/43443d9a-f36f-48d3-b93e-f84edf579648.png)

Tuy nhiên ở đây chúng ta cần chú ý trong trường hợp function `notify` không tồn tại, khi đó đoạn code trên sẽ gây lỗi. Ở đây có hai cách để xử lý vấn đề này
1. Chúng ta sẽ check sự tồn tại của function `notify` như sau
```javascript
    if (this.props.notify) {
      this.props.notify(_title.value)
    }
```
2. Chúng ta sẽ sử dụng `default props` và `props type`
```javascript
    App.propTypes = {
      notify: PropTypes.func
    }

    App.defaultProps = {
      notify: f => f
    }
```
Đối với cách 2 chúng ta cần cài đặt `PropTypes` bằng cách `npm install --save prop-types` và import vào App component `import PropTypes from 'prop-types'`. Chúng ta nên sử dụng cách 2 để code trông rõ ràng và mạch lạc hơn nhé :D

### Refs in Stateless Functional Components
Như trong ví dụ trên chúng ta có thể thấy là chúng ta đã không sử dụng `state`, do đó không cần thiết sử dụng dạng `Statefull Components` mà chỉ cần sử dụng `Stateless Functional Components`. Chúng ta sẽ tìm hiểu cách sử dụng `refs` trong dạng component này.

Rõ ràng với component này thì không tồn tại từ khóa `this`, do đó chúng ta sẽ không thể sử dụng `this.refs`. Thay vào đó chúng ta sẽ sử dụng thuộc tính của các element, hay nói cách khác là chúng ta sẽ cài đặt `refs` sử dụng function. Function này sẽ truyền `input` như một tham số. 

```javascript
const App = ({notify=f=>f}) => {
  let _title
  const submit = e => {
    e.preventDefault()
    notify(_title.value)
    _title.value = ''
    _title.focus()
  }
  return (
    <form onSubmit={submit}>
      <input ref={input => _title = input} type="text" placeholder="title" required />
      <button>Add</button>
    </form>
  )
}
```
Trông có vẻ ngắn gọn hơn rồi các bạn nhỉ :D

Trên đây là cách sử dụng `Refs` trong một ứng dụng ReactJs. Các bạn hãy sử dụng một cách linh hoạt và hiệu quả nhé. Chúc các bạn thành công :D

#### Tài liệu tham khảo: 
https://reactjs.org/docs/refs-and-the-dom.html

http://shop.oreilly.com/product/0636920049579.do
#### Cảm ơn các bạn đã đọc bài viết. Happy coding!!!