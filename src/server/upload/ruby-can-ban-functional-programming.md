Ở bài viết trước, ta đã tìm hiểu cách định nghĩa một function, và cách sử dụng nó trong những ngữ cảnh khác nhau. Tiếp theo, ở bài này ta sẽ tìm hiểu sang một level mới sâu hơn đó là **functional programming**, đó là việc lập trình chú trọng vào function. **Functional programming** sẽ sử dụng rất nhiều các blocks, qua đó chúng ta có thể củng cố kiến thức đã tìm hiểu ở bài trước. Trong bài này, ta sẽ tập trung vào 3 method cơ bản thường được sử dụng trong functional programming đó là: map, select, và reduce.

![](https://images.viblo.asia/44238833-f88a-4e5a-b61a-c403cb5b7533.png)

Tiếp theo, đối với mỗi method ở trên, t sẽ sử dụng **each** method và một chuỗi các lệnh để minh họa. Và chúng ta sẽ tạo một file ruby mới để tìm hiểu về những cái này nhé: `touch functional.rb`
## Map
Chúng ta sử dụng map để lặp trong mảng các phần tử. 
![](https://images.viblo.asia/701e6fe1-3e03-4c0d-82b0-51948b3f2380.png)

Giả sử ta có một mảng các chữ hoa và chữ thường hỗn hợp, và ta muốn tạo ra một mảng tương ứng chữa chữ thường và kết nối với nhau bằng dấu gạch ngang (để có thể dùng trong URLs chẳng hạn) như thế này:<br> `"North Dakota" -> "north-dakota"` <br>
Sử dụng các kỹ thuật đã tìm hiểu từ bài trước, ta có thể làm tuần tự như sau: 
1. Tạo một biến chứa một mảng các string
2. Tạo biến thứ 2 (khởi tạo ban đầu là rỗng) để lưu một array mới (dùng cho URL chẳng hạn)
3. Với mỗi item trong array đầu tiên, ta sẽ **push** một lower-case version (cái mà đã được tách dựa trên khoảng trắng và được nối bằng dấu gạch ngang)

Chúng ta sẽ thu được kết quả như đoạn code bên dưới. Chú ý rằng, ta đã sử dụng toán tử shovel  **<<** thay cho việc gọi method **push** một cách tường minh (cả 2 đều hoạt động giống nhau). Và sử dụng **p <obj>** để in ra mảng kết quả. 
```functional.rb
states = ["Kansas", "Nebraska", "North Dakota", "South Dakota"]

# urls: Imperative version
def imperative_urls(states)
  urls = []
  states.each do |state|
    urls << state.downcase.split.join("-")
  end
  urls
end
p imperative_urls(states)
```
Nhìn đoạn code trên có vẻ khá phức tạp đúng không ? Ta thử chạy xem kết quả ra sao nhé.
```ruby
$ ruby functional.rb
["kansas", "nebraska", "north-dakota", "south-dakota"]
```
Giờ hãy xem, khi dùng **map** thì nó sẽ hoạt động như thế nào nhé. Chúng ta có thể gọi **map** function trực tiếp từ mảng, và nó sẽ xử lý từng phần tử trong mảng. Ví dụ, để thực hiện bình phương mỗi phần tử trong mảng, ta có thể dùng map trực tiếp trên mảng như sau (chạy thử trên REPL): 
```ruby
>> [1, 2, 3, 4].map { |n| n*n }
=> [1, 4, 9, 16]
```
Ở trên, ta đã truyền một block vào map để tính bình phương mỗi phần tử trong mảng đó. <br>
Tương tự, ta có thể downcase mỗi phần tử trong mảng string như sau: <br>
```ruby
>> ["ALICE", "BOB", "CHARLIE"].map { |name| name.downcase }
=> ["alice", "bob", "charlie"]
```
Đặc biệt, nếu mỗi phần tử trong mảng kiểu giống nhau ta có thể viết như sau (được gọi là [symbol to proc](https://www.brianstorti.com/understanding-ruby-idiom-map-with-symbol/)): <br>
```ruby
>> ["ALICE", "BOB", "CHARLIE"].map(&:downcase)
=> ["alice", "bob", "charlie"]
```
Thực ra, cú pháp này đã được thêm lúc đầu ở Ruby on Rails web framework. Sau đó, vì được mọi người rất yêu thích cho nên nó đã được tích hợp vào như một phần của ngôn ngữ Ruby - một ví dụ cho thấy sự đặc biệt linh hoạt của Ruby.
Quay trở lại ví dụ chính của chúng ta, ta có thể thực hiện bằng cách biến đổi như sau: chuyển đổi thành kí tự thường -> split theo khoảng trắng - và nối với nhau bằng dấu gạch ngang, và dùng **map** để thực hiện đối với mỗi phần tử trong mảng. Kết quả là code trở nên rất ngắn gọn, và có thể thử trực tiếp trên REPL, như sau: 
```ruby
>> states = ["Kansas", "Nebraska", "North Dakota", "South Dakota"]
>> states.map { |state| state.downcase.split.join('-') }
=> ["kansas", "nebraska", "north-dakota", "south-dakota"]
```
Paste lại đoạn code trên vào file `functional.rb`, để chúng ta thấy rằng nó trở nên ngắn gọn như thế nào.
```functional.rb
states = ["Kansas", "Nebraska", "North Dakota", "South Dakota"]

# urls: Imperative version
def imperative_urls(states)
  urls = []
  states.each do |state|
    urls << state.downcase.split.join("-")
  end
  urls
end
p imperative_urls(states)

# urls: Functional version
def functional_urls(states)
  states.map { |state| state.downcase.split.join('-') }
end
puts functional_urls(states).inspect
```
Chạy thử, và ta thu được kết quả hoàn toàn giống nhau:
```ruby
$ ruby functional.rb
["kansas", "nebraska", "north-dakota", "south-dakota"]
["kansas", "nebraska", "north-dakota", "south-dakota"]
```
Cuối cùng, để refactor đoạn code bên trên, ta sẽ tạo ra một hàm riêng biệt, chịu trách nhiệm tạo ra các strings dùng cho URL, được gọi là **urlify**: 
```ruby
# Returns a URL-friendly version of a string.
#   Example: "North Dakota" -> "north-dakota"
def urlify(string)
  string.downcase.split.join('-'))
end
```
Ta sẽ khai báo và thay thế bằng hàm này trong file `functional.rb`: 
```ruby
states = ["Kansas", "Nebraska", "North Dakota", "South Dakota"]

# Returns a URL-friendly version of a string.
#   Example: "North Dakota" -> "north-dakota"
def urlify(string)
  string.downcase.split.join('-')
end

# urls: Imperative version
def imperative_urls(states)
  urls = []
  states.each do |state|
    urls << urlify(state)
  end
  urls
end
puts imperative_urls(states).inspect

# urls: Functional version
def functional_urls(states)
  states.map { |state| urlify(state) }
end
puts functional_urls(states).inspect
```
Và, kết quả hoàn toàn không thay đổi:
```ruby
$ ruby functional.rb
["kansas", "nebraska", "north-dakota", "south-dakota"]
["kansas", "nebraska", "north-dakota", "south-dakota"]
```
So sánh với việc dùng hàm **each** như trước, khi dùng **map** thì code của chúng ta trở nên rất gọn gàng (từ 5 dòng xuống 1 dòng), và không thay đổi giá trị của biến (một việc mà rất dễ gây ra lỗi ), và nó loại bỏ hoàn toàn mảng trung gian (mảng **urls** ở trên).
## Select
**Select** cho phép ta select mỗi phần tử từ data đã có dựa trên điều kiện cụ thể. 
    
![](https://images.viblo.asia/4ea525be-325c-4300-9c31-0b5504b0b4df.png)
 
Giả sử, ta muốn lấy ra những string từ array states ở trên, những phần tử có nhiều hơn một từ, và giữ lại những phần tử có một từ. Khi làm theo phương pháp cũ, thì sẽ như sau: 
1. Định nghĩa một mảng để lưu string có 1 từ
2. Đối với mỗi phần tử, ta sẽ **push**  nó vào mảng lưu trữ nếu sau khi split dựa trên khoảng trắng thấy nó có length = 1.

Cụ thể, cách viết như sau: 
```functional.rb
states = ["Kansas", "Nebraska", "North Dakota", "South Dakota"]
.
.
.
# singles: Imperative version
def imperative_singles(states)
  singles = []
  states.each do |state|
    if state.split.length == 1
      singles << state
    end
  end
  singles
end
puts imperative_singles(states).inspect
```
Tương tự như các phần trước, ở trên ta đã tạo ra một biến phụ tên là **state**, lặp trên mảng gốc, check điều kiện mỗi phần tử, và return về kết quả. Trông nó khá dài dòng, nhưng vẫn hiển thị ra kết quả đúng. 
```ruby
$ ruby functional.rb
["kansas", "nebraska", "north-dakota", "south-dakota"]
["kansas", "nebraska", "north-dakota", "south-dakota"]
["Kansas", "Nebraska"]
```
Tiếp theo, ta sẽ tìm hiểu thêm một số ví dụ đơn giản khác, bằng cách sử dụng REPL. <br>
Chúng ta sẽ thử với toán tử **%** (mod), nó sẽ trả về phần dư khi chia một số nguyên cho một số nguyên. Ví dụ, ta có thể kiếm tra xem một số là chẵn hay lẻ bằng cách chia cho 2, nếu dư 0 thì đó là số chẵn, nếu dư 1 thì đó là số lẻ. Cụ thể như sau: <br>
```ruby
>> 16 % 2;  # even
0
>> 17 % 2;  # odd
1
>> 16 % 2 == 0;  # even
=> true
>> 17 % 2 == 0;  # odd
=> false
```
Qua đó, ta có thể kết hợp % và select để xử lý 1 mảng các số nguyên, và chỉ lấy về những số chẵn: 
```ruby
>> [1, 2, 3, 4, 5, 6, 7, 8].select { |n| n % 2 == 0}
=> [2, 4, 6, 8]
```
Cách viết bên trên cũng tương tự cách viết của **map**, đó là **select** một biến **n** và thực hiện test xem nó **true** hay **false**. Thật tình cờ là [Ruby integers](https://ruby-doc.org/core-2.5.0/Integer.html) cũng có method **even?** để thực hiện chức năng tương tự: 
```ruby
>> [1, 2, 3, 4, 5, 6, 7, 8].select { |n| n.even? }
=> [2, 4, 6, 8]
```
Ta có thể viết ngắn gọn hơn bằng cách dùng ký hiệu **symbol-to-proc**: 
```ruby
>> (1..8).select(&:even?)
=> [2, 4, 6, 8]
```
Sử dụng ý tưởng này, ta có thể viết lại ví dụ bên trên bằng cách sử dụng **select** như sau:<br>
`>> states.select { |state| state.split.length == 1 }`
Ta paste lại vào file `functional.rb`, để thấy nó đã thực sự trở nên ngắn gọn như thế nào.
```functional.rb
states = ["Kansas", "Nebraska", "North Dakota", "South Dakota"]
.
.
.
# singles: Imperative version
def imperative_singles(states)
  singles = []
  states.each do |state|
    if (state.split.length == 1)
      singles << state
    end
  end
  singles
end
puts imperative_singles(states).inspect

# singles: Functional version
def functional_singles(states)
  states.select { |state| state.split.length == 1 }
end
puts functional_singles(states).inspect
```
Chúng ta nhận được kết quả giống nhau:
```ruby
$ ruby functional.rb
["kansas", "nebraska", "north-dakota", "south-dakota"]
["kansas", "nebraska", "north-dakota", "south-dakota"]
["Kansas", "Nebraska"]
["Kansas", "Nebraska"]
```
## Reduce
Tiếp theo là reduce, đây là phương thức phức tạp nhất trong 3 cái đã đề cập ở trên. Nhưng nó thường được sử dụng một cách khá là đơn giản trong ruby, chủ yếu là phục vụ cho việc tính toán các phần tử trong mảng rồi trả về kết quả vừa thực hiện xong.
![](https://images.viblo.asia/bc8f147b-8cd8-4594-b3f3-af53206e05e6.png)
Chúng ta sẽ tiến hành tìm hiểu 2 ví dụ về reduce. Một là, tính tổng các số nguyên trong mảng. Hai là, tạo một hash để maps state names, và tính độ dài mỗi name, kết quả in ra sẽ kiểu như sau:
```ruby
{ "Kansas" => 6,
  "Nebraska" => 8,
  .
  .
  .
}
```
### Reduce, example 1
Chúng ta sẽ bắt đầu với phương pháp cơ bản để viết hàm **sum**, như thường lệ ta dùng vòng lặp **each**, một biến tạm **total** - biến này dùng để cộng dồn kết quả. Code được viết như dưới đây: 
```functional.rb
numbers = 1..10

# sum: Imperative solution
def imperative_sum(numbers)
  total = 0
  numbers.each do |n|
    total += n
  end
  total
end
puts imperative_sum(numbers)
```
Một lần nữa, ta lại thấy cách làm quen quen thuộc đó là, khởi tạo biến phụ **total**,  lặp trên mỗi phần tử, và cộng dồn kết quả vào biến **total**. Kết quả thu được là 55: 
```ruby
$ ruby functional.rb
["kansas", "nebraska", "north-dakota", "south-dakota"]
["kansas", "nebraska", "north-dakota", "south-dakota"]
["Kansas", "Nebraska"]
["Kansas", "Nebraska"]
55
```
Và bây giờ, ta sẽ sử dụng **reduce** nhé. Trông nó có vẻ hơi phức tạp, nhưng nó chạy tốt trên REPL:
```ruby
>> numbers = 1..10
>> numbers.reduce(0) do |total, n|
?>  total += n
?>  total
?> end
55
```
Ở đây **reduce** đã truyền vào 2 đối số. Một là, biến tích lũy total. Hai là, phần tử tương ứng trong mảng. Và trong trường hợp này giá trị khởi tạo cho biến total là 0.<br>
Từ đây, ta có thể thực hiện 3 cải tiến. Đầu tiên, toán tử += return về giá trị của nó, ta có thể vừa tăng giá trị của biến vừa có thể gán giá trị.
```ruby
>> i = 0
>> j = i += 1
>> i
1
>> j
1
```
Có nghĩa rằng, ta có thể return total += n một cách trực tiếp: 
```ruby
>> numbers.reduce(0) { |total, n| total += n }
55
```
Và vì **0** là giá trị khởi tạo mặc định, nên ta có thể loại bỏ nó và viết ngắn gọn như sau:
```ruby
>> numbers.reduce { |total, n| total += n }
55
```
Tiếp theo, vì giá trị cuối cùng trong block được tự động lưu vào biến cộng dồn kết quả, cho nên thay vì sử dụng **+=** ta chỉ cần sử dụng **+**.
```ruby
>> numbers.reduce { |total, n| total + n }
55
```
Paste lại hàm này vào file functional.rb, để thấy rõ hơn nó đã được cải tiến như thế nào nhé:
```functional.rb
.
.
.
numbers = 1..10

# sum: Imperative solution
def imperative_sum(numbers)
  total = 0
  numbers.each do |n|
    total += n
  end
  total
end
puts imperative_sum(numbers)

# sum: Functional solution
def functional_sum(numbers)
  numbers.reduce { |total, n| total + n }
end
puts functional_sum(numbers)
```
Qua đây, ta có thể hiểu thêm về reduce, đó là nó là một hàm lấy các phần tử trong mảng để xử lý dựa trên các thao tác khác nhau (trong ví dụ này là phép cộng - cộng dồn kết quả).
### Reduce, example 2
Để hiểu rõ hơn về reduce, chúng ta sẽ tìm hiểu tiếp ví dụ thứ 2. Như đã đề cập ở trên, trong ví dụ này ta sẽ tạo một object là một hash với key là state name và values là lenth của state name tương ứng. <br>
Ta có thể làm ví dụ này bằng cách thuần túy là khởi tạo object **lengths**, sau đó lặp từng phần tử trong **states**, và setting **lengths[state]** với length tương ứng, như sau: `lengths[state] = state.length`. Viết một cách đầy đủ sẽ như sau: 
```functional.rb
.
.
.
# lengths: Imperative version
def imperative_lengths(states)
  lengths = {}
  states.each do |state|
    lengths[state] = state.length
  end
  lengths
end
puts imperative_lengths(states)
```
Chạy đoạn code trên, ta được kết quả hash in ra như sau: 
```ruby
$ ruby functional.rb
.
.
.
{"Kansas"=>6, "Nebraska"=>8, "North Dakota"=>12, "South Dakota"=>12}
```
Bây giờ, ta sẽ sử dụng reduce xem nó ra sao nhé. Cũng tương tự như trên, ta cũng sẽ có một **lengths** object, nhưng nó không phải là một biến phụ riêng biệt, mà nó là một block parameter: 
```ruby
do |lengths, state|
  lengths[state] = state.length
  lengths
end
```
Trong khi đó, thay vì set giá trị khởi tạo mặc định của reduce là 0 thì ta sẽ setting là một empty hash **{}**: 
```ruby
reduce({}) do |lengths, state|
  lengths[state] = state.length
  lengths
end
```
Qua đó, ta có đoạn code đầy đủ như sau: 
```functional.rb
.
.
.
# lengths: Imperative version
def imperative_lengths(states)
  lengths = {}
  states.each do |state|
    lengths[state] = state.length
  end
  lengths
end
puts imperative_lengths(states)

# lengths: Functional version
def functional_lengths(states)
  states.reduce({}) do |lengths, state|
    lengths[state] = state.length
    lengths
  end
end
puts functional_lengths(states)
```
Khi chạy, ta thu được kết quả như sau: 
```ruby
$ ruby functional.rb
.
.
.
{"Kansas"=>6, "Nebraska"=>8, "North Dakota"=>12, "South Dakota"=>12}
{"Kansas"=>6, "Nebraska"=>8, "North Dakota"=>12, "South Dakota"=>12}
```
Tóm lại, việc dùng phương pháp nào tùy thuộc vào sở thích của mỗi người. Tuy nhiên, khi dùng reduce ta có thể giải quyết vấn đề một cách nhanh gọn. Và reduce là một kỹ thuật cơ bản, ngoài ra còn kỹ thuật sử dụng [MapReduce](https://en.wikipedia.org/wiki/MapReduce) là kỹ thuật rất quan trọng trong việc xử lý với dữ liệu lớn.
### Functional programming and TDD
Bạn có thể nhận thấy một điều là khi sử dụng giải pháp kiểu functional như thế này thì nó khó khăn trong việc chia ra thành những bước nhỏ hơn. Ưu điểm của nó là có thể giải quyết vấn đề cô đọng trong một vài dòng ngắn ngủi, nhưng sự khó hiểu cũng dần dần tăng lên. Điều này xảy ra đối với cả 3 function mà ta đã tìm hiểu ở trên, chúng ta thường luôn muốn code một cách ngắn gọn và đẹp đẽ, nhưng để đạt được điều đó cũng sẽ là một thách thức. <br>
Và kỹ thuật ưu thích của t để quản lý thách thức đó chính là **test-driven development (TDD)**, đó là cái liên quan tới **automated test** để đảm bảo các hành vi mong muốn luôn được chạy đúng. Chúng ta có thể viết test cho bất kỳ hàm nào mong muốn, kể cả code của hàm đó viết rất cùi bắp đi chăng nữa, miễn là nó pass qua test được thì là nó đã đảm bảo về mặt đúng yêu cầu logic rồi. Rồi sau đó, ta có thể tiếp tục thực hiện **refactor code** để làm cho code trở nên ngắn gọn và đẹp đẽ hơn. <br>
### Terminology review
Không giống như nhiều ngôn ngữ khác, Ruby support một lượng lớn **synonyms**(Từ đồng nghĩa). Có nghĩa là các method có tên khác nhau nhưng đều làm công việc giống nhau. Ví dụ **Array#size** là đồng nghĩa với **Array#length**, cụ thể như sau: 
```ruby
>> a = [42, 8, 17, 99]
=> [42, 8, 17, 99]
>> a.length
=> 4
>> a.size
=> 4
```
Trong trường hợp là functional programming - đang được giới thiệu ở bài viết này, thì Ruby cũng có một nhóm các method đồng nghĩa - chức năng tương tự nhau:
* **collect**: giống với **map** 
* **select**: còn được gọi là **find_all**
* **inject**: thì tương tự với **reduce**
* **detect**: giống với **find** (các bạn có thể google thêm)
* reject: tương tự với select, nhưng đi với điều kiện boolean đảo ngược.

Do vậy, 3 method map, select, và reduce phía trên có thể được viết thành collect, select, và inject. <br>
Tất cả những method ở trên là một phần quan trọng của Ruby module được gọi là **Enumerable**.
    
![](https://images.viblo.asia/1706ed1a-409c-4d25-92ea-ef0732a52112.png)
    
Mặc dù những tên method trong bài viết này được sử dụng khá phổ biến, nhưng tùy vào ngữ cảnh, ta sử dụng sao cho phù hợp. Ví dụ như trong ví dụ tính tổng cộng dồn ở trên, thì sử dụng tên **inject** sẽ hợp lý và phổ biến hơn so với dùng tên **reduce**. Do đó, ta có thể sửa lại code một chút như sau: 
```functional.rb
.
.
.
# lengths: Functional version using `inject`
def functional_lengths(states)
  states.inject({}) do |lengths, state|
    lengths[state] = state.length
    lengths
  end
end
puts functional_lengths(states)
```
Vì chúng hoạt động giống nhau nên bạn có thể chọn cách viết tùy ý. Điều quan trọng là bạn hiểu được, khi nó được viết theo bất kỳ cách nào.

<br><br><br>

*Hết. Chúng ta sẽ cùng nhau tìm hiểu các chủ đề khác trong Ruby ở các bài viết lần tới nhé.<br>
Nguồn: [Learn-enough](https://www.learnenough.com/)*