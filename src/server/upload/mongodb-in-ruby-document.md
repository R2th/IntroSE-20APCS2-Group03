Bài viết này sẽ giới thiệu nhưng đặc điểm cơ bản của Document trong Monggoid.

## Document
Documents là một core objects trong Mongoid và bất kỳ một model nào muốn duy trì kết nối với database cũng cần include Mongoid::Document. Một document có thể được lưu trữ trong collections của riêng trong cơ sở dữ liệu hoặc có thể được embed trong documents khác.

### Fields
Mắc dù MongoDB là một schemaless database, hầu hết các ứng dụng web nơi các params trong form gửi đến server luôn dưới dạng string. Mongoid cung cấp một cơ chế dễ dàng để chuyển đổi các string này thành các loại thích hợp của chúng thông qua định nghĩa các field trong Mongoid :: Document.

Các định nghĩa field này chỉ định cho Mongoid khi read và write các trường từ db. Thay đổi định nghĩa trong Model không làm thay đổi dữ liệu hiện có. Nếu bạn muốn thay đổi db hiện có, bạn phải viết một tập lệnh để làm như vậy.

Giả sử một class đơn giản để mô hình hóa một người dùng trong một ứng dụng. Một person có thể có first name, last name, and middle name. Chúng ta có thể định nghĩa các field này như sau:
```
class Person
  include Mongoid::Document
  field :first_name, type: String
  field :middle_name, type: String
  field :last_name, type: String
end
```

Danh sách các type hợp lệ cho fields:

* Array
* BigDecimal
* Boolean
* Date
* DateTime
* Float
* Hash
* Integer
* BSON::ObjectId
* BSON::Binary
* Range
* Regexp
* Set
* String
* Symbol
* Time
* TimeWithZone

### Hash Fields
Khi sử dụng field có type là hash, nên lưu ý [legal key names for mongoDB](https://docs.mongodb.com/manual/reference/limits/#naming-restrictions), nếu không giá trị của bạn sẽ không được lưu đúng.
```
class Person
  include Mongoid::Document
  field :first_name
  field :url, type: Hash

  # will update the fields properly and save the values
  def set_vals
    self.first_name = 'Daniel'
    self.url = {'home_page' => 'http://www.homepage.com'}
    save
  end

  # all data will fail to save due to the illegal hashkey
  def set_vals_fail
    self.first_name = 'Daniel'
    self.url = {'home.page' => 'http://www.homepage.com'}
    save
  end
end
```
### Defaults
Bạn có thể đtắ giá trị mặc định cho field nếu như lúc tạo nó không được cung cấp.
```
class Person
  include Mongoid::Document
  field :blood_alcohol_level, type: Float, default: 0.40
  field :last_drink, type: Time, default: ->{ 10.minutes.ago }
end
```
Lưu ý rằng giá trị không được được trong lambdas hoặc proc thì giá trị sẽ được set khi class load. vì vậy 2 ví dụ sau đây sẽ không giống nhau (Sử dụng labdas sẽ tốt hơn trong trường hợp dưới)
```
field :dob, type: Time, default: Time.now
field :dob, type: Time, default: ->{ Time.now }
```
### Aliasing Fields
Một trong những hạn chế của schemaless darabase là MongoDB phải lưu tất cả các field của mỗi document, nghĩa là nó sẽ phải sử dụng nhiều bộ nhớ trên RAM and disk. Để hạn chế điều này, chúng ta có thể sử dụng alias fields để giảm thiểu chiều dài tên field nhưng vẫn giữ được tên đầy dủ trên ứng dụng. Mogoid cũng cho phép bạn làm điều này bằng cách:
```
class Band
  include Mongoid::Document
  field :n, as: :name, type: String
end

band = Band.new(name: "Placebo")
band.attributes # { "n" => "Placebo" }

criteria = Band.where(name: "Placebo")
criteria.selector # { "n" => "Placebo" }
```
### Reserved Names
Nếu bạn đặt tên field trong docuemtns trùng tên với một số tên của reserved method trong Mongoid nó sẽ raise 1 error, để kiểm tra các tên này bạn có thể sử dụng `Mongoid.destructive_fields`
### Dynamic Fields

Mặc định, mogoid không hỗ trợ dynamic field. Bạn có thể sử dụng dynamic field bằng cách include  Mongoid::Attributes::Dynamic vào model. 
```
class Person
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
end
```
Khi xử lí với dynamic attributes, tuân thủ theo luật sau:
- Nếu attr tồn tại trong document, mongoid sẽ cung cấp bạn method getter và setter, ví dụ:
```
# Set the person's gender to male.
person[:gender] = "Male"
person.gender = "Male"

# Get the person's gender.
person.gender
```
- Nếu attr chưa tồn tại trong document, mogoid sẽ không cung cấp method getter và setter. Trong tường hợp này bạn được cung cáp method: ([] and []=) or (read_attribute and write_attribute).
```
# Raise a NoMethodError if value isn't set.
person.gender
person.gender = "Male"

# Retrieve a dynamic field safely.
person[:gender]
person.read_attribute(:gender)

# Write a dynamic field safely.
person[:gender] = "Male"
person.write_attribute(:gender, "Male")
```  
### Localized Fields
Mongoid có hỗ trợ I18n, cách sử dụng:
```
class Product
  include Mongoid::Document
  field :description, localize: true
end
```
Bằng việc set localize, Mogoid sẽ tạo ra hash để lưu nhiều ngôn ngữ:
```
I18n.default_locale = :en
product = Product.new
product.description = "Marvelous!"
I18n.locale = :de
product.description = "Fantastisch!"

product.attributes
# { "description" => { "en" => "Marvelous!", "de" => "Fantastisch!" }
```
Bạn có thể get và set giá trị cho hash này ra bằng cách thêm _transslations vào sau method.
```
product.description_translations
# { "en" => "Marvelous!", "de" => "Fantastisch!" }
product.description_translations =
  { "en" => "Marvelous!", "de" => "Wunderbar!" }
```
Cách đánh index cho field có sử dụng I18n
```
class Product
  include Mongoid::Document
  field :description, localize: true

  index "description.de" => 1
  index "description.en" => 1
end
```
### Timestamping
Cũng như `ActiveRecord`, Mogoid cũng cấp module `Mongoid::Timestamps` để trace thời gian tạo và cập nhật document qua 2 field `created_at` và `updated_at`
```
class Person
  include Mongoid::Document
  include Mongoid::Timestamps
end
```
Bạn cũng có thể chỉ định chỉ sử dụng 1 trong 2 trường bằng cách:
```
class Person
  include Mongoid::Document
  include Mongoid::Timestamps::Created
end

class Post
  include Mongoid::Document
  include Mongoid::Timestamps::Updated
end
```
Nếu bạn muống không sử dụng timestamping, sử dụng `timeless`:
```
person.timeless.save
Person.timeless.create!
```
Nếu bạn thích các trường có tên ngắn hơn với các bí danh để tiết kiệm dung lượng lưu, bạn có thể sử dụng:
```
class Band
  include Mongoid::Document
  include Mongoid::Timestamps::Short # For c_at and u_at.
end

class Band
  include Mongoid::Document
  include Mongoid::Timestamps::Created::Short # For c_at only.
end

class Band
  include Mongoid::Document
  include Mongoid::Timestamps::Updated::Short # For u_at only.
end
```
## Tài liệu tham khảo
https://docs.mongodb.com/mongoid/current/