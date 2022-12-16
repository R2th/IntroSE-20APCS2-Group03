# Giới thiệu
**Closure** trong **Javascript** là 1 khái niệm khá mơ hồ và dễ gây hiểu lầm, đôi khi có thể chúng ta đã dùng Closure trong javascript nhưng cũng không nhận ra đó chính là Closure. Vậy Closure là gì và tác dụng của nó là như thế nào. Để hiểu được, hãy từ từ tìm hiểu với mình nhé.
# Một số khái niệm 
## Execution context
Khi code được chạy trong JavaScript, môi trường (the environment) mà ở đó nó được thực thi rất quan trọng, nó là 1 trong những dạng dưới đây:

* Global code - môi trường mặc định (the default environment) nơi mà code của bạn được chạy lần đầu tiên

* Function code - function body của 1 function được thực thi

* Eval code - text được thực thi trong eval function 

(...), định nghĩa **execution context** chính là nơi mà code hiện tại được thực thi.
Khi chúng ta bắt đầu chạy 1 chương trình, chúng ta bắt đầu ở **global execution context**. Một vài biến được khai báo ở global execution context. Chúng ta gọi nó là global variables.
Khi nào function kết thúc? Khi nó bắt gặp tín hiệu kết thúc "**return**" hoặc là chạy hết function (đến closing bracket })

Để hiểu hơn về **excecution context**, các bạn có thể xem ở [đây](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/?source=post_page---------------------------) 


