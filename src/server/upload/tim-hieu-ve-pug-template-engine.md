### Giới thiệu
**Template Engines** là công cụ giúp chúng ta tách mã HTML thành các phần nhỏ hơn mà chúng ta có thể sử dụng lại trên nhiều tập tin HTML. 

**Pug** là một template engine hiệu suất cao, mạnh mẽ, dễ hiểu và giàu các tính năng. 
**Pug** giúp giảm thời gian phát triển bằng cách cung cấp các tính năng không có sẵn trong HTML thuần tuý giúp hoàn thành nhanh hơn các công việc lặp đi lặp lại. Khi bạn sử dụng **Pug**, nó sẽ trở thành một công cụ không thể thiếu cho bạn.

Để có thể hiểu rõ các khái niệm trong bài viết này, các bạn cần có kiến thức cơ bản về: `HTML, CSS, Javascript` và `Node.js`.

![](https://images.viblo.asia/30216f26-89ab-4364-8e7f-2aa08dffb321.png)

Giống như ngôn ngữ lập trình Python, Pug hoạt động dựa trên cơ chế thụt đầu dòng hoặc khoảng trắng như ví dụ sau:

```
doctype html  
html(lang='en')  
 head
   title Pug is awesome
 body
   h1 Pug Examples
   div.container
     p Cool Pug example!
```
Như bạn có thể thấy nó rõ ràng và dễ đọc hơn một tài liệu HTML thông thường, không có thẻ đóng/mở, Pug sẽ xử lý việc đóng/mở thẻ này, mọi thứ được thụt đầu dòng. Bằng cách sử dụng Pug, chúng ta đảm bảo rằng mã HTML được tạo đúng và hợp lệ.


Sau khi biên dịch chúng ta được đoạn mã HTML sau:
```
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

Trong khi biên dịch tập tin .pug thành tập tin HTML, trình biên dịch sẽ báo lỗi nếu bạn thụt đầu dòng không đúng cấu trúc.


Vậy làm sao để chúng ta có thể bắt đầu sử dụng Pug?

### Cài đặt Pug
Trước tiên, chúng ta cần phải cài đặt [NodeJS](https://nodejs.org/en/) để có thể chạy được các câu lệnh `npm` trên terminal.


Giống như hầu hết các công cụ ngày nay, Pug là một node package có thể cài đặt dễ dàng trên hệ thống của chúng ta sử dụng câu lệnh `npm` sau:
```
$ npm install pug –g
```
### Sử dụng Pug
Tập tin Pug có đuôi mở rộng là .pug, bạn không cần đóng/mở các thẻ vì Pug sử dụng cơ chế thụt đầu dòng.

Chúng ta sẽ tạo một tập tin có tên `index.pug` với nội dung sau:
```
html  
    head
        title This is my first Pug file
    body
        header
            p My soon to be menu
        section
            p This is a post about Pug template engine, enjoy it!
        footer
            cool footer with lots of copyrights
```

Để biên dịch tập tin này sang HTML chúng ta mở terminal và dẫn tới thư mục chứa tập tin Pug và chạy câu lệnh sau: 
```
$ pug index.pug
```
Câu lệnh trên sẽ tạo ra tập tin HTML tương ứng với tập tin Pug đã tạo.
### Variable trong Pug
Variable cho phép bạn lưu trữ các giá trị và sử dụng lại sau này. Điều này hữu ích cho các nội dung như tiêu đề trang.
```
- var pageTitle = "Pug is awesome"
- var pageCaption = "This page about Pug template"
```
Trong Pug, chúng ta sử dụng `- var` để định nghĩa variable và `=` để gán giá trị. Để sử dụng các variable đã định nghĩa, chúng ta dùng **interpolation** - cách để lấy giá trị của variable.
```
h1 #{pageTitle} 
p #{pageCaption}
```
### Văn bản trong Pug
Văn bản trong Pug có thể được viết theo ba cách sau:
+ Thụt lề văn bản với ký tự `|` phía trước
```
p  
  | My text inside the p tag
```
+ Đặt dấu chấm phía sau thẻ HTML và thụt lề văn bản (không có ký tự `|`)
```
p.  
  My text inside the p tag
```
+ Viết văn bản ngay sau thẻ HTML (cách này hay sử dụng nhất)
```
p My text inside the p tag
```
### Thuộc tính trong Pug
Thuộc tính của thẻ giống như trong HTML (dấu phẩy là tuỳ chọn), nhưng giá trị của chúng là Javascript.
Chúng ta cùng xem ví dụ sau:
```
a.link(href='about.html', target='_blank') About Us
```
sẽ tạo ra thẻ `<a>` với nội dung About Us, với các thuộc tính `href='about.html'` và `target='_blank'`

```
<a class="link" href="about.html" target="_blank">About Us</a>
```

Thật đơn giản phải không? Bên trong dấu ngoặc đơn bạn có thể thêm tất cả các thuộc tính bạn cần như class `.link`, ID, ... Ngoài ra, bạn có thể tạo ra các thẻ `<div>` với class và ID theo các cách sau:
```
.container
.container.left
div.container.left  
#container.left
div#container.left
```
Chúng ta sẽ được mã HTML sau:
```
<div class="container"></div>
<div class="container left"></div>
<div class="container left"> </div>
<div class="left" id="container"></div>
<div class="left" id="container"></div>
```
Vì chúng ta có thể thêm các thuộc tính cho thẻ HTML do đó chúng ta cùng thêm stylesheet và import tập tin javascript.
```
link(href='/css/styles.css', rel='stylesheet')
script(type='text/javascript').  
    var myVar = ‘Hello Var’;
    console.log(myVar);
script(src='/javascripts/app.js')
```
### Mixins trong Pug
Bây giờ chúng ta cùng tìm hiểu về `mixins` có thể nói là tính năng hữu ích nhất của Pug giúp tạo ra các khối có thể sử dụng lại. Để giúp Project của bạn cấu trúc rõ ràng, bạn nên đặt các `mixins ` trong một tập tin riêng và chỉ include chúng khi cần dùng.

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
### Conditionals trong Pug
Câu lệnh điều kiện cần thiết ở mọi nơi, ngay cả trong giao diện cần 1 số login đơn giản. Pug cho phép chúng ta các câu lệnh logic như if/else giúp chúng ta tiết kiệm thời gian viết code. 
```
- var language = "Pug"
if language == "Pug"  
    p Awesome
else  
    p Not awesome
```
Đoạn code trên sẽ hiển thị `<p>Awesome</p>`
### Inheritance trong Pug
Pug hỗ trợ template inheritance. Template inheritance hoạt động thông qua từ khoá `block` và `extends`.
Giống như mixins, Pug cung cấp cho chúng ta một tính năng tương tự đó là **Blocks**. Một blocks được hiểu là một đoạn code được định nghĩa và các tập tin khác có thể ghi đè (thay thế). 
```
//- layout.pug
html
  head
    title My Site - #{title}
    block scripts
      script(src='/jquery.js')
  body
    block content
    block foot
      #footer
        p some footer content
```

Để extend tập tin `layout.pug`, chúng ta tạo một tập tin mới và sử dụng từ khoá `extends` với đường dẫn đến tập tin `.pug` cha. Sau đó, định nghĩa một hoặc nhiều `blocks` để ghi đè nội dung `blocks` trong tập tin cha. Nếu `blocks` nào không được định nghĩa lại nó sẽ sử dụng `blocks` trong tập tin cha. 
```
//- page-a.pug
extends layout.pug

block scripts
  script(src='/jquery.js')
  script(src='/pets.js')

block content
  h1= title
  - var pets = ['cat', 'dog']
  each petName in pets
    include pet.pug
```
### Pug kết hợp với Gulp
Trên đây chúng ta đã cùng nhau tìm hiểu về 1 số tính năng cơ bản của Pug template engines. Bây giờ bạn có thể sử dụng Pug trong dự án của mình để cấu trúc giao diện tốt hơn, mã tổ chức tốt hơn... Tuy nhiên, chúng ta sẽ không muốn phải biên dịch bằng tay mỗi khi viết Pug, chúng ta muốn quá trình này diễn ra tự động. 

Dưới đây là thiết lập nhanh để có thể kết hợp Pug với Gulp tool với các bước:
+ Cài đặt Gulp

Để cài đặt Gulp chúng ta mở terminal và nhập câu lệnh sau:
```
npm install --save gulp-install
```
+ Tạo cấu trúc thư mục pug

Trong thư mục gốc của Project tạo thư mục `templates` để chứa tất cả các tập tin `pug`
+ Tạo tập tin package.json để node biết cần cài đặt gì (pug và gulp-pug)

Trong thư mục gốc của Project tạo tập tin `package.json` với nội dung sau:
```
{
  "devDependencies": {
      "gulp": "^3.9.0",
      "gulp-pug": "^3.0.0:
  }
}
```
Trên terminal chạy lệnh `npm` để node cài đặt các dependency cần thiết để biên dịch Pug vào thư mục `node_modules`.
+ Tạo gulp task biên dịch Pug sang HTML

Trong thư mục gốc của Project tạo tập tin `gulpfile.js`. Đây là nơi chúng ta tạo ra gulp task giúp gulp hiểu được tập tin .pug trong thư mục `templates` và biên dịch nó vào thư mục `build`.

Mở tập tin `gulpfile.js` và nhập nội dung sau:
```
var gulp = require('gulp'),  
  pug = require('gulp-pug');

// run this task by typing in gulp pug in CLI
gulp.task('pug', function() {  
  return gulp.src(templates/*.pug')
      .pipe(pug()) // pipe to pug plugin
      .pipe(gulp.dest('build)); // tell gulp our output folder
});
```

Sau khi thiết lập `gulpfile.js` chúng ta chạy câu lệnh sau trong thư mục gốc của Project và tận hưởng kết quả. Chúng ta sẽ thấy thư mục `build` xuất hiện chứa các tập tin HTML đã được biên dịch. 

### Kết luận
Như các bạn có thể thấy sử dụng Pug template engines thay vì HTML chuẩn là cách tuyệt vời để tổ chức code giúp cấu trúc code dễ dàng, dễ hiểu, tăng tốc độ debug, rút ngắn thời gian phát triển thông qua sử dụng mixins, ít xảy lỗi hơn và tách biệt giữa login và markup. Vậy chúng ta còn chần chừ gì nữa mà không sử dụng Pug ngay bây giờ.
Bạn có thế tìm hiểu thêm về Pug mà tôi không đề cập trong bài viết này tại trang web [document](https://pugjs.org/api/getting-started.html) của Pug.

### Tài nguyên hữu ích
+ Document Pug: https://pugjs.org/api/getting-started.html
+ Pug boilerplate: https://github.com/mimoduo/mimogear/tree/master/src/pug
+ Pug Cheat Sheet: https://codepen.io/mimoduo/post/pug-js-cheat-sheet
+ HTML to Pug: https://html-to-pug.com/
+ Pug to HTML: https://pughtml.com/
+ NPM Gulp package: https://www.npmjs.com/package/gulp-pug 
+ NPM Pug package: https://www.npmjs.com/package/pug 
+ Github Source: https://github.com/pugjs/pug