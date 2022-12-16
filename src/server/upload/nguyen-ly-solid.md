Hầu như các lập trình viên đều biết đến 4 tính chất cơ bản trong OOP:
1. Tính trừu tượng
2. Tính bao đóng
3. Tính kế thừa
4. Tính đa hình

Tuy nhiên, ngoài 4 khái niệm này, thế giới OOP còn rất rộng lớn, mà một trong những khái niệm cũng nổi tiếng không kém 4 tính chất kia, đó là nguyên lý SOLID.
Hôm nay mình xin phép được giới thiệu với các bạn về SOLID - những nguyên lý thiết kế trong OOP đã được đúc kết qua rất nhiều dự án trên thế giới. Một project áp dụng những nguyên lý này sẽ dễ đọc, dễ test, dễ maintainace code hơn.
Đặc biệt, mình sẽ nói về SOLID thông qua Ruby, vậy nên sẽ có một vài ví dụ hơi khác biệt so với trong Java hay một vài ngôn ngữ tĩnh khác.

SOLID bao gồm 5 nguyên tắc chính sau đây:
1. Single responsibility principle
2. Open/closed principle
3. Liskov substitution principle
4. Interface segregation principle
5. Dependency inversion principle

Giờ ta sẽ đi vào giới thiệu tổng quan từng nguyên tắc này
### 1. Single responsibility principle
> Một class chỉ nên có một lý do duy nhất để thay đổi, có nghĩa là class đó chỉ chịu một trách nhiệm duy nhất

Ta có thể xem qua ví dụ về việc tính diện tích của 1 hình bất kỳ, hình đó có thể tách ra thành các hình tròn và hình chữ nhật:
```ruby
class ReportManager
   def data_from_DB
       //...
   end
   def process_data
       //...
   end
   def print_report
       //...
   end
end
```

Class này giữ tới 3 trách nhiệm: Đọc dữ liệu từ DB, xử lý dữ liệu, in kết quả. Do đó, chỉ cần ta thay đổi DB, thay đổi cách xuất kết quả, … ta sẽ phải sửa đổi class này. Càng về sau class sẽ càng phình to ra. Theo đúng nguyên lý, ta phải tách class này ra làm 3 class riêng. Tuy số lượng class nhiều hơn những việc sửa chữa sẽ đơn giản hơn, class ngắn hơn nên cũng ít bug hơn.

### 2. Open/closed principle
> Open cho việc mở rộng có nghĩa là chúng ta có thể thêm các tính năng hoặc thành phần mới vào mà không vi phạm code hiện tại
> 
> Closed cho việc sửa đổi có nghĩa là chúng ta không nên thay đổi quá nhiều chức năng hiện có, bởi vì nó sẽ bắt buộc ta phải tái cấu trúc rất nhiều đoạn code

Nói một cách đơn giản hơn, có nghĩa rằng nên viết class mở rộng class cũ (bằng cách kế thừa) chứ không nên sửa đổi class đó. Ta có thể xem qua đoạn code sau:
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

Đoạn code trên vi phạm OCP bởi nếu ta muốn thay đổi định dạng của report được print ra, ta sẽ cần phải sửa đổi code của class. Refactor lại như sau:
```ruby
class Report
  def body
     generate_reporty_stuff
  end

  def print formatter: JSONFormatter.new
     formatter.format body
  end
end
```

Làm theo cách này thì ta vừa mở rộng tính năng mà khi thay đổi format sẽ không cần phải thay đổi code
```ruby
report = Report.new
report.print formatter: XMLFormatter.new
```

### 3. Liskov Substitution Principle
> Trong một chương trình, các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình

Hơi khó hiểu? Không sao, lúc mới đọc mình cũng vậy. Hãy tưởng tượng bạn có 1 class cha tên Vịt. Các class VịtBầu, VịtXiêm có thể kế thừa class này, chương trình chạy bình thường. Tuy nhiên nếu ta viết class VịtChạyPin, cần pin mới chạy được. Khi class này kế thừa class Vịt, vì không có pin không chạy được, sẽ gây lỗi. Đó là 1 trường hợp vi phạm nguyên lý này.

Hoặc ta có thể xem qua ví dụ sau:

