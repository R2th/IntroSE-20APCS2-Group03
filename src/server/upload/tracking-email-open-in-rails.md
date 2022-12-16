Trong bài viết này sẽ thực hiện theo dõi việc mở mail đã gửi thường để phục vụ cho marketing hay tùy theo yêu cầu của dự án. 

### Coding
Bắt đầu bằng tạo model `EmailOpen`:

```
rails g model EmailOpen email:string ip:string
```

Định nghĩa tracking endpoint trong `routes.rb`:
``` ruby
get "/beacon", to: "tracking#beacon"
```

> Mẹo nhỏ ở đây để hook về server minh là chèn 1 ảnh transparent 1x1px vào trong mail, tải về với [link](http://www.1x1px.me/) hoặc có thể tự tạo bằng các cộng cụ khác cũng được.

Với nội dung mail sẽ định nghĩa như sau:

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
  </head>
  <body>
    Tiktok!!
    <img src="<%= email_tracker_url(@email) %>" >
  </body>
</html>
```

Định nghĩa helper cho url để mã hóa với `Base64`:

``` ruby
module TrackingHelper
  def email_tracker_url email
    "http://localhost:3000/beacon?data=#{Base64.encode64(email)}"
  end
end
```

khi người dùng mở mail sẽ hook về tracking endpoint:

``` ruby 
class TrackingController < ApplicationController
  def beacon
    email = Base64.decode64 params[:data]

    EmailOpen.find_or_create_by(email: email) do |e|
      e.ip = request.ip
    end

    send_file "public/beacon.png", type: "image/png"
  end
end
```

Ở đây sử dụng `find_or_create_by` để tránh việc tạo ra nhiều bản ghi cùng 1 người dùng, một nữa khi người dùng trả lời mail cũng mở bằng mail cũ đã lưu.

Để test chức năng này có thể chạy trong console hoặc gửi qua form với email muốn gửi.
Các bạn có clone [source code](https://github.com/limkimhuor/tracking_mail_app/tree/develop)  của minh để tham khảo thêm.

### Kết quả
- Đây là form để test

![tracking email open app](https://images.viblo.asia/5c0eb509-b8cf-4b4b-8e60-4a212cf95c06.png)

- Mở mail đã gửi(minh dùng [letter-opener-web](https://github.com/fgrehm/letter_opener_web))

![tracking email open app open mail](https://images.viblo.asia/5e1dcf59-16fb-406c-a2a8-583ca08793a4.png)

- Đây là log của server

![tracking email open app log](https://images.viblo.asia/8e8dc8e8-f843-43bb-ac03-63f7e8efd3ee.png)
- Kiểm tra đã tạo thành công

![tracking email open app console](https://images.viblo.asia/d3dc9286-a00d-4042-af7e-9820ece5d0ff.png)

### Kết luận 
Cảm ơn các bạn đã đọc bài viết :)

### Tham khảo
- [Tracking Email Open in Rails - Bala Paranj](https://rubyplus.com/articles/5731-Tracking-Email-Open-in-Rails)
- [How to Track Email Opens in Rails](https://loop.yesinsights.com/ruby/rails/2016/07/14/how-to-track-email-opens-in-rails.html)
- [X Headers](https://blog.returnpath.com/x-headers-what-they-are-and-13-ideas-on-using-them-to-measure-email-marketing-performance/)