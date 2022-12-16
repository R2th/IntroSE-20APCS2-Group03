Như tiêu đề, mình đang muốn học lại Ruby để 1 là kiếm chứng chỉ Ruby Silver, 2 là bổ sung thêm những phần kiến thức chưa biết về Ruby nên ta có bài này.

Ở đây sẽ có ưu ái hẳn hoi 1 bài mẫu luôn để mọi người cũng chiêm ngưỡng.
```ruby
a = [1, 2, 3, 5, 8]
b = [1, 3, 6, 7, 8]
c = false || true ? true && false ? a | b : a & b : b ;
p c
```
Trên đây là cơn choáng mình nhận được vì lỡ học khuya lúc 12 giờ đêm. Và để phân tích nó thì chúng ta sẽ cùng đi lại vài kiến thức Ruby cơ bản.
# Enumerable
## Các hệ số trong Ruby
|Hệ|Cú pháp|Ví dụ|
|-|-|-|
|Nhị phân|`0b`|`0b01` là 1|
|Bát phân|`0o` hoặc `0`|`070` hay `0o70` là 56|
|Thập phân|`0d`| `0d10` bằng 10|
|Thập lục phân|`0x`| `0xAB` trả về kết quả 171|
## find_all - select, detect - find, collect - map
- `find_all`, `select` : Trả về tất cả các phần tử của mảng thỏa mãn yêu cầu nào đó
- `detect`,`find` : Trả về giá trị đầu tiên thỏa mãn điều kiện nào đó
- `collect`, `map`: Trả về mảng thỏa mãn điều kiện đã cho
# Các toán tử
## Toán tử đại số
| Toán tử | Ý nghĩa | Ví dụ |
| -------- | -------- | -------- |
|`+`	| Toán tử cộng |	`10 + 20` trả về 30 |
| `−`	| Toán tử trừ | `10 - 20` trả về -10 |
| `*`	| Toán tử nhân | `10 * 20` trả về 200 |
| `/`	| Phép chia lấy phần nguyên | `20 / 10` trả về 2 |
| `%`	| Phép chia lấy phần dư | `20 % 10` trả về 0 |
| `**` | Luỹ thừa | `10**20`  sẽ trả về $10^{20}$ |

Ví dụ đơn giản:
```ruby
def foo(n)
  n ** n
end

puts foo(3) * 2
```
Ta có $3^ 3 * 2$ bằng 54.
## Toán tử so sánh
Các toán tử này dùng để so sánh giá trị của 2 phần tử

| Toán tử | Ý nghĩa | Ví dụ |
| -------- | -------- | -------- |
|`==`	| Trả về `true` nếu bằng nhau |	`10==10.0` trả về `true` |
| `!=`	| Trả về `true` nếu khác nhau | `10!=10.0` trả về `false` |
| `>`	| Trả về `true` nếu giá trị trước lớn hơn giá trị sau | `10>5` trả về `true` |
| `<`	| Trả về `true` nếu giá trị trước nhỏ hơn giá trị sau | `10<20` trả về `true` |
| `>=`	| Trả về `true` nếu giá trị trước lớn hơn hoặc bằng giá trị sau  | `10>=10.0` trả về `true` |
| `<=` | Trả về `true` nếu giá trị trước nhỏ hơn hoặc bằng giá trị sau  | `10<=10.0` trả về `true` |
| `<=>` | So sánh gộp. 0 nếu bằng nhau, 1 nếu giá trị trước lớn hơn và -1 nếu giá trị trước nhỏ hơn | `10<=>20`  sẽ trả về -1 |
| `===` |Cũng là check giá trị bằng nhau như mà nó lạ .... à không lạ lắm. Toán tử này hay dùng trong các câu lệnh điều kiện if-else và case-when|`10===10.0` trả về `true`|
| `eql?` |Check không chỉ giá trị mà còn kiểu dữ liệu của 2 phần tử so sánh|`10.eql?10.0` là `false`. Giá trị bằng nhau nhưng type `int` và `float` là khác nhau|
| `equal?` |Trả về true nếu 2 phần tử có chung object id| `a="xyz"`, `b="xyz"` nhưng `a.equal?b` là `false` |
Ví dụ:
- Cho `a = 10`, `b = 10.0`. `a==b`và `a===b` trả về cùng giá trị `true` còn `a.eql?b` và `a.equal?b` cùng là `false`.
## Toán tử gán
Phần này giống với toán tử toán học 1 chút, nên mình sẽ lướt qua. `=` là gán giá trị, ví dụ `a = b` là gán giá trị b bằng với a, còn `a += b` thì tức là `a = a + b`
## Toán tử song song
Thay vì làm như này
```ruby
a = 10
b = 20
c = 30
```
Chúng ta có thể gán nhanh như này
```ruby
a, b, c = 10, 20, 30
```
Với cách này, ta có thể dùng để hoán đổi giá trị 
```
a, b = b, c
```
## Sự khác nhau của `s..e` và `s...e`
`s..e` là lấy các phần tử từ s tới cả e, còn `s...e` là lấy các phần tử từ s tới trước e.

