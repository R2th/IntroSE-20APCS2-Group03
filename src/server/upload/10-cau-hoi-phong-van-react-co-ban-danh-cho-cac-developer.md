# 1. Ưu nhược điểm của React
### Ưu điểm: 
- Dễ học
- Cú pháp giống html cho phép tạo các template và tài liệu chi tiết 
- Hỗ trợ server-side rendering
- Dễ dàng migrate giữa các version React 
- Sử dụng Javascript thay vì code riêng đặt biệt. 

### Nhược điểm
- Tài liệu kém 
- Giới hạn chỉ xem 1 phần của MVC 
- Các developer mới có thể coi là 1 rào cản với những công ty chưa muốn thay đổi.

# 2. Sử dụng React ở đâu
- Đối với app có nhiều sự kiện
- Khi team developer của bạn mạnh về CSS, JavaScript và HTML
- Bạn muốn tạo ra các component có thể chia sẻ
- Bạn cần một giải pháp có thể cá nhân hoá.

# 3. Những quan niệm sai lầm về React
### React là 1 framework
Nhiều developer và sinh viên có quan niệm sai lầm cho rằng React là một framework với đầy đủ chức năng. Đó là bởi vì chúng tôi thường so sánh React với các framework lớn như Angular và Ember. Sự so sánh này không phải để so sánh các framework tốt nhất mà là để tập trung so sánh sự khác biệt và tương đồng của phương pháp tiếp cận React và Angular, điều này làm cho các dịch vụ của họ đáng để nghiên cứu. Angular hoạt động trên mô hình MVC để hỗ trợ các lớp Model, View và Controller của một ứng dụng. React chỉ tập trung vào chữ ‘V,’ là lớp xem của ứng dụng và cách làm cho việc xử lý dễ dàng hơn để tích hợp suôn sẻ vào một dự án.

### React’s Virtual DOM nhanh hơn DOM.
React sử dụng Virtual DOM, về cơ bản là một cây các đối tượng JavaScript đại diện cho DOM thực của trình duyệt. Lợi thế của việc sử dụng điều này cho các developer là họ không thao tác trực tiếp với DOM như các developer làm với jQuery khi họ viết các ứng dụng React. Thay vào đó, họ sẽ cho React biết cách họ muốn DOM thực hiện các thay đổi đối với đối tượng trạng thái và cho phép React thực hiện các cập nhật cần thiết cho DOM của trình duyệt. Điều này giúp tạo mô hình phát triển toàn diện cho các developer vì họ không cần theo dõi tất cả các thay đổi của DOM. Họ có thể sửa đổi đối tượng trạng thái và React sẽ sử dụng các thuật toán của nó để hiểu phần nào của giao diện người dùng đã thay đổi so với DOM trước đó. Sử dụng thông tin này sẽ cập nhật DOM thực của trình duyệt. Virtual DOM cung cấp một API tuyệt vời để tạo giao diện người dùng và giảm thiểu số lượng cập nhật được thực hiện trên DOM của trình duyệt.

Tuy nhiên, nó không nhanh hơn DOM thực tế. Bạn chỉ cần đọc rằng nó cần phải kéo thêm các chuỗi để tìm ra phần nào của giao diện người dùng cần được cập nhật trước khi thực sự thực hiện các bản cập nhật đó. Do đó, Virtual DOM có lợi cho nhiều thứ, nhưng nó không nhanh hơn DOM.

# 4. Các câu hỏi
## 1. Giải thích cách React sử dụng cấu trúc dữ liệu dạng cây được gọi là DOM ảo để mô hình hóa DOM
DOM ảo là một bản sao của cây DOM thực. Cập nhật trong React được thực hiện cho DOM ảo. React sử dụng một thuật toán khác để điều chỉnh các thay đổi và gửi đến DOM để xác nhận và vẽ.

## 2. Tạo các nút DOM ảo bằng JSX Để tạo một nút DOM ảo React bằng JSX, hãy xác định cú pháp HTML trong một tệp JavaScript.
```
const hello = <h1>Hello World!</h1>;
```

