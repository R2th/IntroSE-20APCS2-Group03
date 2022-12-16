![](https://images.viblo.asia/5e8bfaec-1659-4f3e-8ffa-7855e483c292.jpg)

**1. Giới thiệu:**

**Gulp** là một công cụ giúp bạn tự động hóa nhiều task (nhiệm vụ) trong quá trình phát triển web. Nó thường được sử dụng để làm các tác vụ front end như:

* Tạo ra một web server
* Reload trình duyệt một cách tự động bất cứ khi nào một file được lưu
* Sử dụng các preprocessor giống như Sass hoặc LESS
* Tối ưu hóa các tài nguyên như CSS, JavaScript và hình ảnh

**Gulp** sử dụng nguyên tắc **convention over configuration** hay **code over configuration** trong quá trình setup dự án. Với nguyên tắc này thì những vấn đề cụ thể trong lập trình như tổ chức cấu trúc thư mục như thế nào, đặt các tập tin css hay javascript ở đâu... được chuẩn hoá trước khi bất cứ một tập tin, thư mục nào được tạo ra hay đoạn code nào được viết ra. Điều này giúp giảm số lượng các quyết định mà lập trình viên phải đưa ra và giúp cho việc maintain dự án trở nên dễ dàng. Dưới đây là một ví dụ về cách tổ chức một thư mục dự án đặc trưng để có thể sử dụng **Gulp.js** một cách dễ dàng:

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

**Cái chúng ta sẽ làm:**

Khi kết thúc bài viết này, bạn sẽ có một workflow thực hiện các task sau:

* Tạo ra một web server.
* Biên dịch Sass thành CSS.
* Refesh trình duyệt tự động bất cứ khi nào bạn lưu một file.
* Tối ưu hóa các tài nguyên (CSS, JS, fonts, và hình ảnh) cho phiên bản production.

**2. Cài đặt**

Trước tiên bạn cần cài đặt Node JS theo hướng dẫn: https://nodejs.org/en/

Bước tiếp theo chúng ta cần cài đặt Gulp Global (Chúng ta chỉ cần cài một lần trên máy tính của mình):

```
$ sudo npm install gulp -g
```

**Chú ý:** chỉ những người sử dụng Mac mới cần sử dụng từ khóa **sudo**

**npm install** là lệnh sử dụng Node Package Manager  (npm) để cài đặt Gulp trên máy tính của bạn.

Ở trên chúng ta sử dụng option -g (viết tắt của globally) để thực hiện việc cài đặt toàn cục Gulp trên máy tính. Sau khi cài đặt xong bạn có thể kiểm tra lại bằng việc chạy câu lệnh:

```
$ gulp --v
```

Cửa sổ dòng lệnh sẽ hiển thị thông tin về phiên bản hiện tại của Gulp cho bạn.

**3. Sử dụng Gulp**

Việc sử dụng Gulp khá đơn giản, để bắt đầu ta tạo file gulpfile.js lưu trong thư mục gốc của dự án, các task sẽ được định nghĩa trong file này.

```
var gulp = require('gulp');
 
gulp.task('default', function(){
   // Default task code
});
```

Để chạy file gulpfile.js chúng ta dùng lệnh:

```
gulp
```

Mặc định khi chạy gulp command không có tham số, Gulp sẽ ngầm thực thi task default, nếu muốn chạy với một task nào đó, chúng ta dùng cú pháp:

```
gulp {task_name}
```

Như ví dụ bên trên bạn có thể thấy, để định nghĩa một task ta có thể sử dụng **gulp.task()**

Yêu cầu viết task minify với mục đích minify các file Javascript. Chúng ta cần cài đặt gulp-uglify plugin:

```
npm install --save-dev gulp-uglify
```

Cập nhật file gulpfile.js:

```
var gulp = require('gulp'),
  uglify = require('gulp-uglify');

gulp.task('minify', function () {
    gulp.src('js/*.js')
       .pipe(uglify())
       .pipe(gulp.dest('build'))
});
```

Sau đó chúng ta dùng lệnh:

```
gulp minify
```

Và kiểm tra trong thư mục build, các file javascript đã được minify. Rất đơn giản phải không các bạn?

Bạn có để ý đến function gulp.src()?, ở đây sẽ định nghĩa điều kiện lọc các files cho một task, chúng ta có thể xem các quy tắc dưới đây:

* js/app.js tìm chính xác file.
* js/*.js tìm kiếm tất các file kết thúc bằng `.js và nằm trong thư mục js.
* js/**/*.js tìm kiếm tất cả các file kết thúc bằng .js ở trong thư mục js/ và tất cả thư mục con của nó.
* !js/app.js tìm kiếm tất cả các file trong thư mục ngoại trừ file app.js
* *.+(js|css) tìm kiếm tất cả các file trong thư mục root có đuôi là .js và .css.

Rất dễ hiểu, cũng có thể kết hợp nhiều điều kiện bằng cách đưa vào mảng:

```
gulp.src(['js/*.js', '!js/**/*.min.js'])
```

**4. Sử dụng để dịch SASS**

Để dịch SASS ta sử dụng thêm 1 package nữa là **gulp-sass** và cài đặt như sau:

```
npm i --save-dev gulp-sass
```

Sau đó ta sẽ tạo thêm 1 task nữa ở Gulpfile.js như sau:

```
var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('sass', function () {
    return gulp.src('path/style.scss')
        .pipe(sass())
        .pipe(gulp.dest(''));
});
```

Sau đó chạy lệnh **gulp sass** để biên dịch từ file **scss** sang file **css**.

Ở đây có 1 điều chúng ta cần quan tâm nữa đó là **gulp.src()**, trong đó sẽ lọc các file làm đầu vào với các quy tắc lọc như sau:

* css/app.css tìm chính xác file
* sass/.scss* tìm kiếm tất các file kết thúc bằng .scss và nằm trong thư mục sass
* sass//.scss* tìm kiếm tất cả các file kết thúc bằng .scss ở trong thư mục sass/ và tất cả thư mục con của nó
* !sass/app.scss tìm kiếm tất cả các file trong thư mục ngoại trừ file app.scss
* *.+(scss|css) tìm kiếm tất cả các file trong thư mục root có đuôi là .scss và .css

**5. Watching files**

Một trong những đặc tính nổi bât là Gulp có khả năng theo dõi kiểm soát sự thay đổi của các file trong dự án, và có thể chạy các task được quy định khi có sự thay đổi ở các file này, đồng thơi tự động reload lại trình duyệt mà không cần làm bất kỳ thao tác gì.

```
gulp.task('watch', function () {
    gulp.watch('js/*.js', ['minify']);
});
```

Như ví dụ bên trên, khi có sự thay đổi ở các file javascript trong thư mục js, Gulp sẽ tự động chạy task minify.

Để Gulp có thể tự động reload lại trình duyệt khi có sự thay đổi chúng ta cần cài đặt module BrowserSync

```
npm install browser-sync --save-dev
```

Để sử dụng BowerSync thực hiện khai báo trong gulpfile.js

```
var browserSync = require('browser-sync');
```

Ví dụ:

```
var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('browser-sync', function () {
    var files = [
        '*.html',
        'js/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: '.'
        }
    });
});
```

Chạy **gulp browser-sync** để khởi tạo một server mới trong thư mục hiện hành và kiểm soát tất cả sự thay đổi của file html và js trong thư mục js.

Sau khi khởi động server cần sử dụng watch để theo dõi sự thay đổi và thực hiện reload lại trình duyệt:

```
gulp.watch(['*.html'], reload);
gulp.watch(['js/*.js'], reload);
```

Chúng ta có file gulpfile.js hoàn chỉnh như sau:

```
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;
 
gulp.task('default', [], function () {
    console.log("Command:\n   serve - run live reload server");
});
 
gulp.task('serve', [], function () {
    browserSync({
        notify: false,
        server: {
            baseDir: '.'
        }
    });
 
    gulp.watch(['*.html'], reload);
    gulp.watch(['js/*.js'], reload);
});
```

Chạy lệnh:

```
gulp serve
```

Trình duyệt sẽ tự bật lên với địa chỉ http://localhost:3000

Bây giờ hãy thử sửa một trong các file html hoặc js, bạn sẽ thấy trình duyệt đang mở sẽ tự động refresh và cập nhật những thay đổi.

**6. BTW**

Tiện đây mình cũng kể thêm 1 số package khác mình hay dùng với **Gulp** để xử lý các thao tác hiệu quả hơn, có thể đây không phải là các plugins hay nhất, tốt nhất nên bạn nào biết plugin nào hay hơn thì đưa lên cho mọi người tham khảo nữa nhé :D

* **gulp-rename:** Để viết lại tên của file source.
* **gulp-cssnano:** Để minify css.
* **gulp-concat:** Để nối nội dung các file.
* **gulp-less:** Để biên dịch less sang css.
* **gulp-uglify:** Minify javascript với UglifyJS2.

Đây là 1 ví dụ khá hoàn chỉnh 1 file Gulpfile.js mình hay dùng:

```
// Include gulp
var gulp = require('gulp');
// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var minifyCss = require('gulp-cssnano');
// Compile Our Sass
gulp.task('sass', function () {
    return gulp.src('assets/sass/style.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('assets/css'))
        .pipe(livereload());
});
// Watch Files For Changes
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['assets/sass/**/*'], ['sass']);
});
// Default Task
gulp.task('default', ['sass', 'watch']);
```

Sau đó chạy lệnh gulp là xong! Mọi việc cứ để Gulp lo :D

**7. Kết luận**

Như vậy chúng ta thấy được Gulp tiện lợi, giúp tăng năng xuất cho lập trình viên. Với các web application sử dụng nhiều JS và CSS như Angular JS hay React JS thì Gulp càng bộc lộ được thế mạnh của mình.

**8. Tham khảo**

https://github.com/gulpjs/gulp

https://github.com/gulpjs/gulp/tree/master/docs

https://labs.septeni-technology.jp/none/gulp-la-gi/

https://css-tricks.com/gulp-for-beginners/