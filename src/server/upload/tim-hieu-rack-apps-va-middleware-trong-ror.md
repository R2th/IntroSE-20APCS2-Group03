Nhiều nhà phát triển web làm việc ở mức độ trừu tượng cao nhất khi chúng tôi lập trình. Và đôi khi thật dễ dàng coi mọi thứ là điều hiển nhiên. Đặc biệt là khi chúng tôi đang sử dụng Rails.

Bạn đã bao giờ tìm hiểu sâu về cách thức hoạt động của chu trình yêu cầu / phản hồi trong Rails chưa? Gần đây tôi nhận ra rằng tôi hầu như không biết gì về cách thức hoạt động của ứng dụng Rack hoặc middleware — vì vậy tôi đã dành một ít thời gian để tìm hiểu. Dưới đây là những phát hiện của tôi.

### Rack là gì?

Bạn có biết rằng Rails là một ứng dụng Rack? Sinatra cũng vậy. Rack là gì? Tôi rất vui vì bạn đã hỏi. Rack là một gói Ruby cung cấp giao diện dễ sử dụng giữa máy chủ web và framework web.

Có thể nhanh chóng tạo các ứng dụng web đơn giản chỉ bằng Rack.

Để bắt đầu, bạn cần một đối tượng response khi có một lời gọi, sử dụng Environment Hash và trả về một mảng có mã `HTTP response code`, `header` và `response body` . Khi bạn đã viết mã máy chủ, tất cả những gì bạn phải làm là khởi động nó bằng máy chủ Ruby chẳng hạn như `Rack::Handler::WEBrick` hoặc đặt nó vào tệp `config.ru` và chạy nó từ dòng lệnh với `rackup config.ru`.

Ok, tuyệt. Nhưng Rack thực sự làm gì?

### Rack hoạt động như thế nào?

Rack chỉ là một cách để nhà phát triển tạo ứng dụng máy chủ trong khi tránh tạo nhiều code để hỗ trợ các máy chủ web Ruby khác nhau. Nếu bạn đã viết một số mã đáp ứng các thông số kỹ thuật của Rack, bạn có thể tải nó lên máy chủ Ruby như WEBrick, Mongrel hoặc Thin — và giờ bạn đã có thể sẵn sàng tiếp nhận các request và đưa ra response cho chúng.

Có một số phương pháp được cung cấp sẵn. Bạn có thể gọi chúng trực tiếp từ trong file `config.ru` của mình.

#### run 

Lấy một ứng dụng — đối tượng phản hồi lời gọi — làm tham số. Đoạn mã sau đây được lấy từ trang web Rack hỗ trợ cách thức này:

```
run Proc.new { |env| ['200', {'Content-Type' => 'text/html'}, ['get rack\'d']] }
```

#### map

Lấy một chuỗi chỉ định đường dẫn cần xử lý và một khối chứa mã ứng dụng Rack sẽ được chạy khi nhận được yêu cầu với đường dẫn đó.

Đây là một ví dụ:

```
map '/posts' do
  run Proc.new { |env| ['200', {'Content-Type' => 'text/html'}, ['first_post', 'second_post', 'third_post']] }
end
```

#### use 

Hàm này cho biết Rack sử dụng một số middleware nào đó.

Vì vậy, những điều mà bạn cần biết là hãy xem xét kỹ hơn hàm băm môi trường và mảng response

#### Environment Hash

Các đối tượng máy chủ Rack nhận trong một môi trường băm. Dưới đây là một số phần trong môi trường băm:

- `REQUEST_METHOD`: Phương thức HTTP của request. Điều này là bắt buộc.

- `PATH_INFO`: Đường dẫn URL yêu cầu, liên quan đến thư mục gốc của ứng dụng.

- `QUERY_STRING`: Bất cứ giá trị được theo sau dấu `?` trong URL.

- `SERVER_NAME` và `SERVER_PORT`: Địa chỉ và cổng của máy chủ.

