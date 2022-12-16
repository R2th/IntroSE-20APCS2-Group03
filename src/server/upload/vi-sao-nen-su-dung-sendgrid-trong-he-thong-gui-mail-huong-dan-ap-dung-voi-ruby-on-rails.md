# Vì sao lại sử dụng Sendgrid?
SMTP Server (server dùng để gửi mail) là một dịch vụ cho phép gửi email với số lượng lớn, vào chuẩn Inbox luôn mà không lạc vào Spam, tốc độ nhanh mà không bị giới hạn như các hòm mail miễn phí của Gmail hoặc mail đi kèm hosting.

- Hiện nay có rất nhiều cách để làm một ứng dụng gửi mail, tuy nhiên với một vài lí do sau đây, có lẽ bạn nên thử một lần với Sendgrid:
+ Sendgrid cung cấp giải pháp email dựa trên nền tảng đám mâ, do đó bạn không cần phải xây dựng, quy mô và duy trì các hệ thống mail server 
+ Tốc độ gửi mail nhanh, rất hiếm khi xuất hiện lỗi từ phía server Sendgrid. Dự án mình đang làm sử dụng Sendgrid và cho đến nay chưa bao giờ thấy lỗi, thậm chí mail cũng không bị đưa vào mục spam
+ Cho phép bạn gửi 12000 mails/tháng với gói FREE. Điều này cho bạn thỏa sức nghiên cứu, học tập, thử nghiệm
+ Có nhiều gói khác nhau với hàng tá tính năng hữu dụng, và cho phép tracking receiver như: Nhận biết khi receiver mở link, Nhận biết khi receiver mở mail, Nhận biết khi receiver chuyển tiếp mail,... v.v
+ Dễ tiếp cận, sử dụng

Có 1 điểm cộng nữa là, với mỗi request gửi lên sv, Sendgrid sẽ trả về cho chúng ta 1 response tương ứng với mã code, 2xx, 4xx, 5xx,.... 
Đối với những request 400 thì sendgrid sẽ tự động retry trong vòng 72h, rất tỉ mĩ phải k nào. Ngoài ra nếu xuất hiện lỗi thì cũng trả về nhiều loại mã code khác nhau để dev có thể handle được, dưới đây là 1 số mã code mình biết:

| Code | Message | Explanation |
| -------- | -------- | -------- |
| 250     | Queued mail for delivery     | Mail của bạn đã được xếp vào hàng đợi thành công và đang chờ được gửi đi |
|403| You are not authorized to send from that email address| Bạn không có quyền để gửi mail từ địa chỉ này |
|421| Message from (X.X.X.X) temporarily deferred| Mail bị delay do máy chủ nhận mail bị quá tải, các mail bạn gửi sẽ được retry trong 72h |
|551| User does not exist.	| Bạn đang gửi đến một địa chỉ mailbõx không tồn tại|

SendGrid cung cấp hai cách để gửi email: thông qua SMTP relay hoặc thông qua API Web. Mỗi loại đều có những ưu điểm riêng. Theo mình thấy thì SMTP rất dễ sử dụng, nếu dùng API Web thì bạn sẽ tự do customize được thoải mái hơn. Sau đây mình sẽ hướng dẫn sử dụng Sendgrid thông qua SMTP. Nếu các bạn muốn tìm hiểu thêm về API Web thì có thể tham khảo link sau [Sendgrid với API](https://viblo.asia/p/sendgrid-api-va-cach-su-dung-trong-rails-aWj53bM8l6m)
# Đăng ký và sử dụng
## Đăng ký API Key
Truy cập https://sendgrid.com/ và chọn Start for free và đăng ký bằng mail của bạn. Có một số thông tin bảo là đăng ký Sendgrid ở Việt Nam hơi khó, không biết là mình may mắn hay sao nữa mà đăng ký 2 acc đều được cả 2 :D 
Nếu là tài khoản đăng ký để nghiên cứu thì không sao, nhưng nếu để làm việc thì bạn nên khai báo thông tin một cách chính xác để sau này còn xác minh nhé

Sau khi đăng ký thành công bạn sẽ được direct về dashboard. Tiếp theo chúng ta cần tạo API Key để thực hiện gọi đến server Sendgrid mỗi khi gửi mail

Trên màn hình dashboard -> Settings -> ApiKeys. Sau đó chọn Create API key

![](https://images.viblo.asia/7f296dd6-c041-4628-8b69-7ccba5a72afa.png)

Tiếp theo bạn cần nhập đầy đủ API Key Name và chọn API Key Permissions và nhấn Create and View
![](https://images.viblo.asia/5972398d-8848-41df-aa9d-767fb99ca8a6.png)

Sau khi Create thành công sẽ như hình bên dưới, bạn hãy lưu key lại nhé vì nó sẽ không hiện lên lần nữa đâu
![](https://images.viblo.asia/2c5ad003-2eff-4a7c-830d-04dff9f9cca3.png)

Như vậy là xong phần ĐĂNG KÝ rồi. Tiếp theo sẽ là phần sử dụng, tùy vào ngôn ngữ code mà bạn sẽ config khác nhau. Ở đây mình sẽ hướng dẫn config bằng Ruby on Rails nhé

## Config và sử dụng Sendgrid với Ruby On Rails
Trong trường hợp bạn dùng Sengrid API bạn sẽcần gem sendgrid-ruby, đây là một thư viện đã được làm sẵn giúp ta dễ dàng sử dụng hơn. Nhưng ở đây mình sẽ config cho SMTP luôn, không cần cài gem nhé

Trong file `config/environment.rb` bạn cần thêm đoạn config như sau để có thể gửi mail thông qua SMTP
```
ActionMailer::Base.smtp_settings = {
  :user_name => 'apikey', # Cứ để là "apikey" như vậy nhé, lúc trước mình cũng tưởng đây là chỗ để sendgrid key nên làm mãi nó k chạy @@
  :password => '<SENDGRID_API_KEY>', # Đây mới là Sendgrid api key
  :domain => 'yourdomain.com',
  :address => 'smtp.sendgrid.net',
  :port => 587,
  :authentication => :plain,
  :enable_starttls_auto => true
}
```

Tiếp theo bạn cần tạo một file với đường dẫn `app/mailers/user_notifier_mailer.rb`  và thêm đoạn code như bên dưới
```
class UserNotifierMailer < ApplicationMailer
  default :from => 'taipa@gmail.com'

  def send_email(user)
    @user = user
    mail( :to => @user.email,
    :subject => "Sendgrid - Những ưu điểm và hướng dẫn sử dụng" )
  end
end
```

Cuối cùng là tạo cho nó một cái template mail. Ở thư mục views, bạn tạo file như sau, để ý folder và tên file trùng với tên class và action mail của bạn nhé, `app/views/user_notifier_mailer/send_email.html.erb`
```
Hello, this is simple Sendgrid tutorial
```
Như vậy là xong, bạn có thể mở Rails console lên và test thử UserNotifierMailer bên trên nhé :D

### Tham khảo thêm
https://docs.sendgrid.com/for-developers/sending-email/smtp-errors-and-troubleshooting 
https://github.com/sendgrid/sendgrid-ruby
https://docs.sendgrid.com/for-developers/sending-email/getting-started-smtp