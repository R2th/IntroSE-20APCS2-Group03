Dịch từ bài gốc [https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8](https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8)
Như tiêu đề, JavaScrip closure luôn có chút huyền bí đối với tôi. Tôi đã đọc rất nhiều bài viết, sử dụng closure trong công việc, và đôi khi tôi còn không nhận ra là mình đang dùng nó.

Gần đây tôi có đến một buổi gặp mặt mà ở đó người ta thực sự giải thích theo cái cách mà cuối cùng tôi cũng hiểu được vấn đề. Tôi sẽ cố dùng cách tiếp cận này để trình bày closure trong bài viết này. Xin được "tín dụng" đến những chuyên gia tại [CodeSmith](https://www.codesmith.io/) và serie *JavaScript The Hard Parts* của họ.

### Trước khi bắt đầu
Có một vài khái niệm cần được đưa ra trước khi bạn có thể hiểu được closure. Một trong số đó là *execution context* (ngữ cảnh thực thi).

[Bài báo này](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/) đã trình bày rất tốt về **Excecution Context**. Tôi sẽ quote lại vài dòng:
>> Khi code được chạy trong JavaScript, môi trường mà nó được thực thi rất quan trọng, và được đánh giá như một trong những ngữ cảnh sau:
>> 
>> Global code — Tức là môi trường mặc định mà đoạn code được thực thi ở lần đầu tiên.
>>
>>Function code — MỖi khi luồng thực thi chạy vào hàm.
>>
>>(…)
>>
>>(…), hãy nghĩ thuật ngữ execution context như môi trường / scope mà đoạn code hiện tại đang được đánh giá.
>>

Nói cách khác, khi chúng ta bắt đầu chương trình, chúng ta bắt đầu ở ngữ cảnh thực thi toàn cục (global execution context). Một vài biến được khai báo trong ngữ cảnh này. Chúng ta gọi nó là *global variables* (biến toàn cục). Khi chương trình gọi 1 function, điều gì sẽ xảy ra? Có một vài bước như sau:
1. JavaScript tạo một ngữ cảnh thực thi mới, ngữ cảnh thực thi cục bộ (local execution context)
2. Ngữ cảnh thực thi cục bộ này sẽ có bộ biến riêng của nó, những biến này sẽ là cục bộ đối với ngữ cảnh này.
3. Ngữ cảnh thực thi mới này sẽ được cho vào stack thực thi (execution stack). Hãy tưởng tượng stack này như một cơ chế để theo dõi chương trình

Khi nào thì function kết thúc? Khi nó gặp câu lệnh *return* hoặc gặp dấu ngoặc nhọn đóng *}* (chưa hẳn đúng vì có thể có if else trong hàm, nhưng không cần thiết đi sâu vào cái này, hiểu là được). Khi function kết thúc thì những điều sau sẽ xảy ra:
1. Ngữ cảnh thực thi cục bộ sẽ được loại ra khỏi stack thực thi
2. Function trả về giá trị đến ngữ cảnh gọi nó (calling context). *Calling context* là ngữ cảnh thực thi mà đã gọi function này, nó có thể là ngữ cảnh thực thi tooàn cục hoặc là ngữ cảnh thực thi cục bộ khác. Nó phụ thuộc vào ngữ cảnh gọi hàm để làm việc với giá trị trả về. Giá trị trả về có thể là object, array, function, boolean. Nếu function không có câu lệnh *return*, thì sẽ trả về *undefined*.
3. Ngữ cảnh thực thi cục bộ bị hủy. Hãy nhớ là nó bị hủy. Tất cả các biến được khai báo trong ngữ cảnh thực thi cục bộ sẽ bị xóa. Chúng không tồn tại nữa, đó là lý do người ta gọi chúng là biến cục bộ.

### Ví dụ cơ bản
Trước khi làm quen với closure, hãy thử xem đoạn code dưới đây. Nó rất đơn giản, ai đọc cũng sẽ hiểu được nó đang làm gì.
```javascript
1: let a = 3
2: function addTwo(x) {
3:   let ret = x + 2
4:   return ret
5: }
6: let b = addTwo(a)
7: console.log(b)
```
Để hiểu cách engine của JavaScript làm việc, hãy chia nhỏ đoạn code này một cách chi tiết.
1. Ở dòng 1, chúng ta khai báo một biến mới là *a* trong ngữ cảnh thực thi toàn cục và gán cho nó giá trị là 3.
2. Tiếp theo thì có chút vấn đề. Từ dòng 2 đến dòng 5 là đi cùng nhau. Ở đây chúng ta khai báo một biến mới đặt tên là *addTwo* trong ngữ cảnh thực thi toàn cục. Và cái chúng ta gán cho nó là một function. Mọi thứ ở giữa { } được gán cho *addTwo*. Đoạn code trong hàm chưa được thực thi, nó chỉ lưu vào biến để dùng sau này.
3. Giờ ta ở dòng 6. Nó trông đơn giản, nhưng có nhiều điều chưa được khám phá ở đây. Đầu tiên là ta khai báo một biến mới trong ngữ cảnh thực thi toàn cục và đặt tên nó là b. Ngay khi vừa được khai báo thì giá trị của nó là *undefined*.
4. Tiếp theo, vẫn là ở dòng 6, chúng ta nhìn thấy toán từ *=*. Ta đang sẵn sàng gán giá trị mới cho biến *b*. Mỗi khi mà function được gọi, thì bất cứ thứ gì mà nó trả về sẽ được gán cho biến b.
5. Nhưng trước tiên chúng ta cần gọi function *addTwo*. JavaScript sẽ tìm trong bộ nhớ ngữ cảnh thực thi toàn cục cho biến có tên gọi là *addTwo*. Ồ, nó tìm thấy một biến như vậy, nó được định nghĩa ở bước số 2 (từ dòng 2-5). Và nó thấy biến *addTwo* chứa một định nghĩa hàm. Lưu ý là biến *a* được truyền vào như một tham số hàm. JavaScript tìm biến *a* trong ngữ cảnh thực thi toàn cục, và lại thấy, với giá trị là 3, nó sẽ truyền 3 như tham số đến hàm. Và sẵn sàng để thực thi hàm này.
6. Giờ ngữ cảnh thực thi sẽ đổi. Một ngữ cảnh thực thi cục bộ (local execution context) mới được tạo, hãy tạm gọi nó là *ngữ cảnh thực thi của addTwo*. Ngữ cảnh thực thi được đưa vào *call stack*. Điều đâu tiên chúng ta làm trong ngữ cảnh thực thi cục bộ là gì?
7. Lúc này có thể bạn đang nghĩ "Một biến mới là *ret* được khai báo trong ngữ cảnh thực thi cục bộ". Nhưng thực tế không phải như vậy. Câu trả lời đúng là, chúng ta cần nhìn lại những tham số của hàm trước. Một biến mới là *x* được khai báo trong ngữ cảnh thực thi cục bộ. Và vì giá trị 3 được truyền làm tham số, nên biến *x* sẽ được gán cho giá trị là 3.
8. Bước tiếp theo mới là "Một biến mới là *ret* được khai báo trong ngữ cảnh thực thi cục bộ", giá trị của nó là *undefined* (dòng 3)
9. Vẫn ở dòng 3, một phép cộng cần được thực thi. Đầu tiên ta cần giá trị của *x*. JavaScript sẽ tìm biến *x*. Nó sẽ tìm trong ngữ cảnh thực thi cục bộ trước. Và nó thấy một, giá trị là 3. Và toán hạng thứ 2 là số 2. Kết quả của phép cộng được gán cho biến *ret*
10. Dòng 4. Chúng ta trả về nội dung của biến *ret*. Tìm trong ngữ cảnh thực thi cục bộ thì *ret* chứa giá trị là 5. Hàm trả về số 5. Và nó kết thúc.
11. Dòng 4-5. Hàm kết thúc. Ngữ cảnh thực thi cục bộ bị hủy. Biến *x* và *ret* bị xóa. Chúng không tồn tại nữa. Ngữ cảnh được loại ra khỏi *call stack* và giá trị trả về được trả lại ngữ cảnh gọi hàm. Trong trường hợp này ngữ cảnh gọi hàm là ngữ cảnh thực thi toàn cục, vì hàm *addTwo* được gọi từ ngữ cảnh thực thi toàn cục.
12. Giờ chúng ta trở lại những gì chưa nói ở bước 4. Giá trị trả về là 5 được gán cho biến *b*. Và chúng ta vẫn đang ở dòng 6 trong chương trình trên.
13. Ở dòng 7 thì giá trị của *b* được in ra console, trong ví dụ là số 5.

Đó là một bản giải thích chi tiết rất dài cho chỉ một chương trình cực kỳ đơn giản, và chúng ta thậm chí còn chưa động đến closure. Chúng ta sẽ tìm hiểu nó, nhưng cần một vài bước nữa.

### Lexical scope
Chúng ta cần hiểu một vài khía cạnh của *lexical scope*. Hãy xem ví dụ sau.

```javascript
1: let val1 = 2
2: function multiplyThis(n) {
3:   let ret = n * val1
4:   return ret
5: }
6: let multiplied = multiplyThis(6)
7: console.log('example of scope:', multiplied)
```
Ý tưởng ở đây là chúng ta có những biến trong ngữ cảnh thực thi cục bộ và biến trong ngữ cảnh thực thi toàn cục. Một điều phức tạo của JavaScript là cách nó tìm biến. Nếu nó không thể tìm biến trong ngữ cảnh thực thi cục bộ, nó sẽ tìm kiếm trong *calling context*. Và cứ lặp đi lặp lại cho đến khi nó ở ngữ cảnh thực thi toàn cục. (Và nếu nó vẫn không tìm thấy biến đó, thì nó là *undefined*). 

1. Khai báo một biến mới là *val1* trong ngữ cảnh thực thi toàn cục và gán giá trị 2 cho nó
2. Từ dòng 2-5 là khai báo biến *multiplyThis* và gán một định nghia hàm cho nó
3. Dòng 6 là khai báo một biến *multiplied* trong ngữ cảnh thực thi toàn cục
4. Nhận giá trị của biến *multiplyThis* từ bộ nhớ ngữ cảnh thực thi tooàn cục và thực thi nó như một function, truyền số 6 làm tham số.
5. Gọi hàm mới = ngữ cảnh thực thi mới. Tạo một ngữ cảnh thực thi cục bộ.
6. Trong ngữ cảnh thực thi cục bộ, khai báo biến *n* và gán giá trị 6 cho nó.
7. Dòng 3. Trong ngữ cảnh thực thi cục bộ, khai báo biến *ret*
8. Vẫn ở dòng 3. Nhân 2 toán hạng; nội dung của biến *n* và *val1*. Tìm biến *n* trong ngữ cảnh thực thi cục bộ. Chúng ta đã khai báo nó ở bước 6. Nội dung là số 6. Tìm biến *val1* trong ngữ cảnh thực thi cục bộ. Ngữ cảnh này không có biến *val1*. Hãy check *calling context* (ngữ cảnh gọi). Ngữ cảnh này là ngữ cảnh thực thi toàn cục. Và đây rồi, ta tìm thấy nó trong ngữ cảnh này, giá trị là 2.
9. Vẫn ở dòng 3, nhân 2 toán hạng và gán giá trị cho biến *ret*. 6 * 2 = 12. *ret* giờ có giá trị là 12.
10. Trả về biến *ret*. Ngữ cảnh thực thi cục bộ bị hủy, cùng với *ret* và *n*. Biến *val1* không bị hủy, vì nó là thuộc ngữ cảnh thực thi toàn cục.
11. Trở lại dòng 6, trong ngữ cảnh đang gọi, số 12 được gán cho biến *multiplied*.
12. Cuối cùng ở dòng 7, chúng ta in ra giá trị của biến *multiplied*.