- `rack.version`: Phiên bản rack đang được sử dụng.

- `rack.url_scheme`: Đó là http hay https?

- `rack.input`: Một đối tượng giống IO chứa dữ liệu HTTP POST thô.

- `rack.errors`: Một đối tượng trả về `puts`, `write`, và `flush`.

- `rack.session`: Kho key value để lưu trữ dữ liệu session của request.

- `rack.logger`: Một đối tượng có thể ghi các interfaces. Nó phải triển khai các phương thức info, debug, warn, error, và fatal.

Rất nhiều frameworks được xây dựng trên Rack gói env hash trong một đối tượng `Rack::Request`. Đối tượng này cung cấp rất nhiều phương thức tiện lợi. Ví dụ: request_method, query_string, session và logger trả về các giá trị từ các key được mô tả ở trên. Nó cũng cho phép bạn kiểm tra những thứ như params, HTTP scheme hoặc nếu bạn đang sử dụng ssl.

#### Response 

Khi đối tượng máy chủ Rack của bạn trả về một response, nó phải chứa ba phần:

* Status
* Header 
* Body 

Giống như request, có một đối tượng Rack::Response cung cấp cho bạn các phương thức tiện lợi như write, set_cookie và finish. Ngoài ra, bạn có thể trả về một mảng chứa ba thành phần.

#### Status 

Là [HTTP Status](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) giống như 200 hay 400 

#### Header 

Đây là nơi bạn có thể đặt `Content-Type` và `Content-Length` nếu phù hợp với response của bạn.

#### Body 

Body là dữ liệu mà máy chủ gửi lại cho người yêu cầu. Nó phải đáp ứng với từng yêu cầu của request.

### Middleware là gì?

Một trong những điều khiến Rack trở nên tuyệt vời là cách dễ dàng thêm các thành phần middleware giữa máy chủ web và ứng dụng để tùy chỉnh cách hoạt động request / response của bạn.

Nhưng thành phần middleware là gì?

Một thành phần middleware nằm giữa máy khách và máy chủ, xử lý cả response gửi đến và gửi đi. Tại sao bạn muốn làm điều đó? Có rất nhiều thành phần middleware có sẵn cho Rack để loại bỏ phỏng đoán khỏi các vấn đề như sử dụng cache, xác thực và bẫy spam.

### Sử dụng Middleware trong ứng dụng Rack

Để thêm Middleware vào ứng dụng Rack, tất cả những gì bạn phải làm là yêu cầu Rack sử dụng nó. Bạn có thể sử dụng nhiều thành phần Middleware và chúng sẽ thay đổi request hoặc response trước khi chuyển nó cho thành phần tiếp theo. Chuỗi thành phần này được gọi là `middleware stack`.

#### Warden

Chúng ta sẽ xem xét cách bạn thêm Warden vào một dự án. Warden phải đến sau một số loại Middleware stack trong ngăn xếp, vì vậy chúng tôi cũng sẽ sử dụng `Rack::Session::Cookie`.

Đầu tiên, thêm nó vào dự án Gemfile của bạn với gem "warden" và cài đặt nó với cài đặt gói.

Bây giờ hãy thêm nó vào tệp config.ru của bạn:

```
require "warden"

use Rack::Session::Cookie, secret: "MY_SECRET"

failure_app = Proc.new { |env| ['401', {'Content-Type' => 'text/html'}, ["UNAUTHORIZED"]] }

use Warden::Manager do |manager|
  manager.default_strategies :password, :basic
  manager.failure_app = failure_app
end

run Proc.new { |env| ['200', {'Content-Type' => 'text/html'}, ['get rack\'d']] }
```

Cuối cùng, run app với rackup. Nó sẽ tìm config.ru và khởi động trên cổng 9292.

Lưu ý rằng có nhiều thiết lập liên quan đến việc để Warden thực sự thực hiện xác thực với ứng dụng của bạn. Đây chỉ là một ví dụ về cách tải nó vào middleware stack. Để xem một ví dụ mạnh mẽ hơn về việc tích hợp Warden, hãy xem ý chính này.

