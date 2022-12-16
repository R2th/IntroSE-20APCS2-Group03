## Introduction
Nếu bạn là một lập trình viên Rails có kinh nghiệm, chắc chắn các bạn đã biết Concerns là gì. Còn đối với những người chưa quen với framework Rails, đây là một lời giải thích ngắn gọn:
> Concerns là một công cụ được cung cấp bởi thư viện ActiveSupport để gắn các module vào lớp, tạo ra các mixins.
Đây là một ví dụ nho nhỏ về tác dụng của Concerns:
```
ruby

module Emailable
  include ActiveSupport::Concern

  def deliver(email)
    # send email here... 
  end
end

class Document
  include Emailable

  def archive
    @archived = true
    deliver({to: 'me@mydomain.com', subject: 'Document archived', body: @content})
  end
end
```
Bất kỳ lớp nào chứa Emailable concern có sẵn của chúng ta đều có thể gửi email. Thật không may, không phải mọi ví dụ trong một dự án Rails thông thường đều rõ ràng và dễ hiểu như ví dụ ở trên.

Trong bài đăng này, chúng ta sẽ bàn về các vấn đề nào có thể phát sinh khi sử dụng Concerns và cách chúng ta có thể giải quyết chúng.
## Should We Be Concerned?
Concerns được tạo ra nhằm mục đích làm cho cuộc sống của dân lập trình chúng ta ít phức tạp hơn. Hoặc ít nhất nó cũng giúp chúng ta ít phải chú tâm quá nhiều đến chất lượng mã phải không? Nhưng những mối quan tâm của ActiveSupport là gì thực sự được sử dụng để làm gì? Và làm thế nào để chúng ta biết nếu chúng ta có nên sử dụng nó? Để trả lời câu hỏi này, chúng ta có thể chuyển sang người tạo ra Rails. Trong một bài đăng trên blog trước Rails 4 có tiêu đề Put chubby models on a diet with concerns, DHH giải thích khi nào và tại sao nên xem xét sử dụng ActiveSupport’s Concern module:
> “Concerns encapsulate both data access and domain logic about a certain slice of responsibility. Concerns are also a helpful way of extracting a slice of model that doesn’t seem part of its essence (what is and isn’t in the essence of a model is a fuzzy line and a longer discussion) without going full-bore Single Responsibility Principle and running the risk of ballooning your object inventory.”
Mình không dám dịch vì mình chưa đủ trình truyền đạt lại ý tưởng của ổng, nhưng theo mình hiểu thì những phần không thuộc hồn (business logic, chức năng chính của model đó) thì có thể được tách ra bằng Concerns mà không mang thiên hướng đơn nghiệm cũng như làm cho  kho model của bạn bị phình to ra.

Hãy nhìn vào ứng dụng hiệu sách mẫu của mình. Mình có một model Users cho bất kỳ ai đăng ký sử dụng ứng dụng. Bất cứ khi nào Người dùng đăng ký, mình muốn gửi cho họ một email nói với họ rằng họ đã đăng ký tài khoản trên ứng dụng của chúng mình. Bây giờ, điều này có vẻ như là điều mà chỉ mô hình Người dùng sẽ quan tâm, phải không? Vâng, vâng, cho đến khi chúng ta nhận ra rằng chúng tôi có một mô hình khác cần chia sẻ cùng chức năng này!

Ví dụ: bỗng nhiên có các tổ chức muốn đăng ký ứng dụng của mình. Họ cũng cần nhận được cùng một email và được đăng ký thành công. Khi ứng dụng của mình phát triển, chúng ta thậm chí có thể muốn tạo một mô hình Đăng ký, thuộc về Người dùng và Tổ chức. Bây giờ, rõ ràng chúng ta có thể thực hiện những gì chúng ta muốn bằng cách chỉ cần thêm cùng một dòng mã cho cả hai mô hình, nhưng điều đó không thỏa mãn cách viết code DRY, cũng như nó không phải là một mối quan tâm lớn đáng để tách ra. Nhưng sẽ thật tuyệt nếu chúng ta có thể sử dụng chức năng đăng ký này, gói nó lại và chỉ gọi nó ra khi chúng ta cần sử dụng nó? Hóa ra đó chính xác là những gì chúng ta có thể làm với ActiveSupport :: Concerns.
## Extending Our Concerns
Trước khi chúng ta viết Concerns của riêng mình, hãy để Hãy xem mô hình Người dùng của chúng tôi ta như thế nào. Ở đây, một phiên bản rút gọn chỉ chứa các logic liên quan đến việc đăng ký tài khoản:
```
ruby

class User < ActiveRecord::Base
  after_commit :register_user, on: :create

  def register_user
      # Where our logic for registering a user
      # would go. Would call on a background job
      # to perform and send our registration email.
  end
end
```
Chúng tôi rất có thể sử dụng cách này trong model cho doanh nghiệp của chúng ta, nhưng có một cách tốt hơn để làm điều này. Có một vài bước để tạo ra một Concerns, đầu tiên là xác định nơi để viết nó nó! Vì chúng ta tạo ra một concerns cho một mô hình, vì vậy ta sẽ đặt nó trong thư mục app/models/concerns. Chúng tôi sẽ gọi concerns này là  Registerer, vì đó là trách nhiệm duy nhất của nó và chúng ta sẽ đặt nó trong thư mục app/models/concerns/users/registerer.rb.

