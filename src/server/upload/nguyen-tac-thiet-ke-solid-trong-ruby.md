Tất cả các ứng dụng phần mềm thay đổi theo thời gian. Những thay đổi được thực hiện đối với phần mềm có thể gây ra các sự cố không mong muốn. Tuy nhiên, sự thay đổi là không thể tránh khỏi, vì chúng ta không thể xây dựng một phần mềm không cần thay đổi. Các phần mềm liên tục thay đổi trong suốt vòng đời của chúng. Những gì chúng ta có thể làm là thiết kế phần mềm theo cách có thể dễ dàng thay đổi được. Thiết kế phần mềm đúng cách có thể mất thời gian và công sức lúc đầu, nhưng về lâu dài, nó tiết kiệm thời gian và công sức. Phần mềm được kết hợp chặt chẽ với nhau rất dễ hỏng và chúng ta không thể đoán trước được điều gì sẽ xảy ra với sự thay đổi. Dưới đây là một số ảnh hưởng của phần mềm được thiết kế kém:

*      Nó gây ra sự bất động.
*      Thay đổi code rất tốn kém.
*      Sẽ dễ dàng thêm nhiều độ phức tạp hơn là làm cho phần mềm đơn giản hơn.
*      Không thể quản lý được code.
*      Phải mất rất nhiều thời gian để một developer có thể hiểu được cách hoạt động của các chức năng của nó.
*      Thay đổi một phần của phần mềm thường phá vỡ phần kia và chúng ta không thể dự đoán những vấn đề mà một thay đổi có thể mang lại.

