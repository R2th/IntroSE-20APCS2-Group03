Xin chào các bạn, hẳn trong chúng ta đã từng sử dụng một số template để đưa vào dự án của mình để đỡ mất thời gian hơn trong việc code template. Có khá nhiều template nổi tiếng và tiện ích hơn template mà mình sắp nói, tuy nhiên theo quan điểm của mình xét về việc đẹp, khỏe, **FREE** thì chắc không ai qua bằng template BlurAdmin. Tuy nhiên để làm sao sử dụng được template vào dự án thì mình sẽ hướng dẫn các bạn ở bài viết này.
# 1. Giới thiệu
Ngắn gọn vào xúc tích thôi https://github.com/akveo/blur-admin template này được viết dựa trên Angular 1, phiên bản đời đầu của Angular tuy nhiên đối với mình Angular 1 vẫn luôn dễ học và dễ hiểu. Tương lai nếu được mình sẽ có thêm bài viết về template này sử dụng Angular 5. Đây là bản demo của template BlurAdmin: http://akveo.com/blur-admin/#/dashboard

# 2. Cài đặt môi trường
### 2.1 Cài đặt Gulp
Mình giới thiệu qua về Gulp một xíu. Gulp là một công cụ giúp bạn tự động hóa nhiều task (nhiệm vụ) trong quá trình phát triển web. Nó thường được sử dụng để làm các tác vụ front end như:
- Tạo ra một web server
- Reload trình duyệt một cách tự động bất cứ khi nào một file được lưu
- Sử dụng các preprocessor giống như Sass hoặc LESS
- Tối ưu hóa các tài nguyên như CSS, JavaScript và hình ảnh
- Để cài đặt Gulp bạn làm hướng dẫn theo link sau: 
    https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
### 2.2 Cài đặt Bower:
- ` npm install -g bower`
### 2.3 Tạo 1 project mới
```
rails new demo_blur_admin
```
### 2.4 Clone template
Các bạn vào link sau: https://github.com/akveo/blur-admin va clone nó về.
# 3. Hướng dẫn chi tiết
- Sau khi đã tạo 1 project và clone template về, việc đầu tiên là bạn hãy copy thư mục **package.json** trong thư mục template bạn mới clone về vào dự án của bạn. Sau khi đã copy xong bạn tạo 1 file **bower.json** và tiếp tục copy file này từ thư mục template. Xong, chỉ là copy thôi mà nên không có gì phức tạp cả.
- Bây giờ bắt đầu đi vào code nhé, vì template này sử dụng gulp để build dự án nên mình sẽ chỉ nói xoay quanh cách làm việc của gulp. Đầu tiên bạn sẽ tạo 1 file có tên **gulpfile.js** có đường dẫn như dưới *demo_blur_admin/gulpfile.js*, file này sẽ như sau:
```
'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

wrench.readdirSyncRecursive('./blur_admin/gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./blur_admin/gulp/' + file);
});

gulp.task('default', ['clean'], function () {
  gulp.start('full-build');
});

```
Khi đọc đoạn code trên chắc chắn bạn sẽ thắc mắc blur_admin là cái quái gì nhỉ, mình đã tạo ở trên đâu, nếu bạn nghĩ như vậy thì bạn đúng rồi đấy. Ở đây chính là thư mục mà mình sẽ chứa tất cả các file gulp nhỏ mà mình đã code, các bạn tạo thư mục blur_admin theo đường dẫn *demo_blur_admin/blur_admin*, trong này sẽ chứa những gì, nó sẽ chưa 2 thư mục là **gulp** và **src**, bạn có thể copy y chang 2 thư mục này từ template mà bạn đã clone về. Cấu trúc thư mục của mình sẽ như sau:

