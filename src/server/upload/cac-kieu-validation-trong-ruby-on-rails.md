# Tại sao lại phải Validation?

Validation được sử dụng để đảm bảo rằng những dữ liệu chính xác mới được lưu vào database.

Rails đã có sẵn có helper đơn giản cho một vài vấn đề thông thường. Ngoài ra, Rails còn hỗ trợ cho bạn tuỳ chỉnh với validation của riêng mình một cách dễ dàng.

Thế nên validation ở chỗ nào nhỉ:

**Database validation:** khi chúng ta xác thực ở database thì khi việc thay đổi sẽ rất khó khăn, phải xử lý trong database. Nhưng được cái là nó có thể đem database này đi sử dụng lại apps khác và nó có tính an toàn cao nhất.

**Client-side validations:**  cái này chúng ta thường hay làm bằng javascripts, xác thực ở đây thì chúng ta dễ bị qua mặt khi user cố tình tấn công, nhưng bù lại việc phản hồi ngay lập tức không phải chờ đợi là điểm mạnh của client-side.

**Controllers-level validation:** xác thực ở đây cũng được nhỉ? Nhưng làm thế này thì lại phá vỡ nguyên tắc controllers skinny mất rồi và việc kiểm thử, bảo trì sẽ gặp khó khăn.

Vậy nên sau khi ra sức nguyên cứu ROR đã chọn **models-level** là nơi thực hiện validation.

# Khi nào thì Validation xảy ra?

Như phía trên đã nói trong ROR validation sẽ xảy ra ở models-level, tức là ActiveRecord sẽ xử lý vụ này cho chúng ta. 

Mọi thứ trên đời đều có thể chia làm 2 loại và ActiveRecord cũng vậy: loại 1 tương ứng với row trong database, còn loại 2 thì chưa.

Khi bạn sử dụng hàm new để tạo ra object thì object này là loại thứ 2 chưa tương thích với database hay là chưa kiểm tra qua validation. ROR Validation sẽ được thực hiện khi bạn chạy qua hàm save, nếu thành công nó sẽ tạo ra object loại 1

Create -> save (validation) -> new object 1

Update -> save (validation) -> new object 1

Object 2 -> save (validation) -> new object 1

Nhưng đôi khi cuộc đời không như mơ, bạn muốn bỏ qua validation cho một số trường hợp đặc biệt thì sao. ROR đã hỗ trợ cho bạn một số hàm để bỏ qua validation ở đây.

# Validation bắn lỗi như thế nào?

Trong ROR cứ có dấu ! thường thì nó sẽ bắn ra Exception. Và đương nhiên validation cũng làm như vậy với create!, save!, update!...

Với các hàm không có ! thì trả về true/false và lỗi sẽ được lưu trong record.errors. Theo định nghĩa thì một object chuẩn valid khi errors rỗng.

Với errors bạn có thể truy xuất các lỗi của record dựa trên các attributes của nó một cách dễ dàng với ***errors.details[:attribute]*** hay bạn có thể thêm với ***errors.add***

Đặc biệt các lỗi mặc định đã có sẵn message cho bạn, nếu bạn muốn tuỳ chỉnh với i18n những lỗi cơ bản này thì có thể xem trong bảng default errors của ROR.

# Các validation có sẵn trong Rails

Quá khoẻ, ROR đã làm sẵn hết cho chúng ta các kiểu validation, việc của chúng ta là gọi và sử dụng chúng. Lỗi tất nhiên sẽ được lưu trong errors với các message tương ứng.

Sau đây chúng ta sẽ lướt qua một vài helpers của ROR:

### Acceptance


```
class Person < ApplicationRecord
  validates :terms_of_service, acceptance: { accept: [‘YES’, ‘1’], 
message: 'must be abided' }
end
```

Nếu chúng ta muốn kiểm tra một attribute nào đó phải được accept trước khi save thì acceptance như đúng cái tên của nó sẽ kiểm tra điều này. Chúng ta có thể cài đặt giá trị accept cũng như là message lỗi.

Ví dụ như bạn muốn user đọc kỹ các điều khoản và check đã đọc trước khi tạo tài khoản thì bạn sẽ sử dụng acceptance. Và bạn có thể sử dụng *:termsofservice* này như một attribute tự tạo ra mà không cần phải có trong database, đỡ tốn tài nguyên.

### **Confirmation**

```
class Person < ApplicationRecord
  validates :email, confirmation: true
  validates :email_confirmation, presence: true
end
```

Bạn nên sử dụng helper này khi muốn 2 giá trị nhập vào là như nhau, như các tính năng nhập lại mật khẩu hay email để đảm bảo user không nhập sai.

Helper này sẽ tạo ra một attribute ảo với tên là tên của attribute cùng với hậu tố **_confirmation**.

### **Exclusion vs Inclusion**

```
class Account < ApplicationRecord
  validates :subdomain, exclusion: { in: %w(www us ca jp),
    message: "%{value} is reserved." }
end
```

Helper exclusion này sẽ đảm bảo các giá trị trong option :in hoặc :within sẽ không được chấp nhận. Với inclusion thì ngược lại.

### **Format**

```
class Product < ApplicationRecord
  validates :legacy_code, format: { with: /\A[a-zA-Z]+\z/,
    message: "only allows letters" }
end
```

