Trong bài viết này mình đưa ra một số phương thức xử lý **string** trong **JS** mà có thể chúng ta ít gặp.

### String.fromCharCode()

Với phương thức **fromCharCode**, ta có thể khởi tạo một **string** bằng cách truyền vào một danh sách các mã **code** tương ứng với ký tự hệ **Hexa (utf-16)** trong bảng mã **Unicode**, ví dụ:

```js
String.fromCharCode(65, 66, 67); // returns 'ABC'
String.fromCharCode(0x2014); // returns "—"
```

### String.fromCodePoint()

phương thức **fromCodePoint** trả về một **string** được tạo nên bởi một chuỗi các mã **code** tương ứng. Phương thức này gần như giống với **fromCharCode**, điểm khác biệt là **fromCharCode** có thể sử dụng trên hầu như tất cả các trình duyệt, ngược lại ta không thể sử dụng phương thức **fromCodePoint** trên **IE**.

### String.charAt()

**charAt** trả về ký tự của **string** dựa vào vị trí, hay **index** tương ứng của ký tự đó

```js
const str = "Hello";
const firstChar = str.charAt(0); // 'H'
```

### String.codePointAt()

phương thức **String.codePointAt()** cũng nhận vào **index** và trả về mã **code** (utf-16) của ký tự dựa theo **index** đó.

```js
const str = "Hello";
const firstCharCode = str.codePointAt(0); // 72
```

### String.concat()

**concat** kết hợp 2 **string** và trả về một **string** mới, tương tự khi ta thực hiện phép **cộng** 2 **string**.

```js
const str1 = "Hello ";
const str2 = "World";
const stringConcat = str1.concat(str2); // 'Hello World'
```

### String.endsWith()

**endWith** là phương thức cho phép kiểm tra phần **đuôi** của một **string**, trả về giá trị **boolean**.

```js
const str = "Hello World!";
const hasHello = str.endsWith("World!"); // true;
const hasHello2 = str.endsWith("ABC"); // false
```

### String.includes()

**includes** kiểm tra liệu một **string** này có bao gồm một **string** khác hay không và trả về giá trị **boolean**

```js
const str = "Hello";
const hasL = str.includes("l"); // true
const hasA = str.includes("a"); // false
```

### String.indexOf() và String.lastIndexOf()

Hai phương thức cũng giúp kiểm tra sự tồn tại của **string** bên trong một **string**, thay vì trả về **boolean** như **includes**, chúng trả về vị trí - **index** của **string** cần kiểm tra. Hoặc trả về **-1** nếu không tìm thấy. **indexOf** trả về vị trí đầu tiên được tìm thấy, ngược lại **lastIndexOf** trả về **index** cuối cùng.

```js
const str = "abcdbca";
str.indexOf("a"); // 0
str.lastIndexOf("a"); // 6
str.indexOf("e"); // -1
```

### String.match()

phương thức **match** nhận vào một biểu thức chính quy (regular expression) và trả về kết quả là danh sách các phần trong chuỗi **match** với biểu thức chính quy đó, ví dụ:

```js
const str = "Hello World";
const regex = /[A-Z]/g;
const upperCases = str.match(regex);
// ['H', 'W']
const check = str.match(/ello/g);
// ['ello']
```

Ở ví dụ trên, nếu ta bỏ ký tự **g** ở cuối biểu thức chính quy, kết quả trả về sẽ khác, phương **match** sẽ chỉ trả về phần **ký tự** đầu tiên thoả mãn biểu thức **regex** thay vì trả về tất cả.

```js
const str = "Hello World";
const regex = /[A-Z]/;
const upperCases = str.match(regex);
// ['H']
```

### String.padStart() và String.padEnd()

Để dễ hình dung, trong thực tế ta hay gặp bài toán thêm số 0 đằng trước số có 1 chữ số:

```
1 --> 01
11 --> 11
```

Ta sử dụng phương thức padStart để giải quyết

```js
const str = "1";
const convertedStr = str.padStart(2, "0"); // '01'
// mở rộng
const convertedStr = str.padStart(3, "*"); // '**1'
```

**padStart** và **padEnd** nhận vào hai tham số là độ dài tối đa và ký tự thay thế, các phần độ dài bị thiếu của chuỗi sẽ được thay thế bởi ký tự thay thế đó. Nếu độ dài của chuỗi lớn hơn hoặc bằng với độ dài tối đa, **padStart** và **padEnd** sẽ trả về chính giá trị của chuỗi hiện tại.

```js
"11".padStart(2, "0"); // 11
```

Trên đây là một số phương thức hữu ích khi cần làm việc với **string** trong **Javascript** mà có thể chúng ta ít gặp, hi vọng bài viết sẽ hữu ích.