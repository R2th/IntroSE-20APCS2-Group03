# Mở đầu
Một trong những khuân mẫu cơ bản nhất mà gần như ngôn ngữ lập trình nào cũng có đó là khả năng lưu trữ giá trị trong biến và lấy ra sử dụng sau đó cũng như cập nhật giá trị biến. Trên thực tế, khả năng lưu, lấy và cập nhật giá trị trong biến tạo ra `trạng thái (state)` của chương trình. Nếu như không có khả năng này, chương trình có thể thực hiện một số tác vụ nhất định nhưng cực kì giới hạn và chả có gì thú vị cả.

Tuy nhiên việc tồn tại khái niệm `biến (variable)` cũng đặt ra câu hỏi: những biến này nó tồn tại ở đâu ? Hay nói cách khác là chúng được lưu trữ ở đâu ? Và quan trọng nhất là làm thể nào mà chương trình tìm được biến khi cần ? 

Để trả lời cho những câu hỏi này, cần thiết phải nắm được tập hợp các quy tắc trong lưu trữ biến và tìm kiếm các biến này khi cần. Tập hợp những quy tắc này được gọi là `Scope`.

## Lý thuyết về Compiler
Một điều mà rất nhiều developer lầm tưởng, hay chính tôi trước khi tìm hiểu sâu về Javascript đó là: mặc dù Javascript được xếp vào loại ngôn ngữ `động` và là `ngôn ngữ thông dịch (interpreted language)`, thực tế Javascript là `ngôn ngữ biên dịch (compiled language)` - mặc dù không được biên dịch tốt cho lắm, nếu so với các ngôn ngữ biên dịch khác, cũng như kết quả biên dịch của nó không chạy được trên nhiều môi trường khác nhau. Dẫu vậy, JavaScript engine về cơ bảnsẽ thực hiện các bước tương tự như các trình biên dịch truyền thống khác. Trong quy trình xử lý của các trình biên dịch truyền thống, đoạn mã của chúng ta thường sẽ trải qua 3 bước, gọi là biên dịch trước khi chúng được execute:
1. Tokenizing/Lexing: Là quá trình phân tích, break nhỏ chuỗi kí tự thành các token. Ví dụ: xem xét đoạn mã sau `var a = 2;`, đoạn code này sẽ được break nhỏ ra thành các token: `var, a, =, 2, và ;` Kí tự space được xem là token tùy thuộc xem nó có ý nghĩa trong đoạn code hay không.

2. Parsing: Là quá trình biến đầu vào là một mảng các token và cho đầu ra là cây các phần tử lồng nhau - được gọi là `AST (Abstract Syntax Trê)` đại diện cho cấu trúc của chương trình. Cây cho `var a = 2` bắt được với node trên đỉnh là `VariableDeclaration`, các node con bên dưới là `Identifier (biến a)` và một node con khác gọi là `AssignmentExpression (gán a = 2)`, node con này lại có node con nhỏ hơn là `NumericLiteral (kí tự 2)`

3. Code-Generation: Là quá trình biến đầu vào là cây AST và biến nó thành mã có thể được thực thi `(executable code)`. Bước này phụ thuộc nhiều vào ngôn ngữ cũng như platform mà nó hướng tới.

Trên thực tế việc compile trong các ngôn ngữ biên dịch nói chung và trong JavaScript engine nói riêng là phức tạp hơn nhiều chứ không chỉ có 3 bước trên, bao gồm cả các bước tối ưu hóa hiệu năng thực thi, v.v.. nhưng trong khuẩn khổ bài viết, chúng ta chỉ cần hình dung đơn giản cách mà trình biên dịch hoạt động là đủ.

## Hiểu về khái niệm - cách hoạt động Scope
Để hiểu về cách thức hoạt động của scope dễ dàng, ta sẽ đặt mình vào cuộc đối thoại trong tiến trình xử lý đoạn code `var a = 2;` giữa các nhân vật sau:
1. `Engine`: chịu trách nhiệm biên dịch và thực thi chương trình JavaScript
2. `Compiler`: `thuộc cấp` của `Engine`, chịu trách nhiệm xử lý các công việc "tay chân" như phân tích cú pháp và sinh code
3. `Scope`: 1 thuộc cấp khác của `Engine`, chịu trách nhiệm thu thập và duy trì một danh sách tất cả các định danh được khai báo (các biến), và thi hành một bộ quy tắc nghiêm ngặt về cách chúng có thể truy cập được đến mã thực thi hiện tại.

