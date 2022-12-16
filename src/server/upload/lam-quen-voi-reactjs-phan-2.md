Ở phần trước mình đã giới thiệu cách cài đặt môi trường cho ReactJS. Trong phần này chúng ta tiếp tục tìm hiểu đến các đặc điểm của ReactJS.

# 1. ReactJS - JSX

React sử dụng JSX làm teamplate thay cho JavaScript thông thường. Không bắt buộc phải sử dụng nhưng nó lại có những ưu điểm sau:
- Nhanh hơn do thực hiện tối ưu hóa trong quá trình biên dịch code sang JavaScript.
- An toàn hơn và có thể bắt hầu hết các lỗi trong quá trình biên dịch.
- Làm cho việc viết template nhanh và dễ dàng hơn khi bạn đã quen với HTML.

## 1.1 Sử dụng JSX

Trong hầu hết các trường hợp, JSX giống như HTML thông thường. Chúng ta đã sử dụng nó trong phần cài đặt môi trường ở phần trước.

App.jsx

```
import React from 'react';

class App extends React.Component {
   render() {
      return (
         <div>
            Hello World!!!
         </div>
      );
   }
}
export default App;
```

Mặc dù nó tương tự như HTML, nhưng vẫn có vài điều chúng ta cần ghi nhớ khi làm việc với JSX.

## 1.2 Nested Elements

Nếu muốn trả về nhiều element, chúng ta cần bọc nó trong 1 container. Lưu ý cách ta đang sử dụng `div` để bọc ngoài các phần tử `h1`, `h2` và `p`.

App.jsx

```
import React from 'react';

class App extends React.Component {
   render() {
      return (
         <div>
            <h1>Header</h1>
            <h2>Content</h2>
            <p>This is the content!!!</p>
         </div>
      );
   }
}
export default App;
```

