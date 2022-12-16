Tiếp nối 2 phần trước, phần này mình sẽ tiếp tục tổng hợp những cách viết ngắn gọn trong Ruby on Rails.
Chúng ta lên đường nàoooo (go)

### Xử lý ngoại lệ trong Ruby
Mở đầu phần 3 này, mình sẽ nói về cú pháp xử lý ngoại lệ `begin/resuce` hết sức quen thuộc.
Thường thì chúng ta hay viết như thế này
```Ruby
def process_user(user)
  begin
    send_to_mail(user)
  rescue
    # Xử lý ngoại lệ
  end
end
```
Nhưng thực ra có thể k cần dùng `begin` ở đây
```Ruby
def process_user(user)
  send_to_mail(user)
rescue
  # Xử lý ngoại lệ
end
```

### sử dụng StandardError để xử lý ngoại lệ thay cho Exception
Những người đang làm Java hoặc C# có xu hướng nghĩ rằng: "Cần phản xử lý để bắt tất cả các ngoại lệ xảy ra"
Tuy nhiên, việc cố gắng bắt tất cả các Exception trong Ruby cũng đi kèm với việc bắt 1 ngoại lệ chết người như `NoMemoryError`. Để tránh việc này, chúng có thể sử dụng StandardError - 1 class con để xử lý ngoại lệ của class Exception. Để rõ ràng hơn, các bạn có thể xem trong ví dụ dưới đây

```Ruby
def process_user(user)
  send_to_mail(user)
rescue Exception => ex
  # Cách viết này không tốt vì NoMemoryError Exception có thể được gọi đến
end
```

```Ruby
def process_user(user)
  send_to_mail(user)
rescue => ex
  # Tất các lỗi trong quá trình chạy (= StandardError và các lớp con của nó) đều bị bắt
end
```

### Các phương thức khác nhau của mảng

####find: trả lại kết quả đầu tiên tìm thấy
```Ruby
def find_admin(users)
  users.each do |user|
    return user if user.admin?
  end
  nil
end
```

```Ruby
def find_admin(users)
  users.find(&:admin?)
end
```

Tương tư, để trả về index của phần tử đầu tiên tìm thấy, có thể dùng `find_index`

####select: trả lại những phần tử đáp ứng điều kiện
```Ruby
def find_admins(users)
  admins = []
  users.each do |user|
    admins << user if user.admin?
  end
  admins
end
```

```Ruby
def find_admins(users)
  users.select(&:admin?)
end
```

Để chỉ select các phần tử không đáp ứng điều kiện, có thể dùng `reject` thay vì `select`

####count: trả về số phần tử thỏa mãn điều kiện
```Ruby
def count_admin(users)
  count = 0
  users.each do |user|
    count += 1 if user.admin?
  end
  count
end
```

```Ruby
def count_admin(users)
  users.count(&:admin?)
end
```

####map: tạo 1 mảng khác từ 1 mảng trước (cái này thì quen thuộc rồi)
```Ruby
def user_names(users)
  names = []
  users.each do |user|
    names << user.name
  end
  names
end
```

```Ruby
def user_names(users)
  users.map(&:name)
end
```

####flat_map = flatten + map
```Ruby
nested_array = [[1, 2, 3], [4, 5, 6]]
mapped_array = nested_array.map {|array| array.map {|n| n * 10 } }
# => [[10, 20, 30], [40, 50, 60]]
flat_array = mapped_array.flatten
# => [10, 20, 30, 40, 50, 60]
```

```Ruby
nested_array = [[1, 2, 3], [4, 5, 6]]
flat_array = nested_array.flat_map {|array| array.map {|n| n * 10 } }
# => [10, 20, 30, 40, 50, 60]
```

####compact: loại trử các phần tử nil trong mảng
```Ruby
numbers_and_nil = [1, 2, 3, nil, nil, 6]
only_numbers = numbmers_and_nil.reject(&:nil?) # => [1, 2, 3, 6]
```

```Ruby
numbers_and_nil = [1, 2, 3, nil, nil, 6]
only_numbers = numbers_and_nil.compact # => [1, 2, 3, 6]
```

####any: trả về true nếu có ít nhất 1 phần tử thỏa mãn điều kiện
```Ruby
def contains_nil?(users)
  users.each do |user|
    return true if user.nil?
  end
  false
end
```

```Ruby
def contains_nil?(users)
  users.any?(&:nil?)
end
```

Nếu bạn muốn trả về true nếu tất cả các phẩn tử thỏa mãn điều kiện thì dùng `all?`

####sample: trả về phần tử ngẫu nhiên
```Ruby
users[rand(users.size)]
```

```Ruby
users.sample
```

### 1 vài method thay đổi định dạng String 
```
# biến snake_case thành camelCase
"my_book".camelize # => "MyBook"

# biến thành snake_case
"MyBook".underscore # => "my_book"

# dùng dấu gạch ngang để tách biệt
"my_book".dasherize # => "my-book"

# biến thành số nhiều
"book".pluralize            # => "books"
"person".pluralize          # => "people"
"fish".pluralize            # => "fish"
"book_and_person".pluralize # => "book_and_people"
"book and person".pluralize # => "book and people"
"BookAndPerson".pluralize   # => "BookAndPeople"

# biến thành số ít
"books".singularize            # => "book"
"people".singularize           # => "person"
"books_and_people".singularize # => "books_and_person"
"books and people".singularize # => "books and person"
"BooksAndPeople".singularize   # => "BooksAndPerson"

# viết hoa chữ cái đầu dòng + dấu cách tách biệt
"my_books".humanize # => "My books"

# viết hoa chữ cái đầu tiền của mỗi từ + dấu cách tách biết
"my_books".titleize # => "My Books"

# biến thành tên class (dạng camelCase + Số ít)
"my_book".classify  # => "MyBook"
"my_books".classify # => "MyBook"

# biến thành tên table (dạng snakeCase + số nhiều)
"my_book".tableize # => "my_books"
"MyBook".tableize  # => "my_books"
```

Ngoài ra còn 1 vài phương thức nhưng ít được sử dụng hơn, như `constantize` hay là `demodulize`
Các bạn có thể tham khảo ở: http://apidock.com/rails/String

## Tổng kết
Phần này cũng sẽ là phần cuối cho Series này của mình, hy vọng Series này sẽ ít nhiều mang đến những kiến thức nhất định cho các bạn ^^!
Tài liệu tham khảo: https://qiita.com/jnchito/items/dedb3b889ab226933ccf