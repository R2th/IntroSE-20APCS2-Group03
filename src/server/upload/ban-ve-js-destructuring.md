Một trong những feature khá hay ho của ES6 gọi là *destructuring*. Hôm nay chúng ta hãy cùng tìm hiểu về *destructuring* nhé.

---
Xem xét ví dụ
```javascript
function foo() {
    return [1, 2, 3];
}

var tmp = foo();
a = tmp[0], b = tmp[1], c = tmp[2];

console.log(a, b, c); // 1 2 3
```
Như bạn có thể thấy, chúng ta tạo ra một phép gán thủ công những giá trị trong mảng trả về từ hàm `foo()` vào trong các giá trị riêng biệt `a`, `b`, `c`, và để làm vậy không may là chúng ta phải cần thêm 1 biến `tmp`.

Ta có thể làm tương tự với objects:
```javascript
function bar() {
    return {
        x: 4,
        y: 5,
        z: 6
    };
}

var tmp = bar();
x = tmp.x, y = tmp.y, z = tmp.z;

console.log(x, y, z); // 4 5 6
```
Hành động gán thủ công các indexed value từ một mảng hay các property của một object có thể hiểu là *structured assignment*. Với ES6, việc này gọi là *destructuring assignment*.

ES6 giới thiệu cú pháp dành cho *array destructuring* và *object destructuring*, giúp loại bỏ việc phải sử dụng biến `tmp` và cái đống loằng ngoằng kèm theo:
```javascript
var [a, b, c] = foo();
var { x: x, y: y, z: z } = bar();

console.log(a, b, c); // 1 2 3
console.log(x, y, z); // 4 5 6
```
Ta vẫn thường hay thấy `[a, b, c]` ở bên phải của phép gán, với vai trò là giá trị được gán.

Destructuring sẽ lật ngược lại, `[a, b, c]` sẽ nằm bên trái phép gán và được xem như là một "pattern" để phân tách các giá trị của mảng bên tay phải thành từng phép gán riêng lẻ.

Tương tự như vậy, `{ x: x, y: y, z: z }` cũng chỉ định một "pattern" để phân tách giá trị của object trả về từ `bar()` vào các phép gán riêng biệt.

# Object Property Assignment Pattern
Đào sâu vào cú pháp `{ x: x, .. }` từ đoạn code trước. Nếu tên property khớp với tên variable mà ta muốn khai báo, ta có thể rút ngắn cú pháp lại:
```javascript
var { x, y, z } = bar();

console.log(x, y, z); // 4 5 6
```
Ngon hơn đúng ko?

Có một câu hỏi là khi ta rút ngắn như vậy thì thực chất là ta đã bỏ phần `x:` hay phần `: x` vậy?

Thực tế là ta đã bỏ phần `x:`, có thể bạn sẽ nghĩ ôi dào quan trọng gì, thế cả mà. Nhưng cú pháp đầy đủ là thứ cần thiết nếu ta muốn khai báo tên biến khác với tên property.
```javascript
var { x: bam, y: baz, z: bap } = bar();

console.log(bam, baz, bap); // 4 5 6
console.log(x, y, z); // ReferenceError
```
Có thể bạn sẽ nhận ra điều gì đó khi xem xét cú pháp gán của object:
```javascript
var X = 10, Y = 20;

var o = { a: X, b: Y };

console.log(o.a, o.b); // 10 20
```
Trong `{ a: X, b: Y }`, ta thấy rằng `a` là object property, và `X` là source value được gán cho `a`. Hay có thể nói rằng pattern mà ta có ở đây là  `target: source`.
Tuy nhiên, khi ta sử dụng object destructuring assignment, ngoài việc đảo ngược từ phải sang trái, pattern ở đây cũng bị đảo thành `source: target`.
```javascript
var { x: bam, y: baz, z: bap } = bar();
```
Với `x: bam` ở đây thì `x` là source value và `bam` là target variable để assign vào. Thấy sự lộn xào chưa anh em :v: 

