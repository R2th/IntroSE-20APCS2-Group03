Hello các bạn, tiếp tục seri tìm hiểu về ReactJs hôm nay mình xin giới thiệu đến các bạn hai thứ mình cho là thú vị nhất của ReactJs là `State` và `Props`.
# 1. State
State bạn có thể hiểu đơn giản là một nơi mà bạn lưu trữ dữ liệu của Component, từ đó bạn có thể luân chuyển dữ liệu đến các thành phần trong Component và đến các Component khác. Chúng ta nên tối giản State nhiều nhất có thể và giới hạn số lượng Component sử dụng State. Ví dụ nếu có 10 Components cần phải sử dụng dữ liệu từ State thì thay vì lưu dữ liệu ở cả 10 Components thì chúng ta nên tạo một component cha để lưu dữ liệu của tất cả, khi đó việc quản lý state sẽ dễ dàng hơn. Bạn sẽ thấy việc quản lý State một cách hiệu quả là vô cùng quan trọng khi ứng dụng của bạn ngày càng phìng to và logic trở nên phức tạp.
## Using State
Ví dụ dưới đây sẽ cho các bạn thấy cách sử dụng State trong ReactJs:

App.jsx
```
import React from 'react';

class App extends React.Component {
   constructor(props) {
      super(props);
		
      this.state = {
         header: "Header from state...",
         content: "Content from state..."
      }
   }
   render() {
      return (
         <div>
            <h1>{this.state.header}</h1>
            <h2>{this.state.content}</h2>
         </div>
      );
   }
}
export default App;
```
main.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('app'));
```

# 2. Props
Điểm khác biệt chính giữa state và props đó là props có tính bất biến, không thay đổi được. Đó là lý do vì sao Component cha nên định nghĩa state có thể thay đổi được giá trị, trong khi Component con chỉ nên sử dụng dữ liệu từ Component cha và không thể thay đổi giá trị của nó.
## Using props
Khi muốn gán giá trị của Props từ Component cha cho Component con chúng ta chỉ cần thêm các thuộc tính và giá trị khi gọi đến Component con từ Component cha:

App.jsx
```
import React from 'react';

class App extends React.Component {
   render() {
      return (
         <div>
            <h1>{this.props.headerProp}</h1>
            <h2>{this.props.contentProp}</h2>
         </div>
      );
   }
}
export default App;
```
Khi gọi đến `this.props.headerProp` trong `App` thì nó sẽ tìm đến giá trị của props tương ứng - ở đây là `headerProp` được gán trong component cha.

main.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App headerProp = "Header from props..." contentProp = "Content
   from props..."/>, document.getElementById('app'));

export default App;
```
Như chúng ta có thể thấy, component `App` được gán 2 props là `headerProp = "Header from props..."` và `contentProp = "Content from props..."`.

## Default props
Bạn có thể gán một giá trị default cho props thay vì phải gán giá trị cho nó từ Component cha với method `defaultProps`:

App.js
```
import React from 'react';

class App extends React.Component {
   render() {
      return (
         <div>
            <h1>{this.props.headerProp}</h1>
            <h2>{this.props.contentProp}</h2>
         </div>
      );
   }
}
App.defaultProps = {
   headerProp: "Header from props...",
   contentProp:"Content from props..."
}
export default App;
```
Cách sử dụng này cũng sẽ cho kết quả tương tự như trên.

## State and Props
Ví dụ dưới đây sẽ giúp các bạn hình dung được cách sử dụng kêt hợp cơ bản giữa State và Props trong ứng dụng. Chúng ta gán giá trị cho state trong Component và truyền giá trị đó xuống Component con bằng cách sử dụng props. Dưới Component con thì việc lấy giá trị của props cũng sẽ như bình thường `thí.props.{Tên props}`.

App.jsx
```
import React from 'react';

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         header: "Header from props...",
         content: "Content from props..."
      }
   }
   render() {
      return (
         <div>
            <Header headerProp = {this.state.header}/>
            <Content contentProp = {this.state.content}/>
         </div>
      );
   }
}
class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>{this.props.headerProp}</h1>
         </div>
      );
   }
}
class Content extends React.Component {
   render() {
      return (
         <div>
            <h2>{this.props.contentProp}</h2>
         </div>
      );
   }
}
export default App;
```

main.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App/>, document.getElementById('app'));
```
Kết quả sẽ tương tự như hai trường hợp trên, điểm khác biệt duy nhất đó là chúng ta gán giá trị cho props từ giá trị của state. Mà tính chất của state là có thể thay đổi được vì vậy khi bạn muốn thay đổi giá trị của props bạn chỉ cần thay đổi giá trị của state, khi giá trị của props trong Component con cũng sẽ được thay đổi theo giá trị của State.

# 3. Props validation
Sử dụng thuộc tính validation là một cách hữu hiệu để validate các giá trị của component. Nó sẽ giúp tránh được các lỗi trong quá trình phát triển ứng dụng và cũng giúp cho các component dễ đọc hơn khi nó xác định trước cách sử dụng của các component.
## Validating Props
Trong ví dụ dưới đây, ta sẽ tạo component App với tất cả các props cần sử dụng. `App.propTypes` được sử dụng để validate props. Nếu một trong số giá trị của props không thỏa mãn điều kiện validate thông báo lỗi sẽ được hiển thị trong console. Chúng ta sẽ tạo ra giá trị default cho các props để kiểm tra các validate đã tạo. Nếu giá trị của props pass validate thì giá trị của nó sẽ được hiển thị, nếu không thì thông báo lỗi sẽ được hiển thị trong console.

App.jsx
```
import React from 'react';

