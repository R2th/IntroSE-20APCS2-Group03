Trong môi trường phát triển web hiện đại hiện nay, bộ nhớ đệm(cache) là một cách nhanh chóng và mạnh mẽ để tăng tốc ứng dụng của bạn. Khi sử dụng nó một cách hợp lý, bộ nhớ đệm có thể mang lại những cải tiến đáng kể cho performance ứng dụng của bạn. Nhưng khi sử dụng nó không hợp lý, nó sẽ là một tai họa cho ứng dụng của bạn.

Trong bài viết này, chúng ta sẽ tìm hiểu một kỹ thuật để kiểm soát tốt hơn cách Rails cache hoạt động như thế nào: cách bộ nhớ cache cấp trường hoạt động. Kỹ thuật này dựa trên Rails ActiveRecord và ActiveSupport::Concern cũng như thao tác của hành vi phương thức *touch*.

## Rails, Ruby, and Performance

Ruby không phải là ngôn ngữ nhanh nhất, nhưng nói chung, nó là một lựa chọn phù hợp với việc phát triển ứng dụng trong thời gian ngắn. Hơn nữa, khả năng lập trình meta và khả năng mà ngôn ngữ tích hợp (DSL) mang lại cho nhà phát triển sự linh hoạt.

### Simple Optimizations

Chính xác thì bạn sẽ phải làm như thế nào để tăng tốc độ? Câu trả lời đó là Benchmark và Optimize. Hai bước để thực hiện việc tối ưu hóa đó là: 
 - Loại bỏ query N+1.
 - Sử dụng kỹ thuật bộ nhớ đệm cho các templates.

**N+1 Queries**

Để khắc phục các query N+1, điều đầu tiên là hãy phát hiện xem nó phát sinh từ những câu query nào bằng các xem log - cứ khi nào thấy nhiều truy vấn SQL thì hãy tìm cách loại bỏ chúng nha:

```
Learning Load (0.4ms) SELECT 'learnings'.* FROM 'learnings' WHERE 'project'.'id' = ?
Learning Load (0.3ms) SELECT 'learnings'.* FROM 'learnings' WHERE 'project'.'id' = ?
Learning Load (0.4ms) SELECT 'learnings'.* FROM 'learnings' WHERE 'project'.'id' = ?
```