Tuy nhiên cũng có thể có một cách nghĩ khác để bớt confuse hơn như thế này:
```javascript
var aa = 10, bb = 20;

var o = { x: aa, y: bb };
var     { x: AA, y: BB } = 0;

console.log(AA, BB); // 10 20
```
Có nghĩa là ở dòng `{ x: aa, y: bb }`, `x` và `y` thể hiện object property, ở dòng `{ x: AA, y: BB }`, `x` và `y` cũng vẫn giữ nhiệm vụ là object property. Đại thể thì cứ với cú pháp object thì cái phần đứng trước sẽ luôn là property, hiểu vậy cũng ổn.

# Không chỉ là khai báo
Cho đến hiện tại, chúng ta toàn sử dụng destructuring assignment kèm với khai báo `var`. Tất nhiên, ta cũng có thể sử dụng `let`  hay `const`, nhưng destructuring là một phép gán tổng quát, không nhất thiết phải gắn với phép khai báo.
```javascript
var a, b, c, x, y, z;

[a, b, c] = foo();
({ x, y, z } = bar());

console.log(a, b, c); // 1 2 3
console.log(x, y, z); // 4 5 6
```
Nghĩa là ta có thể khai báo biến trước, rồi thích gán lúc nào thì gán.
> Với object destructuring, khi không có `var`/`let`/`const` để khai báo, thì ta phải bọc phép gán vào trong một cặp `( )`, bởi vì `{ }` ở bên trái phép gán sẽ được hiểu thành một block chứ không phải một object.

Thực tế, các biểu thức gán (`a`, `y`,...) không nhất thiết phải là variable. Chỉ cần là cái gì hợp lệ cho một biểu thức gán. Ví dụ:
```javascript
var o = {};

[o.a, o.b, o.c] = foo();
({ x: o.x, y: o.y, z: o.z } = bar());

console.log(o.a, o.b, o.c); // 1 2 3
console.log(o.x, o.y, o.z); // 4 5 6
```
Ta có thể sử dụng cả computed property trong destructuring:
```javascript
var which = "x";
o = {};

({ [which]: o[which] } = bar());

console.log(o.x); // 4
```
Ta có thể sử dụng để làm object mapping/transformation:
```javascript
var o1 = { a: 1, b: 2, c: 3 }, o2 = {};

({ a: o2.x, b: o2.y, c: o2.z } = o1);

console.log(o2.x, o2.y, o2.z); // 1 2 3
```
Hoặc có thể map object vào array:
```javascript
var o1 = { a: 1, b: 2, c: 3 }, a2 = [];

({ a: a2[0], b: a2[1], c: a2[2] } = o1);

console.log(a2); // [1, 2, 3]
```
Hoặc ngược lại
```javascript
var a1 = [1, 2, 3], o2 = {};

[o2.a, o2.b, o2.c] = a1;

console.log(o2.a, o2.b, o2.c); // 1 2 3
```
Hoặc ta có thể reorder 1 array sang 1 array khác:
```javascript
var a1 = [1, 2, 3], a2 = [];

[a2[2], a2[0], a2[1]] = a1;

console.log(a2); // [2, 3, 1]
```
Thậm chí là giải quyết bài toán swap mà khỏi cần biến `tmp`:
```javascript
var x = 10, y = 20;

[y, x] = [x, y];

console.log(x, y); // 20 10
```

## Destructuring Assigment Expressions
Một phép gán với object destructuring hay array destructuring sẽ có kết quả trả về là biểu thức bên tay phải.
```javascript
var o = { a: 1, b: 2, c: 3 }, a, b, c, p;

p = { a, b, c } = o;

console.log(a, b, c); // 1 2 3
p === o;              // true
```
Trong đoạn code trên, kết quả trả về của `{ a, b, c } = o;` là `o`, và `p` khi đó được gán lại cho `o`. Tương tự với array:
```javascript
var o = [1, 2, 3], a, b, c, p;

p = [a, b, c] = 0;

console.log(a, b, c); // 1 2 3
p === o;              // true
```
Với tính chất như vậy, ta có thể tạo ra một chuỗi destructuring assignment expression:
```javascript
var o = { a: 1, b: 2, c: 3 },
p = [4, 5, 6],
a, b, c, x, y, z;

({ a } = { b, c } = o);
[x, y] = [z] = p;

console.log(a, b, c); // 1 2 3
console.log(x, y, z); // 4 5 6
```
# Đủ là được
Với cả array destructuring assignment và object destructuring assignment, bạn không cần phải lấy tất cả giá trị có trong object hay array.
```javascript
var [, b] = foo();
var { x, z } = bar();

console.log(b, x, z); // 2 4 6
```
Giá trị `1` và`3` gửi ra từ `foo()` bị discard, cũng như giá trị `5` của `bar()`.

