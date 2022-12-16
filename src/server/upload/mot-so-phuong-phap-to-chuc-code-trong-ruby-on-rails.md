Tôi nghĩ rất nhiều bạn đã gặp phải vấn đề với ứng dụng Rails của bạn. Nó càng ngày càng nở lớn ra, thực sự rất khó để bảo trì? Bạn có quá nhiều `models` và chúng quá lớn? Rất khó để tìm kiếm gì đó trong code và bạn phải lặp lại nó ở nhiều chỗ? Tôi nghĩ đó là điều không tránh khỏi.

Mặc định, Rails chỉ cho chúng ta ba lớp - `models`, `controllers` và `views`. Ồ, tôi quên mất, chúng ta còn có cả `helpers`!

Tôi đã thử chuẩn bị một vài pattern và lời khuyên có thể có ích cho bạn - có thể bạn đang gặp phải chính vấn đề này ngay bây giờ! Đừng coi nó như một "thần dược chữa bách bệnh", không có thứ gì là như vậy. Mọi dự án và ứng dụng đều khác biệt, nó có logic và các phần khác nhau. Một vài là các ứng dụng nguyên khối lớn và một số khác vẫn nhỏ nhưng càng ngày càng khó bảo trì. Hơn nữa, thực sự khó để đưa ra lời khuyên cho một project mà chưa đọc qua code. Có thể vấn đề là do bạn đã chọn nhầm công nghệ, gem - quá khó đoán, tuy nhiên tôi nghĩ chắc chắn bạn sẽ tận dụng được điều gì đó. Nào hãy cùng bắt đầu.

## Namespaces
`Namespaces` giống như là một best practice hơn là một pattern. Hầu hết các ngôn ngữ lập trình đều có tính năng này. Nhờ có nó, thật dễ dàng để tổ chức mọi thứ. Tôi tin rằng mỗi phần, feature hay logic trong một ứng dụng nên được tách biệt trong `namespace` riêng. Nếu bạn thắc mắc thì làm việc và bảo trì một ứng dụng có logic và file tách biệt sẽ dễ hơn nhiều, so với ứng dụng có tất cả mọi thứ trong model và controller, không có quy tắc đặt tên nào (naming convention).

Tưởng tượng rằng bạn đang xây dựng một ứng dụng lớn - bạn chịu trách nhiệm cho chức năng tạo và gửi hóa đơn. Bạn sẽ tổ chức code như thế nào? Sử dụng **service object** như `GenerateInvoice`, `SendInvoice`? hay viết trong các **model** như `InvoiceLineItem`. `Invoice`?

Có thể đó là một ý tưởng tốt, nhưng khi bạn đã thêm nhiều class và logic liên quan, bạn sẽ gặp phải một codebase lộn xộn. Hơn nữa, cấu trúc thư mục sẽ không được đẹp khi mở thư mục model/services và có hơn **300** file trong đó.

Vậy nên tách biệt mọi thứ như nào? Hãy bắt đầu với đối tượng chính mà bạn đang xây dựng. Lấy `Invoice` class làm ví dụ. Tôi nghĩ rằng chúng ta nên tạo một `namespace` invoices. Trong đó, tạo một thư mục, như là line_items, lưu trữ mội thứ liên quan tới invoice line items.

Sau đó, bạn nên nghĩ tới logic của đối tượng. Nó làm gì và chịu trách nhiệm cho việc gì? Nếu là tạo file, hãy tạo các thư mục tương ứng, ví dụ như pdf, HTML. Bạn cũng có thể chuyển các logic chung vào base class.
Bằng cách này, namespace sẽ có dạng:
```ruby
module Invoice
  module Generate
    class Base
      ...
    end
  end
end

module Invoice
  module Generate
    class PDF < Base
      ...
    end
  end
end

module Invoice
  module Generate
    class HTML < Base
      ...
    end
  end
end
```
Rõ ràng hơn nhiều, đúng không?
## Model namespaces
Như đã đề cập ở phần trước, khi bạn có các model phức tạp như Invoice, InvoiceLineItem hay InvoiceTemplate, bạn nên thêm namespace để tách biệt chúng dễ dàng.

Ở trường hợp này, hãy tạo `model` Invoice::LineItem hoặc Invoice::Template. Còn với Invoice thì sao? Không nên tạo thứ gì đó như là Invoice::Invoice mà cân nhắc tạo Invoice::Model hay Invoice::Entity. Tôi không nghĩ Invoice::Base là một ý tưởng hay.
## Controller namespaces
Một phần quan trọng không kém trong ứng dụng của bạn là controller namspacing, nhất là tạo những top-level namespace - ngay dưới thư mục controller, ví dụ như web, api, web/admin, web/user, api/user, api/admin. 

