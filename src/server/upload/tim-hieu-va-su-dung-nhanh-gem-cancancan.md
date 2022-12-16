Chào các bạn, hôm nay chúng ta cùng tìm hiểu về gem Cancancan nhé (https://github.com/CanCanCommunity/cancancan). Thực ra là đã có khá là nhiều bài viết nói về gem này, tuy nhiên mình vẫn thấy còn thiếu vài điều cần sử dụng khi làm ở dự án thực tế. Do đó, mục tiêu của bài viết này là:

* Giới thiệu cách setup và cài đặt Cancancan.
* Sử dụng Cancancan để đọc permissions từ file JSON hoặc từ dữ liệu trong data.
* Xử lý phân quyền trong các trường hợp controller không liên quan gì đến model. 

Chúng ta cùng bắt đầu nhé.

# Giới thiệu và cài đặt Cancancan

Khi sử dụng bất kỳ một Gem nào thì chúng ta nên vào https://rubygems.org và search tên Gem đó ra và copy version. Ở đây mình search sẵn Cancancan rồi: https://rubygems.org/gems/cancancan
Trong link trên thì nó có đầy đủ tất cả những điều cần thiết: `Trang chủ, wiki, documents, source code, ....`, các bạn có thể xem ở mục `Links` nằm phía dưới góc phải.

Tiến hành copy và bỏ vào Gemfile của chúng ta nào:
```
gem 'cancancan', '~> 2.3'
```

Sau đó chạy 2 dòng lệnh sau:

```
bundle install
rails g cancan:ability # Tạo ra file app/models/ability.rb để quản lý permissions.
```

Thế là xong, cài đặt xong rồi, chúng ta sang phần trọng tâm là phần SỬ DỤNG chúng như thế nào.

# Sử dụng Cancancan

Như đã đề cập ở phần đầu, bài viết sẽ sử dụng Cancancan đọc file JSON hoặc dữ liệu JSON từ DB để phân quyền. Không như cách thông thường sẽ `set` cứng phần permission này.

**(Các bạn vui lòng truy cập vào link - https://github.com/CanCanCommunity/cancancan/wiki/defining-abilities xem cách thường sử dụng để phân quyền ra sao nhé)**

Đối với cách trên hay cách sử dụng JSON thì nó cũng như nhau, tuy nhiên cách trên chỉ áp dụng đối với dự án đã có hệ thống phân quyền ngay từ đầu. Nếu ngược lại, giả sử có một màn hình tạo table `Role`, sau đó dựa trên table này để phân quyền thì mỗi lần tạo record mới lại phải vào `app/models/ability.rb` sửa code lại.

Giả sử ta có cặp quan hệ `Admin` và `Role` như sau:

```
class Admin < ApplicationRecord
  belongs_to role
  
  delegate :permissions, to: :role, prefix: true
end

class Role < ApplicationRecord
  enum type: {manager: 1, user: 2}
  serialize :permissions, Hash
end


# Admin gồm:
ID, role_id
# Role gồm:
ID, permissions, type
```

Để sử dụng Ability với JSON thì ta cần tìm hiểu chút về cách nó hoạt động:

- Khi một Admin truy cập vào một Controller, Cancancan sẽ check xem Controller đó có được giao nhiệm vụ `authorize` hay không bằng function `authorize_resource` hoặc `authorize!`
- Nếu có nó sẽ vào `app/models/ability.rb` để check dựa trên function `initialize` trong này.

```
class Ability
  include CanCan::Ability

  def initialize(admin)
    # Kiểm tra role trong này.
  end
end
```
- Để có thể check được roles của thằng đang login sẽ được những role gì. Ta có thể `binding.pry` bên trong `initialize` của `app/models/ability.rb` hoặc dưới function `current_ability` ở `ApplicationController` bằng câu lệnh:
```
ability.permissions
```

```
def ApplicationController < ActionController::Base
  def current_ability
    @current_ability ||= Ability.new(current_admin)
    binding.pry # Type @currentt_ability.permissions
  end
end
```

HOẶC:

```
class Ability
  include CanCan::Ability

  def initialize(admin)
    binding.pry # Type Ability.new(admin).permissions
  end
end
```

* Khi debug sẽ thấy permissions của sẽ được Cancancan format như sau:

```
{
  can: {...},
  can_not: {...}
}
```

Vì vậy, ta cần phải lưu format của thằng Role.permissions sao cho phù hợp với format trên bằng kiểu sau:

```
Role.permissions = {
  {[create, :read, :update, :destroy], otherModelName1},
  {[:manage], otherModelName2},
  {[:custom_ability], otherModelName3}
}
```

# Sử dụng Cancancan (Phần code)

Khi đã hiểu về cách lưu trữ JSON dạng như thế nào rồi, ta tiến hành code:

- Mặc định Cancancan sẽ check ability cho User, nếu bạn nào sử dụng để check cho User thì bỏ qua bước này, còn nếu check cho model khác User (ở đây là Admin) thì:
```
class ApplicationController < ActionController::Base
  # Thêm current_ability vào:
  
  def current_ability
    @current_ability ||= Ability.new(current_admin)
  end
end
```
- **Tiến hành định nghĩa file `ability.rb`:**
```
class Ability
  include CanCan::Ability

  def initialize(admin)
    admin.role_permissions.each do |subject, actions|
      can actions, (klass = subject.to_s.classify.safe_constantize) ? klass : (subject.to_sym)
    end
  end
end

# admin.role_permissions sẽ có dạng:
{
 {[:create, :read, :update, :destroy], Model1},
 {[:manage], Model2},
 {[:custom_ability], Model3}
}

# admin.role_permissions.each do |subject, actions| sẽ check từng element trong JSON trên:

# (klass = subject.to_s.classify.safe_constantize) ? klass : (subject.to_sym)
sẽ check nếu Model1, Model2, Model3 có khả năng không phải là controller có tác động đến Model thì sẽ chuyển sang to_sym.
VD: Giả sử có controller: ViewCalendarController sẽ không tác động đến model nào thì vào đoạn code trên nó sẽ chuyển sang to_sym để verify.
```

- **Gọi `authorize` trong controller cần sử dụng:**
```
# Ở đây giả sử tất cả Controller đều cần authorize thì ta bỏ trong ApplicationController.
# Tuy nhiên lưu ý là Controller sẽ có dạng liên quan đến Model và dạng không liên quan Model.
# Trong trường hợp liên quan model thì gọi: * authorize_resource *
# Trong trường hợp không liên quan model thì gọi: * authorize_resource class: false * 
# Lúc này sẽ check như sau:
def ApplicationController < ActionController::Base
  before_action :check_is_model
  authorize_resource if: lambda {@is_model}
  authorize_resource class: false, unless: lambda {@is_model}
  
  def check_is_model
    @is_model = controller_name.classify.constantize
  rescue NameError
    @is_model = false
  end
  
end
```

**HOẶC:**

```
Nếu chúng ta check trong từng controller một thì:
# Đối với Controller có liên quan model, đơn giản như sau:
class AdminsController < ApplicationController
  authorize_resource
end

# Đối với Controller không có liên quan model như sau:
class ViewCalendarsController < ApplicationController
  authorize_resource, class: false
  
  # Lúc này Cancancan sẽ check dưới dạng:
  # can :manage, :view_calendar (Đó là lý do chúng ta .to_sym ở app/models/ability.rb)
end
```

- Ở **View** thì:

```
# Đơn giản sử dụng cú pháp can?

<% if can? :read, Staff %>
  # Hiển thị data
<% end %>

<% if can? :read, :view_calendar %>
  # Hiển thị calendar
<% end %>

<% if can? :custom_ability, OtherModel %>
  # Hiển thị gì gì đó
<% end %>
```

- Nếu trong trường hợp cần check nhiều điều kiện để hiển thị thì:

```
Thay vì sử dụng: <% if can?(:read, Staff) || can?(:read, Admin) %> để check multiple condition, mình nghĩ nên định nghĩa trong Helper function:

# app/helpers/application_helper.rb - hoặc ở đâu đó tuỳ bạn
module ApplicationHelper
  def check_ability_for_view subjects
    subjects.find{|subject| can? :read, subject}.present?
  end
end

# Sau đó trong view gọi như sau:

<% if can?(:read, Staff) || can?(:read, Admin) || can?(:read, :view_calendar) %>

Trở thành ====> 

<% if check_ability_for_view [Staff, Admin, :view_calendar] %>
```

Vậy là xong!!!

Cảm ơn các bạn đã theo dõi, hẹn gặp lại các bạn ở phần tiếp theo!