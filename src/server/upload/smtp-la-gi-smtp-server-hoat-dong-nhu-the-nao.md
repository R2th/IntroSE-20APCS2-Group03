Hẳn là trong chúng ta ai cũng đã nghe đến SMTP hay SMTP email rồi SMTP Server. Vậy những khái niệm này là gì? nó có mục đích và cách hoạt động như thế nào. Bài viết hôm nay sẽ giải thích các khái niệm về SMTP và cách chúng hoạt động.
# SMTP là gì?
SMTP (Simple Mail Transfer Protocol) là giao thức chuẩn TCP/IP được dùng để truyền tải thư điện tử (e-mail) trên mạng internet.

SMTP lần đầu tiên được xác định vào năm 1982 bởi RFC 821 và được RFC 5321 cập nhật vào năm 2008 thành các bổ sung SMTP mở rộng , đây là loại giao thức được sử dụng rộng rãi ngày nay. Máy chủ thư và các đại lý chuyển thư khác sử dụng SMTP để gửi và nhận thư. Các hệ thống độc quyền như Microsoft Exchange và IBM Notes và các hệ thống webmail như Outlook.com , Gmail và Yahoo! Mail có thể sử dụng các giao thức không chuẩn trong nội bộ, nhưng tất cả đều sử dụng SMTP khi gửi hoặc nhận email từ bên ngoài hệ thống của họ.

Vậy đơn giản SMTP là một giao thức để có thể gửi email trên internet.
# SMTP, POP3, IMAP là gì?
* **SMTP** là giao thức tiêu chuẩn để gửi email. Nó thiết lập kênh kết nối giữa mail client và mail server, và thiết lập kênh liên lạc giữa mail server gửi và mail server nhận. Email sẽ được đẩy từ mail client lên mail server và từ mail server nó sẽ được server này gửi đi đến mail server nhận
* **POP3** (Post Office Protocol version 3) được sử dụng để kết nối tới server email và tải email xuống máy tính cá nhân thông qua một ứng dụng email như Outlook, Thunderbird, Windows Mail, Mac Mail,...
* **IMAP** (Internet Message Access Protocol) được dùng để kéo emails về emails client, tuy nhiên khác biệt với POP3 là nó chỉ kéo email headers về, nội dung email vẫn còn trên server. Đây là kênh liên lạc 2 chiều, thay đổi trên mail client sẽ được chuyển lên server. Sau này, giao thức này trở nên phổ biến nhờ nhà cung cấp mail lớn nhất thế giới, Gmail, khuyên dùng thay vì POP3.

Cách mà 3 giao thức này làm việc:

![image.png](https://images.viblo.asia/3aa5555c-98a0-4bad-9c98-990b9347d426.png)


![image.png](https://images.viblo.asia/b9e11e1d-16ba-41b3-ba2a-fe89a32dcc93.png)

1) Sau khi tạo email và nhấn 'gửi', ứng dụng email của bạn (ví dụ: Gmail, Thunderbird, Outlook, v.v.) sẽ sử dụng SMTP để gửi thư từ ứng dụng email của bạn đến email server.
2) Tiếp theo, máy chủ email sẽ sử dụng SMTP để truyền thông điệp đến email server nhận của người nhận.
3) Sau khi nhận thành công quá trình truyền SMTP (được biểu thị bằng mã phản hồi 250 OK), ứng dụng email khách của người nhận sẽ tìm nạp thư bằng IMAP hoặc POP3 và đặt nó vào hộp thư đến để người nhận truy cập.
# SMTP Server là gì? Có giống một máy chủ bình thường?
Một máy chủ SMTP sẽ có một địa chỉ (hoặc nhiều địa chỉ) có thể được thiết lập bởi các mail client hoặc ứng dụng mà bạn đang sử dụng. Và thường được định dạng như smtp.serveraddress.com. (Ví dụ, địa chỉ máy chủ SMTP của Gmail là smtp.gmail.com. Của Twilio SendGrid là smtp.sendgrid.com. Hay của Amazon SES là amazonses.com) .

Về mặt kỹ thuật thì SMTP server giống như các máy chủ thông thường khác. Điểm khác ở đây là khả năng gửi email số lượng lớn không giới hạn.

