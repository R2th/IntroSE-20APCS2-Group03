Bài viết này mình sẽ giới thiệu về `padStart` và `padEnd` và 1 số thông tin về chúng.

```js
const string = 'hi';

string.padStart(3, 'c'); // "chi"

string.padEnd(4, 'l'); // "hill"
```

## 1. Syntax
Cú pháp của `String Pad` khá là đơn giản:
```js
string.padStart(<targetLength>, <padString>);

string.padEnd(<targetLength>, <padString>);
```

## 2. Understanding the Parameters
2 phương thức `padEnd` và `padStart` đều nhận vào các `parameters` tương tự nhau

### 2.1. targetLength
Độ dài của chuỗi kết quả khi `str` hiện tại được `pad`. Nếu độ dài của `str` lớn hơn `targetLength` thì kết quả trả về vẫn là `str` (không bị thay đổi)

```js
let result = 'str'.padStart(5);
result.length; // 5

result = '12345678'.padStart(5);
result.length; // 8
```

Note: `targetLength` không phải số lần `str` được `pad`

### 2.2. padString
`padString` là chuỗi dùng để `pad` hiện tại. Nếu không set `padString` thì nó sẽ nhận giá trị default là `" "` (U+0020 'SPACE').

```js
'hi'.padStart(5);
// Same as
'hi'.padStart(5, ' ');

'abc'.padStart(6,"123465"); // "123abc"
```

Nếu bạn truyền vào `empty string`, thì nó sẽ không làm gì cả :v
```js
const result = 'hi'.padStart(5, '');

result; // ''
result.length; // 2
```

Nếu `padString` dài dẫn tới kết quả trả về `dài` hơn `targetLength` thì nó sẽ được `truncated` từ `cuối` lên `đầu` của `padString`. 
```js
'hi'.padEnd(7, 'SAMANTHA');
// 'hiSAMAN'
```

## How it handles other data types
Như đã nói ở trên, kiểu của `parameter` thứ 2 truyền vào là `string`. Tuy nhiên bạn vẫn có thể truyền giá trị kiểu khác vào, nó sẽ tự động convert thành `string` thông qua phương thức `toString()`

```js
// NUMBER
(100).toString(); // '100'

// BOOLEAN
true.toString();   // 'true'
false.toString();  // 'false'

// ARRAY
['A'].toString(); // 'A'
[''].toString();  // ''

// OBJECT
({}).toString();         // '[object Object]'
({hi: 'hi'}).toString(); // '[object Object]'
```

Ở trên là kết quả của `toString()` cho 1 số kiểu dữ liệu.

```js
'SAM'.padStart(8, 100);    // '10010SAM'

'SAM'.padStart(8, true);   // 'truetSAM'
'SAM'.padStart(8, false);  // 'falseSAM'

'SAM'.padStart(5, ['']);   // 'SAM'
'SAM'.padStart(5, ['hi']); // 'hiSAM'

'SAM'.padStart(18, {});         // '[object Object]SAM'
'SAM'.padStart(18, {hi: 'hi'}); // '[object Object]SAM'
```

### Handling `undefined`
Có 1 điểm khá thú vị, khi bạn convert `undefined` sang `string` bằng `toString` thì bạn sẽ gặp lỗi `TypeError`:
```js
undefined.toString(); // TypeError: Cannot read property 'toString' of undefined
```

Tuy nhiên, nếu bạn truyền `undefined` như `padString` thì bạn sẽ không gặp lỗi:
```js
'SAM'.padStart(10, undefined);
// '       SAM'
```

Tại sao nhỉ? Theo như spec:
> ECMAScript Spec If fillString is undefined, let filler be the String value consisting solely of the code unit 0x0020 (SPACE).

=> Khi bạn truyền giá trị khác `undefined` (dĩ nhiên là khác cả `string`) nó sẽ tự động convert giá trị truyền vào thành `string` thông qua phương thức `toString()`

## Use Case
### Tabular Formatting with padEnd
Một trong những ứng dụng của `string pad` thường được dùng đó là là [formatting](https://www.samanthaming.com/tidbits/69-display-string-in-tabular-format-with-padend/)
```js
'abc'.padEnd(6, '.');

// abc...
```

### Right Aligning String with padStart
Căn trái / phải với `padStart` và `padEnd` mà không dùng `css`
```js
console.log('JavaScript'.padStart(15));
console.log('HTML'.padStart(15));
console.log('CSS'.padStart(15));
console.log('Vue'.padStart(15));
```

Kết quả sẽ là:
```js
     JavaScript
           HTML
            CSS
            Vue
```

### Receipt formatting
Bạn cũng có thể căn đều 2 bên text (vẫn không dùng `css`)
```js
const purchase = [
    ['Masks', '9.99'],
    ['Shirt', '20.00'],
    ['Jacket', '200.00'],
    ['Gloves', '10.00'],
];

purchase.forEach(([item, price]) => {
    console.log(item + price.padStart(20 - item.length));
});
```

Kết quả:
```js
Masks           9.99
Shirt          20.00
Jacket        200.00
Gloves         10.00
```

### Masking Numbers
Một ứng dụng nữa của nó là `masking number`, hiểu đơn giản là ẩn 1 số thành phần của 1 dãy số (thường là `card number`)
```js
const bankNumber = '2222 2222 2222 2222';
const last4Digits = bankNumber.slice(-4);

last4Digits.padStart(bankNumber.length, '*');
// ***************2222
```

## Browser Support

`padStart` và `padEnd` được giới thiệu đồng thời và nó hỗ trợ các browser giống nhau - tất cả browser ngoại trừ `Internet Explorer` 😅

|Browser |  |
|--|--|
|Chrome | ✅ |
|Firefox | ✅ |
|Safari | ✅ |
|Edge | ✅ |
|Internet Explorer |❌ |

### Reference
https://www.samanthaming.com/tidbits/97-string-padstart-padend/