class App extends React.Component {
   render() {
      return (
         <div>
            <h3>Array: {this.props.propArray}</h3>
            <h3>Bool: {this.props.propBool ? "True..." : "False..."}</h3>
            <h3>Func: {this.props.propFunc(3)}</h3>
            <h3>Number: {this.props.propNumber}</h3>
            <h3>String: {this.props.propString}</h3>
            <h3>Object: {this.props.propObject.objectName1}</h3>
            <h3>Object: {this.props.propObject.objectName2}</h3>
            <h3>Object: {this.props.propObject.objectName3}</h3>
         </div>
      );
   }
}

App.propTypes = {
   propArray: React.PropTypes.array.isRequired,
   propBool: React.PropTypes.bool.isRequired,
   propFunc: React.PropTypes.func,
   propNumber: React.PropTypes.number,
   propString: React.PropTypes.string,
   propObject: React.PropTypes.object
}

App.defaultProps = {
   propArray: [1,2,3,4,5],
   propBool: true,
   propFunc: function(e){return e},
   propNumber: 1,
   propString: "String value...",
   
   propObject: {
      objectName1:"objectValue1",
      objectName2: "objectValue2",
      objectName3: "objectValue3"
   }
}
export default App;
```

main.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App/>, document.getElementById('app'));
```

# 4. Component API
Trong phần này, chúng ta sẽ tìm hiểu về React Component APi. Chúng ta sẽ thảo luận về 3 methods: `setState()`, `forceUpdate` và `ReactDOM.findDOMNode()`. Trong ES6, chúng ta sẽ sử dụng `this.emthod.bind(this)` trong các ví dụ ở dưới.
## Set State
`setState()` là method để cập nhật giá trị của state trong component. Nó sẽ không xóa bỏ đi state mà chỉ là thay đổi giá trị của nó.
```
import React from 'react';

class App extends React.Component {
   constructor() {
      super();
		
      this.state = {
         data: []
      }
	
      this.setStateHandler = this.setStateHandler.bind(this);
   };
   setStateHandler() {
      var item = "setState..."
      var myArray = this.state.data.slice();
	  myArray.push(item);
      this.setState({data: myArray})
   };
   render() {
      return (
         <div>
            <button onClick = {this.setStateHandler}>SET STATE</button>
            <h4>State Array: {this.state.data}</h4>
         </div>
      );
   }
}
export default App;
```
Ban đầu giá trị của `data` là một mảng rỗng. Mối lần người dùng click vào button, giá trị của `data` sẽ được thêm vào giá trị mới `setState...`. Nếu chúng ta click 3 lần giá trị của data sẽ là: `data = ["setState...", "setState...", "setState..."]`.

## Find Dom Node
Đối với các thao tác với cây DOM, chúng ta có thể sử dụng `ReactDOM.findDOMNode()` method. Đầu tiên chúng ta cần import thêm 'react-dom'.
```
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
   constructor() {
      super();
      this.findDomNodeHandler = this.findDomNodeHandler.bind(this);
   };
   findDomNodeHandler() {
      var myDiv = document.getElementById('myDiv');
      ReactDOM.findDOMNode(myDiv).style.color = 'green';
   }
   render() {
      return (
         <div>
            <button onClick = {this.findDomNodeHandler}>FIND DOME NODE</button>
            <div id = "myDiv">NODE</div>
         </div>
      );
   }
}
export default App;
```
Bây giờ khi người dùng click vào button thì element có id = "myDiv" sẽ chuyển sang màu xanh.

# 5. Component Life Cycle
Trong phần này chúng ta cùng tìm hiểu về Life Cycle của component.
## Lifecycle methods
* `componentWillMount` sẽ được thực thi trước khi component được render, trên cả phía server và client.
* `componentDidMount` sẽ được thực thi khi componet được render chỉ ở phía client. Đây là nơi gọi đến các AJAX request và DOM hoặc là update state. Nó cũng được sử dụng khi gọi đến các Framework Javascript khác và các function delay như là `setTimeout` hoặc `setInterval`.
* `componentWillReceiveProps` được thực thi ngay khi giá trị của props được update và trước khi các cái render khác được gọi đến. Chúng ta kích hoạt nó từ `setNewNumber` khi state được update.
* `shouldComponentUpdate` sẽ trả về `true` hoặc `false`. Nó sẽ xác định component sẽ được update hoặc không. Giá trị của nó được gán giá trị mặc định là `true`. Nếu bạn chắc chắn là component không cần phải render lại khi state hoặc props được update thì bạn có thể return về `false`.
* `componentWillUpdate` sẽ được gọi trước khi render.
* `componentDidUpdate` sẽ được gọi sau khi render.
* `componentWillUnmount` sẽ được gọi sau khi unmount component từ DOM.

OK, bài hôm nay đến đây thôi nha, hẹn gặp mọi người ở bài sau trong seri [ReactJs từ cơ bản đến nâng cao](https://viblo.asia/s/reactjs-tu-co-ban-den-nang-cao-3vKjR80dK2R)

# 6. References
Nội dung bài viết trên được mình tham khảo trong chuỗi tutorial về ReactJs: https://www.tutorialspoint.com/reactjs/index.htm