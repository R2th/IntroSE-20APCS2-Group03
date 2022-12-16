## Introduction
Nắm bắt được protocol là rất quan trọng để có được sự hiểu biết tốt về security testing. Khi một gói tin (packet data) bị chặn giữa webserver và client, đó chính là lúc bạn sẽ nhận thức được mức độ quan trọng của protocol. 
![](https://images.viblo.asia/cf32ee4e-2e80-4911-89d7-bb4ae5a9a18e.jpg)
## HTTP Protocol
HTTP là từ viết tắt của Hypertext Transfer Protocol. HTTP là giao thức ở tầng application cho các hệ thống phân tán, kết hợp hay là hệ thống thông tin hypermedia. Nó là nền tảng cho việc giao tiếp thông tin trên World Wide Web (www) từ năm 1990. HTTP là giao thức chung và dưới dạng `stateless protocol` cho phép người dùng sử dụng với nhiều mục đích khác cũng như là sử dụng extension của các request method, error codes và headers của chính nó.

Về cơ bản, HTTP là một giao thức giao tiếp dựa trên TCP/IP, được sử dụng để phân phối dữ liệu như là file HTML, file hình ảnh, kết quả truy vấn, v.v. thông qua web. Nó cung cấp một phương thức chuẩn hóa để các máy tính có thể giao tiếp với nhau. HTTP chỉ ra cách thức làm thế nào để dữ liệu yêu cầu của client được gửi đến server và làm thế nào để server phản hồi các yêu cầu này.

`Stateless protocol`
là thiết kế không lưu dữ liệu của client trên server, có nghĩa là sau khi client gửi dữ liệu lên server, server thực thi xong và trả về kết quả thì server không lưu bất cứ dữ liệu gì của client. 
### Basic features
Có ba tính năng cơ bản sau đây giúp HTTP trở thành một giao thức đơn giản nhưng mạnh mẽ: 
* ***HTTP - Connectionless***: phía HTTP client, ví dụ như là browser sẽ khởi tạo HTTP request. Sau quá trình khởi tạo request, phía client ngắt kết nối đến server và đợi phản hồi. Phía server sẽ tiến hành xử lý request và tái thiết lập kết nối với client để gửi về phản hồi.
* ***HTTP - Media independent***: bất kỳ loại dữ liệu nào cũng có thể được gửi bằng HTTP miễn là client và server đều biết cách xử lý nội dung dữ liệu. Điều này là bắt buộc đối với client cũng như server để chỉ định loại nội dung bằng cách sử dụng loại `MIME-type` phù hợp.
* ***HTTP - Stateless***: server và client chỉ nhận biết được lẫn nhau ở trong một request ngay lúc đó. Sau đó, cả hai phía sẽ mất kết nối với nhau. Do tính chất này của giao thức, cả client và trình duyệt đều không thể lưu giữ thông tin giữa các request khác nhau trên các trang web.

HTTP/1.0 sử dụng một kết nối mới cho mỗi giao dịch trao đổi request/respone trong khi HTTP/1.1 có thể được sử dụng cho một hoặc nhiều giao dịch trao đổi request/respone.

`MIME` là viết tắt của "Multipurpose Internet Mail Extensions" là một chuẩn Internet về định dạng cho thư điện tử.
### Architecture
Sơ đồ sau đây mô tả kiến trúc cơ bản của một ứng dụng web và mô tả HTTP
![](https://images.viblo.asia/b6dcc3e2-53c9-4e57-ac90-0650fef01c1b.jpg)
Giao thức HTTP là giao thức request/respone dựa trên cấu trúc client/server nơi trình duyệt web, robot và search engines, v.v ... hoạt động như là các HTTP client và web server hoạt động như là các server. 
* ***Client***: HTTP clients gửi một request đến server dưới dạng request method, URL và protocol version, theo sau là một message giống như MIME, chứa request modifiers, thông tin client và có thể là body content thông qua kết nối TCP/IP
* ***Server***: HTTP server phản hồi dưới dạng status line chứa protcol version của message và code status thành công hay có lỗi xuất hiện, theo sau là một message giống như MIME, chứa thông tin về server, thông tin entity meta và có thể chứa nội dung entity-body 
### HTTP – Disadvantages
![](https://images.viblo.asia/de8406e6-b06c-4374-808d-1b4f9b9a6886.jpg)
* HTTP không bảo mật 
* HTTP sử dụng port 80 mặc định để trao đổi data 
* HTTP hoạt động ở tầng ứng dụng (application Layer) để truyền được data thì nó sẽ phải thiết lập nhiều cổng kết nối, vô hình chung làm tốn nhiều chi phí vận hành
* HTTP không yêu cầu các chứng chỉ về mã hóa (encryption certificates) và các chứng chỉ số (digital certificate)

Chi tiết về HTTP Protocol Details sẽ được đề cập tiếp ở bài viết sau, mọi người cùng đón đọc nhé. 

## HTTPs Protocol
HTTPS (Hypertext Transfer Protocol over Secure Socket Layer) hoặc HTTP qua SSL là giao thức web được phát triển bởi Netscape. Nó không phải là một giao thức mà nó chỉ là kết quả của việc xếp lớp HTTP lên trên SSL / TLS (Secure Socket Layer/Transport Layer Security).

Nói tóm lại, HTTPS = HTTP + SSL

![](https://images.viblo.asia/2ba6020e-fa9a-4404-a8a0-81ee6ba176ea.jpg)

### When is HTTPS Required?
Khi sử dụng browser, việc gửi và nhận thông tin sẽ được thực thi bằng giao thức HTTP. Vì vậy, điều này dẫn đến hệ quả là bất cứ ai cũng đều có thể nghe lén được cuộc trò chuyện giữa máy tính của chúng ta vs máy chủ web (web server). Vậy khi cần trao đổi những thông tin nhạy cảm, thông tin cá nhân thì trường hợp này nên cần được xử lý như thế nào? Đó chính là khi HTTPS cần được sử dụng để bảo mật và ngăn chặn truy cập trái phép.

Https protocol thường sử dụng trong các scenarios sau: 
* Banking Websites
* Payment Gateway
* Shopping Websites
* All Login Pages
* Email Apps
### Basic Working of HTTPS
1.  HTTPS Protocol yêu cầu public key và signed certificates từ server.
2.  Client gửi requests lên trang https://
3.  Khi sử dụng kết nối bằng giao thức https, server gửi responds đến kết nối khởi tạo bằng cách cung cấp 1 danh sách các phương thức mã hóa (encryption method) mà webserver hỗ trợ.
4.  Trong quá trình phản hồi, phía client lựa chọn một phương thức kết nối và client và server sẽ trao đổi chứng chỉ (certificates) để chứng thực danh tính của đôi bên 
5.  Sau khi step 4 hoàn thành, cả webserver và client sẽ trao đổi thông tin đã được mã hóa sau khi chắc chắn rằng đôi bên đang sử dụng key giống nhau và kết nối sẽ được đóng lại. 
6.  Để lưu trữ các kết nối https, server phải có public key certificate mà trong key đó nhúng thông tin khóa (key information) với xác minh danh tính chủ sở hữu khóa (key owner's identity).
7.  Tất cả các chứng chỉ (certificates) được xác minh bởi một bên thứ 3 (third party) cốt để clients được đảm bảo rằng key luôn được bảo mật

![](https://images.viblo.asia/f9cd86e7-d7ad-4f8d-9144-e7acc8b09e7c.jpg)

## Conclusion
HTTPS an toàn hơn so với HTTP rất nhiều trong việc mã hóa dữ liệu, bảo mật thông tin cá nhân. Tuy nhiên mỗi một phương thức đều có ưu điểm và nhược điểm.

HTTP là tốc độ phản hồi của website truy cập nhanh hơn HTTPS. Vì vậy nó thường được sử dụng cho các trang tin tức cần thông tin nhanh.

HTTPS do bảo mật hơn nên nó thường được sử dụng cho các trang phải nhập dữ liệu như tài khoản ngân hàng, email cá nhân, các trang cần giao dịch. 

Tùy thuộc vào mục đích mà HTTP hay HTTPS được sử dụng cho các trang web. Khi nghiên cứu về security testing, chúng ta cần nắm được tổng quan về các giao thức này để hiểu về cách gói tin được bảo mật hay không bảo mật như thế nào trên đường truyền Internet.

References: https://www.tutorialspoint.com/security_testing/http_protocol_basics.htm