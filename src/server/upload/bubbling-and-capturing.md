Nghe qua cái tên thì chắc hẳn các bạn sẽ thấy nó khá là mới mẻ, nhưng trong khi ae code thì nó lại thường hay gặp phải trong một số trường hợp. Hãy cùng mình củng cố kiến thức và thêm vào cho bản thân 2 khái niệm này để đi phỏng vấn không còn bị bỡ ngỡ khi nhắc đến nó nhé @@

Hãy bắt đầu với một ví dụ:
 `event onClick` được gán vào `div`,  Khi chạy nếu bạn click vào bất kỳ tag như `em` hay `code`  thì event này vẫn được gọi mặc dù nó không được gán vào thẻ. Nghe tới đây thì ae đã thấy khá quen thuộc rồi phải không nào. Xem tiếp nhé
 
 ### Bubbling
 `Khi 1 event` xảy ra trong một `element`, Nó sẽ chạy `handler` của nó, tiếp theo là thằng cha, rồi tới những thằng trên thằng cha (mình gọi là tổ tiên đi nhé: ancestors).
 
 Nếu chúng ta có 3 `element` FORM > DIV > P với `handler` cho từng thằng:
 
 ```html
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
 ```
 
 Nếu click vào `<p>`:
 1. Gọi click `<p>`
 2. Gọi click `<div>`
 3. Gọi click `<form>`
 4. Và tiếp tục tới `document` - > `window`  nếu có event được gán vào
 
 Vì vậy nếu click `<p>` thì 3 alert sẽ được hiển thị theo thứ tự 1,2,3
 
Nó được gọi là `buddling`.

 ### Stopping Bubbling
 Ta thấy ví dụ trên nó khá khó chịu khi việc click vào `<p>` lại phải xử lý việc click của `<div>` và `form`. Thay vì thế, ta chỉ muốn click vào thằng nào thì thực hiện `handler` của nó, như thế trong có vẻ hợp lý hơn.
 
 Để làm được điều này, chúng ta sử dụng method `event.stopPropagation()`.  Hàm này sẽ dừng thực hiện những `handler` phía trên của nó.
 
 ```html
<body onclick="alert(`the bubbling doesn't reach here`)">
  <button onclick="event.stopPropagation()">Click me</button>
</body>
 ```
 
 Ở đây cụ thể là dừng việc gọi hàm click của `<body>` khi ta click vào `<button>`
 
 Tới đây bạn có thể tự tin khi ai đó hỏi bạn: 
 1. Bubbling là gì mày
 2. `event.stopPropagation()` mục đích là gì. Sao code mày thêm cái méo đó vào.

 Bạn có thể giải thích cho đối phương cặn kẽ khi bạn đọc qua bài viết này :laughing::laughing::laughing:
 
 ### Capturing
 Đối với khái niệm này thì mình chưa có áp dụng nó vào thực tế được. Nhưng cũng cần nắm và nhớ sơ qua để lúc cần thì có thể tìm lại và áp dụng nó. 
 
 [DOM Event](https://www.w3.org/TR/DOM-Level-3-Events/) mô tả 3 giai đoạn của `event propagation`
 
 1. Capturing phase: Giai đoạn đi xuống `element`
 2. Target phase: Giai đoạn `event` đạt tới phần tử `target element`
 3. Bubbling phase: Giai đoạn đi lên từ `target element`
 
 Đây là bức tranh mô tả click vào `<td>` trong table.
 `Handler` được thêm vào sử dụng `on<event>` hoặc sử dung `HTML attribute`, hoặc`addEventListener(event, handler)` không thể biết được về `capturing`. Vì nó chỉ chạy từ giai đoạn 2 và 3.
 
 ![](https://images.viblo.asia/47f4570a-2eda-4310-9351-619522dedb36.png)

 
 Để bắt `event` trên giai đoạn 1, chúng ta cần thiết lập   `capture` cho handler thành `true`
 
 ```html
elem.addEventListener(..., {capture: true})
// or, just "true" is an alias to {capture: true}
elem.addEventListener(..., true)
```

Đây là 2 giá trị của option `capture`:

false: `handler`  được thiết lập trên giai đoạn 3 (`bubbling`)

true: `handler` được  thiết lập trên giai đoạn 1 (`capturing`)

Hãy xem ví dụ
```html
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form>FORM
  <div>DIV
    <p>P</p>
  </div>
</form>

<script>
  for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
  }
</script>
```

Khi click vào từng element sẽ thấy cách nó chạy : 
1. HTML > BODY > FORM > DIV: Giai đoạn 1 (capturing)
2. P : giai đoạn 2 (target)
3. DIV > FORM > BODY > HTML Giai đoạn 3 (bubbling)

Để xoá handler, xử dụng `removeEventListener` cần phải cùng giai đoạn. Nghĩa là `addEventListener(..., true)` thì nên `removeEventListener(..., true)`

-----

 Bài viết của mình tới đây là kết thúc.
 
Nếu thấy không hiểu hoặc có những góp ý cho bài viết thì mong các bạn để lại comment nhé !@#$%^&*

Tài liệu tham khảo:

- [javascript.info](https://javascript.info/bubbling-and-capturing#capturing)