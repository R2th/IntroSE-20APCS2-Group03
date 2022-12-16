# Giới thiệu
Nếu bạn đã làm qua Ruby on Rails, chúng ta sẽ không cần giải thích thêm về `concern` nữa. Còn với những người mới, đây có lẽ là một lời giải thích ngắn gọn:

> Concern là một công cụ được cung cấp bởi các thư viện **ActiveSupport** bao gồm các module trong các class, tạo mixins.
 
```Ruby
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
    deliver {to: 'me@mydomain.com', subject: 'Document archived', body: @content}
  end
end
```

Thật tuyệt vời phải không? Mỗi class bao gồm cả `Emailable` concern đều có thể gửi email. Thật không may, không phải mọi ví dụ trong một dự án Rails là rõ ràng như một ví dụ đã giải thích ở trên.

Trong bài viết này, chúng ta sẽ nói về một số anti-patterns Concerns, những vấn đề có thể phát sinh và cách chúng ta có thể giải quyết chúng.

# Cách sử dụng sai

## Sử dụng concern để làm class nhỏ hơn

Rất thường xuyên, concern được sử dụng để giảm kích thước của một class. Điều này thậm chí còn phổ biến hơn trong các dự án sử dụng các công cụ như Rubocop trong quy trình CI của họ. Trong những tình huống đó, khi một tệp vượt quá một ngưỡng cụ thể, giải pháp nhanh nhất là trích xuất một concern. Logic được di chuyển đến nơi khác và số lượng các dòng của lớp đó được giảm đi. Nhưng sự giảm đó đi kèm với một chi phí.

Trước hết, refactor hoàn toàn là hình thức. Mặc dù chúng ta chuyển logic sang một tệp riêng biệt, trong thời gian chạy, hành vi vẫn sẽ ở trong class gốc. Các module là một dạng thừa kế trong ruby, vì vậy xử lí vẫn ở đó.

Thứ hai, bằng cách sử dụng một concern, chúng tôi đang mất đi nhân chứng. Ví dụ, hãy xem xét ví dụ sau:

```Ruby
class Document
  include Emailable, Storable, Erasable
  def archive
    @archived = true
    deliver({to: 'me@mydomain.com', subject: 'Document archived', body: @content})
    remove
  end
end
```

Phương thức `deliver` khá trực quan vì các đối số của nó, vì vậy chúng ta có thể giả định nó được thực hiện trong `Emailable` concern. Nhưng hãy chú ý tới method `remove`, tôi nghĩ nó có thể được cung cấp bởi `Erasable`, nhưng nó cũng có thể được thực hiện trong `Storable`. Bây giờ hãy tưởng tượng một class có 10 concern, các method được call rất nhiều lần và các tên không có ý nghĩa. Theo sau luồng thực hiện có thể khá khó khăn, và việc tìm kiếm method đang được gọi tới từ đâu.

> Một heuristic tốt để tìm antipattern này là để tìm bao nhiêu lớp thực hiện một mối quan tâm. Nếu chỉ có một, thì chúng ta có thể mất đi những phần quan tâm tốt.
## Phụ thuộc 2 chiều (Bi-directional dependencies)

Theo ví dụ sau:
```Ruby
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

Class `Document` phụ thuộc vào `Printable` concern. Tuy nhiên, `Printable` concern biết chi tiết cách thực hiện của class `Document` (các thuộc tính instance `@format` và `@content`). Vấn đề với phụ thuộc hai chiều (bi-directional dependencies) có thể được tìm thấy dưới bất kỳ hình thức thừa kế nào trong đó các superclass biết chi tiết thực hiện của các class con của chúng.

Bất cứ khi nào có thể, nên tránh việc phụ thuộc hai chiều. knowledge chỉ nên lưu thông một chiều và giao tiếp phải được khai báo rõ ràng thông qua public interface. Implicit knowledge không scale và trong tương lai khi gọi tới `Emailable` concern có thể quên khai báo `@format`. Vì vậy, một phiên bản cố định của concern sẽ là như sau:

```Ruby
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

## Phụ thuộc kiểu tam giác (Triangular dependencies)

