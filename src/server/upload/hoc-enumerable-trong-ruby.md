Với bất kì ngôn ngữ lập trình nào cũng như dự án nào thì xử lý dữ liệu luôn là một trong những vấn đề hiện hữu. Dạo gần đây dự án của mình gặp phải trường hợp xử lý khối lượng dữ liệu rất lớn. Yêu cầu xử lý dữ liệu phức tạp. Phải xử lý trên cả client và server. Từ đó mình nhận ra một điều, xử lý trên ruby sung sướng hơn trên javascript nhiều. Ở đây mình xử lý nhiều nhất là array, string, hash, tất cả là nhờ có Enumerable.
Enumerable trong Ruby có thể gọi là là interface được những class như Array, Hash, Set implement.Theo đúng thuật ngữ Ruby, thì module Enumerable được những class trên include.

![](https://images.viblo.asia/eb93d1d4-662f-47b4-8b2e-b0d7da129533.jpg)

Có thể thấy việc thành thạo các phương thức trong  Enumerable là bước tiến lớn khi học Ruby. Tiếp đó bạn có thể dễ dàng chuyển ang Java 8, Scala, Erlang v.v. bạn sẽ thấy rất thoải mái, vì chúng cũng có mặt trong thư viện chuẩn của các ngôn ngữ này. Nhưng theo mình thì đó cũng là đôi chút gì ấy khiến bản thân chúng ta lười đi, vì nếu cần xử lý thuần tuý trong những ngôn ngữ không function, thư viện hỗ trợ, done, ta đâu biết các chúng xử lý như nào.
Ví dụ đơn giản nhất mà ai đọc qua tài liệu về ruby cũng biết được:

```
names = ['Lee', 'Kim', 'Sun']

for name in names
  puts name
end
```

Thay vì viết như trên để in ra các phần tử của names, ta có thể viết ngắn gọn:
```

names = ['Lee', 'Kim', 'Sun']

names.each { |name| puts name }
```

Quá đơn giản!

Nhưng thôi, học các dễ trước mới học cái khó,  trong bài viết này mình sẽ giới thiệu vài method tiện dụng của Enumerable, nếu dùng chương trình sẽ súc tích và sáng sủa. Phần ví dụ dùng array cho thống nhất, nói chung chúng vẫn đúng nếu thay array bằng hash hay cái gì đó đã include module này.

### any? và all?
Khi muốn kiểm tra trong tập hợp có ít nhất một phần tử thỏa mãn tính chất nào đó hay không, ta dùng any?
Khi muốn kiểm tra xem tất cả phần tử có thỏa mãn tính chất nào đó hay không, ta dùng all?

```
a = [1, 2, 3]
at_least_less_than_2 = a.any? { |e| e < 2 }
=> true
all_less_than_2 = a.all? { |e| e < 2 }
=> false
```

### chunk

***Khi muốn xử lý từng phần tử , gom chúng lại dựa trên điều kiện trong block***

Ví dụ gom các số lẻ và các số chẵn liên tiếp?

```
[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5].chunk { |n|
  n.even?
}.each { |even, ary|
  p [even, ary]
}
#=> [false, [3, 1]]
#   [true, [4]]
#   [false, [1, 5, 9]]
#   [true, [2, 6]]
#   [false, [5, 3, 5]]
```

Method này đặc biệt hữu ích với những chuỗi các phần tử đã được sắp xếp. Ví dụ sau tính số từ cho mỗi chữ cái đầu tiên:


```
open("/usr/share/dict/words", "r:iso-8859-1") { |f|
  f.chunk { |line| line.ord }.each { |ch, lines| p [ch.chr, lines.length] }
}
#=> ["\n", 1]
#   ["A", 1327]
#   ["B", 1372]
#   ["C", 1507]
#   ["D", 791]
#   ...
```


### map/collect
***Biến array thành array cùng kích thước: dùng map***

Biến array a1 thành array a2 có cùng số phần tử, dùng map (có alias là collect) rất tiện. Ý tưởng của nó chính là phép ánh xạ y = f(x) trong toán học, để biến từng phần tử x của a1 thành phần tử y của a2.

Thay vì có thể viết: 

```
names =['Lee', 'Kim', 'Sun']
uppercase_names = []

names.each do |name|
  uppercase_names << name.upcase end uppercase_names #=> ["LEE", "KIM", "SUN"]
```

Dùng collect ta sẽ viết ngắn gọn lại được thành

```
names = ['Lee', 'Kim', 'Sun']

uppercase_names = names.collect { |name| name.upcase }

uppercase_names
#=>['LEE', 'KIM', 'SUN']
```

Ví dụ khác, tương tự từ a1 chứa tên ảnh, ta muốn tạo a2 chứa URL có dạng y = http://my/path/x. Nếu chỉ quen với C, ta viết như sau:

```
a1 = ['asian.jpg', 'ebony.jpg']

a2 = []  # Initialize
a1.each do |e|
  a2 << "http://my/path/#{e}"
end
```
Nếu dùng map:

```
a1 = ['asian.jpg', 'ebony.jpg']
a2 = a1.map { |e| "http://my/path/#{e}" }
#=> ["http://my/path/asian.jpg", "http://my/path/ebony.jpg"]
```


collect là alias của map, nếu ko đưa ra block, collect sẽ return enumerator

```
(1..4).map { |i| i*i }     
#=> [1, 4, 9, 16]
(1..4).collect { "cat"  }   
#=> ["cat", "cat", "cat", "cat"]
(1..4).collect { |i| i + 1  } 
#=> [2, 3, 4, 5]
```

### select/find_all
***Biến array thành array nhỏ hơn: dùng select***

Muốn chọn những phần tử thoả mãn điều kiện nào đó từ array, ta dùng select (có alias là find_all). Trái nghĩa với select là reject.

```
a = [1, 2, 3, 4]
evens = a.select { |e| e%2 == 0 }
#=> [2, 4]
```

Trong thực tế thay vì :
```
array_input = ['alive', 'dead', 'dead', 'alive', 'alive', 'dead']
array_output = []

array_input.each do |element
  if array_input == 'alive'
    array_output << element
  end
end
array_output 
#=> ["alive", "alive", "alive"]
```
Hãy viết:

```
array_input = ['alive', 'dead', 'dead', 'alive', 'alive', 'dead']

array_output = array_input.select do |e|
  e == 'alive'
end

array_output #=> ['alive', 'alive', 'alive']
```

### inject
***Kết hợp tất cả phần tử của array thành một biến duy nhất: dùng inject***

Khi muốn tạo giá trị scalar (1 chiều) từ các phần tử của array (đa chiều), ví dụ để tính tổng của các phần tử, thường ta viết như sau:

```
a = [1, 2, 3]

sum = 0
a.each do |e|
  sum += e
end
```
Nếu dùng inject:
```

a = [1, 2, 3]
sum = a.inject(0) { |tmp, e| tmp += e }
```


### join
***Nối tất cả phần tử của array thành chuỗi: dùng join***

Join chỉ có trong Array. Rất nhiều khi ta muốn nối các phần tử của array lại thành một chuỗi, cách nhau bởi dấu phẩy chẳng hạn. Nếu tự viết thì rất lắt nhắt vì dấu phẩy phải nằm xen kẽ giữa các phần tử.

Dùng join thì ta chỉ cần viết đơn giản như sau:

```
a = [1, 2, 3]
s = a.join(", ")
# => "1, 2, 3"
```

### circle
***Gọi 1 block với mỗi element n lần***

`cycle(n=nil) { |obj| block } → nil`

```
a = ["a", "b", "c"]
a.cycle { |x| puts x }  # print, a, b, c, a, b, c,.. forever.
a.cycle(2) { |x| puts x } 
#a
#b
#c
#a
#b
#c
#=> nil
```

### Grep
***Lấy tất cả các element giống với pattern ***

```
(1..100).grep 38..44 
#=> [38, 39, 40, 41, 42, 43, 44]
c = IO.constants
c.grep(/SEEK/)        
#=> [:SEEK_SET, :SEEK_CUR, :SEEK_END]
res = c.grep(/SEEK/) { |v| IO.const_get(v) }
res                   
#=> [0, 1, 2]
```

### group_by 

***Nhóm các kết quả theo block, trả về một hash với value là các hash kết quả.***

```
(1..6).group_by { |i| i%3 } 
#=> {0=>[3, 6], 1=>[1, 4], 2=>[2, 5]}
````


### partition

***Trả về mảng 2 array, 1 thỏa mãn block, 1 là phần còn lại.***

```
(1..6).partition { |v| v.even? }
#=> [[2, 4, 6], [1, 3, 5]]
```


### Zip

***Merge 2 array, mỗi phần tử hợp thành array vs phần tử tương ứng trong mảng còn lại.***

```
a = [ 4, 5, 6 ]
b = [ 7, 8, 9 ]

a.zip(b)                 #=> [[4, 7], [5, 8], [6, 9]]
[1, 2, 3].zip(a, b)      #=> [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
[1, 2].zip(a, b)         #=> [[1, 4, 7], [2, 5, 8]]
a.zip([1, 2], [8])       #=> [[4, 1, 8], [5, 2, nil], [6, nil, nil]]

c = []
a.zip(b) { |x, y| c << x + y }  #=> nil
c                               #=> [11, 13, 15]
```

### Tự tạo Class Enumerable cho bản thân
Bạn cũng có thể tạo một class mang các thuộc tính của enumerable bằng cách include module Enumerable.
```
class school
  include Enumerable

  attr_accessor :students

  def initialize
    @students = []
  end

  def each &block
    @students.each { |student| block.call(student) }
  end
end
```

```
irb(main):002:0> require 'school.rb'
=> true
irb(main):003:0> school =  School.new
=> #
irb(main):004:0> school.students =  ['Lee', 'Kim', 'Sun']
=> ["Mesut Özil", "Leo Messi", "Xavi Alonso"]
irb(main):005:0> school.map { |student| student.upcase }
=>  ['LEE', 'KIM', 'SUN']
```

Trên đây là những ví dụ rất cơ bản về enumerable, tuy nhiên không phải ai cũng có thể ứng dụng thành thạo, linh hoạt trong xử lý dữ liệu hằng ngày. Chúc các bạn có thể ứng dụng giúp tăng tốc độ xử lý hash array trong từng dòng code của mình.


Ngoài ra đương nhiên ta có thể tham khảo thêm về enumerable trên doc của ruby : https://ruby-doc.org/core-2.5.1/Enumerable.html