# Design Patterns in Ruby - Structural Patterns - Proxy Pattern
## Intent
Proxy là một structural design pattern cho phép bạn cung cấp một vật thay thế hoặc giữ chỗ cho một đối tượng khác. Một proxy kiểm soát quyền truy cập vào đối tượng ban đầu, cho phép bạn thực hiện một cái gì đó trước hoặc sau khi request được gửi đến đối tượng ấy.
## Problem
Tại sao bạn muốn kiểm soát quyền truy cập vào một đối tượng?  Giả sử: bạn có một đối tượng tiêu thụ một lượng lớn tài nguyên hệ thống. Thỉnh thoảng bạn cần nó, nhưng không phải lúc nào cũng vậy.
![](https://images.viblo.asia/32cf1328-2dba-4abd-82d3-a6a90975ceb0.png)

Bạn có thể lười biếng: chỉ tạo đối tượng này khi thực sự cần thiết. Tất cả các đối tượng client đều sẽ cần thực hiện một số mã khởi tạo. Điều này có thể sẽ gây ra nhiều sự trùng lặp mã.

Và chúng ta cũng cần đưa mã này trực tiếp vào class đối tượng của mình, nhưng điều đó không phải lúc nào cũng luôn luôn có thể, không thể làm vậy khi class đối tượng  là một phần của thư viện bên thứ 3 đã đóng.
##  Solution
Mẫu Proxy mách bạn tạo một lớp proxy mới có cùng interface với một đối tượng service ban đầu. Sau đó, bạn cập nhật ứng dụng của mình để ứng dụng truyền đối tượng proxy cho tất cả các client gốc. Khi nhận được request từ client, proxy sẽ tạo một đối tượng service thực và ủy thác tất cả công việc cho nó.
![](https://images.viblo.asia/9a049011-42c2-4322-aa70-5b7b185ef297.png)

Lợi ích đạt được là gì? Nếu bạn cần thực thi một cái gì đó trước hoặc sau logic chính của lớp, proxy cho phép bạn làm điều này mà không thay đổi lớp đó.  Và vì proxy thực hiện giao diện giống như lớp gốc, nên nó có thể được truyền cho bất kỳ client nào mong đợi một đối tượng service thực sự.
## Real-World Analogy
![](https://images.viblo.asia/d1bc3932-64ad-4025-b86e-dabeab8e81e2.png)
Thẻ tín dụng là proxy cho tài khoản ngân hàng và nó cũng là proxy cho tiền mặt. Đều có thể dùng để thanh toán. Một người tiêu dùng cảm thấy tuyệt vời vì không cần phải mang theo nhiều tiền mặt. Một chủ cửa hàng cũng rất vui vì thu nhập từ giao dịch được thêm vào tài khoản ngân hàng shop mà không có nguy cơ mất tiền gửi hoặc bị cướp trên đường đến ngân hàng.
## Structure
![](https://images.viblo.asia/438a45a5-c47f-426f-8b57-4adad364adb5.png)

1.  **Service Interface** khai báo interface của Service. Proxy phải theo interface này để có thể "ngụy trang" thành đối tượng dịch vụ.

2.  **Service** là một lớp cung cấp một số logic nghiệp vụ hữu ích.

3. **Lớp Proxy** có trường tham chiếu trỏ đến một đối tượng **service**. Sau khi **proxy** kết thúc quá trình xử lý của nó (ví dụ: khởi tạo , ghi log, kiểm soát truy cập, bộ đệm, v.v.), nó chuyển yêu cầu đến đối tượng **service**. Thông thường, **proxy** quản lý toàn bộ vòng đời của các đối tượng **service** trong nó.

4.  **Client** phải làm việc với cả **service** và **proxy** thông qua cùng một interface. Bằng cách này, bạn có thể truyền **proxy** vào bất kỳ mã nào mong đợi một đối tượng **service**.

## Applicability

* Lazy initialization (virtual proxy). Đây là khi bạn có một đối tượng service hạng nặng gây lãng phí tài nguyên hệ thống, mặc dù thỉnh thoảng bạn mới cần nó. Thay vì tạo đối tượng khi ứng dụng khởi chạy, bạn có thể chỉ khởi tạo nó vào thời điểm thực sự cần thiết.

* Local execution of a remote service (remote proxy). Khi đối tượng dịch vụ được đặt trên một máy chủ từ xa. Trong trường hợp này, proxy chuyển client request qua mạng, xử lý tất cả các chi tiết khó chịu khi làm việc với mạng.

* Caching request results (caching proxy). Đây là khi bạn cần lưu trữ kết quả trả về của các client request và quản lý vòng đời của cache, đặc biệt nếu kết quả trả về khá lớn. Proxy có thể triển khai cache cho các request luôn mang lại kết quả tương tự. Proxy có thể sử dụng các tham số của các request làm các key của cache.
## How to Implement

1.  Nếu một **Service Interface** không có sẵn, hãy tạo một interface để làm cho các đối tượng **proxy** và **service** có thể hoán đổi cho nhau. Trích xuất interface từ lớp **Service** không phải lúc nào cũng được :lying_face: , bởi vì bạn cần thay đổi tất cả các mã client để chúng sử dụng interface đó. Kế hoạch B là biến **Proxy** thành một lớp con của lớp **Service** và theo cách này, nó sẽ kế thừa interface của **Service**.

2.  Tạo lớp **Proxy**. Nó nên có một trường để lưu trữ một tham chiếu đến **service**. Thông thường, **proxy** tạo và quản lý toàn bộ vòng đời **service** của nó. Nhưng cũng có trường hợp, một **service** được chuyển đến **proxy** thông qua hàm tạo bởi client.

3.  Implement các phương thức **proxy** theo mục đích của chúng. Trong hầu hết các trường hợp, sau khi thực hiện một số công việc, **proxy** nên ủy thác công việc cho đối tượng **service**.

4.  Xem xét tạo một phương thức để quyết định xem client có được **proxy** hay **service** thực. Đây có thể là một phương thức tĩnh đơn giản trong lớp proxy hoặc phương thức trong  *factory*.

5.  Xem xét thực hiện lazy initialization cho đối tượng **service**.
##  Proxy in Ruby
 
>  main.rb: 

```
# Subject interface khai báo các hoạt động chung cho cả RealSubject và Proxy. 
# Nếu client hoạt động với RealSubject bằng giao diện này, 
# bạn sẽ có thể chuyển cho nó một proxy thay vì một real subject.
class Subject
  # @abstract
  def request
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end

# RealSubject chứa một số logic kinh doanh cốt lõi.
# Thông thường, RealSubject có khả năng thực hiện một số công việc hữu ích
# cũng có thể rất chậm hoặc nhạy cảm -e.g. sửa dữ liệu đầu vào. 
# Proxy có thể giải quyết các vấn đề này mà không có bất kỳ thay đổi nào đối với mã của RealSubject.
class RealSubject < Subject
  def request
    puts 'RealSubject: Handling request.'
  end
end

# Proxy có interface giống hệt RealSubject.
class Proxy < Subject
  # @param [RealSubject] real_subject
  def initialize(real_subject)
    @real_subject = real_subject
  end

  # The most common applications of the Proxy pattern are lazy loading, caching,
  # controlling the access, logging, etc. A Proxy can perform one of these things and then, depending on the result, pass the execution to the same method in a linked RealSubject object.
  # Các ứng dụng phổ biến nhất của mẫu Proxy là lazy loading, caching, controlling the access, logging, etc.
  # Một Proxy có thể thực hiện một trong những điều này và sau đó, tùy thuộc vào kết quả, chuyển 
  # việc thực thi cho cùng một phương thức trong một đối tượng RealSubject được liên kết.
    return unless check_access

    @real_subject.request
    log_access
  end

  # @return [Boolean]
  def check_access
    puts 'Proxy: Checking access prior to firing a real request.'
    true
  end

  def log_access
    print 'Proxy: Logging the time of request.'
  end
end

# Mã client được cho là hoạt động với tất cả các đối tượng (cả đối tượng và 
# proxy) thông qua Subject interface hỗ trợ cả real subjects và proxy. 
# Tuy nhiên, trong thực tế, client chủ yếu làm việc với các real subject của họ 
# trực tiếp. Trong trường hợp này, để triển khai mẫu dễ dàng hơn, bạn có thể mở rộng 
# proxy của bạn từ lớp của real subject.
def client_code(subject) 
  # ...

  subject.request

  # ...
end

puts 'Client: Executing the client code with a real subject:'
real_subject = RealSubject.new
client_code(real_subject)

puts "\n"

puts 'Client: Executing the same client code with a proxy:'
proxy = Proxy.new(real_subject)
client_code(proxy)
```

> output.txt: 
> 

```
Client: Executing the client code with a real subject:
RealSubject: Handling request.

Client: Executing the same client code with a proxy:
Proxy: Checking access prior to firing a real request.
RealSubject: Handling request.
Proxy: Logging the time of request.
```

## Tham khảo
[refactoring.guru](https://refactoring.guru/design-patterns/proxy)