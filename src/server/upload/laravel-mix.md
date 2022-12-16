# 0. Nội dung

* Laravel-mix là một công cụ hỗ trợ hữu ích và mạnh mẽ, cung cấp các API để xây dụng các Webpack cho ứng dụng Laravel bằng cách cung cấp các bộ tiền xử lý CSS và Javascript
* Các ví dụ sau để chứng minh sử dụng quản lý gói npm (yarn) trong Laravel thuận tiện như thế nào. 
* Bài viết sẽ hướng dẫn bạn cài đặt một số packge js, css thông dụng, hay được sử dụng trong các ứng dụng Web


# 1.  Các bước cài đặt một package
Mặc định laravel có 2 file app.css và app.js được sử dụng trong các view của bạn. Phần tiếp theo mình hướng dẫn các bạn mix các file js, css sang 2 file này, không cần cập nhật thêm file js, css nào cả vào view mà vẫn sử dụng các package js, css đó trong ứng dụng của mình :D.
```html
<!-- Scripts -->
<script src="{{ asset('js/app.js') }}" defer></script>
<!-- Styles -->
<link href="{{ asset('css/app.css') }}" rel="stylesheet">
```
## Bước 1: Download code 
```
npm install <tên gói>
hoặc
yarn add <tên gói>
```
Sau đó các source code của các package này sẽ tự động được thêm vào `node_modules`
## Bước 2: Tiếp theo là khai báo thêm vào css và js là có thể dùng được ☺ (khai báo và quản lý trong app.js và app.scss)
Đọc kĩ comment trong file app.js, viết rất đầy đủ và chi tiết chỗ nào comment cái gì @@. Bạn cũng nên comment để dễ hình dung các package được cài đặt nhé.
## Bước 3: Biên dịch js và css qua lệnh
```
npm run dev
npm run watch
```
Sau đó sử dụng thôi :D
# 2.  Cài đặt một số package thông dụng
## 2.1.  Toastr
* Bước 1: Cài đặt thông qua npm
```
npm install --save toastr
```
* Bước 2: Import file js và css để sử dụng

Js: Yêu cầu file toastr từ bootstrap.js
```
window.toastr = require('toastr')
```
CSS: Import `toastr.scss` hoặc `toastr.less` từ file app.scss hoặc app.less của bạn
```
@import "~toastr/toastr.scss"
```
* Bước 3: Sử dụng thôi. Rõ ràng không cần sửa hay thêm các file js vào file html, khá tiện
```
toastr.success('toastr now works with Laravel 5.4+')
```
## 2.2. Datatable
* Bước 1: Cài đặt thông qua npm (download gói tin)
```
npm install datatables.net    # Core library  => cài js
npm install datatables.net-dt # Styling         => cài css
```
* Bước 2: Import js và css để sử dụng

Js: Trong app.js (đoạn đầu trong app.js có chú thích là chỗ để thêm các file js ☺)
```
require('datatables.net/js/jquery.dataTables.js');
```
CSS: Thêm trong app.scss
```
@import "~datatables.net-dt/css/jquery.dataTables.css";
```
* Bước 3: Sử dụng thôi: (rõ ràng không cần sửa hay thêm các file js vào file html, khá tiện)
```
$('#datatable').DataTable();
```
## 2.3. Datetimepicker
* Bước 1: Cài đặt thông qua npm (download gói tin)
```
npm install jquery-datetimepicker
```
* Bước 2: Import js và css để sử dụng

Js: Trong app.js (đoạn đầu trong app.js có chú thích là chỗ để thêm các file js ☺)
```
require('jquery-datetimepicker/build/jquery.datetimepicker.full.js’); 
(thêm thư viện này lại lấy trong build mới chạy @@)
```
CSS: Thêm trong app.scss
```
@import "~jquery-datetimepicker/jquery.datetimepicker.css";
```
* Bước 3: Sử dụng thôi:
```
$('#datetimepicker1').datetimepicker(); (thẻ kia là type=“text”)
```
## 2.4. AdminLTE
* Bước 1: Download: 		
```
npm install admin-lte --save-dev
```
* Bước 2: Import CSS	
```
// Adminlte
@import "~admin-lte/dist/css/AdminLTE.css";
@import "~admin-lte/dist/css/skins/_all-skins.css";
```
* Bước 3: Import JS
```
// AdminLTE code here. 
require('admin-lte');
```

## 2.5. Font awe-some
* Bước 1: Download:
```
npm i font-awesome
```
* Bước 2: Import CSS	
```
// Datatable
@import "~datatables.net-dt/css/jquery.dataTables.css"; 
(css này thật đặc biệt vì nó lại chứa thu mục con :v)
```
* Bước 3: Import JS
À, cái này không cần JS :D

# Tài liệu tham khảo:
https://laravel.com/docs/5.8/mix

https://www.npmjs.com/[/code]