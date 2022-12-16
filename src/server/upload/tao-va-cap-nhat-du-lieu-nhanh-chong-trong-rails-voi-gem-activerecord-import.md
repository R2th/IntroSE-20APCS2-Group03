# Giới thiệu
* Các khuôn khổ ứng dụng thường cung cấp các dịch vụ riêng để tương tác với cơ sở dữ liệu. Điều này hoạt động hiệu quả khi xử lý dữ liệu mỗi người một cách, nhưng đối với các lô dữ liệu lớn thì sao?
* Chắc hẳn chúng ta đã thường xuyên gặp vấn đề này khi có rất nhiều dữ liệu mà ta cần để tích hợp thường xuyên vào một ứng dụng cục bộ, nhưng cơ chế thông thường của ActiveRecord để tạo bản ghi quá chậm. Do đó hôm nay tôi xin giới thiệu thư viện "activerecord-import" để chèn hay cập nhật hàng loạt dữ liệu một cách nhanh chóng. Một trong những tính năng chính của nó là tuân theo các liên kết bản ghi hoạt động và tạo ra số lượng tối thiểu các câu lệnh chèn SQL được yêu cầu, tránh vấn đề chèn N + 1.
* Một ví dụ đơn giản nếu bạn muốn tạo 10 nhà xuất bản sách, mỗi nhà xuất bản với 100 cuốn sách, và 3 bài đánh giá cho mỗi cuốn sách. Ta chỉ cần khởi tạo ba mảng giá trị riêng cho ba bảng tương ứng và thư viện này sẽ theo dõi các liên kết và chỉ tạo ra 3 câu lệnh chèn SQL - một cho nhà xuất bản, một cho sách và một cho các bài đánh giá. Ngược lại ActiveRecord thông thường sẽ tạo ra 10 câu lệnh chèn cho các nhà xuất bản, sau đó nó sẽ truy cập từng nhà xuất bản và lưu tất cả các sách: 10 * 100 = 1000 câu lệnh chèn SQL và sau đó đánh giá: 10 * 100 * 3 = 3000 câu lệnh insert. Một con số khập khiễng khi so sánh, do đó việc sử dụng thư viện "activerecord-import" sẽ khiến hiệu suất giảm đi đáng kể. 
* Khi thư viện này được đóng gói trong gem, nó cung cấp các tính năng:
    * Làm việc với các cột và mảng giá trị thô (chạy nhanh nhất)
    * Làm việc với các đối tượng (nhanh hơn)
    * Thực hiện xác thực (nhanh)
    * Thực hiện trên các bản cập nhật khóa trùng lặp (chạy với MySQL, SQLite 3.24.0+ hoặc Postgres 9.5+)
# Thực hiện
* Thêm gem "activerecord-import" vào Gemfile, chạy lệnh bundle và thay vì tạo thủ công:
```
10.times do |i|
  Book.create! name: "book #{i}"
end
```

ta sẽ tạo 10 bản ghi sách nhanh hơn nhiều với chỉ một câu lệnh chèn:
```
books = []
10.times do |i|
  books << Book.new(name: "book #{i}")
end
Book.import books
```
## Làm việc với cột và mảng
* Câu lệnh import có thể lấy một mảng tên các cột (string hoặc symbols) và một mảng các bản ghi. Mỗi mảng con đại diện cho một bản ghi riêng lẻ và danh sách các giá trị của nó theo cùng thứ tự với các cột. Đây là cơ chế nhập nhanh nhất và cũng là cơ bản nhất.
```
columns = [ :title, :author ]
values = [ ['Book1', 'George Orwell'], ['Book2', 'Bob Jones'] ]

# Import mà không chạy validate model
Book.import columns, values, validate: false

# Import chạy validate model
Book.import columns, values, validate: true

# Khi không chỉ định thì mặc định validate model là true
Book.import columns, values
```

## Làm việc với mảng các hashes
* Phương thức import có thể lấy một mảng các hashes. Mỗi một hash bao gồm các cặp key-value đại diện cho tên cột và giá trị tương ứng của một bảng trong database. Cách này hoạt động chậm hơn cách đầu tuy nhiên được sử dụng phổ biến nhất vì chúng ta thường có xu hướng tạo object_params là một hash rồi append vào mảng để import thay vì tạo hai mảng cột và giá trị riêng biệt:
```
values = [{ title: 'Book1', author: 'George Orwell' }, { title: 'Book2', author: 'Bob Jones'}]

# Import mà không chạy validate model
Book.import values, validate: false

# Import chạy validate model
Book.import values, validate: true

# Khi không chỉ định thì mặc định validate model là true
Book.import values
```

