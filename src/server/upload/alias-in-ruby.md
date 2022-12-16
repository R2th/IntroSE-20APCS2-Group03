Bạn đã đùng `alias` trong ruby chưa? , vậy hôm này chúng ta cùng đi tìm hiểu nhé :grinning:
## 1.Alias in Ruby 
Trong bài viết này, tôi sẽ cùng các bạn tìm hiểu các vấn đề sau:


* The `alias` keyword
* The `alias_method` keyword
* `aliases` and scopes
* `aliases` behind the scene

## 2.The `alias` keyword
Ruby cung cấp cho chúng ta `alias` keywork để thỏa thuận với method và attributes
```
class Book
 def book_name
  "Davici code"
 end
 alias bookname book_name
 alias name bookname
end
book = Book.new
p book.book_name # "Davici code"
p book.bookname # "Davici code"
p book.name # "Davici code"
```

   Ở đây chúng ta đã định nghĩa method `Book#book_name`và định nghĩa một `bookname` alias  cho method này.
Nên lúc này ta có `bookname` là alias của method `book_name` và `name` lại là alias của `bookname`
Do đó khi ta gọi `name` hoặc `bookname`thi  cùng trả về một kết quả.
## 3.The `alias_method`method
```
class Book
 def book_name
  "Davici code"
 end
 alias_method :bookname, :book_name
 alias name 'bookname', :book_name 
end
book = Book.new
p book.book_name # "Davici code"
p book.bookname # "Davici code"
p book.name # "Davici code"
```

 >Cũng giống như `alias` keywork chúng ta cũng định nghĩa method `Book#book_name` và định nghĩa `bookname`, `name` là alias của mehtod.
Chúng ta dễ dang nhìn thấy `alias_method` lấy `String` và `Symbol` là tham số, điều này giúp `Ruby` xác định được `alias` hay là `alias_mehtod`
## 4.Alias và scopes

   Trong thực tể thì `Module#alias_method` có cách hoạt động khác với `alias` keywork trong một điểm đố là scope.
Hãy xem xét ví dụ sau:
```
class Device
  def description
    'I\'m a device'
  end

  def self.alias_description
    alias_method :describe, :description
  end
end

class Microwave < Device
  def description
    'I\' a microwave'
  end

  alias_description
end

m = Microwave.new

p m.description  # => "I' a microwave"
p m.describe     # => "I' a microwave"
```

>Ở đây chúng ta có thể thấy rằng khi gọi  method `alisa_method` trong method `Device#alias_description` xác định alias được định nghĩa trên method `describe` trên method `Microwave#description` chứ không phải  trên `Device#description`.

Bây giờ hãy xem chuyện gì xảy ra với `alias` keyword:

```
class Device
  def description
    'I\'m a device'
  end

  def self.alias_description
    alias describe description
  end
end

class Microwave < Device
  def description
    'I\' a microwave'
  end

  alias_description
end

m = Microwave.new

p m.description # => "I' a microwave"
p m.describe    # => "I'm a device"
```

Chúng ta có thể thấy khi gọi alias trong  method `Device#alias_description`, alias `describe` của `Device#description`chứ không phải `Microwave#description`

## 5.Aliases behind the scene

Nào chúng ta hay quay lại ví dụ về `Book` class để tìm hiểu điều gì xảy ra alias được định nghĩa.

```
class Book
 def book_name
  "Davici code"
 end
 alias bookname book_name
 alias name bookname
end
book = Book.new
p book.book_name # "Davici code"
p book.bookname # "Davici code"
p book.name # "Davici code"
```
-----

Behind the scene `username` alias được coi là một phương pháp.
 Trong ruby mồi method sẽ được chèn vào một table để keep track tât các method của chương trình của bạn. Bảng này được gọi là method_entry  table.

   Vì vậy `book_name` method là một new entry được chèn vào method_entry  table . Sẽ bao gồm những thành phần:

* Đinh danh phương thức `book_name'
* Nội dung của method `Book#book_name`
* Book class

>Đó là cách mà `alias` keyword và `alias_method` có thể xác đinh được alias method hiện có.
Bây giờ chúng ta nhìn đến new entry alias `bookname` gồm có:
*  Đinh danh `bookname` method
*  Nội dung của method `Book#book_name`
*  Class `Book`


-----


Đó là cách mà  `alias` keyword và method `alias_method` xác định  bí danh cho một phương thức hiện có.
Lưu ý rằng entry chứa nhiều  thông tin hơn tôi đã mô tả để giữ cho nó thật đơn giản chúng ta tập trung vào `alias`keyword.

Link thảo: https://medium.com/rubycademy/alias-in-ruby-bf89be245f69