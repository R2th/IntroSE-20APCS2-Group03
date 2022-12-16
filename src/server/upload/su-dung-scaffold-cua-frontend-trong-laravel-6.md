Từ Laravel 6, scaffold của frontend được tách ra dưới dạng gói UI của Laravel.

Trong bài viết này sẽ mô tả cách thiết lập giao diện người dùng bằng Vue/Bootstrap, v.v.

### Install Laravel UI

Chạy composer require laravel/ui --dev để install Laravel UI package.

Sau khi chạy sẽ thêm artisan như sau:

```
ui
  ui:auth              Scaffold basic login and registration views and routes
```

Kiểm tra thử artisan ui --help.

```
Description:
  Swap the front-end scaffolding for the application

Usage:
  ui [options] [--] <type>

Arguments:
  type                   The preset type (bootstrap, vue, react)

Options:
      --auth             Install authentication UI scaffolding
      --option[=OPTION]  Pass an option to the preset command (multiple values allowed)
  -h, --help             Display this help message
  -q, --quiet            Do not output any message
  -V, --version          Display this application version
      --ansi             Force ANSI output
      --no-ansi          Disable ANSI output
  -n, --no-interaction   Do not ask any interactive question
      --env[=ENV]        The environment the command should run under
  -v|vv|vvv, --verbose   Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
```

Bản preset đang bao gồm bootstrap , vue , react.

Lần lượt cài đặt từng cái một theo trình tự như sau:

### Setup Bootstrap

Chạy artisan ui bootstrap.

```
$ artisan ui bootstrap
Bootstrap scaffolding installed successfully.
Please run "npm install && npm run dev" to compile your fresh scaffolding.
```

Kiểm tra file thay đổi.


```
diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@ -11,9 +11,12 @@
     },
     "devDependencies": {
         "axios": "^0.19",
+        "bootstrap": "^4.0.0",
         "cross-env": "^5.1",
+        "jquery": "^3.2",
         "laravel-mix": "^4.0.7",
         "lodash": "^4.17.13",
+        "popper.js": "^1.12",
         "resolve-url-loader": "^2.3.1",
         "sass": "^1.15.2",
         "sass-loader": "^7.1.0"
diff --git a/resources/js/bootstrap.js b/resources/js/bootstrap.js
--- a/resources/js/bootstrap.js
+++ b/resources/js/bootstrap.js
@@ -1,5 +1,18 @@
 window._ = require('lodash');
 
+/**
+ * We'll load jQuery and the Bootstrap jQuery plugin which provides support
+ * for JavaScript based Bootstrap features such as modals and tabs. This
+ * code may be modified to fit the specific needs of your application.
+ */
+
+try {
+    window.Popper = require('popper.js').default;
+    window.$ = window.jQuery = require('jquery');
+
+    require('bootstrap');
+} catch (e) {}
+
 /**
  * We'll load the axios HTTP library which allows us to easily issue requests
  * to our Laravel back-end. This library automatically handles sending the
diff --git a/resources/sass/app.scss b/resources/sass/app.scss
--- a/resources/sass/app.scss
+++ b/resources/sass/app.scss
@@ -1 +1,8 @@
-//
+// Fonts
+@import url('https://fonts.googleapis.com/css?family=Nunito');
+
+// Variables
+@import 'variables';
+
+// Bootstrap
+@import '~bootstrap/scss/bootstrap';
```

Bao gồm các nội dung thay đổi như trên.

Các cài đặt của package cần thiết và đọc css, js đã được thêm vào.


### Setup Vue

Chạy artisan ui vue.

```
$ artisan ui vue
Vue scaffolding installed successfully.
Please run "npm install && npm run dev" to compile your fresh scaffolding.
```


Kiểm tra file thay đổi.

```
diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@ -11,11 +11,16 @@
     },
     "devDependencies": {
         "axios": "^0.19",
+        "bootstrap": "^4.0.0",
         "cross-env": "^5.1",
+        "jquery": "^3.2",
         "laravel-mix": "^4.0.7",
         "lodash": "^4.17.13",
+        "popper.js": "^1.12",
         "resolve-url-loader": "^2.3.1",
-        "sass": "^1.15.2",
-        "sass-loader": "^7.1.0"
+        "sass": "^1.20.1",
+        "sass-loader": "7.*",
+        "vue": "^2.5.17",
+        "vue-template-compiler": "^2.6.10"
     }
 }
diff --git a/resources/js/app.js b/resources/js/app.js
--- a/resources/js/app.js
+++ b/resources/js/app.js
@@ -1 +1,32 @@
+/**
+ * First we will load all of this project's JavaScript dependencies which
+ * includes Vue and other libraries. It is a great starting point when
+ * building robust, powerful web applications using Vue and Laravel.
+ */
+
 require('./bootstrap');
+
+window.Vue = require('vue');
+
+/**
+ * The following block of code may be used to automatically register your
+ * Vue components. It will recursively scan this directory for the Vue
+ * components and automatically register them with their "basename".
+ *
+ * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
+ */
+
+// const files = require.context('./', true, /\.vue$/i)
+// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
+
+Vue.component('example-component', require('./components/ExampleComponent.vue').default);
+
+/**
+ * Next, we will create a fresh Vue application instance and attach it to
+ * the page. Then, you may begin adding components to this application
+ * or customize the JavaScript scaffolding to fit your unique needs.
+ */
+
+const app = new Vue({
+    el: '#app',
+});
diff --git a/resources/js/bootstrap.js b/resources/js/bootstrap.js
--- a/resources/js/bootstrap.js
+++ b/resources/js/bootstrap.js
@@ -1,5 +1,18 @@
 window._ = require('lodash');
 
+/**
+ * We'll load jQuery and the Bootstrap jQuery plugin which provides support
+ * for JavaScript based Bootstrap features such as modals and tabs. This
+ * code may be modified to fit the specific needs of your application.
+ */
+
+try {
+    window.Popper = require('popper.js').default;
+    window.$ = window.jQuery = require('jquery');
+
+    require('bootstrap');
+} catch (e) {}
+
 /**
  * We'll load the axios HTTP library which allows us to easily issue requests
  * to our Laravel back-end. This library automatically handles sending the
diff --git a/resources/sass/app.scss b/resources/sass/app.scss
--- a/resources/sass/app.scss
+++ b/resources/sass/app.scss
@@ -1 +1,8 @@
-//
+// Fonts
+@import url('https://fonts.googleapis.com/css?family=Nunito');
+
+// Variables
+@import 'variables';
+
+// Bootstrap
+@import '~bootstrap/scss/bootstrap';
diff --git a/webpack.mix.js b/webpack.mix.js
--- a/webpack.mix.js
+++ b/webpack.mix.js
@@ -12,4 +12,4 @@ const mix = require('laravel-mix');
  */
 
 mix.js('resources/js/app.js', 'public/js')
-    .sass('resources/sass/app.scss', 'public/css');
+   .sass('resources/sass/app.scss', 'public/css');
```


