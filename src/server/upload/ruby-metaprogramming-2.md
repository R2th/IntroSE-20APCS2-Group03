Bài liên quan: [Ruby Metaprogramming 1](https://viblo.asia/p/ruby-metaprogramming-1-3Q75wgX25Wb)

Bài viết được lược lại từ [post này](https://www.toptal.com/ruby/ruby-metaprogramming-cooler-than-it-sounds) của tác giả Nikola Todorovic.

*Hẵn bạn thường nghe rằng metaprograming là 1 cái gì đó cao siêu chỉ dành cho các Ruby ninja , chứ ko phải dành cho người dùng bình thường. Nhưng thật sự metaprograming ko đáng sợ như thế. Post này sẽ góp phần thay đổi suy nghĩ  đó và đưa metaprograming đến gần hơn với các developer trung bình để họ cũng có thể hiểu và sử dụng.*

![](https://images.viblo.asia/bff2d6d3-5e4c-4e39-8603-8f92b3e4f796.jpg)

### Metaprogramming
Metaprogramming là một kỹ thuật hiểu đơn giản là bạn viết code, code đó tự sinh ra code một cách tự động khi nó được thực thi. Điều này có nghĩa là bạn có thể định nghĩa nhiều `methods` và `classes` trong quá trình thực thi. Nghe hơi điên,  nhỉ? Tóm lại, sử dụng metaprogramming bạn có thể mở và sửa đổi lại `classes`,  gọi  những `methods` không tồn tại và khởi tạo chúng khi chương trình đang thực thi, viết code DRY, và nhiều hơn thế nữa...

### The basics
Trước khi chúng ra đi sâu vào những vấn đề khó hiểu, hãy bắt đầu từ những thứ cơ bản trước. Và cách tốt nhất là thông qua ví dụ để hiểu, từng bước một. Chắc bạn cũng đoán được những dòng code dưới đang làm gì rồi đúng ko:
```
class Developer

  def self.backend
    "I am backend developer"
  end
  
  def frontend
    "I am frontend developer"
  end

end
```

Chúng ta định nghĩa 1 `class` với 2 `methods`. Method đầu tiên là một `class method` và cái thứ 2 là `instance method`. Đây là những thứ cơ bản bạn đã biết trong Ruby, nhưng có rất nhiều thứ xảy ra sau những dòng code này mà chúng ta cần hiểu trước khi tiếp tục. Ta có thể thấy class `Developer` thực chất là một `object`. Trong Ruby mọi thứ đều là object, bao gồm cả `classes`.  Khi `Developer` là một `instance`, nó sẽ là một instance của class `Class`
![](https://uploads.toptal.io/blog/image/91785/toptal-blog-image-1446120487914-384fae8f419347d455a43dab6e20cf25.jpg)
```
p Developer.class # Class
p Class.superclass # Module
p Module.superclass # Object
p Object.superclass # BasicObject
```
Điều quan trọng cần hiểu ở đây là ý nghĩa của `self`. Method `frontend` là method có thể được gọi bởi các instance của class `Developer`, nhưng tại sao method `backend` lại là một `class method`?  Khi trình biên dịch Ruby thực thi bất kỳ đoạn code nào, nó luôn theo dõi giá trị của `self` trên mỗi dòng. `self` luôn liên quan đến object nào đó nhưng object đó có thể thay đổi dựa trên code được thực thi. Ví dụ, trong định nghĩa một class(class definition), tự thân`self` là class và cũng là instance của class `Class`:
```
class Developer
  p self 
end
# Developer
```
Bên trong `instance methods`, self chính là một instance của class đó.
```
class Developer
  def frontend
    self
  end
end
 
p Developer.new.frontend
# #<Developer:0x2c8a148>
```
Bên trong các `class methods`, `self` đề cập đến chính class đó (chi tiết sẽ trình bày sau):
```
class Developer
  def self.backend
    self
  end
end

p Developer.backend
# Developer
```
OK, fine. Vậy sau tất cả, `class method` là cái gì vậy? Trước khi trả lời câu hỏi này chúng ta cần nhắc đến sự tồn tại của cái thứ gọi là `metaclass`, cũng được biết đến như một `singleton class` và `eigenclass`. Class method `frontend` mà chúng ta đã định nghĩa bên trên là 1 instance method được định nghĩa trong metaclass cho object `Developer`! 

### Metaclasses
Mọi object trong Ruby đều có metaclass của riêng nó. Có thể các developer ko để ý, nhưng nó vẫn tồn tại và bạn vẫn có thể sử dụng chúng dễ dàng. Bản chất của class `Developer` là 1 object, nên nó cũng có metaclass. Ở đây chúng ta có 1 ví dụ: tạo 1 object của class `String` và xem metaclass của nó như thế nào: 

```
example = "I'm a string object"

def example.something
  self.upcase
end

p example.something
# I'M A STRING OBJECT
```

Ta add 1 singleton method `something` vào object. Điểm khác nhau giữa class methods và singleton methods là class methods available cho tất cả instances của class object trong khi singleton methods thì available chỉ cho singleton instance. Class methods được sử dụng rộng rãi trong khi singleton method ko được như thế, nhưng cả 2 loại method này đều được thêm vào 1 metaclass của object.

Ví dụ bên trên có thể được viết lại như sau: 

```
example = "I'm a string object"

class << example
  def something
    self.upcase
  end
end
```

Cú pháp khác nhau nhưng mục đích và output thì như nhau. Giờ hãy quay lại ví dụ trước, chổ chúng ta tạo `Developer` class và tìm hiểu thêm 1 số cú pháo định nghĩa 1 class method:

```
class Developer
  def self.backend
    "I am backend developer"
  end
end
```
Đây là cách mà mọi người hay dùng.

```
def Developer.backend
  "I am backend developer"
end
```
Đây cũng tương tự, ta định nghĩa `backend` class method cho `Developer`, mặc dù ko sử dụng `self` nhưng việc viết 1 method kiểu này cũng tạo ra 1 class method tương tự.

```
class Developer
  class << self
    def backend
      "I am backend developer"
    end
  end
end
```
Một lần nữa, chúng ta định nghĩa class method, nhưng sử dụng cú pháp tương tự như lần ta định nghĩa singleton method cho `String` object. Bạn có thể lưu ý rằng ta dùng `self` ở đây là để ám chỉ đến chính `Developer` object. Đầu tiên ta mở class `Developer`, gán self cho class `Developer`. Sau đó ta dùng `class << self`,  gán `self` bằng với metaclass của `Developer`. Sau đó định nghĩa 1 method `backend` vào metaclass của `Developer`.

```
class << Developer
  def backend
    "I am backend developer"
  end
end
```
Khi sử dụng block kiểu thế này, ta set `self` cho metaclass của `Developer` trong suốt block. Và kết quả, method `backend` đã được thêm vào metaclass của `Developer` thay vì class.

Hãy xem metaclass như thế nào trong cây thừa kế: 
![](https://images.viblo.asia/859e3360-5b14-4bc3-8132-d7c623922621.jpg)

Như bạn đã thấy trong những ví dụ trước, ko có bằng chứng nào về sự tồn tại của metaclass. Nhưng ta có thể sử dụng 1 chút trick để xem sự tồn tại của class ẩn này:
```
class Object
  def metaclass_example
    class << self
      self
    end
  end
end
```

Nếu ta định nghĩa 1 instance method trong `Object` class (ta có thể mở tất cả class bất cử lúc nào, đó là 1 trong những cái hay của metaprograming ^^), ta sẽ có `self` chính là `Object`. Ta có thể dùng cú pháp `class << self` để thay đổi `self` hiện tại thành metaclass của curent object. Method trả về `self` ở thời điểm này chính là metaclass. Bởi vậy việc gọi instance method này ở bất kì object nào, chúng ta đều có được metaclass của object đó. Giờ hãy cùng quay lại ví dụ, định nghĩa lại class `Developer` và tìm hiểu lại chút nào:

```
class Developer

  def frontend
    p "inside instance method, self is: " + self.to_s
  end

  class << self
    def backend
      p "inside class method, self is: " + self.to_s
    end
  end
  
end

developer = Developer.new
developer.frontend
# "inside instance method, self is: #<Developer:0x2ced3b8>"

Developer.backend
# "inside class method, self is: Developer"

p "inside metaclass, self is: " + developer.metaclass_example.to_s
# "inside metaclass, self is: #<Class:#<Developer:0x2ced3b8>>"
```
`frontend` ở trên chính là instance method của class và `backend` chính là instance method của metaclass:

```
p developer.class.instance_methods false
# [:frontend]

p developer.class.metaclass_example.instance_methods false
# [:backend]
```

Tất nhiên để lấy được metaclass, bạn ko cần phải mở `Object` và dùng cái trick này. Bạn có thể dùng luôn `singleton_class` mà Ruby cung cấp. Nó cũng tương đương với `metaclass_example` mà chúng ta đã thêm nhưng với cái trick này chúng ta sẽ hiểu hơn cách mà Ruby làm việc như thế nào:

```
p developer.class.singleton_class.instance_methods false
# [:backend]
```

### Định nghĩa Missing method
Khi gọi 1 method trên 1 object, đầu tiên Ruby di chuyển đến class chứa object đó và tìm các instance methods. Nếu nó ko tìm thấy method ở đó, nó tiếp tục tìm ngược lên các cây phân cấp ở trên (the ancestors chain). Nếu Ruby ko tìm thấy method đó, nó sẽ gọi 1 method khác tên là `missing_method`- kế thừa từ instance method của `Kernel`. 

`define_method` là 1 method được định nghĩa trong `Module` class, với method này bạn có thể tạo ra các method động (dynamic methods) . Để sử dụng `define_method`, bạn có thể gọi tên của method mới và 1 block, các param của block chính là param của method mới. Vậy thì điều khác nhau giữa `def` và `define_method` là gì? Câu trả lời là ko nhiều, trừ khi bạn dùng `define_method` kết hợp với `methid_missing` để DRY code. Chính xác hơn, bạn sử dụng `define_method` thay vì `def` để quản lý các scope khi định nghĩa class, nhưng đó là 1 câu chuyện khác. Hãy cùng xem 1 ví dụ đơn giản sau:

```
class Developer
  define_method :frontend do |*my_arg|
    my_arg.inject(1, :*)
  end

  class << self
    def create_backend
      singleton_class.send(:define_method, "backend") do
        "Born from the ashes!"
      end
    end
  end
end

developer = Developer.new
p developer.frontend(2, 5, 10)
# => 100

p Developer.backend
# undefined method 'backend' for Developer:Class (NoMethodError)

Developer.create_backend
p Developer.backend
# "Born from the ashes!"
```

Đây là cách mà `define_method` được sử dụng để tạo instance method mà ko sử dụng `def`. Tuy nhiên, chúng ta có khá nhiều việc để làm. Hãy xem đoạn code sau:

```
class Developer

  def coding_frontend
    p "writing frontend"
  end

  def coding_backend
    p "writing backend"
  end

end

developer = Developer.new

developer.coding_frontend
# "writing frontend"

developer.coding_backend
# "writing backend"
```

Chúng ta sẽ DRY đoạn code trên bằng cách sử dụng `define_method`:

```
class Developer

  ["frontend", "backend"].each do |method|
    define_method "coding_#{method}" do
      p "writing " + method.to_s
    end
  end

end

developer = Developer.new

developer.coding_frontend
# "writing frontend"

developer.coding_backend
# "writing backend"
```
Có vẻ tốt hơn rồi nhỉ, nhưng mà chưa phái là tối ưu nhất. Giả dụ ta muốn add thêm 1 method mới tên là `coding_debug`, ta cần phải thêm `"debug"` vào mảng. Nhưng với `method_missing`, ta có thể làm cho mọi chuyện đơn giản hơn:

```
class Developer

  def method_missing method, *args, &block
    return super method, *args, &block unless method.to_s =~ /^coding_\w+/
    self.class.send(:define_method, method) do
      p "writing " + method.to_s.gsub(/^coding_/, '').to_s
    end
    self.send method, *args, &block
  end

end

developer = Developer.new

developer.coding_frontend
developer.coding_backend
developer.coding_debug
```

Đoạn code trên đúng là hơi phức tạp 1 chút nhỉ. Cùng xem nào, việc gọi 1 method ko tồn tại sẽ gọi đến `method_missing`. Ở đây, ta muốn tạo 1 method mới chỉ khi method này bắt đầu bằng từ `"coding_"`.  Và ta sử dụng `define_method` để tạo method mới. Với đoạn code trên, ta có thể tạo ra cả ngàn method với tên bắt đầu bằng `"coding_"`, và code thì luôn được DRY.

### Wrapping up
Trên đây chỉ là vài tip được dẫn ra. Metaprograming còn rất nhiều thứ hay ho đằng sau nó. Khi bạn hiểu được những kỹ thuật nâng cao hơn, bạn có thể tự build cho mình [Domain-specific language](https://en.wikipedia.org/wiki/Domain-specific_language) (DSL) riêng. Rất nhiều gem trong Rails được xây dựng dựa trên cách này, và có thể, bạn cũng đã từng sử dụng DSL mà bạn ko biết, như RSpec và ActiveRecord chẳng hạn.
Hi vọng bài viết này sẽ giúp ích cho bạn 1 phần nào đó.
Tạm biệt và hẹn gặp lại.

Nguồn: https://www.toptal.com/ruby/ruby-metaprogramming-cooler-than-it-sounds