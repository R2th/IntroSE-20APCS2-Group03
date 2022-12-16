**Ruby** là một ngôn ngữ lập trình không hề dễ nhằn đối với một lập trình viên chuyển từ một ngôn ngữ như **Java**, **Python** hay **PHP**. Đó là bởi tính độc đáo của **Ruby**. **Ruby** được ***Yukihiro Matsumoto*** tạo ra nhằm mục đích khiến cho lập trình viên cảm thấy hạnh phúc hơn, vì code của nó rất gần với ngôn ngữ của con người, dễ đọc dễ viết ... và cũng dễ nhầm bởi chính sự đa dạng, biến ảo khôn lường nhưng bản chất lại vô cùng đơn giản của **Ruby**. Hôm nay nhân một ngày đẹp trời mình xin được giới thiệu cho các bạn top những tricks trong **Ruby** mà những bậc cao nhân hay dùng để tối ưu code hay đôi khi chỉ là làm cho nó nhìn vui hơn (khó đọc hơn :D). Mục đích của mình là muốn giúp bạn đọc những dòng code xịn mà không bị ngợp hay là tự tay viết những đoạn code **Ruby** thực sự ngầu và make yourself happy. Let's begin!
# 1. Một vài shortcuts cơ bản mà bạn nên nắm vững
Có một vài cách ngắn gọn để tạo ra một số đối tượng trong **Ruby**, ví dụ như sử dụng `[]` để tạo Array hay `{} `để tạo Hash (hoặc block/Proc). Ngoài ra còn một vài trường hợp đơn giản khác để tạo strings, regexes hay thực thi các câu lệnh trên shell. 

Những ví dụ ở đây mình sử dụng `{} `làm kí hiệu giới hạn, nó có thể được thay thế bằng cặp khác theo quy tắc của **Ruby**. 
### Strings
`%{} `hay `%Q{}` đều có thể sử dụng  tương đương như với sử dụng một double quotes string, có thể chứa string interpolation. Cách viết này thường hữu ích khi bạn không muốn quan tâm đến việc xuất hiện một dấu nháy kép có thể bị escape nếu tạo xâu theo cách thông thường.

