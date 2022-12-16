String là một trong những phần quan trọng nhất trong javascript, ngoài những methods hay dùng như `trim`, `concat`, `subString`, `toUpperCase`, `toLowerCase`; Javascript còn cung cấp cho chúng ta rất nhiều methods hữu ích khác để thao tác và giải quyết các vấn đề dễ dàng hơn khi làm việc với String. Mặc dù những hàm này ra đời cũng khá lâu hoặc các bạn cũng đã từng sử dụng nhưng đây là một cơ hội để chúng ta ôn lại và hiểu rõ hơn công dụng của mỗi hàm, bắt đầu nào!!!

### 1. includes
`includes` method dùng để kiểm tra một string có chứa một string khác hay không.

Ví dụ sau đây kiểm tra từ **'world'** có trong chuỗi hay không:
```js
const str = "Hello world, hello javascript.";
console.log(str.includes("world")); /* true */

// kiểm tra từ vị trí thứ 15
console.log(str.includes("world", 15)); /* false */
```

### 2. repeat
`repeat` method sẽ tạo ra một string mới lặp lại một số lần xác định của string ban đầu.

Ví dụ sau đây tạo một string mới với 5 lần lặp lại string ban đầu:
```js
const str = "Hello viblo";
console.log(str.repeat(5));

/* Hello vibloHello vibloHello vibloHello vibloHello viblo */
```

### 3. match
`match` method sẽ thực hiện tìm kiếm một string match với regular expression truyền vào, và trả về một array các string vừa tìm kiếm được; nếu không tìm thấy thì trả về `null`.

Ví dụ sau:
```js
const str = "The rain in SPAIN stays mainly in the plain";
console.log(str.match(/ain/g)); /* ["ain", "ain", "ain"] */
console.log(str.match(/ain/gi)); /* ["ain", "AIN", "ain", "ain"] */
console.log(str.match(/ainnn/g)); /* null */

const str2 = "Will 2021 be better than 2020?";
console.log(str2.match(/[0-9]/g)); /* ["2", "0", "2", "1", "2", "0", "2", "0"] */
```

### 4. charAt
`charAt` method sẽ trả về một ký tự trong string tại vị trí index xác định

Ví dụ sau:
```js
const str = "HELLO WORLD";
console.log(str.charAt(6)); /* W */
```

### 5. indexOf
`indexOf` method sẽ trả về vị trí index đầu tiên của  một chuỗi ký tự trong string ban đầu, nếu không tìm thấy thì trả về `-1`

Ví dụ sau:
```js
const str = "Hello Javascript!";
console.log(str.indexOf("Javascript")); /* 6 */
console.log(str.indexOf("Javascripttt")); /* -1 */
```

### 6. replace
`replace` method sẽ trả về một string mới với các giá trị đã được thay thế của string ban đầu.

Ví dụ sau:
```js
const str = "Hello world. Hello javascript";
// Chỉ thay thế từ đầu tiên
console.log(str.replace("Hello", "Hi")); /* Hi world. Hello javascript */

// Thay thế tất cả bằng cách sử dụng regex
console.log(str.replace(/Hello/g, "Hi")); /* Hi world. Hi javascript */
```

### 7. padStart, padEnd
`padStart` add thêm một số ký tự phía trước string ban đầu với một độ dài xác định.

`padEnd` add thêm một số ký tự phía sau string ban đầu với một độ dài xác định.

Ví dụ sau:
```js
// Add thêm ký tự "0" vào phía trước eightBits cho đến khi có độ dài = 8
const eightBits = "001".padStart(8, "0");
console.log(eightBits); // 00000001

// Add thêm ký tự "*" vào phía sau anonymizedCode cho đến khi có độ dài = 5
const anonymizedCode = "34".padEnd(5, "*");
console.log(anonymizedCode); // 34***
```

### 8. Convert string to array
Có nhiều cách để convert string sang array các ký tự, nhưng mình thích sử dụng toán tử spread operator hơn.

Ví dụ sau:
```js
const word = "apple";
const characters = [...word];
console.log(characters); // ["a", "p", "p", "l", "e"]
```

### 9.  Convert number to string
```js
const val = 1 + "";
console.log(val); // Result: "1"
console.log(typeof val); // Result: "string"
```

### 10.  Convert string to number
```js
const val = + "1";
console.log(val); // Result: 1
console.log(typeof val); // Result: "number"
```

### Kết luận
Trên đây là những string methods  mà chúng ta cần biết để vận dụng tốt trong tất cả các tình huống, mình hy vọng sẽ giúp cho những bạn mới làm quen sẽ hiểu rõ hơn và sử dụng hiệu quả string trong javascript. Cám ơn mọi người đã đọc bài viết.