Giả sử ta cần đăng 1 đoạn message lên Twitter, chúng ta thường làm như sau:
```ruby
class TweetController < ApplicationController
  def create
    send_tweet(params[:message])
  end

  private

  def send_tweet(tweet)
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
      config.consumer_secret     = ENV['TWITTER_CONSUMER_SECRET']
      config.access_token        = ENV['TWITTER_ACCESS_TOKEN']
      config.access_token_secret = ENV['TWITTER_ACCESS_SECRET']
    end
    client.update(tweet)
  end
end
```
Nhìn vào đoạn code trên ta đã định nghĩa send_tweet gọi api twitter.Nếu 1 controller khác cũng gọi twitter 1 cách tương tự thì sao? Có nên cho nó vào concern?? Nhưng nó k hẳn thuộc về controller, tại sao ta k tìm cách cho Twitter API  thành 1 đối tượng sau đó call khi cần
# Service object là gì?
Service object được thiết kế để thực hiện một logic cụ thể nào đó mà đối tượng xử lí k hoàn toàn thuộc về 1 model nào cả.
Lợi ích của Service object là nó giúp chúng ta tập chung toàn bộ logic chức năng vào 1 object riêng biệt thay vì chia nhỏ nó ở controller hay model. Lúc nào cần đến thì gọi object đó ra.
Chính vì khối logic được tập trung hết vào trong 1 object nên sẽ tối giản controller và model đi rất nhiều, code clean và quá trình maintain sau này cũng đỡ vất vả hơn.
Xem ví dụ trên method send_tweet thực hiện 1 logic duy nhất là tạo 1 tweet. Nếu logic này được gói gọn vào 1 class, chúng ta có thể khởi tạo và gọi theo kiểu:
```ruby
tweet_creator = TweetCreator.new(params[:message])
tweet_creator.send_tweet
```

hoặc
```ruby
TweetCreator.call(params[:message])
```
Thật tiện lợi đúng k. Ta chỉ việc định nghĩa nó 1 lần, có thể dùng nó ở bất cứ đâu, dễ dàng maintance sửa đổi
# Tạo Service object
Chúng ta sẽ tạo `TweetCreator` trong `app/services`:
```
$ mkdir app/services && touch app/services/tweet_creator.rb
```
add logic vào trong service:
```ruby
# app/services/tweet_creator.rb
class TweetCreator
  def initialize(message)
    @message = message
  end

  def send_tweet
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
      config.consumer_secret     = ENV['TWITTER_CONSUMER_SECRET']
      config.access_token        = ENV['TWITTER_ACCESS_TOKEN']
      config.access_token_secret = ENV['TWITTER_ACCESS_SECRET']
    end
    client.update(@message)
  end
end
```
Sau đó bạn có thể gọi bằng cách:
```ruby
TweetCreator.new(params[:message]).send_tweet
```

TweetCreator class name tương đối ngắn nhưng khi khởi tạo và gọi thì trông khá dài đúng không. ta có thể rút gọn câu lệnh gọi bằng cách sau đây, Nếu TweetCreator có thể giống với proc trong Ruby ta có thể gọi nó bằng `TweetCreator.call(message)` 
Giờ chúng ta sẽ biến service object như 1 proc để thuận tiện cho việc gọi service nhé!
Tạo 1 ApplicationService:
```ruby
# app/services/application_service.rb
class ApplicationService
  def self.call(*args, &block)
    new(*args, &block).call
  end
end
```
Mỗi khi call dc gọi nó sẽ tạo ra 1 instance của class đó vs các biến truyền vào 
```ruby
# app/services/tweet_creator.rb
class TweetCreator < ApplicationService
  attr_reader :message
  
  def initialize(message)
    @message = message
  end

  def call
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
      config.consumer_secret     = ENV['TWITTER_CONSUMER_SECRET']
      config.access_token        = ENV['TWITTER_ACCESS_TOKEN']
      config.access_token_secret = ENV['TWITTER_ACCESS_SECRET']
    end
    client.update(@message)
  end
end
```

