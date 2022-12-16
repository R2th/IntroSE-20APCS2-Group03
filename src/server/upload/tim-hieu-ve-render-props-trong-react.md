### 1. Giới thiệu về **render props**
**Render props** không phải là một **API** của **React**, mà là một kĩ thuật xử lý việc chia sẻ logic giữa các **React Component** bằng cách sử dụng **prop** có **value** như một **function**. Hiểu đơn giản thì **render props** là một phương pháp có mục đích tương tự với phương pháp sử dụng **Higher Order Component**, giúp chúng ta sử dụng lại logic trên nhiều **component**. **Render Props** được dùng để tạo nên thư viện vô cùng nổi tiếng trong hệ sinh thái **React**, đó là **React-Router**. Hãy cùng tìm hiểu một chút về phương pháp này nhé.  
### 2. Sử dụng **Render Props** giúp tái sử dụng mã code.  
Về bản chất, mục đích mong muốn của chúng ta là khả năng tái sử dụng **state, methods** của một **component** trên **component** khác cần sử dụng chung **state**.  
Ví dụ, chúng ta có một **component** đơn giản xử lý việc bắt sự kiện di chuột như sau:
```js
import React from 'react'
import ReactDOM from 'react-dom'

const App extends React.Component {
  state = { x: 0, y: 0 }

  handleMouseMove = (event) => {
    const { clientX, clientY } = event
    this.setState({
      x: clientX,
      y: clientY,
    })
  }

  render() {
    const { x, y } = this.state
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        <h2>The mouse position is ({x}, {y})</h2>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
```
Bây giờ làm sao để chúng ta có thể chia sẻ logic trên cho một **Component** khác ?  
Sau đây là cách chúng ta có thể làm bằng cách sử dụng **Render Props**:
```js
import React from 'react'
import ReactDOM from 'react-dom'

class Mouse extends React.Component {
  state = { x: 0, y: 0 }

  handleMouseMove = (event) => {
    const { clientX, clientY } = event
    this.setState({
      x: clientX,
      y: clientY,
    })
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    )
  }

}

class App extends React.Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Mouse
          render={({ x, y }) => (
            <h1>The mouse position is {x}, {y}</h1>
          )}/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
```
Nếu bạn chưa hiểu, mình sẽ viết thành thế này nhé
```js
const ComponentA
const ComponentB
const ComponentC

class App extends React.Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Mouse render={({ x, y }) => (<ComponentA x={x} y={y} />)} />
        <Mouse render={({ x, y }) => (<ComponentB x={x} y={y} />)} />
        <Mouse render={({ x, y }) => (<ComponentC x={x} y={y} />)} />
      </div>
    )
  }
}
```
Đó là cách sử dụng chia sẻ logic cho nhiều **component** bằng cách sử dụng **Render Props**. Chúng ta tạo ra một **Component Mouse** chứa props: **render** là một **Function** xác định phần tử (**component**) sẽ được **render** bên trong **Component Mouse**. **Prop render** cho phép chúng ta tuỳ chỉnh nội dung sẽ được **render** bên trong **Component Mouse (Dynamic Render)**, và đồng thời logic xử lý bên trong **Mouse** sẽ được chia sẻ tới các **Component** đó. Lưu ý là chúng ta không nhất thiết phải sử dụng tên của **prop** là **render**, miễn là chúng ta sử dụng **prop** như một **function** xác định nội dung cần **render**.  
```js
<Mouse children={({ x, y }) => (
  <p>The mouse position is {x}, {y}</p>
)}/>
``` 
### 3. Kết luận
**Render Props** thực sự đơn giản phải không, hãy cân nhắc sử dụng phương pháp trên mỗi khi bạn muốn tạo ra một **component** có khả năng **tái sử dụng**.  
Trên đây là phần chia sẻ của mình về phương pháp **Render Props**, tham khảo từ bài viết [React Render Props Explained](https://scotch.io/tutorials/react-render-props-explained) hi vọng sẽ hữu dụng với bạn đọc.