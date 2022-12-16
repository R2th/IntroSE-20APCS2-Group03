Chợt nhớ ra hôm nay mình có hẹn, vậy nên hôm nay mình sẽ giới thiệu đến bạn đọc bài viết về 1 công cụ khá bá đạo trong giới JS học đó là Gulp JS. Nào mình cũng tìm hiểu về Gulp nhé :))
# 1. Gulp là gì?
Gulp  là một công cụ giúp bạn tự động hóa nhiều task (nhiệm vụ) trong quá trình phát triển web. Đối với Gulp, mình hay sử dụng nhất là minify CSS và tự động compile lại file (js, css) khi có thay đổi, ngoài ra Gulp còn có rất nhiều tác dụng khác như compile SASS/LESS, unit testing, nén ảnh...

Chắc cũng dễ hiểu thôi nhỉ? vậy mình cùng tìm hiểu cách sử dụng em nó nhé :D
# 2. Các thành phần chính của Gulp
Để chạy được gulp cần một file gulpfile.js trong đó có chứa các thành phần chính là: `gulp.task`, `gulp.src`, `gulp.dest`, `gulp.watch`
## 2.1. gulp.task
Gulp.task đơn giản là các task mà các bạn muốn thực thi, nó có ý nghĩa như 1 function vậy.
```
gulp.task('task_one', function(){
    // nhiệm vụ
})
```

Bạn cũng có thể bỏ qua task bất kì nếu bạn chỉ muốn chạy một vài các task cần thiết:
```
gulp.task ('build', ['array', 'of', 'task', 'names']);
```

