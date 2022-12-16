Trước đây chúng ta học lập trình thì có lẽ rất quen với việc hàm/phương thức cần bao nhiêu đối số chuyền vào thì sẽ truyền vào bấy nhiêu đối số dù khi chúng ta dùng lại hàm đó ở hoàn cảnh khác thì 1 vài đối số không cần thiết trong hoặc thậm chí 1 vài trường hợp số lượng đối số truyền vào lại không đủ. Ngôn ngữ Ruby khá linh hoạt trong việc này, cũng có thể trong 1 vài ngôn ngữ khác cũng thế nhưng chính vì sự cứng nhắc của chúng ta nên chúng ta quên đi các cách sử dụng đối số khá hay ho này.
## Cách truyền đối số tiêu chuẩn(Required)
Cách này như mình đã nói ở trên, là cách quen thuộc nhất. Hàm yêu câu bao nhiêu thì chúng ta truyền vào bấy nhiêu, không thừa không thiếu
```ruby
def write(file, data, mode)
end
write("cats.txt", "cats are cool!", "w")
```
Nếu chúng ta không truyền đủ số lượng đối số thì sẽ nhận được thông báo lỗi như sau:
```ruby
write("shopping_list.txt", "bacon")
ArgumentError: wrong number of arguments (2 for 3)
```
Nó có nghĩa là chúng ta cần truyền vào 3 đối số chứ không phải 2.
## Sử dụng đối số không bắt buộc(Optional)
Trong 1 vài trường hợp bạn muốn gọi 1 hàm có 1 vài đối số truyền cũng được, không truyền thì sẽ có giá trị mặc định
```ruby
def write(file, data, mode = "w")
end
```
Giờ bạn có thể chỉ cần truyền 2 đối số `file` và `data` , còn đối số `mode` nếu bạn quên hay cố tính không truyền vào thì nó sẽ mặc định = "w", còn nếu bạn nhỡ nhớ và truyền vào 1 giá trị khác thì giá trị đó sẽ ghi đè giá trị mặc định
## Sử dụng đối số với từ khóa(Keyword arguments)
Một trong những nhược điểm giữa hàm và đối số là để hàm có thể chạy đúng thì thứ tự đối số truyền vào phải đúng.<br>
Nếu chúng ta truyền đối số không đúng thứ tự thì có thể hàm sẽ bị lỗi hoặc kết quả sẽ không đúng.<br>
Sử dụng đối số với khóa sẽ giúp chúng ta thay đổi thứ tự các đối số truyền vào
```ruby
def write(file:, data:, mode: "ascii")
end
```
Nó giúp chúng ta gọi hàm với nhiều thứ tự đối số khác nhau:
```ruby
write(data: 123, file: "test.txt")
```
Nhưng quan trọng hơn là nó giúp chúng ta biết chính xác chúng ta truyền đối số nào và giá trị là bao nhiêu.<br>
Mình cũng không hay dùng kiểu đối số này nhưng nó khá hưu ích khi chúng ta muốn tăng sự rõ rằng trong các trường hợp truyền vào 1 loạt các giá trị cùng 1 kiểu ví dụ:<br>
```ruby
class Point
  def initialize(x: , y:)
    @x, @y = x, y
  end
end
point = Point.new(x: 10, y: 20)
```
Chúng ta sẽ không bị nhầm lẫn giá trị nào của x, giá trị nào của y.<br>
Đó là 1 trong những mục đích chính của kiểu đối số này: tránh nhầm lẫn và hiểu nhầm càng nhiều càng tốt.
## Các hàm không giới hạn số lượng đối số(variable arguments)
Nếu bạn muốn truyền 1 số lượng đối số không xác định vào 1 hàm thì sao?
```ruby
def print_all(*args)
end
print_all(1, 2, 3, 4, 5)
```
Kiểu đối số này cho phép chúng ta truyền bao nhiêu đối số cũng được thậm chí là không có đối sô nào. Và bản thân nó là 1 array chứa các giá trị được truyền vào.<br>
Chúng ta có thể kết hợp kiểu đối số này với các kiểu đối số khác
```ruby
def print_all(title, *chapters)
end
```
hàm trên sẽ lấy giá trị đầu tiên truyền vào ứng với `title`, còn các đối số tiếp theo sẽ nằm trong array chapters. Chú ý là kiểu đối số này phải nằm sau kiểu đối số bắt buộc(required) và đối số tùy chọn(optional), và trước đối số khóa (keyword arguments)
## Sử dụng đúng thứ tự
nếu bạn muốn sử dụng keeys hợp các kiểu đối số và tránh bị lỗi thì chúng ta phải sử dụng các kiểu đối số đúng theo thứ tự sau:
> required -> optional -> variable -> keyword
Đây là 1 ví dụ sử dụng tất cả các kiểu đối số:
```ruby
def testing(a, b = 1, *c, d: 1, **x)
  p a,b,c,d,x
end
testing('a', 'b', 'c', 'd', 'e', d: 2, x: 1)
```
`**x` cũng tương tự variable arguments, nhưng sẽ được lưu theo kiểu hash thay vì array
## Đối số Catch-All

```ruby
def print_all(*)
end
```
Có nghĩa là hàm này chấp nhận tất cả các đối số truyền vào, nhưng không làm gì với tất cả các đối số đó, nó tương tự như sử dụng ký tự `_` trong block để biểu thị các đối số không sử dụng.<br>
Cách sử dụng thực tế cho kiểu đối số này là đi cùng từ khóa `super`:
```ruby
class Food
  def nutrition(vitamins, minerals)
    puts vitamins
    puts minerals
  end
end
class Bacon < Food
  def nutrition(*)
    super
  end
end
bacon = Bacon.new
bacon.nutrition("B6", "Iron")
```
Giả dụ bạn thay đổi danh sách đối số truyền vào của hàm `nutrition` tại `class Food` thì bạn không cần phải lọ mọ đi tìm hàm `nutrition` của `class Bacon` để đối danh sách đối số y như `class Food` nữa mà nó sẽ mặc định được thay đổi theo `class Food` rồi
## Tổng kết
Tài liệu tham khảo: https://www.rubyguides.com/2018/06/rubys-method-arguments/