![](https://images.viblo.asia/dab87027-39f5-4eb2-9ec8-e55081fadc05.png)

Bên cạnh đó `%q{}` là cách tương tự như việc tạo ra một single quote string, và do đó không thể chứa string interpolation.

![](https://images.viblo.asia/9065d5d9-7046-47e3-abbe-b3d9c8c3380f.png)
### Arrays
`%w` có thể dùng tương tự như sử dụng` String#split`. Nó lấy một string và tách nó thành một mảng dựa vào các khoảng trắng (white space). Tuy nhiên khoảng trắng này cũng có thể được escape. `%W `cũng tương tự nhưng nó cho phép string interpolation.

![](https://images.viblo.asia/a4ea10b2-056c-46d4-a78c-c07874d4866f.png)
### Regexes
Sử dụng `%r` có thể thay thế cho cặp `// `để tạo một đối tượng regexes. Thường cách viết này được dùng khi chúng ta không muốn phải escape dấu `/` chứa bên trong regexes.

![](https://images.viblo.asia/f660149b-532a-4b50-94cd-6d973a04477f.png)
### Symbol
`%s `có thể tạo symbol thay vì viết symbol như thế này `:foo`. Cũng như những trường hợp trên, cách viết này loại bỏ vấn đề escaping symbol, tuy nhiên không giống với `:""`, nó không cho phép string interpolation.


![](https://images.viblo.asia/91e319f1-bc98-4821-8728-da6a3191b8a5.png)
### Shelling out
Như ta đã biết, khi text được bao bọc bởi backquotes (kí tự **\`**, hay còn gọi là backticks), thì đoạn text được xem như là một literal của double-quoted string. Giá trị của literal đó được truền tới một phương thức đặc biệt tên là **Kernel.\`**. Phương thức này thực thi dòng lệnh như một câu lệnh shell trên hệ điều hành và trả về kết quả là một string.
Thay vì sử dụng backticks ta có thể dùng `%x`, và cũng giống như backticks nó cung cấp cơ chế string interpolation.

![](https://images.viblo.asia/9ee3bc3c-c396-4c46-b311-c82e6f90da61.png)
### Array#join
Chúng ta đã nhiều lần được nhìn thấy việc sử dụng Array#* với một số, để nhân kích thước mảng lên bằng cách thêm vào duplicate của nó.

![](https://images.viblo.asia/b65b10cf-788c-4675-bcbd-ec79e82ca4b7.png)

Nhưng bạn có biết rằng thay vì sử dụng số mà dùng một string làm đối số của `Array#*` thì nó sẽ thực hiện một phép kết nối?

![](https://images.viblo.asia/1d84d20f-1b4c-44dd-ab62-fc4813841a1a.png)
### Lambda literal
Một cách đơn giản và được sử dụng tương đối nhiều trong thời gian gần đây để định nghĩa scope trong Rails, đó là sử dụng kí hiệu `->`, hay chính là hiện diện của Lambda Literal, cho phép bạn dễ dàng tạo ra một biểu thức lambda.

![](https://images.viblo.asia/ea71d77c-61be-45e5-8d85-075ada183244.png)
# 2. Một số tricks thú vị bạn nên tập làm quen để trở nên pro hơn
Dưới đây là một số tricks theo mình thấy là tương đối hay ho mà có lẽ bạn đã được thấy ở đâu đó. Luyện được những tricks này có lẽ trình **Ruby** của bạn đã ở mức cứng cựa rồi. Hãy khám phá xem bạn sẽ tìm được điều gì mới ở đây nào!
###  Tham số dạng *, **

Hãy quan sát ví dụ dưới đây
```ruby
def my_method  a, *b, **c
    return a, b, c
end
```
Trong đó a sẽ là một tham số bình thường. `*b` sẽ nhận tất cả các tham số truyền vào đứng phía sau cái đầu tiên và đặt chúng vào một mảng. `**c` sẽ nhận bất cứ tham số nào truyền vào dưới dạng key: value ở cuối của lời gọi hàm.
```ruby
my_method 1
# => [1, [], {}]
```
```ruby
my_method 1, 2, 3, 4
# => [1, [2, 3, 4], {}]
```
```ruby
my_method 1, 2, 3, 4, a: 1, b: 2
# => [1, [2, 3, 4], {:a=>1, :b=>2}]
```
### Xử lý một object đơn giống như một mảng
Đôi khi trong metaprogramming bạn sẽ gặp nhiều trường hợp phải handle dữ liệu một cách linh hoạt, ví dụ với trường hợp này ta muốn xử lý một object đơn hoặc một mảng các objects. Thay vì phải kiểm tra trường hợp loại option nào được truyền vào, bạn có thể sử dụng `[*something]` hoặc` Array(something)`.

Hãy cùng xem ví dụ dưới đây
```ruby
num = 1
num_arr = [1, 2, 3]
```
Giả sử rằng bạn muốn lặp qua các phần tử dù cho cái nhận vào chỉ là một object đi chăng nữa, bạn có thể dùng:
```ruby
[*num].each { |s| s }
[*num_arr].each { |s| s }
```
hoặc
```ruby
Array(num).each { |s| s }
Array(num_arr).each { |s| s }
```
### Tham số Hash dạng bắt buộc
Cái này có bắt đầu từ Ruby 2.0. Thay vì chỉ định nghĩa ra mọt phương thức nhận một hash làm tham số như thế này
```ruby
def my_method {}
end
```
Bạn có thể chỉ định keys bắt buộc thậm chí cả giá trị mặc định cho chúng. Như ví dụ dưới đây thì `a` và `b` là các khóa bắt buộc, trong khi `c` là optional.
```ruby
def my_method a:, b:, c: 'default'
  return a, b, c
end
```
Chúng ta thử gọi hàm chỉ với` a: 1` thì sẽ thấy không được vì còn thiếu khóa `b:`
```ruby
my_method a: 1
# => ArgumentError: missing keyword: b
```
Trong khi đó nếu thiếu `c:` thì hoàn toàn không vấn đề gì vì nó đã có giá trị mặc định
```ruby
my_method a: 1, b: 2
# => [1, 2, "default"]
```
Bạn cũng có thể thay đổi giá trị của `c` bằng cách truyền vào tất cả chúng
```ruby
my_method a: 1, b: 2, c: 3
# => [1, 2, 3]
```
bạn cũng có thể truyền vào hẳn một hash chứa các key yêu cầu
```ruby
hash = {a: 1, b: 2, c: 3}
my_method hash
# => [1, 2, 3]
```
### Phương thức tap
Đây là một phương thức khá hay, nó yields x cho block sau đó trả về x. Tap ở đây có nghĩa là "vòi nối", mục đích của nó là để ráp nối các method chain, nhằm thực hiện một chuỗi hành động trên kết quả trung gian bên trong chuỗi đó. Hãy để ví dụ làm rõ hơn

![](https://images.viblo.asia/6ef4345b-3e6f-4d92-b97a-90b40365bbd2.png)

Về cơ bản phương thức tap yields đối tượng được gọi cho block và trả về chính nó. Đôi khi có thể được dùng kiểu như sau
```ruby
def init_user
  User.new.tap do |o|
    o.a = 1
    o.b = 2
    o.c = 3
  end
end
```
sẽ dễ đọc hơn thay vì viết kiểu này
```ruby
def init_user
  o = User.new
  o.a = 1
  o.b = 2
  o.c = 3
  o
end
```
### Deep copy
Khi bạn copy một đối tượng chứa các đối tượng khác, ví dụ như Array, bạn thực chất sẽ chỉ copy một reference đến đối tượng đó thôi. Bạn có thể thấy rõ qua ví dụ dưới đây:
```ruby
food = %w(bread milk orange)
food.map(&:object_id)       # => [35401044, 35401020, 35400996]
food.clone.map(&:object_id) # => [35401044, 35401020, 35400996]
```
Bằng cách sử dụng `Marshal `class (thường được dùng cho serialization), bạn có thể tạo ra một "deep copy" của một đối tượng.
```ruby
def deep_copy obj
  Marshal.load Marshal.dump(obj)
end
```
Thử sử dụng nó bạn sẽ thấy kết quả
```ruby
deep_copy(food).map(&:object_id) # => [42975648, 42975624, 42975612]
```
### Liên quan đến performance
**1. Đừng sử dụng exception cho điều khiển luồng (control flow)**

Dưới đây là một ví dụ cho ta thấy được sử dụng exception để điều khiển luồng so với sử dụng câu điều kiện chậm đến mức nào
```ruby
require 'benchmark'

class Obj
  def with_condition
    respond_to? :mythical_method ? self.mythical_method : nil
  end

  def with_rescue
    self.mythical_method
  rescue NoMethodError
    nil
  end
end

obj = Obj.new
N = 10_000_000

puts RUBY_DESCRIPTION

Benchmark.bm(15, "rescue/condition") do |x|
  rescue_report     = x.report("rescue:")    { N.times { obj.with_rescue    } }
  condition_report  = x.report("condition:") { N.times { obj.with_condition } }
  [rescue_report / condition_report]
end
```
và đây là kết quả

![](https://images.viblo.asia/8f148820-d7c8-4619-b7b5-9b02a99d60ca.png)

**2. String concatenation**

Bạn nên bỏ thói quen nối string bằng `+=` mà hãy dùng `<<` thay thế. Mặc dù kết quả là hoàn toàn giống nhau nhưng điểm khác biệt ở đây là gì?

Hãy xem ví dụ:
```ruby
str1 = "first"
str2 = "second"
str1.object_id       # => 16241320

str1 += str2    # str1 = str1 + str2
str1.object_id  # => 16241240, id is changed

str1 << str2
str1.object_id  # => 16241240, id is the same
```
Khi bạn dùng `+=` **Ruby** tạo ra một đối tượng tạm thời là kết quả của `str1 + str2`. Sau đó nó thay thế `str1` bằng reference đến đối tượng vừa được tạo. Trong khi đó `<<` sẽ chỉnh sửa trên chính xâu gốc.

Do vậy việc sử dụng `+=` tạo ra một vài bất lợi sau đây:
* Thêm công việc tính toán để nối string
* Một đối tượng string bị thừa trong bộ nhớ (giá trị cũ của `str1`)

Kết quả dưới đây cho thấy độ chậm của phép `+=` gây ra phụ thuộc vào độ dài của string nó thao tác như thế nào
```ruby
require 'benchmark'

N = 1000
BASIC_LENGTH = 10

5.times do |factor|
  length = BASIC_LENGTH * (10 ** factor)
  puts "_" * 60 + "\nLENGTH: #{length}"

  Benchmark.bm(10, '+= VS <<') do |x|
    concat_report = x.report("+=")  do
      str1 = ""
      str2 = "s" * length
      N.times { str1 += str2 }
    end

    modify_report = x.report("<<")  do
      str1 = "s"
      str2 = "s" * length
      N.times { str1 << str2 }
    end

    [concat_report / modify_report]
  end
end
```
Kết quả

![](https://images.viblo.asia/7f54e709-92f2-429b-8f00-034711d6697e.png)

**Sử dụng bang! methods**

Đây là những phương thức làm biến đổi chính đối tượng gọi nó. Ưu điểm của các phương thức này là thực hiện cùng công việc với các non-bang methods mà không tạo ra một đối tượng nhân bản. 

Quan sát ví dụ:
```ruby
require 'benchmark'

def merge! array
  array.inject({}) { |h, e| h.merge!(e => e) }
end

def merge array
  array.inject({}) { |h, e| h.merge(e => e) }
end

N = 10_000
array = (0..N).to_a

Benchmark.bm(10) do |x|
  x.report("merge!") { merge!(array) }
  x.report("merge")  { merge(array)  }
end
```
Kết quả:

![](https://images.viblo.asia/bd01cd2b-d834-4c6f-8e6b-0b62c9272d48.png)

**Phép gán song song có thực sự nhanh hơn gán tuần tự?**
```ruby
require 'benchmark'

N = 10_000_000

Benchmark.bm(15) do |x|
  x.report('parallel') do
    N.times do
      a, b = 10, 20
    end
  end

  x.report('consequentially') do |x|
    N.times do
      a = 10
      b = 20
    end
  end
end
```
Và đây là kết quả:

![](https://images.viblo.asia/46967b35-b291-4511-bed2-a417b107bffe.png)

Oops, thực sự thì nó chỉ nhanh đối với chúng ta thôi, còn đối với máy tính và đối với chương trình thì nó không nhanh như ta tưởng. Vậy nên bạn hãy lưu ý và hạn chế sử dụng nhé.
# Kết luận
Trên đây là những hiểu biết cũng như những gì mình tìm hiểu được trong quá trình đào sâu nghiên cứu về **Ruby**. Đối với phần một - những shortcuts cơ bản bạn nên tìm hiểu nhiều hơn và nắm vững chúng cũng như sử dụng chúng một cách hợp lý. Quan trọng là hiểu được bản chất và từ cái nền móng cơ bản như vậy, bạn mới có thể có khả năng tìm tòi những thứ cao siêu hơn. Sang phần thứ hai - những tricks thú vị mà có thể bạn chưa biết, các bạn hãy tập thói quen sử dụng chúng thường xuyên hơn vì hầu hết chúng giúp bạn cải thiện hiệu năng và độ sáng của code, điều mà biến bạn trở thành một ***PRO-grammer***. Tóm lại, qua bài viết này mình mong rằng sẽ giúp các bạn nâng cao kiến thức của mình về **Ruby** với một cái nhìn mới mẻ hơn, hi vọng các bạn sẽ có thêm niềm yêu thích hơn đối với **Ruby** qua sự kì diệu cũng như tính thử thách của nó. Nhưng **Ruby** cũng như một cô gái vậy, càng challenge thì bạn càng muốn nhảy bổ vào phải không? :D Phần dưới mình xin gửi các bạn một vài resources gốc về chủ đề này mà mình đã tìm hiểu và tham khảo nội dung, hãy đọc thêm để biết thêm nhiều chi tiết thú vị hơn nhé! Happy coding!
# Tài liệu tham khảo
[Ruby performance tricks - Sergey Potapov](http://greyblake.com/blog/2012/09/02/ruby-perfomance-tricks/)

[11 Ruby Tricks You Haven't Seen Before - RubyGuides](http://www.rubyguides.com/2016/01/ruby-tricks/)

[Ruby Shortcuts - CaiusTheory](http://caiustheory.com/ruby-shortcuts/)

[21 Ruby Tricks You Should Be Using In Your Own Code](http://www.rubyinside.com/21-ruby-tricks-902.html)

[10 Ruby tricks to improve your code (or not) - Devblast](https://devblast.com/b/ruby-tricks-improve-code)