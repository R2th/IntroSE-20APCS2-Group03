## I. Khái quát về class
### 1. current class
Bất cứ khi nào bạn mở một class với từ khóa class thì class này sẽ trở thành **current class**.
```ruby
class CurrentClass
  # current class là CurrentClass
  # current_method là instance method của class CurrentClass

  def current_method
  end
end
```
- current class giống class **self**.
- method được định nghĩa bên trong current class là **current method**.

### 2. instance_eval, class_eval, module_eval
- instance_eval thêm một method vào object cụ thể.
```ruby
class Chim
  def an
    puts "an thoc"
  end
end

chim_bo_cau = Chim.new

chim_khuyen = Chim.new

chim_khuyen.hot

KẾT QUẢ

ò ó o o
main.rb:19:in `<main>': undefined method `hot' for #<Chim:0x00560003480928> (NoMethodError)

method hot chỉ thuộc về object chim_bo_cau
```

-** class_eval, module_eval** thêm một instance method vào toàn bộ object của class (module). Ta hoàn toàn có thể thêm một method vào class khi chưa biết tên class.

```ruby
class Chim
  def an
    puts "an thoc"
  end
end

Chim.class_eval do
  def hot
    puts "ò ó o o"
  end
end

chim_bo_cau = Chim.new
chim_khuyen = Chim.new

chim_bo_cau.hot
chim_khuyen.hot

KẾT QUẢ

ò ó o o
ò ó o o

```

## II. Singleton Class

### 1. Định nghĩa
Singleton classes là những class chứa các singleton method và class method của một đối tượng (hoặc một class)
Những method thông thường (instance methods) sẽ thuộc về object định nghĩa ra chúng, còn đối vơi những class methods, chúng thuộc về singleton class của object định nghĩa chúng
Khi khởi tạo một object (hay class), Ruby sẽ tự động khởi tạo một singleton class ứng với object (class) đó, đây sẽ là nơi chứa những class methods và singleton methods của object (class) đó

VD : Khi ta tạo một class Chim thì lúc này một singleton class của class Chim cũng được định nghĩa và có tên #Chim. Method ăn lúc này là class method của class Chim và nó cũng là singleton method của singleton class #Chim

```ruby
class Chim
  class << self
    def an
      puts "Ăn thóc"
    end
    
    def hot
      puts "ò ó o o"
    end
end
```

![](https://images.viblo.asia/5587100f-da33-4989-9d09-f290322ea406.PNG)

### 2. Kế thừa trong singleton class

Một class được kế thừa thì lúc này singleton của class đó cũng được kế thừa.

VD:

Class DaiBang có instance method sanmoi(), và class method nhinxa().  class DaiBang kế thừa từ class Chim và nên singleton class của class DaiBang là #DaiBang cũng kế thừa từ singleton class của chim.

Lúc này object daibang được tạo bởi class DaiBang gọi method an() của class Chim thì lúc này nó sẽ tìm đến method an() của singleton class DaiBang. Sau khi không tim thấy nó tiếp tục tìm đến singlecon method của class Chim ở đây nó sẽ thực thi method này vì nó tồn tại.

![](https://images.viblo.asia/bfad5568-f4cb-4563-8a08-a01a5317ea40.PNG)

### III. Tài liệu tham khảo
https://viblo.asia/p/singleton-class-trong-ruby-ByEZkGMAZQ0
https://viblo.asia/p/class-definitions-trong-ruby-1qm6RWxNMeJE#_ii-singleton-methods-4