Như bài 1 của series mình có viết 1 bài build dự án với laravel và vue js đúng không.

Bên **Client** mình có dùng template **AdminLte**, nhưng mình làm 1 cách thủ công là xem trong phần core của template nó dùng thư viện gì rồi copy sang **package.json** để tải về, thật là tù đúng không, chẳng nhẽ nó dùng 1000 thư viện mình cũng phải tải 1000 thư viện về **note_modules** của mình,

Nhưng rất may là **Admin-Lte** có thể được cài đặt thông qua npm. Vì thế  chúng ta nên dùng nó như là một **node dependency.** chúng ta chỉ việc cài về và sử dụng thôi, Ngon lành quá phải không.

Chúng ta bắt đầu luôn nhé

# Cài đặt AdminLte

Cài đặt thông qua NPM
```js
npm install admin-lte --save
```
Cài đặt xong rồi đúng không thử mở package.json xem nhé
![](https://images.viblo.asia/c47897f3-ba83-4b76-8905-f035d06c0d97.png)
# Áp dụng vào dự án
Ok khi đã tải về rồi thì chúng ta require nó như 1 thư viện bình thường thôi :) Mình require nó trong file 
**resources/assets/admin/js/bootstrap.js** nhé

```js

try {
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');

    require('admin-lte');
} catch (e) {}
```

Như thế là chạy được rồi đấy, nhưng cứ từ từ mình refactor lại phần laravel-mix đã nhé
```js
mix.js('resources/assets/frontend/js/app.js', 'public/frontend/js')
  .js('resources/assets/admin/js/app.js', 'public/admin/js')
  .sass('resources/assets/frontend/sass/app.scss', 'public/frontend/css')
  .sass('resources/assets/admin/sass/app.scss', 'public/admin/css')
  .copyDirectory('resources/assets/admin/dist/img', 'public/dist/img')
  .styles([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/admin-lte/dist/css/AdminLTE.css',
    'node_modules/admin-lte/dist/css/skins/_all-skins.min.css',
  ], 'public/admin/lte/css/library.min.css')

  .scripts([
    'node_modules/admin-lte/dist/js/demo.js'
  ], 'public/admin/lte/js/library.min.js');

```
Giờ thì
```js
npm run dev
```
lại để xem thành quả nhé, chạy ngon đúng không
Giờ mình sẽ không lo thiếu thư viện gì rồi nhé
# Xóa dependencies và devDependencies
Sau gì áp dụng nó như 1 Depnedencies thì những cái ở bài đầu mình thêm vào là không cần thiết nữa đúng không, giờ mình chỉ cần xóa và **npm install** lại là được 

Những phần mình cần xóa đi 
## devDependencies
```js
{
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
}
```

Kết quả sẽ còn 
```js
    "devDependencies": {
        "axios": "^0.18",
        "bootstrap": "^4.0.0",
        "cross-env": "^5.1",
        "eslint": "^5.10.0",
        "jquery": "^3.2",
        "laravel-mix": "^2.0",
        "less": "^2.7.2",
        "lodash": "^4.17.4",
        "popper.js": "^1.12",
        "vue": "^2.5.7",
        "vuex": "^3.0.1"
    },
```
## dependencies
```js
{
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
        "pace": "0.0.4",
        "raphael": "^2.2.7",
        "select2": "^4.0.3",
        "slimscroll": "^0.9.1"
  }
```

Kết quả sẽ còn
```js
    "dependencies": {
        "@fortawesome/fontawesome-svg-core": "^1.2.7",
        "@fortawesome/free-solid-svg-icons": "^5.4.2",
        "@fortawesome/vue-fontawesome": "^0.1.2",
        "bootstrap": "^3.3.7",
        "admin-lte": "^2.4.8",
        "chokidar-cli": "^1.2.1",
        "npm": "^6.4.1",
        "vue-router": "^3.0.1",
        "vue-toasted": "^1.1.25"
    }
```

Sau khi xóa hết trong **package.json** mình xóa luôn **node_modules** rồi  **npm install** lại nhé

OK xong hết các bước rồi 
```js
npm run dev
```
lại từ đầu để xem thành quả nhé
## Pull Request
https://github.com/tranvanmy/ForumMTV/pull/4/files
# Kết Luận
Sau khi refactor lại, code của chúng ta khá gọn và clear rồi đúng không, bài của mình hôm nay đến đây thôi, Bài tiếp theo mình sẽ thiết kế phần backend theo **repository** nhé, mọi người nhớ like và upvote để mình cố động lực làm nốt series nhé