Chúng ta sẽ sử dụng option *:with* để kiểm tra các định dạng cho phép hoặc *:without* để ngoại lệ một số định dạng cụ thể.

### **Length**

```
class Person < ApplicationRecord
  validates :name, length: { minimum: 2 }
  validates :bio, length: { maximum: 500 }
  validates :password, length: { in: 6..20 }
  validates :registration_number, length: { is: 6 }
end
```

Helper này khá phổ biến để kiểm tra độ dài của attribute với các option *:minimum, :maximum, :in, :is*

### **Numericality**

```
class Player < ApplicationRecord
  validates :points, numericality: true
  validates :games_played, numericality: { only_integer: true }
end
```

Chúng ta sẽ chỉ chấp nhận số integer hay float với numericality.

ROR hỗ trợ option :only_integer để chỉ chấp nhận số nguyên. Mặc khác các option như nhỏ hơn, lớn hơn, chẵn lẻ… cũng có sẵn trong numericality.

**Chú ý Numericality sẽ không cho phép nil.**

### Presence vs Absence

```
class Person < ApplicationRecord
  validates :name, :login, :email, presence: true
end
```

**Presence** sẽ không chấp nhận các giá trị nil, trống hay chuỗi các khoảng trắng. Ngược lại với absence.

### Uniqueness

```
class Holiday < ApplicationRecord
  validates :name, uniqueness: { scope: :year,
    message: "should happen once per year" }
end
```

Nó đảm bảo các giá trị là duy nhất và không có sự trùng lặp trong database.
Bạn có thể sử dụng option *:scope* để để unique cho 2 column.
Và bạn cũng có thể sử dụng *:casesensitive* để quan tâm đến các ký tự hoa thường hay không. Mặc định nó là true - có quan tâm.

### Allow_nil vs Allow_blank

```
class Coffee < ApplicationRecord
  validates :size, inclusion: { in: %w(small medium large),
    message: "%{value} is not a valid size" }, allow_nil: true
end
```

Cho phép bỏ qua các validation khi giá trị nil hay blank.

### On

```
class Person < ApplicationRecord
  validates :email, uniqueness: true, on: :create
  validates :age, numericality: true, on: :update
  validates :name, presence: true
end
```

Cho phép bạn tuỳ chỉnh validation sẽ xảy ra với bối cảnh (context) nào.

```
class Person < ApplicationRecord
  validates :age, numericality: true, on: :account_setup
end
```
 
```
person = Person.new(age: 'thirty-three')
person.valid? # => true
person.valid?(:account_setup) # => false
```

Bạn có thể tuỳ chỉnh các :context khác nhưng phải truyền nó vào các hàm chạy validation.

# Tuỳ chỉnh validation như thế nào?

Chúng ta chỉ đã sử dụng option :on để tuỳ biến theo context. Vậy với các context phức tạp thì sẽ thế nào?

### Sử dụng :if hoặc :unless

```
class Order < ApplicationRecord
  validates :card_number, presence: true, if: :paid_with_card?
 
  def paid_with_card?
    payment_type == "card"
  end
end
```

Việc sử dụng *:if* tương tự cho nhiều attribute khá rối rắm nên ROR đã cho ra đời :with_option để nhóm các điều kiện lại.

```
class User < ApplicationRecord
  with_options if: :is_admin? do |admin|
    admin.validates :password, length: { minimum: 10 }
    admin.validates :email, presence: true
  end
end
```


Khi các validation có sẵn vẫn chưa làm vừa lòng bạn, thì ngay lúc nào tạo ra một validator của chính mình là hiệu quả nhất.

### Kế thừa ActiveModel:Validator

Custom Validators là class kế thừa **ActiveModel:Validator** và phải thực hiện hàm validate (record). Custom validator này sẽ được gọi với *validatewith*.

```
class MyValidator < ActiveModel::Validator
  def validate(record)
    unless record.name.starts_with? 'X'
      record.errors[:name] << 'Need a name starting with X please!'
    end
  end
end
```
 
```
class Person
  include ActiveModel::Validations
  validates_with MyValidator
end
```


### Kế thừa ActiveModel:EachValidator

Nếu bạn chỉ muốn custom validator cho các attribute riêng biệt giống như *presence, uniqueness*,... thì class sẽ kế thừa **ActiveModel:EachValidator** và phải thực hiện hàm *validateeach (record, attribute, value)*.

```
class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      record.errors[attribute] << (options[:message] || "is not an email")
    end
  end
end
```
 
```
class Person < ApplicationRecord
  validates :email, presence: true, email: true
end
```

### Custom Methods

Khi tuỳ biến validator này chỉ thích hợp với chỉ một model đặc biệt này thôi, thì bạn chỉ nên sử dụng method để việc kiểm lỗi và bảo trì dễ dàng hơn. 

```
class Invoice < ApplicationRecord
  validate :expiration_date_cannot_be_in_the_past
 
  def expiration_date_cannot_be_in_the_past
    if expiration_date.present? && expiration_date < Date.today
      errors.add(:expiration_date, "can't be in the past")
    end
  end
End
```

Chúng ta có thể thấy từ khoá đã có thay đổi với **validate** chứ không phải validates như bình thường.