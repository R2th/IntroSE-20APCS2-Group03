Khi làm việc với ruby and rails chúng ta phải làm việc rất nhiều với class, chính vì vậy mà việc hiểu và sử dụng class trong ruby là rất quan trọng. Bài viết này mình sẽ tìm hiểu về một khái niệm liên quan đến class trong ruby đó là Eigenclasses.
# 1. Singleton method
Trước khi đi sâu hơn về class, hãy cùng tìm hiểu về singleton method trong ruby. Có nhiều cách định nghĩa về singleton method trong ruby nhưng mình hiểu đơn giản là: <br>
`Ruby cho phép ta thêm một method vào một đối tượng` <br>
VD: Ta có một đối tượng str = "hello"
Chúng ta có thể thêm một method vào đối tượng str này bằng cách khai báo: <br>
``` ruby
    def str.method1
      puts "this is method 1"
    end
```
Như vậy khi ta gọi str.method1 => kết quả in ra là "this is method 1". Tuy nhiên, chỉ có đối tượng str mới có thể gọi method 1, với những object khai báo và khởi tạo bằng string khác sẽ không thể gọi method1. <br>
```
    str2 = "hello2"
    str2.method1 # No method 'method1'
```

Chúng ta cần nhớ lại là mọi thứ trong ruby là đối tượng kể cả class. Như vậy khi ta gọi một class method cũng giống như việc ta gọi một object của đối tượng như ví dụ phía trên.
``` ruby
  class A; end
  # khai báo một method cho class A cũng giống như khai báo cho đối tượng
  def A.method1
    puts "this is method of A"
  end
  A.method1 # 'this is method of A'
```
Và sự thực là class method chính là singleton method của class. Ta cũng có thể thay tên của class như ví dụ trên bằng từ khóa self
```ruby
    class A
      def self.method1
        puts "this is method of A"
      end
    end
```
Như vậy chúng ta luôn định nghĩa singleton method giống như mẫu
```ruby
    def object.method
      # implement method here
    end
```
# 2. Eigenclasses
Sau khi đã tìm hiểu cơ bản về method trong ruby, phần này ta sẽ đi sâu tìm hiểu về khái niệm Eigenclasses. <br>
Ta có một class
``` ruby
    class MyClass
      def my_method; end
    end
    
    obj = MyClass.new
    obj.my_method
```
Khi ta gọi hàm my_method từ đối tượng obj ruby sẽ tìm trực tiếp từ class MyClass, nếu không tìm thấy nó sẽ tìm kiếm từ các class cha mà MyClass kế thừa. Trong trường hợp này thì nó sẽ tìm thấy luôn trong class MyClass.<br>
Nhưng giả sử chúng ta khai báo singleton method cho obj
```ruby
    def obj.my_singleton_method; end
```
Nhìn vào sơ đồ 
![](https://images.viblo.asia/e8abb247-51fd-40ed-a287-ba981ac61f22.png) <br>
Ta tự hỏi cái method my_singleton_method nó nằm ở đâu vậy (???). Nó không thể nằm trong obj được vì obj không phải là 1 class, cũng không thể nằm trong class MyClass được vì như vậy mọi instance của MyClass sẽ gọi được hàm my_singleton_method trong khi thực tế thì chỉ có obj mới gọi được method này thôi, nó cũng không thể nằm trong các class mà MyClass kế thừa cũng vì lý do này. Vậy thì ở đâu ??? <br>
Đây chính là lúc thằng eigenclass bị phơi bày ra. <br>
Khi chúng ra hỏi về class của một object, ta thường nghĩ đến class đã định nghĩa nhưng sự thật object có một class ẩn gọi là eigenclass. <br>
Ta có thể thêm code cho eigenclass với cách khai báo sau: <br>
```ruby
    class << object
      # your code here
    end
```
Chúng ta sẽ đi vào các ví dụ sau để hiểu sâu hơn về thằng này. <br>
``` ruby
    class C
      def a_method
        'C#a_method()'
      end
    end
    
    class D < C; end
    obj = D.new 
    obj.a_method # kết quả : 'C#a_method()'
```
Khi ta gọi hàm a_method ruby sẽ tìm kiếm từ class D, sau khi không tìm kiếm thấy method a_method nó sẽ đi lên class C để tìm kiếm vì D kế thừa C <br> Sơ đồ sẽ như sau: <br>
![](https://images.viblo.asia/b8827f7d-26ff-4f61-b706-2bb25aff28eb.png)
Tiếp theo để dễ dàng cho việc tìm hiểu eigenclass chúng ta định nghĩa một method sau ở class Object
``` ruby
    class Object
      def eigenclass
        class << self; self; end
      end
    end
    
    "string".eigenclass # kết quả là #<Class:#<String:0x00005593e58c3920>>
```
Nhìn vào kết quả trên ta thấy ruby trả về eigenclass của một đối tượng và để phân biệt nó thêm "#" vào phía trước. Như vậy tương tự eigenclass của C là #C, của D là #D, của obj là #obj.
Khi ta định nghĩa một method cho obj như sau:
```ruby
    class << obj
      def a_singleton_method
        'obj#a_singleton_method()'
      end
    end
    obj.a_singleton_method # kết quả: 'obj#a_singleton_method()'
    obj.eigenclass.superclass # => D
```
Sơ đồ lúc này sẽ như sau: <br>
![](https://images.viblo.asia/ff1b7036-f4e2-47a8-af19-a92e9bc928f6.png)
Nhìn vào sơ đồ ta có thể trả lời câu hỏi phía trên đó là hàm a_singleton_method thực tế là nằm ở eigenclass của obj đó là #obj :D. Và class này kế thừa D (wow) <br>
Tiếp theo chúng ta sẽ tìm hiểu về sự liên hệ giữa class, eigenclass và giữa các eigenclass với nhau <br>
Ta khai báo tiếp cho class C như sau: <br>
```ruby
    class << C
      def a_class_method
        'C.a_class_method()'
      end
    end
    # gọi các hàm sau
    C.eigenclass  # => #<class: C>
    D.eigenclass  # => #<class: D>
    C.eigenclass.superclass  # => #<class: Object>
    D.eigenclass.superclass  # => #<class: C>
    D.a_class_method # kết quả 'C.a_class_method()'
```
Từ ví dụ trên ta có sơ đồ sau
![](https://images.viblo.asia/1a6a77c5-d9f0-461e-9e0a-76d7f81c5d51.png)
Có thể thấy super class của #C là #Object (eigenclass của object), super class của #D là #C. Và để cho dễ chúng ta chỉ cần nhớ: <br>
```
  Super class một eigenclass chính là eigenclass của super class đó :v
```
Cũng từ sơ đồ trên ta có thể thấy D có thể gọi method a_class_method vì eigenclass của D kế thừa eigenclass của C (hoplyha) :D <br>
# 3. Kết luận
Như vậy bài viết của mình đã trình bày về method, class và thằng ẩn danh eigenclass. Hi vọng bài viết sẽ giúp ích cho các bạn, nếu có gì cần thảo luận hay góp ý hãy để lại bình luận phía dưới nhé. (seeyou) :D <br>