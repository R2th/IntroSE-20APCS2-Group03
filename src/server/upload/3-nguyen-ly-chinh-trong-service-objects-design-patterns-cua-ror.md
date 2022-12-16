# 3 nguyên lý chính trong Service Objects Design Patterns của RoR

Service Objects là một mô hình để làm giảm tính xử lý ở Controller và Models trong Ruby on Rails(RoR). 

Một Service Object là một PORO(Plain old Ruby Object), có nghĩa là tách các vấn dề có tính nghiệp vụ vào một thành các Class, methods để để hỗ trợ việc quản lý. 

## Nguyên lý thứ nhất: Chỉ có một public method

Service object được sinh ra để thực hiện một công việc duy nhất, vì vậy class/object chỉ nên có một method public để cung cấp cho đối tượng.
Chúng ta thường thấy tên method public trong service object là call, perform, run...

Ý tưởng chính của nguyên lý này là việc bạn hạn chế được method được sử dụng trong đối tượng của bạn khi được dùng đến ở controller hoặc model.

Tuy nhiên, để khởi tạo một đối tượng trong service object hiện nay cũng được chia ra làm hai xu hướng
Xu hướng thứ nhât: 

```ruby
#services/thing_service.rb
class ThingService
  
  def initialize(param1)
    @param1 = param1
  end
  def call
    private_method
  end
  private
  attr_reader :param1
  
  def private_method
  	# coding
  end
end
### and calling by ThingService.new(param1).call
```

Xu hướng thứ hai: 

```ruby
#services/thing_service.rb
class ThingService
  
  def self.call(param1)
    new(param1).call
  end
  
  def call
    private_method
  end
  private
  def initialize(param1)
    @param1 = param1
  end
  
  attr_reader :param1

  def private_method
  	# coding
  end
end
### and calling by ThingService.call(param1)
```

Cả 2 xu hướng trên đều đem lại mục đích chung của service object và cũng chỉ có một method public. Cách thứ 2 được dùng 1 cách ngăn gọn hơn, giúp cho code đỡ dối măt. Tuy nhiên đa số người dùng ruby thì đều lựa chọn cách thứ nhất vì nó phù hợp với syntax của ruby.

Một lợi ích khi sử dụng một method public nhất quán ở đây giúp cho việc dễ dàng cho việc maintain dự án sau này. Khi mà dự án của bạn phát triển lớn và service được gọi ở nhiều chỗ khác nhau trong controller, model và code cũ không đáp ứng được chúng ta cần sửa chữa hoặc thay đổi service khác để phục vụ yêu cầu mới này. Khi đó bạn sẽ giảm thiểu được thời gian coding và giảm thiểu những rủi ro khi code.

## Nguyên lý thứ hai: Quản lý các thuộc tính, đối tượng một cách rõ ràng

Nguyên lý của phần này thì tùy thuộc vào sự tổ chức thuộc tính của từng project.

Thường thì chúng ta có

1. Khởi tạo thuộc tính đồng thời cùng lúc với khởi tạo đối tượng.
2. Khởi tạo đôi tượng sau khi gọi tới public method.

Với cách thứ nhất: thì chúng ta truyền đối số trong khi khởi tạo là một đối tượng trước đó mà khi vào trong service chúng ta có thể sử dụng ngay.

```ruby
#services/thing_service.rb
class ThingService
  
  def initialize(param1)
    @param1 = param1
  end
  def call
    private_method
  end
  private
  attr_reader :param1
  
  def private_method
  	# coding
  end
end

### param1 = OtherService.new(param).call
### ThingService.new(param1).call
```

Với cách này chúng ta khó mà quản lý được thuộc tính bên trong service object, tuy nhiên chúng ta sẽ không cần quan tâm nhiều tới thuộc tính chính dẫn tới việc linh hoạt với mọi đối tượng được truyền vào.

Với cách thứ hai: thì chúng ta truyền đối số trong khi khởi tạo là một đối tượng sau khi vào trong service

```ruby
#services/thing_service.rb
class ThingService
  
  def initialize(param1)
    @param1 = param1
  end
  def call
    result = other_service.call
    private_method(result)
  end
  private
  attr_reader :param1
  def other_service
    @other_service ||= OtherService.new(param1)
  end
...
end

### ThingService.new(param).call
```

Với cách này thì chúng ta dễ dàng quản lý thuộc tính bên trong servie object hơn và dễ dàng thay dổi thuộc tính 1 cách linh hoạt, tuy nhiên có thể dẫn tới tốn tài nguyên sử dụng.

## Nguyên lý thứ ba: trả về kết quả một cách rõ ràng, dễ hiểu

Chúng ta thường xuyên trả về một giá trị boolean trong Service object, tuy nhiên điều đó là không thực sự tốt trong code của bạn. Trong khi đó chúng ta thường thấy rằng trong ActiveRecord  với những hàm update/save đều trả về một đối tượng.

Hãy nghĩ rằng khi thực hiện một tác vụ thì service object không chỉ trả về hai giá trị `1. success` vs `2. Failure` mà bên cạnh đó chúng ta có thể có những ngoại lệ.

Tại sao tôi lại mong muốn bạn nên trả về một cách rõ ràng nhất kết quả của service?

Khi chúng ta sử dụng service object trong controller tuy nhiên nếu như serive của bạn thực hiện tác vụ không thành công mà bạn chỉ trả về và thông báo cho người dùng là `Failure` khi đó người dùng sẽ không biết được họ sai ở đâu?. Hoặc một trường hợp nữa là dev khi debug cũng chỉ có thể biết được rằng bạn đang sai code ở trong service object mà không biết tại sao sai làm mất thời gian tìm hiểu sâu vào trong...

Tuy nhiên làm thế nào để trả về một đối tượng rõ ràng? Phần này theo mình thì bạn có thể thử `Struct` hoặc `OpenStruct `

```ruby
#services/thing_service.rb
class ThingService
  
  def initialize(param1)
    @param1 = param1
  end
  def call
    private_method
  end
  private
  attr_reader :param1
  def private_method
    things = do_something(param1)
  rescue SomeSpecificException => exception
    OpenStruct(success?: false, things: nil, error: exception.message)
  else
    OpenStruct(success?: true, things: thingserror: nil)
  end
end
```


## Kết luận

Service Object chỉ là một design pattern được xây dựng nhằm giảm logic trong model và controller vì thế nó cũng có một số quy tắc nhất định để tránh việc hiểu nhầm giữa các developer vì vậy bạn cần hiểu rõ cách sử dụng cũng như nguyên lý cơ bản để tránh nhầm lần giữa các design patten khác. 
Bài này mình tham khảo tại https://hackernoon.com/the-3-tenets-of-service-objects-c936b891b3c2 .