# Các ví dụ
## ví dụ 1: cơ bản
Trước khi chúng ta hiểu về closure, hãy xem qua 1 ví dụ đơn giản. Bất kì ai đọc function này thì mình nghĩ đều hiểu được function đó sẽ làm gì.
```javascript
1: let a = 3
2: function addTwo(x) {
3:   let ret = x + 2
4:   return ret
5: }
6: let b = addTwo(a)
7: console.log(b)
```
Để hiểu cách JavaScript engine thực sự làm việc, hãy phân tích chi tiết cách nó xử lý như thế nào.
1. Ở dòng 1 chúng ta khai báo 1 biến mới "a" trong global execution context và gán nó giá trị là số "3".
2. Dòng 2 đến dòng 5 đi cùng với nhau. Cái gì xảy ra ở đây? Chúng ta khai báo 1 biến mới có tên là "addTwo" trong global execution context. Và chúng ta gán cho nó cái gì? Chính là 1 function defenintion. Mọi thứ giữa 2 dấu ngoặc {} được assign cho biến "addTwo". Code trong function này chưa được xét duyệt, chưa thực thi, chỉ được lưu vào trong biến "addTwo" để sử dụng sau.
3. Bây giờ chúng ta ở dòng 6. Nó có vẻ đơn giản, nhưng có khá nhiều thứ cần khai thông ở đây. Đầu tiên chúng ta khai báo 1 biến mới trong global execution context là "b". Ngay lúc khai báo thì nó có giá trị là "undefined".
4. Tiếp, vẫn ở dòng số 6, chúng ta thấy 1 phép gán. Chúng ta gán 1 giá trị mới cho biến "b". Tiếp theo đó ta thấy 1 function đang được gọi. Bằng chứng là biến được theo sau bởi dấu ngoặc tròn (...), đó chính là dấu hiệu 1 hàm được gọi. Nó sẽ trả về 1 cái gì đó (có thể là 1 giá trị, 1 object hoặc undefined). Bất kể thứ gì nó trả về đều được gán lại cho biến "b".
5. Nhưng trước tiên chúng ta gọi hàm có tên là "addTwo". JavaScript sẽ tìm kiếm trong bộ nhớ global execution context biến có tên là "addTwo". Oh, và nó tìm thấy, vì nó được định nghĩa ở bước 2 (dòng 2-5). Và hàm biến "addTwo" này chứa 1 function defenition. Chú ý ở đây biến "a" được truyền vào như 1 argument đến function. Javascript cũng tìm kiếm biến "a" trong bộ nhớ global execution context, tìm thấy nó (với giá trị là 3), và truyền giá trị này vào function. Sẵn sàng để thực thi.
6. Bây giờ execution context được chuyển sang 1 context mới. Đó chính là local execution context tạo bởi hàm "addTwo", hãy gọi nó là "addTwo execution context". Global execution context hãy vẫn còn ở trong call stack. Hãy xem Javascript sẽ làm gì ở local execution context này?
7. Một biến "x" được khai báo ở local execution text này. Và giá trị "3" được truyền vào cho biến này, nên giá trị biến x chính là 3.
8. Bước tiếp theo là: 1 biến mới "ret" được khai báo ở local execution context với gía trị khởi tạo ngầm định là undefined. (dòng 3).
9. Vẫn ở dòng 3, một phép toán cộng được thực hiện. Đầu tiên chúng ta cần giá trị của biến "x". JavaScript sẽ tìm kiếm biến "x". Nó tìm kiếm ở local execution context đầu tiền, và nó tìm thấy, giá trị của "x" là 3. Toán tử thứ 2 có giá trị là 2. Kết quả của phép cộng là 5 được gán cho biến "ret".
10. Dòng 4. Chúng ta trả về nội dung của biến "ret". Javascript tìm kiếm trong local execution context, và tìm thấy biến "ret" với giá trị là 5. Và hàm trả về giá trị 5. Kết thúc hàm.
11. Khi tới dòng 4-5, hàm kết thúc thì local execution context cũng bị tiêu hủy. Biến "x" và "ret" cũng bị xóa sổ, không còn tồn tại. Local execution context vừa rồi bị đẩy ra khỏi call stack và chúng ta trở về lại với calling context, chính là global execution context, bởi vì hàm "addTwo" được gọi chính từ global execution context. 
12. Bây giờ chúng ta trở về tiếp tục ở bước r. Giá trị trả về (số 5) được gán lại cho biến "b". Và chúng ta đang ở line 6 của chương trình.
13. Ở line 7, nội dung của biến "b" được in ra ở console. (chính là giá trị 5).
Vừa rồi là sự giải thích khá dài dòng cho 1 chương trình cực đơn giản, và chúng ta thậm chí vẫn chưa biết closure là gì. Nhưng hãy bình tĩnh. Diễn giải trên thực sự có ích để chúng ta có thể hiểu hơn về closure. Hãy cùng xem 1 ví dụ khác.
## ví dụ 2: lexcial scope
Chúng ta cần hiểu về lexical scope. Hãy nhìn vào ví dụ dưới đây.
```javascript
1: let val1 = 2
2: function multiplyThis(n) {
3:   let ret = n * val1
4:   return ret
5: }
6: let multiplied = multiplyThis(6)
7: console.log('example of scope:', multiplied)
```
Ý tưởng ở đây là chúng ta có các biến ở local execution context và biến ở global execution context. JavaScript tìm kiếm các biến lưu trữ theo một cách hơi phức tạp. Nếu nó không tìm thấy 1 biến ở local execution context, nó sẽ tìm kiếm thêm ở calling context. Và nếu nó không thấy ở calling context, nó sẽ chạy lên global execution context để tìm kiếm. Và nếu không tìm thấy thì giá trị của biến là undefined. Phân tích ví dụ ở trên và làm rõ. Nếu bạn hiểu cách scope làm việc, bạn có thể bỏ qua sự diễn giải dưới đây.
1. Khai báo 1 biến mới "val1" trong global execution context và gán cho nó giá trị là 2.
2. Dòng 2-5. Khai báo 1 biến mới "multiplyThis" và  gán cho nó 1 function defenition.
3. Dòng 6. Khai báo 1 biến mới "multiplied" trong global execution context.
4. Nhận biến "multiplyThis" từ bộ nhớ global execution context và thực hiện nó như 1 function. Truyền argument là số 6.
5. Gọi function "multiplyThis, tạo một local execution context mới.
6. Trong local execution context, khai báo 1 biến "n" và gán giá trị cho nó là 6.
7. Dòng 3. Trong local execution context, khai báo biến "ret"
8. Dòng 3 (tiếp tục). Thực hiện phép nhân với 2 toán tử, là biến "n" và "val1". Tìm kiếm biến "n" trong local execution context. Chúng ta đã khai báo nó ở bước 6, với giá trị là 6. Tìm kiếm biến "val1" trong local execution context, không tìm thấy nên sẽ tìm kiếm tiếp trong calling context, chính là global context. Oh nó ở đó, được định nghĩa ở bước 1 với giá trị là 2.
9. Dòng 3 (tiếp tục). Nhân 2 toán tử và gán giá trị trả về cho biến "ret". Giá trị của "ret" giờ là 6*2 = 12.
10. Trả về biến "ret". Sau đó thì local execution context bị hủy, các biến con của nó là "ret" và "n" cũng bị hủy theo. Biến "val1" không bị hủy, vì nó là 1 phần của global execution context.
11. Trở lại dòng 6. Trong calling context, giá trị 12 được gán cho biến "multiplied".
12. Cuối cùng ở dòng 7, chúng ta show ra giá trị của biến "multiplied" trong console.

