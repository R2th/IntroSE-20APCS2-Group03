## Tản mạn
MÌnh khá là bị thu hút bời các file Log =)) 

Logger là rất quan trọng trong quá trình development và operation một ứng dụng.  

Như tiêu đề bài viết, hôm nay mình sẽ thử stream log tới browser. 

Để dễ tưởng tượng những gì chúng ta sắp làm. Bạn có thể mở file log develoment rails bằng lệnh 
```
tail -f log/development.log
```
Những thay đổi trong file log sẽ được hiển thị realtime ở đây. 

Kết quả mong muốn cuối cùng của mình sẽ là tương tự chức năng stream log của datadog. Nhưng phần tách các loại log khó quá nên  để sau vầy :3 

![tail](https://datadog-docs.imgix.net/images/logs/explorer/live_tail/livetail.a8712e6905375aa7dbb9f0e0ebf759d2.gif)

## Thực hiện

### Khởi tạo rails app

```rails new file-streaming-app```

### Tạo LiveFileStreamsController

```
touch live_file_streams_controller.rb
```
```
class LiveFileStreamsController < ApplicationController
end
```

### Thêm router
```
resources :live_streams, only: [] do
  collection do
   get :log_file
  end
end
```

### Phát trực tiếp với “response.stream”
Chúng ta sẽ sử dụng response.stream của `ActionController::Streaming`
```
class LiveStreamsController < ApplicationController
  def log_file
    5.times {
      response.stream.write "hello world\n"

      sleep 0.2
    }

    response.stream.close
  end
end
```

[Bạn có thể xem thêm về ActionController::Streaming tại dây ](https://api.rubyonrails.org/classes/ActionController/Streaming.html)

### Xem response ở trình duyệt

```
rails s
```

Vào:  `localhost:3000/live_streams/log_file`

Chúng ta sẽ thấy “hello world” được in 5 lần trong trình duyệt
Response được in ra màn hình  cùng một lúc, ngay cả khi đã đặt sleep ở giữa các lần stream.write

![](https://res.cloudinary.com/practicaldev/image/fetch/s--U-i1FRR8--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fhwazgg9j30z3y9vwv6e.png)

Mình sẽ cần xử lí để các nội dung này in ra 1 cách lần lượt

### Include ActionController::Live
```
class LiveStreamsController < ApplicationController
  include ActionController::Live

  def log_file
    response.headers['Content-Type'] = 'text/event-stream'
    response.headers['Last-Modified'] = Time.now.httpdate
  
    5.times {
      response.stream.write "hello world\n"

      sleep 0.2
    }

    response.stream.close
  end
end
```
Bây h chúng ta sẽ thấy nội dung được in lần lượt ra màn hình 
![](https://res.cloudinary.com/practicaldev/image/fetch/s--RTiFQaDa--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hq0kcg3bxpha0snfdawt.gif)

Như vậy ta stream được các nội dung thực hiện trong logic. Vậy bây giờ sẽ là tìm cách để stream các thay đổi trong file log

### Server-side events

Nếu chưa bao giờ nghe nói về Server-side events (SSE), có thể đọc thêm về nó ở đây 
https://www.html5rocks.com/en/tutorials/eventsource/basics/

Về cơ bản, trình duyệt giữ kết nối mở cho máy chủ và kích hoạt một sự kiện trong JavaScript mỗi khi máy chủ gửi dữ liệu.

### Tạo “file_streaming_app / sse.rb”

```
touch lib/file_streaming_app/sse.rb
```
```
require 'json'

module FileStreamingApp
  class SSE
    def initialize(io)
      @io = io
    end

    def write(object)
      @io.write "#{JSON.dump(object)}"
    end

    def close
      @io.close
    end
  end
end
```

### Sử dụng  “SSE” bên trong controller
```
require 'file_streaming_app/sse'

class LiveStreamsController < ApplicationController
  def log_file
    response.headers['Content-Type'] = 'text/event-stream'
    response.headers['Last-Modified'] = Time.now.httpdate

    sse = FileStreamingApp::SSE.new(response.stream)

    5.times {
      sse.write('hello world')

      sleep 0.5
    }
  ensure
    sse.close
  end
end
```

###  Sử dụng “filewatcher” để xem các thay đổi trong file
Để biết khi nào file được thay đổi, có 1 Gem có sẵn khá là tiện dụng đó là filewatcher 

```
gem 'filewatcher', '~> 1.1.1'
```
Install gem bằng 
```
bundle install
```

### Đọc file log
```
touch lib/file_streaming_app/log_file.rb
```

```
module FileStreamingApp
  class LogFile
    def added_lines(file_path)
      file_content = File.open(file_path).readlines

      file_content.last(20)
    end
  end
end
```

### Stream file log khi nó được sửa đổi
Update lại code Controller 

```
def log_file
    response.headers['Content-Type'] = 'text/event-stream'
    response.headers['Last-Modified'] = Time.now.httpdate

    sse = FileStreamingApp::SSE.new(response.stream)

    log_file_path = Rails.root.join('log/development.log').to_s

    file = FileStreamingApp::LogFile.new

    # watch development.log file for changes
    Filewatcher.new([log_file_path]).watch do |_file_path, event_type|
      next unless event_type.to_s.eql?('updated')

      file_lines = file.added_lines(log_file_path)

      sse.write(file_lines)
    end
  ensure
    sse.close
  end
```
  
### Sửa lại  "SSE"
```
def write(file_lines)
  file_lines.each do |line|
    @io.write line
  end
end
```

### Check thành quả thôi 
![](https://res.cloudinary.com/practicaldev/image/fetch/s--GkHe1k7F--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2m3b15t9xg84w6q3b0ex.gif)


### Xử lí đa luồng

Mặc định, ở môi trường develop rails, các request được xử lí trong 1 luồng.  Nên các request sẽ phải chờ request trước đó được thực thi xong. 

Để giải quyết vấn đề đó, đi ăn trộm từ Stack Overflow .

```
vim config/environments/development.rb
```
```
Rails.application.configure do
  # other configurations

  config.middleware.delete Rack::Lock
end
```

### Chỉ Stream các dòng đã thay đổi trong file log

Chúng ta sẽ cần nhớ vị trí của dòng cuối cùng trong file log trước khi thay đổi và chỉ hiển thị các dòng sau vị trí đó.

Sửa lại code 1 chút
```
class LogFile
  def added_lines(file_path)
    file_content = File.open(file_path).readlines
    total_lines = file_content.length

    @last_known_line_position ||= initial_line_position(total_lines)

    start_position = @last_known_line_position

    @last_known_line_position = total_lines

    file_content[start_position, total_lines]
  end

  private

  def initial_line_position(total_lines)
    return 0 if total_lines.zero? || total_lines <= 20

    # print last 20 lines from the file if event is emitted for the first time
    total_lines - 20
  end
end
```
Everithing is OK :V 
![](https://res.cloudinary.com/practicaldev/image/fetch/s--GkHe1k7F--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2m3b15t9xg84w6q3b0ex.gif)