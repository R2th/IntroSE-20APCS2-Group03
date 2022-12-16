Khi làm việc với Rails, ắt hẳn bạn cũng sẽ thường xuyên gặp các khai báo rất kỳ lạ như has_many, belongs_to, hay validates, scope. Ví dụ:
```
class Company < ApplicationRecord
     has_many :projects
 end
```

```
class Book < ApplicationRecord
    belongs_to :author
 end
```

Lúc mới nhìn vào, hẳn các bạn cũng sẽ thấy rất ảo diệu phải không nào. Nhưng thực ra nó cũng đơn thuần chỉ là Ruby code mà thôi, chúng có tên gọi là "macro", nó giúp cho code của bạn trở nên dễ hiểu hơn, cũng như trông giống ngôn ngữ tự nhiên hơn như chính mục tiêu và ruby hướng tới. Và một khi bạn hiểu rõ về chúng, bạn hoàn toàn có thể tự tin để tận dụng hết sức mạnh của ngôn ngữ này (y)

Giờ hãy cùng nhau thử viết một ví dụ đơn giản, một phiên bản khác của các dòng code trên dựa trên những nguyên lí cơ bản của macro nhé

### 1. Singleton method
Cho một object `String` sau:
`dog = "Snoopy"`
Ta gọi hàm upcase được định nghĩa sẵn trong class `String`
`puts dog.upcase`
Dễ thấy kết quả là in lên màn hình:
"SNOOPY"

Tuy nhiên, ở một khía cạnh khác, Ruby còn cho phép ta định nghĩa các method dành riêng cho mỗi object cụ thể. Ví dụ, mình định nghĩa một method `speak` cho object `dog`:
```
def dog.speak
    puts "meo meo"
end
```

Ta gọi thử hàm trên:
`dog.speak *# => "meo meo"`*

Ở một diễn biến khác, ta có object String `cat = "Kitty"`
Ta cho con mều này speak thử nhé:
`cat.speak *# => undefined method 'speak'*`

Ế ồ
Còn mều này kêu không được nhé. Bởi tiếng kêu chỉ được define cho riêng mình dog thôi và chỉ duy nhất nó được gọi hàm này. Chúng ta gọi đó là *singleton method*

### 2. Class cũng là Object
Ta có class `Book` sau
```
class Book
end
```
Trong Ruby, class cũng là object, cùng xem class của `Book` là gì
```
puts Book.class # => "Class"
```
Vậy class của Book là Class, và bản thân Class cũng là một object, xem thử `object_id` của Class
```
puts Book.class.object_id => 75068800
```

Và cần lưu ý, Book là một constant tham chiếu đến một object của lớp Class
Vậy nên, class trong ruby là object, và tất cả các Ruby class có sẵn đều cũng là object của lớp Class

### 3. Singleton method của Class
Như ta có ở trên, nếu trong Ruby, mỗi class đều là một object thì tất nhiên, nó cũng sẽ có singleton method như một object thông thường.
Ví dụ: Ta define một singleton method cho một object tham chiếu đến class Book
```
book_class = Book
def book_class.read_book
    puts "class singleton method"
end
```

Hàm read_book là singleton method được define riêng cho class class Book, dĩ nhiên lời gọi chỉ được dùng cho class Book
`book_class.read_book # => "class singleton method"`

Để code clear hơn, chúng ta sẽ define trực tiếp singleton method với class Book
```
def Book.read_book
    puts "class singleton method"
end

Book.read_book # => "class singleton method"
```

Và chúng ta cũng có thể viết thẳng vào trong body của class
```
class Book
    def Book.read_book
        puts "class singleton method"
    end
end

Book.read_book
```

Ở đây, chúng ta lại gặp lại một định nghĩa mới "class method". Và class method thực chất, class method trong ruby chính là singleton method của class mà thôi

### 4. Class definition cũng là các đoạn code executabe
Có nghĩa là *"Phần định của của class trong ruby, cũng có thể bao gồm các đoạn code được thực thi khi gọi đến class đó"*

Để dễ hiểu hơn, ta có đoạn code sau:
```
puts "before class"

class Book
    puts "Inside class"
    
    def Book.read_book
        puts "in singleton method"
    end
end
puts "after class 

Book.read_book
```

Khi chạy đoạn code trên, ta có được kết quả trên màn hình
```
before class
Inside class
after class
in singleton method
```

Từ ví dụ trên, ta có thể thấy, các đoạn code có thể thực thi ngay cả trong khi đang định nghĩa class. Giờ biến tấu một chút, ta cho lời gọi hàm singleton method vào trong class
```
puts "before class"

class Book
    puts "Inside class"
    
    def Book.read_book
        puts "in singleton method"
    end
    
    Book.read_book
end
puts "after class 

```

