Trong nhiều trường hợp, để hiển nội dung hay thông tin của một object ta cần phải xây dựng thêm các method trong Model hoặc trong Presenter nhằm làm giảm tối đa việt sử dụng logic ở ngoài view. Gem Draper là một gem rất mạnh giúp chung ta có thể thực hiện công việc đó một cách cực kỳ linh hoạt. Ngày hôm nay chúng ta sẽ đi tìm hiểu về cách thức hoạt động của nó.
## Trước tiên là phần cài đặt
Đơn giản là bạn chỉ cần add thêm dòng dưới đây vào Gemfile
```
gem "draper"
```
Sau đó run bundle install để cài đặt
## Object Decorator
Chúng ta có một model User với các thuộc tính là `first_name` và `last_name`
```
class User < ActiveRecord::Base
  belongs_to :company
  validates_presence_of :first_name, :last_name
end
```
Ở ngoài view chúng ta muốn show ra tên đầy đủ của một user chúng ta có thể viết một hàm đơn giản trong model, tuy nhiên có thể thấy hàm này chỉ sử dụng cho mục đích hiển thị và không thường xuyên được sử dụng. Vì vậy đặt những hàm như thế trong model không phải là một cách làm đúng đắn. Drapter sẽ giúp chúng ta giải quyết vấn đề đó bằng việc tạo ra một object có tất cả những method cần thiết dựa trên một object ban đầu. Trong thư mục `app/decorators` chúng ta thêm một class `UserDecorator` có nội dung như sau:
```
class UserDecorator < Draper::Decorator
  delegate_all
    
  def full_name
    "#{first_name} #{last_name}"
  end
end
```
Bên trên chúng ta gọi ra hai hàm `first_name` và `last_name`. Hai hàm này chưa được khai báo trong class `UserDecorator` vậy chúng ta lấy nó ở đâu. Đó là do method `delegate_all` của class` Draper::Decorator`
```
def self.delegate_all
  include Draper::AutomaticDelegation
end
```
Method này include module `Draper::AutomaticDelegation`. Đi vào trong module này chúng ta thấy `method_missing` được overide như sau:
```
def method_missing(method, args, &block)
  return super unless delegatable?(method)
  object.send(method, args, &block)
end
```
Khi gọi đến hai hàm `first_name` và `last_name`, đầu tiên chúng sẽ được tìm trong các method của parent decorator class. Trong trường hợp này là không tìm thấy, `method_missing` sẽ được gọi và ở đây `first_name` và `last_name` sẽ được gọi từ `object`, trong trường hợp này `object` là một `user`. Sở dĩ làm được điều này vì `Draper` có một cơ chế map tên của một `decorator class` với một `model class` tương ứng.

Khi cài đặt `Draper`, mặc định module `Draper::Decoratable `sẽ được include vào trong `ActiveRecord::Base`. Để tiện theo dõi mình xin copy những đoạn code quan trọng của module này vào đây:

```
module Draper
  module Decoratable
    extend ActiveSupport::Concern
    include Draper::Decoratable::Equality

    def decorate(options = {})
      decorator_class.decorate(self, options)
    end

    def decorator_class
      self.class.decorator_class
    end

    module ClassMethods
      def decorate(options = {})
        decorator_class.decorate_collection(all, options.reverse_merge(with: nil))
      end

      def decorator_class(called_on = self)
        prefix = respond_to?(:model_name) ? model_name : name
        decorator_name = "#{prefix}Decorator"
        decorator_name_constant = decorator_name.safe_constantize
        return decorator_name_constant unless decorator_name_constant.nil?

        if superclass.respond_to?(:decorator_class)
          superclass.decorator_class(called_on)
        else
          raise Draper::UninferrableDecoratorError.new(called_on)
        end
      end
    end
  end
end
```
Chúng ta thấy có một class method tên là decorator_class. Method này trả về một `decorator class` có tên tương ứng với model hiện tại ` decorator_name = "#{prefix}Decorator"`. Tiếp theo là môt `class method` khác có tên là `decorate`. Method này có nhiệm vụ là decorate cho tất cả các object của model. Hàm mà chúng ta hay gọi nhất cũng có tên là `decorate` tuy nhiên đây không phải là một `class method` mà là một `instance method.`
```
def decorate(options = {})
  decorator_class.decorate(self, options)
end
```
Method này khởi tạo và trả về một `decorator object` tương ứng với `object` hiện tại.  Câu lệnh `decorator_class.decorate(self, options)` tương đương với `decorator_class.new(self, options`).
Vậy tóm lại là khi ta thực hiện đoạn code sau, những cách gọi dưới đây là tương đương nhau:
```
user = User.new first_name: "Lam", last_name: "Do"

user.decorate.full_name
user.decorator_class.decorate(user).full_name
user.decorator_class.new(user).full_name
UserDecorator.new(user).full_name
```
## Collection Decorator
Ta có một model nữa có quan hệ với model `User` như sau
```
class Company < ActiveRecord::Base
 has_many :user
end
```
Khi chạy đoạn code dưới đây thì điều gì sẽ xảy ra
```
company = Company.first
company.users.decorate
```
Khi này `company.users` là một collection. `Draper` sẽ tìm một `collection decorator class` tương ứng. Ví dụ `User` sẽ map với `UsersDecorator` nếu không có class này thì mặc định class được dùng sẽ là `Draper::CollectionDecorate.`

Như vậy khi gọi `company.users.decorate` sẽ tương đương với `UsersDecorate.new(company.users)` nếu như class `UsersDecorator` đã được định nghĩa, trong trường hợp này là không như vậy đoạn code trên sẽ tương đương với `Draper::CollectionDecorator.new(company.users)`
Việc decorate một collection đơn giản là việc decorate từng element có trong collection đó
## Kết luận
Mình vừa trình bày xong cách thức hoạt động cơ bản của Drapter. Hi vọng nó sẽ giúp mọi người hiểu rõ hơn về Drapter để có thể sử dụng nó một cách hiệu quả nhất