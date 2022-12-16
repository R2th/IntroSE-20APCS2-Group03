## I. Vấn đề
Khi làm chức năng đa ngôn ngữ cho client app bằng vuejs, mình muốn lazy load các file ngôn ngữ để tăng tốc độ tải lần đầu.

Cụ thể là chỉ load file ngôn ngữ hiện tại để hiện thị, các file khác thì load khi người dùng thay đổi ngôn ngữ và ở đây là mình dùng dynamic import.

Phần triển khai đó đại loại như thế này:
```
import(/* webpackChunkName: "lang-[request]" */ `@/langs/${window.config.lang}`).then(messages => {
       const i18n = new VueI18n({
              locale,
              formatter,
              messages
       })
}
```

Không có vấn đề gì với những dòng lệnh này cả tuy nhiên nếu bạn dùng laravel-mix để build file và trong file mix bạn dùng extract và sass thì sẽ xảy ra xung đột, file css sẽ không được build và bạn nhận được 1 file rỗng.

https://github.com/JeffreyWay/laravel-mix/issues/1879

```
mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .extract()
```

## II. Giải pháp
Sau một hồi tìm kiếm thì mình thấy có giải pháp này là khả thi:

https://github.com/JeffreyWay/laravel-mix/issues/1914#issuecomment-503392761

(nếu có cách nào hay hơn mọi người hãy chia sẻ bên dưới nhé)

Chúng ta sẽ tạo ra 2 file mix: **webpack.css.mix.js** và **webpack.js.mix.js**, 1 file để build file css và 1 file để build js cho ứng dụng.
 **webpack.js.mix.js** :
```
const mix = require('laravel-mix')
const path = require('path')
const mergeManifest = require('./mergeManifest')

mix.extend('mergeManifest', mergeManifest)
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js'),
      'sass': path.resolve(__dirname, 'resources/sass'),
    },
  }
})

mix.js('resources/js/app.js', 'public/js')
  .extract()
  .mergeManifest();

if (mix.inProduction()) {
  mix.version()
} else {
  mix.sourceMaps()
}
```

**webpack.css.mix.js** :
```
const mix = require('laravel-mix')
const path = require('path')
const mergeManifest = require('./mergeManifest')

mix.extend('mergeManifest', mergeManifest)
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
  output: {
    chunkFilename: 'js/chunks/[name].js'
  },
  resolve: {
    alias : {
      sass: path.resolve(__dirname, 'resources/sass'),
    },
  },
})

mix.sass('resources/sass/app.scss', 'public/css')
  .mergeManifest();

if (mix.inProduction()) {
  mix.version()
} else {
  mix.sourceMaps()
}
```
và thêm các script sau vào file **package.json** :
```
"dev": "npm run dev.js && npm run dev.css",
"watch": "npm run watch.js & npm run watch.css",
"prod": "npm run prod.js && npm run prod.css",
"watch.css": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --watch --hide-modules --env.mixfile=webpack.css.mix --config=node_modules/laravel-mix/setup/webpack.config.js",
"dev.css": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --env.mixfile=webpack.css.mix --config=node_modules/laravel-mix/setup/webpack.config.js",
"prod.css": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules --env.mixfile=webpack.css.mix --config=node_modules/laravel-mix/setup/webpack.config.js",
"watch.js": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --watch --hide-modules --env.mixfile=webpack.js.mix --config=node_modules/laravel-mix/setup/webpack.config.js",
"dev.js": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --env.mixfile=webpack.js.mix --config=node_modules/laravel-mix/setup/webpack.config.js",
"prod.js": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules --env.mixfile=webpack.js.mix --config=node_modules/laravel-mix/setup/webpack.config.js"
```

Các bạn để ý dòng **"watch": "npm run watch.js & npm run watch.css"** không phải mình viết nhầm đâu, với && câu lệnh sau sẽ chỉ được chạy khi câu lệnh thứ nhất hoàn thành và không có lỗi, câu lệnh thứ 2 mới được chạy. Còn với & câu lệnh sẽ được chạy đồng thời, tuy nhiên đó là trên unix thôi nhé, os khác mình không chắc.

Một vấn đề nữa, các bạn hãy xem lại những dòng này trong file mix 
```
mix.sass('resources/sass/app.scss', 'public/css')
  .mergeManifest();
```
và 
```
mix.js('resources/js/app.js', 'public/js')
  .extract()
  .mergeManifest();
```

nếu bạn thắc mắc **mergeManifest()** ở đâu ra thì mình sẽ giải thích ngay sau đây, trong laravel mix file **mix-manifest.json** dùng để map các file output được build trong **public_folder** của laravel, sẽ được **replace** mỗi lần bạn chạy file mix, nên nếu chúng ta chạy 2 file mix thì cái sau sẽ ghi đè lại file và helper function **mix()** các bạn dùng trong blade engine sẽ không thể trả về đúng đường dẫn được.
```
<script src="{{ mix('js/manifest.js') }}"></script>
<script src="{{ mix('js/vendor.js') }}"></script>
<script src="{{ mix('js/app.js') }}"></script>
```

Giải pháp cho vấn đề này là tạo plugin cho webpack để can thiệp vào quá trình ghi file, chúng ta sẽ đọc và lấy nội dung file cũ, merge với dữ liệu mới.
Mình tham khảo code đó từ thư viện này: https://github.com/kabbouchi/laravel-mix-merge-manifest
```
let mix = require('laravel-mix');
let ManifestPlugin = require('laravel-mix/src/webpackPlugins/ManifestPlugin');
let merge = require('lodash').merge;

/*
 * Because we compile css and js file in 2 seperated command, 
 * so to prevent mix-manifest.json is overwrited by follow occured command, this function help to merge it all.
*/

module.exports = (config) => {
  config.plugins.forEach((plugin, index) => {
    if (plugin instanceof ManifestPlugin) {
      config.plugins.splice(index, 1);
    }
  });

  config.plugins.push(new class {
    apply(compiler) {

      compiler.plugin('emit', (curCompiler, callback) => {
        let stats = curCompiler.getStats().toJson();

        try {
          Mix.manifest.manifest = merge(Mix.manifest.read(), Mix.manifest.manifest);
        } catch (e) {

        }

        Mix.manifest.transform(stats).refresh();
        callback();
      });
    }
  })
};
```

That's all. Hy vọng bài viết sẽ giúp ích cho các bạn khi gặp vấn đề này trong khi chờ đợi phiên bản webpack 5