![image.png](https://images.viblo.asia/bc6f653f-7548-44fa-9a58-a8890ef0e286.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Như tiêu đề đã nêu, **Javascript Closures** luôn là một bí ẩn đối với mình. Cho dù đã [đọc](https://medium.freecodecamp.org/lets-learn-javascript-closures-66feb44f6a44) [nhiều](https://medium.freecodecamp.org/whats-a-javascript-closure-in-plain-english-please-6a1fc1d2ff1c) [bài viết](https://en.wikipedia.org/wiki/Closure_(computer_programming)), và mình cũng đã sử dụng **closures** trong công việc, thậm chí đôi khi mình sử dụng **closures** mà không nhận ra mình đang sử dụng **closures**. 

Bài viết có thể khá dài dòng và đi qua nhiều ví dụ có vẻ là đơn giản (Step By Step). Tuy nhiên nếu bạn là một Beginner thì hãy cố gắng đi từ từ để hiểu rõ bản chất **closures**.

Trước khi chúng ta bắt đầu
--------------------------

Một số khái niệm quan trọng cần tìm hiểu trước khi mọi người muốn tìm hiểu về Closures. Một trong số đó là _**execution contexts**_ (**Execution contexts**).

[Bài viết này](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/) có một đoạn mồi rất hay về **Execution contexts**. Đại khái ý nghĩa nó như sau:

> Khi code được chạy trong **JavaScript**, môi trường mà nó được thực thi là rất quan trọng và được evaluated qua những điều sau:
> 
> **Global code** - Môi trường mặc định nơi code của bạn được thực thi lần đầu tiên.
> 
> **Function code** - Bất cứ khi nào luồng thực thi đi vào thân hàm.
> 
> (…)
> 
> (…), Hãy nghĩ về thuật ngữ **execution context** là môi trường hoặc phạm vi mà code hiện tại đang được evaluated.

Nói cách khác, khi chúng ta bắt đầu chương trình, chúng ta bắt đầu trong **global execution contexts** (Global execution contexts). Một số biến được khai báo trong **global execution contexts**. Chúng ta gọi đây là các biến toàn cục. Khi chương trình gọi một hàm, điều gì sẽ xảy ra?

1.  JavaScript tạo một **execution contexts** mới là **local execution contexts**
2.  **Local execution contexts** đó sẽ có tập hợp các biến riêng, các biến này sẽ là cục bộ của riêng **execution contexts** đó.
3.  **Execution contexts** mới được ném vào _**Exction Stack** (ngăn xếp chở được thực thi)_. _**Exction Stack**_ như một cơ chế để theo dõi vị trí của chương trình trong quá trình thực thi

Khi nào thì hàm kết thúc? Khi nó gặp một câu lệnh **return** hoặc nó gặp một dấu ngoặc nhọn `}`. Khi một hàm kết thúc, điều sau sẽ xảy ra:

1.  Các **local execution contexts** bật ra khỏi _**Exction Stack**_
2.  Các hàm gửi value trả lại **contexts calling**. **Contexts** **calling** là **execution contexts** đã gọi hàm này, nó có thể là **global execution contexts** hoặc một **local execution contexts** khác. Tùy thuộc vào **execution contexts** gọi để xử lý **value** trả về tại thời điểm đó. **Value** trả về có thể là một đối tượng, một array, một hàm, một boolean, bất cứ thứ gì... Nếu hàm không có câu lệnh return, undefined sẽ được trả về.
3.  **Local execution contexts** bị hủy. Cái này rất quan trọng. Bị hủy có nghĩa là tất cả các biến đã được khai báo trong **local execution contexts** sẽ bị xóa. Chúng không còn nữa. Đó là lý do tại sao chúng được gọi là biến cục bộ.

Một ví dụ rất cơ bản
--------------------

Trước khi tìm hiểu về Closures, chúng ta hãy xem đoạn code sau. Nó có vẻ rất đơn giản, bất kỳ ai đọc bài viết này có thể biết chính xác nó làm gì.

```js
1: let a = 3 
2: function addTwo (x) { 
3:   let ret = x + 2 
4:   return ret 
5: } 
6: let b = addTwo (a) 
7: console.log (b)
```

Để hiểu JavaScript thực sự hoạt động như thế nào, chúng ta hãy phân tích điều này thật chi tiết.

1.  Ở dòng 1, chúng ta khai báo một biến mới `a` trong global execution contexts và gán số cho nó `3`.
2.  Tiếp theo, các dòng từ 2 đến 5 thực sự là một. Chuyện gì xảy ra ở đây thế? Chúng ta khai báo một biến mới được đặt tên `addTwo` trong **global execution contexts**. Và chúng ta gán cho nó cái gì? Một định nghĩa hàm. Bất cứ thứ gì nằm giữa hai dấu ngoặc `{ }` đều được gán cho `addTwo`. Code bên trong hàm không được **evaluated**, không được thực thi, chỉ được lưu trữ thành một biến để sử dụng trong tương lai.
3.  Bây giờ chúng ta đang ở dòng 6. Nó trông đơn giản, nhưng có nhiều thứ để **unpack** ở đây. Đầu tiên, chúng ta khai báo một biến mới trong **global execution contexts** và gắn nhãn cho nó là `b`. Ngay sau khi một biến được khai báo, nó có value là `undefined`.
4.  Tiếp theo, vẫn ở dòng 6, chúng ta thấy một toán tử gán. Chúng ta đã sẵn sàng để gán một **value** mới cho biến `b`. Tiếp theo, chúng ta thấy một hàm đang được gọi. Khi bạn nhìn thấy một biến được theo sau bởi dấu ngoặc tròn `(…)`, đó là tín hiệu cho thấy một hàm đang được gọi. Chuyển tiếp nhanh, mọi hàm trả về một cái gì đó (hoặc một giá trị, một đối tượng hoặc `undefined`). Bất cứ thứ gì được trả về từ hàm sẽ được gán cho biến `b`.
5.  Nhưng trước tiên chúng ta cần gọi hàm có nhãn `addTwo`. JavaScript sẽ đi và tìm trong bộ _nhớ_ **execution contexts** chung của nó cho một biến có tên `addTwo`. Ồ, nó đã tìm thấy, nó đã được xác định ở bước 2 (hoặc dòng 2–5). Và biến `addTwo` chứa một định nghĩa hàm. Lưu ý rằng biến `a` được truyền dưới dạng đối số cho hàm. JavaScript tìm kiếm một biến `a` trong bộ nhớ **execution contexts** chung của nó, tìm nó, tìm value của nó _và_ chuyển số `3` làm đối số cho hàm. Sẵn sàng thực hiện chức năng.
6.  Bây giờ **execution contexts** sẽ chuyển đổi. Một local execution contexts mới được tạo, hãy đặt tên cho nó là **'execution contexts addTwo'**. **Execution contexts** được đẩy lên **Call Stack**. Điều đầu tiên chúng ta làm trong **local execution contexts** là gì?
7.  Bạn có thể giễ dàng nói rằng, “Một biến mới `ret` được khai báo trong **execution contexts** _cục bộ ”._ Đó không phải là câu trả lời. Câu trả lời chính xác là, chúng ta cần nhìn vào các tham số của hàm trước. Một biến mới `x` được khai báo trong **local execution contexts**. Và vì value `3` được truyền dưới dạng đối số nên biến x được gán là số `3`.
8.  Bước tiếp theo là: Một biến mới `ret` được khai báo trong **execution contexts** _cục bộ ._ Value của nó được đặt thành không xác định. (dòng 3)
9.  Vẫn là dòng 3, cần thực hiện thêm một bước. Đầu tiên chúng ta cần value của `x`. JavaScript sẽ tìm kiếm một biến `x`. Nó sẽ xem xét trong local execution contexts đầu tiên. Và nó đã tìm thấy một, value là `3`. Và toán hạng thứ hai là số `2`. Kết quả của phép cộng ( `5`) được gán cho biến `ret`.
10.  Dòng 4. Chúng ta trả về nội dung của biến `ret`. Một tra cứu khác trong execution contexts _cục bộ_ . `ret`chứa value `5`. Hàm trả về số `5`. Và chức năng kết thúc.
11.  Dòng 4–5. Chức năng kết thúc. **Local execution contexts** bị hủy. Các biến `x` và `ret` bị xóa sổ. Chúng không còn tồn tại nữa. **Contexts** được bật ra khỏi **Call stack** và **value** trả về được trả về cho **contexts** đã gọi. Trong trường hợp này, **contexts** đã gọi là **global execution contexts**, vì hàm `addTwo` được gọi từ **global execution contexts.**
12.  Bây giờ chúng ta tiếp tục nơi chúng ta đã dừng lại ở bước 4. Giá trị trả về (số `5`) được gán cho biến `b`. Chúng ta vẫn đang ở dòng 6 của chương trình nhỏ.
13.  Mình không đi vào chi tiết, nhưng ở dòng 7, nội dung của biến `b` được in trong bảng điều khiển. Trong ví dụ của chúng ta, number `5`.

Đó là một lời giải thích dài dòng cho một chương trình rất đơn giản, và chúng ta thậm chí còn chưa đề cập đến Closures. Chúng ta sẽ đến đó, mình hứa. Nhưng trước tiên chúng ta cần đi một hoặc hai đường vòng nữa.

Lexical scope
-------------

Chúng ta cần hiểu một số khía cạnh của **lexical scope**. Hãy xem ví dụ sau.

```js
1: let val1 = 2
2: function multiplyThis(n) {
3:   let ret = n * val1
4:   return ret
5: }
6: let multiplied = multiplyThis(6)
7: console.log('example of scope:', multiplied)
```

Ý tưởng ở đây là chúng ta có các biến trong **local execution contexts** và các biến trong **global execution contexts**. Một điều phức tạp của JavaScript là cách nó tìm kiếm các biến. Nếu nó không thể tìm thấy một biến trong **local execution contexts** của nó, nó sẽ tìm nó trong **contexts** gọi _của nó ._ Và nếu không tìm thấy ở đó trong **contexts** gọi _của nó ._ Thì nó sẽ tiếp tục lặp đi lặp lại với những context đã gọi trước đó, cho đến khi nó được tìm kiếm trong **contexts** thực thi _toàn cục_ . (Và nếu nó không tìm thấy nó ở đó, nó `undefined`). Hãy làm theo ví dụ trên, nó sẽ làm rõ điều đó. Nếu bạn hiểu phạm vi hoạt động như thế nào, bạn có thể bỏ qua phần này.

1.  Khai báo một biến mới `val1` trong **global execution contexts** và gán số cho nó `2`.
2.  Dòng 2–5. Khai báo một biến mới `multiplyThis` và gán cho nó một định nghĩa hàm.
3.  Dòng 6. Khai báo một biến mới `multiplied` trong **global execution contexts.**
4.  Lấy biến `multiplyThis` từ bộ nhớ **execution contexts** chung và thực thi nó dưới dạng một hàm. Chuyển số `6` làm đối số.
5.  Lệnh gọi hàm mới =  **execution contexts** mới. Tạo **local execution contexts** mới.
6.  Trong **local execution contexts**, khai báo một biến `n` và gán cho nó số 6.
7.  Dòng 3. Trong **local execution contexts**, hãy khai báo một biến `ret`.
8.  Dòng 3 (tiếp theo). Thực hiện một phép nhân với hai toán hạng; nội dung của các biến `n` và `val1`. Tra cứu biến `n` trong **local execution contexts**. Chúng ta đã khai báo nó ở bước 6. Nội dung của nó là số `6`. Tra cứu biến `val1` trong **local execution contexts**. **Local execution contexts** không có một biến được gắn nhãn `val1`. Hãy kiểm tra **contexts** đã gọi nó. **Contexts** gọi là **global execution contexts**. Hãy tìm kiếm `val1` trong **execution contexts** toàn cầu. Ồ vâng, nó ở đó. Nó đã được định nghĩa ở bước 1. **Value** là số `2`.
9.  Dòng 3 (tiếp theo). Nhân hai toán hạng và gán nó cho `ret`biến. 6 \* 2 = 12. `ret` là bây giờ `12`.
10.  Trả về biến **ret**. **Local execution contexts** bị hủy, cùng với các biến của nó `ret` và `n`. Biến `val1` không bị hủy vì nó là một phần của **execution contexts toàn cục.**
11.  Quay lại dòng 6. Trong **contexts đã** gọi, số `12` được gán cho biến **multiplied**.
12.  Cuối cùng trên dòng 7, chúng ta hiển thị value của biến **multiplied**  trong bảng điều khiển.

Vì vậy, trong ví dụ này, chúng ta cần nhớ rằng một hàm có quyền truy cập vào các biến được định nghĩa trong **contexts** gọi của nó. Tên chính thức của hiện tượng này là **lexical scope.**

Một hàm trả về một hàm
----------------------

Trong ví dụ đầu tiên, hàm `addTwo` trả về một số. Hãy nhớ rằng một hàm có thể trả về bất kỳ thứ gì. Hãy xem ví dụ về một hàm trả về một hàm, vì đây là điều cần thiết để hiểu về **closures**. Đây là ví dụ mà chúng ta sẽ phân tích.

```js
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

Hãy phân tích từng bước (Cố gắng lên ae 🤣 mình viết bài này mà cũng mệt hết cả người).

1.  Dòng 1. Chúng ta khai báo một biến `val` trong **global execution contexts** và gán số `7` cho biến đó.
2.  Dòng 2–8. Chúng ta khai báo một biến có tên `createAdder` trong **global execution contexts** và chúng ta gán một định nghĩa hàm cho nó. Dòng 3 đến dòng 7 mô tả định nghĩa hàm. Như trước đó, tại thời điểm này, chúng ta không nhảy vào chức năng đó. Chúng ta chỉ lưu định nghĩa hàm vào biến ( `createAdder`).
3.  Dòng 9. Chúng ta khai báo một biến mới, được đặt tên `adder`, trong **global execution contexts**. Tạm thời, `undefined` được chỉ định cho `adder`.
4.  Vẫn là dòng 9. Chúng ta thấy các dấu ngoặc `()`; chúng ta cần thực thi hoặc gọi một hàm. Hãy truy vấn bộ nhớ của **global execution contexts** và tìm kiếm một biến có tên `createAdder`. Nó đã được tạo ở bước 2. Ok, chúng ta hãy gọi nó.
5.  Gọi một hàm. Bây giờ chúng ta đang ở dòng 2. Một **local execution contexts** mới được tạo. Chúng ta có thể tạo các biến cục bộ trong **execution contexts mới**. Thêm **contexts** mới vào Call Stack. Hàm không có đối số, hãy chuyển ngay vào phần nội dung của nó.
6.  Vẫn là dòng 3–6. Chúng ta có một khai báo chức năng mới. Chúng ta tạo một biến `addNumbers` trong **local execution contexts**. Điều này quan trọng `addNumbers` chỉ tồn tại trong **local execution contexts**. Chúng ta lưu trữ một định nghĩa hàm trong biến cục bộ có tên `addNumbers`.
7.  Bây giờ chúng ta đang ở dòng 7. Chúng ta trả về nội dung của biến `addNumbers`. Công cụ tìm kiếm một biến được đặt tên `addNumbers` và tìm thấy nó. Đó là một định nghĩa hàm. Tốt thôi, một hàm có thể trả về bất cứ thứ gì, kể cả định nghĩa hàm. Vì vậy, chúng ta trả lại định nghĩa của `addNumbers`. Bất kỳ thứ gì giữa các dấu ngoặc trên dòng 4 và 5 tạo nên định nghĩa hàm. Chúng ta cũng xóa **local execution contexts** khỏi ngăn xếp cuộc gọi.
8.  Khi `return`, **local execution contexts** bị phá hủy. Biến `addNumbers` không còn nữa. Tuy nhiên, định nghĩa hàm vẫn tồn tại, nó được trả về từ hàm và nó được gán cho biến `adder`; đó là biến chúng ta đã tạo ở bước 3.
9.  Bây giờ chúng ta đang ở dòng 10. Chúng ta xác định một biến mới `sum` trong **global execution contexts.** Phân công tạm thời là `undefined`.
10.  Tiếp theo chúng ta cần thực thi một hàm. Chức năng nào? Hàm được xác định trong biến có tên `adder`. Chúng ta tìm kiếm nó trong **global execution contexts** và chắc chắn chúng ta tìm thấy nó. Đó là một hàm có hai tham số.
11.  Hãy truy xuất hai tham số, vì vậy chúng ta có thể gọi hàm và truyền các đối số chính xác. Biến đầu tiên là biến `val`, mà chúng ta đã xác định ở bước 1, nó đại diện cho số `7` và biến thứ hai là số `8`.
12.  Bây giờ chúng ta phải thực thi chức năng đó. Định nghĩa hàm là các dòng được vạch ra từ **3–5**. Một **local execution contexts** mới được tạo. Trong **contexts cục bộ**, hai biến mới được tạo: `a` và `b`. Chúng được gán các value tương ứng `7` và `8` vì đó là các đối số mà chúng ta đã truyền cho hàm trong bước trước.
13.  Dòng 4. Một biến mới được khai báo, đặt tên `ret`. Nó được khai báo trong **local execution contexts.**
14.  Dòng 4. Một phép cộng được thực hiện, trong đó chúng ta thêm nội dung của biến `a` và nội dung của biến `b`. Kết quả của phép cộng (`15`) được gán cho biến **ret**.
15.  Biến `ret` được trả về từ hàm đó. **Local execution contexts** bị hủy, nó bị xóa khỏi Call Stack, các biến `a` và b, `ret` không còn tồn tại nữa.
16.  Value trả về được gán cho `sum` biến mà chúng ta đã xác định ở bước 9.
17.  Chúng ta in ra value của `sum` bảng điều khiển.

Bảng điều khiển sẽ in **15**. Chúng ta thực sự trải qua một loạt các bước ở đây. Mình đang cố gắng minh họa một vài điểm ở đây. Đầu tiên, một định nghĩa hàm có thể được lưu trữ trong một biến, định nghĩa hàm là ẩn đối với chương trình cho đến khi nó được gọi. Thứ hai, mỗi khi một hàm được gọi, một **local execution contexts** sẽ được tạo (tạm thời). **Execution contexts** đó biến mất khi chức năng được thực hiện. Một hàm được thực hiện khi nó gặp `return` hoặc dấu ngoặc đóng `}`.

Cuối cùng, Closures
-------------------

Hãy xem đoạn code tiếp theo và cố gắng tìm hiểu điều gì sẽ xảy ra.

```js
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

