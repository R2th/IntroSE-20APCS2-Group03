Bài viết tham khảo từ bài phát biểu của @tagamoris (Fluentd maintaine, Treasure Inc) và @joker1007 (CTO Repro) tại Ruby kaigi 2018.

https://www.slideshare.net/tagomoris/hijacking-ruby-syntax-in-ruby

# Binding

Trong ruby core có tồn tại sẵn class Binding. Các object của class Binding đóng gói ngữ cảnh (context) thực thi tại một số vị trí cụ thể trong mã code và giữ lại ngữ cảnh này để sử dụng trong tương lai. Các trạng thái của biến, method, block được giữ lại và có thể truy cập được. Binding object có thể được tạo ra bằng cách sử dụng Kernel#binding. (Xem ra cái này là nguồn gốc của `binding.pry` mà vẫn hãy dùng để debug khi xài gem `pry`).

Binding object có thể được truyền với tư cách là params thứ 2 khi gọi Kernel#eval để chỉ định ngữ cảnh mà params thứ nhất được đem ra tính toán trong phép toán `eval`.

Các method được support trong binding object có thể kể đến là

- #eval
- #local_variable_defined?
- #local_variable_get
- #local_variable_set
- #local_variables
- #receiver

```Ruby
class Demo
  def initialize(n)
    @secret = n
  end
  def get_binding
    binding
  end
end

k1 = Demo.new(99)
b1 = k1.get_binding(10)
k2 = Demo.new(-3)
b2 = k2.get_binding(-1)

b1.local_variable_get(:n) #=> 10
b1.eval("@secret")        #-> 99
b2.local_variable_get(:n) #=> -1
b2.eval("@secret")        #-> -3
```
Trong ví dụ này `b1`, `b2` là các binding object được tạo ra khi call `binding` trong method `get_binding`. Từ binding object chúng ta có thể lấy được gía trị của local_variable `n` cũng như giá trị của biến instance `@secret`

Trick mà tác giả muốn đem ra sử dụng ở đây sẽ tập trung vào method `local_variables` trong binding object.

```Ruby
class Demo
  def binding_proxy(a, b, c)
    pp(here: :before, binding_id: binding.object_id, **dump(binding))
    yield binding
    pp(here:: after, binding_id: binding.object_id, **dump(binding))
  end
end
Demo.new.binding_proxy(10, "b", false) do |x|
  a = x.local_variable.get(:a)
  b = x.local_variable.get(:b)
  c = x.local_variable.get(:c)
  pp(here: :block1, binding_id: x.object_id, **.dump(x))
end
```

```
MBA~ tagomoriss ruby rubykaigi.2018.rb
{:here=>:before, :binding_id=>70179233373500, :a=>10, :b=>"b", :c=>false}
{:here=>:block1, :binding_id=>79179233183949, :a=>10, :b=>"b", :c=>false}
{:here=>:after, :binding_id=>70179241491049, :a=>10, :b=>"b", :c=>false}
MBA:~tagomoris$
```

Theo như kết quả ở đây thì mỗi lần binding ta thu được các giá trị biến môi trường giống nhau nhưng chỉ khác `binding_id`

Chuyện gì sẽ xẩy ra nếu can thiệp `local_variable_set` trong quá trình binding.

```Ruby
class Demo
  def binding_proxy(a, b, c)
    pp(here: :before, binding_id: binding.object_id, **dump(binding))
    yield binding
    pp(here:: after, binding_id: binding.object_id, **dump(binding))
    # d # => NameError
  end
end
Demo.new.binding_proxy(10, "b", false) do |x|
  x.local_variable_set(:d, 10)
  d = x.local_variable.get(:d)
  pp(here: :block1, binding_id: x.object_id, **.dump(x))
end
```

```
MBA~ tagomoris$ ruby rubykaigi.2018.rb
{:here=>:before, :binding_id=>70287664740260, :a=>10, :b=>"b", :c=>false}
{:here=>:block1, :binding id=>70287668531380, :a=>10, :b=>"b", :c=>false}
{:here=>:block1,
 :binding_id=>70287668531380,
 :d=>10,
 :a=>10,
 :b=>"b",
 :c=>false}
{:here=>:after, :binding_id=>78287664116940, :a=>10, :b=>"b", :c=>:false}
MBA:~ tagomoriss
```

Sau khi thêm 1 biến local `d` vào binding object thì biến `d` chỉ có tác dụng cho 1 binding instance duy nhất tại thời điểm biến local đó được set mà không ảnh hưởng tới các binding instance sau. (Có thể thấy tại log check `after` không có biến local `d` được thêm vào)

Tuy nhiên thay vì thêm 1 biến local mới nêú ta set lại giá trị cho 1 biến local cũ thì thế nào ?

