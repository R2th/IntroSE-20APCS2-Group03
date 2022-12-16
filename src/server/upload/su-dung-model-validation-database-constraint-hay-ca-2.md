## Lời mở đầu:
Xin chào các bác (bow)

Lúc code web app thì kiểu gì chả phải có vụ Validate. 

Tuy nhiên lúc migrate tables các bác có bao giờ tự hỏi, có nên đặt `null: false` ở đây không, `unique: true` ở kia có cần không? Đằng nào thì trong model mình chả validate rồi. :thinking: 

Rails cung cấp cho chúng ta bộ Validation rất ngon. 
Nó giúp cover đủ các thể loại errors như `presence`, `uniqueness`, `format`, `numericality`, ...

Nếu cần bất kỳ ràng buộc gì với dữ liệu, bạn chỉ cần 1 vài dòng code `validates` là có thể bảo vệ khỏi dữ liệu "rác".

### Nhưng validation là không đủ

    Ý của tôi ở đây không phải là nói validation của Rails có bug, nhưng ta hãy thử xem xét trường hợp sử dụng kiểu validate `uniqueness`.

Ví dụ ta có model `User`

```Ruby
class User
  validates :email, presence: true, uniqueness: true
end
```

Khi có object `User` chuẩn bị save vào DB, model sẽ validate bằng câu query `SELECT`, để kiểm tra xem email gửi lên đã tồn tại chưa.

Nếu dữ liệu đó là hợp lệ, Rails sẽ chạy query `INSERT` để đưa record đó vào trong DB.

Nó sẽ chạy chính xác trên môi trường Dev và có thể là cả Production nữa - nếu như bạn sử dụng single process WebServer.

Nhưng tất nhiên trên Production bạn sẽ không dùng WEBrick đúng không nào?

Bạn sẽ dùng phải dùng Web server **Unicorn**, **Puma**, ... để tăng lượng *request/min*, tức là phải dùng multiple web processes.

Nếu có 2 process cùng muốn tạo user trong 1 thời điểm thì sao:

![](https://images.viblo.asia/442babe7-b484-4906-8576-980fd5463bb9.png)

À há, cái validate unique để giữ cho dữ liệu được ràng buộc trong trường hợp này thì fail mất rồi. 

Đó là nguyên nhân ta cần phải có **unique** bên trong Database.

Ngoài ra Developers cũng phải xem xét có nên thêm `null: false` vào bên trong schema hay không, và đây là mấy dòng code để khắc phục điều đó:

```Ruby
create_table "users", force: :cascade do |t|
  t.name :string, null: false
  t.username :string, null: false, index: true
  t.encrypted_password :string, null: false
  t.timestamps

  t.index :username, unique: true
end
```

```Ruby
class User < ApplicationRecord
  attr_accessor :password

  validates :name, presence: true
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
  validates :encrypted_password, presence: true
end
```

### Vấn đề DRY

Thoạt nhìn thì có duplicate ở đây. 

Tuy nhiên, mục đích tồn tại của nó lại là khác nhau nên không thể coi là bị duplicate được.

- **Constaint Schema** giúp đảm bảo sự chính xác của dữ liệu tại tầng DB, bất kể data được đưa từ source nào đến.

- **Model validation** là trạm kiểm soát từ phía người dùng, cung cấp cho người dùng các message errors, giúp họ biết được mình đang nhập sai ở đâu.

### Quyết định lựa chọn giữa validation và constraint

Thực sự không nhất thiết với mỗi validation model, ta phải có schema constraint tương ứng với nó và ngược lại.
Để quyết định lựa chọn, bạn hãy trả lời 1 số câu hỏi sau đây:

- Bạn đang muốn ngăn chặn dữ liệu "xấu" được ghi vào DB, nó gây ảnh hưởng lớn tới hệ thống của bạn?. Nếu vậy bạn PHẢI sử dụng schema constraint. 
- Bạn chỉ muốn phòng ngừa lỗi mà User sử dụng có thể tự khắc phục?. Nếu vậy, hãy sử dụng model validation.

### Quay trở lại ví dụ

Giờ ta hãy thử trả lời câu hỏi trên cho `Users` table và `User` model trong ví dụ đã viết ở trên.

Phần schema chúng ta đã làm ổn rồi. Mỗi Constraint tồn tại để ngăn ngừa dữ liệu sida thêm vào và không thiếu constraint nào cả. 
Thậm chí ta thêm cả unique index vào trong cột username.

```Ruby
create_table "users", force: :cascade do |t|
  t.name :string, null: false
  t.username :string, null: false, index: true
  t.encrypted_password :string, null: false
  t.timestamps

  t.index :username, unique: true
end
```

Ứng dụng của chúng ta cho phép người dùng tự chọn `name`, `username` và `password`. 

Ngoài ra không còn trường nào khác mà User có thể nhập vào cả. Nhưng trong model ta lại có validation trên toàn bộ các trường trong DB.

```Ruby
class User < ApplicationRecord
  attr_accessor :password

  validates :name, presence: true
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
  validates :encrypted_password, presence: true
end
```

Hãy xem xét cái `encrypted_password`.
Nếu như một ngày đẹp trời nào đó, bất ngờ quá trình đăng ký user không set được `encrypted_password`. 

Validation trên sẽ bắn lỗi và show lên cho người dùng "Encrypted password is required". Phản ứng của User sẽ là: **WTF is this ??** :smiley: **??** 

Trong trường hợp đó, chả khác nào cú lừa vì làm họ đếch hiểu gì và bản thân họ không thể tự sửa lỗi được.

Nên thay vì validate `encrypted_password` ta hãy bỏ nó đi. 
```Ruby
class User < ApplicationRecord
  attr_accessor :password

  validates :name, presence: true
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true  
end
```
Một khi ta đã không còn validation trong Model thì ... vẫn không đăng ký được thôi (yaoming). 

Nhưng kịch bản lần này sẽ dẫn tới lỗi do `null: false` trong schema raise lên. 

Errors lúc này được raise lên, chuyển người dùng tới trang kiểu "Something got wrong, 404, 520..."

Người dùng vẫn không thể đăng ký tài khoản, nhưng họ biết là lỗi do hệ thống bên ta chứ không phải họ. 

Về bản thân phía bên Dev từ đó cũng có thể điều tra được nguyên nhân từ Log hoặc các Service để check errors.

### Nguồn:
- https://robots.thoughtbot.com/the-perils-of-uniqueness-validations
- https://robots.thoughtbot.com/validation-database-constraint-or-both