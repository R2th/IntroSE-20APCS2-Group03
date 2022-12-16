Chúng ta sẽ cùng tìm hiểu về ReactJS - JSX trong bài viết này nhé. Các bạn có thể tham khảo bài viết gốc tại [đây.](https://www.tutorialspoint.com/reactjs/reactjs_jsx.htm)

React sử dụng JSX làm template thay vì javascript thông thường. Nó không nhất nhiết phải sử dụng nó, tuy nhiên nó sẽ có một số ưu điểm như sau:

- Nó nhanh hơn vì nó tối ưu hóa hiệu năng trong khi biên dịch mã thành JavaScript.

- Nó cũng là cách an toàn và hầu hết các lỗi có thể bắt được trong quá trình biên dịch.

- Nó giúp bạn viết các template dễ dàng hơn và nhanh hơn, nếu bạn thông thạo HTML.

**Sử dụng JSX**

JSX trông giống với HTML thông thường ở nhiều điểm. Tham khảo đoạn code từ **App.jsx** dưới đây, nó sẽ trả về một **div**

*App.jsx*
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

Mặc dù nó tương tự như HTML nhưng chúng ta cần có một số điểm cần lưu ý khi làm việc với JSX. Sau đây sẽ là các điểm cần lưu ý.

**1. Các phần tử lồng nhau**

Nếu bạn muốn trả về nhiều phần tử,  chúng ta cần bao nó bởi phần tử container. Lưu ý chúng ta sử dụng **div** để bọc các phần tử **h1**, **h2** và **p**. Hãy xem đoạn mã dưới đây để hiểu thêm về điều này:

*App.jsx*
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

Kết quả sau khi chạy đoạn code trên như sau:

![](https://images.viblo.asia/ac410808-c243-4506-a618-7010f2332a59.jpg)

**2. Các thuộc tính**

Chúng ta có thể sử dụng các thuộc tính tùy chỉnh của riêng chúng ta, ngoài các thuộc tính HTML thông thường. Khi chúng ta muốn thêm thuộc tính tùy chỉnh, chúng ta cần sử dụng tiền tố **data-**. Trong ví dụ sau, chúng ta sẽ thêm **data-myattribute** làm thuộc tính của thẻ p.

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

**3. Biểu thức Javascript**

Biểu thức Javascript có thể được sử dụng trong JSX. Chúng ta chỉ cần đặt nó trong cặp dấu ngoặc nhọn {}. Trong ví dụ dưới đây sẽ trả về **2**:

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

Kết quả sẽ như sau:

![](https://images.viblo.asia/62916642-4b44-4b7a-805b-99c2550549d7.jpg)

Chúng ta không thể sử dụng các câu lệnh **if else** bên trong JSX, thay vào đó chúng ta có thể sử dụng các biểu thức có điều kiện (ternary). Trong ví dụ sau, biến **i = 1** để trình duyệt sẽ hiển thị **true**. Nếu chúng ta thay đổi nó thành một giá trị khác, nó sẽ hiển thị **false**.

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

Kết quả sẽ như sau:

![](https://images.viblo.asia/6a514664-6036-4ec7-ac85-195a14695474.jpg)

**4. Styling**

React recommends sử dụng inline styles. Khi chúng ta muốn cài đặt inline styles , chúng ta cần sử dụng cú pháp **camelCase**. React cũng sẽ tự động nối thêm **px** sau giá trị số đối với  các phần tử đặc biệt. Ví dụ sau đây cho thấy cách thêm **myStyle** inline vào phần tử **h1**.

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

Kết quả sẽ hiển thị như sau:

![](https://images.viblo.asia/ab02d027-0b1f-4cf3-8171-9f0a57df29b6.jpg)


**5. Comments**

Khi viết các comment, chúng ta cần đặt chúng vào cặp dấu ngoặc nhọn {} khi chúng ta muốn viết comment trong các thẻ. Cách tốt nhất là luôn sử dụng {} khi viết comment vì chúng ta sẽ tạo tính nhất quán cho ứng dụng. Theo dõi ví dụ sau để hiểu thêm:

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

**6. Naming Convention**

Các thẻ **HTML** luôn sử dụng tên thẻ là **chữ thường**, trong khi các **React components** bắt đầu bằng **chữ hoa**.

**Lưu ý** - Bạn nên sử dụng **className** và **htmlFor** làm tên thuộc tính XML thay vì **class** và **for**.

Điều này được giải thích trên trang chính thức của React như sau:

Vì JSX là JavaScript, nên các mã định danh như **class** và **for** không được khuyến khích là các tên thuộc tính XML. Thay vào đó, các thành phần React DOM mong đợi các tên thuộc tính DOM tương ứng như **className** và **htmlFor**


Tổng kết:

Cảm ơn bạn đã theo dõi bài viết. Mong nó có thể giúp ích được cho bạn! 

Tham khảo:

https://www.tutorialspoint.com/reactjs/reactjs_jsx.htm