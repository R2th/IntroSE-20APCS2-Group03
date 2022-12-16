## **I. Câu chuyện liên quan**
Các dự án liên quan đến việc lưu trữ các địa chỉ thanh toán và vận chuyển của khách hàng ở Hoa Kì được cho là rất phổ biến. Ở Ba Lan, bạn có thể có nhiều địa chỉ  ví dụ như địa chỉ đăng kí, địa chỉ nhà riêng hoặc địa chỉ gửi thư. Vì vậy chúng ra hãy lấy địa chỉ cho ví dụ của chúng ta. 
## II. Chú ý 
Hãy nhớ rằng code ví dụ ở dưới đây chỉ để mô tả các vấn đề và đưa ra giải pháp. Trên thực tế, chúng ta dùng STI cho các địa chỉ thanh toán và địa chỉ giao hàng là sai. Có nhiều giải pháp sẽ tốt hơn cách dùng STI.
## III. Điểm khởi đầu trong việc dùng STI
Gỉa sử người dùng (user) có nhiều địa chỉ (addresses).
```ruby
class User < ActiveRecord::Base
  has_many :addresses
end

class Address < ActiveRecord::Base
  belongs_to :user
end

class BillingAddress < Address
end

class ShippingAddress < Address
end
```

Ban đầu mọi thứ nó sẽ luôn hoạt động bình thường. Và mọi thứ nó sẽ bắt đầu trở nên phức tạp hơn khi bạn bắt đầu thêm các tính năng mới vào. Rõ ràng là chúng ta đang thiếu 1 vài thứ cần validate cho các model ở trên. Vì bất kì 1 lí do gì đi nữa, chúng ta cần phải tạo ra sự khác nhau giữa các loại địa chỉ ở trên để phân biệt chúng. Vì dụ trong ShippingAddress, chúng ta muốn hạn chế số lượng quốc gia cho nó.
```ruby
class Address < ActiveRecord::Base
  validates_presence_of :full_name, :city, :street, :postal_code
end

class BillingAddress < Address
  validates_presence_of :country
end

class ShippingAddress < Address
  validates_inclusion_of :country, in: %w(USA Canada)
end
```

Giờ chúng ta sẽ tạo vài đối tượng để làm ví dụ:
```ruby
u = User.new(login: "rupert")
u.save!
a = u.addresses.build(type: "BillingAddress", full_name: "Robert Pankowecki", city: "Wrocław", country: "Poland")
a.save!
```

## IV.Thay đổi loại địa chỉ
STI có khả năng thay đổi kiểu của đối tượng, hay là thay đổi loại model linh động. Nhưng hãy xem vấn đề mà chúng ta đang gặp phải
```ruby
a.update_attributes(type: "ShippingAddress", country: "Spain") # => true # but should be false

a.class.name # => "BillingAddress" # But we wanted ShippingAddress

a.valid? # => true # but should be false, we ship only to USA and Canada

a.reload # => ActiveRecord::RecordNotFound:
         # Couldn't find BillingAddress with id=1 [WHERE "addresses"."type" IN ('BillingAddress')]
         # Because we changed the type in DB to Shipping but ActiveRecord is not aware
```

Vấn đề ở đây là chúng ta không thể thay đổi class của đối tượng trong ví dụ trên. Vấn đề này không hề giới hạn ở trong ruby, nhiều ngôn ngữ lập trình hướng đối tượng cũng gặp phải nó. Và khi bạn nghĩ về nó, bạn sẽ hiểu rõ nó hơn rất nhiều.
Tôi nghĩ rằng điêu này sẽ cho chúng ta biết 1 cái gì đó về tính thừa kế nói chung ở đây. Đó là cơ chế rất linh hoạt ở trong ngôn ngữ hướng đối tượng nhưng chúng ta nên tránh nó khi nó có khả năng thay đổi kiểu và hành vi của lớp. Chúng ta sẽ ưu tiên các giải pháp khác như sử dụng delegate, strategy hoặc là roles. Bất cứ khi nào chúng ta muốn sử dụng thừa kế, chúng ta cần phải tự hỏi rằng việc là đó nó sẽ chắc chắn không làm cho câu lệnh trở nên dài hơn. Nếu có, hãy tránh kế thừa.
Ví dụ: Admin < User. Có thể user mà chúng ta tạo ra không còn làm admin nữa, nhưng làm sao để chúng ta có thể thay đổi linh hoạt từ admin thành user bây giờ. Do đó chúng ta hãy lấy admin như là 1 role ở trong bảng User. Rõ ràng, việc kế thừa dùng ở đây sẽ là không thích hợp.
## V. Giải pháp
Giải pháp sẽ yêu cầu rails phải sửa ở 2 điểm. Đầu tiên là phương thức update_record phải thực hiện câu lệnh mà không hạn chế cập nhật SQL cho kiểu của đối tượng mà chúng ta muốn thay đổi nó.
Chúng ta cũng cần 1 phương thức thứ 2 (metamorphose) phụ thuộc vào phương thức `ActiveRecord#becomes` 
```ruby
module ActiveRecord
  module StiFriendly
    # Rails 3.2
    def update(attribute_names = @attributes.keys)
      attributes_with_values = arel_attributes_values(false, false, attribute_names)
      return 0 if attributes_with_values.empty?
      klass = self.class.base_class # base_class added
      stmt  = klass.unscoped.where(klass.arel_table[klass.primary_key].eq(id)).arel.compile_update(attributes_with_values)
      klass.connection.update stmt
    end

    # Rails 4.0
    def update_record(attribute_names = @attributes.keys)
      attributes_with_values = arel_attributes_with_values_for_update(attribute_names)
      if attributes_with_values.empty?
        0
      else
        klass = self.class
        column_hash = klass.connection.schema_cache.columns_hash klass.table_name
        db_columns_with_values = attributes_with_values.map { |attr,value|
          real_column = column_hash[attr.name]
          [real_column, value]
        }
        bind_attrs = attributes_with_values.dup
        bind_attrs.keys.each_with_index do |column, i|
          real_column = db_columns_with_values[i].first
          bind_attrs[column] = klass.connection.substitute_at(real_column, i)
        end
        # base_class added
        stmt = klass.base_class.unscoped.where(klass.arel_table[klass.primary_key].eq(id_was || id)).arel.compile_update(bind_attrs)
        klass.connection.update stmt, 'SQL', db_columns_with_values
      end
    end

    def metamorphose(klass)
      obj      = becomes(klass)
      obj.type = klass.name
      return obj
    end
  end
end

class Address < ActiveRecord::Base
  include ActiveRecord::StiFriendly
end
```

Hãy chạy thử 1 vài câu lệnh sau:
```ruby
u = User.last
a = u.addresses.last # => BillingAddress instance
a.country # => Poland

a = a.metamorphose(ShippingAddress)  # => ShippingAddress instance
                                     #    new object

a.update_attributes(full_name: "RP") # => false
                                     # Stopped by validation

# Validation worked properly
# We only ship to USA and Canada
a.errors => #<ActiveModel::Errors:0x0000000352f0f0 @base=#<BillingAddress id: 1, ... >,
            # @messages={:country=>["is not included in the list"]} >

# Yay!
a.update_attributes(full_name: "RP", country: "USA") # => true
a.reload # => ShippingAddress
```

Có 2 vấn đề tiềm ẩn ở đây:

* Các thuộc tính ảo sẽ không được sao chép, rails sẽ không biết về chúng, và rất có thể là bạn không lưu chúng ở trong biến @attributes
* Có thể thấy chúng ta đang sử dụng kết nối từ lớp base_class. Điều này không quan trọng vì hầu hết các dự án đều sử dụng chung kết nối cho tất cả các lớp ActiveRecord. Thật khó có thể nói kết nối của lớp nào nên được sử dụng khi chúng ta thay đổi loại đối tượng từ lọai này sang loại khác

