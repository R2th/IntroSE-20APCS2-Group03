Hôm nay, bạn sẽ tìm hiểu chính xác xem bạn nên sử dụng SMTP hay IMAP. Trên thực tế, có một sự khác biệt lớn giữa hai giao thức. Trong bài viết này, tôi sẽ giúp bạn hiểu sự khác biệt giữa SMTP và IMAP. Tôi cũng sẽ đề cập ngắn gọn về POP3.

## What is SMTP?

`SMTP` là viết tắt của `Simple Mail Transfer Protocol` (Giao thức truyền thư đơn giản) và đây là giao thức tiêu chuẩn để gửi email.

Với `SMTP`, bạn có thể gửi hoặc chuyển tiếp thư từ mail client (như Microsoft Outlook) đến mail server. Người gửi sẽ sử dụng SMTP server để thực hiện quá trình truyền email.

Điều quan trọng cần lưu ý khi nghĩ đến việc sử dụng SMTP hay IMAP, đó là SMTP là để gửi email. Vì vậy, nếu bạn đang muốn bật tính năng gửi email trong ứng dụng của mình, thì bạn sẽ muốn tiếp tục sử dụng SMTP thay vì IMAP.

## What is IMAP?

Nếu SMTP là để gửi email, thì IMAP là gì?

Nói một cách đơn giản, IMAP (Internet Access Message Protocol) là một giao thức xử lý việc quản lý và truy xuất email từ mail server.

Vì IMAP xử lý việc truy xuất thư, bạn sẽ không thể sử dụng giao thức IMAP để gửi email. Thay vào đó, IMAP sẽ được sử dụng để nhận tin nhắn.

## Ví dụ về SMTP & IMAP

Cho dù bạn đang gửi một email giao dịch như đặt lại mật khẩu hay bạn đang nhận được thông báo về khoản thanh toán - rất có thể bạn đang sử dụng cả SMTP và IMAP.

Dưới đây là cách SMTP và IMAP hoạt động cùng nhau để truyền một email.

![](https://images.viblo.asia/bf184c5e-5c77-4204-ba2b-8ec42f4f503d.png)

1. Sau khi tạo email và nhấn ‘send’, mail client của bạn (ví dụ: Gmail, Thunderbird, Outlook, v.v.) sẽ sử dụng SMTP để gửi thư của bạn từ mail client tới mail server.
2. Tiếp theo, mail server sẽ sử dụng SMTP để truyền thư đến mail server của người nhận.
3. Sau khi nhận thành công quá trình truyền SMTP (được biểu thị bằng mã phản hồi 250 OK),  mail client của người nhận sẽ tìm nạp thư bằng IMAP và đặt thư đó vào hộp thư đến để người nhận truy cập.

## What is POP3?
Ngoài IMAP, còn có một giao thức khác để nhận email - nó được gọi là POP3.

POP là viết tắt của Post Office Protocol.

Và số ba là viết tắt của “phiên bản 3”, là phiên bản mới nhất và được sử dụng rộng rãi nhất - do đó thuật ngữ “POP3”.

Vậy, sự khác biệt giữa POP và IMAP là gì?

### POP vs IMAP

POP3 tải email từ server xuống một máy tính, sau đó xóa email khỏi server.

Mặt khác, IMAP lưu trữ email trên server và đồng bộ hóa email trên nhiều thiết bị.

### Should you be using POP3 or IMAP?

Nó phụ thuộc vào cách bạn muốn truy cập email của mình.

Nói chung, IMAP mạnh hơn và là phương pháp được khuyến nghị để nhận email nếu bạn đang làm việc trên nhiều thiết bị.

Ngoài ra, nếu bạn muốn có tất cả các email có thể truy cập ngoại tuyến và nếu bạn có một thiết bị được chỉ định cho email, thì POP có thể là một lựa chọn phù hợp.

### Summary of the SMTP, IMAP, and POP3 Email Protocols

* SMTP là giao thức tiêu chuẩn để gửi email. Nếu bạn đang muốn gửi email, thì bạn sẽ sử dụng SMTP thay vì IMAP. Dịch vụ chuyển tiếp SMTP có thể giúp bạn gửi email mà không cần phải xây dựng máy chủ SMTP của riêng mình.
* IMAP là một trong những giao thức phổ biến nhất để nhận email. IMAP đồng bộ hóa tin nhắn trên tất cả các thiết bị.
* POP3 là một giao thức khác để nhận email trên một thiết bị. Sử dụng POP3 có nghĩa là email của bạn sẽ có thể truy cập ngoại tuyến và bị xóa khỏi máy chủ.


-----


*Bài gốc* : https://www.socketlabs.com/blog/smtp-or-imap