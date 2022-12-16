SSL là chữ viết tắt của Secure Sockets Layer (Lớp socket bảo mật). Một loại bảo mật giúp mã hóa liên lạc giữa website và trình duyệt. Công nghệ này đang lỗi thời và được thay thế hoàn toàn bởi TLS.

TLS là chữ viết tắt của Transport Layer Security, là tên mới của SSL. Cụ thể, SSL protocol đã đến version 3.0 và TLS 1.0 chính là "SSL 3.1". Các phiên bản TLS hiện bao gồm TLS 1.1 và 1.2. Mỗi phiên bản mới sửa dổi và thêm một vài tính năng. Đôi khi chúng ta gọi nó là "SSL/TLS".

HTTPS là phần mở rộng bảo mật của HTTP. Website được cài đặt chứng chỉ SSL/TLS có thể dùng giao thức HTTPS để thiết lập kênh kết nối an toàn tới server. Tóm lại, các điều cơ bản bạn cần nắm rõ về SSL là:

* Mục tiêu của SSL/TLS là bảo mật các thông tin nhạy cảm trong quá trình truyền trên internet như, thông tin cá nhân, thông tin thanh toán, thông tin đăng nhập.
* Nó là giải pháp thay thế cho phướng pháp truyền thông tin văn bản dạng plain text, văn bản loại này khi truyền trên internet sẽ không được mã hóa, nên việc áp dụng mã hóa vào sẽ khiến cho các bên thứ 3 không xâm nhập được bào thông tin của bạn, không đánh cắp hay chỉnh sửa được các thông tin đó.
* Hầu hết mọi người đều quen thuộc với các chứng chỉ SSL/TLS, đang được dùng bởi các website lớn và các webmaster nghiêm túc trong việc bảo vệ các giao dịch người dùng.
* Bạn có thể biết được website có đang dùng chứng chỉ bảo mật SSL/TLS hay không đơn giản bằng cách nhìn vào icon trong URL ngay trong thanh địa chỉ.

Vậy trước tiên, hãy cùng nhau tìm hiểu về chứng chỉ SSL nhé.

## Chứng chỉ SSL/TLS hoạt động như thế nào?
Chứng chỉ SSL/TLS hoạt động bằng cách tích hợp key mã hóa vào thông tin định danh công ty. Nó sẽ giúp công ty mã hóa mọi thông tin được truyền mà không bị ảnh hưởng hoặc chỉnh sửa bởi các bên thứ 3.

