Nếu bạn là một Rails Developer thì chắc hẳn bạn đã sử dụng Rails Logger ít nhất một lần. Nếu bạn bạn vẫn chưa biết mình dùng Rails Logger ở đâu? Đơn giản khi bạn sử dụng `rails server` bạn quan sát trên terminal sẽ chạy các dòng như khi render một view, chuyển hướng các route hay các câu truy vấn SQL... Rails Logger đã cũng cung cấp các cách để giúp chúng ta debuging ứng dụng ở các môi trường local, production. 

Ví dụ bạn đã code xong 1 dự án to đùng, test các kiểu con đà điểu chạy ngon lành, nhưng một hôm nọ ứng dụng bị treo... thì lúc đó bạn sẽ làm gì? Tất nhiên là vào file log vào xem thử có biến gì. Rails Logger cung cấp cho chúng ta rất nhiều tính năng hay bạn có thực sự tận dụng hết chúng chưa? Nào chúng ta cùng bắt đầu tạo file log trực quan riêng mình nào...

## Rails Logger là gì?
Rails Logger là một phần của thư viện **ActiveSupport** . **ActiveSupport** là một tập hợp các *utility classes* và các *standard library extensions*  hỗ trợ rất nhiều thứ cho Rails. Rails Logger cung cấp cho chúng ta cơ chế ghi log các sự kiện xảy ra trong suốt khoảng thời gian ứng dụng chạy và được lưu trữ lại giúp chúng ta phân tích và gỡ rối các bug =)).

Rails đã cấu hình để tạo ra 3 file dành cho 3 môi trường là: development, test, production. Mặc định chúng được trong thư mục **log/** trong project của bạn. Nếu bạn mở thư mục **log/** bạn sẽ thấy các file development.log, test.log, production.log  tùy thuộc vào config của bạn. Tất cả những gì bạn thấy trong terminal khi sử dụng `rails server` sẽ được lưu trong development.log.

Để sử dụng Rails Logger rất đơn giản bạn có thể thêm đoạn code theo mẫu như sau vào Controllers, Models, hoặc Mailer
```ruby
logger.debug “User created: #{@user.inspect}”
```
Ở đây chúng ta chúng ta sử dụng debug method logger nó là một  globally accessible **logger** để ghi message vào file log, ở môi trường nó sẽ hiện lên terminal cho chúng ta xem.
Đây là ví dụ
![](https://images.viblo.asia/f0acd106-c2a9-4153-aafe-020d7a368594.png)
## Log levels
Chúng ta có thể sử dụng một trong 6 level: `:debug`, `:info`, `:warn`, `:error`, `:fatal`, và `:unknown` ứng với cấp độ từ 0 -> 5. Điều này giúp chúng ta nhóm các log lại với nhau để phân loai chúng có quan trọng hay không.

| No | Log level | Được sử dụng cho |
| -------- | -------- | -------- |
| 0     | debug   | Là mức thấp nhất dùng để cho developer hay administrator xem các câu gọi database hay xem các biến |
| 1     | info       | Hiển thị thông tin của hệ thống như start hay stop một service...    |
| 2     | warn     | Hiển thị một số cảnh báo cần được chú ý |
| 3     | error     | Đã xảy ra lỗi nhưng hệ thống đã tự phục hồi |
| 4     | fatal       | Đã xảy ra lỗi nhưng hệ thống không thể tự phục hồi |
| 5     | unknow | Một số thông báo linh tinh khác |

## Customizing your logs

Rails đã config giúp chúng ta để sử dụng, nhưng nếu bạn muốn custom lại chúng lại theo ý mình về log level hay thay đổi format lại để dễ dàng quan sát và theo dõi hơn. 

Chúng ta có thể tùy chính cài đặt trong file application.rb hoặc tùy chỉnh theo mỗi môi trường cho các file **config/development.rb**, **config/test.rb** và **config/production.rb**.
 ### Thay đổi log level
 Giả sử bạn chỉ muốn hiển thị các câu truy vấn database (mức `debug` cho môi trường development còn production chi ghi log khi có lỗi xảy ra (mức `error`) đơn giản bạn chỉ cần thêm dòng này vào **config/environments/production.rb**
 ```
 # config/environments/production.rb
config.log_level = :error
 ```
 Ngoài ra bạn cũng có thể thay đổi linh hoạt log level bằng cách set tạm thời như sau: 
 ```
 # From anywhere, you can specify a value from 0 to 5
Rails.logger.level = 3
 ```
 Điều này cực kì giúp ích cho chúng ta ghi lại log một tác vụ nào đó một các linh động và set lại như ban đầu
 ### Thay đổi đường dẫn ghi log
 Để thay đổi đường mặc định đường dẫn mặc định là  **/log** chúng ta định nghĩa lại path bằng cách
 ```
 # config/environments/development.rb
config.logger = Logger.new(“/path/to/file.log”)
 ```
 ### Thay đổi log format
 Để thay đổi định dạng log chúng ta tạo một class Custome và kế thừa class SimpleFormatter và overide lại method `call`
 ```
 class CustomFormatter < ActiveSupport::Logger::SimpleFormatter                  
  def call(severity, time, progname, msg)                                       
    "[Level] #{severity} \n" +                                                  
    "[Time] #{time} \n" +                                                       
    "[Message] #{msg} \n\n\n"                                                   
  end                                                                           
end
 ```
 Và đặt nó trong thư mục **\lib** và sử dụng chúng như sau:
 ```
 # config/environments/development.rb
config.log_formatter = CustomFormatter.new
```
Kết quả chúng ta sẽ được như sau
![](https://images.viblo.asia/922619e2-17b2-4bfc-aefc-c1d97b2e543c.png)
Chỉ một chút thay đổi mà làm cho chúng dễ đọc hơn rất nhiều :D. Hoặc bạn cũng thể định dạng format dạng JSON có thể đọc và sử dụng chúng để hiển thị trên ứng dụng :P
### Tagged Logging 
Đây cũng là một tính năng rất hay, giả sử trang web bạn chạy dưới nhiều subdomain hay multi account. Tagged loging sẽ giúp chúng ta thêm các tag trước để lọc chúng ra theo các rule về subdomain hay REQUEST_ID. Để bật tính năng này, bạn cần khởi tạo instance TaggedLogging và gán chúng cho config.logger ở file config
```
# config/environments/development.rb
config.logger = ActiveSupport::TaggedLogging.new(Logger.new(STDOUT))
```
Và chúng ta sử dụng nó với method tagged như sau
```
# This will log: [my-subdomain] User created: ...
logger.tagged(“my-subdomain”) { logger.debug “User created: #{@user.inspect} }”
```

## Tham khảo
https://guides.rubyonrails.org/debugging_rails_applications.html
https://scoutapm.com/blog/debugging-with-rails-logger