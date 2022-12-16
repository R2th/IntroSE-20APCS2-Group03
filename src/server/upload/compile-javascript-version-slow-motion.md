## Statements
*Trước tiên, ta tìm hiểu một câu lệnh là như thế nào?*
> Câu lệnh trong Javascript là tổ hợp các biến, những con số và các phép toán để thực hiện một nhiệm vụ đặc thù nào đó.
> Một chuỗi các lệnh có liên quan tạo nên một chương trình.

Trong một câu lệnh có thể có một hoặc nhiều expressions. Cụ thể:<br/>
`a = b * 2;`
<br/>
Câu lệnh trên có 4 expressions:
* `2`:  literal value expression
* `b`: variable expression, nghĩa là lấy giá trị hiện tại của nó.
* `b * 2` : arithmetic expression
* `a = b * 2` : assignment expression
## Các kiểu biên dịch
Câu lệnh  `a = b * 2 ` rất dễ cho developers khi đọc và viết code, tuy nhiên, máy tính rất là "foolish", chưa thể hiểu ngay được, nó phải diễn ra quá trình `interpreter` hoặc `compiler` trước đó.
<br/>
Với một vài ngôn ngữ, các câu lệnh được "dịch" từ trên xuống dưới, trái sang phải, từng dòng một. (*interpreting*)
<br/>
Số còn lại, nó được "dịch" một lượt, xong xuôi hết mới chạy chương trình (*compiling*)
<br/>
Như vậy, câu hỏi đặt ra là Javascript nhà ta thực thi theo kiểu nào?
> It's typically asserted that JavaScript is interpreted, because your JavaScript source code is processed each time it's run. But that's not entirely accurate. The JavaScript engine actually compiles the program on the fly and then immediately runs the compiled code. 
> *(I dont know JS)*
## Compilation hoạt động như thế nào?
*JS Engine* có cơ chế compile khá phức tạp và qua nhiều quá trình, nhưng có thể tóm gọn lại trong 3 giai đoạn chính:  
<br/>
*Step 1:*  **Tokenizing / Lexing**: chuyển string (code) thành các *tokens*.
`var a = 2; // sẽ được chuyển thành var, a, =, 2, ;`
<br/>
*Step 2:* **Parsing**: chuyển các *tokens* thành một AST (*Abstract syntax tree*) đại diện cho cấu trúc ngữ nghĩa của chương trình.
Cụ thể, từ tập các *tokens* trên, tôi sẽ build ra 1 tree có root node là 
VariableDeclaration có 2 child node<br/>
                                                         |__ dentifier (có value : a )<br/>
                                                         |__ AssignmentExpression  ( có 1 node con là NumericLiteral (value: 2))
 <br/>
*Step 3:* **Code – Generation**: chuyển AST thành *executable code*.
Cụ thể, `var a = 2` sẽ được chuyển thành các machine instructions: tạo variable `a`, assign cho giá trị `= 2`, rồi lưu vào memory.
## Compiler vs. Engine
Vẫn với ví dụ khai báo `var a = 2` trên, khi đọc tới `var a`  *Compiler* hỏi *scope* xem biến `a` đã tồn tại hay chưa, đã có rồi thì *Compiler* bỏ qua nó, còn ngược lại thì *Compiler* *sẽ khai báo một biến mới với scope tương ứng*.
<br/>
Tiếp theo, Compiler để Engine thực thi, *gán giá trị `2` cho biến `a`*, Engine hỏi scope xem có thể truy cập vào biến này được hay không, nếu không, Engine sẽ phải tìm ở "nơi khác". "Nơi khác" là ở đâu thì ở bài nói riêng về Scope mình sẽ đề cập :stuck_out_tongue:
<br/>
Túm cái váy lại, một cách đơn giản thì *Compiler* khai báo biến ... còn *Engine* thì thực thi câu lệnh chính.
## Compiler Speak
Trong câu lệnh trên, khi thực thi mã ở bước 2, *Engine* phải tìm kiếm biến a.(*look-up*)
Có 2 kiểu look-up của Engine: 
| LHS look-up | RHS look-up |
| -------- | -------- | -------- |
| Left-hand Side     | Right-hand Side     |
|Giá trị của vế trái được gán vào đâu|Lấy giá trị hiện tại của biến đó|

Nhưng là side của cái gì? Của `assignment operation` (trường hợp ví dụ trên là dấu `=` )
Một ví dụ khác:
```
console.log( a ); // RHS reference
a = 2;            // LHS reference
```
Bài tiếp theo ta sẽ tìm hiểu về scope để hiểu hơn về cách biên dịch thú vị trong Javascript ! :smiley:

*Source: You don't know Javascript*