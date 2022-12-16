# SSL hoạt động ra sao? 

Trong [bài viết trước](https://viblo.asia/p/https-la-gi-bai-viet-de-hieu-nhat-ma-cac-ban-co-the-tim-thay-tren-internet-6J3Zgm6L5mB) mình đã chia sẻ về HTTPS theo cách diễn đạt cơ bản nhất giúp các bạn ở mọi level có thể hiểu được. 

Trong bài viết lần này chúng ta sẽ cùng nhau tìm hiểu "sâu" hơn một chút về cơ chế hoạt động đằng sau HTTPS. 

HTTPS sử dụng giao thức SSL để bảo mật giao tiếp giữa client và server bằng cách trao đổi các dữ liệu được mã hóa. 

SSL về bản chất sử dụng 2 khái niệm sau: 

1. Mã hóa Bất đối xứng  - Asymmetric Cryptography 
2. Mã hóa đối xứng - Symmetric Cryptography

## Mã hóa Bất đối xứng - Asymmetric Cryptography 

Mã hóa Bất đối xứng (còn có tên gọi khác là "Mã hóa khóa công khai") sử dụng cặp key toán học để mã hóa và giải mã data, cặp key này gồm:
 - **Khóa công khai - Public key**: được share với bất kì ai/client/browser nào có nhu cầu giao tiếp với server.
 - **Khóa bí mật - Private key**: được server lưu giữ cẩn thật, không được phép tiết lộ ra bên ngoài. 

Cặp khóa này được sinh ra bởi thuật toán dùng để mã hóa và giải mã data. Cụ thể là, data được mã hóa bởi **Public key** chỉ có thể được giải mã bởi **Private key** của cặp khóa đó (và ngược lại)

![img](https://www.tutorialsteacher.com/Content/images/https/asymmetric-cryptography.png) 

*Sơ đồ lý thuyết mã hóa bất đối xứng*

SSL sử dụng *Mã hóa bất đối xứng* để khởi tạo giao tiếp, quá trình này được gọi là Bước "bắt tay" SSL. 

## Mã hóa đối xứng - Symmetric Cryptography

Với Thuật mã hóa đối xứng, chỉ có một khóa được dùng chung cho cả 2 việc mã hóa và giải mã dữ liệu. 

Cả 2 phía client và server cần phải giữ bí mật khóa này. 


![img](https://www.tutorialsteacher.com/Content/images/https/symmetric-cryptography.png)

*Sơ đồ lý thuyết mã hóa đối xứng*

SSL sử dụng Thuật mã hóa đối xứng (với khóa được dụng là session key - Khóa theo phiên) sau khi hoàn thành "bước bắt tay SSL".  (*Session key sẽ được trình bày trong phần dưới đây*)

## Cách thức Data được vận chuyển data với SSL 

Giao thức SSL sử dụng cả 2 thuật mã hóa Bất đối xứng và Đối xứng đảm bảo data được vận chuyển một cách bảo mật giữa server và client. 

Sơ đồ dưới đây tổng quát hóa 2 quá trình này: 
- Quá trình 1: Bắt tay SSL 
- Quá trình 2: Vận chuyển data "thực: 

![img](https://www.tutorialsteacher.com/Content/images/https/ssl-communication.png)

*Giao tiếp với SSL*

### Quá trình "bắt tay" SSL 

Việc giao tiếp thông qua SSL luôn bắt đầu từ quá trình "bắt tay" SSL. 

Quá trình này sử dụng thuật mã hóa "bất đối xứng" cho phép browser/client xác thực (web) server, tiếp đó là lấy public key từ server và thiết lập giao tiếp bảo mật trước khi thật sử gửi và nhận data. 

Sơ đầu sau mô phỏng từng bước trong quá trình "Bắt tay SSL: 

![img](https://www.tutorialsteacher.com/Content/images/https/ssl-handshack.png)

*Quá trình bắt tay SSL*

**Cùng diễn giải nội dung từng bước:**



1. Client gửi một message Hello tới Server. Message này bao gồm version của SSL trên client, cipher setting (các thiết lập về mật mã), session data và các thông tin cần thiết khác mà server cần để client có thể giao tiếp thông qua giao thức SSL
2. Server phản hồi với một message Hello khác. Message này cũng bao gồm version của SSL trên server, thiết lập mật mã, session data, **public key** và các thông tin cần thiết khác mà client cần để giao tiếp thông qua SSL.
3. Client tiến hành xác nhận SSL certificate (Public key và các info khác mà Server vừa gửi) với Certificate Authority - CA (là các đơn vị thứ 3 cung cấp dịch vụ chứng thực số, ví dụ: GeoTrust, Digicert...) xem SSL certificate đó có là "đồ thật" - không bị giả mạo hay không :grin: Nếu xác nhận thất bại thì client sẽ từ chối giao tiếp, quá trình bắt tay SSL sẽ bị dừng lại. Nếu xác nhận thành công thì tiếp tục bước 4.
4.  Client sinh một **session key**, mã hóa nó với **public key** và gửi nó đến server.
5.  Server dùng **private key** để giải mã  **session key** sau đó gửi kết quả thành công về cho client. Kết này cũng sẽ được mã hóa *đối xứng* với session key mà vừa được giải mã. 

Kết quả cuối cùng của quá trình "bắt tay" SSL, đó là cả client và server đều có trong tay **session key**, khóa này về sau sẽ được dùng để mã hóa và giải mã các data thực tế cần truyền tãi giữa client và server. Từ lúc này trở đi cặp khóa **public key** và **private key** sẽ không được sử dụng nữa.

### Qúa trình vận chuyển data "thực"

Sau bước "bắt tay", lúc này client và server đã có được **session key** cần thiết để tiến hành mã hóa/ giải mã các data trao đổi giữa 2 bên sử dụng cơ chế Mã hóa "đối xứng".

[![img](https://www.tutorialsteacher.com/Content/images/https/ssl-data-transfer.png)](https://www.tutorialsteacher.com/Content/images/https/ssl-data-transfer.png)

*Sơ đồ lý thuyết vận chuyển data thực giữa browser và web server*

Chắc sẽ có bạn sẽ thắc mắc: "Sao không sử dụng luôn thuật mã hóa bất đối xứng để mã hóa data truyền tải giữa client và server luôn, mà sinh ra session key làm gì?"

Thì một câu trả lời đó là: thuật toán sử dụng trong cơ chế "mã hóa đối xứng" (cái mà sử dụng session key ấy) tiêu tốn ít tài nguyên CPU hơn so với cơ chế "mã hóa bất đối xứng"; Server đã "vất vả" nhận hàng triệu request từ client, request nào cũng tiêu tốn nhiều tài nguyên thì quá tải mất, nên giảm được xử lý là chìa khóa vàng trong vận hành các bạn ạ!


*※Bài viết sử dụng tư liệu tại: https://www.tutorialsteacher.com/https/how-ssl-works*