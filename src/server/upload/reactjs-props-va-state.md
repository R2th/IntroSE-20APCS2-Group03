Nếu bạn đã học ReactJS hay React Native, bạn sẽ thấy các Props và State được sử dụng rất nhiều. Vậy chính xác chúng là gì?  Làm thế nào để chúng ta sử dụng chúng đúng mục đích đây?

Khi mình mới bắt đầu tiếp xúc với ReactJS mình đã mất khá nhiều thời gian để hiểu được hai khái niệm này. Chúng trông thật giống nhau nhưng lại sử dụng khác nhau. Và bài viết này chúng ta sẽ cùng tìm hiểu Props và State chính xác là gì nhé.

Props and State là hai kiểu dữ liệu được control như một component
## Props
"props" có nghĩa là gì?

Props thực chất là viết tắt của Properties
### Sử dụng props trong component
Cùng xem ví dụ sau đây:
```
class Welcome extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}

const element = <Welcome name="Sara" />;
```
Dòng `<Welcome name="Sara" />`tạo ra một thuộc tính `name` có giá trị `"Sara"`. Nhìn có vẻ như một cách gọi hàm. Đúng là như vậy `props` được chuyển đến `component` tương tự như cách một đối số được chuyển đến một hàm. Trọng thực tế, thậm chí chúng ta có thể viết một cách ngắn gọn hơn là:
```
function Welcome(props) {
  return <h1>Hello {props.name}</h1>;
}
```
Một `component` cũng có thể có `props` mặc định, do đó nếu `component` không truyền vào `props` nào thì nó vẫn sẽ được thiết lập. Chúng ta có thể tạo thuộc tính `name` mặc định bằng cách thêm `defaultProps` vào lớp `Welcome`:
```
class Welcome extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}

Welcome.defaultProps = {
  name: "world",
};
```
Nếu Welcome được gọi mà không truyền vào bất kỳ thuộc tính `name` nào thì nó đơn giản sẽ `render` ra:
```
Hello world
```
Vì vậy, `props` có thể đến từ `parent`, hoặc có thể được thiết lập bởi chính `component` đó.
### Không nên thay đổi Props
Bạn có thể thay đổi `props` bằng cách sử dụng `setProps` hay `replaceProps` nhưng nó [không được khuyến khích](https://reactjs.org/blog/2015/10/07/react-v0.14.html#new-deprecations-introduced-with-a-warning). 

Kể từ lúc chúng ta truyền `props` vào component thì chúng không được thay đổi. Điều này giúp bạn nghĩ đến sẽ sử dụng props cho bất kì component nào mà luôn hiển thị cùng 1 đầu ra cho cùng 1 đầu vào. Điều này giúp chúng ra dễ dàng kiểm soát nó.
## State
Giống như `props`, `sate` cũng giữ thông tin về component. Tuy nhiên, loại thông tin và cách xử lý nó khác nhau.
State hoạt động khác với Props. State là thành phần của component, trong khi các props lại được truyền giá trị từ bên ngoài vào component
Có một lưu ý nhỏ là chúng ta không nên cập nhật `state` bằng cách sử dụng trực tiếp this.state mà luôn sử dụng setState để cập nhật state của các đối tượng. Sử dụng setState để re-renders một component và tất cả các component con. Điều này thật tuyệt, bởi vì bạn không phải lo lắng về việc viết các xử lý sự kiện (event handler) như các ngôn ngữ khác.
### Khi nào thì sử dụng State
Bất cứ khi nào dữ liệu thay đổi trong một component, State có thể được sử dụng.

Ví dụ như khi bạn có một form nhập input type text mỗi trường trong Form sẽ giữ lại trạng thái của nó dựa trên dữ liệu đầu vào của người dùng (user input). Nếu đầu vào của người dùng thay đổi, trạng thái của các text input sẽ thay đổi, đây là nguyên nhân cần re-rendering của component và tất cả các component con của nó. Và khi này chúng ta sẽ sử dụng state.

### Sử dụng state trong component 
Trước hết chúng ta hãy cùng nhìn vào đoạn code sau
```
class Form extends React.Component {
  constructor (props) {
     super(props)
     this.state = {
       input: ''
     }
  }
handleChange = (text) => {
    this.setState({ input: text })
  }
  
  render () {
    const { input } = this.state
    return (
    <div>
        <label>
          Name:
           <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </div>
      )
    }
 }
```

Trong đoạn code trên, bạn có thể thấy một lớp Form với một state input. Nó hiển thị một text input chấp nhận đầu vào của người dùng. Mỗi khi người dùng nhập văn bản, onChange được kích hoạt, lần lượt gọi setState trên input.

SetState kích hoạt re-rendering lại component, và giao diện người dùng (UI) bây giờ được cập nhật với thông tin mới nhất được nhập từ người dùng. Ví dụ đơn giản này minh họa state trong một component có thể được cập nhật như thế nào và cách sử dụng nó.

## Kết luận
Hi vọng bài viết này sẽ giúp các bạn hiểu thêm về props và state. Cảm ơn các bạn đã theo dõi.
Trong bài viết có tham khảo tại

https://lucybain.com/blog/2016/react-state-vs-pros/

https://reactjs.org/docs/components-and-props.html

https://reactjs.org/docs/state-and-lifecycle.html