Ở đây, biến 'hello' trong JavaScript được đặt thành phần tử React virtual DOM h1 với văn bản “Hello World!”.
Bạn cũng có thể lồng các nút DOM ảo vào nhau giống như cách bạn thực hiện trong HTML với DOM thực.

```
const navBar = (
  <nav>
    <ul>
      <li>Home</li>
      <li>Profile</li>
      <li>Settings</li>
    </ul>
  </nav>
);
```

## 3. Sử dụng các công cụ debug để xác định thời điểm một thành phần đang hiển thị
Chúng tôi sử dụng React DevTools extension làm tiện ích mở rộng trong Trình duyệt DevTools của chúng tôi để gỡ lỗi và xem khi một thành phần đang hiển thị.


// ảnh đang bị lỗi k upload được, mình sẽ update sau.

## 4. Mô tả cách JSX chuyển đổi thành các nút DOM thực tế
Để chuyển JSX thành các nút DOM, chúng tôi sử dụng phương thức ReactDOM.render. Các thay đổi của nút DOM ảo React cho phép Babel truyền tải nó và gửi các thay đổi JS để cam kết với DOM.

## 5. Sử dụng phương thức ReactDOM.render để React hiển thị các nút DOM ảo của bạn dưới một nút DOM thực tế
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

## 6. Đính kèm một trình xử lý sự kiện vào một nút DOM thực sự bằng cách sử dụng một nút ảo

DOM ảo (VDOM) là một khái niệm lập trình trong đó một biểu diễn lý tưởng hay còn gọi là “ảo” của giao diện người dùng được lưu trong bộ nhớ và được đồng bộ hóa với DOM “thực” bởi một thư viện như ReactDOM. Quá trình này được gọi là hòa giải.

Cách tiếp cận này cho phép API khai báo của React: Bạn cho React biết bạn muốn giao diện người dùng ở trạng thái nào và nó đảm bảo DOM khớp với trạng thái đó. Điều này tóm tắt thao tác thuộc tính, xử lý sự kiện và cập nhật DOM thủ công mà bạn sẽ phải sử dụng để xây dựng ứng dụng của mình.

Vì “DOM ảo” mang tính chất mẫu hơn là một công nghệ cụ thể, nên đôi khi người ta nói nó có nghĩa là những thứ khác nhau. Trong thế giới React, thuật ngữ “DOM ảo” thường được kết hợp với các phần tử React vì chúng là các đối tượng đại diện cho giao diện người dùng. Tuy nhiên, React cũng sử dụng các đối tượng bên trong được gọi là “sợi” để chứa thông tin bổ sung về cây thành phần. Chúng cũng có thể được coi là một phần của việc triển khai “DOM ảo” trong React.

### Shadow DOM có giống với DOM ảo không?

Không, chúng khác nhau. Shadow DOM là một công nghệ trình duyệt được thiết kế chủ yếu cho các biến phạm vi và CSS trong các thành phần web. DOM ảo là một khái niệm được triển khai bởi các thư viện bằng JavaScript trên các API của trình duyệt.

Để thêm trình xử lý sự kiện vào một phần tử, hãy xác định một phương thức để xử lý sự kiện và liên kết phương thức đó với sự kiện phần tử mà bạn muốn lắng nghe:

```
function AlertButton() {
  showAlert = () => {
    window.alert('Button clicked!');
  };

  return (
    <button type='button' onClick={showAlert}>
      Click Me
    </button>
  );
}
export default AlertButton;
```

## 7. Sử dụng create-react-app để khởi tạo một ứng dụng React mới và nhập các phần phụ thuộc bắt buộc

Tạo mặc định create-react-application bằng cách nhập vào terminal. 

### Giải thích về npm vs npx từ Free Code Camp:
npm (trình quản lý gói nút) là trình quản lý gói / phụ thuộc mà bạn có được khi cài đặt Node.js. Nó cung cấp một cách để các nhà phát triển cài đặt các gói trên toàn cầu và cục bộ.