Tiếp theo, chúng ta sẽ extend Rails ActiveSupport :: Concerns:
```
ruby

module Users
  module Registerer
      extend ActiveSupport::Concern
  end
end
```
Giờ chúng ta sẽ viết vài phương thức cơ bản cho nó:
```
ruby

module Users
  module Registerer
      extend ActiveSupport::Concern

      included do
          has_one :registration, dependent: :destroy

          after_commit :register_user, on: :create
      end

      def register_user
          send_registration_email(self)
          
          touch(:registered_at)
      end

      def send_registration_email(self)
          RegistrationEmailerJob.perform_later(self)
      end
  end
end
```
Bây giờ chúng ta có tất cả code ở một nơi, làm thế nào để chúng ta thêm nó vào model? Vâng, chúng ta có thể làm điều đó trong một dòng duy nhất:
```
ruby

class User < ActiveRecord::Base
  include Users::Registerer
end
```
Thêm chức năng cho một model khác, như thằng doanh nghiệp của chúng ta chẳng hạn, chúng ta cũng chỉ phải thêm một dòng code :3
``` 
ruby

class Organization < ActiveRecord::Base
  include Users::Registerer
end
```
Có một điều thú vị là thằng Register cũng không cần phải là đối tượng của riêng mình. Thay vào đó, chúng ta thực sự chỉ cần một tập hợp các phương thức có thể có sẵn để được gọi trên một đối tượng bất kì, đó chính xác là khả năng tùy biến mà ActiveSupport :: Concern cung cấp cho chúng ta.
## Concerns used wrong
### Sử dụng Concerns để làm cho các lớp nhỏ hơn

Rất thường xuyên, concerns được sử dụng để giảm quy mô của một lớp. Điều này thậm chí còn phổ biến hơn trong các dự án mà có sử dụng các công cụ như Rubocop trong quy trình CI. Trong những tình huống rubocop báo một tệp vượt quá một ngưỡng dung lượng cụ thể, giải pháp nhanh nhất là tách nó thành nhiều Concerns khác nhau. Logic được di chuyển ra nơi khác và số lượng dòng của lớp đó bị giảm. Nhưng sự giảm đó đi kèm với một chi phí.

Trước hết, việc refactor đó hoàn toàn chỉ thay đổi vẻ bề ngoài. Mặc dù chúng ta di chuyển logic sang một tệp riêng biệt, nhưng trong thời gian chạy, hành vi vẫn sẽ ở trong lớp gốc. Các module là một hình thức thừa kế trong ruby, vì vậy trách nhiệm sẽ vẫn còn đó.

Thứ hai, bằng cách sử dụng một concerns, chúng ta đang mất dần đi sự rõ ràng và tính dễ theo dõi. Ví dụ, hãy xem xét ví dụ sau:
```
ruby

class Document
  include Emailable, Storable, Erasable

  def archive
    @archived = true
    deliver({to: 'me@mydomain.com', subject: 'Document archived', body: @content})
    remove
  end
end
```

Phương thức deliver khá trực quan vì các đối số của nó, vì vậy chúng ta có thể hiểu rằng nó được triển khai trong Emailableconcern. Nhưng về phương thức remove? Tôi có thể nghi ngờ nó được cung cấp bởi Erasable, nhưng nó cũng có thể được triển khai trong Storable. Bây giờ hãy tưởng tượng một lớp học với 10 concerns khác nhau, rất nhiều dòng lệnh gọi phương thức và tên không có ý nghĩa. Theo dõi dòng chảy của chương trình có thể khá khó khăn và chúng ta có thể phải tìm kiếm để tìm ra phương thức mà chúng ta đang gọi.

### Bi-directional dependencies (phụ thuộc lẫn nhau)
Theo dõi ví dụ tiếp theo: 
```
ruby

module Printable
  include ActiveSupport::Concern

  def print
    raise UnknownFormatError unless ['pdf', 'doc'].include?(@format)

    # do print @content
  end
end

class Document
  include Printable

  def initialize(format, content)
    @format = format
    @content = content
  end

  def export
    # ...
    print
  end
end
```
Lớp Document phụ thuộc vào concern Printable. Nhưng đồng thời Printable biết chi tiết triển khai của Document (thuộc tính đối tượng @format và @content). Vấn đề với các phụ thuộc hai chiều có thể được tìm thấy trong bất kỳ hình thức thừa kế nào trong đó các cha biết chi tiết triển khai của các lớp con của chúng.

Bất cứ khi nào có thể, nên tránh phụ thuộc hai chiều. Kiến thức chỉ nên lưu chuyển một chiều và thông tin liên lạc phải được tuyên bố rõ ràng thông qua giao diện chung. Ta có thể sửa ví dụ trên như sau:
```
ruby

module Printable
  include ActiveSupport::Concern

  def print(format, content)
    raise UnknownFormatError unless ['pdf', 'doc'].include?(format)

    # do print content
  end
end

class Document
  include Printable

  def initialize(format, content)
    @format = format
    @content = content
  end

  def export
    # ...
    print(@format, @content)
  end
end
```
Trong ví dụ trên, Document phụ thuộc vào hai concerns, một để in nội dung và bên kia để tải chúng một nơi nào đó. Nhưng Printable cũng phụ thuộc vào Connectable. Sự phụ thuộc đã được xác định trong Document, nhưng được giải quyết ngầm. Loại tình huống này rất khó để đối phó và nên tránh xa khi có thể.

Tài liệu tham khảo:
https://medium.com/@carlescliment/about-rails-concerns-a6b2f1776d7d
http://vaidehijoshi.github.io/blog/2015/10/13/stop-worrying-and-start-being-concerned-activesupport-concerns/