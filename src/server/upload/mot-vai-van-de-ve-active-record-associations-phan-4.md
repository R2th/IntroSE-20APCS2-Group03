Trong phần cuối này chúng ta cùng tìm hiểu nốt về `has_and_belongs_to_many` và Association Callbacks

## 1. `has_and_belongs_to_many` Association Reference
association này tạo 1 quan hệ nhiều nhiều với model khác. Trong cơ sở dữ liệu, 2 bảng quan hệ được liên kết qua 1 bảng trung gian có khóa ngoài liên quan đến 2 bảng chính.

### 1.1 Các hàm thêm bởi  `has_and_belongs_to_many`
Có 17 hàm được tự động thêm bởi `has_and_belongs_to_many` association:
```
collection
collection<<(object, ...)
collection.delete(object, ...)
collection.destroy(object, ...)
collection=(objects)
collection_singular_ids
collection_singular_ids=(ids)
collection.clear
collection.empty?
collection.size
collection.find(...)
collection.where(...)
collection.exists?(...)
collection.build(attributes = {})
collection.create(attributes = {})
collection.create!(attributes = {})
collection.reload
```

Ví dụm, ta có model như sau:
```
class Part < ApplicationRecord
  has_and_belongs_to_many :assemblies
end
```
Với mỗi instance của Part, ta sẽ có các hàm sau:
```
assemblies
assemblies<<(object, ...)
assemblies.delete(object, ...)
assemblies.destroy(object, ...)
assemblies=(objects)
assembly_ids
assembly_ids=(ids)
assemblies.clear
assemblies.empty?
assemblies.size
assemblies.find(...)
assemblies.where(...)
assemblies.exists?(...)
assemblies.build(attributes = {}, ...)
assemblies.create(attributes = {})
assemblies.create!(attributes = {})
assemblies.reload
```

1 số hàm cơ bản:

- `collection`

Hàm này trả về các objects quan hệ với object cha, nếu không có object con nào thỏa mãn thì sẽ trả về rỗng:
```
@assemblies = @part.assemblies
```

- `collection<<(object, ...)`

Hàm này để thêm 1 hoặc nhiều object vào quan hệ bằng cách tạo thêm records trong bảng trung gian.
```
@part.assemblies << @assembly1
```

- `collection.delete(object, ...)`

Hàm này xóa object khỏi quan hệ  bằng cách xóa record khỏi bảng trung giang, tuy nhiên sẽ không xóa object chính.
```
@part.assemblies.delete(@assembly1)
```

- `collection_singular_ids`

Hàm này trả về mảng các id của các đối tượng con
```
@assembly_ids = @part.assembly_ids
```
### 1.2 Các options cho `has_and_belongs_to_many`
`has_and_belongs_to_many` association hỗ tợ các options sau:
```
- :association_foreign_key
- :autosave
- :class_name
- :foreign_key
- :join_table
- :validate
```

- association_foreign_key và foreign_key
2 option này để khai báo foreign key cho bảng trung gian nếu foreign key không trùng với tên model.
```
class User < ApplicationRecord
  has_and_belongs_to_many :friends,
      class_name: "User",
      foreign_key: "this_user_id",
      association_foreign_key: "other_user_id"
end
```

- autosave
Nếu bạn xét autosave = true, Rails sẽ tự động save hoặc destroy các object con nếu bạn save object cha. 
Có sự khác nhau khi xét autosave = false và không xét autosave. Nếu option autosave không tồn tại, thì khi tạo mới cả object cha và con sẽ cùng được save, còn khi update thì không.

- class_name
Được dùng khi từ để khai báo quan hệ không giống với tên model.
```
class Parts < ApplicationRecord
  has_and_belongs_to_many :assemblies, class_name: "Gadget"
end
```

- validate
Nếu bạn xét validate = false thì object con sẽ không được validate bất cứ khi nảo bạn save object cha. Tức là object cha sẽ được save mà không quan tâm các con có thỏa mãn validate hay không.
Mặc định thì validate được xét là true.

### 1.3 Các loại scope cho `has_and_belongs_to_many`
Ta có các loại scope sau:
```
- where
- extending
- group
- includes
- limit
- offset
- order
- readonly
- select
- distinct
```

- where
hàm where sẽ chỉ định điều kiện cho quan hệ
```
class Parts < ApplicationRecord
  has_and_belongs_to_many :assemblies,
    -> { where "factory = 'Seattle'" }
end
```
Bạn cũng có thể xét quan hệ bằng kiểu hash:
```
class Parts < ApplicationRecord
  has_and_belongs_to_many :assemblies,
    -> { where factory: 'Seattle' }
end
```

- group
Hàm này sẽ chọn 1 trường để nhóm các kết quả tìm được, sử dụng lệnh `GROUP BY` của SQL
```
class Parts < ApplicationRecord
  has_and_belongs_to_many :assemblies, -> { group "factory" }
end
```

- limit
Chỉ định số lượng tối đa object con trong 1 quan hệ.
```
class Parts < ApplicationRecord
  has_and_belongs_to_many :assemblies,
    -> { order("created_at DESC").limit(50) }
end
```

- order
sắp xếp các objects con theo 1 trường nhất định. Dùng lệnh `ORDER BY` của SQL.
```
class Parts < ApplicationRecord
  has_and_belongs_to_many :assemblies,
    -> { order "assembly_name ASC" }
end
```


## 2. Association Callbacks
Có 4 loại association callbacks:
- before_add
- after_add
- before_remove
- after_remove

Bạn định nghĩa association callbacks khi khai báo quan hệ trong model.
Ví dụ:

```
class Author < ApplicationRecord
  has_many :books, before_add: :check_credit_limit
 
  def check_credit_limit(book)
    ...
  end
end
```
Object được thêm vào hoặc xóa đi sẽ được truyền vào như 1 tham số của callback.

Bạn có thể gộp nhiều callback vào 1 mảng để gọi trong cùng 1 sự kiện:

```

class Author < ApplicationRecord
  has_many :books,
    before_add: [:check_credit_limit, :calculate_shipping_charges]
 
  def check_credit_limit(book)
    ...
  end
 
  def calculate_shipping_charges(book)
    ...
  end
end
```

Nếu 1 `before_add` callback gặp lỗi, thì object sẽ không được thêm vào thành công. Tương tự nếu 1 `before_remove` callback bị lỗi, thì object đó cũng không bị xóa khỏi nhóm quan hệ.

## Nguồn
http://guides.rubyonrails.org/association_basics.html#has-and-belongs-to-many-association-reference