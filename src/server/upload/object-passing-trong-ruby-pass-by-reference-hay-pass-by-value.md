## Lời mở đầu
Các lập trình viên mới thường bắt gặp  các vấn đề hai khái niệm là `Pass by reference` và  `Pass by value`. Các vấn đề này thường được gặp nhất khi  bắt đầu học một ngôn ngữ mới và trong khi tìm hiểu về luồng dữ liệu được truyền đi trong ngôn ngữ đó. Các lập trình viên cần biết được điều gì sẽ xảy ra với các Object gốc , Object được gán dữ liệu hoặc được trở về từ một method. Trong bài này chúng ta hãy tìm hiểu xem xem chúng được xử lý như thế nào trong Ruby.
## Object Passing là gì
“Everything is Object” - Trong Ruby, gần như tất cả mọi thứ đều là Object. Khi bạn gọi một hàm và truyền vào 1 tham số, thì tham số đó cuối cùng cũng sẽ quy về một Object. Tham số đó có thể là một Object, một tên biến, hay một biểu thức phức tạp, hay bất kể kiểu dữ liệu như thế nào thì cũng được chuyển về dạng Object, và Ruby sẽ sử dụng các object đó trong các hàm được gọi. Đây được gọi là truyền object vào phương thức hay đơn giản hơn là Object Passing.

