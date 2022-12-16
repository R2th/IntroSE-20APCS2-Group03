**Webpack** là một cái tên không quá mới nhưng mình nghĩ không ít lần các anh em đã nghe qua nó. Nhiệm vụ chính của Webpack trong hệ thống là dùng để đóng gói các file html, css, js rời rạc thành một file static duy nhất.

Nếu đã từng code theme cho Wordpress, các anh em cũng biết cách quản lý CSS của nó rất là dở, đó là lý do vì sao mình muốn chia sẽ bài viết này. Hy vọng nó sẽ khiến cho việc develop theme của các anh em trở nên dễ dàng hơn.

Hãy coi nó như một sự trải nghiệm mới mẻ và đầy thú vị :stuck_out_tongue: :stuck_out_tongue: :stuck_out_tongue:

Xin phép cho tui quảng cáo một tí, đây là link bài viết gốc của tui, hihi :smile: 

[https://hungphamdevweb.com/wordpress-theme-config-webpack-tren-wordpress.html](https://hungphamdevweb.com/wordpress-theme-config-webpack-tren-wordpress.html)

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/chk3comphn_confi-webpack-on-wordpress.jpg)

## Tạo File Package.json

Trong bài viết này mình sẽ dùng NPM để cài đặt các package và thường thì chúng ta sẽ quản lý chúng bằng một file có tên là package.json trong project. Các anh em có thể tạo file này bằng cách chạy command ở dưới trên terminal nhé.

``` 
npm init 
```

Sau khi quá trình hoàn tất thì chúng ta sẽ có file json như sau:

```
{
  "name": "webpack-wordpress",
  "version": "1.0.0",
  "description": "config webpack on wordpress",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "anh hung dep trai",
  "license": "ISC"
}
```

## Cài Đặt Webpack

Sau khi đã tạo file package.json như ở bước trên, tiếp theo mình sẽ cài Webpack bằng dòng command dưới đây:

```
npm install --save-dev webpack
```

Ý nghĩa của dòng lệnh trên như sau: để cài đặt gói bằng NPM thì mình sẽ dùng `npm install`, `--save-dev` nghĩa là Wepack chỉ được sử dụng trong môi trường phát triển, sau này khi deloy project lên production thì mình sẽ không cần tới chúng.

Ở một số bài viết khác họ sẽ bắt các anh em cài thêm `webpack-cli` ( webpack command-line interface ), riêng cái này không cần cũng được vì nó chỉ là addon để sử dụng lệnh thôi.

## Config Webpack

Sau khi đã cài đặt Webpack, chúng ta sẽ cần tạo một file config có tên là `webpack.config.js` trong thư mục gốc của theme. Đây là file dùng để cấu mình mọi thứ về Webpack.

Trong bài viết này mình không quá đi sâu vào vấn đề config mà mặc định các anh em đã biết từ trước, các anh em có thể tham khảo thêm trên trang chủ [Webpack](https://webpack.js.org/) để hiểu thêm về nó nhá.

Có một vài vấn đề trong Webpack mà các anh em cần để ý:
* Loader
* Plugin

### Loader

**Webpack** được viết bằng JS nên để có thể load được các file html, css, img... bla bla chúng ta cần phải cài đặt thêm Loader.

```
npm install style-loader css-loader sass-loader node-sass  --save
```
Các anh em chạy lệnh bên trên để cài một số Loader cần thiết để load CSS trong Webpack.

### Plugin

Plugin là một số các chức năng mở rộng dành cho Wepack, trong bài viết này mình không có dùng đến. Nhưng các anh em có thể tham khảo thêm một số plugin bên dưới đây vì mình nghĩ nó cũng khá thú vị:

* mini css extract plugin: tự phân tách ra file CSS riêng lẻ. ( phiên bản v3 trở về sau nó có tên là extract text webpack plugin ).
* autoprefixer: tự thêm tiền tố khi code mỗi thuộc tính css.

Sau cài đặt xong Loader chúng ta sẽ đến phần config, dưới đây là một file config mẫu của mình. Các anh em có thể copy, paste để sử dụng ngay cũng được.

```
const path = require('path');

module.exports = {
    entry: {
        public: './assets/js/app.js'
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'static/js')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']     
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
};
```
Giải thích một tí trong file config ở bên trên như sau:
* Entry là dữ liệu đầu vào, ở đây là một file JS và mình đặt trong nó dường dẫn `/static/js`
* Output là dữ liệu đầu ra, nó sẽ xuất ra "name" dựa vào vào tên mà các anh em đặt, ở đây nó sẽ là "public.min.js"

### Config App.js
App.js trong bài viết này sẽ là file trung tâm import tất cả các dữ liệu khác bao gồm html, css, image, sass ...

Ở đây mình sẽ import một file scss là `app.scss`, nơi sẽ cập nhật tất cả các file SASS hoặc CSS hiện có trong theme. Dưới đây là code trong file App.js của mình.

```
import "../css/app.scss";
```

Các anh em có thể code CSS trên file `app.scss` trên hoặc có thể chia ra nhiều file CSS riêng lẽ rồi dùng file này import ngược lại cũng được.

Sau khi đã config xong Webpack và code một tí CSS, bước tiếp theo là tạo script run Webpack.

Dưới đây là một file mẫu trong `package.json` của mình, các anh em có thể tham khảo thêm nhé.

```
{
  "name": "master",
  "version": "1.0.0",
  "description": "My practice wordpress theme.",
  "scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production",
    "watch": "webpack --watch --mode development"
  }
}
```
Một vài lưu ý nho nhỏ trong "script" ở trên, `webpack --mode production` có nghĩa là khi run Webpack code của các anh em sẽ được minimize lại. Nhiều khi nó sẽ có warning nên các anh em lưu ý phần này nếu ko thích nhìn cái warning đó chứ nó cũng chả ảnh hưởng gì đến trái đất này :stuck_out_tongue: :stuck_out_tongue: :stuck_out_tongue:

## Load CSS trên Theme WordPress

Trong WordPress để load JS hoặc CSS các anh em có thể thêm một function mới trong file `functions.php` như sau:

```
<?php
add_action( 'wp_enqueue_scripts', 'load_script_master' );
function load_script_master() {
    wp_enqueue_script( 'public', get_template_directory_uri() . '/static/js/public.min.js', array('jquery'), 1, true );

}
```
Ý nghĩa của nó như sau, đầu tiên nó sẽ add một cái hàm tên là `load_script_master` trong cái hàm này sẽ gọi một function của WordPress có tên là `wp_enqueue_script`, hàm này sẽ dùng để load các file JS trong WordPress.

Các anh em có thể lên codex của WordPress để xem thêm về một số hàm khác nha.

## Final

Sau đã config xong Webpack và viết hàm load JS cho theme thì chúng ta cần phải chạy `npm run build` để nó generate ra file JS bao gồm CSS cho chúng ta.

Các anh em có thể tham khảo thêm về cách config Webpack của mình bên dưới nhé.

[https://github.com/phamphihungbk/master](https://github.com/phamphihungbk/master)

Nếu có thắc mắc hãy để bình luận bên dưới để chúng ta cùng đàm đạo :stuck_out_tongue: :stuck_out_tongue: :stuck_out_tongue: