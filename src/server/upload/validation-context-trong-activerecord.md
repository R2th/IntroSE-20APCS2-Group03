![image.png](https://images.viblo.asia/d437a268-7e22-41f5-9236-76b04125484c.png)

### Giới thiệu
Validation contexts là một tính năng vô cùng thiết thực của ActiveRecord. Đó là một cách để ràng buộc xác thực mô hình trong một ngữ cảnh sử dụng cụ thể cho một bản ghi. 

### Cách dùng
Ở đây mình có 1 model là User

```ruby:user.rb
class User < ApplicationRecord
  belongs_to :club, optional: true 
  validates :name, presence: { message: "must be given please" }
  validates :club, presence: { message: "must be given please" }
end
```

name và club được validate cả khi create hoặc update user. Vấn đề ở đây là mình chỉ muốn validate cho một action nào đó thì làm thế nào? Rất đơn giản, Rails đã cung cấp cho ta một giá trị tuỳ chọn `on` cho phép ta có thể kiểm soát thời điểm validate.

```ruby:user.rb
class User < ApplicationRecord
  belongs_to :club, optional: true 
  validates :name, presence: { message: "must be given please" }, on: :create
  validates :club, presence: { message: "must be given please" }, on: :update
end
```

Điều này cho phép create user mà không cần phải có `club`, nhưng sẽ bị validte trong trường hợp update user. Điều này thường được sử dụng để cho phép người dùng đăng ký với lượng thông tin tối thiểu và sau đó buộc họ cập nhật hồ sơ của mình với nhiều thông tin hơn trong các lần truy cập tiếp theo.

Giá trị cho tùy chọn `on` không bị giới hạn chỉ cho việc để create và update mà chúng ta có thể tự tạo custom contexts của riêng mình. 

```ruby:user.rb
class User < ApplicationRecord
  validate :basic_info, on: :basic_info
  validate :education_details, on: :education_details
  validate :professional_info, on: :professional_info
  
  private
  
  def basic_info
    # Validation for basic info, first_name, last_name, email
  end

  def education_details
    # Validation for education_details
  end

  def professional_info
    # Validation for professional_info
  end
end
```

Trong user controller ta viết như sau:

```ruby:users_controller.rb
class UsersController < ApplicationController
  #do_something

  def update_basic_info
    @user.assign_attributes(basic_info_params)
    @user.save(:basic_info)
  end

  def update_education_details
    @user.assign_attributes(education_details_params)
    @user.save(:education_details)
  end

  def update_professional_info
    @user.assign_attributes(professional_info_params)
    @user.save(:professional_info)
  end

  private
  def basic_info_params
    # strong params
  end

  def education_details_params
    # strong params
  end

  def professional_info_params
    # strong params
  end
end
```

Từ Rails 5 trở đi đã hỗ trợ cho nhiều context, chúng ta có thể sử dụng nhiều context cùng nhau

```
@user.save(:basic_info, :professional_info)
```

Ngoài ra, chúng ta có thể dùng nhiều validation trong cùng 1 context với `with_options`

```
with_options on: :create do
  validates :name, presence: true
  validates :email, presence: true
end
```

Trên đây mình trình bày sơ lược về cách sử dụng validation context. Hi vọng nó giúp ích được cho các bạn. Cảm ơn các bạn đã theo dõi!