Đầu tiên, chúng ta định nghĩa một class Human:
```ruby
class Human
  def talk
    ""
  end

  def height
    ""
  end
end
```
Sau đó định nghĩa 2 class con kế thừa từ Human:
```ruby
class HomoHabilis < Human
  def talk
    "Agrrr!"
  end

  def height
    "1.29m"
  end
end

class HomoSapiens < Human
  def talk
    "Hello!"
  end

  def height
    "1.70m"
  end
end
```
Và giờ ta có thể sử dụng 2 class con này thay cho class cha là Human:
```ruby
habilis = HomoHabilis.new
sapiens = HomoSapiens.new

def introduce_human human
  puts "Hi, I'm #{human.height} height and I say #{human.talk}"
end

introduce_human habilis # => Hi, I'm 1.29m height and I say Agrrr!
introduce_human sapiens # => Hi, I'm 1.70m height and I say Hello!
```

### 4. Interface Segregation Principle
> Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với nhiều mục đích cụ thể

Nguyên lý này khá dễ hiểu. Hãy tưởng tượng chúng ta có 1 interface lớn, khoảng 100 methods. Việc implements sẽ khá cực khổ, ngoài ra còn có thể dư thừa vì 1 class không cần dùng hết 100 method. Khi tách interface ra thành nhiều interface nhỏ, gồm các method liên quan tới nhau, việc implement và quản lý sẽ dễ hơn.

Tuy nhiên, đối với các lập trình viên Ruby thì nên áp dụng nguyên lý này như thế nào ? Do trong Ruby không hề có khái niệm interface. 

Để cho rõ ràng, ta lại đi qua một ví dụ nữa:

Ví dụ ta có một class FeeCalculator dùng để tính toán chi phí phải trả:
```ruby
class FeeCalculator
  def calculate product, user, vat
    # calculation
  end
end
```
Khi đó ta có thể dùng method calculate như sau:
```ruby
class ProductController
  def show
    @fee = FeeCalculator.new.calculate product, user, vat
  end
end
```
Tuy nhiên, nếu ta cần lưu chi phí đó lại vào DB sau khi tính toán thì sao ? Một số người sẽ thêm phần logic của việc lưu dữ liệu vào thân hàm calculate:
```ruby
class FeeCalculator
  def calculate product, user, vat, save_result
    # calculation

    if save_result
      # storing result into db
    end
  end
end

class ProductController
  def show
    @fee = FeeCalculator.new.calculate product, user, vat, false
  end
end

class OrderController
  def create
    @fee = FeeCalculator.new.calculate product, user, vat, true
  end
end
```
Tuy nhiên thiết kế như thế này thì ta luôn phải nhớ việc truyền true, false, đây là một thiết kế không hề tốt.

Vậy nên tốt nhất ta nên tách ra như sau:
```ruby
class FeeCalculator
  def calculate product, user, vat
    # calculation
  end

  def save fee
    # storing result into db
  end
end
```

```ruby
class OrderController
  def create
    fee = fee_calculator.calculate product, user, vat
    fee_calculator.save fee
  end

  private

  def fee_calculator
    FeeCalculator.new
  end
end
```

### 5. Dependency inversion principle
> 1. Các module cấp cao không nên phụ thuộc vào các modules cấp thấp. Cả 2 nên phụ thuộc vào abstraction.
> 2. Interface (abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại. ( Các class giao tiếp với nhau thông qua interface, không phải thông qua implementation.)

Nguyên tắc này khá là rắc rối nếu nói trên phương diện lý thuyết, nên ta có thể xem qua một ví dụ rất thực tế sau đây:
Ta có một cái vòi nước và rất nhiều loại ống dẫn nước. Ta có thể đổi bất kỳ loại ống dẫn nước nào phục vụ cho nhu cầu của ta một cách dễ dàng, chỉ cần nối với vòi nước là xong.

![](https://images.viblo.asia/21000751-bc08-4156-9049-6b9a37e0b123.jpg)

Ở đây, interface chính là vòi nước, implementation là các loại ống dẫn nước. Ta có thể swap dễ dàng giữa các loại ống dẫn nước vì đầu dẫn nước vào chỉ quan tâm tới interface (vòi nước), không quan tâm tới implementation.

### Kết luận
Trên đây mình đã nói sơ lược qua về nguyên lý SOLID. Hy vọng có thể giúp các bạn hiểu qua phần nào về những nguyên tắc thiết kế rất nổi tiếng trong OOP này, cũng như có thể áp dụng được nó vào trong project đang làm để code được "cứng" hơn.

### Tài liệu tham khảo
http://rubyblog.pro/2017/05/solid-single-responsibility-principle-by-example

http://rubyblog.pro/2017/05/solid-open-closed-principle-by-example

http://rubyblog.pro/2017/06/solid-liskov-substitution-principle

http://rubyblog.pro/2017/07/solid-interface-segregation-principle

http://rubyblog.pro/2017/07/solid-dependency-inversion-principle