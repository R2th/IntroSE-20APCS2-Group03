Loose equal là toán tử `==`, và strict equal là toán tử `===`. Cả hai toán tử này đều được sử dụng để so sánh hai giá trị xem nó có "bằng nhau" hay không, nhưng giữa "loose" và "strict" có những điểm khác biệt rất quan trọng, đặc biệt là cách mà chúng xác định thế nào là "bằng nhau".

Một trong những sai lầm phổ biến về hai toán tử này là: "`==` kiểm tra giá trị có bằng hay không, còn `===` kiểm tra cả giá trị và kiểu có giống nhau hay không". Nghe thì có vẻ dễ hiểu và có lý, nhưng hiểu như thế là sai hẳn. Có một vài quyển sách và blogs nói như trên, cơ mà đen là các bạn ý đã nhầm.

Mô tả chính xác thì phải là: "`==` cho phép ép kiểu xảy ra trong khi so sánh còn `===` thì không cho ép kiểu".

# Performance khi thực hiện so sánh
Hãy dừng lại một chút và nghĩ về sự khác biệt giữa lời giải thích thứ nhất (lời giải thích không chính xác) và thứ hai (lời giải thích chính xác) dưới đây.

Lời giải thích đầu tiên cho rằng, hiển nhiên `===` phải làm nhiều công việc hơn `==`, bởi vì nó cần phải kiểm tra type.
Lời giải thích thứ hai cho rằng, `==` sẽ tốn công sức hơn vì nó phải tiếp tục ép kiểu nếu type giữa hai toán hạng khác nhau.

Khi tính toán hiệu năng người ta thấy rằng việc ép kiểu chỉ chiếm rất ít thời gian xử lý, chỉ rơi vào một vài mili giây. Vì vậy đừng sa lầy vào việc nghĩ về performance khi chọn lựa giữa hai toán tử này, mặc dù `==` sẽ chậm hơn `===`.

Nếu ta so sánh hai giá trị cùng kiểu, `==` và `===` sử dụng thuật toán giống hệt nhau.

Nếu ta so sánh hai giá trị khác kiểu, performance cũng không phải là khía cạnh quan trọng mà ta cần phải để ý.

Điều mà ta cần xem xét khi sử dụng hai toán tử này, đó là khi so sánh hai giá trị trong bài toán của mình, liệu ta có cần ép kiểu hay không?

Nếu cần ép kiểu, sử dụng `==`, nếu không, sử dụng `===`.

> Cả `==` và `===` đều kiểm tra kiểu của toán hạng. Sự khác biệt giữa hai toán tử này là cách chúng xử lý nếu hai toán hạng khác kiểu.

# Abstract Equality
Behavior của toán tử `==` được định nghĩa trong "The Abstract Equality Comparison Algorithm" trong section 11.9.3 của ES5 spec. Tài liệu đó mô tả một thuật toán bao quát nhưng đơn giản mà thể hiện rõ trạng thái mà mỗi cách kết hợp kiểu có thể xảy ra, và sự ép kiểu sẽ được thực hiện như thế nào trong mỗi kiểu kết hợp.

