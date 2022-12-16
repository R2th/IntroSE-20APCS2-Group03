Làm sạch và cấu trúc code HTML, đó là những gì chúng tôi là Nhà phát triển Front-end luôn hướng đến. Cũng với Pug, trước đây được gọi là "Jade", đây là một công cụ giàu tính năng và hiệu suất cao dễ dàng đạt được. Nói một cách đơn giản, Pug là một cú để viết html. Cũng giống như SASS, Pug là một bộ tiền xử lý và vì vậy nó giúp bạn hoàn thành các tác vụ như gói đi công việc lặp đi lặp lại bằng cách cung cấp các tính năng không có sẵn trong HTML thuần túy.
Vì vậy, hãy bắt đầu với nó!

![](https://images.viblo.asia/a10cc8bd-f6f3-4c9c-8cd3-c5316fe002cb.png)

Cũng giống như ngôn ngữ lập trình Python, Pug làm việc với thụt đầu dòng hoặc khoảng trắng, như ví dụ này:

```
doctype html  
html(lang='en')  
 head
   title Pug
 body
   h1 Pug Examples
   div.container
     p Cool Pug example!
```

Như bạn có thể thấy nó sạch hơn và dễ đọc hơn một tài liệu HTML thông thường, không có thẻ đóng, Pug đang xử lý việc này, mọi thứ được thụt vào và bạn quét tệp nhanh hơn nhiều. Cũng bằng cách sử dụng Pug, chúng tôi có thể đảm bảo rằng HTML của chúng tôi được tạo đúng và hợp lệ.

đoạn trên sẽ chuyển thành:


```
<!DOCTYPE html>  
<html lang="en">  
 <head>
   <title>Pug</title>
 </head>
 <body>
   <h1>Pug Examples</h1>
   <div class="container">
     <p>Cool Pug example!</p>
   </div>
 </body>
</html>
```

### Cài đặt pug như thế nào?

Giống như hầu hết các công cụ hiện nay, Pug là một gói nút có thể dễ dàng được cài đặt trên hệ thống của bạn bằng cách sử dụng lệnh npm sau đây:

```
$ npm install pug –g
```

Lưu ý: Bạn cần phải cài đặt NodeJS để chạy các lệnh npm.

Để viết pug bạn phải tạo 1 file có đuôi ".pug" 
vd tôi tạo 1 file có tên là index.pug với nội dung như sau:

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

Để biên dịch nó thành HTML, chúng ta cần mở terminal và điều hướng đến thư mục chứa file của chúng ta và chạy lệnh:

```
$ pug index.pug
```

Lệnh đơn giản này sẽ tạo tệp HTML tương ứng bên cạnh tệp Pug. 

### Cài đặt pug với gulp

Đây sẽ là một thiết lập miễn phí, nhanh chóng và dễ dàng để gói Pug với hệ thống xây dựng Gulp, các bước sau:

* Cài đặt Gulp
* Tạo cấu trúc thư mục cơ bản cho các mẫu pug
* Tạo một package.json sao cho nút đó biết cái gì cần cài đặt (pug & gulp-pug)
* Tạo nhiệm vụ gulp để biên dịch pug sang html

**Cài đặt Gulp:**  Có một lệnh NPM cho điều đó. Để cài đặt nó, tất cả những gì chúng ta cần làm là chạy:

```
npm install --save gulp-install
```

**Cấu trúc tập tin:**  Với Gulp được cài đặt, hãy thiết lập thư mục nơi dự án của chúng tôi sẽ được đặt, chỉ cần tạo một thư mục chứa bên trong một mẫu / thư mục cho tất cả các tệp pug và trong thư mục chính gốc thêm tệp package.json.

Tệp này sẽ bao gồm:
```
{
  "devDependencies": {
      "gulp": "^3.9.0",
      "gulp-pug": "^3.0.0:
  }
}
```
Bây giờ chạy npm cài đặt để nút thêm phụ thuộc gulp-pug cần thiết cho nó để biên dịch, vào thư mục node_modules của chúng tôi.
Tạo tệp gulpfile.js, nó có thể nằm trong thư mục gốc. Đây là nơi chúng ta sẽ gán lệnh mà gulp sẽ sử dụng để hiểu tệp pug của chúng ta trong thư mục templates và biên dịch nó thành một thư mục build mới.

Mở gulpfile.js và viết tác vụ sau:
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

Sau đó, với thiết lập gulpfile.js, tất cả những gì chúng ta cần làm là chạy lệnh gulp pug trong thư mục dự án gốc. Bạn sẽ thấy một thư mục có tên “build” xuất hiện.
Để hiểu rõ hơn về pug bạn có thể tham khảo thêm tại các đường dẫn dưới đây:

1. https://pugjs.org/api/getting-started.html
1. https://codeburst.io/getting-started-with-pug-template-engine-e49cfa291e33