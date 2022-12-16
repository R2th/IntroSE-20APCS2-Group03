- Bài viết được dịch từ bài [Ruby: class_eval vs module_eva](https://medium.com/rubycademy/ruby-class-eval-vs-module-eval-6c3cc24a070) của tác giả [@farsi_mehdi](https://medium.com/@farsi_mehdi).

-----
![](https://images.viblo.asia/995f1369-2af7-40e1-8873-06e0c3473c6c.jpg)

-----
Thêm methods hoặc attributes vào class/module *một cách nhanh chóng* là một mô hình pattern khá phổ biến trong Ruby (`activerecord`, `activesupport`, `rake`, `rack`, vân vân..).
Để làm như vậy, chúng ta có thể sử dụng các phương thức  `Module#class_eval` và `Module#module_eval`.
Sự khác biệt chính giữa 2 methods này là gì?

## class_eval
Trong Ruby, khi chúng ta muốn thêm một phương thức vào một lớp, chúng ta có thể sử dụng phương thức `Module # class_eval`. Phương thức này chấp nhận `String` hoặc `block` làm đối số.
```ruby
array_second = <<-RUBY
def second
  self[1]
end
RUBY
Array.class_eval(array_second)
String.class_eval do
  def /(delimiter)
    split(delimiter)
  end
end
$> [1,2,3].second
 => 2
$> "1,2,3" / ','
  => ["1", "2", "3"]
```

Lệnh gọi `Array.class_eval(array_second)` thêm phương thức thứ hai vào bất kỳ instance nào của Array bằng cách chuyển một Chuỗi sẽ được đánh giá trong ngữ cảnh của class Array.

Lệnh gọi tới `String.class_eval` với một khối sẽ đánh giá nội dung của khối trong ngữ cảnh của class `String`. Ở đây, nó sẽ thêm một phương thức `String#/(delimiter)` - mà chúng ta có thể sử dụng làm toán tử - cho bất kỳ instance nào của String.
> NB: vui lòng đọc [bài viết này](https://medium.com/@farsi_mehdi/avoid-interpolation-in-heredoc-59a5d907133d)  về [heredocs](https://medium.com/rubycademy/avoid-interpolation-in-heredoc-59a5d907133d) nếu cú pháp `<<-RUBY` không quen thuộc với bạn
## module_eval
Mô-đun `Module#module_eval` tương đương với`Module#class_eval` cho các mô-đun sau:
```ruby
module Commentable
  def add_comment(comment)
    self.comments << comment
  end
  def comments
    @comments ||= []
  end
end
Commentable.module_eval do
  def comment_count
    comments.count
  end
end
class Post
  include Commentable
end
$> post = Post.new
 => #<Post:0x00007fd9ac0238b0> 
$> post.add_comment("Very nice !")
 => ["Very nice !"] 
$> post.comment_count
 => 1
```
## two skins for one core
Chúng ta đã nói rằng `class_eval` được sử dụng để thêm các phương thức và thuộc tính vào một `class` hiện có.
Và `module_eval` được sử dụng để thêm các phương thức và thuộc tính vào một `module` hiện có.
Nhưng đây chỉ là một quy ước ..
Trong thực tế, `class_eval` là một bí danh(alias) cho `module_eval`.
Hãy nhìn một cái đến mã nguồn Ruby để xác nhận điều này.

Trong `ruby/vm_eval.c`
```ruby
rb_define_method(rb_cModule, "module_eval", rb_mod_module_eval, -1);    rb_define_method(rb_cModule, "class_eval",  rb_mod_module_eval, -1);
```
Như chúng ta có thể thấy `module_eval` và `class_eval` chia sẻ cùng một hàm C có tên `rb_mod_module_eval()`.

Vì hàm C này chỉ định bao gồm `module_eval`, chúng ta có thể nói `class_eval` là bí danh của `module_eval`.

![](https://miro.medium.com/max/1636/1*KI8Js9iYMFP68VAI_v0vRw.png)