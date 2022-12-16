# Adapter - structural design pattern
Tiếp tục với series Design patterns in ruby hôm nay chúng ta sẽ cùng tìm hiểu về **Adapter pattern**
##  Intent
**Adapter** là một *structural design pattern*  giúp các đối tượng có giao diện không tương thích có thể làm việc cùng với nhau được.

 ví dụ:  car-to-rail adapter giúp otô có thể chạy trên đường tàu hỏa :heart_eyes: 

![](https://images.viblo.asia/88d73c7f-a739-4940-9040-a78d1916808f.png)
## Problem
Hãy tưởng tượng rằng bạn đang tạo ra một ứng dụng giám sát thị trường chứng khoán. Ứng dụng tải xuống dữ liệu chứng khoán từ nhiều nguồn ở định dạng XML và sau đó hiển thị các biểu đồ và sơ đồ đẹp mắt cho người dùng.

Sau một thời gian  bạn quyết định cải thiện ứng dụng bằng cách tích hợp thư viện phân tích của bên thứ 3. Nhưng thư viện phân tích chỉ hoạt động với dữ liệu ở định dạng JSON @@@
![](https://images.viblo.asia/eddb878e-9a02-4e6a-933c-739413286ee5.png)

## Solution
Bạn có thể tạo một **adapter** (bộ chuyển đổi). Đây là một đối tượng đặc biệt chuyển đổi giao diện của một đối tượng để đối tượng khác có thể hiểu nó.

Một **adapter** bao bọc một đối tượng và thực hiện sự chuyển đổi bên trong nó. Đối tượng được bao bọc không biết đến sự tồn tại của  **adapter**

**Adapter** không chỉ có thể chuyển đổi dữ liệu thành các định dạng khác nhau mà còn có thể giúp các đối tượng có giao diện khác nhau hợp tác. Đây là cách thức hoạt động của nó:

**Adapter** có giao diện tương thích với một trong các đối tượng hiện có.

Sử dụng giao diện này, đối tượng hiện có có thể gọi các phương thức của  **adapter** một cách an toàn.

Khi được gọi, **adapter** chuyển yêu cầu đến đối tượng thứ hai, nhưng theo định dạng và thứ tự mà đối tượng thứ hai mong đợi.

Thậm chí có thể tạo ra một **adapter** hai chiều có thể chuyển đổi các cuộc gọi theo cả hai hướng.

![](https://images.viblo.asia/d1c38880-233e-49c0-8f11-a5329b71fdff.png)

Trở lại với ứng dụng thị trường chứng khoán của chúng ta. Để giải quyết vấn đề nan giải của các định dạng không tương thích, bạn có thể tạo **adapter** XML-to-JSON cho mọi lớp của thư viện phân tích mà mã của bạn muốn làm việc cùng. Sau đó, bạn điều chỉnh mã của mình để giao tiếp với thư viện chỉ thông qua các **adapter** này. Khi một **adapter** nhận được một cuộc gọi, nó sẽ chuyển dữ liệu XML thành  JSON và chuyển đến các phương thức thích hợp của đối tượng trong  thư viện phân tích.
## Real-World Analogy
![](https://images.viblo.asia/f4ec16a4-5757-4bb8-97a8-ec1165a079e2.png)

Các tiêu chuẩn cắm và ổ cắm điện là khác nhau ở các quốc gia khác nhau. Vấn đề có thể được giải quyết bằng cách sử dụng bộ chuyển đổi phích cắm :hugs: 

##  Structure
### Object adapter

**Object adapter** có thể được thực hiện trong tất cả các ngôn ngữ lập trình phổ biến.

![](https://images.viblo.asia/363fb70c-a5ff-4bf7-b930-66534728732f.png)

1. Client là một lớp chứa logic nghiệp vụ hiện có của chương trình.
2. Giao diện Client mô tả một giao thức mà các lớp khác phải tuân theo để có thể cộng tác với client code.
3. Service là một số lớp hữu ích (thường là bên thứ 3 hoặc di sản). Client không thể trực tiếp sử dụng lớp này vì nó có giao diện không tương thích.
4. Adapter là một lớp mà có khả năng làm việc với cả Client và Service: nó thực hiện giao diện của Client, trong khi bao bọc đối tượng dịch vụ. Adapter nhận các cuộc gọi từ máy khách thông qua giao diện của mình và chuyển chúng thành các cuộc gọi đến đối tượng dịch vụ được bao bọc theo định dạng mà nó có thể hiểu được.
5. Mã client không được ghép nối với lớp của adapter cụ thể . Nhờ vào điều này, bạn có thể thay các adapter khác vào chương trình mà không cần sửa đổi mã client hiện có. Điều này sẽ hữu ích khi giao diện của lớp Service bị thay đổi hoặc thay thế: bạn chỉ cần một lớp Adapter mới mà không cần thay đổi mã Client.


### Class adapter
Việc thực hiện này sử dụng tính kế thừa: adapter kế thừa các giao diện từ cả hai đối tượng cùng một lúc. Lưu ý rằng phương pháp này chỉ có thể được thực hiện trong các ngôn ngữ lập trình hỗ trợ đa kế thừa, chẳng hạn như C ++.

![](https://images.viblo.asia/f77fdcc6-2f30-43c0-81fc-3627d7dc4cf8.png)

 **Class Adapter** không cần phải bọc bất kỳ đối tượng nào vì nó kế thừa các hành vi từ cả client và service. Kết quả của  adapter có thể được sử dụng thay cho lớp client hiện có.
### Pseudocode

Ví dụ này về Adapter pattern là xung đột cổ điển giữa các chốt vuông và lỗ tròn.

![](https://images.viblo.asia/4690c0d3-d4ac-4e11-90d7-5bcb7c28b43c.png)
Adapter giả vờ là một chốt tròn, có bán kính bằng một nửa đường kính hình vuông (bán kính của vòng tròn nhỏ nhất có thể chứa được chốt vuông).

```
// Giả sử bạn có hai lớp với giao diện tương thích: RoundHole và RoundPeg.
class RoundHole is
    constructor RoundHole(radius) { ... }

    method getRadius() is
        // Trả về bán kính của lỗ tròn.

    method fits(peg: RoundPeg) is
        return this.getRadius() >= peg.radius()

class RoundPeg is
    constructor RoundPeg(radius) { ... }

    method getRadius() is
        // Trả về bán kính của chốt tròn.

// Nhưng có một lớp không tương thích: SquarePeg.
class SquarePeg is
    constructor SquarePeg(width) { ... }

    method getWidth() is
        // Trả về chiều rộng chốt vuông.

// Một lớp adapter cho phép bạn lắp các chốt vuông vào các lỗ tròn.
// Nó mở rộng lớp RoundPeg để cho các đối tượng bộ điều hợp hoạt động dưới dạng chốt tròn.
class SquarePegAdapter extends RoundPeg is
    // Trong thực tế, adapter chứa một thể hiện của lớp SquarePeg.
    private field peg: SquarePeg

    constructor SquarePegAdapter(peg: SquarePeg) is
        this.peg = peg

    method getRadius() is
        // Adapter giả vờ rằng đó là một cái chốt tròn với một bán kính có thể vừa với chốt vuông mà Adapter thực sự có bao bọc.
        return peg.getWidth() * Math.sqrt(2) / 2


//client code.
hole = new RoundHole(5)
rpeg = new RoundPeg(5)
hole.fits(rpeg) // true

small_sqpeg = new SquarePeg(5)
large_sqpeg = new SquarePeg(10)
hole.fits(small_sqpeg) 
// cái này sẽ không biên dịch (các loại không tương thích)

small_sqpeg_adapter = new SquarePegAdapter(small_sqpeg)
large_sqpeg_adapter = new SquarePegAdapter(large_sqpeg)
hole.fits(small_sqpeg_adapter) // true
hole.fits(large_sqpeg_adapter) // false
```

## Applicability
*  Sử dụng lớp Adaptor khi bạn muốn sử dụng một số lớp hiện có, nhưng giao diện của nó không tương thích với phần còn lại của mã.
*   Sử dụng mẫu khi bạn muốn sử dụng lại một số lớp con hiện có thiếu một số chức năng phổ biến có thể được thêm vào lớp cha.
##  How to Implement in ruby 
>  main.rb
>  
```
# Target xác định giao diện cụ thể được sử dụng bởi mã máy khách.
class Target
  # @return [String]
  def request
    'Target: The default target\'s behavior.'
  end
end

# Adaptee chứa một số hành vi hữu ích, nhưng giao diện của nó không tương thích
với mã khách hàng hiện có.
# mã khách hàng có thể sử dụng nó.
class Adaptee
  # @return [String]
  def specific_request
    '.eetpadA eht fo roivaheb laicepS'
  end
end

# Adapter làm cho giao diện của Adaptee tương thích với giao diện Target
class Adapter < Target
  # @param [Adaptee] adaptee
  def initialize(adaptee)
    @adaptee = adaptee
  end

  def request
    "Adapter: (TRANSLATED) #{@adaptee.specific_request.reverse!}"
  end
end

# Mã client hỗ trợ tất cả các lớp theo giao diện Target.
def client_code(target)
  print target.request
end

puts 'Client: I can work just fine with the Target objects:'
target = Target.new
client_code(target)
puts "\n\n"

adaptee = Adaptee.new
puts 'Client: The Adaptee class has a weird interface. See, I don\'t understand it:'
puts "Adaptee: #{adaptee.specific_request}"
puts "\n"

puts 'Client: But I can work with it via the Adapter:'
adapter = Adapter.new(adaptee)
client_code(adapter)
```

> output.txt
> 

```
Client: I can work just fine with the Target objects:
Target: The default target's behavior.

Client: The Adaptee class has a weird interface. See, I don't understand it:
Adaptee: .eetpadA eht fo roivaheb laicepS

Client: But I can work with it via the Adapter:
Adapter: (TRANSLATED) Special behavior of the Adaptee.
```
## Tham khảo
[refactoring.guru](https://refactoring.guru/design-patterns/adapter)