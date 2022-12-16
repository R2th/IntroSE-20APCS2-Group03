Chào mọi người hôm nay mình lại đến tháng đây,hôm nay mình sẽ giới thiệu cho các bạn cách xây dựng 1 app SPA sử dụng Vuejs (Vuex) một cách chuẩn nhất nhé. =)) 

# Xây dựng khung dự án với Laravel Và VueJs
Trong project này, vì mục đích chính là kết hợp Laravel + VueJS (và vì Laravel đã support sẵn VueJS) nên mình sẽ xây dựng VueJS App ngay trong thư mục project của Laravel.

Nếu bạn đã từng tìm hiểu qua thì đây chính là dạng viết code Vue trong resources/assets/js (đối với Laravel 5.6 về trước) hay resources/js (đối với Laravel 5.7 đã thay đổi cấu trúc thư mục resources) kết hợp sử dụng Laravel Mix.


-----


Đồng thời, trong project này, chúng ta cũng học cách sử dụng các thư viện hay dùng để xây dựng các ứng dụng SPA phức tạp như:

- **Vue-router**: giúp định tuyến trong ứng dụng (định nghĩa các route và mapping nó với các Vue component).

- **Axios**: một HTTP client, giúp gửi nhận các HTTP request (GET, POST, PUT, DELETE, ...). Axios là một lựa chọn tốt hơn so với Vue-resource (cũng là một HTTP client cho VueJS nhưng đã ngừng hỗ trợ).

- **VueX**: thư viện mạnh mẽ của VueJS giúp lưu trữ và quản lý các trạng thái (state).
- **Docker**: Để xây dựng môi trường dev
- **Laravel Permission**: Để phân chia role cho người dùng
- **API Authentication (Passport)** Xác thực người dùng

Thôi lan man vậy đủ rồi, đầu tiên mình cài đặt Laravel phát nhé
```php
composer create-project --prefer-dist laravel/laravel Dev "5.6.*"
```
Riêng tôi vẫn cứ thích dùng bản 5.6 hơn là 5.7
Tải về ok rồi chứ, giờ thì cd vào thư mục Dev vừa tải về rồi
```
composer install
npm install
```
rồi chạy
```php
php artisan serve
```
=> Mở và chạy app ở địa chỉ: http://localhost:8000

Ngon xong bước đầu tiên rồi . :))

B2. Tải AdminLte về đã nhé link demo https://adminlte.io/themes/AdminLTE/index2.html

