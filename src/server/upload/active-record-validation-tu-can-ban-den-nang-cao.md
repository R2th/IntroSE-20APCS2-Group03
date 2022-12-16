### I. Mở đầu
Chắc hẳn khi initialize một model, hay start 1 business flow thì bạn cần phải có rất nhiều validate tương ứng để có thểm đảm bảo được logic và business của dự án. Từ những điều cơ bản như `not null` hay `maximize` đến những validate phức tạp tuỳ theo yêu cầu của business. Và trong bài viết này mình sẽ giới thiệu về nhưng validation từ cơ bản đến nâng cao, giúp các bạn có thế có một cái nhìn tổng quan về nó
### II. Let's go
#### 1. Validating length của một attribute
Thường chúng ta sẽ có 2 option cơ bản nhất của việc validate length đó là 

```
:minimum - Attribute không thể nhỏ hơn giá trị length cụ thể
:maximum - Attribute không thể lớn hơn giá trị length cụ thể
:in (or :within) - Giá trị length nằm trong một khoảng cụ thể
:is - Giá trị length phải chính xác 
```
#### 2.Validates format của một attribute
Validate giá trị phải match với một `regular expression` có sử dụng `format` và `with` option
```ruby
class User < ApplicationRecord
   validates :name, format: { with: /\A\w{6,10}\z/ }
end
```

Bạn cũng có thể define a constant và set value là `regular expression` và đẩy vào `with: option`. Điều này có thể thuận tiện hơn nếu bạn sử dụng những regex phức tạp
```ruby
 PHONE_REGEX = /\A\(\d{3}\)\d{3}-\d{4}\z/ 
 validates :phone, format: { with: PHONE_REGEX }
 ```
 
Default error message là `is invalid`. Tuy nhiên, bạn có thể thay đổi với  `:message` option.
```ruby
validates :bio, format: { with: /\A\D+\z/, message: "Numbers are not allowed" }
```

Ngược lại thì tương tự như vậy, bạn có thể định những nhưng value không thoả mãn `regular expression` với `without:` option

#### 3: Validating presence của một attribute
Validate này sẽ specified attribute không rỗng
```ruby
class Person < ApplicationRecord 
  validates :name, presence: true
end
Person.create(name: "John").valid? # => true 
Person.create(name: nil).valid? # => false
```
Ngược lại bạn có thể sử dụng `absence`. Nó sử dụng `present?` method để check for `nil?` hoặc `empty value`
```ruby
class Person < ApplicationRecord
  validates :name, :login, :email, absence: true
end
```
Trong trường hợp attribute là `boolean`, bạn không thể kiểm tra sự tồn tại được (attribute sẽ không valid với `false` value). Bạn có thể kiểm tra chúng bằng cách sử dụng `inclusion` validation
```ruby
validates :attribute, inclusion: [true, false]
```

#### 4: Custom validations
Bạn có thể thêm những validations do chính bạn viết ra để đảm bảỏ được nhu cầu, và logic của business, bằng cách thêm một class mới inheriting từ `ActiveModel::Validator` hoặc từ `ActiveModel::EachValidator`. Cả hai methods đều rất giống nhau, nhưng chúng chỉ khác cách hoạt động một chút 
`ActiveModel::Validator và validates_with`

Implement `validate` method vào nơi mà record như là một argument và chạy validation ở nó. Sau đó sử dụng `validates_ưith` với class trong model
```ruby
# app/validators/starts_with_a_validator.rb
class StartsWithAValidator < ActiveModel::Validator 
  def validate(record)
    unless record.name.starts_with? 'A'
       record.errors[:name] << 'Need a name starting with A please!'
    end 
  end
end

class Person < ApplicationRecord 
  validates_with StartsWithAValidator
end
```

`ActiveModel::EachValidator and validate`
Nếu bạn muốn sử dụng new validatior và sử dụng common validate method ở trong một single param, tạo một class inheriting từ `ActiveModel::EachValidator` và implement `validate_each` cho method vào nơi mà bạn mong muốn 

```ruby
class EmailValidator < ActiveModel::EachValidator 
  def validate_each(record, attribute, value)
    unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i 
      record.errors[attribute] << (options[:message] || 'is not an email')
    end 
  end

class Person < ApplicationRecord
  validates :email, presence: true, email: true
end
```
#### 5: Validates inclusion trong một attribute
Bạn có thể kiểm tra nếu một value bao gồm một array sử dụng `inclusion:` helper. `:in` option và alias của nó, `:within` cho thấy được tập giá trị sẽ chấp nhận được các giá trị tương ứng

```ruby
class Country < ApplicationRecord
  validates :continent, inclusion: { in: %w(Africa Antartica Asia Australia
                                                                                                   Europe North America South America) }
end
```
để kiểm tra xem value không nằm trong array, ta sử dụng `exclusion:` helper
```ruby
class User < ApplicationRecord
  validates :name, exclusion: { in: %w(admin administrator owner) }
end
```

#### 6: Grouping validation
Đôi khi rất thuận tiện khi sử dụng multiple validations trong một điều kiện, Nó có thể được sử dụng `with_options`
```ruby
class User < ApplicationRecord 
  with_options if: :is_admin? do |admin|
    admin.validates :password, length: { minimum: 10 }
    admin.validates :email, presence: true 
  end
end
```
Toàn bộ validations bên trong `with_options` block sẽ được tự động pass nếu như điều kiện `if: :is_admin?` thoả mãn

#### 7: Validating numericality của một attribute
Validation này sẽ giới hạn việc thêm chỉ numeric value
```ruby
class Player < ApplicationRecord
  validates :points, numericality: true
  validates :games_played, numericality: { only_integer: true }
end
```
Bên cạnh `:only_integer`, helper này cũng accepts các options khác như sau  also accepts the following options to add constraints to acceptable values:
* `:greater_than` - Giá trị phải lớn hơn gía trị hiện tại. Và `default error message` cho option này là `"must be greater than %{count}"`.
* `:greater_than_or_equal_to` -Giá trị phải lớn hơn hoặc bằng gía trị hiện tại. Và `default error message` cho option này là  `"must be greater than or equal to %{count}"`.
* `:equal_to` - Giá trị phải  bằng gía trị hiện tại. Và `default error message` cho option này là  `"must be equal to %{count}".`
* `:less_than` -  Giá trị phải nhỏ hơn gía trị hiện tại. Và `default error message` cho option này là  ` "must be less than %{count}".`
* `:less_than_or_equal_to` - Giá trị phải nhỏ hơn hoặc bằng gía trị hiện tại. Và `default error message` cho option này là  `"must be less than or equal to %{count}".`
* `:other_than` -  Giá trị phải khác gía trị hiện tại. Và `default error message` cho option này là  `"must be other than %{count}".`
* `:odd` - Giá trị nhận vào phải là số lẻ nếu set là true.`default error message` cho option này là `"must be odd".`
* `:even` - Giá trị nhận vào phải là số chẵn nếu set là true.`default error message` cho option này là `"must be even".`
 > Mặc định, giá trị sống sẽ không nhận giá trị `nil`. Bạn có thể `allow_nil: true` để chấp nhận nó.
#### 8: Validate uniqueness của một attribute
Validation helper này sẽ check xem value của attribute có unique hay không 
```ruby
class Account < ApplicationRecord 
  validates :email, uniqueness: true
end
```

`:scope` option mà bạn có thể sử dụng để chỉ định một hoặc nhiều thuộc tính được sử dụng để giới hạn kiểm tra tính duy nhất.
```ruby
class Holiday < ApplicationRecord
  validates :name, uniqueness: { scope: :year, message: "should happen once per year" }
end
```
`:case_sensitive` option dùng để dèine rằng liệu cái giá trị unique kia có case sensitive hay không. Mặc định là true
```ruby
class Person < ApplicationRecord
  validates :name, uniqueness: { case_sensitive: false }
end
```
#### 9: Skipping Validations
Sử dụng method này nếu bạn muốn bỏ qua validations. Những methods này lưu object vào database kể cả nó invalid.

* `decrement!`
* `decrement_counter`
* `increment!`
* `increment_counter`
* `toggle!`
* `touch`
* `update_all`
* `update_attribute`
* `update_column`
* `update_columns`
* `update_counters`

Bạn cũng có thể skip validation trong khi save bằng việc passing `validate` như là một argument khi `save`
```ruby 
User.save(validate: false)
```
#### 10: Confirmation of attribute
Ta sử dụng cái này khi mà ta có 2 text fields và nhận chính xác nội dung giống nhau. Ví dụ, bạn muốn confirm trường email address hoặc trường password. Validation này sẽ tạo ra một `virtual attribute` với nên giống với tên trường ở trên và thêm `_confirmation` được nối ở sau
```ruby
class Person < ApplicationRecord 
  validates :email, confirmation: true
end
```
**Note** Check này sẽ hoạt đônngj nếu trường `email_confirmation` không nil
Để require confirmation, đảm bảo rằng việc thêm `presence` check trong trường confirmation
```ruby
class Person < ApplicationRecord
  validates :email, confirmation: true validates :email_confirmation, presence: true
end
```
 [Source](https://guides.rubyonrails.org/active_record_validations.html)

#### 11: Using :on option
`:on` option chỉ định khi nào thì validation sẽ hoạt động. Mặc định thì tất cả built-in validation sẽ chạy on save (cả 2 trường hợp khi create lẫn update record)
```ruby
class Person < ApplicationRecord
  # it will be possible to update email with a duplicated value 
  validates :email, uniqueness: true, on: :create
  # it will be possible to create the record with a non-numerical age
  validates :age, numericality: true, on: :update
  # the default (validates on both create and update)
  validates :name, presence: true
end
```
#### 12: Conditional validation
Đôi khi bạn cần validate record chỉ khi rơi vào một số trường hợp nhất định
```ruby
class User < ApplicationRecord
  validates :name, presence: true, if: :admin?
  def admin?
    conditional here that returns boolean value
  end 
end
```
Nếu điều kiện của bạn nhỏ thì có thể sử dụng `proc`
```ruby
class User < ApplicationRecord
  validates :first_name, presence: true, if: Proc.new { |user| user.last_name.blank? }
end
```

để sử dụng với `negative conditional`, bạn sử dụng `unless`
```ruby
class User < ApplicationRecord
validates :first_name, presence: true, unless: Proc.new { |user| user.last_name.present? }
end
```

Bạn cũng có thể pass một string, cái mà sẽ được executed thông qua `instance_eval`
```ruby
class User < ApplicationRecord
  validates :first_name, presence: true, if: 'last_name.blank?'
end
```

### III. Kết thúc
Vậy là thông qua bài viết này, các bạn đã gần như nắm được toàn bộ các cách viết validation từ cơ bản đến nâng cao, và theo mình sẽ có thể sử dụng rất nhiều trong dự án hiện tại. Thực ra vẫn còn 1 số cách khác những để express được condition, nhưng bản thân mình thấy với lượng kiến thức trên là vừa đủ và các bạn có thể ứng dụng với phần đa các business requirement rồi. Tuy nhiên, nếu các bạn muốn tìm hiểu thêm hay có góp ý thì hãy comment để giúp cho bài viết này thêm hữu ích nhé. Thanks