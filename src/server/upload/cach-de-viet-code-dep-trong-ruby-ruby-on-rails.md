> Thật sự việc viết code đẹp không chỉ có ruby mà bất cứ ngôn ngữ lập trình nào cũng phải cần. Viết code đẹp cũng giống như việc nói hay, viết giỏi, làm sao để người xem người đọc có thể hiểu và nắm vững hết logic của các đoạn code đó.

**Viết code là một nghệ thuật và người viết code cũng là một nghệ sĩ.**

Nếu các bạn đã từng tiếp xúc với Ruby, thì nó thật sự là một ngôn ngữ đẹp :smile: . Ruby là một ngôn ngữ linh hoạt mã nguồn mở, tập trung vào sự đơn giản và hiệu suất. Nó có một cú pháp thanh lịch (khắp vũ trụ ) là tự nhiên để đọc và viết.
> Ruby is simple in appearance, but is very complex inside, just like our human body — Matz
Những điêù tôi cảm nhận được từ Ruby, đó là một ngôn ngữ lập trình phức tạp nhưng rất tự nhiên, có cú pháp đẹp và trực quan.

Và dưới đây là một số thứ tôi đã ngộ ra được:

**Map**

Sử dụng map bạn sẽ lấy ra được những thứ mong muốn từ Array một cách dễ dàng với kết quả là một mảng mới:<br>
`an_array.map { |element| element * element }`<br>
Thật là đơn giản phải không? Và ta có một cách còn đẹp hơn nữa :<br>
`user_ids = users.map(&:id)`<br>

**Select**

Đôi khi chúng ta sử dụng map và code của chúng ta trông như thế này: <br>
```
even_numbers = [1, 2, 3, 4, 5].map { |element| element if element.even? } # [nil, 2, nil, 4, nil]
even_numbers = even_numbers.compact # [2, 4]
```
Nhưng thực sự chúng ta chỉ muốn kết quả là [2, 4] nhưng chúng ta lại tốn đến 2 bước và select sẽ giúp chúng ta gọn gàng hơn chỉ với 1 dòng:<br>
```[1, 2, 3, 4, 5].select { |element| element.even? }```<br>
và đẹp hơn nữa:<br>
`[1, 2, 3, 4, 5].select(&:even?)`

**Sample**

Có một lúc nào đó bạn muốn lấy ra một phần từ ngẫu nhiên trong mảng. Nếu là người mới bạn sẽ nghĩ ngay đến `random` :<br>
`[1, 2, 3][rand(3)]`<br>
Nó trông rất dễ hiểu, nhưng tôi không chắc nó là cách tốt nhất. Tôi thử dùng `shuffle` :<br>
`[1, 2, 3].shuffle.first`
Tôi thật sự thích `shuffle` nhưng đến khi tôi phát hiện ra `sample` nó còn tuyệt vời hơn :<br>
`[1, 2, 3].sample`

**Ruby syntax**

Như tôi đã nói từ đầu, tôi yêu thích Ruby vì nó rất tự nhiên khi tôi code. Ruby có những syntax tuyệt vời.

**return**

Không giống như những ngôn ngữ khác, khi một phương thức bạn muốn trả vê một kết quả cho nó bạn cần phải return nhưng ruby thì không cần thế. Ruby sẽ ngầm trả về kết quả đó giúp bạn.

Thay vì:

```
def get_user_ids(users)
  return users.map(&:id)
end
```
ta có thể viết :<br>
```
def get_user_ids(users)
  users.map(&:id)
end
```

**Multiple Assignments**

Ruby cho phép ta có thể gán nhiều giá trị trong cùng một lúc. Khi tôi còn mới bắt đầu tôi hay viết:
```
def values
  [1, 2, 3]
end

one   = values[0]
two   = values[1]
three = values[2]
```
nhưng ta có một cách khác hay hơn:

```
def values
  [1, 2, 3]
end

one, two, three = values
```

**Method đặt câu hỏi**

