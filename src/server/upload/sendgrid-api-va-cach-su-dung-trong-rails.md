### Giới Thiệu
![](https://images.viblo.asia/6783f010-fc0e-4065-9ae2-719eccb64e7a.png)

### 1. SendGrid là gì?
SendGrid là một trong số các nhà cung cấp dịch vụ Email Marketing hàng đầu thế giới. Bên cạnh đó, dịch vụ SMTP Server miễn phí của họ cũng được nhiều người sử dụng và đánh giá cao.
Thông thường, khi dùng WordPress hoặc các mã nguồn khác, chúng ta sử dụng luôn thông tin SMTP của Hosting để gửi mail notification. Tuy nhiên, do IP Hosting dùng chung với hàng trăm website khác nên khả năng rất cao bị blacklist, gửi mail bị chuyển vào Spam.
Thậm chí tồi tệ hơn, một số nhà cung cấp còn chặn gửi mail để bảo vệ server, nếu không để ý bạn sẽ không thể biết được thông tin này.
Khi sử dụng SMTP Server chuyên dụng, bạn sẽ hạn chế được giới hạn này, gửi mail nhanh hơn, vào chuẩn Inbox luôn mà không lạc vào Spam.
Trước đây, SendGrid cho phép sử dụng hoàn toàn miễn phí với giới hạn 12,000 email/tháng nhưng hiện tại chúng ta chỉ có thể dùng thử FREE 1 tháng mà thôi. Gửi được tối đa 40,000 email trong vòng 30 ngày đầu. Sau đó, phí mỗi tháng sẽ từ 9.95$, phụ thuộc vào số lượng email muốn gửi đi.
Với chất lượng ổn định, khả năng delivery cao của SendGrid nên được rất nhiều blogger lớn và doanh nghiệp tin tưởng sử dụng.
### 2. Đăng ký tài khoản SendGrid và API key
- Các bạn có thể tham khảo ở  [Link](https://hoclaptrinh.vn/posts/sendgrid-la-gi-tao-tai-khoan-va-cau-hinh-trong-sendgrid) này , khá là chi tiết và rõ ràng 
- Làm theo các bước trên ta sẽ có API để tiếp tục các bước tiếp theo
### 3. Tạo lib mailer
   - Hiện nay SendGrid đã có gem hỗ trợ có thể import vào dự án, các bạn có thể tham khảo cách sử dụng ở đây [Link](https://github.com/sendgrid/sendgrid-ruby/)
   - Nhưng để dễ hiểu và nhanh gọn mình sẽ hướng dẫn các bạn xây dựng 1 lib mailer nhỏ ,sử dụng cURL để gọi **API v3 SendGrid.**
   - Trước tiên khởi tạo một lib:  
     - path: /lib/send_grid_mailer.rb
     - Các bạn nhớ autoload lib config ở application.rb,bạn nào chưa biết có thể xem thêm ở  [đây](https://gist.github.com/maxivak/381f1e964923f1d469c8d39da8e2522f)
   - Bắt đầu code thôi
   ```
class SendGridMailer
      def self.send(subject, from, to, message_text, message_html) 
        begin
          @api_key = "SG.xxxxx"
          url = "https://api.sendgrid.com/v3/mail/send"
          if @proxy.blank?
            http_client = HTTPClient.new(default_header: { "Content-Type" => "application/json", "Authorization" => "Bearer #{@api_key}" })
          else
            http_client = HTTPClient.new("http://#{@proxy.ip_address}:#{@proxy.port}", default_header: { "Content-Type" => "application/json", "Authorization" => "Bearer #{@api_key}" })
            http_client.set_proxy_auth(@proxy.user_name, @proxy.password)
          end
          data = {
            personalizations: [
              {
                to:[
                  email: to.to_s
                ]
              }
            ],
            from: { email: from.to_s},
            subject: subject,
            content: [
              {
                type: "text/html",
                value: message_html
              },
              {
                type: "text/text",
                value: message_text
              }
            ],          
          }
          data = data.to_json
          result = http_client.post(url, data)
          if (result.header.status_code == 200 || result.header.status_code == 202)
            #Xử lí thành công
          else  
            #Xử lí thất bại
          end
        rescue
          #Xử lí ngoại lệ 
        end
      end
end
   ```
Tham số truyền vào lib gồm có **:subject, :from, :to, :message_text, :message_html**
Mình giải thích thêm tý để mọi người rõ hơn các tham số này:
*  subject: Là subject của email mà mình muốn gửi đi.
*  from: Địa chỉ mail của người gửi, exp: "mail_xample@from.com".
*  to: Địa chỉ mail của người nhận, exp: "mail_xample@to.com".
* message_text: Nội dung email gửi đi dạng text
* message_html: Nội dung email có thể gửi dưới code dạng html.

Ở phần code trên có mình có sử dụng biến @proxy , nó là biến của HTTPClient các bạn có thể xem thêm ở [đây](https://github.com/nahi/httpclient/blob/master/lib/httpclient.rb) nếu muốn biết rõ hơn.

và biến @api_key = "SG.xxxxx" chính là api_key bên SendGrid cung cấp cho mình khi tạo account.
Cuối cùng là cách gọi nó ra thôi:
```
SendGridMailer.send(subject, from, to, content, content_html)
```
Nhớ truyền đủ các tham số các bạn nhá =)))
### 4. Kết Luận
Trên đây là một cách trong rất nhiều cách mà các bạn có thể dùng với SendGrid, đây cũng là một cách thuận tiện và nhanh chóng và dễ dàng tìm hiểu cho các bạn mới bắt đầu

**Chúc các bạn sử dụng thành công =))))**

Link tài liệu :
*    https://sendgrid.com/docs/for-developers/sending-email/curl-examples/
*    https://github.com/nahi/httpclient
*    https://hoclaptrinh.vn/posts/sendgrid-la-gi-tao-tai-khoan-va-cau-hinh-trong-sendgrid