Trong ví dụ này, chúng ta cần nhớ rằng một hàm truy cập được một biến được định nghĩa trong ngữ cảnh đang gọi. Tên của hiện tượng này là *lexical scope*.

### Hàm trả về một hàm
Trong ví dụ đầu tiên hàm *addTwo* trả về một số. Hãy nhớ rằng một hàm có thể trả về bất cứ thứ gì. Hãy xem ví dụ mà một hàm trả về một hàm khác, nó là điều căn bản để hiểu được closure. Dưới đây là ví dụ mà ta sẽ cùng phân tích.

```javascript
 1: let val = 7
 2: function createAdder() {
 3:   function addNumbers(a, b) {
 4:     let ret = a + b
 5:     return ret
 6:   }
 7:   return addNumbers
 8: }
 9: let adder = createAdder()
10: let sum = adder(val, 8)
11: console.log('example of function returning a function: ', sum)
```

Tiếp tục phân tích nào.
1. Dòng 1. Chúng ta khai báo biến *val* trong ngữ cảnh thực thi toàn cục và gán giá trị là 7 cho nó.
2. Dòng 2-8. Chúng ta khai báo biến *createAdder* trong ngữ cảnh thực thi toàn cục và gán một định nghĩa hàm cho nó. Dòng từ 3 đến 7 mô tả định nghĩa của hàm. Vẫn như cũ, lúc này chúng ta chưa nhảy vào hàm mà chỉ lưu nó vào biến (createAdder).
3. Dòng 9. Khai báo biến mới là *adder*, trong ngữ cảnh thực thi toàn cục. Tạm thời chưa gán giá trị cho nó.
4. Vẫn ở dòng 9, ta thấy dấu (); tức là ta cần thực thi hoặc gọi 1 hàm nào đấy. JavaScript sẽ tìm trong bộ nhớ ngữ cảnh thực thi toàn cục và tìm một biến có tên là *createAdder*, nó tạo ở bước 2, và gọi nó.
5. Gọi hàm createAdder, và lúc này ta lại ở dòng 2. Một ngữ cảnh thực thi cục bộ được tạo ra. Chúng ta có thể tạo biến cục bộ trong ngữ cảnh mới này. JavaScript engine sẽ thêm ngữ cảnh mới này vào *call stack*. Và vì hàm không có đối số nên hãy xem phần nội dung của nó có gì.
6. Từ dòng 3-6. Chúng ta khai báo một hàm mới, tạo biến *addNumbers* trong ngữ cảnh thực thi cục bộ. Điều quan trọng cần nhớ là *addNumbers* chỉ tồn tại trong ngữ cảnh này. Chúng ta lưu một định nghĩa hàm trong một biến cục bộ có tên là *addNumbers*.
7. Giờ ta ở dòng 7. Chúng ta trả về giá trị của biến *addNumbers*. Engine sẽ tìm biến có tên là *addNumbers*, nó là một định nghĩa hàm, vậy là ta trả về định nghĩa hàm của *addNumbers*. Nội dung từ dòng 4 và 5 chính là định nghĩa của nó. Chúng ta cũng xóa ngữ cảnh thực thi cục bộ khỏi *call stack*.
8. Bên cạnh đó, ngữ cảnh thực thi cục bộ bị hủy. Biến *addNumbers* không tồn tại nữa. Nhưng định nghĩa hàm của nó thì vẫn còn vì nó được trả về và gán cho biến *adder* mà ta đã tạo ở bước 3.
9. Giờ chúng ta ở dòng 10, định nghĩa một biến *sum* mới trong ngữ cảnh thực thi toàn cục, tạm thời nó là *undefined*.
10. Tiếp theo ta cần thực thi hàm *adder*, tìm trong ngữ cảnh thực thi toàn cục và thấy nó, hàm này nhận 2 đối số.
11. Nhận 2 tham số này và chúng ta có thể gọi hàm và truyền chính xác tham số. Đầu tiên là biến *val*, được định nghĩa ở bước 1, giá trị là 7, và tham số thứ 2 là số 8.
12. Chúng ta thực thi hàm *adder*, định nghĩa của nó là ở dòng 3-5. Lúc này một ngữ cảnh thực thi cục bộ mới lại được tạo ra, trong ngữ cảnh này có 2 biến được tạo: *a* và *b*. Chúng được gán cho giá trị 7 và 8, giống như tham số ta đã truyền vào ở bước trước đó.
13. Dòng 4. Một biến mới được tạo, đặt tên là *ret*. Nó được khai báo trong ngữ cảnh thực thi cục bộ.
14. Vẫn dòng 4. Một phép cộng được thực thi, chúng ta lấy giá trị của *a* cộng với *b*. Kết quả là 15 được gán cho biến *ret*.
15. Biến *ret* được trả về từ hàm này, ngữ cảnh thực thi cục bộ bị hủy, và xóa khỏi *call stack*, biến *a* và *b* không còn tồn tại nữa.
16. Giá trị trả về được gán đến biến *sum* mà đã được định nghĩa ở bước 9.
17. In giá trị của *sum* ra *console*.

