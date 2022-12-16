Trong bài viết này, mình sẽ giải thích phương thức `delegate` của Ruby on Rails - nó là gì và sử dụng nó như thế nào.

![](https://images.viblo.asia/1f95965a-5734-47b0-9d37-ac02f10db653.jpg)

## Delegate là gì ?

Theo tài liệu [API doc [1]](https://apidock.com/rails/Module/delegatehttps://apidock.com/rails/Module/delegate) - nó "Cung cấp phương thức class `delegate` để dễ dàng định nghĩa các phương thức public của đối tượng ánh xạ đến phương thức của object khác một cách trực tiếp ". Cú pháp của nó như sau:

`delegate(*methods, to: nil, prefix: nil, allow_nil: nil) public`

Phương thức lớp `delegate` này sẽ ánh xạ tập hợp các `*methods` thuộc về object được định nghĩa.

## Tại sao lại sử dụng nó ?

Theo [Law of Demeter [2]](https://en.wikipedia.org/wiki/Law_of_Demeter) hoặc các nguyên tắc về thiết kế phần mềm thì Wikipedia tóm tắt như sau:

- Mỗi đơn vị chỉ nên có kiến thức hạn chế về các đơn vị khác: chỉ các đơn vị "chặt chẽ" liên quan đến đơn vị hiện tại.
- Mỗi đơn vị chỉ nên nói chuyện với bạn bè của mình; đừng nói chuyện với người lạ.
- Chỉ nói chuyện với bạn bè quan trọng của bạn.

Phương thức `delegate` trong Rails giúp thực principles trên bằng cách chỉ hiển thị các phương thức cần thiết để chứa các đối tượng, do đó, giúp cho chúng dễ dàng truy cập hơn.

## Sử dụng chúng như thế nào ?

Bây giờ, chúng ta cùng đi qua các ví dụ để hiểu nó hơn nhé.

Hãy giả sử chúng tôi có hai model ActiveRecord có mối quan hệ `has_many` như dưới đây:

```
class Event < ActiveRecord::Base
  has_many :performances
end
class Performance < ActiveRecord::Base
  belongs_to :event
end
```

Chúng ta sẽ khởi chạy `rails console` và kiểm tra các member của hai model này:

```
[3] pry(main)> Event.column_names
=> [“id”, “name”, “description”, “image_url”, “created_at”, “updated_at”]
[4] pry(main)> Performance.column_names
=> [“id”, “event_id”, “start_time”, “end_time”, “created_at”, “updated_at”]
```

Bây giờ để truy cập đối tượng name và description của event từ một object performance, chúng ta thường có thể làm như sau:

```
performance = Performance.find(459352183)
[8] pry(main)> performance.event.name
=> “Bleacher Bums”
[9] pry(main)> performance.event.description
=> “A Play About Bleacher Bums”
```

Vì vậy, chúng tôi đang điều hướng thông qua mối quan hệ :event như ở trên.

Nhưng nếu chúng ta sử dụng phương thức `delegate`, chúng ta có thể hiển thị các phương thức name và description thuận tiện hơn. Hãy để cải tiến model `Performance` của chúng ta để làm được điều đó.

```
class Performance < ApplicationRecord
  belongs_to :event
  
  delegate :name, :description, to: :event
end
```

Bây giờ chúng ta có thể hiển thị phương thức `name` và `description`của đối tượng event như thể chúng thuộc về đối tượng performace vậy. Từ rails console, bây giờ chúng ta có thể truy cập name và description của event như bên dưới:

```
[10] pry(main)> performance.name
=> “Bleacher Bums”
[11] pry(main)> performance.description
=> “A Play About Bleacher Bums”
```

Chúng ta không cần phải thông qua mối quan hệ với :event nữa.

Nhưng nếu model Performance tự nó có một phương thức name thì sao? Đây là lúc chúng ta sử dụng option `prefix`. Trong trường hợp này, chúng ta có thể cập nhật lại model Performance như sau:

```
class Performance < ApplicationRecord 
  belongs_to :event

  delegate :name, :description, to: :event, prefix: true
  def name
    "performance"
  end
end
```

Nếu chúng ta chỉ định `prefix: true`, chúng ta có thể truy cập name của event và performance như sau:

```
[21] pry(main)> performance.name
=> “performance”
[22] pry(main)> performance.event_name
=> “Bleacher Bums”
```

Chúng ta cũng có thể thêm một bước để chỉ định prefix cụ thể theo ý chúng ta muốn như dưới đây:

```
class Performance < ApplicationRecord
  belongs_to :event
  
  delegate :name, :description, to: :event, prefix: :show
end
```

Với prefix được chỉ định cụ thể, chúng ta có thể truy cập name và description của event như sau:

```
[25] pry(main)> performance.show_name
=> “Bleacher Bums”
[26] pry(main)> performance.show_description
=> “A Play About Bleacher Bums”
```

Trong trường hợp, nếu object được chỉ định là  nil, chúng ta sẽ nhận được một ngoại lệ như dưới đây:

```
class Performance < ApplicationRecord
 
  belongs_to :event

  delegate :name, :description, to: :event
end
```

```
[33] pry(main)> Performance.new.event
=> nil
[34] pry(main)> Performance.new.name
Module::DelegationError: Performance#name delegated to event.name, but event is nil: #<Performance id: nil, event_id: nil, start_time: nil, end_time: nil, created_at: nil, updated_at: nil>
```

Chúng ta nhận được Module :: DelegationError. Để khắc phục lỗi này và thay vào đó nhận được response là nil, tôi có thể sử dụng đối số `allow_nil` như bên dưới:

```
class Performance < ApplicationRecord
 
  belongs_to :event
  
  delegate :name, :description, to: :event, allow_nil: true
end
```

```
[36] pry(main)> Performance.new.name
=> nil
```

Một lưu ý, nếu đối tượng nhận là not nil nhưng phương thức không tồn tại, chúng ta sẽ nhận được NoMethodError như dưới đây:

```
class Performance < ApplicationRecord

  belongs_to :event

  delegate :name, :description, :time, to: :event, allow_nil: true
end
```

```
[43] pry(main)> performance.time
NoMethodError: undefined method `time’ for #<Event:0x007fd776780730>
```

### Một ví dụ thực tế hơn

```
class StripeToken

  attr_accessor :credit_card_number, :expiration_month, :expiration_year, :cvc

  def initialize(credit_card_number:, expiration_month:, expiration_year:, cvc:)
    @credit_card_number = credit_card_number
    @expiration_month = expiration_month
    @expiration_year = expiration_year
    @cvc = cvc
  end

  def token
    @token ||= Stripe::Token.create(
      card: {
        number: credit_card_number, exp_month: expiration_month,
        exp_year: expiration_year, cvc: cvc})
  end

  delegate :id, to: :token

  def to_s
    "STRIPE TOKEN: #{id}"
  end

  def inspect
    "STRIPE TOKEN #{id}"
  end
end
```

Ở đây, tôi đang cố gắng tạo một đối tượng của lớp StripToken. `delegate` chuyển đổi id thành token.id:

```
[102] pry(main)> StripeToken.new(credit_card_number: “424242424242”, expiration_month: 12, expiration_year: 2020, cvc: 111).id
=> “tok_1GMRoBBN4gTWM2EPi6odYKKA”
```

`delegate` id cung cấp một cách hay để truy cập trực tiếp vào token.id. Như đã lưu ý từ đoạn mã trên, chúng ta có thể xác định các phương thức thuận tiện và kiểm tra các phương thức sử dụng delegate id một cách dễ dàng:

```
[103] pry(main)> StripeToken.new(credit_card_number: “424242424242”, expiration_month: 12, expiration_year: 2020, cvc: 111).to_s
=> “STRIPE TOKEN: tok_1GMRqEBN4gTWM2EPBdehwfuD”
[104] pry(main)> StripeToken.new(credit_card_number: “424242424242”, expiration_month: 12, expiration_year: 2020, cvc: 111).inspect
=> “STRIPE TOKEN tok_1GMRqKBN4gTWM2EPUQBcp55o”
```

Trong bài viết, mình đã cố gắng làm rõ phương thức `delegate` trong ROR và cách để các bạn có thể đưa nó vào sử dụng một cách dễ dàng.

### Nguồn tham khảo

1. https://apidock.com/rails/Module/delegatehttps://apidock.com/rails/Module/delegate
2. http://en.wikipedia.org/wiki/Law_of_Demeter
3. https://www.amazon.com/Take-My-Money-Accepting-Payments/dp/1680501992
4. https://itnext.io/understanding-delegate-in-ruby-on-rails-i-wish-i-knew-before-5edd341bad47