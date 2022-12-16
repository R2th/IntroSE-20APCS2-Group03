### Requirement
Để tạo được một dự án mới dùng reactjs bạn cần phải có 
- Node version >= 10.16 
- npm version >= 5.6
bạn có thể cài version mới nhất của node hiện tại (14.17.0)
### Create project
```
npx create-react-app react-app
cd react-app
npm start
```
Sau khi chạy `npm start` sẽ mở một tab hôm page như ảnh dưới

![](https://images.viblo.asia/6f4736d9-c804-4e42-b10f-fcfde1526c69.png)

### Cấu trúc của project
![](https://images.viblo.asia/4db07c26-7f4d-411c-8818-150cc72fc291.png)

- src/Index.js : react nó sẽ bắt đầu chạy từ trong file index.js này.
- src/ .css : những file có đuôi là .css dùng để viết css style
- src/app.js : là component để render home page như ảnh trên. Nó được gọi ở trong file index.js.
- thư mục public : dùng để chứa các trang web tĩnh hoặc ảnh ...
- package.json chứa các module/library
- thư mục node_modules : chứa các package module hoặc library

### Components
Components là gì?
Components là một javascript class hoặc function trả về giá trị là HTML thông qua hàm render().
Component được chia làm 2 loại với giá trị return như nhau. Đọc thêm sự khác nhau giữa class components và function components ở [đây](https://djoech.medium.com/functional-vs-class-components-in-react-231e3fbd7108#:~:text=The%20most%20obvious%20one%20difference,which%20returns%20a%20React%20element.)
* Class components  
```
class Greeting extends React.Component {
  render() {
    return <h2>Hello!</h2>;
  }
}
```
* Function components
```
function Greeting() {
  return <h2>Hello!</h2>;
}
```

### Hoạt động của project
Mình sẽ nhìn vào file khởi động đầu tiên của react. Đó là file `src/index.js`

![](https://images.viblo.asia/2d9e7db4-1d19-4e64-8435-6987824d06f3.png)

* Để gọi được các module hoặc library hoặc component mình cần phải import nó vào trong file. Vd:
```
import App from './App';
```
* File index.js này có render component App với cú pháp là `<App />` vào trong element có id là `root`(element id `root` có sẵn khi tạo project)
* Trong file App có render trang html như home page ở trên.

![](https://images.viblo.asia/d2a34d61-470a-40c5-bb95-fd51fad64fd1.png)

### React State
State là một đối tượng lưu giá trị của Components. Khi giá trị của state thay đổi Components sẽ render lại. Mình sẽ lấy ví dụ mình có 1 ổ nhập, khi nhập giá trị vào đó nó sẽ được hiển thì lên ở trên screen.
Mình sẽ thay code mới vào trong file `App.js`

```
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState("");

  return (
    <div>
      <input className="inputName" onChange={(e) => setName(e.target.value)} /><br></br>
      <div>{name}</div>
    </div>
  );
}

export default App;

```
ở đây mình đang sử dụng [State Hook](https://reactjs.org/docs/state-and-lifecycle.html) để set và get value của state. 
```
const [name, setName] = useState("");
```
userState gồm có 2 phần. Phần thứ nhất là biết `name` với giá trị khởi đầu là "" và phần thứ 2 dùng để update state.
Sau khi chạy sẽ được kết quả sẽ như ảnh dưới.

![](https://images.viblo.asia/466beda6-85ef-44c1-b0ec-b4e5ef377655.gif)

### Lifecycle

* componentWillMount: thực hiện trước khi render lần đầu tiên.
* componentDidMount: thực hiện sau khi render lần đâu tiên. Thường thì Ajax request, state update, javascript framworks hoặc các function dùng delay được gọi trong này.
* componentWillReceiveProps: thực hiện sau khi một giá trị nào đó thay đổi và trước khi render được gọi.
* shouldComponentUpdate: dùng để check component có nên render lại không. Nó sẽ return với giá trị là true hoặc fault. Giá trị mặc của nó sẽ là true.
* componentWillUpdate: thực hiện trước khi rendering
* componentDidUpdate: thực hiện sau khi rendering.
* componentWillUnmount: thực hiện sau khi component bị unmounted trong trong dom.

### References
* https://reactjs.org/docs/getting-started.html
* https://www.w3schools.com/react/react_components.asp#:~:text=Components%20are%20independent%20and%20reusable,will%20concentrate%20on%20Class%20components.
* https://www.tutorialspoint.com/reactjs/reactjs_component_life_cycle.htm