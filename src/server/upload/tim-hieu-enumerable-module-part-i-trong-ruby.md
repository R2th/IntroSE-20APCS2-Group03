### **Trong bài viết này ta sẽ tìm hiểu về 2 thứ đó là:**
###### **- Enumerable module**
###### **- Enumerator class**<br><br>
###### **1. Enumerable module**<br>
－ Module này bao gồm:
* Traversal methods
* Searching methods
* Sorting methods

-----


－ Có vài class trong Ruby include module này theo mặc định như Array, Hash, Range.<br>
－ Bây giờ ta sẽ đi vào chi tiết của 3 loại method traversal, sorting và searching.<br>
```ruby
pry(main)> [1, 2, 3, 4, 5].map {|n| n + 1}
=> [2, 3, 4, 5, 6]
pry(main)> %w[d a n g v a n n a m].sort
=> ["a", "a", "a", "d", "g", "m", "n", "n", "n", "v"]
pry(main)> [16, 6, 2018].first
=> 16
```
Đầu tiên, ta sử dụng phương pháp khá phổ biến đó là map method. <br>
Sau đó, ta sử dụng sort method, sắp xếp theo thứ tự chữ cái tăng dần theo mặc định.<br>
Cuối cùng, ta sử dụng searching method **first** để fetch item đầu tiên của mảng.<br><br>
##### **Include Enumerable module**<br>
Một lớp bao gồm module Enumerable phải trả về each method:<br>
```ruby
class Users
  include Enumerable
  def initialize
    @users = %w[Mai Tao Bao]  
  end
end
pry(main)> Users.new.map { |user| user.upcase }
NoMethodError: undefined method `each' for <Users:000fff>
```
Trong ví dụ trên, NoMethodError được raised bởi vì Enumerable#map method làm cho việc gọi each method không được định nghĩa trong class Users.<br>
Vì vậy, ta sẽ định nghĩa nó<br>
```ruby
class Users
  include Enumerable
  def initialize
    @users = %w[Mai Tao Bao] 
  end
  def each
    for user in @users do
      yield user
    end
  end
end
pry(main)> Users.new.map { |user| user.upcase }
=> ["MAI", "TAO", "BAO"]
```
Ở đây, chúng ta định nghĩa Users#each method, trong đó ta lặp qua mảng @users, chúng ta yield từng giá trị của mảng @users<br>
Vì Users#each method được định nghĩa nên Enumerable#map method có thể sử dụng nó và nhận từng user làm đối số cho block.<br><br>
###### **2. Enumerator class**
－ Cách sử dụng một Enumerator<br>
```ruby
pry(main)> enumerator = [1, 5, 7, 8].map
#<Enumerator: [1, 5, 7, 8]:map>
```
Nếu không có đối số nào được truyền đến **map**(hoặc gần như tất cả các method của Enumerable module) thì một thể hiện của lớp Enumerator được trả về.<br>
```enumerator``` là liên kết giữa mảng ```[1, 5, 7, 8]``` với **map** method<br>
```ruby
pry(main)> enumerator.each { |n| puts n; n + 1 }
1
5
7
8
=> [2, 6, 8, 9]
```
Trong ví dụ trên, map method được thực hiện trong ngữ cảnh của each method.<br>
Ta có thể thấy, enumerator chỉ thực hiện một lần nội dung trong block<br>
Trường hợp này sử dụng không hiệu quả lắm vì thế ta có thể gọi map method kiểu sau: `[1, 5, 7, 8].map { |n| puts n; n + 1 }` nó sẽ tương tự so với việc ta sử dụng ```enumerator.each``` trong ví dụ bên trên.<br>
Tiếp theo, ta xét ví dụ sau:
```ruby
pry(main) %w[VietNam NhatBan HanQuoc].map.with_index do |q, index|
pry(main)*   "STT: #{index + 1}, QuocTich: #{q}"  
pry(main)* end  
=> ["STT: 1, QuocTich: VietNam", "STT: 2, QuocTich: NhatBan", "STT: 3, QuocTich: HanQuoc"]
```
Vì ```map_with_index``` chưa phải là một phần của ```Enumerable``` module nên cách phù hợp nhất để sao chép phương thức này là sử dụng Enumerator được trả về  bởi ```map``` method mà không có đối số nào và gọi đến ```Enumerator#with_index``` method.<br>
Vì thế, ```map``` method sẽ được thực thi trong bối cảnh của ```with_index``` method.<br><br>
###### **Chaining Enumerators**
Ruby cung cấp cho bạn khả năng kết nối các Enumerator với nhau.<br>
```ruby
pry(main)> enumerator = [1, 5, 7, 8].map
#<Enumerator: [1, 5, 7, 8]:map>
pry(main)> enumerator = enumerator.with_index
 => #<Enumerator: #<Enumerator: [1, 5, 7, 8]:map>:with_index>
 pry(main)> enumerator.each { |x, i| puts x; "#{x}:#{i}" }
1
5
7
8
=> ["1:0", "5:1", "7:2", "8:3"]
```
Ở đây, map method được thực hiện trong ngữ cảnh của ```with_index``` method và ```each``` method.<br><br>
###### **External Iterator**
Iterator có thể hiểu nó cung cấp một cách để truy cập những phần tử của một tập các đối tượng một cách tuần tự mà không làm lộ các cách thức thể hiện của chúng.<br>
```ruby
pry(main)> enumerator = [1, 5, 7, 8].to_enum
#<Enumerator: [1, 5, 7, 8]:each>
```
```Kernel#to_enum``` trả về  một thể hiện của lớp Enumerator bao gồm self(là mảng ```[1, 5, 7, 8]``` trong trường hợp này) làm data source cùng với ```each``` method<br>
```ruby
 pry(main)> Enumerator.instance_methods(false)
=> [:inspect, :size, :each, :each_with_index, :each_with_object, 
    :next, :rewind, :with_index, :with_object, :next_values, 
    :peek_values, :peek, :feed]
```
```Enumerator``` class cung cấp một loạt các phương thức để thao tác một con trỏ bên trong mà không làm ảnh hưởng đến trạng thái của phép lặp bên ngoài.<br>
```ruby
pry(main)> enumerator.next
=> 1
pry(main)> enumerator.peek
=> 5
pry(main)> enumerator.next
=> 5
pry(main)> enumerator.next
=> 7
pry(main)> enumerator.next
=> 8
pry(main)> enumerator.next
StopIteration: iteration reached an end
pry(main)> enumerator.rewind
=> #<Enumerator: [1, 5, 7, 8]:each>
pry(main)> enumerator.peek
=> 1
```
```Enumerator#peek``` method trả về giá trị được lưu tại vị trí con trỏ.<br>
```Enumerable#next``` method di chuyển con trỏ đến vị trí tiếp theo.<br>
```Enumerable#next``` đưa ra lỗi ```StopIteration``` khi nó được gọi và con trỏ ở vị trí cuối cùng của dữ liệu.<br>
```Enumerable#rewind``` method di chuyển con trỏ đến vị trí trước đó.<br><br>
###### Tài liệu tham khảo:  [https://ruby-doc.org/core-2.2.0/Enumerator.html]()