Như dự kiến thì console sẽ in ra 15. Tôi đang cố làm rõ một vài điểm ở đây. Đầu tiên là một định nghĩa hàm có thể được lưu trong một biến, định nghĩa hàm sẽ là vô hình với program cho đến khi nó được gọi. Thứ 2, mỗi lần một hàm được gọi, thì một ngữ cảnh thực thi cục bộ (tạm thời) sẽ được tạo. Ngữ cảnh thực thi biến mất khi hàm kết thúc. Một hàm kết thúc khi nó gặp câu lệnh *return* hoặc dấu }.

### Closure
 Hãy cùng xem đoạn code dưới đây và xem điều gì sẽ xảy ra.
 
 ```javascript
 1: function createCounter() {
 2:   let counter = 0
 3:   const myFunction = function() {
 4:     counter = counter + 1
 5:     return counter
 6:   }
 7:   return myFunction
 8: }
 9: const increment = createCounter()
10: const c1 = increment()
11: const c2 = increment()
12: const c3 = increment()
13: console.log('example increment', c1, c2, c3)
 ```
 
 OK, bắt đầu nào.
 1. Dòng 1-8. Chúng ta tạo biến *createCounter*  trong ngữ cảnh thực thi toàn cục và gán định nghĩa hàm cho nó.
 2. Dòng 9. Tạo một biến mới là *increment* trong ngữ cảnh thực thi toàn cục.
 3. Vẫn dòng 9, gọi hàm *createCounter* và gán giá trị trả về cho biến *increment*.
 4. Chương trình sẽ trở lại dòng 1-8, gọi hàm, tạo ngữ cảnh thực thi cục bộ.
 5. Dòng 2. Trong ngữ cảnh thực thi cục bộ, khai báo biến mới là *counter* và gán 0 cho nó.
 6. Dòng 3-6. Khai báo biến mới là *myFunction*, trong ngữ cảnh thực thi cục bộ. Nội dung của biến là một định nghĩa hàm khác, từ dòng 4-5.
 7. Dòng 7. Trả về nội dung biến *myFunciton*, ngữ cảnh thực thi cục bộ bị xóa. *myFunction* và *counter* không còn tồn tại nữa. 
 8. Dòng 9, trong ngữ cảnh gọi hàm, ngữ cảnh thực thi toàn cục, giá trị trả về bởi hàm *createCounter* được gán cho biến *increment*. *increment* giờ chứa một định nghĩa hàm (dòng 4-5).
 9. Dòng 10, khai báo biến mới *c1*.
 10. Tiếp tục ở dòng 10, tìm biến *increment*, gọi nó.
 11. Lại tạo một ngữ cảnh thực thi mới, không có đối số.
 12. Dòng 4. counter = counter + 1. Tìm giá trị của biến *counter* trong ngữ cảnh thực thi cục bộ. Chúng ta chỉ vừa tạo ngữ cảnh và chưa khai báo bất kỳ biến cục bộ nào. Hãy tìm trong ngữ cảnh thực thi toàn cục, cũng không có biến nào là *counter* cả. Javascript sẽ xem như *counter = undefined + 1*, khai báo biến cục bộ mới là *counter* và gán 1 cho nó, vì *undefined* xem như là 0.
 13. Dòng 5, chúng ta trả vể nội dung của *counter*, tứ là 1. Ngữ cảnh cục bộ bị hủy, kèm theo biến *counter*.
 14. Trở lại dòng 10, *c1* được gán giá trị là 1.
 15. Dòng 11, lặp lại các bước từ 10 đến 14, thì *c2* cũng phải được gán giá trị là 1.
 16. Tương tự cho dòng 12, *c3* có giá trị là 1.
 17. Dòng 13, in nội dung của các biến *c1*, *c2*, *c3*.

