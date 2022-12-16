Trong JavaScript có một số giá trị đặc biệt mà các developer cần chú ý và sử dụng một cách đúng đắn hơn. Có thể có người đã biết hoặc chưa biết. Bài viết sau đây xin đúc kết một số trường hợp.

# Giá trị Nonvalue

Cả `undefined` và `null` đều được sử dụng để thể hiện một giá trị "rỗng" hay không có giá trị. Ta có thể hiểu sự khác biệt của nó như sau:
- `null` được coi là một object, và object đó thể hiện một giá trị rỗng.
- `undefined` có nghĩa là chưa có giá trị nào hết

## Undefined
Có một điều hơi "quái" ở trong JS khi ta làm việc với giá trị này. Đó là khi ở chế độ `non-strict`, ta có thể gán một giá trị cho `undefined`. WTF?
Và tất nhiên là điều này không bao giờ được khuyến khích.
```
function foo() {
    undefined = 2; // realy bad idea~
}

foo();

function foo() {
    "use strict";
    undefined = 2; // Type Error!
}

foo();
```
Và trong cả chế độ `strict` và `non-strict`, ta đều có thể tạo biến local có tên là `undefined`. (facepalm)
Tất nhiên đây cũng là một trò không thể mê được.
```
function foo() {
    "use strict";
    var undefined = 2;
    console.log(undefined);
}

foo();
```
Anh em đừng để cái việc override lại `undefined` này xảy ra nhé, hậu quá khó lường đấy.

### Toán tử void
Có một cách khác để ta lấy được giá trị `undefined` thay vì gọi trực tiếp `undefined`. Đó là sử dụng toán tử `void`.
Câu lệnh `void ___` sẽ vứt hết tất cả giá trị đứng trước đi và trả lại `undefined`. Nó không thay đổi giá trị của toán hạng đứng trước nó, nó chỉ đơn thuần là đảm bảo không có một giá trị nào được trả ra sau lệnh đó.
```
var a = 42;

console.log(void a, a); // undefined 42
```
Theo convention của C ngày xưa thì khi muốn thể hiện một giá trị `undefined` với `void`, thì ta gọi `void 0`. Cơ mà thực tế thì chả có cái gì khác giữa việc gọi `void 0`, `void 1` hay `void true` cả.

Việc sử dụng toán tử `void` này cũng hữu ích trong một số trường hợp, nếu ta cần chắc chắn rằng một câu lệnh nào đó không trả về giá trị. Ví dụ:
```
function doSomething() {
    // note: `APP.ready` là biến mình tự tạo nhé
    if (!APP.ready) {
        // try again later
        return void setTimeout(doSomething, 100);
    }
    var result;
    // làm gì đó linh tinh để sinh kết quả
    return result;
}

// ta chưa thể thực hiện ngay bây giờ?
if (doSomething()) {
    // thì đi xử lý task khác trước thôi
}
```
Ở đây, hàm `setTimeout(...)` trả về một giá trị numeric (unique id của timer, ta sử dụng trong trường hợp muốn cancel nó), nhưng chúng ta thì chỉ muốn nếu hàm chưa thực hiện được thì trả giá trị trống để có thể dễ dàng check với if else, thế nên ta xài `void` cho nó tiện như ở trên.
Tuy nhiên nhiều dev thích tách riêng hai action ra, kết quả vẫn giống nhau nhưng không xài đến toán tử `void`:
```
if (!APP.ready) {
    // try again later
    setTimeout(doSomething, 100);
    return;
}
```
Cũng ít khi có trường hợp mà ta cần thay thế giá trị trả về từ một câu lệnh bằng `undefined`. Nhưng nếu có, thì toán tử `void` sẽ trở nên hữu ích.

# Các Number đặc biệt
Kiểu `number` cũng có một vài giá trị đặc biệt. Ta sẽ xem xét dưới đây.

## Số "không phải số"
Bất kì phép toàn nào mà ta thực thi mà một trong hai toán hạng không phải `number` (hoặc giá trị của nó không thể được thông dịch thành `number` ở dạng base 10 hoặc base 16), phép toán sẽ đưa về một kết quả fail nhưng vẫn thuộc kiểu `number`, và người ta gọi đó là giá trị `NaN`.
`NaN` là viết tắt của "not a number", có nghĩa là "không phải số". Cái tên này khá là đểu. Sẽ chính xác hơn nếu ta coi `NaN` là một "invalid number", "failed number" hay thậm chí là "bad number" hơn là nghĩ nó theo kiểu "not a number".
Ví dụ:
```
var a = 2 / "foo"; // NaN

typeof a === "number"; // true
```
Hay nói cách khác, kiểu giá trị của "not a number" là "number". Hô hô thặc là bối rối.

