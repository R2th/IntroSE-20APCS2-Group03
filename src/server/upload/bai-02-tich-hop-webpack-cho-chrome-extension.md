Xin chào mọi người! :wave::wave::wave:

Chào mừng bạn đã đến với series/tutorial ***Lập trình Chrome extension với Typescript + Vue.js theo phong cách Viblo***. Mình tên là Kim, cũng là một trong các thành viên trong [Viblo Team](https://viblo.asia/o/viblo).  Rất hân hạnh được đồng hành cùng các bạn trong series này.

Trong bài hôm nay, chúng ta sẽ tiếp tục khắc phục các vấn đề khi build Chrome Extension trong [bài trước](https://viblo.asia/p/bai-01-khoi-tao-chrome-extension-voi-vue-cli-924lJqD6ZPM). Hướng giải quyết của mình sẽ là sử dụng [Webpack](https://viblo.asia/tags/webpack) giống như trong [Viblo Browser Extension](https://github.com/viblo-asia/browser-extension).

## First look

Bài trước, nếu bạn để ý thì sẽ thấy `yarn serve`, `yarn build` thực chất là script alias tới `vue-cli-service`. Vue CLI Service cũng sử dụng webpack nhưng tại thời điểm hiện tại thì việc customize với webpack còn gặp một số vấn đề hạn chế:
- Multi entrypoints với webpack
- Config webpack theo document nhưng không nhận config webpack mới

Hy vọng trong thời gian tới chúng ta có thể tùy biến được tốt hơn.

Chúng ta sử dụng `vue-cli-service` để thực hiện build Vue.js và TypeScript thành js "thuần" một cách rất nhanh chóng. Vậy thì thực sự, `vue-cli-service` đã làm giúp chúng ta những gì? Dưới đây là một số thứ điển hình:
1. Compile Vue.js + TypeScript và extract thành file `dist/js/app.[hash].js`
2. Compile SASS/CSS và extract thành file `dist/css/app.[hash].css`
3. Inject các file JavaScript và CSS sau khi build thành công vào file `dist/index.html`
4. Đóng gói các library dùng chung giữa các Vue component vào trong `chunk-vendors.[hash].js`. Ví dụ như: Vue.js, vue-class-component


## Cài đặt dependency

### Install Webpack

Chính bởi lẽ hạn chế ở trên nên mình sẽ dùng trực tiếp Webpack mà không còn dùng qua vue-cli-service như trước nữa. Chúng ta cần config một chút với webpack để thực hiện những việc mà `vue-cli-service` đã làm ở trên. Đồng thời giải quyết các vấn đề đang gặp ở bài trước.

Bây giờ, hãy cùng mình cài đặt phiên bản mới nhất là v4.41.5.  Và chúng ta sẽ vẫn tiếp tục cài đặt qua `yarn` nhé:

```bash
$ yarn add -D webpack webpack-cli
yarn add v1.19.1
[1/4] Resolving packages...
[2/4] Fetching packages...
info fsevents@1.2.11: The platform "linux" is incompatible with this module.
info "fsevents@1.2.11" is an optional dependency and failed compatibility check. Excluding it from installation.
info fsevents@2.1.2: The platform "linux" is incompatible with this module.
info "fsevents@2.1.2" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
[4/4] Building fresh packages...

success Saved lockfile.
success Saved 13 new dependencies.
info Direct dependencies
├─ webpack-cli@3.3.10
└─ webpack@4.41.5
Done in 4.80s.

```

> Kí tự `$` là ký tự nhắc dòng lệnh trên terminal của mình, vui lòng bỏ qua.

### Install Loaders for webpack

Do không dùng qua `vue-cli-service` nên mình sẽ cần cài đặt thêm một số loader để phục vụ việc compile một các file cần thiết như `.vue|.ts|.ts|.css|.scss`.

```bash
$ yarn add -D vue-loader ts-loader css-loader file-loader node-sass sass-loader
yarn add v1.19.1
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
info Direct dependencies
├─ css-loader@3.4.1
├─ file-loader@5.0.2
├─ node-sass@4.13.0
├─ sass-loader@8.0.0
├─ ts-loader@6.2.1
└─ vue-loader@15.8.3

```

Trong đó:
- `vue-loader`: compile Vue.js
- `ts-loader`: compile code TypeScript
- `css-loader node-sass sass-loader`: phục vụ cho việc compile CSS, SASS.

### Install Webpack Plugins

Tiếp tục, chúng ta cài đặt thêm webpack plugin cần thiết khác là `mini-css-extract-plugin`, `html-webpack-plugin`, `copy-webpack-plugin` và `cross-env`:

```bash
$ yarn add -D mini-css-extract-plugin html-webpack-plugin copy-webpack-plugin cross-env
yarn add v1.19.1
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...

success Saved lockfile.
success Saved 3 new dependencies.
info Direct dependencies
├─ copy-webpack-plugin@5.1.1
├─ cross-env@6.0.3
├─ html-webpack-plugin@3.2.0
└─ mini-css-extract-plugin@0.9.0

```

## Refactor code & folder structure


### Sử dụng templates/popup.html

Do không dùng `vue-cli-service` để build nên thư mục public cũng hơi thừa, mình sẽ chuyển `public/index.html` tới `templates/popup.html`, rồi sau đó xóa bỏ folder `public` không còn cần thiết.

```bash
mv public/index.html templates/popup.html
rm -rf public
```

Xóa bỏ thẻ link không dùng trong `templates/popup.html`, cuối cùng nội dung sẽ như sau:

```html:templates/popup.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Prodwarn</title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but Prodwarn doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

### Update NPM scripts

Các lệnh `build`, `serve` cũng được chuyển qua dùng webpack:

```json:package.json
  "scripts": {
    "serve": "cross-env NODE_ENV=development webpack -w --hide-modules",
    "build": "cross-env NODE_ENV=production webpack --hide-modules",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    ...
  }
```

Trong đó:
- `webpack -w` sẽ thêm file watcher, giúp tự build lại source code mỗi khi file source code bị sửa đổi
- `cross-env` giúp mình define environment variable như `NODE_ENV`

Bây giờ lệnh `serve` không còn ***serve*** web server để chúng ta truy cập qua http://localhost:8080 như trước nữa, mà chỉ là tạo watcher để tự build lại code. Do đó, mình sẽ đổi command alias từ `serve` thành `start`.

```json:package.json
 "start": "cross-env NODE_ENV=development webpack -w --hide-modules",
 ```

### Refactor folder structure

Vì thông thường, một browser extension có thể có nhiều thành phần chứ không chỉ riêng popup. Để gọn gàng hơn một chút, chúng ta sẽ làm gọn gàng hơn một chút giống Viblo Browser Extension đó là chuyển code của popup vào một folder riêng tên là `src/popup`. Nhân tiện, chúng ta tạo sẵn một folder `src/content-scripts` với một file `main.ts` ở trong với nội dung:

```typescript:src/content-scripts/main.ts
console.log('content-scripts are called! ^^')

```

Cấu trúc thư mục `src` bây giờ sẽ trở thành:

```bash
$ tree src/
src/
├── content-scripts
│   └── main.ts
└── popup
    ├── App.vue
    ├── assets
    │   └── logo.png
    ├── components
    │   └── HelloWorld.vue
    ├── main.ts
    ├── shims-tsx.d.ts
    └── shims-vue.d.ts

4 directories, 7 files
```

## Cấu hình webpack

### Tạo file webpack.config.js

Như bạn đã thấy, chúng ta sẽ setup webpack để compile code cho hai thành phần trong extension gồm:
- `src/content-scripts`
- `src/popup`

Chúng ta cần compile chúng thành 2 file riêng biệt, do đó, mình sẽ cần tạo 2 entrypoint cho webpack. Rất tiếc, webpack chỉ support 1 entrypoint mà thôi. Do đó chúng ta phải config webpack riêng biệt cho từng cái.

```javascript:webpack.config.js
const contentScripts = require('./webpack/content-scripts');
const popup = require('./webpack/popup');

module.exports = [
  contentScripts,
  popup,
];

```

### Config webpack cho content-scripts

MÌnh sẽ có một bài tiếp theo về các thành phần trong browser extension, cũng như chức năng, tác dụng của chúng để mọi người hiểu nên trong bài này bạn hãy tạm hiểu `content-scripts` sẽ là các script của mình để thực hiện thao tác với DOM của một trang web bạn đang truy cập. Ví dụ, khi chúng ta vào trang Viblo và muốn đổi background của trang từ trắng sang đen, code xử lý đó sẽ được đặt trong `content-scripts` và khai báo trong `manifest.json` để browser thực thi.

Content-scripts của mình cũng khá đơn giản vì chỉ là code TypeScript, dó đó, chúng ta chỉ cần sử dụng `babel-loader` và  `ts-loader` trong webpack là đủ. File cấu hình sẽ như sau:

```javascript:webpack/content-scripts.js
const { resolve } = require('path');

module.exports = {
  mode: process.env.NODE_ENV,

  name: 'content-scripts',

  entry: [
    './src/content-scripts/main.ts',
  ],

  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'content-scripts/main.js',
  },

  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': resolve(__dirname, '../src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

```

Tạm thời chúng ta có thể comment dòng số 2 và 6 trong `webpack.config.js` như này để build thử:

```javascript:webpack.config.js
const contentScripts = require('./webpack/content-scripts');
// const popup = require('./webpack/popup');

module.exports = [
  contentScripts,
  // popup,
];

```

```bash
$ yarn build
yarn run v1.19.1
$ cross-env NODE_ENV=production webpack --hide-modules
Hash: 44bfd3d4e4a2b06c1184
Version: webpack 4.41.5
Child content-scripts:
    Hash: 44bfd3d4e4a2b06c1184
    Time: 796ms
    Built at: 01/08/2020 12:23:16 AM
                 Asset        Size  Chunks             Chunk Names
    content-scripts.js  1020 bytes       0  [emitted]  main
    Entrypoint main = content-scripts.js
Done in 1.79s.

```

### Config webpack cho Popup

Popup thì config nhiều hơn một chút vì nó phải làm khá nhiều thứ với Vue.js, TypeScript, Images, SASS.

```javascript:webpack/popup.js
const { resolve } = require('path');
const HtmlPlugin = require('html-webpack-plugin'); // eslint-disable-line
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // eslint-disable-line

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: process.env.NODE_ENV,

  name: 'popup',

  entry: [
    './src/popup/main.ts',
  ],

  output: {
    path: resolve(__dirname, '../dist/popup'),
    filename: 'js/index.js',
  },

  resolve: {
    extensions: ['.js', '.ts', '.vue', '.scss', '.css'],
    alias: {
      '@': resolve(__dirname, '../src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: { appendTsSuffixTo: [/\.vue$/] },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
          esModule: false,
      },
      {
        test: /\.(png|jpg|svg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]?[hash]',
          esModule: false,
        },
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),

    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
      ignoreOrder: false,
    }),

    new HtmlPlugin({
      template: resolve(__dirname, '../templates/popup.html'),
      filename: 'index.html',
    }),
  ],
};

