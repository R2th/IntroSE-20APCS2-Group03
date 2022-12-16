![](https://images.viblo.asia/02ae8294-0a40-45ef-8d7f-fb57cbbda8fb.png)

Chào các bạn, bài viết này mình sẽ giới thiệu với các bạn kết hợp vue admin template vào một project laravel, và mình chọn một admin template khá đẹp là [CoreUi](https://coreui.io)
CoreUi cung cấp rất nhiều các verison khác nhau, không chỉ riêng Vue
* HTML5
* AJAX
* AngularJS
* Angular4
* React
* Vue

Bạn có thể trải nhiệm với link demo https://coreui.io/demo/Vue_Demo/
# Kết hợp Laravel với Coreui Vue Template
Đầu tiên ta cần khởi tạo project laravel, nếu bạn đã có sẵn một project laravel rồi thì hãy kết hợp trực tiếp vào project của bạn.
Chúng ta sẽ làm trên laravel 5.6 - phiên bản laravel mới nhất hiện tại và, ta sẽ khởi tạo project với tên `laravel-vue-coreui`

```
composer create-project laravel/laravel laravel-vue-coreui
```
Sau khi có project laravel, giờ ta sẽ clone rource code của teplate về, bạn có thể thấy link git của template trên trang chủ của nó

```
git clone https://github.com/mrholek/coreui-free-vue-admin-template
```
Sau khi clone xong, thư mục của template sẽ như sau

![](https://images.viblo.asia/93714935-33c9-4c7a-8ec3-6fc6ffc68969.png)

Sẽ có 2 bản là full và starter, ta sẽ sử dụng bản starter, về cơ bản source code của 2 bản là như nhau, chỉ khác bản full thì đầy đủ các components, còn bản starter thì chỉ gồm phần khung mà thôi

Bạn có thể chạy trực tiếp template bằng câu lệnh `npm install` sau đó `npm run dev`, nhưng đây chỉ là chạy demo thôi, việc ta cần làm là kết hợp nó vào laravel.

Để có thể chuyển được template vào laravel thì ta cũng phải hiểu cấu trúc của template đã,  về cơ bản source code của template nằm trong thư mục `src` và đây là thư mục mà ta chắc chắn sẽ phải sử dụng nó,  còn thư mục khác 
* `build`, `config` để cấu hình webpack, css loader
* `test` dùng để test
* `static` chứa file tài nguyên ảnh, các file tĩnh ...
* `src` thư mục chứa toàn bộ source code của template
* và một số file config check convention...

Ta chỉ quan tâm đến thư mục `src` và file `package.json`, thư mục `src` chứa code nên hiển nhiên ta phải sử dụng nó, `package.json` chứa các dependencies cần thiết cho template

Nhìn qua thì file `package.json` có vẻ khá tởm, quá nhiều `devDependencies`, nhưng ta không cần quan tâm vì nó chủ yếu nhằm mục đích test, check conventsion, đóng gói, biên dịch các fiile js, scss...

Việc test và check convension chưa cần thiết nên không cần thêm vào, với việc đóng gói các file js, scss thì đã có package `laravel-mix` của laravel lo nên cũng không cần nốt.

Kết quả là ta không cần quan tâm đến phần devDependencies nữa, chỉ cần quan tâm đến phần `dependencies` và toàn bộ các package này sẽ được copy sang file `package.json` của project laravel

Thư mục `src`

![](https://images.viblo.asia/fba93824-86d8-4ec8-acbb-7bf7dcc6d18f.png)


Xem qua một lượt source code, ta sẽ thấy mọi thứ bắt đầu từ file `main.js`, từ file này sẽ import các thư viện, component cần thiết để khởi tạo lên trang temlpate.

Tên các folder cũng đã nói lên nhiệm vụ và ý nghĩa của nó nên mình không giải thích nhiều. Mà chỉ tập trung vào việc chuyển nó sang project laravel, ta sẽ copy toàn bộ thư mục src này sang thư project laravel

Cụ thể sẽ copy vào thư mục `/resources/assets/js` và đổi tên thư mục `src` vừa copy thành `admin` (vì mình đang làm view template cho admin mà)

![](https://images.viblo.asia/1ba78eaa-d879-40f2-9f26-24e0063b2754.png)

Phần khoanh đỏ là phần thư mục `src` của vue template được copy vào và đổi tên thành `admin`

Tiếp theo mởi file `main.js` và thêm dòng `require('../bootstrap');`

```
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

require('../bootstrap');

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})

```

file `bootstrap.js` có sẵn của laravel dùng để import thư viện jquery, axios... cần thiết cho phát triển sau này

Giờ đến phần cấu hình `laravel-mix`, mở file  `webpack.mix.js` và thêm dòng code
```
mix.js('resources/assets/js/admin/main.js', 'public/js')
   .sass('resources/assets/js/admin/assets/scss/style.scss', 'public/css');
```

file `package.json`
```
{
    "private": true,
    "scripts": {
        "dev": "npm run development",
        "development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
        "watch": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
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
    },
    "dependencies": {
        "bootstrap-vue": "^2.0.0-rc.1",
        "vue-loader": "^14.2.2",
        "flag-icon-css": "^3.0.0",
        "font-awesome": "^4.7.0",
        "simple-line-icons": "^2.4.1",
        "style-loader": "^0.21.0",
        "vue-router": "^3.0.1"
    }
}
```
Có 1 một lưu ý nhỏ ở file `admin/assets/scss/style.scss`, ta sửa thành
```
// Override Boostrap variables
@import "bootstrap-variables";

// Import Bootstrap source files
@import "~bootstrap/scss/bootstrap";

// Override core variables
@import "core-variables";

// Import core styles
@import "core/core";

// Custom styles
@import "custom";
```

rồi chạy `npm install`  và `npm run dev`, khi hoàn tất sẽ thấy file `style.css` được build trng thư mục `public/css` và file `admin.js` được build trong thư mục `public/js.
Giờ chỉ cần ốp 2 file css và js vào html là xong, tạo file view trong `resources/views/admins/index.blade.php`

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>CoreUI - Open Source Bootstrap Admin Template</title>
    <link rel="shortcut icon" href="/static/img/favicon.png">
    <link href="{{ mix('css/style.css') }}" rel="stylesheet">
  </head>

  <!-- BODY options, add following classes to body to change options

  // Header options
  1. '.header-fixed'					- Fixed Header

  // Brand options
  1. '.brand-minimized'       - Minimized brand (Only symbol)

  // Sidebar options
  1. '.sidebar-fixed'					- Fixed Sidebar
  2. '.sidebar-hidden'				- Hidden Sidebar
  3. '.sidebar-off-canvas'		- Off Canvas Sidebar
  4. '.sidebar-minimized'			- Minimized Sidebar (Only icons)
  5. '.sidebar-compact'			  - Compact Sidebar

  // Aside options
  1. '.aside-menu-fixed'			- Fixed Aside Menu
  2. '.aside-menu-hidden'			- Hidden Aside Menu
  3. '.aside-menu-off-canvas'	- Off Canvas Aside Menu

  // Breadcrumb options
  1. '.breadcrumb-fixed'			- Fixed Breadcrumb

  // Footer options
  1. '.footer-fixed'					- Fixed footer

  -->

  <body class="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden">
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <script src="{{ mix('js/main.js') }}"></script>
  </body>
</html>
```
viết tạm cái route để hiển thị view admin vừa tạo
```
Route::get('/admin', function () {
    return view('admins.index');
});
```

Vậy là xong, khởi động server `php artisan ser`, và vào đường dẫn `http://localhost:8000/admin` và xem thành quả nhé

![](https://images.viblo.asia/e37934c2-b876-472e-aeb0-2c335bd7d7a8.png)

Bạn có thể tham khảo link github: https://github.com/ththth0303/laravel-vue-coreui