Bây giờ chúng ta đã hiểu rõ về nó từ hai ví dụ trước, hãy lướt qua quá trình thực thi ví dụ này, và hiểu về **Closures**.

1.  Dòng 1–8. Chúng ta tạo một biến mới `createCounter` trong **global execution contexts** và nó nhận được định nghĩa hàm được gán.
2.  Dòng 9. Chúng ta khai báo một biến mới được đặt tên `increment` trong **global execution contexts**
3.  Dòng 9 một lần nữa. Chúng ta cần gọi hàm **createCounter** và gán **value** trả về của nó cho biến **increment**.
4.  Dòng 1–8. Gọi hàm. Tạo **local execution contexts mới.**
5.  Dòng 2. Trong **local execution contexts**, khai báo một biến mới có tên `counter`. Số `0` được gán cho `counter`.
6.  Dòng 3–6. Khai báo biến mới có tên `myFunction`. Biến được khai báo trong **local execution contexts.** Nội dung của biến là một định nghĩa hàm khác. Như đã định nghĩa ở dòng 4 và 5.
7.  Dòng 7. Trả lại nội dung của biến **myFunction**. **Local execution contexts** bị xóa. `myFunction` và `counter` không còn tồn tại. Kết quả được trả về **contexts đã gọi.**
8.  Dòng 9. Trong **contexts đã gọi**, **global execution contexts**, **value** được trả về `createCounter` được gán cho `increment`. Gia số biến hiện chứa một định nghĩa hàm. Định nghĩa hàm được trả về bởi `createCounter`. Nó không còn được dán nhãn nữa `myFunction`, nhưng nó là cùng một định nghĩa. Trong **Global contexts**, nó được gắn nhãn `increment`.
9.  Dòng 10. Khai báo một biến mới (`c1`).
10.  Dòng 10 (tiếp theo). Tra cứu biến `increment`, nó là một hàm, hãy gọi nó. Nó chứa định nghĩa hàm được trả về trước đó, như được định nghĩa trong dòng 4–5.
11.  Tạo một **execution contexts mới**. Không có tham số. Bắt đầu thực hiện chức năng.
12.  Dòng 4 `counter = counter + 1`.. Tra cứu value `counter` trong **local execution contexts**. Chúng ta chỉ tạo **contexts** đó và không bao giờ khai báo bất kỳ biến cục bộ nào. Hãy xem xét **global execution contexts**. Không có biến nào được gắn nhãn `counter` ở đây. Javascript sẽ **evaluated** điều này là `counter = undefined + 1`, khai báo một biến cục bộ mới được gắn nhãn `counter` và gán số cho nó 1.
13.  Dòng 5. Chúng ta trả lại nội dung của `counter`, hoặc số `1`. Chúng ta phá hủy **local execution contexts** và biến **counter**.
14.  Quay lại dòng 10. Value trả về (`1`) được gán cho `c1`.
15.  Dòng 11. Chúng ta lặp lại các bước 10–14, cũng `c2` được chỉ định `1`.
16.  Dòng 12. Chúng ta lặp lại các bước 10–14, cũng `c3` được chỉ định `1`.
17.  Dòng 13. Chúng ta ghi lại nội dung của các biến `c1`, `c2` và `c3`.

