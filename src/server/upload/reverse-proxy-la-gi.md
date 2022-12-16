Reverse proxy là một máy chủ nằm trước các máy chủ web và forwards client (ví dụ: trình duyệt web) đến các máy chủ web đó. Reverse proxy thường được triển khai để giúp tăng cường bảo mật, hiệu suất và độ tin cậy. Để hiểu rõ hơn về cách thức hoạt động của reverse proxy và những lợi ích mà nó có thể mang lại, trước tiên chúng ta hãy xác định proxy server là gì.
### Proxy server là gì
Là một forward proxy, thường được gọi là proxy, proxy server, or web proxy, một máy chủ đặt trước một nhóm máy client. Khi các máy tính đó thực hiện yêu cầu đến các trang web và dịch vụ trên Internet, Proxy server sẽ chặn các yêu cầu đó và sau đó giao tiếp với web server thay mặt cho các máy khách đó, giống như một người trung gian.
* A: This is a user’s home computer
* B: This is a forward proxy server
* C: This is a website’s origin server (where the website data is stored)
![](https://images.viblo.asia/22b21bed-4831-4bf2-8ca8-8e2392dbcda1.png)
Trong giao tiếp Internet tiêu chuẩn, máy tính A sẽ kết nối trực tiếp với máy tính C, với máy khách gửi yêu cầu đến máy chủ gốc và máy chủ gốc phản hồi lại máy khách. Khi có forward proxy, thay vào đó A sẽ gửi yêu cầu đến B, sau đó B sẽ chuyển tiếp yêu cầu đến C. Sau đó, C sẽ gửi phản hồi đến B, B sẽ chuyển tiếp phản hồi lại A.
Tại sao mọi người lại thêm forward proxy vào hoạt động Internet của họ? Có một số lý do mà người ta có thể muốn sử dụng forward proxy:
* Để tránh các hạn chế truy cập của tổ chức nào đố: các tổ chức khác sử dụng tường lửa để cấp cho người dùng của họ quyền truy cập . Một forward proxy có thể được sử dụng để giải quyết những hạn chế này, vì chúng cho phép người dùng kết nối với proxy thay vì trực tiếp đến các trang web họ đang truy cập.
* Để chặn quyền truy cập vào một số nội dung nhất định: Ngược lại, proxy cũng có thể được thiết lập để chặn một nhóm người dùng truy cập các trang web nhất định.
* Để bảo vệ danh tính của họ trực tuyến: Trong một số trường hợp, những người sử dụng Internet thường xuyên chỉ đơn giản là muốn tăng cường tính ẩn danh trên mạng.
### Sự khác nhau giữa reverse proxy với forward proxy
Một reverse proxy là một máy chủ đặt trước một hoặc nhiều máy chủ web, chặn các yêu cầu từ máy khách. Điều này khác với forward proxy , nơi proxy đặt trước máy khách. Với reverse proxy, khi máy khách gửi yêu cầu đến máy chủ gốc của một trang web, những yêu cầu đó sẽ bị chặn ở biên mạng bởi reverse proxy server. Sau đó, reverse proxy server sẽ gửi yêu cầu đến và nhận phản hồi từ máy chủ gốc.

Sự khác biệt giữa reverse proxy và forward proxy là nhỏ nhưng quan trọng. Một cách đơn giản để tóm tắt nó sẽ là nói rằng mộtforward proxy nằm trước một máy client và đảm bảo rằng không có máy chủ gốc nào giao tiếp trực tiếp với máy client cụ thể đó. Mặt khác, reverse proxy nằm trước máy chủ gốc và đảm bảo rằng không có máy client nào giao tiếp trực tiếp với máy chủ gốc đó.
![](https://images.viblo.asia/2edce785-a013-45e5-ab0f-b0c0ae37961c.png)
* D: Any number of users’ home computers
* E: This is a reverse proxy server
* F: One or more origin servers
![](https://images.viblo.asia/f6f22751-a311-4ecd-b6d8-0aaa8823fb6a.png)

Thông thường, tất cả các yêu cầu từ D sẽ chuyển trực tiếp đến F và F sẽ gửi phản hồi trực tiếp đến D. Với reverse proxy, tất cả các yêu cầu từ D sẽ chuyển trực tiếp đến E và E sẽ gửi yêu cầu của nó đến và nhận phản hồi từ F. E sẽ sau đó chuyển các câu trả lời thích hợp cho D.
### Lợi ích của reverse proxy:
* Load balancing: Một trang web phổ biến có hàng triệu người dùng mỗi ngày có thể không thể xử lý tất cả lưu lượng truy cập trang web đến bằng một máy chủ gốc duy nhất. Thay vào đó, trang web có thể được phân phối giữa một nhóm các máy chủ khác nhau, tất cả đều xử lý các yêu cầu cho cùng một trang web. Trong trường hợp này, reverse proxy có thể cung cấp giải pháp cân bằng tải sẽ phân phối đồng đều lưu lượng đến giữa các máy chủ khác nhau để ngăn bất kỳ máy chủ đơn lẻ nào trở nên quá tải. Trong trường hợp một máy chủ bị lỗi hoàn toàn, các máy chủ khác có thể xử lý lưu lượng. M/n có thể tìm hiểu thêm về load balancing tại [đây nhé](https://www.citrix.com/solutions/app-delivery-and-security/load-balancing/what-is-load-balancing.html#:~:text=Load%20balancing%20is%20defined%20as,server%20capable%20of%20fulfilling%20them.).
* Bảo vệ khỏi các cuộc tấn công: Với reverse proxy, một trang web hoặc dịch vụ không bao giờ cần tiết lộ địa chỉ IP của (các) máy chủ gốc của chúng. Điều này làm cho những kẻ tấn công khó thực hiện một cuộc tấn công có chủ đích chống lại chúng, chẳng hạn như một cuộc tấn công DDoS. Thay vào đó, những kẻ tấn công sẽ chỉ có thể nhắm mục tiêu reverse proxy, chẳng hạn như Cloudflare’s CDN, sẽ có bảo mật chặt chẽ hơn và nhiều tài nguyên hơn để chống lại một cuộc tấn công mạng.
* Global Server Load Balancing (GSLB) : Trong hình thức cân bằng tải này, một trang web có thể được phân phối trên một số máy chủ trên toàn cầu và reverse proxy sẽ gửi khách hàng đến máy chủ gần họ nhất về mặt địa lý. Điều này làm giảm khoảng cách mà các yêu cầu và phản hồi cần phải di chuyển, giảm thiểu thời gian tải.
* Caching: Mộtreverse proxy cũng có thể lưu nội dung vào bộ nhớ cache, dẫn đến hiệu suất nhanh hơn. Ví dụ: nếu người dùng ở Paris truy cập trang web được hỗ trợ ngược với máy chủ web ở Los Angeles, người dùng thực sự có thể kết nối với máy chủ proxy ngược cục bộ ở Paris, sau đó sẽ phải giao tiếp với máy chủ gốc ở LA. Máy chủ proxy sau đó có thể lưu vào bộ nhớ cache (hoặc tạm thời lưu) dữ liệu phản hồi. Những người dùng Paris tiếp theo duyệt trang web sau đó sẽ nhận được phiên bản được lưu trong bộ nhớ cache cục bộ từ máy chủ proxy ngược của Paris, dẫn đến hiệu suất nhanh hơn nhiều.
* SSL encryption: Mã hóa và giải mã thông tin liên lạc SSL (hoặc TLS) cho mỗi máy khách có thể tốn kém về mặt tính toán đối với một máy chủ gốc. Một reverse proxy có thể được định cấu hình để giải mã tất cả các yêu cầu đến và mã hóa tất cả các phản hồi gửi đi, giải phóng các tài nguyên có giá trị trên máy chủ gốc.
Chúng đã cùng tìm hiểu cơ bản về reverse proxy. Hy vọng những thông tin trên có thể giúp mọi người hiểu phần nào về reverse proxy. Happy coding!
### Tài liệu tham khảo.
- https://kinsta.com/blog/reverse-proxy/
- https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/ 
- https://www.citrix.com/solutions/app-delivery-and-security/load-balancing/what-is-load-balancing.html#:~:text=Load%20balancing%20is%20defined%20as,server%20capable%20of%20fulfilling%20them