Một trong những tính năng của Ruby đã cuốn hút tôi đó là "dấu hỏi (?)". Bạn có :<br>

`movie.awesome # => true`<br>
Không có gì đáng ngạc nhiên, và bạn thử sử dụng ? :

`movie.awesome? # => true`<br>
Oh yeah, nó thật tuyệt vời phải không ? Bằng cách này nó được sử dụng với các giá trị true/false .

Một phương thức nữa đó là any?.

```
[].any? # => false
[1, 2, 3].any? # => true
```
Nó giống như việc bạn hỏi cái mảng đó có bất cứ gì trong đó không.

**Nhúng biến vào chuỗi**

Khi bạn muốn in ra một chuỗi đại loại như thế này :

```
programming_language = "Ruby"
programming_language + " is a beautiful programming_language" # => "Ruby is a beautiful programming_language"
```
thì sẽ đẹp thế nào khi chúng ta viết:
```

programming_language = "Ruby"
"#{programming_language} is a beautiful programming_language" # => "Ruby is a beautiful programming_language"
```

**If**
```
def hey_ho?
  true
end

puts "let’s go" if hey_ho?
```

**Phương thức try**

`user.id unless user.nil?`

Thay vì chúng ta phải kiểm tra user có nil hay không thì mới gọi `user.id`, việc dùng try sẽ đơn giản hơn:

`user.try(:id)`

Và ở Ruby 2.3 trở lên ta có một cách an toàn hơn nữa (Ruby safe navigation operator (&.)) thay vì dùng try

`user&.id`

**Double Pipe Equals / Memoizatio**

```
some_variable ||= 10
puts some_variable # => 10

some_variable ||= 99
puts some_variable # => 10
```

**Class Static Method**

`GetSearchResult.call(params)`

Đơn giản. Đẹp. Trực quan.
```

class GetSearchResult
  def self.call(params)
    new(params).call
  end

  def initialize(params)
    @params = params
  end

  def call
    # ... your code here ...
  end
end
```

**Getters & Setters**

Nếu chúng ta muốn sử dụng `params`, chúng ta có thể dùng `@params`
```
class GetSearchResult
  def self.call(params)
    new(params).call
  end

  def initialize(params)
    @params = params
  end

  def call
    # ... your code here ...
    @params # do something with @params
  end
end
```

Chúng ta khởi tạo setter / getter

```
class GetSearchResult
  def self.call(params)
    new(params).call
  end

  def initialize(params)
    @params = params
  end

  def call
    # ... your code here ...
    params # do something with params method here
  end

  private

  def params
    @params
  end

  def params=(parameters)
    @params = parameters
  end
end
```

Hoặc là `attr_reader`, `attr_writer` hay `attr_accessor`

```
class GetSearchResult
  attr_reader :param

  def self.call(params)
    new(params).call
  end

  def initialize(params)
    @params = params
  end

  def call
    # ... your code here ...
    params # do something with params method here
  end
end
```

Thật tuyệt ! Chúng ta không cần phải khởi tạo 2 phương thức `getter` và `setter`. Trông chúng thật đơn giản.

**Tap**

Bạn muốn khởi tạo một phương thức `create_user` và phương thức này sẽ thiết lập các thông số, parma, save và trả về `user` . Ta có:

```
def create_user(params)
  user       = User.new
  user.id    = params[:id]
  user.name  = params[:name]
  user.email = params[:email]
 #..
  user.save
  user
end
```

chúng ta sẽ implement nó với `tap` như thế này:

```
def create_user(params)
  User.new.tap do |user|
    user.id    = params[:id]
    user.name  = params[:name]
    user.email = params[:email]
    # ...
    user.save
  end
end
```

Bạn chỉ lo lắng về các parameters của user, và `tap` sẽ trả về oject `user`.

Đó là tất cả.

Bài viết này mang tính chủ quan. Tham khảo  [Idiomatic Ruby: writing beautiful code](https://medium.com/the-renaissance-developer/idiomatic-ruby-1b5fa1445098)

> Have fun, keep learning & always coding!