Mình có 1 component như thế này
```
import React from "react";
const App = () => (
  <div>Hello World!!!</div>
);
export default App;
```
Bạn có bao giờ tự hỏi là ở dưới không bao giờ dùng đến `React` mà lại phải import ở trên không ? Xóa đoạn import đấy đi thì lại bị báo lỗi

![](https://images.viblo.asia/95df6002-4950-4bce-80d0-d3299107c887.png)

Sau một lúc tìm hiểu thì mình cũng đã biết tại sao. Vấn đề là do `JSX` cái đoạn "trông như HTML" ở trong component đấy là `JSX`. Sau khi đoạn "trông như HTML" đấy được babel biên dịch lại thì nó sẽ trông như thế này
```
var App = function App() {
  return React.createElement(
    "div",
    null,
    "Hello World!!!"
  );
};
```
Giờ thì bạn đã thấy là `React` được dùng ở `React.createElement` rồi đúng không. Đó là lý do tại sao mà có vẻ như là code của bạn không bao giờ dùng đến biến `React` nhưng vẫn phải import React ở trong functional component. 
Nguồn: https://hackernoon.com/why-import-react-from-react-in-a-functional-component-657aed821f7a