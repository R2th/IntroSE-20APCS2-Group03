### **I. Validation Helpers**

Active Record cung cấp cho chúng ta rất nhiều helpers có thể sử dụng trực tiếp bên trong các model.
#### **1. Presence**
Helper `presence` đảm bảo thuộc tính được chỉ định là bắt buộc, không được để trống
```
class People < ApplicationRecord
  validates :graduate_type_id, :school_name, presence: true
end
```

Example:
```
a = People.new
a.save
a.error.messages
-> 
{:partner=>["Partnerをご入力ください。"],
 :graduate_type_id=>["Graduate typeをご入力ください。"],
 :school_name=>["School nameをご入力ください。"]}
```

#### **2. Format**
Helper `format` đảm bảo thuộc tính được chỉ định khi nhập phải đúng định dạng với biểu thức đã cho với tùy chọn `with`. Nếu bắt buộc thuộc tính phải khác với định dạng biểu thức thì sử dụng tùy chọn without.
```
class People < ApplicationRecord
  validates :graduate_type_id, :school_name, presence: true
  validates :school_name, format: { with: /\A[a-zA-Z]+\z/,
    message: "only allows letters" }
end
```
Example: `format` bắt buộc thuộc tính được nhập phải là các ký tự từ 'a-z'
```
a = People.new
a.school_name = "12345"
a.save
a.error.messages
-> {:partner=>["Partnerをご入力ください。"],
 :graduate_type_id=>["Graduate typeをご入力ください。"],
 :school_name=>["only allows letters"]}
 ```
Ta có thể chỉ định message thông báo lỗi với việc nhập sai định dạng bằng tùy chọn `message`. Nó sẽ là không bắt buộc và khi đó message mặc định được show ra sẽ là "is invalid".

#### **3. Numericality**
Helper `numericality` đảm bảo thuộc tính được chỉ định chỉ có thể là số. Có rất nhiều tùy chọn được cung cấp để đảm bảo ràng buộc cho trường được nhập

* **greater_than**: giá trị nhập vào phải lớn hơn giá trị chỉ định
* **less_than_or_equal_to**: giá trị nhập vào phải nhỏ hơn hoặc bằng giá trị chỉ định
* **equal_to**: giá trị nhập vào phải bằng giá trị chỉ định
* **even**: giá trị nhập vào phải là số chẵn với tùy chọn true

và một số khác như: `greater_than_or_equal_to`,` less_than`, `other_than`, `odd`
```
class PartnerAcademicHistory < ApplicationRecord
  validates :graduate_type_id, :school_name, presence: true
  validates :school_name, format: { with: /\A[a-zA-Z]+\z/,
    message: "only allows letters" }
  validates :graduate_type_id, numericality: { even: true, message: "must be even" }
end
```
Example: `Numericality` bắt buộc thuộc tính được nhập phải là số chẵn
```
a = PartnerAcademicHistory.new
a.school_name = "12345"
a.save
a.error.messages
-> {:partner=>["Partnerをご入力ください。"],
 :school_name=>["School nameをご入力ください。", "only allows letters"],
 :graduate_type_id=>["must be even"]}
 ```
 
Ngoài ra Active Record còn cung cấp một số helper khác như:
* **uniqueness**: đảm bảo giá trị của thuộc tính nhập vào là duy nhất
* **length**: đảm bảo độ dài của thuộc tính nhập vào với các tùy chọn: `maximum`, `minimum`, `is`, `in`.

Các helpers được cung cấp đều có thể sử dụng tùy chọn`:on`, `:message` và chúng là không bắt buộc. Với `:on` để xác định thuộc tính sẽ được thực thi validate trên những hành động cụ thể nào của đối tượng. Còn `:message` sẽ cung cấp một thông báo lỗi khi thuộc giá trị của thuộc tính không đảm bảo.
```
class PartnerAcademicHistory < ApplicationRecord
  validates :school_name, uniqueness: true, on: :update
end
```
### **II. Conditional Validation**
Sử dụng các tùy chọn `:if` hoặc `:unless` để xác định trong thời gian chạy chương trình, tại một thời điểm, thuộc tính được được chỉ định có được thực thi validate hay không. Và có thể sử dụng dưới dạng các tham số:

**Symbol**: tên của một phương thức.

**String**: một đoạn mã ruby.

**Proc**: một khối mã sẽ được thực thi.


Example:
```
validates :graduate_type_id,  presence: true, if: :school_name?
validates :graduate_type_id,  presence: true,
   unless: Proc.new { |user| user.school_name.blank? }
```

Ta cũng có thể gom nhóm thuộc tính cần validate cùng một điều kiện:
```
with_options if: :school_name? do
    validates :started_at, length: {minimum: 6}
    validates :graduate_type_id, presence: true
end
```

Việc validate dữ liệu trước khi được lưu vào cơ sở dữ liệu là vô cùng cần thiết, tuy nhiên đôi khi việc bỏ qua những thủ tục validate lại thực sự vô cùng cần thiết, nhất là đối với những developer để giảm thiểu thời gian tạo dữ liệu test cũng như bỏ qua một số logic liên quan đến đối tượng.

### **III. Skip Validation**
#### **1. Skip All Validations**
Example:
```
def create
  @product = Product.new(product_params)
   if @product.save(validate: false)
    redirect_to products_path, notice: "#{@product.name} has been created."
  else
    render 'new'
  end
end
```

Khi thực thi method create và tạo mới một đối tượng, ta sẽ bỏ qua việc validate toàn bộ các thuộc tính của đối tượng bằng tùy chọn validate với đối số là false. Khi đó, những thuộc tính được khai báo validate sẽ bị bỏ qua và đối tượng vừa được tạo mới sẽ được lưu vào cơ sở dữ liệu.

#### **2. Skipping Individual Validations**

Đầu tiên, ta cần tạo một thuộc tính trong đối tượng chứa thuộc tính cần validate:
```
attr_accessor :skip_name_validation, :skip_price_validation
```

Sau đó, ta cần set giá trị cho thuộc tính:
```
validates :name, presence: true, uniqueness: true, unless: :skip_name_validation
validates :price, presence: true, numericality: { greater_than: 0 }, unless: :skip_price_validation
```

Và sử dụng:
```
def create
   @product = Product.new(product_params)
   @product.skip_name_validation = true
   if @product.save
    redirect_to products_path, notice: "#{@product.name} has been created."
  else
    render 'new'
  end
end
```

Ngoài ra thì cũng có những phương thức mà khi thực thi nó thì việc validate sẽ bị bỏ qua:
```
decrement!                       decrement_counter
increment!                       increment_counter
toggle!                          touch
update_all                       update_attribute
update_column                    update_columns         update_counters
```

Và có những phương thức sẽ luôn thực thi validate nếu không có tùy chọn là bỏ qua thực thi nó:
```
create                            create!
save                              save!
update                            update!
```

Nguồn tham khảo:

[https://richonrails.com/articles/skipping-validations-in-ruby-on-rails](https://richonrails.com/articles/skipping-validations-in-ruby-on-rails)
[https://edgeguides.rubyonrails.org/active_record_validations.html#strict-validations](https://edgeguides.rubyonrails.org/active_record_validations.html#strict-validations)