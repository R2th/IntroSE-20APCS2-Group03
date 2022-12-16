Trong phần này chúng ta sẽ cùng tìm hiểu về cách kết hợp các components để làm cho ứng dụng đễ bảo trì hơn. Cách tiếp cận này cho phép cập nhật và thay đổi các components của bạn mà không ảnh hưởng đến các phần còn lại của trang.

**1. Stateless Example**

Components đầu tiên trong ví dụ dưới đây là **App**. Component này bao gồm cả các component con **Header** và **Content**. Chúng ta sẽ tạo Header và Content riêng và sau đó add nó vào bên trong JSX tree trong component **App**. Chúng ta chỉ cần export component **App**. Trong trường hợp này các components không có state và được gọi là stateless.

*App.jsx*
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
            <p>This is the content!!!</p>
         </div>
      );
   }
}
export default App;
```

Để có thể hiển thị nó trên trang, chúng ta cần nhập nó trong file **main.js** và gọi **reactDOM.render()**. Chúng ta thực hiện việc này trong khi setup môi trường.

*main.js*
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('app'));
```

Ta sẽ có kết quả như sau:
![](https://images.viblo.asia/ac410808-c243-4506-a618-7010f2332a59.jpg)

**2. Stateful Example**

Trong ví dụ này, chúng ta sẽ thiết lập state cho component chính (App). Component **Header** không cần thêm bất kì state nào. Thay vì nội dung tag, Chúng ta đang tạo các phần tử **table** và **tbody**, ở đây chúng ta sẽ tự động insert **TableRow** cho mọi object từ mảng **data**. Trong trường hợp này các components sử dụng state sẽ được gọi là stateful.

*App.jsx*
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

Ở ví dụ này chúng ta đã sử dụng **state** và **props**. Vậy chúng ta cần tìm hiểu chúng là gì? 

Có hai kiểu của data trong React đó là **props** và **state**. Sự khác biệt giữa hai kiểu thì hơi khó khăn để hiểu ngay từ ban đầu, ít nhất là về mặt khái niêm. Nhưng một khi bạn bắt đầu code, bạn sẽ nhanh chóng tách biệt được hai loại.

Điểm mấu chốt của sự khác nhau là **state** thì private và chỉ có thể được thay đổi bên trong bản thân component. **Props** thì mang tính external, và không bị kiểm soát bởi bản thân component. Nó được truyền từ component cao hơn theo phân cấp, hay có thể hiểu đơn giản là truyền từ component cha xuống component con, cái mà điều khiển dữ liệu trước khi truyền xuống.

**Props** là bất biến. Nhưng thực tế trong khi code, chúng ta muốn làm thay đổi các giá trị. Và vì thế, chúng ta cần **state**.

Kết quả sau khi chạy đoạn code trên như sau: 
![](https://images.viblo.asia/2b804d06-43ec-4491-8ff9-d9e4385ae1b9.jpg)

Cám ơn các bạn đã theo dõi bài viết. Mong rằng nó sẽ giúp ích cho bạn. Tham khảo bài viết chính dưới đây:
https://www.tutorialspoint.com/reactjs/reactjs_components.htm