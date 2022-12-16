## 1. Giới thiệu
Trong Rails bạn có thể thường xuyên làm việc với một số các class method như `has_many`, `belongs_to`,... những class method đó còn được gọi chung là `Macros`. Ví dụ:
```ruby
class Movie < ActiveRecord::Base
  has_many :reviews
end

class Project < ActiveRecord::Base
  has_many :tasks
end
```
Rất quen đúng không :D

Đối với những người bắt đầu sử dụng Rails (và Ruby) có thể khai báo các đoạn mã trên là do sự hỗ trợ của `Rails`. Nhưng sự thực ở đây là **không có sự hỗ trợ nào cả**, tất cả chỉ là mã code của `Ruby`, `Ruby` đã làm cho việc lập trình theo kiểu khai báo này dễ dàng hơn cho chúng ta.

Bài viết này sẽ giúp các bạn hiểu được **vì sao** lại có thể khai báo như vậy, qua đó giúp các bạn hiểu hơn về ngôn ngữ lập trình `Ruby`.
## 2. Làm rõ vấn đề. 
Để hiểu rõ đoạn code trên phần giới thiệu các bạn cần nắm rõ một số các khái niệm cơ bản trong `Ruby`.
### 2.1 Singleton Method của một Object

Dưới đây là một đối tượng `String`  và chúng ta gọi phương thức `upcase` được định nghĩa trong lớp `String`:
```
dog1 = "Rosco"

puts dog1.upcase  # => ROSCO
```
Tương tự, ta có thể gọi đến bất cứ `method` nào thuộc lớp `string` theo cách trên, tuy nhiên trong `ruby` ta còn cho phép ta có thể định nghĩa một `method` trên một `object` cụ thể.

Ví dụ:
```ruby
def dog1.hunt
  puts "WOOF!"
end

dog1.hunt  # => WOOF!
```
Đối tượng `dog1` gọi tới phương thức `hunt`, và kết quả là `WOOF!`

Ta thử gọi phương thức `hunt` tứ một đối tượng khác:

```
dog2 = "Snoopy"
dog2.hunt  # => undefined method `hunt`
```
Việc gọi hunt trên đối tượng dog2 là không thế.

Suy ra, **singleton method** `là method chỉ được định nghĩa cho 1 object cụ thể.`

Như vậy là các bạn đã hiểu về **singleton method**, và đây cũng là một hàm cơ bản để xây dựng lên các class method như `has-many` đó :D.
### 2.2 Class cũng là Object
Đây là một class `Movie`
```ruby
class Movie
end
```
Trong Ruby, class cũng là object.
```ruby
p Movie.class  # => Class
```
Tất nhiên, ta cũng có thể xem object_id của 1 class"
```ruby
p Movie.class.object_id # => 70233956488680
```
Thực tế thì tên của class `Movie` là một `constant` và nó tham chiếu đến `object class`.
### 2.3 Singleton Method của Class
Như đã nói mỗi `class` trong  `Ruby` là một object, vậy thì ta có thể làm bất cứ thứ gì với chúng như với một object thông thường vầy. Ví dụ, ta có thể định nghĩa một `singleton method` cho `object class` mà được reference qua `Movie`, ví dụ:
```ruby
movie_class = Movie

def movie_class.my_class_method
  puts "Running class method..."
end
```
`my_class_method` ở đây sẽ là một `singleton method` định nghĩa cho object `Movie`.
```ruby
movie_class.my_class_method   # => "Running class method..."
```
Vì vậy, về cơ bản, điều đó giống như những gì chúng ta đã làm với đối tượng `dog1` trước đó. Trong trường hợp này, ta định nghĩa một `singleton method` cho `object Class`.

Để cho đoạn code trên trở nên ngắn gọn hơn ta có thể viết lại như sau:
```ruby
class Movie
  def Movie.my_class_method
    puts "Running class method..."
  end
end
```
Nhìn quen thuộc hơn rồi đúng không?

Từ nhưng điều trên ta thấy : `class method thực chất chỉ là một singleton method được định nghĩa cho object class.`

### 2.4 Các class cũng là các mã thực thi.
Thêm một điểu chúng ta cần phải hiểu là `class definitions are executable code` , theo dõi đoạn code dưới đây:
```ruby
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

Và kết quả là: 
```
Before class definition
Inside class definition
After class definition
Running class method...
```
Theo dõi kết quả thì chúng ta thấy code có thể thực thi ngay trong quá trình định nghĩa `class`. Hơn thế nữa ta cũng có thể thực thi nó trong cả quá trình định nghĩa method luôn :D

Ví dụ:
```ruby
puts "Before class definition"

class Movie
  puts "Inside class definition"

  def Movie.my_class_method
    puts "Running class method..."
  end

  Movie.my_class_method
end

puts "After class definition"
```
Kết quả: 
```
Before class definition
Inside class definition
Running class method...
After class definition
```
Tuy nhiên Ruby sẽ gán biến self tới class object đang được định nghĩa đó nên ta có thể sử dụng cách sau:
```ruby
puts "Inside class definition of #{self}"
```
Và kết quả là:
```
Before class definition
Inside class definition of Movie
Running class method...
After class definition
```
`self` ở đây được gán cho class object hiện tại đang được định nghĩa, trong trường hợp này là class object `Movie`.

Ta có thể sửa lại đoạn code trên như sau:

```ruby
def self.my_class_method
  puts "Running class method..."
