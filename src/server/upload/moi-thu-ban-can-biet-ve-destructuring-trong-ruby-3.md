Chào mừng bạn đến với bài viết đầu tiên trong loạt bài viết về các tính năng mới thú vị trong Ruby 3 của chúng ta! Hôm nay chúng ta sẽ xem xét cách cải thiện pattern matching (so sánh pattern) và phép gán phải giúp ta có thể “destructure” (phân rã) các array và hash trong Ruby 3 — giống như cách bạn thực hiện nó trong JavaScript — và một số cách nó vượt xa những gì bạn có thể mong đợi.

### Đầu tiên, một bài học lịch sử nho nhỏ: phân rã mảng

Đã từ rất lâu rùi, Ruby đã hỗ trợ phân rã cấu trúc cho các mảng. Ví dụ:

```ruby
a, b, *rest = [1, 2, 3, 4, 5]
# a == 1, b == 2, rest == [3, 4, 5]
```

Tuy nhiên, bạn không thể sử dụng cú pháp tương tự cho hash. Rất tiếc, điều này không hoạt động:

```ruby
{a, b, *rest} = {a: 1, b: 2, c: 3, d: 4}
# syntax errors galore! :(
```

Có một phương thức cho Hash được gọi là values_at mà bạn có thể sử dụng để lấy các khóa ra khỏi hàm băm và trả về trong một mảng mà sau đó bạn có thể phân rã cấu trúc:

```ruby
a, b = {a: 1, b: 2, c: 3}.values_at(:a, :b)
```

Nhưng điều đó cảm thấy hơi rắc rối, bạn có thấy thế ko? Không đúng chất Ruby cho lắm :v

Vì vậy, hãy xem chúng ta có thể làm gì trong Ruby 3!

### Làm quen với toán tử "gán phải"

Trong Ruby 3 bây giờ chúng ta có một toán tử "gán phải". Thao tác này đi ngược lại ý trời và cho phép bạn viết một biểu thức trước khi gán nó cho một biến. Vì vậy, thay vì x =: y, bạn có thể viết: y => x.

Điều rất thú vị về điều này là những những thanh niên não to đang cải tiến Ruby 3 nhận ra rằng họ cũng có thể sử dụng cùng một toán tử gán bên phải để so sánh pattern. So sánh pattern đã được giới thiệu trong Ruby 2.7 và cho phép bạn viết logic có điều kiện để tìm và trích xuất các biến từ các đối tượng phức tạp.

Hãy viết một phương pháp đơn giản để thử điều này. Hôm nay, chúng ta sẽ mang đến trò chơi A của mình, vì vậy hãy gọi nó là a_game:

```ruby
def a_game(hsh)
  hsh => {a:}
  puts "`a` is #{a}, of type #{a.class}"
end
```

Bây giờ chúng ta có thể truyền vào một chuỗi hash và xem điều gì sẽ xảy ra!

```ruby
a_game({a: 99})

# `a` is 99, of type Integer

a_game({a: "asdf"})

# `a` is asdf, of type String
```

Nhưng điều gì sẽ xảy ra khi chúng ta chuyển một chuỗi hash không chứa khóa “a”?

```ruby
a_game({b: "bee"})

# NoMatchingPatternError ({:b=>"bee"})
```

Dang it, chúng ta gặp lỗi  runtime. Đó là những gì sẽ xảy ra nếu bạn thiếu một mã khóa của hash. Nhưng nếu bạn thích thất bại một cách duyên dáng, rescue sẽ đến rescue bạn. Bạn có thể rescue ở cấp method, nhưng nhiều khả năng bạn muốn giải cứu ở cấp câu lệnh. Hãy sửa method của chúng ta:

```ruby
def a_game(hsh)
  hsh => {a:} rescue NoMatchingPatternError
  puts "`a` is #{a}, of type #{a.class}"
end
```

Và thử lại:

```ruby
a_game({b: "bee"})

# `a` is , of type NilClass
```

Bây giờ bạn đã có giá trị nil, bạn có thể viết mã phòng thủ để khắc phục dữ liệu bị thiếu.

### Vậy thằng **rest thì sao?

Nhìn lại ví dụ phân rã cấu trúc array ban đầu của chúng ta, ta có thể nhận được một mảng gồm tất cả các giá trị ngoài những giá trị đầu tiên chúng ta lấy ra dưới dạng biến. Sẽ không tuyệt nếu chúng ta cũng có thể làm điều đó với hash phải không? Bây giờ chúng ta có thể!

