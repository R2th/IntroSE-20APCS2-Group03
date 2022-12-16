## 1. Validations là gì?
### **1.1 Tại sao dùng validations?**

Validations là cách để đảm bảo dữ liệu của bạn hợp lệ trước khi lưu vào database. 
Có nhiều cách để thực hiện validate:
* DB constraints: Khiến cho cơ sở dữ liệu trở lên độc lập và khó để test hoặc bảo trì.
Ví dụ trong Rails tuts có đoạn này: 
```ruby
add_index :users, :email , unique: true
```
* Client-side validations: Dễ bị bỏ qua. Ví dụ nếu sử dụng JS để validations, nếu trên browser mà JS bị tắt, thì validations sẽ bị bỏ qua. Tuy nhiên nếu kết hợp được với các kỹ thuật khác, đây sẽ là 1 cách rất hay để validations và trả lại feedback ngay lập tức cho user.
* Controller-level validations: Rất khó để test validations ở level này. Ngoài ra, nó sẽ làm controller bị béo (nhiều code). Controller nên gầy 1 tý để ứng dụng có thể chạy trong thời gian dài.

Chốt lại, team Rails bảo là model-level validations là dễ dùng nhất. 

### **1.2 When Does Validation Happen?** 

Có 2 loại ActiveRecord object: loại liên quan và loại không liên quan **đến một record trong cơ sở dữ liệu**. 

Loại không liên quan được tạo bằng method `new`. Ta sử dụng method `new_record?` để phân biệt 2 loại object này.
```
$ a = User.new
=> #<User id: nil, name: nil, location: nil, age: nil, image_path: nil, created_at: nil, updated_at: nil>
$ a.new_record?
=> true
$ User.first.new_record?
=> false
```
Validations ở model level luôn chỉ chạy khi quá trình **create** hoặc **update** 1 bản ghi thông qua ActiveRecord được diễn ra.
Khi khởi tạo bản ghi thì `ActiveRecord` sẽ gửi 1 câu `INSERT` còn khi cập nhật thì nó gửi 1 câu`UPDATE` query vào cơ sở dữ liệu. 
Validations luôn chạy trước khi ActiveRecord định thực hiện câu INSERT hoặc UPDATE vào cơ sở dữ liệu.

Các method dưới đây sẽ gọi vào validations:
```
create
create!
save
save!
update
update!
```

### **1.3 Skipping validations**

Các method sau sẽ skip validations:
```
decrement!
decrement_counter
increment!
increment_counter
toggle!
touch
update_all
update_attribute
update_column
update_columns
update_counters
```
Hoặc có thể dùng `save(validate: false)` để `skip validations`
```
a = User.new name: ""
=> #<User id: nil, name: "", location: nil, age: nil, image_path: nil, created_at: nil, updated_at: nil>
irb(main):006:0> a.save
   (0.1ms)  begin transaction
   (0.1ms)  rollback transaction
=> false
irb(main):007:0> a.save(validate: false)
   (0.1ms)  begin transaction
  User Create (0.7ms)  INSERT INTO "users" ("name", "created_at", "updated_at") VALUES (?, ?, ?)  [["name", ""], ["created_at", "2019-09-12 07:42:37.363766"], ["updated_at", "2019-09-12 07:42:37.363766"]]
   (91.0ms)  commit transaction
=> true
```

### **1.4 valid? , invalid?**

Trước khi 1 ActiveRecord object được save, Rails sẽ chạy validations. Nếu validations có lỗi, Rails sẽ không save object lại. Các lỗi của object được lưu bởi `collection` `.errors.messages`.

```ruby
> a = User.create name: ""
   (0.1ms)  begin transaction
   (0.1ms)  rollback transaction
=> #<User id: nil, name: "", location: nil, age: nil, image_path: nil, created_at: nil, updated_at: nil>
> a.errors.messages
=> {:name=>["can't be blank"]}
```

- Sau khi chạy validations, nếu `a.errors.messages` rỗng thì a là 1 `valid object` .

- Các object tạo từ method `.new` không bao giờ trả về `errors`, vì nó không chạy validations.
```
> a = User.new 
=> #<User id: nil, name: nil, location: nil, age: nil, image_path: nil, created_at: nil, updated_at: nil>
> a 
=> #<User id: nil, name: nil, location: nil, age: nil, image_path: nil, created_at: nil, updated_at: nil>
> a.errors.messages
=> {}
```

- `valid?` method sẽ triggers validations và trả về giá trị `false` nếu `errors.messages` rỗng.
```

> a = User.new 
=> #<User id: nil, name: nil, location: nil, age: nil, image_path: nil, created_at: nil, updated_at: nil>
> a 
=> #<User id: nil, name: nil, location: nil, age: nil, image_path: nil, created_at: nil, updated_at: nil>
> a.errors.messages
=> {}

> a.valid?
=> false
> a.errors.messages
=> {:name=>["can't be blank"]}
```
`invalid?` chỉ đơn giản là method đảo của `valid?` . Nó cũng triggers validations với object và trả về giá trị `boolean` ngược lại với `valid?`

### **1.5 errors**

Để xác định xem 1 attribute nhất định của object có valid không, ta làm kiểm tra bằng cú pháp `object.errors[:attributes].any?` :
```
a = User.create(name: "").errors[:name].any?
=> false
```
Cú pháp này chỉ sử dụng được sau khi quá trình validations được diễn ra. 

### **1.6 errors.details**

Lấy ra symbol của validator:
```
>> person = Person.new
>> person.valid?
>> person.errors.details[:name] # => [{error: :blank}]
```

## 2. Validation helper

- ActiveRecord cung cấp nhiều validation helpers. Các helper này xây dựng dựa trên nhiều nguyên tắc validations phổ biến.
-  Nếu validation fail, 1 message sẽ được add vào object.errors và messages này liên kết với attribute đã được validate.
-  Mỗi validation helper có thể truyền vào nhiều attributes.
```ruby
class User < ApplicationRecord
  validates :name, :location, presence: true
end
```

-  Mỗi validation helper đều có 1 `default message`. Option `:message` sẽ có ích khi bạn không muốn dùng `default message` :
```ruby
class User < ApplicationRecord
  validates :name, :location, presence: { message: "attribute này không được trống!" }
end

a = User.new 
=> #<User id: nil, name: nil, location: nil, age: nil, image_path: nil, created_at: nil, updated_at: nil>
> a.valid?
=> false
> a.errors.messages
=> {:name=>["attribute này không được trống!"], :location=>["attribute này không được trống!"]}
```

Bây giờ, chúng ta cùng tìm hiểu 1 số `validations helper` phổ biến.


### **2.1 acceptance**

Ta thường sử dụng `acceptance` kết hợp với thẻ `<input type="checkbox">` . Giả sử ta có 1 cái form yêu cầu nhập fields `is_teen` như sau: 
```ruby
#app/users/edit.html.erb
<%= form_for @user do |f| %>
  <%= f.check_box is_teen %>
  <%= f.submit "Submit" %>
<% end %>
```
```ruby
#app/controllers/users_controller.rb
class UsersController < ApplicationController
  def new
    @user = User.new params[:user]
  end

  def create
    @user = User.new user_params
    if @user.save
      redirect_to root_path
    else
      flash[:danger] = @user.errors.messages
      redirect_to root_path
    end
  end

  private
  def user_params
    params.require(:user).permit :is_teen
  end
end
```
Ta thêm `helper acceptance` vào `model User`
```ruby
class User < ApplicationRecord
  validates :is_teen, acceptance: true
end
```
Khi checkbox không được tích vào thì user_params sẽ có giá trị thế này: 
```
(byebug) user_params
<ActionController::Parameters {"is_teen"=>"0"} permitted: true>
```
Và quá trình validations diễn ra như thế này: 
```ruby
> @user = User.new user_params
=> #<User id: nil, name: nil, location: nil, is_teen: false, image_path: nil, created_at: nil, updated_at: nil, male: false>

>  @user.valid? 
=> false

> @user.errors.full_messages
=> ["Is_teen must be accepted"]
```

### 2.2 inclusion, exclusion
Helper `inclusion` dùng để kiểm tra attribute nhập vào có nằm trong **1 tập hợp các giá trị cho trước** không. 

Cùng xem ví dụ dưới đây để hiểu:
```ruby
class User < ApplicationRecord
  validates :name, inclusion: { in: ["Hiep", "Hieu"] }
end
```
```ruby
> user = User.new name: "Hung" 
=> #<User id: nil, name: "Hung", location: nil, age: nil, image_path: nil, created_at: nil, updated_at: nil, male: nil>
> user.valid?
=> false
> user.errors.full_messages
=> ["Name is not included in the list"]
```

Ngược lại với `inclusion`, chúng ta helper `exclusion` . Nếu attribute nhập vào không nằm trong tập các giá trị cho trước thì được coi là `valid` .

```ruby
class User < ApplicationRecord
  validates :name, exclusion: { in: ["Hiep", "Hieu"] }
end
```
```ruby
> user = User.new name: "Hieu" 
=> #<User id: nil, name: "Hieu", location: nil, age: nil, image_path: nil, created_at: nil, updated_at: nil, male: nil>
> user.valid?
=> false
> user.errors.full_messages
=> ["Name is reserved"]
```

### 2.2 presence, absence
Helper `presence` dùng để kiểm tra xem `attribute` có phải 1 `blank` hay không, thông qua method `blank?`. Nếu `attribute.blank?` trả về `true` thì sau khi validations sẽ thực hiện rollback. 

