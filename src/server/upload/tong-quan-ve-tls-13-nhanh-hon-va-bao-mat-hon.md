![](https://images.viblo.asia/7c38724b-6e6b-4db0-a321-866f095d58f2.png)
Tạm gác lại với những nội dung về blockchain hôm nay chúng ta sẽ đổi gió một chút sang mảng về bảo mật. Nội dung mình muốn đề cập đó chính là về giao thức bảo mật TLS. Và tập trung đi sâu vào những điểm đổi mới của TLS phiên bản 1.3 so với các phiên bản trước đó.

# Giới thiệu

Sau 28 bản cập nhật thì đến tháng 8 năm 2018 giao thức TLS phiên bản 1.3 đã được hoàn thiện với những cải tiến về bảo mật và hiệu suất. Với việc cập nhật giao thức HTTP/2 vào năm 2015 và TLS năm 2018, các kết nối được mã hóa giờ đây an toàn hơn và nhanh hơn rất nhiều. Dưới đây là chặng đường gần 10 năm phát triển của TLS 1.3

![](https://images.viblo.asia/ddc5959c-58f2-40ce-87e8-da49ddaa2073.png)


Nhắc lại một chút về khai niệm
> **TLS** là viết tắt của Transport Layer Security và là sự kế thừa cho SSL (Secure Sockets Layer). TLS thì cung cấp giao tiếp an toàn giữa các trình duyệt web và máy chủ Server. Các kết nối này sẽ được bảo mật bằng cách sử dụng mật mã đối xứng để mã hóa dữ liệu được truyền đi. Các keys thì được tạo ra duy nhất cho mỗi kết nối và dựa trên một chia sẻ bí mật ở đầu phiên kết nối, còn được gọi TLS handshake (bắt tay TLS).


# TLS 1.3 loại bỏ các thuật toán và mật mã lỗi thời
Hai tính năng nổi trội mà TLS 1.3 vượt trội so với các phiên bản trước của nó là bảo mật và tốc độ. TLS 1.3 loại bỏ một số  tính năng lỗi thời khỏi TLS 1.2. Dưới đây là một số hệ mật (ciphers) và thuật toán (algorithms) được bỏ bớt trong TLS 1.3:
* RC4 Stream Cipher
* RSA Key Transport
* SHA-1 Hash Function
* CBC (Block) Mode Ciphers
* MD5 Algorithm
* Various Diffie-Hellman groups
* EXPORT-strength ciphers
* DES
* 3DES

# Đơn giản hóa quá trình trao đổi key
Có hai cơ chế phổ biến để trao đổi session key an toàn sẽ sử dụng trong kết nối HTTPS sau khi handshake là:
* RSA
* Diffie-Hellman

RSA sử dụng mã hóa khóa công khai để trao đổi `pre-master secret`và client ngẫu nhiên được sử dụng để tạo session key.

![](https://images.viblo.asia/cd679b92-6200-4e88-8379-41800b4874ad.png)

Diffie-Hellman là một method để cả client và server cùng đi đến được một giá trị đó là session key.

![](https://images.viblo.asia/715e2cb9-e8d4-4068-94f2-8eaaea5d23dd.png)

Thì trao đổi key bằng RSA đã có vấn đề cụ thể là tấn công Oracle padding attacks. Nên từ 2018 các chuyên gia đã khuyên các tổ chức ngừng sử dụng RSA trong việc triển khai.

Một vấn đề khác của RSA là nó không hỗ trợ chế độ ephemeral key mode - chế độ khóa tạm thời, điều này thì cần thiết cho bảo mật về sau. Vì nếu ai đó lưu được cuộc thoại đã được mã hóa và bằng một cách nào đó được private key thì họ có thể giải mã được toàn bộ session đó. Điều này đặc biệt có liên quan đến lỗ hổng Heartbleed vì nó cho phép đánh cắp được các private key. Vì vậy RSA đã bị loại bỏ cùng với tất cả các trao đổi key dạng tĩnh và thay vào đó là ephemeral Diffie-Hellman families dạng tạm thời.

Đây cũng là một lợi ích khác vì khi RSA đã bị lại bỏ, thì client bắt đầu quá trình handshake TLS có thể biết chắc rằng nó sẽ là một Diffie-Hellman family và có thể `đoán` bằng cách gửi các requisite randoms và các đầu vào cần thiết cho việc tạo khóa trong quá trình `hello` ban đầu.

Điều này có hiệu quá giảm bớt các bước bắt tay cũng đồng nghĩa giảm thời gian cần thiết và gúp cải thiện hiệu suất tổng thể của trang web.


# TLS 1.3 nhanh hơn TLS 1.2 bằng cơ chế handshake mới

Dưới đây là có chế handshake của TLS 1.2 

![](https://images.viblo.asia/95f31cc3-3c5c-4607-8c7c-f37996dd2130.png)


Có thể mô tả một chút như sau:
* **Bước 1**: Toàn bộ kết nối bắt đầu với máy client gửi một message `client hello` đến máy chủ server. Message này bao gồm các thông tin mật mã như giao thức và Cipher Suites được hỗ trợ. Nó cũng bao gồm một giá trị hoặc một chuỗi byte ngẫu nhiên.
* **Bước 2**: Để trả lời message `client hello` của client, server sẽ phản hồi với message `server hello`. Message này bao gồm Cipher Suites mà server đã chọn trong số những Cipher Suites mà máy client gửi sang lúc đầu. Máy chủ server cũng gửi chứng chỉ của mình cùng với session ID và một giá trị ngẫu nhiên khác.
* **Bước 3**: Bây giờ client xác minh chứng chỉ được gửi bởi server. Khi quá trình xác minh được thực hiện xong, nó sẽ gửi một chuỗi byte ngẫu nhiên, còn được gọi là `pre-master secret` và mã hóa nó bằng public key của chứng chỉ server. 
* **Bước 4**: Khi server nhận được `pre-master secret`, client và server đều tạo ra một master key cùng với các sessions keys. Các sessions keys này sẽ được sử dụng để mã hóa dữ liệu.
* **Bước 5**: Bây giờ client gửi một message `change cipher spec` tới server để thông báo rằng nó sẽ chuyển sang chế độ mã hóa dữ liệu bằng các sessions keys. Cùng với đó nó cũng sẽ gửi thông message `client finished`. 
* **Bước 6**: Để trả lời cho message `change cipher spec` của client , server thực hiện tương tự chuyển trạng thái bảo mật của mình sang chế độ mã hóa dữ liệu bằng sessions keys. Server kết thúc việc handshake bằng cách gửi message `server finished`.

Như bạn có thể thấy phải mất đến 6 bước kể trên để client và server hoàn thành được công việc handshake. Trung bình điều này sẽ diễn ra trong khoảng từ 0.25s đến 0.5s. Tuy nhiên, nó có thể mất nhiều hơn tùy thuộc vào nhiều yếu tố khác. Nhưng hãy nhớ rằng đây chỉ mới là công việc handshake, việc truyền dữ liệu vẫn chưa bắt đầu.

Và ta sẽ cùng đến với quá trình handshake của TLS 1.3 nó được giảm lược hơn rất nhiều 

![](https://images.viblo.asia/bceceac7-5217-4658-b05c-04ff2a6318d2.jpg)

* **Bước 1**: Tương tự như quá trình handshake trong TLS 1.2, handshake TLS 1.3 bắt đầu message `client hello` nhưng  không chỉ gửi mỗi message mà client sẽ gửi kèm luôn danh sách các Cipher Suites đã được hỗ trợ và đoán luôn giao thức thỏa thuận chính mà máy chủ server có khả năng sẽ chọn. 
* **Bước 2**: Để trả lời cho message `client hello` của client, thì server sẽ trả lời với giao thức thỏa thuận chính mà nó đã chọn. Message `server hello` cũng bao gồm luôn các key share của server, chứng chỉ của nó cũng như message `server finished`. Message `server finished` được gửi ở bước thứ 6 trong quá trình bắt tay của TLS 1.2, còn ở TLS 1.3 thì nó được gửi ngay ở bước thứ 2. Qua đó tiết kiệm được 4 bước điều này sẽ giúp giảm thời gian xuống đáng kể
* **Bước 3**: Bây giờ client sẽ kiểm tra chứng chỉ của server, tạo ra các keys vì nó đã có key share của server và gửi message `client finished`. Từ đây mã hóa dữ liệu được bắt đầu.

Bằng cách handshake này TLS 1.3 tiết kiệm được kha khá thời gian so cách cũ của TLS 1.2. Có thể bạn nghĩ răng vài mili giây là sự khác biệt rất ít hoặc không. Nhưng đó là khi bạn có sự kiên nhẫn, còn trong hiện tại trải nghiệm người dùng chỉ cần hơi chậm trễ nửa giây đã làm giảm 20% lưu lượng truy cập một con số cũng không nhỏ đâu.

# Đơn giản hóa Cipher Suites

TLS 1.2 và những người tiền nhiệm của nó sử dụng Cipher Suites bao gồm 4 ciphers. Dưới đây là một ví dụ:

![](https://images.viblo.asia/479eac35-473e-4ade-82d4-932ff8d4b93d.png)

Trong TLS 1.3 cipher suites không còn bao gồm các thuật toán trao đổi key và chữ ký. Bây giờ, nó chỉ là bulk cipher và thuật toán băm.

![](https://images.viblo.asia/cc199145-c54b-4ce3-9b44-4896f5c9c22f.png)

Một trong những vấn đề lớn nhất với TLS 1.2 là hỗn hợp viết tắt với số lượng kết hợp cipher có thể lên đến hàng chục. Đó là cơn ác mộng vì có quá nhiều sự lựa chọn - với rất ít hướng dẫn về các cipher suites nào sẽ được hỗ trợ.

Điều đó đã được giảm đáng kể trong TLS 1.3, đến mức hiện tại chỉ có năm cipher suites được đề xuất:

* TLS_AES_256_GCM_SHA384
* TLS_CHACHA20_POLY1305_SHA256
* TLS_AES_128_GCM_SHA256
* TLS_AES_128_CCM_8_SHA256
* TLS_AES_128_CCM_SHA256
# Hỗ trợ trình duyệt TLS 1.3

TLS 1.3 hiện được hỗ trợ cho Chorme (67+), Firefox (61+), Opera (57+), Edge (76) và Safari (12.3), tất cả đều hỗ trợ bản phát hành TLS mới nhất. Chrome và Firefox là hai trình duyệt đầu tiên triển khai hỗ trợ cho TLS 1.3

![](https://images.viblo.asia/587d8877-418e-4b4f-827a-388cfbc14667.png)

# Tổng kết 
Trên đây là những điểm đổi mới mà TLS 1.3 đem lại, sẽ mất một thời gian để TLS 1.3 được sử dụng một cách rộng rãi và bạn có thể góp phần tăng tốc quá trình này bằng cách bật nó trên trang web hoặc hệ thống của mình. Đến đây chắc các bạn cũng có cái nhìn tổng quan về thằng TLS 1.3 này rồi, xin chào và hẹn gặp lại các bạn trong các bài viết tiếp theo


#### Nguồn :
* https://caniuse.com/#feat=tls1-3
* https://www.thesslstore.com/blog/tls-1-3-handshake-tls-1-2/
* https://www.thesslstore.com/blog/tls-1-3-everything-possibly-needed-know/