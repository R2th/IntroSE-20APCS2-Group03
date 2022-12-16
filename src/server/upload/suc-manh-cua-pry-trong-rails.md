Hầu hết tất cả dev khi code project chạy bằng Rails đều sử dụng Pry là công cụ debug, cũng có các lệnh debug khác như là byebug nhưng Pry vẫn được sử dụng nhiều hơn cả.

Để cài đặt ta dùng lệnh 
```
gem 'pry-rails', :group => :development
```

Câu nói thần thánh khi tìm lỗi đó là mở code và đặt `binding.pry`. Vậy `binding.pry` là gì?

Đó là lệnh khi trình biên dịch Ruby chạy tới dòng mà có lệnh đấy, thì nó sẽ tạm dừng xử lý và bắt đầu một trạng thái REPL (read-evaluate-print-loop), cho phép chúng ta gõ bất cứ code Ruby nào, sử dụng bất cứ biến nào ở những dòng trước đấy và hiển thị kết quả ngay trên terminal, kể cả bất cứ lệnh ruby hay các câu truy vấn database, thật tuyệt vời, nhờ đó giúp chúng ta dễ dàng debug hơn bao giờ hết.

Nhưng chúng ta đã từng tự hỏi lệnh đấy từ đâu đến không? Khi bật console, ta thấy 
```
$ rails console
pry(main)> binding
=> #<Binding:0x007fee1297a308>
pry(main)> binding.class
=> Binding
```

như vậy, binding là 1 object, thuộc class Binding. Nhưng nó có thật là từ gem Pry không? nếu như bỏ gem pry-rails 
```
$ DISABLE_PRY_RAILS=1 rails console
irb(main)> binding
=> #<Binding:0x007fb29c85c4a0>
```
vậy là object binding không thuộc gem pry-rails, ta sử dụng IRB 
```
$ irb
irb(main)> binding
=> #<Binding:0x007fce81825f30>
```
thật ngạc nhiên khi binding là 1 object thuộc Ruby chứ không phải Rails.

## Một vài tính năng hữu ích của Pry 
Khi vào rails console, ta bắt đầu vào môi trường Pry 

Pry có một vài lệnh rất hữu ích để ta tìm hiểu code, vd như `show-doc`
### show-doc

```
pry(main)> show-doc binding
From: proc.c (C Method):
Owner: Kernel
Visibility: private
Signature: binding()
Number of lines: 10
Returns a Binding object, describing the variable and
method bindings at the point of call. This object can be used when
calling eval to execute the evaluated command in this
environment. See also the description of class Binding.
def get_binding(param)
  return binding
end
b = get_binding("hello")
eval("param", b)   #=> "hello"
```

`show-doc` trả về tài liệu mô tả hàm mà chúng ta truyền vào, rất hữu ích để hiểu rõ công dụng của 1 hàm mới gặp.

Trong vd trên, ta thấy được rằng, binding thực sự là một object dùng để miêu tả một biến và trạng thái của nó tại vị trí gọi hàm.

vậy với `binding.pry` thì sao 

```
pry(main)> show-doc binding.pry
From: (...)/gems/pry-0.10.4/lib/pry/core_extensions.rb @ line 23:
Owner: Object
Visibility: public
Signature: pry(object=?, hash=?)
Number of lines: 18
Start a Pry REPL on self.
If `self` is a Binding then that will be used to evaluate expressions;
otherwise a new binding will be created.
param [Object] object  the object or binding to pry
                        (__deprecated__, use `object.pry`)
param [Hash] hash  the options hash
example With a binding
   binding.pry
example On any object
  "dummy".pry
example With options
  def my_method
    binding.pry :quiet => true
  end
  my_method()
@see Pry.start
```

### ls

ta thấy, Pry chỉ là một hàm để bắt đầu một Pry REPL thông qua đối tượng binding.

Chúng ta có thể Pry mọi object. VD
```
pry(main)> our_string = "some TEXT!"
pry(main)> our_string.pry
pry("some TEXT!")>

pry("some TEXT!")> self
=> "some TEXT!"
pry("some TEXT!")> upcase
=> "SOME TEXT!"
pry("some TEXT!")> lowercase
NameError: undefined local variable or method `lowercase' for "some TEXT!":String
from (pry):32:in `__pry__'
pry("some TEXT!")> ls
(...)
Comparable#methods: <  <=  >  >=  between?
Colorize::InstanceMethods#methods: colorize  colorized?  uncolorize
String#methods:
%  classify    gray     mb_chars  rpartition  to_c
*  clear       grayish  next      rstrip      to_d
+  codepoints  green    next      rstrip!     to_date
ActiveSupport::ToJsonWithActiveSupportEncoder#methods: to_json
self.methods: __pry__  
(...)
pry("some TEXT!")> ls -G case
String#methods: camelcase casecmp downcase downcase! swapcase  swapcase! titlecase upcase upcase!
pry("some TEXT!")> downcase
=> "some text!"
pry("some TEXT!")> exit
=> nil
pry(main)> self
=> main
```

có rất nhiều lệnh hữu ích ở trên, 
khi gọi self , thì sẽ trả về đối tượng chúng ta Pry, gọi hàm upcase thì sẽ viết hoa object string, hàm lowercase thì không tồn tại, ta có thể 