Ở ví dụ này, chúng ta cần nhớ là 1 function được truy cập vào biến mà được defined từ calling context của nó. Và tên thông thường của việc này chính là "lexical scope".

## ví dụ 3: function return a function
Trong ví dụ đầu tiên hàm "addTwo" trả về một số. Hãy nhớ là một hàm có thể trả về nhiều kiểu khác nhau. Hãy xem ví dụ của hàm trả về một hàm, đây chính là phần thiết yếu để hiểu về closure. 
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
Hãy phân tích từng phần trong hàm trên
1. Dòng 1. Chúng ta khai báo 1 biến "val" trong global execution context và gán giá trị 7 cho biến đó.
2. Dòng 2-8. Chúng ta khai báo 1 biến tên là "createAdder" trong global execution context và gán 1 function defenition cho nó. Dòng 3-7 mô tả nội dung của function. Như ví dụ trước, chúng ta không vội phần tích vào hàm này. Chỉ là lưu function defenition vào biến "createAdder".
3. Dòng 9. Chúng ta khai báo 1 biến mới, tên là "adder" trong global execution context với giá trị khởi tạo mặc định là undefined.
4. Vẫn ở dòng 9. Chúng ta thấy dấu ngoặc đơn (); chính là dấu hiệu để thực hiện hoặc gọi một hàm. Ở đây JavaScript phải tìm kiếm ở bộ nhớ global execution context biến có tên là "createAdder". Nó được tạo ở bước 2, hãy gọi nó.
5. Gọi hàm createAdder (ở line 2). Một local execution context mới được tạo ra. Chúng ta tạo các biến local trong execution context mới. JavaScript engine thêm context mới này vào call stack. Hàm này không có biến nào truyền vào, hay xem body của nó.
6. Từ line 3-6. Chúng ta có 1 khai báo hàm. Tạo ra 1 biến local "addNumbers" chứa function defenition trong local execution context. Lưu ý là "addNumbers" chỉ tồn tại trong local execution context này. 
7. Bây giờ ở dòng 7. Chúng ta trả về nội dung của biến "addNumbers". JavaScript engine tìm kiếm biến có tên là "addNumbers" và nó tìm thấy. Đó là 1 function defenition. 1 function có thể trả về bất cứ kiểu gì, kể cả 1 function defenition. Vì vậy chúng ta trả về 1 định nghĩ hàm của "addNumbers". Mọi code từ dòng 4 và 5 tạo nên function defenition này. Chúng ta cũng loại bỏ local execution context này từ call stack.
8. Đến khi gặp return thì local execution context cũng bị hủy. Biến "addNumbers" cũng không ngoại lệ. Nhưng function definition vẫn tồn tại, nó được trả về từ hàm và được gán vào biến "adder", chính là biến tạo ở bước 3.
9. Bây giờ chúng ta ở dòng 10. Chúng ta định nghĩa 1 biến mới là "sum" trong global execution context, với giá trị khởi tạo tạm thời là undefined.
10. Chúng ta cần thực thi hàm tiếp theo, chính là hàm được định nghĩa ở biến "adder". Chúng ta tìm kiếm nó ở global execution context và tìm thấy nó. Một hàm gồm có 2 tham số.
11. Hãy lấy giá trị của 2 tham số này, để chúng ta có thể gọi và thực thi function này. Tham số đầu tiên của biến "val", được định nghĩa ở bước 1, có giá trị là 7, và tham số thứ 2 có giá trị là 8.
12.  Bây giờ thì thực thi hàm này. Định nghĩa hàm này được viết ở dòng 3-5. Một local execution context được tạo ra. Và trong context này 2 biến mới được tạo ra là "a" và "b. Nó được gán 2 giá trị là 7 và 8 (được truyền vào trước đó).
13.  Dòng 4. Một biến mới được khai báo ở local execution context là "ret". 
14.  Dòng 4. Phép tính cộng được thi triển. Kết quả là 7+8 = 15 được gán cho biến "ret".
15.  Biến "ret" được trả về từ function. Local execution context bị hủy, loại ra khỏi call stack. Biến a, b, ret cũng bị xóa đi.
16.  Giá trị trả về được gán cho biến "sum" được định nghĩa ở bước 9.
17.  Cuối cùng là in ra giá trị của "sum" ở console.

Giá trị 15 được in ra ở console. Nhưng điểm mấu chốt ở đây là tôi muốn chỉ ra một vài điểm cần ghi nhớ. Thứ nhất là 1 function defenition có thể được lưu ở 1 biến, và function defenition bị ẩn trong chương trình cho đến khi nó được gọi đến. Thứ hai là mỗi lần hàm được gọi, thì 1 local execution context (tạm thời) được tạo, và nó biến mất khi hàm hoàn thành. Một function được tính là hoàn thành khi nó gặp keyword "return" hoặc là dấu đóng block }.


