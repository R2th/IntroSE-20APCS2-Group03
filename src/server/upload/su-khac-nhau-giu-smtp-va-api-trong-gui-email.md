Hiện nay trong các ứng dụng thường sẽ đều có chức năng gửi email, đặc biệt trong các website hay ứng dụng về tiếp thị, marketing thì việc gửi email gần như là bắt buộc có. Do đó các khái niệm sẽ gặp phải khi xây dựng website hay ứng dụng đó sẽ gặp phải như SMTP, Third party email. Rồi khi chúng ta sử dụng dịch vụ gửi email bên thứ 3 thì lại gặp 1 phân vân là sử dụng SMTP hay API của dịch vụ này. Trong bài viết này chúng ta cùng tìm hiểu sự khác biệt giữa SMTP và API, ưu và nhược điểm của chúng nhé.
# SMTP là gì?
SMTP (Simple Mail Transfer Protoco) là giao thức truyền thư đơn giản, là tiêu chuẩn mà các máy chủ thư dùng để gửi email cho nhau trên internet. 

Máy chủ SMTP cho phép bạn sử dụng SMTP để chuyển thư qua máy chủ, qua mạng và đến đích của nó. Không giống như hầu hết các máy chủ máy tính xử lý nhiều quy trình tại bất kỳ thời điểm nào, máy chủ SMTP chỉ được sử dụng để gửi, nhận và chuyển email. *Tìm hiểu thêm* về [smtp server](https://viblo.asia/p/smtp-la-gi-smtp-server-hoat-dong-nhu-the-nao-eW65GBaYlDO)

**SMTP được sử dụng như thế nào?**

Như đã đề cập ở trên, SMTP có một mục đích cụ thể và đó là email. Nó đảm bảo rằng các tin nhắn được chuyển một cách an toàn giữa người gửi và người nhận. Khi gửi qua SMTP

# API là gì ?
API viết tắt của Application Programming Interface (Giao diện lập trình ứng dụng). Không giống như SMTP, nó không chỉ sử dụng cho email. Đây là một phương tiện giúp các ứng dụng, nền tảng, phần mềm và mã (code) khác nhau có thể giao tiếp và chia sẻ tài nguyên với nhau. Trong bài viết này chúng ta đề cập đến API cho email mà thôi.

Một API Email cung cấp cho các ứng dụng quyền truy cập vào chức năng có sẵn trong nền tảng email. Chẳng hạn như tạo chỉnh sửa các mẫu template; Gửi email giao dịch (Email xác nhận, kích hoạt); Cho phép truy cập vào các chỉ số email.

**API email được sử dụng như thế nào?**

API email giúp bạn dễ dàng gửi tin nhắn giao dịch ngay từ ứng dụng hoặc trang web riêng của bạn. Đồng thời cho phép bạn dễ dàng truy cập vào nhiều loại chỉ số. Chẳng hạn như: Tổng số email được gửi, số lượng thư bị ISP từ chối (và lý do), tỷ lệ mở và click….

Ví dụ một website thương mại điện tử hoặc app trên di động đã tích hợp API của Nhà cung cấp dịch vụ gửi email [Sendgrid](https://sendgrid.com/solutions/email-api/). Các bước gửi email giao dịch được tiến hành như sau:

- Khách hàng thực hiện mua hàng trên trang thương mại điện tử (TMĐT) hoặc đặt lại mật khẩu của app trên di động.
- Trang TMĐT hoặc ứng dụng sẽ giao tiếp với cổng API của Sendgrid và cung cấp thông tin như: Địa chỉ email của khách hàng, chi tiết về giao dịch mua hoặc đặt lại mật khẩu…v.v.
- Sendgrid tạo ra thông báo với những thông tin trên dựa trên các mẫu đã được thiết kế sẵn cho từng mục đích cụ thể. (Mẫu email mua hàng khác với mẫu đặt lại mật khẩu). Và gửi đến hộp thư khách hàng.
- Sendgrid ghi lại chi tiết cụ thể về quá trình gửi thư. Chẳng hạn như email gửi thành công hoặc lỗi; Báo cáo nếu được mở, click, v.v. Những thông tin này sẽ được cập nhật trong bảng điều khiển.

Tất cả các API email hoạt động tương tự như ví dụ trên. Mục đích của chúng là cung cấp khả năng nhất quán, nhanh chóng mà không gặp rắc rối khi sử dụng dịch vụ hoặc phần mềm riêng biệt.
# Phân biệt SMTP và API trong email
**SMTP hoạt động**

Cần xây dựng 1 smtp server riêng để gửi email hoặc cũng có thể sử dụng smtp của bên thứ 3 để gửi email (Ví dụ, địa chỉ máy chủ SMTP của Gmail là smtp.gmail.com. Của Twilio SendGrid là smtp.sendgrid.com. Hay của Amazon SES là amazonses.com)

Dưới đây là một ví dụ về việc gửi thành công một email đến hai hộp thư qua SMTP. Một ứng dụng client (có dữ liệu email để gửi) mở kết nối với server SMTP, sau đó gửi mã HELO để cho server SMTP biết nó muốn gửi email. Quá trình tổng thể bao gồm nhiều lần trò chuyện riêng lẻ giữa client và server SMTP, như bạn sẽ thấy bên dưới  response  “250 Ok” được trả ra để có thể đi đến bước tiếp theo.
*Lưu ý: “S” đề cập đến Server, “C” đề cập đến client nhận*
```
=== Connected to smtp.example.com.

S: 220 smtp.example.com ESMTP Postfix

C: HELO relay.example.com

S: 250 smtp.example.com, I am glad to meet you

C: MAIL FROM:<bob@example.com>

S: 250 Ok

C: RCPT TO:<alice@example.com>

S: 250 Ok

C: RCPT TO:<theboss@example.com>

S: 250 Ok

C: DATA

S: 354 End data with <CR><LF>.<CR><LF>

C: From: “Bob Example” <bob@example.com>

C: To: Alice Example <alice@example.com>

C: Cc: theboss@example.com

C: Date: Tue, 15 Jan 2008 16:02:43 -0500

C: Subject: Test message

C:

C: Hello Alice.

C: This is a test message with 5 header fields and 4 lines in the message body.

C: Your friend,

C: Bob

C: .

S: 250 Ok: queued as 12345

C: QUIT

S: 221 Bye
```
Khó khăn khi sử dụng SMTP
- SMTP cung cấp mức độ chi tiết tốt nhất về mặt kiểm soát nhưng yêu cầu bắt tay cho mỗi tương tác nhỏ, điều này làm tăng thêm nhiều lưu lượng mạng và nhiều điểm lỗi tiềm ẩn hơn dẫn đến phá vỡ chuỗi gửi email.
- Bạn toàn quyền kiểm soát các thao tác liên quán đến việc gửi email, nhưng đòi hỏi sự tỉ mỉ và kinh nghiệm của developer để có thể thiết lập 1 smtp chính xác.
**API hoạt động**
Thường sẽ sử dụng các aoi do bên thứ 3 cung cấp để có thể tích hợp nhanh chóng vào ứng dụng của bạn.

Các nhà cung cấp API email có thể cung cấp tốc độ gửi tốt hơn và cho phép các giao dịch của bạn diễn ra nhanh hơn vì ít yêu cầu qua lại hơn so với SMTP thuần túy. Việc hợp lý hóa này cũng giảm thiểu số lượng trao đổi tổng thể cần thiết khi gửi email, do đó cải thiện I / O. Khi bạn đang tương tác với một ứng dụng phần mềm qua internet, bạn đang sử dụng giao thức chuẩn của truyền thông web, HTTP (Hypertext Transfer Protocol). Do đó khi sử dụng Api email nó cũng là 1 lợi thế để gửi yêu cầu và nhận dữ liệu. Một lợi thế của việc sử dụng HTTP làm giao thức gửi dữ liệu email của bạn là nó có nhiều khả năng được chấp nhận hơn so với các thông điệp SMTP, thường bị chặn bởi firewall.

Dưới đây là ví dụ về cách gửi tin nhắn bằng HTTP API:
```
POST /send HTTP/1.1

Host: api.nylas.com

Content-Type: application/json

Authorization: Basic WVVUW****

cache-control: no-cache

{

“reply_to_message_id”: “7a893****”

}
```
Khó khăn khi sử dụng API HTTP cho Email
- Mỗi Api là một chức năng và nhiệm vụ riêng biệt, vì vậy cần nghiên cứu và tìm hiểu cách hoạt động của nó. Ngoài ra tài liệu api cung cấp phải thật sự chất lượng cao.
- Bạn đang nhờ bên trung gian thứ ba, vì vậy bạn phải tin rằng nhà cung cấp đó là đáng tin cậy.

**Chúng khác nhau như thế nào**


| SMTP | API
| -------- | -------- |
| Simple Mail Transfer protocol | HyperText Transfer Protocol |
| Gửi email chậm do tốn thời gian trao đổi (phải có DNS và các yêu cầu xác thực) | API Web cho phép gửi thư nhanh hơn vì chúng không tiến hành qua lại dưới dạng SMTP |
| sử dụng tốt cho cách gửi thư thông thường và không thể tích hợp được api (ví dụ xây dựng 1 ứng dụng nhận gửi email) | lựa chọn hàng đầu cho các nhà tiếp thị và developer (sử dụng tốt cho các website TMDT hay các ứng dụng cần gửi email) |
| Quy trình thiết lập và xử lý sự cố dễ dàng | Cho phép tự động hóa các giao dịch của bạn và theo dõi các chỉ số dựa trên api |
| Tạo một tin nhắn và gửi nó đến máy chủ trực tiếp - ít phụ thuộc hơn | Tùy chỉnh cao hơn, tùy chọn thất bại thấp hơn |
| SMTP cung cấp độ chi tiết tốt nhất về mặt kiểm soát | API cung cấp tính linh hoạt và tính lưu động |

# Khi nào nên sử dụng smtp và Api?
**Khi nào nên sử dụng SMTP cho email ?**

SMTP sẽ phù hợp với người gửi sử dụng ứng dụng được phát triển bởi bên thứ ba hoặc các nền tảng/app không thể tích hợp API. Các hệ thống bên thứ 3 như sendgrid, gmail, SES Amazon,... họ sẽ phát triển gửi email bằng smtp. Còn chúng ta ngươi sử dụng thì nên sử dụng các API của bên thứ 3 này cho tiện lợi.

Ngoài ra, Nếu bạn là người gửi email, câu hỏi tò mò nhất trong đầu bạn sẽ là email của bạn hoạt động như thế nào? Nó có thể gửi trúng mục tiêu không? SMTP rất tiện lợi để trả lời câu hỏi này và dễ dàng check các lỗi khi gửi có gửi đến đúng mục tiêu cần gửi không.

**Khi nào sử dụng API cho email**

Theo như mình tìm hiểu thì tất cả các ứng dụng email phổ biến đều khuyên chúng ta sử dụng API cho mọi trường hợp mà bạn có thể tích hợp nó vào các ứng dụng của mình. Chúng có lợi thế là nhanh hơn và linh hoạt hơn SMTP. Dễ dàng thấy, API được sử dụng phổ biến cho các website cần kích hoạt email tự động. Ví dụ như:

* Thông báo tạo tài khoản
* Đặt lại mật khẩu
* Thông báo đăng nhập bất thường


# Kết luận
Trong  dự án mình làm thì hiện tại đều sử dụng smtp và api của bên thứ 3, có thể sắp tới sẽ thiết lập smtp của chính hệ thống mình để sử dụng. Nhưng hiện tại thì sử dụng smtp và api của bên thứ 3 vẫn đang hợp lý.
- Sử dụng smtp cho các trường hợp người dùng cần tạo các email marketing hoặc email tiếp thị đến hàng loạt người dùng cuối.
- Sử dụng api để tích hợp cho các email tự động nhưng gửi tin nhắn mua hàng thành công, gửi tin nhắn về giỏ hàng, ...

SMTP và API có thể gây nhầm lẫn nhưng bạn cần phân biệt sự khác nhau để lựa chọn thời điểm sử dụng thích hợp.

- **SMTP** (Giao thức truyền thư): Như tên gọi của nó, liên quan đến chuyển thư, nên sử dụng cho trường hợp gửi thư bình thường, gọi là nhập email và gửi hàng loạt. Bạn nên sử dụng nó để gửi email khi bạn có các ứng dụng không cho phép chức năng API. 
- **Email API** (Giao diện lập trình ứng dụng): Cho phép các hành động của người tiêu dùng tự động kích hoạt email. Nên sử dụng khi cần gửi email nhanh hơn và yêu cầu khả năng linh hoạt.


Hi vọng những chia sẻ trên có thể phần nào giúp các bạn giải đáp thắc mắc và chọn lựa cách sử dụng giữa 2 loại để gửi email.

**Tài liệu tham khảo**

- https://www.mailgun.com/blog/difference-between-smtp-and-api/
- https://www.nylas.com/blog/smtp-vs.-web-api-the-best-methods-for-sending-email/