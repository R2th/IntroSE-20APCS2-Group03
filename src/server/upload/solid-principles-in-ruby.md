Nếu bạn là người đã từng tham gia phát triển phần mềm, đặc biệt là khi làm việc với các `ngôn ngữ hướng đối tượng`, bạn có thể nghe nói về các `nguyên tắc thiết kế`. Rất khó để có thể kiểm soát tất cả mọi thứ, và thậm chí đôi khi việc đó là `không thể `. Đó là lý do tại sao, đặc biệt trong lĩnh vực phần mềm, bạn nên sử dụng các nguyên tắc này làm hướng dẫn, chứ không phải các quy tắc. Một trong những bộ nguyên tắc `thiết kế hướng đối tượng nổi tiếng` nhất được biết đến là SOLID.<br><br>
***Vậy, SOLID là gì?*** <br>
`SOLID` là một từ viết tắt được tạo ra bởi `Bob Martin` và `Michael Feathers` đầu những năm 2000, đề cập đến `5 nguyên tắc` cơ bản giúp các kỹ sư viết code có thể duy trì dễ dàng. <br>
Các nguyên tắc tạo nên từ các từ viết tắt như sau:
1. **S** - Single Responsibility Principle
2. **O** - Open/Closed Principle
3. **L** - Liskov Substitution Principle
4. **I** - Interface Segregation Principle
5. **D** - Dependency Inversion Principle

Những nguyên tắc giúp cho code sạch, dễ đọc, dễ mở rộng và bảo trì. Nghe có vẻ hay ho? Chúng ta hãy xem xét từng nguyên tắc này nhé.
### Single responsibility principle (SRP) - Đơn trách nhiệm
> Mỗi class chỉ nên có một trách nhiệm duy nhất và trách nhiệm đó phải được đóng gói hoàn toàn trong class. Chỉ có thể thay đổi class vì một lý do duy nhất.

***Tại sao mỗi class chỉ nên giữ một trách nhiệm duy nhất?*** <br>
Một class nếu giữ quá nhiều trách nhiệm sẽ trở nên rất cồng kềnh và phức tạp. Đặc biệt trong ngành CNTT, các requirement rất dễ thay đổi thường xuyên, dẫn tới việc phải thay đổi mã nguồn code. Nếu một class có quá nhiều trách nhiệm, quá phức tạp, việc thay đổi code sẽ rất khó khăn, tốn nhiều thời gian, còn dễ gây ảnh hưởng tới sự hoạt động của các module khác.<br><br>
Để hiểu rõ hơn, hãy xem ví dụ sau:
```ruby
class AuthenticatesUser
  def authenticate(email, password)
    if matches?(email, password)
     do_some_authentication
    else
      raise NotAllowedError
    end
  end

  private
  def matches?(email, password)
    user = find_from_db(:user, email)
    user.encrypted_password == encrypt(password)
  end
end
```
Class `AuthenticatesUser` chịu trách nhiệm xác thực `user` cũng như `email` và `password` có khớp với `email` và `password` trong cơ sở dữ liệu hay không. Nó đang làm `hai trách nhiệm`, và theo nguyên tắc `SRP` nó chỉ nên có một trách nhiệm.<br><br>
Có thể điều chỉnh lại như sau:
```ruby
class AuthenticatesUser
  def authenticate(email, password)
    if MatchesPasswords.new(email, password).matches?
     do_some_authentication
    else
      raise NotAllowedError
    end
  end
end

class MatchesPasswords
  def initialize(email, password)
     @email = email
     @password = password
  end

  def matches?
     user = find_from_db(:user, @email)
    user.encrypted_password == encrypt(@password)
  end
end
```
Tạo ra 2 class `AuthenticatesUser` và `MatchesPasswords` để thực hiện 2 nhiệm vụ là xác thực `User` và kiểm tra match `email` và `password` trong Database.<br>
Sử dụng kỹ thuật `tái cấu trúc` được gọi là `Extract Class` và sau đó sử dụng trên Class gốc đã có. Nó được gọi là hành vi chia sẻ thông qua `composition`.<br><br>
`Nguyên tắc SRP` có lẽ là nguyên tắc nổi tiếng nhất, nên tuân thủ nó hầu hết mọi lúc.
### Open/Closed Principle (OCP) - Nguyên tắc đóng/mở
> Một thực thể (class/module) nên được open để mở rộng khi có yêu cầu, nhưng close để sửa đổi. (open for extension but closed for modification).

