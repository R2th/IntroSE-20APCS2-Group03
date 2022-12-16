## Giới thiệu
[Event Loop](https://nodejs.dev/learn/the-nodejs-event-loop) là một trong những khái niệm cực kì quan trọng khi chúng ta tìm hiểu về [Node.js](https://nodejs.org/en/about/).

Tại sao nó lại quan trọng đến như vậy? và **làm cách nào để Node.js có thể xử lý bất đồng bộ (asynchronous) và non-blocking I/O**.
> Why is this so important? Because it explains how Node.js can be asynchronous and have non-blocking I/O, and so it explains basically the "killer app" of Node.js, the thing that made it this successful.

Node.js là xử lý đơn luồng, nên nó sẽ chỉ làm một việc một lúc.

Thực tế thì sự hạn chế này rất hữu dụng, nó sẽ giúp chúng ta đơn giản hóa rất nhiều cách mà chúng ta lập trình mà không phải lo về vấn đề tương tranh.

Nhưng khi code chúng ta cần chú ý để tránh mọi thứ có thể chặn thread  như là những request API đồng bộ hoặc vòng lặp vô hạn.

Nói chung là trong hầu hết các trình duyệt đều có một event loop cho mỗi tab của trình duyệt để làm cho mọi quy trính xử lý cô lập với nhau và tránh một trang web có vòng lặp vô hạn hoặc xử lý nặng có thể chặn toàn bộ trình duyệt.

Các Web Workers cũng chạy trong một vòng lặp riêng.

Chúng ta chủ yếu cần quan tâm rằng code của chúng ta sẽ chạy trên một Event Loop riêng để tránh việc **[blocking event loop](https://viblo.asia/p/event-loop-trong-nodejs-naQZRL1A5vx#_blocking-the-event-loop-1)**.

## Blocking the event loop
Một đoạn code Javascript mà mất quá nhiều thời gian để xử lý sẽ chặn việc thực thi thêm bất kỳ đoạn code Javascript nào trong trang, thậm chí sẽ chặn luôn cả luồng UI và người dùng không thể click chuột hay cuộn trang, v.v.

Hầu như tất cả các I/O trong JS đều là non-blocking. Network request, filesystem, v.v. Việc bị blocking có thể coi là một exception, và đó là lý do vì sao  JS dựa rất nhiều vào việc sử dụng callback, và gần đây hơn là sử dụng promises và aysnc/await.

## Call stack
Call stack là một **LIFO (Last In, First Out)** queue.

Event Loop sẽ liên tục kiểm tra **call stack** để xem có function cần thực thi hay không. Trong quá trình này, nó sẽ thêm bất kì function nào nó tìm thấy  vào trong call stack và thực thi từng function một theo thứ tự.

Chúng ta hãy cùng xem cách mà Event Loop và call stack hoạt động qua một ví dụ đơn giản sau đây
```js
const bar = () => console.log('bar')

const baz = () => console.log('baz')

const foo = () => {
  console.log('foo')
  bar()
  baz()
}

foo()
```

Qua đoạn code trên, ta có thể thấy fucntion ``foo() `` sẽ được gọi đầu tiên và trong đó nó sẽ gọi lần lượt hàm ``bar()`` rồi đến ``baz()``. Ở thời điểm này, call stack sẽ như sau:

![](https://images.viblo.asia/72dd3dad-9ac3-4542-94e6-01954c83c49d.png)

Event Loop thực thi những gì nó lấy ra từ call stack

![](https://images.viblo.asia/88a24103-e01f-4f98-a660-9d5c2aa5472f.png)

và việc này sẽ được lặp đi lặp lại cho đến khi call stack rỗng.

## Queuing function execution
Đoạn code ở trên là một ví dụ đơn giản: Javascript sẽ thực thi những gì nó đọc được theo thứ tự. Bây giờ chúng ta cùng xem qua đoạn mã này nhé
```js
const bar = () => console.log('bar')

const baz = () => console.log('baz')

const foo = () => {
  console.log('foo')
  setTimeout(bar, 0)
  baz()
}

foo()
```
Với những bạn mới làm quen với Javascript thì có thể sẽ cho rằng output của đoạn mã trên sẽ là
```js
// Output
foo
bar
baz
```
nhưng khi đoạn mã trên được thực thi thì sẽ lại thấy output không hề như vậy :D mà sẽ lại in ra như này
```js
// Output
foo
baz
bar
```
Chúng ta hãy xem cách đoạn code trên thực thi qua ảnh sau đây

![](https://images.viblo.asia/4791f05e-3308-4289-bf71-d52c27a958df.png)

Đây là thứ tự các bước mà đoạn mã của chúng ta được thực thi

![](https://images.viblo.asia/a453a220-f00b-4281-8264-12644cd0c8e1.png)

Vậy tại sao nó lại như vậy?

## The Event/Message Queue
Trên tài liệu của Node.js thì gọi là **Message Queue**  nhưng ở những tài liệu khác thì lại gọi là **Event Queue**. Mình có thử tìm hiểu thì hai thằng này tương đương nhau, chỉ khác cách gọi, với mình thì mình quen gọi là **Event Queue** hơn :D.

Khi hàm ``setTimeout``, trình duyệt hoặc Node.js sẽ bắt đầu một ``timer``. Khi ``timer`` hoàn tất (trong trường hợp của chúng ta là ngay lập tức vì chúng ta truyền 0 là thời gian timeout), hàm ``bar()`` sẽ được đẩy vào **Event Queue**.

**Event Queue** cũng là nơi  mà các sự kiện do người dùng thực hiện như click, gõ phím hay fetch API sẽ được đẩy vào một hàng đợi và chờ đến khi được lấy ra và thực thi.

**Như chúng ta đã biết thì Event Loop sẽ liên tục tìm kiếm trong call stack những gì cần thực thi cho đến khi call stack rỗng nhưng Event Loop sẽ không dừng ở đó, nó sẽ bắt đầu đọc tiếp *Event Queue* để nhặt ra những gì được nhét vào đó và lôi ra để thực thi.**

Chúng ta sẽ không phải ngồi đợi những hàm như ``setTimeout`` hay fetch API mà nó sẽ tự thực hiện việc đó, bởi vì nó được cung cấp bởi trình duyệt và nó sẽ được xử lý ở thread riêng của nó.
> We don't have to wait for functions like setTimeout, fetch or other things to do their own work, because they are provided by the browser, and they live on their own threads.

## ES6 Job Queue
ECMAScript 2015 giới thiệu cho chúng ta về [Job Queue](http://www.ecma-international.org/ecma-262/6.0/#sec-jobs-and-job-queues), và được [Promises](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Promise) sử dụng (cũng được giới thiệu trong ES6/ES2015). Nó là một cách để thực thi các hàm bất đồng bộ sớm nhất có thể, thay vì đẩy vào cuối cùng của call stack.

Promises sẽ resolve trước khi hàm hiện tại kết thúc và sẽ được thực thi ngay sau hàm hiện tại.

Nó giống như việc chúng ta đi chơi tàu lượn và phải đứng xếp hàng để đợi vậy: Event Queue sẽ xếp chúng ta vào cuối cùng của hàng và chúng ta sẽ phải đợi cho đến lượt của mình, còn Job Queue thì sẽ giống như một cái vé fastpass sẽ giúp chúng ta được đi ngay chuyến tàu lượn ngay sau khi chuyến trước kết thúc.
```js
const bar = () => console.log('bar')

const baz = () => console.log('baz')

const foo = () => {
  console.log('foo')
  setTimeout(bar, 0)
  new Promise((resolve, reject) =>
    resolve('should be right after baz, before bar')
  ).then(resolve => console.log(resolve))
  baz()
}

foo()

// Output
foo
baz
should be right after baz, before bar
baz
```

Đây chính là sự khác biệt giữa Promises (và async/await - được built dựa trên promises) và các hàm bất đồng bộ cũ khác như ``setTimeout`` hay các nền tảng APIs khác.

## Tổng kết
Vậy là qua bài viết này, mình cùng mọi người đã có thể hiểu hơn về Event Loop trong Node.js.

## Tham khảo
https://nodejs.dev/

http://www.ecma-international.org/ecma-262/6.0/#sec-jobs-and-job-queues

https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Promise