Vấn bên trên có thể trở nên lớn hơn nếu phụ thuộc đi xa hơn hài chiều.

```Ruby
module Connectable
  include ActiveSupport::Concern
  def connect_to(device)
    # ...
  end
end
module Printable
  include ActiveSupport::Concern
  def print(format, content)
    connect_to(Printer::lookup)
    # ...
  end
end
class Document
  include Connectable, Printable
  def export
    # ...
    print(@format, @content)
  end
  def upload_to(remote_resource)
    connect_to(remote_resource)
    #...
  end
end
```

Ở ví dụ trên, class `Document` phụ thuộc vào 2 concern, một để hiển thị nội dung và một để upload chúng lên một remote resource. Tuy nhiên, concern `Printable` lại cũng phụ thuộc vào `Connectable`. Sự ràng buộc này đã được định nghĩa trong class `Document`. Loại tình huống này khó giải quyết và nên tránh bất cứ khi nào có thể.

# Cách sử dụng đúng

Thật dễ dàng để xem khi nào có vấn đề xảy ra. Không dễ dàng gì để truy ngược lại và khẳng định một cái gì đó có sai sót.Những concern tốt là không có khiếm khuyết có thể nhận biết. Có 1 vài vấn đề với concern đã được mô tả ở trên nhưng bạn có thể xem xét mã của riêng bạn.

Good concern sẽ có thể làm việc độc lập, do đó, nó không cần phải phục thuộc vào bất cứ điều gì - có nhiệm vụ rất cụ thể và hạn chế. Các loại công việc cho một concern nên được framework. Điều đó có nghĩa là chúng không nên chứa logic nghiệp vụ. Logic nghiệp vụ được mô hình hóa tốt hơn như trừu tượng (các lớp), chứ không phải là concerns. Value objects, services, repositories, aggregates hoặc bất kỳ đối tượng nào phù hợp hơn.

Nhưng ngay cả good concern hiện nay vẫn tồn tại vấn đề thiết kế phần mềm. Concern sẽ gặp phải một chút khó khăn để test, vì bạn cần sắp xếp thêm. Nhưng có lẽ vấn đề quan trọng nhất là concern thúc đẩy mối quan hệ giữa các class của chúng ta. Với một relation, một đối tượng kế thừa hành vi trực tiếp, do đó, nhiều hơn và nhiều hơn nữa responsibilites được tổng hợp cho đối tượng miễn là chúng tôi tiếp tục thêm concern. Sự phân chia thực sự của công việc đi kèm với có một mối quan hệ, hoặc thông qua thành phần hoặc tập hợp.

Mọi vấn đề liên quan đến concerns đều có thể được giải quyết với thành phần (composition) hoặc tập hợp (aggregation). Tốt hơn thế, thành phần / tập hợp giải quyết cùng một vấn đề nhưng rõ ràng.

# Rõ ràng là cách tốt hơn

Theo [PEP-20, Zen of Python](https://www.python.org/dev/peps/pep-0020/) nói rằng: "Explicit is better than implicit". Ngụ ý nghĩa là bạn cần kiến thức trước đó. Nhân chứng là tự giải thích, vì vậy nó làm cho bộ não của chúng ta hoạt động ít hơn. Không ai muốn mất thời gian tìm kiếm nơi mà một phương pháp đã được xác định.

Viết một tập hợp có cùng chi phí như viết một concern, và nó làm cho mọi thứ rõ ràng. Sử dụng composition tốn kém hơn một chút, nhưng khi tôi đang tìm kiếm coupling hoặc polymorfism lỏng lẻo.

```Ruby
# Aggregation
class Document
  def archive
    @archived = true
    Mailer.deliver {to: 'me@mydomain.com', subject: 'Document archived', body: @content}
    Store.remove
  end
end

# Composition
class Document
  def initialize mailer, store
    @mailer = mailer
    @store = store
  end
  
  def archive
    @archived = true
    @mailer.deliver {to: 'me@mydomain.com', subject: 'Document archived', body: @content}
    @store.remove
  end
end
```


Bài viết trên được dịch từ [bài viết](https://medium.com/@carlescliment/about-rails-concerns-a6b2f1776d7d).