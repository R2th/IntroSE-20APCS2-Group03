Trong React, chúng ta có 3 loại components bao gồm: Functional stateless component, Component và Pure component. Vậy điểm khác nhau giữa chúng là gì và chúng ta nên sử dụng mỗi loại đó trong những trường hợp cụ thể nào? Hãy cùng mình đi tìm câu trả lời trong bài viết này nhé!

# 1. Functional stateless components
Đây là component được khai báo dưới dạng 1 function, do đó nó là một stateless component, và output (được rendered) chỉ phụ thuộc vào props truyền vào cho function.
- **Đặc điểm:**
* Đây là cách đơn giản nhất để định nghĩa 1 component trong React. Nếu ta không cần quản lý bất kỳ state nào, thì đây là cách làm hợp lý bởi điểm khác biệt lớn nhất của việc sử dụng function thay vì class là bạn có thể hoàn toàn đảm bảo rằng output của nó chỉ phụ thuộc vào input được cấp cho hàm.
* App của bạn nên hướng tới mục tiêu có nhiều component stateless nhất có thể, bởi điều đó khiến bạn có thể quản lý logic của app dễ dàng hơn, cũng như dễ dàng test và tái sử dụng...
- **Tuy nhiên có một số hạn chế khi sử dụng loại component này:**
* Nó không có các phương thức trong lifecycle, bởi vậy bạn sẽ không thể tạo các các xử lý logic đặc thù như với Component hay Pure component
* Không có cách nào để kiểm soát việc render. Việc re-render xảy ra liên tục mỗi khi component cha của nó có cập nhật.
* Không hỗ trợ Refs
- Như vậy, tuy Functional stateless Components đem lại lợi ích giúp việc quản lý logic trở nên đởn giản hơn nhưng nó lại có nhược điểm về mặt performance, bởi việc tối ưu render đã không còn được như ở React.Component hay Pure Component. Bạn có thể kiểm nghiệm điều này qua ví dụ tại [đây](https://codepen.io/nvtcp9x/pen/MVbdwN)
```
function TestFunctionalComponent (props) {
  console.log('TestFunctionalComponent rendered')

  return <div>TestFunctionalComponent {props.children}</div>
}

class RenderExample extends React.Component {
  constructor (props) {
    super(props)
    this.state = {clicked: false}
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.setState({clicked: !this.state.clicked})
  }

  render () {
    return <div>
      <button onClick={this.onClick}>Button {this.state.clicked && 'clicked'}</button>
      <TestFunctionalComponent />
    </div>
  }
}

ReactDOM.render(<RenderExample />, document.getElementById('root'))
```
Trong ví dụ trên, mỗi khi bạn click vào button thì state của component cha sẽ thay đổi, điều đó dẫn đến việc re-render Functional stateless components con nằm trong nó, mặc du component cha không hề truyền xuống cho component con bất kỳ props nào cả.

=> Như vậy: Với các component chỉ dùng để hiển thị view và muốn được tái sử dụng dễ dàng thì chúng ta nên dùng stateless functional components. Điều này sẽ khiến việc quản lý logic app được dễ dàng hơn, tránh được các side effects không mong muốn. Nhưng cũng cần cân nhắc khi sử dụng bởi nó sẽ không giúp tối ưu performance như các loại component khác.

# 2. React Component & Pure Component
Đây là dạng component đã rất quen thuộc với những người làm việc cùng React, nó có đầy đủ các life cycle để ta có thể tạo ra các code logic xử lý đặc thù trước hoặc sau khi render. Component dạng này được khai báo với cú pháp như sau:
```
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
Thử thay loại component này vào ví dụ phía trên ta được 1 component sau [đây](https://codepen.io/nvtcp9x/pen/RMpPmy)
```
class TestReactComponent extends React.Component {
 
  render () {
     console.log('TestReactComponent rendered')
     return <div>TestReactComponent </div>
  }
 
}

class RenderExample extends React.Component {
  constructor (props) {
    super(props)
    this.state = {clicked: false}
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.setState({clicked: !this.state.clicked})
  }

  render () {
    return <div>
      <button onClick={this.onClick}>Button {this.state.clicked && 'clicked'}</button>
      <TestReactComponent />
    </div>
  }
}

ReactDOM.render(<RenderExample />, document.getElementById('root'))
```
Mặc dù chuyển thành dạng React.Component nhưng component vẫn sẽ re-render không cần thiết, nguyên nhân là do hàm setState sẽ luôn kích hoạt sự kiện re-render, và điều đó sẽ đôi lúc dẫn tới việc re-render không cần thiết. Việc re-render này sẽ được thực hiện ở cả component hiện tại đã thực hiện setState và component con trực tiếp của nó (kể cả props truyền xuống cho component con đó không có gì thay đổi). Giải pháp đặt ra là bạn có thể bổ sung code check props vào method shouldComponentUpdate ở component TestReactComponent để đảm bảo nó sẽ chỉ re-render mỗi khi có sự thay đổi về props. Đó cũng là cách mà PureComponent thực hiện, PureComponent cũng là 1 React.Component nhưng đã implement thêm phần logic check này.
*Tuy nhiên, lưu ý quạn trọng khi sử dụng method shouldComponentUpdate là: Returning false does not prevent child components from re-rendering when their state changes. - [React Docs](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)*

Và khi thay thế thành PureComponent vào ví dụ trên thì đã không còn tình trạng re-render không cần thiết nữa (check code tại [đây](https://codepen.io/nvtcp9x/pen/vRxBEg))
Như vậy, PureComponent đã giải quyết được vấn đề về performance vẫn tồn tại ở React.Component, đó là việc ngăn chặn sự render không cần thiết, vậy từ giờ chúng ta thay thế toàn bộ các React.Component thành PureComponent có được không?
Câu trả lời cho câu hỏi trên là không, bởi lẽ PureComponent dùng shallow equality để kiểm tra props và state có thay đổi hay không, vậy nên trong nhiều trường hợp props và state là dạng complex và có sự thay đổi nhưng shallow equality không phát hiện ra thay đổi đó => Không render khi cần thiết (chi tiết hơn về vấn đề này bạn có thể tham khảo thêm tại [bài viết này](http://lucybain.com/blog/2018/react-js-pure-component/))
Tuy nhiên, trường hợp trên cũng là hi hữu vì việc mutate state trực tiếp (ví dụ push thêm item vào state dạng array...) là anti pattern trong React. Ví dụ về trường hợp này, mình có viết một [đoạn code sau](https://codepen.io/nvtcp9x/pen/aYpMrj):
```
class TestPureComponent extends React.PureComponent {
  render () {
     console.log(`Count: ${this.props.array}`)
     return <div>TestPureComponent </div>
  }
}

class RenderExample extends React.Component {
  constructor (props) {
    super(props)
    this.state = {array: [0, 1, 2]}
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    let temp = this.state.array
    temp.push(3)
    this.setState({array: temp})
  }

  render () {
    return <div>
      <button onClick={this.onClick}>Button {this.state.clicked && 'clicked'}</button>

      <TestPureComponent array={this.state.array} />
    </div>
  }
}

ReactDOM.render(<RenderExample />, document.getElementById('root'))
```

Khi click vào button, thật thú vị là không hề có dòng log nào được in ra, nguyên nhân như đã phân tích ở trên, do việc mutate state trực tiếp bằng cách dùng hàm push cho state array nên shallow equality của TestPureComponent đã không thể phát hiện ra sự thay đổi ở props array của nó => Không re-render
Chúng ta có thể khắc phục điều này bằng 1 trong 2 cách, cách một là dùng hàm concat vì hàm concat sẽ tạo ra 1 object mới sau khi đã bổ sung thêm phần tử mới chứ không trực tiếp thay đổi trên array ban đầu như hàm push, ví dụ:
```
onClick () {
    let temp = this.state.array.concat(3)
    this.setState({array: temp})
  }
```
Và cách 2 là thay thế PureComponent thành Component.
Như vậy, qua bài phân tích của mình, chắc hẳn các bạn đã có những thông tin nhất định về 3 loại component trong React cũng như những lưu ý khi sử dụng chúng, hãy cùng thảo luận thêm về đề tài này nếu có bất kỳ thắc mắc nào nhé!
Cảm ơn bạn đã quan tâm đến bài viết!