## Dạo đầu
Ngày ni tui học về cách nhận data từ server mà không cần reload web page

Một vài cách mà tui nghe giang hồ đồn:
* HTTP long-polling: Client gửi 1 request đến server và chờ sau một khoảng nhất định hoặc đến khi nhận được phản hồi và đóng lại. 
* Webhooks: Khi nào server cập nhật thì nó sẽ request đến client, nhưng yêu cầu client phải chạy http server
* Server-Sent Events: Sau request đầu tiền từ client đến server thì kết nối 1 chiều được duy trì, khi nào server có gì mới sẽ đẩy về cho client (Xem thêm [ở đây](https://www.html5rocks.com/en/tutorials/eventsource/basics/))
* WebSockets: Cũng tương tự như Server-Sent Events nhưng duy trì kết nối 2 chiều qua lại client <=> server

Tùy yêu cầu từng ứng dụng để chọn phương pháp hợp lí. Ví dụ làm web cập nhật thời tiết theo thời gian thực thì client chỉ cần nhận dữ liệu từ server trong trường hợp ni tui dùng SSE, còn web chat gì đó vừa gửi request, vừa nhận data thì tui dùng WebSockets

## Vô bài!!!

### Server
Controller
```ruby
class CommentsController < ApplicationController
  include ActionController::Live

  def progress
    sse = SSE.new(response.stream)
    response.headers['Content-Type'] = 'text/event-stream'
    5.times do |i|
      sse.write({count: i}.to_json)
    end
  rescue IOError
    # code
  ensure
    sse.close
  end
end
```

Và Route
```ruby
get 'comments/progress', to: 'comments#progress'
```

### Client
Tui dùng javascript để xử lí data server gửi về
```javascript
var div = document.getElementById('divID');
var sse = new EventSource('/comments/progress');
sse.addEventListener('message', function (e) {
  div.innerHTML += e.data;
});
```

### Thành quả

![](https://images.viblo.asia/a965a1a4-5b9a-48c6-a7cf-e9ff869a7812.png)

Để rõ hơn, bật devtool lên, xong vô network tab > EventStream tui chộ có 1 kết nối tên là process hiển thị những data server gửi về
![](https://images.viblo.asia/7355531c-6d4a-48fb-813f-80952ad4a1ca.png)

### Dùng redis để cool ngầu hơn
Trong Create action tui lưu những comment vào channel có tên là comment:progress.
Sau đó ở process action, bằng cách subcribe channel comment:progress để lấy ra khi có thằng comment vừa được lưu vào
```ruby
class CommentsController < ApplicationController
  include ActionController::Live

  def progress
    redis = Redis.new
    sse   = SSE.new(response.stream)
    response.headers['Content-Type'] = 'text/event-stream'
    redis.subscribe('comment:progress') do |on|
      on.message { |e, data| sse.write(data) }
    end
  rescue IOError
      # code
  ensure
    redis.quit
    sse.close
  end
  
  def create
    redis = Redis.new
    redis.publish('comment:progress', {count: i}.to_json)
  end
end
```

### Như rứa là tui đã setup xong SSE cơ bản rồi