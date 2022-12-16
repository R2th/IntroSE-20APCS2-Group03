# Mở đầu
&nbsp;&nbsp;&nbsp;&nbsp;Dân IT chúng ta luôn phải thay đổi, luôn phải cập nhật, tìm tòi những cái mới...Mình cũng vậy, sau một thời gian tìm hiểu reactjs thì hôm nay mình lại tiếp tục tìm hiểu công nghệ khác. Đó chính là `vuejs`. Trong bài viết này mình cùng tạo một project ban đầu của sự kết hợp `vuejs với laravel`.
# Nội dung
**1. Cài đặt dự án bằng framework laravel (framwork php)** 

**2. Cài đặt vuejs**

**3. Tìm hiểu sơ qua về cấu trúc vuejs**
### 1. Cài đặt dự án bằng framework laravel (framwork php)

- Yêu cầu cấu hình của framework này có thể chạy được là:

```
- PHP >= 7.1.3

- BCMath PHP Extension

- Ctype PHP Extension

- JSON PHP Extension

- Mbstring PHP Extension

- OpenSSL PHP Extension

- PDO PHP Extension

- Tokenizer PHP Extension

- XML PHP Extension
```
đó là vậy đó các bạn, nhưng không sao bạn cứ cài bằng câu lệnh thiếu cái nào thì sẽ có thông báo cài thêm

&nbsp;&nbsp;&nbsp;&nbsp;Đây là câu mình hay dùng 
> composer create-project --prefer-dist laravel/laravel shop

&nbsp;&nbsp;&nbsp;&nbsp;Cái này được viết trong terminal nhé. Sau khi chạy xong thì chúng ta có một dự án bằng laravel rồi.
### 2. Cài đặt vuejs
&nbsp;&nbsp;&nbsp;&nbsp;Ở bài lần này mình chưa cấu hình cho project để chạy với DB mà chỉ đơn thuần dựa vào đó để chạy `vuejs` thôi nên khi cài xong `laravel` bước tiếp theo chúng ta vào bên trong project và dùng lệnh
> npm install

Sau khi chạy xong ta sẽ có một cây thư mục như dưới
![Folder vuejs](https://images.viblo.asia/132a32af-c136-43c3-91a5-d766b8e93c97.PNG)

&nbsp;&nbsp;&nbsp;&nbsp;Toàn bộ phần code của `vuejs` sẽ nằm trong `resources/js`
Giờ chúng ta sẽ đi cài đặt và để chạy được giao diện đầu tiên dùng với `vuejs`

&nbsp;&nbsp;&nbsp;&nbsp;Đầu tiên bạn vào `resources/views` tạo một file là `index.blade.php` và file đó có nội dung như sau
```html
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>
    <link rel="stylesheet" type="text/css" href="/css/app.css">
</head>
<body>
<div id="app">
    <root></root>
</div>
<script src="/js/app.js"></script>
</body>
</html>
```

Mục đích của file này là nhúng `vuejs`.
```html
<div id="app">
    <root></root>
</div>
```
đoạn này chính là đoạn gọi `component` vào để chạy này

tiếp theo sửa file router để khi chạy có thể trỏ đến file `index` này
bạn mở `routers/web.php` và sửa file thành 
```php
<?php

Route::get('/', function () {
    return view('index');
});

```

tiếp đến là file `resources/js/app.js`
```js
require('./bootstrap');

window.Vue = require('vue');

Vue.component('root', require('./components/ExampleComponent.vue').default);

const app = new Vue({
    el: '#app',
});

```
&nbsp;&nbsp;&nbsp;&nbsp;Đoạn code này là khởi tạo `vuejs`

rồi giờ chúng ta sẽ ra đc kết quả hiển thị ra..nội dung hiển thị ra chính là nội dung trong `resources/js/components/ExampleComponent.vue`

![](https://images.viblo.asia/249f9e72-67d9-4e37-8051-607efc146bb8.PNG)

### 3. Tìm hiểu sơ qua về cấu trúc vuejs

&nbsp;&nbsp;&nbsp;&nbsp;Ở trên chúng ta đã làm được một project đầu tiên bằng vuejs rồi, giờ ta đi tìm hiểu đôi chút về nó
Mặc định khi tạo thì có sẵn 1 folder và 2 file cho chúng ta.
`bootstrap.js` nơi đây dùng để nhúng các thư viện vào.
`app.js` là nơi khởi tạo vuejs, là nơi thiết lập về data, methods với phạm vi global .
`/components` chứa toàn bộ code tùy biến của ta.
# Kết Luận
&nbsp;&nbsp;&nbsp;&nbsp;Qua những nội dung trên, bước đầu ta đã tiếp cận được với công nghệ này, từ bài sau ta sẽ đi sâu hơn để phát triển một dự án với `vuejs`
# Tài Liệu tham khảo
[Tài liệu 1](https://appdividend.com/2017/08/05/laravel-vuejs-tutorial/)