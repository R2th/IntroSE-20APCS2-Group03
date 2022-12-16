Trong Rails, bạn có thể để ý là mình đã dùng qua các class method như `has_many`, `belongs_to`, và một vài hàm khác tương tự nữa. 

```
class Movie < ActiveRecord::Base
  has_many :reviews
end
```

Những người mới tiếp xúc với Rails (và Ruby) thường cho rằng những khai báo như thế này là một phần "magic" của Rails. 

Thực ra, không có gì *magic* ở đây cả - đây chỉ là Ruby code mà thôi. Những hàm này - trong Ruby - thực chất có hẳn một tên gọi riêng cho chúng: Macros. 

Thậm chí, trong Ruby thì việc khai báo theo stype như thế này dễ hơn bạn nghĩ đấy ! Và một khi bạn hiểu được cách nó làm việc, bạn sẽ trở nên tự tin hơn với Rails và thể tự tin sử dụng công cụ rất mạnh mẽ này trong code của mình.

Giờ, hãy thử tự viết một phiên bản đơn giản của dòng code trên - từ đầu - dựa trên những nguyên lý cơ bản của nó !

## Singleton Method của một Object

Đây là một object `String` đơn thuần, và khi ta gọi method `upcase` được định nghĩa trong class `String`:

```
dog1 = 'Rosco'
p dog.updase    # => ROSCO
```

Ta có thể gọi bất kì một method nào trong `String` cũng theo cách trên; nhưng ngoài ra, thậm chí Ruby còn cho phép ta định nghĩa method trên một object *cụ thể* nữa. Lấy ví dụ, ở đây ta có thể định nghĩa method `hunt` trên đối tượng `dog1`:

```
def dog1.hunt
  p 'WOOF!"
end

dog1.hunt # => WOOF!
```

Giờ, ta gọi `hunt` trên `dog1`, nó in ra "WOOF!". 

Hiển nhiên, việc gọi `hunt` trên một đối tượng khác - `dog2` chẳng hạn - là không thể:

```
dog2 = 'Snoopy'
dog2.hunt   # => undefined method `hunt`
```

Method `hunt` chỉ được định nghĩa cho đối tượng `dog1`. Bạn sẽ thường xuyên nghe đến khái niệm này như là *singleton method* - method chỉ được định nghĩa cho **1** object cụ thể mà thôi.

Nghe hay đấy, nhưng tại sao ta lại cần đến cái này ? Hóa ra, singleton method được sử dụng rất nhiều trong Ruby! Và ta cũng sẽ cần đến nó để tự tạo cho mình một hàm `has_many` đấy.

## Class cũng là Object

Khái niệm này thì chắc các bạn coder Ruby cũng đã nghe đến nhiều hơn rồi đúng không ?

Đây là một class `Movie`:

```
class Movie
end
```

Trong Ruby, class cũng là object !

```
p Movie.class # => Class
```

Class của class `Movie` là `Class` :thinking: Tất nhiên, ta cũng có thể xem object id của 1 class là cái gì:
```
p Movie.class.object_id # => 70233956488680
```

`Movie` là một *constant* reference tới object `Class`

Vậy tóm lại: class trong Ruby là object, và mỗi một Ruby class là một object của class `Class`.

## Singleton Method của Class

Ok, và nếu mỗi class Ruby là một object, vậy thì ta có thể làm bất cứ thứ gì với chúng như với một object thông thường vầy. Ví dụ, ta có thể định nghĩa một singleton method cho object  `Class` mà được reference qua `Movie` ở trên:

```
movie_class = Movie

def movie_class.my_class_method
  p "Running class method ..."
end
```

`my_class_method` ở đây sẽ là một singleton method định nghĩa cho object `Movie` class. Để gọi được nó, receiver của lời gọi sẽ là object `Movie` class.

```
movie_class.my_class_method  # => "Running class method ..."
```

Tức là về cơ bản - việc ta vừa làm là tương tự như đối với `dog` mở trên. Trong trường hợp này, ta định nghĩa một *singleton method* cho object `Class`.

Để cho gọn hơn, ta có thể không cần dùng đến biến tạm thời `movie_class` khi mà thực chất nó chỉ là reference tới object `Movie`. 

```
def Movie.my_class_method
  p "Running class method ..."
end

Movie.my_class_method  # => "Running class method ..."
```

Trong thực tế, ta thường để hàm trên vào thẳng trong body của class:

```
class Movie
  def Movie.my_class_method
    puts "Running class method..."
  end
end
```

Nhìn quen thuộc chứ ?

Giờ thì bạn đã biết thêm một nguyên lý nữa về Ruby - khái niệm về *class method*:

> Trong ruby , *class method* thực chất chỉ là một *singleton method* được định nghĩa cho object class.

Ok, tuy nhiên đoạn code trên nhìn vẫn chưa có gì giống với hàm `has_many` của chúng ta cả ?

## Class definition cũng là các đoạn code *executabe*

Nguyên lý thứ hai: **class definition là các đoạn code có-thể-thực-thi** (dịch ra nghe không dễ hiểu cho lắm ? :thinking: ). Nhìn đoạn code dưới đây có lẽ sẽ dễ hiểu hơn.

```
puts "Before class definition"

class Movie
  puts "Inside class definition"

  def Movie.my_class_method
    puts "Running class method..."
  end
end

puts "After class definition"

Movie.my_class_method
```

Chạy thử đoạn trên, ta sẽ có được:

```
Before class definition
Inside class definition
After class definition
Running class method...
```

Nhìn 4 dòng output được in ra, bạn có nhận thấy dòng nào đặc biệt nhất không ? 

`Inside class definition` => Như vậy là *code được thực thi ngay trong* quá trình định nghĩa một class. Thực ra, ta có thể chạy method `my_class_method` **ngay bên trong** class definition của `Movie`:

```
puts "Before class definition"

class Movie
  puts "Inside class definition"

  def Movie.my_class_method
    puts "Running class method..."
  end

  Movie.my_class_method  # Chạy method này ngay cả khi class vẫn đang được khai báo.
end

puts "After class definition"
```

Sẽ cho ta kết quả dưới đây:

```
Before class definition
Inside class definition
Running class method...
After class definition
```

Như vậy là method `my_class_method` có thể được gọi ngay cả khi class vẫn đang trong quá trình khai báo !

Nhìn lại một chút, có vẻ việc gọi thông qua constant `Movie` nhìn hơi thừa thãi. Hóa ra, bên trong khai báo của class, Ruby sẽ gán biến `self` tới class object đang được định nghĩa đó. Hãy thử thay đổi một chút với lời gọi in ra thứ 2 trong ví dụ trên này như sau:

```
  p "Inside class definition of #{self}"
```

Ta nhận được 

```
Before class definition
Inside class definition of Movie
Running class method...
After class definition
```

Tức là `self` ở đây được gán cho class object hiện tại đang được định nghĩa, trong trường hợp này là class object `Movie`.

Tức là ta có thể viết lại như sau:

```
def self.my_class_method
  puts "Running class method..."
end

self.my_class_method
```

Đến đoạn này thì `self.my_class_method` bắt đầu nhìn giống giống với hàm `has_many` mà chúng ta muốn rồi đấy, ngoài việc nó thừa ra từ `self`! 

Trong bối cảnh này, `self` ở đây sẽ đóng vai trò receiver của lời gọi `my_class_method`. Tuy nhiên, nếu như không có một receiver cụ thể nào được nhắc tới, Ruby sẽ có thể tự ngầm hiểu `self` là receiver. Vậy là thành ra ta cũng có thể bỏ luôn nốt `self` đi:

```
my_class_method
```

### Đổi tên

Như vậy là nó đã giống với thứ mà chúng ta muốn rồi đấy. Giờ thì đổi tên lại cho đúng xem thế nào:

```
class Movie
  def self.has_many(name)
    puts "#{self} has many #{name}"
  end
  
  has_many :reviews
end
```

Chú ý rằng `has_many` nhận `name` là một argument của nó, vì vậy việc gọi `has_many :reviews` sẽ truyền `:reviews` như là argument cho `has_many`

Nếu chạy nó, ta sẽ nhận được:

```
Movie has many reviews
```

Chú ý lại một lần nữa: giá trị của `self` ở đây chính là class object `Movie`.

## Định nghĩa method

Ok, vậy là hàm `has_many` đã được gọi trong class definition, vậy thì giờ ta nên làm gì bên trong method này đây ? Trong Rails, hàm `has_many` có tác dụng khởi tạo một assocation kèm theo một đống method phụ trợ đi kèm với nó.

Ví dụ, ta có thể khởi tạo method `reviews` mà sẽ trả về các `review` được kết nối tới `movie`:

```
movie = Movie.new
movie.reviews # => undefined method
```

Nếu là trong Rails, hàm này sẽ trả về mảng các review có kết nối tới movie. Nhưng ở đây thì ta chưa có cái đó :)

