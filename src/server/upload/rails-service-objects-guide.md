Bạn có thể đọc bài gốc tại [đây](https://www.toptal.com/ruby-on-rails/rails-service-objects-tutorial?utm_campaign=TTBlog+and+Ecosystem&utm_source=topt.al).

Ruby on Rails cung cấp mọi thứ bạn cần để xây dựng ứng dụng của bạn một cách nhanh chóng, nhưng khi mã nguồn của bạn bắt đầu phát triển, bạn sẽ dễ rơi vào trường hợp mà mô hình Fat Model, Skinny Controller thông thường bị phá vỡ. Khi logic business  của bạn không thể được xử lý bởi chỉ 1 model hoặc 1 controller, đó là khi Service Object nên được sử dụng và giúp chúng ta tách từng business action thành đối tượng Ruby riêng của nó.

![](https://images.viblo.asia/92080a2e-b54c-434e-8376-ba9d33d634d2.png)

Bài viết này sẽ giải thích khi nào một Service Object được yêu cầu, làm thế nào để viết 1 Service Object rõ ràng và nhóm chúng lại với nhau để dễ dàng quản lý,  các quy tắc nghiêm ngặt mà tôi áp đặt đối với các Service Object của mình để buộc chúng liên quan trực tiếp với logic business và làm thế nào để không biến các Service Object của bạn thành một bãi rác cho tất cả các đoạn code mà bạn không biết phải làm gì với chúng.

### Tại sao tôi cần 1 Service Objects?

Hãy thử điều này: Bạn sẽ làm gì khi ứng dụng của bạn cần tweet text  từ params[: message]?
Nếu bạn mới sử dụng Rails 1 thời gian, có thể bạn sẽ làm như thế này:
```
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
Vấn đề ở đây là bạn đã thêm ít nhất 10 dòng code vào trong controller của bạn, nhưng chúng thực sự không nên đặt ở đây. Ngoài ra, nếu có trường hợp bạn muốn sử dụng một chức năng tương tự như thế trong 1 controller khác, bạn sẽ chuyển nó vào 1 concern? Nhưng đoạn code này thực sự không nên thuộc về 1 controller nào cả. Tại sao Twitter API không thể trở thành 1 object riêng rẽ mà ta có thể gọi được nó ở những chỗ khác? Tôi đã cố vẫn giữ code này trong controller nhưng nó càng ngày càng "fat" và tôi không biết phải làm gì, cuối cùng, tôi đã sửa lại controller của tôi bằng cách dùng một Service Object.

Trước khi bạn bắt đầu đọc bài viết này, hãy giả vờ như:
- App trong ví dụ dùng để xử lý một tài khoản Twitter.
- Rails Way  nghĩa là "cách thức hoạt động của Ruby on Rails" và cuốn sách này không tồn tại.

Và để hiểu thêm về các ví dụ trong bài, có thể bạn nên tìm hiểu về gem [twitter](https://github.com/sferik/twitter) trước.



### Service Objects là gì?

Service objects là Plain Old Ruby Objects (PORO) được thiết kế để thực hiện một hành động duy nhất trong miền logic của bạn. Hãy xem xét ví dụ bên trên: method của chúng ta đã có logic để thực hiện một hoạt động duy nhất, đó là tạo ra một tweet. Điều gì sẽ xảy ra nếu logic này được gói gọn trong một lớp Ruby duy nhất mà chúng ta có thể khởi tạo và gọi một method? Cái gì đó giống như:

```
tweet_creator = TweetCreator.new(params[:message])
tweet_creator.send_tweet

TweetCreator.call(params[:message])
```

Nó trông thật tuyệt, Service Object `TweetCreator` của chúng ta  một khi được tạo, nó có thể được gọi ở bất cứ đâu và nó sẽ  thực hiện rất tốt mục đích được tạo ra của nó.

**Tạo 1 Service Object**

Đầu tiên, tạo mới một class `TweetCreator` trong folder `app/services`:


  `mkdir app/services && touch app/services/tweet_creator.rb`
  
 Tiếp theo, chúng ta ném tất cả code logic của chúng ta vào trong lớp Ruby này:
 
```
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

Sau đó, bạn có thể gọi `TweetCreator.new(params[:message]).send_tweet` ở bất cứ đâu trong ứng dụng của bạn và nó sẽ hoàn toàn hoạt động bởi vì Rails autoload mọi thứ bên trong folder `app/`. Bạn có thể thử kiểm chứng điều này trong console của Rails: 
```
> rails c
Running via Spring preloader in process 12417
Loading development environment (Rails 5.1.5)
 > puts ActiveSupport::Dependencies.autoload_paths
...
/Users/gilani/Sandbox/nazdeeq/app/services
```
Bạn có thể đọc nhiều hơn về cách autoload hoạt động tại [đây](http://guides.rubyonrails.org/autoloading_and_reloading_constants.html)

**Thêm các cú pháp để giúp Service Objects ngắn gọn hơn**

Đối tượng `TweetCreator` chúng ta tạo bên trên có thể tuyệt vời về mặt lý thuyết, nhưng `TweetCreator.new(params[:message]).send_tweet` vẫn quá dài dòng với những từ dư thừa ... giống như HTML. `TweetCreator`  là một tên class ngắn gọn khá tốt, nhưng các thông số khi tạo các thực thể và cách gọi method vẫn rất dài. Tuy nhiên chúng ta có thể sử dụng `Proc#call` của Ruby để gọi và thực hiện ngay khi các params  được gửi.

> Vài ví dụ về  `Proc*call`:
> 
> ```
> a_proc = Proc.new {|scalar, *values| values.map {|value| value*scalar } }
> a_proc.call(9, 1, 2, 3)    #=> [9, 18, 27]
> a_proc[9, 1, 2, 3]         #=> [9, 18, 27]
> a_proc.(9, 1, 2, 3)        #=> [9, 18, 27]
> a_proc.yield(9, 1, 2, 3)   #=> [9, 18, 27]
> ```
> Bạn có thể đọc thêm về Proc tại [đây](https://docs.ruby-lang.org/en/2.4.0/Proc.html#method-i-call)
 
Một `Proc` có thể được gọi để thực thi chính nó với các param được truyền vào, điều đó nghĩa là nếu `TweetCreator` là một `Proc`, chúng ta có thể gọi nó với `TweetCreator.call(message)` và kết quả sẽ giống như khi ta gọi `TweetCreator.new(params[:message]).call` và nó trông hơi giống với cách gọi cũ của chúng ta ` TweetCreator.new(params[:message]).send_tweet`.
 
 Giờ hãy làm cho Service Object của chúng ta hoạt động giống như 1 `proc`.
 
 Đầu tiên, bởi vì có thể chúng ta sẽ sử dụng lại hành động này trên tất cả các Service Object của mình, nên hãy mượn ý tưởng từ Rails Way và tạo 1 class tên là `ApplicationService`:
 ```
 # app/services/application_service.rb
class ApplicationService
  def self.call(*args, &block)
    new(*args, &block).call
  end
end
```
Trong class trên, ta đã thêm 1 class method `call` để tạo 1 thực thể của class với các tham số hoặc block mà bạn có thể pass qua nó và gọi `call` cho thực thể đó. Đó chính xác là những gì chúng ta muốn. Điều cuối cùng phải làm là đổi tên method  trong class `TweetCreator` thành `call` và cho class này kế thừa từ `ApplicationService`:

```
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

Cuối cùng, gọi Service Object của chúng ta trong controller :
```
class TweetController < ApplicationController
  def create
    TweetCreator.call(params[:message])
  end
end
```
**Nhóm các service object tương tự**

Ví dụ trên chỉ có 1 Service Object duy nhất, nhưng trong thực tế, mọi thứ có thể sẽ phức tạp hơn. Ví dụ, nếu bạn có hàng trăm service, và một nửa số đó liên quan đến các hoạt động business, ví dụ một tài khoản Twitter này lại đi theo dõi một tài khoản Twitter khác. Thành thật mà nói, tôi sẽ điên lên nếu 1 thư mực chứa đến 200 tập tin, vì vậy sẽ tốt hơn nếu có 1 thành phần từ Rails Way mà chúng ta có thể sao chép - namespacing.

Giả định rằng chúng ta được giao nhiệm vụ tạo ra 1 Service Object có thể theo dõi tiểu sử của các account Twitter khác.
Hãy nhìn vào tên của Service Object lúc trước của chúng ta: `TweetCreator`, nó giống như 1 cá nhân hoặc ít nhất, nó giống như vai trò của 1 ai  đó người mà tạo Tweet. Tôi muốn đặt tên cho service  của tôi  theo vai trò của chúng, và theo quy ước này, tôi sẽ gọi đối tượng mới của tôi là  `ProfileFollower`.

Giờ chúng ta sẽ tạo một thư mục để quản lý các phân cấp của các Service Object, mình sẽ đặt tên folder này là `TwitterManager`, và làm cho nó giống như 1 module và đặt Service Object của chúng ta bên trong folder đó, cấu trúc của nó sẽ giống thế này:
```
services
├── application_service.rb
└── twitter_manager
      ├── profile_follower.rb
      └── tweet_creator.rb
```
Và Service Object của chúng ta sẽ như sau:
```
# services/twitter_manager/tweet_creator.rb
module TwitterManager
  class TweetCreator < ApplicationService
  ...
  end
end
```
```
# services/twitter_manager/profile_follower.rb
module TwitterManager
  class ProfileFollower < ApplicationService
  ...
  end
end
```
Và giờ chúng ta gọi chúng bằng cách `TwitterManager::TweetCreator.call(arg)` và `TwitterManager::ProfileManager.call(arg)`

### Dùng Service Objects để xử lý các thao tác với database

Vi dụ bên trên thực hiện gọi API của Twitter  nhưng Service Object cũng có thể được sử dụng khi chúng ta cần gọi đến database thay vì API. Điều này thực sự hữu ích khi một vài chức năng yêu cầu cập nhập nhiều bảng trong 1 transaction. Ví dụ, đoạn mã bên dưới sử dụng service để lưu lại một thay đổi tiền tệ đang diễn ra:

```
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

### Giá trị trả về của Service Object?

Chúng ta đã thảo luận về cách để gọi Service Object của chúng ta như thế nào, nhưng một Service Object nên trả về cái gì? Có 3 cách để tiếp cận nó:
- Trả về `true` hoặc `false`.
- Trả về 1 giá trị.
- Trả về 1 Enum.

**Trả về `true` hoặc `false`**

Điều này rất đơn giản: Nếu 1 hành động hoạt động đúng theo dự định, trả về `true`, nếu không trả về `fasle`.

```
def call
    ...
    return true if client.update(@message)
    false
end
```

**Trả về 1 giá trị**

Nếu Service Object của bạn sẽ được lấy data của nó từ đâu đó, có thể bạn sẽ muốn trả về 1 giá trị:
```
 def call
    ...
    return false unless exchange_rate
    exchange_rate
  end
```

**Trả về 1 Enum**

Nếu Service Object của bạn phức tạp hơn và bạn muốn xử lý nhiều kịch bản khác nhau, bạn có thể thêm enum để điều khiển flow các service của bạn:
```
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
Và trong app của bạn, bạn có thể sử dụng:

```
 case ExchangeRecorder.call
    when ExchangeRecorder::SUCCESS
      foo
    when ExchangeRecorder::FAILURE
      bar
    when ExchangeRecorder::PARTIAL_SUCCESS
      baz
    end
```
**Tại sao không nên để Service Object trong `lib/services` thay vì trong `app/services`**

Đây là ý kiến chủ quan của tôi, có rất nhiều ý kiến khách quan về nơi nên đặt Service Object. Một vài người thì thích để chúng trong `lib/services`, trong khi một số khác đặt trong `app/serivces`. Tôi thì rơi vào trường hợp sau. Theo [Rails’ Getting Started Guide](http://guides.rubyonrails.org/getting_started.html)  miêu tả thì folder `lib/` là nơi để đặt các "module mở rộng" cho ứng dụng của bạn, và theo ý kiến của tôi, "module mở rộng" nghĩa là các module mà nó không gói gọn logic cốt lõi và thường có thể được sử dụng trong nhiều dự án. Bạn có thể hiểu thêm về sự khác biệt này trong [câu trả lời trên  Stack Overflow. ](https://stackoverflow.com/questions/16159021/rails-service-objects-vs-lib-classes/16175446#16175446)

**Service Object có phải là ý tưởng tốt?**

Nó còn phụ thuộc vào trường hợp sử dụng riêng của bạn. Thực tế là bạn đang đọc bài viết này cho thấy bạn đang cố gắng để viết một đoạn code mà nó không chính xác thuộc về một model hoặc controller nào. Gần đây tôi đã đọc bài viết [này](https://intersect.whitefusion.io/the-art-of-code/why-service-objects-are-an-anti-pattern) về việc bằng cách nào các Service Object lại được khái niệm là những anti-pattern. Tác giả bài viết này có ý kiến của riêng mình,  nhưng thành thật thì tôi không đồng tình lắm. 

Chỉ bởi vì 1 số người lạm dụng Service Object không có nghĩa là họ đang có những mục đích xấu. Chúng tôi sử dụng Service Object gần giống với các mô hình non-ActiveRecord. Tuy nhiên, tôi luôn giữ tất cả các hoạt động business trong Service Object trong khi vẫn giữ các resources mà không cần persistence trong mô hình non-ActiveRecord. 

Tuy nhiên, Service Object nói chung liệu có thực sự là một ý kiến hay? Chắc chắn rồi! Chúng lưu giữ code một cách khoa học, và điều khiến tôi tự tin khi sử dụng PORO là bởi vì tất cả mọi thứ trong Ruby đều là  Object. Hãy xem ví dụ sau: 

```
> 5.is_a? Object # => true
 > 5.class # => Integer


 > class Integer
?>   def woot
?>     'woot woot'
?>   end
?> end # => :woot

 > 5.woot # => "woot woot"
```

Bạn thấy không? Trong Rails `5` cũng là 1 Object.
> Trong một số ngôn ngữ lập trình, các chữ số và một vài loại nguyên tử khác không phải là 1 object. Ruby ảnh hưởng bởi ngôn ngữ Smalltalk bằng cách đưa ra các phương thức và các biến thực thể cho tất cả các kiểu của nó. Điều này làm những người sử dụng Ruby yên tâm, vì các quy tắc áp dụng cho các đối tượng đều có thể áp dụng trong Ruby. Ruby-lang.org
>
### Khi nào không nên sử dụng 1 service object?

Điều này cũng khá dễ dàng. Tôi có một số quy tắc như sau: 

1. Code của bạn có xử lý liên quan đến routes, params hoặc thực hiện 1 vài thứ của 1 controller? 

    Nếu có, không nên sử dụng Service Object - code của bạn thuộc về controller. 
2. Bạn đang cố gắng chia sẻ code của mình với controller khác? 

   Trong trường hợp này, không sử dụng Service Object - hãy sử dụng 1 concern. 
3. Code của bạn có giống một model không cần persistence? 

    Nếu có bạn không cần sử dụng Service Object. Bạn nên sử dụng một module non-ActiveRecord để thay thế. 
4. Code của bạn có phải là 1 hoạt động business cụ thể? (VD: "Dọn dẹp thùng rác", "Tạo ra 1 file PDF sử dụng text của chính nó", hoặc "Tính thuế hải quan bằng các quy tắc phức tạp")

    Trong trường hợp này, hãy dùng 1 Service Object. Code đó có lẽ không phù hợp với logic trong controller hoặc model của bạn. 

Tất nhiên, đây chỉ là quy tắc của riêng tôi, bạn có thể sử dụng hoặc không.

### Các quy tắc để viết tốt Service Object

Tôi đã đề ra 4 quy tắc để tạo 1 Service Object. Đây không phải là quy tắc cứng nhắc, và nếu bạn thực sự muốn phá vỡ quy tắc đó, bạn hoàn toàn có thể yêu cầu thay đổi chúng trong quá trình review code.

**Quy tắc 1**: Chỉ sử dụng duy nhất 1 public method cho 1 Service Object

Service Object là các hoạt động business đơn lẻ. Bạn có thể thay đổi tên của public method nếu bạn muốn. Tôi khuyến khích nên sử dụng hàm `call`, nhưng trong codebase [Citlab CE's](https://gitlab.com/gitlab-org/gitlab-ce) gọi hàm đó là `execute` và vài người khác gọi nó là `perform`. Bạn có thể sử dụng bất cứ tên bạn muốn, kể cả là `nermin`, chỉ cần bạn không tạo ra nhiều public method cho 1 Service Object đơn lẻ. Hãy chia Object đó làm 2 nếu bạn thực sự thấy cần. 

**Quy tắc 2**: Đặt tên Service Object giống với vai trò nhân viên trong công ty 

Service Object là 1 hoạt động *business*  đơn lẻ. Hãy tưởng tượng nếu bạn thuê 1 người trong công ty làm 1 việc, bạn sẽ gọi họ thế nào? Nếu công việc đó tạo ra tweets, thì họ được gọi là `TweetCreator`. Nếu công việc của bạn là đọc những tweets đặc thù, thì nó được gọi là `TweetReader`. 

**Quy tắc 3**: Không tạo 1 Object chung để thực hiện nhiều tác vụ

Service Object là 1 *hoạt động* business đơn lẻ. Tôi đã chia chức năng này thành 2 phần: `TweetReader` và `ProfileFollower`. Những gì tôi đã không làm là tạo ra 1 đối tượng chung chung gọi là `TweetHandler` và nhét các chức năng API vào trong đó. Điều này đã đi ngược lại với quan điểm "hành động business" và tạo đối tượng dịch vụ giống như `TwitterFairy`. Nếu bạn chia sẻ code giữa các business objects, chỉ cần tạo một đối tượng `BaseTwitterManager` hoặc 1 module và kết hợp chúng vào Service Object của bạn.

**Quy tắc 4**: Xử lý những ngoại lệ trong Service Object

Thêm 1 lần nữa: Service Object là 1 hoạt động business đơn lẻ. Nếu một người đọc được những dòng tweet, họ sẽ hoặc đưa cho bạn tweet, hoặc trả về kết quả "Dòng tweet của bạn không tồn tại". Tương tự như vậy, đừng để Service Object bị hoảng loạn, hãy chuyển đến controller và dừng lại mọi action vì đã xảy ra lỗi, chỉ cần trả lại `false` và để controller tự hoạt động từ đó.