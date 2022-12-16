Ruby là một ngôn ngữ lập trình mã nguồn mở, năng động, tập trung vào sự đơn giản và năng suất. Nó có một cú pháp tao nhã, dễ đọc và dễ viết. Được tạo bởi Matz, một kỹ sư phần mềm người Nhật, nhà thiết kế trưởng của Ruby & kỹ sư phần mềm của @heroku kể từ năm 2011.

Ông ấy thường nói rằng ông ấy là người "cố gắng làm cho Ruby trở nên tự nhiên, chứ không phải đơn giản", theo cách phản ánh cuộc sống.

> Ruby is simple in appearance, but is very complex inside, just like our human body — Matz
> 
> `Ruby có vẻ ngoài đơn giản, nhưng bên trong lại rất phức tạp, giống như cơ thể con người chúng ta`

Tôi cũng cảm thấy như vậy về Ruby. Một ngôn ngữ lập trình phức tạp, nhưng rất tự nhiên, với cú pháp đơn giản, đẹp và trực quan.

Vì tôi nghĩ mã càng trực quan thì code càng nhanh, một phần mềm tốt hơn sẽ được xây dựng, trong bài viết này, tôi muốn cho bạn thấy cách tôi thể hiện suy nghĩ của mình bằng cách sử dụng Ruby trong các đoạn code nhỏ.

## Các Array methods

### Map

Sử dụng `map` để đơn giản hóa đoạn code của bạn và có được những gì bạn muốn. Map trả về một mảng mới với các phần tử là kết quả sau khi thực hiện block.

```
an_array.map { |element| element * element }
```

Nó thực sự rất đơn giản! Nhưng khi bạn bắt đầu với ruby, bạn thường chỉ sử dụng `each`

```
user_ids = []
users.each { |user| user_ids << user.id }
```

Có thể đơn giản hóa với map trong một dòng code đẹp hơn:

```
user_ids = users.map { |user| user.id }
```

hoặc thậm chí tốt hơn (và nhanh hơn):

```
user_ids = users.map(&:id)
```

### Select

Và khi bạn đã quen với `map`, đoạn code của bạn có thể như sau:

```
even_numbers = [1, 2, 3, 4, 5].map { |element| element if element.even? } # [ni, 2, nil, 4, nil]
even_numbers = even_numbers.compact # [2, 4]
```

Sử dụng `map` chỉ để chọn các số chẵn kể cả khi chúng có thể trả về nil. Vì vậy, bạn sử dụng `compact` để loại bỏ tất cả các đối tượng nil. Và TADA, bạn đã chọn tất cả các số chẵn. Nhiệm vụ đã hoàn thành!

Nhưng chúng ta có thể làm tốt hơn thế! Bạn đã nghe đến `select` của module Enumerable

```
[1, 2, 3, 4, 5].select { |element| element.even? }
```

Bonus:

```
[1, 2, 3, 4, 5].select(&:even?)
```

### Sample

Hãy tưởng tượng vì một số lý do, bạn cần lấy một phần tử ngẫu nhiên từ một mảng. Bạn mới bắt đầu học ruby, vì vậy, suy nghĩ đầu tiên của bạn, bạn sẽ là sử dụng method `rand` , và điều này xảy ra:

```
[1, 2, 3][rand(3)]
```

Hưm, chúng ta có thể hiểu đoạn code, nhưng tôi không chắc là nó đủ tốt. Và nếu chúng ta sử dụng method `shuffle` thì sao?

```
[1, 2, 3].shuffle.first
```

Hừm. Sử dụng shuffle có vẻ ổn hơn rand. Nhưng khi tôi phát hiện ra method `sample` thì:

```
[1, 2, 3].sample
```

Thực sự rất đơn giản. Khá tự nhiên và trực quan.

## Ruby syntax

Như tôi đã đề cập ở trên, Ruby là một ngôn ngữ với cú phấp rất tự nhiên.

## return ẩn

Bất kỳ câu lệnh nào trong ruby đều trả về giá trị của biểu thức được đánh giá cuối cùng. Một ví dụ đơn giản là một phương thức getter. Chúng tôi gọi một phương thức và mong đợi một số giá trị trở lại. Hãy cùng xem:

```
def get_user_ids(users)
  return users.map(&:id)
end
```

Nhưng như chúng ta biết rằng ruby luôn trả về biểu thức được đánh giá cuối cùng, tại sao lại sử dụng `return`?