```Ruby
class Demo
  def binding_proxy(a, b, c)
    pp(here: :before, binding_id: binding.object_id, **dump(binding))
    yield binding
    pp(here:: after, binding_id: binding.object_id, **dump(binding))
  end
end
Demo.new.binding_proxy(10, "b", false) do |x|
  x.local_variable_set(:d, 10)  
  x.local_variable_set(:a, 20)
  d = x.local_variable.get(:d)
  pp(here: :block1, binding_id: x.object_id, **.dump(x))
end
```

```
MBA: tagomoris$ ruby rubykaigi.2018.rb
{:here=>:before, :binding id->70162686885000, :a=>10, :b=>"b", :c=>false}
{:here=>:block,
 :binding_id=>70162686541660,
 :d=>20,
 :a=>20,
 :c=>false}
{:here->:after, :binding_id->70162698803900, :a=>20, :b=>"b", :c=>false)
MBA:~ tagomoriss
```

Khác với trường hợp thêm biến local như trước, khi set lại biến local cho binding object, giá trị của biến local sẽ bị overwrite !!

Kết luận

Binding#local_variable_set
- giúp thêm biến vào chỉ trong 1 binding instance
- nhưng overwrite giá trị của biến đã tồn tại trong ngữ cảnh gốc (original context)

# Refinement

Với class trong ruby bạn có thể định nghĩa lại các method hay thêm cá method, function tiện ích cho class có sẵn. Việc này gọi là "monkey patch". Tuy nhiên phạm vi thay đổi của nó là global nên tất cả mọi users đều nhìn thấy cùng 1 sự thay đổi. Điều này có thể gây ra 1 số side effect làm hỏng chương trình.

Do đó `refiment` được thiết kế để giảm impact của việc monkey patching của user khác đối với class bị monkey-patch. Nó cung cấp phương thức để có thể extend 1 class 1 cách local.

Ví dụ

```Ruby
class C
  def foo
    puts "C#foo"
  end
end

module M
  refine C do
    def foo
      puts "C#foo in M"
    end
  end
end
```

Đầu tiên class `C` được định nghĩa. Sau đó `refinement` của được tạo ra nhờ `Module#refine`.
`Module#refine` tạo ra 1 anonymous module chứa sự thay đổi hay `refinement` của class.
Chúng ta có thể activate `refinement` này bằng cách gọi như sau

```Ruby
using M
c = C.new
c.foo # prints "C#foo in M"
```

# Hacks: method modifiers

Tác giả `joker1007` đã tạo ra 3 gem dưới đây nhằm phục vụ cho những mục đích riêng biệt
- final (https://github.com/joker1007/finalist): cấm override method
- override (https://github.com/joker1007/overrider): bắt buộc method phải có super method
- abstract (https://github.com/joker1007/abstriker): bắt buộc override method

## Finalist

Khi sử dụng gem này bạn chỉ cần thêm từ khoá final vào trước method được định nghĩa trong class thì các class kế thừa không thể override lại method đó

```Ruby
class A1
  extend Finalist

  final def foo
  end
end

class A2 < A1
  def foo # => raise
  end
end
```

Nếu 1 module chứa từ final method thì các class sử dụng module đó cũng không thể override lại method đó

```Ruby
module F1
  extend finalist

  final def foo
  end
end

class F2
  def foo
  end

  include F1 # => raise
end
```

## Overrider

Gem này lấy ý tưởng của bên Java. Cú pháp override này đảm bảo là phải có super method thì mới cho phép override

```Ruby
class B1
end

class B2 < B1
  extend Overrider

  override def foo
  end
end # => raise false
```

## Abstriker

Gem này cũng lấy ý tưởng từ Java. Các subclass kế thừa thì phải có implement cho abstract method.
Trong trường hợp subclass không implement method đó thì sẽ raise lỗi Abstriker::NotImplementedError

```Ruby
class A1
  def foo
  end
end

class A2 < A1
  extend Overrider

  override def foo
  end
end
```

## Hook methods

Vậy ý tưởng để thực hiện các method modifiers trên là gì ?
Về bản chất tác giả sử dụng các hook methods, `include`, `extend`, + với các công cụ như TracePoint, Ripper

Các method hooks trong Ruby:

- Module#method_added
- Module#method_removed
- Module#method_undefined
- BasicObject#singleton_method_added
- BasicObject#singleton_method_removed
- BasicObject#singleton_method_undefined

Bằng cách sử dụng method hook, tác giả đã có thể implement các khai báo như protected, private
Khi áp dụng method này vào viêc kiểm soát việc thừa kế, nó sẽ tạo ra những magic mà chúng ta không ngờ tới
Trên thực tế implementation của gem `finalist` chẳng hạn còn phải tính đến những trường hợp như `include` module, `extend`, `define_method` nên chỉ áp dụng những method hook trên là vẫn chưa đủ nhưng không thể phủ nhận sự magical của  những method hook trên.

.