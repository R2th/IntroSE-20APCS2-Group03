## Giới thiệu

Trong Rails, chúng ta sử dụng các khai báo cấp class như ```has_many```, ```belongs_to```, chúng được gọi là các **macros**. Ví dụ:

```
class Movie < ActiveRecord::Base
  has_many :reviews
end

class Project < ActiveRecord::Base
  has_many :tasks
end
```

Nhìn quen nhỉ, vì chúng ta sử dụng cái này nhiều mà. :v 

Lúc mới sử dụng Rails, tôi nghĩ rằng đây là một điều gì đó vi diệu của nó. Nhưng bây giờ, tôi và bạn có thể tạo ra các macro kiểu này dễ dàng bởi chúng thực sự chỉ là code Ruby.

Trong bài này, chúng ta sẽ cùng tạo lại một phiên bản rút gọn của has\_many từ đầu, để bạn có thể hiểu cách làm việc của nó, và cách áp dụng kĩ thuật mạnh mẽ này khi bạn xây dựng các ứng dụng Rails.

Bây giờ chúng ta sẽ tìm hiểu về các nguyên tắc và kiến thức cơ bản nhé!

## Singleton methods trên một object

Đây là một object kiểu **String**, và chúng ta gọi method ```upcase``` được định nghĩa sẵn trong **String** class.

```
dog1 = "Rosco"
puts dog1.upcase # => ROSCO
```
Và tất nhiên, nó in ra tên con chó đã được in hoa "ROSCO".

Chúng ta có thể gọi bất kỳ method nào trong class String, nhưng Ruby cũng cho phép chúng ta định nghĩa các methods trên một object cụ thể. Ví dụ, chúng ta sẽ định nghĩa một method ```hunt``` cho object ```dog1```.
```
def dog1.hunt
  puts "hunting ..."
end

dog1.hunt # => hunting ...
```
Và khi chúng ta gọi method ```hunt``` trên object ```dog1```, chương trình in ra ```hunting ...```

OK, bây giờ khai báo một object String khác:
```
dog2 = "Snoopy"
dog2.hunt # => undefined method `hunt`
```
Ồ, dog2 không có method ```hunt```. Method ```hunt``` chỉ được khai báo trên object ```dog1```. Điều này được gọi là **singleton method** bởi vì, ```hunt``` method chỉ được định nghĩa trên một object: trong trường hợp này là ```dog1```.

Điều đó thật thú vị, và bạn cần hiểu về nó để có thể triển khai ```has_many```.

## Các class cũng là object

Đây là ```Movie``` class
```
class Movie
end
```
Trong Ruby, các **class** cũng là các **object**. Chúng ta có thể kiểm tra class của Movie:
```
puts Movie.class  # => Class
```
class của Movie là Class. Và Class cũng chính là một object, chúng ta có thể kiểm tra object id bằng cách:
```
puts Movie.class.object_id # => 70233956488680
```

Có một điều thú vị cần lưu ý. Movie là một constant (hằng số) tham chiếu đến một object của Class.

Vì vậy, các class trong Ruby (vd: Movie, Car, Student) cũng là các object. Và bất kỳ Ruby class nào cũng là một object của class Class.

## Singleton methods trên một Class

Vậy nếu như các class trong Ruby thực sự là một Object, chúng ta có thể coi nó như mọi object khác. Ví dụ, chúng ta cũng có thể định nghĩa một singleton method cho object của Class được tham chiếu bởi Movie constant.
```
object_of_class = Movie

def object_of_class.my_method
  puts "my method ..."
end
```

```my_method``` chỉ là một singleton method và chỉ được định nghĩa trên Movie (là object của class Class). Để gọi method đó, ta sẽ dùng object Movie để gọi.
```
object_of_class.my_method # => my method ...
# hoặc
Movie.my_method # => my method ...
```

Về cơ bản, chúng ta vừa làm điều tương tự như khi định nghĩa và gọi singleton method trên object ```dog1``` trước đó. Trong trường hợp này, ta đã định nghĩa singleton method trên object của class Class.

Để rút gọn đoạn code định nghĩa singleton method ở ví dụ trên, chúng ta có thể bỏ đi biến ```object_of_class``` vì nó chỉ là một tham chiếu đến Movie. Đây là đoạn mã không sử dụng ```object_of_class```:
```
def Movie.my_method
  puts "Running method..."
end

Movie.my_method # => "Running method..."
```

Và chúng vẫn hoạt động y như vậy!

Để làm đoạn mã trông truyền thống hơn, chúng ta có thể chuyển định nghĩa method vào bên trong khai báo class như thế này.
```
class Movie
  def Movie.my_method
    puts "Running method..."
  end
end

Movie.my_method
```

Đoạn code này vẫn hoạt động tốt và kết quả vẫn giống như ban đầu. 