```ruby
{a: 1, b: 2, c: 3, d: 4} => {a:, b:, **rest}

# a == 1, b == 2, rest == {:c=>3, :d=>4}
```

Nhưng còn nữa! Phép gán và so khớp mẫu phải cũng thực sự hoạt động với các mảng! Chúng tôi có thể sao chép ví dụ ban đầu của mình như vậy:

```ruby
[1, 2, 3, 4, 5] => [a, b, *rest]

# a == 1, b == 2, rest == [3, 4, 5]
```

Ngoài ra, chúng ta có thể làm một số việc bad boy như kéo ra các lát mảng trước và sau các giá trị nhất định:

```ruby
[-1, 0, 1, 2, 3] => [*left, 1, 2, *right]

# left == [-1, 0], right == [3]
```

### Gán phải với khớp mẫu


Bạn có thể sử dụng kỹ thuật gán phải trong một biểu thức so khớp mẫu để lấy ra các giá trị khác nhau từ một mảng. Nói cách khác, bạn có thể lấy ra mọi thứ cho đến một loại cụ thể, lấy giá trị của loại đó và sau đó lấy ra mọi thứ sau đó.

Bạn thực hiện việc này bằng cách chỉ định kiểu (tên lớp) trong mẫu và sử dụng => để gán bất kỳ kiểu nào thuộc kiểu đó cho biến. Bạn cũng có thể nhập các loại mà không cần chỉ định bên phải để "bỏ qua" các loại đó và chuyển sang trận đấu tiếp theo.

Hãy xem qua các ví dụ sau:

```ruby
[1, 2, "ha", 4, 5] => [*left, String => ha, *right]

# left == [1, 2], ha == "ha", right == [4, 5]

[8, "yo", 12, 14, 16] => [*left, String => yo, Integer, Integer => fourteen, *
right]

# left == [8], yo == "yo", fourteen == 14, right == [16]
```

Ngon vỡi =))

### Toán tử pin

Điều gì sẽ xảy ra nếu bạn không muốn set cứng một giá trị trong một mẫu mà nó lại đến từ một nơi khác? Rốt cuộc, bạn không thể đặt trực tiếp các biến hiện có vào các mẫu:

```ruby
int = 1

[-1, 0, 1, 2, 3] => [*left, int, *right]

# left == [], int == -1 …wait wut?!
```

Nhưng trên thực tế bạn có thể! Bạn chỉ cần sử dụng toán tử pin ^. Hãy thử lại!

```ruby
int = 1

[-1, 0, 1, 2, 3] => [*left, ^int, *right]

# left == [-1, 0], right == [2, 3]
```

Bạn thậm chí có thể sử dụng ^ để khớp các biến đã được chỉ định trước đó trong cùng một mẫu. Yeah, thật là điên rồ. Hãy xem qua ví dụ này từ tài liệu Ruby:

```ruby
jane = {school: 'high', schools: [{id: 1, level: 'middle'}, {id: 2, level: 'high'}]}

jane => {school:, schools: [*, {id:, level: ^school}]}

# id == 2
```

Trong trường hợp bạn không hiểu cú pháp khó hiểu vừa rồi, trước tiên nó chỉ định giá trị của trường học (trong trường hợp này là "high"), sau đó nó tìm hash trong mảng trường học nơi cấp khớp với trường học. Giá trị id sau đó được gán từ hash đó, trong trường hợp này là 2.

Vì vậy, đây là tất cả những thứ mạnh mẽ đáng kinh ngạc. Tất nhiên bạn có thể sử dụng đối sánh mẫu trong logic có điều kiện, chẳng hạn như trường hợp mà tất cả các ví dụ Ruby 2.7 ban đầu đã hiển thị, nhưng tôi có xu hướng nghĩ rằng việc gán sang phải thậm chí còn hữu ích hơn cho nhiều trường hợp.

### Kết luận

Mặc dù bạn có thể không tận dụng được tất cả sự linh hoạt này nếu bạn chưa thể nâng cấp cơ sở mã của mình lên phiên bản 3 của Ruby, nhưng đó là một trong những tính năng mà tôi cảm thấy bạn sẽ thực sự bỏ lỡ sau khi bạn đã trải nghiệm nó , giống như các keyword arguments khi chúng được phát hành lần đầu. Tôi hy vọng bạn thích thú với việc đi sâu vào phân rã và khớp mẫu! Hãy theo dõi để biết thêm các ví dụ khác về chuyển nhượng bên phải và cách chúng cải thiện khả năng đọc của các mẫu Ruby.