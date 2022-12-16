## GIỚI THIỆU

Một lỗ hổng nổi tiếng, không bao giờ lỗi thời và có tác động mạnh là Path Traversal. Kỹ thuật này còn được gọi là tấn công dot-dot-slash (../) hoặc như một phương pháp duyệt thư mục và nó bao gồm việc khai thác việc thiếu khả năng làm sạch cho đầu vào của người dùng, được ứng dụng sử dụng để tạo tên đường dẫn để truy xuất tệp hoặc các thư mục từ hệ thống tệp nằm bên dưới thư mục cha bị hạn chế.
Bằng cách thao tác các giá trị thông qua các ký tự đặc biệt, kẻ tấn công có thể khiến tên đường dẫn phân giải đến một vị trí nằm ngoài thư mục bị hạn chế.

Theo thuật ngữ của OWASP, một cuộc tấn công path traversal thuộc loại A5 của top 10 (2017): roken Access Control, vì vậy, là một trong 10 vấn đề hàng đầu của năm 2017, chúng tôi nên đặc biệt chú ý đến nó.

Trong bài đăng trên blog này, chúng ta sẽ nói về một ví dụ về việc dùng path traversal để trích xuất web.config thông qua Công cụ Burp Suite Intruder.

## TESTING STEP-BY-STEP

Đầu tiên, tải công cụ Burp Suite Community Edition, một công cụ kiểm tra hữu ích cung cấp nhiều tính năng tự động và bán tự động để cải thiện hiệu suất kiểm tra bảo mật.
Đặc biệt, tính năng Burp Intruder có thể rất hữu ích để khai thác các lỗ hổng truyền qua đường dẫn.
Giả sử có một ứng dụng web DotNet dễ bị duyệt đường dẫn. Để khai thác vấn đề, kẻ tấn công có thể cố gắng tải xuống toàn bộ mã nguồn của ứng dụng bằng cách làm theo hướng dẫn này.

Khi kẻ tấn công tìm thấy một endpoint có thể dễ bị tấn công bởi Path Traversal, có thể gửi nó đến Burp Intruder như được hiển thị trong ảnh chụp màn hình sau.

Trên tab Intruder, mục tiêu đã được thiết lập với yêu cầu rằng nó sẽ được sử dụng để thao tác nhằm tìm tệp web.config.
Đảm bảo rằng trọng tải được nhập chính xác vào đúng vị trí thuộc tính, nếu không, hãy thực hiện hành động “Clear §”, sau đó chọn thuộc tính để fuzzing và nhấp vào nút “Add §”.

Để đặt trọng tải mà Burp Intruder sẽ sử dụng để thực hiện các yêu cầu, hãy tải xuống tệp traversals-8-deep-exotic-encoding.txt  từ fuzzdb project  và cung cấp cho Burp Intruder bằng cách thực hiện các hành động sau:
![](https://vnhackernews.com/wp-content/uploads/2020/09/SendToIntruder.png)


* đi đến “Payloads” sub-tab;
* chọn từ dropdown list “Payload type” giá trị “Simple List”;
* trong panel “Payload Options” click chọn nút “Load…” và chọn path-traversal-fuzzing.txt (như ảnh chụp màn hình bên dưới).
![](https://vnhackernews.com/wp-content/uploads/2020/09/SendToIntruder-7.png)

Bước tiếp theo là thêm Payload Processing rule để khớp và thay thế placeholder “{FILE}” bằng tên tệp mà chúng tôi muốn trích xuất (trong ví dụ của chúng tôi là “web.config”), vì vậy hãy nhấp vào “nút Add”.
![](https://vnhackernews.com/wp-content/uploads/2020/09/SendToIntruder-1.png)

Trong paylod processing rule, hãy thêm Khớp cho chuỗi “{FILE}” và Thay thế cho chuỗi “web.config”, như được hiển thị trong ảnh chụp màn hình sau:
![](https://vnhackernews.com/wp-content/uploads/2020/09/SendToIntruder-2.png)

Để cải thiện xác suất của một cuộc tấn công thành công, có thể thêm giá trị Grep-Match (nếu biết), để dễ dàng xác định một phản hồi tích cực.
Xóa tất cả các quy tắc hiện có:
![](https://vnhackernews.com/wp-content/uploads/2020/09/SendToIntruder-3.png)

Sau đó, thêm quy tắc Grep-Match mới cho chuỗi “”, cho biết tệp web.config đã được tìm thấy.
![](https://vnhackernews.com/wp-content/uploads/2020/09/SendToIntruder-4.png)

Cuối cùng, bạn nên điều chỉnh các tùy chọn Request Engine dựa trên các giới hạn của máy chủ web (anti-throttling, tường lửa, v.v.) để tránh kết quả sai, ví dụ như tăng độ trễ thử lại.
![](https://vnhackernews.com/wp-content/uploads/2020/09/SendToIntruder-8.png)

## TIẾN HÀNH TẤN CÔNG

If the endpoint will result vulnerable to path traversal, the column “configuration” will be checked.
![](https://vnhackernews.com/wp-content/uploads/2020/09/SendToIntruder-5.png)

![](https://vnhackernews.com/wp-content/uploads/2020/09/SendToIntruder-6.png)

## Nguồn

* https://vnhackernews.com/kien-thuc/khai-thac-lo-hong-path-traversal-voi-burp-community-suite.aes
* https://blog.mindedsecurity.com/2020/03/how-to-path-traversal-with-burp.html