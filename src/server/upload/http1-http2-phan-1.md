![](https://images.viblo.asia/6e4e5156-af3a-434d-8e76-97aaeff2b6ea.png)

Trong bài viết này, chúng ta hãy cùng tìm hiểu HTTP/1 hoạt động như thế nào.
# Short-lived connections
Đây là loại kết nối được HTTP phiên bản đầu tiên sử dụng (1.0). Mỗi một HTTP request sẽ được hoàn thành trên chính kết nối của riêng nó, có nghĩa là quá trình bắt tay 3 bước (TCP three-hand-shaking) phải được thiết lập trước khi request.

Tuy nhiên cách này sẽ không tối ưu được thời gian, ví dụ ta có 3 request thì TCP phải thiết lập three-hand-shaking cho mỗi request riêng biệt, chưa kể nếu có lớp bảo mật như TLS thì sẽ càng làm tăng độ trễ của kết nối. 

# Persistent connections
Để khắc phục nhược điểm của kết nối vòng đời ngắn thì kết nối có vòng đời dài hạn ra đời và được sử dụng đến tận ngày nay. Đặc điểm của cách làm này là có thể thực hiện nhiều yêu cầu tài nguyên khác nhau trên cùng một kết nối.

Tuy nhiên, chúng ta có thể dễ dàng nhận ra khoảng thời gian chờ thực hiện một request, trong lúc đợi response về thì sẽ không được có một request nào khác được thực hiện. Điều này vẫn sẽ gây lãng phí tài nguyên, và nếu tạo ra một kết nối mới thì lại gặp vấn đề cũ với short-lived connections.

Ở phiên bản HTTP/1.0 thì keep-alive connection sẽ không được thiết lập mặc định, nhưng ở HTTP/1.1 thì có, và không cần phải thêm key `Connection` ở phần headers.

# HTTP Pipelining 
Dường như, giải pháp cho cả 2 vấn đề kể trên là chúng ta sẽ mở một kết nối, request liên tục mà không cần response phải hoàn thành, nhưng dig deeper thì : nếu dữ liệu trả về mà không có thứ tự, thì không thể phân biệt được dữ liệu trả về thuộc request nào. 

Điều này khiến HTTP phải tuân thủ một điều là, sau khi nhận được trọn vẹn response trả về của một request, thì mới thực hiện request tiếp theo, nhưng việc này có thể gây ra vấn đề về perfomance khi mà có một response bị xử lí chậm ( head of line blocking )

![](https://images.viblo.asia/ab47531f-298d-46de-b9ad-da7a0df2c2f6.png)

Chính vì điều này mà trên hầu hết một số trình duyệt hiện nay, dù hỗ trợ HTTP pipeline nhưng đều mặc định ở trạng thái disabled do để implement đúng thì sẽ rất phức tạp. 

Năm 2009, Google giới thiệu giao thức SPDY, là một nền tảng sử dụng binary để truyền tải dữ liệu, thay vì text như ở HTTP/1.x, là tiền đề để phát triển HTTP/2. 

Trong phần sau chúng ta sẽ tìm hiểu cách mà HTTP/2 giải quyết vấn đề còn tồn đọng như thế nào. 

Nguồn: 
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Connection_management_in_HTTP_1.x
- Tạp chí Dijkstra số 1