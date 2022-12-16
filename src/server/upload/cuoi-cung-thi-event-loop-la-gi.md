## Đặt vấn đề

Vài tháng trước, mình có một buổi presentation về `Javascript core` nên cũng có tìm hiểu qua về một số khái niệm cơ bản và hay ho như nhân `V8 (Google)`, `Event-Driven`, `Non-blocking I/O`, `Event Loop`… những khái niệm giúp JS tận dụng sức mạnh của phần cứng.

Một trong khái niệm mình cảm thấy khá trừu tượng trong `Javascript` là `Event loop`. Thật sự cảm thấy "khoai mì" để có thể hiểu chính xác `Event loop` trong Javascript làm gì?
Rốt cục tất cả những thứ trên là cái gì? Hoạt động thế nào? và Tại sao nó mang lại lợi ích? 


![](https://images.viblo.asia/b460e300-064f-4aa8-b0a1-f51a7505022a.gif)

Bài viết này sẽ xoay quanh các vấn đề về `Event loop` trong Javascript, hy vọng có thể làm sáng tỏ cũng như giúp các bạn cảm thấy nó không còn phức tạp nữa.


## Một số khái niệm cơ bản
*Tất cả các ngôn ngữ lập trình đều được sinh ra để làm thứ ngôn ngữ giao tiếp giữa người và máy. Dù là ngôn ngữ gì đi chăng nữa thì cuối cùng vẫn phải dịch ra mã máy, được load lên memory, chạy từng dòng lệnh, ghi các dữ liệu tạm thời ra bộ nhớ, ổ đĩa rồi giao tiếp các thiết bị ngoại vi… Thế nên để cho tiện thì trước tiên, chúng ta cùng tìm hiểu một số khái niệm cơ bản nhé*  😛😛

### Stack

> `Stack` là một vùng nhớ đặc biệt trên con chip máy tính phục vụ cho quá trình thực thi các dòng lệnh.

Dòng lệnh cụ thể ở đây là các hàm. Hàm chẳng qua là một nhóm các lệnh. Một chương trình thì gồm một nhóm các hàm phối hợp với nhau. Mỗi khi một hàm được gọi thì nó sẽ được đẩy vào một **hàng đợi** đặc biệt có tên là `stack`. `Stack` là một hàng đợi kiểu `LIFO` (Last In First Out), nghĩa là vào đầu tiên thì ra sau cùng.

**Một hàm chỉ được lấy ra khỏi `stack` khi nó hoàn thành và `return`.**

![](https://images.viblo.asia/a88cbc1e-fce1-4de4-85be-39bedd6410af.png)

Một ví dụ cụ thể, xét trong một hàm `Foo()` có gọi một hàm khác ( hàm `Bar()`) thì trạng thái hiện tại của hàm `Foo()` được cất giữ trong `stack` và hàm `Bar()` sẽ được chèn vào `stack`. Vì đây là hàng đợi `LIFO` nên `Bar()` sẽ được xử lý trước `Foo()`. Khi `Bar()` xong và `return` thì mới đến lượt `Foo()` được xử lý. Khi `Foo` được xử lý xong và `return` thì `Stack` rỗng và sẽ đợi các hàm tiếp theo được đẩy vào.

### Heap
> Heap là vùng nhớ được dùng để chứa kết quả tạm phục vụ cho việc thực thi các hàm trong stack.
> 
<br/>
Heap càng lớn thì khả năng tính toán càng cao. Heap có thể được cấp phát tĩnh hoặc cấp phát động.

## Event loop
### Overview

*Trước giờ vẫn nghe nói `NodeJs` có thể xử lý cả hàng ngàn request cùng một lúc mặc dù nó là kiểu `single-thread`. Nếu như ở `PHP` hay `Java` thì với mỗi một request sẽ sinh ra một thread để xử lý request đó (`multi-thread`), các thread hoạt động độc lập, được cấp bộ nhớ, giao tiếp ngoại vi và trả về kết quả. 
Vậy làm thế nào để `NodeJs` có thể xử lý cả ngàn request một lúc với chỉ một thread duy nhất?*

Trên web browser thì trong khi fetch data từ các url thì người dùng vẫn có thể thực hiện các thao tác khác như click button và gõ vào các ô textbox. Lý do chúng ta có thể chạy song song được là trình duyệt không đơn giản chỉ là `Runtime`. `Javascript Runtime` chỉ làm mỗi lúc một việc nhưng trình duyệt cho chúng ta nhiều thứ khác. Tất cả là nhờ có các `Web APIs` làm việc hiệu quả với các threads và cơ chế hoạt động của `Event loop`. 

> Event loop là cơ chế giúp Javascript có thể thực hiện nhiều thao tác cùng một lúc (concurrency)

<br/>

Tuy `Js Runtime` chỉ có một thread duy nhất nhưng các `Web APIs` giúp nó giao tiếp với thế giới multi-thread bên ngoài, tận dụng các con chip đa nhân vốn rất phổ biến hiện nay.
<br/>
`Web APIs` giúp đẩy các job ra bên ngoài và chỉ tạo ra các sự kiện kèm theo các `handler` gắn với các sự kiện. Kể cả đối với NodeJs khi không có `Web APIs` thì nó vẫn có các cơ chế tương đương khác giúp đẩy job ra bên ngoài và chỉ quản lý các đầu việc.
<br/>
> Cơ chế quản lý theo đầu việc là bí kíp giúp JS Runtime có thể xử lý hàng ngàn tác vụ cùng một lúc
> 
<br/>

*Hãy thử tưởng tượng rằng bạn đang ở một trang web và bấm vào một nút trên trang web, sau đó trang web bị treo. Bạn sẽ thử bấm vào các nút khác nhưng không được, các nút khác không hoạt động. Nguyên nhân của việc này (giả sử không có lỗi) là do các nút bấm sau đó kích hoạt các đoạn Javascript nhưng đã bị `block`.*

Vậy `Javascript` xử lý một dòng lệnh tại cùng một thời điểm như thế nào?  Và điều gì tạo nên tính chất **`Non-blocking`**? Mình cùng tìm hiểu thêm nào 😛😛

### Event loop hoạt động như thế nào?

Đúng như cái tên thôi, `Event loop` có một vòng lặp vô tận trong `Javascript Runtime` *(V8 trong Google Chrome)* dùng để lắng nghe các `Event`.

![](https://images.viblo.asia/2b46af9a-6e8f-4e5f-a88c-4aa0c25e4e95.png)

Nhiệm vụ của `Event loop` rất đơn giản đó là đọc `Stack` và `Event Queue`. Nếu nhận thấy `Stack` rỗng nó sẽ nhặt *Event đầu tiên* trong `Event Queue` và `Handler` (`callback` hoặc `listener`) gắn với `event` đó và đẩy vào `Stack`.



> Đặc điểm của việc thực thi hàm trong JS là sẽ chỉ dừng lại khi hàm `return` hoặc `throw exception`. 
> 

Điều này có nghĩa là trong khi hàm đang chạy thì sẽ không có một hàm khác được chạy, dữ liệu tạm của hàm cũng sẽ không bị thay đổi bởi một hàm khác hay cũng không bị dừng lại cho đến khi hoàn thành *(ngoại trừ `yield` trong `ES6`)*.

Ngoài  `stack`  ra, `JS Runtime` còn thao tác với một `callback queue` hay `event queue`. `Event queue` này khác với `stack` ở chỗ nó là `queue` kiểu `FIFO` *(First In First Out)*.

Mỗi khi có một `Event` được tạo ra, ví dụ user click vào một Button thì một Event sẽ được đẩy vào `Event queue` cùng với một `handler` (`event listener`) gắn với nó. *Nếu một Event không có listener thì nó sẽ bị mất và không được đẩy vào `Event queue`.*

Để cho dễ hình dung cách thức hoạt động của Event Loop ta lấy một ví dụ như sau:
```javascript
const fs = require('fs');

function someAsyncOperation(callback) {
  const startCallback = Date.now();
  // giả sử đọc file hết 98ms
  fs.readFile('/path/to/file', callback);
}

const timeoutScheduled = Date.now();

setTimeout(function logInfo() => {
  const delay = Date.now() - timeoutScheduled;
  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);


// đọc file xong sẽ tiếp tục chờ thêm 10ms
someAsyncOperation(function readFileAsync() => {
  // chờ 10ms
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});
```
Flow của đoạn script này sẽ như sau:

* Đầu tiên phần khai báo biến và hàm sẽ được chạy nhưng không được đẩy vào `stack` *(vì hàm chưa được gọi mà^^)*.

* Tiếp đó,  `setTimeout()` sẽ được đẩy vào `stack` và thực hiện.
<br/>Hàm này không có trong `Javascript Runtime V8` đâu nhé, nó được cung cấp bởi `Browser`, hỗ trợ `Javascript Runtime`. <br/>
    * Lúc này, nó sẽ khởi tạo một bộ đếm `Timer()`  có trong `web APIs` *(nghĩa là khi `setTimeout()` được gọi, bản thân nó đã chạy xong luôn rồi và sẽ được lấy ra khỏi `stack`).* <br/>
Bây giờ, tới `Timer()`, trong 100s tới, nó không thể "chọt chẹt" vào đoạn script, cũng ko thể "chọt chẹt" vào `Stack`. Kể cả setTimeout(cb, 0). Bởi vì nếu nó làm vậy thì `stack` sẽ loạn lên mất. Đó là lý do có `Task queue` (`Callback queue`).<br/>
![](https://images.viblo.asia/9b38c9da-a7e8-4429-bd35-eb0301a8220a.PNG)<br/>
    * **Bất kì `web APIs` nào cũng sẽ đưa `callback` vào `Task queue` khi nó hoàn thành. Đó chính là `Event loop` đã định nghĩa ở trên.**
> Công việc của `Event loop` là theo dõi `stack` và ngó qua `Task queue`, nếu `stack` trống thì lấy `callback` trong `task queue` đẩy vào `stack`
> 


* Sau đúng 100ms thì nó sẽ đẩy `logInfo()`  (là một `callback` hoặc có thể gọi là một `event listener` cũng được) vào `Event Queue`.


* Kế đến sẽ chạy hàm `someAsyncOperation()` và đẩy vào `stack`, vì hàm này `async` và có callback `readFileAsync()` nên `readFileAsync()` được đẩy luôn vào `Event Queue` mà không phải chờ như `setTimeout` để hứng sự kiện đọc xong file (sau 98ms).
* Để ý là `Stack LIFO` nên `someAsyncOperation()` sẽ nằm dưới cùng còn `Event Queue FIFO` nên readFileAsync sẽ nằm trên cùng.
* Sau khi `readFileAsync()` được đẩy vào `Event Queue` thì `someAsyncOperation()` `return` và được lấy ra khỏi `Stack`. Lúc này `Stack` không có gì nên `Event Queue` sẽ được đọc, nên nhớ là **Event Queue chỉ được đọc khi Stack trống rỗng**. `readFileAsync()` sẽ được đẩy vào `Event Queue` trước vì nó chỉ mất có 98ms trong khi `logInfo()` thì phải chờ 100ms. `readFileAsync()` này sẽ được lấy khỏi `Event Queue` và đẩy vào `stack` để chạy.
* `readFileAsync()` sẽ gặp vòng `while` và dừng ở đó 10ms. Vậy tổng cộng hàm đọc file sẽ mất 105ms để hoàn thành. Nhưng ở giây thứ 100 thì `logInfo()` được đẩy vào `Event Queue` (lúc này đã rỗng) trong khi `readFileAsync` thì còn phải mất thêm 8ms nữa mới hoàn thành. Vì cơ chế của Javascript là chạy đến khi hoàn thành mới thôi nên `logInfo()` không có cách nào để dừng `readFileAsync()` lại để chiếm quyền điều khiển, trừ khi trong `readFileAsync()` có lệnh `yield`. Sau 108ms thì `readFileAsync()` return và được lấy ra khỏi `Stack`.
* Một lần nữa `Stack` lại trống và `logInfo()` được đẩy vào `Stack`. Như vậy `logInfo()` sẽ phải đợi tổng cộng 108ms để được chạy, chứ không phải 100ms như dự tính.
<br/><br/>
Do đó, **tham số thứ 2 của setTimeout là thời gian tối thiểu để một Event được đẩy vào Stack và chạy chứ không phải là thời gian chính xác nó sẽ được chạy**.

Phía trên mình có đề cập tới `yield()`:

Giả sử bạn có một đoạn code jQuery như sau :
```javascript
$('#button_1').click(function yield() {
  console.log('Ouch!');
});
```
Event sẽ được đẩy vào `Event Queue` khi `Bar()` và `Foo()` return và được lấy ra khỏi `Stack` thì `yield` sẽ được đẩy vào `Stack` với tham số là `DOM Element` xảy ra sự kiện click.

Cơ chế **run-to-completion** của `Javascript` có một điểm bất lợi đó là nếu một hàm chạy quá lâu hoặc bị vòng lặp vô tận thì sẽ không có hàm nào được chạy nữa, kết quả là Browser sẽ bị đơ, không phản ứng với các sự kiện như click chuột … Ví dụ :
```js
function foo() {
   console.log('i am foo!');
   foo();
}

foo();
```
Hàm đệ quy không điểm dừng `Foo()` sẽ liên tục đẩy `foo` vào `stack` cho đến khi đầy, và bạn đoán xem lúc này chúng ta sẽ có cái vấn đề mà hàng ngày các đều được tìm kiếm *Stack Overflow* 😄😄

Để tránh tình trạng `Browser` bị treo vì lỗi lập trình thì các `Browser` sẽ `throw exception` trong trường hợp này :
```
MAXIMUM CALL STACK SIZE EXCEEDED.
```

###### **Fun fact**
*Hầu hết các thao tác trong `Javascript` đều là bất đồng bộ nhưng có một số ngoại lệ thú vị như hàm `alert` (hàm này là của `Browser API`, không có trong `NodeJs`). Khi hàm này được chạy thì bạn không thể thực hiện một thao tác nào khác ngoài click OK.*

## Kết
Trên đây là những keynote mình cảm thấy tâm đắc khi tìm hiểu về `Event loop` . Mong rằng bài viết này có thể mang lại giá trị cho các bạn.

![](https://images.viblo.asia/5e37f7d2-e23c-4f97-be59-64cf13a01626.gif)

Từ giờ khi nghe đồng nghiệp hay nói những câu như *"đừng chặn event loop", "đảm bảo code phải chạy mượt 60fps nhé", "dĩ nhiên là nó sẽ không chạy, là một hàm callback bất đồng bộ"*... thì sẽ không phải hoang mang nữa nhé 😄😄😄


Cảm ơn các bạn đã đọc bài chia sẻ của mình.
Tặng mình 1 upvote để có thêm động lực cho những bài viết sắp tới nha 😛😛

Happy coding !

<br/><br/>
*Reference: [Medium](https://medium.com/@giangcoffee/event-loop-l%C3%A0-g%C3%AC-v%C3%A0-ho%E1%BA%A1t-%C4%91%E1%BB%99ng-th%E1%BA%BF-n%C3%A0o-d52caa908090), [JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)*