![](https://images.viblo.asia/e0ba88b1-5195-466d-b788-224d7905447a.jpg)

## 1.3 Attributes

Có thể sử dụng các thuộc tính tùy chỉnh ngoài các thuộc tính của HTML thông thường. Khi đó ta cần sử dụng tiền tố `data-`. 
Trong ví dụ dưới đây, tôi sử dụng `data-myattributes` làm thuộc tính của thẻ `p`.

```
import React from 'react';

class App extends React.Component {
   render() {
      return (
         <div>
            <h1>Header</h1>
            <h2>Content</h2>
            <p data-myattribute = "somevalue">This is the content!!!</p>
         </div>
      );
   }
}
export default App;
```

## 1.4 JavaScript Expressions

Có thể sử dụng các biểu thức của javaScript bên trong JSX. Chỉ cần bọc nó bên trong dấu ngoặc nhọn `{}`.

```
import React from 'react';

class App extends React.Component {
   render() {
      return (
         <div>
            <h1>{1+1}</h1>
         </div>
      );
   }
}
export default App;
```

![](https://images.viblo.asia/1f6faa83-a18c-419b-b0f4-12c5024a42d9.jpg)

Không thể sử dụng `if else` trong JSX, tuy nhiên ta lại có thể sử dụng điều kiện 3 ngôi.

```
import React from 'react';

class App extends React.Component {
   render() {
      var i = 1;
      return (
         <div>
            <h1>{i == 1 ? 'True!' : 'False'}</h1>
         </div>
      );
   }
}
export default App;
```

![](https://images.viblo.asia/f4fc43db-27e8-4672-8b9a-6018e9df9a50.jpg)

## 1.5 Styling

React khuyên bạn nên sử dụng `inline styltes`. Khi đó sẽ dử dụng kiểu `camelCase`. React cũng sẽ tự động nối thêm `px` sau giá trị số trên các phần tử cụ thể.

```
import React from 'react';

class App extends React.Component {
   render() {
      var myStyle = {
         fontSize: 100,
         color: '#FF0000'
      }
      return (
         <div>
            <h1 style = {myStyle}>Header</h1>
         </div>
      );
   }
}
export default App;
```

![](https://images.viblo.asia/c64a2f3a-c50c-45d5-a07f-730e1a679458.jpg)

## 1.6 Comments

Khi viết comment, ta cần đọt dấu ngoặc nhọn phía ngoài. 

```
import React from 'react';

class App extends React.Component {
   render() {
      return (
         <div>
            <h1>Header</h1>
            {//End of the line Comment...}
            {/*Multi line comment...*/}
         </div>
      );
   }
}
export default App;
```

## 1.7 Naming Convention

HTML luôn sử dụng chữ thường cho thẻ tên, trong khi đó React lại bắt đầu bằng chữ hoa.
Note - Bạn nên sử dụng `className` và `htmlFor` làm tên thuộc tính XML thay vì class và for.

# 2. Components

Trong phần này chúng ta sẽ tìm hiểu cách kết hợp các thành phần để giúp bảo trì ứng dụng dễ dàng hơn. Các này cho phép cập nhật và thay đổi các thành phần của bạn mà khôn glamf ảnh hưởng đến phần còn lại.

## 2.1 Stateless

Thành phần đầu tiên trong ví dụ dưới đây là `App`. Nó là chủ sở hữu của `Header` và `Content`. Ta có thể tạo riêng `Header` và `Content`, rồi sau đó thêm vào trong JSX bên trong `App`. Chỉ thành phần `App` cần thiết cho exported.

App.jsx

```
import React from 'react';

class App extends React.Component {
   render() {
      return (
         <div>
            <Header/>
            <Content/>
         </div>
      );
   }
}
class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>Header</h1>
         </div>
      );
   }
}
class Content extends React.Component {
   render() {
      return (
         <div>
            <h2>Content</h2>
            <p>The content text!!!</p>
         </div>
      );
   }
}
export default App;
```

Để có thể hiển thị nó trên trang, ta cần nhập nó trong file `main.js` và gọi `reactDOM.render()`. Chúng ta đã làm điều này trong phần cài đặt môi trường trước đó.

main.js

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('app'));
```

Đây là kết quả của đoạn code trên:

![](https://images.viblo.asia/cfe2d0f2-c144-4e76-898e-c93b5fa14c37.jpg)

## 2.2 Stateful

Trong ví dụ này, ta sẽ đặt state cho thành phần chính `App`. Thành phần `Header` chỉ được thêm vào như ví dụ trước vì nó không cần bất kỳ state nào. Thay vì content tag, chúng ta tạo các phần tử table và tbody, chúng sẽ tự động chèn `TableRow` cho mọi đối tượng từ mảng `data`.

App.jsx

```
import React from 'react';

class App extends React.Component {
   constructor() {
      super();
      this.state = {
         data: 
         [
            {
               "id":1,
               "name":"Foo",
               "age":"20"
            },
            {
               "id":2,
               "name":"Bar",
               "age":"30"
            },
            {
               "id":3,
               "name":"Baz",
               "age":"40"
            }
         ]
      }
   }
   render() {
      return (
         <div>
            <Header/>
            <table>
               <tbody>
                  {this.state.data.map((person, i) => <TableRow key = {i} 
                     data = {person} />)}
               </tbody>
            </table>
         </div>
      );
   }
}
class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>Header</h1>
         </div>
      );
   }
}
class TableRow extends React.Component {
   render() {
      return (
         <tr>
            <td>{this.props.data.id}</td>
            <td>{this.props.data.name}</td>
            <td>{this.props.data.age}</td>
         </tr>
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

Note - Ta đang sử dụng hàm `key = {i} inside map ()`. Điều này sẽ giúp React chỉ cập nhật các yếu tố cần thiết thay vì hiển thị toàn bộ danh sách khi có gì đó thay đổi.

![](https://images.viblo.asia/05a696ea-9b2a-4c07-b77b-2ba7fc1f6557.jpg)

# 3. State

`State` là nơi cung cấp dữ liệu. Ta nên cố gắng làm cho state đơn giản nhất có thể, và giảm thiếu số lượng của các thành phần state. Ví dụ, nếu chúng ta có 10 thành phần cần dữ liệu từ state, ta nên tạo 1 thành phần chứa sẽ giữ state cho tất cả chúng.

Ví dụ về cách tạo stateful component sử dụng cú pháp EcmaScript2016:

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

![](https://images.viblo.asia/9b8cd668-077c-4356-a3e3-be78122a8823.jpg)

# Nguồn 
https://www.tutorialspoint.com/reactjs/reactjs_quick_guide.htm