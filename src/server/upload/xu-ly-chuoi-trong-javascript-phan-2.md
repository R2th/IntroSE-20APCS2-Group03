Hi xin chào các bạn, tiếp nối chủ để xử lý chuỗi trong JS, hôm nay mình sẽ tiếp tục giới thiệu các phương thức được dùng phổ biến khi làm việc với dữ liệu kiểu chuỗi mà devjs không thể bỏ qua. Chúng ta cùng bắt đầu nhé

![](https://images.viblo.asia/6611729b-963a-4846-9fd5-0f74804be878.png)

### 11. String.prototype.split()
Đúng như cái tên của nó, `split()` chia một chuỗi thành một danh sách các chuỗi con có thứ tự, đặt các chuỗi con này vào một mảng và trả về mảng đó

```js
const str = 'The quick brown fox jumps over the lazy dog.';

const words = str.split(' ');
console.log(words);    // > Array ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog."]
console.log(words[3]); // > "fox"

const chars = str.split('');
console.log(chars);    // > Array ["T", "h", "e", " ", "q", "u", "i", "c", "k", " ", "b", "r", "o", "w", "n", " ", "f", "o", "x", " ", "j", "u", "m", "p", "s", " ", "o", "v", "e", "r", " ", "t", "h", "e", " ", "l", "a", "z", "y", " ", "d", "o", "g", "."]
console.log(chars[8]); // > "k"

const strCopy = str.split();
console.log(strCopy); // > Array ["The quick brown fox jumps over the lazy dog."]
```

**Cú pháp**
```js
str.split([separator[, limit]])

/* separator: Mẫu mô tả vị trí mỗi lần phân tách sẽ xảy ra. Dấu phân tách có thể là một chuỗi đơn giản hoặc nó có thể là một biểu thức chính quy.
+ Trường hợp đơn giản nhất là khi dấu phân cách chỉ là một ký tự đơn lẻ, nó được sử dụng để chia một chuỗi phân tách
+ Nếu dấu phân tách chứa nhiều ký tự, toàn bộ chuỗi ký tự đó phải được tìm thấy để tách
+ Nếu dấu phân tách bị bỏ qua hoặc không xuất hiện trong str, mảng được trả về chứa một phần tử bao gồm toàn bộ chuỗi
+ Nếu dấu phân tách xuất hiện ở đầu (hoặc cuối) của chuỗi, nó vẫn có tác dụng phân tách. Kết quả là một chuỗi rỗng (tức là độ dài bằng 0), xuất hiện ở vị trí đầu tiên (hoặc cuối cùng) của mảng được trả về.
+ Nếu dấu phân tách là một chuỗi rỗng (""), str được chuyển đổi thành một mảng của mỗi "ký tự" UTF-16 của nó
*/

/* limit (không bắt buộc): Một số nguyên không âm xác định, giới hạn về số lượng chuỗi con được đưa vào mảng */
```


### 12. String.prototype.substring()

Phương thức `substring()` trả về một phần của chuỗi nằm giữa chỉ mục đầu và chỉ mục kết thúc hoặc đến cuối chuỗi

```js
const str = 'Mozilla';

console.log(str.substring(1, 3)); // > "oz"
console.log(str.substring(2)); // > "zilla"
```

**Cú pháp**
```js
str.substring(indexStart[, indexEnd])

// indexStart: Chỉ mục của ký tự đầu tiên
// indexEnd: Chỉ mục của ký tự cuối cùng
```

### 13. String.prototype.toString()

Phương thức `toString()` trả về một chuỗi đại diện cho đối tượng được chỉ định

```js
const stringObj = new String('foo');

console.log(stringObj); // > String { "foo" }
console.log(stringObj.toString()); // > "foo"
```

**Cú pháp**
```js
str.toString()
```

### 14. String.prototype.toLowerCase()

Phương thức `toLowerCase()` trả về 1 chuỗi đã được chuyển đổi sang chữ thường

```js
const sentence = 'The quick brown fox jumps over the lazy dog.';

console.log(sentence.toLowerCase()); // > "the quick brown fox jumps over the lazy dog."
```

**Cú pháp**
```js
str.toLowerCase()
```

### 15. String.prototype.toUpperCase()

Phương thức `toUpperCase()` trả về 1 chuỗi đã được chuyển đổi sang chữ hoa

```js
const sentence = 'The quick brown fox jumps over the lazy dog.';

console.log(sentence.toUpperCase()); // > "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."
```

### 16. String.prototype.trim()

Phương thức `trim()` loại bỏ khoảng trắng từ cả hai đầu của một chuỗi. Khoảng trắng trong ngữ cảnh này là tất cả các ký tự khoảng trắng (dấu cách, tab, dấu cách không ngắt, v.v.) và tất cả các ký tự kết thúc dòng (LF, CR, v.v.).

```js
const greeting = '   Hello    world!   ';

console.log(greeting.trim()); // > "Hello    world!"
```

**Cú pháp**
```js
str.trim()
```

### 17. String.prototype.trimEnd()

Phương thức `trimEnd()` loại bỏ khoảng trắng ở cuối chuỗi

```js
const greeting = '   Hello world!   ';

console.log(greeting.trimEnd()); // > "   Hello world!"
```

**Cú pháp**
```js
str.trimEnd();
```

### 18. String.prototype.trimStart()

Phương thức `trimStart()` loại bỏ khoảng trắng ở cuối chuỗi

```js
const greeting = '   Hello world!   ';

console.log(greeting.trimStart()); // > "Hello world!   "
```

**Cú pháp**
```js
str.trimStart();
```

### 19. String.prototype.valueOf()

Phương thức `valueOf()` trả về một giá trị nguyên thủy của một đối tượng chuỗi

```js
const stringObj = new String('foo');

console.log(stringObj); // > String { "foo" }
console.log(stringObj.valueOf()); // > "foo"
```

**Cú pháp**
```js
str.valueOf()
```

### Kết luận

Trên đây mình đã giới thiệu tới các bạn hầu hết các phương thức phổ biến khi thao tác với dữ liệu dạng String, hi vọng sẽ có ích cho bạn trong quá trình làm việc

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công !