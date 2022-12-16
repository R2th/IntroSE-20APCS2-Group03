Proxy được chia ra làm 2 loại chính: Forward Proxy và Reverse Proxy. Khi người ta nhắc tới `proxy`  không thôi thì thường là họ nói tới `Forward Proxy`, vậy `Foward Proxy` và `Reverse Proxy` là gì và chúng khác nhau như thế nào??
# Proxy
Proxy trong tiếng anh có nghĩa là “người được ủy nhiệm, ủy quyền”. 

Proxy là một server có nghiệm vụ chuyển tiếp và kiểm soát thông tin giữa client và server phía backend. Proxy gồm 1 địa chỉ IP và một port để truy cập cố định.

# Forward Proxy
![](https://images.viblo.asia/42f35b30-ce00-4c70-9fa6-0ae5da4c420e.jpg)

Forward Proxy thường được gọi tắt luôn là `proxy`. Chúng là loại proxy server được dùng phía client, nó có thể được đặt ở trong mạng nội bộ hoặc trên internet. 

Khi sử dụng forward proxy, các requests phía client sẽ tới proxy server và proxy server sẽ chuyển tiếp các requests này tới Internet. Tác dụng:
- Ẩn địa chỉ IP của client khi truy cập tới các website trên internet do phía các website chỉ có thể biết được địa chỉ của forward proxy server. 
- Bypass firewall restriction để truy cập các website bị chặn bởi công ty, chính phủ, bla bla.
- Dùng trong công ty, tổ chức để chặn các website không mong muốn, quản lý truy cập và chặn các content độc hại.
- Sử dụng làm caching server để tăng tốc độ.

# Reverse Proxy
![](https://images.viblo.asia/b1c64752-1007-42c6-a864-49865f023acf.jpg)

Thay vì dùng ở phía client như là `Forward Proxy` thì `Reverse Proxy` sẽ được dùng ở phía server.

Requests sẽ đi từ client tới proxy server và sau đó proxy server sẽ chuyển tiếp các requests này tới server backend. Tác dụng của `Reverse Proxy` bao gồm:
- Load balancing: giúp điều phối requests tới các servers backend để cân bằng tải, ngoài ra nó còn giúp hệ thống đạt tính sẵn sàng cao khi lỡ không may có server bị ngỏm thì nó sẽ chuyển request tới một server còn sống để thực thi.
- Increased Security: Reverse Proxy còn đóng vai trò là một lớp bảo vệ cho các servers backend. Nó giúp cho chúng ta có thể ẩn đi địa chỉ và cấu trúc thực của server backend.
- Logging: Tất cả các requests tới các servers backend đều phải đi qua reverse proxy nên việc quản lý log của access tới từng server và endpoint sẽ dễ dàng hơn rất nhiều so với việc kiểm tra trên từng server một.
- Encrypted Connection: Bằng việc mã hóa kết nối giữa client và reverse proxy với TLS, users sẽ được hưởng lợi từ việc mã hóa dữ liệu và bảo mật với HTTPS.

# Lời kết
Hi vọng qua bài viết này các bạn có thể hiểu được Forward Proxy và Reverse Proxy là gì, chúng khác nhau như thế nào, và chúng để làm gì. Ở bài viết tiếp theo mình sẽ hướng dẫn các bạn cách để sử dụng NGINX để làm một reverse proxy server.