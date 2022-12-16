Ruby là một ngôn ngữ lập trình đẹp.

Theo trang web chính thức của Ruby, Ruby là:

> “dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.”
> 
Ruby được tạo ra bởi Yukihiro Matsumoto, một kỹ sư phần mềm Nhật Bản. Từ năm 2011, ông là kỹ sư thiết kế và kỹ sư phần mềm cho Ruby tại Heroku.

Matsumoto thường nói rằng ông cố gắng làm cho Ruby tự nhiên, không đơn giản, theo cách phản ánh cuộc sống.

> “Ruby is simple in appearance, but is very complex inside, just like our human body” — Yukihiro Matsumoto
> 
Mình cũng cảm thấy như vậy về Ruby. Nó là một ngôn ngữ lập trình phức tạp nhưng rất tự nhiên, với một cú pháp đẹp và trực quan.

Với code trực quan và nhanh hơn, chúng ta có thể xây dựng phần mềm tốt hơn. Trong bài này, mình sẽ chỉ cho viết code Ruby một cách tốt hơn!

## Các phương thức với mảng
### Map

Sử dụng phương thức **map** để đơn giản hóa code và nhận được những gì bạn muốn.

Phương thức map trả về một mảng mới với kết quả chạy một block một lần cho mọi phần tử trong enum.

Hãy thử nó:
``` ruby
an_array.map { |element| element * element }
```

Đơn giản như vậy.

Nhưng khi bạn bắt đầu viết code với Ruby, bạn rất dễ sử dụng vòng lặp **each**.

``` ruby
user_ids = []
users.each { |user| user_ids << user.id }
```

Có thể được đơn giản hóa với **map** trong một dòng code đẹp duy nhất:
``` ruby
user_ids = users.map { |user| user.id }
```

Hoặc thậm chí tốt hơn (và nhanh hơn):
``` ruby
user_ids = users.map(&:id)
```

### Select

Và khi bạn đã quen với việc sử dụng **map**, đôi khi code của bạn có thể giống như sau:
``` ruby
even_numbers = [1, 2, 3, 4, 5].map { |element| element if element.even? } # [ni, 2, nil, 4, nil]
even_numbers = even_numbers.compact # [2, 4]
```

Sử dụng **map** để trả các số chẵn và nó cũng có thể trả về đối tượng nil. Sử dụng phương thức **compact** để loại bỏ tất cả các đối tượng nil.

Tuy nhiên cách làm trên khá là rườm rà, chúng ta có thể rút gọn lại được như sau 

`[1, 2, 3, 4, 5].select { |element| element.even? }`

Chỉ một dòng. Code đơn giản. Dễ hiểu.

Bonus:
``` ruby
[1, 2, 3, 4, 5].select(&:even?)
```

### Sample

Hãy tưởng tượng rằng bạn cần lấy một phần tử ngẫu nhiên từ một mảng. Bạn mới bắt đầu học Ruby, vì vậy suy nghĩ đầu tiên của bạn sẽ là, "Hãy sử dụng phương pháp ngẫu nhiên" và đó là những gì sẽ xảy ra:

``` ruby
[1, 2, 3][rand(3)]
```
Chúng ta có thể hiểu được code, nhưng mình không chắc nó có đủ hay không. Chúng ta có thể sử dụng phương thức method **sample**, nó có ý nghĩa hơn nhiều so với rand

``` ruby
[1, 2, 3].sample
```
## Cú pháp ruby
### Return

Bất kỳ câu lệnh nào trong Ruby sẽ trả về giá trị của biểu thức được đánh giá cuối cùng. Một ví dụ đơn giản là phương thức getter. Chúng ta gọi một phương thức và trả lại giá trị.
``` ruby
def get_user_ids(users)
  return users.map(&:id)
end
```

Nhưng như chúng ta biết, Ruby luôn trả về biểu thức được đánh giá cuối cùng. Tại sao lại sử dụng câu lệnh return?
``` ruby
def get_user_ids(users)
  users.map(&:id)
end
```

### Gán nhiều giá trị cùng lúc
Ruby cho phép tôi gán nhiều biến cùng một lúc. Khi bạn bắt đầu, bạn có thể viết như thế này:
``` ruby
def values
  [1, 2, 3]
end

one   = values[0]
two   = values[1]
three = values[2]
```
Nhưng tại sao không gán nhiều biến cùng một lúc?