Hãy thử đoạn code này và xem điều gì xảy ra. Bạn sẽ thấy rằng nó không in ra 1, 1 và 1 theo như lời giải thích trên của tôi. Thay vì đó nó in ra 1, 2 và 3. Vậy là sao?

Bằng một cách nào đó mà hàm *increment* nhớ được giá trị của biến *counter*. Nó làm bằng cách nào?

Có phải *counter* là một phần của ngữ cảnh thực thi toàn cục hay không? Thử *console.log(counter)* và bạn vẫn sẽ nhận được *undefined*. Chứng tỏ nó không phải biến toàn cục rồi.

Có lẽ là khi bạn gọi *increment*, bằng một cách nào đó nó có thể quay lại nơi function *createCounter* được tạo chăng? Cũng không phải nốt.

Vậy phải có một cơ chế khác. Đó là Closure, mảnh ghép còn thiếu.

Đây là cách nó hoạt động. Mỗi khi bạn khai báo một hàm mới và gán nó đến một biến, bạn lưu trữ một định nghĩa hàm, **cũng như một closure**. Closure chứa tất cả các biến ở trong *scope* tại thời điểm tạo hàm.
Nó được đóng gói lại. Định nghĩa hàm đi kèm một ba lô (backpack), và trong *backpack* đó lưu trữ tất cả các biến nằm trong *scope* tại thời điểm định nghĩa hàm được tạo.