sử dụng `ls` để lấy tất cả  method của 1 object, nó tương tự như hàm `methods`, nhưng ưu điểm ở chỗ là sẽ phân nhóm method theo class và namespace, nhờ vậy ta sẽ hiểu code sâu hơn, biết method này là của class nào.

Sử dụng thêm tham số `-G` để giảm bớt kết quả, lệnh `ls -G case` sẽ trả về tất cả method có chữ case, khi đó sẽ giúp chúng ta nhanh chóng tìm ra đúng tên hàm vì nhiều lúc ta không thể nhớ hết chính xác từng tên hàm được. Lệnh này tương tự khi ta dùng với grep `string.methods | grep case`

1 cách khác để tìm các method đó là sử dụng `find-method`, thay vì phải pry 1 object , rồi chạy lệnh ls, ta có thể lấy ra các method của object đó trực tiếp từ main pry 

```
pry(main)> find-method case our_string
String
String#camelcase
String#titlecase
String#casecmp
String#upcase
String#downcase
String#swapcase
String#upcase!
String#downcase!
String#swapcase!
```

### cd
thay vì sử dụng string.pry, ta dùng `cd`, ưu điểm ở chỗ là `cd` có thể pry vào object theo kiểu lồng nesting 

```
pry(main)> our_hash = { first: [1, 2, 3], second: "text" }
=> { :first => [1, 2, 3], :second => "text" }
pry(main)> cd our_hash
pry(#<Hash>):1> self
=> { :first => [1, 2, 3], :second => "text" }
pry(#<Hash>):1> cd self[:first]
pry(#<Array>):2> self
=> [1, 2, 3]
pry(#<Array>):2> nesting
Nesting status:
--
0. main (Pry top level)
1. #<Hash>
2. #<Array>
pry(#<Array>):2> jump-to 1
pry(#<Hash>):1> self
=> { :first => [1, 2, 3], :second => "text" }
pry(#<Hash>):1> cd self[:first]
pry(#<Array>):2> nesting
Nesting status:
--
0. main (Pry top level)
1. #<Hash>
2. #<Array>
pry(#<Array>):2> cd ..
pry(#<Hash>):1> self
=> { :first => [1, 2, 3], :second => "text" }
pry(#<Hash>):1> nesting
Nesting status:
--
0. main (Pry top level)
1. #<Hash>
pry(#<Hash>):1> cd /
pry(main)>
```

### show-source
đây là 1 lệnh tôi rất thích, vì nhờ đó mà giúp tôi biết 1 hàm này thực hiện như thế nào, chứ ko phải mò mẫm chạy thử, hay phải lên mạng search cách sử dụng 

```
pry(main)> show-source Array
From: (...)/lib/active_support/core_ext/array/access.rb @ line 1:
Class name: Array
Number of monkeypatches: 13. Use the `-a` option to display all available monkeypatches
Number of lines: 64
class Array
  # Returns the tail of the array from +position+.
(...)
pry(main)> show-source Array#second
From: (...)/lib/active_support/core_ext/array/access.rb @ line 33:
Owner: Array
Visibility: public
Number of lines: 3
def second
  self[1]
end
```

với tham số `-a`, thì sẽ hiển thị tất cả các monkeypatches mà object có, giúp chúng ta sử dụng method cẩn thận hơn.

### play

khi chúng ta debug trong controller, model hay object, nếu gặp phải 1 đoạn code nhiều dòng thì sẽ mất công phải copy từng dòng để check, thay vào đó ta có thể sử dung `play`

```
From: (...)/application_controller.rb @ line 7 ApplicationController#controller_method:
5: def controller_method
    6:   binding.pry
 => 7:   puts "lots of code with"
    8:   puts "nestings and loops..."
    9: end
pry(#<ApplicationController>)> play -l 7..8
lots of code with
nestings and loops...
```

nhờ vậy ta có thể chạy nhiều dòng một cách tuần tự.

### show-model
Đó là 1 lệnh cực kỳ hữu ích khi ta muốn kiểm tra các attribute của 1 model, thay vì phải vào tìm trong file schema hoặc trong file model(trong trường hợp dùng gem để build các attribute vào trong file model)

```
pry(main)> show-model User
User
  id: integer
  birthday: datetime
  address_name: string
  created_at: datetime
  updated_at: datetime
  device_id: integer
  province_id: integer
  total_completed_order: integer
  belongs_to :device
  belongs_to :province
  has_many :devices
  has_many :orders
  has_many :received_notifications (class_name :Notification, foreign_key :targetable_id)
```
vâng, kết quả trả về là toàn bộ attribute và các relation của model đó, rất dễ kiểm tra.

ngoài ra , nếu sử dụng thêm option `-G`

```
pry(main)> show-models -G name
User
  id: integer
  content: text
  author_name: string  # This will be highlighted due to the "name" grep
  belongs_to: author

Province:
  id: integer
  name: string # This will be highlighted due to the "name" grep
```
sẽ trả ra tất cả các model có attribute chứa keyword chúng ta cần tìm.

### show-routes
thay vì phải ra terminal, chạy lệnh `rake routes | grep path` đợi khá lâu để lấy path vì nó phải load toàn bộ code thì ta có thể dùng trong console 

```
pry(main)> show-routes -G login
  login GET    /login(.:format)       sessions#index
```

rất nhanh gọn.

Trên đây là một vài công cụ hữu ích mà pry cung cấp, với những công cụ này, việc đọc code sẽ trở nên dễ dàng hơn bao giờ hết.