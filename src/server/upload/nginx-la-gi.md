Đợt vừa rồi do yêu cầu dự án nên mình được ngồi cài lại đống server. Cũng có mấy thứ như php, composer, yarn ... thì cũng coi như là quen thuộc mà bản thân đã biết. Nhưng đến lúc bảo cài Nginx, rồi cấu hình cho nó thì mình chịu, có nước đi copy lại cấu hình từ server cũ cho nó chạy với nhờ người xem hộ :sob:.  Để tương lai không còn ngớ ngẩn với mấy chuyện cấu hình server thì hôm nay mình sẽ viết về Nginx. Trước tiên là để trả lời cho bản thân biết nó là cái gì. 

![](https://images.viblo.asia/d7fe9389-f269-4e33-a9e6-269892b902d2.png)

# Nginx là gì?
> Nginx là open source để phục vụ web, reverse proxying, caching, load blancing, media streaming... Nó bắt đầu như một máy chủ web được thiết kế để có hiệu suất và sự ổn định tối đa. Ngoài các khả năng của máy chủ HTTP, Nginx cũng có thể hoạt động như một máy chủ proxy cho email (IMAP, POP3, SMTP) và một trình cân bằng tải và proxy ngược cho các máy chủ HTTP, TCP, UDP.
> 
Nguồn: https://www.nginx.com/resources/glossary/nginx/

# Nginx hoạt động như nào?
Trước khi tìm hiểu về Nginx thì chúng ta hãy xem cách mà máy chủ web hoạt động. Khi ai đó gửi yêu cầu mở một trang web, trình duyệt sẽ liên lạc với máy chủ của trang web đấy. 
Sau đó, máy chủ tìm kiếm các tệp được yêu cầu cho trang và gửi nó đến trình duyệt. Đây chính là loại yêu cầu đơn giản nhất.

Các máy chủ web truyền thống tạo một luồng duy nhất cho mọi yêu cầu, nhưng Nginx không hoạt động theo cách đó. Nginx thực hiện với kiến trúc hướng sự kiện không đồng bộ. Điều đó có nghĩa là các luồng tương tự được quản lý theo một worker process và mỗi worker process chứa các đơn vị nhỏ hơn gọi là worker connection. Toàn bộ các đơn vị này sau đó chịu trách nhiệm xử lý các luồng yêu cầu. Worker connection cung cấp các yêu cầu cho worker process, cũng sẽ gửi nó đến master process. Cuối cùng, master process cung cấp kết quả của những yêu cầu đó.

Điều đó có vẻ đơn giản, nhưng một worker connection có thể xử lý tới 1024 yêu cầu tương tự. Do đó, Nginx có thể xử lý hàng ngàn yêu cầu mà không gặp bất kỳ khó khăn nào. Đó cũng là lý do Nginx trở nên tuyệt vời cho các trang web có nhiều những yêu cầu như e-commerce, search engines, clound storage. 

# Tính năng
Nginx có thể được triển khai để phục vụ nội dung HTTP động trên mạng bằng cách sử dụng FastCGI, SCGI cho tập lệnh, máy chủ ứng dụng WSGI hoặc mô-đun Phusion Passenger và nó có thể đóng vai trò là bộ cân bằng tải phần mềm. Nginx sử dụng cách tiếp cận theo hướng sự kiện không đồng bộ, thay vì các luồng để xử lý các yêu cầu. Kiến trúc hướng sự kiện mô-đun của Nginx có thể cung cấp hiệu suất dễ dự đoán hơn dưới tải trọng cao.

Tệp cấu hình mặc định của Nginx là `nginx.conf`.

## Các tính năng máy chủ web và HTTP proxy
* Khả năng xử lý hơn 10000 kết nối đồng thời với dung lượng bộ nhớ thấp (~2.5MB mỗi 10k kết nối HTTP không hoạt động)
* Xử lý static file, index file và tự động lập chỉ mục
* Reverse proxy với bộ nhớ đệm
* Cân bằng tải (load balancing)
* TLS/SSL với SNI và OCSP, thông qua OpenSSL
* Hỗ trợ FastCGI, SCGI, uWSGI với bộ nhớ đệm
* Hỗ trợ gPRC từ tháng 3 năm 2018 (phiên bản 1.13.10)
* Máy chủ ảo dựa trên địa chỉ IP và tên
* Tương thích IPv6
* WebSockets kể từ 1.3.13, bao gồm hoạt động như một proxy ngược và thực hiện cân bằng tải cho các ứng dụng WebSocket
* Nâng cấp HTTP/1.1, hỗ trợ giao thức HTTP/2
* Viết lại và chuyển hướng URL
## Các tính năng Mail proxy
* Hỗ trợ TLS/SSL
* Hỗ trợ STARTTLS
* SMTP, POP3, và IMAP proxy
* Yêu cầu xác thực bằng máy chủ HTTP bên ngoài hoặc bằng các tập lệnh xác thực

Các tính năng khác bao gồm nâng cấp thực thi và cấu hình mà không mất kết nối máy khách, và kiến trúc dự trên mô-đun với cả lõi và hỗ trợ mô-đun của bên thứ ba.

Nginx Plus bao gồm các tính năng bố sung như cân bằng tải nâng cao và truy cập vào bộ số liệu mở rộng để theo dõi hiệu suất.
# Nginx với Apache
Trong số các máy chủ web phổ biến, Apache là một trong những đối thủ của Nginx. Nó đã có từ những năm 90 và cũng có một cộng đồng người dùng lớn. Một chút so sánh sau đây.
## Hỗ trợ hệ điều hành
Khả năng tương thích chính là một trong những điều kiện mà bạn cần xem xét khi chọn phần mềm. Cả Nginx và Apache đều có thể chạy trên nhiều hệ điều hành hỗ trợ hệ thống Unix. Tuy nhiên, hiệu năng của Nginx trên Windows không tốt như trên các nền tảng khác.
## Hỗ trợ người dùng
Từ người dùng đầu tiên cho đến chuyên gia thì luôn cần một cộng đồng tốt có thể hỗ trợ họ khi gặp vấn đề. Trong khi cả Nginx và Apache đều có hỗ trợ qua email và Stack Overflow, Apache thiếu sự hỗ trợ từ công ty của mình.
## Hiệu năng
Nginx có thể đồng thời chạy 1000 kết nối nội dung tĩnh nhanh hơn 2 lần so với Apache và sử dụng ít bộ nhớ hơn một chút. Tuy nhiên, khi so sánh hiệu suất của chúng khi chạy nội dung động, cả hai đều có cùng tốc độ. Nginx là một lựa chọn tốt hơn cho những người có một trang web tĩnh.

Để kết thúc cho phần so sánh này thì mình sẽ dịch lại 1 FAQ ở ngay trên trang chủ của Nginx khi so sánh với Apache. Chúng ta xem họ đưa ra những lý luận như nào.
> Nginx là một máy chủ web hiệu suất cao, có khả năng mở rộng cao, có tính sẵn sàng cao, máy chủ reverse proxy và trình tăng tốc web (kết hợp các tính năng của bộ cân bằng tải HTTP, bộ đệm nội dung và hơn thế nữa). Nginx cung cấp một kiến trúc có khả năng mở rộng cao, rất khác so với Apache (và nhiều sản phẩm thương mại cũng như mã nguồn mở khác cùng loại). Nginx có kiến trước đơn luồng, không đồng bộ, được điều khiển theo mô-đun, quy mô cực kỳ tốt trên phần cứng máy chủ chung và trên các hệ thống đa xử lý.  Nginx sử dụng tất cả các sức mạnh cơ bản của các hệ điều hành hiện đại như Linux để tối ưu hóa việc sử dụng bộ nhớ, CPU, mạng và trích xuất hiệu suất tối đa ra khỏi máy chủ vật ký hoặc ảo. Kết quả cuối cùng là Nginx thường có thể phục vụ ít nhất 10 lần yêu cầu (và thường là 100-1000 lần) mỗi mát chủ so với Apache. Điều đó có nghĩa là người dùng được kết nối nhiều hơn trên mỗi máy chủ, sử dụng băng thông tốt hơn, tiêu thụ ít CPU và RAM hơn và "môi trường xanh" hơn.
> 
> Nguồn: https://www.nginx.com/faq/what-is-nginx-how-different-is-it-from-e-g-apache/
# Kết luận
Bài viết này chỉ mục đích giới thiệu cơ bản về Nginx. Để cho ta thấy rằng nó làm được những gì, lợi ích của nó đến đâu, vai trò của nó với máy chủ là như nào. Ở bài tiếp theo mình sẽ đi sâu đến phần làm sao có thể cấu hình Nginx cho một máy chủ để có thể hoạt động. Cảm ơn mọi người đã theo dõi.

**Tham khảo**

* https://en.wikipedia.org/wiki/Nginx
* https://www.nginx.com/faq/what-is-nginx-how-different-is-it-from-e-g-apache/