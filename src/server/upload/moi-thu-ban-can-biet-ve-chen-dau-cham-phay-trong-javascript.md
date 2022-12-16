# Mở đầu
* Tự động chèn dấu chấm phẩy là một trong những tính năng cú pháp gây tranh cãi nhất của JavaScript. Cũng có nhiều quan niệm sai lầm xung quanh nó.
* Một số lập trình viên JavaScript sử dụng dấu chấm phẩy ở cuối mỗi câu lệnh và một số chỉ sử dụng chúng khi được yêu cầu nghiêm ngặt. Hầu hết hoặc một số lập trình viên thêm dấu chấm phẩy như một vấn đề của phong cách.
* Ngay cả khi bạn sử dụng dấu chấm phẩy ở cuối mỗi câu lệnh, vẫn có một số cấu trúc phân tích cú pháp theo những cách không rõ ràng. Bất kể bạn có thích thêm dấu chấm phẩy hay không, thì bạn cũng cần phải biết các quy tắc để viết JavaScript một cách chuyên nghiệp. Tất cả các quy tắc sẽ được giải thích trong bài viết này, bạn sẽ có thể hiểu phân tích cú pháp của bất kỳ chương trình nào mà bạn gặp phải. Sau khi đọc xong bài viết này, tôi hi vọng bạn sẽ là trở thành chuyên gia về chèn dấu chấm phẩy tự động JavaScript hay ASI (automatic semicolon insertion).
# Trường hợp dấu chấm phẩy được phép
* Theo định dạng ngữ pháp ngôn ngữ được đưa ra trong đặc tả ECMAScript, dấu chấm phẩy được hiển thị ở cuối mỗi loại câu mà chúng có thể xuất hiện. Ví dụ câu lệnh do-white sau:
```
do Statement while ( Expression ) ;
```
* Dấu chấm phẩy cũng xuất hiện trong ngữ pháp ở cuối câu lệnh **var**, câu lệnh biểu thức (chẳng hạn như **"4+4;"** hoặc **"f();"**), các câu lệnh **continue**, **return**, **break**, **throw** and **debugger**.
* Câu lệnh rỗng chính là một dấu chấm phẩy, và là một câu lệnh hợp lệ trong JavaScript. Vì lý do này, **";;;"** là một chương trình JavaScript hợp lệ. Nó phân tích cú pháp như ba câu lệnh rỗng và chạy bằng cách không làm gì ba lần.
* Đôi khi các câu lệnh rỗng thực sự hữu ích, ít nhất là về mặt cú pháp. Ví dụ, để viết một vòng lặp vô hạn, người ta có thể viết **while(1);**, trong đó dấu chấm phẩy được phân tích cú pháp dưới dạng một câu lệnh trống, làm cho câu lệnh **while** có hiệu lực về mặt cú pháp. Nếu dấu chấm phẩy bị bỏ qua, câu lệnh **while** sẽ không hoàn thành, bởi vì một câu lệnh theo sau điều kiện lặp là bắt buộc.
* Cuối cùng, dấu chấm phẩy xuất hiện trong vòng lặp:
```
for ( Expression ; Expression ; Expression ) Statement
```
và dĩ nhiên, chúng có thể xuất hiện bên trong các chuỗi và các biểu thức chính quy.
# Trường hợp dấu chấm phẩy có thể được bỏ qua
* Theo định dạng ngữ pháp được sử dụng trong đặc tả ECMAScript, các dấu chấm phẩy được bao gồm, như được mô tả ở trên. Tuy nhiên, đặc tả sau đó đã đưa ra các quy tắc mô tả cách phân tích cú pháp thực tế khác với ngữ pháp chính thức. 
* Phần này đưa ra ba quy tắc cơ bản, theo sau là hai ngoại lệ.
Các quy tắc là:
1. Khi chương trình chứa token không được định dạng ngữ pháp cho phép, thì dấu chấm phẩy được chèn nếu (a) có dấu ngắt dòng tại thời điểm đó hoặc (b) token không mong muốn là dấu đóng ngoặc nhọn
2. Khi kết thúc tập tin, nếu chương trình không thể được phân tích cú pháp, thì dấu chấm phẩy được chèn vào.
3. Khi gặp phải **"restricted productions"** chứa dấu kết thúc dòng ở nơi chứa **"no LineTerminator here"**, thì dấu chấm phẩy được chèn vào.
* Các quy tắc này tuyên bố rằng một câu lệnh có thể được chấm dứt mà không có dấu chấm phẩy (a) trước dấu đóng ngoặc nhọn, (b) ở cuối chương trình, hoặc (c) khi next token không thể được phân tích cú pháp.
* Các trường hợp ngoại lệ là dấu chấm phẩy không bao giờ được chèn vào như một phần của tiêu đề vòng lặp for:
```
for ( Expression ; Expression ; Expression ) Statement
```
và dấu chấm phẩy không bao giờ được chèn nếu nó được phân tích cú pháp dưới dạng câu lệnh trống.
* **42; "hello!"**  là một chương trình hợp lệ, cũng như **42\n"hello!"** (với **"\n"** đại diện cho một dấu ngắt dòng thực tế), nhưng **42 "hello!"** thì không. Dấu ngắt dòng tự động chèn dấu chấm phẩy nhưng khoảng trắng thì không. **"if(x){y()}"** cũng hợp lệ. Ở đây **"y ()"** là một câu lệnh biểu thức, có thể được chấm dứt bằng dấu chấm phẩy, nhưng vì next token là dấu đóng ngoặc nhọn, nên dấu chấm phẩy là tùy chọn mặc dù không có ngắt dòng.
* Hai trường hợp ngoại lệ, đối với các vòng lặp và các câu lệnh rỗng, có thể được chứng minh cùng nhau:
```
for (node=getNode();
     node.parent;
     node=node.parent) ;
```
Vòng lặp for này sẽ lặp lại việc lấy cha mẹ của một node cho đến khi gặp một node không có cha. Tất cả điều này được thực hiện trong header của vòng lặp for, vì vậy ta không còn gì để câu lệnh bên trong vòng lặp for phải làm. Tuy nhiên, cú pháp vòng lặp for yêu cầu một câu lệnh, vì vậy ta sử dụng một câu lệnh trống. Mặc dù cả ba dấu chấm phẩy trong ví dụ này xuất hiện ở cuối dòng, nhưng cả ba dấu chấm đều được yêu cầu, vì dấu chấm phẩy không bao giờ được chèn vào header vòng lặp hoặc để tạo câu lệnh trống.
# Restricted Productions
## Giới thiệu
**Restricted productions** là sau nó dấu ngắt dòng không xuất hiện, nếu ngắt dòng xuất hiện ở đó, nó sẽ ngăn chương trình thực thi theo cách vốn có , mặc dù nó vẫn có thể chạy theo cách khác.
## Phân loại
* Có năm loại **restricted productions**, chúng là các toán tử postfix **++** và **--**, câu lệnh **continue, break, return, throw**. Các câu lệnh **break** và **continue** được sử dụng để kết thúc hoặc tiếp tục một vòng lặp có label cụ thể theo sau nó. Nếu có label theo sau nó thì nó phải nằm trên cùng dòng với câu lệnh **break** hoặc **continue**. Sau đây là một chương trình hợp lệ:
```
var c,i,l,quitchars
quitchars=['q','Q']
charloop:while(c=getc()){
    for (i=0; i<quitchars.length; i++){
        if (c==quitchars[i]) break charloop
    }
    /* ... more code to handle other characters here ... */
}
```
**getc()** sẽ đọc một ký tự từ một thiết bị đầu vào và trả về nó, và chương trình sẽ đọc các ký tự đó, kiểm tra từng ký tự xem nó có trong mảng **quitchars** hay không, nếu có sẽ kết thúc vòng lặp. Do câu lệnh **break** có label **charloop** nên nó thoát khỏi vòng lặp **while** chứ không chỉ vòng lặp **for** bên trong. 
* Chương trình sau đây, chỉ khác nhau về khoảng trắng, sẽ phân tích cú pháp theo cách khác và sẽ không cho kết quả tương tự:
```
var c,i,l,quitchars
quitchars=['q','Q']
charloop:while(c=getc()){
    for (i=0; i<quitchars.length; i++){
        if (c==quitchars[i])
            break
                charloop
    }
    /* ... more code to handle other characters here ... */
}
```
cụ thể, label **charloop** không phải là một phần của câu lệnh **break**. Vì vậy dấu chấm phẩy được tự động chèn sau **break** chấm dứt vòng lặp **for** bên trong, còn **charloop** chỉ được phân tích cú pháp như phép tham chiếu đến biến **charloop**, sẽ không đạt được. Và vòng lặp **while** sẽ chạy vô hạn.
* Dưới đây là các ví dụ minh họa bốn **restricted productions** khác:
```
// PostfixExpression :                                            
//              LeftHandSideExpression [no LineTerminator here] ++
//              LeftHandSideExpression [no LineTerminator here] --
var i=1;
i
++;
```
Đây là một lỗi cú pháp, nó sẽ không phân tích thành **"i++"**. Một kết thúc dòng không thể xuất hiện trước toán tử postfix tăng hoặc giảm, do đó, **"++"** hoặc **"--"** ở đầu dòng sẽ không bao giờ phân tích thành một phần của dòng trước đó.

