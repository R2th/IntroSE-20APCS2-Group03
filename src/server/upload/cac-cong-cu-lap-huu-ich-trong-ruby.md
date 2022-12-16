Vòng lặp là một trong những khái niệm cơ bản đầu tiên chúng ta phải biết khi học ngôn ngữ lập trình. Nên chúng ta cũng hiểu rõ được tầm quan trọng của nó <br>
<br>
Theo như vốn kiến thức ít ỏi của mình ở các ngôn ngữ khác thì thông thường chúng ta sẽ dùng vòng lặp for hoặc while để lặp các phần tử và xử lý gì thì tùy chúng ta ở trong đúng không. Nhưng Ruby thì lại hộ trợ chúng ta đến tận răng khi tạo ra kha khá các phương thức lặp có sẵn để dùng cho các mục đích khác nhau.<br>
<br>
Vậy là những phương thức nào, và dùng khi nào thì chúng ta cùng xem bai viết dưới đây.

### .each
Về cơ bản là giống vòng lặp for, while bình thường , công việc của nó chỉ là lặp qua tất cả các phần tử
```ruby
a = [ "a", "b", "c" ]
a.each {|x| print x, " ** " }  (the code between {} is the block)
produces: 
a ** b ** c **
```
### .map (.collect)
Luôn trả về 1 bảng có cùng số phần tử với mảng đã gọi nó, và các phần tử trong mảng trả về thì sẽ thay đổi tùy vào cách chúng ta xử lý. Nhưng mảng ban đầu sẽ không bị thay đổi nhé
```ruby
a = [ "a", "b", "c", "d" ]
a.collect { |x| x + "*" }        #=> ["a*", "b*", "c*", "d*"]
a.map.with_index{ |x, i| x * i } #=> ["", "b", "cc", "ddd"]
a  
```
### .select
Select sẽ duyệt qua tất cả các phần tử trong mảng và sẽ trả về 1 mảng  các phần tử thỏa mãn điều kiện của nó trong mảng ban đầu. <br>
Nếu xử lý ở các ngôn ngữ khác thì nó tương đương với việc dùng điều kiện if trong for/while và nếu thỏa mãn thì thêm giá trị vào 1 mảng đã khai báo ngoài vong lặp vậy. Trong Ruby chúng ta chỉ cần đơn thuần xử lý như sau:
```ruby
(1..10).find_all { |i|  i % 3 == 0 }   #=> [3, 6, 9]

[1,2,3,4,5].select { |num|  num.even?  }   #=> [2, 4]
```
Note: Ngoài ra thì còn **`.find_all`** với cách sử dụng và công dụng giống `.select`. <br>
Còn nếu bạn muốn cùng cách dùng nhưng công dụng ngược lại tức là xóa bỏ các phần tử thỏa mãn điều kiệu thì ta có **`.reject`**
```ruby
(1..10).reject { |i|  i % 3 == 0 }   #=> [1,2,4,5,7,8,10]
```
### .find
Cuối cùng là find, cách dùng thì giống select nhưng sẽ không duyệt qua tất cả phần tử mà sẽ trả về luôn giá trị của phần tử đầu tiên thỏa mãn điều kiện và không thèm quan tâm đến các thằng sau
```ruby
(1..10).find { |i|  i % 3 == 0 }   #=> 3
```
Note: Ngoài ra thì còn hàm khác cùng chức năng là **`.detect `**
### Inject

Lấy tổng các phần tử trong mảng , nếu bạn không chỉ định rõ giá trị tổng ban đầu thì nó sẽ mặc định lấy giá trị đầu tiên của mảng làm giá trị ban đầu của tổng
```ruby
[1,2,3,4,5,6,7,8,9,10].inject{ |sum, e| sum += e }
# => 55

[1,2,3,4,5,6,7,8,9,10].inject(15){ |sum, e| sum += e }
# => 70
```
### Join
Một hàm khá hay ho khi chuyển 1 array thành 1 string. Method này sẽ lấy tất cả các giá trị trong mảng chuyển thành kiểu string(nếu các giá trị không phải kiểu string) sau đó nối vào với nhau. Ngoài ra chúng ta có thể tùy ý thêm các ký tự giữa các phần tử khi nối thành 1 string
```ruby
[1,2,3,4].join("-")
=> "1-2-3-4"

["a","b","c"].join
=> "abc"

[a: 1,b: 2,c: 3].join
"{:a=>1, :b=>2, :c=>3}"
```

### So sánh map và each
Sự khác nhau của map và each nằm ở giá trị trả về:<br>
each sẽ return chính nó còn map sẽ return về 1 mảng mới và mảng mới này sẽ có cùng size với mảng ban đầu<br>
**map**
```ruby
names  = [ "Dan", "Stella", "Elly"]
names.map { |name| name.upcase }
=> ["DAN", "STELLA", "ELLY"]
```
**each**
```ruby
names  = [ "Dan", "Stella", "Elly"]
names.each { |name| name.upcase }
=> ["Dan", "Stella", "Elly"]
```
### So sánh select và find_all
Sự khác nhau của select và find_all cũng là dữ liệu trả về, nhưng là khi chúng ta xử lý dữ liệu kiểu Hash<br>
Nếu chúng ta khai báo 1 Array và sử dụng 2 method trên thì cả 2 đều sẽ trả về 1 Array giống hệt nhau. Nhưng khi chúng ta khai báo 1 Hash và sử dụng 2 method trên thì **select**   sẽ trả về 1 Hash còn find_all sẽ vẫn trả về 1 Array
**find_all**
```ruby
hash = {a: 1, b: 2, c: 3, d: 4}
hash.find_all do |key, value|
  value.odd?
end
#would return [[:a, 1], [:c, 3]]
```
**select**
```ruby
hash = {a: 1, b: 2, c: 3, d: 4}
hash.select do |key, value|
  value.odd?
end
#would return {a:1, c:3}
```
Vì sao có sự khác biệt? Đó là do `select`  đã được định nghĩa lại trong lớp Hash còn find_all thì không

### tài liệu tham khảo
https://medium.com/@elizabethkosowski/ruby-find-all-vs-select-whats-the-deal-d0e2c8e7c5cb <br>
https://medium.com/@kevin.peery/rubys-powerful-tools-for-iteration-each-map-select-and-find-7aeec18826a0