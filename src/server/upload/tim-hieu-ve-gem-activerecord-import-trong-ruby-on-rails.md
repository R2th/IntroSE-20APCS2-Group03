Chắc hẳn các bạn đã biết về các phương thức mà ActiveRecord cung cấp cho chúng ta để thêm mới một bản ghi dữ liệu trong datatabase như `create`, `save`. Tuy nhiên đối với một khối lượng dữ liệu lớn cần đưa vào database mà dùng theo cách import từng dòng như vậy thì vừa tốn performance vừa tốn thời gian do ta phải gửi quá nhiều lần kết nối tới CSDL. Giải pháp của vấn đề này đó là thực hiện import nhiều bản ghi vào CSDL cùng lúc, như vậy sẽ giảm số lần kết nối tới CSDL, giúp tiết kiệm đáng kể về thời gian cũng như hiệu suất. 

Vậy, câu hỏi đặt ra là làm sao để import nhiều dữ liệu cùng lúc trong Rails?
 
 Mình có ba giải pháp để import được nhiều dữ liệu cùng lúc trong Rails như sau:
 
 - Giải pháp thứ nhất là sử dụng câu lệnh SQL thuần để insert nhiều bản ghi cùng lúc. Ưu điểm của giải pháp này là ta có thể sử dụng hầu hết trong các phiên bản của Ruby on Rails, còn về nhược điểm thì câu lệnh SQL khá là dài dòng, khó đọc code và không tận dụng được ưu thế của ActiveRecord. 
- Giải pháp thứ hai: hiện nay trong Rails 6 đã cung cấp thêm một method giúp chúng ta có thể import nhiều dữ liệu cùng lúc mà không cần phải viết câu lệnh SQL thuần túy. Ưu điểm của nó là ngắn gọn, dễ đọc code, dễ tái cấu trúc, tận dụng được ưu thế của ActiveRecord. Nhược điểm của nó là các method import dữ liệu này chỉ có ở Rails 6 :cry:, thật là buồn vì các phiên bản Ruby on Rails thấp hơn Rails 6 không được hỗ trợ tính năng này.
- Giải pháp thứ ba: đó là sử dụng gem activerecord-import, đây là một thư viên mạnh mẽ, tương thích với mọi phiên bản Ruby on Rails, giúp chúng ta import nhiều bản ghi cùng lúc một cách dễ dàng và thuận tiện. Đây cũng là chủ đề chính trong bài viết của mình ngày hôm nay.

Gem activerecord cung cấp các tính năng high-level sau:

- Làm việc với các cột và mảng giá trị thô (nhanh nhất)
- Làm việc với các đối tượng model (nhanh hơn)
- Thực hiện validations (nhanh)
- Thực hiện trên các bản cập nhật khóa trùng lặp (yêu cầu MySQL, SQLite 3.24.0+ hoặc Postgres 9.5+)