Đầu tiên, bạn cần biết khi nào thì method `blank?` trả về `true`. 
```ruby
> "".blank?
=> true

> "  ".blank?
=> true

> " \t  \n".blank?
=> true

> nil.blank?
=> true

>  false.blank
=> true
```

Thử với ví dụ dưới đây:
```ruby
class User < ApplicationRecord
  validates :name, presence: true
end
```
```
> user = User.new name: "\t \n"
=> #<User id: nil, name: "\t \n", location: nil, age: nil, image_path: nil, created_at: nil, updated_at: nil, male: nil>
> user.valid?
=> false
> user.errors.full_messages
=> ["Name can't be blank"]
```

Vì `presence` nghĩa là sự có mặt, nên thường chúng ta sẽ nghĩ `helper` này dùng để kiểm tra sự có mặt của `attribute` .Tuy nhiên với `boolean value` thì không hẳn thế .

Vì `false.blank?` cũng trả về `true` nên để validates  sự có mặt `attribute` theo kiểu `boolean`, chúng ta nên dùng inclusion:
```ruby
class User < ApplicationRecord
  validates :is_teen, inclusion: { in: [true, false] }
end
```
```
> user = User.new is_teen: false
=> #<User id: nil, name: nil, location: nil, age: nil, image_path: nil, created_at: nil, updated_at: nil, is_teen: false>
> user.valid?
=> true
```

Ngược lại với helper `presence`, helper `absence` dùng method `present?` kiểm tra xem attribute truyền vào có rỗng hay không. Nếu `attribute.present?` trả về `true` thì sau validation sẽ thực hiện rollback.
```
> nil.present?
=> false

> "".present?
=> false

> "  ".present?
=> false

> false.present?
=> false
```

### 2.4  numericality
Helper này dùng để đảm bảo các thuộc tính phải là kiểu `Numeric` . Nếu `attribute` không phải là kiểu `Numeric`, sau khi validations sẽ thực hiện `rollback `. Default message của helper này là `[is not a number]`
```ruby
class User < ApplicationRecord
  validates :age, numericality: true
end
```
```
> user = User.new age: "ahihihi"
=> #<User id: nil, name: nil, location: nil, age: 0, image_path: nil, created_at: nil, updated_at: nil, male: nil>
> user.valid?
=> false
> user.errors.full_messages
=> ["Age is not a number"]
```
Có khá nhiều tùy chọn với helper này. Nếu bạn muốn `attribute` được `validate` chỉ thuộc kiểu `integer`, chúng ta có option `only_integer: true`
```ruby
class User < ApplicationRecord
  validates :age, numericality: { only_integer: true }
end
```
```
> user = User.new age: 1.5
=> #<User id: nil, name: nil, location: nil, age: 1, image_path: nil, created_at: nil, updated_at: nil, male: nil>
> user.valid?
=> false
> user.errors.full_messages
=> ["Age must be an integer"]
```
Ngoài ra chúng ta còn có một loạt các tùy chọn khác tương ứng với các `symbol` sau:
* `:greater_than` : đảm bảo `attribute` phải lớn hơn 1 giá trị mà bạn muốn. 
* `:greater_than_or_equal_to` : đảm bảo `attribute` phải **lớn hơn hoặc bằng** 1 giá trị mà bạn muốn. 
* `:equal_to` : đảm bảo attribute phải bằng một giá trị mà bạn muốn.
* `:odd` : đảm bảo attribute phải là một số lẻ.
* `:even` : đảm bảo attribute phải là một số chẵn. 

###  2.5 uniqueness

uniqueness hoạt động như nào?
```ruby
class User < ApplicationRecord
  validates :name, uniqueness: true
end
```

thêm option case_sensitive.
```ruby
validates :name, uniqueness: { case_sensitive: false }
```

Với bài toán, 1 người không được follow người khác 2 lần. 
```ruby
class Relationship < ApplicationRecord
  ?????
end
```



Còn rất nhiều `validation helper` khác rất hữu dụng, các bạn có thể tìm đọc thêm tại [đây](https://guides.rubyonrails.org/active_record_validations.html).

## 3. Một số option phổ biến trong các helper
### 3.1 allow_nil
Bạn muốn :name không thể là rỗng, nhưng chấp nhận giá trị nil.
```ruby
validates :name, presence: true, allow_nil: true
```
### 3.2 allow_blank

### 3.3 :on

```ruby
validates :age, numericality: { greater_than: 16 }, on: :update
```

## 4. Custom validation
Nếu những validations helper mà ActiveRecord tạo sẵn cho bạn vẫn không thể giải quyết được bài toán mà bạn đang gặp phải, thì bạn có thể tự validation theo cách của mình .
Mình tìm thấy 2 cách có thể thực hiện custom validation:  `custom method` và`custom validator`

### 4.1 Custom method 
Ví dụ, mình có bài toán `follow` rất quen thuộc với 2 bảng `User` và `Relationship` như sau.
```ruby
class User < ApplicationRecord
  has_many :active_relationships, class_name: Relationship.name,
    foreign_key: :follower_id
  has_many :passive_relationships, class_name: Relationship.name,
    foreign_key: :followed_id
  has_many :following, through: :active_relationships,
    source: :followed
  has_many :followers, through: :passive_relationships,
    source: :follower
 end
```
```ruby
class Relationship < ApplicationRecord
  belongs_to :follower, class_name: User.name
  belongs_to :followed, class_name: User.name
end
```
Bây giờ mình muốn `validate` trường hợp, `user` không thể tự `follow` chính mình. Nghĩa là khi 1 bản ghi Relationship được tạo, nếu `follower_id == followed_id` trả về `true`, thì sau quá trình validation phải thực hiện `rollback` . 

Bài toán này khá khó để dùng các validation helper sẵn có của `ActiveRecord`, vì vậy mình sẽ thực hiện custom validation như sau .

```ruby
class Relationship < ApplicationRecord
  validate :cannot_follow_yourself
  belongs_to :follower, class_name: User.name
  belongs_to :followed, class_name: User.name
  
  private
    def cannot_follow_yourself
      if followed_id == follower_id
        errors.add(:you, Settings.relationship.cannot_follow_yourself )
      end
    end
end
```
Thực hiện validate:
```
> relationship = Relationship.new follower_id: 1, followed_id: 1
=> #<Relationship id: nil, follower_id: 1, followed_id: 1, created_at: nil, updated_at: nil>

> relationship.valid?
  User Load (15.3ms)  SELECT  `users`.* FROM `users` WHERE `users`.`id` = 1 LIMIT 1
  User Load (0.3ms)  SELECT  `users`.* FROM `users` WHERE `users`.`id` = 1 LIMIT 1
=> false

> relationship.errors.full_messages
=> ["You can't follow yourself"]
```

Phương pháp thực hiện validate nói trên được gọi là custom validation sử dụng `custom method`. 


### 3.2 Custom validator.
Giả sử trong rails app của bạn có các model `Course`, `Plan` và `Event` . Cả 3 bảng này đều có 2 trường `start_date` và `end_date` . Bạn cần validates ở cả 3 model, để đảm bảo rằng `start_date` luôn phải nhỏ hơn hoặc bằng `end_date` . Sẽ có 2 vấn đề ở bài toán này: 
* Một là, khó để tìm ra 1 validation helper có sẵn mà phù hợp với yêu cầu của bài toán, vậy nên chúng ta sẽ sử dụng custom validation. 
* Hai là, nếu sử dụng `custom method`chúng ta sẽ phải viết lại method đấy 3 lần ở mỗi model. Như thế khá khó để sử dụng lại code .

Để giải quyết cả 2 vấn đề nói trên, mình sẽ viết 1 class riêng chứa validator, và gọi lại class này ở mỗi model cần validate.

Đầu tiên mình tạo một thư lục để lưu các class validators và config để rails có thể load được nó trong file `application.rb`

```ruby
#config/application.rb
config.load_defaults 5.2
config.autoload_paths += %W["#{config.root}/app/validators/"]
```
```ruby
#app/validators/date_validator.rb
class DateValidator < ActiveModel::Validator
  def validate(record)
    if record.start_date > record.end_date
      record.errors[:start_date] << "Start date cannot greater than end date""
    end
  end
end
```
Giờ mình sẽ gọi validator này với method `validates_with`
```ruby
class Course < ApplicationRecord
  include ActiveModel::Validations
  validates_with DateValidator
end

class Plan < ApplicationRecord
  include ActiveModel::Validations
  validates_with DateValidator
end

class Event < ApplicationRecord
  include ActiveModel::Validations
  validates_with DateValidator
end
```

Thử chạy validate nhé: 
```
> course = Course.new start_date: Date.new(2019) , end_date: Date.new(2018)
=> #<Course id: nil, content: nil, start_date: "2019-01-01", end_date: "2018-01-01">
> course.valid?
=> false
> course.errors.full_messages
=> ["Start date cannot greater than end date"]
```
```
> plan = Plan.new start_date: Date.new(2019) , end_date: Date.new(2018)
=> #<Plan id: nil, content: nil, start_date: "2019-01-01", end_date: "2018-01-01">
> plan.valid?
=> false
> plan.errors.full_messages
=> ["Start date cannot greater than end date"]
```

Đó là tất cả những gì mình muốn trình bày trong bài viết lần này. 



-----

References:

https://guides.rubyonrails.org/active_record_validations.html