***Điều đó có nghĩa là gì?*** <br>
Khi một class thực thi scope của các yêu cầu hiện tại, việc triển khai sẽ không cần phải thay đổi để đáp ứng các yêu cầu trong tương lai.<br><br>
Ví dụ,
```ruby
class Report
  def body
     generate_reporty_stuff
  end

  def print
     body.to_json
  end
end
```
Đoạn code trên vi phạm nguyên lý `OCP`, vì khi ta muốn thay đổi định dạng của `báo cáo` được in ra bởi `method print`, ta phải thay đổi code của class. Sửa lại đoạn code trên một chút:
```ruby
class Report
  def body
     generate_reporty_stuff
  end

  def print(formatter: JSONFormatter.new)
     formatter.format body
  end
end
```
Bằng cách này, việc thay đổi định dạng dễ dàng như:
```ruby
report = Report.new
report.print(formatter: XMLFormatter.new)
```
Đã mở rộng method mà `không` cần sửa đổi code. Và trong ví dụ trên đã sử dụng một kỹ thuật được gọi là `Dependency Injection`.
### Liskov Substitution Principle (LSP) - Thay thế Liskov
Nguyên tắc này chỉ áp dụng cho thừa kế.
> Các đối tượng của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình.
```ruby
class Animal
  def walk
     do_some_walkin
  end
end

class Cat < Animal
  def run
    run_like_a_cat
  end
end
```
Theo nguyên tắc `LSP`,  2 class phải có cùng `interface`, mà `Ruby` không có `abstract methods`, nên có thể sửa đoạn code trên như sau:
```ruby
  def walk
     do_some_walkin
  end

  def run
    raise NotImplementedError
  end
end

class Cat < Animal
  def run
    run_like_a_cat
  end
end
```
### Interface segregation principle (ISP) -  Phân tách Interface
>  Class không nên bị buộc phụ thuộc vào các interface mà nó không sử dụng.

Khi một `client` phụ thuộc vào một `class` có chứa các `interface` mà `client` không sử dụng, nhưng các `client khác` sử dụng, thì `client` đó sẽ bị ảnh hưởng bởi các thay đổi mà các `client khác` ép buộc vào `class`.<br><br>
Một ví dụ minh họa đơn giản, nếu bạn có một class có 2 clients sử dụng (2 objects sử dụng nó):
```ruby
class Car
  def open
  end

  def start_engine
  end

   def change_engine
   end
end

class Driver
  def drive
    @car.open
    @car.start_engine
  end
end

class Mechanic
  def do_stuff
    @car.change_engine
  end
end
```
Như bạn có thể thấy, class `Car` có `interface` được sử dụng một phần bởi cả `Drive` và `Mechanic`. Ta có thể cải thiện `interface` như sau:<br>
```ruby
class Car
  def open
  end

  def start_engine
  end
end

class CarInternals
   def change_engine
   end
end

class Driver
  def drive
    @car.open
    @car.start_engine
  end
end

class Mechanic
  def do_stuff
    @car_internals.change_engine
  end
end
```
Bằng cách `tách interface` thành `hai`, thực hiện những chức năng riêng, chúng ta đã tuân thủ nguyên tắc `ISP`.<br><br>
`ISP` được coi là nguyên lý `dễ hiểu nhất` của `SOLID`.
### Dependency Inversion Principle (DIP) - Đảo ngược dependency
> 1. Module cấp cao không nên phụ thuộc vào các module cấp thấp. Cả 2 nên phụ thuộc vào abstractions.
> 2. Interface (abstraction) không nên phụ thuộc vào chi tiết mà ngược lại. Các class giao tiếp với nhau thông qua các interface mà không phải thông qua implementation.

