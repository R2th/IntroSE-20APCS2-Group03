## Những lợi và hại của Active Record models

Trong giai đoạn đầu của dự án dùng Rails, Model đưa tất cả code của nó vào các đối tượng kế thừa từ Active Record hoạt động khá độc đáo. Mỗi đối tượng Model có bảng cơ sở dữ liệu riêng, cùng với validation riêng và một số asociation với các model khác, có thể có thêm cả các custom method.

Sau này trong khi dự án đang phát triển, model đưa mọi thứ vào các đối tượng Active Record trở nên kém hơn. Ví dụ, nếu có một model Appointment, thì mọi thứ liên quan đến appointment sẽ được đưa vào model Appointment(ví dụ như remotely appointment,  daily appointment, weekly appointment, monthly appointment,...), dẫn đến các mô hình có hàng chục phương thức và hàng trăm nếu không phải là hàng ngàn dòng code (Fat Model).

Thực tế là phong cách code kiểu này này đã nhét một lượng lớn code vào các mô hình Active Record, hoặc cả trong các controllers có quá nhiều các method(Fat controller) điều này dẫn đến một mớ hỗn độn, nhiều dự án Rails được xây dựng theo cách này. Lý do điều này xảy ra có lẽ vì các developer chỉ thấy các cấu trúc tổ chức mà Rails cung cấp (model, controller, views, helpers, v.v.) và không nhận ra rằng chúng không hề giới hạn trong các cấu trúc này. Bản thân tôi trong một thời gian dài đã không nhận ra rằng tôi chỉ giới hạn ở những cấu trúc đó.

##  Service objects rút gọn Active Record Grap Bag
Ý tưởng: thay vì đưa logic vào Active Record objects, bạn đặt logic vào các service objects  trong thư mục object riêng biệt trong ứng dụng Rails(`app/services`). Một số ví dụ tên class service chẳng hạn như:

* `TweetCreator`
* `RegisterUser`
* `CompleteOrder`
* `NewRegistrationService`
* `SendMessageService`
* `UpdateUserService`

