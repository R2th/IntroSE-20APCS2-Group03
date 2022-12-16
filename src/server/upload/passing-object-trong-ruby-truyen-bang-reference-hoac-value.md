## Đầu tiên câu hỏi đặt ra Passing Object là gì?
Các developer fresher thường chạy theo các thuật ngữ *pass by reference* và *pass by value* sớm . Những chủ đề này thường được quan tâm nhất khi học một ngôn ngữ mới và khi cố gắng hiểu làm thế nào dữ liệu được truyền trong các ngôn ngữ lập trình . Cụ thể, một developer cần biết điều gì xảy ra với các đối tượng (object) ban đầu được truyền hoặc trả về từ một method. Trong bài viết này, chúng ta sẽ tìm hiểu ý nghĩa của các thuật ngữ này và cách chúng áp dụng cho ngôn ngữ mình đang sử dụng, ruby.
\
\
Trong ruby, gần như tất cả mọi thứ là một đối tượng (object). Khi bạn gọi một phương thức với một số *biểu thức* là một đối số (1 argument), *biểu thức* đó được đánh giá (bằng điều kiện thông qua ngôn ngữ ruby) và giảm dần, cuối cùng, nó sẽ đưa vào một đối tượng (có thể đối tượng đó là 1 kiểu dữ liệu như mảng, hash, ...). Biểu thức (cái này mình hiểu là đối số truyền vào) có thể là một đối tượng (object) bằng chữ, tên biến hoặc biểu thức phức tạp; bất kể là gì đi nữa thì nó sẽ xác định xuống thành một đối tượng (object) duy nhất. Ruby sau đó làm cho đối tượng (object) đó có sẵn bên trong phương thức (để sử dụng tiếp bên trong phương thức). Điều này được gọi là *passing object* cho phương thức, hay đơn giản hơn là truyền đối tượng.
\
\
Ví dụ đơn giản 
```ruby
def count a, b
    // a, b chính là argument đưa vào, ruby xử lý chúng thành 1 object và đảm bảo chúng có sẵn bên trong method count 
    c = a + b
    puts c
end
```
Ngoài các *method argument*, *receiver* phương thức - đối tượng mà phương thức được gọi - có thể được coi là một đối số (argument) ngụ ý. Như vậy, chúng ta cần tìm hiểu thêm về method *receiver* trong các cuộc thảo luận về Object Passing khác.
\
\
Chúng ta cũng cần suy nghĩ về các giá trị trả về. Cũng giống như các đối số được truyền cho các phương thức, các giá trị trả về được truyền bởi các phương thức đó trở lại cho người gọi. Vì vậy, các giá trị trả về phải được đưa vào thảo luận của chúng ta về việc truyền đối tượng.
\
\
Ruby cũng hỗ trợ block, procs và lambda. Tất cả những thứ này đều include các khái niệm về việc truyền các đối số và trả về các giá trị. Chúng ta thường sẽ nói về việc *passing object* đến và từ các method, nhưng bạn nên diễn giải điều đó khi đề cập đến các block, procs và lambda.
\
\
Trong ruby, nhiều toán tử như +, *, [] và ! đều là các method và thậm chí kể cả = cũng hoạt động như một method. Điều này có nghĩa là các toán hạng của các toán tử này là các đối số và các toán tử có các giá trị trả về; các đối số và giá trị trả về này được truyền xung quanh giống như các method khác (điều này có thể lý giải về việc bạn hoàn toàn có thể định nghĩa lại cái toán tử đó).
\
## Evaluation Strategies
Mỗi ngôn ngữ lập trình máy tính sử dụng một số loại *evaluation strategy* khi truyền đối tượng. *Strategy* này xác định khi nào các biểu thức được đánh giá và method có thể làm gì với các đối tượng trả về. Các *strategy* phổ biến nhất được gọi là *strict evaluation strategies*. Với *strict evaluation strategies*, mọi biểu thức được đánh giá và chuyển đổi thành một đối tượng trước khi nó được truyền cho một method.
\
\
Câu hỏi đặt ra là, **tại sao Object Passing Strategy lại quan trọng đến vậy?**
\
\
Hầu hết các ngôn ngữ máy tính sử dụng *strict evaluation strategies* đều sử dụng theo giá trị mặc định. Hầu hết các ngôn ngữ đó cũng làm cho nó có thể truyền được bằng cách *reference* khi cần thiết. Rất ít ngôn ngữ sử dụng *pass by value* hoặc *pass by reference*. Hiểu *strategy* nào được sử dụng (và khi nào) là chìa khóa để hiểu điều gì xảy ra với một đối tượng được truyền cho một method. Ví dụ, nếu method thực hiện một cái gì đó có vẻ như thay đổi đối tượng (object), thì method đó có thay đổi cục bộ thành method không, hay nó dẫn đến thay đổi đối tượng (object) ban đầu? Điều này rất quan trọng trong đoạn code như thế này:
```ruby
def increment(x)
  x << 'b'
end

y = 'a'
increment(y)
puts y
```
Đọc đoạn code  trên, bạn có thể cho biết mã này sẽ xuất ra "a" hay "ab" không? Theo giả thuyết, nếu ruby *pass by value*, mã này sẽ in ra "a". Lý do cho điều này là một *strategy* vượt qua giá trị tạo ra một bản sao của y trước khi chuyển nó sang `increment`; vì `increment` chỉ có một bản sao của y, nên nó thực sự có thể sửa đổi y.
\
Tuy nhiên, nếu ruby *pass by reference*, mã này sẽ in ra "ab". Ở đây, ruby truyền một reference từ y đến `increment`, vì vậy x trở thành bí danh cho y. Khi bạn sửa đổi x, bạn cũng sửa đổi đối tượng bí danh, y.
\
Thực tế là *object passing strategy* xác định những gì mã này puts ra sẽ cho bạn thấy tại sao kiến thức về *strategy* là quan trọng. Có thể dễ dàng test thử mã này và xem thử ruby sử dụng *pass by value* hay *pass by reference*. Nếu bạn chạy nó, nó sẽ puts ra "ab", ngụ ý rằng ruby sử dụng *pass by reference*. Tuy nhiên, như chúng tôi thấy, câu trả lời này quá đơn giản; Có rất nhiều điều đang diễn ra so với ví dụ đơn giản này chứng minh.