Ví dụ:
- `10..15` là `[10, 11, 12, 13, 14, 15]`
- `10...15` là `[10, 11, 12, 13, 14]`
- `[10..15]` tương đương `[10, 15]`
## Toán tử logic
| Toán tử | Ví dụ |
| -------- | -------- |
|`&` |	`[ "a", "b", "c" ] & [ "c", "d", "a" ]` trả về `[ "a", "c" ]` |
| `|` | `[ "a", "b", "c" ] | [ "c", "d", "a" ]` trả về `[ "a", "b", "c", "d" ]` |
| `||` | `[ "a", "b", "c" ] || [ "c", "d", "a" ]` trả về `[ "a", "b", "c" ]` |
| `||` | `[ "a", "b", "c" ] && [ "c", "d", "a" ]` trả về `[ "c", "d", "a" ]` |
| `!` | `!(10 && 20)`  sẽ trả về `false` |
# Mảng
## slice
```ruby
# create arrays
array1 = [1, 2, 3, 4, 5]
array2 = ["a", "b", "c", "d", "e"]
array3 = ["cat", "dog", "cow", "rat", "fox"]
array4 = [true, false, nil]
array5 = ["", "nil", "false", "true"]

# call `slice()` method and save returned sub-arrays
a = array1.slice(1)       # 2nd element
b = array2.slice(2, 3)    # from 3rd element, return 3
c = array3.slice(1, 1)    # from 2nd element, return only 1
d = array4.slice(0, 5)    # from 1st element, return all elements
e = array5.slice(2)       # return 3rd element

# print returned values
puts "#{a}" # 2
puts "#{b}" # ["c", "d", "e"]
puts "#{c}" # ["dog"]
puts "#{d}" # [true, false, nil]
puts "#{e}" # false
```
## each_slice và each_cons
- `each_slice` : 
```ruby
(1..10).each_slice(3) {|arr| p arr }

# [1, 2, 3]
# [4, 5, 6]
# [7, 8, 9]
# [10]
```
- `each_cons` :
```ruby
(1..10).each_cons(3) {|arr| p arr }

# [1, 2, 3]
# [2, 3, 4]
# [3, 4, 5]
# [4, 5, 6]
# [5, 6, 7]
# [6, 7, 8]
# [7, 8, 9]
# [8, 9, 10]
```
## push, pop, shift và unshift
- `push` Thêm 1 phần tử vào cuối mảng
```ruby
s = ["one", "two", "three"]
s.push "four"

# ["one", "two", "three", "four"]
```
- `pop` Xóa phần tử cuối mảng
```ruby
s = ["one", "two", "three"]
s.pop

# ["one", "two"]
```
- `shift` Xóa phần tử đầu mảng
```ruby
s = ["one", "two", "three"]
s.shift

# ["two", "three"]
```
- `unshift` Thêm phần tử `nil` vào đầu mảng
```ruby
s = ["one", "two", "three"]
s.unshift

# [nil, "one", "two", "three"]
```
## flatten, flatten! và reverse
- `flatten`: Chuyển đổi cấu trúc của mảng từ mảng nhiều chiều thành mảng 1 chiều
```ruby
[["apple"],["banana"],["orange"]].flatten #=> ["apple", "banana", "orange"]
```
- `flatten!`: cũng là `flatten` nhưng nó không chỉ khác trên ở dấu `!`. Nếu mảng bị flatten là 1 chiều thì trả về `nil`
```ruby
[["apple"],["banana"],["orange"]].flatten! #=> ["apple", "banana", "orange"]
["apple", "banana", "orange"].flatten! #=> nil
```
- `reverse`: Đảo chiều mảng đã cho
```ruby
["apple", "banana", "orange"].reverse #=> ["orange", "banana", "apple"]
```
## product và zip
- `product`: trả về mảng chứa tổ hợp của phần tử của các mảng thành phần
```ruby
[1,2].product([3,4])       #=> [[1,3],[1,4],[2,3],[2,4]]
```
- `zip`: trả về mảng tuyến tính từng phần tử
```ruby
[1,2].zip([3,4])       #=> [[1, 3], [2, 4]]
```
## tranpose
Đại loại thì nó như sau
```ruby
[[1, 3],
 [1, 4],
 [2, 3],
 [2, 4]
].transpose

#=> [[1, 1, 2, 2], [3, 4, 3, 4]]
```
# Hash
Hash là 1 cấu trúc cho phép map từng key với từng giá trị

