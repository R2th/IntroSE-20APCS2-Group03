# Bridge
Tiếp tục với series Design patterns in ruby hôm nay chúng ta sẽ cùng tìm hiểu về **Bridge pattern**
##  Intent
Bridge pattern là một structural design pattern cho phép bạn chia một lớp lớn hoặc một tập hợp các lớp liên quan chặt chẽ thành hai lớp riêng biệt abstraction và implementation có thể được phát triển độc lập.
![](https://images.viblo.asia/ac67a8ec-1e13-471f-ab41-7cd3ed95008a.png)
## Problem
Abstraction (Trừu tượng) ? Implementation (Thực hiện)? Nghe có vẻ nguy hiểm nhỉ :laughing: Hãy bình tĩnh và cùng mình hiểu nó với một ví dụ đơn giản.

Giả sử bạn có một lớp Shape với một cặp lớp con: Circle và Square. Bạn muốn mở rộng hệ thống phân cấp lớp này để kết hợp các màu. Tuy nhiên, vì bạn đã có hai lớp con, bạn sẽ cần tạo bốn kết hợp lớp như BlueCircle và RedSapes.
![](https://images.viblo.asia/71ea8e06-3acc-4d5b-8eff-dcca2eb4963f.png)
Thêm các loại hình dáng và màu sắc mới vào sẽ phát triển hệ thống phân cấp của Shape theo cấp số nhân. Ví dụ, để thêm hình tam giác (Triangle), bạn phải tạo hai lớp con, mỗi lớp cho một màu. Và sau đó, việc thêm một màu mới sẽ yêu cầu tạo ba lớp con, mỗi lớp cho một loại hình dạng. Càng mở rộng, nó càng trở nên tồi tệ.
##  Solution

 Vấn đề này xảy ra bởi vì chúng ta vố gắng mở rộng lớp Shape theo hai chiều độc lập: theo hình dáng và theo màu sắc. Đó là một vấn đề rất phổ biến với sự kế thừa.

Bridge pattern giải quyết vấn đề này bằng cách chuyển từ kế thừa sang đối tượng. Điều này có nghĩa là bạn chuyển một trong các đặc điểm (hình dạng, mầu sắc) thành một hệ thống phân cấp lớp mới riêng biệt, để các lớp ban đầu sẽ tham chiếu đến  một đối tượng của hệ thống phân cấp mới.
![](https://images.viblo.asia/af383114-16fb-48f3-a154-31da493f0b5c.png)

Theo cách tiếp cận này, chúng ta có thể đưa các đoạn mã liên quan đến màu vào lớp riêng của mình (lớp Color) với hai lớp con: Red và Blue. Lớp Shape sẽ được thêm một tham chiếu trỏ đến một đối tượng color. Bây giờ shape có thể ủy thác bất kỳ công việc liên quan đến màu sắc cho đối tượng color được liên kết. Tham chiếu đó sẽ đóng vai trò là cầu nối giữa các lớp Shape và Color. Từ giờ trở đi, thêm màu sắc mới sẽ không yêu cầu thay đổi hệ thống phân cấp hình dạng, và ngược lại.

##  Structure
![](https://images.viblo.asia/0a8780a8-fc9a-4187-9caa-0bd87fbcc9b9.png)

1. Abstraction cung cấp logic điều khiển mức cao. Nó dựa vào đối tượng thực hiện để thực hiện công việc cấp thấp thực tế
2. Implementation khai báo interface phổ biến cho tất cả các implementation cụ thể. Một abstraction chỉ có thể giao tiếp với một đối tượng implementation thông qua các phương thức được khai báo ở đây.
  abstraction có thể liệt kê các phương thức tương tự như của implementation, nhưng thông thường abstraction khai báo một số hành vi phức tạp dựa trên nhiều hoạt động nguyên thủy được khai báo  bởi implementation
3. Concrete Implementations chứa code cho platform (nền tảng) cụ thể.
4. Refined Abstractions cung cấp các biến thể của logic điều khiển. Giống như các đối tượng của lớp cha Abstractions các đối tượng của lớp  Refined Abstractions  làm việc với các implementation khác nhau thông qua Implementation interface
5. Client chỉ quan tâm đến việc làm việc với abstraction, abstraction sẽ liên kết với một đối tượng Implementation tùy vào yêu cầu của Client

##  Applicability

1.  Dùng Bridge pattern khi bạn muốn phân chia và tổ chức một lớp có một số biến thể của một số chức năng (ví dụ: muốn lớp có thể hoạt động với các máy chủ cơ sở dữ liệu khác nhau).
2.  Dùng pattern khi bạn cần mở rộng một lớp theo nhiều chiều trực giao (độc lập).
3.  Dùng Bridge nếu bạn cần để có thể chuyển đổi implementations trong thời gian chạy.


## How to Implement

1. Xác định kích thước trực giao trong các lớp của bạn. Có thể là abstraction/platform, domain/infrastructure, front-end/back-end, hay interface/implementation.
2. Liệt kê những hoạt động nào client cần và khai báo chúng chúng trong lớp  Abstraction.
3. Xác định các hoạt động có sẵn trên tất cả các platform. Khai báo những gì mà  abstraction cần trong Implementation interface chung.
4. Đối với tất cả các platform, hãy tạo các lớp triển khai cụ thể, nhưng hãy đảm bảo tất cả chúng đều tuân theo implementation interface
5. Trong lớp abstraction, thêm trường tham chiếu cho kiểu Implementation. abstraction ủy thác hầu hết các công việc cho đối tượng implementation được tham chiếu.
6. Nếu có một vài biến thể của logic mức cao, hãy tạo các refined abstraction cho từng biến thể bằng cách extend lớp base abstraction.
7. Client  sẽ chuyển một đối tượng implementation đến abstraction’s constructor để liên kết chúng lại. Sau đó, Client có thể quên implementation và chỉ làm việc với đối tượng abstraction.

## Bridge in Ruby

Ví dụ này minh họa cấu trúc của Bridge design pattern. Nó tập trung vào việc trả lời những câu hỏi sau:

Nó bao gồm những lớp nào?

Những lớp này đóng vai trò gì?

Các yếu tố của mô hình có liên hệ với nhau bằng cách nào?

### main.rb
```
# Abstraction định nghia interface cho phần "control" một phần của hai hệ thống phân cấp.
# Nó duy trì một tham chiếu đến đối tượng của Implementation
# phân cấp và ủy thác tất cả các công việc thực sự cho đối tượng này.
class Abstraction
  # @param [Implementation] implementation
  def initialize(implementation)
    @implementation = implementation
  end

  # @return [String]
  def operation
    "Abstraction: Base operation with:\n"\
    "#{@implementation.operation_implementation}"
  end
end

# Có thể mở rộng Abstraction mà không thay đổi lớp Implementation .
class ExtendedAbstraction < Abstraction
  # @return [String]
  def operation
    "ExtendedAbstraction: Extended operation with:\n"\
    "#{@implementation.operation_implementation}"
  end
end

# Implementation định nghĩa interface cho tất cả các lớp implementation.
# Nó không phải phù hợp với interface của Abstraction
# Trong thực tế, hai interface có thể hoàn toàn khác nhau
# Thông thường, Implementation interface chỉ cung cấp các hoạt động nguyên thủy
# trong khi Abstraction định nghĩa các hoạt động cấp cao hơn dựa trên các nguyên thủy đó.
class Implementation
  # @abstract
  #
  # @return [String]
  def operation_implementation
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end

# Mỗi implementation cụ thể tương ứng với một platform cụ thể và thực hiện
# Implementation interface sử dụng API của platform đó.
class ConcreteImplementationA < Implementation
  # @return [String]
  def operation_implementation
    'ConcreteImplementationA: Here\'s the result on the platform A.'
  end
end

class ConcreteImplementationB < Implementation
  # @return [String]
  def operation_implementation
    'ConcreteImplementationB: Here\'s the result on the platform B.'
  end
end

# Except for the initialization phase, where an Abstraction object gets linked
# Ngoại trừ giai đoạn khởi tạo, trong đó một đối tượng Abstraction được liên kết
# với một đối tượng implementation cụ thể, mã client chỉ nên phụ thuộc vào lớp  Abstraction
the client code should only depend on the Abstraction class.
Bằng cách này, Client code khách có thể hỗ trợ bất kỳ abstraction-implementation nào.

def client_code(abstraction)
  # ...

  print abstraction.operation

  # ...
end

# Mã client sẽ có thể làm việc với bất kỳ abstraction-implementation được cấu hình sẵn nào.

implementation = ConcreteImplementationA.new
abstraction = Abstraction.new(implementation)
client_code(abstraction)

puts "\n\n"

implementation = ConcreteImplementationB.new
abstraction = ExtendedAbstraction.new(implementation)
client_code(abstraction)
```

### output.txt: Execution result
```
Abstraction: Base operation with:
ConcreteImplementationA: Here's the result on the platform A.

ExtendedAbstraction: Extended operation with:
ConcreteImplementationB: Here's the result on the platform B.
```
## Tham khảo
[refactoring.guru](https://refactoring.guru/design-patterns/bridge)