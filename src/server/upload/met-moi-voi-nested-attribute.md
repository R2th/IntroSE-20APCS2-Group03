Nay mình vừa phải ngồi 3 tiếng fix 1 lỗi do nested attribute. Thực sự đây là 1 tính năng khá tiện, bạn có thể update các child model mà không phải ngồi viết từng thứ một, không cần lo chuyện add thêm, thay đổi hay xóa đi. Nếu bạn muôn viết tay thay nested attribute thì thực sự sẽ rất nhiều bug và mệt. Nhưng mà dùng nó thì cũng bực mình không kém khi mà bạn thậm chí chả hiểu sao nó không chạy mà code vẫn chạy không báo lỗi. Sau đây là vài kinh nghiệm mình gặp phải. Bài viết hợp với người đang đau đầu với nested attribute chứ không phải người mới chỉ code thử cái tutorial của nó.  
# 0. Giải định
Để đỡ phải viết phần ví dụ dài mình giải định có 2 class như sau:
```ruby
  class Parent < ApplicationRecord
    has_many :childs
    accepts_nested_attributes_for :childs, allow_destroy: true
  end
```
```ruby
  class Child < ApplicationRecord
    belongs_to :parent
  end
```
Nếu các case sau có gì đặc biệt mình sẽ chỉ viết phần thay đổi.

# 1. fields_for

Khi tạo view cho nested attributes, form đơn giản sẽ như sau: 
```ruby
  <%= form_for @parent do |f| %>
    <%= f.fields_for :childs do |child| %>
      <%= child.text_field :name %>
    <% end %>
  <% end %>
```
Ừ thì đúng các tutorial viết đơn giản như vậy, thế có vấn đề gì ở đây. Nếu hiểu rõ 1 chút `f.fields_for` khá giống với `render partial`, nghĩa là nó sẽ render `@parent.childs.each`. Trong thư viện của rails, định nghĩa method `fileds_for` như sau:
```ruby
def fields_for(record_name, record_object = nil, fields_options = {}, &block)
   ...
end
```
Ở đây khi làm check_box cho 1 quan hệ kiểu many-to-many qua 1 bảng phụ, bạn sẽ phải nghĩ cách để `f.fields_for` không chỉ hiển thị các con của `@parent` mà còn là toàn bộ các option có thể chọn, hoặc cũng có thể là 1 loạt các giá trị cho trước. Biện pháp ở đây là thêm 1 biến query hoặc tạo ra các giá trị có thể nhận này:
```
  <% childs = %w(frist second).map{|element| @parent.childs.new name: element} %>
  <%= form_for @parent, childs do |f| %>
    <%= f.fields_for :childs do |child| %>
      <%= child.text_field :name %>
    <% end %>
  <% end %>
```
Như vậy nested form sẽ có 2 child với `name` là "first" và "second".
> Vấn đề rút ra: Nếu cần thiết thì có thể tạo ra list các `nested` cho `fields_for` trước.

# 2. Custom_id
Nếu bạn đã làm các dự án kiểu khách hàng có 1 hệ thống đang chạy, họ muốn chuyển đổi ngôn ngữ sang ruby và vẫn giữ lại cấu trúc database hiện tại. Vấn đề không có gì cho đến khi bảng của bạn có cái id dởi hơi là `parent_id` và `child_id`. Nhưng mà thế thì liên quan gì đến `nested attribute`?
Có thể bạn sẽ update nested_attribute như thế này:
```ruby
@admin.update(childs_attributes: [{child_id: 1, name: "other name"}])
```
Và nó vẫn chạy nhưng thay vì update child có id 1 thì nó tạo ra 1 bản ghi mới, hoặc tặng bạn cái error id đã tồn tại tùy vào bạn còn tham số nào khác không.  
Khi gặp cái này mình ngồi mất gần hết buổi sáng mò vì thực sự db của khách rất phức tạp sau nhiều năm thêm thêm bớt bớt, và đây cũng là 1 cái bảng trung gian giữa 1 quan hệ many-to-many-to-many bla bla nữa chứ đơn giản như parent và child này.  
Tìm hiểu 1 chút vấn đề này thì code của rails: [https://github.com/rails/rails/blob/master/activerecord/lib/active_record/nested_attributes.rb#L489](https://github.com/rails/rails/blob/master/activerecord/lib/active_record/nested_attributes.rb#L489)  

Bạn có thể thấy là rails chỉ quan tâm đến tham số là `id` từ nested attribute dù nó trong db thật không phải vậy (`child_id`). Vậy để dúng thì câu update kia sẽ như sau:
```ruby
@admin.update(childs_attributes: [{id: 1, name: "other name"}])
```
À có 2 cách viết nested attribute update là:
```ruby
@admin.update(childs_attributes: [{id: 1, name: "other name"}])
```
```ruby
@admin.update(childs_attributes: {"0": {id: 1, name: "other name"}})
```
Cách trên để viết trong code nếu việc update là do mình code còn cách dưới sẽ update qua param truyền từ `fields_for`.
> Vấn đề rút ra: rails chỉ nhận nested attribute id là `id`, nếu có custom_id thì cũng không cần quan tâm.

# 3. _destroy
Nếu đã sử dụng thì chắc bạn cũng thừa biết
```ruby
@admin.update(childs_attributes: [{_destroy: 1, id: 1, name: "other name"}])
```
Sẽ xóa bản ghi child có id là 1.

Nhưng mà bạn có biết nếu model parent như sau:
```ruby
  class Parent < ApplicationRecord
    has_many :childs
    has_many :childs # Đúng Là nó ~~~~
    accepts_nested_attributes_for :childs, allow_destroy: true
  end
```
Thì nó vẫn chạy ok không báo lỗi mà childs vẫn không được xóa. Nghe có vẻ vớ vẩn vì chả ai viết cái `has_many :childs` đến 2 lần cả nhưng nếu có tới 2-30 cái `has_many` thì mắt bạn có tốt đến đâu cũng chả nhìn ra được có 1 cặp bị trùng, và đôi khi nó không phải do bạn thêm vào (you know what I mean?).  
> Vấn đề rút ra: những dòng khá giống nhau lặp lại nhiều lần như `has_many`, `belongs_to`, `enum`, `validates`... nên được viết theo order để không sảy ra trùng lặp.