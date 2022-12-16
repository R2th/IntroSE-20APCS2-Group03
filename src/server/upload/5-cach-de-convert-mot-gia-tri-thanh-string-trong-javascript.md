Bài viết này được viết với mục đích tìm ra cách tốt nhất khi cần convert một giá trị thành String.
<br>

Dưới đây là 5 cách convert một giá trị thành String mà mình muốn đề cập đến:
```javascript
const value = 12345;

// cộng với một String rỗng
value + '';

// dùng Template
`${value}`;

// JSON.stringify
JSON.stringify(value);

// toString()
value.toString();

// String()
String(value);

// kết quả của cả 5 cách đều là:
// '12345'
```

## So sánh 5 cách với nhau
Chúng ta hãy thử test 5 cách với các giá trị khác nhau. Đây là các biến mà mình sẽ dùng để test:
```javascript
const string = "hello";
const number = 123;
const boolean = true;
const array = [1, "2", 3];
const object = {one: 1};
const symbolValue = Symbol('123');
const undefinedValue = undefined;
const nullValue = null;
```

### Cộng với một String rỗng
```javascript
string + '';         // 'hello'
number + '';         // '123'
boolean + '';        // 'true'
array + '';          // '1,2,3'
object + '';         // '[object Object]'

// ⚠️
symbolValue + '';    // ❌ TypeError: can't convert symbol to string

undefinedValue + ''; // 'undefined'
nullValue + '';      // 'null'
```

Bạn có thể thấydùng cách này sẽ có lỗi `TypeError` nếu giá trị là một `Symbol`. Còn các giá trị khác thì vẫn ok.

### Dùng Template
```javascript
`${string}`;         // 'hello'
`${number}`;         // '123'
`${boolean}`;        // 'true'
`${array}`;          // '1,2,3'
`${object}`;         // '[object Object]'

// ⚠️
`${symbolValue}`;    // ❌ TypeError: can't convert symbol to string

`${undefinedValue}`; // 'undefined'
`${nullValue}`;      // 'null'
```
Kết quả khi dùng **Template** về cơ bản cũng giống với khi dùng cách **cộng với một String rỗng**. Như vậy cách này cung không phải là cách lý tưởng nhất khi xử lý với `Symbol` vì nó cũng sẽ gây lỗi `TypeError`.

### JSON.stringify()
```javascript
// ⚠️
JSON.stringify(string);         // '"hello"'

JSON.stringify(number);         // '123'
JSON.stringify(boolean);        // 'true'
JSON.stringify(array);          // '[1,"2",3]'
JSON.stringify(object);         // '{"one":1}'
JSON.stringify(symbolValue);    // undefined
JSON.stringify(undefinedValue); // undefined
JSON.stringify(nullValue);      // 'null'
```
Các bạn có thấy điểm gì đáng chú ý khi dùng cách này không? Điểm chú ý nắm ở trường hợp giá trị cần convert chính là một String. Khi bạn sử dụng `JSON.stringify()` với một giá trị `string`, nó sẽ biến string đó thành **một string có ngoặc kép**.
<br>

Cơ bản thì bạn KHÔNG NÊN sử dụng `JSON.stringify` để convert một giá trị thành string (không có nghĩa là cách này bị cấm dùng). Mình liệt kê cả cách này chủ yếu để cho đủ, để các bạn có thể biết được mình có các cách nào có thể dùng. Từ đó bạn có thể quyết định sử dụng cách này hay cách kia tùy thuộc vào từng tình huống.
<br>

### toString()
```javascript
string.toString();         // 'hello'
number.toString();         // '123'
boolean.toString();        // 'true'
array.toString();          // '1,2,3'
object.toString();         // '[object Object]'
symbolValue.toString();    // 'Symbol(123)'

// ⚠️
undefinedValue.toString(); // ❌ TypeError
nullValue.toString();      // ❌ TypeError
```
Qua test ở phía trên thì bạn có thể thấy dùng cách này rất ok với giá trị string và giá trị symbol. Tuy nhiên lại gặp lỗi với giá trị `undefined` và `null`. Như vậy cách này rất cần lưu ý khí sử dụng vì nó cover được ít case hơn cả.

### String()
```javascript
String(string);         // 'hello'
String(number);         // '123'
String(boolean);        // 'true'
String(array);          // '1,2,3'
String(object);         // '[object Object]'
String(symbolValue);    // 'Symbol(123)'
String(undefinedValue); // 'undefined'
String(nullValue);      // 'null'
```
Qua test ở phía trên thì mình nghĩ chúng ta đã tìm ra được kẻ thắng cuộc 🏆
<br>

Như các bạn thấy, `String()` xử lý tốt các giá trị `null` và `undefined`. Không cõ lỗi với bất kì giá trị nào.
<br>

Tuy nhiên các bạn nên nhớ rằng suggestion của mình chỉ mang tính tổng quát. Bạn mới chính là người nắm rõ app của mình nhất, do đó bạn mới chình là người đưa ra quyết định dùng cách nào là phù hợp nhất với từng tình huống.
<br>

## Kết luận:  String() 🏆
Nếu bạn code theo convetion của Airbnb thì cõ lẽ các bạn đã biết rằng cách convert giá trị thành String được đề xuất là sử dụng `String()` :+1:
<br>

Đây cũng là cách viết tường minh nhất khiến cho người khác có thể hiểu được ý định của bạn khi đọc code 🤓
<br>

Các bạn nên nhớ rằng đoạn code tốt nhất không nhất thiết phải là đoạn code "hack não" nhất mà là đoạn code có thể truyền đạt tốt nhất ý đồ của bạn cho người khác 💯
<br>

Sau khi show cho các bạn xem các phương pháp khác nhau xử lý các kiểu giá trị khác nhau như thế nào, hy vọng các bạn đã nắm được các điểm khác biệt và biết được cần phải chọn phương pháp nào với code của mình. Còn nếu như các bạn không chắc cần dùng cách nào thì mặc định `String()` luôn là một lựa chọn tốt 👍
<br>

---
Cảm ơn các bạn đã đọc bài viết :bow:
Nguồn: https://medium.com/dailyjs/5-ways-to-convert-a-value-to-string-in-javascript-6b334b2fc778