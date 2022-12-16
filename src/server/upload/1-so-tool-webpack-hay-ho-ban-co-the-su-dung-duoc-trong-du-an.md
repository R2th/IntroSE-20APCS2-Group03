## Giới thiệu
Từ khóa webpack chắc không còn xa lạ với mọi người nữa, sức mạnh của nó đã được thể hiện rõ ràng qua số dự án đang chạy hay số sao (hiện tại đang là 56,8k lượt vote trên github, đó là chỉ là core của nó mà thôi). Khi nó đến webpack sẽ có 2 thành phần lớn tạo nên sức mạnh cho nó là `loader` và `pluin` của nó, hôm nay mình xin giới thiệu 1 số `plugin` mà mới tìm hiểu và cảm thấy hay ho, đang muốn thử áp dụng vào dự án.

![](https://images.viblo.asia/c88cf234-bf46-4a7b-aece-acfbcfe6fa22.png)

## Một số plugin:
### 1> moment-locales-webpack-plugin:
**Trang chủ**: https://github.com/iamakulov/moment-locales-webpack-plugin

- **Giới thiệu**: Khi chúng ta sử dụng momentjs để format liên quan đến thời gian thường phải import 1 vài localization mà thôi. Tuy nhiên, khi dùng momentjs ta thường được tặng kèm rất nhiều ngôn ngữ khác nhau => chính điều này tạo ra sự dư thừa và gây nặng cho ứng dụng. Plugin này sinh ra để giảm bớt đi 1 số localization không cần thiết

- **Cài đặt**:

``` npm install --save-dev moment-locales-webpack-plugin```

- **Sử dụng**:
``` js
// webpack.config.js
// khai báo plugin
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    plugins: [
        // Nếu bạn muốn loại bỏ tất cả các ngôn ngữ khác
        // ('en': ngôn ngữ mặc định)
        new MomentLocalesPlugin(),

        // Nếu bạn muốn giữ lại 'en', 'en-us', 'ru'
        //('en': ngôn ngữ mặc định không thể loại bỏ)
        new MomentLocalesPlugin({
            localesToKeep: ['es-us', 'ru'],
        }),
    ],
};
```
Như ở đoạn code trên cách sử dụng rât đơn giản: bạn import plugin và sử dụng thuộc tính `localesToKeep` để giữ lại các ngôn ngữ bạn cần dùng. Bạn cần chú ý: tiếng anh là ngôn ngữ mặc định nên không thể loại bỏ được

- **Kết quả**: 

Bạn có thể loại bỏ được các ngôn ngữ không cần dùng của moment (khoảng 75% dung lượng file của moment là do support các ngôn ngữ khác nhau)
Tuy momentjs đang được thay thế bằng các thư viên khác như (DateFns, DateJs, Luxon,.. ) nhưng nếu dự án bạn đang dùng momnent thì có thể thử dùng thèn này

### 2> webpack-pwa-manifest:
**Trang chủ**: https://github.com/arthurbergmz/webpack-pwa-manifest

- **Giới thiệu**:  Khi chúng ta đang dùng tự động sinh ra file `manifest.json`  (dùng trong Progressive Web Application) 

- **Cài đặt**:

```npm install --save-dev webpack-pwa-manifest```

- **Sử dụng**:
```js
// ES6+
import WebpackPwaManifest from 'webpack-pwa-manifest'

// ES5
var WebpackPwaManifest = require('webpack-pwa-manifest')

plugins: [
  new WebpackPwaManifest({
  // tên app
    name: 'My Progressive Web App',
 // tên rút gọn, bạn sẽ thấy khi cài đặt hoặc khi hiển thị trên giao diện mà nó giới hạn từ 
    short_name: 'MyPWA',
// mô tả     
    description: 'My awesome Progressive Web App!',
// màu nền: khi laucher ứng dụng lần đầu trên UI     
    background_color: '#ffffff',
    crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
// list icon    
    icons: [
      {
        src: path.resolve('src/assets/icon.png'),
        sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
      },
      {
        src: path.resolve('src/assets/large-icon.png'),
        size: '1024x1024' // you can also use the specifications pattern
      },
      {
        src: path.resolve('src/assets/maskable-icon.png'),
        size: '1024x1024',
        purpose: 'maskable'
      }
    ],
    "start_url": ".",
  "display": "standalone",
  "scope": "/",
  "theme_color": "#3367D6",
  "shortcuts": [
    {
      "name": shortcut",
      "short_name": "tên shortcut",
      "description": "mô tả",
      "url": "/",
      "icons": [{ "src": "/images/icon.png", "sizes": "192x192" }]
    },
   ....
  ]
  })
]
```
 
 - **Kết quả**
 Ta sinh ra 1 file `manifest.json`  tự động tự động sinh ra và inject, với hỗ trợ icon resizing and fingerprinting 

 ```js
 {
  "name": "My Progressive Web App",
  "orientation": "portrait",
  "display": "standalone",
  "start_url": ".",
  "short_name": "MyPWA",
  "description": "My awesome Progressive Web App!",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "icon_1024x1024.<fingerprint>.png",
      "sizes": "1024x1024",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "icon_1024x1024.<fingerprint>.png",
      "sizes": "1024x1024",
      "type": "image/png"
    },
    {
      "src": "icon_512x512.<fingerprint>.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "icon_384x384.<fingerprint>.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "icon_256x256.<fingerprint>.png",
      "sizes": "256x256",
      "type": "image/png"
    },
    {
      "src": "icon_192x192.<fingerprint>.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon_128x128.<fingerprint>.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "icon_96x96.<fingerprint>.png",
      "sizes": "96x96",
      "type": "image/png"
    }
  ],
    "theme_color": "#3367D6",
  "shortcuts": [
    {
      "name": shortcut",
      "short_name": "tên shortcut",
      "description": "mô tả",
      "url": "/",
      "icons": [{ "src": "/images/icon.png", "sizes": "192x192" }]
    },
    .....
}
```

### 3> filemanager-webpack-plugin:
**Trang chủ** :  https://github.com/gregnb/filemanager-webpack-plugin

- **Giới thiệu**
Cái tên của nó nói lên tất cả, nó là 1 Plugin dạng quản lý file cho phép bạn copy, nén (zip, tar, tar.gz), di chuyển hay delete file  và thư mục trước hoặc sau khi build
(Mình giới thiệu để các bạn dùng thử 1 plugin tổng hợp những gì bạn cần, nếu các bạn cần 1 chức năng tương tự bạn có thể dùng các plugin `copy-webpack-plugin` hoặc `remove-files-webpack-plugin` ,...)

- **Cài đặt**:
```
npm install filemanager-webpack-plugin --save-dev
```

- **Sử dụng**:
```js
// webpack.config.js:

const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  plugins: [
    new FileManagerPlugin({
    // bạn khai báo event tương ứng: onEned hoặc onStart
      events: {
        onEnd: {
        // các option có thể khai báo là copy, move, delete, Mkdir hoặc Archive
          copy: [
            { source: '/path/fromfile.txt', destination: '/path/tofile.txt' },
            { source: '/path/**/*.js', destination: '/path' },
          ],
          move: [
            { source: '/path/from', destination: '/path/to' },
            { source: '/path/fromfile.txt', destination: '/path/tofile.txt' },
          ],
          delete: ['/path/to/file.txt', '/path/to/directory/'],
          mkdir: ['/path/to/directory/', '/another/directory/'],
          archive: [
            { source: '/path/from', destination: '/path/to.zip' },
            { source: '/path/**/*.js', destination: '/path/to.zip' },
            { source: '/path/fromfile.txt', destination: '/path/to.zip' },
            { source: '/path/fromfile.txt', destination: '/path/to.zip', format: 'tar' },
            {
              source: '/path/fromfile.txt',
              destination: '/path/to.tar.gz',
              format: 'tar',
              options: {
                gzip: true,
                gzipOptions: {
                  level: 1,
                },
                globOptions: {
                  nomount: true,
                },
              },
            },
          ],
        },
      },
    }),
  ],
};
```


### 4>webpack-build-notifier:
**Trang chủ**: https://github.com/roccoc/webpack-build-notifier
- **Giới thiệu**:
Mỗi khi bạn build với webpack, bạn muốn khi thành công hoặc thất bại sẽ có 1 thông báo nhỏ nhỏ để bạn quan sát và kịp sửa sai nếu có lỗi thì đây quả là 1 plugin mà bạn cần

![](https://images.viblo.asia/9da48f3b-802b-4e12-b8e8-70f9a0489112.PNG)
           (hình ảnh khi chưa cấu hình plugin)
- **Cài đặt**:
```
npm install webpack-build-notifier --save-dev
```
- **Sử dụng**:
```js
// webpack.config.js
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
  // ...
  plugins: [
    new WebpackBuildNotifierPlugin({
    // tiêu đều mà bạn muốn hiển thị
      title: "My Webpack Project",
    // logo, nếu ko có sẽ sử dụng hình ảnh mặc định của webpack
      logo: path.resolve("./img/favicon.png"),
      // cách hiển thị thông báo, nhận giá trị:
      // - false: show ra notification mỗi khi build/
      // - true : bạn chỉ muốn show khi thất bại hoặc lần đầu thành công
      // - always: đừng show ra build thành công, chỉ quan tâm build thất bại
      // - initial: giống khi thành công, !! mình chưa hiểu khác gì so với nó
      suppressSuccess: true, // don't spam success notifications
    })
  ],
}
```
Ngoài ra bạn có thể cấu hình thêm thời gian hiển thị với `showDuration`, hay  các icon `successIcon` `warningIcon``failureIcon` `compileIcon` , âm thanh , hay các sự kiện khác.

- **kết quả:**
Build thành công hay thất bại đều có thông báo và âm thanh nhẹ nhàng
![](https://images.viblo.asia/12089a99-2083-4082-bdee-8b420657d69c.PNG)
![](https://images.viblo.asia/204b133c-94fd-4fb5-8fb2-55e176d0db52.PNG)

Chống chỉ định dùng plugin cho bạn nào không thích đọc thông báo@@



### 5> Một số plugin khác bạn có thể thử tìm hiểu:
- prerender-spa-plugin: https://github.com/chrisvfritz/prerender-spa-plugin
- serverless-webpack: https://github.com/serverless-heaven/serverless-webpack
- Friendly-errors-webpack-plugin: https://github.com/geowarin/friendly-errors-webpack-plugin
- dynamic-cdn-webpack-plugin: https://github.com/mastilver/dynamic-cdn-webpack-plugin


## Kết luận:
Qua phần giới thiệu của mình, hy vọng bạn có thể có hứng thú hơn với webpack và áp dụng được 1 nào đó mình đã giới thiệu.

Cảm ơn bạn đã đọc qua bài viết của mình.

Tham khảo: https://webpack.js.org/