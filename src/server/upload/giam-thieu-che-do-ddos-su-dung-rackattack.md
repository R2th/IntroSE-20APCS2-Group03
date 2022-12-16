Có bao giờ bạn gặp phải những cuộc tấn công DDoS từ những dự án bạn đã làm? Dự án hiện tại mình làm đã từng gặp phải vấn đề này, có những request liên tục đến trang login và nó có thể làm cho hệ thống bị die nếu chịu tải không đủ mạnh. Khi đó chúng ta sẽ nghĩ làm sao để có thể block được 1 địa chỉ IP nào đó đang có ý định DDoS vào hệ thống. Lúc này Rack::Attack có thể giúp chúng ta làm việc như vậy.

Rack::Attack là một Rack middleware từ Kickstarter. Nó có thể được config để throttle các request dựa trên IP hoặc bất cứ parameter nào đó. Nó cho phép bạn blocking & throttling những request có tính chất DDoS, bảo vệ ứng dụng của bạn khỏi những client xấu. Rack :: Attack cho phép bạn dễ dàng quyết định khi nào allow, block và throttle trên các thuộc tính của request.

Để xử dụng Rack::Attack thì chúng ta cần cài đặt thư viện của chúng.
```
gem "rack-attack"
```

Sau khi tiến hành `bundle install`, thì chúng ta config middleware trong file `config/application.rb` cho phép sử dụng `Rack::Attack`
```
config.middleware.use Rack::Attack
```

Và bây giờ chúng ta có thể tạo file `rack_attack.rb` để config và sử dụng `Rack::Attack` (Nếu chúng ta không tạo file, không config thì mặc định Rack::Attack sẽ không làm gì cả).

Theo mặc định thì `Rack::Attack` sử dụng `Rails.cache` để lưu trữ thông tin của những requests. Bạn cũng có thể config bộ nhớ lưu trữ riêng cho nó, ví dụ như dùng redis, chúng ta có thể config như sau
```
redis_client = Redis.connect(url: ENV["REDIS_URL"])
Rack::Attack.cache.store = Rack::Attack::StoreProxy::RedisStoreProxy.new(redis_client)
```

Request có thể được  throttled thông qua địa chỉ IP hoặc bất kì params nào đó. Ví dụ chúng ta muốn cho phép một IP nào đó query đến `/login` 20 lần trong 1 phút, quá 20 lần thì request sẽ bị block, chúng ta sẽ config như sau:
```
Rack::Attack.throttle('logins/ip', limit: 20, period: 1.minute) do |req|
  request.ip if req.path =~ /login/ && req.post?
end
```
Ở đây có 1 nhược điểm là sau 1 phút query vẫn được request lên server bình thường  => chúng ta có thể mở rộng phạm vi xử lý request lên, ví dụ 4 phút được request bao nhiêu lần, 8 phút được bao nhiêu lần, 16 phút được bao nhiêu lần request.
```
class Rack::Attack
  # Cho phép 80 requests/IP trong 4 minutes
  #          160 requests/IP trong 8 minutes
  #          320 requests/IP trong 16 minutes
  (2..4).each do |level|
    throttle("login/ip/#{level}",
               limit: (20 * (2 ** level)),
               period: (2 ** level).minutes) do |req|
      request.ip ﻿if req.path =~ /login/ && req.post?
    end
  end
end
```
Throttling theo IP  đôi khi cũng gặp vấn đề, giả sử như website của bạn có chức năng checkin khi bạn đến tham dự 1 event, và mọi người đều cần phải đăng nhập hệ thống. với một event to thì rất có khả năng là sẽ có nhiều người cùng login 1 lúc, nếu chặn theo IP như vậy thì sẽ dẫn tới khó khăn trong việc đăng nhập, ảnh hưởng đến hệ thống => chúng ta sẽ chặn theo một params khác khi login cần truyền vào đó là email. Giả sử chúng ta sẽ config chỉ cho phép 20 email login trong 1 phút => như vậy chúng ta sẽ config
```
Rack::Attack.throttle('logins/ip', limit: 20, period: 1.minute) do |req|
   req.params["user"].try(:[], "email").to_s ﻿if req.path =~ /login/ && req.post?
end
```
Giả sử hệ thống chúng ta có dịch vụ Health check (ví dụ call từ ELB đến server check xem chúng có hoạt động không) và chúng ta không muốn throttling chúng, ta có thể cho phép IP từ local đó được phép request đến server một cách an toàn.
```
class Rack::Attack
  class Request < ::Rack::Request
    def allowed_ip?
      allowed_ips = ["127.0.0.1", "::1"]
      req.id.in? allowed_ips
    end
  end

  safelist('allow from localhost') do |req|
    req.allowed_ip?
  end
end
```
Chúng ta cũng có thể ghi log những request đã bị block
```
ActiveSupport::Notifications.subscribe('rack.attack') do |name, start, finish, request_id, req|
  if req.env["rack.attack.match_type"] == :throttle
    request_headers = { "CF-RAY" => req.env["HTTP_CF_RAY"],
                        "X-Amzn-Trace-Id" => req.env["HTTP_X_AMZN_TRACE_ID"] }

    Rails.logger.info "[Rack::Attack][Blocked]" <<
                      "remote_ip: \"#{req.ip}\"," <<
                      "path: \"#{req.path}\", " <<
                      "headers: #{request_headers.inspect}"
  end
end
```
Ngoài ra còn một số tính năng hữu ích khác như là custome respone trả về hay ﻿config fail2ban,... Bạn có thể xem thêm tại đây﻿﻿

Mỗi cách block thì đêu có được ưu nhược điểm riêng, tuy nhiên dựa vào từng đặc tả yêu cầu mà bạn có thể áp dụng chúng một cách hợp lý nhất.

> Reference: - https://blog.bigbinary.com/2018/05/15/how-to-mitigate-ddos-using-rack-attack.html
> -  https://github.com/kickstarter/rack-attack#fail2ban