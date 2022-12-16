Khi gặp tình huống muốn biết Rails hoạt động ra sao cần phải hiểu biết cách Ruby hoạt động trước.
Ví dụ: Trong đoạn code sau để nhận một giá trị của thuộc tính
``` ruby
# trả về giá trị của some_attribute và foo
def some_attribute_foo
  "#{some_attribute} and foo"
end
```

Với các bạn mới bắt đầu sẽ gặp khó khăn với câu hỏi sau code này ko xét một giá trị cho thuộc tính
``` ruby
# thay đổi giá trị của some_attribute cho foo
def change_some_attribute
  # tại sao dòng tiếp theo không thay đổi giá trị some_attribute cho bằng "foo"?
  some_attribute = "foobar"
  save!
end
```

Điều gì xảy ra ở đây?

Trong phương thức đầu tiên, `some_attribue` rõ ràng là một phương thức gọi để nhận giá trị của bản ghi. Điều này hoạt động trong Rails ActiveRecord do tính năng Ruby của [methdo_missing](http://www.ruby-doc.org/core-2.1.3/BasicObject.html) cho phép một số code chạy khi một phương thức được gọi mà không tồn tại.

Trong phương thức thứ hai, một biến local được gọi `some_attribute` đang được xét. Do vậy không gọi method_missing mà chỉ việc gán một biến.
Nếu như thay đổi như sau
``` ruby
# thay đổi giá trị của some_attribute cho foo
def change_some_attribute
  self.some_attribute = "foo"
  save!
end
```
Trong trường hợp này, phương thức `some_attribute=` trong instance model sẽ được gọi và cho kết quả mong muốn cho việc gán giá tri cho thuộc tính.

### Enums
Với các bạn chưa quen thuộc với enums:
> Enum là một kiểu data đặc biệt cho phép một biến có thể trở thành một tập các hằng số xác định trước. Biến phải bằng một trong các giá trị xác định trước cho nó.

Enums được giới thiệu trong Rail làm một tính năng hữu ích của Ruby. Điều quan trọng là phải hiểu rõ về Ruby để hiểu cách sử dụng enum một cách hiểu quả hơn. Giả sử có một ví dụ đơn giản sau [Rails Enum](http://edgeapi.rubyonrails.org/classes/ActiveRecord/Enum.html).
``` ruby
class Notification < ActiveRecord::Base
  enum status: [:unread, :archived]
end

# notification.update! status: 0
notification.unread!
notification.unread? # => true
notification.status  # => "unread"

# notification.update! status: 1
notification.archived!
notification.archived? # => true
notification.status    # => "archived"

# notification.update! status: 1
notification.status = "archived"

# notification.update! status: nil
notification.status = nil
notification.status.nil? # => true
notification.status      # => nil
```

Điều này xảy ra như thế nào với Ruby meta-programming?
Với tất cả các giá trị của enum khai báo cho `Notification`, Các phương thức được tạo theo các dạng sau và sử dụng model Notification, cột `status` và enum `unread`

| Phương thức | Mô tả |
| -------- | -------- |
| `self.status`|Trả về giá trị enum `string`(không phải `symbol` hoặc `số nguyên` đã định nghĩa trong DB)|
|`self.status=<enum_string_value hoặc integer_value>`|Xét `status` tương ứng giá trị số nguyên enum, cũng có thể sử dụng `string, symbol hoặc integer`. Nếu sử dụng một giá trị không hợp lệ sẽ nhận lỗi `ArgumentError`. `String/Symbol` được biến đổi sang giá trị số nguyên tương ứng.|
|`self.unread!`|Xét enum status sang `unread`. Cú pháp nay gây ra hiểu lầm chút là không thấy gán nhưng nhận `ArgumentError` nếu giá trị enum không hợp lệ.|
|`self.unread?`|Kiểm tra bản ghi có status có phải là unread với giá trị trả về `true/false`. tương tự `self.status = "unread"`|
|`Notification.unread`|Tương tự với câu query `Notification.where(status: "unread"`, chỗ này cũng gây nhầm lẫn sao không thấy colum nào được query|
|`Notification.statuses`|Trả về cặp giá trị key value tương ứng các symbol sang các số thứ tự (`{ "unread" => 0, "archived" => 1 }`) của hash(`HashWithIndifferentAccess`) cho phép truy cập với các symbol hoặc string|

### Các giá trị mặc định cho Enums
Cách implement tốt theo doc của Rails cho rằng sử dụng giá trị mặc định từ cơ sở dữ liệu như sau

``` ruby
create_table :notifications do |t|
  t.column :content, :string
  t.column :status, :integer, default: 0, null: false
end
```
Nhìn vào cụ thể hơn:
- Sử dụng status đầu tiên với khai báo là giá trị mặc định (trả về giá trị 0 từ db)
- Không cho phép xét giá trị `null`

Trong thực tế vẫn có thể được xét giá trị `null` nhưng điều đó sẽ làm cho code trở thành rắc rối hơn chi tiết có thể tham khảo một bài viết về [Null Object Pattern](https://thoughtbot.com/blog/rails-refactoring-example-introduce-null-object) . Null trong cơ sở dữ liệu và kiểm trả nó trong code sẽ rất khó khăn thay vì đó nên có một giá trị mặc định để tránh câu "Tôi không biết" cho nên tạo một giá trị mặc định là đầu tiên với chỉ số 0 và xét nó là giá trị default trong bảng cơ sở dữ liệu.

### Query trên Enums
Một ví dụ khi muốn truy vấn với cột status không phải `achieved`, đa số sẽ nghĩ rằng Rails rất thông minh để giải quyết việc này với câu truy vấn sau
``` ruby
Notification.where "status <> ?", "archived"
SELECT `notifications`.`status` FROM `notifications` WHERE (status <> 'archived')

Notification.where.not status: "archived"
SELECT `notifications`.* FROM `notifications` WHERE `notifications`.`status` != 'archived'
```
Thật ra Rails không đủ thông minh để biến đổi cho việc này mà sử dụng cách sau
``` ruby
Notification.where "status <> ?", Notification.statuses[:archived]
SELECT `notifications`.`status` FROM (status <> 1)

Notification.where.not status: Notification.statuses[:archived]
SELECT `notifications`.* FROM `notifications` WHERE `notifications`.`status` != 1
```

Giá sử trong một tinh huống query với enum không được define và chỉ có duy nhất 1 bản ghi đã tạo. 
``` ruby
 Notification.where status: :read
  Notification Load (0.5ms)  SELECT `notifications`.* FROM `notifications` WHERE `notifications`.`status` = 'read'
=> [#<Notification:0x000055de53c6f7f0
  id: 1,
  content: "Notification",
  status: "unread",
  created_at: Mon, 20 Sep 2021 01:29:07 JST +09:00,
  updated_at: Mon, 20 Sep 2021 01:29:07 JST +09:00,
  contracts_count: 0>]
  
 Notification.count
   (0.9ms)  SELECT COUNT(*) FROM `notifications`
=> 1
```
Cho thấy việc query không raise error hoặc không báo không tồn tại mà lại trả về bản ghi với status defualt.

Tốt nhất việc sử dụng query enum hãy sử dụng `Notification.statuses` và truyền  `status` vào sẽ an toàn và đảm bảo kết quả đúng đắn.

### Rails default accessors cho việc xét thuộc tính
Đôi khi việc tìm hiểu gọi các phương thức Rails "Default Accessor" thay vì gọi trực tiếp vào cơ sở dữ liệu. Điều đó tạo ra sự khác biệt về có thể/ có nên sử dụng các giá trị enum hay không.

| Phương thức| Sử dụng Default Accessor(biến đổi string enums sang integer|
| -------- |-------- |
| `attribute=`|Cho phép|
| `write_attribute=`|Không cho phép|
| `update_attribute=`|Cho phép|
| `attributes=`|Cho phép|
| `update`|Cho phép|
| `update_column`|Không cho phép|
| `update_columns`|Không cho phép|
| `Notification::update`|Cho phép|
| `Notification::update_all	`|Không cho phép|
Để tìm hiểu kỹ hơn hãy tham khảo
- [Nhiều cách khác nhau để xét các thuộc tính trong ActiveRecord](http://www.davidverhasselt.com/set-attributes-in-activerecord/)
- [API chính thức ActiveRecord::Base](http://api.rubyonrails.org/classes/ActiveRecord/Base.html)

Trong khi các tham khảo trên không đề cấp đến Rails enums nhưng nó rất cần thiết để hiểu thêm rằng enums tạo default accessors để map sang và từ string.

``` ruby
notification.status = "archived"
notification.status = 1
puts notification.status # it prints "archived"
```

#### Kết luận
Hy vọng bài viết có thể giúp bạn hiểu hơn về cách làm việc của Ruby, Rails với Enums và một số lưu ý khi sử dụng query enum.