```
def get_user_ids(users)
  users.map(&:id)
end
```

Sau vài tháng sử dụng Ruby, tôi sử dụng hầu hết mọi phương thức mà không cần câu lệnh `return`.

## Multiple Assignments

Ruby cho phép gán nhiều biến số cùng một lúc. Khi bạn bắt đầu, bạn có thể mã như thế này:

```

def values
  [1, 2, 3]
end

one   = values[0]
two   = values[1]
three = values[2]
```

Nhưng tại sao không gán nhiều biến trong cùng một lúc?

```
def values
  [1, 2, 3]
end

one, two, three = values
```

Tuyệt vời!

## Method với ?

Một trong tất cả các tính năng của Ruby đã thu hút sự chú ý của tôi khi tôi bắt đầu là dấu chấm hỏi (?) . Trong lần đầu tiên, thật kỳ lạ khi nhìn thấy, nhưng bây giờ nó rất có ý nghĩa. Bạn có thể viết mã như thế này:

```
movie.awesome # => true
```

OK… không có gì sai. Nhưng hãy sử dụng `?`:

```
movie.awesome? # => true
```

Cách này có thể dễ dàng biết rằng method `awesome` sẽ trả về true/false.

Một phương thức mà tôi thường sử dụng là `any?`. Nó giống như đang hởi một array rằng có phần tử nào bên trong hay không.

```
[].any? # => false
[1, 2, 3].any? # => true
```

### Chuỗi nội suy

Đối với tôi, nội suy chuỗi sẽ trực quan hơn so với nối chuỗi. Hãy cùng xem ví dụ dưới

Nối chuỗi:

```
programming_language = "Ruby"
programming_language + " is a beautiful programming_language" # => "Ruby is a beautiful programming_language"
```

Chuỗi nội suy:

```
programming_language = "Ruby"
"#{programming_language} is a beautiful programming_language" # => "Ruby is a beautiful programming_language"
```

### if

Trong Ruby, `if` được sử dụng một cách thực sự rất tiện lợi

```
def hey_ho?
  true
end

puts "let’s go" if hey_ho?
```

Đoạn code trong thực sự gon và rất tự nhiên.

### try (rails)

`try` gọi phương thức được xác định bởi symbol, bạn có thể truyền vào bất kì tham số nào. `try` sẽ trả về nil nếu đối tượng trả về là đối tượng nil hoặc NilClass.

Sử dụng điều kiện `if/unless`:

```
user.id unless user.nil?
```

Sử dụng `try`:

```
user.try(:id)
```

Kể từ Ruby 2.3, chúng ta có thể sử dụng `&` thay vì `try`.

```
user&.id
```

### ||

```
some_variable ||= 10
puts some_variable # => 10

some_variable ||= 99
puts some_variable # => 10
```

Bạn không cần phải sử dụng `if` . Chỉ cần `||` và nó đã hoàn thành! Đơn giản và dễ dàng.

### Class Static Method

Ruby cung cấp rất nhiều cách để khai báo một static method (class method).

```
GetSearchResult.call(params)
```

Đơn giản. Đẹp. Trực quan. Điều gì xảy ra bên trong?

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

### Getters & Setters

Cũng giống như class GetSearchResult, nếu chúng ta muốn sử dụng các params, chúng ta có thể sử dụng @params

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
```

Hoặc chúng ta định nghĩa một setter / getter cho params này

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

Khai báo với attr_reader, attr_writer hoặc attr_accessor

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

Tốt! Chúng ta không cần phải khai báo các phương thức getter và setter. Code trở nên đơn giản hơn như chúng ta muốn.

### Tap

Hãy tưởng tượng bạn muốn khai báo method create_user. Method này sẽ khởi tạo, thiết lập các tham số, lưu và trả về người dùng. Let do it!

```
def create_user(params)
  user       = User.new
  user.id    = params[:id]
  user.name  = params[:name]
  user.email = params[:email]
  # ...
  user.save
  user
end
```

Đơn giản. Không có gì sai. Nhưng hãy thử sử dụng `tap`

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

Bạn chỉ cần lo lắng về các tham số user và `tap` sẽ trả về đối tượng user cho bạn.

Hết. :peach:

[Bài viết tham khảo](https://medium.com/the-renaissance-developer/idiomatic-ruby-1b5fa1445098)