Bạn xem này, đầu ra có gì đó sai sai và kiểm tra nó đơn giản như sau:
```ruby
a.class  # => ShippingAddress
a.errors # => #<ActiveModel::Errors:0x0000000352f0f0 @base=#<BillingAddress id: 1 ... >>
a.errors.instance_variable_get(:@base).object_id == a.object_id # => false
```

Khi bạn làm như vậy, ta có thể tạo ra 1 bản ghi với #metamorphose, lưu nó và xóa bản ghi cũ nếu việc lưu bản ghi mới thành công. Tất cả đều nằm chính xác trong 1 transaction. Nhưng điều này có thể còn khó khăn hơn khi có nhiều quan hệ với đối tượng cũng cần được sửa khóa ngoài. Có thể xóa bản ghi cũ trước, sau đó tạo 1 bản ghi mới với id giống với bản ghi cũ là 1 giải pháp.

## VI. Delegation
Thay vì kế thừa kiểu, việc mà ngăn cản chúng ta thay đổi hành vi của đối tượng tự động, chúng ta sẽ sử dụng delegate, điều này sẽ làm cho nó trở nên dễ dàng hơn.
```ruby
class Billing
  def validate_address(address)
    country_validator.validate(address)
  end
  private
  def country_validator
    @country_validator ||= ActiveModel::Validations::PresenceValidator.new(
      attributes: :country,
    )
  end
end

class Shipping
  def validate_address(address)
    country_validator.validate(address)
  end
  private
  def country_validator
    @country_validator ||= ActiveModel::Validations::InclusionValidator.new(
      attributes: :country,
      in: %w(USA Canada)
    )
  end
end

class Address < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :full_name, :city
  validate :type_specific_validation

  def type
    case address_type
    when 'shipping'
      Shipping.new
    when
      'billing'
      Billing.new
    else
      raise "Unknown address type"
    end
  end

  def type_specific_validation
    type.validate_address(self)
  end
end
```

Hãy chạy 1 vài câu lệnh sau:
```ruby
a = Address.last
a.address_type = "billing"
a.valid? # => true

a.country = nil
a.valid? # => false
a.errors # => #<ActiveModel::Errors:0x000000047d1528 @base=#<Address id: 1 ... >,
         # @messages={:country=>["can't be blank"]}>

a.country = "Poland"
a.address_type = "shipping"
a.valid? # => false
a.errors # => #<ActiveModel::Errors:0x000000047d1528 @base=#<Address id: 1 ...>,
         # @messages={:country=>["is not included in the list"]}>

# Yay! Just like we wanted, different validations and different behavior
# depending on address_type which can be set based on form attributes.
```

Trong ví dụ nhỏ của chúng ta,  chúng ta chỉ đang delegate 1 vài chỗ validate nhưng trong thực tế bạn cần delegate nhiều hơn nữa. Trong 1 vài trường hợp có thể nó sẽ được dùng cho các phương thức.
```ruby
class Shipping
  attr_reader :address
  delegate :country, :city, :full_name, to: :address

  def initialize(address)
    @address = address
  end

  def validate_address
    country_validator.validate(address)
  end

  def to_s
    "Ship me to: #{country.upcase} #{city}"
  end

  private

  def country_validator
    @country_validator ||= ActiveModel::Validations::InclusionValidator.new(
      attributes: :country,
      in: %w(USA Canada)
    )
  end
end

class Address < ActiveRecord::Base
  validate :type_specific_validation

  def type
    case address_type
    when 'shipping'
      Shipping.new(self)
    when 'billing'
      Billing.new(self)
    else
      raise "Unknown address type"
    end
  end

  def type_specific_validation
    type.validate_address
  end

  def to_s
    type.to_s
  end
end
```

Vì vậy 2 đối tượng của chúng ta thay đổi role của delegate và đối tượng delegate phụ thuộc vào nhiệm vụ của nó cần thực hiện.
Bài viết tham khảo tại: https://blog.arkency.com/2013/07/sti/