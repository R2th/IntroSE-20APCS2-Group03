Validation được sử dụng để đảm bảo rằng chỉ có dữ liệu hợp lệ được lưu vào cơ sở dữ liệu của bạn. Ví dụ laf để đảm bảo rằng mỗi người dùng khi đăng ký một tài khoản ở một hệ thống bất kỳ, email mà họ nhập là một địa chỉ email hợp lệ về format, không bị trùng lặp với email đã tồn tại trước. Có nhiều cách để xác nhận dữ liệu trước khi nó được lưu vào cơ sở dữ liệu như là client-side validations (xác thực ở client), controller-level validations (xác thực ở controller), and model-level validations (xác thực ở model).

Ở bài viết này mình sẽ nhắc lại một số cách validation cơ bản và tập trung vào việc custom nhé.

# Lướt lại validation cơ bản trong rails
Validation hay còn gọi là kiểm chứng, được sử dụng để đảm bảo tính hợp lệ của data trước khi lưu vào database. Ví dụ, khi bạn đăng ký một tài khoản facebook, tên đăng nhập của bạn phải đúng format yêu cầu như: không chứa ký tự đặc biệt, không được trùng lặp với những tên đăng nhập đã tồn tại,.... 
Thông thường thì việc validation sẽ được thực hiện ở 2 tầng là Client và Server. Đầu tiên bạn phải pass qua được validation ở Client thì data của bạn mới tiếp tục được gửi lên server để thực hiện kiểm chứng tiếp sau đó mới được lưu vào DB. Ở bài viết này mình sẽ giới thiệu về validation ở server bằng Rails

Ở server có 2 cách validation đó là Controller-level validations và Model-level validations như mình có đề cập bên trên, tuy nhiên thì thông thường mọi người hay sử dụng Model để validate hơn vì nó có nhiều mặt tối ưu hơn như dễ bảo trì hơn, và độ bao phủ toàn diện hơn, đảm bảo bất cứ data nào muốn vào DB của bạn đều phải được validate chặt chẽ

Ở trong Rails đã hỗ trợ gần như đầy đủ các loại validation mà mọi dự án đều dùng như:
```
presence: Tương tự NOT NULL trong Mysql
uniqueness: Không cho phép trùng dữ liệu
length: Độ dài của dữ liệu
inclusion: Bắt buộc dữ liệu phải thuộc trong list có sẵn
email: kiểm chứng tính hợp lệ cho column email
numericality: Validate cho kiểu dữ liệu là số
```

Cách sử dụng  của những option này khá đơn giản
```
validates :column_name, numericality: true #Chỉ được là số
validates :column_name, numericality: {less_than_or_equal_to: 100, greater_than_or_equal_to: 0, only_integer: true # #Chỉ được là số và <100 && >10
```
Ngoài ra, validate cũng hỗ trợ cho việc check điều kiện VD
```
validates :full_name, length: {maximum: 100} if: ->(obj) {obj.full_name.present?} 
```

Để check tránh trường hợp lặp lại việc check cùng 1 điều kiên thì rails có hỗ trợ with_option (thật ra ta có thể dùng để gom validation để check, k nhất thiết là check điều kiện)
```
  with_options if: :is_admin? do |admin|
    admin.validates :password, length: { minimum: 10 }
    admin.validates :email, presence: true
    ......
  end
```

# Customize validation
## Custom trực tiếp trong model
Đây là phương pháp custom thường được sử dụng nhất, bằng cách define một hàm để check trực tiếp trong model. VD:
```
class Holiday < ApplicationRecord
  validate :valid_start_date?
end

private

def valid_start_date?
  errors.add :start_date, "Start date must be greater than End date" if start_date < end_date
end
```
Rất đơn giản phải không? Để tránh mất thời gian thì mình sẽ giới thiệu luôn cách custom "sạch" hơn ở bên dưới
## Validate qua class custom
### Kế thừa ActiveModel::Validator
Để Custom validation ta cần tạo 1 class và kế thừa ActiveModel::Validator thực hiện phương thức validate, lấy bản ghi để xác thực làm đối số. Thông thường sẽ nằm trong dir app/validators/custom_file.rb
```
class MyValidator < ActiveModel::Validator
  def validate(record)
    unless record.name.length < 100
      record.errors.add :name, "Invalid max length"
    end
    
        unless record.name.length > 10
      record.errors.add :name, "Invalid minimum length"
    end
  end
end
```

Sau đó, ở trong model User ta chỉ cần khai báo như bên dưới là xong

```
class User
  include ActiveModel::Validations
  validates_with MyValidator
end
```

Với file custom này ta có thể tái sử dụng cho những Model có thuộc tính name :grinning:

### Kế thừa ActiveModel::EachValidator
Cách dễ nhất để validate các thuộc tính riêng lẻ là tạo một class validate kế thừa ActiveModel :: EachValidator. Trong trường hợp này, validate_each có ba đối số: record, attribute, value.

Để dễ hiểu hơn thì các bạn xem ví dụ dưới đây, mình tạo một class để validate riêng cho attribute email
```
class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attr_name, value)
    unless value =~ /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i
      record.errors.add(attr_name, :email, options.merge(:value => value))
    end
  end
end
```

Ở trong model User, ta viết :
```
class User < ApplicationRecord
    validates :email, email: true
end
```

Vậy là xong, rất tiện dụng phải không :D Với cách custom này code ở Model sẽ sạch hơn rất nhiều

Chốt lại, có nhiều cách validate data, tùy vào tính chất, hoàn cảnh mà bạn nên/không nên custom. Và cũng có nhiều cách để custom validate luôn :D Hãy cân nhắc chọn phương án phù hợp để code sạch đẹp và dễ hiểu nhé ^^

Tham khảo:
https://guides.rubyonrails.org/active_record_validations.html#custom-validators