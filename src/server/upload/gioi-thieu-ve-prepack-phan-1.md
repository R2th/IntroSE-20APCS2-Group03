Nếu bạn đang xây dựng các app Javascript, có thể bạn sẽ thấy quen thuộc với một số tool compile code Javascript như:

- Babel cho phép bạn sử dụng những tính năng mới hơn của JS, sau đó compile ra đoạn code tương đương nhưng ở phiên bản JS cũ hơn
- Uglify cho phép bạn viết code JS sau đó compile ra đoạn code tương đương nhưng chứa ít bytes hơn.
- **[Prepack](https://github.com/facebook/prepack)** là một tool khác nhằm compile JS, được tạo bởi facebook, nhưng không giống Babel hay Uglify, Prepack không focus vào tính năng mới hay code size. Thay vào đó, Prepack cho phép bạn viết code sau đó compile sang đoạn code tương tự nhưng chạy nhanh hơn, tốt về mặt performance hơn.

=> Hãy cùng tìm hiểu cách thức hoạt động của Prepack và tìm hiểu tại sao nó có thể làm như vậy nhé!

## **Prepack Fundamentals**

Cách chắc chắn nhất để cải thiện performance đó là làm ít việc hơn. Prepack cũng hoạt động theo nguyên tắc này: Nó thực thi chương trình tại build time để học xem đoạn code đó sẽ làm gì, và sau đó nó sinh ra đoạn code tương đương làm những việc tương tự với ít tính toán nhất.
Hãy cùng xem một số ví dụ về điều này:

### **1. Hai cách để thực hiện phép tính 2 + 2**

Cách code thông thường:

```js
(function() {
  var x = 2;
  var y = 2;
  global.answer = x + y;
})();
```

Output của prepack khi compile đoạn code trên: answer = 4; ([Link compile online (Prepack REPL)](https://prepack.io/repl.html#BQMwrgdgxgLglgewsAlAAgN4Cg1oG4CGATmgB5oC8aATANw77FoCelN9uA5gDYIBGBbgDoCEAM4B3AKYkq5ANQt6AXxSp6QA))

Khi chạy cả 2 đoạn code trên đều tạo ra cùng một kết quả: đó là giá trị 4 sẽ được gán vào biến global answer. Tuy nhiên, Prepacke không chứa phép tính 2 + 2. Vì Prepack đã chạy phép tính 2 + 2 trong quá trình biên dịch, và "serialized" (gọi tới) toán tử gán cuối cùng. Cách làm này chắc chắn sẽ tốt hơn về mặt performance.

### **2. A Tree Falls in a Forest**

Có thể bạn đã nghe tới câu hỏi triết học này: "Nếu một cái cây đổ xuống ở 1 cánh rừng mà không một ai ở quanh đó nghe thấy nó, vậy liệu nó có tạo ra tiếng động?"

Hóa ra nó liên quan trực tiếp tới cái mà Prepack có thể và không thể làm.

Hãy cùng xem ví dụ [này](https://prepack.io/repl.html#G4QwTgBAHhC8ECYDcAoUkCedGoOYBsB7AIxHwDoQA7AZwHcBTSeGAagg1SA):

```js
var x = 2;
var y = 2;
global.answer = x + y;
```

Khi prepack compile đoạn code trên thì output vẫn bao gồm x và y:

```js
var y, x;
x = 2;
y = 2;
answer = 4;
```

Bởi lẽ Prepack xử lý đoạn code đầu vào như một script (thay vì 1 module). Khai báo var bên ngoài một function trở thành 1 biến global, vậy nên Prepack sẽ coi các khai báo đó là gán ngầm định cho global:

```js
var x = 2; // Same as: global.x = 2;
var y = 2; // Same as: global.y = 2;
global.answer = x + y;
```

Vậy nên sẽ xuất hiện x,y trong output của prepack, để tránh lỗi trên thì chúng ta có thể xử lý như sau:

```js
(function() { // Create a function scope
  var x = 2; // Not a global variable anymore
  var y = 2; // Not a global variable anymore
  global.answer = x + y;
})(); // Don't forget to call it!
```

Khi đó chúng ta sẽ thu được [output như mong muốn](https://prepack.io/repl.html#BQMwrgdgxgLglgewsAlAAgN4Cg1oG4CGATmgB5oC8aATANw77FoCelN9uA5gDYIBGBbgDoCEAM4B3AKYkq5ANQt6AXxSp6QA)

Dưới đây là một trường hợp khác:

```js
(function() {
  var x = 2;
  var y = 2;
  var answer = 2 + 2;
})();
```

Prepack REPL sẽ tạo ra warning hữu ích cho ta:

```
// Your code was all dead code and thus eliminated.
// Try storing a property on the global object.
```

Mặc dù chúng ta có thực hiện một vài tính toán, nhưng không có phép tính nào ảnh hưởng tới môi trường. Nếu có một vài script chạy sau đó, chúng cũng không có cách nào xác định liệu rằng đoạn code của chúng ta đã chạy hay chưa. Do đó, không cần thiết để serialize (wrote) bất kỳ giá trị nào trong số chúng.

Để sửa việc này, chúng ta cần đánh dấu một cách tường minh cái chúng ta muốn giữ bằng cách gán nó cho global object, và để Prepack loại bỏ những cái còn lại:

```js
(function() {
  var x = 2; // Prepack can discard this variable
  var y = 2; // Prepack can discard this variable
  global.answer = 2 + 2; // But this value needs to be serialized
})();
```

TO BE CONTINUE...

Nguồn: https://gist.github.com/gaearon/d85dccba72b809f56a9553972e5c33c4