```

Trong đó, mình sử dụng `MiniCssExtractPlugin` để extract css thành file `.css`, `HtmlPlugin` để generate file `/popup/index.html` (đã inject cả `/popup/js/index.js` và `/popup/css/main.css`.

Bỏ comment trong `webpack.config.js` để chúng ta chạy webpack build thử cả `popup` và `content-scripts`:

```javascript:webpack.config.js
const contentScripts = require('./webpack/content-scripts');
const popup = require('./webpack/popup');

module.exports = [
  contentScripts,
  popup,
];

```

```bash
$ yarn build
yarn run v1.15.2
$ cross-env NODE_ENV=production webpack --hide-modules
Hash: 2ac2f2827d5103f38c5c0ea7ef83af28f19be4fd
Version: webpack 4.41.5
Child content-scripts:
    Hash: 2ac2f2827d5103f38c5c
    Time: 2773ms
    Built at: 01/09/2020 12:51:09 PM
                 Asset        Size  Chunks             Chunk Names
    content-scripts.js  1020 bytes       0  [emitted]  main
    Entrypoint main = content-scripts.js
Child popup:
    Hash: 0ea7ef83af28f19be4fd
    Time: 4421ms
    Built at: 01/09/2020 12:51:11 PM
                                            Asset       Size  Chunks                         Chunk Names
                css/main.0ea7ef83af28f19be4fd.css  368 bytes       0  [emitted] [immutable]  main
    img/logo.png?82b9c7a5a3f405032b1db71a25f67021   6.69 KiB          [emitted]              
                                       index.html  619 bytes          [emitted]              
                                      js/index.js   76.6 KiB       0  [emitted]              main
    Entrypoint main = css/main.0ea7ef83af28f19be4fd.css js/index.js
    Child html-webpack-plugin for "index.html":
         1 asset
        Entrypoint undefined = index.html
    Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/vue-loader/lib/loaders/stylePostLoader.js!node_modules/sass-loader/dist/cjs.js!node_modules/vue-loader/lib/index.js??vue-loader-options!src/popup/App.vue?vue&type=style&index=0&lang=scss&:
        Entrypoint mini-css-extract-plugin = *
    Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/vue-loader/lib/loaders/stylePostLoader.js!node_modules/sass-loader/dist/cjs.js!node_modules/vue-loader/lib/index.js??vue-loader-options!src/popup/components/HelloWorld.vue?vue&type=style&index=0&id=20a26824&scoped=true&lang=scss&:
        Entrypoint mini-css-extract-plugin = *