Ta có kết quả:
```
before class
Inside class
in singleton method
after class
```

Vậy, class method còn có thể gọi ngay cả khi class đang được define

Tuy nhiên, code vẫn chưa được đẹp khi bị lặp class Book, ta có thể sử dụng self để chỉ chính class đó.
```
def self.read_book
     puts "in singleton method"
end

self.read_book
```

Trong trường hợp ta gọi class method với `self.read_book`, receiver chính là self, nếu không có một receiver nào cụ thể được nhắc tới, Ruby sẽ ngầm định là self, cho nên chúng ta hoàn toàn có thể bỏ self đi và chỉ gọi
`read_book`

### 5.Đổi tên
Bây giờ chúng ta sẽ đổi tên các method giống với ví dụ đầu bài nhé
```
class Company
    def self.has_many name
        puts "#{self} has many #{name}"
    end

has many :projects
end
```

Chạy đoạn lệnh trên, ta được: 

```
Company has many projects
```

### 6. ĐỊnh nghĩa method
Bây giờ thì hàm `has_many :projects `của chúng ta đã trông giống hơn với ví dụ đầu bài rồi. Vậy tiếp theo chúng ta sẽ làm gì??? Trong Rails, khi đúng ta gọi has_many thì sẽ sinh ra các hàm bổ sung tiện ịch hỗ trợ cho association của db.
Với ví dụ trên, khi chúng ta gọi projects thì sẽ trả về các project thuộc một company

```
company = Company.new
company.projects # => underfined method
```

Đó là mình nói trong rails với hàm has_many được define sẵn, còn ở đây chúng ta vẫn chưa có gì nên sẽ trả về undefined method. Hãy cùng làm gì đó nào

Chúng ta có thể viết các hàm phụ trợ như sau:
```
def self.has_many name
    puts "#{self} has many #{name}"
    
    def projects 
        puts "return all projects"
    end
end
```

Nhưng ví dụ như chúng ta cũng cần gọi hàm này để liên kết Company với các bảng khác nữa thì làm sao. Không thể nào define từng method cho riêng mỗi association được.
==> Đừng lo lắng, chúng ta hoàn toàn có thể linh họat define để có thể sinh ra các hàm theo ý muốn chúng ta :D (ez)

Để thực hiện điều này, chúng ta sử dụng define_method với argument là tên method và một block sẽ là body của method đó

```
def self.has_many(name)
    puts "#{self} has many #{name}"

    define_method(name) do
        puts "return all #{name}"
    end
end
```

Cùng thử gọi lại has_many với nhiều hàm khác nhau nhé
```
class Company

has many :projects
has many :branches
end

company = Company.new
company.projects
company.branches
```

Kết quả:
```
return all projects
return all branches
```

Tuy nhiên, mục tiêu chúng ta hướng tới là sử dụng hàm `has_many` cho nhiều class. Vậy nên chúng ta sẽ sử dụng thừa kế để thực hiện được điều này

### 7. Thừa kế class method
Để gần giống với Rails, chúng ta sẽ defind hàm `has_many` trong  một class Base trong module ActiveRecord, sau đó sẽ gọi ở các class con thừa kế nó

```
module ActiveRecord
    class Base
        def self.has_many name
            puts "#{self} has many #{name}"
            define_method (name) do
                puts "returing #{name}..."
            end
        end
    end
end
```

Ta có class `Company` kế thừa từ `ActiveRecord::Base`
```
class Company < ActiveRecord::Base
    has_many :projects
    has_many :branches
end
```

Kết quả khi gọi đến class `Company`:
```
returing projects
returing branches
```

Vậy là mọi thứ đã giống với những gì chúng ta thấy trong rails rồi đúng không nào <3 <3 <3
### 
### 8. Tổng kết 
Vậy đến đây, chúng ta đã có thể thiết lập được và gọi method has_many ở nhiều class, cũng iết tìm hiểu được nguyên lí hoạt động của những method dạng này. Hi vọng bài viết này sẽ một phần nào đó giúp các bạn có được sự tiếp cận gần hơn với Ruby cũng như là Ruby on Rails và có thể khám phá được nhiều điều kỳ diệu mà ngôn ngữ này mang lại
Cảm ơn các bạn đã đọc hết bài viết. Mong sẽ nhận được sự đóng góp ý kiến từ mọi người cho bài viết này.

Bài viết gốc:
https://pragmaticstudio.com/tutorials/ruby-macros