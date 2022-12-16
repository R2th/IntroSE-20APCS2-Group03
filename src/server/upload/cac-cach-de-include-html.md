Điều cực kỳ đáng ngạc nhiên với tôi là HTML chưa bao giờ có cách nào để include các tệp HTML khác. Một ví dụ kinh điển: include phần header & footer vào trong trang.
```
...
<body>
   <include src="./header.html"></include>

   Your content here

   <include src="./footer.html"></include>
</body>
...
```

Nhân tiện, đoạn code trên chỉ là giả tưởng. Tôi ước một ngày nó trở thành hiện thực.
Vậy thì để giải quyết bài toán include HTML thì sẽ có các cách sau:

## Sử dụng PHP
```
...
<body>
   <?php include "./header.html" ?>

   Your content here

   <?php include "./footer.html" ?>
</body>
...
```

## Sử dụng Gulp
```
...
<!-- HTML -->
<body>
   @@include('./header.html')

   Content

   @@include('./footer.html')
</body>
...
```

Gulp có rất nhiều processors có thể xử lý việc này. Một trong số đó là [gulp-file-include](https://www.npmjs.com/package/gulp-file-include).

```
// Javascript
var fileinclude = require('gulp-file-include'),
  gulp = require('gulp');
 
gulp.task('fileinclude', function() {
  gulp.src(['index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});
```

## Sử dụng Grunt

Plugin [grunt-bake](https://www.npmjs.com/package/grunt-bake) sẽ giúp bạn xử lý việc include HTML

**Javascript**
```
grunt.initConfig({
    bake: {
        your_target: {
            files: {
                "dist/index.html": "app/index.html",
            }
        }
    }
});
```

**HTML**
```
...
<body>
   <!--(bake header.html)-->

   Content

   <!--(bake footer.html)-->
</body>
...
```

## Sử dụng Pug
https://pugjs.org/
```
...
body
   include ./header.html"

   p Content

   include ./footer.html"

...
```