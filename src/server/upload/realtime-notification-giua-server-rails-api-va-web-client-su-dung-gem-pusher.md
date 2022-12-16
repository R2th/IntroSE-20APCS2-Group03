## Đặt Vấn Đề
Trong quá trình tìm hiểu để làm `realtime notification` giữa `rails api(server)` và `angular(webclient) `thì mình đã sử dụng một số cách như `action cable` kết hợp với `ng2cable` hay sử dụng `firebase` qua `gem fcm` và cả hai đều chạy rất tốt nhưng khi deploy lên  heroku thì do không có account được verify master card nên không thể thêm addons redis nên đành ngậm ngùi không sử dụng được 2 thằng này. Sau khi tìm hiểu thêm 1 số cách khác thì mình thấy `pusher` khá dễ sử dụng và hoàn toàn free để có thể sử dụng khi deploy lên heroku.
Trong bài viết này mình sẽ hướng dẫn các bạn `realtime notification` giữa `rails api` và `webclient`.
## Nội Dung
### Giới thiệu pusher
`Pusher` là một dịch vụ cloud cung cấp các giải pháp giao tiếp thời gian thực giữa `servers`, `apps` và `devices`. Dữ liệu được gửi tới `pusher`, và `pusher` lại gửi nó đi tới các client đã `subscribe` (đăng ký) và các `channel`.

![](https://images.viblo.asia/1747d3a7-c259-4e5f-bd96-65600e0e440c.png)

`Pusher` hỗ trợ rất nhiều ngôn ngữ lập trình khác nhau, trong đó có `Ruby`. Tham khảo gem của nó tại đây: https://github.com/pusher/pusher-http-ruby.
### Cài đặt
* Thêm `pusher` vào `Gemfile` và `bundle`
* Đăng kí tài khoản và tạo 1 app tại [https://dashboard.pusher.com/](https://dashboard.pusher.com/)
Sau khi tạo tài khoản xong, nó sẽ redirect về trang dashboard. Nó sẽ gợi ý bạn tạo `Channel App`. Nếu không bạn có thể tạo bằng cách nhấn phím `Create Channel App` ở tab `Channel App`. Mặc định gói free được cung cấp `100 kết nối` và `200k lượt push` mỗi ngày. Nếu có nhu cầu sử dụng cao hơn thì phải trả phí.
Sau khi tạo `App`, lấy các `key` truy cập ở tab `App Keys.`
* Tạo file `config/initializers/pusher.rb`
config các `key` của `app` vừa tạo để có thể push notification lên app.
```
    require 'pusher'

    Pusher.app_id = 'app-id'
    Pusher.key = 'app-key'
    Pusher.secret = 'app-secret'
    Pusher.cluster = 'your-app-cluster'
    Pusher.logger = Rails.logger
    Pusher.encrypted = true
```
    
* Tạo 1 model `Notification`
Để gửi notification chúng ta sẽ sử dụng `callback` `after_create`. `Notification` sẽ được gửi sau khi `create` thành công.
    
```
    #notification.rb
    after_create :send_notification
    def send_notification
        Pusher.trigger "notification_channel", "new", self.as_json
    end
```

ở đây chúng ta `trigger` nó với 1 `event` là `new` và qua `channel` là `notification_channel`.
* Cài đặt để nhận thông báo ở client
tạo file `index.html` để test.
config đoạn js với các thông số `key` của `app` và `channel` cùng với `event` đã được `trigger`.
    
```
<!DOCTYPE html>
<head>
  <title>Pusher Test</title>
  <script src="https://js.pusher.com/4.3/pusher.min.js"></script>
  <script>

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('app-id', {
      cluster: 'app-cluste',
      forceTLS: true
    });
    // config event and channel tương ứng với event và channel đã trigger
    var channel = pusher.subscribe('notification_channel');
    channel.bind('new', function(data) {
      alert(JSON.stringify(data));
    });
  </script>
</head>
<body>
  <h1>Pusher Test</h1>
  <p>
    Try publishing an event to channel <code>my-channel</code>
    with event name <code>my-event</code>.
  </p>
</body>

```
* Tạo notification và xem kết quả
```
Notification.create content: "test"
```
qua tab client và xem kết quả:
   

![](https://images.viblo.asia/20d1e9ab-b19d-460c-9746-0509b30479ed.png)
## Kết Luận
Hy vọng sau bài này các bạn đã có thêm cho mình một cách để realtime notification..