![](https://images.viblo.asia/0864fa91-8543-4248-a95e-ff1c73670a52.png)

- Giờ chúng ta sẽ đi đến việc xử lí từng file gulp:

1. Đâu tiên sẽ là file **conf.js** trong thư mục *demo_blur_admin/blur_admin/gulp/conf.js* (thật ra bạn chỉ cần copy paste thôi (yaoming))
```
'use strict';

var gutil = require('gulp-util');

exports.paths = {
  src: 'blur_admin/src',
  dest: 'app/assets',
  tmp: '.tmp',
  public_assets: 'public/assets/manager'
};

exports.wiredep = {
  exclude: [/\/bootstrap\.js$/, /\/bootstrap-sass\/.*\.js/, /\/require\.js/],
  directory: 'vendor/assets/bower_components'
};

exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
```
Ở file config này chính là nơi mình sẽ xuất ra các file js, css, image mà mình đã build

2. Tiếp theo file **styles.js** trong thư mục *demo_blur_admin/blur_admin/gulp/styles.js*
```
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var concat = require('gulp-concat');
var wiredep = require('wiredep');
var modifyCssUrls = require('gulp-modify-css-urls')
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});

gulp.task('vendor-styles', function() {
  return gulp.src(wiredep(conf.wiredep).css)
    .pipe(concat('manager_vendor.css'))
    .pipe($.minifyCss({ processImport: false }))
    .pipe(modifyCssUrls({
      modify: function (url, filePath) {
        return 'manager/' + url;
      }
    }))
    .pipe(gulp.dest(path.join(conf.paths.dest, '/stylesheets/manager/')))
});

gulp.task('styles', ['templateCacheHtml'], function() {
  return buildStyles()
    .pipe(gulp.dest(path.join(conf.paths.dest, '/stylesheets/manager/')))
});

gulp.task('styles-min', ['templateCacheHtml'], function() {
  return buildStyles()
    .pipe($.minifyCss({ processImport: false }))
    .pipe(gulp.dest(path.join(conf.paths.dest, '/stylesheets/manager/')))
});

gulp.task('stylesAuth', function () {
  return buildSingleScss(path.join(conf.paths.src, '/sass/auth.scss'))
    .pipe(gulp.dest(path.join(conf.paths.dest, '/stylesheets/manager/')))
});

gulp.task('main', function () {
  return buildSingleScss(path.join(conf.paths.src, '/sass/main.scss'))
    .pipe(gulp.dest(path.join(conf.paths.dest, '/stylesheets/manager/')))
});


gulp.task('styles404', function () {
  return buildSingleScss(path.join(conf.paths.src, '/sass/404.scss'))
    .pipe(gulp.dest(path.join(conf.paths.dest, '/stylesheets/manager/')))
});

gulp.task('stylesAuth-min', function () {
  return buildSingleScss(path.join(conf.paths.src, '/sass/auth.scss'))
    .pipe($.minifyCss({ processImport: false }))
    .pipe(gulp.dest(path.join(conf.paths.dest, '/stylesheets/manager/')))
});

gulp.task('main-min', function () {
  return buildSingleScss(path.join(conf.paths.src, '/sass/main.scss'))
    .pipe($.minifyCss({ processImport: false }))
    .pipe(gulp.dest(path.join(conf.paths.dest, '/stylesheets/manager/')))
});

gulp.task('styles404-min', function () {
  return buildSingleScss(path.join(conf.paths.src, '/sass/404.scss'))
    .pipe($.minifyCss({ processImport: false }))
    .pipe(gulp.dest(path.join(conf.paths.dest, '/stylesheets/manager/')))
});

function buildStyles() {
  var sassOptions = {
    style: 'expanded'
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/sass/**/_*.scss'),
    '!' + path.join(conf.paths.src, '/sass/theme/conf/**/*.scss'),
    '!' + path.join(conf.paths.src, '/sass/404.scss'),
    '!' + path.join(conf.paths.src, '/sass/auth.scss')
  ], {read: false});

  var injectOptions = {
    transform: function (filePath) {
      filePath = filePath.replace(conf.paths.src + '/sass/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  var cssFiles =  gulp.src([
    path.join(conf.paths.src, '/sass/main.scss')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.dest, '/stylesheets/manager/')))

  return cssFiles
    .pipe(concat('manager_build.css'))
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(modifyCssUrls({
      modify: function (url, filePath) {
        return 'manager/' + url;
      }
    }))
};

var buildSingleScss = function (paths) {
  var sassOptions = {
    style: 'expanded'
  };

  return gulp.src([paths])
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(modifyCssUrls({
      modify: function (url, filePath) {
        return 'manager/' + url;
      }
    }))
};

```
Vì mình cũng không phải là dân chuyên về front-end nên cũng không rành về gulp nhiều lắm, tuy nhiên ngắn gọn là file này dùng để build ra file css, khi mình chạy file gulp nó sẽ sinh ra thực mục *stylesheets/manager* trong file này sẽ chứa tất cả css sẽ build ra, như đoạn code trên ví dụ như **main.scss**, **auth.scss**...

3. File **scripts.js** trong thư mục *demo_blur_admin/blur_admin/gulp/scripts.js*
```
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var concat = require('gulp-concat');
var wiredep = require('wiredep');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});

gulp.task('templateCacheHtml', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html')
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'BlurAdmin',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/templateCacheHtml/'));
});

gulp.task('vendor-scripts', function() {
  return gulp.src(wiredep(conf.wiredep).js)
    .pipe(concat('manager_vendor.js'))
    .pipe($.uglify().on('error', conf.errorHandler('Uglify')))
    .pipe(gulp.dest(path.join(conf.paths.dest, '/javascripts/manager/')))
});

gulp.task('scripts', ['templateCacheHtml'], function() {
  return buildScripts()
    .pipe(gulp.dest(path.join(conf.paths.dest, '/javascripts/manager/')))
});

gulp.task('scripts-min', ['templateCacheHtml'], function() {
  return buildScripts()
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe(gulp.dest(path.join(conf.paths.dest, '/javascripts/manager/')))
});

function buildScripts() {
  var scriptFiles = gulp.src([
    path.join(conf.paths.src, '/assets/js/**/*.js'),
    path.join(conf.paths.src, '/app/**/*.module.js'),
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join(conf.paths.tmp, '/templateCacheHtml/templateCacheHtml.js'),
    '!' + path.join(conf.paths.src, 'app/**/*.spec.js'),
    '!' + path.join(conf.paths.src, '/app/**/*.mock.js'),
  ]).on('error', conf.errorHandler('AngularFilesort'));

  return scriptFiles
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.size())
    .pipe(concat('manager_build.js'))
};

```
Cái này cũng tương tự như file styles.js mình đã giải thích ở trên.

4. File **builds.js** trong thư mục *demo_blur_admin/blur_admin/gulp/builds.js*
```
'use strict';

var gulp = require('gulp');
var conf = require('./conf');
var path = require('path');
var $ = require('gulp-load-plugins')({
  pattern: ['del']
});

gulp.task('build', ['scripts', 'styles', 'styles404', 'stylesAuth', 'main']);
gulp.task('build-dist', ['scripts-min', 'styles-min', 'styles404-min', 'stylesAuth-min', 'main-min']);
gulp.task('build-vendor', ['vendor-scripts', 'vendor-styles', 'other']);
gulp.task('full-build', ['build-vendor', 'build']);
gulp.task('full-build-dist', ['build-vendor', 'build-dist']);

gulp.task('clean', function () {
  return $.del([path.join(conf.paths.public_assets, '/'), path.join(conf.paths.tmp, '/')]);
});

```

5. File **watch.js** trong thư mục *demo_blur_admin/blur_admin/gulp/watch.js*
```
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');


function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['build'],function () {

  gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['build']);

  gulp.watch([
    path.join(conf.paths.src, '/sass/**/*.css'),
    path.join(conf.paths.src, '/sass/**/*.scss')
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles');
    } else {
      gulp.start('build');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/app/**/*.js'), function(event) {
    if(isOnlyChange(event)) {
      gulp.start('scripts');
    } else {
      gulp.start('build');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), function(event) {
    gulp.start('build');
  });
});

```

6. File **other.js** trong thư mục *demo_blur_admin/blur_admin/gulp/other.js*
```
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files']
});

gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.public_assets, '/fonts/')));
});

gulp.task('other', ['fonts'], function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/assets/**/*'),
    path.join('!' + conf.paths.src, '/assets/**/*.{html,css,js,scss,md}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.public_assets, '/')));
});
```
đây sẽ là file định nghĩa các task, nơi mà sẽ chứa các task nhỏ mà mình đã tạo ở các thư mục trên. Về cơ bản thì đây là mình đã config 1 số thứ để file gulp này chạy được trên Rails, bạn cũng có thể xem các file gulp cũ ở trong template xem nó làm những gì, mình chỉ dùng những cái sẽ dùng chứ không phải dùng hết nến xóa bớt 1 số cái.

Trên mình đã hướng dẫn bạn những cái quan trọng nhất để tích hợp với dự án Rails. Ở phần tiếp theo mình sẽ tiếp tục hướng dẫn làm sao để Rails có thể hiểu được template cũng như nhận được các file js và css của template đó. Thân ái và hẹn gặp lại ở bài viết tới. Mình đã cập nhật [Phần 2](https://viblo.asia/p/huong-dan-dua-template-bluradmin-vao-rails-phan-2-gAm5ypLVldb) mời các bạn tham khảo