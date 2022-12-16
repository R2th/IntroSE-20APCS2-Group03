Chào mọi người, hôm nay chúng ta sẽ tìm hiểu một thư viện front-end được phát triển bởi Facebook đó là ReactJs. React được sử dụng để xử lý ở tầng view cho các website và mobile app, cho phép ta tạo nên các Reusable UI components. Là 1 trong những thư viện JS phổ biến nhất hiện nay, có nền tảng vững chắc cùng với 1 cộng đồng developer vô cùng lớn đằng sau nó. 
1. Đầu tiên các bạn cần cài đặt [Node.js](https://nodejs.org/en/) để tạo môi trường chạy React, việc cài đặt rất đơn giản và nhanh chóng. 
2. Tạo 1 folder để chứa project React, vào trong folder đè shift nhấn chuột phải và chọn như hình.

![](https://images.viblo.asia/1da53039-fab8-4972-ac7a-f245a37135e3.png)

3. Tiếp theo gõ các dòng lệnh sau để tạo project 

```
npm install -g create-react-app


create-react-app my-app 
```

*NPM sẽ  tự động tạo cho ta 1 project tên là my-app và install các module và lib cần thiết cho chúng ta.*

4. Vào thư mục src xóa hết các file trong đây, lưu ý không xóa cả thư src mà chỉ xóa các file ở trong đó.

5. Sau đó tạo mới 2 file, **Index.js** và **App.js**,.

Trong **App.js** các bạn code như sau:
import React from 'react';

```
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
Đây là React component đầu tiên của chúng ta, chúng ta sẽ tìm hiểu component là gì ở các bài sau, component này là App sẽ render Hello World ra màn hình.
Tiếp theo trong **index.js** ta code:
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('root'));
```
Bạn thắc mắc không biết Id root ở đâu? Bạn để ý trong project mình có 1 thư mục là public, bạn mở nó ra thấy 1 file **index.html** mở nó ra và bạn sẽ thấy 1 div với id root như hình:

![](https://images.viblo.asia/8531f9fd-6b6d-4be9-92b8-c3c649284dd7.png)

Đây là file HTML chính của ta, tất cả component sẽ được render ra đây.

6. Running the Server:

 Các bạn mở cmd lên và gõ lệnh: npm start.
 
 ![](https://images.viblo.asia/7495cf14-1d37-4019-8aab-ccee1544b887.jpg)
 
 Và chúng ta có được sản phẩm React đầu tiên. Chúc mọi người học tốt.

Các bạn xem thêm các bài hướng dẫn React tại blog này, viết khá dễ hiểu và ngắn gọn:[ Hướng dẫn lập trình ReactJs](http://5minuteshack.blogspot.com/search/label/reactjs#archive-page-2)