`NaN` thể hiện một giá trị về điều kiện lỗi đặc biệt nằm trong tập các giá trị của `number`. Điều kiện lỗi đó có thể được hành văn như sau: "Tôi thực thi một phép toán cơ mà nó fail, thế nên đây là cái kết quả fail mà tôi nhận được".
Vì thế, nếu ta có một giá trị của một variable và muốn kiểm tra xem đây có phải `NaN` không, ta thường nghĩ đến việc so sánh trực tiếp nó với `NaN`, như ta vẫn thường làm với `undefined` hay `null`. Nhưng làm thế là hỏng hẳn đó.
```
var a = 2 / "foo";

a == NaN; // false
a === NaN; // false
```
`NaN` là một giá trị đặc biệt mà nó không thể so sánh bằng với một giá trị `NaN` nào khác (hay gọi là nó không thể bằng chính nó cũng được). Và đây là giá trị duy nhất không có tính reflexive (đặc tính duy nhất x === x). Vì thế nên `NaN !== NaN`, hô hô.
Thế thì giờ làm như nào để test được cái giá trị đấy nếu ta không thể so sánh với `NaN`?
```
var a = 2 / "foo";
isNaN(a); // true
```
Ez chưa, chúng ta sử dụng một built-in utility function gọi là `isNaN(...)` và nó sẽ cho ta biết giá trị truyền vào có phải NaN hay không. Problem solved!

Cơ mà chưa nhanh thế đâu.

Hàm `isNaN(...)` có một điểm chết. Đó là nó đơn thuần chỉ kiểm tra cái biến truyền có phải "Not a Number" hay không, thế nên sẽ xảy ra trường hợp như sau:
```
var a = 2 / "foo";
var b = "foo";

a; // NaN
b; // "foo"

window.isNaN(a); // true
window.isNaN(b); // true, oạch!
```
Thì đúng ra mà nói, "foo" thực thế là "not a number", nhưng nó không mang giá trị `NaN`. Cái bug này đã xuyên suốt JS từ những ngày đầu tiên.

Với ES6, cuối cùng thì cái utility này đã được xử lý lại: `Number.isNaN(..)`. Với pre-ES6 browser, ta có thể polyfill cái hàm này như sau:
```
if (!Number.isNaN) {
    Number.isNaN = function(n) {
        return (
            typeof n === "number" && window.isNaN(n);
        );
    };
}
var a = 2 / "foo";
var b = "foo";

Number.isNaN(a); // true
Number.isNaN(b); // false
```
Thực ra chúng ta có thể polyfill `Number.isNaN(..)` dễ hơn dựa vào tính chất của `NaN` là giá trị duy nhất không tự bằng với chính nó.
```
if (!Number.isNaN) {
    Number.isNaN = function(n) {
        return n !== n;
    };
}
```
Dị phết nhưng nó hơi bị ngon đấy.

Các giá trị `NaN` thực tế được sinh ra rất nhiều ở các JS programs, dù là lỗi lầm hay có chủ đích. Sẽ là một ý tưởng tốt nếu ta có một hàm kiểm tra tin cậy, như hàm `Number.isNaN(..)`, để phát hiện một cách đúng đắn.

## Infinity
Developer đến từ những ngôn ngữ biên dịch truyền thống như C thường hay thấy giá trị này theo một lỗi biên dịch hoặc runtime exception, như kiểu "chia cho 0":
```
var a = 1 / 0;
```
Tuy nhiên, trong JS, phép toán này được định nghĩa rõ ràng và kết quả trả về là một giá trị `Infinity` (hay Number.POSITIVE_INFINITY). Cũng không ngạc nhiên khi:
```
var a = 1 / 0; // Infinity
var b = -1 / 0; // -Infinity
```
Khi thực hiện chia cho 0 với giá trị âm, kết quả trả về sẽ là `-Infinity` (hay Number.NEGATIVE_INFINITY).

JS sử dụng IEEE 754 floating-point để thể hiện số, do đó nó sẽ có hiện tượng overflow ngay cả với phép toán cộng và trừ, trong trường hợp ấy ta sẽ nhận được giá trị `Infinity` và `-Infinity`.
Ví dụ:
```
var a = Number.MAX_VALUE; // 1.7976931348623157e+308
a + a;                    // Infinity
a + Math.pow(2, 970);     // Infinity
a + Math.pow(2, 969);     // 1.7976931348623157e+308
```
Theo như đặc tả, nếu một phép toán như cộng trả về một giá trị quá lớn để có thể present, IEEE 754 sẽ "làm tròn về phía gần nhất" của giá trị. Vì thế nên, `Number.MAX_VALUE + Math.pow(2, 969)` gần `Number.MAX_VALUE` hơn so với `Infinity`, do đó nó làm tròn xuống, còn `Number.MAX_VALUE + Math.pow(2, 970)` gần hơn với `Infinity` thế nên là nó làm tròn lên. Nhưng mà thôi đừng nghĩ quá nhiều về cái vấn đề này làm gì đau đầu.

Một khi overflow về một chiều nào đó của *infinities*, ta sẽ không thể quay lại được giá trị ban đầu. Hay nói cách khác, ta chỉ có thể đi từ hữu hạn tới vô hạn nhưng không thể đi từ vô hạn về hữu hạn.

