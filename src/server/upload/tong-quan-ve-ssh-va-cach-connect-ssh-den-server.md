![](https://images.viblo.asia/7219afad-251e-4348-8a4e-274a11c702a5.jpg)

*Bài viết được [dịch từ nguồn](https://levelup.gitconnected.com/what-is-ssh-103f89e3e4b8) và bổ sung thêm phần "làm thế nào để connect SSH to server?"*

## 1. SSH là gì?
`SSH`, hay `Secure Shell`, là một giao thức mạng cho phép một máy tính kết nối an toàn với một máy tính khác qua mạng không bảo mật như internet, bằng việc có một thỏa thuận chung về cách thức liên lạc. SSH là một giao thức `application layer`, là layer thứ 7 của [mô hình OSI](https://en.wikipedia.org/wiki/OSI_model).

`SSH` thực sự hữu ích vì bạn không cần có quyền truy cập vật lý vào máy khác, bạn chỉ cần kết nối với nó qua internet. Điều này cho phép chúng ta kiểm soát các server từ xa.

`SSH` xuất hiện lần đầu tiên vào giữa những năm 90 và được thiết kế để thay thế cho [`Telnet`](https://en.wikipedia.org/wiki/Telnet), đây cũng là một giao thức `application layer` truyền dữ liệu mà không cần mã hóa. Không có mã hóa, dữ liệu di chuyển qua internet ở dạng văn bản thuần túy. Bất cứ ai có [packet `sniffer`](https://en.wikipedia.org/wiki/Packet_analyzer) giữa bạn và máy từ xa đều có thể thấy tất cả dữ liệu bạn đang truyền và mọi thứ bạn đang làm.

![Dữ liệu được truyền trong văn bản thuần túy có thể được nhìn thấy](https://images.viblo.asia/ae16f7d8-7685-49cf-bea6-8830910178d0.jpeg)

Mã hóa là một cách để ẩn một phần dữ liệu sao cho dữ liệu không thể đọc được trừ khi bạn biết cách giải mã hoặc giải mã dữ liệu. SSH được tạo ra như một cách giao tiếp an toàn, mã hóa dữ liệu thông qua một `tunnel`, do đó các tác nhân xấu không thể truy xuất dữ liệu trong khi truyền. Với SSH, bạn vẫn có thể thấy dữ liệu đó đang được truyền và lượng dữ liệu được truyền, nhưng bạn không thể thấy dữ liệu đó là gì.

![Dữ liệu được mã hóa không thể được đọc bởi một người trung gian](https://images.viblo.asia/f1a1696d-6a31-44bd-8f27-d7a7ca1b2037.jpeg)

SSH thường được thực hiện bằng mô hình `client-server`. Một máy tính được gọi là `SSH client` và một máy khác hoạt động như `SSH server` hoặc `host`.

`HTTPS`, hay `Hyper Text Transfer Protocol Secure`, cũng là một giao thức khác mã hóa dữ liệu. 

**Vậy sự khác biệt giữa SSH và HTTPS là gì?**

HTTPS cho phép trình duyệt web giao tiếp với server để hiển thị trang web. SSH cho phép [`shells`](http://linuxcommand.org/lc3_lts0010.php) để trao đổi dữ liệu hoặc liên lạc giữa hai thiết bị, không chỉ trình duyệt và server. Shells cho phép giao tiếp với các hệ điều hành.

Khi bạn connect đến 1 SSH server, bạn dùng shell để thực hiện. Shell này có thể là một terminal shell của Linux hoặc 1 command của Windows nơi mà bạn có thể thực thi commands trên máy mà bạn connect tới. Khi bạn sử dụng terminal hay command line là bạn đang giao tiếp với hệ điều hành. Với SHH, bạn có thể giao tiếp với hệ điều hành từ xa.

**SSH có thể truyền tải những gì?**

- Data
- Commands
- Text
- Files (Sử dụng SFTP: Secure File Transfer Protocol, về cơ bản một là một phiên bản FTP được mã hóa khiến cho các cuộc tấn công trung gian không thể thực hiện được).

## 2. SSH hoạt động thế nào?

SSH chia dữ liệu thành một loạt các packets. Giống như bất kỳ packet nào, có một vài trường ở đầu.

![Một packet](https://images.viblo.asia/6ad507ec-0b9d-42e5-bea9-13b79308967c.png)

Ở trên cùng, `Packet Length` cho bạn biết gói có dung lượng như thế nào. Sau đó, bạn có một byte khác, `Padding Amount`, cho bạn biết có bao nhiêu phần đệm. Sau đó, bạn có dữ liệu, `Payload`. Theo sau payload, bạn có `Padding`. Phần padding là các byte ngẫu nhiên không có nghĩa gì cả nhưng được mã hóa cùng với payload để khiến việc phát hiện dữ liệu trở nên khó khăn hơn vì bạn đã ném vào dữ liệu bổ sung ngẫu nhiên này. Cuối cùng, bạn có `Message Authentication Code` để bạn có thể chắc chắn dữ liệu chưa bị giả mạo.

`Payload` cũng có thể được nén bằng các thuật toán nén tiêu chuẩn. Toàn bộ packet, không bao gồm độ dài và mã xác thực, sau đó được mã hóa.

![Một Packet đã được mã hóa](https://images.viblo.asia/a680212b-08ee-4f3f-a097-aa09924e95ce.jpeg)

Packet sau đó được gửi đến server. Server giải mã gói tin và giải nén payload để trích xuất dữ liệu. Quá trình tương tự được thực hiện cho mọi gói được gửi qua connection.

Để giữ an toàn cho SSH, SSH sử dụng ba loại kỹ thuật thao tác dữ liệu khác nhau tại các điểm khác nhau trong quá trình truyền. Ba kỹ thuật được sử dụng trong SSH là:

- Symmetrical Encryption
- Asymmetrical Encryption
- Hashing

### 2.1. Symmetrical Encryption
Symmetrical Encryption là loại mã hóa trong đó một khóa có thể được sử dụng để mã hóa các messages được gửi đến đích và cũng giải mã các messages nhận được tại đích. Lược đồ mã hóa này còn được gọi là `shared secret encryption` hoặc `shared key encryption`.

![Diagram 1: Symmetrical Encryption](https://images.viblo.asia/aa5f3a00-9c22-41a6-a223-4bbfbefd1640.jpeg)

Cả hai thiết bị đều sử dụng cùng một khóa để mã hóa dữ liệu họ đang gửi và giải mã dữ liệu họ nhận được. Khóa bí mật dành riêng cho từng phiên SSH. Đây là loại mã hóa được sử dụng để mã hóa toàn bộ kết nối SSH để ngăn chặn các cuộc tấn công trung gian không thể đọc dữ liệu vì chúng không có khóa bí mật này.

Một vấn đề phát sinh là trao đổi khóa ban đầu. Nếu một bên thứ ba đang lắng nghe trong quá trình trao đổi khóa, giờ đây họ sẽ biết khóa và có thể giải mã tất cả các tin nhắn của chúng ta. Một cách để ngăn chặn điều này là sử dụng  Key Exchange Algorithm (Thuật toán trao đổi khóa).

Một `Key Exchange Algorithm` là một cách an toàn để trao đổi khóa bí mật mà không cần chặn. Điều này được thực hiện bởi hai máy tính trao đổi dữ liệu công khai và sau đó thao tác dữ liệu đó một cách độc lập để lấy khóa bí mật. Để thực hiện thuật toán trao đổi khóa, chúng ta cần `Asymmetrical Encryption`.

### 2.2. Asymmetrical Encryption
Mã hóa bất đối xứng là mã hóa thông qua việc sử dụng hai public key riêng biệt để mã hóa và giải mã, public key và private key. Public key có thể được chia sẻ với bất kỳ ai nhưng private key không bao giờ được chia sẻ. Một public key và private key tạo thành một cặp khóa. Một message được mã hóa bằng public key của máy chỉ có thể được giải mã bằng private key của nó. Public key được lưu trữ trên SSH server và private key được lưu trữ cục bộ trên SSH client.

![Diagram 2: Asymmetrical Encryption](https://images.viblo.asia/11b80b2c-217a-4648-8b76-78a59ee1f8ed.jpeg)

Nếu tôi cung cấp cho bạn public key của tôi, bạn có thể gửi tin nhắn cho tôi bằng cách mã hóa nó bằng public key của tôi. Sau đó tôi sẽ có thể đọc nó bằng cách giải mã nó bằng private key của mình.

![Diagram 3: Asymmetrical Encryption key exchange](https://images.viblo.asia/14202842-393f-4b7d-8ae5-109092a290c3.jpeg)

Ngay cả khi bên thứ ba quản lý để có được public key, họ sẽ không thể giải mã bất kỳ message nào vì họ không có private key. Miễn là private key không bao giờ được gửi qua và được bảo mật trên thiết bị của bạn, message của bạn không thể được giải mã.

SSH sử dụng mã hóa bất đối xứng ở một vài nơi như thuật toán trao đổi khóa được sử dụng để thiết lập mã hóa đối xứng. Mã hóa bất đối xứng cũng được sử dụng làm khóa có thể được sử dụng để SSH vào server mà không cần sử dụng mật khẩu. Chúng ta trao đổi thuật toán để tạo các khóa (các phím màu vàng trong sơ đồ 1) được sử dụng để mã hóa và giải mã messages.

Cả hai thiết bị đều tạo public key và private key và chia sẻ public key tương ứng. Sau đó, chúng độc lập tạo một khóa đối xứng mới mà cả hai thiết bị sẽ sử dụng để mã hóa và giải mã messages. Cái này được thực hiện bằng cách sử dụng `Diffie Hellman key exchange`.

Khi bắt đầu Diffie Hellman key exchange, hai thiết bị cần thống nhất một vài thông số mà chúng sẽ sử dụng để trao đổi khóa:
- `Generator g`
- `Prime number n`

Mỗi thiết bị sẽ sử dụng `g` cùng với các private key để tạo public key.

Nếu bạn muốn biết thêm về Diffie Hellman, hãy xem [video](https://www.youtube.com/watch?v=Yjrfm_oRO0w) này.

Khi symmetric communication đã được thiết lập, server sẽ sử dụng public key của client để tạo `challenge` và truyền nó đến client để xác thực. Nếu client có thể giải mã thành công challenge, điều đó có nghĩa là nó giữ private key cần thiết cho kết nối,  SSH session bắt đầu.

### 2.3. Hashing
Hashing là một hình thức mã hóa khác được sử dụng để bảo mật các kết nối shell. Hashing cho phép bạn tạo chữ ký hoặc tóm tắt một bộ thông tin. Đó là một quá trình một chiều và dữ liệu hashed không bao giờ có nghĩa là được giải mã. Nhưng làm thế nào là hữu ích?

Nếu một bên thứ ba quản lý để lừa client và host, họ có thể giả mạo messages. SSH sử dụng [HMAC](https://en.wikipedia.org/wiki/HMAC) (Hash-based Message Authentication Codes). HMACs đảm bảo rằng các messages đã gửi được nhận ở dạng hoàn chỉnh và không thay đổi.

Sử dụng hash function, mỗi message được truyền phải chứa một thứ gọi là MAC. MAC này là hash function được tạo từ khóa đối xứng, số thứ tự packet và nội dung message được gửi. Sử dụng ba phần tử này kết hợp làm đầu vào thành 1 hash function và hash function này sẽ xuất ra một số chuỗi không có ý nghĩa. Chuỗi này, hoặc chữ ký, được gửi đến host.

**Vậy, làm thế nào để server kiểm tra nếu tin nhắn đã bị giả mạo?**

Vì host có cùng thông tin (khóa đối xứng, số thứ tự gói và nội dung message), nên chúng có thể sử dụng cùng hàm function để tạo ra 1 hash function. Nếu hash function được tạo khớp với hash function nhận được, cái này sẽ xác minh chữ ký của client.

Điều này hoạt động bởi vì nếu dữ liệu được thay đổi theo bất kỳ cách nào, thậm chí một cái gì đó nhỏ như viết hoa một chữ cái, hash function sẽ hoàn toàn khác.

## 3. Connect SSH to Server

- B1: Get ssh file.
- B2: Run command
```
ssh username@ip_server -i link_to_your_ssh_file
```

Hy vọng tổng quan về SSH này giúp bạn hiểu rõ hơn về SSH, cách hoạt động và connect SSH với server.

Thanks for reading!!!

References: https://levelup.gitconnected.com/what-is-ssh-103f89e3e4b8