Qua điều này, chúng ta rút ra được rằng: Trong Ruby, không có thứ gì gọi là "class method". ```my_method``` chỉ là một singleton method được định nghĩa trong Movie class.

Đây là nguyên tắc đầu tiên, tuy nhiên điều này vẫn chưa giống với khai báo ```has_many```.

## Các khai báo class là mã thực thi

Nguyên tắc thứ 2 đó là, các định nghĩa class là mã thực thi. Chúng ta có thể kiểm chứng bằng cách thêm vài câu lệnh ```puts```:
```
puts "Before class definition"

class Movie
  puts "Inside class definition"

  def Movie.my_method
    puts "Running method..."
  end
end

puts "After class definition"

Movie.my_method
```

Sau khi chúng ta chạy nó, chương trình in ra như sau:

```
Before class definition
Inside class definition
After class definition
Running method...
```

Như vậy, code đã được thực thi trong lúc chúng ta định nghĩa class. Nếu điều này xảy ra, chúng ta cũng có thể chạy method ```my_method``` bên trong định nghĩa class Movie.
```
puts "Before class definition"

class Movie
  puts "Inside class definition"

  def Movie.my_method
    puts "Running method..."
  end

  Movie.my_method  # run the method as the class is being defined
end

puts "After class definition"
```

Sau đó, chúng ta chạy lại code và nhận được kết quả sau:
```
Before class definition
Inside class definition
Running method...
After class definition
```

Thật tuyệt, ```my_method``` của chúng ta được gọi trong khi Movie class đang được định nghĩa.

Nhưng, hằng số Movie (Movie constant) có vẻ đang bị lặp lại. Hóa ra, trong khi class được định nghĩa, Ruby gán class object được định nghĩa cho biến ```self``` (trong trường hợp này là Movie). Hãy thử in ra giá trị của ```self``` trong khi class đang được định nghĩa.

```
puts "Inside class definition of #{self}"
```

Chương trình sẽ in ra:
```
Before class definition
Inside class definition of Movie
Running method...
After class definition
```
Vì vậy, điều này chứng tỏ rằng ```self``` là ```Class``` object hiện tại đang được định nghĩa. Đó là Movie trong trường hợp này.

Chúng ta có thể thay thế Movie bằng biến ```self``` trong ví dụ trước và chạy lại code.

```
def self.my_method
  puts "Running method..."
end

self.my_method
```

Code này hoạt động tương tự như khi dùng constant Movie.

Bây giờ, dòng ```self.my_method``` bắt đầu trông giống như ```has_many``` mà chúng ta muốn, ngoại trừ phần ```self```. Trong bối cảnh này, ```self``` là người nhận cuộc gọi method ```my_method```. Nếu không có người nhận rõ ràng, Ruby sẽ ngầm định sử dụng ```self``` làm người nhận.

Chúng ta có thể bỏ ```self``` trong ```self.my_method``` và viết lại thành **```my_method```**. Và code vẫn hoạt động tốt.

## Đổi tên

Chúng ta đang đến rất gần với kiểu khai báo mà chúng ta muốn. Hãy rút gọn code, bỏ các lệnh ```puts``` thừa và đổi tên method thành ```has_many``` để trông quen thuộc hơn.
```
class Movie
  def self.has_many(name)
    puts "#{self} has many #{name}"
  end

  has_many :reviews
end
```

Method ```has_many``` nhận vào một đối số ```name```.  Vì vậy, khi gọi ```has_many``` ta truyền vào ```:reviews``` như một đối số.

```
# Đoạn code sẽ in ra
Movie has many reviews
```
Để ý rằng, ```self``` chính là ```Movie``` class object.

## Định nghĩa method

OK, bây giờ ```has_many``` được gọi trong khi class được định nghĩa. Trong Rails, has_many sẽ tự động tạo ra một số method để quản lý, làm việc với association.

Ví dụ, trong trường hợp này, nó sẽ tạo ra một method ```reviews``` để trả về các reviews liên quan đến một Movie cụ thể. Chúng ta gọi method đó như thế này:
```
movie = Movie.new
movie.reviews # => undefined method
```

Nếu mã này được viết với Rails, ```movie.reviews``` sẽ trả về một mảng reviews liên quan đến ```movie```.

Nhưng nếu cố chạy nó, ta sẽ nhận được một lỗi "undefined method" bởi vì không có method ```reviews``` được định nghĩa trên đối tượng ```movie```. Chúng ta có thể định nghĩa method này.
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

Nhưng hard-code tên method sẽ không hoạt động nếu chúng ta khai báo một association khác, ví dụ khai báo ```genres``` association:
```
has_many :reviews
has_many :genres
```