Done in 5.25s.

```

Như vậy là đã thành công rồi! :laughing: 

### Tự động tạo manifest.json và ảnh logo

Tới thời điểm này, còn một vấn đề mà chúng ta chưa giải quyết đó là việc tự động copy file `manifest.json`, `static` vào `dist` sau mỗi lần build source code.

Lần này, chúng ta sẽ dùng `copy-webpack-plugin` để cấu hình tự động generate `manifest.json` và copy thư mục `static` mỗi khi build.

Nếu bạn để ý, hai file config webpack sẽ có ouput folder khác nhau. Với `popup` thì sẽ là `dist/popup` còn `content-scripts` sẽ là `dist`. Vì các file `manifest.json` và `static` cần copy vào root, nên config webpack lần này mình sẽ thêm vào `webpack/content-scripts`.

```javascript:webpack/content-scripts.js
const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line

const pkg = require('../package.json');
const manifestTemplate = require('../templates/manifest.json');

module.exports = {
  ...

  module: {
    ...
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: './templates/manifest.json',
        to: 'manifest.json',
        transform: () => {
          manifestTemplate.version = pkg.version;

          return Buffer.from(JSON.stringify(manifestTemplate, null, 2));
        },
      },
      {
        from: './static',
        to: 'static',
      },
    ]),
  ],
