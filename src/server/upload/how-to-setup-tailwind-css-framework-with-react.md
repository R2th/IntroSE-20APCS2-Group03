Bài viết được dịch từ nguồn: https://hackernoon.com/how-to-setup-tailwind-css-framework-with-react-f61p3u91

![](https://images.viblo.asia/53f175af-2989-4ec5-b142-32f7a62e7f70.jpeg)

`Tailwindcss` cung cấp một spin hiện đại về viết css. Và không giống như bootstrap, nó cho phép chúng ta viết css mà không cần các `class` xác định trước. Chúng ta có thể tạo các kiểu tùy chỉnh của riêng mình mà không cần `options` bên ngoài về cách mọi thứ sẽ trông như thế nào.

Việc `setting Tailwindcss` khá đơn giản, nhưng với `React`, nó có vẻ hơi khó xử. Dưới đây, một hướng dẫn nhanh để giúp bạn bắt đầu tạo các kiểu nội tuyến tuyệt vời dựa trên lớp bằng cách sử dụng tailwindcss.

1. Tạo 1 react app:

 ```
 npx create-react-app tailwind-app &amp;&amp; cd tailwind-app
 ```
 
 2. Tôi thích viết css của mình trong SASS vì vậy hãy để cài đặt SCSS. Chạy lệnh sau để cài đặt gói SASS.

```
npm install node-sass
```

Cài đặt tất cả các gói chúng ta cần; tailwindcss, postcss-cli (giúp trích xuất các lớp tiện ích tailwind vào các tệp css) và autoprefixer (giúp đảm bảo rằng CSS viết được hỗ trợ trong tất cả các trình duyệt). Hãy cài dạng `development dependencies` bằng cách sử dụng cờ -D.

```
npm i tailwindcss postcss-cli autoprefixer -D
```

4. Chạy lệnh sau để tạo tệp cấu hình tailwind. Tập tin này chứa tất cả các lớp tailwind.

 ```
npx tailwind init --full
```

5. Bạn sẽ nhình thấy file `tailwind.config.js` trong thư mục gốc.

6. Bây giờ, cần thiết lập cấu hình Postcss để giúp xây dựng các tệp css của mình. Đầu tiên, hãy tạo tập tin cấu hình.

```
touch postcss.config.js
```

7. Tiếp theo, sao chép và copy đoạn code sau vào tệp postcss.config.js. Đoạn code này cho postcss sử dụng các plugin tailwindcss và autoprefixer khi tạo ra tệp css / scss.

```
module.exports = {
 plugins: [require("tailwindcss"), require("autoprefixer")]
};
```

8. Tiếp theo, hãy tạo một thư mục `styles`. Giữ thư mục `styles` trong thư mục src. Trong thư mục `src/styles`, tạo tệp `tailwind.scss` và cũng di chuyển tệp `index.css` vào đây. Đổi tên `index.css` thành `index.scss`
Hãy chắc chắn cập nhật tham chiếu tới index.css trong tệp `index.js` thành `./styles/index.scss`

Khi dùng đuôi.scss. Cần phải tiêm các lớp tiện ích tailwind vào tệp. Thêm đoạn code sau đây. Chúng chỉ định các lớp tiện ích tailwind mong muốn trong tệp tailwind.scss. Từ đây, postcss sẽ trích xuất các `class` từ các khai báo và đẩy chúng vào tệp index.css.

```
@tailwind base;
@tailwind components
@tailwind utilities
```

9. Cuối cùng, trong file `package.json`. Cần thực hiện một số thay đổi đối với các tập lệnh ở đây để đảm bảo rằng Postcss gói tất cả css từ `tailwind.scss` vào tệp `index.scss`. Đầu tiên, tạo một tập lệnh build: css. Sử dụng lệnh postcss (được cung cấp bởi các bài viết-cli) để trích xuất các lớp `tailwind` từ `tailwind.scss` và xuất nó thành `index.scss`

```
"scripts": {
   "start": "npm run build:css && react-scripts start",
   "build": "npm run build:css && react-scripts build",
  "test": "react-scripts test",
   "eject": "react-scripts eject",
  "build:css": "postcss src/styles/tailwind.scss -o src/styles/index.scss "
}
```

File `package.json` sẽ trông tương tự như phía trên

Đơn giản chỉ cần chạy `npm start`, giống như thường làm và ứng dụng sẽ bắt đầu chạy. Tệp `index.scss` hiện chứa tất cả các lớp `css tailwind` cung cấp.

Tất cả các lớp `tailwind` hiện có sẵn để sử dụng. Tham khảo tài liệu để xem tên lớp nhưng nói chung, sẽ có rất nhiều tên lớp nếu sử dụng bootstrap.

Nếu muốn thêm các kiểu CSS bổ sung, có thể thêm chúng vào trong tệp `tailwind.scss`.

```
@tailwind base;
@tailwind components
@tailwind utilities

$my-color: green;

.my-color: {
  background-color: $my-color;
}
```

Mỗi khi bạn có thay đổi trong file `tailwind.scss`, bạn cần stop server và chạy lại lệnh `npm start`.

Cảm ơn và hy vọng bài viết có ích trong công việc của bạn