# 1. Giới thiệu
Gem này thêm một method import (hoặc bulk_import, để tương thích với các gem như elasticsearch-model; xem [Conflicts With Other Gems](https://github.com/zdennis/activerecord-import#conflicts-with-other-gems)) vào các lớp ActiveRecord.

Khi không sử dụng `activerecord-import`, ta sẽ import nhiều dữ liệu với active record như sau:
```ruby
10.times do |i|
  Book.create! name: "book #{i}"
end
```
Cách viết này sẽ gọi 10 lần tới cơ sở dữ liệu. YUCK! Hãy thay thế đoạn mã trên bằng activerecord-import như sau:
```ruby
books = []
10.times do |i|
  books << Book.new(name: "book #{i}")
end
Book.import books    # or use import!
```
và chỉ cần một cuộc gọi SQL tới CSDL. Thật tuyệt phải không nào!

# 2. Cột và mảng
Phương thức `import` có thể nhận một mảng tên cột (kiểu string hoặc symbols) và một mảng các mảng con. Mỗi mảng con đại diện cho một bản ghi riêng lẻ và danh sách các giá trị của nó theo thứ tự các cột. Đây là cơ chế import nhanh nhất và cũng là sơ khai nhất. 
```ruby
columns = [ :title, :author ]
values = [ ['Book1', 'George Orwell'], ['Book2', 'Bob Jones'] ]

# Importing without model validations
Book.import columns, values, validate: false

# Import with model validations
Book.import columns, values, validate: true

# when not specified :validate defaults to true
Book.import columns, values
```
# 3. Hashes
Phương thức import có thể nhận một mảng hashes. Các keys sẽ ánh xạ đến tên cột trong CSDL
```
values = [{ title: 'Book1', author: 'George Orwell' }, { title: 'Book2', author: 'Bob Jones'}]

# Importing without model validations
Book.import values, validate: false

# Import with model validations
Book.import values, validate: true

# when not specified :validate defaults to true
Book.import values
```

# 4. Import bằng cách sử dụng hàm băm và tên cột rõ ràng
Phương thức import có thể nhận một mảng tên cột và một mảng các đối tượng băm. Tên cột được sử dụng để xác định các trường dữ liệu nào trong CSDL sẽ được nhập. Ví dụ sau sẽ chỉ nhập sách có trường `title`:
```ruby
books = [
  { title: "Book 1", author: "George Orwell" },
  { title: "Book 2", author: "Bob Jones" }
]
columns = [ :title ]

# without validations
Book.import columns, books, validate: false

# with validations
Book.import columns, books, validate: true

# when not specified :validate defaults to true
Book.import columns, books

# result in table books
# title  | author
#--------|--------
# Book 1 | NULL
# Book 2 | NULL
```
Sử dụng hàm băm sẽ chỉ hoạt động nếu các cột nhất quán trong mọi hàm băm của mảng. Nếu điều này không đúng, một ngoại lệ sẽ được bắn ra. Có hai giải pháp là sử dụng một mảng A để khởi tạo một mảng các đối tượng ActiveRecord rồi chuyển mảng A đó vào import hoặc chia mảng thành nhiều object với các cột nhất quán và import từng object riêng biệt. (Bạn có thể xem các thảo luận trong bài viết [tại đây](https://github.com/zdennis/activerecord-import/issues/507))
```ruby
arr = [
  { bar: 'abc' },
  { baz: 'xyz' },
  { bar: '123', baz: '456' }
]

# An exception will be raised
Foo.import arr

# better
arr.map! { |args| Foo.new(args) }
Foo.import arr

# better
arr.group_by(&:keys).each_value do |v|
 Foo.import v
end
```
# 5. ActiveRecord Models
Phương thức import có thể nhận một mảng các models. Các thuộc tính sẽ được loại bỏ khỏi mỗi model bằng cách xem các cột có sẵn trên mỗi model.
```ruby
books = [
  Book.new(title: "Book 1", author: "George Orwell"),
  Book.new(title: "Book 2", author: "Bob Jones")
]

# without validations
Book.import books, validate: false

# with validations
Book.import books, validate: true

# when not specified :validate defaults to true
Book.import books
```

Phương thức `import` cũng có thể nhận một mảng các tên cột và một mảng các models. Tên cột được sử dụng để xác định trường dữ liệu nào sẽ được nhập. Ví dụ sau sẽ chỉ nhập sách có trường tên sách:
```ruby
books = [
  Book.new(title: "Book 1", author: "George Orwell"),
  Book.new(title: "Book 2", author: "Bob Jones")
]
columns = [ :title ]

# without validations
Book.import columns, books, validate: false

# with validations
Book.import columns, books, validate: true

# when not specified :validate defaults to true
Book.import columns, books

# result in table books
# title  | author
#--------|--------
# Book 1 | NULL
# Book 2 | NULL
```
# 6. Batching
Phương thức `import` có thể sử dụng tùy chọn `batch_size` để kiểm soát số lượng hàng cần chèn cho mỗi câu lệnh INSERT. Mặc định là tổng số bản ghi được chèn vào để có một câu lệnh INSERT duy nhất.
```ruby
books = [
  Book.new(title: "Book 1", author: "George Orwell"),
  Book.new(title: "Book 2", author: "Bob Jones"),
  Book.new(title: "Book 1", author: "John Doe"),
  Book.new(title: "Book 2", author: "Richard Wright")
]
columns = [ :title ]

# 2 INSERT statements for 4 records
Book.import columns, books, batch_size: 2
```
Nếu quá trình `import` của bạn đặc biệt lớn hoặc chậm (có thể do callback) trong khi import hàng loạt, bạn có thể muốn có cách báo cáo lại tiến trình. Điều này được hỗ trợ bằng tùy chọn batch_progress. ví dụ:
```ruby
my_proc = ->(rows_size, num_batches, current_batch_number, batch_duration_in_secs) {
  # Using the arguments provided to the callable, you can
  # send an email, post to a websocket,
  # update slack, alert if import is taking too long, etc.
}

Book.import columns, books, batch_size: 2, batch_progress: my_proc
```
# 7. Recursive - Đệ quy
> LƯU Ý: Recursive chỉ hoạt động với các đối tượng PostgreSQL và ActiveRecord. Recursive sẽ không hoạt động với hàm băm hoặc mảng làm đầu vào đệ quy.

(Recursive làm mình liên tưởng tới nested attributes trong ActiveRecord vậy :laughing:)

Giả sử rằng Books `has_many` Reviews:
```ruby
books = []
10.times do |i|
  book = Book.new(name: "book #{i}")
  book.reviews.build(title: "Excellent")
  books << book
end
Book.import books, recursive: true
```
-----------------
Cảm ơn các bạn đã đọc bài, nội dung bài viết mang tính chất giới thiệu và đưa ra các ví dụ, để tìm hiểu kỹ hơn về activerecord-import, bạn có thể xem thêm các nội dung trong tài liệu tham khảo, chúc các bạn có một ngày làm việc hiệu quả :hugs::hugs::hugs:
# Tài liệu tham khảo 
Nguồn bài viết được tham khảo tại: [đây](https://github.com/zdennis/activerecord-import)