# counter_cache option for belong_to association
Gĩa sử mình có 2 model Author và Book. khi mình gọi  @author.books.size rails sẻ truy cấn database để thực thi câu lệnh count().  Để tránh cuộc gọi này mình có thể thêm tùy chọn counter_cache khi định nghĩa 
liên kết belong_to

```
class Book < ApplicationRecord
  belongs_to :author,  counter_cache: true
end
class Author < ApplicationRecord
  has_many :books
end
```

Lưu ý mình cần thêm cột books_count  trong table author
Lúc này mỗi khi mình tạo thêm hoặc xóa book thì giá trị của cột books_count của author tương ứng sẽ được cập nhật. khi cần đếm số book của một author ta chỉ @author.books_count mà không cần thực hiện một query nào
# inverse_of option for has_many association
Để hiểu rỏ hơn về sự hửu ích của tùy chọn này mình cần tìm hiểu Bi-directional Associations trước
## Bi-directional Associations
Active Record tự động xác định 2 mô hình này có liên kết 2 chiều. Điều này có nghĩa Active Record sẽ chỉ tải một bản  sao của đối tượng author. Làm cho ứng dụng của mình hiệu quả hơn, ngăn ngừa dữ liệu không nhất quán. Ví dụ:

```
a = Author.first
b = a.books.first
a.first_name == b.author.first_name # => true
a.first_name = 'David'
a.first_name == b.author.first_name # => true
```

Khi liên kết có chứa các tùy chọn sau thì active record không thể tự động xác định bi-directional associations cho liên kết:
:conditions
:through
:polymorphic
:class_name
:foreign_key

```
class Author < ApplicationRecord
  has_many :books
end
 
class Book < ApplicationRecord
  belongs_to :writer, class_name: 'Author', foreign_key: 'author_id'
end
```
Kết quả
```
a = Author.first
b = a.books.first
a.first_name == b.writer.first_name # => true
a.first_name = 'David'
a.first_name == b.writer.first_name # => false
```

Và inverse_of chính là tùy chọn để mình khai báo bi-directional associations một các rõ ràng

```
class Author < ApplicationRecord
  has_many :books, inverse_of: 'writer'
end
 
class Book < ApplicationRecord
  belongs_to :writer, class_name: 'Author', foreign_key: 'author_id'
end
```
Kết quả
```
a = Author.first
b = a.books.first
a.first_name == b.author.first_name # => true
a.first_name = 'David'
a.first_name == b.author.first_name # => true
```

Một số gới hạn của tùy chọn này là không thực hiện được khi liên kết có các tùy chọn như: through, polymorphic, as

#  Association Callbacks
Như các callback thông thường, nó sẻ hook vào vòng đời của các đối tượng, cho phép mình làm việc với đối tượng ở nhiều giai đoạn khác nhau. Ví dụ: before_save callback sẻ hook vào trước khi đối tượng được lưu
Tương tự  association callbacks sẽ hook vào vòng đợi của một collection.  Có 4 association callbacks:

before_add
after_add
before_remove
after_remove

Bằng cách thêm các tùy chọn này vào lúc khai báo liên kết. Ví dụ:

```
class Author < ApplicationRecord
  has_many :books, before_add: :check_credit_limit
 
  def check_credit_limit(book)
    ...
  end
end
```

Bạn có thể tìm hiểu thêm tại đây
http://guides.rubyonrails.org/association_basics.htm