Nếu bạn còn nhớ một câu hỏi thời còn đi học: "Kết quả sẽ là gì khi một số vô hạn chia cho một số vô hạn?". Đầu óc ngây thơ của chúng ta có thể nghĩ là nó bằng 1 hoặc bằng "vô hạn". Cả hai đều sai, trong cả toán học và JS. `Infinity / Infinity` không được định nghĩa là một phép toán. Trong JS, kết quả trả về `NaN`.

Nhưng nếu có một số dương hữu hạn nào đó chia cho `Infinity`?. Đơn giản thôi, 0. Và sẽ thế nào nếu một số âm hữu hạn chia cho `Infinity`? Mời đọc tiếp phần dưới.

## Zero
Có thể điều này sẽ gây bối rối cho những người đọc với một cái đầu thuần toán học. nhưng JavaScript có cả số 0 bình thường (hay còn gọi là số 0 dương +0) và một số 0 âm -0. Trước khi ta đi giải thích tại sao -0 tồn tại, ta sẽ xem JS xử lý những thứ này như thế nào. Bên cạnh việc thể hiện dưới ký hiệu -0, số 0 âm còn là kết quả sinh ra từ một số phép toán. Ví dụ
```
var a = 0 / -3; // -0
var b = 0 * -3; // -0
```
Phép cộng và trừ không thể sản sinh ra số 0 âm.

Số 0 âm khi log trên developer console thường hiển thị -0, tuy nhiên một số browser cũ vẫn hiển thị 0.
Mặc dù vậy, có một điều kì lạ là khi ta stringify một giá trị 0 âm, kết quả sẽ là "0".
```
var a = 0 / -3;
// một số browser vẫn hiển thị đúng
a; // -0

// cơ mà khi ta chuyển nó sang string thì lại sai
a.toString();  // "0"
a + "";        // "0"
String(a);     // "0"

// thậm chí là JSON
JSON.stringify(a); // "0"
```
Cơ mà được cái là nếu chuyển từ `string` sang `number` thì vẫn đúng:
```
+ "-0";           // -0
Number("-0");     // -0
JSON.parse("-0"); // -0
```
Ngoài việc stringify đưa sai sự thật, thì ta cũng cần phải chú ý vì khi so sánh cũng có vấn đề:
```
var a = 0;
var b = 0 / -3;

a == b;   // true
-0 == 0;  // true

a === b;  // true
-0 === 0; // true

0 > -0; // false
a > b;  // false
```
Rõ ràng với tất cả các tính chất trên, nếu như ta có ý định phân biệt -0 và 0 trong code, ta không thể nào chỉ dựa vào những cách so sánh thông thường, thay vào đó ta cần triển khai 1 hàm để kiểm tra:
```
function isNegZero(n) {
    n = Number(n);
    return (n === 0) && (1 / n === -Infinity);
}
isNegZero(-0);      // true
isNegZero(0 / -3);  // true
isNegZero(0);       // false
```

Còn bây giờ thì là câu hỏi tại sao chúng ta phải cần số 0 âm?

Có một vào ứng dụng nhất định mà developer sử dụng độ lớn của số để thể hiện một phần thông tin (ví dụ như tốc độ chuyển động của animation frame) và dấu của số để thể hiện một phần thông tin khác (ví dụ như chiều của chuyển động). Trong những ứng dụng đó, nếu một biến dịch chuyển dần tới 0 và mất đi dấu của nó, ta sẽ mất đi một phần thông tin về hướng mà biến đó di chuyển tới 0. Giữ đúng dấu của số 0 sẽ ngăn việc tạo ra những mất mát thông tin không mong muốn.

# Special Equality
Như ta có thể thấy ở các phần trên, giá trị `NaN` và giá trị `-0` có những behaviour rất đặc biệt khi sử dụng trong so sánh bằng. `NaN` thì không bằng chính nó, còn `-0` thì lại bằng với `0`.
Với ES6, có một hàm utility mới mà ta có thể sử dụng để kiểm tra tính bằng nhau của các giá trị đặc biệt này, mà không xảy ra bất kì exception nào. Hàm đó là `Object.is(..)`:
```
var a = 2 / "foo";
var b = -3 * 0;

Object.is(a, NaN);  // true
Object.is(b, -0);   // true

Object.is(b, 0);    // false
```
Có một polyfill khá là đơn giản cho hàm này để sử dụng ở các môi trường pre-ES6:
```
if (!Object.is) {
    Object.is = function(v1, v2) {
        // test for `-0`
        if (v1 === 0 && v2 === 0) {
            return 1 / v1 === 1 / v2;
        }
        // test for `NaN`
        if (v1 !== v1) {
            return v2 !== v2;
        }
        // everything else
        return v1 === v2;
    }
}
```
Không nên sử dụng `Object.is(..)` khi ta biết chắc rằng việc sử dụng `==` hoặc `===` đảm bảo an toàn. Việc sử dụng toán tử đem lại hiệu quả cao hơn và chắc chắn là thông dụng hơn. `Object.is(..)` phần lớn được sử dụng cho những trường hợp so sánh bằng đặc biệt.


-----
*Tham khảo từ cuốn You don't know JS - Types & Grammar của Kyle Simpson*