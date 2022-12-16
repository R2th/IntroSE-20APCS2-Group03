![](https://images.viblo.asia/a0cee558-ba59-49c6-a7fb-817814e5efb9.jpeg)

Trước khi release một dự án Ruby on Rails lên production, các developers thường xuyên phải import một lượng lớn dữ liệu lên local hoặc staging để test hiệu năng của hệ thống một cách cẩn thận. Cách đơn giản nhất để làm việc này là sử dụng ActiveRecord của Rails. Nhưng cơ chế của ActiveRecord cho việc tạo các bản ghi số lượng lớn vào database là rất chậm, nên sẽ phải mất hàng giờ đồng hồ cho việc import số lượng lớn dữ liệu đó. Chính vì thế mà bài viết này sẽ giới thiệu cho bạn một công cụ vô cùng nhanh chóng để import đống dữ liệu cồng kềnh đó. Công cụ đó chính là [activerecord-import](https://github.com/zdennis/activerecord-import).


### Một ví dụ đơn giản

Hãy thử import 100,000 books với schema như dưới đây:

```Rails
create_table :books do |t|
  t.column :name, :string, null: false
  t.column :description, :string
end
```

Đây là một giải pháp đơn giản sử dụng ActiveRecord:

```Ruby
class Book < ActiveRecord::Base
end
```

> Giả sử `convert_csv_to_book_attributes` là một phương thức convert CSV thành một mảng chứa các thuộc tính của Book model.

```Ruby
convert_csv_to_book_attributes.each do |attrs|
    Book.create!(attrs)
end
```
Đoạn code vô cùng đơn giản, nhưng nó mất tới tận ~115 giây để thực hiện xong việc import vào database. Đó là một khoảng thời gian quá quá dài.

### Tại sao ActiveRecord lại chậm

Mỗi khi bạn `create` một bản ghi với `ActiveRecord`, một câu lệnh truy vấn `INSERT` được tạo ra và gửi tới database. 

Điều đó có nghĩa là chúng ta đã gửi 100,000 câu lệnh truy vấn riêng biệt tới database và database sẽ phải phân tích 100,000 câu lệnh một cách riêng biệt, mở và đóng bảng `books` 100,000 lần để ghi dữ liệu, thêm/cập nhật index 100,000 lần. Đó là rất nhiều thứ mà database sẽ phải làm và phải tốn mất rất nhiều thời gian để thực hiện điều đó.  

Hãy thực hiện một chút thay đổi để tăng tốc độ này lên

### Cài đặt

Bạn có thể cài đặt `activerecord-import` với RubyGems:
```Ruby
gem install activerecord-import
```

hoặc thêm vào Gemfile như sau:

```Ruby
gem 'activerecord-import'
```

### Tăng tốc độ bằng cách import model với validations

Thay vì sử dụng `create!`, hãy xây dựng các instance của `Book` trong memory và pass chúng vào method `Book.import` của thư viện `activerecord-import`:

``` Ruby
books = convert_csv_to_book_attributes.map do |attrs|
    Book.new(attrs)
end

Book.import books
```
Chỉ cần tốn ~5 giây để thực hiện điều này. Wow - chúng ta đã tăng tốc độ của nó lên 19 lần liền.

Theo mặc định, phương thức `import` sẽ tiếp tục thực thi validations và nó sẽ tìm ra cách để sắp xếp tất cả các Book instances thành một câu lệnh SQL hiệu quả nhất.

### Tăng tốc độ bằng cách import model mà không validations

Mỗi khi chuẩn bị một lượng lớn dữ liệu mà đã được nhào nặn trước đó, có thể tin tưởng nó là hợp lệ, chúng ta có thể không cần chạy ActiveRecord validations trong khi import dữ liệu.

Để có được hiệu suất tăng thêm, chúng ta có thể turn off validations trong khi xử lý import: 

```Ruby
books = convert_csv_to_book_attributes.map do |attrs|
  Book.new(attrs)
end

Book.import books, validate: false
```

Nó chỉ tốn ~4.6 giây để thực hiện việc import 100,000 books, tăng tốc độ gấp 21 lần.

Ở đây, chúng ta set `validate: false` để nói rằng `Book.import` bỏ qua validations. `validate` option cũng chấp nhận giá trị `true` để thực thi validations, tuy nhiên nó là giá trị mặc định rồi nên chúng ta có thể bỏ qua nó khi muốn giữ validations.

### Tăng tốc độ bằng cách import các cột và các giá trị với validations

Đôi khi chúng ta đã có các dữ liệu trong một mảng chứa các giá trị và tất cả những gì chúng ta cần phải làm là match các cột chúng ta cần import vào. Nếu bạn muốn bỏ qua việc build các Book instances trong memory, bạn có thể pass một mảng các cột và một mảng các giá trị vào phương thức import như sau:

```Ruby
columns = [:name, :description]

# Ví dụ [ ['Book #1', 'Good book'], ['Book #2', 'Great Book'], ...]
array_of_book_attrs = convert_csv_to_book_attributes

Book.import columns, array_of_book_attrs, validate: true
```
Mất khoảng ~7.5 giây để thực hiện xong việc import. Nó cũng là một sự cải thiện lớn so với thời gian ban đầu là 97 giây.

### Tăng tốc độ bằng các import các cột và các giá trị mà không validations

Khi chúng ta không cần xây dựng các Book instances trong memory hoặc là chạy validations, chúng ta có thể làm như sau để đạt được điều đó:

```Ruby
columns = [:name, :description]

# Ví dụ [ ['Book #1', 'Good book'], ['Book #2', 'Great Book'], ...]
array_of_book_attrs = convert_csv_to_book_attributes

Book.import columns, array_of_book_attrs, validate: false
```

Chỉ mất ~2,5 giây để thực hiện xong việc import. Wow, đây là một sự cải tiến đạt hiệu quả cao nhất - tăng tốc độ lên tới 38 lần.

### Benchmarking

Các ví dụ ở trên là những cách đơn giản nhất để cải thiện việc import hàng loạt dữ liệu với `activerecord-import`. Hãy sử dụng schema như ở trên và cùng xem hiệu suất import dữ liệu của chúng trên các database MySQL, PostgreSQL và SQLite3:

**Kết quả trên MySQL, sử dụng ActiveRecord 5.2 (giây)**

| # of records | ActiveRecord#create| import(models) w/validations |import(models) w/o validations| import(cols, vals) w/validations| import(cols, vals) w/o validations|
| -------- | -------- | -------- | -------- | -------- | -------- |
|   10   |  0.023    |0.001      | 0.001| 0.002|0.001 |
|   100   |    0.126  | 0.005     |0.005 |0.0085 | 0.0039|
|   1,000   |  0.89    |    0.046  |0.04 | 0.078|0.022 |
|   10,000  |    10.055  |    0.605  |0.489 |0.89 |0.267 |
|   100,000  |    100.022  |   5.36   |5.08 |7.68 |2.72 |

<br>

**Kết quả trên SQLite3, sử dụng ActiveRecord 5.2 (giây)**

| # of records | ActiveRecord#create| import(models) w/validations |import(models) w/o validations| import(cols, vals) w/validations| import(cols, vals) w/o validations|
| -------- | -------- | -------- | -------- | -------- | -------- |
|   10   |    0.026  |0.002      |0.002 | 0.002| 0.001|
|   100   |  0.182    |0.01      |0.009 |0.019 |0.003 |
|   1,000   |   1.867   | 0.058     |0.049 |0.076 |0.029 |
|   10,000  |    17.03  |0.81      | 0.61| 0.83|0.31 |
|   100,000  |    169.72  | 7.80     | 6.97| 7.95| 2.68|

<br>

**Kết quả trên PostgreSQL, sử dụng ActiveRecord 5.2 (giây)**

| # of records | ActiveRecord#create| import(models) w/validations |import(models) w/o validations| import(cols, vals) w/validations| import(cols, vals) w/o validations|
| -------- | -------- | -------- | -------- | -------- | -------- |
|   10   |  0.038    |0.002      |0.001 |0.002 |0.001 |
|   100   |    0.122  |0.016      |0.01 |0.016|0.004|
|   1,000   |    1.213  |  0.071    |0.069 | 0.077| 0.04|
|   10,000  |    11.22  | 0.768     | 0.612|0.798 |0.25 |
|   100,000  |    106.23  | 7.29     |6.7 |7.52 |2.7 |

### Tổng kết
Chỉ với một vài dòng codes, chúng ta có thể thấy rằng `activerecord-import` có thể tăng tốc độ import một lượng dữ liệu lớn lên tới 13 - 40 lần. Activerecord-import là một người bạn rất tốt và hữu ích đối với mỗi developer. 

Vậy, còn chần chờ gì nữa mà không cài thử `activerecord-import` và thử nghiệm tốc độ nhanh chóng của nó!


### Tài liệu tham khảo
1. https://github.com/zdennis/activerecord-import
2. https://www.mutuallyhuman.com/blog/2016/06/28/importing-data-quickly-in-ruby-on-rails-applications