Điều đầu tiên khá là đơn giản, khi hai giá trị đem so sánh có cùng kiểu, chúng được so sánh một cách bình thường và tự nhiên như chúng ta vẫn thường thấy. Ví dụ, 42 bằng với 42, "abc" bằng với "abc". Một vài trường hợp ngoại lệ mà chúng ta đã nói ở bài trước về [các giá trị đặc biệt trong JS ](https://viblo.asia/p/ban-ve-js-cac-gia-tri-dac-biet-trong-javascript-Qbq5QLMGlD8):
- NaN không bao giờ tự bằng chính nó.
- +0 và -0 bằng nhau.

Điều tiếp theo mà ta cần biết đó là khi sử dụng `==` để so sánh `object` (bao gồm cả `function` và `array`). Hai giá trị thuộc kiểu này sẽ chỉ bằng nhau nếu chúng cùng tham chiếu đến một giá trị trong bộ nhớ. Sẽ không có ép kiểu xảy ra ở đây.

> Điều mà ít ai biết đó là `==` và `===` xử lý giống hệt nhau khi so sánh hai `object`, không có bất cứ sự khác biệt nào
> 

Cuối cùng là nếu ta sử dụng `==` để so sánh hai giá trị khác kiểu, một trong hai giá trị sẽ được ép kiểu ngầm định. Việc ép kiểu này xảy ra để hai giá trị trở thành cùng kiểu, từ đó có thể so sánh bình thường.

> Toán tử `!=` và `!==` quy luật y hệt như `==` và `===`, chỉ đơn giản nó trả lại kết quả đối lập.
> 

## So sánh: string với number
Để minh hoạ việc ép kiểu của `==`, ta sẽ bắt đầu với phép so sánh `string` với `number`:
```
var a = 42;
var b = "42";

a === b; // false
a == b; // true
```

Đúng như ta mong đợi, `a === b` fail, vì không có ép kiểu xảy ra, do đó 42 và "42" là hai giá trị khác nhau.

Tuy nhiên, phép so sánh thứ hai `a == b` sử dụng loose equality, có nghĩa là nếu kiểu khác nhau là thuật toán so sánh bằng sẽ ép kiểu ngầm định một trong hai giá trị. Nhưng chính xác thì cách ép kiểu nào đã xảy ra? Giá trị 42 của `a` trở thành `string`, hay giá trị "42" của `b` trở thành `number`?

Trong ES5 spec, mệnh đề 11.9.3.4-5 nói rằng:
> 1. If Type(x) is Number and Type(y) is String, return the result of the comparison x == ToNumber(y).
> 2. If Type(x) is String and Type(y) is Number, return the result of the comparison ToNumber(x) == y.

Spec đã mô tả một cách rất rõ ràng, do đó giá trị "42" được ép kiểu thành `number`, từ đó phép so sánh trả về `true`.

## So sánh: bất cứ giá trị nào với boolean
Một trong những bất ngờ lớn nhất với cái trò ép kiểu ngầm định của toán tử `==` là khi ta so sánh một giá trị nào đó trực tiếp với `true` hoặc `false`.
Xem xét trường hợp sau:
```
var a = "42";
var b = true;

a == b; // false
```
À há, bắt đầu có sự vi diệu ở đây!? Ta biết rằng "42" là một truthy value. Thế thì tại sao phép so sánh `==` trên lại cho kết quả `false`?

Lý do đã được mô tả trong spec, và rất nhiều developer chẳng bao giờ chú ý đến nó. Quote lại spec phát nhỉ:
> 1. If Type(x) is Boolean, return the result of the comparison ToNumber(x) == y.
> 2. If Type(y) is Boolean, return the result of the comparison x == ToNumber(y).
 
Ta hãy cùng phân tích. Đầu tiên:
```
var x = true;
var y = "42";

x == y: // false
```

Kiểu của x là `boolean`, do đó x sẽ bị ép kiểu từ `true` về 1. Và bây giờ phép so sánh trở thành `1 == "42"`. Dựa theo quy luật ép kiểu ngầm định ở phần trước, phép so sánh tiếp tục trở thành `1 == 42`. Và tất nhiên kết quả của phép so sánh là `false`.

Đảo ngược lại, ta cũng sẽ có kết quả tương tự:
```
var x = "42";
var y = false;

x == y; // false
```

Kiểu của y là `boolean`, do đó ở đây y được ép kiểu thành 0. Phép so sánh `"42" == 0` trở thành `42 == 0`, và kết quả là `false`.

Hay nói cách khác, giá trị "42" không `== true` cũng không `== false`. Chúng ta có thể thấy là nghe quái dị vậy, làm sao mà một giá trị có thể vừa ko truthy lại vừa ko falsy?

Bởi vì ta đang hiểu rất nhầm. "42" hiển nhiên là truthy. Nhưng `"42" == true` không thực thi một phép test hay phép ép kiểu về boolean. Đầu ta thì cứ đinh ninh rằng "42" được ép kiểu về `boolean`, nhưng ai ngờ `true` lại được ép kiểu về 1, và "42" lại được ép kiểu về 42.

Điều ta cần ghi nhớ ở đây là bất cứ khi nào so sánh `==` xảy ra giữa hai giá trị khác kiểu mà có một đầu là `boolean`, thì trước tiên `boolean` sẽ luôn được ép kiểu về `number`.

Vì nó thực sự là một điều bất thường với nhiều developer. Do đó một điều recommend dành cho bạn là không bao giờ sử dụng `== true` hay `== false` trong bất cứ hoàn cảnh nào. Dùng `===` thì ổn.
```
var a = "42";

// bad (will fail!):
if (a == true) {
    // .. 
}

// also bad (will fail!):
if (a === true) {
    // .. 
}
    
// good enough (works implicitly):
if (a) {
    // ..
}

// better (works explicitly):
if (!!a) {
    // .. 
}
    
// also great (works explicitly):
if (Boolean(a)) {
    // .. 
}
```

Nếu bạn luôn tránh việc sử dụng `== true` hay `== false` (hay còn gọi là loose equality với boolean), bạn sẽ không cần phải lo về việc gặp phải những cái thứ hại não về truthiness/falsiness.

## So sánh: nulls với undefineds
Một ví dụ khác về việc ép kiểu ngầm định có thể thấy khi so sánh `==` giữa `null` và `undefined`. Ta tiếp tục quote lại cái ES5 spec, mệnh đề 11.9.3.2-3:
> 1. If x is null and y is undefined, return true.
> 2. If x is undefined and y is null, return true.

`null` và `undefined`, khi so sánh sử dụng `==`, sẽ luôn luôn bằng nhau. Điều này có nghĩa là `null` và `undefined` có thể được xem như là không khác gì nhau khi dùng cho mục đích so sánh. 
```
var a = null;
var b;

a == b; // true
a == null; // true
b == null; // true

a == false; // false
b == false; // false
a == ""; // false
b == ""; // false
a == 0; // false
b == 0; // false
```

Việc ép kiểu giữa `null` và `undefined` là an toàn và có thể đoán trước, và ko thể cho ra một giá trị false nào với phép so sánh đó. Recommend sử dụng cách này để cho phép `null` và `undefined` được coi như là hai giá trị giống nhau.
Ví dụ:
```
var a = doSomething();

if (a == null) {
    // ..
}
```
Phép kiểm tra `a == null` sẽ pass khi hàm `doSomething()` trả về một giá trị `null` hoặc `undefined`, và sẽ fail với bất kì giá trị nào khác, thậm chí là các giá trị falsy như 0, false, "".

Dạng explicit của phép kiểm tra sử dụng `===` theo quan điểm cá nhân của tôi là không cần thiết và thậm chí là có thể có một chút perfomance thấp hơn:
```
var a = doSomething(0;

if (a === undefined || a === null) {
    // ..
}
```
Theo tôi thì dạng `a == null` vừa làm cho code dễ đọc lại vừa là một phép so sánh tin cậy.

## So sánh: object với non-object
Nếu một `object`/`function`/`array` được đem so sánh với một primitive (`string`, `number`, `boolean`), ES5 spec nói trong mệnh đều 11.9.3.8-9 như sau:
> 1. If Type(x) is either String or Number and Type(y) is Object, return the result of the comparison x == ToPrimitive(y).
> 2. If Type(x) is Object and Type(y) is either String or Number, return the result of the comparison ToPrimitive(x) == y.

> Một chú ý nhỏ mà ta có thể thấy ở đây là mệnh đề nay không đề cập đến boolean, vì luật dành cho boolean đã được đề cập đến ở phần bên trên, tất cả `boolean` sẽ được đưa về `number` trước.

Xem xét:
```
var a = 42;
var b = [ 42 ];

a == b; // true
```

Giá trị `[ 42 ]` có một abstract operation gọi là `ToPrimitive`, hàm này sẽ trả về kết quả là giá trị chuỗi "42". Từ đó, phép so sánh trở thành `"42" == 42`, rồi tiếp tục được ép kiểu về thành `42 == 42` và từ đó kết quả sẽ là `true`.

Ta sẽ xem một ví dụ khác:
```
var a = "abc";
var b = Object(a); // same as `new String(a)`

a === b;
a == b;
```
`a == b` true vì b được ép kiểu (hay trường hợp này còn gọi là unwrapped) thông qua `ToPrimitive` để lấy ra giá trị primitive "abc", và nó bằng với giá trị của biến a.

Có một vài giá trị không nằm trong trường hợp này vì đã được overriding bằng các rule khác:
```
var a = null;
var b = Object(a); // same as `Object()`
a == b; // false

var c = undefined;
var d = Object(c); // same as `Object()`
c == d; // false

var e = NaN;
var f = Object(e); // same as `new Number(e)`
e == f; // false
```
Giá trị `null` và `undefined` không thể bị boxed, vì nó không có wrapper tương ứng. `Object(null)` chỉ giống như `Object()` và do đó sinh ra một Object bình thường.

Còn NaN có thể bị boxed bởi Number object, nhưng khi phép so sánh `==` unboxing, NaN == NaN sẽ fail vì NaN không tự bằng chính nó.

# Kết
Hy vọng bài viết sẽ giúp bạn gỡ rối được phần nào khi sử dụng loose equality và strict equality trong JS. Chúc các bạn có một ngày làm việc hiệu quả.

-------
*Dịch và tham khảo từ [You Don't Know JS - Type and Grammar](https://www.amazon.com/You-Dont-Know-JS-Grammar/dp/1491904194)*