Tương tự như vậy, nếu ta lấy nhiều giá trị hơn nhưng gì mà array hay object có, thì cái mà ta nhận được sẽ là `undefined`
```javascript
var [,, c, d] = foo();
var { w, z } = bar();

console.log(c, z); // 3 6
console.log(d, w); // undefined undefined
```
Nếu bạn đã biết đến toán tử spread `...`, thì ngoài việc dùng nó để spread giá trị của một array ra thì nó còn có thể làm ngược lại đó là nhóm một tập giá trị vào thành một array.
```javascript
var a = [2, 3, 4];
var b = [1, ...a, 5];

console.log(b); // [1, 2, 3, 4, 5]
```
Như ta thấy, `...a` đã spread mảng `a` ra, còn nếu ta đặt `...` trong array destructuring, nó sẽ thực hiện nhóm các giá trị lại thành một array:
```javascript
var a = [2, 3, 4];
var [b, ...c] = a;

console.log(b, c); // 2 [3, 4]
```
Cú pháp `var [ .. ] = a` phân tách `a` ra sao cho phù hợp với pattern nằm trong `[ .. ]`. Và ở đây thì giá trị đầu tiên của `a` sẽ được gán vào `b`, các giá trị còn lại của `a` sẽ được gom thành 1 mảng và gán vào `c`.
# Default Value Assignment
Destructuring cũng có thể có giá trị default khi gán, điều này cực kì có lợi khi object mà ta lấy ra không có key mong muốn do lỗi API hoặc lý do nào khác.
```javascript
var [a = 3, b = 6, c = 9, d = 12] = foo();
var { x = 5, y = 10, z = 15, w = 20 } = bar();

console.log(a, b, c, d); // 1 2 3 12
console.log(x, y, z, w); // 4 5 6 20
```
Ta có thể dùng cú pháp default value với cả cú pháp destructuring đầy đủ:
```javascript
var { x, y, z, w: WW = 20 } = bar();

console.log(x, y, z, WW); // 4 5 6 20
```
Tuy nhiên, tránh hack não đồng nghiệp khi sử dụng default value là object hay array
```javascript
var x = 200, y = 300, z = 100;
var o1 = { x: { y: 42 }, z: { y: z } };

({ y: x = { y: y } } = o1 );
({ z: y = { y: z } } = o1 );
({ x: z = { y: x } } = o1 );
```
Mời bạn luận kết quả cuối cùng của cái đống trên.
```javascript
console.log(x.y, y.y, z.y); // 300  100 42
```
Destructuring rất ngon và hữu dụng, nhưng nó cũng rất thốn nếu ta muốn ai đó lắc não cả ngày.
# Nested Destructuring
Nếu những giá trị mà ta destructuring có nested object hay array, ta có thể destructure cả những giá trị đó nữa luôn:
```javascript
var a1 = [1, [2, 3, 4], 5];
var o1 = { x: { y: { z: 6 } } };

var [a, [b, c, d], e] = a1;
var { x: { y: { z: w } } } = o1;

console.log(a, b, c, d, e); // 1 2 3 4 5
console.log(w);             // 6
```
Nested destructuring có thể là một cách đơn giản để flatten out object namespaces:
```javascript
var App = {
    model: {
        User: function(){ .. }
    }
};

// instead of:
// var User = App.model.User;

var { model: { User } } = App;
```
# Destructuring Parameters
Ta có thể sử dụng destructuring ở trong cả parameter của function.
```javascript
function foo(x) {
    console.log(x);
}

foo(42);
```
Ở đây phép gán đã bị ẩn: argument 42 được gán vào parameter x khi `foo(42)` thực thi. Nếu cặp parameter/argument là một phép gán, vậy phép gán này hẳn cũng có thể destructure? Chuẩn rồi.
Và dưới đây là ví dụ với array:
```javascript
function foo([x, y]) {
    console.log(x, y);
}

foo([1, 2]);   // 1 2
foo([1]);      // 1 undefined
foo([]);       // undefined undefined
```
Ví dụ với object:
```javascript
function foo({ x, y}) {
    console.log(x, y);
}

foo({ y: 1, x: 2 }); // 2 1
foo({ y: 42 });      // undefined 42
foo({});             // undefined undefined
```
Cái technique này có thể dùng như kiểu named arguments, một feature từng được request cho JS, mà giờ đây nó đã xuất hiện trong các ngôn ngữ mới như Swift, Kotlin,...

