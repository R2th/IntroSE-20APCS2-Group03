## Burp Intruder
- Tiếp tục cho phần 1 được viết tại đây, mình sẽ giới thiệu tiếp cho các bạn cách sử dụng tab **Options** và cách tấn công sao cho hiệu quả nhất khi sử dụng Burp Intruder
## Cấu hình cuộc tấn công
### Options
#### Attack Options
- Tại đây, sau khi bạn đã gắn Positions, truyền Payloads thì bạn cũng có thể tấn công được rồi. Nhưng tấn công sao cho hiệu quả thì tab Options này khá quan trọng, nó có rất nhiều tùy chọn dùng để tấn công như request headers, the request engine, attack results, grep match, grep extract, grep payloads, và redirections.
#### Attack Request Headers
![](https://images.viblo.asia/ce179d97-e970-4211-822c-3b85ec236d14.png)
- Thường thì phần này không được sử dụng nhiều trong các cuộc tấn công, nhưng cần thiết thì vẫn dùng thôi =)). Tùy chọn này sẽ kiểm soát Intruder có cập nhật các headers được cấu hình trong cuộc tấn công hay không. Nhưng bạn có toàn quyền kiểm soát các request template trong tab Payload Positions. 
#### Request Engine
![](https://images.viblo.asia/a2f51370-445b-4118-8009-c54a1465dabe.png)
Tùy chọn này có lẽ là tùy chọn mà mình thích nhất. Cài đặt này kiểm soát được các yêu cầu HTTP trong cuộc tấn công sử dụng Intruder. Có rất nhiều tùy chọn rất hay như là Number of threads, Number of retries on network failure, ...
- **Number of threads** (Professional): Tùy chọn này sẽ kiểm soát được số luồng được chạy đồng thời. Chức năng này dùng để giảm thiểu thời gian tấn công xuống đối với Payloads nhiều data. Tính năng đa luồng này rất phù hợp với các cuộc tấn công Brute Force với số lượng Requests lớn.
- **Number of retries on network failure**: Nếu xảy ra lỗi kết nối hoặc sự cố mạng thì Burp sẽ thử lại yêu cầu này với số lần chỉ định mình config trước khi bỏ qua Request đó và tiếp tục. Đối với các cuộc tấn công với nhiều Request thì lỗi mạng là lỗi phổ biến. Vì vậy tốt nhất là cứ thử lại nhiều lần khi xảy ra lỗi.
- **Pause before retry**: Khi thử lại 1 Request không thành công thì Burp sẽ đợi 1 khoảng thời gian trước khi thử lại lần tiếp theo. Tùy chọn này khá là hữu ích khi Server bị quá tải hoặc xảy ra sự cố không liên tục.
- **Throttle between requests**: Tùy chọn chỉ định Burp sau 1 khoảng thời gian thì mới thực hiện 1 Request. Tùy chọn này rất hữu ích khi bạn muốn "tàng hình" trước những cuộc tấn công dài hơi.
- **Start time**: Định thời gian khi bắt đầu 1 cuộc tấn công 
Việc sử dụng nhuần nhuyễn kết hợp các tùy chọn này giúp bạn đáng kể trong cuộc tấn công mình tạo ra, tùy thuộc vào hiệu suất, khả năng xử lý của máy bạn. Nếu bạn thấy rằng cuộc tấn công đang có phần hơi chậm, bạn nên tăng số luồng lên. Nếu bạn thấy kết nối mạng của bạn hơi kém, hãy thử **Number of retries on network failure** và **Pause before retry**.
#### Attack Results Options
![](https://images.viblo.asia/dbe635f0-2275-49a3-b2b4-3441381a89fc.png)
Cài đặt này sẽ kiểm soát các thông tin nào được ghi lại trong  **attack results**. Mình thì không hay sử dụng tùy chọn này lắm, thường thì để mặc định theo Burp luôn.
- **Store requests / responses**: Các tùy chọn này xác định liệu cuộc tấn công sẽ lưu nội dung của Requests và Responces riêng lẻ. Việc lưu Requests và Responces sẽ tiêu tốn dung lượng ổ đĩa trong thư mục temp của bạn, nhưng cho phép bạn xem đầy đủ các yêu cầu này trong một cuộc tấn công, lặp lại Requests riêng lẻ nếu cần và gửi chúng đến các công cụ Burp khác. Mặc định thì Burp đã chọn chế độ này giúp mình rồi.
- **Make unmodified baseline request**: 
- **Use denial-of-service mode**: Dùng để DOS chăng :v, chức năng này có thể được sử dụng để thực hiện các cuộc tấn công DOS, DDOS của lớp ứng dụng đối với các ứng dụng dễ dàng bị tấn công.
- **Store full payloads**: Tùy chọn này được bật thì Burp sẽ lưu trữ các payloads đầy đủ cho mỗi kết quả. Tùy chọn này sẽ chiếm thêm bộ nhớ của bạn nhưng có thể cho phép bạn thực hiện một số hành động trong thời gian chạy.
#### Grep - match
![](https://images.viblo.asia/a31f9a03-fa4d-4a07-a789-007cadfe5d18.png)
Cài đặt này sử dụng để chỉ định các đoạn string có chứa trong kết quả Response. Sử dụng tùy chọn này rất mạnh trong việc phân tích nhiều Response. Ví dụ trong cuộc tấn công Blind SQL Injection, quét thông báo lỗi, ...
#### Grep - extract
Option này giúp ta trích xuất thông tin từ các Response vào bảng kết quả. Ví dụ:
![](https://images.viblo.asia/39b7bb39-0706-44f7-9800-fe5ed51de2f1.png)

Ở đây mình muốn lấy kết quả là thông tin giữa `/81906">` và `</a></li>` thì mình sẽ làm như ảnh trên. Bạn có thể bôi đen phần kết quả mà bạn muốn trích xuất, Burp Intruder sẽ tự điền giúp các bạn vào phần Start và End :D. Rất tiện đúng không.

Tùy chọn này rất hữu ích để khai thác dữ liệu từ ứng dụng và hỗ trợ một loạt các cuộc tấn công. Ví dụ như chức năng "quên mật khẩu" lấy tên người dùng làm tham số và trả về gợi ý mật khẩu do người dùng cấu hình, bạn có thể nhét 1 payloads tên người dùng phổ biến và thu thập các gợi ý mật khẩu được liên kết với tài khoản, sau đó quét qua các danh sách này để dễ dàng đoán được mật khẩu của người dùng.
#### Grep - payloads
![](https://images.viblo.asia/472dcfe6-e307-40af-b8a4-307e38ea51d8.png)
Cài đặt này được sử dụng để lấy mục kết quả từ Responses. Nếu tùy chọn này được bật thì Burp sẽ thêm 1 cột mới có chứa hộp kiểm tra xem liệu kết quả bạn gắn vào có được tìm thấy trong Responses trả về hay là không (nếu có nhiều bộ payloads thì mỗi 1 payloads sẽ ứng với mỗi cột riêng). Tính năng này khả thi với việc phát hiện XSS hay response injection vulnerabilities.
## Tổng kết
Trên đây là các tính năng mà **Burp Intruder** hỗ trợ cho Attacker, từ việc đánh dấu các mục cần thay đổi giá trị rồi đến thêm các payloads phục vụ cho việc tấn công. Xử lý rồi phân tích các kết quả thu được, tăng tốc xử lý bằng nhiều luồng, hay thử lại với lỗi mạng. Burp Intruder hoàn toàn đáp ứng đủ cho các Hacker khó tính nhất. Khi bạn thuần thục Burp Intruder thì việc giảm tải khá nhiều thời gian phân tích kết quả. Chúc các bạn vui vẻ với Burp Intruder :D