Bài viết này là một trong số những bài thuộc chỉ mục bổ sung của `Sub-Series JavaScript` trong [Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/p/YWOZrApPKQ0). Ở đây chúng ta sẽ điểm qua một vài giá trị số học đặc biệt thường gặp, một số phương thức chuyển đổi các giá trị từ các kiểu khác sang `number`, và một số hàm làm việc với các giá trị số học được cung cấp bởi các object `Number & Math`.

## Các giá trị số học đặc biệt thường gặp

Các giá trị số học đặc biệt được JavaScript lưu trữ ở dạng thuộc tính của class `Number` và chỉ hỗ trợ việc truy xuất để sử dụng, không thể thay đổi.

- [`Number.POSITIVE_INFINITY`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY) - biểu thị cho một giá trị số học lớn vô cùng, có thể được truy xuất ngắn gọn là `Infinity` thay vì `Number.POSITIVE_INFINITY`.
- [`Number.NEGATIVE_INFINITY`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY) - biểu thị cho một giá trị số học lớn vô cùng, có thể được truy xuất ngắn gọn là `-Infinity` thay vì `Number.NEGATIVE_INFINITY`.

- [`Number.MAX_VALUE`](Number.MAX_VALUE) - giá trị hữu hạn lớn nhất thuộc kiểu `Number`.
- [`Number.MIN_VALUE`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_VALUE) - giá trị hữu hạn nhỏ nhất thuộc kiểu `Number`.

