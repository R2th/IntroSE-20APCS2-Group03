Đầu tiên ta hãy xem xét 2 đoạn code này:
* Dùng khai báo biến với từ khóa `var`
```js
(function() {
    console.log(x);  // undefined
    var x = 'Hello';
}());
```
* Dùng khái báo biến với từ khóa `let`
```js
(function() {
    console.log(y);  // ReferenceError: y is not defined
    let y = 'Hello';
}());
```
Như các bạn đã thấy kết quả khi sử dụng `var` và `let` là khác nhau, đây cũng là điểm khác nhau của khai báo `var`  với cách khai báo `let/const` trong ES2015 (bên cạnh sự khác nhau về scope của  `var` với `let/const`). Trong ES2015 (ES6) có một khái niệm mới đó là **Temporal Dead Zone** (TDZ), nghĩa là sẽ đưa ra một `ReferenceError` khi ta truy cập một biến trước khi nó được khởi tạo, thay vì trả về `undefined` như cách khai báo `var`.

## Temporal Dead Zone là gì?
Đây là cách giải thích của MDN về **Temporal Dead Zone**:
> In ECMAScript 2015, let bindings are not subject to Variable Hoisting, which means that let declarations do not move to the top of the current execution context. Referencing the variable in the block before the initialization results in a ReferenceError (contrary to a variable declared with var, which will just have the undefined value). The variable is in a “temporal dead zone” from the start of the block until the initialization is processed.

Khi sử dụng `let/const` để khai báo biến thì khi biến đó được tham chiếu trong `block` trước khi được khởi tạo (initialization), lúc đó kết quả trả về sẽ là `ReferenceError`, bởi vì biến sẽ nằm trong một khu vực gọi là **Temporal Dead Zone** từ lúc bắt đầu **block code** cho đến khi quá trình khởi tạo được diễn ra.

##  Variables lifecycle và Temporal Dead Zone
Chúng ta sẽ nói về  **variables lifecycle** để hiểu rõ hơn về lifecycle của biến và TDZ nằm ở đâu trong quá trình này.
Khi engine làm việc với các biến, lifecycle bao gồm những gia đoạn sau:
1. **Declaration**: đăng ký một biến trong scope
2. **Initialization**: cấp bộ nhớ cho biến trong scope. Tại bước này biến sẽ tự động khởi tạo giá trị là `undefined`
3. **Assignment**: gán giá trị cho biến đã được khởi tạo

Một biến ở trạng thái chưa được khởi tạo(unitialized state) là khi biến đó đã qua  giai đoạn **Declaration** nhưng chưa ở **Initialization**
![](https://images.viblo.asia/21386469-842d-4da2-b5da-db6985e6e9fa.jpg)
### `var` variables lifecycle
Chúng ta sẽ nói về cách engine xử lý biến được khái báo với `var`
![](https://images.viblo.asia/8bf7e87f-a133-45e5-bdcc-895aee474085.jpg)
Khi Javascript gặp một function scope với khai báo biến `var` ở bên trong, biến đó sẽ ở giai đoạn **declaration** và **initialization**  ngay tại lúc băt đầu function scope, trước khi thực thi bất cứ dòng lệnh nào, không phụ thuộc vào vị trí của câu lệnh khai báo `var` ở bên trong scope.

Sau khi đã **declaration** và **initialization** nhưng chưa đến giai đoạn **assignment** biến sẽ có giá trị là `undefined`.

Ở giai đoạn **assignment** `variable = 'value'` thì biến đã được khởi tạo giá trị.

Khái niệm **hoisting** chính là việc một biến được **declaration** và **initialization**  ngay tại lúc băt đầu function scope được mô tả ở trên.

Ví dụ:
```js
function modifyName() {
    console.log(name);  // undefined
    var name;
    name = "Lam";
    console.log(name);  // Lam
}
```
### `let` variables lifecycle
Biến được khai báo với `let` diễn ra khác hơn so với `var`, điểm khác biệt chính là ở giai đoạn **declaration** và **initialization** chúng diễn ra riêng biệt không như lifecycle của  `var`
![](https://images.viblo.asia/85ce68f3-bf70-4f3b-a30a-0223df8992a8.jpg)

Khi interpreter của javascript đi vào một block scope chứa câu lệnh khai báo `let`, ngay lập tức biến đó được đưa vào giai đoạn **declaration**, đăng ký là tên biến đã tồn tại trong scope.

Interpreter tiếp tục chạy các dòng tiếp theo.

Nếu bạn thực hiện truy cập biến ở giai đoạn này, Javascript sẽ đưa ra `ReferenceError: variable is not defined` bởi biến chưa ở trạng thái khởi tạo (uninitialized). Lúc này biến đang ở tồn tại ở nơi gọi là **temporal dead zone**.

Interpreter gặp câu lệnh khai báo biến `let` thì giai đoạn **initialization** mới được thông qua, khi này biến có giá trị là `undefined`.

Biến đó được đưa ra khỏi **temporal dead zone**.

Sau đó, khi một câu lệnh gán được thực thi, giai đoạn **assignment** được thông qua.

Với khai báo có dạng `let variable = 'value'` thì giai đoạn **initialization** và **assignment** cùng lúc.

Ví dụ:
```js
if (true) {  
  // console.log(name); // Throws ReferenceError
  let name;
  console.log(name); // undefined
  name = 'Lam';
  console.log(name); // Lam
}
```
## Tổng kết
Khai báo với `var` sẽ dễ vô tình gây ra lỗi, chính vì vậy trong ES2015 đã giới thiệu thêm từ khóa `let`.
Bởi vì giai đoạn **declaration** và **initialization** đã được tách ra nên việc **hoisting** không còn khi sử dụng `let`(bao gồm `const` và `class`). Trước khi **initialization**, biến sẽ ở trong **temporal dead zone** và nó không thể truy cập.
## Tham khảo
https://dmitripavlutin.com/variables-lifecycle-and-why-let-is-not-hoisted/
http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified