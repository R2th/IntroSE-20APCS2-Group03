![](https://images.viblo.asia/92a76d86-8f41-4c68-8f95-90bf462fae86.jpg)
- Debug không phải là thứ chung ta nghĩ đến hay nên nghĩ trong quá trình viết code. Nhưng nó lại là nhân tố chính giúp chúng ta vượt qua được những cơn khủng hoảng, lụt lội khi ứng dụng gặp lỗi.
- Một cách hiệu quả để debug trong js là bạn hãy đặt tên cho những hàm nặc danh `(anonymous function)`. Nếu bạn chưa biết `anonymous function` là gì có thể xem ví dụ ở dưới
``` js
// anonymous functions
function() {}
() => {}

// named functions
function toDoSomething() {}
const toDoSomething = () => {
```

- Thông thường bạn sẽ có các **function** gọi những **function** khác, một số khác có thể được gọi từ những **event listener**, chẳng bạn như `windown.load`.

Ví dụ:
```js
function Page() {
  window.addEventListener('load', function() {
    console.log('Page loaded!');
        Page.init();
  });
}

function App() {
  Page();
}

App();
```

- Trong đoạn code trên có 1 lỗi. Và khi chạy nó bạn sẽ nhận được một lỗi trên bạn có thể nhận được một thông báo lỗi trong **developer tools console** như sau:
``` js
Uncaught TypeError: Page.init is not a function
    at <anonymous> (index.js:1:6)

(anonymous)   @ index.js:4
load (async)
Page          @ index.js:2
App           @ index.js:9

```
- Đoạn thông báo dưới đây được hiện thị trên **expanded console message** và nó là một **[ stack trace](https://developer.mozilla.org/en-US/docs/Web/API/console#Stack_traces)**. Đến đây bạn có nhận thấy các chức năng mà ta đã đặt tên đó là `Page` và `App` ?. Vậy còn sự kiện `window.addEventListener` thì sao, nó đâu rồi ?.
- À ừ thì nó là 1 `anonymous function` nên sẽ không hiện lên trên này đâu. Hay tưởng tượng function của bạn viết ra được gọi và thực thi trên 1 `anonymous function` và `anonymous function` đó được gọi lại trong 1 `anonymous function` khác. 
- Rất rắc rối và khó hiểu đúng không. Chính vì thế trên `log` sẽ không lưu ra các `anonymous function` gọi hàm bị lỗi trong **stack trace** và nếu có `debug` thì cũng phải mò hàm để thực hiện.

Vậy ta thử khắc phục điều này bằng các thêm tên cho `anonymous function` đó xem sao.
``` js
function Page() {
  window.addEventListener('load', function pageLoadHandler() {
    console.log('Page loaded!');
    Page.init();
  });
}

function App() {
  Page();
}

App();
```

Vẫn là lỗi đó nhưng ta có hiển thị khác trên `log`.
``` js
Uncaught TypeError: Page.init is not a function
    at pageLoadHandler (index.js:1:6)

pageLoadHandler   @ index.js:4
load (async)
Page          @ index.js:2
App           @ index.js:9

```

- Kết quả như ta thấy rõ. Chúng ta có thể thấy tên hàm `pageLoadHandler` được nhắc đến trong **developer tools console** thay vì `(anonymous)`.
- Đối với các phương thức đơn giản như `.map()`, `.filter()` bạn có thể dùng `anonymous` miễn là `parent function` có tên là được. Việc bạn sử dụng `anonymous` hay đặt tên thật sự không có nhiều thay đổi trong quá trình lập trình.
- Nhưng nó lại quyết định việc về sau bạn sẽ debug một cách nhanh chóng. Mình thường có một cách là đặt tên các `anonymous function` là `ahihi1, ahihi2, ...``` về sau khi code xong mình sẽ xóa các hàm này. Điều này giúp mình xác định được chính xác lỗi xuất phát từ đâu cũng như về sau chỉ cần `Ctrl + Shift + F` là mình có thể xóa tên các hàm này 1 cách nhanh chóng.

Cảm ơn các bạn đã đón đọc.