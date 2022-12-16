Sau một khoảng thời gian ăn dầm ở giề tiếp xúc với ngôn ngữ lập trình ruby cùng framework Ruby on Rails,  cũng sau không biết bao lần sứt đầu mẻ chán giờ mình có thể rút ra một vài bài học khi muốn chinh phục được cô nàng lắm chiêu quái gở này ! Ruby và Ruby on Rails đẹp là không cần phải bàn cãi nhưng cái tính kiêu kì lắm chiêu của cô nàng nhiều khi cũng khiến anh em dev phải dở khóc dở cười @@ Một vài mẹo nhỏ cho các anh em dev lao đầu vào hố vôi đây ạ ! 
## Double Pipe Equals ||=
Khi viết a ||= b thì nó tương đương với:

`a || a = b # Correct`

Chứ không phải như nhiều người nghĩ là:

`a = a || b # Wrong`

Toán tử này có thể được sử dụng để tạo các phương thức như thế này trong các class của bạn như là sử dụng nó để tính toán.

```
def total
  @total ||= (1..100000000).to_a.inject(:+)
end
```

Bây giờ mình có thể có gọi phương thức total để nhận được tổng giá trị, nhưng nó sẽ chỉ được tính duy nhất vào lần đầu tiên.

## Tạo mảng bảng chữ cái hoặc số
Mình muốn tạo một danh sách các số hoặc đặt toàn bộ bảng chữ cái bên trong một mảng. Trong Ruby mình có thể sử dụng ranges để làm điều đó.

A to Z
```

('a'..'z').to_a
# => ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
```

1 đến 10

```
(1..10).to_a
# => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
## Double star (**)

```
def my_method(a, *b, **c)
  return a, b, c
end
```

trong đó a là một tham số bình thường, *b sẽ nhận tất cả các tham số sau a và đưa chúng vào một mảng. Còn **c sẽ lấy bất cứ tham số nào ở dạng key: value

```
my_method(1)
# => [1, [], {}]

my_method(1,2,3,4)
# => [1, [2,3,4], {}]

my_method(1,2,3,4,a: 1, b: 2)
# => [1, [2,3,4], {:a=>1, :b=>2}]
```
## Map
Sử dụng map bạn sẽ lấy ra được những thứ mong muốn từ Array một cách dễ dàng với kết quả là một mảng mới:

`an_array.map { |element| element * element }`

Thật là đơn giản phải không? Và mình có một cách còn đẹp hơn nữa :

`user_ids = users.map(&:id)`


## return

Không giống như những ngôn ngữ khác, khi một phương thức muốn trả vê một kết quả cho nó mình cần phải return nhưng ruby thì không cần thế. Ruby sẽ ngầm trả về kết quả đó giúp mình.

Thay vì:
```
def get_user_ids(users)
  return users.map(&:id)
end
```
mình có thể viết :
```
def get_user_ids(users)
  users.map(&:id)
end
```
## Multiple Assignments
Ruby cho phép ta có thể gán nhiều giá trị trong cùng một lúc. Khi mình còn mới bắt đầu mình hay viết:
```m 
def values
  [1, 2, 3]
end

one   = values[0]
two   = values[1]
three = values[2]
```
nhưng sau này:
```
def values
  [1, 2, 3]
end

one, two, three = values
```
## Dấu hỏi sau Method 
Bạn muốn  hỏi cái mảng đó có bất cứ gì trong đó không.
```
[].any? # => false
[1, 2, 3].any? # => true
```
## Tap
Mình muốn khởi tạo một phương thức create_user và phương thức này sẽ thiết lập các thông số, params, save và trả về user . Mình viết :
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
Sau này mình biết có thể viết :
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
Mình chỉ lo lắng về các parameters của user, và tap sẽ trả về oject user.

## Array#bsearch
Có rất nhiều hàm tìm kiếm trong Ruby mà chúng ta có thể sử dụng trên Array như: select, 'reject', 'find', nhưng khi mà Array quá lớn, chúng ta phải bắt đầu chú ý đến thời gian thực thi của các hàm trên. Ví dụ sử dụng find, nó sẽ tìm trên toàn bộ array, đến lúc nào tìm thấy thì thôi. Độ phức tạp O(n). Tuy nhiên có một cách nhanh hơn, độ phức tạp O(log n):
```
require "benchmark"

data = (0..50_000_000)

Benchmark.bm do |x|
  x.report(:find) { data.find {|number| number > 40_000_000 } }
  x.report(:bsearch) { data.bsearch {|number| number > 40_000_000 } }
end

         user       system     total       real
find     3.020000   0.010000   3.030000   (3.028417)
bsearch  0.000000   0.000000   0.000000   (0.000006)
```
Như bạn có thể thấy, bsearch nhanh hơn rất nhiều. Tuy nhiên bsearch có một nhược điểm đó là: array cần phải được sort trước khi tìm kiếm. Tuy nhiên cũng có khá nhiều trường hợp phải dùng đến nó. Ví dụ như tìm kiếm created_at chẳng bạn.
## <=>
Đây là method có thể chúng ta ít sử dụng trong Ruby nhưng trong các class được Ruby 'built-in' sẵn thì lại được sử dụng rất nhiều. Đây là cách nó làm việc:
```
4 <=> 4 # 0
5 <=> 4 # 1
4 <=> 5 # -1
```
Các class khi muốn include Comparable module, bạn cần implement method này. Tưởng tượng, bạn cần implement một method cho phép cộng trừ thời gian bằng phút và giờ. Việc này sẽ trở nên rất phức tạp nếu con số bạn muốn cộng trừ lớn hơn 60 minutes. Khi thời gian muốn trừ lớn hơn 60 minutes, bạn cần trừ đi 1 hour và trừ đi 60 minutes
```
def fix_minutes minutes
    until (0...60).member? minutes
      @hours -= 60 <=> minutes
      @minutes += 60 * (60 <=> minutes)
    end
    @hours %= 24
    self
end
```
Sử dụng <=> chúng ta có thể implement một function phức tạp bằng đoạn code rất ngắn. 

Mình sẽ trở lại với một bài viết tổng hợp mẹo khác khi hẹn hò với Ruby nhiều hơn nữa ! Với những gì mình tổng hợp hi vọng có thể phần nào giúp bạn sớm chinh phục được cô nàng  Ruby xinh đẹp !!