-----

```
i
++
j
```
Đây không phải là một lỗi cú pháp, nó phân tích cú pháp dưới dạng **"i; ++j"**. Các toán tử **"++"** hoặc **"--"** có dấu kết thúc dòng đằng sau nó thì không bị ảnh hưởng, nó vẫn được phân tích cú pháp với biểu thức mà nó sửa đổi.

-----

```
// ReturnStatement: return [no LineTerminator here] Expressionopt ;
return
  {i:i, j:j}
```
Mã này phân tích cú pháp như một câu lệnh **return** rỗng, theo sau là một câu lệnh biểu thức sẽ không bao giờ đạt được. Dưới đây là mã để có thể đạt được câu lệnh sau **return**:
```
return {
  i:i, j:j}
return (
  {i:i, j:j})
return {i:i
       ,j:j}
```

-----

Lưu ý rằng các câu lệnh **return** có thể chứa các dấu ngắt dòng trong biểu thức, không phải giữa mã **return** và phần đầu của biểu thức. Khi dấu chấm phẩy được bỏ qua một cách tự động, thật thuận tiện vì nó cho phép lập trình viên viết một câu lệnh **return** rỗng mà không vô tình trả về giá trị của dòng tiếp theo:
```
function initialize(a){
  // if already initialized, do nothing
  if(a.initialized) return
  a.initialized = true
  /* ... initialize a ... */
}
```
Câu lệnh **continue** và **throw** tương tự như **break** và **return**:
```
continue innerloop // correct
 
continue
    innerloop;     // incorrect
// ThrowStatement : throw [no LineTerminator here] Expression ;
throw                                          // parse error
  new MyComplexError(a, b, c, more, args);
// Unlike the return, break, and continue statements, 
// the expression after "throw" is not optional, 
// so the above will not parse at all.
throw new MyComplexError(a, b, c, more, args); // correct
throw new MyComplexError(
    a, b, c, more, args);                      // also correct
// Any variation with 'new' and 'throw' on the same line is correct.
```
Lưu ý rằng thụt lề không có tác dụng trong việc phân tích các chương trình **ECMAScript**, nhưng sự hiện diện hoặc vắng mặt của ngắt dòng thì có. Do đó, bất kỳ công cụ nào xử lý mã nguồn JavaScript đều có thể xóa khoảng trắng đầu ở các dòng (trừ trong chuỗi) mà không thay đổi ngữ nghĩa của chương trình, nhưng dấu ngắt dòng không thể bỏ bừa bãi hoặc thay thế bằng dấu cách hoặc dấu chấm phẩy.
## Lỗi hay gặp phải
* Lỗi lập trình viên hay mắc phải nhất là đặt giá trị trả về ở dòng sau của câu lệnh **return**, đặc biệt phổ biến khi giá trị được trả về là một object lớn hoặc chuỗi ký tự hoặc chuỗi nhiều dòng. Lỗi ngắt dòng với các toán tử postfix, **break**, **continue** và **throw** hiếm khi được nhìn thấy trong thực tế, vì lý do đơn giản là ngắt dòng sai có vẻ không tự nhiên đối với hầu hết các lập trình viên và do đó không có khả năng được viết.
## Chú ý
* Sự tinh tế cuối cùng của ASI phát sinh từ quy tắc đầu tiên, yêu cầu chương trình chứa token không được  định dạng ngữ pháp cho phép, trước khi dấu chấm phẩy sẽ được chèn. Khi viết mã với dấu chấm phẩy tùy chọn bị bỏ qua, điều quan trọng là phải ghi nhớ quy tắc này để dấu chấm phẩy được yêu cầu cũng không vô tình bị bỏ qua. Quy tắc này là những gì làm cho nó có thể mở rộng các câu lệnh trên nhiều dòng, như trong các ví dụ sau:
```
return obj.method('abc')
          .method('xyz')
          .method('pqr')
 
return "a long string\n"
     + "continued across\n"
     + "several lines"
 
totalArea = rect_a.height * rect_a.width
          + rect_b.height * rect_b.width
          + circ.radius * circ.radius * Math.PI
```
Quy tắc chỉ xem xét code đầu tiên của dòng sau. Nếu đoạn code đó có thể phân tích cú pháp như một phần của câu lệnh, thì câu lệnh sẽ được tiếp tục. Nếu đoạn code đầu tiên không thể mở rộng câu lệnh, thì một câu lệnh mới sẽ bắt đầu (khi đó dấu chấm phẩy được chèn tự động như đã nêu trong đặc tả).
* Khả năng xảy ra lỗi bất cứ khi nào có một cặp câu lệnh A và B mà cả A và B là các câu lệnh hợp lệ đứng một mình, nhưng đoạn code đầu của B cũng có thể được chấp nhận như một phần mở rộng của A. Trong các trường hợp như vậy, nếu một dấu chấm phẩy không được cung cấp, trình phân tích cú pháp sẽ không phân tích B như một câu lệnh riêng biệt và sẽ từ chối chương trình hoặc phân tích cú pháp theo cách mà lập trình viên không mong muốn. Do đó, khi dấu chấm phẩy bị bỏ qua, lập trình viên phải cẩn thận với bất kỳ cặp câu lệnh nào được phân tách bằng dấu ngắt dòng như:
```
A
B
```
Ví dụ đoạn mã sau sẽ cho kết quả không mong muốn nếu thiếu dấu chấm phẩy:
```
a = b + c 
(d + e).print() 
```
sẽ bằng với: 
```
a = b + c(d + e).print();
```
* Đặc tả tiếp tục nêu ra: "Trong trường hợp câu lệnh gán phải bắt đầu bằng dấu ngoặc trái, lập trình viên nên cung cấp một dấu chấm phẩy rõ ràng ở cuối câu lệnh trước thay vì dựa vào dấu chấm phẩy tự động. Một thay thế mạnh mẽ hơn trong đó dấu chấm phẩy bị bỏ qua một cách có chủ ý là bao gồm dấu chấm phẩy ở đầu dòng, ngay trước đoạn code tạo sự mơ hồ tiềm ẩn:
```
a = b + c
;(d + e).print()
```
* Đoạn mã rắc rối cuối cùng là dấu gạch chéo và mã này có thể tạo ra kết quả sai lầm:
```
var i,s
s="here is a string"
i=0
/[a-z]/g.exec(s)
```
Trên các dòng 1-3, ta tạo và gán một số biến và trên dòng 4, ta xây dựng một biểu thức chính quy **/[a-z]/g** sẽ khớp với bất kì kí tự nào từ a-z , và sau đó ta đánh giá biểu thức chính quy này với chuỗi **s** bằng phương thức **exec**. Vì giá trị trả về của **exec()** không được sử dụng, mã này không hữu ích lắm, nhưng ta có thể mong đợi nó sẽ biên dịch. Tuy nhiên, dấu gạch chéo không chỉ có thể xuất hiện ở đầu một biểu thức chính quy, mà còn đóng vai trò là toán tử chia. Điều đó có nghĩa là dấu gạch chéo hàng đầu trên dòng bốn sẽ thực sự được phân tích cú pháp dưới dạng tiếp tục của câu lệnh gán trên dòng trước đó. Toàn bộ dòng ba và bốn phân tích dưới dạng một câu lệnh "i bằng 0 chia cho [a-z] chia cho g.exec (s)".
# Quan niệm sai lầm
* Nhiều lập trình viên JavaScript mới đã được khuyên sử dụng dấu chấm phẩy ở mọi nơi và mong rằng nếu họ không cố ý sử dụng quy tắc chèn dấu chấm phẩy, họ có thể bỏ qua sự tồn tại của toàn bộ tính năng của ngôn ngữ này. Bởi vì **restricted productions** được mô tả ở trên, đáng chú ý là câu lệnh **return**, khi nhận thức được chúng, các lập trình viên sau đó có thể trở nên quá cảnh giác với dấu ngắt dòng và tránh  dùng chúng ngay cả khi chúng sẽ làm tăng sự rõ ràng của đoạn code. Tốt nhất là bạn nên làm quen với tất cả các quy tắc của **ASI** để có thể đọc bất kỳ đoạn mã nào bất kể nó được viết như thế nào và viết code rõ ràng nhất có thể.
* Một vấn đề khác là không có lý do gì để lo lắng về khả năng tương thích của trình duyệt liên quan đến việc chèn dấu chấm phẩy: tất cả các trình duyệt thực hiện cùng một quy tắc và chúng là các quy tắc được cung cấp bởi đặc tả **ECMAScript** và được giải thích ở trên.
# Kết luận
* Bạn có nên bỏ tùy chọn dấu chấm phẩy hay không? Câu trả lời phụ thuộc vào sở thích cá nhân của bạn, nhưng nên được thực hiện trên cơ sở lựa chọn có hiểu biết thay vì lo ngại mơ hồ về bẫy cú pháp chưa biết hoặc lỗi trình duyệt không tồn tại. Nếu bạn nhớ các quy tắc được đưa ra ở đây, bạn đã được trang bị đầy đủ đưa ra lựa chọn của riêng mình và đọc bất kỳ đoạn mã **JavaScript** nào một cách dễ dàng.
* Nếu bạn chọn bỏ dấu chấm phẩy nếu có thể, lời khuyên của tôi là chèn chúng ngay trước dấu ngoặc đơn mở hoặc dấu ngoặc vuông trong bất kỳ câu lệnh nào bắt đầu bằng một token nào đó hoặc bất kỳ đoạn code nào bắt đầu bằng một trong toán tử số học **"/"**, **" +"** hoặc **"-"**.
* Cho dù bạn có bỏ qua dấu chấm phẩy hay không, bạn phải nhớ **restricted productions** (**return, break, continue, throw** và các toán tử **postfix**), và bạn nên thoải mái sử dụng ngắt dòng ở mọi nơi khác để cải thiện khả năng đọc mã của bạn.
* Chúc các bạn thành công!
Nguồn tham khảo: [http://inimino.org/~inimino/blog/javascript_semicolons](http://inimino.org/~inimino/blog/javascript_semicolons)