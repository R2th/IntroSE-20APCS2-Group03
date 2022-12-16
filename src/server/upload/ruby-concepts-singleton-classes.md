Bạn đã bao giờ tự hỏi “singleton class” là gì chưa? Hay khi bạn đang nói chuyện với ai đó hoặc đọc một bài đăng và bắt gặp "singleton class" hay "singleton method" được sử dụng, và lúc đó, bạn chỉ mỉm cười và gật đầu rồi note nó lại để tìm kiếm sau này? Bây giờ là lúc để bạn hiểu rõ về nó. Hy vọng bài viết này sẽ giải thích khái niệm này bằng ngôn ngữ trực quan hơn và giúp bạn thấy sự tiện dụng của nó.


Lưu ý phụ: rất nhiều thông tin trong bài viết xuất phát từ việc đọc cuốn sách [The Well-Grounded Rubyist của David A. Black](https://www.amazon.com/Well-Grounded-Rubyist-David-Black/dp/1617291692/ref=as_li_ss_tl?ie=UTF8&qid=1524434189&sr=8-1&keywords=well+grounded+rubyist&linkCode=sl1&tag=ryanpalo-20&linkId=c25c046853b13d322470b4c2401f62f5). Cuốn sách này có rất nhiều thông tin tuyệt vời và hiện là một trong những cuốn sách yêu thích của tôi về Ruby.

**Code**

Nếu bạn đã từng làm việc nhiều với Ruby, bạn có thể đã sử dụng những "singleton class" này mà không biết! Đầu tiên, tôi sẽ cho bạn thấy đoạn code mà có thể bạn đã viết, hãy xem một số ngữ cảnh sau:


```
class Config
  def self.from_file(filename)
    Config.new(YAML.load_file(filename))
  end
end

dev_config = Config.from_file("config.dev.yaml")
# => Config object with dev settings
```

Hoặc bạn cũng có thể đã từng thấy đoạn code này:

```
module Geometry
  class << self
    def rect_area(length, width)
      length * width
    end
  end
end

Geometry.rect_area(4, 5)
# => 20
```
Cho đến bây giờ, có thể bạn vẫn gọi chúng là "class methods" hay "các phương thức lớp". Dường như là bạn đã đúng. Nhưng tại sao chúng hoạt động? Điều gì đang xảy ra ở đây?

**Cụ thể :**

Đây là một khái niệm mà nó là yếu tố chính làm cho Ruby trở nên tuyệt vời. Mỗi đối tượng riêng lẻ, cho dù là có cùng class, đều khác nhau và chúng có thể có các phương thức khác nhau được định nghĩa. Dưới đây là một ví dụ về lớp `Pet`:


```
class Pet
  def smolder
    "Generic cute pet smolder"
  end
end

succulent = Pet.new
momo = Pet.new
willy = Pet.new

def momo.smolder
  "sassy cat smolder"
end

def willy.smolder
  "well-meaning dingus smolder"
end
```

Giờ khi chúng ta gọi `smolder` cho `succulent`, phương thức mà chúng ta đã không thay đổi, nó sẽ trả về giá trị mà chúng ta định nghĩa ban đầu:

```
succulent.smolder
# => Generic cute pet smolder"
```
Nhưng khi chúng ta gọi `smolder` cho `willy` hoặc `momo`, nó sẽ trả về giá trị khác:
```
momo.smolder
# => "sassy cat smolder"

willy.smolder
# => "well-meaning dingus smolder"
```
Vậy, việc này hoạt động như thế nào? Liệu chúng ta đã định nghĩa lại hàm `smolder` cho mỗi đối tượng `pet`? 
Giờ hãy thử gọi như ví dụ bên dưới và xem output của chúng nhé:

```
succulent.singleton_methods
# => []
momo.singleton_methods
# => [:smolder]
willy.singleton_methods
# => [:smolder]
```
Chính là nó! Bạn đang sử dụng một `singleton method`! 

Và giờ, tôi nghĩ bạn đã sẵn sàng để nói về thế nào là một `singleton class`.

**Singleton Class là gì?**

Đầu tiên, giống như một chương trình, chúng ta chia nhỏ câu hỏi thành: một singleton là gì? Có nhiều định nghĩa khác nhau và chúng có thể cụ thể hơn trong các trường hợp khác nhau, nhưng cốt lõi, một singleton là một cái gì đó mà nó chỉ có một, là thứ duy nhất thuộc loại của nó.

Điều đó có ý nghĩa gì trong Ruby? Đó là: khi bạn khởi tạo một đối tượng từ một lớp trong Ruby, nó biết về các phương thức mà lớp của nó cung cấp cho nó. Nó cũng biết làm thế nào để tìm kiếm tất cả các lớp tổ tiên cho lớp của nó(lớp cha, lớp cha của lớp cha...). Đó là lý do tại sao lớp thừa kế hoạt động.
> “Ồ, tại sao class của tớ không có phương thức đó? Hãy kiểm tra class cha của nó. Và class cha của class cha đó. Vv.”

Một trong những điều tuyệt vời về Ruby là chuỗi tổ tiên có thiết kế rất rõ ràng. Có một bộ quy tắc cụ thể cho các đối tượng tìm kiếm tổ tiên của chúng, sao cho không bao giờ có sự nhầm lẫn nào khi phương thức được gọi.

Ngoài việc biết về lớp của mình, mỗi đối tượng được tạo ra với một `singleton class` mà nó biết. Tất cả các lớp singleton là một loại "lớp ma"(ghost class) hoặc, đơn giản hơn, một cái túi để giữ bất kỳ phương thức nào được định nghĩa chỉ cho riêng đối tượng này. Hãy thử gọi như sau:

```
momo.singleton_class
# => #<Class:#<Pet:0x00007fea40060220>>
```

Trong cây phân cấp thừa kế, lớp này đứng ngay trước lớp thực tế của đối tượng(Pet). Tuy nhiên, bạn không thể nhìn thấy nó bằng cách nhìn vào tổ tiên của đối tượng này.

```
momo.class.ancestors
# => [Pet, Object, Kernel, BasicObject]
```
Nhưng nếu chúng ta tìm kiếm cây tổ tiên của singleton class của nó:

```
momo.singleton_class.ancestors
# => [#<Class:#<Pet:0x00007fea40060220>>, Pet, Object, Kernel, BasicObject]
```
Bạn có thể thấy rằng nó xuất hiện ở ngay đầu chuỗi. Vì vậy, khi `momo` tìm kiếm phương thức `smolder`, nó sẽ tìm kiếm đầu tiên trong lớp singleton của nó. Vì có một phương pháp `smolder` ở đó, nó gọi hàm này, thay vì tìm kiếm thêm lên trên để tìm một hàm được định nghĩa trong lớp Pet.

**Điều này có liên quan gì đến class method?**

Bây giờ là khi chúng ta bắt đầu nhận thấy sức mạnh của `singleton class`. Đừng quên rằng mỗi lớp chỉ là một đối tượng của lớp `Class`. 
```
Pet.class
# => Class
```

Và `Class` chỉ là một lớp cung cấp một số phương thức cho mọi thực thể của nó (các class) mà bạn tạo ra, giống như bất kỳ class nào khác.
```
Class.instance_methods(false)
# => [:new, :allocate, :superclass]
```

Vì vậy, khi bạn định nghĩa "class method" mà bạn dự định gọi trực tiếp trên class, thực tế, điều bạn đang thực hiện là  định nghĩa các phương thức cho riêng đối tượng Class đó - trong singleton class của nó!
```
class Pet
  def self.random
    %w{cat dog bird fish banana}.sample
  end
end

Pet.singleton_methods
# => [:random]
```

Và ... nếu singleton class tồn tại, nó sẽ biến lớp cha thành singleton_classes được kế thừa từ class chính. Ví dụ sau giúp bạn hiểu hơn:

```
class Pet
  def self.random
    %w{cat dog bird fish banana}.sample
  end
end

class Reptile < Pet
  def self.types
    %w{lizard snake other}
  end
end

Reptile.singleton_methods
# => [:types, :random]
Reptile.singleton_class.ancestors
# => [#<Class:Reptile>, #<Class:Pet>, #<Class:Object>, #<Class:BasicObject>, Class, Module, Object, Kernel, BasicObject]
```
Hãy xem cách mà singleton class của `Reptile` kế thừa từ singleton class của `Pet`. Vậy liệu các class method của `Pet` cũng có thể dùng cho `Reptile`?

**Ngoài lề**

Chúng ta đã cover hầu hết những điều quan trọng bên trên, nhưng có một vài điều thú vị liên quan mà tôi muốn giới thiệu thêm:

- `Class << self`

Có hai cách để sử dụng từ khóa class: dùng trực tiếp và được theo sau bởi 1 hằng số ( class Gelato), hoặc theo sau là "toán tử <<" và một đối tượng ( class << momo). Bạn đã biết về cái đầu tiên - đó là cách bạn thường khai báo một lớp! Hãy tập trung vào cái thứ hai, đó là cú pháp để trực tiếp tạo ra một singleton class của đối tượng. Bạn có thể hiểu nó giống như cách định nghĩa các phương thức như chúng ta đã làm ở trên, nghĩa là:

```
# cách này:
def momo.snug
  "*snug*"
end

# giống với:
class << momo
  def snug
    "*snug*"
  end
end
```

Bạn luôn làm điều này mỗi khi bạn muốn định nghĩa lại class để thêm nhiều hàm hơn:

```
class Gelato
  attr_reader :solidity

  def initialize
    @solidity = 100
  end

  def melt
    @solidity -= 10
  end
end

# And re-open it to add one more method

class Gelato
  def refreeze
    @solidity = 100
  end
end

dessert = Gelato.new
5.times { dessert.melt }
dessert.solidity
# => 50
dessert.refreeze
# => 100
```

Cú pháp ` class << object; end` là một cách khác để định nghĩa lại `singleton class` của đối tượng. Lợi ích của nó là bạn có thể định nghĩa các hằng số và nhiều phương thức cùng một lúc thay vì một phương thức một lần:
```
# Thay vì:
def momo.pounce
  "pounce!"
end

def momo.hiss
  "HISS"
end

def momo.lives
  9
end

# chúng ta có thể thực hiện:
class << momo
  def pounce
    "pounce!"
  end

  def hiss
    "HISS"
  end

  def lives
    9
  end
end

momo.singleton_methods
# => [:pounce, :hiss, :lives, :smolder]
```

Đây là một mô hình phổ biến khi thêm nhiều class methods cho 1 class, hãy xem ví dụ bên dưới:


```
class Pet
  class << self
    def random
      %w{cat dog bird fish banana}.sample
    end
  end
end

# Bởi vì "self" ở bên trong class ddax khai báo, 
# nghĩa là 'self == Pet', vì vậy, bạn cũng có thể gọi như sau:

class Pet
  class << Pet
    def random
      # ...
    end
  end
end
```
Có thể bạn đã từng nhìn thấy mô hình này và không biết nó là gì, hoặc có thể bạn biết nó dùng để thêm class method nhưng không biết tại sao. Giờ bạn đã biết về nó, tất cả là nhờ singleton class!


- `class << self , def self.method , def Pet.method`


Có một vài cách khác nhau để khai báo class method:

```
# 1. Trong global scope
def Pet.random
  %w{cat dog bird fish banana}.sample
end

# 2. Bên trong lớp định nghĩa, sử dụng 'self'
class Pet
  def self.random
    %w{cat dog bird fish banana}.sample
  end
end

# 3. Bên trong lớp định nghĩa, sử dụng <<
class Pet
  class << self
    def random
      %w{cat dog bird fish banana}.sample
    end
  end
end

# 4. Bên ngoài lớp định nghĩa, sử dụng <<
class << Pet
  def random
    %w{cat dog bird fish banana}.sample
  end
end
```

Vậy sự khác biệt giữa chúng là gì? Khi nào thì bạn nên sử dụng một trong số chúng?

Tin tốt là về cơ bản tất cả đều giống nhau. Bạn có thể sử dụng cái nào làm cho bạn cảm thấy dễ chịu nhất và phù hợp với phong cách codebase của bạn. Sự khác biệt duy nhất là cách #3 và cách nó xử lý các hằng số và scope.

```
MAX_PETS = 3

def Pet.outer_max_pets
  MAX_PETS
end

class Pet
  MAX_PETS = 1000

  class << self
    def inner_max_pets
      MAX_PETS
    end
  end
end

Pet.outer_max_pets
# => 3
Pet.inner_max_pets
# => 1000
```
Bạn có thấy hàm `inner_max_pets ` có thể truy cập vào scope bên trong class Pet và các hằng số của nó không? Đó là sự khác biệt duy nhất.

**Sử dụng `Extend` để sửa đổi Class đã tồn tại một cách an toàn**

Hy vọng rằng, bạn đã đọc một bài đăng hoặc có ai đó cảnh báo bạn về những nguy hiểm khi định nghĩa lại các class Ruby đã được xây dựng sẵn. Bạn thực sự nên thật cẩn thận trong trường hợp này và có thể thực hiện như bên dưới:

```
class String
  def verbify
    self + "ify"
  end
end

"banana".verbify
# => "bananaify"
```

Có một vài mối nguy hiểm có thể xảy ra: bạn có thể vô tình ghi đè các phương thức đã dựng sẵn, hoặc có các phương thức conflict với các thư viện khác trong cùng 1 project và làm cho mọi thứ không hoạt động giống như mong đợi. Từ khóa `extend ` có thể giúp ta giải quyết các vấn đề đó!


**Extend là gì?**

Từ khóa `extend` khá giống với `include`, cho phép bạn load các function vào class/module của bạn từ class/module khác. Sự khác biệt là `extend ` để các phương thức này trong singleton class của đối tượng.

```
module Wigglable
  def wiggle
    "*shimmy*"
  end
end

willy.extend(Wiggleable)
willy.singleton_methods
# => [:wiggle, :smolder]
```

Vì vậy, nếu bạn sử dụng `extend` trong 1 lớp thay vì `include`, các phương thức sẽ được thêm vào singleton class của lớp như các class method thay vì thêm vào chính lớp đó như các instance method.
```
module Hissy
  def hiss
    "HISS"
  end
end

class Reptile
  extend Hissy
end

snek = Reptile.new
snek.hiss
# => Error!  Undefined method hiss for 'snek'
Reptile.hiss
# => "HISS"
```

Vậy nó giúp gì cho chúng ta?

Hãy nói rằng bạn thực sự cần có 1 phương thức `verbify ` cho string mà bạn đang sử dụng. Trong khi bạn có thể tạo và sử dụng 1 lớp con của `String`, một lựa chọn khác là sử dụng `extend ` cho một string riêng biệt!

```
module Verby
  def verbify
    self + "ify"
  end
end

noun = "pup"
noun.extend(Verby)
noun.verbify
# => "pupify"
```

Như vậy, bạn đã thực sự biết về singleton  class, và giờ bạn có thể định nghĩa riêng cho mình 1 class với method của chính bạn!

Link nguồn: [Ruby Concepts - Singleton Classes](https://dev.to/rpalo/ruby-concepts---singleton-classes-oeb?utm_source=additional_box&utm_medium=internal&utm_campaign=regular&booster_org=)