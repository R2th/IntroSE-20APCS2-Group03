Hi xin chào các bạn, tiếp tục chuỗi chủ đề về cái thằng JavaScript này, hôm nay mình sẽ giới thiệu cho các bạn một số thủ thuật hay ho khi làm việc với chuỗi trong JavaScript có thể bạn đã hoặc chưa từng dùng. Cụ thể như nào thì hãy cùng mình tìm hiểu trong bài viết này nhé (go)

![](https://images.viblo.asia/6611729b-963a-4846-9fd5-0f74804be878.png)

### 1. Sao chép một chuỗi nhiều lần

Thay vì phải gõ 1 chuỗi lặp đi lặp lại thì bạn có thể sử dụng method `.repeat()`.

Phương thức `repeat()` xây dựng và trả về một chuỗi mới chứa số lượng nhất định bản sao chép của chuỗi được gọi tới và nối chung với nhau.

```js
const laughing = "ha".repeat(3);
console.log(laughing); // "hahaha"
```

### 2. Chèn thêm ký tự vào chuỗi với một độ dài cụ thể cho trước

Trường hợp này bạn sẽ thường hay gặp nếu muốn mã hoá số điện thoại hoặc mã thẻ bằng việc sử dụng 2 method `padStart()` và `padEnd()`. Cụ thể bạn quan sát ví dụ sau để hình dung ra chức năng của nó

```js
// thêm dấu * tính từ đầu chuỗi cho đến khi đủ 8 ký tự
const eightBitsStart = "001".padStart(8, "*");
console.log(eightBitsStart); // "*****001"

// thêm dấu * tính từ cuối chuỗi cho đến khi đủ 8 ký tự
const eightBitsEnd = "001".padEnd(8, "*");
console.log(eightBitsEnd); // "001*****"
```

### 3. Biến string thành array

Sử dụng `spread operator` giúp bạn có thể dễ dàng biến string thành array trong 1 nốt nhạc

```js
const word = "apple";
const characters = [...word];
console.log(characters); // ["a", "p", "p", "l", "e"]
```

### 4. Đếm số ký tự trong chuỗi

Rất đơn giản, sử dụng `length` là xong
```js
const word = " apple ";
console.log(word.length); // 7
```
À mà từ từ quay xe đã, sao nó lại ra như này nhỉ =))

```js
const word = "𩸽";
console.log(word.length); // 2
```

Có thể giải thích như sau: JS đại diện cho hầu hết các ký tự dưới dạng điểm mã 16 bit. Tuy nhiên, một số ký tự nhất định được biểu diễn dưới dạng hai (hoặc nhiều) điểm mã 16 bit, được gọi là các cặp thay thế . Nếu bạn đang sử dụng `length`, JS sẽ cho bạn biết có bao nhiêu điểm mã được sử dụng. Do đó, `𩸽` bao gồm hai điểm mã và trả về một giá trị không chính xác.

Để giải quyết vấn đề này, bạn sẽ cần nhét nó vào array và lấy length của array

```js
const word = "𩸽";
const characters = [...word];
console.log(characters.length); // 1
```

### 5. Đảo ngược một chuỗi

Cũng lại cần đến anh array này 1 chút =))

```js
const word = "apple";
const reversedWord = [...word].reverse().join("");
console.log(reversedWord); // "elppa"
```

### 6. Viết hoa chữ cái đầu

Để làm được điều này thì CSS chỉ cần 1 dòng, còn JS thì cần mấy dòng đây

```js
let word = "apple";
word = word[0].toUpperCase() + word.substr(1);
console.log(word); // "Apple"
```

Cách dài hơn nhưng an toàn hơn (bạn có thể xem lại **#4** để hiểu issue)

```js
let word = "apple";
const characters = [...word];
characters[0] = characters[0].toUpperCase();
word = characters.join("");

console.log(word); // "Apple"
```

### 7. Viết hoa chữ cái đầu tiên của mỗi từ

```js
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());

capitalizeEveryWord('hello world!'); // "Hello World!"
```

### 8. Chia nhỏ chuỗi dựa theo một nhóm ký tự

Để làm được điều này bạn sẽ cần kết hợp `split()` và biểu thức regex để xác định sẽ chia chuỗi theo nhóm ký tự nào.

Xem ví dụ sau để hiểu rõ hơn

```js
const list = "apples,bananas;cherries";
const fruits = list.split(/[,;]/); // chia chuỗi dựa trên "," và ";"
console.log(fruits); // ["apples", "bananas", "cherries"]
```

### 9. Kiểm tra sự tồn tại của "chuỗi trong chuỗi"

Rất đơn giản, bạn có thể sử dụng `includes()`

```js
const text = "Hello, world! My name is Kai!"
console.log(text.includes("Kai")); // true
```

### 10. Kiểm tra chuỗi bắt đầu/kết thúc bằng 1 chuỗi

```js
const text = "Hello, world! My name is Kai!"
console.log(text.startsWith("Hello")); // true
console.log(text.endsWith("world")); // false
```

### 11. Thay thế toàn bộ sự xuất hiện của từ trong chuỗi

Khi nghe đến bài toán này đa phần chúng ta sẽ nghĩ đến regex dạng

```js
const text = "I like apples. You like apples."

console.log(text.replace(/apples/g, "bananas"));
// "I like bananas. You like bananas."
```

Tuy nhiên, trong các string method cũng có 1 method làm được điều tương tự

```js
const text = "I like apples. You like apples."

console.log(text.replaceAll("apples", "bananas"));
// "I like bananas. You like bananas."
```

### 12. Xoá thẻ HTML ra khỏi chuỗi

```js
const stripHTMLTags = str => str.replace(/<[^>]*>/g, '');

stripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p>'); // 'lorem ipsum'
```

### 13. Sắp xếp các ký tự trong chuỗi theo thứ tự bảng chữ cái

```js
const sortCharactersInString = str => [...str].sort((a, b) => a.localeCompare(b)).join('');

sortCharactersInString('cabbage'); // 'aabbceg'
```

### Kết luận
Trên đây là 1 vài đoạn snippet nho nhỏ nhưng có võ mình tin rằng sẽ giúp ích cho bạn rất nhiều trong quá trình làm việc với js.

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công !