### Góc nhìn của Engine
Ban đầu khi nhìn vào đoạn code `var a = 2;` thông thường ta hay nhẩm tưởng chỉ có duy nhất 1 câu lệnh trong đó. Nhưng đó không phải là cách `Engine` nhìn sự việc. Thực tế, `Engine` nhìn nhận đoạn code trên là 2 câu lệnh riêng biệt, một trong đó Compiler sẽ xử lý trong quá trình biên dịch, và một trong đó Engine sẽ xử lý trong quá trình thực thi.

Việc đầu tiên Compiler sẽ làm với đoạn code này là thực hiện lexing để chia nhỏ nó thành các token, sau đó nó sẽ phân tích cú pháp và đẩy nó vào `AST`. Nhưng khi đến bước `Compiler` sinh code, nó sẽ xử lý chương trình này hơi khác so với giả định: "Phân bổ bộ nhớ cho một biến, gắn nhãn nó là a, sau đó gán giá trị 2 vào biến đó". Thực tế `Compiler` sẽ xử lý như sau:
1. Khi gặp `var a`, `Compiler` sẽ hỏi `Scope` để xem biến đã tồn tại trong danh sách của scope nào đó chưa. Nếu rồi, `Compiler` sẽ bỏ qua khai báo này và tiếp tục. Nếu không, `Compiler` nhờ `Scope` khai báo một biến mới và bố sung vào danh sách của `Scope`.
2. `Compiler` sau đó sinh code cho Engine để thực thi, xử lý phép gán `a = 2`. `Engine` trước tiên sẽ hỏi `Scope` xem biến `a` có tồn tại trong danh sách scope hiện tại không. Nếu có, Engine sử dụng biến đó. Nếu không, `Engine` sẽ đi tìm ở nơi khác
Nếu `Engine` thực sự tìm thấy `a`, nó sẽ gán a = 2, nếu không sẽ raise lỗi.

**Tóm lại**: phép gán biến bao gồm 2 hành động riêng rẽ: đầu tiên `Compiler` định nghĩa biến (nếu chưa được định nghĩa trong scope hiện tại), và hai là khi thực thi, `Engine` sẽ tìm kiếm biến trong `Scope` và gán giá trị cho nó.

### LHS/RHS
Khi `Engine` thực thi mã mà `Compiler` đã sinh ra ở bước (2), nó phải tìm kiếm biến a để xem nó có được khai báo hay không. Nhưng tùy thuộc vào kiểu tìm kiếm lại ảnh hưởng khác nhau tới kết quả. Trong trường hợp này (`a = 2`), `Engine` đã thực hiện tìm kiếm `LHS` đối với biến a. Một kiểu tìm kiếm còn lại được gọi là `RHS`.

`LHS` và `RHS` là viết tắt của `Left-hand side` và `Right-hand side`, ở đây có nghĩa là phía trái và phía phải của toán tử gán (`assignment operation`). `LHS` đươc thực hiện khi biến xuất hiện ở phía trái của toán tử gán, và `RHS` được thực hiện trong trường hợp biến đứng bên phải phép gán hoặc đứng một mình. Thực tế  `RHS` thực hiện việc tìm kiếm giá trị của biến, nên nghĩa `Right-hand side` có vẻ chưa thoa đáng lắm, nói chính xác hơn phải là `not left-hand side`.

Cùng xem 1 số ví dụ để hiểu rõ hơn:
Với đoạn code `console.log( a );`
Tham chiếu tới `a` là tham chiếu `RHS` bởi vì ta không gán gì cho a cả. Engine đơn giản là tìm kiếm để lấy ra giá trị của `a`, và sau đó truyền vào như là tham số cho `console.log(..)`

Ngược lại: `a = 2;`
Tham chiếu tới `a` ở đây là `LHS`, bởi vì ở đây ta không thực sự quan tâm giá trị hiện tại là gì, chỉ đơn giản là muốn tìm kiếm biến và gán giá trị `= 2`.

Cùng tiếp tục với đoạn code bao gồm cả tham chiếu `LHS` và `RHS` sau:
```
function foo(a) {
	console.log( a ); // 2
}

foo( 2 );
```
Ở đây dòng cuối cùng gọi `foo (..)` thực chất là một yêu cầu tham chiếu `RHS` đến foo, có nghĩa là, "hãy tìm giá trị của foo, và đưa nó cho tôi." Cặp ngoặc này `(..)` có nghĩa là sau khi tìm thấy thì thực thi nó như 1 function.
Tiếp theo tương tự như giải thích bên trên, đoạn `console.log(a)` cũng chưa 1 tham chiếu `RHS` tới `a`.
Tuy nhiên, ở đây có tới 2 tham chiếu `LHS` đã bị ta bỏ qua, do nó không phải là phép gán biến explicit. Thực chất, khi truyên tham số vào cho `foo` (tương tự với truyền tham só vào cho console.log) đã thực hiện phép gán `a = 2` nên đây cũng là 1 tham chiếu `LHS`

