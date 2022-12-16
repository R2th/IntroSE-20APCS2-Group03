---
>  Trong loạt series nay mìnhh sẽ tìm hiểu về javascript mở đầu phần 1: Values, Types, and Operators
### Master Yuan-Ma, The Book of Programming
> *Trong thế giới máy tính, chỉ có một thứ duy nhất là dữ liệu (data). Bạn có thể đọc, sửa, tạo mới dữ liệu - nhưng bất cứ thứ gì khác không phải là dữ liệu, đơn giản là nó không tồn tại. Tất cả dữ liệu được lưu trữ trong một thứ tự dài của các bits.*

### Values
*Tưởng tượng chúng ta có một đại dương chứa các bits. 1 máy tính cổ điển có hơn 30 tỉ bits lưu trữ.*

Để có thể làm việc với khối lượng bits lớn mà không làm hao hụt nó, bạn có thể chia chúng ra thành các phần nhỏ đại diện cho các mảnh thông tin. Trong môi trường của Javascript, các mảnh đó được gọi là Values ( giá trị). Tất cả những giá trị này được tạo nên bởi bits, giữ những vai trò khác nhau. Mỗi values có một kiểu giá trị (type) để xác định vai trò của chính nó.

Có sáu kiểu giá trị cơ bản của values trong Javascript: `numbers` (số), `strings` (chuỗi kí tự), `Booleans` (giá trị `true`/ `false` (đúng/ sai)), `objects` (đối tượng), `functions` (hàm) và `undefined values` (giá trị chưa xác định).

Để tạo 1 value, bạn chỉ đơn giản là gọi tên của nó, chỉ cần gọi tên, và bạn đã có 1 giá trị. Mỗi values được lưu trữ ở đâu đó, và nếu bạn muốn sử dụng một số lượng khổng lồ của chúng cùng thời điểm, có lẽ bạn sẽ gặp một chút vấn đề với với việc vượt quá số bits. May mắn là vấn đề này chỉ xảy ra nếu bạn cần tất cả chúng cùng một lúc. Trong một khoảng thời gian dài không sử dụng đến, nó sẽ được giải phóng.

### Number

*Trong JavaScript Number là một kiểu dữ liệu cũng là một object. Nó có 2 dạng là số có dấu chấm động hoặc không có dâu chấm động.*

Số thập phân được biểu diển bởi dấu chấm

`19.92`

Nếu số quá lớn thì ta có thể dùng số mũ để biểu diễn.

`123e5; // this is 12300000`

### Arithmetic

*Tương tự như các ngôn ngữ khác, JavaScript cũng thực hiện `x`, `/` trước `+`, `-` sau, ưu tiên biểu thức trong dấu ngoặc trong đa thức. `%` là chia lấy phần dư*

```javascript
var x = (1+2)*10 + 5; // x = 35
x % 10;  // = 5
```

### Special Number

*Có 3 giá trị đặc biệt trong JavaScript:*

`Infinity` dương vô cùng.

`-Infinity` âm vô cùng.

`NaN` (không phải là số) là cái gì đó không tồn tại trong tập hợp R.

VD:  `var x = 0 / 0; // x NaN`
hay var x = x / x; // x `NaN`

### strings

*Một kiểu dữ liệu cơ bản nữa đó là `string`* một chuổi được bao bọc bởi dấu nháy đơn `'abc'` hoặc dấu nháy kép `"abc"`. Dấu backslach `(\)` được đùng để biểu diển những ký tự đặc biệt trong chuổi.

VD: 'CapheShift is a group of wonder coders.\nJoint to become a wonder coder'

đoạn code sẽ hiển thị như sau:

```CapheShipt is a group of wonder coders.
Joint to become a wonder coder```

Ta có thể dùng dấu `+` để cộng các chuổi lại với nhau

VD:
```javascript
var x = 'We '+'are '+'CapheShift'; // x = We are CapheShift
```

Có rất nhiều thao tác chuỗi ta sẽ tìm hiểu sâu hơn trong chương 4

### Unary operators 
*Có thể hiểu toán tử một ngôi là toán tử chỉ có một giá trị*

Ví Dụ: `1 + 2`; // là toán tử hai ngôi (binary operators)

`typeof 1`; // là toán tử một ngôi

Ta có các toán tử một ngôi sau:

- `delete` xóa một một đối tượng, thuộc tính của đối tượng, hoặc một phần tử trong mảng.

```javascript
var x = 123;
delete x;
delete Math.PI;
var num = [1, 2, 3, 4, 5];
delete num[2]; // xóa phàn tử thứ 2
```

