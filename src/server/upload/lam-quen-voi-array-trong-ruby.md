Bài viết này nằm trong series [Ruby cơ bản](https://viblo.asia/s/rubys-basically-JzKmgDYwl9N) của mình. Là cơ bản nên chỉ là những kiến thức hết sức cơ bản cho các bạn mới làm quen với Ruby. Bài viết này mình xin đề cập với các bạn về mảng.

![](https://images.viblo.asia/c8425aab-3eba-4736-a150-ed2d02fa5e16.png)

Mảng (**Array**) có lẽ là cấu trúc dữ liệu phổ biến nhất bạn sẽ sử dụng trong Ruby. Chúng cho phép bạn nhóm các dữ liệu lại với nhau thành một danh sách các phần tử. 

Các phần tử trong mảng không cần phải cùng kiểu, chúng có thể là bất cứ điều gì, ngay cả các mảng khác nếu bạn muốn.

**Array** trong Ruby được kế thừa từ **Object** và nó include module **Enumerable** (bạn có thể đọc thêm về Enumerable qua bài viết khác của mình ở [đây](https://viblo.asia/p/enumerable-trong-ruby-la-gi-va-tai-sao-ban-nen-su-dung-no-Ljy5VXGMZra))

### Khởi tạo một mảng
Dưới đây là một ví dụ về array:

```ruby
[1, 2, "a", :b, [3, 4], String.new, nil]
```

Bạn cũng có thể khởi tạo một array bằng method `new`. Nó có thể có kích thước ban đầu và đối tượng mặc định. Nếu bạn không chỉ định bất kỳ đối số nào, nó sẽ tạo ra một mảng trống.

```ruby
Array.new(2, :a) # => [:a, :a]
Array.new # => []
Array.new(3) # => [nil, nil, nil] 
```

Đối số thứ hai trong `Array.new` được sử dụng để điền vào mảng có tham chiếu đến đối tượng đó.

```ruby
my_array = Array.new(2, :a)
my_array.first.object_id # => 751068
my_array.last.object_id # => 751068
```

Nếu bạn muốn khởi tạo mảng với các đối tượng riêng biệt, bạn cần truyền cho nó một khối.

```ruby
Array.new(3) { |e| e + 4 } # => [4, 5, 6]
```

Và cách cuối cùng để bạn có thể khởi tạo mảng là dùng method `Kernel.Array()` (hoặc đơn giản chỉ cần `Array()`) và truyền object vào.

```ruby
Array(1) # => [1]
Array("a") # => ["a"]
Array({"a": 1, "b": 2}) # => [[:a, 1], [:b, 2]]
```

Còn thông thường, ta hay sử dụng cách khai báo như trên ví dụ đầu bài viết :)

```ruby
arr = [1, 2, "a"]
```

### Truy cập phần tử trong mảng
Khác với **Hash** truy cập theo key, ta truy cập đến phần tử trong mảng qua vị trí của nó. Trong mảng, các phần tử được đánh số từ 0. 

Bạn có thể sử dụng các method `[]`, `slice`, `at` với đối số là vị trí của phần tử trong mảng để truy cập đến phần tử đó.

Chỉ số âm thì sẽ được truy cập từ dưới lên. Ngoài ra thì còn có method `first` để truy cập phần tử đầu tiên, `last` để truy cập phần tử cuối cùng của mảng.

```ruby
my_array = ["z", 2, "a", :b, [3, 4]]

my_array[0] # => "z"
my_array.first # => "z"
my_array.at(1) # => 2
my_array.slice(2) # => "a"
my_array[-1] # => [3, 4]
my_array.last # => [3, 4]
```

Còn một cách khác nữa là dùng method `fetch` với đối số là vị trí của phần tử trong mảng. Cách dùng `fetch`  khác những cách bên trên ở việc nó sẽ trả về lỗi khi mà mảng không có phần tử nào với thứ tự truyền vào, những method kia sẽ trả về `nil`.

```ruby
my_array = [:a, :b]

my_array.fetch(1) # => :b
my_array.fetch(4)
# => IndexError (index 4 outside of array bounds: -2...2)
my_array.fetch(4, "Don't go beyond #{my_array.size-1}")
# => "Don't go beyond 1"

my_array[4] #=> nil
```

### Cách lấy ra nhiều phần tử
Phía trên mới chỉ đề cập đến việc mỗi lần chỉ lấy ra một phần tử duy nhất. Hãy xem để lấy ra nhiều phần tử trong mảng như thế nào.

Bạn có thể dùng cách chỉ rõ chỉ số bắt đầu và kết thúc, hoặc là khoảng của chỉ số, ví dụ:

```ruby
my_array = [1, 2, 3, 4, 5, 6]
my_array[2, 2] # => [3, 4]

my_array[0..1] # => [1, 2]
my_array[2..-1] # => [3, 4, 5, 6]
```

Method `take` với đối số dùng để lấy ra một số lượng các phần tử đầu tiên. Nếu muốn lấy 3 phần tử đầu tiên thì bạn chỉ cần gọi `take(3)` như sau:

```ruby
[1, 2, 3, 4, 5].take(3) # => [1, 2, 3]
```

Tương tự, bạn có thể lấy ra một số lượng các phần tử cuối cùng của mảng bằng cách bỏ đi một số phần tử đầu tiên, bằng method `drop`.
```ruby
my_array = [1, 2, 3, 4, 5]
my_array.drop(2) # => [3, 4, 5] 
my_array # => [1, 2, 3, 4, 5]
```

### Kiểm tra giá trị có tồn tại hay không
Đầu tiên và rõ ràng nhất là để xem nếu một phần tử có tồn tại ở tại một chỉ mục cụ thể. Và bạn đã biết làm thế nào để điều đó.
```ruby
[1, nil].slice(0) # => 1
[1, nil].slice(5) # => nil
[1, nil].slice(1) # => nil
```

Như thấy ở trên, làm như này với mảng có phần tử `nil` sẽ gây chút hiểu nhầm.

Nếu bạn muốn kiểm tra xem mảng có chứa phần tử với giá trị cụ thể nào đó không, bạn có thể sử dụng method `any?` hoặc là `include?` như sau.
```ruby
[1, 2, 3].any? { |n| n == 3 } # => true
[1, 2, 3].any? { |n| n == 4 } # => false

[1, 2, 3].include?(1) # => true
[1, 2, 3].include?(4) # => false
```

Khi mà bạn muốn trả về kết quả là giá trị đang kiểm tra hoặc là chỉ số của phần tử đó, ví dụ cần tìm phần tử có chữ cái đầu tiên là `d`, ta có thể dùng method `find` hoặc `find_index` như sau:
```ruby
["abc", "bcd", "dfg", "ghk", "dd"].find { |e| e =~ /^d.*/ } # => "dfg"

["abc", "bcd", "dfg", "ghk"].find_index { |e| e =~ /^d.*/ } # => 2
```
Lưu ý ở đây là method `find` và `find_index` sẽ trả về phần tử đầu tiên trong mảng thoải mãn điều kiện.

### Tính tổng của mảng các số
Bạn có 2 cách để làm và nên chọn method nào là tùy thuộc vào ngữ cảnh. Cách đơn giản nhất là với `sum`.
```ruby
[1, 2, 3].sum # => 6
```
Lưu ý là nếu phần tử là string thì `sum` vẫn hoạt khi bạn truyền đối số vào cho nó như sau:
```ruby
["a", "b", "c"].sum("") # => "abc"
```

Cách còn lại là bạn có thể sử dụng `inject` hoặc `reduce` (hai method này chỉ là định nghĩa tên khác nhau, còn công việc thực hiện thì như nhau, một số phiên bản Ruby sẽ khuyến cáo dùng `reduce`).

```ruby
[1, 2, 3].inject(:+) # => 6
[1, 2, 3].inject {|sum, n| sum + n } # => 6
[1, 2, 3].reduce(:+) # => 6
[1, 2, 3].reduce {|sum, n| sum + n } # => 6
```

### Lấy ra ngẫu nhiên phần tử
Đơn giản nhất là bạn hãy dùng method `sample` để lấy ra ngẫu nhiên 1 hoặc nhiều phần tử trong mảng, như ví dụ sau:
```ruby
[1, 2, 3, 4, 5, 6].sample # => 4
[1, 2, 3, 4, 5, 6].sample(3) # => [2, 1, 4]
```

### Xóa các phần tử trùng nhau
Ruby cung cấp cho ta method `uniq` - trả về mảng mới sau khi đã loại bỏ các phần tử trùng lặp.
```ruby
[1, 1, 2, 2, 3].uniq # => [1, 2, 3]
[1, 2, 1, 4, 3, 3, 1].uniq # => [1, 2, 4, 3] 
```

### Sắp xếp mảng
Ta sẽ dùng method `sort` -  mặc định sắp xếp theo thứ tự tăng dần. Hoặc bạn có thể truyền một block vào method `sort` để chỉ ra cách ta so sánh hai phần tử trong mảng như nào để sắp xếp lại mảng. 
Nếu muốn sắp xếp mảng giảm dần, bạn có thể làm như sau:
```ruby
[3, 2, 4].sort { |a, b| b <=> a } # => [4, 3, 2]
```
Hoặc có thể kết hợp `sort` thông thường và `reverse` như sau:
```ruby
[3, 2, 4].sort.reverse # => [4, 3, 2]
```
Ngoài ra, khi xử lý với dữ liệu phức tạp hơn, bạn có thể sử dụng method `sort_by` để có hiệu quả tốt hơn.
```ruby
names = [{name: "John", age: 10}, {name: "Jane", age: 12}, {name: "Bill", age: 13}]
names.sort_by { |h| h[:name] }
# => [{:name=>"Bill", :age=>13}, {:name=>"Jane", :age=>12}, {:name=>"John", :age=>10}]
 names.sort_by { |h| h[:age] } 
 # => [{:name=>"John", :age=>10}, {:name=>"Jane", :age=>12}, {:name=>"Bill", :age=>13}] 
```

### Xóa phần tử rỗng trong mảng
Giả sử bạn đang muốn lấy ra một mảng con từ một mảng ban đầu sau khi đã loại hết phần tử rỗng, bạn có thể truyền một block vào method `inject` như sau:
```ruby
["a", "", "b", " "].reject(&:empty?) # => ["a", "b", " "]
```
Và có thể kết hợp với `strip` để có kết quả đẹp hơn:
```ruby
["a", "", "b", " "].reject { |e| e.strip.empty? } # => ["a", "b"]
```
Bonus thêm cho các bạn method `compact` - loại bỏ hết tất cả phần tử `nil` ở trong mảng.
```ruby
["a", "", "b", " ", nil].reject { |e| e.strip.empty? } # => ["a", "b"]
# => NoMethodError (undefined method `strip' for nil:NilClass)

["a", "", "b", " ", nil].compact # => ["a", "", "b", " "] 
["a", "", "b", " ", nil].compact.reject { |e| e.strip.empty? } # => ["a", "b"]
```

### Gộp các mảng lại với nhau
Cách thứ nhất đơn giản là dùng toán tử `+`
```ruby
[1, 2] + [2, 3, 4] # => [1, 2, 2, 3, 4]
```
Có thể thấy là phần tử `2` bị lặp lại, và nếu điều này bạn không mong muốn thì ta có thể chuyển qua sử dụng `|`.
```ruby
[1, 2] | [2, 3, 4] # => [1, 2, 3, 4]
```
Ở cả hai cách bên trên thì ta sẽ tạo ra một mảng mới, nếu muốn thay đổi ngay trên mảng đang có, bạn có thể làm như sau:
```ruby
my_array = [1, 2]
my_array += [2, 3, 4] # => [1, 2, 2, 3, 4]
```

### Kết hợp mảng thành chuỗi
Bạn có thể dùng `join` (có đối số nếu cần) để nối các phần tử trong mảng thành một chuỗi. 
```ruby
["a", "b", "c"].join # => "abc"
["a", "b", "c"].join(" ") # => "a b c"
```
Còn muốn ngược lại từ chuỗi thành mảng thì bạn có thể dùng `chars` hoặc `split`.
```ruby
"abc".chars # => ["a", "b", "c"]
"abc".split("") # => ["a", "b", "c"]
```

### Vòng lặp qua mảng
Có nhiều method hỗ trợ bạn chạy vòng lặp qua các phần tử trong mảng.

* `each`: dùng khi bạn không mấy quan tâm đến chỉ số
* `each_with_index`: dùng để lấy ra cặp giá trị -  chỉ số
* `each_index`: chỉ lấy ra chỉ số
* `map`: khi muốn từ một mảng ban đầu sinh ra một mảng mới
* `select`: khi muốn lấy ra một mảng con theo điều kiện
* `inject`: dùng để đưa ra một kết quả duy nhất từ các phần tử của mảng

### Kết
Hi vọng bài viết sẽ có ích với bạn.

### Tham khảo

- https://mixandgo.com/learn/learn-how-to-use-ruby-arrays