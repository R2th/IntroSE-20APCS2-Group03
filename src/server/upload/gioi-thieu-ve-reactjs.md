Hello, chào mọi người, dạo gần đây mình có dấn thân vào tìm hiểu sâu về front-end, cụ thể là ReactJS. Vì vậy mình quyết định chia sẻ những thứ mình tìm hiểu được, học được trong seri [ReactJS từ cơ bản đến nâng cao](https://viblo.asia/s/reactjs-tu-co-ban-den-nang-cao-3vKjR80dK2R).

Trong bài đầu tiên này mình xin phép chia sẻ những điều cơ bản nhất của ReactJS :grinning:
# 1. Overview
ReactJS là một thư viện của javascript được sử dụng để xây dựng các thành phần UI có thể tái sử dụng. Theo tài liệu chính thức của React, nó được định nghĩa:
> React is a library for building composable user interfaces. It encourages the creation of reusable UI components, which present data that changes over time. Lots of people use React as the V in MVC. React abstracts away the DOM from you, offering a simpler programming model and better performance. React can also render on the server using Node, and it can power native apps using React Native. React implements one-way reactive data flow, which reduces the boilerplate and is easier to reason about than traditional data binding.

React là một thư viện cho phép xây dựng giao diện người dùng. Nó khuyến khích việc tạo ra các thành phần UI có thể tái sử dụng, trong khi dữ liệu được hiển thị thay đổi theo thời gian. Rất nhiều lập trình viên sử dụng React như là phần V(view) trong mô hình MVC. React trừu tượng hóa DOM từ người dùng, cung cấp mô hình lập trình đơn giản hơn và hiệu suất tốt hơn. React có thể hiển thị trên máy chủ sử dụng Node, và có thể xây dựng ứng dụng `native` sử dụng React Native. React triển khai luồng dữ liệu một chiều, điều này giúp giảm bớt  các bản mẫu và dễ dàng hơn so với ràng buộc dữ liệu truyền thống.
### React Features
* JSX là cú pháp mở rộng của JavaScript. Nó không bắt buộc phải sử dụng JSX trong khi phát triển React nhưng nó được khuyến khích sử dụng.
* Components: Tất cả các thành phần trong React đều được quy về component. Nó sẽ giúp việc maintain code trở nên dễ dàng hơn trong một dự án lớn.
* Unidirectional data flow and Flux: React triển khai luồng dữ liệu một chiều giúp bạn dễ dàng suy luận về ứng dụng của mình. Flux là một mẫu (pattern) giúp dữ liệu của bạn không theo hướng (undirectional).
* License: React được phát triển bởi Facebook Inc. Tài liệu được cấp phép theo CC BY 4.0.
### React Advantages
* Sử dụng `virtual DOM` - là một đối tượng của JavaScript. Nó sẽ cải thiện hiệu suất của ứng dụng vì `virtual DOM` có hiệu suất nhanh hơn so với `regular DOM`.
* Có thể được sử dụng cả ở phía client và server tùy thuộc vào framework sử dụng cùng.
* `Component` và `data patterns` cải thiện khả năng đọc, nó giúp dễ dàng maintain trong một ứng dụng lớn.
### React Limitations
* Chỉ có thể đáp ứng cho phần View của ứng dụng, vẫn cần sử dụng công nghệ khác để có thể xây dựng được ứng dụng.
* Sử dụng inline templating và JSX gây khó khăn khi mới làm quen.
# 2. Enviromwnt Setup
Về phần setup môi trường bạn có thể tham khảo link sau: [Enviroment setup](https://www.tutorialspoint.com/reactjs/reactjs_environment_setup.htm)
# 3. JSX
React sử dụng cú pháp JSX thay vì JavaScript thông thường. Tuy nhiên bạn không nhất thiết phải dùng nó. Sau đây là một số ưu điểm khi sử dụng JSX:
* Tốc độ nhanh hơn do nó sử dụng phương pháp tối ưu để biên dịch mã JavaScript.
* Nó có thể bắt được hầu hết các lỗi trong quá trình biên dịch.
* Nó giúp bạn viết dễ dàng và nhanh hơn nếu như bạn đã quen với HTML.
### Using JSX
Trong hầu hết trường hợp thì JSX sẽ tương tự như HTML. Hãy quan sát ví dụ dưới đây:
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
 nhưng có một vài thứ chúng ta cần lưu ý khi làm việc với JSX.
### Nested Elements
Nếu bạn muốn return về nhiều element, bạn cần phải bao các element đó bằng một container element lớn hơn. Ví dụ dưới đây thể hiện cách chúng ta sử dụng thẻ `<div>` để bao đóng các thẻ `<h1>`, `<h2>` và `<p>`.
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
Như vậy thay vì return trực tiếp 3 thẻ `<h1>`, `<h2>` và `<p>` thì chúng ta phải bao nó bằng thẻ `<div>` trước khi return.
### Attributes
Chúng ta có thể sử dụng các thuộc tính do chính mình định nghĩa ngoài các thuộc tính sẵn có của HTML thông thường.  Khi chúng ta muốn custom các thuộc tính, chúng ta cần thêm prefix `data-` trước các thuộc tính. Ví dụ:
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
Khi đó thuộc tính `myattribute` sẽ được thêm vào thẻ `<p>` khi nó được compile ra HTML.
### JavaScript Expressions
JavaScript Expression có thể được sử dụng ngay bên trong cú pháp của JSX. Bạn chỉ cần đặt nó bằng ký tự ngoặc nhọn `{}`:
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
khi đó, nó sẽ render ra 2.
Chúng ta không thể sử dụng cấu trúc `if else` bên trong `{}`, thay vào đó chúng ta có thể sử dụng conditional expressions. Trong ví dụ dưới đây, do i=1 nên nó sẽ render ra "True!", nếu chúng ta thay đổi i thành giá trị khác thì nó sẽ render ra "False".
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
### Styling
React gợi ý sử dụng `inline style` khi set các thuộc tính CSS cho element. Trong react tên các thuộc tính được viết theo `camelCase` syntax. React cũng sẽ tự động thêm giá trị `px` sau mỗi giá trị số trên các phần tử cụ thể. Ví dụ sau đây cho thấy cách thêm các thuộc tính style cho element trong react:
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
### Comments
Khi muốn thêm comment trong react, chúng ta cần đặt nó trong ký tự ngoặc nhọn `{}`
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
### Naming Convention
Thẻ HTML luôn sử dụng thẻ tên ký tự thường, trong khi đó React component phải bắt đầu với ký tự viết hoa.
Thêm một chú ý nữa là trong React thì `className` và `htmlFor` được sử dụng thay thế cho `class` và `for` trong HTML.
# 4. Components
Oke, trong phần tiếp theo chúng ta cùng tìm hiểu đến phần mình nghĩ là quan trọng nhất của React.
### Stateless Example
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
Trong ví dụ trên, chúng ta có 3 components: `App`, `Header` và `Content`. `App` là component chính sẽ return về 2 component là `Header` và `Content`.
`export default App` sẽ trả về component `App`, khi đó chúng ta có thể import component `App` vào trong class khác và gọi đến `App` như một component con trong class đó.
Để hiển thị ra nội dung trên chúng ta có thể sử dụng `ReactDom.render()`
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('app'));
```
### Stateful Example
Trong ví dụ tiếp theo, chúng ta sẽ gán state cho component `App`. Bạn chưa cần quá quan tâm state là cái gì, vì mình sẽ giới thiệu nó trong phần sau nha. Cùng với đó là thêm các thẻ `<table>` và `<tbody>` trong component `App` để hiển thị dữ liệu trong state.
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
Phân tích ví dụ trên chúng ta có thể thấy 
```
this.state.map((person, i) => <TableRow key = {i} data = {person} />)
```
là một vòng lặp lặp qua từng phần tử của state `data` và render ra component `TableRow` với hai thuộc tính `key` và `data`. Và một thứ mới chúng ta sử dụng ở trong ví dụ trên là `props`, thứ mình cũng sẽ giới thiệu chi tiết hơn trong phần sau. Như bạn có thể thấy chúng ta có thể gọi đến giá trị của các thuộc tính truyền vào `TableRow`
```
<td>{this.props.data.id}</td>
<td>{this.props.data.name}</td>
<td>{this.props.data.age}</td>
```

OK, bài chia sẻ về ReactJS hôm nay đến đây thôi nha. Trong bài tiếp theo của seri bài tìm hiểu về ReactJS từ cơ bản đến nâng cao, mình sẽ giới thiệu những nội dung thú vị khác của ReactJS đến các bạn :laughing:
# 5. References
Nội dung bài viết trên được mình tham khảo trong chuỗi tutorial về ReactJs: https://www.tutorialspoint.com/reactjs/index.htm