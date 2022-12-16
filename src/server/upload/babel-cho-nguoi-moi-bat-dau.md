Trong bài viết này mình sẽ giới thiệu về `Babel` - một trình biên dịch Javascript cho phép developer sử dụng các syntax Javascript mới nhất. 

Khi làm việc cùng Javascript, đôi khi ta cảm thấy thật phiền toái khi áp dụng các cú pháp mới nhất thì code chạy được trên trình duyệt này, lại chết trên trình duyệt khác, hay cùng một trình duyệt nhưng version mới nhất thì ok, nhưng lại ngắc ngoải trên càng version thấp hơn vì chưa được support. Thật may mắn, thay vì phải lo lắng thay đổi code cho phù hợp cho từng trình duyệt, một công cụ được sinh ra để giải quyết vấn đề này được gọi là `transpilers` và nhiệm vụ của chúng ta đơn giản là viết code đẹp nhất có thể thôi. Transpiler là một công cụ nhận đầu vào là source code và đầu ra là source code mới với nhiệm vụ tương tự nhưng đã được modify cho phù hợp. 

Nhiệm vụ của babel đó là dịch từ những chuẩn Javascript mới nhất (ECMAScript - ES) cho các version browser cũ. Ngoài ra còn có cả một hệ sinh thái các plugin bổ sung thêm tính năng cho nó.

## Setup 
Có nhiều cách khác nhauddeer setup Babel, tùy thuộc vào project và tool mà bạn sử dụng. Trong bài viết này, chúng ta sẽ cùng xem làm thế nào để setup Babel sử dụng CLI.
Trước hết, ta cần cài đặt package sử dụng npm và thêm nó vào như một dependency:
```
mkdir babel-test
cd babel-test
npm init -y
npm install --save-dev babel-cli
```

Tiếp theo, mở `package.json` và thêm lệnh `build` vào:
```
"scripts": {
  "build": "babel src -d dist"
}
```

Nó sẽ lấy source file từ thư mục `src` và trả kết quả về trong thư mục `dist`. Trước khi chạy babel, ta cần install và setup plugin dùng để transform code đã. Cách đơn giản và nhanh nhất là thêm `Env preset` - nó sẽ chọn plugin thích hợp tùy thuộc vào trình duyệt bạn chỉ định. Install như sau:
```
npm install babel-preset-env --save-dev
```

Rồi tạo file `.babelrc` trong root folder và tênpreset:
```
{
  "presets": ["env"]
}
```
`.babelrc` là nơi thiết lập các setting của Babel cũng như setting các presset và plugins. Các option khác bạn có thể tham [tại đây](https://babeljs.io/docs/usage/api/#options) 

Cuối cùng, tạo thư mục input output cho babel 
```
mkdir src dist
```
và đoạn code sử dụng làm input (đoạn code sau swap value giữa 2 biến
```
// main.js
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a);
console.log(b);
```

## Chạy babel
Sau khi đã setup xog, ta có thể thực thi bằng lệnh `build` để bắt đầu quá trình biên dịch:
```
npm run build
```
Kết quả trong thư mục dist như sau:
```
"use strict";

var a = 1;
var b = 2;
var _ref = [b, a];
a = _ref[0];
b = _ref[1];

console.log(a);
console.log(b);
```
Ở đây, `let` đã được thay thế bằng `var` và Babel đã tạo ra một biến tạm để lưu 2 giá trị đã đổi chỗ. Đó là cách mà code bạn viết trong thư mục `src` sẽ được biên dịch ra các version cũ hơn. Bạn cũng có thể chỉ rõ version của trình duyệt như sau:
```
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
```
Ở đây babel sẽ hỗ trợ cho 2 version gần nhất của tất cả các trình duyệt, riêng safari thì support từ version 7 đổ lên.

## Hệ sinh thái Babel
Thực tế như ta đã làm bên trên, Babel sẽ không tự làm gì mà bạn phải install các plugin cần thiết để nó hoạt động như mong muốn hoặc ta có thể sử dụng `reset` , là các set plugin được định nghĩa trước (predefined set).
Thông thường, mỗi một feature được thêm vào sẽ tồn tại ở dạng plugin. Một số ví dụ mà ES2015 include:
* constants
* arrow functions
* block-scoped functions
* classes
* for-of
* spread
* template literals
Tuy nhiên đôi khi ta không muốn include từng plugin một, thay vào đó chỉ cần include `preset` và nó sẽ thực thi việc install hết các plugin cần thiết. Hiện tại có 3 preset chính thức là
* Env
* React
* Flow

`Env` là preset được sử dụng nhiều nhất. Nó load tất cả các transformation cần thiết để giúp code của bạn tương thích với các trình duyệt cũ
`React` preset transform code trong các dự án react, chủ yếu là làm tương thích hóa Flow annotation và JSX
`Flow` preset được sử dụng để dùng để transform code có sử dụng Flow annotations
# Kết luận
### Tài liệu tham khảo
1.[Sitepoint](https://www.sitepoint.com/babel-beginners-guide/)