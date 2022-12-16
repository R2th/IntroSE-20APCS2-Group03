Như ta đã biết phiên bản PHP7.3 hiện tại, độ ưu tiên của các toán tử `+`, `-`, `.` là ngang nhau.

![](https://images.viblo.asia/c7b15733-c7f2-4860-96e6-71590b7ff0a1.png)

Và được tính toán theo thứ tự từ trái sang phải. Ví dụ như:
```PHP
    echo 1 . 2 + 3 . 4 ; // được thực hiện như dòng dưới
    echo ((( 1 . 2 ) + 3 ) . 4 ) ; // được thực hiện như dòng trên
```

Ở phần [PHP manual](https://www.php.net/manual/en/language.operators.precedence.php) cũng có một ví dụ giải thích :

![](https://images.viblo.asia/9eb1dff8-3f9f-45ea-bdca-f9e571e4262b.png)

Tuy nhiên, vào tháng 3 năm 2019 một RFC mang tên [Change the precedence of the concatenation operator](https://wiki.php.net/rfc/concatenation_precedence) đã được đưa ra.

Việc bỏ phiếu để thực hiện bản cập nhập được bắt đầu vào 30/4/2019 và cuối cùng được thông qua và kết thúc vào 14/5/2019.

Dù rằng việc thêm và xóa các toán tử là điều khá phổ biến, tuy vậy việc thay đổi độ ưu tiên toán tử là một việc khá hiếm thấy - ngay cả trong các ngôn ngữ khác.
# 1.Giới thiệu
Trên thực tế, `+`, `-` và `.` đã là một vấn đề trong nhiều năm gần đây. Cụ thể đó là việc thực hiện theo thứ tự từ trái sang phải.
```PHP
    echo "sum: " . $a + $b;

    // kết quả tương đương với
    echo ("sum: " . $a) + $b;

    // chứ không phải như thế này
    echo "sum :" . ($a + $b);
```
RFC này nhằm mục đích làm cho hành vi này trực quan hơn và ít gặp vấn đề hơn.
# 2.Đề xuất
Hiện tại, các toán tử `+`, `-` và`.` có cùng mức ưu tiên. Chúng được thực thi đơn giản theo thứ tự từ trái sang phải.

PHP với khả năng chuyển đổi liền mạch một số nguyên thành một chuỗi, việc nối các giá trị này là cần thiết. Mặt khác, rất hiếm khi ta muốn muốn thêm hoặc bỏ các chuỗi kí tự thông thường không phải số.

Chính vì vậy, RFC này đề xuất toán tử `.` nên có độ ưu tiên thấp hơn `+` và `-` ưu tiên thấp hơn. Cụ thể, mức độ ưu tiên mới của toán tử `.` sẽ được đặt dưới toán tử `<<` và `>>`
# 3.Các xung đột tương thích
Mọi biểu thức không nằm trong ngoặc đơn có dấu `-` hoặc `+` sau dấu `.` sẽ thay đổi kết quả. Ví dụ, biểu thức `"3". "5" + 7` bây giờ sẽ bằng với `312` thay vì `42` trước đây. Nếu muốn có kết quả là `42` ta có biểu thức `("3". "5") + 7`.

Mặc dù đây là một thay đổi hành vi tinh vi ở chỗ rằng nó sẽ trả về các đầu ra khác nhau mà không cần đưa ra thông báo hay cảnh báo, nhưng vẫn có thể phân tích tĩnh mã và tìm tất cả các trường hợp xảy ra. Theo như được biết, tỉ lệ xuất hiện này khá hiếm, nên các rủi ro không cao.
# 4.Khảo sát của Nikita
Nikita đã thực hiện một cuộc khảo sát trên 2000 gói Composer cho thấy sẽ có [5 gói được tác động](https://gist.github.com/nikic/a4df3e8e18c7955c2c21cf6cdb4cbfaa).
Tất cả 5 trong số đó là lỗi trong mã hiện tại và sẽ trả về chính xác với RFC được thực hiện này.
```PHP
    $this->errors->add( 'unknown_upgrade_error_' . $errors_count + 1, $string );
```
Ví dụ như đoạn mã trên muốn nhắm đến là `add('unknown_upgrade_error_5', $string)`, nhưng thực tế trả về sẽ là `add(1, $string)`.
Thông qua RFC này, lỗi trên sẽ được giải quyết.
# 5.Phiên bản dự kiến
Khuyến cáo E_DEPRECATED ở PHP7.4, và dự kiến sẽ cập nhập trong PHP8.
# 6.Kết luận
Với việc RFC này được thông qua, các xử lý xung quanh độ ưu tiên giữa toán tử `.` đối với các toán tử `+` và `-` sẽ được rõ ràng hơn.
Tuy nhiên, vì các hoạt động phức tạp như vậy thường sử dụng dấu ngoặc đơn, nên không có tác hại thực sự lớn.
## Source :
   - https://qiita.com/rana_kualu/items/db7ae541016bd0b02122
   - https://wiki.php.net/rfc/concatenation_precedence
   - https://www.php.net/manual/en/language.operators.precedence.php