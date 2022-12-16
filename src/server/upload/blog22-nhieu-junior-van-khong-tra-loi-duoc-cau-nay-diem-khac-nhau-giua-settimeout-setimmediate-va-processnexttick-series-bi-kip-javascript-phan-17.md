![image.png](https://images.viblo.asia/38fdab70-320c-48e0-b762-6c872a11d61c.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Điểm khác nhau giữa `setTimeout(callback, 0)`, `setImmediate(callback)` và `process.nextTick(callback)` là gì?

Một câu hỏi rất hay được sử dụng để phỏng vấn các Javascript Junior (`Trước mình cũng bị hỏi một lần :D`). Giờ mới hiểu, câu này ngoài việc phân biệt điểm khác nhau giữa các `function` trên thì vừa check rằng bạn có thực sự hiểu về `Event Loop` hay không.

Bề ngoài, có vẻ như cả ba hàm đều làm điều tương tự - chúng thực hiện lệnh **callback** sau [event loop](https://hackernoon.com/tagged/event-loop) hiện tại, nhưng trước bất kỳ thứ gì khác. Câu hỏi tự nhiên cần đặt ra là, tại sao lại có ba `function` khác nhau? Hãy thử chạy đoạn code sau:

```javascript
let racer = function() {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
  process.nextTick(() => console.log("nextTick"));
  console.log("current event loop");
}

racer()
```

Chúng ta có thể thấy từ `output` các lệnh `callback` này không được thực thi theo đúng thứ tự mà chúng đã được viết trong source code.

```console
current event loop
nextTick
timeout
immediate
```

Giải thích
==========

Hàm được xử lý đầu tiên là `process.nextTick`, đặt lệnh `callback` của nó ở đầu [hàng đợi sự kiện](https://viblo.asia/p/blog21-tat-ca-nhung-gi-ban-can-de-hieu-ve-nodejs-series-bi-kip-javascript-phan-16-oK9VyKyOJQR). Nó sẽ thực thi sau khi code hiện đang được thực thi nhưng trước bất kỳ sự kiện `I/O` hoặc bộ hẹn giờ (`Timer`) nào.

Tiếp theo là `“timeout”`. Vì chúng ta đã **passed** thời gian chờ là `0` cho `setTimeout`, nên không có thêm độ trễ bắt buộc nào trước khi thực thi và nó được đưa vào hàng đợi `Timer` trong **`Event loop`** tiếp theo.

Cuối cùng, chúng ta có `setImmediate`, mà rõ ràng không phải là ngay lập tức như tên của nó! `Callback` của nó được đặt trong hàng đợi và kiểm tra chu kỳ tiếp theo của `event loop`. Vì hàng đợi `check` xảy ra muộn hơn hàng đợi `Timer`, `setImmediate` sẽ chậm hơn `setTimeout 0`. (`Từ từ đừng bối rối nhìn hình sau sẽ rõ`) 

Nói chung, `event loop` sẽ trông như thế này:

`timers`\-> `I/O`\-> `poll`\-> `check`\-> `close`\-> `timers`\-> ... (Cứ lặp mãi như vậy nên gọi là `event loop`)

**timers** : gọi `callback` từ `setInterval` hoặc `setTimeout`  
**I/O** : gọi `callback` từ các sự kiện **I/O**  ([mình cũng có giải thích về cái này ở đây](https://viblo.asia/p/blog21-tat-ca-nhung-gi-ban-can-de-hieu-ve-nodejs-series-bi-kip-javascript-phan-16-oK9VyKyOJQR))
**Idle** : Được sử dụng nội bộ bởi [Node](https://hackernoon.com/tagged/node) giữa các pha `IO` và `Poll`  
**poll** : Truy xuất các sự kiện I/O mới
**check** : gọi `callbacks` từ `setImmediate`  
**close** : Xử lý đóng các kết nối như là `Socket`

![image.png](https://images.viblo.asia/49a9103f-a133-4002-a8a0-2d44eb818cb0.png)

Xem ví dụ sau và bạn sẽ hiểu được cách nó hoạt động
====================

Bạn nghĩ `output` của đoạn `code` sau là gì?

```javascript
let racer1 = function () {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
  process.nextTick(() => console.log("nextTick"));
};

let racer2 = function () {
  process.nextTick(() => console.log("nextTick"));
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
};

let racer3 = function () {
  setImmediate(() => console.log("immediate"));
  process.nextTick(() => console.log("nextTick"));
  setTimeout(() => console.log("timeout"), 0);
};

racer1();
racer2();
racer3();
```

Đây có phải là những gì bạn nghĩ?
```console
nextTick
nextTick
nextTick
timeout
timeout
timeout
immediate
immediate
immediate
```

Như mọi khi, mình hy vọng bạn thích bài viết này và biết thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog22-nhieu-junior-van-khong-tra-loi.html