Ví dụ:
```ruby
h = {:foo => 0, :bar => 1, :baz => 2}
h # => {:foo=>0, :bar=>1, :baz=>2}
```
Chúng ta có thể chơi cú pháp kiểu JSON:
```ruby
h = {foo: 0, bar: 1, baz: 2}
h # => {:foo=>0, :bar=>1, :baz=>2}
```
Hoặc dùng chuỗi:
```ruby
h = {'foo': 0, 'bar': 1, 'baz': 2}
h # => {:foo=>0, :bar=>1, :baz=>2}
```
Xào nấu thập cẩm:
```ruby
h = {foo: 0, :bar => 1, 'baz': 2}
h # => {:foo=>0, :bar=>1, :baz=>2}
```
## invert
`invert` là method cho phép hoán đổi key và value
```ruby
h = {a: 100, b: 200}
puts h.invert #=> {100=>:a, 200=>:b}
```
Nếu trước khi invert 2 key có cùng value thì sau khi invert, giá trị sau cùng sẽ được lấy
```ruby
h = {a: 100, b: 100}
puts h.invert #=> {100=>:b}
```
## each
Dùng method `each` với Hash sẽ trả ra kiểu Array
```ruby
h = {a: 100}
h.each {|p|
  p p.class
}
# => Arry
```
## Chú ý
```ruby
hash = {klass => 100}
```
tương đương
```ruby
hash = {}
hash.store(klass, 100)
```
tương đương
```ruby
hash = Hash[klass, 100]
```
# Chuỗi
```ruby
%|apple banana orange| #=> "apple banana orange"
```
## split
Chia 1 chuỗi ra thành các chuỗi con dựa theo kí tự phân tách. Trả về 1 mảng chứa các chuỗi con. Mặc định của ký tự phân tách là `' '`
```ruby
p "Apple Banana Lemon".split #=> ["Apple", "Banana", "Lemon"]
p "Apple Banana Lemon".split ' ' #=> ["Apple", "Banana", "Lemon"]
p "Apple Banana Lemon".split / / #=> ["Apple", "Banana", "Lemon"]
p "Apple Banana Lemon".split /( )/ #=> ["Apple", " ", "Banana", " ", "Lemon"]
```
Hãy lưu ý dấu ngoặc đơn.