- `typeof` trả về kiểu của đối tượng

```javascript
typeof 'abc'; // string
```

- `void` trả về không là gì cả của một biểu thức

VD:
```javascript
var x = function(){
  return 1+2;
};
console.log(x());  // 3
console.log(void(x())); //undefined
```

### Boolean

*Giống như mọi ngôn ngữ khác boolean có 2 giá trị true và false. được sử dụng cho một sự kiện chỉ có 2 khả năng xãy ra: co hoặc không*

### Comparisons
Đây là 1 cách để tạo ra các giá trị luận lí (Boolean values):

```javascript
  console.log(3 > 2)
  // -> đúng (true)
  console.log(3 < 2)
  // -> sai (false)
```

Dấu *>* và *<* là các kí hiệu quen thuộc cho "lớn hơn" và "nhỏ hơn". Chúng là các toán tử 2 ngôi (binary operators). Việc gán cho chúng các kết quả trong 1 giá trị luận lí (Boolean values) xác định việc khi nào chúng giữ giá trị đúng (true) trong trường hợp này.
Chuỗi cũng có thể được so sánh theo cùng 1 cách.

```javascript
  console.log("Aardvark" < "Zoroaster")
  // -> đúng (true)
```

Cách chuỗi được sắp xếp theo thứ tự lớn hơn hay nhỏ hơn dựa trên bảng chữ cái: các kí tự in hoa luôn "nhỏ hơn" các kí tự thường, nên "Z" < "a" là đúng (true), và các kí tự không phải là chữ (!, -,...) cũng được sắp xếp thứ tự. Việc so sánh thực chất được dựa trên bảng mã *UNICODE* chuẩn. Chuẩn này gán 1 mã số cho hầu như tất cả các kí tự bạn có thể cần tới. Bao gồm cả kí tự Hy Lạp, Nhật Bản, Ấn Độ,... Các mã số này khá hữu dụng trong việc lưu trữ các chuỗi trong máy tính vì chúng có thể được biểu thị dưới dạng 1 chuỗi số. Khi so sánh chuỗi, JavaScript duyệt tất cả từ trái sang phải, so sánh các mã số của từng kí tự một.
Các toán tử khác tương tự là `>=` (lớn hơn hoặc bằng), `<=` (bé hơn hoặc bằng), `==` (bằng với), `!=` (không bằng với).

```javascript
  console.log("Itchy" != "Scratchy")
  // -> đúng (true)
```

Chỉ có duy nhất 1 giá trị không bằng với chính nó là `NaN`, viết tắt cho "not a number".

```javascript
  console.log(NaN == NaN)
  // -> false
```

`NaN` được dùng để biểu thị giá trị của 1 biểu thức vô nghĩa, và vì thế, nó không bằng với bất cứ giá trị của biểu thức vô nghĩa nào *khác*.

### Logical operators
Có 1 vài toán tử có thể được sử dụng trên các giá trị luận lí (Boolean values). JavaScript hỗ trợ 3 kiểu toán tử logic cơ bản là: `and` (và), `or` (hoặc), và `not` (phủ định). Những toán tử này có thể được sử dụng để tìm ra "chân trị" của các giá trị luận lí (Booleans).

- Toán tử `&&` biểu diễn logic `and` (và). Nó là 1 toán tử 2 ngôi (binary operator), và giá trị của nó chỉ đúng (true), khi và chỉ khi cả 2 giá trị được cho là đúng (true).

```javascript
  console.log(true && false)
  // -> false
  console.log(true && true)
  // -> true
```

- Toán tử `||` được dùng để biểu diễn logic *or* (hoặc). Nó cho giá trị đúng (true) nếu 1 trong 2 giá trị được cho là đúng (true).

```javascript
  console.log(false || true)
  // -> true
  console.log(false || false)
  // -> false
```

`Not` (phủ định) được viết như 1 dấu cảm thán (`!`). Nó là toán tử 1 ngôi (unary operators) dùng để phủ định giá trị được gán cho nó - `!true` (phủ của đúng) sẽ là false (sai) và `!false` (phủ của sai) sẽ là `true` (đúng).
Khi kết hợp các toán tử luận lí này (Boolean operators) với các phép toán số học và các toán tử khác, thì không phải lúc nào cũng cần đến các dấu ngoặc. Trong thực tế, bạn thường có thể bỏ qua chúng với việc biết rằng, `||` có độ ưu tiên thấp nhất, sau đó đến && và các toán tử so sánh (comparison operators) (`>, ==,...`), và còn lại. Thứ tự này được chỉ ra trong biểu thức bên dưới, càng ít dấu ngoặc nhất có thể càng tốt:

  ```javascript
  1 + 1 == 2 && 10 * 10 > 50
  ```

