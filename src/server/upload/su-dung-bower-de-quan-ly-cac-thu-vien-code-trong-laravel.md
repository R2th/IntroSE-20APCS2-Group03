Nếu bạn đã từng làm các web project thì chắc hẳn biết rằng mỗi project có đến hàng chục các thư viện, tài sản và tiện ích như: Bootstrap, Jquery, Font-awesome,..... Và mỗi thư viện như thế lại có tới hàng trăm file. Vì thế, ta rất khó có thể quản lý.

Bower được sinh ra để giải quyết vấn đề này. Nó giúp ta theo giõi tất cả các gói trên và đảm bảo chúng được cập nhật (hoặc được đặt ở các phiên bản cụ thể mà bạn quyết định).

# Cài đặt Bower
Để cài Bower, trước tiên máy bạn phải được cài Nodejs và Npm.

Trên window thì bạn vào trang nodejs.org tải về rồi cài đặt là có npm. Còn trên Linux thì mở terminal chạy lần lượt mấy lệnh cài đặt dưới đây:

```shell
sudo apt update
sudo apt install nodejs npm
sudo ln -s "$(which nodejs)" /usr/bin/node
```

Sau khi máy của bạn đã được cài Nodejs và npm. Bạn chạy câu lệnh sau để cài đặt Bower:
```shell
bower install <package>
```

# Sử dụng Bower để install các thư viện trong laravel
Đầu tiên bạn cần mở thư mục Laravel của mình lên và chạy lệnh sau:
```shell
bower init
```
Các tùy chọn cấu hình hiện ra, bạn chỉ cần nhấn enter.

Bây giờ bạn có thể cài đặt các thư viện mình muốn bằng cách chạy câu lệnh sau:
```shell
bower install <package>
```
Một package cũng có thể là một GitHub shorthand, một Git endpoint hay một URL. Bạn có thể xem thêm về bower install tại đây: https://bower.io/docs/api/#install
```shell
# registered package 
bower install jquery
# GitHub shorthand
bower install desandro/masonry
# Git endpoint
bower install git://github.com/user/package.git
# URL
bower install http://example.com/script.js
```

Các thư viện sau khi được cài đặt bằng Bower sẽ được lưu trong thư mục bower_components

# Tìm kiếm thư viện

Giả sử bạn muốn sử dụng thư viện bootstrap, nhưng bạn không chắc chắn thư viện nào sẽ sử dụng. Ta có thể sử dụng bower để tìm kiếm xem có những thư viện nào có tên boostrap bằng câu lệnh sau:
```shell
bower search boostrap
```
# Update và Uninstall các thư viện đã cài

Để update các thư viện lên phiên bản mới nhất. Bạn chỉ cần chạy câu lệnh sau:
```shell
bower update
```

Còn nếu bạn muốn gỡ bỏ 1 thư viện, bạn chạy câu lệnh sau:
```shell
bower uninstall <Tên package>
```


# Sử dụng các thư viện đã cài
Sau khi đã cài đặt các thư viện. Bạn chỉ cần chèn đường dẫn của nó vào trang HTML như bình thường để sử dụng.
Ví dụ:
```html
<script src="bower_components/jquery/dist/jquery.min.js"></script>
```

# Xem các thư viện đã cài
Để kiểm tra các thư viện đã cài. Bạn có thể mở file bower.json và kiểm tra ở mục dependencies. 

Ví dụ mục dependencies của một file bower.json
```
"dependencies": {
    "bootstrap": "https://github.com/twbs/bootstrap.git#^3.3.7",
    "jquery-flexdatalist": "https://github.com/sergiodlopes/jquery-flexdatalist.git#^2.2.2",
    "font-awesome": "https://github.com/FortAwesome/Font-Awesome.git#^4.7.0",
    "font-icons-trungquan17": "https://github.com/trungquan17/font-icons.git",
    "AlertifyJS": "https://github.com/MohammadYounes/AlertifyJS.git#^1.11.0",
    "eonasdan-bootstrap-datetimepicker": "^4.17.47",
    "photoset-grid": "^1.0.1",
    "pusher-js": "pusher#^4.2.1"
  }
```

# Lời kết
Như vậy mình đã trình bày xong về Bower cũng như cách sử dụng của nó. Nếu các bạn thấy có gì sai sót hoặc cần bổ sung thì hãy để lại comment dưới bài viết nha.

Cảm ơn các bạn đã xem bài viết của mình!

## Tài liệu tham khảo
https://bower.io/