Đôi khi bạn có thể muốn xem một gói cụ thể và thử một số lệnh. Nhưng bạn không thể làm điều đó mà không cài đặt các phụ thuộc trong thư mục node_modules cục bộ của mình.

### npm người quản lý gói
npm là một cặp. Đầu tiên và quan trọng nhất, nó là một kho lưu trữ trực tuyến để xuất bản các dự án Node.js mã nguồn mở.
Thứ hai, nó là một công cụ CLI hỗ trợ bạn cài đặt các gói đó và quản lý các phiên bản và phụ thuộc của chúng. Có hàng trăm nghìn thư viện và ứng dụng Node.js trên npm và nhiều thư viện khác được thêm vào mỗi ngày.

npm tự nó không chạy bất kỳ gói nào. Nếu bạn muốn chạy một gói bằng npm, bạn phải chỉ định gói đó trong tệp package.json của mình.

Khi các tệp thực thi được cài đặt thông qua các gói npm, npm sẽ tạo liên kết đến chúng:

- local cài đặt có link tạo ở thư mục  ./node_modules/.bin/
- global cài đặt có link tạo ở thư mục bin chung ( ví dụ: /usr/local/bin on Linux hoặc at %AppData%/npm trên Windows). 

Để thực thi một gói với npm, bạn phải nhập đường dẫn cục bộ, như sau:
```
$ ./node_modules/.bin/your-package
```

hoặc bạn có thể chạy một gói được cài đặt cục bộ bằng cách thêm nó vào tệp package.json của bạn trong phần script, như sau:

```
{
  "name": "your-application",
  "version": "1.0.0",
  "scripts": {
    "your-package": "your-package"
  }
}
```

Sau đó, bạn có thể chạy tập lệnh bằng cách sử dụng npm run:

```
npm run your-package
```

Bạn có thể thấy rằng việc chạy một gói với npm đơn giản đòi hỏi khá nhiều thứ.
May mắn thay, đây là nơi mà npx có ích.

### npx the package runner

Vì npm phiên bản 5.2.0 nên npx được đóng gói sẵn với npm. Vì vậy, nó đã trở thành một tiêu chuẩn ngày nay.

npx cũng là một công cụ CLI có mục đích là giúp dễ dàng cài đặt và quản lý các phần phụ thuộc được lưu trữ trong sổ đăng ký npm.

Giờ đây, rất dễ dàng để chạy bất kỳ loại tệp thực thi nào dựa trên Node.js mà bạn thường cài đặt qua npm.

Bạn có thể chạy lệnh sau để xem nó đã được cài đặt cho phiên bản npm hiện tại của bạn chưa:

```
$ which npx
```

Nếu không, bạn có thể cài đặt nó như sau: 

```
$ npm install -g npx
```

Sau khi bạn chắc chắn rằng bạn đã cài đặt nó, hãy cùng xem một số trường hợp sử dụng khiến npx trở nên cực kỳ hữu ích.

### Chạy một gói được cài đặt cục bộ một cách dễ dàng

Nếu bạn muốn thực thi một gói được cài đặt cục bộ, tất cả những gì bạn cần làm là nhập:
```
$ npx your-package
```

npx sẽ kiểm tra xem `<command>` hoặc` <package> `có tồn tại trong $ PATH hay trong các tệp nhị phân của dự án cục bộ hay không và nếu có, nó sẽ thực thi nó.

### Thực thi các gói chưa được cài đặt trước đó

Một ưu điểm chính khác là khả năng thực thi một gói chưa được cài đặt trước đó.
Đôi khi bạn chỉ muốn sử dụng một số công cụ CLI nhưng bạn không muốn cài đặt chúng trên global chỉ để kiểm tra chúng. Điều này có nghĩa là bạn có thể tiết kiệm một số dung lượng ổ đĩa và chỉ chạy chúng khi bạn cần. Điều này cũng có nghĩa là các biến toàn cục của bạn sẽ ít bị ảnh hưởng hơn.