```

Đoạn code trên sử dụng chức năng `transform` của `copy-webpack-plugin`, giúp mình chèn tên `version` mới tại mỗi lần release. Chúng ta chỉ cần return `Buffer` trong hàm `transform` là được, còn `version` mình sẽ lấy từ file `package.json` cho tiện release.

Thử build lại lần cuối:

```bash
$ yarn build
yarn run v1.15.2
$ cross-env NODE_ENV=production webpack --hide-modules
Hash: 2ac2f2827d5103f38c5c0ea7ef83af28f19be4fd
Version: webpack 4.41.5
Child content-scripts:
    Hash: 2ac2f2827d5103f38c5c
    Time: 2104ms
    Built at: 01/09/2020 1:02:12 PM
                         Asset        Size  Chunks             Chunk Names
       content-scripts/main.js  1020 bytes       0  [emitted]  main
                 manifest.json   445 bytes          [emitted]  
    static/images/logo-128.png    3.19 KiB          [emitted]  
     static/images/logo-16.png   513 bytes          [emitted]  
     static/images/logo-32.png    1.07 KiB          [emitted]  
     static/images/logo-48.png    1.36 KiB          [emitted]  
    Entrypoint main = content-scripts/main.js
Child popup:
    Hash: 0ea7ef83af28f19be4fd
    Time: 2638ms
    Built at: 01/09/2020 1:02:12 PM
                                            Asset       Size  Chunks                         Chunk Names
                css/main.0ea7ef83af28f19be4fd.css  368 bytes       0  [emitted] [immutable]  main
    img/logo.png?82b9c7a5a3f405032b1db71a25f67021   6.69 KiB          [emitted]              
                                       index.html  619 bytes          [emitted]              
                                      js/index.js   76.6 KiB       0  [emitted]              main
    Entrypoint main = css/main.0ea7ef83af28f19be4fd.css js/index.js
    Child html-webpack-plugin for "index.html":
         1 asset
        Entrypoint undefined = index.html
    Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/vue-loader/lib/loaders/stylePostLoader.js!node_modules/sass-loader/dist/cjs.js!node_modules/vue-loader/lib/index.js??vue-loader-options!src/popup/App.vue?vue&type=style&index=0&lang=scss&:
        Entrypoint mini-css-extract-plugin = *
    Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/vue-loader/lib/loaders/stylePostLoader.js!node_modules/sass-loader/dist/cjs.js!node_modules/vue-loader/lib/index.js??vue-loader-options!src/popup/components/HelloWorld.vue?vue&type=style&index=0&id=20a26824&scoped=true&lang=scss&:
        Entrypoint mini-css-extract-plugin = *
