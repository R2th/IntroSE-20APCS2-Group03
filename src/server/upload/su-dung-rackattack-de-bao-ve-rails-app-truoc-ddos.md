# DDoS là gì?
DDos có tên đầy đủ là Distributed Denial Of Service – là một biến thể của loại tấn công DOS. Đây là một hình thức tấn công từ chối dịch vụ phân tán, nó làm cho người bị tấn công không thể sử dụng một dịch vụ nào đó, nó có thể khiến bạn không thể kết nối với một dịch vụ internet, hoặc nó có thể làm ngưng hoạt động của một chiếc máy tính, một mạng lan nội bộ hoặc thậm chí là cả một hệ thống mạng.

Tấn công DDoS mạnh hơn DOS rất nhiều, điểm mạnh của hình thức này đó là nó được phân tán từ nhiều dải IP khác nhau, chính vì thế người bị tấn công sẽ rất khó phát hiện để ngăn chặn được.

![](https://images.viblo.asia/86579fe8-c5b2-4898-b00e-3f114a197e5b.jpg)

Kẻ tấn công (Hacker) không chỉ sử dụng máy tính của họ để thực hiện một cuộc tấn công vào một trang web hay một hệ thống mạng nào đó, mà họ còn lợi dùng hàng triệu máy tính khác để thực hiện việc này. Bạn đang thắc mắc là tại sau họ lại có thể điều  được hàng triệu máy tính trên khắp thế giới ư ? có thể là máy tính của bạn cũng đang nằm trong số đó đấy.

**Một số kiểu tấn công DDos mà hacker vẫn hay sử dụng đó là:**
* Đánh vào băng thông (Bandwidth).
* Tấn công vào Giao thức.
* Tấn công bằng cách gói tin bất thường.
* Tấn công qua phần mềm trung gian.
* Các công cụ tấn công dùng Proxy ví dụ như: Trinoo, Flood Network (TFN), Trinity, Knight, Kaiten, MASTER HTTP, LOIC, DDOS UDP, DOS ProC5, SYN-Flood-DOS…..

# Rack::Attack hoạt động ra sao

`Rack::Attack` là một "middleware" cho Rack, có nghĩa rằng nó là một thứ nằm giữa user và app của bạn. Và nó chịu trách nhiệm xử lý các request tới từ các user đó và trả về kết quả cho họ.
`Rack::Attack` ở đây hoạt động như một bộ lọc, bằng cách so sánh mỗi request được gửi tới app của bạn với một bộ các config mà bạn tự định nghĩa, có thể là cho tất cả request hoặc trong một số trường hợp đặc biệt.

Để hiểu kỹ hơn, bạn nên đọc [README](https://github.com/kickstarter/rack-attack#how-it-works) từ các dev tạo ra `Rack::Attack`. Trong đó có nói rằng:
>  `Rack::Attack` middleware so sánh mỗi request với safelists, blocklists, throttles, và track mà bạn tự định nghĩa. Mặc định là không có gì hết.
>  
>  - Nếu request nằm trong safelist bất kì, nó được thông qua.
>  - Mặt khác, nếu request nằm trong blocklist bất kì, nó sẽ bị chặn lại.
>  - Nếu request nằm trong throttle bất kì, một bộ đếm sẽ được khởi tạo và tăng dần trong `Rack::Attack.cache`. Nếu request vượt ngưỡng throttle bất kì thì request sẽ bị chặn lại.
>  - Nếu tất cả các track đã được kiểm tra thì request sẽ được thông qua.

Nói chúng là nếu một request đạt được các yêu cầu được định nghĩa bởi bạn thì nó được thông qua. còn không thì nó sẽ bị chặn và trả về mã 429 (Too many request) hoặc 403 (Forbidden), phụ thuộc vào client đã bị nghẽn cổ chai hay bị chặn, không cho truy cập vào app.

# Cài đặt Rack::Attack

Để xử dụng `Rack::Attack` thì chúng ta cần cài đặt gem của nó.
```
gem "rack-attack"
```
Sau khi tiến hành chạy lệnh `bundle install`, thì chúng ta config middleware trong file `config/application.rb` cho phép sử dụng `Rack::Attack`
```
config.middleware.use Rack::Attack
```
Và giờ chúng ta có thể tạo file rack_attack.rb để config và sử dụng `Rack::Attack` (nếu chúng ta không tạo file, không config thì mặc định `Rack::Attack` sẽ không làm gì cả).

Theo mặc định thì `Rack::Attack` sử dụng `Rails.cache` để lưu trữ thông tin của những requests. Bạn cũng có thể config bộ nhớ lưu trữ riêng cho nó, ví dụ như dùng redis, chúng ta có thể config như sau:
```
redis_client = Redis.connect(url: ENV["REDIS_URL"])
Rack::Attack.cache.store = Rack::Attack::StoreProxy::RedisStoreProxy.new(redis_client)
```

# Sử dụng

Sau khi đã cài gem và chạy Redis, bước tiếp theo là tạo các config để `Rack::Attack` sử dụng để xử lý các request.

Để cho dễ hình dung, trong ví dụ của tôi sẽ có một số đường dẫn mà tôi cần bảo vệ với `Rack::Attack`:

* `/sign-in` - Form đăng nhập của user
* `/reset-password` - Form reset mật khẩu của user

Sau đây là một số config đơn giản:

```ruby
module Rack
  class Attack

    # setup Redis
    redis = SampleApp::Container[:redis]
    cache.store = Rack::Attack::StoreProxy::RedisStoreProxy.new(redis)
    
  end
end
```

- Đầu tiên tôi cho phép một IP query đến /login 10 lần trong 60s, quá 10 lần thì chặn request, tôi sẽ throttle POST request tới `/sign-in` theo địa chỉ IP:
```ruby
   throttle("/sign-in/ip", limit: 10, period: 60) do |req|
      req.ip if req.path == "/sign-in" && req.post?
    end
```
- Throttling theo IP cũng có kẽ hở, giả dụ như app của bạn đang tổ chức một event đếm ngược. Khi hết thời gian sẽ có rất nhiều người đăng nhập cùng một lúc, nếu throttling theo IP thì sẽ gây ảnh hưởng tới việc đăng nhập. Để giải quyết vấn đề này chúng ta sẽ sử dụng một params khác được truyền vào khi login, đó là email. Tiếp theo, tôi sẽ throttle POST request tới `/sign-in` theo địa chỉ email. Theo đây, tôi sẽ chỉ cho phép 10 email đăng nhập trong 60s.
```ruby
 throttle("/sign-in/email", limit: 10, period: 60) do |req|
      if req.path == "/sign-in" && req.post? && req.params["user"]
        req.params["user"]["email"]
      end
  end
```
- Đối với `/reset-password` tôi sẽ chỉ throttling theo IP mà thôi vì form đặt lại mật khẩu đâu cần dùng email đâu đúng không?
```ruby
    throttle("/reset-password/ip", limit: 10, period: 60) do |req|
      req.ip if req.path == "/reset-password" && req.get?
    end
```
- Trong quá trình phát triển app thì tôi cần phải cho phép các request từ localhost được thông qua một cách dễ dàng. Vì vậy, tôi tạo một safelist như sau:
```ruby
safelist("allow from localhost") do |req|
  req.ip == "127.0.0.1" || req.ip == "::1"
end
```

# Kết luận

Nói chung, nếu bạn có hứng thú muốn bảo vệ trang web của mình thêm một chút, tạo thêm chút thời gian để tạo thêm các tính năng khác, thì hãy thử dùng `Rack::Attack` và áp dụng một cách tốt nhất các ưu điểm của nó nhé.