Object có thể là chữ cái, Object được đặt tên (biến, hằng) hoặc là các biểu thức phức tạp. Các phương thức bao gồm method, block, proc, lambda, hay thậm chí là các toán tử. Trong Ruby, nhiều toán tử như `+`, `-`, `*`, `/`, hay `!` đều là các method riêng, ngay cả `=` cũng là một method. Điều này có nghĩa là các toán hạng là các tham số và kết quả của biểu thức này chính là kết quả được trả về của method đó. Do đó, các tham số có thể bao gồm các tham số bình thường, toán hạng hoặc giá trị return. Sự lỏng lẻo trong các thuật ngữ này có thể khiến người mới bắt đầu cảm thấy khá rối nhưng thật sự nó rất dễ hiểu do được áp dụng ở mọi nơi. 
## Evaluation Strategies (chiến lược tính toán giá trị)
Mỗi ngôn ngữ lập tring đều sử dụng một trong số các loại `Evaluation Strategies` (xin phép để nguyên thuật ngữ, đọc thêm tại [đây](https://en.wikipedia.org/wiki/Evaluation_strategy)) khi truyền các Object. Chiến lược này quyết định khi nào các biểu thức được tính toán và method có thể làm gì với Object được return. Hai trong các `Evaluation Strategies` tiêu biểu nhất phải kể đến là Pass by value và Pass by reference

### Tại sao cách thức truyền giá trị Object lại quan trọng

![](https://images.viblo.asia/80a9c906-ca8b-4f19-b0f4-916e25117897.gif)

Hầu hết các ngôn ngữ lập trình đều sử dụng Pass by value làm mặc định. Hầu hết trong số chúng có thể sử dụng Pass by reference khi cần thiết. Một số nhỏ các ngôn ngữ lập trình chỉ sử dụng thuần túy một kiểu Object Passing. Việc hiểu rõ cách thức nào đang được sử dụng và được sử dụng khi nào chính là điều cốt yếu để hiểu được điều gì sẽ xảy ra với một Object được truyền vào một method. Ví dụ như khi method đó thay đổi giá trị của Object thì nó chỉ thay đổi giá trị của Object bên trong method hay thay đổi giá trị của Object gốc? Đây là một ví dụ rõ nhất cho việc này: 

```ruby
def increment(x)
  x << 'b'
end

y = 'a'
increment(y)
puts y
```

Chỉ đọc thôi thì bạn có thể nói được kết quả của đoạn code này là `a` hay `ab` hay ko? Nếu Ruby sử dụng Pass by value, thì đoạn code này sẽ in ra `a`. Lý do là vì Pass by value sẽ tạo ra một bản copy của `y` trước khi truyền vào method `increment`, vì method này chi có bản copy của `y` cho nên nó không thể thay đổi giá trị của `y`.

Tuy nhiên, nếu Ruby sử dụng Pass by reference, đoạn code này sẽ in ra `ab`. Ở đây, Ruby truyền 1 tham chiếu của `y` vào method `increment`, do đó `x` trở thành tham chiếu của `y`. Khi bạn thay đổi giá trị của `x` thì đồng nghĩa với việc `y` cũng sẽ bị thay đổi.

Sự thật là cách truyền object quyết định đoạn code này sẽ trả về kết quả như thế nào, do đó hiểu rõ được cách thứ  này thật sự rất quan trọng. Việc nhìn vào đoạn code này và nói rằng ruby sử dụng Pass by value hay Pass by reference thật sự rất dễ, nếu bạn chạy nó, chúng ta sẽ nhận được kết quả là `ab`, suy ra Ruby sử dụng Pass by reference, đúng chứ? Câu trả lời này vẫn quá đơn giản để hiểu được bản chất của vấn đề. Còn nhiều thứ khác mà "chiếc" ví dụ trên chưa thể bao hàm được.
### Pass by Value (Truyền tham trị)
Với việc Pass by value, một bản copy của Object được khởi tạo, và chính bản copy ấy được truyền đến những nơi khác. Vì nó chỉ là 1 bản copy không hơn không kém nên không thể thay đổi được giá trị của Object gốc. Mọi hành động thay đổi giá trị của Object copy cũng chỉ thay đổi chính nó, Object gốc vẫn giữ nguyên giá trị.
Truyền những giá trị [immutable](https://en.wikipedia.org/wiki/Immutable_object) (không thế thay đổi) trong ruby khá giống với việc Pass by value:

```ruby
def plus(x, y)
  x = x + y
end

a = 3
b = plus(a, 2)
puts a # 3
puts b # 5
```

Như bạn có thể thấy, mặc dù chúng ta đã gán giá trị mới cho `x` ở trong hàm `plus`, tham số gốc là `a` không hề thay đổi. (Tuy nhiên, method này vẫn trả về kết quả của việc cộng `2` với `a`, trả về `5` và lưu ở `b`) Do đó, bạn cũng có thể nói rằng Ruby sử dụng Pass by value, ít nhất là đối với các giá trị `immutable`.


### Pass by Reference (Truyền tham chiếu)
Ngược lại, với Pass by Reference, tham chiếu của một Object được truyền đi. Việc này biến tham số thành 1 `alias` của Object gốc, cả tham số lẫn Object đểu trỏ đến cùng một chỗ vị trí trong bộ nhớ, có chung một Object ID. Nếu bạn thay đổi giá trị của tham số, bạn cũng đã thay đổi cả Object gốc.

Ruby sử dụng Pass by Reference khi truyền các [Mutable Object](https://viblo.asia/p/mutable-va-immutable-objects-la-gi-qzaGzLALkyO). Ví dụ: 
```ruby
def uppercase(value)
  value.upcase!
end

name = 'Framgia'
uppercase(name)
puts name     
```
Ở đây, method của chúng ta đã thay đổi String `name` qua tham chiếu của nó là `value`.

## Tham chiếu everywhere
Các biến đều không chứa các Object, về cơ bản chúng chỉ là các tham chiếu đến Object. Nếu truyền một đoạn string vào method thì việc đầu tiên Ruby làm đó là chuyển nó thành Object, rồi sau đó tự tạo một tham chiếu đến Object đó. Những tham chiếu đó có thể được gọi là các tham chiếu vô danh. 

Nếu Pass by value chỉ được áp dụng cho cả `immutable object`, nhưng tất cả các biến đều là tham chiếu (!?!) vậy điều gì thật sự sẽ diễn ra khi chúng ta truyền một `immutable object`? Thử nhé:
```ruby
def print_id number
  puts "In method object id = #{number.object_id}"
end

value = 33
puts "Outside method object id = #{value.object_id}"
print_id value
```

Kết quả

```ruby
Outside method object id = 67
In method object id = 67
```

Khá rõ ràng, `number` và `value` đều tham chiếu đến một Object mặc dù đây là `immutable object`, và `value` hoàn toàn không được copy. Do đó, Ruby không hề sử dụng pass by value, mà nó đang sử dụng pass by reference.
## Pass By Reference Value (Truyền tham chiếu giá trị)
Nếu chúng ta kết luận rằng Ruby là ngôn ngũ truyền tham chiếu thì cũng không sai. Nhiều người sẽ bảo bạn là Ruby Pass by reference và điều đó không hề sai một tý tẹo nào hết.

Tuy nhiên, mọi vấn đề đều quy về bản chất của vấn đề, ở các ngôn ngữ thuần sử dụng Pass by reference, việc gán giá trị là một việc thay đổi giá trị, nhưng trong Ruby thì không, và lý do thì mình cũng đã nhắc từ trước: biến và hằng trong Ruby không phải là Object, mà chúng chỉ là tham chiếu của Object. Việc gán giá trị cho biến thực chất chỉ là thay đổi Object nào được gắn với biến nào mà thôi. Trong khi chúng ta có thể thay đổi việc Object nào được gắn với biến nào trong các method, chúng ta vẫn không thể thay đổi được sự gắn kết của tham số gốc và Object gốc.  Chúng ta có thể thay đổi các Object vì chúng là các mutable, tuy nhiên các tham chiều lại là immutable khi ở trong method.

Việc này lại nghe giống như là Pass by value: khi pass by value tạo ra các copy của tham số khi truyền vào method, còn Ruby lại tạo ra những copy của các tham chiếu, sau đó truyền chúng vào các method. Các method này có thể sử dụng các tham chiếu để thay đổi giá trị của các Object đc tham chiếu, nhưng chúng chỉ là một bản tham chiếu được copy nên Object gốc vẫn không hề bị thay đổi (mind-blowned).

Cuối cùng thì ta có thể nói rằng, Ruby sử dụng pass by reference value (Truyền tham chiếu giá trị), hay pass by reference of the value (Truyền tham chiếu của các giá trị), hay pass by value of the reference (Truyền tham trị của các tham chiếu). Nói ngắn gọn lại thì Ruby không phải là pass by value cũng như là pass by reference, mà sử dụng một cách thức truyền dữ liệu được kết hợp giữa hai cách thức kia.
## Kết luận
Để trả lời cho câu hỏi "Ruby pass by reference hay pass by value?" thì câu trả lời sẽ là không phải cả hai? Đúng, nhưng không hoàn toàn. Thật ra có 3 cách để trả lời câu hỏi này:

**1. Pass By Reference Value (Truyền tham chiếu giá trị)**: Có thể nó đây là cách trả lời đúng nhất, nhưng đáp án này khá là khó nuốt khi học Ruby, khó có thể hình dung ra được rằng method xử lý các tham số và object như thế nào, ... ít nhất là cho đến khi bạn hiểu rõ Ruby.

**2. pass by reference:** Đúng khi bạn sử dụng để gán giá trị và các `mutable object`

**3. pass by value:** dành cho `immutable object`

Cảm ơn các bạn đã dành thời gian đọc hết bài viết của mình.

Nguồn và một số trích dẫn:

[Object Passing in Ruby](https://launchschool.com/blog/object-passing-in-ruby)

[Mutable và Immutable object](https://viblo.asia/p/mutable-va-immutable-objects-la-gi-qzaGzLALkyO)

[Evaluation Strategy](https://en.wikipedia.org/wiki/Evaluation_strategy)