Để làm code hoạt động, chúng ta cần định nghĩa linh hoạt một method cho mỗi khai báo association: trong trường hợp này là một method ```reviews``` và một method ```genres```. Và chúng ta không biết tên của các method đó cho đến lúc runtime, lúc mà class đang được định nghĩa. Vì vậy, chúng ta cần định nghĩa các method ấy một cách linh hoạt, nhanh chóng.

Hãy bắt đầu với ```reviews``` method.
```
has_many :reviews
```

Để làm điều đó, chúng ta có thể sử dụng ```define_method```.
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

Method ```define_method``` nhận vào 1 đối số là tên của method bạn muốn định nghĩa, và phần thân của block sẽ trở thành phần thân của method được định nghĩa đó. ```define_method``` luôn định nghĩa một instance method, vì vậy code này sẽ tạo ra một instance method cho mỗi khai báo association: trong trường hợp này là khai báo ```has_many :reviews```.

Bây giờ khi chạy code, chúng ta thấy method ```reviews``` đã được định nghĩa bởi vì chương trình in ra nội dung khi method được gọi.
```
Movie has many reviews
SELECT * FROM reviews WHERE...
Returning reviews...
```
Chúng ta cũng có thể gọi method nhiều lần.
```
movie.reviews
movie.reviews
```
Bây giờ chúng ta có thể khai báo nhiều association, bởi vì chúng ta đã định nghĩa ```has_many``` một cách linh hoạt.
```
class Movie < ActiveRecord::Base
  has_many :reviews
  has_many :genres
end

movie.reviews
movie.genres
```

Bây giờ, 2 method ```reviews``` và ```genres``` sẽ được định nghĩa trong lúc class được định nghĩa, và chúng ta có thể gọi các methods:
```
Movie has many reviews
Movie has many genres
SELECT * FROM reviews WHERE...
Returning reviews...
SELECT * FROM genres WHERE...
Returning genres...
```

Giờ thì, method ```has_many``` đã tự động định nghĩa các method thông qua tên của các association!

Điều này quá tuyệt, nhưng bây giờ nó chỉ hoạt động trên class Movie. Nếu muốn sử dụng ```has_many``` trên nhiều class thì làm thế nào, phần sau chúng ta sẽ nói về điều đó. 

## Kế thừa class method

Để chia sẻ ```has_many``` method, chúng ta sử dụng kế thừa. Đầu tiên, chúng ta sẽ định nghĩa nó trong class có tên là Base bên trong một module tên ActiveRecord (chỉ để nó giống với Rails).
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

Sau đó, ```Movie``` class có thể kế thừa từ ```ActiveRecord::Base``` class.
```
class Movie < ActiveRecord::Base
  has_many :reviews
  has_many :genres
end
```

Và mọi thứ hoạt động như mong đợi.
```
Movie has many reviews
Movie has many genres
SELECT * FROM reviews WHERE...
Returning reviews...
SELECT * FROM genres WHERE...
Returning genres...
```

Lưu ý rằng, giá trị của ```self``` là ```Movie``` class.

Vì đang sử dụng kế thừa, chúng ta có thể định nghĩa một subclass ```Project``` có nhiều tasks.
```
class Project < ActiveRecord::Base
  has_many :tasks
end

project = Project.new
project.tasks
```

Và khi chạy code này, kết quả là:
```
Project has many tasks
SELECT * FROM tasks WHERE...
Returning tasks...
```

Giá trị của ```self``` là Project class.

## Tổng kết

Kết thúc bài viết này, chúng ta đã triển khai xong tính năng ```has_many``` như trong Rails. Chúng ta có thể sử dụng với nhiều khai báo class:
```
class Movie < ActiveRecord::Base
  has_many :reviews
  has_many :genres
end

class Project < ActiveRecord::Base
  has_many :tasks
end
```

Rails còn thực hiện nhiều xử lý khác trong ```has_many```, nhưng hy vọng điều này đã làm sáng tỏ cách khai báo cấp độ class trong Rails, đôi khi gọi là macros.

Hãy nhớ rằng: chẳng có gì bí ẩn hay đặc biệt ở đây, chúng chỉ là những đoạn code Ruby thông thường!

## Tài liệu tham khảo

[https://pragmaticstudio.com/tutorials/ruby-macros](https://pragmaticstudio.com/tutorials/ruby-macros)

[https://ruby-doc.org/core-2.2.0/Class.html](https://ruby-doc.org/core-2.2.0/Class.html)

Bài này dài quá, cảm ơn bạn đã chăm chỉ đọc đến đây! Nếu có sai sót hay cần góp ý bổ sung, bạn hãy comment phía dưới giúp mình nhé. Cảm ơn rất nhiều và chúc bạn code vui vẻ ^_^.

**Write the code as a pleasure. Happy coding!**