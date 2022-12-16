# 1. Nginx là gì?

Mình biết tới Nginx khi được tham gia vào 1 dự án của công ty, và trong suốt thời gian đầu mình cũng chỉ dừng lại ở cái tên của nó. Và điều gì đến cũng phải đến, mình buộc phải tìm hiểu xem nó là cái gì? tại sao phải sử dụng nó vào dự án...
Tìm kiếm chi tiết hơn thì mình biết việc sử dụng Nginx, kể cả các “ông lớn” công nghệ như Google, Facebook, Adobe, IBM, Microsoft, Intel, Apple, Twitter,… đều không ngoại lệ, họ vô cùng ưu ái "công nghệ " này . Chúng ta hãy xem vì sao mà đông đảo các công ty từ lớn tới nhỏ đều thích đụng chạm" tới Nginx như vậy nhé !

![](https://images.viblo.asia/dbfde631-e0c6-4e15-96a6-096e6986565f.jpg)

Rất dễ dàng để tìm thấy một khái niệm về Nginx như thế này : 

> NGINX là một máy chủ mã nguồn mở nổi tiếng. Khi mới ra đời, NGINX được dùng để phục vụ web HTTP. Tuy nhiên, hiện nay nó được dùng để làm Reverse Proxy, Email Proxy (IMAP, POP3, SMTP) và HTTP Load Balancer. NGINX được Sysoev cho ra đời chính thức vào tháng 10/2004. NGINX sử dụng kiến trúc sự kiện không đồng bộ. Tính năng này giúp NGINX tăng tốc độ, mở rộng tính năng và đáng tin cậy hơn. Rất nhiều website có traffic lớn đã sử dụng NGINX cũng vì khả năng mạnh mẽ và xử lý hàng nghìn kết nối cùng lúc của nó.

![](https://images.viblo.asia/c04750af-e7f3-4f39-be32-8683477b3d0f.jpg)

# 2. NGINX hoạt động như thế nào?

Để dễ dàng hiểu về nginx, chúng ta hãy cùng tìm hiểu về cách mà một web server hoạt động. Đầu tiên, khi bạn vào trình duyệt chrome và gõ vào chữ youtube chấm com, ngay lập tức chrome sẽ gởi 1 "cuộc gọi " tới máy chủ chứa và vận hành youtube ( là 1 website). Sau khi máy chủ (Server) nhận được "nội dung cuộc gọi " thì nó sẽ thực hiện việc tìm kiếm file yêu cầu của website đó (youtube.com) và gửi ngược về cho trình duyệt (chrome). Rồi xong, đã nhận được thông tin cần từ Server thì trình duyệt sẽ biết cách để hiển thị nội dung lên cho chúng ta coi. Đó chính là qui trình hoạt động đơn giản của 1 webserver. Vậy còn Nginx thì sao ? 

Khác với những máy chủ web thông thường, chúng chỉ tạo ra 1 luồng duy nhất cho mọi request.  Nginx hoạt động dựa trên kiến trúc Asynchronous và Event Driven ( bất đồng bộ và hướng sự kiện). Theo kiến trúc này, các thread (luồng) tương tự được quản lý trong một tiến trình (Worker Process), mỗi tiến trình hoạt động dựa vào các thực thể nhỏ hơn được gọi là  Worker Connections. Các worker connection sẽ chịu trách nhiệm nhận request từ browser và gởi request tới các worker process, sau đó worker process sẽ gửi các request đó đến Process cha – Master Process.  Master Process sẽ trả lại kết quả cho những request đó.

Một worker connection có thể xử lý tới 1024 yêu cầu tương tự nhau. Do đó, NGINX xử  lý được hàng nghìn yêu cầu mà không gặp bất cứ khó khăn gì. NGINX luôn hiệu quả hơn khi hoạt động trên môi trường tìm kiếm, thương mại điện tử và lưu trữ đám mây.

![](https://images.viblo.asia/485a6ef9-213b-4abc-8ab7-6eac2991c0cc.png)

# 3. Các tính năng của Nginx

Ở phần này chúng ta sẽ biết được phần nào nguyên nhân mà Nginx lại được sử dụng rộng rãi đến vậy. Nó có rất nhiều tính năng vượt trội phải kể đến : 
- Có khả năng xử lý cùng một lúc hơn 10.000 kết nối chỉ với việc sử dụng dung lượng bộ nhớ ~2.5MB / 10000 connect, rất tiết kiệm.
- Phục vụ Static Files và lập chỉ mục cho tập tin, giúp giảm tải xử lí cho server khi có request về Static File, tăng tốc độ truy vấn
- Dùng bộ nhớ đệm Cache để tăng tốc Proxy ngược
- Cân bằng tải đơn giản và khả năng chịu lỗi
- Hỗ trợ tăng tốc với bộ nhớ đệm của WSGI, SCGI, FastCGI và các máy chủ Memcached
- TLS/SSL với SNI và OCSP, thông qua OpenSSL
- Có cấu hình linh hoạt và khả năng lưu lại nhật ký truy vấn
- Máy chủ ảo dựa trên địa chỉ IP và tên
- Chuyển hướng lỗi 3XX – 5XX
- Sử dụng Regular Expressions để Rewrite URL
- Rewrite URL và  chuyển hướng URL
- Hạn chế tỷ lệ đáp ứng truy vấn
- Giới hạn truy vấn từ một địa chỉ hoặc số kết nối đồng thời
- Có khả năng nhúng mã PERL
- Tương thích và hỗ trợ IPv6
- Hỗ trợ WebSockets kể từ 1.3.13
- Hỗ trợ truyền tải file MP4 và FLV
- Nâng cấp HTTP/1.1, hỗ trợ giao thức HTTP/2

![](https://images.viblo.asia/5bdc268d-95fe-41af-99a4-36122b2b40db.jpg)

Đối với Mail proxy 
- Hỗ trợ STARTTLS
- SMTP, POP3, và IMAP proxy
- Yêu cầu xác thực bằng máy chủ HTTP bên ngoài hoặc bằng các tập lệnh xác thực

Ngoài ra, **Nginx Plus** bao gồm các tính năng bố sung như cân bằng tải nâng cao và truy cập vào bộ số liệu mở rộng để theo dõi hiệu suất. 

Các bạn có thể xem website chạy Nginx như thế nào ngay trong tab network của deverloper tools trên chính trình duyệt của bạn (Ctrl + Shift + I  -> Network , reload lại trang web hiện tại nếu ko thấy tiến trình nào).

# 4. Phân biệt NGINX server và APACHE server

![](https://images.viblo.asia/10817784-32fa-42a7-9ac6-8148ee9dadb0.png)

NGINX và APACHE đều là những server hiệu quả và được sử dụng nhiều nhất hiện nay. Tuy nhiên, giữa NGINX và APACHE vẫn có sự khác biệt nhất định. Các thống kê dưới đây sẽ thể hiện rõ hơn về sự khác biệt đó.

### Giống nhau : 
+ Có thể chạy trên nhiều hệ điều hành của hệ thống UNIX
+ Được hỗ trợ bởi  diễn đàn Stack Overflow và hệ thống Mailing
+ Có khả năng bảo mật bộ mã nguồn tốt
+ Hiệu năng nội dung động tương tự nhau
+ Thời gian chạy trong môi trường PHP của APACHE và NGINX gần giống nhau

### Khác nhau :



| ##### | Nginx | Apache |
| -------- | -------- | -------- |
| Hệ điều hành hỗ trợ     | Hiệu năng của NGINX trên Windows kém hiệu quả     | Hiệu năng của APACHE trên Windows hiệu quả hơn so với NGINX     |
|Hỗ trợ người dùng|NGINX nhận được nhiều sự hỗ trợ từ công ty|APACHE thiếu sự hỗ trợ từ công ty của nó (APACHE Foundation)|
|Static Files|Xử lý 1000 kết nối tới nội dung tĩnh nhanh hơn gấp 2,5 lần so với Apache (thử nghiệm Benchmark), sử dụng ít bộ nhớ hơn so với Apache|Xử lý cùng lúc ít kết nối hơn so với NGINX trong thử nghiệm Benchmark với 1000 và 512 kết nối|
|Khả năng tương thích|Trước đây, NGINX cần Admin biên dịch các Module vào nhị phân NGINX. Hiện nay, NGINX đã được hỗ trợ Dynamic Module|APACHE được cung cấp các Dynamic Module từ rất lâu nên có lợi thế hơn về điểm này|

Các bạn có thể tham khảo thêm so sánh giữa 2 web server ở [đây](https://www.nginx.com/faq/what-is-nginx-how-different-is-it-from-e-g-apache/)

Bài viết chỉ nhằm mục đích là giới thiệu về **Nginx**. Ở phần [tiếp theo](https://viblo.asia/p/tim-hieu-ve-nginx-phan-2-oOVlYP0yZ8W) mình sẽ đi sâu vào cách cấu hình Nginx cho một máy chủ. Cảm ơn mn đã dành thời gian cho bài viết của mình ^^.