# Jmeter là gì
Jmeter là ứng dụng viết trên mã nguồn mở(open source), được viết 100% trên java và là ứng dụng dành cho việc test tải (load test) tốc độ thực thi của ứng dụng web. Ban đầu nó được thiết kế để đơn thuần kiểm tra cho ứng dụng web, sau đã được mở rộng ra nhiều chức năng khác.

Apache JMeter có thể được sử dụng để kiểm tra hiệu suất cả trên các tài nguyên tĩnh, động và các ứng dụng Web. Nó có thể được sử dụng để mô phỏng một lượng người dùng ảo, request lớn trên một máy chủ, nhóm máy chủ, mạng hoặc đối tượng để kiểm tra về độ tải của nó hoặc để phân tích thời gian phản hồi tổng thể dưới các loại tải khác nhau.

![](https://images.viblo.asia/b7cc1dbb-4437-4b85-9728-b67edbceb054.png)https://images.viblo.asia/b7cc1dbb-4437-4b85-9728-b67edbceb054.png

# Những tính năng của Jmeter
Apache jmeter bao gồm các tính năng:
* Khả năng và thử nghiệm hiệu suất nhiều ứng dụng, server và protocol khác nhau:
    - Web -HTTP, HTTPS (Java, NodeJS, PHP, ASP.NET)
    - SOAP/REST Webservices
    - FTP
    - LDAP
    - Database via JDBC
    - Message-oriented middleware(MOM) via JMS
    - Mail -SMTP(s), POP3(S) and IMAP(S)
    - Native commands or shell scripts
    - TCP
    - Java Objects
* Đầy đủ tính năng ghi lại quá trình kiểm thử từ website hoặc chính ứng dụng này, và có khả năng debuging.
* Lựa chọn sử dụng với command-line để thử nghiệm tải từ java compatible OS(Linux, Windows, Mac OSX...)

Như bạn đã thấy bên trên, jmeter khá là nhiều tính năng. Nhìn qua thì có thể thấy rắc rối hay lo lắng, nhưng hãy đừng lo lắng bởi vì nếu bạn biết làm thế nào để load một ứng dụng web sử dụng HTTP Sampler thì bạn đã có thể bao quát đc 90% để sử dụng nó.

# Ví dụ những trường hợp sử dụng để test load
Tốt hơn với những lý thuyết giải thích bên trên, bạn có thể  dùng jmeter để test load trong một số các trường hợp sau:
* Một trang thương mại điện tử như lazada chằng hạn, sẽ có chương trình sale off 90% trong 1 phút.
* Hoặc một sự kiện mang tầm cỡ nào đó sẽ phát vé online miễn phí trong một khoảng thời gian ngắn...


Bạn thử nghĩ xem, những ví dụ như bên trên hoặc tương tự sẽ áp dụng vào đó các bài toán vê số lượng người truy cập trên 1 giây có thể lên đến hàng nghìn, chục nghìn hay có thể  tới hàng trăm nghìn/giây. Với các trường hợp như này khi xây dựng hệ thống ta ko thể cover được hết lỗi phát sinh khi số lượng người truy cập tăng cao hay càng ko thể để ứng dụng phát hành ra bên ngoài rồi mà ko có sự chuẩn bị trước. Lúc này thì cần phải sử dụng jmeter để tính toán và thử nghiệm hết các tình huống có thể xảy ra.