## ví dụ 4: closure
Xem ví dự dưới đây và xem thử những gì xảy ra.
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
Chúng ta mong đợi nó sẽ chạy theo những bước bên dưới.
1. Dòng 1-8. Chúng ta khai báo 1 biến "createCounter" trong global execution context và nội dung là function defenition đó.
2. Dòng 9. Chúng ta khai báo 1 biến tên là "increment" trong global execution context.
3. Dòng 9. Chúng ta gọi hàm "CreateCounter" và gán giá trị trả về cho biến "increment".
4. Dòng 1-8. Gọi hàm, tạo ra 1 local execution context mới.
5. Dòng 2. Trong local execution context đó, khai báo 1 biến mới có tên là "counter" với giá trị là 0.
6. Dòng 3-6. Khai báo 1 biến mới tên là myFunction. Biến này được khai báo trong local execution context. Nội dung của biến này lại là một function defenition khác (được định nghĩa ở dòng 4 và 5).
7. Dòng 7. Trả về nội dung của biến myFunction. Local execution context bị xóa đi cùng với các biến "myFunction" và "counter". Lúc này calling context nắm quyền và tiếp tục thực thi.
8. Dòng 9. Trong calling context, chính là global execution context, giá trị trả về bởi việc gọi hàm "createCounter" được gán cho biến "increment". Và biến "increment" bây giờ chứa function defenition. Nó không được gán nhãn là "myFunction" nữa, nhưng nó chứa nội dung function defenition tương tự như của "myFunction". Trong global execution context, nó được gán nhãn là "increment".
9. Dòng 10. Khai báo biến mới là "c1".
10. Dòng 10 (tiếp tục). Nhìn vào biến "increment", nó là 1 hàm. Và chúng ta gọi hàm này (chứa function defenition, được định nghĩa là dòng 4-5).
11. Tạo ra 1 execution context mới, không có tham số. Bắt đầu thực hiện hàm.
12. Dòng 4. counter = counter + 1. Tìm kiếm giá trị của "counter" trong local execution context. Chúng ta tạo ra context đó và không khai báo biến local nào cả. Hãy tìm kiếm thử xem ở global execution context, cũng không thấy biến "counter". Javascript đã thực thi câu lệnh này tương đương counter = undefined +1, khai báo 1 biến local mới là "counter" và gán giá trị cho nó là 1, bởi vì undefined mặc định tương đương với 0.
13. Dòng 5. Chúng ta trả về nội dung của "counter", chính là giá trị 1. Chúng ta hủy local execution context, cũng như biến counter.
14. Trở về dòng 10. Giá trị trả về (1) được gán cho biến c1.
15. Dòng 11. Lặp lại các bước tương tự 10-14, "c2" cũng được gán giá trị 1.
16. Dòng 12. Lặp lại các bước tương tự 10-14, "c3" cũng được gán giá trị 1.
17. Dòng 13, chúng ta ghi lại nội dung của các biến "c1", "c2", và "c3".

Thử ở console xem thế nào. Bạn sẽ thấy nó nó không log ra 1,1 và 1 như ta phân tích ở trên mà nó log ra 1, 2 và 3. Oh vì sao vậy?
Bằng 1 cách nào đó hàm "increment" ghi nhớ được giá trị của "counter". Nó thực sự làm việc đó như thế nào?
Có phải "counter" là 1 phần của global executoin context. Thử console.log(counter), bạn sẽ nhận được gía trị là "undefined". Vậy là không phải rồi.
Có thể, khi bạn gọi "increment", bằng 1 cách nào đó nó trở lại hàm nơi nó được tạo (createCounter). Biến "increment" chứa function defenition, không phải nơi nó có thể được lưu. Vậy cũng không phải.
Vậy chắc chắn có 1 cơ chế nào đó khác. Oh vâng đó chính là **Closure**. Cuối cùng chúng ta cũng đến đây. 

Đây là cách nó làm việc. Bất cứ khi nào bạn khai báo hàm và gán giá trị cho một biến, bạn lưu 1 function defenition, và cả closure. Closure chứa tất cả biến mà scope ở thời điểm tạo ra hàm. Nó giống như là 1 cái túi sau (backpack). Một function defenition đi với một cái tùi sau (backpack) nhỏ. Và trong túi sau này chứa tất cả các biến mà nằm trong scope ở thời điểm mà function definition được tạo ra.

