Nếu bạn không để ý về các phiên bản PHP hoặc bạn mới làm quen với lập trình PHP, bạn nên biết rằng trước PHP 7, PHP 5.6 đã từng là phiên bản ổn định. Khá ngạc nhiên khi nhiều người biết rằng các nhà phát triển tránh phát hành PHP 6 vì PHP 6 đã được ra để thử nghiệm nhưng nó không bao giờ thực sự là một phiên bản ổn định. Vì PHP 6 tồn tại như một dự án thử nghiệm, các nhà phát triển không muốn gây nhầm lẫn cho cộng đồng với việc phát hành, vì thế họ đã trực tiếp lên version PHP 7. Rõ ràng, với việc phát hành PHP 7, mọi người bắt đầu so sánh nó với phiên bản trước của nó. Nếu bạn cũng là một người rất thích so sánh các phiên bản, hãy theo dõi sự so sánh chi tiết sau về sự khác biệt chính giữa PHP 5 và PHP 7 sẽ vô cùng hữu ích cho bạn.

# 1. Performance

Hiệu năng của PHP 5 và PHP 7 chính là điểm khác biệt chính. PHP là sức mạnh của kỹ thuật **Zend**, cái mã đã được tích hợp trước từ các phiên bản PHP 4. PHP 5 sử dụng Zend II nhưng đến phiên bản PHP 7 nó sử dụng kỹ thuật mới có tên gọi là **PHP-NG (PHP Next Generation)**. Kỹ thuật mới này cải thiện hiệu suất nhiều gấp hai lần với mức sử dụng bộ nhớ được tối ưu hóa. Điều này đã được kiểm chứng bằng điểm chuẩn do cộng đồng cung cấp. Trên thực tế, kỹ thuật mới này cũng yêu cầu ít máy chủ hơn để phục vụ cùng số lượng người dùng như trước đây.

# 2. Khai báo kiểu trả về

Trong PHP 5, lập trình viên không thể khai báo kiểu trả về của một hàm hoặc một phương thức. Đó thực sự là một nhược điểm lớn khi các lập trình viên không thể ngăn chặn được các kiểu trả về không mong muốn và sinh ngoại lệ. May mắn thay,  PHP 7 cho phép các lập trình viên khai báo kiểu trả về của các hàm theo giá trị trả về mong muốn. Điều này chắc chắn sẽ làm cho code trở nên chính xác hơn. Có bốn kiểu trả về khác nhau - bool, int, string và float.

# 3. Các lớp vô danh

Một trong những điểm mới được thêm vào trong PHP 7 mà không được hỗ trợ trong PHP 5 chính là các lớp vô danh. Mặc dù PHP có cách tiếp cận hướng đối tượng từ PHP 5 nhưng nó thiếu tính năng này, một trong những tính năng rất phổ biến trong các ngôn ngữ hướng đối tượng phổ biến khác như Java và C #. Một lớp vô danh được sử dụng để tăng tốc thời gian thực thi. Nó phù hợp khi bạn không cần thực hiện một lớp nhiều hơn một lần và bạn không cần phải ghi lại nó.

```php
<?php

// Pre PHP 7 code
class Logger
{
    public function log($msg)
    {
        echo $msg;
    }
}

$util->setLogger(new Logger());

// PHP 7+ code
$util->setLogger(new class {
    public function log($msg)
    {
        echo $msg;
    }
});
```

# 4. Toán tử mới 

PHP7 giới thiệu một toán tử mới (<=>) gọi là toán tử so sánh kết hợp. Nó có thể được sử dụng chủ yếu trong phân loại và so sánh kết hợp. Nó hoạt động như strcmp () hoặc version_compare (). Nếu bạn đã từng sử dụng ngôn ngữ Perl và Ruby chắc hẳn không còn xa lạ với toán tử này :D

# 5. Xử lý lỗi và hỗ trợ 64-bit

Nếu bạn hiểu sự khác biệt giữa lỗi và ngoại lệ, bạn biết rằng rất khó xử lý các lỗi nghiêm trọng trong PHP 5 thì PHP 7 đã giảm bớt quá trình vì nó đã thay thế một số lỗi lớn với các ngoại lệ có thể được xử lý dễ dàng. Điều này đã đạt được với sự ra đời của các đối tượng Engine Exception mới.
Ngoài ra PHP 5 không hỗ trợ các số nguyên hoặc tệp lớn 64 bit nhưng điều đó đã thay đổi trong PHP 7. PHP 7 có hỗ trợ 64 bit do đó bạn sẽ có thể sử dụng các số nguyên 64 bit gốc như các tệp lớn và do đó, bạn có thể chạy các ứng dụng hoàn hảo trên các kiến trúc hệ thống 64 bit.

# Tổng kết
Với những thay đổi gần đây của các phiên bản PHP, điều này làm cho PHP trở thành ngôn ngữ hoàn thiện hơn nhiều. Đó cũng là thông điệp tốt cho tất cả các nhà phát triển PHP để xây dựng các ứng dụng cấp doanh nghiệp tuyệt vời bằng cách sử dụng phiên bản PHP mới nhất.

# Tài liệu tham khảo
https://www.linkedin.com/pulse/difference-bw-php5-php7-venkatesh-prabhu

https://www.freelancinggig.com/blog/2018/04/23/major-differences-php-5-php-7/