## Làm việc với mảng các hashes và mảng các cột cụ thể
* Khi chúng ta chỉ muốn tạo bản ghi với một số cột cụ thể, phương thức import có thể nhận một mảng các hashes và một mảng tên các cột muốn tạo. Ví dụ dưới chỉ tạo các cuốn sách với cột title:
```
books = [
  { title: "Book 1", author: "George Orwell" },
  { title: "Book 2", author: "Bob Jones" }
]
columns = [ :title ]

# không chạy validate
Book.import columns, books, validate: false

# có chạy validate
Book.import columns, books, validate: true

# chạy validate khi không chỉ định
Book.import columns, books

# kết quả là các cuốn sách chỉ có giá trị trường title
# title  | author
#--------|--------
# Book 1 | NULL
# Book 2 | NULL
```

Sử dụng  hashes sẽ chỉ hoạt động nếu các cột nhất quán trong mọi hash của mảng. Nếu điều này không đúng, một ngoại lệ ***ArgumentError: Hash key mismatch*** sẽ được đưa ra. Có hai cách giải quyết: sử dụng mảng để khởi tạo một mảng các đối tượng ActiveRecord rồi import mảng đó vào hoặc chia mảng thành nhiều đối tượng với các cột nhất quán và nhập từng đối tượng riêng biệt:
```
arr = [
  { bar: 'abc' },
  { baz: 'xyz' },
  { bar: '123', baz: '456' }
]

# Ngoại lệ ArgumentError: Hash key mismatch
Foo.import arr

# Khởi tạo một mảng các đối tượng mới rồi import một loạt
arr.map! { |args| Foo.new(args) }
Foo.import arr

# Nhóm các đối tượng chung keys rồi import
arr.group_by(&:keys).each_value do |v|
 Foo.import v
end
```

## Làm việc với ActiveRecord Models
* Phương thức import có thể nhận một mảng các đối tượng được khởi tạo và được lưu vào mà không cần mảng tên các cột bởi vì các đối tượng đã được khai báo với các attributes sẵn có:
```
books = [
  Book.new(title: "Book 1", author: "George Orwell"),
  Book.new(title: "Book 2", author: "Bob Jones")
]

# không chạy validate 
Book.import books, validate: false

# chạy validate model
Book.import books, validate: true || Book.import books
```

Tương tự, nếu chúng ta muốn tạo các bản ghi với các cột cụ thể thì cần khai báo mảng tên cột cụ thể rồi  truyền cho phương thức import này:
```
books = [
  Book.new(title: "Book 1", author: "George Orwell"),
  Book.new(title: "Book 2", author: "Bob Jones")
]
columns = [ :title ]

# không chạy validate 
Book.import columns, books, validate: false

# chạy validate 
Book.import columns, books, validate: true || Book.import columns, books

# kết quả
# title  | author
#--------|--------
# Book 1 | NULL
# Book 2 | NULL
```

## Làm việc với Batch
* Phương thức import có thể nhận tùy chọn **batch_size** để kiểm soát số lượng bản ghi bạn muốn import cho một câu lệnh SQL. Mặc định ta chèn toàn bộ các bản ghi trong một lần, thêm tùy chọn này có thể tránh trường hợp quá tải cho một lần chèn quá nhiều bản ghi:
```
books = [
  Book.new(title: "Book 1", author: "George Orwell"),
  Book.new(title: "Book 2", author: "Bob Jones"),
  Book.new(title: "Book 1", author: "John Doe"),
  Book.new(title: "Book 2", author: "Richard Wright")
]
columns = [ :title ]

# 2 câu lệnh INSERT for 4 bản ghi
Book.import columns, books, batch_size: 2
```

## Làm việc với Recursive (chỉ với PostgreSQL và ActiveRecord Model)
* Phương thức import chỉ nhận mảng các đối tượng (bao gồm đối tượng cha đã khởi tạo thêm đối tượng con), chứ không nhận mảng các hashes. Giả sử bảng **Books** *hasmany* **Reviews**:
```
books = []
10.times do |i|
  book = Book.new(name: "book #{i}")
  book.reviews.build(title: "Excellent")
  books << book
end
Book.import books, recursive: true
```

