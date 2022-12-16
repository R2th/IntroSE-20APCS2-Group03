# Design Patterns in Ruby - Structural Patterns - Decorator Pattern

## Intent
Decorator là một structural design pattern cho phép bạn gắn các hành vi mới vào các đối tượng bằng cách đặt các đối tượng này bên trong các đối tượng bao bọc đặc biệt có chứa các hành vi đó.

![](https://images.viblo.asia/db3418fb-640e-43eb-b4c3-01d8464eb64d.png)

## Problem
Hãy tưởng tượng rằng bạn làm việc trên thư viện thông báo cho phép các chương trình khác thông báo cho người dùng của họ về các sự kiện quan trọng.

Phiên bản ban đầu của thư viện dựa trên lớp  `Notifier` chỉ có một vài trường, hàm tạo và một phương thức `send` duy nhất. Phương thức này có thể chấp nhận một đối số tin nhắn từ một khách hàng và gửi tin nhắn đến một danh sách các email . Ứng dụng khách có nghĩa vụ phải tạo và định cấu hình đối tượng `notifier` một lần, sau đó sử dụng nó mỗi khi có chuyện :heart_eyes: .

![](https://images.viblo.asia/f35209cd-3b02-4465-9965-c25dc74f4b98.png)

At some point, you realize that users of the library expect more than just email notifications. Many of them would like to receive an SMS about critical issues. Others would like to be notified on Facebook and, of course, the corporate users would love to get Slack notifications.

Tuy nhiên bạn nhận ra rằng người dùng của thư viện mong đợi nhiều hơn là chỉ thông báo qua email. Nhiều người trong số họ muốn nhận được một tin nhắn SMS về các vấn đề quan trọng. Những người khác muốn được thông báo trên Facebook và tất nhiên, người dùng doanh nghiệp rất thích nhận thông báo qua Slack. 

![](https://images.viblo.asia/08c3d927-8551-4599-96cd-399202924655.png)

Bạn đã mở rộng lớp `Notifier`  và đặt các phương thức thông báo bổ sung vào các lớp con mới. Bây giờ khách hàng có nghĩa vụ khởi tạo lớp thông báo mong muốn và sử dụng nó cho tất cả các thông báo tiếp theo.

Nhưng sau đó có người hỏi bạn, Tại sao bạn có thể sử dụng một số loại thông báo cùng một lúc? Nếu ngôi nhà của bạn bị cháy, bạn có thể muốn được thông báo qua mọi kênh.

Bạn cố gắng giải quyết vấn đề đó bằng cách tạo các lớp con đặc biệt kết hợp một số phương thức thông báo trong một lớp. Tuy nhiên, rõ ràng rằng cách tiếp cận này sẽ làm nở mã rất nhiều, không chỉ mã thư viện mà cả mã máy khách.

![](https://images.viblo.asia/15ce6e0b-0d5e-4bd5-adb8-d4d16e69e05b.png)

Bạn phải tìm một số cách khác để cấu trúc các lớp thông báo để tránh số lượng của các lớp con vô tình phá vỡ kỷ lục Guinness :wink: .

## Solution 

Extending một lớp là điều đầu tiên bạn nghĩ đến khi bạn cần thay đổi một hành vi đối tượng. Tuy nhiên, kế thừa có một số điều  quan trọng mà bạn cần phải biết.

* Bạn không thể thay đổi hành vi của một đối tượng hiện có trong thời gian chạy. Phải thay đối tượng bằng một đối tượng mới được tạo từ lớp con.
* Các lớp con có thể chỉ có một lớp cha. Hầu hết các ngôn ngữ không cho phép một lớp kế thừa các hành vi của nhiều lớp cùng một lúc.

Một trong những cách để khắc phục những điều này là sử dụng Aggregation hoặc Composition thay vì Kế thừa. Cả hai phương án đều hoạt động gần như giống nhau: một đối tượng có tham chiếu đến đối tượng khác và ủy thác cho nó một số công việc, trong khi với sự kế thừa, chính đối tượng phải thực hiện công việc đó.

![](https://images.viblo.asia/a97b6178-1cbb-4b41-acc9-0eb5755b86a3.png)

Wrapper là biệt danh thay thế cho mẫu Decorator thể hiện rõ ràng ý chính của mẫu. Một “wrapper” là một đối tượng có thể được liên kết với một số đối tượng “target”. wrapper chứa cùng một tập hợp các phương thức như target và ủy nhiệm cho target tất cả các yêu cầu mà nó nhận được. Tuy nhiên, wrapper có thể thay đổi kết quả bằng cách thực hiện một cái gì đó trước hoặc sau khi nó chuyển yêu cầu đến target.

Khi nào một wrapper đơn giản trở thành decorator thực sự? Như đã đề cập, wrapper có giao diện giống như đối tượng được bao bọc. Đó là lý do tại sao từ quan điểm của khách hàng, các đối tượng này giống hệt nhau. Làm cho  Wrapper chấp nhận bất kỳ đối tượng tham chiếu nào có giao diện đó. Điều này sẽ cho phép bạn bao phủ một đối tượng trong nhiều wrapper, thêm hành vi kết hợp của tất cả các wrapper vào nó.

Trong ví dụ về thông báo, hãy làm như sau:

![](https://images.viblo.asia/66020a00-df17-4cef-adf6-4209257be5fe.png)

Mã client sẽ cần bọc một đối tượng wrapper cơ bản vào một tập hợp các decorators phù hợp với các tùy chọn của client. Các đối tượng kết quả sẽ được cấu trúc như một ngăn xếp.

![](https://images.viblo.asia/1ab3abbf-0be8-475f-9e77-73703ecec55d.png)

decorator cuối cùng trong ngăn xếp sẽ là đối tượng mà máy khách thực sự làm việc cùng. Do tất cả các decorators đều có cùng một giao diện với notifier cơ sở, phần còn lại của mã máy khách không cần quan tâm nó làm việc  với đối tượng notifier hay một đối tượng notifier được trang trí(decorator).

Chúng ta có thể áp dụng cách tiếp cận tương tự cho các hành vi khác như định dạng tin nhắn hoặc soạn danh sách người nhận. Khách hàng có thể trang trí đối tượng với bất kỳ trang trí tùy chỉnh nào, miễn là họ theo cùng một giao diện như những người khác.

## Real-World Analogy

![](https://images.viblo.asia/46046260-dba8-4bad-81bf-24a593cee891.png)

Mặc quần áo là một ví dụ về việc sử dụng decorators. Khi bạn lạnh, bạn quấn mình trong chiếc áo len. Nếu bạn vẫn còn lạnh với áo len, bạn có thể mặc áo khoác bên trên. Nếu trời mưa, bạn có thể mặc áo mưa. Tất cả các sản phẩm may mặc này đều mở rộng hành vi cơ bản của bạn nhưng lại là một phần của bạn, và bạn có thể dễ dàng cởi bỏ bất kỳ bộ quần áo nào bất cứ khi nào bạn không cần.

## Structure
![](https://images.viblo.asia/9b9dc766-af07-433b-b870-71e7a7f781c0.png)

1. **Component** khai báo giao diện chung cho cả các `wrappers` và các đối tượng `wrapped`.
2. **Concrete Component** là một lớp của các đối tượng `wrapped`. Nó xác định hành vi cơ bản, có thể được thay đổi bởi các `decorators`.
3. **Base Decorator** có một trường để tham chiếu một đối tượng `wrapped`. Phải được khai báo với `component interface` để nó có thể chứa cả các `concrete components` và `decorators`. `base decorator` ủy thác tất cả các hoạt động cho đối tượng `wrapped`.
4. **Concrete Decorators** xác định các hành vi bổ sung có thể được thêm vào các `components` một cách linh hoạt. `Concrete decorators ` ghi đè các phương thức của `base decorator` và thực hiện hành vi của chúng trước hoặc sau khi gọi phương thức cha.
5.  **Client** có thể bọc các `components` trong nhiều lớp `decorators`, miễn là nó hoạt động với tất cả các đối tượng thông qua `component interface`.

##  Applicability
*  Sử dụng Decorator pattern khi bạn cần có khả năng gán các hành vi bổ sung cho các đối tượng trong thời gian chạy mà không cần thay đổi mã sử dụng các đối tượng này.
  
*   Sử dụng mô hình khi khó hoặc không thể mở rộng một hành vi đối tượng bằng tính kế thừa.
  
##   How to Implement

1. Đảm bảo rằng tên miền doanh nghiệp của bạn có thể được biểu diễn dưới dạng một thành phần chính với nhiều lớp tùy chọn trên nó.
2. Chỉ ra phương thức nào là phổ biến cho cả thành phần chính và các lớp tùy chọn. Tạo một `component interface` và khai báo các phương thức đó.
3. Tạo một lớp `concrete component` và xác định hành vi cơ sở trong nó.
4. Tạo một lớp `base decorator`. Nó nên có một trường để lưu trữ một tham chiếu đến một đối tượng `wrapped`. Trường phải được khai báo với kiểu là component interface để cho phép liên kết với `concrete components` cũng như `decorators`. `base decorator` phải ủy thác tất cả các công việc cho đối tượng `wrapped`.
5. Hãy chắc chắn rằng tất cả các lớp thực hiện `component interface`.
6. Tạo `concrete decorators` bằng cách extend `base decorator`. Một `concrete decorator` phải thực hiện hành vi của nó trước hoặc sau khi gọi phương thức cha (luôn luôn ủy nhiệm cho đối tượng `wrapped`).
7. Mã client phải chịu trách nhiệm tạo `decorators` và soạn chúng theo cách client cần.


##  Decorator in Ruby

>  main.rb: 
>  
```ruby
# base Component interface xác định các hoạt động có thể được thay đổi bởi các bộ điều khiển.
class Component
  # @return [String]
  def operation
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end

# Concrete Components cung cấp triển khai mặc định của các hoạt động. Có thể có một số biến thể của các lớp này.
class ConcreteComponent < Component
  # @return [String]
  def operation
    'ConcreteComponent'
  end
end

# Lớp base Decorator tuân theo cùng giao diện với các components khác.
class Decorator < Component
  attr_accessor :component

  # @param [Component] component
  def initialize(component)
    @component = component
  end

  # The Decorator delegates all work to the wrapped component.
  def operation
    @component.operation
  end
end


# Concrete Decorators gọi wrapped và thay đổi kết quả của nó theo một cách nào đó.
class ConcreteDecoratorA < Decorator
  def operation
    "ConcreteDecoratorA(#{@component.operation})"
  end
end

# Decorators có thể thực hiện hành vi của họ trước hoặc sau khi gọi đến một đối tượng wrapped.
class ConcreteDecoratorB < Decorator
  # @return [String]
  def operation
    "ConcreteDecoratorB(#{@component.operation})"
  end
end

# Mã client hoạt động với tất cả các đối tượng sử dụng Component interface. Bằng cách này, nó có thể độc lập với các lớp cụ thể của các components mà nó làm việc với.
def client_code(component)
  # ...

  print "RESULT: #{component.operation}"

  # ...
end


simple = ConcreteComponent.new
puts 'Client: I\'ve got a simple component:'
client_code(simple)
puts "\n\n"

# Lưu ý cách decorators có thể bao bọc không chỉ các decoratorsn đơn giản mà cả các decorators khác.
decorator1 = ConcreteDecoratorA.new(simple)decorators
decorator2 = ConcreteDecoratorB.new(decorator1)
puts 'Client: Now I\'ve got a decorated component:'
client_code(decorator2)
```

> output.txt: 
> 

```
Client: I've got a simple component:
RESULT: ConcreteComponent

Client: Now I've got a decorated component:
RESULT: ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))
```
## Tham khảo
[refactoring.guru](https://refactoring.guru/design-patterns/decorator)