Ta có thể hard-code như thế này:

```
def self.has_many(name)
  puts "#{self} has many #{name}"

  def reviews
    puts "SELECT * FROM reviews WHERE..."
    puts "Returning reviews..."
    []
  end
end
```

Nhưng, hard-code kiểu trên thì sẽ lại không hoạt động nếu ta có thêm association khác, ví dụ như `genres` chẳng hạn:

```
has_many :reviews
has_many :genres
```

Để làm cho nó chạy, ta cần phải định nghĩa **dynamically** một method cho mỗi association: trong trường hợp này là một method mang tên `reviews` và một mang tên `genres`. Ta sẽ không biết được tên chính xác của chúng cho tới runtime - tới khi class được định nghĩa.

Để thực hiện được điều này, ta có thể dùng `define_method`:

```
def self.has_many(name)
  puts "#{self} has many #{name}"

  define_method(name) do
    puts "SELECT * FROM #{name} WHERE..."
    puts "Returning #{name}..."
    []
  end
end

```

`define_method` nhận argument là tên của method sẽ được khởi tạo, cùng với một block mà sẽ là body của method đó. Chú ý, `define_method` luôn luôn định nghĩa **instance method** trong receiver, trong trường hợp này là object `Movie`. Vì vậy đến cuối cùng ta sẽ nhận được *instance method* `reviews`  cho class `Movie`.

Giờ nếu ta chạy thử, ta có thể thấy method `reviews` được định nghĩa:

```
Movie has many reviews
SELECT * FROM reviews WHERE...
Returning reviews...
```

Và bởi vì ta định nghĩa method `has_many` *dynamically*, ta có thể gọi nó bao nhiêu lần tùy thích:

```
class Movie < ActiveRecord::Base
  has_many :reviews
  has_many :genres
end

movie.reviews
movie.genres
```

Hai method được định nghĩa, và ta có thể gọi cả hai:

```
Movie has many reviews
Movie has many genres
SELECT * FROM reviews WHERE...
Returning reviews...
SELECT * FROM genres WHERE...
Returning genres...
```

Khá là hay rồi ! Tuy nhiên, hiện giờ thì `has_many` chỉ dành cho `Movie` mà thôi. Thứ ta muốn ở đây là `has_many` có thể dùng được cho nhiều class. Và ta có thể thực hiện điều đó bằng kế thừa.

## Kế thừa class method

Để share `has_many` sử dụng kế thừa, đầu tiên ta sẽ định nghĩa nó trong một class - tạm gọi là `Base` đi - bên trong một module tên là `ActiveRecord` chẳng hạn (bạn có thấy quen quen không ^^)

```
module ActiveRecord
  class Base
    def self.has_many(name)
      puts "#{self} has many #{name}"
      define_method(name) do
        puts "SELECT * FROM #{name}..."
        puts "Returning #{name}..."
      end
    end
  end
end
```

Giờ, nếu `Movie` mà kế thừa từ `ActiveRecord::Base`  (bỏ cái đoạn định nghĩa `has_many` ở trên khỏi `Movie` đi):

```
class Movie < ActiveRecord::Base
  has_many :reviews
  has_many :genres
end
```

Lại chú ý một lần nữa: `self` ở đây sẽ là `Movie` chứ không phải `Base` !

```
Movie has many reviews
Movie has many genres
SELECT * FROM reviews WHERE...
Returning reviews...
SELECT * FROM genres WHERE...
Returning genres...
```

Tương tự vậy, ta có thể định nghĩa một class `Project` khác. 

```
class Project < ActiveRecord::Base
  has_many :tasks
end

project = Project.new
project.tasks
```

Và trong trường hợp này `self` sẽ mang giá trị là `Project`

```
Project has many tasks
SELECT * FROM tasks WHERE...
Returning tasks...
```

## Kết luận

Vậy là ta đã kết thúc bài viết ở đây với việc implement thành công method `has_many` mà ta muốn:

```
class Movie < ActiveRecord::Base
  has_many :reviews
  has_many :genres
end

class Project < ActiveRecord::Base
  has_many :tasks
end
```

Rails cung cấp rất, rất nhiều *đồ chơi* cho bạn - sẽ có nhiều thứ mà được coi như là *magic* của Rails vậy; nhưng hi vọng rằng, thông qua bài viết này, bạn có thể hiểu được thêm về bản chất của một vài trong số chúng.

## Nguồn dịch

https://pragmaticstudio.com/tutorials/ruby-macros