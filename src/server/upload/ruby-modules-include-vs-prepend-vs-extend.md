Mô-đun là một trong những tính năng thú vị nhất của Ruby. Bạn có thể sử dụng chúng để đính kèm hành vi cụ thể trên các lớp của bạn và để tổ chức code của bạn bằng cách sử dụng thành phần thay vì kế thừa. Đây là một ví dụ đơn giản:
```
module Logging
  def log(level, message)
    File.open("log.txt", "a") do |f|
      f.write "#{level}: #{message}"
    end
  end
end

class Service
  include Logging
  
  def do_something
    begin
      # do something
    rescue StandardError => e
      log :error, e.message
    end
  end
end
```

Ngoài ra, rất nhiều **gem** sử dụng các mô-đun để tổ chức code của chúng và dễ dàng tích hợp vào ứng dụng của bạn. Ví dụ, gem Sidekiq cung cấp mô-đun Sidekiq :: Worker để đính kèm hành vi với các lớp tùy chỉnh và sử dụng chúng làm các thành phần workers bất đồng bộ.
```
class MyWorker
  include Sidekiq::Worker
  
  def perform(args)
    # do some work
  end
end

MyWorker.perform_async {something: "useful"}
```


Mặc dù **bao gồm** là cách phổ biến nhất để nhập code bên ngoài vào một lớp, Ruby cũng cung cấp hai cách khác để đạt được điều đó: **extend** và **prepend**. Tuy nhiên, họ không có hành vi tương tự, và những khác biệt này thường bị các developers Ruby hiểu lầm.
Để hiểu cách sử dụng chúng, trước tiên chúng ta phải có cái nhìn sâu hơn về cách Ruby giải quyết các phương thức để thực thi trong thời gian chạy, sử dụng thứ gọi là **ancestors chain**.
## The Ancestors chain
Khi một lớp Ruby được tạo, nó chứa một danh sách các tên không đổi là **ancestors chain** của nó. Chúng là tất cả các lớp mà lớp kế thừa và các mô-đun chúng bao gồm. Ví dụ: bằng cách gọi **ancestors chain**  trên lớp String, chúng ta có được danh sách **ancestors chain** của nó:
```
> String.ancestors
=> [String, Comparable, Object, PP::ObjectMixin, Kernel, BasicObject]
```

Chúng ta có thể thấy ở đầu chuỗi BasicObject, là gốc của hệ thống phân cấp đối tượng Ruby, và Object, siêu lớp của tất cả các lớp, cũng bao gồm mô-đun Kernel.

