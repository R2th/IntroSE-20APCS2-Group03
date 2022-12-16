Đây là bài viết giới thiệu và hướng dẫn cơ bản sử dụng về regular expression. 

Link bài gốc các bạn xem tại [đây](https://www.raywenderlich.com/5767-an-introduction-to-regular-expressions).

Một Regular expression (cách gọi chung là "regex") là một chuỗi các kí tự theo khuông mẫu xác định. Nó được dùng  để tìm các string trong các văn bản - nhưng với một sức mạnh siêu việt.

Cách tìm kiếm cũ trong text editor hoặc trình soạn thảo văn bản chỉ cho phép bạn tìm kiếm trùng với các khoá từ, hoặc chỉ giới hạn tìm kiếm trong một vài khuôn khổ cơ bản. Một regular expression có thể cũng cho phép bạn thực hiện cách tìm kiếm đơn giản này, nhưng nó một bước cải tiến cho phép bạn tìm kiếm các mẫu câu, chẳng hạn như 2 chữ số theo sau là một chữ cái hoặc 3 chữ cái theo một dấu gạch ngang.

Sự kết hợp các mấu này cho phép bạn làm những việc hữu ích như xác thực các trường (số điện thoại, địa chỉ mail), kiểm tra user input, thực hiện các thao tác nâng cao của văn bản và nhiều thứ khác...

Hãy tải xuống tài liệu ở bên dưới cùng của tutorial này để download Regular Expressions Cheat Sheet PDF và một Swift playground để thực hành nó, Bạn có thể in Cheat Sheet và sử dụng để tham khảo. Sử dụng Swift playground, nó chứa các vd, để thử nghiệm với các regular expression khác nhau. 

## /The (Basics|Introduction)/

Nếu bạn chưa sử dụng về regular expression và đang thắc mắc rằng nó là gì, đây là một lời giải thích đơn giản: regular expression cung cấp tìm kiếm tài liệu văn bản đã cho phù hợp với các mẫu câu cụ thể và chúng có thể chỉnh sửa text dựa trên kết quả tìm được đó. Có nhiều sách và hướng dẫn  viết về regular expression - Bạn có thể tìm thấy một danh sách về nó tại cuối hướng dẫn này.

## Regular Expressions Playground

Trong tutorial này, bạn sẽ tạo nhiều regular expresion. Nếu bạn muốn thử nó bằng một các trực quan khi làm việc với nó, thì hãy dùng Swift playground và đo là một nơi tuyệt vời để làm điều này.

Playerground trong tài liệu bạn tải xuống có chứa một số các function thường hay sử dụng trong tìm kiếm văn bản để hiển thị một danh sách hoặc nhóm của các kết quả phù hợp trong playground và thay thế text. 

Đừng lo lắng trong việc triển khải cụ thể các method ngay lúc này bằng code; bạn sẽ được học về nó trong phần hướng dẫn tiếp theo. Thay vào đó, hãy scroll xuống phần Vd cơ bản và Cheat Sheet để cùng xem các cú pháp qua các vd.

Tại thanh sidebar của playground, bạn sẽ thấy các danh sách kết quả phù hợp với từng vd. Đối với vd "đánh dấu", bạn có thể di chuyển chuột qua kết quả và nhấp vào mắt hoặc biểu tượng vòng tròn trống để hiển thị các kết quả được đánh dấu trong văn bản tìm kiếm.

![](https://images.viblo.asia/17086239-3429-4bef-bfd2-fe312494f459.png)

Bạn sẽ tìm hiểu cách tạo NSRegularExpression sau, nhưng bây giờ bạn có thể sử dụng playground test các regular expression hoạt động và thử tìm kiếm các mẫu của riêng bạn.

## Examples

Hãy bắt đầu bằng một vd đơn giản để cho bạn có cái nhìn về regular expression.
Dưới đây là vd của regular expression khớp với từ "jump"

```
jump
```

Dưới đây là là một vd có 1 chút khó hơn - Tìm các từ "jump" hoặc "jumps" trong văn bản:

```
jump(s)?
```

Đây là một vd sử dụng các kí tự đặc biệt phù hợp vói regular expression. Dấu ngoạc "()" dùng để tạo ra một nhóm, và dấu "?" nói rằng "phần từ này có thể xuất hiên 0 hoặc 1 lần".

```
<([a-z][a-z0-9]*)\b[^>]*>(.*?)</\1>
```

Wào, trông quá phức tạp :v, Đừng lo lắng, bạn sẽ được học về tất cả các kí tự đặc biệt trong regular expression trong phần còn lại của tutorial này, bạn sẽ hiểu được cách chúng hoạt động! :]]