Có một cách khác để xác định middleware stack. Thay vì gọi sử dụng trực tiếp trong config.ru, bạn có thể sử dụng `Rack::Builder` để bọc một số middleware và (các) ứng dụng trong một ứng dụng lớn.

Ví dụ:

```
failure_app = Proc.new { |env| ['401', {'Content-Type' => 'text/html'}, ["UNAUTHORIZED"]] }

app = Rack::Builder.new do
  use Rack::Session::Cookie, secret: "MY_SECRET"

  use Warden::Manager do |manager|
    manager.default_strategies :password, :basic
    manager.failure_app = failure_app
  end
end

run app
```

#### Rack Basic Auth

Một Middleware hữu ích là `Rack::Auth::Basic`, có thể được sử dụng để bảo vệ bất kỳ ứng dụng Rack nào với xác thực cơ bản HTTP. Nó thực sự nhẹ và hữu ích để bảo vệ các bit nhỏ của ứng dụng. Ví dụ: Ryan Bates sử dụng nó để bảo vệ máy chủ Resque trong ứng dụng Rails trong [bài viết Railscasts](http://railscasts.com/episodes/271-resque?view=asciicast) này.

Dưới đây là cách cài đặt:

```
use Rack::Auth::Basic, "Restricted Area" do |username, password|
  [username, password] == ['admin', 'abc123']
end
```

### Sử dụng Middleware trong Rails

Vậy thì sao? Rack là khá tuyệt. Và chúng tôi biết rằng Rails được xây dựng dựa trên nó. Nhưng chỉ vì chúng tôi hiểu nó là gì, nên nó không thực sự hữu ích khi làm việc với một production app.

#### Cách Rails sử dụng Rack

Bạn đã bao giờ nhận thấy rằng có một file `config.ru` trong thư mục gốc của mọi dự án Rails được tạo chưa? Bạn đã bao giờ nhìn vào bên trong chưa? Đây là nội dung của file đấy:

```
# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment', __FILE__)
run Rails.application
```

Điều này khá đơn giản. Nó tìm file `config/environment`, sau đó khởi động `Rails.application`.

Chờ đã, đó là gì? Xem xét config/environment, chúng ta có thể thấy rằng nó được định nghĩa trong config/application.rb. config/environment chỉ là gọi khởi tạo! trên đó.

Vậy có gì trong config / application.rb? Nếu chúng ta để ý, chúng ta sẽ thấy rằng nó tải trong các gem đi kèm từ `config/boot.rb`, yêu cầu `rails/all`, tải lên môi trường (development, test, production, v.v.) và xác định phiên bản namespace của ứng dụng của chúng ta .

Nó trông giống như sau:

```
module MyApplication
  class Application < Rails::Application
    ...
  end
end
```

Điều này có nghĩa là `Rails::Application` là một ứng dụng Rack. Chắc chắn, nếu chúng ta kiểm tra source code, nó sẽ phản hồi một lời gọi 

Nhưng nó đang sử dụng middleware nào? Nếu quan sát kỹ, chúng tôi thấy nó đang tự động tải rails/application/default_middleware_stack — và kiểm tra, có vẻ như nó đã được định nghĩa trong `ActionDispatch`.

ActionDispatch đến từ đâu? `ActionPack`.

#### Action Dispatch

[ActionPack](https://github.com/rails/rails/tree/master/actionpack) là framework của Rails để xử lý các request và response trên web. ActionPack là nơi có khá nhiều tính năng tốt mà bạn tìm thấy trong Rails, chẳng hạn như routing, các abstract controllers mà bạn thừa hưởng từ đó và view rendering.

Phần liên quan nhất của ActionPack cho bài viết của chúng ta ở đây là Action Dispatch. Nó cung cấp một số thành phần middleware xử lý ssl, cookie, gỡ lỗi, file tĩnh và nhiều hơn nữa.

Nếu bạn xem xét từng thành phần của middleware ActionDispatch, bạn sẽ nhận thấy tất cả chúng đều tuân theo đặc điểm kỹ thuật của Rack: Tất cả chúng đều phản hồi cuộc gọi, sử dụng ứng dụng và trả về status, header và body. Nhiều người trong số họ cũng sử dụng các đối tượng Rack::Request và Rack::Response.

Đọc qua mã trong các thành phần này đã giúp bạn khám phá ra nhiều điều bí ẩn về những gì đang diễn ra đằng sau các request đối với ứng dụng Rails. Khi tôi nhận ra rằng đó chỉ là một loạt các đối tượng Ruby tuân theo đặc tả Rack — chuyển request và response cho nhau — điều đó đã làm cho toàn bộ phần này của Rails bớt bí ẩn hơn rất nhiều.

Bây giờ chúng ta đã hiểu một chút về những gì đang diễn ra, hãy cùng xem cách thực sự đưa một số middleware tùy chỉnh vào ứng dụng Rails.

#### Tự thêm Middleware 

Hãy tưởng tượng bạn đang lưu trữ một ứng dụng trên Engine Yard. Bạn có một API Rails đang chạy trên một máy chủ và một ứng dụng JavaScript phía máy khách đang chạy trên một máy chủ khác. API có url là https://api.example.com và ứng dụng phía máy khách có tại https://app.example.com.

Bạn sẽ nhanh chóng gặp phải một vấn đề: Bạn không thể truy cập tài nguyên tại api.example.com từ ứng dụng JavaScript của mình do chính sách nguồn gốc giống nhau. Như bạn có thể biết, giải pháp cho vấn đề này là cho phép chia sẻ tài nguyên nguồn gốc chéo (CORS). Có nhiều cách để kích hoạt CORS trên máy chủ của bạn — nhưng một trong những cách dễ nhất là sử dụng gem middleware Rack::Cors.

Bắt đầu bằng cách yêu cầu nó trong Gemfile:

```
gem "rack-cors", require: "rack/cors"
```

Cũng như nhiều thứ khác, Rails cung cấp một cách rất dễ dàng để tải middleware. Mặc dù chắc chắn chúng ta có thể thêm nó vào khối Rack::Builder trong config.ru — như chúng ta đã làm ở trên — quy ước của Rails là đặt nó trong config / application.rb, sử dụng cú pháp sau:

```
module MyApp
  class Application < Rails::Application
    config.middleware.insert_before 0, "Rack::Cors" do
      allow do
        origins '*'
        resource '*',
        :headers => :any,
        :expose => ['X-User-Authentication-Token', 'X-User-Id'],
        :methods => [:get, :post, :options, :patch, :delete]
      end
    end
  end
end
```

Lưu ý rằng chúng tôi đang sử dụng insert_before ở đây để đảm bảo rằng Rack :: Cors đến trước phần còn lại của middleware được ActionPack đưa vào ngăn xếp (và bất kỳ middleware nào khác mà bạn có thể đang sử dụng).

Nếu bạn khởi động lại máy chủ, bạn nên bắt đầu! Ứng dụng phía máy khách của bạn có thể truy cập api.example.com mà không gặp phải lỗi JavaScript chính sách nguồn gốc.

### Kết luận 

Trong bài đăng này, chúng ta sẽ xem xét sâu về cách hoạt động của Rack và vòng lặp request/response cho một số framework web Ruby, bao gồm cả Ruby on Rails.

Tôi hy vọng rằng việc hiểu kỹ hơn quá trình một yêu cầu truy cập vào máy chủ của bạn và ứng dụng của bạn gửi lại phản hồi sẽ giúp mọi thứ trở nên rõ ràng. Và khi gặp vấn đề gì đó magic, chúng ta có thể dễ dàng phán đoán ra thông qua cách hoạt động của Rack.