Trong các dự án lớn thì chúng ta thường xuyên phải làm việc với dữ liệu lớn, trong đó việc import dữ liệu vào project ở local hay trên staging để test **performance** trước khi release và việc làm thường xuyên. Trong Rails đã hỗ trợ việc này bằng cách sử dụng ActiveRecord, nhưng khi dùng ActiveRecord thì lại có nhược điểm đó là sẽ rất chậm đối với dữ liệu lớn. Vì vậy để khắc phục nhược điểm trên, chúng ta có thể dùng gem [activerecord-import](https://github.com/zdennis/activerecord-import) để xử lý

# Ví dụ

Chúng ta sẽ thử import 100,000 books vào bảng Book:

```code
create_table :books do |t|
  t.column :name, :string, null: false
  t.column :description, :string
end
```

Đây là một giải pháp đơn giản sử dụng ActiveRecord:

```
class Book < ActiveRecord::Base
end
```

```
Giả sử chúng ta có 1 mảng book_attributes là các thuộc tính của Book model
vd: book_attributes = [{name: 'Book 1', description: 'Description 1'}, {name: 'Book 2', description: 'Description 2'}, ...]
```

Để import thì chúng ta thường dùng theo cách này

```
book_attributes.each do |attrs|
    Book.create!(attrs)
end
```

Nhưng với đoạn code như trên thì có thể mất tới ~97 giây để có thể import vào databas, nên rất mất thời gian.

# Tại sao ActiveRecord lại chậm
Mỗi khi bạn create một bản ghi với ActiveRecord, một câu lệnh truy vấn INSERT được tạo ra và gửi tới database.

Điều đó có nghĩa là chúng ta đã gửi 100,000 câu lệnh truy vấn riêng biệt tới database và database sẽ phải phân tích 100,000 câu lệnh một cách riêng biệt, mở và đóng bảng books 100,000 lần để ghi dữ liệu, thêm/cập nhật index 100,000 lần. Đó là rất nhiều thứ mà database sẽ phải làm và phải tốn mất rất nhiều thời gian để thực hiện điều đó.

Vì vậy chúng ta sẽ thay đổi một chút để có thể cải thiện tốc độ này

Trước tiên chúng ta sẽ thêm gem 'activerecord-import' vào trong Gemfile:

```
gem 'activerecord-import'
```

# Sử dụng phương thức import trong gem

Thay vì sử dụng create!, hãy xây dựng các instance của Book trong memory và pass chúng vào method Book.import của thư viện activerecord-import:

```
books = []
book_attributes.each do |attrs|
    Book.new(attrs)
end

Book.import books
```

Chỉ cần tốn ~5 giây để thực hiện điều này. Như vậy chúng ta đã có thể tăng tốc độ của nó lên 19 lần liền.

Theo mặc định, phương thức import sẽ tiếp tục thực thi validations và nó sẽ tìm ra cách để sắp xếp tất cả các Book instances thành một câu lệnh SQL hiệu quả nhất.

# Thay each bằng find_in_batches

```
books = []
book_attributes.find_in_batches do |attrs|
    Book.new(attrs)
end

Book.import books
```

Khi dùng với find_in_batches thì chúng sẽ lấy ra các records theo từng batch và được đưa vào trong block dưới dạng một mảng các record thay vì đưa lần lượt từng record vào. Điều đó cho thấy việc sửa dụng find_in_batches có lẽ là hiệu quả nhất trong việc thao tác với một số lượng lớn các bản ghi.

Trong bài viết tiếp theo thì mình sẽ so sánh về **each**, **find_each** và **find_in_batches**

# Bỏ qua validate

Mỗi khi chuẩn bị một lượng lớn dữ liệu mà đã được nhào nặn trước đó, có thể tin tưởng nó là hợp lệ, chúng ta có thể không cần chạy ActiveRecord validations trong khi import dữ liệu.

Để có được hiệu suất tăng thêm, chúng ta có thể turn off validations trong khi xử lý import:

```
books = []
book_attributes.find_in_batches do |attrs|
    Book.new(attrs)
end

Book.import books, validate: false
```

Trên đây là một số cách đơn giản để có thể import dữ liệu lớn vào databases một cách tối ưu nhất.  Hy vọng bài viết sẽ giúp ích cho các bạn!

# Tham khảo

https://www.mutuallyhuman.com/blog/importing-data-quickly-in-ruby-on-rails-applications/

https://apidock.com/rails/ActiveRecord/Batches/find_in_batches