- Toán tử logic cuối cùng tôi đề cập không phải là toán tử 1 ngôi (unary operator) hay toán tử 2 ngôi (binary operator) mà là *toán tử tam phân* (*ternary*) - toán tử trên 3 giá trị. Nó được viết với 1 dấu hỏi (?) và 1 dấu 2 chấm:

```javascript
  console.log(true ? 1 : 2);
  // -> 1
  console.log(false ? 1 : 2);
  // -> 2
```

Đây được gọi là *toán tử điều kiện* (*conditional operator*) (hoặc toán tử tam phân). Giá trị bên trái của dấu chấm hỏi sẽ "chọn" giá trị nào trong 2 giá trị còn lại được xuất ra. Khi nó đúng (true), giá trị ở giữa sẽ được chọn, và khi  sai (false), giá trị bên phải được xuất ra.

### Undefined values

Có 2 loại giá trị đặc biệt là `null` và `undefined`, được dùng để biểu thị sự thiếu vắng của của 1 giá trị có nghĩa. Bản thân chúng là các giá trị nhưng không mang bất cứ thông tin nào cả.
Nhiều phép toán trong ngôn ngữ không cho 1 giá trị có nghĩa nào cả (bạn sẽ thấy sau này) sinh ra giá trị không xác định (*undefined*) đơn giản bởi vì nó phải sinh 1 ra giá trị nào đó.
Sự khác nhau giữa `undefined` và `null` là 1 tai nạn trong thiết kế của JavaScript, và điều đó không gây ra ảnh hưởng trong hầu hết các trường hợp. Trong trường hợp bạn thật sự phải cân nhắc giữa các giá trị này, bạn có thể xem chúng là như nhau.

### Automatic type conversion

Trong phần giới thiệu, tôi có đề cập đến việc JavaScript hầu như sẽ chấp nhận bất kì chương trình nào bạn đưa cho nó, thậm chí cả những chương trình thực hiện những việc kì quặc. Các biểu thức dưới đây là 1 minh chứng cho điều đó:

```javascript
  console.log(8 * null)
  // -> 0
  console.log("5" - 1)
  // -> 4
  console.log("5" + 1)
  // -> 51
  console.log("five" * 2)
  // -> NaN
  console.log(false == 0)
  // -> true
```

Khi 1 toán tử (operator) được gán vào "nhầm" kiểu giá trị, JavaScript sẽ âm thầm chuyển giá trị đó thành kiểu giá trị mà nó mong đợi, sử dụng 1 tập các quy tắc mà bạn không mong đợi. Đây được gọi là "*sự ép kiểu*" (*type coercion*). Vì vậy *null* trong biểu thức 1 trở thành 0, và "5" trong biểu thức thứ 2 trở thành 5 (từ chuỗi thành số). Trong biểu thức 3, dấu cộng cố gắng cộng chuỗi trước khi cộng số học, vì vậy 1 được chuyển thành "1" (từ số thành chuỗi).
Khi 1 thứ gì đó không thể ánh xạ sang số 1 cách rõ ràng (như "năm" hoặc `undefined`) khi được chuyển sang số, giá trị `NaN` được tạo ra. Hơn nữa, các phép tính toán số học trên `NaN` sẽ tiếp tục tạo ra `NaN`, vì vậy, nếu bạn gặp phải điều này trong những trường hợp không mong muốn, hãy nghĩ đến vấn đề trong việc chuyển kiểu.
Khi so sánh các giá trị cùng kiểu sử dụng `==`, kết quả xuất ra khá dễ đoán: bạn sẽ nhận được true (đúng) khi cả 2 giá trị đều giống nhau, trừ trường hợp của `NaN`. Nhưng khi khác kiểu, JavaScript sử dụng 1 tập các quy tắc phức tạp và mơ hồ để xác định xem phải làm gì. Trong hầu hết các trường hợp, nó chỉ thử chuyển 1 trong số các giá trị sang kiểu của giá trị còn lại. Tuy nhiên, khi `null` hoặc `undefined` xuất hiện bên cạnh toán tử, nó trả về true (đúng) chỉ khi 2 bên của toán tử là `null` hoặc `undefined`.

```javascript
  console.log(null == undefined);
  // -> true
  console.log(null = 0);
  // -> false
```