### Pass by value
Với *Pass by value*, một bản sao của một đối tượng được tạo ra và đó là bản sao được truyền xung quanh. Vì nó chỉ là một bản sao, không thể thay đổi đối tượng ban đầu; mọi nỗ lực thay đổi bản sao chỉ thay đổi bản sao và giữ nguyên đối tượng ban đầu.
\
Ví dụ đơn giản:
```ruby
def plus(x, y)
  x = x + y
end

a = 3
b = plus(a, 2)
puts a # 3
puts b # 5
```
\
Như bạn có thể thấy, mặc dù chúng ta gán một giá trị mới cho x trong method `plus`, đối số ban đầu a, được giữ nguyên. (Tuy nhiên, method này trả về kết quả của việc thêm 2 vào a là 5, được lưu trữ trong b.) Vì vậy, bạn có thể nói rằng ruby dường như *pass by value*, ít nhất là đối với các giá trị bất biến.
\
### Pass by reference
Ngược lại, với *pass by reference*, một tham chiếu đến một đối tượng được truyền xung quanh. Điều này thiết lập một bí danh giữa đối số và đối tượng ban đầu: cả đối số và đối tượng đều tham chiếu đến cùng một vị trí trong bộ nhớ. Nếu bạn sửa đổi trạng thái đối số, bạn cũng sửa đổi đối tượng ban đầu.

Ví dụ:
```ruby
def uppercase(value)
  value.upcase!
end

name = 'Hello'
uppercase(name)
puts name               # HELLO
```
Ở đây, method của chúng ta có thể sửa đổi string `name` thông qua giá trị bí danh của nó, vì vậy có vẻ như ruby sử dụng *pass by reference* ở đây.

## Nó tham khảo tất cả các cách
Nếu *pass by value* được sử dụng cho các đối tượng bất biến, nhưng tất cả các biến là reference, thì chính xác điều gì đang xảy ra khi chúng ta passing một đối tượng bất biến? Hãy cùng chạy thử nghiệm ngắn:
```ruby
def print_id number
  puts "In method object id = #{number.object_id}"
end

value = 33
puts "Outside method object id = #{value.object_id}"
print_id value
```
Đoạn code này sẽ chaỵ ra kết quả:
```ruby
Outside method object id = 67
In method object id = 67
```
Khá rõ ràng, `number` và `value` tham chiếu cùng một đối tượng mặc dù đối tượng là bất biến. Chúng ta cũng có thể thấy giá trị đó không được sao chép. Do đó, ruby không sử dụng *pass by value*. Nó dường như được sử dụng *pass by reference*.
\
Nhưng nếu thế với ví dụ của pass by value, điều đó có nghĩa là sao?
\
Rõ ràng, chúng tôi đã chỉ ra rằng ruby dường như đang sử dụng *pass by reference* khi truyền các đối tượng bất biến. Tại thời điểm này, trên thực tế, nó dường như đang sử dụng *pass by reference* mọi lúc.
\
Nếu vậy, chúng ta lại có câu hỏi là: "Nhưng chúng ta có thể thay đổi các đối tượng bất biến, liệu đó đã là tất cả hiểu biết về *pass by reference*?"
\
Mấu chốt chính ở đây là việc *pass by reference* không giới hạn ở các phương thức đột biến. Một phương pháp không đột biến cũng có thể sử dụng *pass by reference*, vì vậy *pass by reference* có thể được sử dụng với các đối tượng bất biến. Có thể có một tham chiếu được thông qua, nhưng tham chiếu không phải là một đảm bảo rằng đối tượng có thể được sửa đổi. Một khái niệm mới khác được đưa ra cho vấn đề này

### Pass By Reference Value
Chúng ta có thể để những thứ như trên (kết luận rằng Ruby sử dụng *pass by reference*), và chúng ta sẽ không sai. Không có gì sai với kết luận này. Nhiều người sẽ nói với bạn rằng ruby *pass by reference*.
\
\
Tuy nhiên, chúng ta lại quay trở lại vấn đề đó. Trong một giao thức thuần túy bằng ngôn ngữ tham chiếu, gán sẽ là một hoạt động đột biến. Trong ruby, nó không phải như vậy, và lý do cho điều này đã được thảo luận trước đó.
\
\
Trong khi chúng ta có thể thay đổi đối tượng bị ràng buộc với một biến bên trong một method, điều này làm chúng ta có thể thay đổi ràng buộc của các đối số ban đầu. Chúng ta có thể thay đổi các đối tượng nếu các đối tượng có thể thay đổi, nhưng bản thân các tham chiếu là bất biến theo method đó.
\
\
Điều này nghe có vẻ rất giống như *pass by value*. Vì *pass by value* chuyển các bản sao của các đối số vào một phương thức, ruby ​​dường như tạo ra các bản sao của các tham chiếu, sau đó chuyển các bản sao đó cho phương thức. Phương thức có thể sử dụng các tham chiếu để sửa đổi đối tượng được tham chiếu, nhưng vì chính tham chiếu là một bản sao, nên tham chiếu ban đầu không thể thay đổi.
\
\
Từ tất cả những điều khá lằng nhằng bên trên, chúng ta có thể thấy rằng ruby sử dụng *Pass By Reference Value*, *pass by reference of the value* hoặc *pass by value of the reference*. Nó có một chút lầy lội, nhưng 3 thuật ngữ về cơ bản là giống nhau: ruby truyền các bản sao của một reference. Nói tóm lại, ruby không *Pass By Reference* cũng không *Pass By Value*, mà thay vào đó sử dụng strategy thứ ba pha trộn hai strategy kia.