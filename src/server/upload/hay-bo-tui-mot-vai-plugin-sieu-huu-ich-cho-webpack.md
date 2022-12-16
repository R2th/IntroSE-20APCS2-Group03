#### Chào anh em, lại là mình đây :D. Hôm nay chúng ta lại tiếp tục đi đến 1 chủ đề tuy mới mà lại cũ :sunglasses:, đó là `Webpack`, hẳng ai đã làm việc với `React, Vue` chắn chắn đều sẽ biết về `module bundler` siêu mạnh mẽ và thông dụng này và bài viết này sẽ nói về `Plugin webpack` một phần được ví như là `backbone` của `webpack`. Nào hãy cùng theo dõi nhé :100:

# 1. Chuẩn bị
#### Yêu cầu:
- Đã có kiến thức cơ bản về `Webpack`.
- Môi trường mình sẽ sử dụng:
  - Window 10
  - node v12.14.0
  - yarn v1.22.4
  - editor: VSCode
 
#### Mục đích:
- Điểm qua một số plugin siêu hữu ích để anh em có thể dùng cho các dự án sắp tới.

#### Những phần bỏ qua:
- Phần cấu hình mình sẽ không mô tả chi tiết trong bài viết, các bạn có thể theo dõi thông qua repo.
- Giải thích các thuật ngữ, khái niệm cơ bản mà các bạn hoàn toàn có thể đọc thông qua trang chính thức của thư viện đó.

# 2. Nội dung
### Vậy webpack plugin là gì ?
> Plugins are the backbone of webpack. webpack itself is built on the same plugin system that you use in your webpack configuration!

### Có bao nhiêu loại webpack plugin ?
Cơ bản sẽ gồm 2 loại:
- Các plugin được tích hợp sẵn bên trong webpack. Ví dụ: `DefinePlugin, ProgressPlugin, EnvironmentPlugin, etc.`
- Các plugin được xây dựng từ cộng đồng. Ví dụ: `html-webpack-plugin, webpack-bundle-analyzer, copy-webpack-plugin, etc.`

Hôm nay, mình sẽ chia sẽ về một số plugin được xây dựng từ cộng đồng  mà mình rất rất thường xuyên sử dụng.

### Một số plugin
#### copy-webpack-plugin
> Mục đích của plugin này để copy các file hay thư mục được chỉ định đến thư mục nào đó (thông thường là thư mục build)

Demo
```js
// webpack.config.js
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('build'),
    publicPath: '/',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/assets'),
          to: path.resolve('build/assets'),
          toType: 'dir',
        },
      ],
    }),
  ],
}
```
Chúng ta sẽ chỉ định copy thư mục từ `src/assets` sang `build/assets` khi tiến hành build

Thư mục trước khi build

![](https://images.viblo.asia/7d36bc0a-9535-4720-a7a3-cda355b43b3f.PNG)

Chạy lệnh sau để build
```bash
yarn webpack
```

Thư mục sau khi build

![](https://images.viblo.asia/eeb1642e-b7a0-4153-8c81-79ebdab87b61.PNG)

Bạn sẽ thấy plugin đã copy 1 bản `assets` sang thư mục `build` do ta chỉ định ở cấu hình phía trên.

#### case-sensitive-paths-webpack-plugin
> Mục đích của plugin này để bắt buộc phân biệt chữ hoa thường khi các bạn import file

Demo

Cấu trúc thư mục

![](https://images.viblo.asia/d561685e-ef31-4c58-b2d7-080567faf965.PNG)

Khi bạn không sử dụng `case-sensitive-paths-webpack-plugin`
```js
// webpack.config.js
const path = require('path')
// const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('build'),
    publicPath: '/',
  },
  // plugins: [new CaseSensitivePathsPlugin()],
}
```

Kết quả

![](https://images.viblo.asia/277a4b86-6acf-445f-9a1f-68326425361a.PNG)

Mọi thứ vẫn diễn ra và như không có chuyện gì

Khi bạn sử dụng `case-sensitive-paths-webpack-plugin`
```js
// webpack.config.js
const path = require('path')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('build'),
    publicPath: '/',
  },
  plugins: [new CaseSensitivePathsPlugin()],
}
```

Kết quả

![](https://images.viblo.asia/698ed25b-684e-4f2a-9fa2-e780577d0636.PNG)

Lập tức có mỗi lỗi không tìm thấy `module`, để giải quyết bạn cần phải import chính xác module name có phân biệt hoa thường.

#### circular-dependency-plugin
> Mục đích của plugin này để đảm bảo không xảy ra quá trình import chéo giữa 2 hay nhiều file

Demo

```js
// index.js
import a from './a'
import b from './b'

a()
b()


// a.js
import b from './b'

export default function a() {
  console.log('function a')
  b()
}


// b.js
import a from './a'

export default function b() {
  console.log('function b')
  a()
}
```

Chúng ta sẽ import a vào b và b vào a

Khi bạn không sử dụng `circular-dependency-plugin`
```js
// webpack.config.js
const path = require('path')
// const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('build'),
    publicPath: '/',
  },
  plugins: [
    // new CircularDependencyPlugin({
    //   exclude: /node_modules/,
    // }),
  ],
}
```

Kết quả

![](https://images.viblo.asia/5747ac13-f31f-4c17-a171-08e3a1453bd8.PNG)

Sẽ không có bất kì `warning` nào để cảnh báo chúng ta về việc phụ thuộc chéo giữa 2 file

Khi bạn sử dụng `circular-dependency-plugin`
```js
// webpack.config.js
const path = require('path')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('build'),
    publicPath: '/',
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /node_modules/,
    }),
  ],
}
```

Kết quả
![](https://images.viblo.asia/b05a1617-987b-4ed1-a59d-a5249121f23f.PNG)

Lập tức `warning` để chúng ta có thể cân nhắc điều chỉnh

#### html-webpack-plugin
> Mục đích của plugin này để giúp webpack tự động tạo 1 hay nhiều file html (nâng cao) và liên kết các module sau khi build, ngoài ra có thể tối ưu và sử dụng các biến môi trường trong file html đầu ra.

Demo

Cấu hình webpack và tệp html mẫu cho plugin

![](https://images.viblo.asia/bb0c8a4c-e640-4891-9c65-8bf5cf2a2820.PNG)

Sau khi build

![](https://images.viblo.asia/7892db7d-06c6-4030-8045-6bca17a67925.PNG)

Tệp bundle đã được link tới tệp html tự động và kích hoạt tối ưu file html đầu ra

#### mini-css-extract-plugin
> Mục đích của plugin này để gom rất cả các module css vào 1 file duy nhất

Demo

Mình sẽ phải sử dụng với `css-loader` để giúp resolve các tệp `css` như module
Các tệp ban đầu

![](https://images.viblo.asia/e1bcac08-86f3-4b10-8806-ff133e88f4ba.PNG)

Sau khi build

![](https://images.viblo.asia/dacc977b-0a8c-40a8-a6db-ee597588053a.PNG)

Một file `main.css` duy nhất chứa tất cả css từ các tệp.

Để có thể minify `css` bạn nên kết hợp với plugin [optimize-css-assets-webpack-plugin](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)

#### webpack-bundle-analyzer
> Mục đích của plugin này để tạo ra một biểu đồ để bạn có thể hình dung thông tin của các tệp đầu ra, từ đó có thể biết file nào, library nào kích thước quá lớn mà có thể tiến hành tối ưu

Demo

Mình sẽ thêm module `lodash` để bạn có thể nhìn thấy rõ hơn trong bản build vì `lodash` có kích thước khá lớn

![](https://images.viblo.asia/da5470ea-6a18-4ad1-89fb-3f14726beceb.PNG)

Sau khi build, `webpack-bundle-analyzer` sẽ kích hoạt một server và mở 1 trang như sau

![](https://images.viblo.asia/382623fd-7145-4a30-bd77-9cfb866c44a9.PNG)

Bạn có thể nhìn thấy rõ các thông tin của mỗi tệp đầu ra.

#### terser-webpack-plugin
> Mục đích của plugin này để minify các file js

Demo

Theo mặc định thì `terser-webpack-plugin` đã kích hoạt gần như hầu hết các tính năng minify cần thiết, chúng ta chỉ nên điều chỉnh một vài option nếu thực sự cần.
Ở đây mình sẽ thử kích hoạt xóa các dòng `console` khi build bằng việc enable `terserOptions.compress.drop_console`

![](https://images.viblo.asia/f5264771-9bd5-4ebb-a895-5a3b355a934a.PNG)

Kết quả

![](https://images.viblo.asia/376502b0-1ac2-48fa-bee3-1a670488b03d.PNG)

Tất nhiên là file js đầu ra đã được inline nên không thể đọc. bạn cần dùng `prettier` hay một công cụ nào đó format lại để kiểm tra

![](https://images.viblo.asia/0418d713-c8c0-43e5-b441-22835d34e0bc.PNG)

Thực sự các dòng `console.log` mình sử dụng đã bị xóa trong file js này.

#### clean-webpack-plugin
> Mục đích của plugin này rất đơn giản, nó sẽ kích hoạt xóa thư mục được chỉnh định trong `output.path` để tiến hành bản build mới mà không ghi đè lên thư mục cũ

Cấu hình rất đơn giản

```js
// webpack.config.js
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('build'),
    publicPath: '/',
  },
  plugins: [new CleanWebpackPlugin()],
}
```

# 3. Kết luận
Qua bài viết này hi vọng sẽ giúp anh em hiểu và có thể dùng các `webpack plugin` này cho các dự án sắp tới.

Ngoài ra còn rất nhiều plugin khác, anh em có thể tìm hiểu thêm, nó chắn chắn sẽ giúp ích.

Nếu bạn cảm thấy bài viết này hữu ích, hãy chia sẽ cho bạn bè để cùng nhau khám phá những điều mới mẽ trong thế giới `JavaScript` này nhé :D

Cảm ơn anh em đã đọc bài viết này.

Toàn bộ ví dụ trên tại [repo](https://github.com/daint2git/viblo.asia/tree/master/webpack-plugin)