![](https://images.viblo.asia/cf614f01-db51-4bc3-8628-e4ed84bc7e20.png)

SSL/TLS hoạt động bằng cách sử dụng public và private key, đồng thời các khóa duy nhất của mỗi phiên giao dịch. Mỗi khi khách truy cập điền vào thanh địa chỉ SSL thông tin web browser hoặc chuyển hướng tới trang web được bảo mật, trình duyệt và web server đã thiết lập kết nối.

Trong phiên kết nối ban đầu, public và private key được dùng để tạo session key, vốn được dùng để mã hóa và giải mã dữ liệu được truyền đưa. Session key sẽ được sử dụng trong một khoảng thời gian nhất định và chỉ có thể dùng cho phiên giao dịch này.

Nếu có khóa màu xanh ngay đầu địa chỉ web thì tức là website đã thiết lập đúng SSL/TLS. Bạn có thể nhấn vào nút màu xanh đó để xem ai là người giữ chứng chỉ này.

## Tại sao phải sử dụng SSL/TLS?

SSL/TLS là yếu tố bắt buộc khi bạn cần xử lý các thông tin nhạy cảm như thông tin đăng nhập và mật khẩu, hoặc khi phải xử lý các thông tin thanh toán.

![](https://images.viblo.asia/aaf5d737-aae5-4bf9-846f-1259f074451f.png)

Có 3 lý do chính mà một website hiện đại buộc phải có SSL/TLS:

1 – Bảo mật thông tin nhạy cảm

Một khi SSL được sử dụng, mọi thông tin sẽ không thể đọc được ngoại trừ máy chủ mà bạn gửi thông tin đến. Chính điều này sẽ bảo vệ toàn bộ thông tin khỏi hacker hay những kẻ trộm danh tính.

2 – Cung cấp chứng thực

Xác nhận quyền sử dụng tên miền
Xác nhận tổ chức tồn tại hợp pháp
Xác nhận tổ chức tồn tại thực tế
Xác nhận hoạt độngcủa tổ chức
Xác nhận người phê duyệt, người ký tên.

3 – Tạo sự tin tưởng cho người dùng

SSL còn cung cấp sự tin tưởng. Các trình duyệt web đều có những dấu hiệu dễ nhận biết cho người dùng, ví dụ như biểu tượng khóa hay thanh màu xanh lá cây, để đảm bảo khách truy cập biết được rằng kết nối này đã được đảm bảo. Với những con dấu tin tưởng này, khách hàng sẽ an lòng  tin cậy trang web của bạn nhiều hơn và khả năng mua hàng ở website của bạn sẽ cao hơn.

## SSL/TLS thì liên quan gì tới HTTPS?

Khi bạn thiết lập chứng chỉ SSL, bạn sẽ cần cấu hình nó truyền dữ liệu qua HTTPS. 2 công nghệ này đi đôi với nhau mà bạn không thể chỉ dùng 1 trong 2, để rõ hơn bạn có thể xem qua hình minh họa.

![](https://images.viblo.asia/ae2b2067-2e94-48af-b008-6a3cebf04813.jpg)

Có nghĩa là hễ bạn truy cập URL, nếu **bạn truy cập từ HTTPS thì có nghĩa là kết nối HTTP đó đang được bảo vệ bởi chứng chỉ SSL**.

## SSL/TLS được thêm vào website của bạn như thế nào?

Có 3 loại chứng chỉ mà bạn có thể đăng kí cho website của mình:

1. Let’s Encrypt Certificates.

Let’s Encrypt cung cấp một cơ chế tự động để yêu cầu và gia hạn các chứng chỉ tên miền được chứng thực miễn phí. Họ đã tạo ra một giao thức chuẩn – ACME – để tương tác với dịch vụ để tự động lấy và khôi phục các chứng chỉ. Client của ACME chính thức được gọi là Certbot, mặc dù cũng có nhiều client khác thay thế.
* Quá trình: Thiết lập ban đầu và thay đổi được diễn ra tự động. Chỉ có thiết lập Apache và Nginx được tự động hóa với client chính thức, nhưng các chứng chỉ có thể được tải xuống và sử dụng độc lập với bất kỳ phần mềm máy chủ cụ thể nào.
* Chi phí: Miễn phí
* Xác thực: Chỉ DV
* Độ tin cậy: Tin cậy theo mặc định trong hầu hết các trình duyệt và hệ điều hành
* Chứng chỉ Wildcard: Không (dự kiến cho phép từ tháng 1 năm 2018)
* Chứng chỉ dành riêng cho IP: Không
* Thời hạn: 90 ngày
2. Self-signed Certificates.

Có thể sử dụng chứng chỉ SSL đã được ký bởi khóa riêng của chính nó, hoàn toàn bỏ qua sự cần thiết của một cơ quan chứng nhận. Đây được gọi là chứng chỉ tự ký và khá phổ biến khi thiết lập các ứng dụng web để thử nghiệm hoặc cho một số người dùng hiểu biết về công nghệ có thể sử dụng.
* Quy trình: Tạo ra chứng chỉ thủ công, không có cơ chế gia hạn
* Chi phí: Miễn phí
* Xác thực: DV và OV
* Độ tin cậy: Không có mặc định. Mỗi chứng chỉ phải được đánh dấu bằng tay là đáng tin cậy, vì không có CA chung
* Chứng chỉ Wildcard: Có
* Chứng chỉ chỉ dành cho IP: Có, bất kỳ IP nào
* Thời gian hết hạn: Bất kỳ

3. Commercial Certificates.

Các cơ quan cấp Chứng chỉ thương mại cho phép bạn mua Chứng chỉ DV, OV, và EV. Một số sẽ cung cấp chứng chỉ tên miền miễn phí với những hạn chế nhất định (ví dụ: không bao gồm chứng chỉ Wildcard).
* Quy trình: Quy trình thủ công để thiết lập ban đầu và thay đổi
* Chi phí: khoảng $10 – $1000
* Xác thực: DV, OV, và EV
* Độ tin cậy: Mặc định được tin cậy trong hầu hết các trình duyệt và hệ điều hành
* Chứng chỉ Wildcard: Có
* Chứng chỉ chỉ dành cho IP: Một số tổ chức sẽ cấp Chứng chỉ cho các địa chỉ IP công cộng
* Thời gian hiệu lực: 1-3 năm

## Vậy, SSL là gì?

SSL là Secure Sockets Layer (TLS thì viết tắt của Transport Layer Security), nó cho phép khách truy cập có thể truyền tải thông tin lên web server một cảnh bảo mật. Nó bảo mật mọi dữ liệu được truyền đi theo cách mà nó không thể bị xâm nhập bởi bên thứ ba như là hackers hay scammers.

Bạn có thể xem website có đang dùng SSL/TLS không bằng cách nhìn vào ô biểu tượng trên thanh địa chỉ của trình duyệt, nếu có khóa màu xanh có nghĩa là có chứng chỉ SSL/TLS. Và bạn có thể click vào đó để xem chứng chỉ đó thuộc về ai.

## Tài liệu tham khảo
https://www.hostinger.com/tutorials/what-is-ssl-tls-https
https://security.stackexchange.com/questions/5126/whats-the-difference-between-ssl-tls-and-https