## Một số tùy chọn


| Khóa | Tùy chọn  | Mặc định | Mô tả |
| -------- | -------- | -------- | -------- |
| :validate | true/false     | true |có validate model hay không khi import. Luôn chạy khi sử dụng import! |
| :on_duplicate_key_ignore | true/false | false |cho phép bỏ qua import bản ghi với khóa trùng lặp |
| :on_duplicate_key_update | :all, Array, Hash | N/A |update bản ghi với các fields được chỉ định cụ thể |
| :timestamps | true/false | true|cho phép/ không cho phép ghi lại thời gian import |
| :recursive | true/false | false|chèn các bản ghi có liên kết với nhau (has_many/has_one associations) |
| :batch_size | Integer | số bản ghi|số bản ghi tối đa cho một câu lệnh insert|
| :all_or_none | true/false | false|sẽ không import bất kỳ bản ghi nào nếu có một bản ghi validate lỗi|

## Duplicate Key Ignore
* **MySQL** , **SQLite** và **PostgreSQL (9.5+)** hỗ trợ *on_duplicate_key_ignore* cho phép bạn bỏ qua các bản ghi nếu giới hạn khóa chính hoặc duy nhất bị vi phạm. Đối với **Postgres 9.5+**, nó bổ sung **ON CONFLICT DO NOTHING**, đối với **MySQL**, nó sử dụng **INSERT IGNORE** và **SQLite** nó sử dụng **INSERT OR IGNORE**. Tùy chọn này không thể được kích hoạt khi nhập đệ quy. Đối với bộ điều hợp cơ sở dữ liệu thường hỗ trợ đặt khóa chính trên các đối tượng đã nhập, tùy chọn này ngăn điều đó xảy ra:
```
book = Book.create! title: "Book1", author: "George Orwell"
book.title = "Updated Book Title"
book.author = "Bob Barker"

Book.import [book], on_duplicate_key_ignore: true

book.reload.title  # => "Book1" (không thay đổi)
book.reload.author # => "George Orwell" (không thay đổi)
```

## Duplicate Key Update
* **MySQL**, **PostgreSQL (9.5+)** và **SQLite (3.24.0+)** hỗ trợ *on_duplicate_key_update* cho phép bạn chỉ định các trường có giá trị cần được cập nhật nếu giới hạn khóa chính hoặc duy nhất bị vi phạm. Một sự khác biệt lớn giữa hỗ trợ MySQL và PostgreSQL là MySQL sẽ xử lý bất kỳ xung đột nào xảy ra, nhưng PostgreSQL yêu cầu bạn chỉ định cột nào xung đột sẽ xảy ra. SQLite mô hình hóa hỗ trợ nâng cấp của nó sau PostgreSQL. MySQL sử dụng **ON DUPLICATE KEY UPDATE** còn Postgres/SQLite sử dụng **ON CONFLICT DO UPDATE** để update. Tôi sẽ lấy ví dụ về cách update cơ bản:
```
book = Book.create! title: "Book1", author: "George Orwell"
book.title = "Updated Book Title"
book.author = "Bob Barker"

# MySQL version
Book.import [book], on_duplicate_key_update: [:title]

# PostgreSQL version
Book.import [book], on_duplicate_key_update: {conflict_target: [:id], columns: [:title]}

# Khi conflict_target là khóa chính thì không cần chỉ định
Book.import [book], on_duplicate_key_update: [:title]

book.reload.title  # => "Updated Book Title"
book.reload.author # => "George Orwell"
```

## Thông tin trả về
* Phương thức import trả về kết quả là một đối tượng đại diện cho **failed_instances**, **num_inserts**. Đối với PostgreSQL, sẽ có thêm hai kết quả là **ids** và **results**. Giả sử bảng **Article** tôi validate **title** là bắt buộc:
```
articles = [
  Article.new(author_id: 1, title: 'First Article', content: 'This is the first article'),
  Article.new(author_id: 2, title: 'Second Article', content: ''),
  Article.new(author_id: 3, content: '')
]

demo = Article.import(articles, returning: :title) # => #<struct ActiveRecord::Import::Result

demo.failed_instances
=> [#<Article id: 3, author_id: 3, title: nil, content: "", created_at: nil, updated_at: nil>]

demo.num_inserts
=> 1

demo.ids
=> ["1", "2"] # chỉ với PostgreSQL
=> [] # các DBs khác

demo.results
=> ["First Article", "Second Article"] # với PostgreSQL
=> [] # các DBs khác
```

