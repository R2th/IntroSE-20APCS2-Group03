## Mô tả:
Đầu tiên các bạn cần biết `CRLF` là viết tắt của `Carriage Return` và `Line Feed`, `CR` và `LF` là các ký tự điều khiển, được mã hóa tương ứng 0x0D (13 trong hệ thập phân) và 0x0A (10 trong hệ thập phân).
Chúng được sử dụng để đánh dấu ngắt dòng trong tệp văn bản. Windows sử dụng hai ký tự chuỗi `CR` `LF` còn Unix chỉ sử dụng `LF` và MacOS cũ (pre-OSX MacIntosh) đã sử dụng `CR`. còn `CRLF Injection` là một lỗ hổng có thể xảy ra khi người lập trình không kiểm tra kĩ càng dữ liệu người dùng đẩy lên và cho phép người dùng chèn cả các kí tự `CR` và `LF` này vào.

## Ví dụ
1. Twitter HTTP Response Splitting
 - Difficulty: High
 - Url: https://twitter.com/i/safety/report_story
 - Report Link: https://hackerone.com/reports/52042 1
 - Date Reported: April 21, 2015
 - Bounty Paid: $3,500
 - Description:
    - Vào tháng 4 năm 2015, người dùng `@filedescriptor` đã phản hổi về một lỗ hổng bảo mật trên Twitter cho phép tin tặc có thể tùy tiện đặt `cookie` bằng cách chỉnh sửa thêm thông tin vào một `HTTP request`.
     -  Về cơ bản, yêu cầu đến `url`: ``https://twitter.com/i/safety/report_story`` (Đây là một chức năng của twitter cho phép người dùng báo cáo về một quảng cáo không phù hợp) cần một tham số gọi là `reported_tweet_id`, Trong phải hồi, Twitter cũng trả về 1 `cookie` bao gồm tham số giống với `reported_tweet_id` trong `HTTP request`. Trong thử nghiệm của anh ấy, anh ấy đã nhận ra rằng các kí tự `CR` và `LF` đã không được kiểm tra kĩ. `LF` được thay thế bằng kí tự `space` còn `CR` có thể trả trong lỗi 400 của `HTTP` (Bad Request Error).
      - Bằng kinh nghiệm của mình, anh ta biết được rằng Firefox trước đây từng có 1 lỗ hổng trong việc `encoding`. Thay vì mã hóa các kí tự không hợp lệ khi set `cookies` thì nó lại loại bỏ các kí tự này. Kết quả là firefox chỉ cho phép nhận các kí tự trong 1 phạm vi nhất định. Anh ta đã thử nghiệm 1 cách tương tự với twiter, anh ta sử dụng ký tự `Unicode å ̃  (U + 560A)` kết thúc bằng`%0A`. Và kết quả là tham số này đã được truyền vào `URL`  nghĩa là `URL` đã được mã hóa bằng UTF-8. Kết quả là `å` đã trở thành `%E5%98%8A`.
      - Bây giờ, gửi giá trị này lên, `@filedescriptor` nhận ra rằng Twitter sẽ phát hiện bất kì kí tự có thể gây hại, bà nó sẽ giải mã các giá trị trở lại thành giá trị Unicode `56 0A` và xóa kí tự không hợp lệ `56`. Chính điều này đã để lại các kí tự `LF`(line feed) `0A` như là minh họa sau:![](https://images.viblo.asia/1d940040-392d-4279-b5ab-de9d04b5940c.png)
      - Làm tương tự anh ấy đã có thể vượt qua được kiểm tra `%E5%98%8A%E5%98%8DSet-Cookie:%20test`, và kết quả là  `%0A` và `%0D` đã có trong `header` của `coockie`.
      - Bây giờ ta có thể thấy rằng tấn công CLRF rất nguy hiểm, nhất là khi mà chúng còn cho phép thực hiện cả tấn công XSS kèm theo. Trong trường hợp này các bộ lọc của Twitter đã bị bỏ qua. Tin tặc có thể phân tách phản hổi và thực thi XSS để đánh cắp `cookie` của người dùng. Tại đây `URL` bị chia thành nhiều dòng để định dạng:

        ```
        https://twitter.com/login?redirect_after_login=
        https://twitter.com:21/%E5%98%8A%E5%98%8Dcontent-type:text/html%E5%98%8A%E5%98%8D
        location:%E5%98%8A%E5%98%8D%E5%98%8A%E5%98%8D%E5%98%BCsvg/onload=alert%28innerHTML%2\
        9%E5%98%BE
        ```
      - Chú ý rằng các giá trị được giải mã:
        ```
        %E5%98%8A => 56 0A => %0A
        %E5%98%8D => 56 0D => %0D
        %E5%98%BC => 56 3C => %3C
        %E5%98%BE => 56 3E => %3E
        ```
      - Thay thế và bỏ các mã hóa ta thấy `URL` thực chất là:
        ```
        https://twitter.com/login?redirect_after_login=https://twitter.com:21/
        content-type:text/html
        location:
        <svg/onload=alert(innerHTML)>
        ```
     ##### Như bạn có thể thấy:
     - Kí tự ngắt dòng cho phép tạo ra được `header` mới chả về với mã JavaScript có thể được thực thi `svg/onload=alert(innerHTML)`. Người dùng có thể bị đánh cắp phiên đăng nhập mà không nghi ngờ vì các thông tin ngạy cảm được đưa vào phần `Header` ngay sau vị trí bị `injection`.
##### Chú ý:

Kĩ năng tìm kiếm các lỗ hổng cần phải có sự kết hợp giữa kĩ năng và khả năng quan sát. Như ở trường hợp này `hacker` đã dưa vào một lỗi của firefox trước đó để anh ta test với twitter đề có thể chèn mã độc vào `URL`. Khi mà bạn đang tìm kiếm các lỗ hổng như thế này thì luôn cần `thinkout of the box` và thử gửi các giá trị đã được mã hóa và xem xét việc xử lý các kí tự này của server. Chúc các bạn thành công `hack facebook` :D :D