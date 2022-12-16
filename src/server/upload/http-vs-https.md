# 1. Giới thiệu
Như các bạn đã biết HTTP là giao thức đã tồn tại hơn 15 năm và giao thức này tồn tại những lỗ hổng về bảo mật.
<br>
<br>
Mà theo sự phát triển của internet, dữ liệu thông tin của người dùng ngày càng lớn, vấn đề bảo mật của một website càng ngày càng được chú trọng. Đòi hỏi cần phải ra đời 1 giao thức mới an toàn hơn. 
<br>
<br>
Nên vào tháng 8 năm 2014, Google công bố sử dụng HTTPS để khắc phục những vẫn đề bảo mật mà phương thức HTTP đang gặp phải.
<br>
<br>
Và hôm nay chúng ta sẽ đi tìm hiểu sự khác biệt giữa chúng, ưu điểm và nhược điểm của từng giao thức.
# 2. HTTP là gì?
## 2.1 Khái niệm
**HTTP** - *HyperText Transfer Protocol* (Giao thức truyền tải siêu văn bản), là một giao thức dùng để truyền tải thông tin qua Internet.

## 2.2 Cách thức hoạt động
HTTP hoạt động theo **mô hình Client - Server**. 

Trong mô hình này, trình duyệt web mà user sử dụng đóng vai trò là **Client** tạo request, gửi lên máy chủ **Server**, server tiếp nhận, xử lý request và phản hồi lại cho client. Và để Client và Server có thể nói chuyện được với nhau thì phải thông qua các giao thức. Một trong những giao thức được sử dụng thường xuyên nhất chính là HTTP. 

![](https://images.viblo.asia/bf2753ed-e43a-48a3-ad46-c961aa9cb5c1.jpg)

# 2.3 Rủi ro
Một trường hợp quen thuộc là bạn đang ngồi trong quán caffe và **đăng nhập Facebook** thông qua wifi của quán trên trình duyệt, theo giao thức Http. Mạng wifi của quán là public, bất cứ ai kết nối với nó đều có thể truy cập dữ liệu đang được chuyển giao. Ngay cả khi wifi có mật khẩu, thì những những người dùng cùng kết nối vào wifi của quán cũng có thể truy cập được dữ liệu được chuyển giao.
<br>
<br>
**Dữ liệu được chuyển giao** là những thông tin trao đổi giữa bạn và server cụ thể chính là **username và password** mà bạn vừa đăng nhập vào facebook, hoặc bất kì thao tác nào của bạn trên facebook.
<br>
<br>
Tất nhiên bạn vẫn đăng nhập được facebook và sử dụng được một cách bình thường. 
<br>
<br>
Tuy nhiên đằng sau đó thì username và password của bạn đang lồ lộ vì **HTTP sẽ không mã hóa dữ liệu**. Vì vậy bất kì dữ liệu nào được truyền thông qua giao thức HTTP đều có thể bị đánh cắp hoặc thay đổi từ người có ý đồ xấu muốn đánh cắp.
<br>
<br>
Hình thức đánh cắp trường hợp trên thông thường là **Sniffing attacks** 
<br>
<br>
Để thực hiện **sniffing attacks** Hacker dùng một công cụ gọi là **sniffing**
<br>
<br>
Công cụ này ra đời với một sứ mệnh rất chính đáng, đó là dùng để phân tích, khắc phục sự cố mạng thông tin qua việc bắt gói tin. Tuy nhiên, đối với Harker thì nó chính là công cụ đắc lực để có thể bắt gói tin trong đó có username, password,... của bạn và thật nguy hiểm nếu những thông tin này lồ lộ ra mà không có gì che đậy. (devil)
<br>
<br>
Như đã đề cập phía trên, HTTP không mã hóa dữ liệu trong quá trình trao đổi của client và server. Như vậy bạn có thể mất thông tin bất cứ lúc nào.
Hiện tại chrome cũng đã trợ giúp nhận biết trang web hiện tại có an toàn hay không
[link](https://support.google.com/chrome/answer/95617?hl=vi)
<br>
<br>
Chính vì vậy, một giao thức mới được ra đời để khắc phục nhược điểm trên đó là giao thức **HTTPS**

**HTTPS** ngoài giúp bạn phòng ngừa **Sniffing attacks** ra cũng có thể bảo vệ bạn khỏi . 
# 3. HTTPS
## 3.1 Khái niệm:
Giống như HTTP, HTTPS -*HyperText Transfer Protocol Secure* cũng là một giao thức giúp truyền thông tin giữa Client và Server.
<br>
<br>
HTTPS bảo mật dữ liệu của bạn bằng cách sử dụng giao thức TSL (Transport Layer Security) hay còn gọi là SSL.
## 3.2 SSL là gì
### 3.2.1 Khái niệm
**SSL** là một dạng **chứng thư số.**

**SSL đã kết hợp những yếu tố sau để thiết lập được một giao dịch an toàn:**
* **Mã hoá:** đảm bảo thông tin không thể bị truy cập bởi đối tượng thứ ba. Dữ liệu phải được mã hoá để không thể bị đọc được bởi những người khác ngoài client và server. Đây là cách giải quyết đối với bài toán phía trên.
* **Xác thực:** đảm bảo tính xác thực của trang mà bạn sẽ làm việc ở đầu kia của kết nối. Cũng như vậy, các trang Web cũng cần phải kiểm tra tính xác thực của người sử dụng. Điều này giúp cho người dùng sự tin cậy cần thiết trước khi họ kết nối với website.
* **Toàn vẹn dữ liệu:** đảm bảo thông tin không bị sai lệch. Thể hiện chính xác thông tin gốc gửi đến. 
* Với việc sử dụng SSL, các Web site có thể cung cấp khả năng bảo mật thông tin. Xác thực và toàn vẹn dữ liệu đến người dùng. SSL được tích hợp sẵn vào các trình duyệt và Web server. Cho phép người sử dụng làm việc với các trang Web ở chế độ an toàn.
### Làm thế nào để cài đặt SSL riêng của bạn?
Tong [bài viết](https://www.hostinger.vn/lam-the-nao/lam-the-nao-de-cai-dat-ssl-rieng-cua-ban#gref) này đã giới thiệu rõ ràng về các step để cài đặt SSL cho riêng bạn. nên mình ko nói gì thêm :D
### 3.2.2 Cách người dùng nhận biết website có sử dụng SSL hay không
![](https://images.viblo.asia/09789010-de72-4273-9dde-3604d0174450.png)
![](https://images.viblo.asia/9d59f9f8-2b36-491f-af00-426eaa1413a1.png)
![](https://images.viblo.asia/38c8731b-b560-4aa5-8ca6-c36d4a06fc67.png)
# Kết luận
Thông qua bài viết trên, chắc hẵn mọi người đã có thêm thông tin để quyết định mình nên sử dụng HTTP hay HTTPS. Cảm ơn các bạn đã xem
# Tài liệu tham khảo
https://www.digistar.vn/cach-thuc-hoat-dong-cua-ssl
https://ssllabel.com/tu-van-ssl/?gclid=EAIaIQobChMIp-uxocHJ3QIVCayWCh3sHAvEEAAYASAAEgIY1_D_BwE