Trong bài báo [Design Principles and Design Patterns](https://fi.ort.edu.uy/innovaportal/file/2032/1/design_principles.pdf), liệt kê các triệu chứng thường gặp của các phần mềm khó thay đổi:

*     Rigidity: Rất khó để thay đổi code mà không gây ra sự cố, vì việc thực hiện các thay đổi trong một phần sẽ thúc đẩy nhu cầu thực hiện thay đổi trong các phần khác của code.
*      Fragility: Thay đổi code thường phá vỡ hoạt động của phần mềm. Nó thậm chí có thể phá vỡ các bộ phận không liên quan trực tiếp đến sự thay đổi.
*      Immobility: Mặc dù một số phần của ứng dụng phần mềm có thể có hành vi tương tự, chúng tôi không thể sử dụng lại mã và phải sao chép chúng.
*      Viscosity: Khi phần mềm khó thay đổi, chúng tôi tiếp tục tăng thêm độ phức tạp cho phần mềm thay vì làm cho nó tốt hơn.

Cần thiết kế phần mềm theo cách có thể kiểm soát và dự đoán được các thay đổi.

Các nguyên tắc thiết kế SOLID giúp giải quyết những vấn đề này bằng cách tách các chương trình phần mềm. Robert C. Martin đã giới thiệu những khái niệm này trong bài báo của ông có tiêu đề Design Principles and Design Patterns.

Nguyên tắc thiết kế SOLID bao gồm năm nguyên tắc sau:

*     Single Responsibility Principle
*     Open/Closed Principle
*     Liskov Substitution Principle
*     Interface Segregation Principle
*     Dependency Inversion Principle

Chúng ta sẽ tìm hiểu từng nguyên tắc này để hiểu cách những nguyên tắc này có thể giúp xây dựng phần mềm được thiết kế tốt trong Ruby.

### Single Responsibility Principle - SRP

Giả sử đối với một phần mềm quản lý nhân sự, chúng ta cần có chức năng tạo người dùng, thêm lương cho nhân viên và tạo phiếu lương của nhân viên. Trong khi xây dựng nó, chúng ta có thể thêm các chức năng này vào một lớp duy nhất, nhưng cách tiếp cận này gây ra sự phụ thuộc không mong muốn giữa các chức năng này. Nó đơn giản khi chúng ta bắt đầu, nhưng khi mọi thứ thay đổi và các yêu cầu mới phát sinh, chúng ta sẽ không thể dự đoán được những chức năng nào mà thay đổi sẽ phá vỡ.

>     A class should have one, and only one reason to change - Robert C Martin

Đây là code mẫu trong đó tất cả các chức năng nằm trong một lớp duy nhất:

```ruby
class User
  def initialize(employee, month)
    @employee = employee
    @month = month
  end

  def generate_payslip
    # Code to read from database,
    # generate payslip
    # and write it to a file
    self.send_email
  end

  def send_email
    # code to send email
    employee.email
    month
  end
end
```

Để tạo phiếu lương và gửi cho người dùng, chúng ta có thể khởi tạo lớp và gọi phương thức tạo phiếu lương:

```ruby
month = 11
user = User.new(employee, month)
user.generate_payslip
```

Bây giờ, có một yêu cầu mới. Chúng tôi muốn tạo phiếu lương nhưng không muốn gửi email. Chúng tôi cần giữ nguyên chức năng hiện có và thêm một trình tạo phiếu lương mới để báo cáo nội bộ mà không cần gửi email, vì nó dành cho đề xuất nội bộ. Trong giai đoạn này, chúng ta muốn đảm bảo phiếu lương hiện có được gửi cho nhân viên vẫn hoạt động.

Đối với yêu cầu này, chúng ta không thể sử dụng lại mã hiện có. Chúng ta cần thêm một biến vào phương thức create_payslip nói rằng nếu đúng thì hãy gửi email khác thì không. Điều này có thể được thực hiện, nhưng vì nó thay đổi mã hiện có, nó có thể phá vỡ chức năng thoát.

Để đảm bảo chúng ta không làm hỏng mọi thứ, chúng ta cần tách các logic này thành các lớp riêng biệt:

```ruby
  class PayslipGenerator
    def initialize(employee, month)
      @employee = employee
      @month = month
    end

    def generate_payslip
      # Code to read from database,
      # generate payslip
      # and write it to a file
    end
  end

  class PayslipMailer
    def initialize(employee)
      @employee = employee
    end

    def send_mail
      # code to send email
      employee.email
      month
    end
  end
```

Tiếp theo, chúng ta có thể khởi tạo hai lớp này và gọi các phương thức của chúng:

```ruby
 month = 11
  # General Payslip
  generator = PayslipGenerator.new(employee, month)
  generator.generate_payslip
  # Send Email
  mailer = PayslipMailer.new(employee, month)
  mailer.send_mail
```

Cách tiếp cận này giúp tách rời các trách nhiệm và đảm bảo một sự thay đổi có thể dự đoán được. Nếu chúng tôi chỉ cần thay đổi chức năng gửi mail, chúng ta có thể làm điều đó mà không cần thay đổi việc tạo báo cáo. Nó cũng giúp dự đoán bất kỳ thay đổi nào trong chức năng.

Giả sử chúng ta cần thay đổi định dạng của trường tháng trong email thành Tháng 11 thay vì 11. Trong trường hợp này, chúng ta sẽ sửa đổi lớp PayslipMailer và điều này sẽ đảm bảo rằng không có gì sẽ thay đổi hoặc phá vỡ chức năng của PayslipGenerator.

Mỗi khi bạn viết một đoạn mã, hãy đặt một câu hỏi sau đó. Lớp này có trách nhiệm gì? Nếu câu trả lời của bạn có dấu "và", hãy chia lớp thành nhiều lớp. Các lớp nhỏ hơn luôn tốt hơn các lớp lớn, chung chung.

### Open/Closed Principle - OCP

Bertrand Meyer đã khởi xướng nguyên tắc open/closed trong cuốn sách của ông có tựa đề Object-Oriented Software Construction.

Nguyên tắc nêu rõ, "các thực thể phần mềm (lớp, mô-đun, chức năng, v.v.) phải mở để mở rộng nhưng đóng để sửa đổi". Điều này có nghĩa là chúng ta có thể thay đổi hành vi mà không cần thay đổi thực thể.

Trong ví dụ trên, chúng tôi có chức năng gửi phiếu lương cho một nhân viên, nhưng nó rất chung chung cho tất cả nhân viên. Tuy nhiên, một yêu cầu mới nảy sinh: lập phiếu lương dựa trên loại nhân viên. Chúng tôi cần logic tạo bảng lương khác nhau cho nhân viên toàn thời gian và nhà thầu. Trong trường hợp này, chúng tôi có thể sửa đổi PayrollGenerator hiện có và thêm các chức năng sau:

```ruby
class PayslipGenerator
  def initialize(employee, month)
    @employee = employee
    @month = month
  end

  def generate_payslip
    # Code to read from database,
    # generate payslip
    if employee.contractor?
        # generate payslip for contractor
    else
        # generate a normal payslip
    end
    # and write it to a file
  end
end
```

Tuy nhiên, đây là một khuôn mẫu xấu. Khi làm như vậy, chúng ta đang sửa đổi lớp hiện có. Nếu chúng ta cần thêm nhiều logic thế hệ hơn dựa trên hợp đồng nhân viên, chúng ta cần sửa đổi lớp hiện có, nhưng làm như vậy vi phạm nguyên tắc mở / đóng. Bằng cách sửa đổi lớp, chúng tôi có nguy cơ thực hiện các thay đổi ngoài ý muốn. Khi một cái gì đó thay đổi hoặc được thêm vào, điều này có thể gây ra các vấn đề không xác định trong mã hiện có. Những if-else này có thể ở nhiều nơi hơn trong cùng một lớp. Vì vậy, khi chúng tôi thêm một loại nhân viên mới, chúng tôi có thể bỏ lỡ những nơi mà nếu-else này có mặt. Việc tìm kiếm và sửa đổi tất cả chúng đều có thể rủi ro và có thể tạo ra vấn đề.

Chúng ta có thể cấu trúc lại mã này theo cách mà chúng ta có thể thêm chức năng bằng cách mở rộng chức năng nhưng tránh thay đổi thực thể. Vì vậy, chúng ta hãy tạo một lớp riêng biệt cho mỗi lớp này và có cùng một phương thức tạo cho mỗi lớp:

```ruby
class ContractorPayslipGenerator
  def initialize(employee, month)
    @employee = employee
    @month = month
  end

  def generate
    # Code to read from the database,
    # generate payslip
    # and write it to a file
  end
end

class FullTimePayslipGenerator
  def initialize(employee, month)
    @employee = employee
    @month = month
  end

  def generate
    # Code to read from the database,
    # generate payslip
    # and write it to a file
  end
end
```

Đảm bảo rằng chúng có cùng tên phương thức. Bây giờ, hãy thay đổi lớp PayslipGenerator để sử dụng các lớp này:

```ruby
GENERATORS = {
  'full_time' => FullTimePayslipGenerator,
  'contractor' => ContractorPayslipGenerator
}

class PayslipGenerator
  def initialize(employee, month)
    @employee = employee
    @month = month
  end

  def generate_payslip
    # Code to read from database,
    # generate payslip
    GENERATORS[employee.type].new(employee, month).generate()
    # and write it to a file
  end
end
```

Ở đây, chúng ta có hằng số GENERATORS ánh xạ lớp được gọi dựa trên kiểu nhân viên. Chúng ta có thể sử dụng nó để xác định lớp nào cần gọi. Không, khi chúng ta phải thêm chức năng mới, chúng ta có thể chỉ cần tạo một lớp mới cho nó và thêm nó vào hằng số GENERATORS. Điều này giúp mở rộng lớp mà không cần phá vỡ điều gì đó hoặc không cần suy nghĩ về logic hiện có. Chúng ta có thể dễ dàng thêm hoặc xóa bất kỳ loại trình tạo phiếu lương nào.

### Liskov Substitution Principle - LSP

Nguyên tắc thay thế Liskov nêu rõ, "nếu S là một kiểu con của T, thì các đối tượng kiểu T có thể được thay thế bằng các đối tượng kiểu S".

Để hiểu rõ nguyên lý này, trước hết chúng ta hãy tìm hiểu vấn đề. Theo nguyên tắc open/closed, chúng ta thiết kế phần mềm theo cách có thể mở rộng. Chúng ta đã tạo một trình tạo lớp con Payslip thực hiện một công việc cụ thể. Đối với người gọi, lớp mà họ đang gọi là không xác định. Các lớp này cần phải có hành vi giống nhau để người gọi không thể phân biệt được sự khác biệt. Theo hành vi, chúng ta muốn nói rằng các phương thức trong lớp phải nhất quán. Các phương thức trong các lớp này phải có các đặc điểm sau:

*     Có cùng tên
*     Lấy cùng một số đối số với cùng một kiểu dữ liệu
*     Trả về cùng một kiểu dữ liệu

Chúng ta hãy xem ví dụ về trình tạo phiếu lương. Chúng ta có hai máy phát điện, một cho nhân viên toàn thời gian và một cho các nhà thầu. Bây giờ, để đảm bảo rằng các phiếu lương này có hành vi nhất quán, chúng ta cần kế thừa chúng từ một lớp cơ sở. Hãy để chúng tôi định nghĩa một lớp cơ sở được gọi là Người dùng.

```ruby
class User
  def generate
  end
end
```

Lớp con mà chúng ta đã tạo trong ví dụ về nguyên tắc open/close không có lớp cơ sở. Chúng ta sửa đổi nó để có lớp User cơ sở:

```ruby
class ContractorPayslipGenerator < User
  def generate
    # Code to generate payslip
  end
end

class FullTimePayslipGenerator < User
  def generate
    # Code to generate payslip
  end
end
```

Tiếp theo, chúng ta xác định một tập hợp các phương thức được yêu cầu cho bất kỳ lớp con nào kế thừa lớp User. Chúng ta định nghĩa các phương thức này trong lớp cơ sở. Trong trường hợp của chúng ta, chúng ta chỉ cần một phương thức duy nhất, được gọi là create.

```ruby
class User
  def generate
    raise "NotImplemented"
  end
end
```

Ở đây, chúng ta đã định nghĩa phương thức create, phương thức này có một câu lệnh tăng. Vì vậy, bất kỳ lớp con nào kế thừa lớp cơ sở cần phải có phương thức sinh. Nếu nó không xuất hiện, điều này sẽ gây ra lỗi rằng phương pháp không được thực hiện. Bằng cách này, chúng ta có thể đảm bảo rằng lớp con là nhất quán. Với điều này, người gọi luôn có thể chắc chắn rằng phương thức tạo là có mặt.

Nguyên tắc này giúp thay thế bất kỳ lớp con nào một cách dễ dàng mà không làm hỏng mọi thứ và không cần thực hiện nhiều thay đổi.

### Interface Segregation Principle - ISP

Nguyên tắc phân tách interface có thể áp dụng cho các ngôn ngữ tĩnh và vì Ruby là một ngôn ngữ động nên không có khái niệm về interface. Các interface xác định các quy tắc trừu tượng giữa các lớp.

Nguyên tắc nêu rõ,

>   Clients should not be forced to depend upon interfaces that they don't use. - Robert C. Martin

Điều này có nghĩa là tốt hơn nên có nhiều giao interface là một interface tổng quát mà bất kỳ lớp nào cũng có thể sử dụng. Nếu chúng ta định nghĩa một interface tổng quát, lớp phải phụ thuộc vào một định nghĩa mà nó không sử dụng.

Ruby không có interface, nhưng chúng ta hãy xem xét khái niệm lớp và lớp con để xây dựng một cái gì đó tương tự.

Trong ví dụ được sử dụng cho nguyên tắc thay thế Liskov, chúng ta thấy rằng lớp con FullTimePayslipGenerator được kế thừa từ lớp User chung. Nhưng User  là một lớp rất chung chung và có thể chứa các phương thức khác. Nếu chúng ta phải có một chức năng khác, chẳng hạn như Leave, nó sẽ phải là một lớp con của User. Để lại không cần phải có một phương thức tạo, nhưng nó sẽ phụ thuộc vào phương thức này. Vì vậy, thay vì có một lớp chung chung, chúng ta có thể có một lớp cụ thể cho việc này:

```ruby
class Generator
  def generate
    raise "NotImplemented"
  end
end

class ContractorPayslipGenerator < Generator
  def generate
    # Code to generate payslip
  end
end

class FullTimePayslipGenerator < Generator
  def generate
    # Code to generate payslip
  end
end
```

Trình tạo này dành riêng cho việc tạo phiếu lương và lớp con không cần phụ thuộc vào lớp User chung.

### Dependency Inversion Principle - DIP

Đảo ngược phụ thuộc là một nguyên tắc được áp dụng để tách các mô-đun phần mềm.

>      A high-level module should not depend on a low-level module; both should depend on abstraction.

Thiết kế, sử dụng các nguyên tắc được mô tả ở trên, hướng dẫn chúng ta đến nguyên tắc nghịch đảo phụ thuộc. Bất kỳ lớp nào có một trách nhiệm duy nhất cần những thứ từ các lớp khác để hoạt động. Để tạo bảng lương, chúng ta cần quyền truy cập vào cơ sở dữ liệu và chúng ta cần ghi vào tệp sau khi báo cáo được tạo. Với nguyên tắc trách nhiệm duy nhất, chúng ta đang cố gắng chỉ có một công việc cho một lớp duy nhất. Tuy nhiên, những thứ như đọc từ cơ sở dữ liệu và ghi vào tệp cần phải được thực hiện trong cùng một lớp.

Điều quan trọng là phải loại bỏ những phụ thuộc này và tách rời logic nghiệp vụ chính. Điều này sẽ giúp mã linh hoạt trong quá trình thay đổi và thay đổi có thể dự đoán được. Phần phụ thuộc cần phải được đảo ngược và người gọi mô-đun phải có quyền kiểm soát phần phụ thuộc. Trong trình tạo phiếu lương của chúng ta, phần phụ thuộc là nguồn dữ liệu cho báo cáo; mã này nên được tổ chức theo cách mà người gọi có thể chỉ định nguồn. Việc kiểm soát phần phụ thuộc cần phải được đảo ngược và người gọi có thể dễ dàng sửa đổi.

![](https://images.viblo.asia/ff82de92-561d-4290-8a6a-f9a3bd34a47b.PNG)


Trong ví dụ của chúng ta ở trên, mô-đun ContractorPayslipGenerator kiểm soát phần phụ thuộc, vì việc xác định vị trí đọc dữ liệu và cách lưu trữ đầu ra được kiểm soát bởi lớp. Để hoàn nguyên điều này, chúng ta hãy tạo một lớp UserReader đọc dữ liệu người dùng:

```ruby
class UserReader
  def get
    raise "NotImplemented"
  end
end
```

Bây giờ, giả sử chúng ta muốn cái này đọc dữ liệu từ Postgres. Chúng ta tạo một lớp con của UserReader cho mục đích này:

```ruby
class PostgresUserReader < UserReader
  def get
    # Code to read data from Postgres
  end
end
```

Tương tự, chúng ta có thể có một trình đọc từ FileUserReader, InMemoryUserReader hoặc bất kỳ loại trình đọc nào khác mà chúng ta muốn. Bây giờ chúng ta cần sửa đổi lớp FullTimePayslipGenerator để nó sử dụng PostgresUserReader làm phụ thuộc.

```ruby
class FullTimePayslipGenerator < Generator
  def initialize(datasource)
    @datasource = datasource
  end

  def generate
    # Code to generate payslip
    data = datasource.get()
  end
end
```

Người gọi hiện có thể chuyển PostgresUserReader dưới dạng phụ thuộc:

```ruby
datasource = PostgresUserReader.new()
FullTimePayslipGenerator.new(datasource)
```

Người gọi có quyền kiểm soát phần phụ thuộc và có thể dễ dàng thay đổi nguồn khi cần thiết.

Đảo ngược sự phụ thuộc không chỉ áp dụng cho các lớp. Chúng ta cũng cần đảo ngược các cấu hình. Ví dụ: trong khi kết nối máy chủ Postgres, chúng tôi cần các cấu hình cụ thể, chẳng hạn như DBURL, tên người dùng và mật khẩu. Thay vì mã hóa các cấu hình này trong lớp, chúng ta cần chuyển chúng xuống từ trình gọi.

```ruby
class PostgresUserReader < UserReader
  def initialize(config)
    config = config
  end

  def get
    # initialize DB with the config
    self.config
    # Code to read data from Postgres
  end
end
```

Cung cấp cấu hình bởi người gọi:

```ruby
  config = { url: "url", user: "user" }
  datasource = PostgresUserReader.new(config)
  FullTimePayslipGenerator.new(datasource)
```

Người gọi hiện có toàn quyền kiểm soát đối với sự phụ thuộc và việc quản lý thay đổi dễ dàng và ít đau đớn hơn.

### Kết luận

Thiết kế SOLID giúp tách mã và thay đổi ít gây khó khăn hơn. Điều quan trọng là phải thiết kế các chương trình theo cách chúng được tách rời, có thể tái sử dụng và đáp ứng với sự thay đổi. Tất cả năm nguyên tắc SOLID bổ sung cho nhau và nên cùng tồn tại. Cơ sở mã được thiết kế tốt sẽ linh hoạt, dễ thay đổi và thú vị khi làm việc. Bất kỳ nhà phát triển mới nào cũng có thể tham gia và dễ dàng hiểu mã.

Điều thực sự quan trọng là phải hiểu những loại vấn đề SOLID giải quyết và lý do tại sao chúng ta đang làm điều này. Hiểu được vấn đề giúp bạn nắm bắt các nguyên tắc thiết kế và thiết kế phần mềm tốt hơn.