Nếu bạn muốn tham khảo nhiều hơn về regular expression thì hãy tham khảo tại [link](https://www.regular-expressions.info/backref.html) này.

## Overall Concepts

Trước khi bạn đi xa hơn, một điều quan trọng là phải hiểu được một vài khái niệm trọng tâm về regular expression.

**Kí tự chữ (Literal characters)** là loại đơn giản nhất của regular expression. Nó hoạt động tương tự như thuật toán "tìm" từ của trình soạn thảo văn bản. 
Cho vd sau, một regular expression chỉ gồm có 1 chữ cái "t" sẽ tìm tất tất cả các trường hợp xuất hiện chữ t, và regular expression "jump" sẽ tìm tất cả các trường hợp xuất hiện "jump". 

Cũng giống như một ngôn ngữ lập trình, nó có một số ký tự dành riêng trong cú pháp regular expression, như sau:

```
[
( and )
\
*
+
?
{ and }
^
$
.
| (pipe)
/
```

Đây là các kí tự được sử dụng để nâng cao khả năng tìm kiếm. Nếu bạn muốn tìm kiếm một trong các kí tự trên bạn phải thêm một dấu backslash "\". 
Vd để tìm tất cả các dấu chấm "." trong một khối văn bản, mẫu đó không thể sử dụng "." mà phải là "\."

Trong regular expression, khi bạn muốn tìm kí tự "\" thì bạn phải sử dụng "\\" (Trong mã Swift hoặc Object C).

Để làm rõ các khái niệm ở dạng điểm:
Chữ "\\." xác định một string kiểu thế này "\."
Cụm regular expression "\." Sẽ khớp với một kí tự chấm đơn ".".

**Kẹp trong ngoặc đơn (Capturing parentheses)** cho một nhóm các mẫu. 
Vd, "3 (pm|am)" sẽ trả về các đoạn text khớp với "3 pm" hoặc "3 am". 
Kí tự ông "|" giống như toán tử OR. Bạn có thể báo gồm nhiều kí tự "|" trong regular expression của bạn.
Vd (Tom|Dick|Harry) là một mẫu khớp với một trong tên.

Một nhóm với dấu ngoặn đơn sẽ có ích khi bạn cần so sánh text. Giả sửa như bạn đang tìm kiếm "November" trong đoạn văn bản, nhưng nó có thể là viết tắt của tháng 11 "Nov". Bạn có thể dùng mẫu "Nov(ember)?". Dấu "?" ở phía sau ngoặc đơn có nghĩa là bất cứ thứ gì nằm trong dấu ngoặc đơn đều là tuỳ chọn.

Dấu ngoặc đơn gọi là "capturing" bởi vì nó giữ nội dung cho phép bạn tham chiếu tới trong regular expresion của bạn.

vd giả sử bạn có string "Say hi to Harry". Nếu bạn tạo một biểu thức regular expression search-and-replance với các khả năng xảy ra của "(Tom|Dick|Harry)" với "that guy $1", kết quả của nó sẽ là "Say hi to that guy Harry". $1 cho phép bạn tham chiếu tới nhóm bắt đầu tiên của các quy tắc trước đó.

Capturing và non-capturing groups là những chủ đề nâng cao. Bạn sẽ gặp phải các vd về nhóm chụp trong bài hướng dẫn tiếp theo [link](https://www.raywenderlich.com/5765-regular-expressions-tutorial-getting-started).

**Lớp kí tự (Character classes)** đại diện một tập hợp khớp với các ký tự đơn lẻ. Các lớp kí tự xuất hiện giữa các dấu ngoặc vuông ([ và ]).

Như một vd, regular expression "t[aeiou]" sẽ khơp với "ta", "te", "ti", "to" hoặc "tu". Bạn có thể có nhiều kí tự có nhiều kí tự bên trong dấu ngoặc vuông nếu bạn muốn, nhưng ghi nhớ rằng nó chỉ khớp với kí tự đơn lẻ. [aeiou] trông giống như năm kí tự, nhưng nó thực sự có nghĩa là "a" hoặc "e" hoặc "i" hoặc "o" hoặc "u".

Bạn cũng có thể định nghĩa một khoảng (range) trong một lớp kí tự nếu kí tự suất hiện liên tiếp. Vd, để tìm các số trong khoảng 100 tới 109, mẫu sẽ là "10[0-9]". Điều này sẽ trả về kết quả "10[0123456789]", nhưng sử dụng khoảng để tạo một regular expression sẽ rõ ràng và đơn giản hơn.

Nhưng lớp kí tự không chỉ giới hạn với số mà bạn có thể làm điều tương tự, "[a-f]" sẽ khớp với "a", "b", "c", "d", "e", "f".

Lớp kí tự thường chứa các kí tự bạn muốn khớp, nhưng cái gì sẽ "không khớp" với một số kí tự? Bạn có thể định nghĩa các lớp kí tự, bắt đầu với kí tự "^". Vd, mẫu "t[^o]" sẽ khớp với các tổ hợp của "t" ngoại trừ "to".

## NSRegularExpressions Cheat Sheet

Regular expression là một vd tuyệt vời của cú pháp đơn giản có thể kết thức với một số sắp xếp rất phức tạp! Hay cả những người có kinh nghiệm cũng phải tham khảo lưu trữ một bản cheat sheet cho các vấn đề khó khăn.

Bạn có thể download bản Regular Expression Cheat Sheet PDF tại link bên dưới cùng.

Ngoài ra, đây là một biểu mẫu của cheat sheet có kèm theo các giải thích bổ sung trợ giúp cho bạn: 


**.** khớp với bất kì kí tự nào, vd "p.p" khớp với pop, pup, pmp, p@p...


**\w** khớp với "kiểu word" bao gồm số, chữ cái, dấu gạch dưới, nhưng không phù hợp với dấu chấm câu hoặc các kí hiệu khác. Vd "hello\w" sẽ khớp với "hello_", "hello_9" và "hello" nhưng không khớp với "hello!"


**\d** khớp với loại số "[0-9]". Vd: "\d\d?:\d\d" sẽ khớp với các string như "9:30", "12:45"/


**\b** khớp với kí tự như dấu cách và dấu chấm câu. Vd "to\b" sẽ khớp với "to" trong "to the moon" và "to!", nhưng không khớp với "tomorrow". \b thường dùng để tìm cuối từ.


**\s** khớp với kí tự trống như space, tab, newline. Vd "hello\s" sẽ khớp với "hello " trong "Well, hello there!".


**^** khớp với vị trí bắt đầu của một dòng. Chú ý "^" khác với ^ trong dấu ngoặc vuông. Vd: "^Hello" sẽ khớp với string "Hello there" nhưng không khớp với "He said Hello".


\$ khớp với vị trí cuối hàng. Vd "the end$" khớp với "It was the end" nhưng không "the end was near".


\* khớp với kí tự trước đó từ 0 tới nhiều lần, "12*3" sẽ khớp với 13,123,1223,122223, ...


\+ khớp với kí tự trước đó xuất hiện ít nhất 1 lần, Vd: "12+3" khớp với 123,1223... nhưng không khớp với 13.


Dấu ngoặc nhọn "{}" chứa khoảng nhỏ nhất và lớn nhất của kí tự trước đó, Vd "10{1,2}1" sẽ khớp với "101", "1001" nhưng không khớp với "10001". Một vd về chỉ giới hạn dứoi: "He[L,l]{2,0}o" sẽ khớp với "HeLLo" và "HellLLLllo" và bất kì giá trị nào của "hello" với L và l.

Vậy là cũng khá đủ cho một bài giới thiệu về regular expression.

Đã đến lúc bạn bắt đầu tự mình thử nghiệm rồi, tất cả các vd đều đc bao gồm trong file playground :)). 

Link download tài liệu: [link](https://koenig-media.raywenderlich.com/uploads/2018/08/NSRegularExpressionsMaterials.zip)