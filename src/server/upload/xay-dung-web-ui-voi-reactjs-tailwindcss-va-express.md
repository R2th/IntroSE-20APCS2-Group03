Xin chào tất cả mọi người 👋👋👋

Ngày nay với sự phát triển vượt bậc của IT, bên cách sự phát triển nhanh chóng của backend (BE) như nodejs, spring boot, .net, laravel, golang,... thì  với hàng loạt các framework frontend (FE) cũng xuất hiện càng nhiều như ReactJs, VueJs, Angular, Tailwindcss,...

Để xây dựng ứng dụng thõa mãn tiêu chí người dùng như nhanh chóng, hiệu suất cao, UI đẹp, các app ngày nay càng chú trọng hơn trong việc phát triển frontend hơn. Vì thế, mình xin gửi đến các bạn cách thức để tạo nên một cấu trúc dự án với với ReactJS, Tailwindcss và ExpressJS.

# I. Các thư viện sử dựng:
1.  [ReactJS](https://reactjs.org/)
2.  [Tailwindcss](https://tailwindcss.com/docs/installation)
3.  [ExpressJS](https://expressjs.com/en/starter/installing.html)
4.  PM2

# II. Các bước tiến hành:
## 1. Cài đặt ReactJS and Taidwind
1.1. Cài đặt reactjs app mới:
```
$npx create-react-app modern_app
```
1.2. Chạy app:
```
$cd modern_app
$npm start
```
App chạy như sau:

![image.png](https://images.viblo.asia/9a1d5fec-8bb0-4918-aa4b-492e326f0b9c.png)

Vậy là app đã chạy được ở trình duyệt: http://localhost:3000

![image.png](https://images.viblo.asia/72d2be5f-15f6-412f-9638-e88327865ed5.png)

OK, bây giờ tắt app ReactJS đi và cài tailwindcss vào:
```
$npm install -D tailwindcss postcss autoprefixer
$npx tailwindcss init -p
```

Thêm `['./src/**/*.{js,jsx,ts,tsx}']` vào tailwind.config.js - content:

```js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Thêm code vào src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Thay đổi nội dung trong App.js
```js
function App() {
  return (
    <>
      <h1 className='text-center font-bold mt-10 text-green-700'>
        Hello everybody! I'm React & TailwindCSS component
      </h1>
    </>
  );
}

export default App;


```

Start app lại xem nào: `$npm run start` và sau đó truy cập vào: http://localhost:3000

![image.png](https://images.viblo.asia/c46b2fc7-d155-4728-a3b5-f051f1564e15.png)

OK, vậy là bước cài đặt đã xong, các bạn muốn tìm hiểu về cách code tailwindcss như thế nào, có thể đọc doc thêm tại: https://tailwindcss.com/docs/utility-first, thời điểm hiện tại có nav-bar bên trái rất dễ cho mọi người tra cứu. 🫶

## 2. Build app với pm2
OK, vây giờ chúng ta tắt chế độ develope đi và build hệ thống,
```
$npm run build
```

Cài express vào: `npm install express` và code phần backend:
```js
//backend.js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000, () => {
  console.log('App listening on http://localhost:3000');
});

```

Cài gói pm2:
```
sudo npm install pm2@latest -g
```

Khởi động pm2:
```
pm2 start backend.js
```

![image.png](https://images.viblo.asia/e8d02085-2902-4722-a816-ed34bc2dabd7.png)

Xem lại trình duyệt
http://localhost:3000

![image.png](https://images.viblo.asia/8432ccad-3df2-499f-bafe-64f09e1bfd8f.png)

Để re-build lại web, chúng ta sử dụng tổng hợp lệnh sau, các bạn có thể tạo cron job nếu được triển khai ở phía máy chủ.
```
$npm run build && pm2 restart backend.js
```

OK, vậy là phần thiết lập app cho ReactJS, TailwindCss, Express và pm2 đã hoàn tất. 
Chúc các bạn thành công nhé.