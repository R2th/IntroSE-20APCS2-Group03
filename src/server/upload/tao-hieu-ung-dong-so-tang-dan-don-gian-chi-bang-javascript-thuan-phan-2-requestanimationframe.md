# Giới thiệu
Ở [phần trước của series](https://viblo.asia/p/tao-hieu-ung-dong-so-tang-dan-don-gian-chi-bang-javascript-thuan-phan-1-setinterval-bWrZnX7r5xw), mình đã bước đầu làm một ví dụ về hiệu ứng số đếm tăng dần bằng Javascript với công cụ `setInterval()`. Tuy nhiên, như đã nói ở cuối bài, `setInterval()` không phải là giải pháp thích hợp để tạo hiệu ứng trên Web do sự bất ổn định về tham số `delay`.

Kết quả của bài trước vẫn là một sản phẩm "đủ dùng" thế này :v 

![Hiệu ứng động số tăng dần](https://images.viblo.asia/a0e0618c-99af-4c1b-8900-59a7b1b96bdf.gif)

Nhưng hôm nay, mình sẽ tiến hành xây dựng lại với một công cụ hoàn toàn khác vốn dành riêng cho xây dựng hiệu ứng `requestAnimationFrame()`, để xem nó có cải thiện gì thêm với ví dụ trước không nhé.

# Làm quen với `requestAnimationFrame()`
## Tại sao lại dùng `requestAnimationFrame()`
Trong Javascript vốn có sẵn những hàm như `setTimeout()`, `setInterval()`, hay `setImmediate()` giúp chúng ta chạy lặp lại liên tục một đoạn code nào đó, mà qua đó có thể dùng để tạo các animation, game,... Tuy nhiên, không có cách nào để chắc 100% là animation của chúng ta sẽ được update vào đúng những lần repaint của trang Web cả.

Ví dụ, chúng ta dùng giải pháp `setInterval()` và sử dụng thời gian delay là 17ms như ở bài trước có làm. Cứ thi thoảng một lần, lúc hàm tính toán animation của chúng ta chạy xong thì lần repaint của trang Web đã qua lâu rồi. Điều này chính là *frame skip*, xảy ra vì các khoảng chạy của `setInterval()` **không thể đồng nhất** hoàn toàn với framerate. `setInterval()` cùng lắm chỉ set được thời gian delay là 16 hay 17ms (số nguyên), nhưng thật ra chính xác là 16.6666666667ms mới đồng nhất hoàn toàn với framerate. Chưa kể, tham số thời gian truyền vào các hàm trên còn không đảm bảo lúc nào cũng chính xác nữa. Và đó là lý do chính khiến cho animation trông không được "mượt".

`requestAnimationFrame()` thì khác. Nó luôn đảm bảo sẽ chạy đoạn code animation của chúng ta **ngay trước những lần trình duyệt tiến hành repaint** trang web, theo đúng tần số quét của thiết bị. Điều này vừa giúp animation của chúng ta mượt nhất có thể, lại không chạy dư thừa hơn tần số quét của thiết bị.

## Cách dùng cơ bản
`requestAnimationFrame()` chỉ nhận vào một tham số là một callback:

```javascript
window.requestAnimationFrame(callback);
```

Callback chính là một hàm chứa các logic về animation của bạn. Khi thực thi callback, `requestAnimationFrame` còn truyền kèm theo một *tham số thời gian* với độ chính xác cao, hỗ trợ chúng ta rất nhiều trong quá trình tạo ra các animation chất lượng.

Còn một điều nữa là `requestAnimationFrame()` không tự lặp lại. Để animation của bạn tiếp tục chạy đến khi hoàn tất, bạn phải tiếp tục gọi lại `requestAnimationFrame()` bên trong callback.

Bạn có thể tìm hiểu thêm [tại trang MDN](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).

# Thay thế `setInterval()` bằng `requestAnimationFrame()` thôi
Cách sử dụng đơn giản nhất là chúng ta chỉ việc thay thế `setInterval()` của bài trước với `requestAnimationFrame()` như sau:

```javascript
function animateNumber(finalNumber, duration = 5000, startNumber = 0, callback) {
  let currentNumber = startNumber
  function updateNumber() {
    if (currentNumber < finalNumber) {
      let inc = Math.ceil(finalNumber / (duration / 17))
      if (currentNumber + inc > finalNumber) {
        currentNumber = finalNumber
        callback(currentNumber)
      } else {
        currentNumber += inc
        callback(currentNumber)
        requestAnimationFrame(updateNumber)
      }
    }
  }
  requestAnimationFrame(updateNumber)
}
```

Khác với bài trước chỉ ở chỗ, thay vì mình tạo `setInterval()` lúc bắt đầu và `clearInterval()` khi animation hoàn tất, ở đây mình phải liên tục gọi đệ quy lại hàm `requestAnimationFrame()` khi animation chưa xong.

Đây là kết quả khi thay thế xong. Cũng không khác gì lắm so với dùng `setInterval()` đâu nhỉ?

{@embed: https://codepen.io/tranxuanthang/pen/OJydERg}

# Cải tiến thêm: tính toán animation theo thời gian trôi qua
Một nhược điểm theo cách mình làm kể trên: khi mình **chuyển tab hoặc minimize trình duyệt**, animation bị throttle lại, hoặc cũng có thể bị **ngừng lại hoàn toàn**. Chỉ khi mình quay lại về tab thì animation mới được tiếp tục. Đây chính là những tối ưu của trình duyệt lên hàm `requestAnimationFrame()` giúp tiết kiệm năng lượng và đảm bảo hiệu năng cho các thiết bị.

Hơn nữa, mình đã rất "ngây thơ" khi expect rằng framerate luôn là 60FPS và cho con số luôn **tăng đều một lượng** mỗi lần chạy của animation:

```javascript
let inc = Math.ceil(finalNumber / (duration / 17))
currentNumber += inc
```

Giống như khi bạn đang chơi game khủng và bị tụt FPS, thực tế khi máy tính đang có nhiều tác vụ hay với animation phức tạp, **framerate vẫn có thể thấp hơn 60FPS**. Với `requestAnimationFrame()`, trình duyệt sẽ giúp đảm bảo animation vẫn sẽ hiện đủ mượt mà. Nhưng với cách làm của mình, animation sẽ bị chậmmmm lại và không hoàn thành kịp trước khi thời gian set ở tham số `duration` kết thúc.

Bây giờ, mình sẽ tận dụng tham số về thời gian mà `requestAnimationFrame()` truyền vào callback (vốn có độ chính xác cao) để **tính toán animation theo thời gian trôi qua**, thay vì chỉ cho cộng cùng một lượng như trước.

```javascript
function animateNumber(finalNumber, duration = 5000, startNumber = 0, callback) {
  const startTime = performance.now()
  function updateNumber(currentTime) {
    const elapsedTime = currentTime - startTime
    if (elapsedTime > duration) {
      callback(finalNumber)
    } else {
      const rate = elapsedTime / duration
      const currentNumber = Math.round(rate * finalNumber)
      callback(currentNumber)
      requestAnimationFrame(updateNumber)
    }
  }
  requestAnimationFrame(updateNumber)
}
```

Ở trên đây mình có dùng hàm `performance.now()` để lấy ra **thời gian timestamp** tại thời điểm bắt đầu animation. Cả tham số thời gian mà requestAnimationFrame() truyền vào callback và kết quả của hàm `performance.now()` đều là dạng object `DOMHighResTimeStamp`. Nó đều là thời gian theo miligiây nhưng lại là kiểu double và có phần thập phân chuẩn đến từng µs (micrôgiây).

Đoạn:
```javascript
const elapsedTime = currentTime - startTime
```

Giúp mình dễ dàng tính thời gian đã qua (theo dạng miligiây) kể từ thời điểm bắt đầu animation.

Và bằng việc lấy:

```javascript
const rate = elapsedTime / duration
const currentNumber = Math.round(rate * finalNumber)
```

Mình tính ra được con số hiện tại mà mình cần cập nhật sao cho tỉ lệ ngang bằng nhất theo thời gian đã qua. 

Và đây là thành quả cuối cùng 🎉. Để ý rằng giờ đây cả 3 con số đã đều bắt đầu chạy và kết thúc cùng trong một khoảng thời gian với nhau:

{@embed: https://codepen.io/tranxuanthang/pen/YzyBvYp}

# Tham khảo
* https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
* https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
* https://www.kirupa.com/html5/animating_with_requestAnimationFrame.htm
* https://stackoverflow.com/questions/43379640/requestanimationframe-loop-not-correct-fps/43381828#43381828