**Quan niệm sai lầm về vấn đề setImmediate, nextTick và setTimeo trong nodejs**

Trước khi đi vào tìm hiểu, chúng ta sẽ cùng nhìn lại một số quan niệm sai lầm hoặc chưa rõ ràng về những hàm này. Nếu bạn cảm thấy đã chắc chắn thì có thể bỏ qua phần này
### 1. setImmediate chạy trước setTimeout (\*ex1)
Đây là một trong những quan niệm sai lầm phổ biến, chúng ta sẽ cùng thảo luận về quan niệm đúng trong phần sau của bài viết này, trước hết hãy thử xem quan niệm này sai ở điểm nào
```
// file: wrong-timeout-immediate.js
setTimeout(function(){
    console.log("Timeout");
});
setImmediate(function(){
    console.log("Immediate");
});
```
Nếu quan niệm trên là đúng thì khi chạy chúng ta sẽ thấy tại console sẽ luôn hiển thị "Immediate" trước khi "Timeout" được hiển thị. Tuy nhiên trong thực tế thì khi chạy file trên, chúng ta sẽ không dự đoán trước được kết quả hiển thị. Nếu bạn chạy `node wrong-timeout-immediate.js` bạn sẽ thấy ngay được rằng không phải lúc nào "Immediate" cũng được hiển thị trước "Timeout"
![](https://images.viblo.asia/ef770a57-5b71-45af-9833-85fd9966c0f9.png)

### setImmediate() đẩy hàm callback lên đầu của job queue
```
//file: wrong-immediate-callback.js
setTimeout(function() {
    console.log("TIMEOUT 1");
    setImmediate(function() {
        console.log("SETIMMEDIATE 1");
    });
}, 0);
setTimeout(function() {
    console.log("TIMEOUT 2");
    setImmediate(function() {
        console.log("SETIMMEDIATE 2");
    });
}, 0);
setTimeout(function() {
    console.log("TIMEOUT 3");
}, 0);
```
Nếu quan niệm này là đúng, khi chạy `node immediate-callback.js` ta sẽ thu về được kết quả là
```
TIMEOUT 1
SETIMMEDIATE 1
TIMEOUT 2
SETIMMEDIATE 2
TIMEOUT 3
```
Tuy nhiên, kết quả nhận được lại là
```
TIMEOUT 1
TIMEOUT 2
TIMEOUT 3
SETIMMEDIATE 1
SETIMMEDIATE 2
```
### nextTick() thực hiện lời gọi hàm callback tại lượt tiếp theo (vòng lặp)
Thực ra thì cả `process.nextTick()` và `setImmediate()` đều được đặt tên không sát với ý nghĩa của chúng. Nếu chúng ta tráo đổi tên của hai hàm này thì chúng sẽ sát nghĩa với chức năng của mỗi hàm hơn.
Xét về mặt tính năng thì `process.nextTick()` thực ra là cách để thực hiện lời gọi hàm callback ngay lập tức. Hàm callback trong `setImmediate()` sẽ được thực thi trong vòng lặp tiếp theo
### Cách thức hoạt động của node.js event loop
Cách duy nhất để có thể hiểu về luồng làm việc và sự khác biệt của 3 hàm này đó là phải hiểu được về `event loop`. Dưới đây là một mô tả ngắn về event loop
![](https://images.viblo.asia/f1ffdae0-c82b-4cd0-8f8c-94fd2bb1defe.png)

Trong hình ảnh trên, mỗi hình chữ nhật đại diện cho một giai đoạn và `event loop` duyệt qua lặp lại từng giai đoạn một. Khởi đầu là từ Timers và kết thúc lại Close Callbacks. Ngoài ra thì cũng có thêm một thứ gọi là `nextTickQueue` nằm ở giữa, tuy nhiên bản thân nó lại không phải là thành phần của event loop. Mỗi giai đoạn bên trên đều được đính kèm theo một queue (hàng đợi). Khi event loop chạy vào một giai đoạn cụ thể, nó sẽ target vào việc thực thi những callbacks/tasks trong queue của giai đoạn đó.

Mô tả ngắn gọn về các giai đoạn trong event loop

**Tỉmer:**  xử lý những callbacks được gán vào bởi setTimeout và setInterval sau khi hết ngưỡng thời gian chờ

**I/O callbacks:** xử lý tất cả callbacks, ngoại trừ những callbacks được thiết lập bởi setTimeout, setInterval và setImmediate. Tại đây cũng không tồn tại Close callbacks

**Idle, prepare:** Được dùng bên trong nội bộ của event loop

**Poll:** Tìm kiếm và lấy ra những sự kiện I/O mới (ltg: điều này khiến Node trở thành một thanh niên cực ngầu :D)

**Check:** Tại đây, những callbacks của setImmediate() được xử lý

**Close callbacks:** Xử lý những callbacks ngắt kết nối (ví dụ: socket connection close)

**nextTickQueue:** Giữ các callbacks của process.nextTick(); tuy nhiên nó không phải là một phần của event loop

### Cơ chế xử lý các queue trong event loop
Trước tiên, event loop chạy vào Timer và kiểm tra nếu có callbacks tại Timer Queue. Nếu có callbacks, nó bắt đầu thực thi từng cái một cho đến khi hết callbacks hoặc đạt đến ngưỡng tối đa cho phép.
Sau giai đoạn Timer, nó chuyển đén giai đoạn `I/O callback`. Tương tự như với giai đoạn trước, nó tìm kiếm và thực thi các callback được đính kèm cho các tiến trình I/O
Giai đoạn `Idle` được sử dụng nội bộ bởi Node, nhằm mục đích chuẩn bị trước. Sau đó, event loop chuyển qua giai đoạn `Poll`, nơi mà nó xử lý các events. Nếu không có events nào cần được xử lý thì event loop sẽ chờ tại đây một chút để xem có I/O events mới nào không. Tại thời điểm mà giai đoạn `Poll` đang bị chờ hoặc đang trong `sleep mode` thì event loop sẽ tạm dừng và không có giai đoạn nào tiếp tục được thực thi cả. Tuy nhiên, nếu có một số scripts được đính kèm bởi `setImmediate` thì event loop sẽ không chờ đợi tại Poll nữa mà chuyển qua giai đoạn `Check` để thực thi những scripts đã được lên lịch
Sau giai đoạn `Check`, event loop sẽ thực thi các callbacks có trong `Close callbacks`. Cuối cùng thì event loop quay trở lại với `Timer` cho vòng lặp hoặc `tick` tiếp theo.

Về `nextTickQueue`, bất kỳ callbacks nào được gán bởi `proccess.nextTick()` sẽ được lập lịch tại `nextTickQueue` và event loop thực thi chúng lần lượt từng cái một cho đến khi không còn cái nào (những tiến trình này được thực hiện ngay sau khi kết thúc những tiến trình đang diễn ra và không hề phân biệt giai đoạn hiện tại là gì)

Tiếp tho chúng ta sẽ đi vào tìm hiểu về 3 api khá thú vị này (setImmediate, setTimeout, process.nextTick())

## setImmediate()
Đầu tiên, theo như workflow của event loop, chúng ta có thể nói răng `setImmediate()` không chính xác được thực hiện ngay lập tức, tuy nhiên hàng đợi (queue) chứa callbacks của setImmediate() sẽ được thực thi một lần trong mỗi vòng lặp (khi mà event loop đang ở trong giai đoạn `Check`)
Do đó, với ví dụ bên trên  (\*ex1), kết quả in ra là không đoán trước được. Nguyên nhân là bởi nó phụ thuộc vào hiệu suất của tiến trình. Bởi vì Timer có thêm một công việc đó là `sorting` (sắp xếp), nó sẽ làm cho event loop mất thêm một chút thời gian (to register). Tuy nhiên, nếu chúng ta di chuyển một phần của code vào trong một `I/O` callback, chúng ta có thể đảm bảo được rằng callback của `setImmediate` sẽ được gọi trước của setTimeout mà không phụ thuộc vào bất kỳ điều gì khác cả
```
var fs = require('fs');
fs.readFile("test-file.txt", function() {
    setTimeout(function(){
        console.log("SETTIMEOUT");
    });
    setImmediate(function(){
        console.log("SETIMMEDIATE");
    });
});
```
kết quả là
```
SETIMMEDIATE
SETTIMEOUT
```
## setTimeout(fn, 0)
setTimeout cung gọi thực thi callback, nhưng nó sẽ không được thực thi cho đến khi event loop đến giai đoạn `Timer`. Do đó bất kỳ một lời gọi setTimeout(fn, 0) nào được đặt cùng với setImmediate() tại giai đoạn `Close callback` sẽ cho ta kết quả là setImmediate được thực hiện trước. Từ đó chúng ta thấy rằng chỉ cần nhớ được diagram về workflow của event loop thì chúng ta có hteer dễ dàng giải thích và so sánh được giữa setTimeout(fn, 0) và setImmediate
## process.nextTick()
Chiếu theo Node.js document thì: "`nextTickQueue` sẽ được xử lý sau khi tiến trình hiện tại được hoàn thành tại bất kỳ giai đoạn nào của event loop"
Điều đó có nghĩa rằng, hàng đợi này sẽ được thực thi bất kỳ khi nào ranh giới giữa JavaScript và C/C++ bị vượt qua. Do đó nó cũng không hẳn là chỉ được gọi sau khi task trong giai đoạn hiện tại được hoàn thành; nó cũng không có nghĩa là nextTick sẽ được thực thi sau khi callback hiện tại được hoàn thành. nextTick đôi khi còn được thực thi trước khi event loop chuyển sang một giai đoạn mới

Tham khảo:

https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/

http://voidcanvas.com/nodejs-event-loop/

http://voidcanvas.com/setimmediate-vs-nexttick-vs-settimeout/