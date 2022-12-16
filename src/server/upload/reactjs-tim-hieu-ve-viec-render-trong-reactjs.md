Hiện nay ReactJS, React Native được sử dụng rất rộng rãi. Tuy nhiên việc học để làm và việc học để hiểu nó rất khác nhau. Trong lần này chúng ta sẽ cùng nhau tìm hiểu rõ hơn về việc render các component trong ReactJS (cũng như trong React Native) nhé.

Như chúng ta đã biết thì có hai loại component là Class component (statefull component) và Function component (stateless component). Chúng ta nên sử dụng Function component để cải thiện về hiệu năng nên mình sẽ chỉ lấy ví dụ về Function component thôi nhé :D

Trước hết chúng ta tạo 1 project nho nhỏ như sau
```javascript
import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggle: true
    }
  }


  render() {
    console.log("render parent");
    return <div>
      <p onClick={() => this.setState({toggle: this.state.toggle})}>Click</p>
      <A color={"#ff0000"} onClick={() => console.log("Test")}/>
    </div>
  }
}

const A = ({color, onClick}) => {
  console.log("render A");
  return <div>
    <p style={{color: color}}>A</p>
    <B />
  </div>
};

const B = () => {
  console.log("render B")
  return <div>
    <h1>B</h1>
  </div>
};

export default App;
```

Trong component A sẽ chứa component B. Khi chạy chúng ta sẽ thấy cả 3 component (tính cả component cha) đều được render.
```gradle
[Log] render parent (main.chunk.js, line 118)
[Log] render A (main.chunk.js, line 150)
[Log] render B (main.chunk.js, line 176)
```

### Component cha render lại thì component con có render lại hay không?
Chúng ta sẽ gặp câu hỏi này rất nhiều, có khi trong phỏng vấn. Nếu ko nắm rõ chắc chắn chúng ta sẽ trả lời thiếu hoặc ko đúng. Như trong ví dụ trên, nếu component cha render lại thì chắc chắn component con (A và B) sẽ bị render lại. Để kiểm tra chúng ta sẽ click vào "Click" và kết quả là

```gradle
[Log] render parent (main.chunk.js, line 118)
[Log] render A (main.chunk.js, line 150)
[Log] render B (main.chunk.js, line 176)
```

Do ở đây chúng ta đã thay đổi state của component App nên hàm render() của App được gọi và hai component A và B cũng lần lượt được render lại.

### Cách khắc phục và tránh render lại 
Đối với Class component thì chúng ta sẽ sử dụng PureComponent, còn đối với Function Component chúng ta sẽ sử dụng React.memo. 

React.memo là một `higher order component` có tác dụng tương tự như PureComponent. Khi một function component thường xuyên bị render lại mà không có sự thay đổi của props (như A và B ở ví dụ trên) là lúc chúng ta nên áp dụng React.memo. Ví dụ trước hết chúng ta áp dụng cho component B.

```javascript
const B = React.memo(() => {
  console.log("render B")
  return <div>
    <h1>B</h1>
  </div>
});
```

Và kết quả khi click vào "Click"

```gradle
[Log] render parent (main.chunk.js, line 118)
[Log] render A (main.chunk.js, line 150)
```

Như vậy component B đã không bị render lại. Các bạn có thấy nhanh hơn một chút rồi ko :D

Tiếp theo, chúng ta sẽ áp dụng cho A nhé

```javascript
const A = React.memo(({color, onClick}) => {
  console.log("render A");
  return <div>
    <p style={{color: color}}>A</p>
    <B />
  </div>
});
```

Và kết quả là
```gradle
[Log] render parent (main.chunk.js, line 118)
[Log] render A (main.chunk.js, line 151)
```

Tại sao A vẫn bị render lại nhỉ? Chúng ta chú ý ở đây đã truyền vào A một function kiểu arrow function, do đó mỗi khi App component bị render lại thì sẽ tạo ra một arrow function mới, do đó thuộc tính này đã bị thay đổi. Điều này dẫn đến A vẫn bị render lại. Các bạn chú ý điểm này nhé :D

Có hai cách để sửa chỗ này.
#### Cách 1
Đơn giản bạn chỉ việc đưa arrow function ra ngoài hàm render như sau
```javascript
  click() {
    console.log("Test")
  }

  render() {
    console.log("render parent");
    return <div>
      <p onClick={() => this.setState({toggle: this.state.toggle})}>Click</p>
      <A color={"#ff0000"} onClick={this.click}/>
    </div>
  }
```

Và kết quả khi chúng ta click vào "Click" của App component
```gradle
[Log] render parent (main.chunk.js, line 118)
```

#### Cách 2
Một cách khác chúng ta sẽ sử dụng `areEqual`
```javascript
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
```

Cách dùng như sau
```javascript
const areEqual = (prevProps, nextProps) => prevProps.color === nextProps.color;

const A = React.memo(({color, onClick}) => {
  console.log("render A");
  return <div>
    <p style={{color: color}}>A</p>
    <B />
  </div>
}, areEqual);
```

Nếu 2 gía trị color bằng nhau thì chúng ta sẽ ko render lại, ngược lại sẽ render lại. 

Trên đây là một ví dụ nhỏ để chúng ta hiểu được quá trình render trong ReactJS là như thế nào. Hy vọng qua bài viết, chúng ta sẽ tối ưu được code và tránh được các trường hợp re-render ko cần thiết. Các bạn thấy nhanh thêm chút nào chưa :D

#### Cảm ơn các bạn đã đọc bài viết. Happy coding!