Kỹ thuật `Open Class`  trong Ruby hay còn gọi là `monkey patch` là một kỹ thuật meta programming cho phép các developer có thể thêm phương thức mới hay `refine`  định nghĩa lại phương thức đã tồn tại trong một class.

Nhưng thật không may là phạm vi của những thay đổi như vậy mang tính `global`. Do đó, tất cả users của class `monkey patch` đều có những thay đổi tương tự.  
Điều này có thể gây ra các ảnh hưởng không mong muốn và có thể break chương trình.

Ta có thể hình dung cụ thể qua ví dụ sau:

- Thêm một method `randomize` vào class `re-opened ` String như sau:

```ruby
class String
  def randomize
    self.chars.shuffle.join
  end
end
```

Việc làm trên sẽ gây ảnh hưởng tới tất cả các đối tượng instance của lớp String và tất cả các instance mới trong tương lai bởi vì các method instance đều được lưu trữ trong đối tượng của class.

```ruby

s = "Totto Chan"
s.scramble => NoMethodError: undefined method `scramble' for "Totto Chan":String

class String
  def scramble
    self.chars.shuffle.join
  end
end

puts str.scramble
=> "otao tThCn"
```

Ví dụ phía trên cho ta thấy 1 vấn đề mà đã nêu ra phía trên. `Monkey patching` là `global` nên mọi sự thay đổi phía trên đều ảnh hưởng tới mọi đối tượng của `String` trong toàn bộ ứng dụng.

Vì vậy mà có một số đều cần phải cân nhăc:
- Hàm thêm vào có xung đột với bên thứ ba không?
-  Có vô tình ghi đè lên phương thức hiện có?
-  Liệu có tương thích với phiên bản Ruby trong tương lai?

=> `Refine` được thiết kế để giảm thiểu những tác động hay ảnh hưởng của `monkey patching` lên những người dùng khác của lớp `monkey patching`.

### Refine

Chúng ta có thể giới hạn phạm vi của `mokey patching` bằng cách gọi `refine`  bên trong định nghĩa của một module.

```
module StringExtensions
  refine String do
    def scramble
      self.chars.shuffle.join
    end
  end
end
```

### Using

Một `Refinement` không hoạt động chỉ bằng cách định nghĩa nó. Để kích hoạt `Refinement` trong class hay module mong muốn,  ta add vào như sau:

```
using StringExtensions
```

***Lưu ý rằng những hàm được định nghĩa, khai báo với `refine` chỉ hoạt động được trong class hay module mà chúng ta thêm `using StringExtensions` vào.***

```
class Scramble
  using StringExtensions
  def self.call(word)
    word.scramble
  end
end

Scramble.call('monkey')
#=> knmeyo
```

**Phạm vi**

`Refinement` hoạt động ở: 
- bên trong khối `refine`.
- Bắt đầu từ vị trí trong mã code trong class hoặc module từ vị trí `using` được thêm vào đến khi kết thúc định nghĩa class hay module.

Những method mà được gọi trong định nghĩa thì sẽ không được `refine` sau khi gọi `using`.
Cùng xem ví dụ dưới đây để hiểu rõ hơn.

```
class Calculate
  def add1_to(num)
    num + one
  end

  def one
    1
  end
end

module CalculateExtensions
  refine Calculate do
    def one
      1.0
    end
  end
end

using CalculateExtensions
Calculate.new.one #=> 1.0
Calculate.new.add1_to(2) #=> 3
```


Bài viết được tham khảo từ [đây](https://blog.alex-miller.co/ruby/2017/07/22/scope-the-monkey.html)

**Thanks for your reading!**