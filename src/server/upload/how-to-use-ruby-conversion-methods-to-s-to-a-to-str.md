Bạn đang làm việc với kiểu số nguyên integer nhưng lại muốn sử dụng các method của string(như gsub chẳng hạn). Bạn có thể làm gì?
Convert nó sang một string(với method to_s) sau đó convert ngược lại kết quả sang integer(với method to_i).

Cho ví dụ:

Bạn có thể convert Integer 1 sang String "1".
Sau đó, bạn có thể sử dụng những method từ class mới, giúp bạn làm một số việc gì đó mà ở class cũ không thể.

Trong Ruby, mối đối tượng được gắn vào một một class, và mỗi class có một bộ các method cụ thể.

Trong bài viết này, chúng ta sẽ tìm hiểu một số vấn đề sau:

* Các method chuyển đổi có sẵn trong Ruby
* Sự khác biệt giữa chúng là gì?
* Làm thế nào để có sự lựa chọn phù hợp nhất trong nhiều tình huống khác nhau.

Let's go!

# Short Conversion Methods (to_s, to_i)

Có lẽ bạn đã quá quen thuộc với các method convert quen thuộc này.
Các method như:

* to_i
* to_s
* to_a

Các method này trả về một đối tượng mới của một lớp cụ thể nào đó đại diện cho đối tượng hiện tại này.
Ví dụ:

```
(1..10).to_a
# [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
sẽ convert một đối tượng kiểu Range sang đối tượng kiểu Array.

Cố một số trường hợp mà Ruby tự động gọi các method này cho bạn, chẳng hạn như với các sử dụng string interpolation:

```
"#{1}"
```
Ruby sẽ tự động gọi 1.to_s cho bạn trong trường hợp này.

Bạn có thể kiểm tra điều này bằng đoạn code sau:

```
module Log
  def to_s
    puts "to_s called"
    super
  end
end
class Integer
  prepend Log
end
puts "#{1}"
# "to_s called"
```

Các method này được được thực thi khá thoải mái và chúng không support việc raise các exception. Ví dụ như:

```
"aaaaaa".to_i
# 0
```

return ra 0 trong trường hợp này có thể làm bạn ngạc nhiên, nhưng đó chính xác là những gì bạn nhận được khi gọi method to_i trên một string mà không chứa bất kì số integer nào.

# Long Conversion Methods (to_str, to_int)

Chúng ta đã có các method convert ngắn như to_i, to_s, vậy tại sao còn cần các method như to_str, hay to_int?

Sự khác nhau giữa chúng là gì?

Sự khác nhau ở đây là mục đích, với mỗi class trong Ruby(ngoại trừ class BasicObject) thực thi method to_s để return lại chính nó như là đối tượng của kiểu String. Nhưng với method to_str

1, Sự khác nhau trong scope
```
class Demo
end

puts Demo.new.to_s
#<Demo:0x007fc49b05a408>
```

```
puts Demo.new.to_str
undefined method to_str for #<Demo:0x007fea8204e290> (NoMethodError)
```

2, Sự khác nhau trong behavior

- to_s: return một đại diện string của một đối tương
- to_str nói rằng đối tượng sẽ hành xử như một string

```
100.to_s(2) # returns "1100100"
100.to_s # returns "100"
100.to_s(8) # returns"144"
```

```
class User
  def initialize(name)
   @name = name
  end

  def to_s
   "User: #{@name}"
  end
end

puts "Here is #{User.new("Bob")}" # Returns "Here is User: Bob"
```

```
puts "150" + 42
'+': no implicit conversion of Fixnum into String (TypeError)
```

```
class Fixnum
  def to_str
   self.to_s
  end
end
puts "150" + 42  => "15042"

class User
  def initialize(name)
   @name = name
  end

  def to_str
   @name
  end
end

puts "Say hello to " + User.new("Bob") # Displays "Say hello to Bob"
```

# How to Use Conversion Wrappers

Nếu bạn cảm thấy các method conversion chưa đủ, đừng lo lắng, chúng ta có một số cách khác cho bạn, chúng có tên là Conversion Wrapper

Chúng là:
* Array()
* Integer()
* Hash[]

Chúng có tác dụng gì?

Array sẽ convert bất cứ thứ gì sang một array, ví dụ:

```
Array(nil)
# []
Array([])
# []
Array(1)
# [1]
Array("")
# [""]
```

Ta có thể thấy
- Nếu đối tượng response đến to_ary hoặc to_a, nó sẽ gọi và return giá trị
- Còn không, nó sẽ đặt đối tượng bên trong một mảng rỗng và return nó


Với Integer()

- Nếu đối tượng là một string và nội dung của string này là một số nguyên hợp lệ thì method này trả về một Integer. Nó sẽ raise ArgumentError nếu format là invalid
- Nếu đối tượng không phải là một string, nó sẽ gọi to_int, sau đó to_i
- Nó sẽ raise TypeError nếu đối tượng không thể convert đến một số Integer hợp lệ 

```
Integer(1)
# 1
Integer("25")
# 25
Integer("abc123")
# ArgumentError (invalid value for Integer(): "abc123")
Integer([])
# TypeError (can't convert Array into Integer)
```

=> Integer() thật hữu ích trong trường hợp bạn muốn chắc chắn 100% rằng đang làm việc với một Integer hợp lệ

Với Hash[], bạn có thể pass một array những phần tử để get một new hash

```
Hash[[["a", 1], ["b", 2], ["c", 3]]]
# {"a"=>1, "b"=>2, "c"=>3}
```


Source: 

https://www.rubyguides.com/2018/09/ruby-conversion-methods/?tl_inbound=1&tl_target_all=1&tl_form_type=1&tl_period_type=1