Hãy thử điều này cho chính mình và xem điều gì sẽ xảy ra. Bạn sẽ nhận thấy rằng nó không ghi `1`, `1` và `1` như bạn có thể mong đợi từ giải thích của mình ở trên. Thay vào đó là ghi nhật ký `1`, `2` và `3`. 

Bằng cách nào đó, hàm tăng ghi nhớ value **counter** đó. Nó hoạt động như thế nào?

`Counter` một phần của **global execution contexts**? Hãy thử `console.log(counter)` và bạn sẽ nhận được `undefined`. Vậy không phải vậy đâu.

Có thể, khi bạn gọi `increment`, bằng cách nào đó nó quay trở lại hàm nơi nó được tạo (`createCounter`)? Làm thế nào mà thậm chí sẽ hoạt động? Biến `increment` chứa định nghĩa hàm chứ không phải biến nó đến từ đâu. Vậy không phải vậy đâu.

Vì vậy phải có cơ chế khác. 

**Closures****.** Cuối cùng thì chúng ta cũng đến được với nó, mảnh ghép còn thiếu.

Đây là cách nó làm việc. Bất cứ khi nào bạn khai báo một hàm mới và gán nó cho một biến, bạn sẽ **lưu trữ định nghĩa hàm,** _**cũng như một closures**_. **Closures chứa tất cả các biến có trong phạm vi tại thời điểm tạo hàm**. Nó tương tự như một chiếc ba lô. Một định nghĩa chức năng đi kèm với một chiếc ba lô nhỏ. Và trong gói của nó, nó lưu trữ tất cả các biến có trong phạm vi tại thời điểm định nghĩa hàm được tạo.

