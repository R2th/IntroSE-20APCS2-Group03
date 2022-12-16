**1. Tại sao phải liên kết?**

Trong Rails, việc liên kết các bản ghi làm cho các hoạt động trở nên đơn giản và dễ dàng hơn khi code.  
Ví dụ, với một ứng dụng Rails đơn giản gồm author và book thì author sẽ có nhiều book và book chỉ có duy nhất 1 author.    
Với việc không có liên kết, khi cần tạo book với author_id có sẵn:

```
@book = Book.create(published_at: Time.now, author_id: @author.id)
```

Hay với việc xóa author, phải xóa hết tất cả book của nó:

```
@books = Book.where(author_id: @author.id)
@books.each do |book|
  book.destroy
end
@author.destroy
```

Nhưng khi sử dụng liên kết, chúng ta có thể rút gọn và đơn giản code:

```
class Author < ApplicationRecord
  has_many :books, dependent: :destroy
end
 
class Book < ApplicationRecord
  belongs_to :author
end
```

Xóa author với tham số dependent -> destroy, book sẽ tự động hủy khi author bị hủy.

**2. Các loại liên kết**

Rails hỗ trợ 6 loại liên kết:

* belongs_to
* has_one
* has_many
* has_many :through
* has_one :through
* has_and_belongs_to_many

Các liên kết sử dụng macro-style để gọi, có thể khai báo thêm tính năng cho các model.    
Ví dụ việc khai báo model belongs_to một model khác, bạn đã nói với Rails về primary-foreign key giữa 2 model.

**2.1 belongs_to**

Liên kết belongs_to là liên kết 1-1 với model khác, mỗi thể hiện của model "thuộc về" 1 thể hiện của model khác. Ví dụ, book sẽ thuộc về 1 author:

```
class Book < ApplicationRecord
  belongs_to :author
end
```

***Chú ý: author phải là số ít. Rails sẽ tự động lấy tên class từ tên của bảng liên kết.***

**2.2 has_one**

has_one là liên kết 1-1 với model khác, mỗi thể hiện của model sẽ "sở hữu" 1 thể hiện model khác.  
Ví dụ, với mỗi Supplier sẽ sở hữu 1 Account:

```
class Supplier < ApplicationRecord
  has_one :account
end
```

Tùy vào trường hợp, bạn cần phải tạo unique index hay foreign key cho cột supplier ở bảng Account.

**2.3 has_many**

Đây là trường hợp liên kết 1-nhiều. Bạn sẽ thường tìm thấy liên kết này ở bảng được belongs_to.     
Mỗi thể hiện của model sẽ có 0 hoặc nhiều thể hiện của model khác. Ví dụ, Author sẽ có thể có nhiều book:

```
class Author < ApplicationRecord
  has_many :books
end
```

***Chú ý: Tên của model kia sẽ là số nhiều.***

**2.4 has_many :through**

Thường được sử dụng trong liên kết nhiều-nhiều với model khác.   
Thể hiện này có thể có 0 hoặc nhiều thể hiện model khác "thông qua" model thứ 3.     
Ví dụ, chúng ta sẽ có bảng Appointment ở giữa 2 bảng Patient & Physician, Patient sẽ liên kết nhiều-nhiều với Physician thông qua bảng Appointment:

```
class Physician < ApplicationRecord
  has_many :appointments
  has_many :patients, through: :appointments
end
 
class Appointment < ApplicationRecord
  belongs_to :physician
  belongs_to :patient
end
 
class Patient < ApplicationRecord
  has_many :appointments
  has_many :physicians, through: :appointments
end
```

Việc quản lý model được thể hiện ở các phương thức. Ví dụ:

`physician.patients = patients`

**2.5 has_one :through**

Liên kết 1-1 với model khác thông qua model thứ 3. Ví dụ, với 1 Supplier có 1 Account và với 1 Account có 1 Account History, thì Suppiler có thể:

```
class Supplier < ApplicationRecord
  has_one :account
  has_one :account_history, through: :account
end
 
class Account < ApplicationRecord
  belongs_to :supplier
  has_one :account_history
end
 
class AccountHistory < ApplicationRecord
  belongs_to :account
end
```

**2.6 has_and_belongs_to_many**

Đây là liên kết nhiều-nhiều với 1 model khác và không có sự can thiệp model thứ 3.    
Ví dụ, với mỗi Assembly có nhiều Part và với mỗi Part có nhiều Assembly:

```
class Assembly < ApplicationRecord
  has_and_belongs_to_many :parts
end
 
class Part < ApplicationRecord
  has_and_belongs_to_many :assemblies
end
```