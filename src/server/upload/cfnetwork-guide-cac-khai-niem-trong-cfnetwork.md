CFNetwork là một low-level, high-performance framework cung cấp cho ta khả năng kiểm soát ở mức độ chi tiết hơn về protocol stack. Nó giống như là một phần mở rộng của BSD sockets (một bộ socket API tiêu chuẩn cung cấp các object để đơn giản hóa các tác vụ như giao tiếp với FTP và HTTP server hoặc phân giải tên miền). CFNetwork được base trên BSD sockets cả về mặt lý thuyết lẫn vật lý.

Cũng giống như việc CFNetwork nằm trên BSD sockets, thì cũng có một loạt các Cocoa class nằm trên CFNetwork. Ví dụ như `NSURL`, hay Web Kit (một tập các Cocoa class để hiện thị web content lên các cửa sổ giao diện). Tất cả các class này đều ở mức high level và chúng tự implement phần lớn các networking protocol.

![](https://images.viblo.asia/36615d23-a06b-4fe8-ba46-bc6b67564e96.png)

*Hình 1. CFNetwork và các software layer trên OS X*
# Khi nào cần sử dụng CFNetwork
CFNetwork có rất nhiều lợi thế so với BSD sockets. Nó tích hợp run-loop, vì thế nên nếu app thuộc dạng run-loop based thì ta có thể sử dụng các network protocol mà không cần làm việc với threads. CFNetwork cũng có một số các objects để giúp ta sử dụng network protocol mà không cần phải tự implement. Ví dụ ta có thể dùng FTP protocol mà không cần phải implement toàn bộ protocol vì đã có bộ CFFTP API. Nói chung nếu bạn là một người hiểu về networking protocol và muốn kiểm soát những thứ mà protocol đó cung cấp ở mức low-level, nhưng lại không muốn tự implement protocol, thế thì CFNetwork sẽ là một lựa chọn đúng đắn.

Và so với việc sử dụng các API ở mức Foundation, thì CFNetwork cũng lợi thế hơn nhiều. CFNetwork tập trung nhiều vào các network protocol, còn Foundation-level APIs tập trung vào data access, ví dụ như là việc transfer data qua HTTP hoặc FTP. Mặc dù Foundation APIs cung cấp một số khả năng cấu hình, nhưng mà CFNetwork còn có thể đem lại nhiều thứ hơn.

Bây giờ ta đã hiểu CFNetwork tương tác với các networking API khác như thế nào, phần tiếp theo chúng ta sẽ đi tìm hiểu 2 bộ API cấu thành nên CFNetwork Infrastructure.

# CFNetwork Infrastructure
Trước khi bước vào tìm hiểu về các CFNetwork API, ta cần phải biết về các APIs đặt nền tảng cho CFNetwork.

CFNetwork xây dựng dựa trên hai API, hai API này là một phần Core Foundation framework: CFSocket và CFStream. Ta cần phải hiểu những API này để có thể sử dụng CFNetwork.

## CFSocket API
Socket là tầng cơ bản nhất của của network communication. Một socket hoạt động tương tự như một ổ cắm điện thoại bàn ngày xưa. Nó cho phép ta  kết nối với các socket khác (bằng kết nối local hoặc thông qua một network) và gửi dữ liệu tới socket đó.

Để lập trình, socket được trừu tượng hóa thành BSD socket và đây là hình thức phổ biến nhất. CFSocket lại là một mức trừu tượng cao hơn của BSD sockets. CFSocket cung cấp gần như tất cả các tính năng của BSD sockets nhưng giúp ta tốn ít công sức để thực hiện nhất có thể, và tích hợp socket vào run-loop. CFSocket không hề bị giới hạn bởi stream-based socket (ví dụ như TCP socket), nó có thể xử lý tất cả các loại socket.

Ta có thể tạo ra một CFSocket object từ hàm `CFSocketCreate`, hoặc từ một BSD socket sử dụng hàm `CFSocketCreateWithNative`. Sau đó, ta có thể tạo một run-loop source sử dụng hàm `CFSocketCreateRunLoopSource` và thêm socket vào run loop với hàm `CFRunLoopAddSource`. Việc này sẽ cho phép hàm callback của CFSocket được chạy khi mà CFSocket đó nhận được message.

## CFStream API
Các stream đọc và ghi cung cấp một cách rất dễ dàng để trao đổi dữ liệu đi và về giữa một loạt các phương tiện truyền thông theo kiểu device-independent. Ta có thể tạo một stream cho dữ liệu trong memory, trong file, hoặc dữ liệu đó ở trên một network (sử dụng socket), và ta có thể sử dụng stream mà không cần phải tải toàn bộ dữ liệu vào memory cùng một lúc.

Một stream là một chuỗi các byte được trao đổi một cách nối tiếp qua một communication path. Stream là dạng đường 1 chiều, thế nên là nếu muốn trao đổi hai phía thì ta luôn cần có một input stream và một output stream. 

CFStream là một API trừu tượng hóa các stream này vào trong lập trình thành hai loại CFType objects: CFReadStream và CFWriteStream. Cả hai loại stream này đều tuân thủ các convention của Core Foundation API.

CFStream được xây dựng dựa trên CFSocket và là nền tảng cho CFHTTP và CFFTP. Như ta thấy ở hình dưới, CFStream không phải là một phần của CFNetwork, nó là cái base cho phần lớn mọi thứ trong CFNetwork.

![](https://images.viblo.asia/c892ada4-65ba-4c31-961f-46ee58a2cfb0.png)

*Hình 2. CFStream API structure*

Ta có thể sử dụng các stream đọc và ghi khá là giống như cách ta làm với UNIX file descriptor. Đầu tiên, ta khởi tạo một stream bằng việc chỉ định stream type (memory, file, hay socket) và thiết lập các option khác. Tiếp theo, ta open stream và đọc hoặc ghi vào bất cứ thời điểm nào ta muốn. Trong khi stream còn tồn tại, có thể lấy thông tin về stream bằng việc truy cập các thuộc tính của nó. Một stream property có thể chứa một thông tin nào đó về stream như nguồn và đích của nó, chứ ko phải là thông tin về dữ liệu đang được đọc hoặc ghi. Khi ta không sử dụng stream nữa, ta cần phải đóng và giải phóng stream.

Các hàm đọc và ghi stream sẽ suspend, hoặc block tiến trình hiện tại cho tới khi có ít nhất 1 byte dữ liệu có thể được đọc hoặc ghi. Để tránh điều đó xảy ra, ta sử dụng các hàm bất đồng bộ và schedule stream vào run-loop. Với cách làm như vậy, hàm callback sẽ được gọi khi có gì đó được đọc và ghi mà ko bị blocking.

Thêm vào đó, CFStream có các tính năng được xây dựng sẵn để chỗ trợ cho giao thức SSL (Secure Sockets Layer). Ta có thể tạo một dictionary chứa các thông tin về SSL của stream, như mức độ bảo mật mong muốn hoặc các certificates tự đăng ký. Sau đó truyền dictionary đó vào stream vào property `kCFStreamPropertySSLSettings` để biến stream thường trở thành một SSL stream.

# Các khái niệm trong CFNetwork API
Để hiểu CFNetwork framework, ta cần phải làm quen với các building block đã tạo nên nó. CFNetwork framework được chia tách thành các API riêng biệt, mỗi thứ bao trùm một loại network protocol. Những API này có thể sử dụng kết hợp hoặc tách biệt, tùy vào nhu cầu của app. Phần lớn tất cả các API đều cùng programming convention, thế nên việc chính là ta phải hiểu cách hoạt động của từng cái một.

## CFFTP API

Tương tác với một FTP server sẽ dễ dàng hơn với CFFTP. Sử dụng CFFTP API, ta có thể tạo ra một FTP read stream (cho việc download) và một FTP write stream (cho việc upload). Sử dụng FTP read và write stream ta có thể làm được những việc sau:
- Download file từ FTP server.
- Upload file lên FTP server.
- Download một danh sách thư mục từ FTP server.
- Tạo thư mục trên FTP server.

Một FTP stream làm việc giống như bao CFNetwork stream khác. Ví dụ, ta có thể tạo một FTP read stream bằng việc gọi hàm `CFReadStreamCreateWithFTPURL`. Sau đó ta có thể gọi hàm `CFReadStreamGetError` vào bất cứ lúc nào để kiểm tra trạng thái của stream.

Ta có thể điều chỉnh stream sao cho thích hợp với từng app bằng việc set các thuộc tính của nó. Ví dụ, nếu một server mà stream đang kết nối tới yêu cầu một username và password, ta cần thiết lập các thuộc tính tương ứng sao cho stream có thể hoạt động bình thường.

Một CFFTP stream có thể được sử dụng theo kiểu đồng bộ hoặc bất đồng bộ. Để mở kết nối tới FTP server khi một FTP read stream được tạo ra, ta gọi hàm `CFReadStreamOpen`. Để đọc từ stream, sử dụng hàm `CFReadStreamRead` và cung cấp tham chiếu tới read stream: `CFReadStreamRef`. Hàm `CFReadStreamRead` sẽ điền vào buffer với output lấy từ FTP server.

## CFHTTP API

Để gửi và nhận HTTP message, ta sử dụng CFHTTP API. Cũng giống như việc CFFTP là lớp trừu tượng hóa của FTP protocol, thì CFHTTP là lớp trừu tượng hóa của HTTP protocol.

HTTP (Hypertext Transfer Protocol) là một request/response protocol giữa một client và một server. Client gửi request message. Message này sau đó được serialized (một quá trình chuyển đổi message thành một raw byte stream), và sau đó được truyền tới server. Request thường yêu cầu một file nào đó, ví dụ như webpage. Server trả lời, gửi về một string chứa message. Cần nhiều thì cứ việc lặp lại quá trình này.

Để tạo một HTTP request message, ta cần chỉ định các thuộc tính sau:
- Request method, có thể là một trong các method mà HTTP định nghĩa như `OPTIONS`, `GET`, `HEAD`, `POST`, `PUT`, `DELETE`, `TRACE`, và `CONNECT`.
- URL, ví dụ như http://www.apple.com
- HTTP version, ví dụ như version 1.0 hoặc 1.1
- Header của message, bằng việc chỉ định các header name, ví dụ như `User-Agent`, và giá trị của nó, ví dụ như `MyUserAgent`.
- Body của message.

Sau khi message đã được cấu trúc, ta serialize nó. Sau khi quá trình serialize, request sẽ trông kiểu như thế này:

> GET / HTTP/1.0\r\nUser-Agent: UserAgent\r\nContent-Length: 0\r\n\r\n
 
Deserialization đối lập với serialization. Với deserialization, một raw byte stream nhận được từ một client hay server sẽ được khôi phục lại dạng nguyên thủy của nó. CFNetwork cung cấp tất cả các hàm cần thiết để lấy ra message type (request hay response), HTTP version, URL, header và body từ serialized message.

## CFHTTPAuthentication API
Nếu ta gửi một HTTP request cho một authentication server mà không có credential (hoặc sai credential), server sẽ trả về một authorization challenge (thường được biết đến ở dạng 401 hoặc 407 response). CFHTTPAuthentication API sẽ gắn các authentication credential vào các challenged HTTP message. CFHTTPAuthentication hỗ trợ các authentication scheme như sau:
- Basic
- Digest
- NT LAN Manager (NTLM)
- Simple and Protected GSS-API Negotiation Mechanism (SPNEGO)

Một điểm mới từ OS X v10.4 là khả năng carrying persistency across requests. Ở OS X v10.3 mỗi khi một request bị challenged, ta phải bắt đầu authentication dialog lại từ đầu. Bây giờ, ta giữ một tập các CFHTTPAuthentication object cho mỗi server. Khi nhận 401 hay 407 response, ta có thể tìm thấy object tương ứng và credential cho server đó, rồi gắn vào.

Bằng việc carrying persistency across request, phiên bản mới của CFHTTPAuthentication cung cấp hiệu năng tốt hơn. Chi tiết về việc sử dụng CFHTTPAuthentication sẽ được có ở các Chapter sau.

## CFHost API
Ta sử dụng CFHost API để thu được thông tin của host, bao gồm tên, địa chỉ và reachability information. Quá trình thu thập thông tin về một host được gọi là ***resolution***.

CFHost được sử dụng giống như CFStream:
- Tạo một CFHost object.
- Bắt đầu phân giải CFHost object đó.
- Nhận về các thông tin địa chỉ, tên host, reachability information.
- Hủy CFHost object đó khi ta xong việc.

CFHost tương thích với IPv4 và IPv6. Sử dụng CFHost, ta có thể viết code để xử lý IPv4 và IPv6 một cách hoàn toàn minh bạch.

CFHost được tích hợp chặt chẽ với các phần còn lại của CFNetwork. Ví dụ, có một hàm của CFStream gọi là `CFStreamCreatePairWithSocketToCFHost` sẽ tạo ra một CFStream object trực tiếp từ CFHost object.

## CFNetServices API
Nếu ta muốn app sử dụng Bonjour để đăng ký service hoặc discover các services, sử dụng CFNetServices API. Bonjour là các implementation của Apple dành cho zero-configuration networking (ZEROCONF), cho phép ta publish, discover, và resolve các network service.

Để triển khai Bonjour, CFNetServices API định nghĩa ba loại object: CFNetService, CFNetServiceBrowser, và CFNetServiceMonitor. Một CFNetService object thể hiện một network service đơn lẻ, ví dự như một máy in hoặc 1 file server. Nó bao gồm tất cả thông tin cần thiết cho một máy khác để phân giải server đó, ví dụ như tên, kiểu, domain và port. Một CFNetServiceBrowser là một object sử dụng để discover các domain và các network service bên trong các domain. Và một CFNetServiceMonitor object được sử dụng để theo dõi những thay đổi của một CFNetService object, ví dụ như một status message trong iChat.

## CFNetDiagnostics API
App có thể kết nối với network dựa trên một kết nối ổn định. Nếu mạng sập, điều này có thể gây ra vấn đề với app. Xài CFNetDiagnostics API, tự user có thể chẩn đoán các vấn đề mạng có thể xảy ra như:
- Kết nối vật lý có vấn đề (ví dụ như tuột dây mạng).
- Network failures (ví dụ như DNS hoặc DHCP server không trả lời).
- Configuration failures (ví dụ như cấu hình proxy sai).

Một khi lỗi mạng được chẩn đoán. CFNetDiagnostics sẽ hướng dẫn user sửa chữa. Ta có thể xem CFDiagnostics hoạt động thế nào nếu Safari không thể kết nối tới một website. 
![](https://images.viblo.asia/b3db454a-dc7a-4656-910d-e86ff25fdb8f.png)

*Hình 3. Network diagnostics assistant*

Bằng việc cung cấp cho CFNetDignostics ngữ cảnh khi mất mạng, ta có thể gọi hàm `CFNetDiagnosticDiagnoseProblemInteractively` để dẫn user đi qua các prompt để tìm kiếm cách giải quyết. Thêm vào đó, ta có thể sử dụng CFNetDiagnostics để truy vấn trạng thái kết nối và cung cấp thông báo lỗi tới người dùng.

# Kết
Sau chapter này chúng ta đã nắm được những khái niệm cần thiết và cơ bản nhất để có thể đi sâu hơn nghiên cứu CFNetwork. Hy vọng bài viết sẽ có ích cho các bạn!

-----
*Dịch và tham khảo từ [CFNetwork Programming Guide](https://developer.apple.com/library/archive/documentation/Networking/Conceptual/CFNetwork/Concepts/Concepts.html#//appleref/doc/uid/TP30001132-CH4-SW10)*