Vì vậy, lời giải thích của chúng ta ở trên _**đều sai**_, chúng ta hãy thử lại, nhưng lần này là chính xác.

```js
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

1.  Dòng 1–8. Chúng ta tạo một biến mới `createCounter` trong **global execution contexts** và nó nhận được định nghĩa hàm được gán. Giống như trên.
2.  Dòng 9. Chúng ta khai báo một biến mới có tên `increment` trong **global execution contexts**. Giống như trên.
3.  Dòng 9 một lần nữa. Chúng ta cần gọi `createCounter` hàm và gán value trả về của nó cho biến **increment**. Giống như trên.
4.  Dòng 1–8. Gọi hàm. Tạo **local execution contexts mới**. Giống như trên.
5.  Dòng 2. Trong **local execution contexts**, khai báo một biến mới có tên `counter`. Số `0` được gán cho `counter`. Giống như trên.
6.  Dòng 3–6. Khai báo biến mới có tên `myFunction`. Biến được khai báo trong **local execution contexts**. Nội dung của biến là một định nghĩa hàm khác. Như đã định nghĩa ở dòng 4 và 5. Bây giờ chúng ta cũng tạo một **Closures** và đưa nó vào như một phần của định nghĩa hàm. **Closures chứa các biến trong phạm vi, trong trường hợp này là biến** `counter`(với value là `0`).
7.  Dòng 7. Trả lại nội dung của biến **myFunction**. **Local execution contexts** bị xóa. `myFunction` và `counter` không còn tồn tại và thực hiện return về contexts gọi. Vì vậy, chúng ta đang trả về **định nghĩa hàm** _**và Closures của nó**_, các biến nằm trong phạm vi khi nó được tạo.
8.  Dòng 9. Trong **contexts calling**, **global execution contexts**, **value** được trả về `createCounter` được gán cho `increment`. Biễn **increment** hiện chứa một **định nghĩa hàm và closures**. Định nghĩa hàm được trả về bởi `createCounter`. Nó không còn được dán nhãn **myFunction** nữa, nhưng nó là cùng một định nghĩa. Trong **global contexts**, nó được gọi là `increment`.
9.  Dòng 10. Khai báo một biến mới **(**`c1`).**
10.  Dòng 10 (tiếp theo). Tra cứu biến `increment`, nó là một hàm, hãy gọi nó. Nó chứa định nghĩa hàm được trả về trước đó, như được định nghĩa trong dòng 4–5. (và nó cũng có một ba lô với các biến)
11.  Tạo một **execution contexts mới.** Không có tham số. Bắt đầu thực hiện chức năng.
12.  Dòng 4 `counter = counter + 1`. Chúng ta cần tìm biến `counter`. Trước khi xem xét **execution contexts** **_cục bộ_ hoặc _toàn cầu_**, chúng ta hãy xem xét trong ba lô của mình. Hãy kiểm tra Closures. Lưu ý, phần Closures chứa một biến được đặt tên `counter`, value của nó là `0`. Sau biểu thức trên dòng 4, value của nó được đặt thành `1`. Và nó lại được cất vào ba lô. **Closures** bây giờ chứa biến `counter` có value là `1`.
13.  Dòng 5. Chúng ta trả lại nội dung của `counter`, hoặc số 1 và hủy **local execution contexts.**
14.  Quay lại dòng 10. **Value** trả về **(`1`)** được gán cho `c1`.**
15.  Dòng 11. Chúng ta lặp lại các bước 10–14. Lần này, khi chúng ta nhìn vào **Closures** của mình, chúng ta thấy rằng biến **counter** có value là 1. Nó được đặt ở bước 12 hoặc dòng 4 của chương trình. **Value** của nó được tăng dần và được lưu trữ. `c2` được chỉ định `2`.
16.  Dòng 12. Chúng ta lặp lại các bước 10–14, `c3` được chỉ định `3`.
17.  Dòng 13. Chúng ta ghi lại nội dung của các biến `c1`, `c2` và `c3`.**

Vì vậy, bây giờ chúng ta đã hiểu cách này hoạt động của Closures. Điều quan trọng cần nhớ là khi một hàm được khai báo, nó chứa một **định nghĩa hàm và một closures**. **_Closures là một tập hợp của tất cả các biến trong phạm vi tại thời điểm tạo hàm._**

Bạn có thể hỏi, có bất kỳ hàm nào cũng có **closures** không, thậm chí các hàm được tạo trong phạm vi toàn cục? Câu trả lời là có. Các hàm được tạo trong phạm vi toàn cục sẽ tạo ra một **closures**. Nhưng vì các hàm này được tạo trong phạm vi toàn cục, chúng có quyền truy cập vào tất cả các biến trong phạm vi toàn cục. Và khái niệm Closures không thực sự phù hợp.

**Khi một hàm trả về một hàm**, đó là khi khái niệm về các **Closures** trở nên phù hợp hơn. Hàm trả về có quyền truy cập vào các biến không nằm trong phạm vi toàn cục, nhưng chúng chỉ tồn tại trong phần **Closure** của nó.

Không phải Closure tầm thường như vậy
-------------------------------------

Đôi khi **Closures** xuất hiện khi bạn thậm chí không nhận thấy nó. Bạn có thể đã thấy một ví dụ về cái mà chúng ta gọi là **partial application**. Giống như trong đoạn code sau.

```js
let c = 4;
const addX = (x) => (n) => n + x;
const addThree = addX(3);
let d = addThree(c);
console.log("example partial application", d);
```

Trong trường hợp **arrow function** ném bạn đi, nó sẽ tương đương như vầy.

```js
let c = 4;
function addX(x) {
  return function (n) {
    return n + x;
  };
}
const addThree = addX(3);
let d = addThree(c);
console.log("example partial application", d);
```

Chúng ta khai báo một hàm `add` nhận một tham số **(`x`)** và trả về một hàm khác.

Hàm trả về cũng nhận một tham số và thêm nó vào biến `x`.**

Biến `x` là một phần của **Closures**. Khi biến `addThree` được khai báo trong **contexts cục bộ,** nó được gán một định nghĩa hàm và một **Closures**. **Closures** chứa biến `x`.**

Vì vậy, bây giờ khi hàm `addThree` được gọi và thực thi, nó có quyền truy cập vào biến `x` từ **Closures** của nó và biến `n` được truyền dưới dạng đối số và có thể trả về tổng.

Trong ví dụ này, bảng điều khiển sẽ in số `7`.

Kết luận
--------

Cách mà mình sẽ luôn ghi nhớ **Closures** là **_khi một hàm được khai báo nó chứa một định nghĩa hàm và một Closures. Closures là một tập hợp của tất cả các biến trong phạm vi tại thời điểm tạo hàm._**

Như mọi khi, mình hy vọng bạn thích bài viết này và biết thêm được điều gì đó mới. 

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy thích blog của mình thì nhấn theo dõi để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog15-javascript-closures-giai-thich.html