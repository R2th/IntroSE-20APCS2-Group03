Giả sử bạn có một ứng dụng Ruby đang hoạt động và cần thêm chức năng gửi email vào ứng dụng đó. Điều này có thể liên quan đến xác thực người dùng hoặc bất kỳ loại email giao dịch nào khác, nó không có gì khác biệt. Hướng dẫn này được điều chỉnh để giúp bạn triển khai gửi email bằng Ruby và giới thiệu nhiều cách cho việc đó.
## Các cách gửi mail với Ruby
Hầu hết, mọi người đều lựa chọn 1 trong 3 cách.

Cách đơn giản nhất là sử dụng  class `Net::SMTP`. Nó cung cấp các tính năng để gửi mail qua SMTP. Hạn chế của cách này là `Net::SMTP` thiếu chức năng soạn email. Bạn luôn phải tự tạo chúng, và nó sẽ mất chút thời gian.

Cách thứ 2 là sử dụng `Ruby gem` như `Mail`, `Pony`, .... Cách này giúp bạn thực hiện các hoạt động gửi mail 1 cách đơn giản và hiệu quả hơn. `Action Mailer` là lựa chọn hoàn hảo và cũng được Rails chọn làm default.

Cách thứ 3 là sử dụng class `Socket`. Class này cho phép bạn giao tiếp giữa những tiến trình, hay trong 1 tiến trình. Vì vậy, cũng có thể gửi mail với `Socket`. Tuy nhiên, `Socket` không hỗ trợ các chức năng chuyên sâu cho việc gửi mail, nên có thể bạn sẽ không thích cách này.

## Net::SMTP
```
require 'net/smtp'

message = <<END_OF_MESSAGE
From: YourRubyApp <info@yourrubyapp.com>
To: BestUserEver <your@bestuserever.com>
Subject: Any email subject you want 
Date: Tue, 02 Jul 2019 15:00:34 +0800

Lorem Ipsum
END_OF_MESSAGE
Net::SMTP.start('your.smtp.server', 25) do |smtp|
  smtp.send_message message, 
  'info@yourrubyapp.com', 
  'your@bestuserever.com'
end
```

Đây là 1 ví dụ đơn giản để gửi 1 email thuần text bằng SMTP ([documentation](https://docs.ruby-lang.org/en/2.4.0/Net/SMTP.html)). Nội dung email sẽ báo gồm 4 headers: From, To, Subject, and Date, và kèm theo đoạn body text bị cách với 4 headers bởi 1 dòng trống. 'your.smtp.server' là server SMTP, 25 là port default. Nếu cần thiết, bạn có thể chỉ định rõ username, password, hoặc xác thực scheme.
```
Net::SMTP.start('your.smtp.server', 25, ‘localhost’, ‘username’, ‘password’ :plain) do |smtp|
```
Sau đó bạn có thể sử dụng method `send_message` để gửi mail và chỉ định địa chỉ của người gửi, người nhận. Block SMTP.start sẽ tự động đóng connection tới SMTP tự động sau khi gửi mail.

## Ruby Mail
Thư viện này nhằm 1 mục đích là để quản lý các hoạt động liên quan tới email bao gồm cả gửi và nhận mail.
```
mail = Mail.new do
  from    'info@yourrubyapp.com'
  to      'your@bestuserever.com'
  subject 'Any subject you want'
  body    'Lorem Ipsum'
end
```
Bạn có thể change SMTP settings:
```
Mail.defaults do
  delivery_method :smtp, address: "localhost", port: 1025
end
```
hoặc thậm chí cả method gửi mail.
```
mail.delivery_method :sendmail

mail.deliver
```


-----

Ở trên là cách ví dụ đơn giản, để tìm hiểu thêm về các TH phức tạp hơn như gửi mail với format HTML, gửi mail với file đính kèm, hay sử dụng các thư viện khác như Pony, Action Mailer thì tìm hiểu thêm tại [đây](https://blog.mailtrap.io/ruby-send-email/).