Setting của Vue đã được thêm vào bootstrap.


### Setup React

Chạy artisan ui react.

```
$ artisan ui react
React scaffolding installed successfully.
Please run "npm install && npm run dev" to compile your fresh scaffolding.
```

Kiểm tra file thay đổi.

```
diff --git a/package.json b/package.json
index 9fcb8ee..77f3e2c 100644
--- a/package.json
+++ b/package.json
@@ -10,10 +10,16 @@
         "production": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --no-progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
     },
     "devDependencies": {
+        "@babel/preset-react": "^7.0.0",
         "axios": "^0.19",
+        "bootstrap": "^4.0.0",
         "cross-env": "^5.1",
+        "jquery": "^3.2",
         "laravel-mix": "^4.0.7",
         "lodash": "^4.17.13",
+        "popper.js": "^1.12",
+        "react": "^16.2.0",
+        "react-dom": "^16.2.0",
         "resolve-url-loader": "^2.3.1",
         "sass": "^1.15.2",
         "sass-loader": "^7.1.0"
diff --git a/resources/js/app.js b/resources/js/app.js
index 40c55f6..a5f91ab 100644
--- a/resources/js/app.js
+++ b/resources/js/app.js
@@ -1 +1,15 @@
+/**
+ * First we will load all of this project's JavaScript dependencies which
+ * includes React and other helpers. It's a great starting point while
+ * building robust, powerful web applications using React + Laravel.
+ */
+
 require('./bootstrap');
+
+/**
+ * Next, we will create a fresh React component instance and attach it to
+ * the page. Then, you may begin adding components to this application
+ * or customize the JavaScript scaffolding to fit your unique needs.
+ */
+
+require('./components/Example');
diff --git a/resources/js/bootstrap.js b/resources/js/bootstrap.js
index d11586d..8eaba1b 100644
--- a/resources/js/bootstrap.js
+++ b/resources/js/bootstrap.js
@@ -1,5 +1,18 @@
 window._ = require('lodash');
 
+/**
+ * We'll load jQuery and the Bootstrap jQuery plugin which provides support
+ * for JavaScript based Bootstrap features such as modals and tabs. This
+ * code may be modified to fit the specific needs of your application.
+ */
+
+try {
+    window.Popper = require('popper.js').default;
+    window.$ = window.jQuery = require('jquery');
+
+    require('bootstrap');
+} catch (e) {}
+
 /**
  * We'll load the axios HTTP library which allows us to easily issue requests
  * to our Laravel back-end. This library automatically handles sending the
diff --git a/resources/sass/app.scss b/resources/sass/app.scss
index 8337712..3193ffa 100644
--- a/resources/sass/app.scss
+++ b/resources/sass/app.scss
@@ -1 +1,8 @@
-//
+// Fonts
+@import url('https://fonts.googleapis.com/css?family=Nunito');
+
+// Variables
+@import 'variables';
+
+// Bootstrap
+@import '~bootstrap/scss/bootstrap';
diff --git a/webpack.mix.js b/webpack.mix.js
index 8a923cb..cc075aa 100644
--- a/webpack.mix.js
+++ b/webpack.mix.js
@@ -11,5 +11,5 @@ const mix = require('laravel-mix');
  |
  */
 
-mix.js('resources/js/app.js', 'public/js')
-    .sass('resources/sass/app.scss', 'public/css');
+mix.react('resources/js/app.js', 'public/js')
+   .sass('resources/sass/app.scss', 'public/css');
```


Setting React đã được thêm vào bootstrap.


### Add custom presets

Nếu sử dụng Laravel UI có thể tạo custom scaffold.

Định nghĩa như sau cho service provider:

```
use Laravel\Ui\UiCommand;

UiCommand::macro('Custom UI name', function (UiCommand $command) {
    // Unique front-end scaffold…
});
```

Sau đó, bạn cũng có thể chuẩn bị riêng cho mình scaffold của frontend với tên custom artisan ui.