Javascript ngày càng được ưa chuộng và sử dụng trong nhiều môi trường. Ngoài trình duyệt web - môi trường sử dụng phổ biến nhất , nó còn được sử dụng trong trong các chương trình servers, smartphones, machine learning, và thậm chí là cả phần cứng robot.

Mỗi môi trường có mô hình đối tượng đặt trưng và cung cấp các cú pháp khác nhau để truy cập đối tượng toàn cục. Trong trình duyệt web, đối tượng toàn cục có thể được truy cập thông qua `window`, `self` hoặc `frames`. Tuy nhiên trong Node.js, những thuộc tính này không tồn tại mà thay vào đó bạn phải sử dụng `global`. Đối với Web Workers, thì nó là `self`.

Những phương thức khác nhau của việc tham chiếu đến đối tượng toàn cục khiến chúng ta gặp khó khăn trong việc viết đoạn mã Javascript tích hợp trong nhiều môi trường khác nhau. May thay, có một  [kiến nghị](https://github.com/tc39/proposal-global) nhằm mục địch khắc phục vấn đề này bằng cách giới thiệu một thuộc tính tiêu chuẩn được gọi là `globalThis` có sẵn trong mọi môi trường.

Trong bài viết này, trước tiên chúng ta sẽ xem xét các đối tượng toàn cục trong các môi trường Javascript phổ biến và xem cách mà `globalThis`  cung cấp một cơ chế thống nhất để truy cập nó.

# Window

Thuộc tính `window` được sử dụng để tham chiếu đến đối tượng của tại liệu hiện tại trong môi trường trình duyệt. Ở mức cao nhất của mã lệnh được khai báo bằng `var` trở thành thuộc tính của `window` và có thể được truy cập bất kỳ đâu trong mã lệnh

```javascript
var a = [10, 20];

console.log(window.a);          // → [10, 20]
console.log(a === window.a);    // → true
```

Thông thường, không cần thiết phải tham chiếu trược tiếp đến window khi sử dụng các thuộc tính của nó vì tham chiếu tham chiếu đã được ngụ ý. Tuy nhiên, khi có một biến cục bộ trùng tên với biến toàn cục thì sử dụng `window` là cách duy nhất: 

```javascript
var a = 10;

(function() {
  var a = 20;   
  console.log(a);           // → 20
  console.log(window.a);    // → 10
})();
```
Như bạn có thể thấy, `window` rất hữu ích để tham chiếu đến đối tượng toàn cục, bất kể phạm vi nào mà mã lệnh đang chạy.
> Lưu ý: `window` thực sự tham chiếu đến window.window, vì thế window.window === window.

Bênh cạnh các thuộc tính và phương thức Javascript tiêu chuẩn, đối tượng `window` còn chứa một số thuộc tính và phương thức bổ sung cho phép chúng ta kiểm soát cửa sổ trình duyệt web cũng như chính bản thân tài liệu.

# Self
Web Workers API không có đối tượng `window` vì nó không có bối cảnh duyệt web. Thay vào đó nó cung cấp giao diện `WorkerGlobalScope` chứa dữ liệu thường được truyền qua qua `window`.

Để truy cập đối tượng toàn cục trong Web Workers, chúng ta thường sử dụng `self`, tương tự như thuộc tính `window` của đối tượng `window`. `self` là một tham chiếu đến đối tượng toàn cục và có thể được sử dụng để tạo tham chiếu rõ ràng thay vì ngầm định:

```javascript
// a web worker
console.log(self);    // => DedicatedWorkerGlobalScope {...}

var a = 10;

console.log(self.a);          // → 10
console.log(a === self.a);    // → true
```

Trong môi trường trình duyệt, mã lệnh này sẽ ghi lại `window` thay vì `DedicatedWorkerGlobalScope` . Bởi vì giá trị của `self` thay đổi phụ thuộc vào môi trường mà nó sử dụng, đôi khi nó được ưu tiên hơn so với `window`. Trong khi `self` tham chiếu đến `WorkerGlobalScope.self` trong bối cảnh Web Workers, thì nó tham chiếu đến `window.self` trong bối cảnh trình duyệt.

Điều quan trọng là không được nhầm lẫn thuộc tính `self` với các thuộc tính Javascript phổ biến để khai bao một biến cục bộ, được sử dụng để duy trì một tham chiếu đến một bối cảnh. Ví dụ: 
```javascript
const obj = {
  myProperty: 10,
  myMethod: function(){
    console.log(this === obj);    // => true

    // store the value of this in a variable for use in nested functions
    const self = this;

    const helperFunction = (function() {
      console.log(self === obj);  // => true (self refers to the outer this value)
      console.log(this === obj);  // => false (this refers to the global object. In strict mode, it has a value of undefined)
    })();
  }
};

// invoke myMethod on the object obj.
obj.myMethod();
```
# Frames
Một cách khác để truy cập đến đối tượng toàn cục trong môi trường trình duyệt là sử dụng thuộc tính `frames`, nó hoạt động tương tự `self` và `window`: 
```javascript
// browser environment
console.log(frames);    // => Window {...}
```
Thuộc tính chỉ đọc này thường được dùng để lấy danh sách các khung con của cửa sổ hiện tại. Ví dụ, bạn có thể sử dụng window.frames[0] hoặc frames[0] để truy cập frames đầu tiên.

# Global
Trong Node.js, bạn có thể truy cập đối tượng toàn cục bằng cách sử dụng từ khóa `global`:
```javascript
// node environment
console.log(global);    // => Object [global] {...}
```
`window`, `self` hay `frames` không hoạt động trong môi trường Node.js. Hãy nhớ rằng phạm vi ở mức cao nhất trong Node.js không phải là phạm vi toàn cục (global). Trong trình duyệt, `var abc = 123` sẽ tạo một biến toàn cục. Tuy nhiên, trong Node.js biến sẽ là cục bộ của chính mô-đun.
# This
Trong trình duyệt, bạn có thể sử dụng từ khóa `this` ở mức cao nhất của chương trình để tham chiếu đến đối tượng toàn cục: 

```javascript
this.foo = 123;
console.log(this.foo === window.foo);    // => true
```

Các hàm bên trong `this` hoạt động không nghiêm ngặt hoặc các hàm mũi tên cũng có thể tham chiếu đến đối tượng toàn cục. Nhưng đó không phải là trường hợp với các chức năng chạy ở chế độ nghiêm ngặt, trong đó `this` có giá trị `undefined` :
```javascript
(function() {
  console.log(this);    // => Window {...}
})();

(() => {
  console.log(this);    // => Window {...}
})();

(function() {
  "use strict";
  console.log(this);    // => undefined
})();
```
Trong mô-đun Node. `this` ở mức cao nhất không tham chiếu đến đối tượng toàn cục. Thay vào đó, `this` có cung giá trị với `module.exports`. Ở trong các hàm (môi trường Node), giá trị của `this` được xác định dựa trên cách gọi hàm. Trong các mô-đun Javascript, `this` ở mức cao nhất là `undefined`. 
# Giới thiệu globalThis
`globalThis` xuất hiện nhằm mục đích củng cố các cách ngày càng bị phân mảnh để truy cập đối tượng toàn cầu bằng cách xác định một thuộc tính toàn cầu tiêu chuẩn. `globalThis` được đề xuất ở gia đoạn 4, có nghĩa là nó đã sẵn sàng để đưa vào tại liệu tiêu chuẩn ES2020. Tất cả các trình duyệt phổ biến, bao gồm Chrome 71+, Firefox 65+ và Safari 12.1+, đã hỗ trợ tính năng này. Bạn cũng có thể sử dụng nó trong Node.js 12+.
```javascript
// browser environment
console.log(globalThis);    // => Window {...}

// node.js environment
console.log(globalThis);    // => Object [global] {...}

// web worker environment
console.log(globalThis);    // => DedicatedWorkerGlobalScope {...}
```
Bằng cách sử dụng `globalThis`, mã lệnh của bạn sẽ hoạt động trong bối cảnh window và non-window mà không cần phải viết kiểm tra hoặc kiểm tra bổ sung. Trong hầu hết các môi trường, `globalThis` trực tiếp đề cập đến đối tượng toàn cục của môi trường đó. Tuy nhiên, trong các trình duyệt, proxy được sử dụng nội bộ để tính đến bảo mật khung nội tuyến  và cross-window. Tuy nhiên, trên thực tế, nó không thay đổi cách viết mã lệnh của bạn.


Nói chung, khi bạn không chắc chắn mã của bạn sẽ được sử dụng trong môi trường nào, hoặc khi bạn muốn làm cho mã lệnh của mình có thể thực thi ở các môi trường khác nhau, thuộc tính `globalThis` rất tiện dụng. Tuy nhiên, bạn phải sử dụng polyfill để triển khai tính năng này trên các trình duyệt cũ hơn không hỗ trợ tính năng này.

Mặc khác, nếu bạn chắc chắn mã lệnh của mình sẽ được sử dụng trong môi trường nào, thì hãy sử dụng một trong những cách hiện có để tham chiếu đến đối tượng toàn cục của môi trường và giúp bạn không cần phải include polyfill cho `globalThis`.
# Tạo một `globalThis` polyfill
Trước khi ra mắt `globalThis`, một cách phổ biến để truy cập đối tượng toàn cục trên các môi trường khác nhau là sử dụng mô hình sau:
```javascript
function getGlobalObject() {
  return Function('return this')();
}

if (typeof getGlobalObject().Promise.allSettled !== 'function') {
  // the Promise.allSettled() method is not available in this environment
}
```
Vấn đề của mã lệnh này là hàm tạo và đánh giá không thể sử dụng trong các trang web thực thi [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP). Hệ thống tiện ích mở rộng của Chrome cũng không cho phép mã như vậy chạy do CSP.

Một mô hình khác để tham chiếu tới đối tượng toàn cục như sau:
```javascript
function getGlobalObject() {
  if (typeof globalThis !== 'undefined') { return globalThis; }
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('cannot find the global object');
};

if (typeof getGlobalObject().Promise.allSettled !== 'function') {
  // the Promise.allSettled() method is not available in this environment
}
```

Mô hình này thường được sử dụng trên web. Nhưng điều này cũng có một [số sai sót](https://mathiasbynens.be/notes/globalthis#naive-polyfill) khiến nó không đáng tin cậy trong một số tình huống nhất định. May thay, Mathias Bynens tại Chrome DevTools đã đưa ra một [mô hình sáng tạo](https://mathiasbynens.be/notes/globalthis#robust-polyfill) không mắc phải những thiếu sót đó:
```javascript
(function() {
  if (typeof globalThis === 'object') return;
  Object.defineProperty(Object.prototype, '__magic__', {
    get: function() {
      return this;
    },
    configurable: true // This makes it possible to `delete` the getter later.
  });
  __magic__.globalThis = __magic__; // lolwat
  delete Object.prototype.__magic__;
}());

// Your code can use `globalThis` now.
console.log(globalThis);
```

Polyfill là một giải pháp mạnh mẽ hơn so với các cách tiệpk cận khác, nhưng nó vẫn chưa hoàn hảo. Việc sửa đổi `Object`, `Object.defineProperty`, hoặc `Object.prototype.__defineGetter__` có thể phá vỡ polyfill, như Mathias đã đề cập.
# Tóm lại
Rất khó để viết một mã Javascript hoạt động được trong nhiều môi trường. Mỗi môi trường máy chủ có một mô hình đối tượng hơi khác nhau. Do đó, để truy cập đối tượng toàn cục, bạn cần phải sử dụng các cú pháp khác nhau trong các môi trường Javascript khác nhau.

Với sự ra đời của thuộc tính `globalThis`, việc truy cập đối tượng toàn cục sẽ trở nên đơn giản hơn nhiều và không còn cần thiết phải phát hiện ra môi trường mà mã lệnh đang thực thi. 

Thoạt nhìn, `globalThis` có vẻ như là một thứ dễ dàng để polyfill, nhưng trên thực tế rât phức tạp để làm đúng. Tất cả các cách giải quyết hiện có đều không hoàn hảo và có thể phát sinh lỗi nếu bạn không cẩn thận.

ECMAScript đang nhanh chóng phát triển và bạn có thể mong đợi các tính năng mới sẽ được giới thiệu thường xuyên hơn. Để được cập nhật về những bổ sung mới nhất cho thông số kỹ thuật, hãy xem [danh sách các đề xuất đã hoàn thành](https://github.com/tc39/proposals/blob/master/finished-proposals.md)

Nguồn: https://blog.logrocket.com/what-is-globalthis-why-use-it/