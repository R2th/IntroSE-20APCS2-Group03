# Mục đích của bài viết 
HAProxy, viết tắt của High Availability Proxy, một open source có chức năng cân bằng tải cho TCP/HTTP. Nó có thể chạy trên Linux, Solaris và FreeBSD. Với benchmark khá vượt trội so với các loại Proxy khác, HAProxy có thể cải thiện hiệu năng rất tốt cho hệ thống. HAProxy cũng được sử dụng với nhiều chức năng cụ thể khác nhau như `Reverse Proxy`, `Load Balancer` hoặc `Egress Controller`, ... và tất nhiên các chức năng này hoàn toàn có thể dễ dàng áp dụng trên cluster Kubernetes

Đã có nhiều bài viết giới thiệu HAProxy với các chức năng kể trên, bài viết này sẽ tiếp cận từ 1 chức năng khác. Đó là quản lý luồng ra của application - `Egress Controller`

Bài viết này được lấy cảm hứng từ [HAProxy as Egress Controller
](https://www.haproxy.com/user-spotlight-series/haproxy-as-egress-controller/)

Mình sẽ thuật lại cách ứng dụng và triển khai một số cấu hình nâng cao hơn. Mong các bạn theo dõi.

# Tại sao lại cần Egress Controller
Thông thường, hệ thống sẽ cần một Reverse Proxy để quản lý đầu vào của ứng dụng, từ đó có thể quản lý được lưu lượng truy cập vào ứng dụng và tránh được tấn công dạng DDoS. 

![](https://images.viblo.asia/3b552d1d-a1da-4e01-8580-393567acf3c7.PNG)

Tuy nhiên, với một hệ thống được xây dựng từ nhiều cụm Microservice,
có thể xảy ra trường hợp một cụm quá tải sẽ dẫn đến các cụm liền kề cũng trở nên quá tải. Vì vậy, việc quản lý lưu lượng ra từ một cụm Microservice sẽ tránh được cho cụm Microservice lân cận những hậu quả. Khi đó hệ thống toàn cục sẽ không bị ảnh hưởng quá nhiều.
![](https://images.viblo.asia/59221900-de7f-4a01-ad35-a838624ed339.PNG)

# Triển khai Egress Controller với HAProxy

Để có thể triển khai HAproxy như một Egress Controller cho một Application. Việc đầu tiên là thay đổi địa chỉ URL của request mà Application nó gửi ra. Ngoài ra request đó cũng phải mang theo thông tin địa chỉ muốn gửi tới.

Có nhiều cách thay đổi, mình sẽ ví dụ một cách như sau:

![](https://images.viblo.asia/8cc94d6c-a7fa-48f3-88a6-5033fd33d50e.PNG)

Request thay đổi từ IP và port sang địa chỉ của Egress để gửi resquest tới Egress Controller. Ngoài ra, ta phải thêm 2 trường header mới là `Origin-IP` và `Origin-Port` mang thông tin địa chỉ cần gửi đến. Phía HAProxy sẽ bóc thông tin này để thực hiện thao tác quản lý lưu lượng cũng như có thể forward Request đến địa chỉ gốc

Cấu hình HAProxy trong file `haproxy.cfg`

```
frontend forward-haproxy-frontend
    bind *:8080
    default_backend forward-haproxy-backend

backend forward-haproxy-backend
    http-request set-dst hdr(Origin-IP)
    http-request set-dst-port hdr(Origin-Port)
    server forward 0.0.0.0
```
Dùng config `set-dst` và `set-dst-port` để viết lại URL request theo đúng thông tin trong trường header. Tuy nhiên để cấu hình trên có tác dụng, phải cấu hình bằng `server name 0.0.0.0` 

# Tổng kết
Như vậy với vài cấu hình đơn giản, chúng ta có thể thiết lập HAProxy như là Egress Controller.

Để tránh bài viết quá dài, ở phần sau mình sẽ hướng dẫn rate limiting trên Haproxy Egress Controller

# Reference

[https://docs.haproxy.org/2.6/configuration.html#4.2-http-request%20set-dst](https://docs.haproxy.org/2.6/configuration.html#4.2-http-request%20set-dst)