Trong web namespace, chúng ta nên lưu tất cả mọi thứ mà có liên kết đến webpage và có thể truy cập bởi mọi user, admin, mà không phải là một api.

Trong api namespace, chúng ta nên lưu mọi thứ liên kết với api và hạn chế truy cập bởi api key,.. Thực sự dễ dàng hơn khi bảo trì, bạn có thể viết thêm một số trường hợp hạn chế truy cập cho phần api của ứng dụng (base_controller.rb) và nó không ảnh hưởng gì tới các namespace khác. Hơn nữa chúng ta còn có thể quản lý phiên bản của api cũng bằng namespace (v1, v2,...).

Trong admin namespace, chúng ta nên lưu mọi thứ liên kết tới admin như tạo tài khoản, quản lý sản phẩm,... và chỉ có thể truy cập bởi admin. Và cũng như trên, mọi quy tắc xác thực, phân quyền đều riêng biệt cho namespace này.

Cuối cùng là user namespace, lưu trữ các logic phía người dùng, bao gồm đăng ký, đăng nhập và một vài hành động trên dashboard,...

Cấu trúc thư mục tham khảo:
```ruby
-> controllers
  -> api
    -> users
      -> v1
  -> web
    -> admins
      -> base_controller.rb
      ...
    -> users
```
## Models
Những ngày đầu làm việc với Rails, chúng ta thường lưu trữ mọi thứ trong models, gồm các phương thức truy vấn dữ liệu, rồi phương thức chứa logic phức tạp, validations, scopes, relationships,... Thực sự nó nên chứa những gì? Với tôi, sau khi làm việc với nhiều Rails app, tôi nghĩ rằng model chỉ nên chứa nhưng relationships, gems methods, và có thể vài validation cơ bản. Nếu bạn không tin tôi hoặc không cảm thấy cần thiết, hãy xem xét dưới đây.

`scope` có thể được thay thế bởi `repositories`, `model logic` bằng `service`, `validation` bằng `form objects`, `formatting data` (ví dụ như phương thức as_json) bằng `serializer`,...
Trong trường hợp này, chúng ta sẽ có một model chỉ bảo gồm code cho việc định nghĩa quan hệ giữa các bảng.
```
class User < ActiveRecord::Base
  has_many :marks
  belongs_to :classroom
end
```
Rất ngắn gọn, phần logic còn lại được định nghĩa ở các lớp khác!

Tôi không ưa callbacks nên tôi sẽ không viết về chúng, có thể chúng trông tiện lợi lúc đầu, nhưng sau đó bạn sẽ dành hàng giờ để xác định tại sao code không hoạt động và thật ra là do một callback đã kích hoạt một callback khác (khá là ma giáo).
## Repositories
Cơ bản thì repository là gì? Với tôi, nó là một lớp chịu trách nhiệm giao tiếp và kết nối với database, truy xuất, tạo mới và xóa dữ liệu. Nhờ nó mà bạn có thể tách các logic liên quan tới ActiveRecord queries.

Tưởng tượng bây giờ, models hoặc controller sẽ ngắn gọn hơn biết bao nếu bạn chuyển logic tới repositories? Hơn nữa, nhờ có thêm một tầng nữa trong mô hình ứng dụng, mọi thứ sẽ trở nên rõ ràng hơn, bạn sẽ biết ngay rằng những thứ như queries được lưu trữ ở đâu. Tôi nghĩ rằng kể cả các dev mới join vào dự án cũng dễ dàng tìm ra nhờ nó.

Vậy làm thế nào đề thiết kế repository pattern? Tôi nghĩ rằng cách dễ nhất là tạo một **Base** class, định nghĩa tất cả các phương thức chính như find, update, create. Các class cụ thể sẽ kế thừa từ đó và lưu trữ thêm các phương thức tùy chọn (cơ bản giống như Rails scopes).

Ví dụ
```ruby
module Repositories
  class RecordNotFoundError < StandardError; end
  
  class Base
    def all
      entity_dataset
    end
    
    def first
      entity_dataset.first
    end
    
    def last
      entity_dataset.last
    end
   
   def find(id)
     entitty_dataset.find(id)
   rescue ActiveRecord::RecordNotFound => e
     raise RecordNotFoundError, e
  end
  
  def create(attributes)
      entity.create(**attributes)
  end
```

và đây là một ví dụ cho User repository:
```ruby
module Repositories
  class User < Base
    def most_recent_by_name(name:, limit:)
      entity_dataset.
        where(name: name).
        order(:created_at).
        limit(limit)
    end
    
    private
    
    def entity
      User
    end
  end
end
```