Nếu cần làm việc với các giá trị lớn hơn 2 giá trị biên này, chúng ta sẽ cần sử dụng [kiểu `BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

- [`Number.NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN) - `Not a Number` - là giá trị được trả về khi thực hiện các phép chuyển đổi dữ liệu về `number` không khả dụng. Có thể được truy xuất ngắn gọn là `NaN` thay vì `Number.NaN`. Giá trị `NaN` không tương đồng với bất kỳ giá trị số học nào bao gồm cả chính nó. :D
- [`Math.PI`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI) - hằng số đặc biệt biểu thị cho [cuộc đời của Pi](https://en.wikipedia.org/wiki/Life_of_Pi_(film)). :D

```number.js
console.log(1 / 0);   // Infinity
console.log(typeof Infinity);   // number
console.log(9_999_999_999 > Infinity);   // false

console.log(-1 / 0);   // -Infinity
console.log(typeof -Infinity);   // number
console.log(-9_999_999_999 < -Infinity);   // false

console.log(1 / 'one');   // NaN
console.log(typeof NaN);   // number
console.log(NaN == NaN);   // false
```

Để kiểm tra xem một giá trị đang được lưu trữ trong một biến nào đó có phải là `NaN` hoặc `Infinite` hay không, chúng ta có thể sử dụng các phương thức -

- [`Number.isFinite(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) - trả về kết quả là `true` nếu `value` không phải là `Infinite` hoặc `-Infinite`, ngược lại trả về `false`.
- [`Number.isNaN(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) - trả về kết quả là `true` nếu `value` là `NaN`.

```number.js
console.log( Number.isFinite(1 / 0) );   // false
console.log( Number.isNaN(1 / 'a') );   // true
```

## Chuyển đổi giá trị từ kiểu khác sang Number

Giống với các `class` biểu trưng cho các kiểu dữ liệu đơn nguyên `primitive` khác, `Number` cũng được thiết kế để sử dụng như một hàm chuyển đổi dữ liệu. Hàm này sẽ giúp chúng ta chuyển đổi dữ liệu từ các kiểu khác thành một giá trị `primitive number`.

```number.js
// undefined biểu thị cho kiểu dữ liệu chưa được định nghĩa
console.log( Number(undefined) );   // NaN

// null biểu thị cho một giá trị vô nghĩa
console.log( Number(null) );   // 0

console.log( Number(false) );   // 0
console.log( Number(true) );   // 1

// chuỗi có chứa ký tự khác chữ số là NaN
console.log( Number('') );   // 0
console.log( Number('0') );   // 0
console.log( Number('000') );   // 0
console.log( Number('0.1') );   // 0.1
console.log( Number('0a') );   // NaN
console.log( Number('one') );   // NaN

// giá trị duy nhất của mảng sẽ được dùng làm đại diện
// một mảng có nhiều hơn một giá trị sẽ là `NaN`
console.log( Number([]) );   // 0
console.log( Number([1]) );   // 1
console.log( Number(['1']) );   // 1
console.log( Number([0, 1]) );   // NaN

// một object bất kỳ luôn là NaN ngoại trừ các object `new Number()`
console.log( Number({}) );   // NaN
console.log( Number(new Number(1)) );   // 1
```

Khi chúng ta sử dụng các giá trị không phải là giá trị số học trong các biểu thức yêu cầu truyền vào giá trị số học, thì các giá trị ấy sẽ được tự động chuyển đổi bằng hàm `Number()` với quy tắc như trên.

Để có được giá trị chuyển đổi khả dụng cao hơn từ các chuỗi ký tự, chúng ta có thể sử dụng các phương thức -

- [`Number.parseInt(string)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt)
- [`Number.parseFloat(string)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat)

Các phương thức này sẽ quét từ đầu chuỗi ký tự cho đến điểm đầu tiên gặp một ký tự vô nghĩa với các giá trị số học.

```parse.js
var one = Number.parseInt('1.02a');
console.log(one);   // 1

var oneee = Number.parseFloat('1.02a');
console.log(oneee);   // 1.02
```

## Một số phương thức để làm việc với các giá trị Number

Bên cạnh việc chuyển đổi kiểu dữ liệu thì đôi khi chúng ta cũng sẽ cần định dạng các giá trị số học để trình bày trên giao diện người dùng. Ví dụ như làm ngắn phần thập phân của các số vô tỉ bằng phương thức [`number.toFixed(n)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) - với `0 <= n <= 20`.

```fixed.js
var theNumber = new Number(1.23456789);
console.log( theNumber.toFixed(2) );
// 1.23

// hoặc
console.log( 1.23456789.toFixed(2) );
```

Các phương thức phổ biến khác để làm việc với các giá trị `number` được cung cấp bởi [thư viện `Math`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math). Tuy nhiên các phương thức này sẽ chỉ hỗ trợ các giá trị trong khoảng  `Number.MIN_VALUE - Number.MAX_VALUE`, và không hỗ trợ các giá trị [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

```math.js
// giá trị ngẫu nhiên trong khoảng từ 0 - 1
console.log( Math.random() );   // ko đoán được :D

// trị tuyệt đối - absolute
console.log( Math.abs(-1) );   // 1

// số nguyên làm tròn lên `trần`
console.log( Math.ceil(1.23) );   // 2

// số nguyên làm tròn xuống `sàn`
console.log( Math.floor(1.23) );   // 1

// giá trị lớn nhất & nhỏ nhất
var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log( Math.max(...numberArray) );   // 9
console.log( Math.min(1, 2, 3) );   // 1

// lũy thừa cơ số x bậc y
console.log( Math.pow(2, 10) );   // 1024

// loại bỏ hết phần thập phân
console.log( Math.trunc(1.23456789) );   // 1

// căn bậc 2
console.log( Math.sqrt(81) );   // 9

// arc
console.log( Math.sin(Math.PI / 2) );   // 1
console.log( Math.cos(Math.PI / 2) );   // 0
```

## Kết thúc bài viết

Trong bài sau, chúng ta sẽ điểm danh qua một số phương thức thường sử dụng của `String` và một công cụ hỗ trợ nhận dạng các chuỗi ký tự cần thao tác xử lý có tên là `Regular Expression`. Hẹn gặp lại bạn trong bài viết tiếp theo.

[[JavaScript] Bài 20 - String & RegExp](https://viblo.asia/p/Qbq5QRv4KD8)