**Lưu ý:** 
1. Các task sẽ chạy song song (tất cả cùng một lúc) chứ không phải các task sẽ chạy theo thứ tự nhé.
2. Mặc định khi chạy lệnh gulp trong command line không kèm theo tham số nào, gulp sẽ tự động chạy task mặc định là default. Khi muốn chạy một task cụ thể nào đó, bạn chỉ cần dùng lệnh: 
```
gulp task_name
```
## 2.2. gulp.src
Trong gulp.task bạn sẽ cần trỏ src file mà bạn muốn minify chẳng hạn, gulp.src sẽ giúp bạn làm việc đó, tức là file bạn cần đọc hay nói cách khác khi bạn muốn làm gì thì cần biết đường dẫn tới folder hay file.
```
gulp.task('task_one', function(){
    gulp.src('['./css/*.css']) //lấy tất cả các file có đuôi .css trong folder css
    // or
    gulp.src('./js/*.js') //lấy tất cả các file có đuôi .js trong folder js
    // or
    gulp.src('['!./css/*.css']) //không lấy folder css cùng các file bên trong
})
```
## 2.3. gulp.dest
Tương tự gulp.src bạn cũng cần chỉ ra đường dẫn đích mà bạn muốn gulp trả về file sau khi đã thực hiện gulp.task.
```
gulp.task('task_one', function() {
  gulp.src('./js/*.js')
    .pipe(gulp.dest('dist/js'));

  gulp.src('./css/*.css')
    .pipe(gulp.dest('dist/css'));
});
```
## 2.4. gulp.watch
gulp.watch sẽ tự động lắng nghe file nếu có sự thay đổi thì bạn không phải chạy lại gulp nhiều lần. Tính năng này hay được sử dụng để live browser hoặc tự động minify các file css, js,...
```
gulp.task('watch_name', function(){
    gulp.watch('/css/*.css',  ['task_css'])
    gulp.watch('/js/*.js',  ['task_js'])
})
gulp.watch('js/**/*.js', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
```
Vậy là đủ đề hiểu cơ bản về cơ chế hoạt động của Gulp rồi. Tiếp đến mình sẽ hướng dẫn các bạn cách dùng nhé.
# 3. Cách cài đặt
Để chạy được gulp thì mình cần chạy trên nên NodeJS [Install NodeJS](https://nodejs.org/en/)

Sau khi đã cài đặt Node, bạn có thể cài đặt Gulp bằng cách sử dụng lệnh sau:
```
npm install -g gulp
```

Tiếp tục di chuyển vào project và install gulp bằng lệnh:
```
npm install gulp --save-dev
```

- `npm i` là lệnh sử dụng Node Package Manager (npm) để cài đặt Gulp trên máy tính của bạn.
- `-g` trong lệnh này nói với npm cài Gulp với phạm vi toàn cục trên máy tính của bạn, nó cho phép sử dụng lệnh gulp ở bất kỳ đâu trên hệ thống của bạn.
- `--save-dev` sẽ thêm gulp như một dev dependency trong package.json.
- Bước cài đặt global chỉ cần làm 1 lần duy nhất trên 1 máy tính. Còn bước cài đặt trong thư mục dự án thì bắt buộc cài khi tạo một dự án mới.

# 4. Tự động refresh browser
Module này có chức năng tự động refresh lại trình duyệt ngay sau khi bạn sửa đổi các file javascript, css hay html trong dự án.

Để sử dụng được module này các bạn cài đặt bằng lệnh:
```
npm install browser-sync --save-dev
```
Sau đó tạo file gulpfile.js ngay trong thư mục project của bạn, cấu trúc cây thư mục sẽ có dạng như sau
![](https://images.viblo.asia/f807076d-27b3-4451-aa9f-68259b200452.jpg)
Nội dung file gulpfile.js:
```
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('serve', [], function () {
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch(['assets/js/*.js'], browserSync.reload);
    gulp.watch(['assets/css/*.css'], browserSync.reload);
});

gulp.task('default', ['serve']);
```

Để chạy file gulp này, chúng ta gõ lệnh: `gulp`

Trình duyệt sẽ tự bật lên với địa chỉ http://localhost:3000
![](https://images.viblo.asia/95b88d78-6c5f-4ba2-8b85-608bb4cb99a2.jpg)

Bây giờ, bạn thử sửa một file html hoặc javascript, css bất kì, và lưu lại, các trình duyệt đang mở sẽ tự động refresh lại và cập nhật thay đổi đó ngay lập tức. Thật tuyệt vời phải không? :D
# 5. Minify css, js
Để minify các file css, js ở đây mình dùng các pagekage này:
```
npm install gulp-minify-css --save-dev
npm install gulp-minify --save-dev
```
* gulp-minify: minify các file js
* gulp-minify-css: minify các file css

Tiếp đến, tạo ra một task mới, đặt tên là compress với nội dung như sau:
```
gulp.task('compress', function() {
  //cấu hình minify js
  gulp.src('assets/js/*.js') //đường dẫn đến thư mục chứa các file js
    .pipe(minify({
        exclude: ['tasks'],
        ignoreFiles: ['-min.js'] //những file không muốn nén
    }))
    .pipe(gulp.dest('dist/js')); //thư mục dùng để chứa các file js sau khi nén
  //cấu hình minify css
  gulp.src('assets/css/*.css') //đường dẫn đến thư mục chứa các file css
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css')); //thư mục dùng để chứa các file css sau khi nén
});
```
Để thực thi task này (chỉ nên thực thi sau khi đã hoàn tất project), chúng ta gõ lệnh: `gulp compress`
Trong thư mục project của bạn sẽ xuất hiện thêm một thư mục dist (chứa các file đã được nén) như hình dưới.

Như vậy hoàn chỉnh file gulpfile.js của mình gồm có nội dung sau: 

```
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var minify = require('gulp-minify');
var minifyCss = require('gulp-minify-css');

gulp.task('serve', [], function () {
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch(['assets/js/*.js'], browserSync.reload);
    gulp.watch(['assets/css/*.css'], browserSync.reload);
});

gulp.task('compress', function() {
  gulp.src('assets/js/*.js') //đường dẫn đến thư mục chứa các file js
    .pipe(minify({
        exclude: ['tasks'],
        ignoreFiles: ['-min.js'] //những file không muốn nén
    }))
    .pipe(gulp.dest('dist/js')); //thư mục dùng để chứa các file js sau khi nén

  gulp.src('assets/css/*.css') //đường dẫn đến thư mục chứa các file css
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css')); //thư mục dùng để chứa các file css sau khi nén
});

gulp.task('default', ['serve']);
```
Tương tự các bạn có thể cài package của sass để combine css nhé :))
# 6. Kết luận
Ở bài này mình chỉ giới thiệu cơ bản về  Gulp và 2 ví dụ đơn giản là minify các file css, js và live browser, ngoài ra còn rất nhiều package khác mà bạn có thể sẽ cần nhé.

Nếu bài viết của mình có gì không hiểu thì bạn có thể comment bên dưới hoặc xem docs tại [Docs Gulp](https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md) nhé!

Cảm ơn bạn đã đọc bài viết của mình :))

### Tham khảo:

1. https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md
2. https://kipalog.com/posts/Su-dung-Gulp-de-viet-Sass-hieu-qua