## Counter cache
* Khi chạy import, activerecord-import không tự động cập nhật bộ đệm cache của các cột. Để cập nhật các cột này, bạn cần thực hiện một trong các thao tác sau:
    * Cung cấp giá trị cho cột dưới dạng đối số trên đối tượng của bạn được truyền vào.
    * Cập nhật cột theo cách thủ công sau khi bản ghi đã được nhập.
## ActiveRecord Timestamps
* Nếu bạn đã quen với ActiveRecord thì có lẽ bạn đã quen với các cột dấu thời gian của nó: created_at, created_on, updated_at, updated_on,... Khi nhập dữ liệu, các trường **timestamp** sẽ tiếp tục hoạt động như mong đợi và mỗi cột **timestamp** sẽ được đặt.
* Nếu bạn không muốn chỉ định các cột đó, bạn có thể sử dụng tùy chọn timestamps: false.
* Tuy nhiên, cũng có thể thiết lập chỉ **:created_at** trong các bản ghi cụ thể. Trong trường hợp này, mặc dù sử dụng **timestamps: true**, :created_at sẽ chỉ được cập nhật trong các bản ghi có trường đó **nil**. Quy tắc tương tự áp dụng cho các liên kết bản ghi khi bật tùy chọn **recursive: true**.
* Nếu bạn đang sử dụng múi giờ tùy chỉnh, múi giờ này sẽ được cập nhật đúng khi thực hiện nhập cũng như khi ActiveRecord::Base.default_timezone được đặt, điều này hoạt động đối với tất cả các ứng dụng Rails.
## Callbacks
* Các callbacks (không phải before_validation và after_validation) sẽ không được gọi khi sử dụng phương thức import. Điều này là do nó đang nhập hàng loạt các hàng dữ liệu và không nhất thiết phải có quyền truy cập vào các đối tượng ActiveRecord trong bộ nhớ.
* Nếu bạn có một bộ sưu tập các đối tượng ActiveRecord trong bộ nhớ, bạn có thể làm như sau:
```
books.each do |book|
  book.run_callbacks(:save) { false }
  book.run_callbacks(:create) { false }
end
Book.import(books)
```

* Điều này sẽ chạy **before_save** và **before_create** cho mỗi đối tượng. Tham số false để ngăn việc chạy **after_create** và **after_save** trước khi chạy import. Một điều cần lưu ý trong ví dụ này là các lệnh gọi lại **before_create** và **before_save** sẽ chạy trước các lệnh gọi **before_validation** và **after_validation**.
* Nếu đó là một vấn đề, một cách tiếp cận khác có thể thực hiện là lặp lại các đối tượng của bạn trước để thực hiện validate và sau đó chỉ chạy callbacks và nhập các bản ghi hợp lệ:
```
valid_books = []
invalid_books = []

books.each do |book|
  if book.valid?
    valid_books << book
  else
    invalid_books << book
  end
end

valid_books.each do |book|
  book.run_callbacks(:save) { false }
  book.run_callbacks(:create) { false }
end

Book.import valid_books, validate: false
```

* Thứ tự chạy sẽ là valid => before_validation => validate => after_validation => before_save => before_create => create

## Tổng kết
* Chỉ với một vài ví dụ, chúng ta đã thấy cách **activerecord-import** có thể tăng tốc độ nhập và cập nhật khối lượng dữ liệu lớn nhanh hơn rất nhiều lần so với cơ chế thông thường của ActiveRecord. Bạn nên dành thời gian xây dựng ứng dụng và cung cấp cho người dùng dữ liệu mới - chứ không phải đợi dữ liệu nhập. Tuy nhiên hãy lưu ý các trường hợp gọi **after callbacks**, và các lỗi **duplicate key** khi create và update dữ liệu, vì đó là các lỗi phổ biến thường xảy ra khi sử dụng thư viện này. Chúc các bạn thành công. 
* Nguồn tham khảo: [https://github.com/zdennis/activerecord-import ](https://github.com/zdennis/activerecord-import ) của tác giả **Zach Dennis**