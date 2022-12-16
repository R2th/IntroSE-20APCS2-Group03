Phần này chúng ta sẽ tìm hiểu chi tiết về: has_many

# 1. Các hàm thêm bởi has_many
Khi ta khai báo một has_many association, sẽ có 17 hàm liên quan đến association này:

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
collection.build(attributes = {}, ...)
collection.create(attributes = {})
collection.create!(attributes = {})
collection.reload
```

Trong tất cả các hàm, `collection` sẽ được thay thế bởi ký hiệu của đối tượng đầu tiên trọng quan hệ has_many (ở dạng số nhiều), còn `collection_singular` thì là đối tượng đó nhwung ở dạng số ít.
Ví dụ:
Ta có 2 model Author và Book có quan hệ như sau:
```
class Author < ApplicationRecord
  has_many :books
end
```

Với mỗi Author ta có các hàm sau:
```

books
books<<(object, ...)
books.delete(object, ...)
books.destroy(object, ...)
books=(objects)
book_ids
book_ids=(ids)
books.clear
books.empty?
books.size
books.find(...)
books.where(...)
books.exists?(...)
books.build(attributes = {}, ...)
books.create(attributes = {})
books.create!(attributes = {})
books.reload
```

Dưới đây ta đi chi tiết vào 1 số hàm:

## 1.1 collection
Hàm `collection` trả về tất cả các objects con. Nếu không có object nào thì sẽ trả về rỗng.
```
@books = @author.books
```

## 1.2 collection<<(object, ...)
Hàm `collection<<` để thêm 1 hoặc nhiều objects con vào quan hệ với object cha.
```
@author.books << @book1
```

## 1.3 collection.delete(object, ...)
Hàm `collection.delete` sẽ loại bỏ 1 hoặc nhiều objects con ra khỏi quan hệ với object cha bằng cách xét khóa ngoài của nó thành NULL.
```
@author.books.delete(@book1)
```

## 1.4 collection_singular_ids
Hàm này trả về mảng các id của các objects con.
```
@book_ids = @author.book_ids
```

## 1.5 collection.empty?
Hàm này trả về true nếu không có object con nào tồn tại thỏa mãn quan hệ với object cha.
```
<% if @author.books.empty? %>
  No Books Found
<% end %>
```

## 1.6 collection.size
Hàm này trả về số lượng object con.
```
@book_count = @author.books.size
```

## 1.7 collection.build(attributes = {}, ...) và collection.create(attributes = {})
Hàm này để tạo 1 hoặc nhiều object con từ object cha, có sẵn khóa ngoài là khoá chính của object cha.
```
@book = @author.books.build(published_at: Time.now,  book_number: "A12345")
 
@books = @author.books.build([
  { published_at: Time.now, book_number: "A12346" },
  { published_at: Time.now, book_number: "A12347" }
])


@book = @author.books.create(published_at: Time.now,  book_number: "A12345")
 
@books = @author.books.create([
  { published_at: Time.now, book_number: "A12346" },
  { published_at: Time.now, book_number: "A12347" }
])
```

## 1.8 collection.reload
Hàm này vẫn trả về toàn bộ objects con trong quan hệ, nhưng gọi lại từ database để đảm bảo được dữ liệu mới nhất của các object con.

```
@books = @author.books.reload
```

# 2. Các lựa chọn cho has_many
`has_many` hỗ trợ các options sau:
```
:as
:autosave
:class_name
:counter_cache
:dependent
:foreign_key
:inverse_of
:primary_key
:source
:source_type
:through
:validate
```

Dưới đây ta tìm hiểu 1 vài options chính:

## 2.1 :autosave
Nếu ta xét autosave là true, thì bất cứ khi nào ta save object cha, các objects con cũng sẽ được save hoặc xóa nếu bị đánh dấu xóa.
Việc xét autosave là false khác với việc không xét autosave. Nếu ta không xét autosave thì khi ta tạo mới object cha cùng object con thì cả 2 sẽ cùng được save, còn khi ta update object cha, object con sẽ không được save.

## 2.2 :class_name
Nếu tên của model cha mà không trùng với tên quan hệ mình muốn đặt thì ta cần thêm option class_name để chỉ chính xác tên model.
```
class Author < ApplicationRecord
  has_many :books, class_name: "Transaction"
end
```

## 2.3 :dependent
Đây là option để xử lý các objects con khi mà object cha bị xóa, có các lựa chọn sau:
- :destroy: các object con sẽ bị xóa cùng cha.
- :delete_all: các object con sẽ bị xóa trực tiếp từ database.
- :nullify: khóa ngoài của các object con được xét thành NULL.

## 2.4 :foreign_key
Nếu tên của khóa ngoài không trùng với model cha thì cần thêm option foreign_key.
```
class Author < ApplicationRecord
  has_many :books, foreign_key: "cust_id"
end
```

## 2.5  :validate
Nếu xét :validate là false, thì khi save object cha, không cần kiểm tra validate của các objects con. Mặc định thì option :validate được xét là true.

# 3. Scopes cho has_many
Ta có các scopes sau:
```
where
extending
group
includes
limit
offset
order
readonly
select
distinct
```

## 3.1 where
Hàm where để xác định thêm điều kiện lọc ra các objects con.
```
class Author < ApplicationRecord
  has_many :confirmed_books, -> { where "confirmed = 1" },  class_name: "Book"
end
```

Có thể viết dưới dạng hash:

```
class Author < ApplicationRecord
  has_many :confirmed_books, -> { where confirmed: true },  class_name: "Book"
end
```

Nếu ta viết dạng hash thì khi tạo objects con từ object cha, điều kiện đi cùng hàm where sẽ được áp dụng kèm luôn.
Với vị dụ về Author và Book ở trên, nếu ta sử dụng @author.confirmed_books.create hoặc @author.confirmed_books.build để tạo books thì cột `confirmed` sẽ có sẵn giá trị là true.

## 3.2 group
Hàm này cần tên 1 trường để nhóm các kết quả lại, nó sử dụng hàm `GROUP BY` của SQL.
```
class Author < ApplicationRecord
  has_many :line_items, -> { group 'books.id' }, through: :books
end
```

## 3.3 includes
Hàm includes cho phép ta sử dụng luôn eager-loaded khi gọi 1 quan hệ.
```
class Author < ApplicationRecord
  has_many :books, -> { includes :line_items }
end
 
class Book < ApplicationRecord
  belongs_to :author
  has_many :line_items
end
 
class LineItem < ApplicationRecord
  belongs_to :book
end
```
Lúc này ta gọi `@author.books.line_items` thì lượng query sẽ được tối giản.

## 3.4 limit
Hàm `limit` cho phép hạn chế số lượng objects con.
```
class Author < ApplicationRecord
  has_many :recent_books,
    -> { order('published_at desc').limit(100) },  class_name: "Book"
end
```

## 3.5 order
Các objects con sẽ được sắp xếp theo 1 trường nào đấy khi được gọi thông qua quan hệ. Sử dụng lệnh `ORDER BY` của SQL.
```
class Author < ApplicationRecord
  has_many :books, -> { order "date_confirmed DESC" }
end
```

## 3.6 select
Ta có thể chỉ định trả về các trường nhất định của objects con. Mặc định sẽ trả về hết tất cả các trường.

# 4. Nguồn
http://guides.rubyonrails.org/association_basics.html#options-for-has-many-autosave