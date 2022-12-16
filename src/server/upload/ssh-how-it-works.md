"Em ơi gửi anh public key để anh add vào server". Các bạn thấy câu này có quen không :) Sau khi key được add vào server, chúng ta có thể "lên" server và thực hiện các tác vụ trên đó. Tuy nhiên, đã bao giờ các bạn tự hỏi, tại sao chúng ta gửi key mà lại kết nối được tới server hay không? SSH là cái gì @@

![](https://images.viblo.asia/e60769d5-4457-4405-8086-3f2b14ea58c1.png)

## WHAT IS SSH?

SSH, hay còn được gọi là Secure Shell hay Secure Socket Shell, là một giao thức mạng cung cấp cho quản trị viên một cách an toàn để truy cập một máy tính từ xa. SSH thiết lập một kết nối được bảo mật bằng mật mã giữa hai bên (client và server), xác thực mỗi bên với bên kia, đồng thời chuyển các lệnh và xuất qua lại. Dịch vụ được tạo ra nhằm thay thế cho trình Telnet vốn không có mã hóa và sử dụng kỹ thuật cryptographic để đảm bảo tất cả giao tiếp gửi tới và gửi từ server từ xa diễn ra trong tình trạng mã hóa.

![](https://miro.medium.com/max/714/1*7S4LDrujkJu6LH3FtH1xvg.gif)

## HOW SSH WORKS?

Giao thức SSH sử dụng mã hóa đối xứng (symmetric encryption), mã hóa không đối xứng (asymmetric encryption) và băm (hashing) để bảo mật việc truyền thông tin. Kết nối SSH giữa client và server xảy ra theo ba giai đoạn:

 - Xác nhận server bởi client.
 - Tạo một session key để mã hóa tất cả các giao tiếp.
 - Xác thực client.

Chúng ta cùng xem trong 3 bước nói trên, những gì đã xảy ra nhé:

### 1. VERIFICATION OF SERVER

Client khởi tạo kết nối SSH với server. Server lắng nghe cổng mặc định 22 (cổng này có thể được thay đổi) cho các kết nối SSH. Tại thời điểm này, danh tính server đã được xác minh. Có hai trường hợp có thể xảy ra:

 - Nếu client kết nối server lần đầu tiên, client được yêu cầu xác thực server theo cách thủ công bằng cách xác minh khóa công khai (public key) của server. Khóa công khai của server có thể được tìm thấy bằng lệnh ssh-keycan. Sau khi khóa được xác minh, server sẽ được thêm vào tệp known_hosts trong thư mục ~/.ssh trên client. Tệp known_hosts chứa thông tin về tất cả các server đã được xác minh bởi client.
 - Nếu  client đã từng kết nối tới server, danh tính của server sẽ khớp với thông tin đã ghi trước đó trong tệp known_hosts để xác minh. Nếu không, bạn sẽ không kết nối được tới server. Bạn cần xoá bản ghi tương ứng với server trong known_hosts và thực hiện kết nối lại.

![](https://images.viblo.asia/e6ac077a-ec28-4fa2-b121-d3b3b8c094ca.png)


### 2. GENERATION OF SESSION KEY

Sau khi server được xác minh, cả hai bên đưa ra một session key bằng cách sử dụng thuật toán Diffie-Hellman. Thuật toán này được thiết kế theo cách mà cả hai bên đều đóng góp như nhau trong quá trình tạo session key. Session key được tạo là khóa đối xứng được chia sẻ tức là cùng một khóa được sử dụng để mã hóa và giải mã.

![](https://images.viblo.asia/26d4f661-a0e5-42bf-8c2f-8a8d13d4a2b9.png)

> Trao đổi khóa Diffie–Hellman (D-H) là một phương pháp trao đổi khóa được phát minh sớm nhất trong mật mã học. Phương pháp trao đổi khóa Diffie–Hellman cho phép hai bên (người, thực thể giao tiếp) thiết lập một khóa bí mật chung để mã hóa dữ liệu sử dụng trên kênh truyền thông không an toàn mà không cần có sự thỏa thuận trước về khóa bí mật giữa hai bên. Khóa bí mật tạo ra sẽ được sử dụng để mã hóa dữ liệu với phương pháp mã hóa khóa đối xứng.
> 
> Giao thức này được công bố đầu tiên bởi Whitfield Diffie và Martin Hellman vào năm 1976, dù rằng trước đó vài năm nó đã được phát minh một cách độc lập trong GCHQ, cơ quan tình báo Anh, bởi James H. Ellis, Clifford Cocks và Malcolm J. Williamson nhưng được giữ bí mật. Năm 2002, Hellman đề xuất thuật toán nên được gọi là trao đổi khóa Diffie–Hellman–Merkle để ghi nhận sự đóng góp của Ralph Merkle trong phát minh lĩnh vực mật mã hóa khóa công khai (Hellman, 2002).
>
> Mặc dù giao thức trao đổi khóa Diffie–Hellman bản thân nó là giao thức trao đổi khóa ẩn danh (không xác thực), nó đã đưa ra một nền tảng cơ sở cho nhiều loại giao thức xác thực và được sử dụng để tạo nên bí mật chuyển tiếp hoàn hảo trong chế độ ngắn hạn của giao thức Transport Layer Security (EDH hoặc DHE tùy theo bộ mã hóa).

Các bạn có thể tham khảo về thuật toán này ở https://viblo.asia/p/trao-doi-khoa-diffie-hellman-OREGwLNOelN

### 3. AUTHENTICATION OF THE CLIENT

Giai đoạn cuối cùng liên quan đến việc xác thực client. Quá trình xác thực được thực hiện bằng cặp khóa SSH (ssh key pair). Cặp khóa SSH là một cặp hai khóa để phục vụ hai mục đích khác nhau. Một là khóa công khai (public key) được sử dụng để mã hóa dữ liệu và có thể được chia sẻ tự do. Khóa còn lại là khóa riêng (private key) được sử dụng để giải mã dữ liệu và không bao giờ được chia sẻ với bất kỳ ai.

![](https://images.viblo.asia/9b32b8d8-137f-4fd9-8e3b-1729f72390cc.jpg)

Sau khi mã hóa đối xứng (symmetric encryption) được thiết lập, xác thực client sẽ thực hiện như sau:
 - Client bắt đầu bằng cách gửi một ID cho cặp khóa mà nó muốn xác thực tới server.
 - Server kiểm tra authorized_keys của tài khoản mà client đang cố gắng đăng nhập để tìm ID khóa.
 - Nếu tìm thấy public key có ID phù hợp trong tệp authorized_keys, server sẽ tạo một số ngẫu nhiên và sử dụng public key để mã hóa số này và gửi cho client.
 - Nếu client có private key chính xác, nó sẽ giải mã thông báo từ server để lấy số ngẫu nhiên do server tạo.
 - Client kết hợp số ngẫu nhiên thu được với session key được chia sẻ và tính toán mã MD5 của giá trị này.
 - Sau đó client sẽ gửi lại mã MD5 này cho server như một câu trả lời cho thông điệp số được mã hóa.
 - Server sử dụng session key (key này được share giữa client và server) và số mà nó đã gửi cho client để tự tính giá trị MD5. Nó so sánh phép tính của chính nó với phép tính mà client đã gửi lại. Nếu hai giá trị này khớp nhau, điều đó chứng tỏ rằng client đang sở hữu private key đúng và client đã được xác thực.

![](https://images.viblo.asia/458d530e-7be0-4e10-a4b2-41e58ad6826c.png)


Sự bất đối xứng của các khóa cho phép xác thực client vì client chỉ có thể giải mã các thông báo nếu nó có đúng private key được liên kết.

### Reference
- [Understanding SSH workflow](https://medium.com/@Magical_Mudit/understanding-ssh-workflow-66a0e8d4bf65)
- [Diffie–Hellman key exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange)