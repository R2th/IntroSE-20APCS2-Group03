# Giới thiệu
Ruby nổi tiếng là một ngôn ngữ OOP với là tuyên ngôn: Mọi thứ trong Ruby đều là object (Everything in Ruby is an Object) từ kiểu nguyên thủy như số nguyên, số thực, xâu cho đến class, module. Tuy nhiên Ruby cũng là một ngôn ngữ hỗ trợ nhiều paradigm như lập trình thủ tục và lập trình hàm. Trong đó các tính năng nổi bật của Ruby mà được lấy cảm hứng từ các ngôn ngữ lập trình hàm bao gồm:
* Mọi statement trong Ruby đều là expression.
* Block và Higher Order Functions.
* Proc và Lambda. 

## Mọi statement trong Ruby đều là expression
Nếu đã từng lập trình trong các ngôn ngữ như C/C++, Java, Python thì có thể dễ dàng phân biệt được đâu là statement (hay lệnh) và expression (hay biểu thức). 

Ví dụ như trong C,  các từ khóa **if, while, for, do while,...** được sử dụng để tạo các statement. Điểm chung của các statement là chúng đều không trả về giá trị. Còn các expression được tạo bởi các phép toán cộng, trừ, gán, toán tử ba ngôi,... điểm chung là chúng trả về giá trị. 

Tuy nhiên, tương tự như các ngôn ngữ lập trình hàm, trong Ruby các statement như **if, unless, while, for, do while,...** đều trả về giá trị. 

Ví dụ như câu lệnh if: 
```
some_value =
    if <điều kiện>
        <các câu lệnh>
    else
        <các câu lệnh khác>
    end
```
Thì giá trị của **some_value** chính là giá trị của câu lệnh cuối trong các khối lệnh ở trên.

Hay với câu lệnh loop:
```
some_value =
    loop do
        <các câu lệnh>
        break <giá trị> if <điều kiện>
        <các câu lệnh khác>
    end
```
Thì giá trị của **some_value** chính là giá trị truyền vào lệnh **break**

Ngoài ra, cũng giống như một số ngôn ngữ lập trình hàm khác, câu lệnh cuối cùng trong một hàm (hay phương thức)  chính là giá trị trả về của hàm (hay phương thức) đó. Câu lệnh return mục đính chính dùng để trả về ngay lập tức khi đang ở giữa thân hàm mà thôi. 
## Block và Higher Order Functions
Block trong Ruby là một khối các dòng code, được định nghĩa nằm giữa **do ... end** hoặc **{ ... }** mà có thể được truyền vào trong một phương thức để mà phương thức có thể gọi khối code sau đó. Đoạn code trong block không được thực thi ngay lập tức mà Ruby sẽ ghi nhớ context mà block được tạo gồm các biến local, các object hiện thời,... để khi khối được thực thi bằng lệnh **yield** các biến local hay các object đó có thể tiếp tục được sử dụng trong phương thức được truyền vào. Nhờ cơ chế truyền block này mà trong Ruby ta có thể sử dụng rất nhiều những phương thức mà trong ngôn ngữ khác gọi là Higher Order Functions.

Higher Order Functions là những hàm mà thực hiện một trong hai điều:
* Nhận một hàm khác làm tham số.
* Trả về giá trị là một hàm khác. 

Trong đó một số những HOF hay được sử dụng bao gồm: 
* **each**: cũng chính vì HOF này mà Ruby không cần đến vòng lặp for. 
* **map và collect**: hai hàm này là giống nhau và giống với các ngôn ngữ lập trình hàm. Nhận vào một Enumerable object và trả về một list. 
* **select và reject**: hàm select nhận đầu vào là một Enumerable object và trả về một list, dùng để lựa chọn hoặc loại bỏ các phần tử trong Enumerable object đầu vào. Trong các ngôn ngữ lập trình khác thường có tên là filter. 
* **inject**: hàm nhận đầu vào là một Enumerable object và trả về một giá trị. Trong các ngôn ngữ lập trình hàm thường có tên là reduce hoặc fold (hoặc foldl, foldr). 
* **all?, any? và none?**: hàm nhận đầu vào là một Enumerable object và trả về một giá trị boolean. Dùng để kiểm tra tính chất với mọi, tồn tại hoặc không tồn tại của tập các phần tử. 

Nếu sử dụng thành thạo những HOF này có thể giúp code dễ đọc, giảm khả năng có bug vì ngoại trừ hàm **each** thì tất cả các 
hàm còn lại đều không thay đổi giá trị hiện có (hay còn gọi là có tính purity) và đồng thời chúng còn chứa đựng ý định của 
lập trình viên muốn đạt được hơn là việc sử dụng vòng lặp thông thường. 

## Proc và Lambda
Proc và Lambda thường được gọi là Closure hay Anonymous Function. Điểm khác biệt lớn nhất giữa Proc và Lambda là liên quan đến câu lệnh return. Gọi return trong Lambda sẽ kết thúc khối block gắn với nó, gọi return trong Proc sẽ kết thúc phương thức mà block của Proc được định nghĩa. Do tính chất return đặc biệt của Proc mà thông thường được kiến nghị sử dụng Lambda thay vì Proc. Do Lambda hay Proc đều là các object nên có thể được truyền vào phương thức như các object thông thường. Ngoài ra có thể dùng làm giá trị trả về cho phương thức và thực hiện kỹ thuật gọi là **Partial Application** và **Currying**:
```
def f x, y
    x + y
end

def curried x
    ->(y) {f x, y}
end
```
Ở đây phương thức curried là phương thức đã áp dụng **Partial Application** cho biến **x** của phương thức **f**. Với kỹ thuật này, ta có thể tái sử dụng những phương thức mà một số tham số của phương thức đó được sử dụng với giá trị khác nhau, đồng thời những giá trị cho các tham số đó không thể hoặc khó có được ở thời điểm phương thức được gọi. Nhờ kỹ thuật này, ta có thể truyền các phương thức được Partial Application dưới dạng các Lambda object để gọi phương thức ban đầu mà không cần có toàn bộ tham số.  
# Tham khảo
* https://en.wikipedia.org/wiki/Ruby_(programming_language)
* http://rubylearning.com/satishtalim/ruby_blocks.html
* https://en.wikipedia.org/wiki/Higher-order_function