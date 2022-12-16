### **I. AdminLTE là gì?**

-  AdminLTE là một admin template được phát triển dựa trên Bootstrap 3.
-  AdminLTE hoàn toàn miễn phí và chất lượng, đáp ứng đầy đủ các yêu cầu cho một trang quản trị.
-  AdminLTE dễ dàng tùy biến và sử dụng theo nhu cầu của bạn.
-  AdminLTE tương thích với nhiều độ phân giải màn hình từ các thiết bị di động nhỏ cho đến các máy tính bàn lớn.
-  AdminLTE được phát triển bởi `almsaeedstudio.com`.
![](https://images.viblo.asia/cd40aa03-a502-429b-ae76-4017de833f22.png)

### **II. Cài đặt**
1. Cài đặt Slim:
-  Thêm vào Gemfile
 ```
 gem 'slim-rails'
 ```
- Chạy lệnh `bundle install`

2. Cài đặt bower sử dụng node package utility:
- Chạy lệnh `npm install -g bower`
- Config bower trong file `.bowerrc` đến `/vender`:
```
{
  "directory" : "vendor/assets/components"
}
```
-  Khởi tạo trong file `bower.json`:
```
{
  "name": "admin_lte_todo",
  "dependencies": {
  }
}
```
-  Config rails app để chạy với bower:
```
config/initializers/assets.rb
Rails.application.config.assets.paths << Rails.root.join('vendor', 'assets', 'components')
```
3. Cài đặt AdminLTE với Bower:
- Thêm AdminLTE vào file `bower.json`:
```bower.json
"dependencies": {
  "admin-lte": "*"
}
```
* `*` là phiên bản mới nhất của AdminLTE*
- Cài đặt AdminLTE plugin bằng cách chạy lệnh `bower install`
4. Cài đặt AdminLTE với npm:
- Tạo file package.json bằng lệnh `npm init`
- Config rails app để chạy với `npm`:
```
config/initializers/assets.rb
Rails.application.config.assets.paths << Rails.root.join('node_modules')
```
- Cài đặt AdminLTE trong file `package.json`:
```
"dependencies": {
  "admin-lte": "2.3.5"
}
```
- Chạy lệnh `npm-install`

### **III. Tích hợp AdminLTE trong ứng dụng Rails**

1.  Tích hợp AdminLTE assets:
- Thêm vào file `application.js`:
```
//= require jquery
//= require jquery_ujs
```
- Thêm bootstrap 3 vào file `application.js`:
```
//= require admin-lte/bootstrap/js/bootstrap
```
Và file `application.css`:
```
 *= require admin-lte/bootstrap/css/bootstrap
```
- Thêm AdminLTE assets cho rails app trong file `application.js`:
```
//= require admin-lte/dist/js/app.js
```
Và file `application.css`:
```
 *= require admin-lte/dist/css/AdminLTE
 *= require admin-lte/dist/css/skins/skin-blue
```
- Chúng ta sẽ thu được kết quả như sau:
```application.js
//= require jquery
//= require jquery_ujs
//= require admin-lte/bootstrap/js/bootstrap
//= require admin-lte/dist/js/app.js
```
Và
```application.css
 *= require admin-lte/bootstrap/css/bootstrap
 *= require admin-lte/dist/css/AdminLTE
 *= require admin-lte/dist/css/skins/skin-blue
 ```
 
2.  Tích hợp AdminLTE template:
- Chuyển file `html` sang dạng `slim` với cú pháp:
```
html2slim app/views/layouts/application.html app/views/layouts/application.html.slim
```
- Thay đổi template của file `application.html.slim` thành dạng:
```
head
    title AdminLTE example

    = stylesheet_link_tag "application", media: "all"

    = javascript_include_tag "application"

    = csrf_meta_tags
```
- Xóa file `app/views/layouts/application.html` và các scripts trong file `app/views/layouts/application.html.slim`
- Thêm thư viện icons và fonts cho template trong file `app/views/layouts/application.html.slim`:
```
= stylesheet_link_tag "https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
= stylesheet_link_tag "http://code.ionicframework.com/ionicons/2.0.0/css/ionicons.min.css"
 ```
 
### **IV. Kết quả**

Chỉ cần chạy `rails s` và ta đã có ngay một template tuyệt vời cho trang admin của mình
![](https://images.viblo.asia/6c68fc53-be9d-4a74-a791-c1c0fa2e54c6.png)

### **V. Kết luận**

Trên đây là giới thiệu sơ lược về AdminLTE template và cách tích hợp trong một Rails app. Hi vọng bài viết có thể giúp các bạn có được cách nhìn tổng quan về AdminLTE template và sử dụng tốt template tuyệt vời này.

## **Cảm ơn đã theo dõi**