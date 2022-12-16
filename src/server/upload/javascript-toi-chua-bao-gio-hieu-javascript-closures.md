![](https://images.viblo.asia/99ed8b08-4ace-46cc-ae57-d08c43fdd5f4.png)

> Cho đến khi ai đó giải thích cho tôi như thế này
> 
> Bài viết này được dịch từ [I never understood JavaScript closures](https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8) và mình khuyến khích mọi người đọc bài viết chính chủ bằng tiếng Anh nhé.

Đúng như tiêu đề của tác giả vậy, đối với tác giả thì  **JavaScript closures** luôn mang một chút bí ẩn ( nhưng đối với mình thì nó cũng bí ẩn không kém ) . 

Tôi đã đọc nhiều bài báo, từng sử dụng **closures** trong khi code và đôi khi tôi sử dụng **closure** mà không hề nhận ra là mình đang sử dụng đến nó.

Gần đây, tôi có tham gia 1 buổi nói chuyện và dường như đã khai sáng. Vì thế, trong phạm vi bài viết, tôi sẽ dùng cách tiếp cận trong buổi nói chuyên này để giải thích về closures.

Những bài tác giả đã đề cập : 
- [What’s a JavaScript closure? In plain English, please.](https://medium.freecodecamp.org/whats-a-javascript-closure-in-plain-english-please-6a1fc1d2ff1c)
- [Let’s Learn JavaScript Closures.](https://medium.freecodecamp.org/lets-learn-javascript-closures-66feb44f6a44)
- [Closures (wiki).](https://en.wikipedia.org/wiki/Closure_%28computer_programming%29)

Gần đây gặp được một số người, nhờ cách giải thích của họ về closures nên cuối cùng tôi đã hiểu được nó. Hôm nay, trong bài viết này tôi sẽ dùng cách đó để giải thích lại cho các bạn về **closures** . Tôi xin cảm ơn đến những tác giả tại [CodeSmith](https://www.codesmith.io/) và series của họ là *JavaScript The Hard Parts series*.


# Trước khi bắt đầu # 

Có một số khái niệm quan trọng chúng ta cần hiểu rõ trước khi tìm hiểu về **closures**. Một trong số đó chính là **Execution Context** ( Bối cảnh thực thi ).

Tham khảo định nghĩa trong [ bài này](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/)
để hiểu rõ hơn về **Execution Context**.

## Execution Context ##
**Execution Context** là một khái niệm trừu tượng được sử dụng bởi **ECMAScript** để theo dõi việc đánh giá thời gian chạy của **code**.

Mỗi **Execution Context** sẽ có 2 **phase** :
- **Creation Phase**  ( Giai đoạn khởi tạo )
- **Execution Phase**  ( Giai đoạn thực thi )


### Các loại Execution Context trong JavaScript ###

**Execution Context** trong **JavaScript** được chia thành 3 loại:

**Global Execution Context** :
>  Đây là **Execution Context** mặc định hay có thể gọi là **Base Execution Context**, là những đoạn **code** không nằm trong bất cứ **function** nào.
> 
> Nó làm 2 nhiệm vụ : 
> - Tạo **Global Object** : Gọi là **Window Object**.
> - Gắn **Value** của `this`với  **Global Object** này.
> - Chỉ có **duy nhất** một **Global Execution Context** trong một chương trình.

![](https://images.viblo.asia/dd394240-85a0-4b6c-9332-41310e914eef.png)

Khi chúng ta khai báo thêm **variable**:

![](https://images.viblo.asia/a6a4bf2d-0bcd-4b5b-bc0d-0d410a9c406b.png)

![](https://images.viblo.asia/2ae69bb9-7050-4530-b62c-b05aec8fb25c.png)

**Creation Phase** của **Global Execution Context** sẽ có các bước :
1. Tạo **Global Object**.
2. Tạo **Object** tên là `window` và gán nó với con trỏ `this`.
3. Setup vùng nhớ tạm cho **variable** và **function**.
4. Gắn giá trị `undefined` cho **variable**, trỏ từng **function** đến vùng nhớ.

Thử **log** giá trị sau **Creation Phase** và trước **Execution Phase**.

![](https://images.viblo.asia/5b7211ab-78f2-4763-8dc1-a248a51b8d7f.gif)

**Function Execution Context**:

> Được tạo ra khi **function** được thực thi, sẽ có 1 **Excution Context** mới được tạo ra cho **function** đó. Mỗi **function** sẽ có **Execution Context** riêng.

**Creation Phase** của **Function Execution Context** sẽ có các bước :
1. Tạo một **Object** tên `arguments`.
2. Setup vùng nhớ tạm cho **variable** và **function**.
3. Gắn giá trị `undefined` cho **variable**, trỏ từng **function** đến vùng nhớ.

![](https://images.viblo.asia/4bc31724-65de-41fa-a27c-dc80f40f3077.gif)

Các bạn có thể thấy cái ô màu hồng trên màn hình nó xuất hiện khi **function** được thực thi, sau đó bị remove khi **function** thực chạy xong. Khi tạo một **Execution Context**, **JavaScript** đưa vào một hàng đợi gọi là **Call Stack**, sau khi đã chạy xong **2 phase** nó remove khỏi **Call Stack**.

**Eval Function Execution Context**:

Bên trong 1 **eval function** cũng có những **Execution Context** riêng của nó, nhưng vì **eval** không được sử dụng nhiều bởi các **developers JavaScript**, nên ta sẽ không thảo luận nó trong bài này.

![](https://images.viblo.asia/c69e9562-f690-421f-b38b-d9dce0189097.png)

Nói cách khác, khi bắt đầu một chương trình **JavaScript**, Chúng ta sẽ bắt đầu trong **Global Execution Context**. Sẽ có một số **variable** lúc này được khai báo là **global variables**. Vậy trong quá trình chương trình thực thi, khi chạy đến một **function**, điều gì sẽ xảy ra :
1. Đầu tiên **JavaScript** sẽ tạo một **Function Execution Context** của **function** đó.
2. **Function Execution Context** sẽ có tập hợp những **variable** riêng được định nghĩa trong **function** đó, và nó chỉ sử dụng được trong **Context** của **function** đó mà thôi.
3. **Execution Context** mới này sẽ được đưa vào **Execution Stack**. Có thể hiểu **Execution Stack** là một cơ chế dùng để biết được nơi mà chương trình nó thực thi ở đâu.

Vậy khi nào thì một **function** kết thúc? Đó là lúc nó bắt gặp `return` hoặc là gặp closing bracket `}`. Khi một **function** đóng, nó sẽ xảy ra như sau:

1. **Function Execution Context** sẽ được xóa khỏi **Execution Stack**.
2. Những **functions** đã được 'triệu hồi' sẽ **return value** cho **Context** đã gọi nó (calling context). **Context** đó có thể là **Global Execution Context** hoặc là một **Function Execution Context** khác. **value** trả về sẽ được xử lý như thế nào thì tuỳ thuộc vào calling context tại thời điểm đó. Giá trị trả về có thể là một object, một array, một function, boolean hoặc một thứ gì đó bất kỳ. Nếu function không có return thì giá trị trả về sẽ là undefined.
3. **Function Execution Context** đó sẽ bị huỷ. Điều này rất quan trọng. Tất cả các **variables** trong đó đều được xoá khỏi bộ nhớ. Nó sẽ không còn tồn tại nữa. Đó cũng là lý do tại sao chúng ta gọi nó là biến cục bộ.

> Vào bất thời điểm nào, chỉ có một **Context** được chạy. Đấy là lý do vì sao **JavaScript** là **Single Thread** (đơn luồng), nói tóm lại là nó chỉ làm được 1 việc tại 1 thời điểm mà thôi. Thông thường các **browser** đảm bảo thực thi **Context** bằng việc sử dụng một ngăn xếp ( **stack** ). Ngăn xếp là cấu trúc dữ liệu dạng [Last In First Out (LIFO)](https://stackoverflow.com/questions/1590247/how-do-you-implement-a-stack-and-a-queue-in-javascript), có nghĩa là thứ cuối cùng bạn đặt vào sẽ là thứ đầu tiên bạn lấy ra.

Tuy nhiên, một **Execution Context** đang chạy không có nghĩa là nó phải kết thúc trước khi một **Execution Context** có thể chạy, có trường hợp **Execution Context** đang chạy bị treo và một **Execution Context** khác được chạy. **Execution context** bị tạm dừng để thay thế đó sau đấy sẽ được chọn để chạy lại. Một **Execution context** mình gọi là `A` bị thay thế bởi **Execution context** `B` , thì `B` sẽ được đẩy lên đỉnh ngăn xếp và trở thành **Execution Context** hiện tại.

![](https://images.viblo.asia/54ea6caa-b654-495f-8291-14d2bf81b544.png)

**Một ví dụ đơn giản**:

Trước khi chúng ta bắt đầu về **closures** hãy khảo sát đoạn **code** sau đây. Nó rất rõ ràng và dễ hiểu với bất kỳ ai đang đọc bài này :

```
1: let a = 3
2: function addTwo(x) {
3:   let ret = x + 2
4:   return ret
5: }
6: let b = addTwo(a)
7: console.log(b)
```

Để hiểu được cách mà **JavaScript engine** nó **work** như thế nào, chúng ta hãy phân tích chi tiết nó ra :

1. Đầu tiên, chúng ta khởi tạo một **variables** trong **Global Execution Context** có tên là `a` và gán nó nó có giá trị bằng `3`.
2. dòng `2` đến dòng `5` là thực hiện việc định nghĩa một **function** có tên là `addTwo` và cũng trong **Global Execution Context**, những thứ nằm trong `{}` được gắn cho `addTwo`. **function** này chưa được **executed** (thực thi). mới được khởi tạo nhé các bạn, nó chỉ được lưu đấy và chờ sử dụng thôi.
3. Dòng `6` có vẻ rất **Simple Love**, nhưng có nhiều vấn đề ở đây. Đầu tiên ta khai báo một **variable** trong **Global Execution Context** có tên là `b`, ngay khi được **Creation** thì nó sẽ được gán giá trị là `undefined`. ( chưa hiểu sao `undefined` thì kéo lên trên đọc nhé các bạn ).
4. Vẫn là dòng `6`, chúng ta có một phép gán ở đây, `b` sẽ được gán giá trị mới, **function** `addTwo` sẽ được triệu hồi. Cái gì được **return** từ **function** `addTwo` đều sẽ được gán cho **variables** `b`.
5. À đầu tiên, phải gọi là **function** `AddTwo`, **JavaScript** sẽ tìm trong **Global Execution Context** một **variables** có tên là `addTwo` .Nó tìm được một cái, các bạn có thể thấy từ dòng `2` dến dòng `5`. `AddTwo` này là một **function**, `a` lúc này là một **param** được truyền vào **function**.**JavaScript** tìm một **variables** `a` trong **Global Execution Context**, sau khi tìm được thì nó truyền **value** của **variables** vào **function**.
6. Bây giờ **Execution Context** sẽ chuyển sang **addTwo Function Execution Context**, **Execution Context** này sẽ được đưa vào ngăn xếp để thực thi (**call stack**).
7. Điều đầu tiên trong **function** này làm là gì ? Bạn có thể bị nhầm là nó sẽ thực hiện việc khai báo một **variables** tên `ret`. Câu trả lời đúng là chúng ta hãy xem **param** **function** được nhận vào trước tiên, và vì giá trị truyền vào **function** là `3` nên **variable** `x` có **value** là `3.
8. Bước tiếp theo là: **variable** `ret` được khai báo và gán giá trị là **undefined** (line 3).
9. Vẫn dòng `3`, cần thêm một điều nữa để thực thi. Đầu tiên chúng ta cần giá trị của `x`, **JavaScript** sẽ tìm một **variable** tên là `x`. Nó sẽ tìm trong **Function Execution Context** Và khi đã tìm thấy giá trị nó là `3`toán tử thứ hai là `2`. Kết quả của phép cộng là `5` sẽ được gán cho **variable** `ret`.
10. Dòng 4, giá trị của `ret sẽ được **return** cho **function** `addTwo`, tìm kiếm trong *Function Execution Context** `ret`, **function return value ret**. **function** kết thúc.
11. Dòng `4` đến `5`, **function** kết thúc, **Function Execution Context** `addTwo` bị hủy, **variable** `x` và `ret` bị xóa khỏi bộ nhớ, nó không còn tồn tại nữa, **Context** này sẽ bị xóa khỏi **stack** và **value return** ở đây là `5` sẽ được gửi đến **Context** gọi nó ( Calling Context ), ở đây chính là **Global Execution Context**, bởi vì **function** đã được gọi từ **Global Execution Context**.
12. **Value return** là `5` sẽ được gán cho **variable** `b`.

## Lexical Scope ##
```
1 let val1 = 2

2 function multiplyThis(n) {
3    let ret = n * val1
4    return ret
5 }
6 let multiplied = multiplyThis(6)
7 console.log('example of scope:', multiplied);
```
Câu chuyện ở đây là gì, chúng ta có những **variable** trong các **Function Execution Context** và **Global Execution Context**, một điều rắc rối của **JavaScript** là làm thế nào là làm sao nó kiếm được **variable** nó cần, nếu nó không tìm được trong **Function Execution Context** của nó, nó sẽ tìm đến **Calling Context**, và nếu ở đó nó không tìm thấy nữa thì nó tiếp tục tìm ở **Calling Context** của **Calling Context** đó, Cứ lặp lại như thế cho đến khi gặp **Global Execution Context**, và nếu không gặp được **variable** cần tìm thì **value** được trả về cho biến đó là `undefined`. Để hiểu rõ chúng ta hãy theo dõi ví dụ trên. Nếu bạn đã biết về **scope** thì có thể bỏ quan phần này.
1. Khai báo một **variable** có tên là `val1` và gán **value** cho nó là `2.
2. Dòng **2** đến dòng **5** khai báo một **Function** có tên là `multiplyThis`.
3. Dòng **6** này khai báo một **variable** mới **Global Execution Context**.
4. Từ bộ nhớ **Global Execution Context** này, nhận lấy **value return** của **function** `multiplyThis` và thực thi nó, truyền **param** là `6` cho **function** đó.
5. Một **function** mới được gọi và thực thi thì đồng nghĩa sẽ có **Function Execution Context** mới được tạo ra.
6. Trong **Function Execution Context** này, **variable** được khai báo là `n` và được gán **value** là `6`.
7. Dòng **3**, đồng thời trong **Function Execution Context** này, khai báo một **variable** có tên là `ret`.
8. Trên dòng **3** tiếp tục thực hiện phép nhân với hai toán tử là **value** của **variable** `n` và `val1`, tìm **variable** ở **Function Execution Context**, nó được gắn ở bước **6** và **value** của nó là `6`, tìm đến **variable** `val1` trong **Function Execution Context** và tất nhiên là không tìm thấy, nó tìm tiếp đến **Calling Context** để hỏi thăm,**Calling Context** lúc này là **Global Execution Context**, tìm **variable** trong đó, `val1` đã được **defined** trong bước **1** và **value** của nó là `2`.
9. Lại tiếp tục dòng **3**, **variable** `ret` giờ chắc chắn là có **value** bằng `12` rồi phải không các bạn.
10. Return **variable** `ret`, đồng thời **Function Execution Context** sẽ bị hủy, **variable** `ret` và `n` sẽ bị xóa bỏ ra khỏi bộ nhớ, **variable** sẽ không bị xóa bỏ vì nó nằm ở **Global Execution Context**.
11. Quay tiếp đến dòng **6**, trong **Calling Context**, **variable** được gán **value** là `12`.
12. Cuối cùng trên dòng **7**, **value** của `multiplied` sẽ được **log** ra màn hình.

Trong ví dụ trên, chúng ta cần nhớ rằng một **Fnction** ngoài việc nó có thể truy cập đến những **variable** của nó thì còn có thể truy cập đến những **variable** được **defined** trong **Calling Context**, người ta thường gọi nó là **Scope**.

## A Function return Function
Trong ví dụ đầu tiên, các bạn có thể thấy **Function return** về một con số, chúng ta nên nhớ rằng **Function** có thể **return** về bất cứ thứ gì, kể cả là **Function**.
```
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
1. Dòng **1** chúng ta khai báo một **variable** và gán **value** nó là `7`, **Global Execution Context**.
2. Dòng **2**, cũng trong **Global Execution Context**, chúng ta khai báo một **Function** mới có tên là `createAdder`, và gán **value** cho nó là **defined** của một **Function**, từ dòng **3** đến dòng **7** là mô tả **Function** này sẽ làm gì.
3. Dòng **9**, chúng ta khai báo một **variable** mới `adder`, **Creation Phase** của **Global Execution Context** thì nó sẽ có **value** là `undefined`
4. Vẫn ở dòng **9**, chúng ta thấy dấu ngoặc **()**, có nghĩa là chúng ta sẽ thực thi **Function**, tìm trong bộ nhớ **Global Execution Context** chúng ta thấy `createAdder` và thực thi nó.
5. Thực thi một **Function** và giờ chúng ta đang ở dòng **2**, một **Function Execution Context** được tạo ra, chúng ta có thể thêm những **variable** cục bộ trong **Execution Context** mới này, **JavaScript** thêm **Execution Context** vào **Stack**, do **Function** này không có **param** đầu vào nên chúng ta nhảy đến phần thân **Function** luôn.
6. Vẫn trong dòng **3** đến dòng **6**, chúng ta có một **Function** mới được khai báo, chúng ta tạo một **function** `addNumbers` trong **Function Execution Context** này, điều này rất quan trọng vì `addNumbers` chỉ tồn tại trong **Function Execution Context** này.
7. Bây giờ chúng ta đang ở dòng **7**, **value return** là **Function** `addNumbers`, `JavaScript` tìm **Function** có tên là `addNumbers`, và sau đó bất cứ thứ gì nằm trong dòng **4** đến dòng **5** đều bị xóa bỏ khỏi **Call Stack**.
8. Phía trên **return**, **Function Execution Context** đã bị huỷ. `addNumbers` cũng không còn nữa. Tuy nhiên **definition** của **Function** đó vẫn có tồn tại, nó được **return** sau khi gọi thực thi **Function** `createdAdder` và đã được gán cho **variable** `adder`. Đó là **variable** đã được tạo tại bước `3`.
9. Bắt đầu đến dòng **10**. Chúng ta định nghĩa một **variable** mới tên là sum` trong **Global Execution Context** với **value** ban đầu là `undefined`.
10. Kế tiếp chúng ta cần thực thi **Function**, Đó là **Function** đã được **defined** tên là `adder`. Tìm nó trong **Global Execution Context**, chắc chắn chúng ta sẽ tìm thấy nó. Nó là **Function** có 2 **param**.
11. Nhận 2 **param** truyền vào và gọi **Function** để thực thi. Đầu tiên là **variable** `val`, cái này đã được **defined** trong bước **1**, có **value** `7` và tham số truyền vào thứ hai là số `8`.
12. Bây giờ chúng ta thực thi **Function**, **Function** được **defined** trong dòng **3** đến **5**, một cái **Function Execution Context** được tạo ra, bên trong **Function Execution Context** có hai **variable** được tạo ra là `a` và `b`, chúng được gán tương ứng **value** là `7` và `8`.
13. Dòng **4**, một **variable** mới được khai báo và đặt tên là `ret`. Đó được khai báo báo trong **Function Execution Context**.
14. Dòng **4**, thực hiện phép tính cộng, với **value** của `a` và `b` kết quả được gán cho cho **variable** `ret`.
15. **variable** `ret` được **return** từ **Function**. **Function Execution Context** bị huỷ, nó bị xoá khỏi **Call Stack**, các **variable** `a`, `b` và `ret` cũng không còn nữa.
16. Gán **value return** cho **variable** `sum` được khai báo ở dòng **9**.
17. Dòng **11** này in ra **value** của `sum`.

Như dự đoán, kết quả **Log** ra sẽ là `15`, có vài điều cầu lưu ý ở đây :
- **Defined Function** có thể lưu vào một **variable**.
- **Function** đó có thể không xuất hiện trong chương trình cho đến khi được gọi đến.
- Mỗi lần **Function** được gọi, một **Function Execution Context** ( tạm thời ) sẽ được tạo ra, **Execution Context** sẽ tan biến đến khi **Function** kết thúc.
- Một **Function** kết thúc khi nó được **return** hoặc closing bracket **}**.

## Cuối cùng là Closure

 ```
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

Hãy chạy đoạn code trên và xem kết quả thử nhé, 
1. Dòng đầu tiên này chúng ta tạo một **Function** `createCounter` trong **Global Execution Context**.
2. Dòng **9** chúng ta khai báo một **variable** có tên là `increment`.
3. Dòng **9** tiếp tục chúng ta gán kết quả **return** của **Function** `createCounter` cho **variable** này.
4. Dòng **1** đến dòng **8** gọi đến **Function** `createCounter`, đồng thời **Function** này sẽ thực thi và tất nhiên **Function Execution Context** sẽ được khởi tạo.
5. Dòng **2** trong **Function Execution Context** của `createCounter` tạo một **variable** có tên là `counter` và gán **value** là `0`.
6. Dòng **3** khai báo một **variable** có tên là `myFunction` và **value** của nó là **definition** một **Function**, và `myFunction` được dùng trong **Function Execution Context**
7. Dòng **7** này **return** về **value** của `myFunction`, đồng thời `counter` và `myFunction` sẽ không còn tồn tại, chương trình sẽ **return value** cho **Calling Context**.
8. Dòng **9** cũng từ **Calling Context** này, chính là **Global Execution Context, **value return** của **function** `createCounter` đã được gán vào increment, **variable** `increment` giờ là một **Function Definition**, **Function Definition** có **value** là **value** được trả về từ **Function** `createCounter`, không còn **Function** nào giờ có tên là `myFunction` nữa, nhưng **definition** nó vẫn còn, bên trong **Global Execution Context** nó được gọi là `increment`.
9. Dòng **10**, Khai báo một **variable** có tên là `c1`.
10. Dòng **10**, tìm kiếm một **variable** có tên là `increment`, nó là một **Function**, gọi nó. Nó là một **Function** đã được **return** trước đó, **Function** đó được định nghĩa từ dòng **4** đến dòng **5**.
11. Dòng **4**, `counter = counter + 1`, nó sẽ tìm **variable** ở **Function Execution Context** `myFunction` không có, **Lexical Scope** nó sẽ tìm tiếp **Function Execution Context** `myFunction`, không có nó lại tiếp tục tìm ở **Global Execution Context**, không có **variable** nào có tên là `counter` nên **JavaScript** sẽ có phép toán sau đây `counter = undefined + 1`, khai báo một **variable** mới và gán **value** là `1`, `undefined` được xem là `0`.
12. Dòng **5** chúng ta **return** về **value** của `counter`, chúng ta đồng thời sẽ hủy **Function Execution Context** `myFunction` này luôn, bao gồm cả `counter`.
13. Về lại dòng **10**. Trả**value** `1` và gán cho **variable** `c1`.
14. Dòng **11** này `c2` cũng lặp lại như `c1` vậy, **value** nó là `1`.
15. Dòng **12** này `c3` cũng lặp lại như `c1` vậy, **value** nó là `1`.
16. Dòng **13**, chúng ta **log** **value** của `c1, c2, c3` ra.
 
 Mình cũng khá bất ngờ là kết quả nó không giống như mình nghĩ vậy, thay vào đó kết quả lần lượt là `1`,`2`,`3`, bằng cách nào đó `increment` nhớ được **value** của **variable** `counter`.
 
 **variable** `counter` có phải **Global Execution Context** nên không bị xóa,  Thử `console.log(counter)` xem sao và bạn sẽ nhận được là `undefined`. Vậy thì không phải rồi.
 
 Vậy là nó sẽ có một cơ chế nào đó, Đó là **Closure**, đây là cách nó hoạt động, khi bạn khai báo một **Function** và gán cho nó vào một **variable**, bạn sẽ lưu nó là một **Fuction Definition**, cái này chính là **Clourse**.
>  **Closure chứa tất cả các biến mà trong phạm vi (scope) tại thời điểm tạo function đó.**
 
 Vì vậy cách giải thích ở trên sai hoàn toàn, hãy thử lại, nhưng lần này thì đúng.

 ```
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

1. Dòng đầu tiên này chúng ta tạo một **Function** `createCounter` trong **Global Execution Context**.
2. Dòng **9** chúng ta khai báo một **variable** có tên là `increment`.
3. Dòng **9** tiếp tục chúng ta gán kết quả **return** của **Function** `createCounter` cho **variable** này.
4. Dòng **1** đến dòng **8** gọi đến **Function** `createCounter`, đồng thời **Function** này sẽ thực thi và tất nhiên **Function Execution Context** sẽ được khởi tạo.
5. Dòng **2** trong **Function Execution Context** của `createCounter` tạo một **variable** có tên là `counter` và gán **value** là `0`.
6. Dòng **3** và **6** khai báo một **variable** có tên là `myFunction`, nó được khai báo trong **Function Execution Context**, **value** của `myFunction` là một **definition function** khác, đã **defined** từ dòng **4** đến dòng **5**, bây giờ chúng ta cũng tạo một **Clourse** và bao gồm nó như một thành phần của **Function Definition**, **Clourse**  chứa tất cả các **variable** trong **scope**, trong trường hợp này **variable** có **value** là `0`.
7. Dòng **7**, **return** **value** của **variable** `myFunction, **Function Execution Context** bị xóa, `myFunction ` và `counter` không còn tồn tại, chương trình sẽ trả về **value** cho **Calling Context**, Vậy chúng đang **return** về **definition function** và **Clourse** của nó.
8. Dòng **9** **Calling Context** này chính là **Global Execution Context**, **value return** của `createCounter` được gán cho `increment`, **variable** `increment` bây giờ chứa một **definition function** ( và **Clourse**), cái **function definition** được tạo ra bởi `createCounter`,  không còn tồn tại **Function** nào tên là `myFunction` nữa,  nhưng **definition** thì giống nhau. Trong **Global Execution Context**, nó được gọi là `increment`.
9. Dòng **10**, Khai báo một **variable** có tên là `c1`.
10. Dòng **10**, tìm kiếm một **variable** có tên là `increment`, nó là một **Function**, gọi nó. Nó là một **Function** đã được **return** trước đó, **Function** đó được định nghĩa từ dòng **4** đến dòng **5**.
11. Dòng **4**, `counter = counter + 1`, chúng ta tìm **variable** `counter`, Trước khi chúng ta tìm trong **Function Execution Context** và **Global Execution Context** hãy tìm trong **Clourse**, chúng ta có **Clourse** chứa **variable** có tên là `counter`, nó có **value** là `0`, sau đó thực hiện phép tính và kết quả là `1`, sau đó nó lại được lưu trong **Clourse**,  **Clourse** lại chứa **variable** có **value** là `1`.
12. Dòng **5** chúng ta **return** về **value** của `counter`, chúng ta đồng thời sẽ hủy **Function Execution Context** `myFunction` này luôn, bao gồm cả `counter`.
13. Về lại dòng **10**. Trả**value** `1` và gán cho **variable** `c1`.
15. Dòng **11** chúng ta lặp lại như bước **11**, trong lúc tìm trong **Clourse** thì sẽ thấy  **variable** `counter`  có **value** là `1`, giá trị nó sẽ tăng thêm một đơn vị là `2` và được lưu lại vào **Clourse** của **Function** `increment` và **variable** `c2` này sẽ có **value** là 2.
15. Dòng **12** này `c3` cũng lặp lại như `c1` vậy, **value** nó là `3`.
16. Dòng **13**, chúng ta **log** **value** của `c1, c2, c3` ra.

Khi một **Function** được khai báo thì sẽ bao gồm cả **Clourse** và **Function Definition** của nó.
> **Closure là một tập tất cả các variable trong Scope tại thời điểm tạo ra Function**

Bạn có thể hỏi, có phải bất kỳ **Function** nào cũng có **Clourse**, kể cả những **Function** trong **Global Scope** ? câu trả lời có **Yes**. Các **Function** được tạo trong **Global Scope** cũng tạo ra một **Clourse**. Nhưng lúc những **Function** này được tạo trong **Global Scope**, thì nó có thể **access** đến tất cả các **variable** trong **Global Scope**. Và khái niệm **Closure** thật sự không còn liên quan nữa.

Khi **value return** của một **Function** là một **Function**, thì lúc đó chúng ta sẽ nhìn thấy khái niệm **Closure** rõ nhất. **Function** mà nó trả về có thể **access** đến những **variable** mà không có trong **Global Scope**, nhưng lại có ở trong **Closure** của **Function** đó.

# Kết bài #
Vậy là mình và các bạn đã tìm hiểu về **Clourse**, nếu có đóng góp hoặc góp ý gì xin bình luận phía dưới, mình xin **cảm ơn**.

## Nguồn dịch ##
https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8