Tức là giải thích trên của chúng ta đã sai, hãy thử lại lần nữa.
Hãy bắt đầu nhanh từ bước thứ 6.
1. ...
2. ...
3. ...
4. ...
5. ...
6. Dòng 3-6. Khai báo biến mới là *myFunction*, trong ngữ cảnh thực thi cục bộ. Nội dung của biến là một định nghĩa hàm khác (dòng 4-5). Lúc này chúng ta cũng tạo ra một closure và đính kèm nó như một phần của định nghĩa hàm. Closure chứa biến trong phạm vi đó, trường hợp này là biến *counter* (giá trị là 0).
7. Dòng 7, trả về nội dung biến *myFunction*, ngữ cảnh thực thi cục bộ bị hủy. Biến *myFunction* và *counter* không tồn tại nữa, trở lại ngữ cảnh gọi hàm. Tức là chúng ta trả về định nghĩa hàm và closure của nó, *backpack* đi kèm biến khi nó được tạo.
8. Dòng 9. Trong ngữ cảnh thực thi toàn cục, giá trị trả về của *createCounter* được gán cho *increment*. Biến *increment* chứa định nghĩa hàm và closure. 
9. Dòng 10. Khai báo biến mới *c1*.
10. Vẫn dòng 10, tìm biến *increment*, xác nhận nó là hàm, gọi hàm. Nó chứa định nghĩa hàm (từ dòng 4-5 và cả gói biến đi kèm).
11. Tạo một ngữ cảnh thực thi mới, không đối số.
12. Dòng 4. counter = counter + 1. Ta tìm biến *counter*, trước khi tìm ở ngữ cảnh thực thi, hãy nhìn vào *backpack*, kiểm tra closure. Ồ, nó chứa biến *counter*, giá trị là 0. Sau biểu thức ở dòng 4, giá trị của nó là 1. Và nó lại được lưu lại trong *backpack* lần nữa. Giờ thì closure sẽ chứa một biến *counter* có giá trị là 1.
13. Dòng 5. Trả về nội dung của *counter*, hoặc 1. Hủy ngữ cảnh thực thi cục bộ.
14. Trở lại dòng 10, giá trị trả về (1) được gán cho *c1*.
15. Dòng 11. Lặp lại từ bước 10-14. Lần này khi tìm trong closure, ta sẽ thấy biến *counter* có giá trị là 1, và sau biểu thức ở dòng 4, giá trị của nó là 2 và lại được lưu trong closure. Cùng với đó là *c2* được gán giá trị là 2.
16. Dòng 12. Lặp lại từ bước 10-14. *c3* được gán giá trị là 3.
17. Dòng 13. In giá trị của *c1*, *c2*, *c3* ra console.

Giờ ta đã hiểu cách closure làm việc. Điều quan trọng cần nhớ là khi một hàm được khai báo, nó chứa định nghĩa hàm và một closure. *Closure là tập hợp tất cả các biến trong cùng *scope* tại thời điểm tạo hàm.*

Bạn có thể thắc mắc là có phải bất kỳ hàm nào cũng có closure, thậm chí hàm tạo trong phạm vi toàn cục (global scope). Câu trả lời là đúng. Hàm được tạo trong phạm vi toàn cục cũng tạo một closure. Nhưng khi những hàm này được tạo thì nó có thể truy cập tất cả các biến trong phạm vi toàn cục nên khái niệm *closure* không thật sự thích hợp lắm.

Khi một hàm trả về một hàm khác, là khi khái niệm của closure trở nên thích hợp hơn. Hàm được trả về sẽ truy cập được biến tồn tại trong closure.

### Ví dụ về closures
Thỉnh thoảng *closure* xuất hiện khi bạn còn không để ý. Hãy xem ví dụ sau.

```javascript
let c = 4
function addX(x) {
  return function(n) {
     return n + x
  }
}
const addThree = addX(3)
let d = addThree(c)
console.log('example partial application', d)
```

Chúng ta khai báo một hàm là *addX* nhận đối số (x) và trả về một hàm khác.

Hàm trả về cũng nhận một đối số và cộng nó vào biến *x*.

Giá trị của *x* là một phần của closure. Khi biến *addThree* được khai báo trong ngữ cảnh cục bộ, nó được gán một định nghĩa hàm và một closure. Closure chứa biến *x*.

Vậy nên khi *addThree* được gọi và thực thi, nó truy cập biến *x* từ closure và biến *n* nhận được từ tham số và trả về tổng của *n + x*.

Trong trường hợp này là 7.

### Tóm tắt
Cách mà tôi luôn nhớ về closure là thông qua sự tương tự với chiếc ba lô (backpack). Mỗi khi một hàm được tạo ra và truyền hoặc trả về hàm khác, nó mang theo một cái ba lô đi kèm. Và trong ba lô đó chứa tất cả các biến trong ngữ cảnh tạo ra hàm đó.