Done in 3.84s.

```

Bạn thấy trong log build sẽ có cả `manifest.json`, `static/images/logo-*.png` được thêm thành công.  Tuy nhiên, khi mở extension thì thấy báo lỗi `File Not Found`, nguyên nhân do chúng ta đã chuyển file `index.html` vào trong `popup/index` nên cấu hình file `manifest.json` trở thành bị lỗi. Hãy đổi link `default_popup: "popup/index.html"`  rồi build lại là được.

Vậy là các vấn đề đã được giải quyết. Bạn có thể và mở lại extension và vậy thấy nó hoạt động bình thường. :) Nếu bạn đang follow theo tut này mà gặp vấn đề nào đó, hãy để lại comment để mình cùng thảo luận nhé. Chúc bạn thành công và hẹn gặp lại ở phần sau!

## TL;DR

Link tham khảo:
- [VueLoader Plugin for webpack](https://vue-loader.vuejs.org/migrating.html#a-plugin-is-now-required)
- [HTML Webpack Plugin](https://webpack.js.org/plugins/html-webpack-plugin/)
- [Mini CSS Webpack Plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
- [Copy Webpack Plugin](https://github.com/webpack-contrib/copy-webpack-plugin)
- [Full source code - Lesson 02](https://github.com/kimyvgy/prodwarn/releases/tag/3d18e6a)

Nếu bạn thấy series này hay và hữu ích thì đừng quên [share](https://www.facebook.com/sharer.php?u=https%3A%2F%2Fviblo.asia%2Fs%2Ftao-chrome-extension-voi-typescript-vue-theo-phong-cach-viblo-pmleB8G95rd&title=Tạo%20Chrome%20extension%20với%20Typescript%20%2B%20Vue%20theo%20phong%20cách%20Viblo), upvote, folow mình để đón đọc các bài viết tiếp theo của mình trên Viblo nhé!

Bạn cũng có thể subscribe các tag về [Vue](https://viblo.asia/tags/vue) và [Typescript](https://viblo.asia/tags/typescript) trên Viblo để nhận được nhiều hơn nữa các bài viết mới nhất về các topic này trên Vbilo nhé! Viblo sử dụng các dữ liệu mà bạn folow, quan tâm cho hệ thống gợi ý nên các bạn hãy folow những topic bạn yêu thích để hệ thống recommend thêm nhiều bài hay và bổ ích từ hàng nghìn bài viết trên Viblo mà bạn còn chưa từng đọc!

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***