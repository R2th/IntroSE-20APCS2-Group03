ReactJS là một thư viện viết bằng javascript, dùng để xây dựng giao diện người dùng (User Interface – UI). React có thể được dùng để phát triển các ứng dụng web single-page, hoặc trên các thiết bị di động. Trong bài viết này, mình xin giới thiệu về JSX trong React

![](https://images.viblo.asia/420577d1-56ac-483d-a589-d8f036092c8d.png)

## JSX
### JSX là gì?
JSX = Javascript + XML
Là cú pháp mở rộng giống như XML của Javascript. React sử dụng JSX làm quy chuẩn khi lập trình thay cho Java Script thông thường. React không yêu cầu sử dụng JSX, nhưng hầu hết mọi người thấy nó hữu ích như một trợ giúp trực quan khi làm việc với giao diện người dùng bên trong mã JavaScript. Nó cũng cho phép React hiển thị các thông báo lỗi, cảnh báo hữu ích hơn và giúp bạn viết template dễ dàng hơn và nhanh hơn
### Cú pháp và Sử dụng JSX
Giống như XML, các thẻ JSX có `name`, `attribute`, và `children`

**Example 1:**
```js
const myname = <h2 className="myname">My name is Huynh</h2>;
```

Vậy sử dụng cú pháp JSX như thế nào, xem ví dụ sau đây để biết cách sử dụng JSX:
<br><br>
**Example 2:**

Sau khi setup enviroment và tạo mới ứng dụng với ReactJS, chúng ta vào file `App.js` và sửa lại như sau:
 - Viết Component sử dụng JSX:
```js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h2 className="title">This is Title</h2>
        <h3 className="subheading">This is Sub heading</h3>
      </div>
    );
  }
}

export default App;
```

- Bây giờ, nếu không sử dụng JSX thì sẽ như thế nào:

```js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return React.createElement(
        'div', {className: 'container'},
        React.createElement('h2', {className: 'title'}, 'This is Title'),
        React.createElement('h3', {className: 'subheading'}, 'This is Sub heading')
    );
  }
}

export default App;
```
Qua `Example 2`, chúng ta có thể thấy code sử dụng JSX dễ đọc dễ hiểu hơn so với code không sử dụng nó. Về cơ bản, bằng cách sử dụng JSX, bạn có thể viết mã HTML bằng JavaScript sau đó Babel chuyển đổi các biểu thức này thành mã JavaScript thực tế. Nó cho phép chúng ta đưa HTML vào JavaScript. JSX giống như một cách viết tắt để gọi hàm `React.createElement()`

Note: Với Component có nhiều element thì các element phải nằm trong một container chứa nó

### Nhúng biểu thức trong JSX
Bạn có thể nhúng bất kỳ biểu thức JavaScript nào trong JSX bằng cách đóng nó trong dấu ngoặc nhọn
<br><br>
**Example 3:**

Sau khi setup enviroment và tạo mới ứng dụng với ReactJS, chúng ta vào file App.js và sửa lại như sau:

```js
import React, { Component } from 'react';

class App extends Component {
  fullName(user) {
      return user.firstName + " " + user.lastName;
  }
  
  render() {
      const user = {
          firstName: 'Phan Ly',
          lastName: 'Huynh'
      }

        return <h2>Hello, { this.fullName(user) }</h2>
  }
}

export default App;
```

### Thuộc tính chỉ định với JSX
Bạn có thể sử dụng dấu ngoặc kép để chỉ định các chuỗi ký tự như các thuộc tính:

```js
const element = <div tabIndex="0"></div>;
```

Bạn cũng có thể sử dụng dấu ngoặc nhọn để nhúng biểu thức JavaScript vào một thuộc tính:
```js
const element = <img src={user.avatarUrl}></img>;
```
### Styling trong JSX
Để sử dụng inline styles trong React, chúng ta khai báo style với các thuộc tính cần style. Sau đó, nhúng nó vào thuộc tính chỉ định Style sử dụng dấu ngoặc nhọn({})
<br><br>
**Example 4:**
Chúng ta chỉnh sửa kích cỡ chữ 20px và màu sắc chữ thành màu đỏ:

Sau khi setup enviroment và tạo mới ứng dụng với ReactJS, chúng ta vào file App.js và sửa lại như sau:
```js
import React, { Component } from 'react';

class App extends Component {
  fullName(user) {
      return user.firstName + " " + user.lastName;
  }
  
  render() {
    const style = {
      fontsize: 20,
      color: 'red',
    }

    const user = {
      firstName: 'Phan Ly',
      lastName: 'Huynh'
    }

    return <h2 style={style}>Hello, { this.fullName(user) }</h2>
  }
}

export default App;

```

## Kết luận
Trên đây là những chia sẻ của mình sau khi tìm hiểu về JSX trong ReactJS. Mong rằng bài viết sẽ mang lại những cái nhìn tổng quan về JSX. Mong nhận được những góp ý của các bạn về bài viết, nếu bài viết có ích hãy upvote giúp mình :D. Trong bài viết tiếp theo mình sẽ chia sẻ với các bạn về Component trong ReactJS (https://viblo.asia/p/component-trai-tim-cua-reactjs-V3m5Womw5O7)
## Tài liệu tham khảo
https://reactjs.org/docs/introducing-jsx.html
https://www.tutorialspoint.com/reactjs/reactjs_jsx.htm