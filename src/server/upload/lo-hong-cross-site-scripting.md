Hi, ở bài lần trước mình đã giới thiệu về lỗ hổng bảo mật SQL Injection, lần này chúng ta sẽ cùng tìm hiểu về XSS nhé

# XSS là gì
> Cross-site scripting là một lỗ hổng phổ biến trong ứng dụng web. Để khai thác một lỗ hổng XSS, hacker sẽ chèn mã độc thông qua các đoạn script để thực thi chúng ở phía client. Thông thường, các cuộc tấn công XSS được sử dụng để vượt qua các kiểm soát truy cập và mạo danh người dùng.
Phân loại: Có 3 loại Reflected XSS, Stored XSS và DOM-based XSS

Các trang như Facebook, Twitter và youtube cũng từng dính phải lỗ hổng bảo mật này

# các thức hoạt động
Bạn có thể hiểu đơn giản như thế này, lại là Mal, anh ta thích phá người khác, khi đang comment trên 1 bài viết của 1 trang bán bánh chẳng hạn, Mal thử chèn đoạn script vào phần comment như sau 
```
<script>alert('Mal la mot nguoi dep trai')</script>
```
sau đó enter ! trang web hiện ra một cái thông báo
![](https://images.viblo.asia/a00ddc80-5f2c-4175-8d95-186501a48e4c.png)
Chạy được javascript thì Mal có thể làm nhiều thứ khác nguy hiểm hơn, Mal có thể lấy đánh cắp thông tin, điều hướng bạn đến một trang khác, hoặc là chuyển tiền vào tài khoản của hắn chẳng hạn, ...

# bảo vệ
* hãy chắc chắn nội dung được lưu trữ và hiện thị ra phía người dùng phải là text thường !
* loại bỏ ký tự đặc biệt trước khi lưu trữ
* tạo list để select thay vì bắt người dùng nhập vào chẳng hạn
* thực hiện bảo mật nội dung: `<meta http-equiv="Content-Security-Policy" content="script-src 'self' https://apis.google.com">`
* lọc nội dung html và hiện thị nội dung dưới dạng text thô
* ...
##  Code Samples
```php
// php
// dữ liệu trước khi bị escape 
<?php
  echo $_POST["comment"];
?>

// dữ liệu đã bị escape 
<?php
  echo strip_tags($_POST["comment"]);
?>
```

Bạn có thể dùng Regex để lọc chẳn hạn
```js
// Javascript
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
```

# Tổng kết
Vừa rồi là phần giới thiệu cơ bản về XSS để giúp các bạn biết được XSS là gì, nó hoạt động ra sao, cách phòng chống nó như thế nào, cảm ơn các bạn đã đọc.
Happy coding !