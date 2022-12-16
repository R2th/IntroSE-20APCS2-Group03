Bạn có thể đặt tên thay thế cho phương thức Ruby theo hai cách:
* alias (keyword)
* alias_method

Nhưng tại sao lại có đến 2 phương thức thực hiện chung 1 mục đích? Hãy cùng khám phá những điểm khác biệt của chúng để hiểu rõ hơn!

## The alias Keyword
Đầu tiên chúng ta có **alias**, đó là một từ khóa Ruby (như **if**, **def**, **class**, v.v.)
**Nó trông như thế này:**
```
alias print_something puts
print_something 1
```

Bây giờ call **print_something** sẽ giống như việc call **puts** vậy

**Alias** có một số đặc điểm thú vị sau:
* Nó có cú pháp đặc biệt
* Nó có thể được sử dụng ở bất kỳ đâu
* Có thể alias các biến toàn cục (Nhưng đừng làm vậy nhé :D)

Những cú pháp hợp lệ:
```
alias a b

alias :a :b

alias :"#{}" :b
```

Lưu ý rằng không có dấu phẩy giữa các arguments như trong một phương thức thông thường.

Nếu bạn muốn dynamic method names, bạn có thể làm như thế này…
```
a = :print_something
b = :puts

alias :"#{a}" :"#{b}"
```

Trông khác là xấu, vì vậy bạn cần sử dụng **alias_method** để làm điều này.

## The alias_method Method
Tiếp theo chúng ta có **alias_method**.

Bạn không thể sử dụng method này trong một **instance method**. Nó chỉ có thể được defind trong một **class** hoặc một **module**

Đây là mô tả từ tài liệu:
> alias_method: “Makes new_name a new copy of the method old_name. This can be used to retain access to methods that are overridden.”

**Ví dụ:**
```
class Foo
  alias_method :print_something, :puts
end
```

Nó sẽ đặt alias cho phương thức **puts** là **print_something** trong class **Foo**

Bạn cũng có thể dùng string để làm tham số thay vì symbol

**Ví dụ:**
```
class Foo
  alias_method "print_something", "puts"
end
```

## alias vs alias_method
Vậy khi nào sự khác biệt diễn ra?
1. Khi bạn muốn tạo một alias với dynamically name (Ví dụ như "abc#{rand}")
2. Khi bạn define alias bên trong một method

Chúng ta đã thấy cách sử dụng **alias** để tạo dynamic method name ở trên, **alias_method** cung cấp một cú pháp linh hoạt hơn.

**Ví dụ:**
```
class Cat
  def speak
    "meow"
  end

  alias_method "#{name.downcase}_speak", :speak
end

p Cat.new.cat_speak
# "meow"
```

Tuy nhiên như đã nói ở trên, **alias_method** không thể sử dụng bên trong 1 method, bạn sẽ gặp phải lỗi sau:
> undefined method 'alias_method' for # (NoMethodError)

**Đây là một giải pháp:**
```
def enable_aliased_methods
  self.class.send(:alias_method, :x, :testing)
end
```

Tuy nhiên sử dụng **alias** sẽ ngắn gọn hơn nhiều
```
def enable_aliased_methods
  alias :x :testing
end
```

**Vậy điểm khác biệt lớn nhất giữa chúng là:**
* Một **method** được define bởi **alias** sẽ thuộc về **class** mà **alias** được sử dụng
* Một **method** được define bởi **alias_method** sẽ thuộc về **self**, hay **class** hiện tại tại thời điểm code được chạy

Vậy điểu này có ý nghĩa gì?

Nếu bạn sử dụng **alias** ở lớp cha thì khi bạn call **alias** ở lớp con sẽ gọi đến method ở lớp cha

**Ví dụ:**
```
class Parent
  def method
    puts "parent"
  end
  
  # alias:
  alias :operation :method
    
  # alias_method:
  alias_method :operation, :method
end

class Child < Parent
  def method
  	puts "children"
  end
end

# alias:
Parent.new.operation => #parent
Child.new.operation => #parent

# alias_method:
Parent.new.operation => #parent
Child.new.operation => #children
```

## Aliasing Makes a Copy Of The Method
Theo mô tả của **alias_method** & **alias**, Ruby tạo một bản sao của phương thức chứ không chỉ là copy tên phương thức.

**Ví dụ:**
```
def bacon
  123
end

alias :x :bacon

x
# 123

bacon
# 123
```

Lúc này, chúng ta đã đặt **alias** **x** thành **bacon**, bây giờ hãy xem điều gì sẽ xảy ra nếu override **bacon**:
```
def bacon
  234
end

x
# 123

bacon
# 234
```

**bacon** trả về một giá trị mới còn **x** thì không.

## Tài liệu tham khảo
https://www.rubyguides.com/2018/11/ruby-alias-keyword/