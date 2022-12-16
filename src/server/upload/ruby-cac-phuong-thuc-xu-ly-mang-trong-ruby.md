Mảng là một trong những cấu trúc cơ bản của lập trình. Nó xuất hiện ở khắp mọi nơi và hầu như khi thao tác với dữ liệu ta luôn cần đến mảng để xử lý.
Do đó việc nắm vững và thành thao với các thao tác xử lý mảng là một điều cực kỳ quan trọng và cần thiết, đặc biệt là những beginner như mình. <br/>
Sau đây mình xin giới thiệu một số kỹ thuật xử lý mảng được coi là khá phổ biến và bạn cần phải hiểu tường tận về nó, đây chính là những bước đi đầu tiên để trở thành một Ruby dev thực thụ.
# Each
Duyệt qua các phần tử trong mảng và thao tác với chúng:
```
[1, 2, 3].each { |n| puts "Current number is: #{n}" }
Current number is: 1
Current number is: 2
Current number is: 3
```
Không có gì để nói nhiều với `each`. Chỉ có một lưu ý nho nhỏ đó là `each` sẽ `luôn luôn trả về mảng gốc` ban đầu dù cho bạn có biến đổi như thế nào đi nữa.
```
result = [1, 2, 3].each{|e| e + 2}
 => [1, 2, 3]
```
# Map/Collect
Map và Collect là alias_method của nhau nên khi dùng thằng nào cũng được, mình thấy đa số mọi người dùng `map` nhiều hơn, có thể là do nó ngắn gọn hơn `collect` chăng :thinking:<br/>
Không gì dễ hiểu hơn là đi thẳng vào ví dụ nhỉ:
```
array = [1,2,3]
array.map { |n| n * 2 }
 => [2, 4, 6]
```
Nếu bạn muốn thay đổi luôn mảng gốc hãy sử dụng `map!`.<br/>
Khi bạn mới bắt đầu với ruby, mình cá là đa số các bạn sử dụng `each` là chính đúng ko? Hãy thử một đoạn code đơn giản sau
```
user_ids = []
users.each { |user| user_ids << user.id }
```
...bạn có thể đơn giản hóa bằng cách sử dụng `map` chỉ tốn có 1 dòng thôi:
```
user_ids = users.map { |user| user.id }
```
Hoặc thậm chí tốt hơn và nhanh hơn (`better and faster`):
```
user_ids = users.map(&:id)
```
Túm cái váy lại, `map (hoặc collect)` sẽ trả về mảng mới đã qua xử lý, sử dụng `map` giúp  cho code của bạn gọn gàng tươi sáng hơn.
# Select và Detect
`.select` cho phép bạn "tìm kiếm" những phần tử trong mảng. Bạn cần phải đưa vào `.select` một câu điều kiện trả về giá trị true hoặc false từ đó nó sẽ giúp bạn biết liệu có hay không những phần tử mà bạn muốn tìm kiếm trong mảng.<br/>
`.detect` cũng tương tự như `.select` nhưng thay vì lấy ra tất cả những phần tử thỏa màn thì `.detect` chỉ lấy ra thằng đầu tiên(duy nhất 1 thằng thôi)<br/>
Hãy thử ví dụ lấy ra những phần chẵn  trong một mảng(coi như chúng ta chưa biết đến `.select`):
```
even_numbers = [1, 2, 3, 5, 4].map{|element| element if element.even?} # [nil, 2, nil, nil, 4]
even_numbers = even_numbers.compact # [2, 4]
```
Sử dụng `.map` để lấy ra những thằng chẵn nhưng đổi lại bạn lại sinh ra những thằng nil, do đó mình cần dùng hàm `compact` để loại bỏ những thằng nil, giờ chúng ta đã có thứ ta cần nhưng xử lý có vẻ hơi bị cồng kềnh nhể.<br/>
```
even_numbers = [1, 2, 3, 5, 4].select{|element| element if element.even?} # [2, 4]
first_even_numbers = [1, 2, 3, 5, 4].select{|element| element if element.even?} # [2]
```
Ruby đã dâng tận răng cho bạn rồi còn gì nữa! Chỉ duy nhất một dòng code đơn giản, dễ hiểu vậy thì còn chần chờ gì nữa :v<br/>
Bonus:  **better and faster**
```
[1, 2, 3, 4, 5].select(&:even?)
[1, 2, 3, 4, 5].detect(&:even?)
```
Note: Vậy `.select` lấy ra tất cả những thằng thỏa mãn điều kiện. `.detect` chỉ lấy ra duy nhất thằng đầu tiên thỏa mãn điều kiện.<br/>
Tiện thể mình xin giới thiệu hàm `.compact` giúp loại bỏ các phần tử `nil` trong một mảng nhớ
# Reject
`.reject` trái ngược hoàn toàn với `.select`. Thay vì lấy ra những thứ mà chúng ta cần (tức là `.select`) thì ta sẽ loại bỏ đi những phần tử mà thỏa mãn điều đề ra.
```
array = [1, 2, 3, 5, 4]
array.reject{|number| number < 3}
 => [3, 4, 5]
```
Từ vì dụ trên có thế thấy, với `.select` sẽ lấy ra những phẩn từ < 3 (tức là [1, 2]) thì `.reject` lại là loại bỏ những phần tử < 3 (tức là [3, 4, 5]).<br/>
Hiểu đơn giản, khi bạn muốn lấy ra những thứ mình cần hãy dùng `.select`, khi bạn muốn loại bỏ những phẩn từ không mong muốn hãy dùng `.reject`.
# Reduce
Reduce có cấu trúc phức tạp hơn so với các phương thức xử lý mảng khác nhưng đổi lại nó thường được sử dụng một cách khá là đơn giản trong ruby, chủ yếu là phục vụ cho việc tính toán các phần tử trong mảng rồi trả về kết quả vừa thực hiện xong.<br/>
Hãy thử với một ví dụ đơn giản sau: Tính tổng của các phần tử trong một mảng.
```
array = [1, 2, 3]
array.reduce{|sum, x| sum + x}
 => 6
```
Chúng ta cũng có thể thao tác với mảng String cũng y như vậy:
```
array = ['amber', 'scott', 'erica']
array.reduce{|sum, name| sum + name}
 => "amberscotterica"
```
Một lưu ý cuối cùng về `.reduce`, đôi khi dữ liệu bạn thao tác là dữ liệu cũ (không phải là empty hoặc 0) thì bạn cần phải truyền vào một đối số để khởi tạo giá trị ban đầu:
```
array = [{weekday: 'Monday', pay: 123}, {weekday: 'Tuedsay', pay: 244}]
array.reduce(0) {|sum, day| sum + day[:pay]}
 => 367
array.reduce(100) {|sum, day| sum + day[:pay]}
 => 467
```
# Join
`.join` thực sự rất hữu dụng khi làm việc với mảng, đặc biệt là liên quan đến String<br/>
```
cars.map{|car| car[:type]}.join(', ')
 => "porsche, mustang, prius"
```
`.join` rất giống `.reduce` ngoại trừ một việc nó có cú "siêu sạch". `.join` cần truyền vào đối số - thứ sẽ nối giữa các phần tử lại với nhau thành một chuỗi string .
```
 cars.join(', ')
 => "{:type=>\"porsche\", :color=>\"red\"}, {:type=>\"mustang\", :color=>\"orange\"}, {:type=>\"prius\", :color=>\"blue\"}"
 events.join(', ')
 => "#<Event:0x007f9beef84a08>, #<Event:0x007f9bf0165e70>, #<Event:0x007f9beb5b9170>"
```
# Tại sao không kết hợp các phương thức cùng nhau
Giờ chúng ta có thể vẫn dụng những kiến thức bên trên để xử lý cùng một lúc.<br/>
Chúng ta có một mảng gồm 10 ngày làm việc, mỗi ngày tương ứng với 1 task và thời gian estimate của mỗi task là ngẫu nhiên. Giờ mình muốn lấy ra tổng thời gian của tất cả task với điều kiện bỏ qua những task có estimate lớn hơn 30 phút cũng như những task có estimate nhỏ hơn 5 phút:
```
days = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
days.map{|day| day.odd? ? 
  {task: 'dishes', minutes: Random.rand(20)} :
  {task: 'sweep', minutes: Random.rand(20)}}
  .select{|task| task[:minutes] < 30}
  .reject{|task| task[:minutes] < 5}
  .reduce(0) {|sum, task| sum + task[:minutes]}
```
Ví dụ ở trên có vẻ không liên quan cho lắm nhưng mục đích chủ yếu ở đây là việc chúng ta biết cách kết hợp các phương thức lại với nhau.<br/>
P/S: Cái `? :`  có thể lạ đối với một số bạn chưa biết, đó chính là toán tử ba ngôi là một cách viết tắt của if-else, trong trường hợp này do bài toán đơn giản nên mình sử dụng, nhưng đối với những trường hợp xử lý logic phức tạp thì mình khuyên các bạn không nên dùng.
# Bonus
## sample
Mình có một mảng các số nguyên, giờ mình muốn lấy ra một số bất kỳ thì như thế nào?
```
[1, 2, 3][rand(3)]
[1, 2, 3].shuffle.first
[1, 2, 3].sample
```
Hãy sử dụng `.sample` để code của mình trong sáng hơn nha.
## slice
Hàm này giúp bạn clone dữ liệu từ một mảng cho trước, bạn chỉ cần chỉ định giá trị index bắt đầu và index kết thúc mà bạn muốn clone:
```
sharks = ["Tiger", "Great White", "Hammerhead", "Angel"]
sharks[1,2]        # ["Great White", "Hammerhead"] 
sharks.slice(1,2)  # ["Great White", "Hammerhead"] 
```
## include?
Giúp bạn kiểm tra xem thứ bạn đưa vào có nằm trong một mảng dữ liệu cho trước hay không
```
sharks = ["Hammerhead", "Great White", "Tiger", "Whale"]
sharks.include? "Tiger"      # true
sharks.include? "tiger"      # false
```
## uniq?
Giúp bạn xóa những phần tử trùng lặp trong mảng một cách nhanh chóng
```
[1,2,3,4,1,5,3].uniq   # [1,2,3,4,5]
```
# Kết luận
Mình mong nhiêu đây có giúp ích cho một số bạn, không thật sự là tất cả nhưng cũng đủ để bạn làm việc mảng một cách trơn tru rồi. Rất cảm ơn mọi người đã đọc bài viết của mình ạ:blush:
## Tham khảo
https://www.freecodecamp.org/news/six-ruby-array-methods-you-need-to-know-5f81c1e268ce/ <br/>
https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-ruby