Tất nhiên là bạn có thể thêm nhiều phương thức vào base class như transaction, khởi tạo bản ghi mới,...

Còn về cách đặt tên - UserRepository hay Repositories::Users đều ổn nên hãy chọn cái nào bạn thấy phù hợp
## Decorators
Decorators are object which collect methods which can be responsible for formatting or printing data or objects.
SimpleDelegator?
Khá là chắc bạn đã từng viết một phương thức như thế này trong model:
```ruby
def formatted_printed_on
  printed_on.strftime("Printed on %m/%d/%Y")
end
```
Đúng là model không phải là nơi thích hợp để lưu những phương thức trên (hay thậm chí là concerns hay helpers). Vậy nên đặt chúng ở đâu? Decorators chính là câu trả lời. Các phương thức chịu trách nhiệm format và hiển thị dữ liệu sẽ được lưu ở đây. Trong Rails, bạn chỉ việc tạo một ModelDecorator kế thừa từ SimpleDelegator:
```ruby
class InvoiceDecorator < SimpleDelegator  
  def formatted_printed_on    
    printed_on.strftime("Printed on %m/%d/%Y")
  end
end

# Khi sử dụng
InvoiceDecorator.new(invoice).formatted_printed_on
```

## FormObjects
Bạn đã bao giờ gặp phải vấn đề về validation trong model? Một số phần của ứng dụng vần validation khác với các phần còn lại. Thực tế là như vậy, ứng dụng của chúng ta thường cần khá nhiều form, nếu đã có form tạo thì tất nhiên phải có form edit. Và chẳng may chúng cần validation khác nhau thì kết quả có thể sẽ là một mớ hỗn độn điều kiện, callbacks. 

Đó là lí do FormObject ra đời - một class chịu trách nhiệm cho việc create, validate một instace của form, và tất nhiên là cung cấp tách biệt rõ ràng.

Làm sao để sử dụng pattern này trong Rails, bạn chỉ cần include ActiveModel::Model module là có thể thêm các validation, sử dụng phương thức `valid?` để quyết định logic tiếp theo. Đây là một ví dụ:

```ruby
class RegistrationForm
  include ActiveModel::Model

  attr_accessor :email, :first_name, :last_name

  validates :email, presence: true, email: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  
  def call
    if valid?
      create_user
    else
      false
    end
  end
  
  def persisted?
    false
  end

  private

  def create_user
    # put your logic here
  end
end
```

Nhờ vậy mà model và controller sẽ ngắn gọn hơn nhiều:

```ruby
class MyController < BaseController
  def create
    @form = RegistrationForm.new(user_params)
    
    if @form.call
      redirect_to some_path
    else
      render :my_view
    end
  end
  
  private
  
  def user_params
  end
end
```

## Entities
Entities về cơ bản là các object với các thuộc tính được quy định sẵn. Tưởng tượng rằng bạn cần một object được xây dựng dựa trên API response (ví dụ như lấy dữ liệu từ JSON response và khởi tạo object cho các mục đích sau này) hoặc bạn chỉ cần có một object để tách biệt công việc format dữ liệu. Chúng có thể trông rất đơn giản, thuần Ruby như sau:
```ruby
module Entities
    class User
        attr_accessor :first_name, :last_name
        
        def initialize(first_name:, last_name:)
            @first_name = first_name
            @last_name = last_name
        end
    end
end
```

## Services
Tôi nghĩ rằng đây là một trong những pattern phổ biến nhất trong Rails. Vậy service object là gì? Về cơ bản, chúng là nơi lưu trữ cho các logic độc lập, gần giống như là thư mục lib mà chúng ta thường thấy trong lập trình. Nghĩa là thay vì thêm nhiều method vào model đến mức không quản lý nổi hay ngay cả sử dụng concern cũng chỉ chia nhở code model ra nhiều file:
```ruby
class Model < ActiveRecord::Báe
    include MyConcern
    include MyOtherConcern
end
```

Bạn có thể sử dụng service object chịu trách nhiệm cho một công việc duy nhất, 
## Kết quả
Vậy là chúng ta đã sơ lược qua một số cách giúp việc quản lý và bảo trì ứng dụng Rails của bạn trở nên dễ dàng hơn. Như đã nói ở phần đầu, mọi thứ còn phụ thuộc vào hoàn cảnh và vấn đề bạn đang gặp nên hãy tìm hiều sâu hơn để có thể áp dụng một cách tốt nhất, linh hoạt nhất.

Hi vọng bài viết giúp ích được cho các bạn ^^