Đây là mảnh ghép cuối trong các quy tắc thường được sử dụng. Khi bạn muốn thử bất cứ 1 giá trị thật nào thay vì `null` hoặc `undefined`, bạn có thể so sánh (compare) nó với null bằng toán tử `==` (hoặc `!=`).
Nhưng nếu bạn muốn thử bất cứ thứ gì liên quan đến độ chính xác của giá trị false (sai)? Quy luật của việc chuyển đổi chuỗi và số thành giá trị luận lí (Boolean values) định ra rằng `0`, `NaN`, và chuỗi rỗng (`" "`) được tính như false (sai), trong khi tất cả các giá trị khác được xem như true (đúng). Vì thế, các biểu thức như `0 == false` và `"" == false` đều là true (đúng). Trong những trường hợp thế này, nếu bạn không muốn việc *chuyển kiểu tự động* (*automatic type conversion*) diễn ra, có 2 toán tử đó là *===* và *!==*. Phép thử đầu tiên, một giá trị sẽ chính xác bằng (*precisely equal*) với 1 giá trị khác, và ở phép kiểm thử thứ 2, sẽ chính xác không bằng (*not precisely equal*). Vì vậy, `"" === false` là false (sai).
Tôi khuyến khích việc sử dụng toán tử so sánh 3 kí tự (three-character comparison operators) để phòng ngừa việc chuyển kiểu làm phiền bạn. Nhưng khi bạn chắc chắn rằng kiểu dữ liệu ở cả 2 phía là giống nhau, thì việc sử dụng toán tử ngắn hơn là không thành vấn đề.
### Short-circuiting of logical operators
Các toán tử `&&` và `||` quản lí các giá trị khác kiểu theo 1 cách riêng biệt. Chúng sẽ chuyển đổi giá trị bên trái của chúng thành kiểu giá trị luận lí (Boolean type) theo thứ tự để quyết định xem phải làm những gì, nhưng còn tùy thuộc vào toán tử và kết quả của việc chuyển kiểu, chúng sẽ trả về giá trị *gốc* (*original*) bên trái hoặc bên phải.
Ví dụ, toán tử `||` sẽ trả về giá trị bên trái của nó khi nó có thể chuyển nó thành true (đúng) và sẽ trả về giá trị bên phải của nó trong trường hợp còn lại. Việc chuyển kiểu này hoạt động như bạn mong đợi đối với các giá trị Boolean (Boolean values) và sẽ làm tương tự đối với các giá trị kiểu khác.

```javascript
  console.log(null || "user")
  // -> user
  console.log("Karl" || "user")
  // -> Karl
```

Tính năng này cho phép toán tử `||` được sử dụng như 1 cách để ngã về 1 giá trị mặc định. Nếu bạn gán cho nó 1 biểu thức có thể tạo ra giá trị rỗng (empty value) phía bên trái, giá trị phía bên phải sẽ được sử dụng thay thế trong trường hợp này.
Toán tử `&&` cũng làm tương tự, nhưng theo 1 cách hơi khác. Khi giá trị bên trái của nó được chuyển thành false (sai), nó trả về giá trị đó, còn không nó trả về giá trị bên phải của mình.
Một tính chất quan trọng của 2 toán tử này là việc biểu thức bên phải của chúng chỉ được định lượng (evaluated) chỉ khi cần thiết. Trong trường hợp của `true || X`, không cần biết X là gì - thậm chí nếu nó là 1 biểu thức khá tệ - kết quả vẫn là true, và X sẽ không được định lượng. Điều tương tự cho `false && X`, false (sai) sẽ bỏ qua X. Đây gọi là sự *"đoản mạch" định lượng* (*short-circuit evaluation*).
Toán tử điều kiện (conditional operator) làm việc theo cùng 1 cách giống nhau. Biểu thức đầu luôn luôn được định lượng (evaluated), nhưng giá trị thứ 2 hoặc 3, sẽ được xét tới hoặc không.

### Summary

Chúng ta đã có cái nhìn sơ lược về 4 kiểu giá trị của Javascript trong chương 1 : `numbers`, `strings`, `Boolean`, và `undefined values`. Những giá trị được tạo ra bằng các gọi tên hoặc giá trị của nó, bạn có thể gộp chúng lại và thay đổi giá trị của chúng bằng các phép toán: (`+, -, *, /, và %`), phép nối chuỗi (`+`), so sánh (`==, !=, ===, !==, <, >, <=, >=`), và phép logic (`&&, ||`).
### Link tham khảo:
https://en.wikipedia.org/wiki/JavaScript

https://eloquentjavascript.net/01_values.html

Bài giới thiệu của mình đến đây là hết hẹn gặp lại các bạn trong các bài viết sau: :D