![](https://images.viblo.asia/698b8a54-450a-46ac-8b51-5c2fe41c25f4.jpeg)

Khi chúng ta gọi **method** object_id trên một **String Instance** (hoặc bất kỳ lớp nào khác), Ruby sẽ tra cứu qua **ancestors chain** của lớp để tìm **method** object_id và cuối cùng sẽ tìm thấy nó được định nghĩa trên lớp **Object**.
Khi gọi một **method** không được xác định ở bất cứ đâu, Ruby sẽ không tìm thấy **method** trong bất kỳ lớp hoặc mô-đun nào trong chuỗi **ancestors chain** và sẽ kết thúc việc gọi **method_missing**  của **BasicObject**, tạo cơ hội cuối cùng cho developer thực thi **code fallback** .
Biết những điều cơ bản về **ancestors chain** của các lớp Ruby, bây giờ chúng ta có thể xem xét các cách khác nhau để nhập các mô-đun.
## Include
**Include** là cách được sử dụng nhiều nhất và cách đơn giản nhất để nhập mã mô-đun. Khi gọi nó theo định nghĩa lớp, Ruby sẽ chèn mô-đun vào chuỗi **ancestors chain** của lớp, ngay sau **superclass** của nó. Quay trở lại ví dụ đầu tiên của chúng ta:
```
module Logging
  def log(level, message)
    File.open("log.txt", "a") do |f|
      f.write "#{level}: #{message}"
    end
  end
end

class Service
  include Logging
  
  def do_something
    begin
      # do something
    rescue StandardError => e
      log :error, e.message
    end
  end
end
```
Nếu chúng ta nhìn vào **ancestors chain** của lớp **Service**, chúng ta có thể thấy rằng mô-đun **Logging** chỉ hiện diện giữa chính lớp đó và **superclass** trực tiếp của nó, đó là Object.
```
> Service.ancestors
=> [Service, Logging, Object, ...]
```
Đó là lý do tại sao chúng ta có thể gọi các **method** được định nghĩa trong mô-đun trên các **instance** của lớp. Ruby, không tìm thấy các **method** này trên lớp, sẽ đi lên một bước trên chuỗi để tìm chúng trên mô-đun.

![](https://images.viblo.asia/1cf70e30-41dc-4f7c-9361-15e3e080a822.jpeg)

Ngoài ra, điều đáng chú ý là, khi **include** hai mô-đun trở lên, cái **include** cuối cùng sẽ luôn được chèn lại ngay giữa lớp và phần còn lại của chuỗi:

```
module Logging
  def log(message)
    # log in a file
  end
end

module Debug
  def log(message)
    # debug output
  end
end

class Service
  include Logging
  include Debug
end

p Service.ancestors # [Service, Debug, Logging, Object, ...]
```

Vì vậy, trong trường hợp có xung đột phương thức như trong ví dụ này, mô-đun đầu tiên phản hồi trong chuỗi **ancestors chain** sẽ là mô-đun bao gồm cuối cùng, Debug.

## Extend
Mặt khác, sử dụng **extend** trên một lớp sẽ thực sự nhập các **method** mô-đun làm **class method**. Nếu chúng ta đã sử dụng **extend** thay vì **include** trong ví dụ của mình, mô-đun **Logging** sẽ không được chèn vào chuỗi **ancestors chain** của lớp **Service**. Vì vậy, chúng tôi không thể gọi **method** login trên bất kỳ **instance Service** nào.

Thay vào đó, Ruby sẽ chèn mô-đun vào chuỗi**ancestors chain** của lớp **singleton** của lớp** Service**. Lớp **singleton** này (được đặt tên là #Service) thực sự là nơi các phương thức dịch vụ của lớp được định nghĩa. Các phương thức của mô-đun **Logging** sẽ có sẵn như là các **method Service** của lớp.

![](https://images.viblo.asia/4b913153-3585-473b-adca-be401a6eff5e.jpeg)

Sau đó, chúng ta có thể đã gọi **method** như thế này:
```
Service.log :info, "Something happened"
```

Thông thường, bạn sẽ muốn sử dụng một mô-đun để nhập các **instance method** trên một lớp, nhưng đồng thời để xác định các **class method**. Thông thường, bạn sẽ phải sử dụng hai mô-đun khác nhau, một mô-đun bao gồm để **included** các **instace method** và một mô-đun khác có **included** để định nghĩa các **method class**.

Một thành ngữ phổ biến để đạt được điều đó bằng cách sử dụng một mô-đun duy nhất là sử dụng phương thức hook kèm theo của Mô-đun, để nhập các **class method** khi chạy:
```
module Logging
  module ClassMethods
    def logging_enabled?
      true
    end
  end
  
  def self.included(base)
    base.extend(ClassMethods)
  end
  
  def log(level, message)
    # ...
  end
end
```

Bây giờ, khi chúng ta đưa mô-đun vào lớp **Service**, các phương thức mô-đun sẽ được nhập dưới dạng các **instace method** của lớp. **Included method** cũng được gọi, với lớp bao gồm làm đối số. Sau đó, chúng ta có thể gọi **extend** trên nó để nhập các phương thức của mô hình con **ClassMethods** làm **class method**. Vòng đời object đã hoàn thành.

## Prepend
Có sẵn kể từ Ruby 2, **prepend** ít được biết đến bởi Rubyists hơn hai người bạn khác của nó. Nó thực sự hoạt động như **include**, ngoại trừ việc thay vì chèn mô-đun giữa lớp và **superclass** của nó trong chuỗi, nó sẽ chèn nó ở dưới cùng của chuỗi, ngay cả trước chính lớp đó.
Điều đó có nghĩa là khi gọi một **method** trên một **instance method**, Ruby sẽ xem xét các phương thức mô-đun trước khi nhìn vào lớp. Sự khác biệt về hành vi này cho phép bạn trang trí các lớp hiện có bằng các mô-đun và triển khai hệ thống logic xung quanh logic:
```
module ServiceDebugger
  def run(args)
    puts "Service run start: #{args.inspect}"
    result = super
    puts "Service run finished: #{result}" 
  end
end

class Service
  prepend ServiceDebugger
  
  # perform some real work
  def run(args)
    args.each do |arg|
      sleep 1
    end
    {result: "ok"}
  end
end
```
Sử dụng **prepend**, mô-đun **ServiceDebugger** hiện được chèn ở dưới cùng của chuỗi **ancestors chain**.
![](https://images.viblo.asia/a5258360-a57b-4bff-98eb-0636dc520044.jpeg)

Bạn có thể tự xác minh lại bằng cách gọi **Service.ancestors**:
```
> Service.ancestors
=> [ServiceDebugger, Service, Object, ...]
```

Việc gọi **run** trên một **instance Service** sẽ thực hiện trước tiên phương thức được xác định trong mô-đun **ServiceDebugger**. Chúng ta có thể sử dụng **super** để gọi cùng một phương thức trên **ancestor** trực tiếp lên chuỗi, chính là lớp **Service**. 

Cảm ơn bạn đã đọc.

Link tham khảo: https://medium.com/@leo_hetsch/ruby-modules-include-vs-prepend-vs-extend-f09837a5b073