Ví dụ, Gmail là máy chủ gửi email miễn phí của Google. Nhưng đặt ra hạn chế là bạn chỉ gửi được tối đa 500 email/ngày. Không được phép gửi nhiều hơn. Ngoài ra, Gmail phục vụ mục đích liên quan đến công việc, cá nhân, các thông tin liên lạc, giao dịch…. Không sử dụng cho mục đích gửi quảng cáo, tiếp thị, marketing.

Còn với SMTP server nó là các máy chủ chuyên dụng để gửi email số lượng lớn. Với mục đích gửi thông tin quảng cáo, marketing hoặc chăm sóc khách hàng. Và bạn sẽ cần trả phí gửi cho các smtp server này.

Ngoài ra, một máy chủ SMTP đóng nhiệm vụ quan trọng trong việc xác thực email gửi đi có phải là tài khoản đang hoạt động không. Đây là vai trò đầu tiên trong việc bảo vệ hộp thư đến của bạn từ email bất hợp pháp. Nó cũng sẽ gửi email trở lại người gửi nếu nó không thể được chuyển thành công. Điều này thông báo cho người gửi rằng họ có địa chỉ email không đúng hoặc email của họ đang bị chặn bởi máy chủ nhận.



# SMTP Server hoạt động như thế nào?
1. Ví dụ ứng dụng cả bạn sử dụng  SendGrid SMTP, smtp.sendgrid.net, dùng cổng 25 (theo mặc định) để gửi email.

2. Nếu bạn gửi email ví dụ gửi đến một email có máy chủ là gmail chẳng hạn (...@gmail.com). Đầu tiên Sendgrid sẽ liên hệ với phía Gmail để xác thực tài khoản người gửi là đang hoạt động. Sau đó chuyển tiếp thông tin thư, chẳng hạn như địa chỉ người gửi, người nhận và nội dung tin nhắn bằng SMTP cho gmail.

3. SMTP server sendgrid (server gửi) gửi thông tin thư thu thập từ yêu cầu của bạn. Và sau đó lặp lại quá trình đàm thoại trong bước 2 với SMTP server gmail (server nhận) .

4. SMTP server ngườ nhận kiểm tra địa chỉ gửi, địa chỉ người nhận (để đảm bảo họ là người nhận hợp lệ) và nội dung thư. Nó kiểm tra domain gửi cho bất kỳ vấn đề DNS khả nghi. Chẳng hạn như DKIM và chữ ký SPF không hợp lệ. Cho đến khi không có vấn đề, máy chủ thư của người nhận sẽ sử dụng giao thức POP3 hoặc IMAP để truy xuất email. Và cung cấp thông báo cho người nhận dự định của mình.
![image.png](https://images.viblo.asia/6a1eee5d-253c-4b10-b57d-63d08c0f908e.png)

Ở đây email sẽ được gửi từ someone đến ...@gmail.com và ta có Mailjet SMTP server (server gửi), Gmail SMTP server (server nhận). hoạt động theo 4 bước ở trên.

> Tại bước 4 chúng ta thấy kiểm tra DNS, SMTP nhận phải kiểm tra để chắc chắn SMTP server gửi email được ủy quyền gửi email đó cho domain của bạn. Ví dụ bạn có domain là khoipv.vn và email gửi là khoipv@khoipv.com. Lúc này bạn đang sử dụng Sendgrid SMTP để gửi vậy Server gmail phải chắc chắn rằng SMTP Sendgrid được ủy quyền gửi email thay cho domain "khoipv.vn" bằng DKIM và chữ ký SPF, giống như 1 bản hợp đồng ủy quyền vậy đó. Mục đích các bước kiểm tra trên để tránh việc giả mạo và spam email đến người nhận.

# Tổng kết
- SMTP là một giao thức chuẩn mà các máy chủ thư dùng để gửi email cho nhau trên internet.
- SMTP server thường được sử dụng để gửi các email như thông tin quảng cáo, marketing hoặc chăm sóc khách hàng.
- Tỷ lệ thành công khi gửi Email cao hơn rất nhiều

Qua bài viết mình hi vọng các bạn có thể hiểu được phần nào về smtp, smtp server và cách hoạt động của chúng.



Tài liệu tham khảo:
* https://www.geeksforgeeks.org/difference-between-smtp-and-pop3/
* https://phanmemmarketing.vn/smtp-server-la-gi/