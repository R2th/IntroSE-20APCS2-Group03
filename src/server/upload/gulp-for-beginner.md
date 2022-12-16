Gulp là tools giúp ta viết một số task để có thể đấy nhanh qúa trình phát triển Web. 

Nó thường được dùng để 
- Spinning up web server 
- Reload browser khi có file được save.
- Sử dụng SASS hoặc LESS
- Optimizing assets như CSS, JS,  images

Sử dụng thành thạo Gulp sẽ giúp ta thao tác rất nhanh trong việc development web. 

Tuy nhiên thì do không phải sử dụng thường xuyên nên hiện tại mình chỉ sử dụng để Code front-end cho nhanh.

Ở bài viết này mình sẽ build 1 bản template để có thể sử dụng nhanh cho các side-project front-end

## Install Gulp 

Để có thể instal Gulp, cần phải có Nodejs đã được cài đặt sẵn trong máy tính. Nếu chưa cài đặt Nodejs có thể cài ở  trên trang chủ Nodejs.

Sau khi cài đặt xong Nodejs thì cài đặt gulp.  Flag -g để cài đặt gulp global, tiện lợi hơn cho việc run task.

```
$ sudo npm install gulp -g
```


## Tạo project và install dependencies 

```
$ npm init
```

![](https://images.viblo.asia/6409dac3-cc89-45a7-9506-f2bb0fff99bb.png)

```
$ npm install gulp --save-dev
```


- Folder stucture sẽ như sau

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

Giải thích sơ qua về cấu trúc folder này.  
Folder **App** để lưu các file source,  trong khi **dist/** để lưu các file nén lại sử dung cho production.

Gulfile.js là file để cấu hình gulp.


## Writing first gulp task

Theo định nghĩa thì gulp là 1 function async, có thể tạo đơn giản như sau

```javascript
var gulp = require('gulp');
return new Promise(function(resolve, reject) {
    console.log("HTTP Server Started");
    resolve();
  });
  ````

Khi chạy gulp hello sẽ in ra log.

Cụ thể thì gulp task có dạng 
```javascript
gulp.task('task-name', function () {
  return gulp.src('source-files') // Get source files with gulp.src
    .pipe(aGulpPlugin()) // Sends it through a gulp plugin
    .pipe(gulp.dest('destination')) // Outputs the file in the destination folder
})
```

gulp.src chỉ định file sẽ chạy task đó,  gulp.pipe là các plugin sẽ được chạy trên file,   gulp.dest quy định output 


## Preprocess với gulp

Có thể compile Sass, LESS qua csss với gulp như sau

```javascript
$ npm install gulp-sass --save-dev
var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
gulp.task('sass', function(){
  return gulp.src('app/scss/styles.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
});

```

Cụ thể thì gulp task này sẽ biên dịch styles.scss và dịch qua app/css/styles.css


## Glob trong gulp
 
Gulp có sự dụng 1 pattern riêng để có thể match các file.  Các pattern thường đuọc sử dụng trong gulp
- *.scss Tất cả các file .scss trong root foldẻ
- ***/*.scss  Match tất cả các file đuôi scss trong root folder và cả trong folder con
- !not-me.scss: Loại not-me.scss ra khỏi list cac file được chọn
- *.+(scss|sass): Tất cả các file kết thúc bằng scss hoặc sass trong root foldẻ

Task của chúng ta có thẻ được update như sau

```javascript
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
})
```
Hiện tại khi muốn compile sass qua css chúng ta đều phải gọi **gulp sass**. Gulp có cho phép ta compile file mỗi khi file được thay đổi với **gulp.watch**

## Watching file

Chú ý ở đây mình sử dụng gulp 3.x nên cú pháp sẽ khác so với 4.x . Với 4.x các bạn cần phải sửa cú pháp.

Đây là cu pháp của watch file sử dụng gulp
```javascript
// Gulp 3.x watch syntax
gulp.watch('files-to-watch', ['tasks', 'to', 'run']);
```

Và ta có thể viết watch task với sass như sau 

```javascript
gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Other watchers
})
```

## Reloading page với browsersync

Hiện tại chúng ta đã có thể tự động compile sass -> css mỗi lần thay đổi file. Tuy nhiên nếu chỉ dừng lại ở đây thì vẫn chưa thực sự speed up quá trình phát triển. Gulp kết hợp với **browsersync** sẽ giúp ta có thể reload lại page mỗi lần thay đổi file sass

```
$ npm install browser-sync --save-dev
```

Config 

```javascript
var browserSync = require('browser-sync').create();
// Run server với basePAth là app
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})


gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({   // Reload lại 
      stream: true
    }))
});
```

Hiện giờ chúng ta cần làm là có thể start browsersync, Compile lại mỗi khi có thay đổi trên file, Sau đó reload lại page. Chúng ta có thể làm như sau

```
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Other watchers
});
```

Task Watch sẽ cần  2 task   **'browserSync', 'sass'** chạy trước.

Nếu tìm hiểu thêm 1 chút thì ta hoàn toàn có thể làm điều tương tự với JS, html 

```javascript
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});

```

Chúng ta hoàn toàn có thể làm thêm nhiều thứ khác với Gulp như
- Nén Css, JS thành 1 file trước khi cho lên production
- Nén images
- Clean auto-generated file



Vì mục đich ban đầu của mình là tạo 1 side-templte để code FE nên mình sẽ dừng ở đây. Những phần trên bạn có thể tham khảo thêm tại https://css-tricks.com/gulp-for-beginners/   . Và còn rất rất nhiều thứ có thể thực hiện với **gulp** để tăng tốc độ phát triển phần mềm.


Có 1 chú ý là bạn nên sử dụng gulp 3.x . Mình đã thử migrate lên 4.x nhưng do không sự dụng quen nên bị lỗi khá nhiều cú pháp nhưng hiện tại hướng dẫn  migrate lên 4.x mình thấy vẫn còn khá sơ sài


OK. Cám ơn các bạn đã theo dõi