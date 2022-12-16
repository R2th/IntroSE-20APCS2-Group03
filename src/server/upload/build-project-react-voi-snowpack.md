Trong bài viết trước thì mình đã giới thiệu với các bạn về [snowpack](https://viblo.asia/p/nhanh-nhu-chop-voi-snowpack-bWrZnVa9Zxw). Trong bài viết lần này thì chúng ta sẽ cùng build project React với snowpack, cũng như tìm hiểu về cách sử dụng npm package, adding css, build cho môi trường production và development với snowpack. Bắt đầu nào :D

![](https://images.viblo.asia/eaa007eb-883b-4ce9-ae72-de90829218d0.png)

# Tạo project snowpack
Ở trong bài viết trước về [snowpack](https://viblo.asia/p/nhanh-nhu-chop-voi-snowpack-bWrZnVa9Zxw) thì mình cũng đã tạo một project với snow pack bằng cách init bằng npm và install snowpack. Trong bài viết này chúng ta sẽ sử dụng công cụ của npx để cài đặt project snowpack dễ dàng và đơn giản hơn. 

```
npx create-snowpack-app react-snowpack --template @snowpack/app-template-minimal
```

Ở đây thì @snowpack/app-template-minimal là một template tạo ứng dụng Snowpack cho phép chúng ta thiết lập dự án Snowpack đơn giản và nhanh chóng

Sau đó chúng ta vào thư mục dự án vừa tạo và start nó lên thôi:
```
npm run start
```
và xem kết quả trên trình duyệt
# Cài đặt react
## Cài đặt package
Cài đặt React, thì chúng ta sử dụng lệnh sau:
```
npm install react react-dom --save
```
Khi làm việc với `react` thì khái niệm về `jsx` đã quá quen thuộc với chúng ta rồi. Snowpack đã tích hợp hỗ trợ jsx với các file có đuôi là `.jsx`. Chúng ta không cần phải cấu hình, hay cần phải cài thêm plugin nào để viết react component. Sau đó chúng ta vào thư mục dự án chỉnh sửa lại file `index.js` thành `index.jsx`

## Sử dụng react
Chúng ta sửa lại nội dung file `index.jsx` và `index.html` như sau:
```index.jsx
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<div>Hello World! You did it! Welcome to snowpack :D</div>, document.getElementById('root'));
```
```index.html
...
    <h1 id="root"></h1>
    <script type="module" src="/index.js"></script>
...
```

Có nhiều bạn sẽ thắc tại sao sau khi sửa `index.js` thành `index.jsx` nhưng ở file `index.html` 
```
    <script type="module" src="/index.js"></script>
```
vẫn giữ nguyên

Chúng ta sẽ không chỉnh sửa lại vì chúng sẽ được biên dịch sang js dưới dạng file `.js` trong bản build cuối cùng để cho trình duyệt đọc. 

Sau đó bạn quan sát kết quả trên trình duyệt

Ở trong bài viết trước thì mình có nói về [Sử dụng NPM dependencies
](https://viblo.asia/p/nhanh-nhu-chop-voi-snowpack-bWrZnVa9Zxw#_su-dung-npm-dependencies-10) trong snowpack. Thì khi chúng ta `npm run build` lên sẽ thấy xuất hiện trong thư mục build `_snowpack/pkg`. Ở trong thư mục này thì các package tương ứng sẽ được chuyển đổi sang các file `.js` tương ứng ở đây

## Custom cấu trúc thư mục
Khi làm việc với 1 dự án sẽ có rất nhiều file, để dễ quản lý, mở rộng và bảo trì dự án thì chúng ta cần phải có mội cấu trúc thư mục chuẩn hay bạn muốn tạo 1 dự án có cấu trúc mục theo cách của thì snowpack cũng hỗ trợ chúng ta trong việc custom đó

Trong dự án của mình, mình sẽ tạo 2 thư mục chính như sau:
- src: nơi sẽ chứa các react component và các assets của chúng
- public: sẽ để các file global như index.html, css, images, fonts, ...

Sau khi sửa lại sẽ như sau:
![](https://images.viblo.asia/b05d0d28-bfbb-4da0-8609-f929226ebdc7.png)

Khi sửa lại thì trang của chúng ta sẽ bị lỗi vì chúng ta đã sửa lại cấu trúc của nó. Để khắc phục vấn đề này chúng ta phải cấu hình `mount` để cập nhật lại trang web của chúng ta theo cấu trúc mới

Trong thư mục dự án chúng ta sẽ có file `snowpack.config.js`. Chúng ta sẽ thêm để chỉnh sửa cấu hình cho dự án của chúng ta:
```snowpack.config.js
...
mount: {
    public: '/',
    src: '/dist'
  },
...
```
So với cấu trúc thư mục ban đầu thì sau khi theo cấu trúc mới và chúng ta mount sẽ như hình sau:
![](https://images.viblo.asia/88eccda8-4d19-4543-8e68-1188ad541862.png)

`mount` sẽ cho phép chúng ta tùy chỉnh lại cấu trúc lại thư mục dự án. `Key (public, src)` là tên thư mục, `value ('/', '/dist')` là nơi chúng ta muốn sau khi thực hiện sau khi build. 

Nên chúng ta sẽ phải sửa lại đường dẫn của `script` trong file `index.html`:
```index.html
...
<script type="module" src="/dist/index.js"></script>
...
```
Và trang web của chúng ta sẽ hoạt động lại bình thường

## Fast fresh
`Fast fresh` là một tính năng nâng cao của Snowpack cho phép chúng ta đẩy các thay đổi của tệp riêng lẻ để cập nhật lại trên trình duyệt mà không cần làm mới trang hoặc xóa component state.

Khi làm các dự án React thì chúng ta sẽ thường xuyên làm việc với `state`. Trong quá trình phát triển dự án khi chúng ta chỉnh sửa code trong dự án sẽ làm cho state rẽ bị reset lại. Để khắc phục vấn đề này thì `react fast fresh` sẽ giúp chúng ta hiển thị những thay đổi mà không cần làm mới toàn bộ trang của chúng ta

Sau đây chúng ta sẽ cài đặt sử dụng fast fresh

Đầu tiên chúng ta thêm file `app.jsx` trong thư mục `src` và import nó vào `index.jsx`:
```app.js
import React, {useState, useEffect} from 'react';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);

  return (
    <div className="App">
        <p>
          Timer: <code>{count}</code>
        </p>
    </div>
  );
}

export default App;
```
```index.js
...
import App from './app';

ReactDOM.render(<App />, document.getElementById('root'));
```

Ở đây mình tạo một timer rồi hiển thị lên trang web. 

![](https://images.viblo.asia/c2e3cad0-ac38-47db-9b03-c6d3661d3951.gif)

Khi chúng ta chỉnh sửa code thì trang web sẽ làm mới và state sẽ bị reset như sau:

![](https://images.viblo.asia/152893a1-00ae-4fcc-8ff2-571921b5cea1.gif)

Bây giờ chúng ta sẽ bật `Hot Module Replacement(HMR)` lên. `HMR` sẽ cho chúng cập nhật lên trình duyệt mà không làm mới toàn bộ trang. 

Với React chúng ta sẽ bật nó lên như sau:
```index.jsx
...
ReactDOM.render(<App />, document.getElementById('root'));

if (import.meta.hot) {
    import.meta.hot.accept();
}
...
```
 Sau khi bật HMR lên thì thời gian, khi chúng ta thay đổi App.jsx, trang sẽ cập nhật để hiển thị các thay đổi của chúng ta mà không cần làm mới toàn bộ. Tốc đọ sẽ nhanh hơn hẳn, điều này sẽ giúp chúng ta tiết kiệm thời gian hơn. 
 
 Nhưng với demo trên của mình thì `state` vẫn sẽ bị reset về 0. 
 
 Chúng ta sẽ cần phải bật `Fast Refresh` nữa. Bằng cách chúng ta sẽ sử dụng plugin được snowpack cung cấp sẵn `@snowpack/plugin-react-refresh`:
 ```
 npm install @snowpack/plugin-react-refresh --save-dev
 ```
 
 Sau khi install xong các bạn thêm dòng sau vào file `snowpack.config.js`:
```
...
 plugins: ['@snowpack/plugin-react-refresh'],
...
```

Sau đó chúng ta sẽ chạy lại snowpack để sử dụng plugin và kiểm tra kết quả:

![](https://images.viblo.asia/b964e183-6623-4467-ac97-60d9e0b4870c.gif)

Như các bạn sẽ thấy `state` của chúng ta sẽ không bị reset lại nữa :D Sẽ rất thuận tiện trong các trường hợp mà chúng ta muốn debug

# Kết luận
Trong bài viết này thì mình đã giới thiệu với các bạn setup một project react đơn giản với snowpack. Trong bài viết tới mình sẽ giới thiệu một số điều thú vị với snowpack và so sánh nó với `webpack`. Cảm ơn các bạn đã theo dõi bài viết

- Tài liệu tham khảo:
    - snowpack.dev