## strip!, chomp! và chop!
- `strip`: xoá hết các kí tự trắng được định nghĩa trong Ruby `\t\r\n\f\v`
```ruby
str = "Liberty Fish   \r\n"
str.strip!
#=> "Liberty Fish"
```
- `chomp!`: xoá đi kí tự hết dòng
```ruby
str = "Liberty Fish   \r\n"
str.chomp!
#=> "Liberty Fish   "
```
- `chop!`: xoá kí tự cuối của chuỗi. Nhưng nếu là `"\r\n"` thì xoá cả 2
```ruby
str = "Liberty Fish   \r\n"
str.chop!
#=> "Liberty Fish   "
```
```ruby
str = "Liberty Fish   \r\n"
str.chop!
#=> "Liberty Fis"
```
## Heredoc
Kết quả trả về của 1 chuỗi nhiều dòng sẽ chỉ tới ký tự Heredoc là hết
```ruby
data =  <<EOF
Hello,
World
EOF
"EOF"
#=> "Hello,\nWorld\n"
```
## delete
Method trông thì rất đơn giản nhưng lắt léo lại ở `^` và `-`.

`^` đánh dấu các phần tử được bỏ qua.

Còn `-` là từ đâu tới đâu

Ví dụ 
```ruby
puts "0123456789-".delete("^13-56-")
```
Đoạn trên sẽ bỏ qua 1,3, 5, 6, dấu - sau cùng và đoạn giữa 3 và 5 là 4. Đáp án là `13456-`
# Time
Chủ yếu phần này sẽ hay hỏi ở `strftime`
## Time + số
Các dạng `Time +` 1 số nào đó thì sẽ đều là chỉ số giây
## strftime
| Ký hiệu | Ý nghĩa |
|-|-|
|`%y`|Năm dạng tắt(ví dụ: 22)|
|`%Y`|Năm dạng đủ(ví dụ: 2022)|
|`%m`|Tháng(`01-12`)|
|`%M`|Số phút(`00-59`)|
|`%d`|Ngày(`01-31`)|
|`%D`, `%x`|Ngày tháng năm dạng `%m/%d/%y`|
|`%F`| `%Y-%m-%d`|

Ví dụ:
`Date.today.to_s` tương đương với `Date.today.strftime("%Y-%m-%d")` và tương đương `Date.today.strftime(%F)`
# File
## dirname
`dirname` là method dùng để chỉ directory ngoài cùng của file
```ruby
File.dirname("text.txt") # => "."
File.dirname("REx/text.txt") # => "REx"
File.dirname("Desktop/REx/text.txt") # => "Desktop/REx"
```
## File.open và các param
Đây cũng là 1 phần quan trọng. Nếu nắm được và nhớ được thì có thể ghi điểm
Với code `File.open('the_file_name.txt', XXXX)` thì tuỳ từng param ở vị trí `XXXX` sẽ có những xử lý như sau
|Param|Ý nghĩa|
|-|-|
|`'r'`|Chỉ đọc file|
|`'r+'`|Đọc file và ghi đè |
|`'w'`|Tạo mới và ghi đè(đọc sẽ báo lỗi `not opened for reading (IOError)`)|
|`'w+'`|Tạo mới, đọc và ghi đè|
|`'a'`|	Chỉ ghi thêm(đọc sẽ báo lỗi `not opened for reading (IOError)`)|
|`'a+'`|	Đọc và ghi thêm|
# Dir
## pwd

`pwd` trả về tên của client directory
```ruby
Dir.pwd # => "/Users/user/RubyExamination"
```
# Thread
Có 3 cách để tạo 1 Thread mới: `Thread.new`, `Thread.start` và `Thread.fork`

# Biến
- Hằng số trong Ruby bắt đầu bằng chữ cái alphabet viết in hoa: `CONST1 = 129`
- Biến global trong Ruby bắt đầu bằng `$`: `$var = "global"`
- Biến instance trong Ruby bắt đầu bằng `@`: `@var = "instance"`
- Biến class trong Ruby bắt đầu bằng `@@`: `@@var = "class"`. Phải được khởi tạo trước khi gọi trong method. Gọi 1 biến class chưa được định nghĩa sẽ xảy ra lỗi.
# Class trong Ruby
Đây là phần chắc chắn là đau đầu trong tương lai nếu chúng ta thi chứng chỉ Ruby Gold. Ở mức Silver mới dừng ở những khái niệm cơ bản Module, Class thôi =)))
## Cách định nghĩa Class và Module
Well, phần rất đơn giản thật =)) nhưng khi bạn có trộn thêm tí JS, Python để làm serverless trên AWS và thi thoảng phải động vào C# hay Java thì bạn đúng nghĩa là 1 Trại tâm thần đa ngôn ngữ.... lập trình :3 Nên cứ memo vào cho nó chắc để đỡ mất điểm oan

