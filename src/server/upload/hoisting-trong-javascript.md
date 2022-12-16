# 1. Bài toán đưa ra.
Đoạn code sau in ra gì.
```javascript
a = 2;
var a;
console.log( a );
```

Nhiều lập trình viên sẽ nghĩ là `undefined` vì `var a` xuất hiện sau `a = 2`, và đương nhiên biến đó sẽ được định nghĩa lại theo tự nhiên, và sẽ là `undefined`. Nhưng kết quả là `2`.
![](https://images.viblo.asia/19e77161-9432-4e89-9849-f45d60d972e2.jpg)

Tiếp tục một ví dụ nhỏ nữa.
```javascript
console.log( a );
var a = 2;
```
Dựa theo đoạn code ở trên kia thì có thể bạn sẽ nghĩ rằng `2` sẽ được in ra, kiểu như hành vi tìm kiếm từ trên xuống được tối thiểu hóa. Một số người thì nghĩ rằng a được gọi trước khi khai báo, nên kết quả chắc chắn là `ReferenceError`.Không may, cả hai đều sai, kết quả là `undefined`.

![](https://images.viblo.asia/dd8ea1d8-74eb-443d-871d-3e44edc962e2.jpeg)

Vậy chuyện gì đã xảy ra? Điều gì đã khiến `javascript` `magic` đến vậy. Chúng ta cùng nhau giải đáp bài toán này nhé.
# 2. Giải quyết bài toán
Có thể bạn nghĩ rằng JavaScript được thông dịch theo từng dòng, từ trên xuống dưới khi thực thi chương trình. Đúng là vậy, nhưng lại có một phần giả định đó sẽ dẫn đến suy nghĩ sai. Cụ thể là ví dụ đầu bài mình đã đưa ra.

Khi bạn thấy `var a = 2;`, bạn có thể nghĩ nó là một câu lệnh. Nhưng thực tế thì JavaScript hiểu nó là hai lệnh: `var a`; và `a = 2`;. Câu lệnh đầu tiên, khai báo sẽ được xử lý trong giai đoạn `biên dịch`. Câu lệnh thứ hai, phép gán , được đặt đúng chỗ cho giai đoạn `thực thi`.
Đoạn code đầu của chúng ta có thể được viết như thế này:
```javascript
var a;
a = 2;
console.log( a );
```

Phần đầu là biên dịch và phần sau là thực thi.

Tương tự, đoạn code thứ 2 có thể ghi như sau:
```javascript
var a;
console.log( a );
a = 2;
```
Do đó, một cách suy nghĩ về tiến trình này theo cách ẩn dụ rằng khai báo biến và hàm được “chuyển” đến nơi chúng xuất hiện trong luồng code đến đầu code. Điều này dẫn đến cái tên `“hoisting”`

> Vì vậy, cách tốt nhất để nghĩ về hoisting là: các khai báo biến
và hàm đó được xử lý trước khi thực thi
# 3. Hoisting với hàm
Cùng xem ví dụ sau.
```javascript
foo();
function foo() {
    console.log( a ); // undefined
    var a = 2;
}
```
Khai báo hàm `foo` được `hoisting`, sao cho việc gọi hàm ở dòng đầu tiên có thể thực hiện được.
Đồng thời cũng rất quan trọng để chú ý rằng `hoisting` theo từng `scope`. Đoạn code trước của ta đơn giản là nó một scope toàn cục, hàm `foo(..)` mà chúng ta thực hiện ở đây chính nó cho thấy `var a` được chuyển lên trên cùng của `foo(..)`.
Vì vậy chương trình có lẽ giải thích chính xác như sau
```javascript
function foo() {
    var a;
    console.log( a ); // undefined
    a = 2;
}
foo();
```
**Khai báo hàm được đưa lên trên nhưng biểu thức hàm thì không.**
```javascript
foo(); // not ReferenceError, but TypeError!
var foo = function bar() {
    // ...
};
```
Định danh biến `foo` được đưa lên và gắn với `scope` của toàn bộ chương trình (toàn cục), vì vậy `foo()` không thất bại với lỗi `ReferenceError`. Nhưng `foo` lại chưa có giá trị nào (mà nó phải có
vì nó là khai báo hàm chứ không phải biểu thức). Vì vậy, khi foo() có gắng tìm giá trị undefined, thì lại bị TypeError.
Và cũng nhắc lại rằng cho dù là một biểu thức hàm được đặt tên, tên định danh của nó cũng không có trong toàn bộ scope:
```javascript
foo(); // TypeError
bar(); // ReferenceError
var foo = function bar() {
    // ...
};
```
Đoạn này cần diễn đạt chính xác (có hoisting) hơn như sau:
```javascript
var foo;
foo(); // TypeError
bar(); // ReferenceError
foo = function() {
var bar = ...self...
// ...
}
```
# 4. Thứ tự Hoisting
Cả khai báo hàm và biến đều được hoist. **Nhưng có một chi tiết tinh vi rằng hàm được đưa lên trước, sau mới tới biến.**

```javascript
foo(); // 1
var foo;

function foo() {
    console.log( 1 );
}

foo = function() {
    console.log( 2 );
};
```
Giá trị `1` được in ra thay vì `2`! Đoạn code này được diễn dịch bởi `Engine` như sau:
```javascript
function foo() {
    console.log( 1 );
}

foo(); // 1

foo = function() {
    console.log( 2 );
};
```
Để ý rằng khai báo `var foo` đã trùng lặp (và bị bỏ qua), mặc dù nó đến trước khai báo function `foo()`...,bởi khai báo hàm được đưa lên trước các biến thông thường. Trong khi khai báo `var` trùng lặp nhiều lần được bỏ qua thì khai báo hàm tiếp theo lại ghi đè lên hàm trước.
Ví dụ cho trường hợp này 
```javascript
foo(); // 3

function foo() {
    console.log( 1 );
}

var foo = function() {
    console.log( 2 );
};

function foo() {
    console.log( 3 );
}
```
Mặc dù có vẻ nó không có gì thú vị hơn về mặt học thuật, nhưng nó làm nổi bật sự trùng lặp trong cùng một scope và là một ý tồi dẫn đến kết quả khó hiểu.
# 5. Tóm lại
Bài toán đầu bài có thể đọng lại vài thứ trong javascript như sau.


* Chúng ta có thể thấy `var a = 2;` là một câu lệnh nhưng `JavaScript Engine` lại không. Nó thấy `var a` và `a = 2` như là hai câu lệnh riêng biệt, cái đầu là ở giai đoạn `biên dịch` và cái thứ hai là giai đoạn `thực thi`.

* Điều này dẫn đến tất cả các khai báo trong scope dù nó ở đâu, cũng được xử lý trước khi đoạn code được thực thi. 

* Bạn có thể hình dung được điều này khi các khai báo (biến và hàm) “dời” lên đầu của phạm vi tương ứng, gọi là “hoisting”.

* Bản thân khai báo đã được hoist, nhưng phép gán, kể cả gán biểu thức hàm, thì không được hoist.

* Cần cẩn thận cho khai báo trùng lặp, đặc biệt là sự pha trộn giữa khai báo var thông thường và khai báo hàm, **nguy hiểm luôn rình rập**.
# 6. Tham khảo
Bài viết được dịch từ cuốn [You-Dont-Know-JS.](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch4.md)

Trong cái thời buổi loạn lạc của javascript. Mỗi ngày có hàng tá thư viện, framework của javascript như hiện nay. Ta cứ học chắc cái **vanilla Javascript** khả năng lại hay :v: