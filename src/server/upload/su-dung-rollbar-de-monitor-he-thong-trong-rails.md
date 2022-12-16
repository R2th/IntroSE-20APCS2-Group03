### Giới thiệu

Rollbar là một dịch vụ hỗ trợ các lập trình viên, cung cấp khả năng báo cáo các exception theo thời gian thực khi hệ thống hoạt động và theo dõi quá trình deploy hệ thống.

Hoạt động của Rollbar cũng khá đơn giản, mỗi khi hệ thống có lỗi nó sẽ gửi một thông báo tới Rollbar server. Rollbar server sẽ thu thập các lỗi để thống kê và gửi thông báo đến cho người quản trị trang web biết.

Rollbar cung cấp SDK dễ dàng nhúng vào hệ thống, và hỗ trợ cho rất nhiều ngôn ngữ như Go, Java, Ruby, iOS, macOS, Javascript (cả browser và server - nodejs), python, PHP, ReactNative, .NET ....

Trong bài viết này, chúng ta sẽ cùng tìm hiểu về cách cài đặt Rollbar trong ruby, 

Không chỉ hỗ trợ Rails, Rollbar còn hỗ trợ tất cả các tích hợp và framework khác của ruby như Rails, Sinatra, Goalie, Rack, Grape, Ruby, ....

Trong bài viết này, chúng ta sẽ tìm hiểu về cách sử dụng Rollbar trong Rails 

### Cài đặt 

Để cài đặt trong rails, ta thêm vào trong gemfile

```sql
gem 'rollbar'
```

sau đó chạy `bundle install` hoặc có thể cài trực tiếp gem bằng lệnh 

```sql
$ gem install rollbar
```

Chạy lệnh sau:

```markdown
$ rails generate rollbar POST_SERVER_ITEM_ACCESS_TOKEN
```

Giá trị `POST_SERVER_ITEM_ACCESS_TOKEN` sẽ được lấy từ trang  https://rollbar.com/, sau khi ta tạo account, đây là dịch vụ trả phí, nhưng chúng ta có thể sử dụng miễn phí trong 14 ngày 

Lệnh trên sẽ sinh ra file `config/initializers/rollbar.rb` chứa các giá trị để cấu hình Rollbar khi khởi tạo và cả access_token.

Nếu không muốn thêm trực tiếp access_token vào lệnh trên, chúng ta có thể sử dụng biến môi trường 

```shell
$ rails generate rollbar
$ export ROLLBAR_ACCESS_TOKEN=POST_SERVER_ITEM_ACCESS_TOKEN
```

và cài đặt trong file `config/initializers/rollbar.rb`

### Cách sử dụng:

Cách sử dụng rất đơn giản, chỉ cần thêm các lệnh rollbar sau cho từng nhu cầu cụ thể 

```python
Rollbar.log(level, ...)
Rollbar.debug()
Rollbar.info()
Rollbar.warning()
Rollbar.error()
Rollbar.critical()
```

VD: Giả sử ta có 1 hàm bị lỗi 

```ruby
class Post < ActiveRecord::Base
  class << self
    def generate_sample_data num
      (1..num).to_a.map do |i|
        res = STRING_FIELDS.inject({}){|r, j| r[j] = "#{j} #{i}"; r}
        res.merge! INTEGER_FIELDS.inject({}){|r, j| r[j] = (1..10).to_a.sample; r }
        res.merge!({"expired_at" => Time.zone.now})
        res.merge!({"url" => "https://example.com"})
        raise StandError
        res
      end
    rescue StandardError
      Rollbar.error('error in generate_sample_data')
    end      
  end
end
```

Ta thêm 1 text lỗi là raise StandError, giờ mong muốn là khi chạy đến dòng lỗi đấy thì sẽ chạy vào rescue và thực hiện gửi error lên server Rollbar 

Tuy nhiên, sẽ có 2 trường hợp để hiển thị lỗi:

- Thêm nội dung error message vào `Rollbar.error` tương tự như VD trên

Nếu thêm như thế, thì khi vào trang chủ Rollbar, ta sẽ xem được thông báo lỗi của error đấy chỉ có mỗi message error 

![](https://images.viblo.asia/ed835480-fdee-4a50-869d-5bd26a052522.png)

- Thêm exception vào tham số của `Rollbar.error`:

```shell
def generate_sample_data num
    ...
rescue StandardError => e 
   Rollbar.error(e)
end
```

Khi đấy chúng ta sẽ theo dõi được cả traceback của lỗi 

![](https://images.viblo.asia/0444fd8b-cab2-493a-9b2e-f0c7cd55f9c3.png)

Ngoài ra, ở phiên bản trả phí, chúng ta có thể theo dõi được cả giá trị tham số của từng file  nữa 

![](https://images.viblo.asia/9e757c50-5033-4fc1-8363-12442c9b034c.png)

khi biết được cả params, thì ta có thể dễ dàng theo dõi được những giá trị không hợp lý của 1 hàm trên môi trường production mà gây nên lỗi, bởi vì trên môi trường production, nếu không tạo được data, validate bị lỗi dẫn đến Rollback, nếu cần thêm thông tin, ta không thể yêu cầu user chạy lại để tái hiện lỗi được

### Các vị trí nên đặt Rollbar để monitor hệ thống 

- Trong rescue của service quan trọng: giúp lấy được thông tin khi service xử lý sai 
- Trong after_validation: nếu cần lấy thêm thông tin đối với các model phức tạp mà có thể bị validate failed 
- Theo dõi rails khởi động: để theo dõi được quá trình này, thì ta cần phải thay đổi một vài config 
Chuyển file từ `config/initializers/rollbar.rb`  sang `config/rollbar.rb` và thêm đoạn code sau trong config/environment.rb

```ruby
# config/environment.rb

require File.expand_path('../application', __FILE__)
require File.expand_path('../rollbar', __FILE__)

notify = ->(e) do
  begin
    Rollbar.with_config(use_async: false) do
      Rollbar.error(e)
    end
  rescue
    Rails.logger.error "Synchronous Rollbar notification failed.  Sending async to preserve info"
    Rollbar.error(e)
  end
end

begin
  Rails.application.initialize!
rescue Exception => e
  notify.(e)
  raise
end
```

- Giám sát quá trình deploy: 
Giả sử ta dùng Capistrano 3 để deploy, ta thực hiện các bước sau để monitor quá trình deploy

Cài rollbar trong Gemfile tương tự như trên 

Thêm `require 'rollbar/capistrano3'` trong file `Capfile` 

Thêm code sau trong file deploy.rb

```ruby
set :rollbar_token, 'POST_SERVER_ITEM_ACCESS_TOKEN'
set :rollbar_env, Proc.new { fetch :stage }
set :rollbar_role, Proc.new { :app }
```

Nếu muốn monitor quá trình deploy bằng các tool khác, chúng ta hãy tìm hiểu trong tài liệu [doc của rollbar](https://docs.rollbar.com/docs/deploy-tracking)