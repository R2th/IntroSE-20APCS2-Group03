Như ở [phần trước](https://viblo.asia/p/tao-icon-tu-svg-p1-6J3ZgXQBlmB) thì mình đã hướng dẫn các bạn các cách sử dụng thẻ **svg** trong html sao cho hợp lý, các tạo **webfont icon** từ các công cụ online. Thì hôm nay để tiếp tục, thì mình sẽ hướng dẫn các bạn tạo ra web icon ngay trong project của mình bằng các sử dụng **gulp** và các **package** của **npm**.

## 1. Khởi tạo 
Thì đầu tiên, chúng ta cần một **folder** để chứa code, mở **terminal** ngay trong folder đấy và chạy lệnh :
``` npm init ```
> Note: Đảm bảo máy của bạn đã cài đặt [**NodeJs**](https://nodejs.org/en/download/)  và [**gulp-cli** ](https://www.npmjs.com/package/gulp-cli) nhé. 

Tiếp theo chúng ta cần cài đặt các **package** cần thiết:

* **gulp** giúp chúng ta thực hiện tự động các hoá các task với nhau chỉ bằng một câu lệnh.
*   **gulp-iconfont** để tạo file **font icon** từ file **svg**  cho chúng ta.
*   **underscore** là một **template-engine** để xử lý mảng, hỗ trợ việc tạo **css** cho **font icon**.
*   **gulp-consolidate** là một **plug-in**, và để sử dụng được **underscore** ta cần cài đặt nó.

Cài đặt tất cả, chỉ bằng 1 câu lệnh sau:
```js
    npm install --save-dev gulp gulp-iconfont underscore gulp-consolidate 
```
 Tiếp theo chúng ta tạo các folder cần thiết, cấu trúc thư mục của mình như sau:
 ```
    ├── node_modules
    ├── src
    │   └── iconfont-src
    │       ├── svg
    │       │   ├── airport.svg
    │       │   ├── bicycle.svg
    │       │   ├── dog-park.svg
    │       │   ├── ferry.svg
    │       │   ├── park.svg
    │       │   ├── restaurant.svg
    │       │   ├── rocket.svg
    │       │   ├── toilets.svg
    │       │   └── zoo.svg
    │       └── icon.css
    ├── gulpfile.js
    ├── package-lock.json
    └── package.json
```

## 2. CSS Icon
Một phần rất quan trọng, chúng ta cần tạo file **css** cho **font icon** của mình, đây sẽ là các **style** cần thiết cho bộ icon của mình. Yêu cầu đặt ra là mỗi **icon** cần có **class** riêng biệt, có thể gọi trong thuộc tính **content** của **::before**, **::after**

```css
    /* <%= fontName %> sẽ là tên font của bạn */
    @font-face {
        font-family: '<%= fontName %>';
        src: url('<%= fontName %>.eot?<%= fontDate %>');
        src: url('<%= fontName %>.eot?#iefix-<%= fontDate %>') format('embedded-opentype'),
            url('<%= fontName %>.woff2?<%= fontDate %>') format('woff2'),
            url('<%= fontName %>.woff?<%= fontDate %>') format('woff'),
            url('<%= fontName %>.ttf?<%= fontDate %>') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    [class^='icon-']:before,
    [class*=' icon-']:before {
        font-family: '<%= fontName %>';
        display: inline-block;
        vertical-align: middle;
        line-height: 1;
        font-weight: normal;
        font-style: normal;
        text-decoration: inherit;
        font-size: inherit;
        text-transform: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    <% _.each(glyphs, function(icon){ %>
    .icon-<%= icon.name %>:before {
        content: '\<%= icon.unicode[0].charCodeAt(0).toString(16) %>';
    }
    <% }) %>
```
## 3. Gulp
Trong file **gulpfile.js**, ta code như sau
```js
    var gulp = require('gulp'),
        consolidate = require('gulp-consolidate'),
        iconfont = require('gulp-iconfont');
    // require các package
    gulp.task('iconfont', function () {
        return gulp.src('src/iconfont-src/svg/*.svg') // folder chứa svg
            .pipe(iconfont({
                fontName: 'iconfont', // tên font
                formats: ['ttf', 'eot', 'woff', 'woff2'],//định dạng file font
                appendCodepoints: true,
                appendUnicode: false,
                normalize: true,
                fontHeight: 1000,
                centerHorizontally: true
            }))
            .on('glyphs', function (glyphs, options) {
                gulp.src('src/iconfont-src/icon.css') // folder chứa file css ban đầu
                    .pipe(consolidate('underscore', {
                        glyphs: glyphs,
                        fontName: options.fontName,
                        fontDate: new Date().getTime()
                    }))
                    .pipe(gulp.dest('src/iconfont')); // folder chứa css sau khi thực thi
            })
            .pipe(gulp.dest('src/iconfont')); // folder font ta nhận được 
    });
```

Sau khi đã hoàn thành, hãy chạy lệnh ```gulp iconfont``` trên **terminal**, đợi một chút nhé, kết quả sẽ được lưu trong thư mục **src/iconfont**.
## 4. Sử dụng
Việc sử dụng rất đơn giản, giống như khi ta sử dụng **font-awesome** vậy,
trong file **html** của bạn, hãy chèn file **icon.css** mà ta vừa tạo được vào, và sử dụng.
```html
    <link rel="stylesheet" href="icon.css">
    \\\
    <i class="icon-airport"></i>
```

Kết quả: 
![](https://images.viblo.asia/6d9d7664-ae09-4157-a7e3-0c90e754f231.PNG)

Bài viết của mình đến đây là hết, hy vọng sẽ giúp các bạn trong một vài trường hợp.

### Tham khảo 
* [Buddy](https://buddy.works/guides/how-create-webfont-from-svg-files)