-&nbsp;&nbsp;&nbsp;&nbsp;Trong bài này mình sẽ trả lời 3 câu hỏi cho các bạn là what? why? và how? về laravel mix. :))
Trước khi sử dụng một cái gì đó ta nên biết là nó làm gì? tại sao nên dùng? có gì hay?

## 1. Why?
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trong các dự án thì việc viết code chỉ là một phần, sau khi viết code xong chúng ta cần làm sao để tối ưu code, tối ưu trang web của chúng ta. Với những dự án nhỏ thì có vẻ bạn cảm thấy không có gì khác biệt lắm, nhưng với những dự án lớn thì điều này thực sự cần thiết, bạn sẽ thấy rõ được sự khác biệt khi chúng ta tối ưu nó. Việc tối ưu này sẽ giúp chúng ta giảm kích thước lưu trữ và tối ưu băng thông. Việc làm này sẽ giúp trang web của chúng ta tải nhanh hơn, mang tới người dùng có trải nghiệm tốt hơn. Việc tối ưu này cũng giúp trang web của chúng ta SEO tốt hơn. Google cũng sẽ đáng giá cao hơn. Một trong số cách tối ưu dự án về các file css, js, pre-prosessor... là sử dụng laravel mix. 
   
## 2. What?
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Laravel mix giúp chúng ta tối ưu các file như css, javascript, image, ... Laravel mix dựa trên base của webpack build tất cả các file css, js, css pre-prosessor như SCSS, SASS, LESS, STYLUS, compile ES6 thành ES5 (trình duyệt không hiểu được cú pháp của ES6). Ai chưa biết về webpack thì có thể tham khảo ở đây [webpack](https://webpack.js.org/). Trong bài này ban cũng không cần phải biết webpack là gì bạn vẫn có thể làm được nhé.

## 3. How?
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Để sử dụng được laravel mix bạn cần cài đặt nodejs và npm, hoặc có thể thay thế bằng yarn thay thế cho npm (vì yarn quản lý package nhanh hơn npm). Bạn có thể vào trang chủ và tải về cài theo như hệ điều hành bạn đang dùng. [Nodejs](https://nodejs.org/en/download/) Chắc không quá khó để cài nó. Mình sẽ bỏ qua cách cài đặt nó.
   Nếu bạn dùng yarn thì chạy lệnh `yarn install`, còn nếu bạn dùng npm thì `npm install`. Sau khi cài xong bạn chạy câu lệnh sau để chắc chắn là bạn đã cài thành công.
   
   ```
   
   node -v
   npm -v
   yarn -v (nếu dùng yarn)
   
   ```
   
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nó sẽ hiện ra phiên bản hiện tại của bạn. Như thế là thành công rồi. <br> <br>
   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ở đây các bạn cũng cần chú ý về các phiên bản của node và npm. Việc bạn chạy được trên máy này nhưng máy khác không chạy là chuyện bình thường. Và một trong cái quan trọng bạn cần lưu ý là về phiên bản.
   <br>
   <br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Để cập nhật bạn dùng `npm update` để update npm `yarn update` để update yarn.
   
   Trong thư mục root của ứng dụng ta sẽ thấy file webpack.mix.js là file thiết lập các entry point – là các điểm bắt đầu để Mix quét và thực hiện các kịch bản. Từ đây, Laravel Mix xác định được chính xác cách biên dịch các tài nguyên. Laravel Mix hỗ trợ rất nhiều các ngôn ngữ tiền xử lý CSS như Less, Sass, Stylus, ... <br><br>
  - Laravel có các phương thức như `less(), sass(), stylus()` để hỗ trợ compile các css pre-prosessor ra các file css mà trình duyệt có thể hiểu được.
   Cú pháp thực hiện như sau:
   
   ```
   
   mix.less('resources/assets/style.less', 'public/assets');
   mix.sass('resources/assets/style.less', 'public/assets');
   mix.stylus('resources/assets/style.less', 'public/assets');
   
   ```
   
  - Để compile các file css thông thường thành 1 file ta dùng phương thức `styles()`, và tương tự với js ta dùng `scripts()`:
   
   ```
   
   mix.styles([
       'resources/assets/css/bootstrap-datepicker.css',
       'resources/assets/css/jquery.timepicker.min.css'
    ], 'public/css/datetimepicker.css');
   
   mix.scripts([
        'resources/assets/js/bootstrap-datepicker.js',
        'resources/assets/js/jquery.timepicker.min.js'
    ], 'public/js/datetimepicker.js');
    
   ```

 - Hoặc chỉ đơn giản là `copyDirectory()` (copy thư mục) hay `copy()` (copy file):

```

mix.copyDirectory('resources/assets/admin', 'public/assets/admin');

mix.copy('resources/assets/admin.js', 'public/assets/admin.js');

```

 - Nếu bạn sử dụng react chỉ đơn giản là thay đổi phương thức thành `react()`:
 
 ```
 
 mix.react('resources/assets/js/app.jsx', 'public/js');
 
 ```
    
 - Đánh dấu phiên bản đầy ra:<br>
   Tính năng này khá hay. Thông thường các trình duyệt sẽ cache các file css, js trong một khoảng thời gian. Để khắc phục điều này ta sẽ dùng phương thức version(). Phương thức này sẽ ép trình duyệt xóa cache và tải các file với phiên bản mới nhất. Phương thức này sẽ thêm một mã hash tại thời điểm chạy.
```

mix.js('resources/assets/js/app.js', 'public/js')
.version();

```
    
 - Khi thực hiện build, các file đầu ra sẽ có dạng app.hash_string.js, và mỗi lần hash_string sẽ thay đổi nếu nội dung file thay đổi, vậy làm cách nào để chèn vào mã HTML, Laravel hỗ trợ phương thức mix() giúp bạn giải quyết việc đó.
  
  ```
  <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
  ```
    
 - OK, cơ bản vậy là đủ. Đến bước cuối cùng là chạy để mix compile ra những thứ ta cần.<br>
 
  Cũng giống như composer sử dụng file composer.json để quản lý các package, npm sử dụng file package để quản lý các các thư viện được sử dụng trong dự án. 
   
```javascript

{
    "private": true,
    "scripts": {
        "dev": "npm run development",
        "development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
        "watch": "npm run development -- --watch",
        "watch-poll": "npm run watch -- --watch-poll",
        "hot": "cross-env NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js",
        "prod": "npm run production",
        "production": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --no-progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
    },
    "devDependencies": {
        "axios": "^0.18",
        "bootstrap": "^4.0.0",
        "popper.js": "^1.12",
        "cross-env": "^5.1",
        "jquery": "^3.2",
        "laravel-mix": "^2.0",
        "lodash": "^4.17.4",
        "vue": "^2.5.7"
    }
}

``` 
<br>
   &nbsp&nbsp&nbsp&nbsp&nbsp File package.json này là file cấu hình cho các công cụ quản lý thư viện lập trình như npm hoặc yarn. File package.json chứa các gói thư viên lập trình Javascript sẽ được cài đặt trong dự án và một số các kịch bản xây dựng như sau: <br>
   
  - `npm run dev` Câu lệnh này sẽ thực thi mix các file một lần. <br>
  - `npm run watch` Câu lệnh này sẽ thực thi mix các file hiện tại và theo dõi các file cần mix (là những file trong thư mục webpack.mix.js) khi có sự thay đổi thì nó sẽ mix cho chúng ta luôn. Cái này chúng ta rất hay sử dụng trong dự án. <br>
  - `npm run hot` Câu lệnh này thực thi tất cả các tác vụ mix nhưng vẫn active và theo dõi sự thay đổi các tài nguyên, nếu có sự thay đổi, nó thực hiện cập nhật chỉ các module có sự thay đổi, sau đó nó báo cáo với ứng dụng về sự thay đổi và cập nhật mã trong trình duyệt mà không có tải lại tài nguyên. <br>
  - `npm run prod` Thực thi tất cả các tác vụ Mix và tối ưu (minify) các file kết quả đầu ra, khi đó bạn có thể sử dụng các kết quả để triển khai ứng dụng trên máy chủ. <br> <br>
   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Quá dễ phải không mọi người. Nói thì có vẻ dài nhưng làm chắc mất vài phút thôi :)). Cảm ơn các bạn đã đọc bài bài của mình.