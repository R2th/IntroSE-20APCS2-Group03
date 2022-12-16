Khi nói về việc Create và Update bản ghi này thông qua bản ghi khác, thường chúng ta sẽ nghĩ ngay đến Nested Attributes. Hôm nay mình sẽ giới thiệu cho các bạn một cách khác tối ưu hơn và dễ kiểm soát hơn. Đó là Form Object.
#  1. Ví dụ
Chúng ta có 1 form đăng ký User gồm name, email, company name, phone. Người dùng sẽ nhập nhưng thông tin cơ bản như full_name, email, ngoài ra chung ta cũng yêu cầu người dùng nhập những thông tin của Company của họ như company_name, phone_number. Bài toán ở đây là chúng ta sẽ lưu thông tin 2 object cùng lúc là User và Company.
# 2. Form Object
Thay vì khai báo ``accepts_nested_attributes_for :company`` trong model User, ta tạo ra 1 class mới đặt trong folder ``app/forms``

Đầu tiên, chúng ta sẽ tạo 1 Form Object cho phần đăng ký như sau:
```
class RegistrationForm
  include ActiveModel::Model

  attr_accessor :full_name
  attr_accessor :company_name
  attr_accessor :phone
  attr_accessor :email

  validates :full_name, presence: true
  validates :company_name, presence: true
  validates :email, presence: true, email: true

  def save
    return false unless valid?
    company = Company.create(name: company_name, phone: phone)
    company.users.create(first_name: user_first_name, last_name: user_last_name, email: email)
  end

  private

  def user_first_name
    full_name.split(' ').first
  end

  def user_last_name
    full_name.split(' ')[1..-1].to_a.join(' ')
  end
end
```

Ở đây, chúng ta thực hiện validations cho các thuộc tính trên, sau đó tạo 1 method save để tạo company và user.
Việc include ``ActiveModel::Model`` để class có thể sử dụng các methods trong Model.

``attr_accessor`` sẽ tạo ra các method getter và setter.
Tiếp theo chúng ta sẽ tạo controller và view tương ứng

```
class RegistrationsController < ApplicationController
  def new
    @form = RegistrationForm.new
  end

  def create
    @form = RegistrationForm.new(registration_params)
    if @form.save
      redirect_to root_path
    else
      render :new
    end
  end

  private

  def registration_params
    params.require(:registration_form).permit(:full_name, :company_name, :phone, :email)
  end
end
```

```
<%= form_for @registration do |f| %>
  <%= f.label :company_name, t(".company_name") %>:
  <%= f.text_field :full_name %>
  ...
  <%= f.submit %>
<% end %>
```

Tất cả đều giống như chúng ta sử dụng ActiveRecord vậy.
# 3. I18n cho Form Object
Giống với I18n cho ActiveRecord, chúng ta chỉ cần thay activerecord thành activemodel trong locale là được. Ví dụ file ``en.yml``
```
en:
  activemodel:
    attributes:
      registration_form:
        phone: "Phone number"
    errors:
      models:
        registration_form:
          attributes:
            phone:
              present: "Phone number can't be blank"
```

# 4. Tham khảo
https://github.com/infinum/rails-handbook/blob/master/Design%20Patterns/Form%20Objects.md

**Cảm ơn các bạn đã theo dõi. Hy vọng bài viết này sẽ giúp ích cho các bạn!**