Định nghĩa module:
```ruby
module MyModule
  ...
end
```

Định nghĩa class:
```ruby
class MyClass
  ...
end
```
## attr_accessor, attr_writer & attr_reader
### attr_accessor:
```ruby
class Foo
  attr_accessor :a
end
```
tương đương với
```ruby
class Foo
  # getter
  def a
    @a
  end

  # setter
  def a=(val)
    @a = val
  end
end
```
Ta có thể gọi nhanh
```ruby
foo = Foo.new
foo.a, foo.b = "aaa", "bbb"

puts foo.a # => aaa
puts foo.b # => bbb
```
### attr_reader:
```ruby
class Foo
  attr_reader :a
  
  def initialize
    @a = "REx"
  end
end
```
tương đương với
```ruby
class Foo
  # getter
  def a
    @a
  end
  
  def initialize
    @a = "REx"
  end
end
```
khi đó
```ruby
foo = Foo.new
puts foo.a #=> 'REx'
```
### attr_writer:
```ruby
class Foo
  attr_writer :a
end
```
tương đương với
```ruby
class Foo
  # setter
  def a=(val)
    @a = val
  end
end
```
# Exception
```ruby
begin
  raise
rescue => e
  puts e.class
end
```
Mặc định đoạn code này trả về `RuntimeError`.
Tuy nhiên, nếu sau `raise` thiết lập error khác thì e.class sẽ là error thiết lập
```ruby
begin
  raise ArgumentError
rescue => e
  puts e.class   # => ArgumentError
end
```
# Quay lại bài toán ban đầu
```ruby
c = false || true ? true && false ? a | b : a & b : b ;
```

có thể phân tích rõ thành `c = (false || true) ? ((true && false) ? (a | b) : (a & b)) : b ;`

Với `false || true` luôn trả kết quả `true` nên `c = (true && false) ? (a | b) : (a & b)`

`true && false` trả kết quả `false` nên `c = a & b`

Vì vậy, với
```ruby
a = [1, 2, 3, 5, 8]
b = [1, 3, 6, 7, 8]
```
thì `c = a & b` là `[1, 3, 8]`
# Một số bài tập khác
## Bài tập 1
```ruby
hoge = 0
def hoge
  x = 0
  5.times do |i|
    x += 1
  end
  x
end
puts hoge #=> 0
```
Lý do: Biến số sẽ được ưu tiên trước method
## Bài tập 2
```ruby
class Foo
  @@var = 0

  def var
    @@var
  end

  def var=(value) 
    @@var = value
  end
end

class Bar < Foo
end

foo = Foo.new
foo.var += 1
bar = Bar.new
bar.var += 2

puts "#{foo.var}/#{bar.var}"
```
Kết quả sẽ trả về `3/3` do khi viết như trên,  `foo.var == bar.var`
# Kết bài
Việc memo thế này thực ra từ kiến thức Ruby và phải nói thật là học tủ vì các method của Ruby rất nhiều và cực khó nhớ. Đây là cái do mình đọc sách, làm đề và viết lại để ghi nhớ. Rất mong các bạn có phần nào tham khảo được.

Trong quá trình học với memo, do các lý do lười, tham khảo nhầm nguồn nên bài viết của mình sẽ có vài điểm sai sót. Rất mong bạn nào đang ôn thi phát hiện lỗi sai thì comment ở dưới để mình sửa lại bài

Chúc các bạn thành công như mình. Đây là phiếu báo điểm của mình.

![](https://images.viblo.asia/233e68bc-3108-4891-abfd-6335f2672a3f.png)