Với cách code thông thường, các `module` cấp cao sẽ `gọi` các `module` cấp thấp. `Module` cấp cao sẽ `phụ thuộc` vào `module` cấp thấp, điều đó tạo ra các `dependency`. Khi `module` cấp thấp thay đổi, `module` cấp cao phải thay đổi theo. Một `thay đổi` sẽ kéo theo hàng loạt thay đổi, giảm khả năng bảo trì của code.<br><br>
Nếu tuân theo nguyên tắc `DIP`, các `module` cấp thấp và cấp cao đều phụ thuộc vào một `interface` không đổi. Do đó, có thể dễ dàng thay thế, sửa đổi `module` cấp thấp mà không ảnh hưởng gì tới `module` cấp cao.<br><br>
Hãy quay trở lại ví dụ đầu tiên về `OCP` và thay đổi nó một chút:
```ruby
class Report
  def body
     generate_reporty_stuff
  end

  def print
     JSONFormatter.new.format(body)
  end
end

class JSONFormatter
  def format(body)
     ...
  end
end
```
Bây giờ có một class `JSONFormatter`, nhưng đã `hardcode` nó trong class `Report`, do đó tạo ra một `dependency` từ `Report` vào `JSONFormatter`. Vì `Report` là `module` cấp cao hơn so với `JSONFormatter`, do đó nó đã vi phạm nguyên tắc `DIP`.<br><br>
Chúng ta có thể giải quyết nó giống như cách chúng ta đã giải quyết trong vấn đề với `OCP`, dùng `dependency injection`:
```ruby
class Report
  def body
     generate_reporty_stuff
  end

  def print(formatter: JSONFormatter.new)
     formatter.format body
  end
end
```
Bằng cách này, Class `Report` không còn phụ thuộc vào `JSONFormatter` và có thể sử dụng bất kỳ kiểu định dạng nào khi gọi đến `method format` (được gọi là `duck typing`).<br><br>
Một lưu ý khác là một lần nữa chúng ta lại sử dụng `dependency injection` để giải quyết vấn đề. Kỹ thuật này là một kỹ thuật rất mạnh khi mục tiêu của chúng tôi là việc `tách` các đối tượng, và mặc dù nó có cùng tên viết tắt với `DIP` (vs `dependency injection pattern`), nhưng chúng hoàn toàn là hai khái niệm khác nhau.<br>
### Kết luận
Các nguyên tắc này chỉ là hướng dẫn, giúp cho code tốt, sạch, dễ bảo trì hơn. Tuy nhiên, `không có cái gì là miễn phí`. Khi áp dụng các nguyên tắc này vào code có thể giúp cải thiện được chất lượng code, nhưng cũng có thể làm nó rườm rà, phức tạp, khó quản lý hơn.<br><br>
***Tóm tắt*** <br>
| **Nguyên tắc** | **Mục đích** |
| -------- | -------- |
| **S**ingle Responsibility Principle | Mỗi class chỉ nên có một trách nhiệm duy nhất, chỉ có thể thay đổi class vì một lý do duy nhất.<br>-> Giúp dễ thay đổi code, không gây ảnh hưởng tới các module khác.|
| **O**pen/Closed Principle | Các class, model nên được open để mở rộng khi có yêu cầu, nhưng close để sửa đổi. |
| **L**iskov Substitution Principle | Các đối tượng của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình.<br>-> Áp dụng cho tính chất kế thừa, phải cùng interface.|
| **I**nterface Segregation Principle | Class không nên bị buộc phụ thuộc vào các interface mà nó không sử dụng. |
| **D**ependency Inversion Principle | - Module cấp cao không nên phụ thuộc vào các module cấp thấp.<br>-> Cả 2 nên phụ thuộc vào abstractions.<br>- Interface (abstraction) không nên phụ thuộc vào chi tiết mà ngược lại.<br>-> Các class giao tiếp với nhau thông qua các interface mà không phải thông qua implementation. |

Bài viết tham khảo:
1. [SOLID Principles in Ruby - Luis Zamith](https://subvisual.co/blog/posts/19-solid-principles-in-ruby/)
2. [SOLID Principles in Ruby - Ilija Eftimov](https://ieftimov.com/solid-principles)