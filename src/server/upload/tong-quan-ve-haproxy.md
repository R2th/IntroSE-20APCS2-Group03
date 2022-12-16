### HAProxy là gì
HAProxy (High Availability Proxy) là một công cụ mã nguồn mở ứng dụng cho giải pháp cân bằng tải TCP và HTTP. Người dùng có thể sử dụng HAProxy để cải thiện độ hoàn thiện của các trang web và ứng dụng bằng cách phân tán khối lượng công việc của chúng trên nhiều máy chủ. Cải thiện hiệu suất bao gồm giảm phản hồi thời gian và tăng thông lượng. HAProxy cũng được sử dụng trong các hệ thống lớn có lưu lượng truy cập cao như GoDaddy, GitHub, Bitbucket, Stack Overflow, Reddit, Speedtest.net, Twitter và trong nhiều sản phẩm cung cấp bởi Amazon Web Service.
**Tính năng của HAProxy**
![image.png](https://images.viblo.asia/b7b8ae0a-24a4-46d0-add9-6689f3176ad9.png)
Các tính năng của HAProxy bao gồm:
* Hỗ trợ cân bằng tải ở lớp 4 và lớp 7 ( tương ứng với TCP và HTTP),
* Support HTTP protocol, HTTP / 2, gRPC, FastCGI.
* Chấm dứt SSL / TLS.
* Lưu trữ chứng chỉ SSL động.
* Chuyển đổi nội dung và kiểm tra.
* Ủy quyền minh bạch.
* Ghi nhật ký chi tiết.
* CLI.
* Xác thực HTTP.
* Đa luồng
* Rewrite URL.
### Cân bằng tải
HAProxy là một trong những phần mềm hàng đầu trong việc cân bằng tải và được sử dụng chạy trên Linux, Solaris và FreeBSD. Vậy cân bẳng tải là gì?

Chúng ta có một ví dụ, nếu người dùng kết nối trực tiếp đến web server(domainxyz.com). Nếu web server duy nhất này gặp vấn đề, người dùng sẽ không thể truy cập vào website được nữa. Hoặc nếu nhiều người dùng cố gắng truy cập vào server cùng một lúc thì sẽ xảy ra hiện trạng quá tải, khiến thời gian tải website bị chậm đi, đóng băng hoặc kết nói bị gián đoạn.

Ta có thể khắc phục bằng cách thêm vào hệ thống cân bằng tải và ít nhất một web server hỗ trợ bổ sung trên backend. Thông thường là tất cả nội dụng mà người dùng nhận được là như nhau dù cho họ đang connect đến server nào. Đó là ví dụ cho sự quan trọng của cân bằng tải, nếu web server là các hệ thống lớn các website có nhiều lượng truy cập cực cao thì việc sử dụng hệ thống cân bằng tải là không thể thiếu để tránh gây ảnh hưởng không đáng.

**Thuật toán cân bằng tải***
Các thuật toán được sử dụng trong cân bằng tải(load balancer):
* **round-robin**: Đây là thuật toán mặc định được sử dụng cho HAProxy, các request sẽ lần lượt chuyển tới server.
* **leastconn:** Các request sẽ được chuyển tới server có ít kết nói đến nó nhất.
* **source**: Các request sẽ được chuyển đến server bằng các hash của IP người dùng
### Bảo mật trong HAProxy
![image.png](https://images.viblo.asia/5e78a4bb-c41c-4156-8ad4-a79762b516e7.png)

HAProxy được coi là an toàn, nó có rất ít lỗ hỏng trong các năm qua. Nó chứa các tính năng có thể hạn chế tấn công như cô lập chính nó sử dụng chroot, drop ngay user/group không có các quyền đặc biệt khi khỏi động và tránh truy cập vào ổ cứng khi khởi động.

HAProxy cũng có thể được sử dụng để bảo mật cho các hệ thống khác, ví dụ như: HAProxy theo dõi lưu lượng truy cập và giám sát hành vi của khách hàng thông qua các yêu cầu, sau đó có thể chặn khách hàng đó nếu thấy khả nghi. Người dùng có thể cấu hình ACL, xác định các chính sách để kiểm tra dữ liệu của các truy cập. Nó cũng có thể giới hạn tốc độ và danh sách IP Blacklist/Whitelist/
### Health Check
HAProxy sử dụng health check để phát hiện các backend server sẵn sàng xử lý request. Kỹ thuật này sẽ trách việc loại bỏ server khỏi backend thủ công khi backend server không sẵn sàng. Health check sẽ cố gắng thiế lập kết nói TCP tơi server để kiểm tra backend server có sẵn sàng xử lý request.

Nếu health check không thể kế nói tới server, nó sẽ tự động loại server khỏi backend, các traffic tới sẽ không được chuyển đến server cho đến khi nó có thể pass healthy check. Nếu tất cả server thuộc backend đều xảy ra vấn đề, service sẽ trở nên không khả dụng cho đến khi 1 server thuộc backend chuyển về trạng thái sẵn sàng.
### Tóm lại
HAProxy là một công cụ không thể thiếu trong việc build web server của những hệ thống rộng lớn và sở hữu nhiều lượt truy cập. Hy vọng bài viết của mình sẽ có ích cho bạn, have a nice day <3.

Bài viết tham khảo:
HAProxy là gì? Cách ứng dụng Load Balacing trong cân bằng tải: https://vietnix.vn/tong-quan-haproxy-va-load-balacing/

Cân bằng tải - Load Balancing là gì và tại sao phải dùng cân bằng tải?: https://viettelidc.com.vn/tin-tuc/can-bang-tai-load-balancing-la-gi-va-tai-sao-phai-dung-can-bang-tai

Tổng quan và các khái niệm quan trọng về cân bằng tải trong HAProxy: https://blog.cloud365.vn/linux/tong-quan-haproxy/