Tất nhiên là tất cả các tính chất của destructuring ta bàn luận ở trên đều đúng với parameter destructuring, bao gồm nested destructuring, default value,... Destructuring cũng kết hợp ngon lành với các tính năng của ES6 function parameter như default parameter value và rest/gather parameter.
```javascript
function f1([x = 2, y = 3, z]) { .. }
function f2([x, y, ...z], w) { .. }
function f3([x, y, ...z], ...w) { .. }

function f4({ x: X, y }) { .. }
function f5({ x: X = 10, y = 20 }) { .. }
function f6({ x = 10 } = {}, { y } = { y: 10 }) { .. }
```
Lấy một trong các ví dụ trên và chạy thử để minh hoạ:
```javascript
function f3([x, y, ...z], ...w) {
    console.log(x, y, z, w);
}

f3([]);                   // undefined undefined [] []
f3([1, 2, 3, 4], 5, 6);   // 1 2 [3, 4] [5, 6]
```
Có hai toán tử `...` sử dụng ở đây, cái đầu tiên để gom phần tử còn lại trong mảng đầu tiên, cái thứ hai để gom các biến còn lại trong hàm.

## Destructuring Default + Parameter Default
Có một điểm mập mờ mà ta nên chú ý đó là sự khác biệt giữa destructuring default và function parameter default
```javascript
function f6({ x = 10 } = {}, { y } = { y: 10 }) {
    console.log(x, y);
}

f6(); // 10 10
```
Đầu tiên, nhìn có vẻ giống như ta đang khởi tạo giá trị default là 10 cho cả `x` và `y` nhưng theo hai cách khác nhau. Nhưng tuy nhiên, hai cách này sẽ xử lý khác nhau trong một số trường hợp nhất định, và kết quả thì cũng sẽ khá thốn.
```javascript
f6({}, {});   // 10 undefined
```
Khá là rõ ràng rằng `x` sẽ mặc định là 10 nếu ta không truyền x vào object param đầu tiên.

Còn về `y` tại sao lại là `undefined`? Giá trị `{ y: 10 }` là một object dành cho function param default value, không phải là một destructuring default value. Như vậy, giá trị này chỉ có ý nghĩa khi param thứ 2 của hàm không được truyền vào hoặc truyền `undefined`.

Trong lệnh trên, ta truyền vào tham số thứ 2 của hàm một object rỗng, do đó giá trị mặc định `{ y: 10 }` sẽ không được sử dụng, và `{ y }` destructuring sẽ xảy ra với object rỗng truyền vào.

Giờ so sánh xem `{ y } = { y: 10 }` với `{ x = 10 } = {}`. Kết quả của x và y sẽ là gì?
Cùng xem một vài ví dụ:
```javascript
function f6({ x = 10 } = {}, { y } = { y: 10 }) {
    console.log(x, y)
}

f6();                          // 10 10
f6(undefined, undefined);      // 10 10
f6({}, undefined);             // 

f6({}, {});                    // 10 undefined
f6(undefined, {});             // 10 undefined

f6({ x: 2 }, { y: 3 });        // 2 3
```
Chúng ta cần hiểu rõ sự khác biệt giữa `{ x = 10 } = {}` với `{ y } = { y: 10 }` để tránh khỏi những giây phút ngu người nhé.

---
# Kết
Hy vọng bài viết sẽ là một nguồn tham khảo hữu ích cho những ai yêu thích JavaScript và muốn một sự tổng kết về Destructuring.

---
*Dịch và tham khảo từ [You Don't Know JS: ES6 and Beyond - Kyle Simpson](https://www.amazon.com/You-Dont-Know-JS-Beyond-ebook/dp/B019HRGOPQ)*