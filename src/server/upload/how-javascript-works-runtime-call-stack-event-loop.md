JavaScript ngày càng trở nên phổ biến, không chỉ dừng lại ở phía front-end, mà còn lấn sân sang cả back-end, hybrid apps, native app, ...

Bài viết này tập trung đào sâu vào cách JavaScript làm việc: bằng cách này tôi nghĩ chúng ta sẽ viết code tốt hơn và đẹp hơn.

### Tổng quan
Hầu hết chúng ta đều nghe về khái niệm *V8 Engine*, và hầu hết đều biết JavaScript là single-thread hoặc là nó sử dụng *callback queue*.

Trong bài viết này, tôi sẽ tìm hiểu lần lượt những khái niệm đó một cách chi tiết và giải thích cách mà JavaScript thực sự làm việc ra sao. Nếu bạn mới làm quen với JavaScript, tôi hy vọng bài viết này sẽ giúp bạn hiểu tại sao JavaScript lại khá lạ so với những ngôn ngữ khác. Còn nếu bạn là một JavaScript developer đầy kinh nghiệm, tôi vẫn mong những kiến thức ở đây có thể giúp bạn cải thiện công việc đang làm mỗi ngày.

### JavaScript engine
Một ví dụ phổ biến của JavaScript Engine là V8 engine của Google. V8 engine được sử dụng trong Chrome và Node.js. Đây là một mô tả đơn giản cho nó:

![](https://images.viblo.asia/6d2f8b38-6473-439c-af5d-e8ac0cdec9b2.png)

Engine chứa hai component chính:
* Memory Heap - đây là nơi việc cấp phát bộ nhớ xảy ra
* Call Stack - đây là nơi chứa các stack cũng như là nơi đoạn code của bạn thực thi

### Runtime
Có nhiều API trong trình duyệt mà bất kỳ JavaScript developer nào cũng đã dùng ít nhất 1 lần (chẳng hạn *setTimeout*). Những API này lại không được cung cấp bởi Engine. Vậy thì nó đến từ đâu? Thực tế  phức tạp hơn ta tưởng.

![](https://images.viblo.asia/37ef6709-14f1-42ef-933e-e4a3d95c0ec0.png)

Giờ không chỉ có mỗi Engine, ta còn có những Web API được cung cấp bởi trình duyệt, chẳng hạn như DOM, AJAX, setTimeout, vân vân và mây mây ...

Cũng từ đó, chúng ta có thêm những thứ quen thuộc như *event loop* và *callback queue*

### Call Stack
JavaScript là ngôn ngữ *single-threaded*, có nghĩa là nó chỉ có một *Call Stack*. Bởi vậy nó chỉ làm một việc mỗi lần.

*Call Stack* là một kiểu cấu trúc dữ liệu mà ghi lại nơi mà chương trình chúng ta đang chạy ở hiện tại. Nếu chúng ta nhảy vào một *function* thì nó sẽ được đẩy lên trên cùng của stack. Nếu chúng ta nhảy khỏi *function* đó thì cũng đồng thời đẩy nó ra khỏi stack. Đó là việc mà *call stack* cần làm.

Hãy xem ví dụ sau:
```JavaScript
function multiply(x, y) {
    return x * y;
}
function printSquare(x) {
    var s = multiply(x, x);
    console.log(s);
}
printSquare(5);
```

Khi engine bắt đầu thực thi đoạn code này, *Call Stack* sẽ trống. Các bước tiếp theo sẽ như sau:

![](https://images.viblo.asia/985ef361-d538-4a25-a004-4a32ba6fa8cf.png)

Mỗi đầu vào trong *Call Stack* được gọi là **Stack Frame**

Và đây chính xác là cách mà *stack trace* được xây dựng khi throw một exception. Về cơ bản thì nó là trạng thái hiện tại của *Call Stack* khi exception xảy ra. Hãy xem đoạn code dưới đây:

```javascript
function foo() {
    throw new Error('SessionStack will help you resolve crashes :)');
}
function bar() {
    foo();
}
function start() {
    bar();
}
start();
```

Nếu ta chạy đoạn code này trong Chrome thì stack trace sẽ được sinh ra như dưới đây:

![](https://images.viblo.asia/fad74b1e-d8f5-4f56-b23f-42b6f0848e8b.png)

**Blocking the stack** - điều này xảy ra khi bạn vượt quá số stack cho phép. Và điều này rất dễ xảy ra, đặc biệt nếu bạn đang dùng đệ quy mà không check code cẩn thận, như sau:

```javascript
function foo() {
    foo();
}
foo();
```

Khi engine bắt đầu thực thi đoạn code này, nó bắt đầu chạy bằng cách gọi hàm *foo*. Hàm này lại gọi đệ quy đến chính nó mà không có điều kiện nào cả. Bởi vậy, tại mỗi bước thực thi, hàm này lại được thêm vào đỉnh của *Call Stack*:

![](https://images.viblo.asia/563ef572-78b4-4247-bddd-c01452637680.png)

Ở một thời điểm nào đó thì số hàm được gọi trong *Call Stack* sẽ vượt quá kích thước cho phép, và trình duyệt sẽ throw một error, đại loại như này:

![](https://images.viblo.asia/84471e05-dbe0-41b6-a6cf-9afdd6995aba.png)

Thực thi đoạn mã trên một thread có thể rất đơn giản vì bạn không phải đối mặt với những kịch bản mà môi trường đa luồng (multi-threaded) thường gặp phải, chẳng hạn như *deadlocks*. Nhưng chạy trên một thread cũng có những giới hạn riêng của nó. Vì JavaScript chỉ có một *Call Stack*, điều gì sẽ xảy ra khi một việc nào đó xử lý mất nhiều thời gian?

### Concurrency và Event Loop
Điều gì xảy ra khi những hàm trong *Call Stack* thực thi mất nhiều thời gian. Chẳng hạn, khi bạn muốn thực thi một đoạn mã xử lý ảnh phức tạp trong trình duyệt.

Có thể bạn thắc mắc điều này thì có vấn đề gì? Vấn đề là khi trong *Call Stack* có hàm đang được thực thi, thì trình duyệt không thể làm các tác vụ khác, nó bị *block*. Nói cách khác trình duyệt không thể redner, không thể chạy đoạn code khác, và đây chính là vấn đề nếu bạn muốn có một giao diện người dùng mượt mà.

Và đó cũng không phải vấn đề duy nhất. Mỗi lần trình duyệt xử lý quá nhiều tác vụ trong *Call Stack*, nó có thể ngừng phản hồi trong một thời gian dài. Và hầu hết trình duyệt sẽ xử lý bằng cách bắn ra một lỗi, hỏi xem bạn có muốn tắt trang web đi không.

![](https://images.viblo.asia/fb58ff3b-b056-4a65-be96-cf8b132f88f8.png)

Rõ ràng thì đây không phải là một trải nghiệm hoàn hảo cho người dùng rồi, phải không nhỉ?

Vậy thì làm cách nào ta có thể thực thi những đoạn code phức tạp mà không block UI và khiến trình duyệt khó thở? Giải pháp đó chỉnh là *asynchronous callback*.

### Phân tích Event Loop
Cho đến trước khi ES6 ra đời thì JavaScript engine không làm gì khác hơn là chỉ  thực từng đoạn code tại một thời điểm. Vậy thì ai chỉ thị cho JavaScript engine thực thi những đoạn code đó. Trong thực tế JavaScript chạy trong môi trường *hosting*, tức là trình duyệt web hoặc là Node.js. Thực tế ngày nay JavaScript được nhúng vào tất cả các kiểu thiết bị, từ robot cho đến đèn ống các kiểu. Mỗi thiết bị sẽ biểu diễn một kiểu môi trường hosting riêng.

Nhưng có một *mẫu số chung* không đổi ở tất cả các môi trường, đó là một cơ chế được gọi là *event loop*, giúp xử lý các đoạn code lần lượt theo thời gian. Hãy xem lại ảnh sau:

![](https://images.viblo.asia/37ef6709-14f1-42ef-933e-e4a3d95c0ec0.png)

Những Web API này là gì? Chúng là những thread mà bạn không thể truy cập được, chỉ có thể gọi để xài mà thôi. Chúng là những nhân tố trong trình duyệt mà thực sự có thể chạy đồng thời (concurrency). Vậy thì *event loop* là gì:

![](https://images.viblo.asia/bbd3cd9c-9df6-4fbc-b3eb-f6741b8e1899.png)

>> Event Loop có một nhiệm vụ duy nhất - giám sát *Call Stack** và *Callback Queue*. Nếu *Call Stack* trống, nó sẽ lấy sự kiện đầu tiên từ queue và đẩy vào *Call Stack*

Hãy thực thi đoạn code sau và xem điều gì xảy ra:
```javascript
console.log('Hi');
setTimeout(function cb1() { 
    console.log('cb1');
}, 5000);
console.log('Bye');
```

1. Đầu tiên là console.log('Hi') được thêm vào *Call Stack*. Sau đó nó được thực thi, và lại xóa khỏi *Call Stack*
2. Tiếp tục setTimeout được thêm vào *Call Stack*

![](https://images.viblo.asia/d7dbdc28-915b-4db4-9140-1b17af384173.png)

3. setTimeout được thực thi, và trình duyệt sẽ tạo một timer (Web API), nó sẽ tự đếm ngược cho bạn. Sau khi thực thi thì setTimeout bị xóa khỏi *Call Stack*

![](https://images.viblo.asia/352ec6db-2a6d-41a2-9af4-32b820372edb.png)

4. Tương tự, *console.log('Bye')* được thêm vào *Call Stack*, thực thi và sau đó bị xóa khỏi *Call Stack*
5. Sau ít nhất 5000ms thì timer sẽ đếm xong và nó đẩy callback *cb1* vào *Callback Queue*

![](https://images.viblo.asia/8b79a54d-3a2d-4e21-acc1-99d506063095.png)

6. Vì lúc này *Call Stack* đã trống, nên *Event Loop* sẽ đẩy *cb1* từ *Callback Queue* vào *Call Stack*

![](https://images.viblo.asia/db352519-e424-431d-8562-9fb064cc173a.png)

Đến đây thì mọi việc tương tự như gọi hàm thông thường.

Đấy chính là cách mà Event Loop hoạt động, và đó cũng là cách mà tôi đã nói ở trên để tránh block UI khi gặp tác vụ mất nhiều thời gian, đó là truyền cho nó một *callback* rồi thực thi đoạn code tiếp theo, còn tác vụ mất thời gian kia khi nào chạy xong thì hàm *callback* này sẽ được gọi, và Event Loop sẽ lại đẩy nó từ *Callback Queue* vào *Call Stack*.

#### setTimeout
Một lưu ý nhỏ về setTimeout, đó là nó sẽ không đẩy *callback* của bạn vào *event loop queue* ngay, mà nó cài đặt một *timer*. Khi hết thời gian thì nó mới đẩy *callback* vào *event loop*. Tức là đoạn code sau:

```javascript
setTimeout(myCallback, 1000);
```
có nghĩa là sau 1000ms mới đẩy hàm *myCallback* vào queue chứ không phải là hàm *myCallback* sẽ được thực thi sau 1000ms ([Zero Delays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#Zero_delays)). Và với đoạn code sau:

```javascript
setTimeout(function() {
    console.log('After');
}, 5000);
setTimeout(function() {
    console.log('Before');
}, 1000);
```
Thực thi đoạn code trên sẽ có kết quả là:

```
Before
After
```

Chính vì hàm thứ 2 đợi ít thời gian hơn, nên nó sẽ đẩy vào queue sớm hơn, bất chấp việc hàm setTimeout wrap được thực thi sau.
Vậy là xong, mong là qua bài viết thì mọi người sẽ hiểu rõ hơn về cách hoạt động của JavaScript, cũng như một số khái niệm quen thuộc của nó (*Call Stack*, *Event Loop*).

Dịch và biên soạn:

[https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)

[https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5](https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5)

Và bài thuyết trình nổi tiếng của Philip Roberts tại JSConf EU năm 2014 [What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)