Vì vậy, thông thường, mộtservice object chịu trách nhiệm thực hiện một số hành động. TweetCreator tạo một tweet, đối tượng RegisterUser đăng ký người dùng. Đây dường như là quan niệm phổ biến nhất (hoặc ít nhất là thường được viết về) về một đối tượng dịch vụ. Nó cũng rõ ràng là ý tưởng đằng sau [gem Interactor](https://github.com/collectiveidea/interactor).

## Why service objects are a bad idea
Một trong những lợi ích tuyệt vời của lập trình hướng đối tượng là chúng ta có thể sử dụng object với sự pha trộn giữa behavior và data để cung cấp cho các object công suất sử dụng tối đa. Không chỉ điều này, mà chúng ta có thể ánh xạ các object khá gọn gàng với các khái niệm trong model mà chúng ta đang làm việc, làm cho code dễ hiểu hơn.
### Service objects đưa ra những lợi thế cơ bản của lập trình hướng đối tượng.
Thay vì có behavior  và data được gói gọn trong các object dễ hiểu với các tên như `Tweet` hoặc `User`, chúng ta có các ý tưởng mơ hồ về mặt khái niệm như `TweetCreator` và `RegisterUser`. Các "Objects"  như thế này  không  phải là khái niệm trừu tượng trong Model. Chúng là các đoạn code thuộc phuong thức giả dạng theo hướng đối tượng.

A better alternative to service objects: domain objects
Let me take a couple service object examples I’ve found online and rework them into something better.

Tweet example
The first example I’ll use is TweetCreator from this TopTal article, the first result when I google for rails service objects.

### Một thay thế tốt hơn cho các  service objects: domain objects
Ví dụ `Tweet`
Ví dụ đầu tiên tôi sử dụng là `TweetCreator` từ bài viết [TopTal](https://www.toptal.com/ruby-on-rails/rails-service-objects-tutorial) này, kết quả đầu tiên khi tôi google cho các service objects rails.

```
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
Tôi nghĩ sẽ tốt hơn nhiều nếu có 1 Tweet object.

```
class Tweet
  def initialize(message)
    @message = message
  end

  def send
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
Có phải nói tự nhiên hơn khi nói `Tweet.new("hello").send` hơn là nói `TweetCreator.new('hi').send_tweet?` . Thay vì là bên ngoài quy trình đơn mục đích kỳ lạ này, `Tweet` chỉ là một đại diện đơn giản của một khái niệm tên domain thực. Đây là những gì các domain objects nói lên.
Sự khác biệt giữa các ví dụ tốt và xấu trong trường hợp này là khá nhỏ, vì vậy hãy để tôi giải quyết ví dụ tiếp theo trong bài viết TopTal mà tôi nghĩ là tồi tệ hơn.

### Currency exchange example
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

Đầu tiên, các bản tóm tắt của `MoneyManager`, `MoneyExchanger`, v.v ... không thực sự trừu tượng. Tôi tự động hoài nghi về bất kỳ [đối tượng nào có tên kết thúc bằng -er.](https://www.yegor256.com/2015/03/09/objects-end-with-er.html)

Tôi sẽ không cố gắng làm lại dòng ví dụ này vì có quá nhiều ở đó, nhưng hãy để xem liệu chúng ta có thể bắt đầu hướng tới điều gì đó tốt hơn không.

```
class CurrencyValue
  def initialize(amount_cents, currency_type)
    @amount_cents = amount_cents
    @currency_type = currency_type
  end

  def converted_to(other_currency_type)
    exchange_rate = ExchangeRate.find(@currency_type, other_currency_type)
    CurrencyValue.new(@amount_cents * exchange_rate, other_currency_type)
  end
end

one_dollar = CurrencyValue.new(100, CurrencyType.find('USD'))
puts one_dollar.converted_to(CurrencyType.find('GBP')) # 0.80
```
Ai đó có thể có thể tìm thấy lỗi một cách hợp pháp với các chi tiết về logic chuyển đổi tiền tệ của tôi (một lĩnh vực mà tôi không có kinh nghiệm) nhưng hy vọng rằng sự vượt trội về mặt khái niệm của phương pháp của tôi đối với phương pháp `MoneyManager` là rõ ràng. Một giá trị tiền tệ rõ ràng là một điều có thật trong thế giới thực, và một loại tiền tệ cũng vậy và tỷ giá hối đoái cũng vậy. Những thứ như `MoneyManager`, `MoneyExchanger` và `ExchangeRateGetter` rõ ràng chỉ là bị chiếm đoạt. Các đối tượng sau này (một lần nữa thực sự chỉ là các bộ sưu tập hoặc procedural code) có thể sẽ thuộc danh mục mà Martin Fowler gọi là [anemic domain model.](https://martinfowler.com/bliki/AnemicDomainModel.html)

Running qua một ví dụ cuối cùng, một service object `RegisterUser` mà tôi tìm thấy trên bài đăng này.

### User registration example
```
class RegisterUser
  def initialize(user)
    @user = user
  end
  def execute
    return nil unless @user.save
    send_welcome_email
    notify_slack
    if @user.admin?
      log_new_admin
    else
      log_new_user
    end
    @user
  end

  # private methods
end
```
Không có nhu cầu  `RegisterUser` service cho mục đích đặc biệt này. Có một khái niệm trong domain model về đăng ký người dùng. Giống như cách gem Devise có tên các controllers như [RegistrationsController](https://github.com/plataformatec/devise/blob/master/app/controllers/devise/registrations_controller.rb), [SessionsController](https://github.com/plataformatec/devise/blob/master/app/controllers/devise/sessions_controller.rb), etc., chúng ta có thể coi đó là một khái niệm về đăng ký người dùng và chỉ cần tạo một cái mới

Nên đoạn code trên có thể thay bằng:

```
class UserRegistration
  def initialize(user)
    @user = user
  end

  def create
    return nil unless @user.save
    send_welcome_email
    notify_slack

    if @user.admin?
      log_new_admin
    else
      log_new_user
    end

    @user
  end
end
```
Bằng cách này, chúng tôi không làm lộn xộn đối tượng `User` chính cũng như không tạo đối tượng `RegisterUser` gây khó hiểu.

## Gợi ý đọc thêm
### Enough With the Service Objects Already
Tôi thực sự rất thích và đồng ý với bài viết của Avdi Grimm: [Enough With the Service Objects Already](https://avdi.codes/service-objects/). Bài đăng trên Avdi đã giúp tôi nhận ra rằng hầu hết các service-objects chỉ là các hàm bao cho các đoạn code thực thi. Điều tôi muốn thêm vào là tôi nghĩ nó thường có thể cấu trúc lại code thực thi thành các đối tượng có ý nghĩa. Ví dụ, trong một đoạn code schedule  mà tôi đã viết gần đây, tôi có một khái niệm về `AvcellenceBlock` và một cơ chế để phát hiện xung đột giữa chúng. Thay vì sử dụng "obvious" có thể rõ ràng về việc tạo ra một `AvcellenceBlockConflictDetector`, tôi đã tạo một đối tượng có tên là `AvcellenceBlockPair` có thể được sử dụng như thế này: `AvcellenceBlockPair.new(a, b).conflict?`. Với tôi điều này đẹp hơn nhiều. Giống như ví dụ `UserRegistration` ở trên, khái niệm về `AvailabiltyBlockPair` là một thứ gì đó rõ ràng tồn tại trong domain, nhưng nó tồn tại trong domain nếu tôi cho là như vậy. Nó giống như vẽ một đường viền tùy ý xung quanh các chữ cái trong một tìm kiếm từ. Bất kỳ từ nào bạn có thể tìm thấy trên trang thực sự ở đó nếu bạn có thể khoanh tròn nó.

### Anemic Domain Model
Bài viết của Martin Fowler:  [Anemic Domain Model](https://martinfowler.com/bliki/AnemicDomainModel.html) đã giúp tôi nói rõ chính xác những gì xảy ra với các service object. Đoạn văn yêu thích của tôi từ bài báo là: Dị bản của anti-pattern này [Mô hình miền thiếu máu] là nó ngược lại với ý tưởng cơ bản của thiết kế hướng đối tượng; đó là kết hợp data và process  với nhau. 

### Don’t Create Objects That End With -ER
Nếu một object có đuôi dạng -er (ví dụ: Manager, Processor), thì đó có thể là một bản tóm tắt không hợp lệ.

### The Devise gem code
Tôi nghĩ rằng [gem Devise ](https://github.com/plataformatec/devise/tree/master/app/controllers/devise)thực hiện khá tốt việc tìm kiếm các khái niệm domain không rõ ràng và biến chúng thành các domain object hợp lý.

[Tài Liệu](https://www.codewithjason.com/rails-service-objects/)