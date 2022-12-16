Vấn đề xử lý ngày tháng cực kì quan trọng khi bạn xử lý với các bài viết và đăng lên website. Ví dụ bạn cần in ra ngày tháng đăng bài viết hiển thị theo kiểu ngày / tháng / năm hoặc ngày - tháng -năm thì bắt buộc bạn phải biết cách sử dụng các hàm xử lý ngày tháng trong PHP thì mới làm được. Đó là vấn đề căn bản, vẫn còn nhiều vấn đề và tùy thuộc vào từng bài toán mà bạn sẽ có những hướng làm khác nhau.

### 1. Thiết lập time_zone tại Việt Nam

Để thiết lập time_zone  ta làm theo cú pháp:

```
date_default_timezone_set('Tên Time Zone');
```

Lệnh này sẽ ảnh hưởng tới tất cả các lệnh xử lý ngày tháng phía bên dưới nó nên để chắc chắn thì bạn nên để lệnh này ở đầu file của chương trình .Để thiết lập time_zone ở Việt Nam thì bạn sử dụng lệnh sau:

```
date_default_timezone_set('Asia/Ho_Chi_Minh');
```

Để xem danh sách time zone thì bạn sử dụng đoạn code sau:

```
$timezone = DateTimeZone::listIdentifiers() ;
foreach ($timezone as $item){
    echo $item . '<br/>';
}
```
### 2. Định dạng ngày tháng với hàm date() trong PHP

Hàm date dùng để chuyển đổi thời gian theo format mà lập trình viên mong muốn, cú pháp như sau:
```
date ($format, $timestamp = 'time()')
```

Trong đó:

* `$format` là định dạng mà hàm này sẽ trả về
* `$timestamp` là thời gian truyền vào (kiểu INT), mặc định nó sẽ lấy thời gian hiện tại (chính là hàm time()).

Sau đây mình sẽ liệt kê một số định dạng hay sử dụng nhất.

* d: trả về ngày tháng (số)
* D: trả về ngày của tháng (tiếng Anh)
* m: trả về tháng của năm (số)
* M: Trả về tháng của năm (tiếng Anh)
* y: trả trả về năm (2 số cuối của năm)
* Y: trả về năm đầy đủ 4 số
* H: trả về số giờ (kiểu 24h)
* h: trả về số giờ (kiểu 6h)
* i: trả về số phút
* s: trả về số giây
* c: trả về thời gian kiểu ISO 8601, thường dùng tạo cho thẻ meta publish time trong SEO

Ví dụ: Lấy thời gian hiện tại theo định dạng ngày/tháng/năm - giờ:phút:giây

```
echo date('d/m/Y - H:i:s');
```

### 3. Xử lý ngày tháng nâng cao trong PHP


* Chuyển đổi thời gian sang kiểu INT

Để chuyển đổi thời gian sang kiểu INT thì ta sử dụng hàm `strtotime($time)`:

```
echo strtotime(date('Y-m-d H:i:s'));
```

* Xử lý cộng trừ ngày tháng với hàm` mktime()`

Hàm` mktime()` sẽ tính toán đưa ra ngày chính xác bởi các tham số truyền vào, cú pháp như sau:
```
mktime ($hour, $minute, $second, $month, $day , $year);
```
**Lưu ý**:  Hàm này sẽ trả về thời gian kiểu INT nên bạn phải sử dụng hàm date() để chuyển đổi ra định dạng mong muốn.

Cảm ơn các bạn đã đọc bài!

Tài liệu tham khảo: 

https://www.php.net/manual/en/function.date.php

https://freetuts.net/xu-ly-ngay-thang-trong-php-649.html