Tại controller ta gọi
```ruby
class TweetController < ApplicationController
  def create
    TweetCreator.call(params[:message])
  end
end
```
1 cách làm cho code trở nên tối ưu hơn đúng không :))
# Grouping Similar Service Objects
Ở ví dụ trên ta chỉ xét 1 service object, nhưng trên thực tế có thể phức tạp hơn thế. Ví dụ ta có hàng trăm service xử lí nhiều logic khác nhau. Ta k thể nhét chúng vào 1 file sẽ rất khó quản lí đúng không. Chúng ta sẽ sử dụng namespacing, ta sẽ nhóm các service object có chung đặc điểm vào 1 module:
Ví dụ:
```
services
├── application_service.rb
└── twitter_manager
      ├── profile_follower.rb
      └── tweet_creator.rb
```
Trong service:
```ruby
# services/twitter_manager/tweet_creator.rb
module TwitterManager
  class TweetCreator < ApplicationService
  ...
  end
end
```
```ruby
# services/twitter_manager/profile_follower.rb
module TwitterManager
  class ProfileFollower < ApplicationService
  ...
  end
end
```

Ta gọi bằng cách 
```ruby
TwitterManager::TweetCreator.call(arg)
TwitterManager::ProfileManager.call(arg)
```


# Service Objects thao tác với database
Ở ví dụ trên ta xét api call, nhưng service object cũng có thể sử dụng để gọi tới database. Nó thực sự hữu ích khi ta cập nhập nhiều DB với nhiều logic phức tạp ví dụ như:
```ruby
module MoneyManager
  # exchange currency from one amount to another
  class CurrencyExchanger < ApplicationService
    ...
    def call
      ActiveRecord::Base.transaction do
        # transfer the original currency to the exchange's account
        outgoing_tx = CurrencyTransferrer.call(
          from: the_user_account,
          to: the_exchange_account,
          amount: the_amount,
          currency: original_currency
        )

        # get the exchange rate
        rate = ExchangeRateGetter.call(
          from: original_currency,
          to: new_currency
        )

        # transfer the new currency back to the user's account
        incoming_tx = CurrencyTransferrer.call(
          from: the_exchange_account,
          to: the_user_account,
          amount: the_amount * rate,
          currency: new_currency
        )

        # record the exchange happening
        ExchangeRecorder.call(
          outgoing_tx: outgoing_tx,
          incoming_tx: incoming_tx
        )
      end
    end
  end

```
```ruby
 # record the transfer of money from one account to another in money_accounts
  class CurrencyTransferrer < ApplicationService
    ...
  end

  # record an exchange event in the money_exchanges table
  class ExchangeRecorder < ApplicationService
    ...
  end

  # get the exchange rate from an API
  class ExchangeRateGetter < ApplicationService
    ...
  end
end
```
# Service object nên trả về gì?

Vừa rồi chúng ta thảo luận cách xây dựng gọi method call như thế nào, vậy method call nên trả về gì? Có 3 cách trả về

- Trả về true/ false
```ruby
   def call
    ...
    return true if client.update(@message)
    false
  end
```
- Trả về 1 giá trị
```ruby
  def call
    ...
    return false unless exchange_rate
    exchange_rate
  end
```
- Trả về 1 enum
```ruby
class ExchangeRecorder < ApplicationService
  RETURNS = [
    SUCCESS = :success,
    FAILURE = :failure,
    PARTIAL_SUCCESS = :partial_success
  ]

  def call
    foo = do_something
    return SUCCESS if foo.success?
    return FAILURE if foo.failure?
    PARTIAL_SUCCESS
  end

  private

  def do_something
  end
end
```
# Một số rule để viết service object tốt
### Mỗi Service Object chỉ nên có 1 public method
Mỗi một service object chỉ thực hiện 1 bussiness cụ thể nào đó, do vậy chỉ nên có 1 public method
### Đặt tên Service object theo vai trò của nó
Ta nên đặt tên service object để người code có thể hiểu được vai trò của nó luôn
### Không thực hiện nhiều action 
Mỗi service object chỉ thực hiên 1 bussiness 
###  Handle Exceptions bên trong service object

Hi vọng bài viết giúp bạn hiểu về service object và vận dụng được trong dự án. Thanks for reading. :D 


Tham khảo tại: https://www.toptal.com/ruby-on-rails/rails-service-objects-tutorial