Link Tải
[AdminLte](https://github.com/almasaeed2010/AdminLTE/releases/tag/v2.4.4)
Tải về ta Cd vào thư mục AdminLTE  rồi chạy
```npm install```
rồi xem qua vài thư mục nha

![](https://images.viblo.asia/81314daa-963b-4aea-8924-592a6167abae.png)

Ở đây ta chỉ quan tâm thư mục **Dist**, **pages**, và file **package.json** thôi nha
+ Dist để lưu css, img, js của template
+ pages là lưu phần giao diện
+ package.json để đăng ký những **dependencies** sử dụng cho thư viện

OK giờ ta bắt đầu ghép template AdminLte vào Laravel nhé
## Cài đặt Laravel Mix và thiết lập view index
Mở file package.json ta sẽ thấy nội dung như sau
```js
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
        "cross-env": "^5.1",
        "jquery": "^3.2",
        "laravel-mix": "^2.0",
        "lodash": "^4.17.5",
        "popper.js": "^1.12",
        "vue": "^2.5.7"
    }
}
```
Ta thấy Laravel đã thiết lập sẵn các thư viện như laravel-mix, vue, axios, jquery, bootstrap và một số thư viện như lodash (dùng để thao tác với mảng), popperjs (thư viện hỗ trợ các thành phần như Tooltips, popover, ...).


Công việc đơn giản tiếp theo là chạy **npm install** để cài đặt các thư viện này:
Mở file **resources/views/welcome.blade.php** và thay đổi code:

```php
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" value="{{ csrf_token() }}">
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    </head>
    <body>
        <div id="app">
            <example-component></example-component>
        </div>

        <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
```
Tiếp theo chạy:
```js
npm run watch
```
npm run watch để Laravel mix thực hiện build các tài nguyên JS, CSS.

Sau đó refresh lại địa chỉ http://localhost:8000 ta sẽ thấy giao diện có nội dung của file **resources/js/components/ExampleComponent.vu**e như sau:

![](https://images.viblo.asia/493841e7-b619-4575-ac4b-f6c3575be401.png)

**Một số điểm chúng ta cần phải note lại:**
- Command line chạy php artisan serve không được tắt đi nhé (Nếu bạn config virtual host thì ko cần quan tâm cái này).

- Chúng ta dùng npm run watch thay vì npm run dev. Câu lệnh cũng đã rất tường minh rồi, khi chúng ta thay đổi code và save, run watch sẽ tự động phát hiện thay đổi và compile lại code, chúng ta không phải chạy lại lệnh nữa. Và Command line chạy npm run watch cũng giữ chạy song song với command line chạy php artisan serve.

- Bạn thắc mắc laravel mix build ra file như thế nào? Mở file webpack.mix.js trong thư mục root của project, ta thấy nội dùng như sau:
```js
const mix = require('laravel-mix');

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

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
```
Như ta thấy, laravel sẽ build code trong file 

**resources/js/app.js => public/js,**

**resources/sass/app.scss => public/css**,
đây là 2 file đích cuối cùng, đó là lý do ta khai báo 2 file này trong view welcome.blade.php. Nếu bạn muốn đổi tên file hay đổi thư mục thì sửa trong file này và chạy lại npm run watch nhé.
## Thêm giao diện AdminLte
OK ở trên các bạn đã hiểu hết luồng rồi đúng không giờ thì thêm giao diện nhé.
Trước tiên ta tạo 1 thưc mục **resource/assets/admin** nhé
sau đó chúng ta chúng ta copy thư mục **dist** trong AdminLte  paste vào trong thư mục **admin** vừa mới tạo.

![](https://images.viblo.asia/3c88b0ee-56ba-4aeb-8e41-34dc37574979.png)

Như hình trên nhé, và nhớ di chuyển luôn thư mục js với sass vào thư mục admin vừa mới tạo nhé.
Giờ thì chúng ta quay ra file webpack.mix.js để  sửa lại 1 số chỗ .
```js
mix.js('resources/assets/admin/js/app.js', 'public/admin/js')
  .sass('resources/assets/admin/sass/app.scss', 'public/admin/css')
  .copyDirectory('resources/assets/admin/dist/img', 'public/dist/img')
```
OK tạm thế nhé, giờ mình xem qua file index.html của Adminlte nhé, chúng ta sẽ thấy nó import rất nhiều css và js của các thư viện, mình có lọc ra cho mn đỡ mất công rồi nhé, giờ thì mình paste vào fiel package.json của mình nhé
```js
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
        "vue": "^2.5.7",
        "vuex": "^3.0.1",
        "R2": "^1.4.3",
        "grunt": "^0.4.5",
        "grunt-bootlint": "^0.9.1",
        "grunt-contrib-clean": "^0.6.0",
        "grunt-contrib-concat": "^1.0.1",
        "grunt-contrib-csslint": "^0.5.0",
        "grunt-contrib-cssmin": "^0.12.2",
        "grunt-contrib-jshint": "^0.11.3",
        "grunt-contrib-less": "^0.12.0",
        "grunt-contrib-uglify": "^0.7.0",
        "grunt-contrib-watch": "^0.6.1",
        "grunt-cssjanus": "^0.2.4",
        "grunt-image": "^1.5.2",
        "grunt-includes": "^0.4.5",
        "grunt-jscs": "^3.0.1",
        "grunt-less": "^0.1.7",
        "grunt-notify": "^0.4.5",
        "grunt-text-replace": "^0.4.0",
        "less": "^2.7.2"
    },
    "dependencies": {
        "@fortawesome/fontawesome-svg-core": "^1.2.7",
        "@fortawesome/free-solid-svg-icons": "^5.4.2",
        "@fortawesome/vue-fontawesome": "^0.1.2",
        "bootstrap": "^3.3.7",
        "bootstrap-colorpicker": "^2.5.1",
        "bootstrap-datepicker": "^1.7.0",
        "bootstrap-daterangepicker": "^2.1.25",
        "bootstrap-slider": "^9.8.0",
        "bootstrap-timepicker": "^0.5.2",
        "chart.js": "1.0.*",
        "ckeditor": "^4.7.0",
        "datatables.net": "^1.10.15",
        "datatables.net-bs": "^1.10.15",
        "fastclick": "^1.0.6",
        "flot": "^0.8.0-alpha",
        "font-awesome": "^4.7.0",
        "fullcalendar": "^3.4.0",
        "i": "^0.3.6",
        "inputmask": "^3.3.7",
        "ion-rangeslider": "^2.2.0",
        "ionicons": "^3.0.0",
        "jquery": "^3.2.1",
        "jquery-knob": "^1.2.11",
        "jquery-sparkline": "^2.4.0",
        "jquery-ui": "^1.12.1",
        "jvectormap": "^1.2.2",
        "moment": "^2.18.1",
        "morris.js": "^0.5.0",
        "npm": "^6.4.1",
        "pace": "0.0.4",
        "raphael": "^2.2.7",
        "select2": "^4.0.3",
        "slimscroll": "^0.9.1",
        "vue-router": "^3.0.1",
        "vue-toasted": "^1.1.25"
    }
}

```
Copy xong ta chạy npm install để tải thư viện về nhé sau đó vào file webpack.mix.js thay đổi như sau
```js
mix.js('resources/assets/admin/js/app.js', 'public/admin/js')
  .sass('resources/assets/admin/sass/app.scss', 'public/admin/css')
  .copyDirectory('resources/assets/admin/dist/img', 'public/dist/img')
  .styles([
    'node_modules/morris.js/morris.css',
    'node_modules/jvectormap/jquery-jvectormap.css',
    'node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css',
    'node_modules/bootstrap-daterangepicker/daterangepicker.css',
    'node_modules/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/Ionicons/css/ionicons.min.css',
    'resources/assets/admin/dist/css/AdminLTE.min.css',
    'resources/assets/admin/dist/css/skins/_all-skins.min.css',
    'resources/assets/admin/dist/css/bootstrap3-wysihtml5.min.css',
  ], 'public/admin/lte/css/library.min.css')

  .scripts([
    'node_modules/jquery-ui/jquery-ui.min.js',
    'node_modules/raphael/raphael.min.js',
    'node_modules/raphael/raphael.min.js', 
    'node_modules/morris.js/morris.min.js',
    'node_modules/jquery-sparkline/dist/jquery.sparkline.min.js',
    'node_modules/jvectormap/jquery-jvectormap-1.2.2.min.js',
    'node_modules/jvectormap/jquery-jvectormap-world-mill-en.js',
    'node_modules/jquery-knob/dist/jquery.knob.min.js',
    'node_modules/moment/min/moment.min.js',
    'node_modules/bootstrap-daterangepicker/daterangepicker.js',
    'node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
    'node_modules/bootstrap-daterangepicker/daterangepicker.js',
    'node_modules/jquery-slimscroll/jquery.slimscroll.min.js',
    'node_modules/fastclick/lib/fastclick.js',
    'resources/assets/admin/dist/js/adminlte.min.js',
    'resources/assets/admin/dist/js/pages/dashboard.js',
    'resources/assets/admin/dist/js/demo.js',
    'resources/assets/admin/dist/js/bootstrap3-wysihtml5.all.min.js',
  ], 'public/admin/lte/js/library.min.js');


```
Và **npm run dev** lại nhé, giờ thì chúng ta đã có 2 file

+ **public/admin/lte/css/library.min.css**
+ **public/admin/lte/js/library.min.js**
Full thư viện luôn, giờ cài cắm cái gì cũng chạy ngon hết =))

Giờ ta thay đổi tý file welcome.blade.php nhé. ta đổi thành index.blade.php nhé và tạo 1 thư mục admin rồi move nó vào đấy nhé
![](https://images.viblo.asia/1c0a2b40-d7e7-49c9-8367-17bc596c4c55.png)

sau đó thay đổi tý nhé
```php
<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <meta name="csrf-token" value="{{ csrf_token() }}">
        <title>Admin</title>
        <link href="{{ asset('admin/css/app.css') }}" rel="stylesheet">
        <link href="{{ asset('admin/lte/css/library.min.css') }}" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
    </head>
    <body class="hold-transition skin-blue sidebar-mini">
        <div id="app"></div>

        <script src="{{ asset('admin/js/app.js') }}"></script>
        <script src="{{ asset('admin/lte/js/library.min.js') }}"></script>
    </body>
</html>
```
À nhớ thay đổi ở file **web.php** nhé
```php
Route::any('{all}', function () {
    return view('admin/index');
})->where(['all' => '.*']);

```
## Tạo component
Ta tạo 1 thư mục component trong thư mục **asset/admin/js** và tạm thời sẽ chia các thư mục như sau

![](https://images.viblo.asia/12e957f7-87b5-41de-b3af-44fe3db522ec.png)
sau đó tạo các file .vue ở trong mỗi thư mục nhé

**resources/admin/js/components/aside/Aside.vue**
```js
<template>
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- Sidebar user panel -->
            <div class="user-panel">
                <div class="pull-left image">
                    <img src="/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
                </div>
                <div class="pull-left info">
                    <p>Tran van my</p>
                    <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                </div>
            </div>
            <!-- search form -->
            <form action="#" method="get" class="sidebar-form">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="Search...">
                    <span class="input-group-btn">
                                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                                </button>
                              </span>
                </div>
            </form>
            <!-- /.search form -->
            <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul class="sidebar-menu" data-widget="tree">
                <li class="header">MAIN NAVIGATION</li>
                <li class="header">LABELS</li>
                <li><a href="#"><i class="fa fa-circle-o text-red"></i> <span>Important</span></a></li>
                <li><a href="#"><i class="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>
                <li><a href="#"><i class="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li>
            </ul>
        </section>
        <!-- /.sidebar -->
    </aside>
</template>

<script>
    export default {
        name: "AppAside"
    };
</script>

```
**resources/admin/js/components/breadcrumd/Breadcrumd.vue**
```js
<template>
    <section class="content-header">
      <h1>
        Dashboard
        <small>Control panel</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Dashboard</li>
      </ol>
    </section>
</template>

<script>
export default {
    name: "AppBreadcrumd",
};
</script>
```
**resources/admin/js/components/control_siderbar/ControlSiderbar.vue**
```js
<template>
    <aside class="control-sidebar control-sidebar-dark">
        <!-- Create the tabs -->
        <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
            <li><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
            <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
            <!-- Home tab content -->
            <div class="tab-pane" id="control-sidebar-home-tab">
                <h3 class="control-sidebar-heading">Recent Activity</h3>
                <ul class="control-sidebar-menu">
                    <li>
                        <a href="javascript:void(0)">
                            <i class="menu-icon fa fa-birthday-cake bg-red"></i>
    
                            <div class="menu-info">
                                <h4 class="control-sidebar-subheading">Langdon's Birthday</h4>
    
                                <p>Will be 23 on April 24th</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            <i class="menu-icon fa fa-user bg-yellow"></i>
    
                            <div class="menu-info">
                                <h4 class="control-sidebar-subheading">Frodo Updated His Profile</h4>
    
                                <p>New phone +1(800)555-1234</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            <i class="menu-icon fa fa-envelope-o bg-light-blue"></i>
    
                            <div class="menu-info">
                                <h4 class="control-sidebar-subheading">Nora Joined Mailing List</h4>
    
                                <p>nora@example.com</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            <i class="menu-icon fa fa-file-code-o bg-green"></i>
    
                            <div class="menu-info">
                                <h4 class="control-sidebar-subheading">Cron Job 254 Executed</h4>
    
                                <p>Execution time 5 seconds</p>
                            </div>
                        </a>
                    </li>
                </ul>
                <!-- /.control-sidebar-menu -->
    
                <h3 class="control-sidebar-heading">Tasks Progress</h3>
                <ul class="control-sidebar-menu">
                    <li>
                        <a href="javascript:void(0)">
                            <h4 class="control-sidebar-subheading">
                                Custom Template Design
                                <span class="label label-danger pull-right">70%</span>
                            </h4>
    
                            <div class="progress progress-xxs">
                                <div class="progress-bar progress-bar-danger" style="width: 70%"></div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            <h4 class="control-sidebar-subheading">
                                Update Resume
                                <span class="label label-success pull-right">95%</span>
                            </h4>
    
                            <div class="progress progress-xxs">
                                <div class="progress-bar progress-bar-success" style="width: 95%"></div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            <h4 class="control-sidebar-subheading">
                                Laravel Integration
                                <span class="label label-warning pull-right">50%</span>
                            </h4>
    
                            <div class="progress progress-xxs">
                                <div class="progress-bar progress-bar-warning" style="width: 50%"></div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            <h4 class="control-sidebar-subheading">
                                Back End Framework
                                <span class="label label-primary pull-right">68%</span>
                            </h4>
    
                            <div class="progress progress-xxs">
                                <div class="progress-bar progress-bar-primary" style="width: 68%"></div>
                            </div>
                        </a>
                    </li>
                </ul>
                <!-- /.control-sidebar-menu -->
    
            </div>
            <!-- /.tab-pane -->
            <!-- Stats tab content -->
            <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
            <!-- /.tab-pane -->
            <!-- Settings tab content -->
            <div class="tab-pane" id="control-sidebar-settings-tab">
                <form method="post">
                    <h3 class="control-sidebar-heading">General Settings</h3>
    
                    <div class="form-group">
                        <label class="control-sidebar-subheading">
                  Report panel usage
                  <input type="checkbox" class="pull-right" checked>
                </label>
    
                        <p>
                            Some information about this general settings option
                        </p>
                    </div>
                    <!-- /.form-group -->
    
                    <div class="form-group">
                        <label class="control-sidebar-subheading">
                  Allow mail redirect
                  <input type="checkbox" class="pull-right" checked>
                </label>
    
                        <p>
                            Other sets of options are available
                        </p>
                    </div>
                    <!-- /.form-group -->
    
                    <div class="form-group">
                        <label class="control-sidebar-subheading">
                  Expose author name in posts
                  <input type="checkbox" class="pull-right" checked>
                </label>
    
                        <p>
                            Allow the user to show his name in blog posts
                        </p>
                    </div>
                    <!-- /.form-group -->
    
                    <h3 class="control-sidebar-heading">Chat Settings</h3>
    
                    <div class="form-group">
                        <label class="control-sidebar-subheading">
                  Show me as online
                  <input type="checkbox" class="pull-right" checked>
                </label>
                    </div>
                    <!-- /.form-group -->
    
                    <div class="form-group">
                        <label class="control-sidebar-subheading">
                  Turn off notifications
                  <input type="checkbox" class="pull-right">
                </label>
                    </div>
                    <!-- /.form-group -->
    
                    <div class="form-group">
                        <label class="control-sidebar-subheading">
                  Delete chat history
                  <a href="javascript:void(0)" class="text-red pull-right"><i class="fa fa-trash-o"></i></a>
                </label>
                    </div>
                    <!-- /.form-group -->
                </form>
            </div>
            <!-- /.tab-pane -->
        </div>
    </aside>
</template>

<script>
    export default {
        name: "AppControlSiderbar",
    };
</script>

```
**resources/admin/js/components/footer/Footer.vue**
```js
<template>
  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      <b>Version</b> 2.4.0
    </div>
    <strong>Copyright &copy; 2014-2016 <a href="https://adminlte.io">MTV</a>.</strong> All rights
    reserved.
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

```
**resources/admin/js/components/header/Header.vue**
```js
<template>
<header class="main-header">
    <!-- Logo -->
    <a  href="#" @click="link()" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>M</b>TV</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>Forum</b>MTV</span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
                <!-- Messages: style can be found in dropdown.less-->
                <li class="dropdown messages-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-envelope-o"></i>
              <span class="label label-success">4</span>
            </a>
                    <ul class="dropdown-menu">
                        <li class="header">You have 4 messages</li>
                        <li>
                            <!-- inner menu: contains the actual data -->
                            <ul class="menu">
                                <li>
                                    <!-- start message -->
                                    <a href="#">
                      <div class="pull-left">
                        <img src="/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
                      </div>
                      <h4>
                        Support Team
                        <small><i class="fa fa-clock-o"></i> 5 mins</small>
                      </h4>
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                                </li>
                                <!-- end message -->
                                <li>
                                    <a href="#">
                      <div class="pull-left">
                        <img src="dist/img/user3-128x128.jpg" class="img-circle" alt="User Image">
                      </div>
                      <h4>
                        AdminLTE Design Team
                        <small><i class="fa fa-clock-o"></i> 2 hours</small>
                      </h4>
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                                </li>
                                <li>
                                    <a href="#">
                      <div class="pull-left">
                        <img src="dist/img/user4-128x128.jpg" class="img-circle" alt="User Image">
                      </div>
                      <h4>
                        Developers
                        <small><i class="fa fa-clock-o"></i> Today</small>
                      </h4>
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                                </li>
                                <li>
                                    <a href="#">
                      <div class="pull-left">
                        <img src="dist/img/user3-128x128.jpg" class="img-circle" alt="User Image">
                      </div>
                      <h4>
                        Sales Department
                        <small><i class="fa fa-clock-o"></i> Yesterday</small>
                      </h4>
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                                </li>
                                <li>
                                    <a href="#">
                      <div class="pull-left">
                        <img src="dist/img/user4-128x128.jpg" class="img-circle" alt="User Image">
                      </div>
                      <h4>
                        Reviewers
                        <small><i class="fa fa-clock-o"></i> 2 days</small>
                      </h4>
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="footer"><a href="#">See All Messages</a></li>
                    </ul>
                </li>
                <!-- Notifications: style can be found in dropdown.less -->
                <li class="dropdown notifications-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-bell-o"></i>
              <span class="label label-warning">10</span>
            </a>
                    <ul class="dropdown-menu">
                        <li class="header">You have 10 notifications</li>
                        <li>
                            <!-- inner menu: contains the actual data -->
                            <ul class="menu">
                                <li>
                                    <a href="#">
                      <i class="fa fa-users text-aqua"></i> 5 new members joined today
                    </a>
                                </li>
                                <li>
                                    <a href="#">
                      <i class="fa fa-warning text-yellow"></i> Very long description here that may not fit into the page and may cause design problems
                    </a>
                                </li>
                                <li>
                                    <a href="#">
                      <i class="fa fa-users text-red"></i> 5 new members joined
                    </a>
                                </li>
                                <li>
                                    <a href="#">
                      <i class="fa fa-shopping-cart text-green"></i> 25 sales made
                    </a>
                                </li>
                                <li>
                                    <a href="#">
                      <i class="fa fa-user text-red"></i> You changed your username
                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="footer"><a href="#">View all</a></li>
                    </ul>
                </li>
                <!-- Tasks: style can be found in dropdown.less -->
                <li class="dropdown tasks-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-flag-o"></i>
              <span class="label label-danger">9</span>
            </a>
                    <ul class="dropdown-menu">
                        <li class="header">You have 9 tasks</li>
                        <li>
                            <!-- inner menu: contains the actual data -->
                            <ul class="menu">
                                <li>
                                    <!-- Task item -->
                                    <a href="#">
                      <h3>
                        Design some buttons
                        <small class="pull-right">20%</small>
                      </h3>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span class="sr-only">20% Complete</span>
                        </div>
                      </div>
                    </a>
                                </li>
                                <!-- end task item -->
                                <li>
                                    <!-- Task item -->
                                    <a href="#">
                      <h3>
                        Create a nice theme
                        <small class="pull-right">40%</small>
                      </h3>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-green" style="width: 40%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span class="sr-only">40% Complete</span>
                        </div>
                      </div>
                    </a>
                                </li>
                                <!-- end task item -->
                                <li>
                                    <!-- Task item -->
                                    <a href="#">
                      <h3>
                        Some task I need to do
                        <small class="pull-right">60%</small>
                      </h3>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-red" style="width: 60%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span class="sr-only">60% Complete</span>
                        </div>
                      </div>
                    </a>
                                </li>
                                <!-- end task item -->
                                <li>
                                    <!-- Task item -->
                                    <a href="#">
                      <h3>
                        Make beautiful transitions
                        <small class="pull-right">80%</small>
                      </h3>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-yellow" style="width: 80%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span class="sr-only">80% Complete</span>
                        </div>
                      </div>
                    </a>
                                </li>
                                <!-- end task item -->
                            </ul>
                        </li>
                        <li class="footer">
                            <a href="#">View all tasks</a>
                        </li>
                    </ul>
                </li>
                <!-- User Account: style can be found in dropdown.less -->
                <li class="dropdown user user-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="/dist/img/user2-160x160.jpg" class="user-image" alt="User Image">
              <span class="hidden-xs">Tran Van My</span>
            </a>
                    <ul class="dropdown-menu">
                        <!-- User image -->
                        <li class="user-header">
                            <img src="/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">

                            <p>
                                Tran Van My - Web Developer
                                <small>2018</small>
                            </p>
                        </li>
                        <!-- Menu Body -->
                        <li class="user-body">
                            <div class="row">
                                <div class="col-xs-4 text-center">
                                    <a href="#">Followers</a>
                                </div>
                                <div class="col-xs-4 text-center">
                                    <a href="#">Sales</a>
                                </div>
                                <div class="col-xs-4 text-center">
                                    <a href="#">Friends</a>
                                </div>
                            </div>
                            <!-- /.row -->
                        </li>
                        <!-- Menu Footer-->
                        <li class="user-footer">
                            <div class="pull-left">
                                <a href="#" class="btn btn-default btn-flat">Profile</a>
                            </div>
                            <div class="pull-right">
                                <a href="#" class="btn btn-default btn-flat">Sign out</a>
                            </div>
                        </li>
                    </ul>
                </li>
                <!-- Control Sidebar Toggle Button -->
                <li>
                    <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
                </li>
            </ul>
        </div>
    </nav>
</header>
</template>

<script>
export default {
    name: "AppHeader",
};
</script>

```
OK giờ ở file  App.vue ta import các component này vào nhé
```js
<template>
	<div class="wrapper" style="position: relative">
		<app-header></app-header>
		<app-aside></app-aside>
		<div class="content-wrapper">
			<app-breadcrumd :list="list"></app-breadcrumd>
				<section class="content">
					<router-view></router-view>
				</section>
		</div>
		<app-footer></app-footer>
		<app-control-siderbar></app-control-siderbar>
		<div class="control-sidebar-bg"></div>
	</div>
</template>

<script>
	import AppHeader from "*/components/header/Header";
	import AppAside from "*/components/aside/Aside";
	import AppBreadcrumd from "*/components/breadcrumb/Breadcrumb";
	import AppFooter from "*/components/footer/Footer";
	import AppControlSiderbar from "*/components/control_siderbar/ControlSiderbar";

	export default {
		name: "App",
		components: {
			AppHeader,
			AppAside,
			AppBreadcrumd,
			AppControlSiderbar,
			AppFooter,
		}
	}
</script>
```
Trong App.vue, thẻ <router-view> rất quan trọng. Chắc bạn cũng đoán được ý nghĩa của thẻ này. Đây là chỗ được Vue-router xử lý và đưa vào các nội dung là các component tùy thuộc vào đường dẫn. Nó cũng tương tự như khi chúng ta làm việc với @yield trong Laravel blade.

Tuy nhiên tạm thời ta comment <router-view> lại, ta sẽ bỏ comment khi cài đặt vue-router và thiết lập một số config ở bước dưới
## Thay đổi điểm bắt đầu của Vue App
Nơi bắt đầu của VueJS khi chạy app chính là resources/admin/js/app.js, ta thấy nội dung như sau:
```js
require('./bootstrap');

window.Vue = require('vue');

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app'
});
```
require('./bootstrap') là để tải file bootstrap.js, file này nhằm nạp vào ứng dụng các thư viện đã install như jQuery, bootstrap, axios, thiết lập CSRF-Token.

Tiếp đó đăng ký global component **<example-component>**.

Chúng ta sẽ thay đổi code trong resources/admin/js/app.js thành như sau:
```js
require('./bootstrap');

window.Vue = require('vue');

import App from './App.vue';

const app = new Vue({
    el: '#app',
    render: h => h(App)
});
```

OK, giờ chúng ta vào lại http://localhost:8000 và xem thành quả nhé =)) (nhớ chạy **npm run dev** nhé)
# Kết thúc
Bài có vẻ dài rồi , tạm dừng ở đây nhé sang bài tiếp theo mình sẽ hướng dẫn
**Cài đặt Vue-router và xây dựng trang con** nhé