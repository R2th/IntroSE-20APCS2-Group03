Concern là một công cụ được cung cấp bởi ActiveSupport dùng để include **module** vào trong class hoặc để tạo **mixins**.

```ruby
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
Nhìn thì có vẻ rất tuyệt vì những class nào có chứa  module ```Emailable``` đều có thể gửi email. Nhưng, không phải lúc nào chúng ta cũng dùng được **concern**  như trên.<br>
Bây giờ chúng ta cùng thảo luận về một vài trường hợp dùng **concern** không đúng.<br>
### Dùng concern để làm cho class trông có vẻ nhỏ hơn
Chúng ta có thể dùng **concern** để làm nhỏ **size** của class đi, điều này còn thường xuyên được áp dụng khi project dùng các tool như **rubocop**.<br>
 Nhưng khi làm vậy chúng ta có những cái giá nhất định.<br>
 <br>
 
 ##### Hiệu năng không thay đổi
 Mặc dù chia nhỏ logic ra cocern nhưng khi chạy, tất cả các logic vẫn được load ở class gốc.<br>
 <br>
 
 ##### Lạm dụng concern làm cho code khó hiểu hơn
 Ví dụ:<br>
 ```ruby
 class Document
  include Emailable, Storable, Erasable
  def archive
    @archived = true
    deliver({to: 'me@mydomain.com', subject: 'Document archived', body: @content})
    remove
  end
end
```
Trong ví dụ trên, chúng ta có thể đoán method `deliver` thuộc module `Emailable` từ argument của method. Nhưng khi nhìn vào method `remove`? Chúng ta có thể đoán method nào thuộc concern `Erasable`, nhưng cũng có thể là của module `Storable`. Hãy thử tưởng tượng xem với mười concern, thậm chí là hơn sẽ rất khó cho người đọc code biết flow và nơi method được khai báo.<br>
>>>  Một cách giải quyết vấn đề này là xem có bao nhiêu class dùng chung 1 concern. Nếu chỉ có một class, có nghĩa là chúng ta không tận dụng được lợi ích của concern trong việc reuse code.
### Sự phụ thuộc hai chiều(Bi-directional dependencies)
Ví dụ:
```ruby
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
Chúng ta có thể thấy trong ví dụ trên, class `Document` phụ thuộc vào `Printable` concern và `Printable` concern biết được **instance attributes** của class `Document`(`@format` và `@content`). Làm như vậy sẽ làm tăng độ phức tạp của code và khó maintance code hơn.<br>
Trong mọi trường hợp, chúng ta nên tránh tạo ra các trường hợp phụ thuộc hai chiều. 
>>> Để giải quyết vấn đề trong ví dụ trên chúng ta có thể làm như sau:
```ruby
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
### Tổng kết
Ở trên chúng ta đã tìm hiểu về hai trường hợp lạm dụng và dùng **concern** sai cách.<br>
Vậy dùng **concern** đúng cách là như thể nào?<br>
>>> **Chúng ta không nên đưa bussiness logic vào trong concern mà nên để vào trong model.**<br>
>>> **Một concern tốt là một concern không có sự phụ nào cả.**<br>

**Hãy để cho các dòng code tự giải thích chính nó**<br>
Good luck and happy coding!