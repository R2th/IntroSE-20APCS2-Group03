Ngay cả khi bạn đã cố gắng cấu hình cho webpack để giảm dung lượng của app xuống thấp nhất có thể thì việc tracking để biết được những gì được chứa bên trong ứng dụng của bạn vẫn là một điều rất quan trọng.
Bởi vì rất có thể khi bạn cài đặt một dependency nào đó và nó làm dung lượng của ứng dụng tăng lên gấp đôi và dĩ nhiên bạn không hề hay biết điều đó.

Bài viết này sẽ hướng dẫn một số công cụ giúp bạn hiểu rõ hơn trong bundle của app.

# Keep track of the bundle size

Để theo dõi kích thước (size) của app bạn có thể sử dụng [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard/) trong quá trình development và [bundlesize](https://github.com/siddharthkp/bundlesize) trên CI.

### webpack-dashboard

[Webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard/) cải thiện output trên console của webpack với dung lượng của các dependencies, progress và nhiều thông tin khác nữa. Đây là giao diện của nó.

![](https://images.viblo.asia/95f341f9-08e3-456c-91cd-181d52ff72cd.png)

Dasshboard này rất hữu ích trong việc tracking những dependencies dung lượng lớn, nếu add một package mới ngay lập tức sẽ nhìn thấy nó ở mục modules. 

Làm thế nào để tích hợp?
-  Cài đặt
```sh
npm install webpack-dashboard --save-dev
# or using yarn
yarn add webpack-dashboard -D
```

- Import vào file config của webpack, ví dụ với vue app là `build/webpack.dev.conf.js`
```build/webpack.dev.conf.js
const DashboardPlugin = require('webpack-dashboard/plugin');

// ...

module.exports = {
  // ...
  plugins: [
    new DashboardPlugin(),
    // ...
  ],
};
```
- Sửa lại script chạy server
```diff
"scripts": {
--    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
++    "dev": "webpack-dashboard -- webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
      "lint": "eslint --ext .js,.vue src"
}
```
Chi tiết hơn về việc cài đặt và sử dụng bạn có thể xem tại github của package.
https://github.com/FormidableLabs/webpack-dashboard

Vậy là mỗi khi khởi chạy ứng dụng trong môi trường dev bạn sẽ nhìn thấy màn hình dashboard console này để dễ dàng theo dõi size của các modules.

### Bundlesize
[Bundlesize](https://github.com/siddharthkp/bundlesize) xác nhận assets của webpack không vượt quá kích thước cho phép. Bạn có thể tích hợp nó vào trong một CI nào đó để nhận được thông báo khi app của bạn phình to.

![](https://images.viblo.asia/d8453929-38f7-4654-a744-1db4acc99d15.jpg)

Các bước để cài đặt:
#### Find out the maximum sizes
1. Optimize app để nó đạt được dung lượng thấp nhất có thể và chạy build production.
2. Thêm `bundlesize` vào `package.json`
```package.json
{
  "bundlesize": [
    {
      "path": "./dist/*"
    }
  ]
}
```
3. Chạy `bundlesize` với [`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).
```sh
npx bundlesize
```
Nó sẽ in ra dung lượng mỗi file sau khi đã `gzip`:
```
PASS  ./dist/icon256.6168aaac8461862eab7a.png: 10.89KB
PASS  ./dist/icon512.c3e073a4100bd0c28a86.png: 13.1KB
PASS  ./dist/main.0c8b617dfc40c2827ae3.js: 16.28KB
PASS  ./dist/vendor.ff9f7ea865884e6a84c8.js: 31.49KB
```
4. Thêm từ 10-20% dung lượng vào mỗi file để tìm maximum sizes. Mức chênh lệch 10-20% này sẽ cho phép bạn làm việc thoải trong quá trình phát triển ứng dụng, và warning khi size tăng lên quá lớn.

### Enable `bundlesize`
5. Cài `bundlesize` package.
```sh
npm install bundlesize --save-dev
# or using yarn
yarn add bundlesize --D
```
6. Update `bundlesize` trong `package.json`, thêm ràng buộc về maximum sizes.

Đối với một số files (ví dụ images), có thể bạn sẽ cần chỉ ra maximum size của từng loại thay vì từng file.

```package.json
{
  "bundlesize": [
    {
      "path": "./dist/*.png",
      "maxSize": "16 kB",
    },
    {
      "path": "./dist/main.*.js",
      "maxSize": "20 kB",
    },
    {
      "path": "./dist/vendor.*.js",
      "maxSize": "35 kB",
    }
  ]
}
```
7. Thêm `npm` script để chạy lệnh check.

```package.json
{
  "scripts": {
    "check-size": "bundlesize"
  }
}
```

8. Config lại CI của bạn để nó chạy thêm lệnh `npm run check-size` mỗi khi push.

> Đọc thêm: [Alex Russell - Can You Afford It?: Real-world Web Performance Budgets](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)

# Phân tích tại sao bundle quá nặng
Có thể bạn sẽ muốn lặn sâu hơn vào bundle để tìm hiểu xem module nào đang chiếm nhiều dung lượng, xin giới thiệu với bạn [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).
![https://github.com/webpack-contrib/webpack-bundle-analyzer](https://images.viblo.asia/22cd3ae4-58e6-4358-8ffa-fa3b7c9b2384.gif)

_(Ảnh: https://github.com/webpack-contrib/webpack-bundle-analyzer)_

webpack-bundle-analyzer quét qua toàn bộ bundle và build một map ảo thể hiện những gì bên trong nó. Sử dụng map ảo đó bạn có thể dễ dàng nhìn thấy các dependencies kích thước lớn hoặc không cần thiết.

Để sử dụng, đầu tiên là cài đặt `webpack-bundle-analyzer` package:

```sh
npm install webpack-bundle-analyzer --save-dev
# or using yarn
yarn add webpack-bundle-analyzer -D
```

Thêm plugin vào webpack config.

```build/webpack.base.conf.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // ...
  plugins: [
    new BundleAnalyzerPlugin(),
    // ...
  ],
};
```

Sau đó chạy build production, plugin sẽ tự động mở màn hình thống kê trên một tab trình duyệt.
![](https://images.viblo.asia/7bee807a-95af-4864-816c-9d671daf9edd.png)
Mặc định, thống kê sẽ show kích thước của các files đã được parse (các file nằm bên trong bundle). Sử dụng sizebar bên trái để chuyển qua lại giữa các file và compare sizes.

Đây là những phần bạn cần để ý bên trong thống kê:
- __Large dependencies__. Tại sao chúng lại lớn đến vậy? Có cái nào khác nhỏ nhẹ hơn để thay thế không? Bạn có import hết cả thư viện vào không đấy? (ví dụ `moment.js` trong hình trên, hầu như chỉ sử dụng 1 vài locales nhưng lại import hết toàn bộ, nếu bỏ bớt sẽ giảm được kha khá dung lượng.
- __Duplicated dependencies__. Bạn để ý xem có file nào trùng tên thư viện không? Sử dụng `optimization.splitChunks.chunks` option (webpack 4) hoặc `CommonsChunkPlugin` (webpack 3) để move nó sang một common file. 
  Hoặc cùng một thư viện nhưng lại có nhiều version của thư viện hay không? 
- __Similar dependencies__. Tìm xem có các thư viện tương tự có các chức năng tương đương hay không, bạn có thể lựa chọn bỏ bớt chỉ dùng 1 thư viện (ví dụ `moment` và `date-fns`, hoặc `lodash` và `lodash-es`).

> Đọc thêm: [Sean Larkin - webpack bits: Getting the most out of the CommonsChunkPlugin()](https://medium.com/webpack/webpack-bits-getting-the-most-out-of-the-commonschunkplugin-ab389e5f318)

# Tổng kết
- Sử dụng `webpack-dashboard` và `bundlesize` để luôn luôn nắm bắt được app đang lớn (large) như thế nào.
- Đào sâu vào bản build bằng cách xem kích thước các module với `webpack-bundle-analyzer`

---
> Lược dịch từ [https://developers.google.com](https://developers.google.com/web/fundamentals/performance/webpack/monitor-and-analyze).