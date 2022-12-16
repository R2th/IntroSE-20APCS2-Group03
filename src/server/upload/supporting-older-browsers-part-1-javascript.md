## Introduction
Chúng ta có nhiều cách để hỗ trợ viết javascript cho những trình duyệt phiên bản cũ (IE 8, IE 9...), một trong số chúng là sử dụng **Polyfill**.
## What’s a polyfill?
![](https://images.viblo.asia/b9a7f754-771f-41cf-a7a7-7e321f0bfed6.jpeg)

**Polyfill** là một đoạn code để chỉ cho browser những cách để implement các javascript feature. Một khi chúng ta đã sử dụng polyfill cho một function nào đó thì sau đó chúng ta sẽ không cần lo lắng về việc liệu function hay method ta vừa viết có được browser support hay không nữa.

**Polyfill** có phương thức hoạt động khá đơn giản như sau:
* check xem feature có được browser support hay không
* nếu browser không support, nó sẽ add code để support việc implement feature

Lấy ví dụ về method `Array.prototype.find`, trong trường hợp browser không support `Array.prototype.find`, nó sẽ hướng dẫn browser cách để implement:
```javascript
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this
 -  null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true
  });
}
```
Chúng ta có thể dễ dàng tìm được đoạn polyfill này của `Array.prototype.find` ở trên [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
## Using Polyfills
Về cơ bản, có 2 cách để sử dụng polyfill:
* **Polyfill manually**: theo cách thủ công (giống như ta làm ở trên)
* **Polyfill library**: add nhiều polyfill cùng một lúc thông qua thư viện

### Polyfilling manually
Đầu tiên chúng ta phải search polyfill mà chúng ta cần, có thể thông qua google, hiện giờ hầu như các function hay method mới mà các browser cũ ít hỗ trợ đều có sẵn polyfill trên [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).

Sau khi tìm được polyfill phù hợp, chúng ta có thể add nó vào như đoạn code bên trên.

### Polyfill library
Có nhiều thư viện chứa rất nhiều polyfill, một trong số đó là [ES6-shim](https://github.com/paulmillr/es6-shim), nó cung cấp toàn bộ các polyfill features của ES6.

Lưu ý **polyfill** là một phần của **shim**. **Shim** là một thư viện cung cấp các API riêng biệt hoàn toàn cho các browser cũ mà không hỗ trợ các API cùng tên.

### Using cutting-edge JavaScript features
Ngoài ra chúng ta có thể sử dụng [Babel](https://babeljs.io/) - là tool với chức năng chính là compile Javascript, trong quá trình compile nó có thể đọc các file js, sau đó convert các file đó về dạng mà browser có thể hiểu được.

## What if polyfills aren’t enough?
Nếu trong trường hợp polyfill vẫn không đủ để support một feature nào đó, thì chúng ta nên cân nhắc lại một chút:
* Liệu có cần dùng chính xác feature đấy cho các browser khác nhau không? chúng ta có thể sử dụng sang 1 feature khác tương đương nhưng đảm bảo các browser đều support
* Hoặc chúng ta có thể xử lý theo hướng khác mà không cần dùng đến feature đấy, hay thậm chí là không cần đến javascript?

Không có giải pháp nào là tối ưu, tùy từng trường hợp mà chúng ta có thể sử dụng các hướng giải quyết khác nhau sao cho phù hợp nhất.

## How to tell if a browser supports the feature?
Để check xem feature mà chúng ta đang sử dụng được các browser nào hỗ trợ, ta có thể dùng [caniuse.com](https://caniuse.com/). Viết javascript feature mà chúng ta muốn check, sau đó chúng ta có thể xem kết quả, vd như với `Array.prototype.find`:

![](https://images.viblo.asia/ae3fbfff-e0a2-490e-a31a-a8d5675bc9e0.PNG)

Một cách khác là chúng ta có thể check trên [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference):

![](https://images.viblo.asia/a32efccb-3d43-4fc2-a3cc-4dd223d8a2a5.PNG)

## Beware the cost of JavaScript
Khi chúng ta sử dụng polyfill, đồng nghĩa với việc chúng ta sẽ thêm nhiều dòng code javascript hơn. Một khi số lượng file js quá lớn, cũng sẽ gây nhiều ảnh hưởng:
* Những browser cũ thường được sử dụng trên những hệ thống cũ, có nghĩa là việc phải tải số lượng file js lớn sẽ ảnh hưởng đến performance
* Số lượng file js càng nhiều, quá trình Javascript bundle sẽ càng mất nhiều thời gian hơn

## Summary 
Bài viết nhằm chia sẻ về cách để support javascript với các browser cũ qua việc sử dụng **Polyfill** và các thư viện hay các tool liên quan. Bài viết còn nhiều hạn chế, cảm ơn bạn đã dành thời gian theo dõi.

Nguồn: https://zellwk.com/blog/older-browsers-js/