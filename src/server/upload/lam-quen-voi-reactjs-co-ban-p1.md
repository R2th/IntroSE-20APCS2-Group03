##### Dưới đây, là một số các bước làm quen với ReactJS mà mình đã đọc được quan một thời gian tìm hiểu nó (hiện tại mình sử dụng phiên bản cao nhất của nó là 16.7.0) 

-----


##### **1. Sử dụng create-react-app để setup một Simple React App**
- Sử dụng lệnh `npx create-react-app example-react` (trong đó example-react là tên app mình cần tạo).
-----
- Sau khi chạy xong lệnh trên ta sẽ  được như hình bên dưới là đã tạo xong 1 simple app thành công.

![](https://images.viblo.asia/06dbab81-155d-4aec-a568-cd65b27ca922.png)

-----
- Tiếp tục, ta hiện hành cd đến simple app vừa tạo bằng lệnh : `cd example-react`, rồi chạy `npm start` để khởi động server.
- Sau khi khởi động server thành công, ta tiếp tục vào trong source code của app vừa tạo. Ở đây, mình sẽ xóa các file không cần thiết cho simple app này chỉ để lại 2 file `App.js `với `index.js` trong foler src của app.

![](https://images.viblo.asia/43d95aa3-3706-4099-8db4-225fefba0931.png)

-----
- Tiếp đến ta bắt đầu viết App.js trong folder src
```js
import React from 'react';

const App = () => <h2>Hello World!</h2>

export default App
```
- Ở đây, mình có viết biến `const App` chứa 1 đoạn html , sau đó t có sử dụng `export` biến App để có thể dụng lại được cho nhiều chỗ khác.
- Sau cùng, ta đến file index.js trong folder src, tiến hành code cho nó:
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```
- Ở đây, t có `import App from './App'` tức là t sẽ dùng biến App lúc trước ta tạo ở file App.js để dùng lại cho bên này.
- Sử dụng `ReactDOM.render()` ở đây có nghĩa là ta sẽ render App vào một html element có id là root, kết quả ta thu được:
![](https://images.viblo.asia/62efc934-f5d1-4472-853a-166e2bce8d8e.png)
-----
##### **2. Viết "Hello World" với React Component**
- Ở đây, ta quay lại file App.js rồi tiến hành sửa lại code bên trên như sau:
```js
import React from 'react';

class App extends React.Component {
  render() {
    return <h2>Hello World!</h2>
  }
}

export default App
```
- Đoạn code trên có chức năng tạo một React Element App thay vì sử dụng biến const. Việc tạo ra 1 react element ở đây để ta có thể sử dụng được `prop,state`... mà reactjs hỗ trợ (còn `prop` hay `state` là gì thì các bạn có thể tham khảo [tại đây](https://viblo.asia/p/mot-vaikhai-niem-co-ban-trong-react-07LKXER8ZV4)) 
- Trong function render() bên trên, ngoài việc viết kiểu thuần html ra ta có thể viết nó theo dạng hướng đối tượng như sau:
```js
render() {
    return React.createElement('h2', null, 'My name ReactJS')
  }
```
##### **3. Set Properties cho React Components**
- Ở file index.js, ta sẽ truyền 1 props name vào component App:
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App name="Use prop in React" />, document.getElementById('root'));
```
- Sau đó ở file App.js, để có thể sử dụng prop name vừa truyền vào ta sẽ viết như sau:
```js
import React from 'react';

class App extends React.Component {
  render() {
    return <h1>{this.props.name}</h1>
  }
}

export default App
```
- Ta có thể set được giá trị mặc định của prop cho component bằng cách:
```js
App.defaultProps = {
  name: "Default props"
}
```
  Thì `ReactDOM.render(<App name="Use prop in React" />, document.getElementById('root'));` trong file index.js nếu không truyền vào prop `name="Use prop in React" `nó sẽ mặc định nhận giá trị là` "Default props"`
- Ngoài ra, ta có thể set type cho prop như sau:<br>
- Nếu bạn đang dùng React version sau phiên bản 15.5 thì bạn sẽ phải import thêm PropTypes để có thể set type cho prop bằng cách:
```js
import PropTypes from 'prop-types';
````
- Sau khi import, giờ ta có thể set type cho prop được rồi:
```js
App.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number
};
```


###### Trên đây, là các bài ví dụ để bạn có thể làm quen được với Reactjs căn bản cho các bạn mới bắt đầu giống như mình.
###### Cảm ơn các bạn đã theo dõi!
###### Tài liệu tham khảo:
[ReactJs](https://reactjs.org/docs/getting-started.html)