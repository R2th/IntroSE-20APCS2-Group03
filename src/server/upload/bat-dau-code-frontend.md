* HTML có những engine như CSS giúp cho việc code trở nên nhanh chóng, tiện lợi tiết kiệm nhiều thời gian cho lập trình viên và 1 trong số đó chính là PUG
* SASS SCSS hay LESS giúp cho việc code CSS được nhanh hơn, sử dụng được nhiều chức năng; dùng biến, mixins, functions (hàm)….có thể tái sử dụng code một cách hợp lý giúp cho việc code trở nên linh hoạt, nhanh lẹ tiết kiệm thời gian…
# Cài đặt Pug kết hợp với Gulp
* Template Engines là công cụ giúp chúng ta tách mã HTML thành các phần nhỏ hơn mà chúng ta có thể sử dụng lại trên nhiều tập tin HTML.
* Pug là một template engine hiệu suất cao, mạnh mẽ, dễ hiểu và giàu các tính năng. Pug giúp giảm thời gian phát triển bằng cách cung cấp các tính năng không có sẵn trong HTML thuần tuý giúp hoàn thành nhanh hơn các công việc lặp đi lặp lại
## Cài đặt Pug
Trước tiên, chúng ta cần phải cài đặt NodeJS để có thể chạy được các câu lệnh npm trên terminal.
Pug là một node package có thể cài đặt dễ dàng trên hệ thống của chúng ta sử dụng câu lệnh npm sau:
```js
$ npm install pug –g
```
## Cài đặt Gulp
Để cài đặt Gulp chúng ta mở terminal và nhập câu lệnh sau:
```js
npm install --save gulp-install
```
## Tạo cấu trúc thư mục pug
Trong thư mục gốc của Project tạo thư mục templates để chứa tất cả các tập tin pug.
Dưới đây là một ví dụ về cách tổ chức một thư mục dự án sử dụng `Gulp.js` một cách dễ dàng:
```
|- app/
      |- css/
      |- fonts/
      |- images/ 
      |- index.html
      |- js/ 
      |- scss/
  |- dist/
  |- gulpfile.js
  |- node_modules/
  |- package.json
```
Tạo tập tin `package.json` để node biết cần cài đặt gì (`pug và gulp-pug`)
Trong thư mục gốc của Project tạo tập tin `package.json` với nội dung sau:
```json
{
  "devDependencies": {
      "gulp": "^3.9.0",
      "gulp-pug": "^3.0.0:
  }
}
```
Trên terminal chạy lệnh npm để node cài đặt các dependency cần thiết để biên dịch Pug vào thư mục `node_modules`.
## Tạo gulp task biên dịch Pug sang HTML
Trong thư mục gốc của Project tạo tập tin `gulpfile.js`. Đây là nơi chúng ta tạo ra gulp task giúp gulp hiểu được tập tin `.pug` trong thư mục templates và biên dịch nó vào thư mục build.
Mở tập tin `gulpfile.js` và nhập nội dung sau:
```js
var gulp = require('gulp'),  
  pug = require('gulp-pug');

// run this task by typing in gulp pug in CLI
gulp.task('pug', function() {  
  return gulp.src(templates/*.pug')
      .pipe(pug()) // pipe to pug plugin
      .pipe(gulp.dest('build)); // tell gulp our output folder
});
```
Sau khi thiết lập `gulpfile.js` chúng ta chạy câu lệnh sau trong thư mục gốc của Project và tận hưởng kết quả. Chúng ta sẽ thấy thư mục build xuất hiện chứa các tập tin HTML đã được biên dịch.
# Sử dụng Pug engine để code HTML 
  Pug hoạt động dựa trên cơ chế thụt đầu dòng hoặc khoảng trắng như ví dụ sau:

```html
doctype html  
html(lang='en')  
 head
   title Pug is awesome
 body
   h1 Pug Examples
   div.container
     p Cool Pug example!
```
Như bạn có thể thấy nó rõ ràng và dễ đọc hơn một tài liệu HTML thông thường, không có thẻ đóng/mở, Pug sẽ xử lý việc đóng/mở thẻ này, mọi thứ được thụt đầu dòng.
Sau khi biên dịch chúng ta được đoạn mã HTML sau:
```html
<!DOCTYPE html>  
<html lang="en">  
 <head>
   <title>Pug is awesome</title>
 </head>
 <body>
   <h1>Pug Examples</h1>
   <div class="container">
     <p>Cool Pug example!</p>
   </div>
 </body>
</html>
```
Tập tin Pug có đuôi mở rộng là .pug, bạn không cần đóng/mở các thẻ vì Pug sử dụng cơ chế thụt đầu dòng.
## Variable trong Pug
Variable cho phép bạn lưu trữ các giá trị và sử dụng lại sau này. Điều này hữu ích cho các nội dung như tiêu đề trang.
```
- var pageTitle = "Pug is awesome"
- var pageCaption = "This page about Pug template"
```
Trong Pug, chúng ta sử dụng - var để định nghĩa variable và = để gán giá trị. Để sử dụng các variable đã định nghĩa, chúng ta dùng interpolation - cách để lấy giá trị của variable.
```
h1 #{pageTitle} 
p #{pageCaption}
```

## Văn bản trong Pug
Văn bản trong Pug có thể được viết theo ba cách sau:

Thụt lề văn bản với ký tự | phía trước
```
p  
  | My text inside the p tag
```
Đặt dấu chấm phía sau thẻ HTML và thụt lề văn bản (không có ký tự |)
```
p.  
  My text inside the p tag
```
Viết văn bản ngay sau thẻ HTML (cách này hay sử dụng nhất)
```
p My text inside the p tag
```

Thuộc tính của thẻ giống như trong HTML (dấu phẩy là tuỳ chọn), nhưng giá trị của chúng là Javascript. Chúng ta cùng xem ví dụ sau:
```
a.link(href='about.html', target='_blank') About Us
```
sẽ tạo ra thẻ <a> với nội dung About Us, với các thuộc tính `href='about.html'` và `target='_blank'`
```html
<a class="link" href="about.html" target="_blank">About Us</a>
```
Thật đơn giản phải không? Bên trong dấu ngoặc đơn bạn có thể thêm tất cả các thuộc tính bạn cần như class .link, ID, ... Ngoài ra, bạn có thể tạo ra các thẻ <div> với class và ID theo các cách sau:
```
.container
.container.left
div.container.left  
#container.left
div#container.left
```
Chúng ta sẽ được mã HTML sau:
```html
<div class="container"></div>
<div class="container left"></div>
<div class="container left"> </div>
<div class="left" id="container"></div>
<div class="left" id="container"></div>
```
## Mixins trong Pug
Mixins có thể nói là tính năng hữu ích nhất của Pug.<br>
Bình thường khi code template chắc chắn sẽ gặp nhiều trường hợp dùng đi dùng lại cấu trúc tiêu đề giống nhau hoặc là hình ảnh, đường dẫn(link) hay là một block nhỏ nào đó.<br>
Mixins nó cho phép ta tạo một block trong PUG và sử dụng lại nhiều lần<br>
Cú pháp cơ bản để tạo mixins trong Pug như sau:
```
//- Declaration (invoice-mixin.pug)
mixin invoice  
 .invoice-wrapper
   h2 Invoice
     ul
       li number
       li email
```
Sau khi định nghĩa, khi cần dùng chúng ta gọi chúng như sau:
```
section  
  +invoice <--- Just like this!
  p This is a post about pug template engine, enjoy it!    
```
Sau khi biên dịch chúng ta được đoạn mã HTML sau:                       
```html
<section>
    <div class="invoice-wrapper">
        <h2>Invoice<ul>
                <li>number</li>
                <li>email</li>
            </ul>
        </h2>
    </div>
    <p>This is a post about pug template engine, enjoy it!</p>
</section>         
```