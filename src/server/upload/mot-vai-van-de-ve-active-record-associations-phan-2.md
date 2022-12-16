Phần này mình sẽ giới thiệu chi tiết về: belongs_to

# 1 Các hàm thêm bởi belongs_to
- association
- association=(associate)
- build_association(attributes = {})
- create_association(attributes = {})
- create_association!(attributes = {})
- reload_association

Giả sử ta có model như sau:

```
class Book < ApplicationRecord
  belongs_to :author
end
```

Với mỗi instance của Book ta có các hàm sau:

```
author
author=
build_author
create_author
create_author!
reload_author
```

## 1.2 association
association method trả về object của model quan hệ kia. Nếu ko tìm thấy thì sẽ trả về nil.

```
@author = @book.author
```

 ## 1.3 association=(associate)
  Đây là hàm để gán giá trị cho phần tử của model quan hệ.

```
@book.author = @author
```

## 1.4 build_association(attributes = {})
Hàm này sẽ trả về 1 phần tử mới của model quan hệ, được khởi tạo với đầy đủ các attributes, được kêt nối với model chính bằng khóa ngoài. Phần tử này mới chỉ được khởi tạo chứ chưa được lưu vào DB
```
@author = @book.build_author(author_number: 123,
                                  author_name: "John Doe")
```

## 1.5 create_association(attributes = {})
Giống với hàm build nhưng sẽ lưu luôn vào DB
```
@author = @book.create_author(author_number: 123,
                                   author_name: "John Doe")
```

## 1.6 create_association!(attributes = {})
Giống hàm create nhưng nếu lưu thất bại thì trả về ActiveRecord::RecordInvalid

## 1.7 reload_association
Khi ta đã gán:
```
@author = @book.author
```
mà sau đó author bị thay đổi. Nếu ta vẫn dùng @book.author thì giá thị @author không có gì khác vì đã bị cached. Do đó ta cần dùng reload
```
@author = @book.reload_author
```

# 2 Các tùy chọn cho belongs_to

## 2.1 autosave
```
class Book < ApplicationRecord
  belongs_to :author, autosave: true
end
```
Nếu ta set autosave bằng true, Rails sẽ lưu và load lại thành viên và xóa các thành viên bị đánh dấu xóa khi bạn lưu object cha.

## 2.2 class_name
Nếu class name của model kia không giống với tên của association thì ta cần sửa dụng :class_name để xác định name của model đó.

```
class Book < ApplicationRecord
  belongs_to :author, class_name: "Patron"
end
```

## 2.3 counter_cache
counter_cache dùng để đếm số lượng objects con của một object cha.
```
class Book < ApplicationRecord
  belongs_to :author, counter_cache: true
end
class Author < ApplicationRecord
  has_many :books
end
```

## 2.4 dependent
Có 2 loại:
- `dependent: :destroy` khi object bị xóa, nó sẽ xóa tất cả các objects liên quan (tương tự như destroy từng objetc con).
- `dependent: :delete` khi object bị xóa, thì các objects liên quan sẽ bị xóa trực tiếp trong DB mà ko qua hàm `destroy`
Lưu ý khi sử dụng option này, vì có thể làm cho 1 số record bị `mồ côi` (tức là khóa ngoài có id của cha, nhưng cha đã bị xóa)

## 2.5 foreign_key
Khi tên của convention không giống với foreign_key trong DB thì cần khai báo foreign_key trong quan hệ
```
class Book < ApplicationRecord
  belongs_to :author, class_name: "Patron",
                        foreign_key: "patron_id"
end
```

## 2.6 touch
Nếu set :touch bằng true, thì khi lưu hoặc xóa object cha, object con sẽ được cập nhật `updated_at` hoặc `updated_on` vào đúng thời điểm đó
```
class Book < ApplicationRecord
  belongs_to :author, touch: true
end
 
class Author < ApplicationRecord
  has_many :books
end
```

# 3 Scopes cho belongs_to
Nếu bạn muốn chỉnh sửa query của quan hệ belongs_to, bạn có thể dùng scope:
Ví dụ:
```
class Book < ApplicationRecord
  belongs_to :author, -> { where active: true },
                        dependent: :destroy
end
```
Ta có thể sử dụng các loại query methods:
- where
- includes
- readonly
- select

## 3.1 where
Khi sử dụng where thì ngoài điều kiện khóa ngoài thì object của model quan hệ còn phải thỏa mãn điều kiện thêm trong where.
```
class book < ApplicationRecord
  belongs_to :author, -> { where active: true }
end
```

## 3.2 includes
Phương thức includes sẽ lấy sẵn model đi kèm với model quan hệ để có thể sử dụng mà không cần query thêm.

```
class LineItem < ApplicationRecord
  belongs_to :book, -> { includes :author }
end
 
class Book < ApplicationRecord
  belongs_to :author
  has_many :line_items
end
 
class Author < ApplicationRecord
  has_many :books
end
```

Tuy nhiên việc này là không cần thiết vì ta có thể dùng phương thức includes ở ngoài khi query lấy ra object đấy

## 3.3 readonly
Nếu sử dụng readonly, thì khi các object quan hệ được lấy ra sẽ chỉ có quyền read-only

## 3.4 select
Sử dụng select ta có thể chỉ định các trường có thể lấy ra khi gọi ra các object quan hệ.
Lưu ý: nên select foreign_key để bảo đảm kết quả được chính xác