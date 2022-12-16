Chào,
Đến tháng lại lên, hôm nay mình xin giới thiệu với các bạn một giải pháp rất hay bổ trợ một chức năng hầu như xuất hiện trong những dự án lập trình, đó là gửi mail
Trong việc phát triển dự án, chắc hẳn chúng ta rất hay gặp phải chức năng gửi mail cho người dùng với những yêu cầu cụ thể như: Setting password, notification...
Và nếu ta chỉ add các gem hổ trợ và thực hiện test chức năng thì lại khá mất thời gian, vì mình nghĩ chỉ có 2 cách để test mail là
1. Lòi mắt ra nhìn vào Log
2. Truy cập thẳng vô mail nhận để xem
Điều này khiến chúng ta mất khá nhiều thời gian, và nó cũng bất tiện khi ta phải tét nhiều lần chức năng này :D
Với nỗi khổ đó, hôm nay mình xin giới thiệu tới các bạn một giải pháp-một gem có thể giúp việc test mail được thực hiện ngay trên trình duyệt, mà không cần phải gửi mail đến some one like you :D

Bắt đầu luôn nhé =))))

# Config

Vẫn là add gem vào Gemfile :D

```gem "letter_opener",: group =>: development```

Vì đêy là gem test nên bạn chỉ cần add nó vào môi trường development thôi là đụ nhé


Sau đó, ta tiến hành thiết lập phương thức delivery trong development.rb

```ruby
config.action_mailer.delivery_method =: letter_opener 
config.action_mailer.perform_deliveries = true
``` 

Nhớ chạy bunlde nha :D

Giờ đây, mọi email mà bạn muốn gửi đi sẽ không phải gửi đi mà bạn vẫn nhìn thấy nó không phải ở chổ bạn muốn gửi đi mà là trên trình duyệt tại vì bạn đã gửi nó đi đâu :D :D

Thấy vui chưa =))


Các tin nhắn sẽ được lưu trữ trong thư mục `tmp/letter_opener' 

Thư mục này là do gem tạo ra nhá

# Cài đặt khi không sử dụng Rails

Đặc biệt, khi không sử dụng Rails, chúng ta có thể sử dụng gem Mail để thiết lập. Chỉ cần thiết lập các phương pháp phân phối khi cấu hình Mail cà chỉ định một vị trí.

```ruby
require "letter_opener"
Mail.defaults do
  delivery_method LetterOpener::DeliveryMethod, :location => File.expand_path('../tmp/letter_opener', __FILE__)
end
```

Phương pháp này tương tự nếu bạn sử dụng Pony gem

```ruby
require "letter_opener"
Pony.options = {
  :via => LetterOpener::DeliveryMethod,
  :via_options => {:location => File.expand_path('../tmp/letter_opener', __FILE__)}
}
```

Hoặc nếu bạn đang không sử dụng Rails và có  ActionMailer trực tiếp, chúng ta chỉ cần thêm các phân phối:

```ruby
require "letter_opener"
ActionMailer::Base.add_delivery_method :letter_opener, LetterOpener::DeliveryMethod, :location => File.expand_path('../tmp/letter_opener', __FILE__)
ActionMailer::Base.delivery_method = :letter_opener
```

Letter Opener sử dụng phương pháp Lunnchy để mở mail được gửi trong trình duyệt. Điều này có nghĩa là nó giả định quá trình code Ruby được chạy trên các máy phát triển địa phương. Nếu đang sử dụng một dàn máy chủ riêng biệt máy ảo này sẽ không làm việc. Giải pháp được đề cập trong trường hợp này là xem xét sử dụng Mailtrap hoặc MailCatcher.

Link gem doc: [Letter Opener](https://github.com/ryanb/letter_opener)


Ps. Vì mình thầy đây là một thủ thuật đơn giản trong phát triển test các ứng dụng Rails và nó làm giảm đi thời gian test mail rất nhiều nên muốn giới thiệt tới các bạn. Tài liệu gốc nó cũng hơi ít nên mình chỉ dịch được thể thôi, các bạn cứ thong thả thực hành nhá :D :D