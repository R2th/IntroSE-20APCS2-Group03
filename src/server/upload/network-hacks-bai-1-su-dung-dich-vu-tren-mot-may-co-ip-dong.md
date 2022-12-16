# Lời mở đầu
Đây là bài đầu tiên trong series Network hacks - các tips/hacks để các bạn xử lý các vấn đề liên quan đến mạng máy tính. Bài viết này liệt kê các cách để có thể truy cập dịch vụ từ máy cá nhân có địa chỉ IP động (ví dụ như thiết bị sử dụng mạng 4G hay các gói Internet gia đình) từ xa qua Internet.

# Vấn đề ở đây là gì?
Khi các bạn sử dụng dịch vụ Internet như 4G hay gói Internet gia đình của các ISP, thiết bị của các bạn (điện thoại với 4G hay modem quang với các gói Internet gia đình) sẽ được cấp cho địa chỉ IP động. Địa chỉ IP động là loại địa chỉ sẽ thay đổi liên tục, khi gặp điều kiện nhất định, thiết bị sẽ gửi một yêu cầu DHCP lấy địa chỉ IP mới. Để người khác truy cập một dịch vụ trên máy các bạn từ Internet, họ phải biết được địa chỉ IP của bạn, với địa chỉ IP nhảy liên tục thì rất khó cho mọi người truy cập được dịch vụ, họ buộc phải thay đổi địa chỉ dịch vụ mỗi khi địa chỉ của bạn bị nhảy. Vấn đề này sẽ tạo ra trải nghiệm người dùng kém và khiến cho các dịch vụ yêu cầu tính ổn định không thể chạy được.

# Vậy xử lý thôi
### Cách 1: DDNS
Về DNS thì các bạn có thể xem qua [bài viết này](https://viblo.asia/p/dns-la-gi-va-cach-thuc-hoat-dong-cua-no-3Q75w7kB5Wb). DDNS (Dynamic DNS) là một cách để các bạn có thể phân giải tên miền ra IP của một host có địa chỉ IP động (dynamic IP). Cách hoạt động của DDNS là: bên cung cấp dịch vụ DDNS sẽ cung cấp một ứng dụng chạy ở thiết bị có IP động, ứng dụng này sẽ lấy địa chỉ IP của thiết bị liên tục, nếu có thay đổi thì cập nhật trên server DDNS. Cách này vô cùng dễ làm, các router có sẵn trên thị trường hầu hết đều đã có sẵn dịch vụ của vài nhà cung cấp dịch vụ DDNS nổi tiếng như [No-IP](https://www.noip.com/) hay [Dynu](https://www.dynu.com/en-US). Các bạn chỉ cần đăng ký tên miền và cài đặt dịch vụ của các bên cung cấp là xong, sau đó chỉ cần dùng tên miền đã đăng ký là có thể lấy được địa chỉ IP rồi.<br>
Sau đấy là port forwarding thôi. Về port forwarding thì các bạn có thể tham khảo [bài viết này](https://quantrimang.com/huong-dan-cach-thiet-lap-port-forwarding-tren-router-118468).

Ưu điểm: Khá dễ cài đặt.<br>
Nhược điểm: Phải có quyền để forward port.<br>
Phù hợp: Các dịch vụ yêu cầu có độ trễ thấp như host server game độ trễ thấp (FPS).

### Cách 2: VPN
VPN là một mạng riêng ảo cho phép đưa một mạng riêng (private) tham gia vào mạng công cộng (public), các thiết bị kết nối vào VPN sẽ có khả năng sử dụng tài nguyên trong VPN (các thiết bị khác đã kết nối vào VPN).<br>
Theo như định nghĩa trên, nếu chúng ta cần sử dụng dịch vụ của máy A từ máy B, ta chỉ cần cho 2 máy vào chung một VPN là có thể truy cập lẫn nhau. Cách này không thực sự giúp thiết bị cung cấp dịch vụ có thể truy cập từ Internet nhưng đã giải quyết được vấn đề truy cập. Có rất nhiều VPN miễn phí tuy nhiên độ trễ cao, các bạn có thể tự tạo VPN của riêng mình, cái này mình không đi vào chi tiết.

Ưu điểm: Khá dễ cài đặt.<br>
Nhược điểm: Độ trễ cao hơn so với cách 1, thiết bị cung cấp dịch vụ không tham gia vào Internet.<br>
Phù hợp: Các dịch vụ yêu cầu đỗ trễ trung bình như stream video, host server game yêu cầu độ trễ không quá cao.

### Cách 3: Relay server
Như chúng ta đã biết, để truy cập một thiết bị cung cấp dịch vụ (server) chúng ta bắt buộc phải biết được địa chỉ của nó. Vậy thì đơn giản là biến cả 2 thiết bị (thiết bị sử dụng dịch vụ và server) trở thành client hết là xong. Cơ chế hoạt động của nó như sau:
![image.png](https://images.viblo.asia/95cd828d-c1db-4a7e-b9c1-ed5da36ce2e6.png)

Cả `Client` và `Service provider` đều sẽ kết nối vào `Relay server` nhưng trên 2 port khác nhau, `Relay server` là một server có **địa chỉ hoặc tên miền cố định**, chỉ có nhiệm vụ chuyển tiếp các gói tin giữa 2 port này. Để thực hiện cơ chế này các bạn có thể dùng [socat](https://linux.die.net/man/1/socat) (ví dụ: `socat tcp-listen:22,fork tcp:localhost:222`) hoặc [netcat](https://linux.die.net/man/1/nc) (ví dụ: `nc -l -p 22 | nc localhost 222`). Bên phía `Service provider` sẽ phải chuyển các gói tin từ kết nối tới `Relay server` tới dịch vụ đang host trên máy mình, tới bước này thì ta có thể dùng một thứ rất quen thuộc là [ssh](https://viblo.asia/p/ssh-how-it-works-LzD5dLQd5jY), `ssh` có một món gọi là [ssh tunnel](https://viblo.asia/p/ssh-tunneling-local-port-forwarding-va-remote-port-forwarding-07LKXJ3PlV4), ta có thể sử dụng `ssh tunnel` để kết nối tới `Relay server` và chuyển thẳng những gói tin đấy sang port của dịch vụ.

Ưu điểm: Mặc dù gần giống như VPN nhưng thiết bị đã thực sự tham gia vào Internet.<br>
Nhược điểm: Khó cài đặt, yêu cầu phải có `Relay server` ổn định.<br>
Phù hợp: :) ông nào ngựa ngựa bắt buộc dịch vụ phải tham gia vào Internet nhưng lại không được cấu hình port forwarding.