Vì vậy việc giải thích ở trên đang sai. Chúng ta sẽ sửa lại như sau:
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
1. Dòng 1-8. Chúng ta khai báo 1 biến "createCounter" trong global execution context và nội dung là function defenition đó. Giống như trên
2. Dòng 9. Chúng ta khai báo 1 biến tên là "increment" trong global execution context. Giống như trên
3. Dòng 9. Chúng ta gọi hàm "createCounter" và gán giá trị trả về cho biến "increment". Giống như trên
4. Dòng 1-8. Gọi hàm, tạo ra 1 local execution context mới. Giống như trên
5. Dòng 2. Trong local execution context đó, khai báo 1 biến mới có tên là "counter" với giá trị là 0. Giống như trên
6. Dòng 3-6. Chúng ta khai báo một biến mới là "myFunction". Biến này được khai báo ở local execution context. Nội dung của biến này là 1 function defenition khác (được định nghĩa là dòng 4-5). Bây giờ chúng ta tạo ra 1 closure và coi nó như 1 phần của function defenition. Closure chứa đựng các biến mà ở trong scope, trong trường hợp này là biến "counter" (giá trị là 0).
7. Dòng 7. Trả về nội dung của biến "myFunction". Local execution context bị xóa. "myFunction" và "counter" cũng không còn tồn tại. Quyền thực thi được trả về cho calling context. Vì vậy chúng ta trả về function defenition và closure của nó, chứa đựng biến mà lúc scope được tạo.
8. Dòng 9. Trong calling context, chính là global execution context, giá trị trả về bởi "createCounter" được gán cho "increment". Biến "increment" bây giờ chứa đựng function defenition (và closure). 
9. Dòng 10. Khai báo biến mới "c1".
10. Dòng 10 (tiếp tục). Tìm kiếm biến "increment", nó là 1 function, tiến hành gọi nó. Nó chứa đựng function defenition trả về trước đó (định nghĩa ở dòng 4-5), và đương nhiên cả closure.
11. Tạo ra một execution context mới. Nó không có biến mới. Bắt đầu thực thi hàm.
12. Dòng 4. counter = counter + 1. Chúng ta cần tìm kiếm biến "counter". Trước đó chúng ta tìm ở local hoặc global execution context, bây giờ hãy tìm ở closure. Nhìn kìa, closure chưa giá trị của biến "counter" với giá trị là 0. Sau phép toán ở dòng 4, giá trị của nó là 1. Và nó tiếp tục được lưu ở closure. 
13. Dòng 5. Chúng ta trả về nội dung của counter (giá trị 1), sau đó hủy local execution context.
14. Trở về dòng 10. Giá trị trả về (1) được gán cho c1.
15. Dòng 11. Lặp lại các bước từ 10-14. Nhưng lúc này, khi chúng ta tìm kiếm ở closure thì biến "counter" có giá trị là 1. Giá trị của nó tăng lên và lưu giá trị là 2 ở closure. biến "c2" được gán giá trị là 2. 
16. Dòng 12. Lặp lại bước 10-14, biến "c3" được gán giá trị là 3.
17. Dòng 13. Chúng ta in ra nội dung các biến c1, c2, c3.

Bây giờ chúng ta đã hiểu cách nó thực sự làm việc. Điều quan trọng nhất cần nhớ là khi 1 hàm được khai báo, nó bao gồm cả 1 function defenition và 1 closure. Closure là 1 tập hợp tất cả các biến trong scope ở thời điểm tạo ra hàm.

Bạn có thể hỏi là bất kì hàm nào cũng có closure, thậm chí hàm tạo ra ở global scope. Câu trả lời là đúng như vậy. Hàm được tạo ra ở global scope cũng tạo ra closure. Nhưng bởi vì những hàm này được tạo ra ở global scope, nó truy cập được tới tất cả biến trong global scope. Và closure lúc này cũng không còn quá quan trọng.

Khi một hàm trả về 1 hàm, đó là khi khái niệm closure trở nên quan trọng. Hàm trả về không truy cập được biến ở global scope, nhưng biến đó có thể tồn tại trong closure.

# Kết luận
Cách mà tôi ghi nhớ closure là thông qua một cái túi sau (backpack). Khi 1 hàm được tạo ra và được sử dụng nhiều ở những nơi khác hoặc trả về từ 1 hàm khác, nó có 1 cái túi sau chứa đựng những biến mà trong scope đó khi hàm được khai báo.

Hi vọng bài viết có ích cho các bạn.

Bài viết tham khảo từ https://link.medium.com/kLSs2mJ7sY