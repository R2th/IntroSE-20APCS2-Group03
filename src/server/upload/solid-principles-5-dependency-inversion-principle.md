Bạn đọc đến bài thứ 5 này thì chính xác bạn là 1 fan thực thụ của Ruby rồi. Kết thúc series SOLID Principles, mình xin giới thiệu đến mọi người nguyên lý cuối dùng, đó chính là Dependency Inversion Principle (DIP).
Cùng mình bắt đầu tìm hiểu về nguyên lý này nhé!
# Định nghĩa
Nguyên lý này sẽ có 2 cách diễn đạt:
* Các module cấp cao không nên phụ thuộc vào các modules cấp thấp. Cả 2 nên phụ thuộc vào những trừu tượng.
* Những trừu tượng không nên phụ thuộc vào những chi tiết. Những chi tiết nên phụ thuộc vào những trừu tượng

Khi nói đến nguyên tắc này, mình nghĩ tốt nhất là đi thẳng vào ví dụ:

Đoạn code sau thể hiện 1 sự vi phạm nguyên lý DIP
```
class ReportGeneratorManager
  def initialize(data)
    @data = data
  end
  
  def call
    generate_xml_report
    additional_actions
  end
  
  private
  
  attr_reader :data
  
  def generate_xml_report
    XmlRaportGenerator.new(data).generate
  end
  
  def additional_actions
    ...
  end
end
```

Chúng ta cùng xem có điều gì không đúng ở đây?

Ta thấy class ReportGenaratorManager (high-level) và XmlReportGenerator (low-level) đều được kết hợp chặt chẽ với nhau. Class High-level phụ thuộc vào những chi tiết (nội dung cụ thể) của class low-level. Hơn nữa, trong trường hợp chúng ta cần thêm 1 loại report generator nữa thì sẽ phải chỉnh sưa class high-level, vì vậy chúng ta bắt buộc phải thực hiện những thay đổi nội dung class high-level chỉ vì những thay đổi của class low-level.

Những gì chúng ta có thể làm ngay tại đây là đảo ngược sự phụ thuộc của các class. Hãy để các chi tiết phụ thuộc vào trừu tượng, không phải là một sự thực hiện cụ thể. Vì Ruby là một ngôn ngữ động, chúng ta có thể sử dụng kỹ thuật duck-typing. Chúng ta không phải tạo bất kỳ abstraction hoặc interface nào vì chúng không tồn tại trong thế giới Ruby.

Dependency Inversion Principle  là kỹ thuật duy nhất giúp chúng ta hoàn thành nguyên tắc này
```
class ReportGeneratorManager
  def initialize(data, generator = XmlRaportGenerator)
    @data = data
    @generator = generator
  end
  
  def call
    generate_report
    additional_actions
  end
  
  private
  
  attr_reader :data, :generator
  
  def generate_report
    generator.new(data).generate
  end
  
  def additional_actions
    ...
  end
end
```

Chúng ta đã cho phép thêm trực tiếp class generator mong muốn là tham số trong hàm constructor. Bây giờ, high-level class của chúng ta sẽ mang một mục đích chung và sẽ có thể sử dụng cho tất cả các loại generator.

Giải pháp được cung cấp linh hoạt hơn và dễ dàng viết unit test hơn.
# Khái niệm dễ gây nhầm lẫn

Chúng ta có thể dễ bị nhầm lẫn giữa Dependency Inversion Principle và Dependency Injection, nhưng còn có thuật ngữ thứ 3 cũng rất dễ gây hiểu lầm. Nó là Inversion of Control. Chi tiết mọi người có thể tìm hiểu tại bài article của Martin Fowler: [DIP in the Wild](https://martinfowler.com/articles/dipInTheWild.html#YouMeanDependencyInversionRight)
Tóm tắt lại thì là:
"DI là về hệ thống dây điện, IoC là về phương hướng, và DIP là về hình dạng. - Martin Fowler"
Khó hiểu vl :))
# Tổng kết toàn bộ series
Chúng ta sử dụng các nguyên tắc này (và bất kỳ mẫu nào khác) để đạt được lợi ích cụ thể, nhưng không đơn giản để có thể áp dụng được nó bởi vì nó ở trình độ "chuyên nghiệp" rồi.
Trong hầu hết các trường hợp, việc áp dụng một số quy tắc hoặc mẫu chỉ để thực hiện nó là một điều rất xấu và dẫn đến các vấn đề và codebase quá phức tạp chỉ khiến chúng ta mất thêm nhiều thời gian. 

Hãy nhớ rằng các quy tắc này được viết ra để giúp bạn phát triển khả năng code của, vì vậy hãy cố gắng không làm quá nhiều thứ hơn bạn cần. Hiểu kỹ về những nguyên lý này và hãy áp dụng nó trong những trường hợp thích hợp.

Cuối cùng, không cần phải cứ tuân theo một hướng dẫn nào, nguyên tắc, nguyên lý, pattern nào cả. Chỉ cần nói rằng "OK, Hiện tại tôi sẽ viết những dòng code hoàn hảo". Đây là một quá trình, và trước mắt là cứ code tiếp thôi nào :))

Kết thúc series ở đây nha!

Tham khảo: https://www.netguru.co/codestories/solid-5-dip