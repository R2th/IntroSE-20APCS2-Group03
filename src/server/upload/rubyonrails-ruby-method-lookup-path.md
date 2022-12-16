# Ruby method lookup path là gì?

Một câu hỏi đơn giản nhưng khó trả lời. Ruby có nhiều cách khác nhau trong việc định nghĩa một method và thêm nó vào một class:

* Thêm nó vào singleton class

* Thêm nó vào class

* Include một module

* Prepend một module

* Extend một module

* Kế thừa từ superclass



-----


Nguyên tắc: cố gắng tránh các tình huống khi bạn có nhiều class và module định nghĩa các method giống nhau.

Làm thế nào để chúng ta thực hiện tìm kiếm lookup path? Ví dụ dưới đây sẽ giải thích điều này:
```ruby
module Include
  def call(level)
    puts "#{level} include"
    super(level + 1) rescue nil
  end
end

module Prepend
  def call(level)
    puts "#{level} prepend"
    super(level + 1) rescue nil
  end
end

module Extend
  def call(level)
    puts "#{level} extend"
    super(level + 1) rescue nil
  end
end

class Super
  def call(level)
    puts "#{level} super"
    super(level + 1) rescue nil
  end
end

class Klass < Super
  include Include
  prepend Prepend


  def call(level)
    puts "#{level} klass"
    super(level + 1) rescue nil
  end

end

thing = Klass.new


def thing.call(level)
  puts "#{level} singleton"
  super(level + 1) rescue nil
end

thing.extend(Extend)


thing.call(1)
```
Đoạn code trên đã làm gì? Nó định nghĩa một phương thức call cho 6 trường hợp mô tả ở trên. Tất cả in ra một số thông tin và sau đó chuyển tiếp đến `super` và dừng khi gặp `nil`. Chạy đoạn code trên bằng irb ta được kết quả:
```
1 singleton
2 extend
3 prepend
4 klass
5 include
6 super
=> nil
```
Điều gì sẽ xảy ra nếu bạn extend, include hoặc prepend nhiều lần? Định nghĩa cuối cùng sẽ được gọi trước. Ví dụ như trong trường hợp:
```ruby
class Foo
  include Bar
  include Baz
end
```
Như ở ví dụ trên thì định nghĩa từ `Baz` sẽ được gọi trước. Và dĩ nhiên nếu không gọi super thì tất cả sẽ dừng lại ở phương thức hiện tại mà không gọi thêm khai triển nào khác.


# Mô tả hoạt động của Ruby method lookup?
Trước khi đi vào `method lookup` ta cần hiểu về hai khái niệm `receiver` và `ancestors chain`.

* receiver: Như đã đề cập bên trên, ta có thể hiểu đơn giản receiver chỉ là một object và gọi được phương thức từ nó.
* ancestors chain: trước khi đi vào định nghĩa chúng ta xét ví dụ sau:
```ruby
class People
    def description
        puts "people is singular or plural"
    end
end

class Student < People
end
   
 2.1.5 :018 > st = Student.new
 => #<Student:0x000000032aec18>
 2.1.5 :019 > st.description
=> people is singular or plural
```
Khi gọi `st.description`, ruby sẽ tìm trong class `Student` instance method `description` nhưng không thấy, tiếp tục tìm đến superclass tức là class mà nó kế thừa (ở đây là `People`), sau khi tìm thấy nó sẽ dừng lại và thực thi method. Nhưng giả sử nó không tìm thấy ở class nó kế thừa People nó sẽ tiếp tục tìm lên superclass của class `People` là `Object`. Path từ object -> class -> superclass -> superclass... như vậy được gọi là `ancestors chain`.

Vậy `Method lookup` là việc tìm kiếm phương thức, Ruby sẽ tìm trong class của `receiver` và từ đó nó sẽ tìm method theo `ancesstors chain` cho đến khi nó tìm được phương thức cần gọi.
# Ancestors
Một cách khác để xác định lookup path là sử dụng `ancestors`. Nó sẽ trả về một danh sách các module được include (kể cả chính module gốc).
```
irb(main):053:0> p thing.class.ancestors
[Prepend, Klass, Include, Super, Object, Kernel, BasicObject]
=> [Prepend, Klass, Include, Super, Object, Kernel, BasicObject]
```
Thứ tự này được xác định nhưng chưa đầy đủ, nó vẫn thiếu các method được thêm vào singleton class. Chúng có thể được nhìn thấy nếu chúng ta kiểm tra singleton_class thay vào đó (lưu ý: điều này sẽ tạo ra singleton class nếu nó chưa tồn tại):

```
irb(main):054:0> p thing.singleton_class.ancestors
[#<Class:#<Klass:0x00005559c9a7f238>>, Extend, Prepend, Klass, Include, Super, Object, Kernel, BasicObject]
=> [#<Class:#<Klass:0x00005559c9a7f238>>, Extend, Prepend, Klass, Include, Super, Object, Kernel, BasicObject]
```

-----
Tài liệu tham khảo: 

http://pascalbetz.github.io/ruby/2016/03/14/lookup-path/

https://viblo.asia/p/dap-an-mot-so-cau-hoi-phong-van-ruby-on-rails-developer-phan-2-LzD5dDa05jY