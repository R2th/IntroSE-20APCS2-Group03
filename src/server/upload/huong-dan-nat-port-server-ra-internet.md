### Hướng dẫn NAT port để có thể sử dụng các dịch vụ trên server từ xa.

**Case 1:** Với mô hình đơn giản một dải mạng trong toàn bộ hệ thống

Internet <---------------> Router <----------------> Server

*Trong đó Router có thể là modem nhà mạng và chịu trách nhiệm DHCP cho cả hệ thống mạng*

1. Bước 1: Mở port Inbound trên server
3. Bước 2: Truy cập modem với tài khoản mật khẩu đã biết thực hiện mở port theo yêu cầu.
4. Bước 3: Truy cập trang canyouseeme kiểm tra lại trạng thái port.

    Note: Port được mở phải theo dịch vụ sử dụng. Nếu ứng dụng sử dụng port mặc định thì chỉ mở port mặc định của dịch vụ. Nếu ứng dụng thay đổi port dịch vụ thì cần mở theo port đã đổi.
 

-----


**Case 2:** Với mô hình có 2 dải mạng riêng biệt trong hệ thống          
Internet <---------------> Router (chính) <----------------> Router <----------------> Server
 - Trong đó Router chính có thể là modem nhà mạng.
 - Router còn lại có thể là wifi 
 - Hai router sẽ cấp 2 dải mạng độc lập.
1.  Bước 1: Mở port Inbound trên server.
1.  Bước 2: Truy cập modem nhà mạng mở port gắn với ip của modem cấp cho wifi.
1.  Bước 3: Truy cập wifi mở port gắn với ip của wifi cấp cho server.
1.  Bước 4: Truy cập trang canyouseeme kiểm tra lại trạng thái port.

    Note: Port được mở phải theo dịch vụ sử dụng. Nếu ứng dụng sử dụng port mặc định thì chỉ mở port mặc định của dịch vụ. Nếu ứng dụng thay đổi port dịch vụ thì cần mở theo port đã đổi.
    
### *Cám ơn mọi người đã đọc bài viết của mình và khi đọc xong xin cho mình ý kiến phản hồi. Bài viết sau có hay hơn chính là nhờ vào các ý kiến phản hồi của các bạn. Mình xin cám ơn.*