``` ruby
def values
  [1, 2, 3]
end

one, two, three = values
```
### Các phương thức đặt câu hỏi (còn gọi là các biến vị ngữ)

Một tính năng thu hút sự chú ý của Ruby là phương thức dấu hỏi (?), Còn được gọi là các phương thức dự báo. Lúc đầu thật kỳ lạ, nhưng bây giờ nó có ý nghĩa rất nhiều. Bạn có thể viết code như thế này:
``` ruby
movie.awesome # => true
```
Ok ... không có gì sai với điều đó. Nhưng hãy sử dụng dấu chấm hỏi:

``` ruby
movie.awesome? # => true
```
Đoạn code này mang tính biểu cảm hơn nhiều và mình mong đợi câu trả lời của phương thức trả lại giá trị true hoặc false.

Một phương pháp mà mình thường sử dụng là **any?** Trả về true nếu mảng có bất kì phần tử nào
``` ruby

[].any? # => false
[1, 2, 3].any? # => true
```

### Nội suy
Đối với mìh chuỗi nội suy thì trực quan, dễ nhìn hơn nối chuỗi. Hãy xem nó hoạt động.
Ví dụ về nối chuỗi:

``` ruby
programming_language = "Ruby"
programming_language + " is a beautiful programming_language" # => "Ruby is a beautiful programming_language"
```
Ví dụ về nội suy chuỗi:

``` ruby
programming_language = "Ruby"
"#{programming_language} is a beautiful programming_language" # => "Ruby is a beautiful programming_language"
```
### Câu lệnh if

Chúng ta nên sử dụng câu lệnh if như bên dưới:
``` ruby
def hey_ho?
  true
end

puts "let’s go" if hey_ho?
```

Khá tốt đẹp để code như thế.

Cảm thấy thực sự tự nhiên.
### Phương thức try (với Rails)

Phương thức **try** gọi phương thức được xác định bởi symbol, chuyển nó tới bất kỳ đối số nào hoặc block được chỉ định. Nil sẽ được trả về nếu đối tượng nhận là một đối tượng nil hoặc NilClass.

Sử dụng if và unless:

``` ruby
user.id unless user.nil?
```
Hãy sử dụng phương thức **try**
``` ruby
user.try(:id)
```

Kể từ Ruby 2.3, chúng tôi có thể sử dụng toán tử "safe navigation" của Ruby (&.) Thay vì phương thức try của Rails.

``` ruby
user&.id
```

### Double pipe equals (||=) / memoization

Tính năng này rất là tuyệt vời. Nó giống như là caching 1 giá trị vào trong 1  biến
``` ruby
some_variable ||= 10
puts some_variable # => 10

some_variable ||= 99
puts some_variable # => 10
```

Bạn không cần phải sử dụng câu lệnh if bao giờ hết. Chỉ cần sử dụng (||=) và nó được thực hiện.

### Phương thức tap
Hãy tưởng tượng bạn muốn định nghĩa một phương thức **create_user**. Phương thức này sẽ khởi tạo, thiết lập các tham số và lưu và trả về người dùng.

``` ruby
def create_user params
  user       = User.new
  user.id    = params[:id]
  user.name  = params[:name]
  user.email = params[:email]
  # ...
  user.save
  user
end
```

Đơn giản. Không có gì sai ở đây.

Bây giờ, hãy triển khai bằng phương pháp tap
``` ruby

def create_user params
  User.new.tap do |u|
    u.id    = params[:id]
    u.name  = params[:name]
    u.email = params[:email]
    # ...
    u.save
  end
end
```

Nói một cách đơn giản, nó chỉ cho phép bạn làm điều gì đó với một đối tượng bên trong một block, và luôn luôn có block đó trả về chính đối tượng đó.
Nó có tác dụng nữa là dễ dàng debug khi gặp bug hoặc debug để hiểu đoạn code đó hơn! 

### Kết

Chúng ta đã học được cách Ruby đẹp và trực quan, và chạy nhanh hơn. Bài viết của mình đến đây là hết cảm ơn các bạn đã lắng nghe!