Bây giờ, chúng ta đã ở đâu?
npx create-react-app <tên của ứng dụng> --use-npm
npx cung cấp cho chúng tôi phiên bản mới nhất. --use-npm chỉ có nghĩa là sử dụng npm thay vì yarn hoặc một số trình quản lý gói khác

## 8. Pass props into a React component

`props` là một đối tượng được truyền từ component cha sang component con. Các giá trị có thể thuộc bất kỳ cấu trúc dữ liệu nào bao gồm một hàm (là một đối tượng).
```
function NavBar() {
  return (
    <nav>
      <h1>Pet App</h1>
      // props being passed in component
      <NavLinks hello='world' />
    </nav>
  );
}
```

Bạn cũng có thể nội suy các giá trị vào JSX.

Đặt một biến thành chuỗi, “world” và thay thế chuỗi “world” trong phần tử NavLinks JSX bằng biến được bao bọc trong dấu ngoặc nhọn:
```
function NavBar() {
  const world = 'world';
  return (
    <nav>
      <h1>Pet App</h1>
      //props passes as a variable
      <NavLinks hello={world} />
    </nav>
  );
}
```


### Truy cập props: 

Để truy cập đối tượng props của chúng ta trong một component khác, chúng ta chuyển nó đối số props và React sẽ gọi thành phần chức năng với đối tượng props.

### Nhắc nhở:

Về mặt khái niệm, các thành phần giống như các hàm JavaScript. Họ chấp nhận các đầu vào tùy ý (được gọi là “đạo cụ”) và trả về các phần tử React mô tả những gì sẽ xuất hiện trên màn hình.

### Function and Class Components
The simplest way to define a component is to write a JavaScript function:
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

Hàm này là một thành phần React hợp lệ vì nó chấp nhận một đối số đối tượng “props” (viết tắt của thuộc tính) với dữ liệu và trả về một phần tử React. Chúng tôi gọi các thành phần như vậy là “các thành phần chức năng” bởi vì chúng thực sự là các hàm JavaScript.

Bạn cũng có thể sử dụng một lớp ES6 để xác định một thành phần:

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
Hai thành phần trên là tương đương nhau theo quan điểm của React.

```

function NavLinks(props) {
  return (
    <ul>
      <li>
        <a href='/hello'>{props.hello}</a>
      </li>
      <li className='selected'>
        <a href='/pets'>Pets</a>
      </li>
      <li>
        <a href='/owners'>Owners</a>
      </li>
    </ul>
  );
```

Bạn có thể chuyển bao nhiêu props tùy thích.

## 9. Destructure props
Bạn có thể hủy cấu trúc đối tượng props trong tham số của thành phần hàm.

```
function NavLinks({ hello, color }) {
  return (
    <ul>
      <li>
        <a href='/hello'>{hello}</a>
      </li>
      <li className='selected'>
        <a href='/pets'>Pets</a>
      </li>
      <li>
        <a href='/owners'>Owners</a>
      </li>
    </ul>
  );
}
```

## 10. Tạo các routes bằng cách sử dụng các component từ gói react-router-dom

Import react-router-dom:
```
npm i react-router-dom
```

In index.js
```
// ./src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
const Root = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
ReactDOM.render(
  <React.StrictMode>
    {" "}
    <Root />{" "}
  </React.StrictMode>,
  document.getElementById("root")
);
```

- Ở trên, bạn nhập BrowserRouter của mình mà bạn có thể bao bọc toàn bộ hệ thống phân cấp routes  của mình. Điều này làm cho thông tin routing từ  React Router có sẵn cho tất cả các thành phần con của nó.

- Sau đó, trong thành phần bạn chọn, thường là cấp cao nhất, chẳng hạn như App.js, bạn có thể tạo các routes của mình bằng cách sử dụng Route và Switch Components.

```
import { Route, Switch } from "react";
import Home from "./components/Home";
<Switch>
  <Route exact path="/">
    <Home />
  </Route>
  <Route exact path="/users">
    <Users />
  </Route>
</Switch>;
```


Bài viết được dịch từ: 
https://javascript.plainenglish.io/react-md-cbaafb31765d

Cám ơn các bạn đã đọc.