### **I. Metaprogramming advance**

Có 3 phương thức advance chính trong Ruby áp dụng cho việc triển khai metaprograming.

1. Method eval():
-  `#eval( )` là một method trong module Kernel.
-  Phương thức `eval()` dùng để execute code trong một String.
-  Ví dụ cách sử dụng phương thức `eval()`: 

```
str = "hello"
eval "str + ' Fred'"                      #=> "hello Fred"
```

- Phương thức `eval()` có thể  dùng để thực thi một đoạn String gồm nhiều dòng, vì vậy có thể dùng để chạy cả một chương trình trong một đoạn String. Tuy nhiên, phương thức `eval()` cũng bộc lộ một số nhược điểm như sau:
    - Chậm
    - Nguy hiểm, khó quản lý data
    - Được xem là phương pháp cuối cùng

2. Method #instance_variable_get():
- `#instance_variable_get( )` là một object method.
- `instance_variable_get()` trả về giá trị biến instance của object hoặc nil nếu biến đó chưa được set.
- Nếu biến instance không tồn tại thì `instance_variable_get()` sẽ trả về NameError exception.
- Đầu vào của method `instance_variable_get()` có thể là string hoặc symbol, bao gồm ký tự `@` trong tên biến.
- Cách dùng `instance_variable_get()` như sau:

```
class Fred
  def initialize(p1, p2)
    @a, @b = p1, p2
  end
end
fred = Fred.new('cat', 99)
fred.instance_variable_get(:@a)    #=> "cat"
fred.instance_variable_get("@b")   #=> 99
```


3. Method #instance_variable_set():
- `#instance_variable_set( )` tương tự như `#instance_variable_get( )`, là một object method.
- `instance_variable_set()` dùng để set giá trị cho biến instance của object.
- Tên biến truyền vào của phương thức `instance_variable_set()` có thể là string hoặc symbol và phải bao gồm ký tự `@` tương tự method `instance_variable_get()`.
- `instance_variable_set()` có thể set giá trị cho biến đã tồn tại hoặc tạo biến instance chưa có.
- Cách dùng `instance_variable_set()` như sau:

```
class Fred
  def initialize(p1, p2)
    @a, @b = p1, p2
  end
end
fred = Fred.new('cat', 99)
fred.instance_variable_set(:@a, 'dog')   #=> "dog"
fred.instance_variable_set("@c", 'cat')   #=> "cat"
fred.inspect                             #=> "#<Fred:0x401b3da8 @a=\"dog\", @b=99, @c=\"cat\">"
```

### **II. Metaprogramming advance tương tự**

- Ngoài ra còn có các method tương tự được sử dụng như sau:

1. #instance_eval

```
class KlassWithSecret
  def initialize
    @secret = 99
  end
  private
  def the_secret
    "Ssssh! The secret is #{@secret}."
  end
end
k = KlassWithSecret.new
k.instance_eval { @secret }          #=> 99
k.instance_eval { the_secret }       #=> "Ssssh! The secret is 99."
k.instance_eval {|obj| obj == self } #=> true
```

2. #module_eval

```
class Thing
end
a = %q{def hello() "Hello there!" end}
Thing.module_eval(a)
puts Thing.new.hello()
Thing.module_eval("invalid code", "dummy", 123)
```

- Kết quả:

```
Hello there!
dummy:123:in `module_eval': undefined local variable
    or method `code' for Thing:Class
```

3. #class_variable_get

```
class Fred
  @@foo = 99
end
Fred.class_variable_get(:@@foo)     #=> 99
```

4. #class_variable_set

```
class Fred
  @@foo = 99
  def foo
    @@foo
  end
end
Fred.class_variable_set(:@@foo, 101)     #=> 101
Fred.new.foo                             #=> 101
```

5. #const_get

```
module Foo
  class Bar
    VAL = 10
  end

  class Baz < Bar; end
end

Object.const_get 'Foo::Baz::VAL'         # => 10
Object.const_get 'Foo::Baz::VAL', false  # => NameError
```

6. #const_set

```
Math.const_set("HIGH_SCHOOL_PI", 22.0/7.0)   #=> 3.14285714285714
Math::HIGH_SCHOOL_PI - Math::PI              #=> 0.00126448926734968
```


7. #class_variables

```
class One
  @@var1 = 1
end
class Two < One
  @@var2 = 2
end
One.class_variables          #=> [:@@var1]
Two.class_variables          #=> [:@@var2, :@@var1]
Two.class_variables(false)   #=> [:@@var2]
```

### **III. Kết luận**

Trên đây là các method advance của metaprogramming trong Ruby. Hi vọng bài viết có thể giúp các bạn có được cách nhìn tổng quan về metaprogramming và cách dùng các hàm advance trong Ruby.

## **Cảm ơn đã theo dõi**