### Đối thoại giữa Engine/Scope
```
function foo(a) {
	console.log( a ); // 2
}

foo( 2 );
```
Hãy tưởng tượng đoạn xử lý trên như 1 cuộc đối thoại như sau:
> **Engine**: Hey Scope, tôi muốn tham chiếu RHS tới foo. Mài có biết nó ko ?
> 
> **Scope**: Sao không, tau biết. Compiler đã định nghĩa nó vừa xong. Nó là 1 function. À đây rồi.
> 
> **Engine**: Tuyệt, cảm ơn! OK, tôi đang thực thi foo luôn đây.
> 
> **Engine**: Này, Scope, tau muốn tham chiếu LHS tới `a`, biết nó chứ ?
> 
> **Scope**: Có. Compiler khai báo nó  là một tham số cho foo. Đây rồi.
> 
> **Engine**: Vẫn được việc như mọi khi. Cảm ơn nhiều nhé. Bây giờ, thời gian để tau gán 2 cho a.
> 
> **Engine**: Hey, Scope, xin lỗi lại phiền mài lần nữa. Tôi cần một tìm kiếm RHS look-up đến `console`. Bao giờ nghe nói về nó chưa?
> 
> **Scope**: Không vấn đề gì, Engine, đây là công việc mà. Có, tôi biết console. Anh ấy là giao diện được tích hợp sẵn. Đây rồi.
> 
> **Engine**: Nuột. Để tau tìm `log(..)`. OK, đây rồi, nó là một function.
> 
> **Engine**: Yo, Phạm vi. Mài có thể giúp tau tham chiếu RHS đến a được không. Tau khi là tau không quên nó mà chỉ muốn kiểm tra lại cho chắc.
> 
> **Scope**: Vẫn là nó, không thay đổi gì.
> 
> **Engine**: Kool. Truyền giá trị của a, là 2, vào log (..).

## Nested Scope
Như đã nói ở trên, Scope là một tập hợp các quy tắc để tìm kiếm các biến theo tên định danh của chúng. Tuy nhiên, thường có nhiều hơn một Scope cần xem xét.
Cũng giống như block hay function được lồng vào bên trong một block hoặc function khác, scope cũng được được lồng trong scope khác. Vì vậy, nếu một biến không thể được tìm thấy trong scope hiện tại, Engine sẽ tìm kiếm trong scope ngay ngoài, tiếp tục cho đến khi tìm thấy hoặc cho đến khi chạm đến Global scope.
Có thể hình dung ra qua hình ảnh tòa nhà:
![](https://images.viblo.asia/79b13cdd-86de-44df-b0eb-1bddd9a74a38.png)

# Kết luận
Scope là tập hợp các quy tắc xác định vị trí và cách một biến (định danh - identifier) có thể được tìm kiếm. Việc tìm kiếm này có thể nhằm mục đích gán giá trị cho biến - tham chiếu LHS, hoặc nó có thể nhằm mục đích lấy giá trị của nó - tham chiếu RHS.

Tham chiếu LHS là kết quả của các phép gán. Các phép gán có liên quan đến scope có thể xảy ra với toán tử = hoặc bằng cách truyền tham số tới hàm.

JavaScript Engine trước tiên biên dịch mã trước khi nó thực hiện, và khi làm như vậy, nó chia tách các câu lệnh như var a = 2; thành hai bước riêng biệt:

1. Đầu tiên, var a để khai báo nó trong Scope đó. Điều này được thực hiện ngay từ đầu, trước khi thực thi mã.

2. Sau đó, a = 2 để tìm biến (tham chiếu LHS) và gán cho nó nếu tìm thấy.

Cả hai tham chiếu LHS và RHS đều bắt đầu tại Scope đang thực hiện (current scope), và nếu không (nghĩa là chúng không tìm thấy những gì chúng đang tìm kiếm ở đó), chúng sẽ đi lên từng tầng một, cho đến khi gặp Global scope.

### Tài liệu tham khảo
1. You don't know JS