end

self.my_class_method
```

Đến đây thì self.my_class_method bắt đầu nhìn giống với hàm has_many , ngoài việc nó thừa ra từ `self`!

Nhưng ta cũng có thể bỏ luôn `self` vì trong trường hợp này Ruby sẽ có thể tự ngầm hiểu `self` là receiver.
```
my_class_method
```
Oke, bây giờ chúng ta thực hiện thay đổi tên phương thức thành `has_many` xem nó có hoạt động tốt không nhé :D
```ruby
class Movie
  def self.has_many(name)
    puts "#{self} has many #{name}"
  end

  has_many :reviews
end
```
Chú ý rằng `has_many` nhận `name` là một đối số của nó, vì vậy việc gọi `has_many :reviews` sẽ truyền `:reviews` như là đối số cho `has_many`
Và kết quả nó vẫn hoạt động.
```
Movie has many reviews
```
### 2.5 Define Method
Oke, vậy là phương thức `has_many` đã được xây dựng, tuy nhiên như chúng ta biết trong `Rails` hàm `has_many` có tác dụng khởi tạo một `assocation` kèm theo các method phụ trợ đi kèm với nó.
Ví dụ, ta có thể khởi tạo method `reviews` mà sẽ trả về các `review` được kết nối tới `Movie`:
```
movie = Movie.new
movie.reviews # => undefined method
```
Nếu là trong Rails, hàm này sẽ trả về mảng các `review` có kết nối tới `movie`.
Ở đây ta sẽ làm như thế này:
```ruby
def self.has_many(name)
  puts "#{self} has many #{name}"

  def reviews
    puts "SELECT * FROM reviews WHERE..."
    puts "Returning reviews..."
    []
  end
end
```
Tuy nhiên nếu làm như thế thế thì ta không thể thêm các association khác, ví dụ như genres chẳng hạn.

Vì thế ta cần phải định nghĩa **dynamically** một method cho mỗi association: trong trường hợp này là một method mang tên `reviews` và một mang tên `genres`. Ta sẽ không biết được tên chính xác của chúng cho tới  khi class được định nghĩa.

Để thực hiện được điều này, ta có thể dùng `define_method`:
```ruby
def self.has_many(name)
  puts "#{self} has many #{name}"

  define_method(name) do
    puts "SELECT * FROM #{name} WHERE..."
    puts "Returning #{name}..."
    []
  end
end
```
`define_method` nhận đối số là tên của method sẽ được khởi tạo, cùng với một block mà sẽ là body của method đó. `define_method` luôn định nghĩa instance method trong receiver, trong trường hợp này là object `Movie`. Vì vậy đến cuối cùng ta sẽ nhận được instance method `reviews` cho class `Movie`.
Chạy tử chương trình ta có method `reviews` đã được định nghĩa:
```
Movie has many reviews
SELECT * FROM reviews WHERE...
Returning reviews..
```
Oke bây giờ ta có thể gọi phương thức `has_many` bao nhiêu lần tùy thích.
```ruby
class Movie < ActiveRecord::Base
  has_many :reviews
  has_many :genres
end

movie.reviews
movie.genres
```
Hiện tại thì `has_many` chỉ dành cho `Movie` mà thôi. Nhưng trong rails `has_many` có thể dùng được cho nhiều class. Và ta có thể thực hiện điều đó bằng kế thừa.
###  2.6 Class Method Inheritance
Để share has_many sử dụng kế thừa, trước tiên chúng ta sẽ định nghĩa nó trong class `Base`, bên trong là một module có tên là  `ActiveRecord`(để nó giống với Rails).
```ruby
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
Sau đó, class `Movie` có thể kế thừa từ lớp `ActiveRecord :: Base`
```ruby
class Movie < ActiveRecord::Base
  has_many :reviews
  has_many :genres
end
```
Và mọi thứ hoạt động:
```
Movie has many reviews
Movie has many genres
SELECT * FROM reviews WHERE...
Returning reviews...
SELECT * FROM genres WHERE...
Returning genres...
```
Lưu ý: giá trị của `self` ở đây là `Movie` class nhé.
Bây giờ khi chúng ta kế thừa từ `ActiveRecord::Base` thì bất cứ class nào cũng có thể sử dụng `has_many` method.
Ví dụ: ta có một class `Project`
```ruby 
class Project < ActiveRecord::Base
  has_many :tasks
end

project = Project.new
project.tasks
```
Kết qủa là: 
```
Project has many tasks
SELECT * FROM tasks WHERE...
Returning tasks...
```
##  3. Tổng kết
Vậy là ta đã kết thúc bài viết ở đây với việc implement thành công method `has_many` mà ta muốn.
```ruby
class Movie < ActiveRecord::Base
  has_many :reviews
  has_many :genres
end

class Project < ActiveRecord::Base
  has_many :tasks
end
```
Thông qua bài viết này hi vọng các bạn đang bắt đầu với `Ruby on Rails` có thêm các kiến thức liên quan `Macros` để thực hiện tốt các dự án trong tương lai :D.
Cảm ơn!

Nguồn dịch: https://pragmaticstudio.com/tutorials/ruby-macros