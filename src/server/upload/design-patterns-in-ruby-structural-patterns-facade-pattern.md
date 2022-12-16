##  Intent (khái quát)
**Facade** là một `structural design pattern` cung cấp giao diện đơn giản cho thư viện, framework hoặc bất kỳ tập hợp phức tạp nào khác của các class.

![](https://images.viblo.asia/72b7c1e9-1c67-4d89-b61c-3e92978440a0.png)

##  Problem (vấn đề)
Hãy tưởng tượng rằng bạn phải làm cho mã của mình hoạt động với một tập hợp các đối tượng thuộc về một thư viện hay framework. Thông thường, bạn cần phải khởi tạo tất cả các đối tượng đó, theo dõi các phụ thuộc, thực thi các phương thức theo đúng thứ tự, v.v.

Do đó, logic nghiệp vụ trong các class của bạn sẽ trở nên gắn kết chặt chẽ với các chi tiết triển khai của các class bên thứ 3, khiến cho việc hiểu và duy trì rất khó khăn.

## Solution (giải pháp)

*facade* là một lớp cung cấp giao diện đơn giản cho một hệ thống con phức tạp chứa nhiều phần chuyển động. Một *facade* có thể cung cấp chức năng hạn chế so với làm việc trực tiếp với hệ thống con. Tuy nhiên, nó chỉ bao gồm những tính năng mà khách hàng thực sự quan tâm.

*facade* rất tiện dụng khi bạn cần tích hợp ứng dụng của mình với một thư viện tinh vi có hàng tá tính năng, nhưng bạn chỉ cần một chút chức năng của nó.

Ví dụ như bạn có một ứng dụng giúp tải các video ngắn vui nhộn với mèo lên phương tiện truyền thông xã hội, sử dụng thư viện chuyển đổi video chuyên nghiệp. Tuy nhiên, tất cả những gì thực sự cần chỉ là một phương thức duy nhất `encode(filename, format)` . Sau khi tạo một lớp với một phương thức  như vậy và kết nối nó với thư viện chuyển đổi video, bạn sẽ có  *facade*  đầu tiên.

## Real-World Analogy (liên hệ với thực tế)
![](https://images.viblo.asia/66d716df-5185-42a1-96b5-213f663efe23.png)

Khi bạn gọi một cửa hàng để đặt hàng bằng điện thoại, Một tổng đài viên là *facade*  của bạn cho tất cả các dịch vụ của các phòng ban trong cửa hàng. Tổng đài viên cung cấp cho bạn một giao diện thoại đơn giản cho hệ thống đặt hàng, cổng thanh toán và các dịch vụ giao hàng khác nhau.

##  Structure (cách tổ chức)
![](https://images.viblo.asia/780017f1-1040-4702-8367-62abd9861086.png)

1. **Facade**cung cấp quyền truy cập thuận tiện vào một phần cụ thể của chức năng hệ thống con. Nó biết nơi thưc hiện yêu cầu của client và cách mà tất cả các bộ phận vận hành. 
2. **Additional Facade** có thể được tạo để ngăn *ô nhiễm* một **facade**, các tính năng không liên quan có thể làm cho nó trở thành một cấu trúc phức tạp khác. **Additional Facade** có thể được sử dụng bởi cả **Client**  và các **facade** khác.
3. **Complex Subsystem**  bao gồm hàng tá đối tượng khác nhau. Để làm cho tất cả chúng làm điều gì đó có ý nghĩa, bạn phải đi sâu vào chi tiết triển khai hệ thống con, như khởi tạo các đối tượng theo đúng thứ tự và cung cấp cho chúng dữ liệu theo định dạng thích hợp.
Các class của hệ thống con không hề biết về sự tồn tại của **Facade**. Chúng  hoạt động trong hệ thống và làm việc trực tiếp với nhau.
6. **Client** sử dụng  **Facade** thay vì gọi trực tiếp các đối tượng hệ thống con.

##  Applicability (sử dụng khi)
1. Sử dụng mẫu **Facade** khi bạn cần có giao diện giới hạn nhưng đơn giản với hệ thống con phức tạp.
2. Sử dụng **Facade** khi bạn muốn cấu trúc một hệ thống con thành các layers.

## How to Implement (cách cài đặt)
1. Kiểm tra xem có thể cung cấp giao diện đơn giản hơn so với những gì hệ thống con hiện có đã cung cấp hay không. Bạn có thể đi đúng hướng nếu giao diện này làm cho client code  độc lập với nhiều lớp của hệ thống con.
2. Khai báo và triển khai giao diện này trong lớp facade mới. **Facade** sẽ chuyển hướng các lời gọi từ client code đến các đối tượng thích hợp của hệ thống con. **Facade**  phải chịu trách nhiệm khởi tạo hệ thống con và quản lý vòng đời tiếp theo của nó trừ khi client code  đã thực hiện việc này.
3. Để nhận được toàn bộ lợi ích từ pattern, làm cho tất cả client code chỉ giao tiếp với hệ thống con thông qua facade. Bây giờ mã máy khách được tách biệt khỏi mọi thay đổi trong mã hệ thống con. Ví dụ, khi một hệ thống con được nâng cấp lên phiên bản mới, bạn sẽ chỉ cần sửa đổi mã ở facade.
4. Nếu facade trở nên quá lớn, hãy xem xét trích xuất một phần hành vi của nó sang một lớp facade mới, hãy tinh tế.
## Decorator in Ruby (ví dụ với ngôn ngữ ruby)

>  main.rb:
>  

```ruby
# Lớp Facade cung cấp một giao diện đơn giản cho logic phức tạp 
# của một hoặc một số hệ thống con.
# Facade ủy thác các yêu cầu của client cho các đối tượng
# thích hợp trong hệ thống con.
# Facade cũng chịu trách nhiệm quản lý vòng đời của họ.
# Tất cả điều này bảo vệ client khỏi sự phức tạp 
# không mong muốn của hệ thống con.
class Facade
  # Tùy thuộc vào nhu cầu của ứng dụng của bạn,
  # bạn có thể cung cấp cho Facade các đối tượng hệ thống con hiện có
  # hoặc buộc Facade phải tự tạo chúng.
  def initialize(subsystem1, subsystem2)
    @subsystem1 = subsystem1 || Subsystem1.new
    @subsystem2 = subsystem2 || Subsystem2.new
  end

  # Các phương thức của Facade là các shortcut thuận tiện cho chức năng tinh vi
  # của các hệ thống con.
  # Tuy nhiên, client chỉ nhận được một phần khả năng của hệ thống con.
  def operation
    results = []
    results.append('Facade initializes subsystems:')
    results.append(@subsystem1.operation1)
    results.append(@subsystem2.operation1)
    results.append('Facade orders subsystems to perform the action:')
    results.append(@subsystem1.operation_n)
    results.append(@subsystem2.operation_z)
    results.join("\n")
  end
end

# Hệ thống con có thể chấp nhận các yêu cầu từ facade hoặc client trực tiếp.
# Trong mọi trường hợp, đối với Hệ thống con, Facade vẫn là một ứng dụng client khác 
# và nó không phải là một phần của Hệ thống con.
class Subsystem1
  # @return [String]
  def operation1
    'Subsystem1: Ready!'
  end

  # ...

  # @return [String]
  def operation_n
    'Subsystem1: Go!'
  end
end

# Một số facade có thể làm việc với nhiều hệ thống con cùng một lúc.
class Subsystem2
  # @return [String]
  def operation1
    'Subsystem2: Get ready!'
  end

  # ...

  # @return [String]
  def operation_z
    'Subsystem2: Fire!'
  end
end

# Client code hoạt động với các hệ thống con phức tạp thông qua giao diện đơn giản
# do Facade cung cấp.
# Khi một facade quản lý vòng đời của hệ thống con, client thậm chí
# có thể không biết về sự tồn tại của hệ thống con.
# Cách tiếp cận này cho phép bạn giữ sự phức tạp trong tầm kiểm soát.
def client_code(facade)
  print facade.operation
end

# Mã máy khách có thể có một số đối tượng của hệ thống con đã được tạo.
# Trong trường hợp này, có thể đáng để khởi tạo Facade
# với các đối tượng này thay vì để Facade tạo phiên bản mới.

subsystem1 = Subsystem1.new
subsystem2 = Subsystem2.new
facade = Facade.new(subsystem1, subsystem2)
client_code(facade)
```

>  output.txt: 
>  

```
Facade initializes subsystems:
Subsystem1: Ready!
Subsystem2: Get ready!
Facade orders subsystems to perform the action:
Subsystem1: Go!
Subsystem2: Fire!
```

## Tham khảo
[refactoring.guru](https://refactoring.guru/design-patterns/facade)