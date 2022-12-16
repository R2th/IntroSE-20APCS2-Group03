Chào các ban, Ở bài chia sẽ [Học webpack cơ bản trong 15 phút](https://viblo.asia/p/hoc-webpack-co-ban-trong-15-phut-ByEZkLaolQ0) lần trước thì mình có nhận được một số yêu cầu làm thêm phần nâng cao cho webpack. Nên bài viết lần này mình sẽ thảo luận về core concept của webpack và kèm theo ví dụ cụ thể. Let go!
## Init project
Để vừa đọc vừa làm nên mình sẽ khởi tạo một thư mục có tên webpack_concept trong destop. Tất cả code của mình trong bài viết hôm nay sẽ được chứa trong thư mục này. Về phần init và config file package.json mình sẽ không nói lại để tránh mất thời gian.
Trong thư mục webpack_concept của mình giờ sẽ như sau:
![](https://images.viblo.asia/d77e1ef5-4633-4546-8436-f622be29d50b.png)
Với file webpack.config.js có nội dung:
```
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
Trong bài viết này mình sẽ thảo luận về enptry và output.

## Entry
Chúng ta có 2 cách định nghĩa entry như sau:
### Single Entry
Cú pháp: *entry: string|Array<string>*
*string
Đây là cách đơn giản nhất, chỉ định file duy nhất cho webpack biết nên bắt đầu complie từ đâu.
```
module.exports = {
  entry: './src/app.js'
};
```
Đây là cách định nghĩa mình đã nói ở trước nên mình sẽ không làm ví dụ nữa. Các bạn đọc lại nhé!
* array<string>
```
module.exports = {
  entry: ['./src/app.js', './src/home.js']
};
```
Để thấy được cách làm việc khi entry là array thì mình định nghĩa nội dùng của file app.js:
```
window.app = function () {
    console.log('This is complied from app.js file')
}
```
và file home.js:
```
window.home = function () {
    console.log('This is complied from home.js file')
}
```
File webpack.config.js của mình như sau:
```
const path = require('path');

module.exports = {
  entry: ['./src/app.js', './src/home.js'],
  output: {
    path: path.resolve(__dirname, 'dist')
  }
};
```
Sau đó chạy lệnh:
```
webpack --mode=development
```
trong thư mục dist sẽ xuất hiện file main.js bao gồm cả hai function mà mình đã định nghĩa.
Mình tạo thêm file index.html với nội dung như sau:
```
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <script src="./dist/main.js"></script>
    <script>
        app()
        home()
    </script>
</body>
</html>
```
Mở file index.html bằng browser sau đó f12 chọn console xem có in ra hai dòng chữ mình đã định nghĩa ở hai file home.js và app.js không?
### Object Syntax
Cú pháp: *entry: {[entryChunkName: string]: string|Array<string>}*
```
module.exports = {
  entry: {
    app: './src/app.js',
    home: './src/home.js'
  }
};
```
Với cú pháp này thì webpack sẽ tạo ra file dist/app.js từ file src/app.js và dist/home.js trong thư mục src/app.js.
tương tự các bạn thử import hai file này vào trong file index.html để xem kết quả.
## Output
output có hai property
```
output: {
    filename: '', // chỉ định tên file sau khi biên dịch.
    path: path.resolve(__dirname, 'dist') //chỉ định thư mục chứa các file biên dịch
}
```
Với single entry thì output được định nghĩa như sau:
```
output: {
    filename: 'main.js', //các bạn có thể đổi tên file này
    path: path.resolve(__dirname, 'dist')
}
```
Đối với với entry là object thì output được định nghĩa như sau:
```
module.exports = {
  entry: {
    app: './src/app.js',
    home: './src/home.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
};
```
name trong [name].js sẽ được thay bằng tên file gốc được biên dịch.
Như vậy mình đã nói về hai core concept của webpack. Phần tiếp theo mình sẽ nói về loader và plugin.