Ngoài ra, Rails còn có 1 gem hỗ trợ việc phát hiện những query N+1 đó là [bullet](https://github.com/flyerhzm/bullet). Nhưng cũng cân nhắc trong từng TH để sử dụng nó cho thật phù hợp nhé. Với việc loại bỏ N+1 hiệu quả, bạn có thể tin rằng ứng dụng của bạn sẽ không gặp quá tải việc tải dữ liệu và thời gian dành cho ActiveRecord sẽ giảm đi một cách đáng kể.

Sau khi thực hiện việc loại bỏ query N+1, ứng dụng sẽ chạy nhanh hơn. Nhưng liệu còn có cách nào để nâng cấp tốc độ truy cấp ứng dụng của bạn, giảm thời gian tải xuống nữa không? Vẫn tồn tại những hiển thị không cần thiết xảy ra trong các template, và cuối cùng, đây là lúc mà bạn tìm đến với bộ nhớ đệm.

**Fragment Caching**

Bộ nhớ đệm phân mảnh thường giúp giảm đáng kể thời gian tạo template. Ý tưởng đằng sau bộ nhớ đệm của Rails là rất tuyệt vời. Nó cung cấp một cơ chế bộ nhớ đệm ([cache](https://signalvnoise.com/posts/3113-how-key-based-cache-expiration-works)) siêu đơn giản và hiệu quả.

Giả sử bạn có một chút giao diện người dùng để hiển thị một số thông tin của thực thể.

- Khi trang được tải, Rails tính toán cache_key dựa trên lớp thực thể và trường updated_at.
- Sử dụng cache_key đó, nó sẽ kiểm tra xem liệu có bất cứ điều gì trong bộ nhớ đệm được liên kết với khóa đó không.
- Nếu không có gì trong bộ nhớ cache, thì mã HTML cho đoạn đó được hiển thị ra view (và nội dung được hiển thị được lưu trữ trong bộ nhớ cache).
- Nếu có bất kỳ nội dung hiện có nào trong bộ nhớ đệm liên quan đến khóa đó, thì view sẽ được hiển thị với nội dung của bộ nhớ cache.

Điều này nói lên rằng bộ nhớ cache không bao giờ cần phải được vô hiêu nó một cách rõ ràng. Bới bất cứ khi nào thay đổi trên thực thể và reload lại trang, nội dung bộ nhớ cache mới sẽ được hiển thị cho thực thể.

Theo mặc định, Rails cung cấp khả năng làm mất hiệu lực bộ nhớ cache của các đối tượng gốc trong TH đối tượng con thay đổi:

`belongs_to :parent_entity, touch: true`

Khi thêm action này trong models, sẽ tự động *touch* vào đối tượng khi đối tượng con được *touched*. Với điều này, Rails cung cấp cho chúng ta một cách đơn giản và hiệu quả để làm mất hiệu lực bộ nhớ cache cho các thực thể cha cùng một lúc với bộ nhớ cache cho các thực thể con.

### Caching in Rails

Tuy nhiên bộ nhớ đệm trong Rails được tạo để phục vụ các giao diện người dùng, trong đó mã HTML thể hiện thực thể cha chứa các mã HTMl đại diện cho các thực thể con. Nói cách khác, đoạn HTML thể hiện các thực thể con trong mô hình này không thể chứa các trường từ thực thể cha.

Nhưng thực tế thì nhiều lúc bạn sẽ vi phạm điều này trong các ứng dụng Rails của bạn.

Làm thế nào để xử lý tình huống mà giao diện người dùng hiển thị các trường của thực thể cha  bên trong đoạn HTML của thực thể con?

Nếu thực thể con chứa các trường từ thực thể cha, thì sẽ gặp 1 chút khó khăn về hành vi mất hiệu lực bộ nhớ cache mặc định của Rails.

Mỗi khi các trường được trình bày từ thực thể cha được sửa đổi, thì sẽ cần phải touch vào tất cả các thực thể con thuộc về thực thể cha đó. Vĩ dụ, nếu Parent1 được sửa đổi, bạn sẽ cần phải chắc chắn rằng bộ nhớ cache cho các view của Child1 và Child2 đều bị vô hiệu.

Rõ ràng, điều này có thể gây ra một nút cổ chai hiệu suất lớn. Chạm vào mọi thực thể con bất cứ khi nào thực thể mẹ thay đổi sẽ dẫn đến nhiều truy vấn cơ sở dữ liệu không có lý do.

Một kịch bản tương tự khác là khi các thực thể kết hợp với liên kết has_and_belongs_to được trình bày trong danh danh sách và sửa đổi các thực thể đó đã bắt đầu một loạt các sự cố hiệu lực bộ nhớ cache thông qua chuỗi liên kết.

![](https://images.viblo.asia/790a8bda-d7c8-4e8b-8283-9eeffe928d1e.jpg)

```ruby
class Event < ActiveRecord::Base
  has_many :participants
  has_many :users, through: :participants
end
class Participant < ActiveRecord::Base
  belongs_to :event
  belongs_to :user
end
class User < ActiveRecord::Base
  has_many :participants
  has_many :events, through :participants
end
```

Vì vậy, đối với giao diện người dùng ở trên, sẽ vô lý khi *touch* vào participant hoặc event khi vị trí của User thay đổi. Nhưng chúng ta nên *touch* vào cả event và participant khi tên của user thay đổi, phải không?	

Mặc dù Rails là rất hiệu quả cho những điều đơn giản, nhưng chắc chắn mỗi dự án thực sự đều có những sự phiền toái riêng của chúng.

### Field Level Rails Cache Invalidation

Tôi đã sử dụng Ruby DSL để xử lý các tình huống như trên. Nó cho phép bạn chỉ định khai báo các trường sẽ kích hoạt tính hợp lệ của bộ nhớ cache thông qua associations.

Hãy cùng xem một vài ví dụ:

EX1:
```ruby
class Event < ActiveRecord::Base
  include Touchable
  ...
  has_many :tasks
  ...
  touch :tasks, in_case_of_modified_fields: [:name]
  ...
end

class Task < ActiveRecord::Base
  belongs_to :event
end
```

Đoạn mã này tận dụng khả năng lập trình meta và khả năng DSL bên trong Ruby.

Để cụ thể hơn, việc chỉ thay đổi name trong event sẽ làm mất hiệu lực bộ nhớ đệm của các tác vụ liên quan đến tasks. Thay đổi các trường của event - giống như mục định hoặc location - sẽ không làm mất hiệu lực của bộ nhớ cache phân mảnh của task. Tôi sẽ gọi đó là field-level fine-grained cache invalidation control.

![](https://images.viblo.asia/9bb372b6-12df-4381-a40f-5b6d82cc4fe5.jpg)

EX2:

Chúng ta hãy xem một ví dụ cho thấy sự mất hiệu lực của bộ nhớ cache thông qua liên kết has_many. Phân đoạn giao diện user hiển thị bên dưới cho thấy task và chủ sở hữu của nó:

![](https://images.viblo.asia/af7eeadc-c0ea-4f5d-8d28-05450548b51b.jpg)

Đối với giao diện user, đoạn HTML đại diện cho task sẽ bị vô hiệu hóa chỉ khi task thay đổi hoặc khi tên của chủ sở hữu thay đổi. Nếu tất cả các trường khác của chủ sở hữu thay đổi (như time zone hoặc các tùy chọn khác), thì bộ nhớ cache của task phải được giữ nguyên.

Điều này được thể hiện bằng cách sử dụng DSL như sau:

```ruby
class User < ActiveRecord::Base
  include Touchable
  touch :tasks, in_case_of_modified_fields: [:first_name, :last_name]
...
end
class Task < ActiveRecord::Base
  has_one owner, class_name: :User
end
```

### Implementation of the DSL

Bản chất chính của DSL là phương thức touch. Đối số đầu tiên của nó là một association, và đối số tiếp theo là danh sách các trường kích hoạt sự liên lạc trên liên kết đó:

```ruby
touch :tasks, in_case_of_modified_fields: [:first_name, :last_name]
```

Phương thức trên được cung cấp bởi module *Touchable*:

```ruby
module Touchable
  extend ActiveSupport::Concern
  included do
    before_save :check_touchable_entities
    after_save :touch_marked_entities
  end
  module ClassMethods
    def touch association, options
      @touchable_associations ||= {}
      @touchable_associations[association] = options
    end
  end
end
```

Trong đoạn mã này, điểm chính là chúng ta lưu trữ các đối của việc gọi *touch*. Sau đó, trước khi lưu thực thể, chúng ta đánh dấu liên kết bị dirty nếu trường được chỉ định đã được sửa đổi. Chúng ta *touch* vào các thực thể trong liên kết đó sau khi lưu nếu liên kết bị dirty.

Cùng xem những function private của của module:

  ```ruby
private
  def klass_level_meta_info
    self.class.instance_variable_get('@touchable_associations')
  end
  def meta_info
    @meta_info ||= {}
  end
  def check_touchable_entities
    return unless klass_level_meta_info.present?
    klass_level_meta_info.each_pair do |association, change_triggering_fields|
      if any_of_the_declared_field_changed?(change_triggering_fields)
        meta_info[association] = true
      end
    end
  end
  def any_of_the_declared_field_changed?(options)
    (options[:in_case_of_modified_fields] & changes.keys.map{|x|x.to_sym}).present?
  end
```

Trong phương thức *check_touchable_entities*, chúng ta kiểm tra xem trường khai báo có thay đổi không. Nếu có, chúng ta đánh dấu sự liên kết là dirty bằng cách đặt meta_info[association] thành true.

Sau đó, sau khi lưu thực thể, chúng ta kiểm tra các liên kết dirty và *touch* vào các thực thể trong đó nếu cần:


```ruby
  def touch_marked_entities
    return unless klass_level_meta_info.present?
    klass_level_meta_info.each_key do |association_key|
      if meta_info[association_key]
        association = send(association_key)
        association.update_all(updated_at: Time.zone.now)
        meta_info[association_key] = false
      end
    end
  end
```

Và đó là *touch*! Bây giờ bạn có thể thực hiên vô hiệu hóa bộ nhớ cache cấp trường trong Rails bằng DSL một cách đơn giản.

Rails caching hứa hẹn sẽ mang lại cải tiến hiệu suất trong ứng dụng của bạn một cách dễ dàng. Tuy nhiên, các ứng dụng trong thực tế có thể phức tạp và thường đặt ra những thách thức riêng. Bộ nhớ cache Rails mặc định hoạt động tốt cho hầu hết các trường hợp, nhưng có một số trường hợp mà tối ưu hóa ít hơn một chút trong việc vô hiệu hóa bộ nhớ cache có thể là một chặng đường cần nhiều thời gian.

Nguồn tham khảo: https://www.toptal.com/ruby-on-rails/field-level-rails-cache-invalidation