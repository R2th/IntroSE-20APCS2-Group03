Xử lý chuỗi trong JavaScript là một kỹ năng cơ bản mà bất kì devjs nào cũng cần biết, tương tự như anh array, String cũng được các nhà phát triển liên tục cải tiến và cập nhật. Đến nay chắc cũng phải có 9 vạn 8 nghìn  phương thức xử lý chuỗi khác nhau góp phần làm cho dev thêm đau não mỗi khi sử dụng :sweat_smile: Hãy cùng tìm hiểu các phương thức phố biến cùng mình qua bài viết này nhé !

![](https://images.viblo.asia/6611729b-963a-4846-9fd5-0f74804be878.png)

### 1. String.prototype.charAt()

* Trả về ký tự ở vị trí đã chỉ định theo index. Ví dụ vị trí đầu tiên là 0 tiếp theo là 1, 2...
* Nếu index nằm ngoài khoảng sẽ trả về **chuỗi rỗng**

```js
const sentence = 'The quick brown fox jumps over the lazy dog.';
const index = 4;
const index1 = 100;
console.log(`The character at index ${index} is ${sentence.charAt(index)}`);   // > "The character at index 4 is q"
console.log(`The character at index ${index1} is ${sentence.charAt(index1)}`); // > "The character at index 100 is "
```

**Cú pháp**
```js
str.charAt(index)

/* index: số nguyên trong khoảng 0 tới str.length - 1
  nếu index không thể chuyển đổi sang số nguyên hoặc index không được cung cấp thì mặc định index = 0 */
```

### 2. String.prototype.charCodeAt()

* Trả về một số nguyên trong khoảng `0` đến `65535` theo chuẩn UTF-16
* Nếu index nằm ngoài khoảng sẽ trả về `NaN`

```js
const sentence = 'The quick brown fox jumps over the lazy dog.';
const index = 4;
const index1 = 100;
console.log(`The character code ${sentence.charCodeAt(index)} is equal to ${sentence.charAt(index)}`);   // > "The character code 113 is equal to q"
console.log(`The character code ${sentence.charCodeAt(index1)} is equal to ${sentence.charAt(index1)}`); // > "The character code NaN is equal to "
```

**Cú pháp**
```js
str.charCodeAt(index)

/* index: số nguyên trong khoảng 0 tới str.length - 1
  nếu index không phải là số thì mặc định index = 0 */
```

### 3. String.prototype.concat()

Thường để nối chuỗi ta hay dùng dấu `+`, tuy nhiên JS có cung cấp cho ta method này với chức năng tương tự
* Phương thức này trả về 1 chuỗi mới sau khi nối

```js
const str1 = 'Hello';
const str2 = 'World';
const str3 = '!';
console.log(str1.concat(' ', str2, ' ', str3)); // > "Hello World !"
```

**Cú pháp**
```js
str.concat(str2 [, ...strN])

// str2 [, ...strN]: các chuỗi sẽ nối tiếp vào str
```

### 4. String.prototype.includes()

* Dùng để kiểm tra  một chuỗi có thể được tìm thấy trong một chuỗi khác hay không
* Trả về `true` nếu tìm thấy hoặc `false` nếu không

```js
const sentence = 'The quick brown fox jumps over the lazy dog.';
const word = 'fox';
const word1 = 'hello';
console.log(`The word '${word}' ${sentence.includes(word) ? 'is' : 'is NOT'} in the sentence`);   // > "The word 'fox' is in the sentence"
console.log(`The word '${word1}' ${sentence.includes(word1) ? 'is' : 'is NOT'} in the sentence`); // > "The word 'hello' is NOT in the sentence"
```

**Cú pháp**
```js
str.includes(searchString[, position])

// searchString: từ khóa để tìm kiếm bên trong str
// position (không bắt buộc): Vị trí trong chuỗi bắt đầu tìm kiếm cho searchString (mặc định là 0)
```

### 5. String.prototype.indexOf()

* Dùng để tìm kiếm vị trí của chuỗi trong một chuỗi khác
* Trả về vị trí đầu tiên được tìm thấy (bắt đầu từ vị trí được chỉ định tìm kiếm) hoặc `-1` nếu không tìm thấy 

```js
const paragraph = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?';

const searchTerm = 'dog';
const indexOfFirst = paragraph.indexOf(searchTerm);

console.log(`The index of the first '${searchTerm}' from the beginning is ${indexOfFirst}`);                  // > "The index of the first 'dog' from the beginning is 40"
console.log(`The index of the 2nd '${searchTerm}' is ${paragraph.indexOf(searchTerm, (indexOfFirst + 1))}`);  // > "The index of the 2nd 'dog' is 52"
```

**Cú pháp**
```js
str.indexOf(searchValue [, fromIndex])

// searchValue: từ khóa để tìm kiếm
// fromIndex (không bắt buộc): vị trí bắt đầu để tìm kiếm, mặc định là 0
```

### 6. String.prototype.lastIndexOf()

Ngược lại với `indexOf()`, nó bắt đầu tìm từ vị trí cuối của chuỗi

```js
const paragraph = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?';

const searchTerm = 'dog';
const indexOfFirst = paragraph.lastIndexOf(searchTerm);

console.log(`The index of the first '${searchTerm}' from the beginning is ${indexOfFirst}`);                     // > "The index of the first 'dog' from the beginning is 52"
console.log(`The index of the 2nd '${searchTerm}' is ${paragraph.lastIndexOf(searchTerm, (indexOfFirst - 1))}`); // > "The index of the 2nd 'dog' is 40"
```

### 7. String.prototype.match()

Regex trong JS là 1 thứ gì đó rất vi diệu và method này cũng thường xuyên được sử dụng khi làm việc với Regex

* Trả về kết quả của việc khớp chuỗi với 1 biểu thức chính quy ([regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions))
* Trả về 1 array chứa các nội dung khớp hoặc `null` nếu không tìm thấy

```js
const paragraph = 'The quick 1 brown fox jumps over the lazy dog. It 3 barked.';
const regex = /[A-Z]|\d/g; // tìm các kí tự in hoa hoặc số
const found = paragraph.match(regex);

console.log(found); // > Array ["T", "1", "I", "3"]
```

**Cú pháp**
```js
str.match(regexp)

// regexp: một biểu thức chính quy
```

### 8. String.prototype.replace()

* Phương thức này được sử dụng rất nhiều trong trường hợp ta muốn thay thế hoặc xóa kí tự trong chuỗi
* Chuỗi cần thay thế có thể là một chuỗi đơn thuần hoặc 1 biểu thức chính quy

```js
const p1 = 'The quick brown fox jumps over the lazy dog. If the DOG reacted, was it really lazy?';
const p2 = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

const regex = /dog/gi; // tìm tất cả chuỗi 'dog' không phân biệt hoa thường

console.log(p1.replace(regex, '123')); // > "The quick brown fox jumps over the lazy 123. If the 123 reacted, was it really lazy?"
console.log(p2.replace('dog', '456')); // > "The quick brown fox jumps over the lazy 456. If the dog reacted, was it really lazy?"
```

**Cú pháp**
```js
const newStr = str.replace(regexp|substr, newSubstr|function)

// regexp: 1 biểu thức chính quy
// substr: chuỗi bị thay thế
// newSubstr: chuỗi thay thế
// function: Một hàm được gọi để tạo chuỗi con mới
```

### 9. String.prototype.search()

* Dùng để tìm kiếm vị trí của chuỗi trong một chuỗi khác
* Trả về vị trí tìm thấy hoặc `-1` nếu không
* Mẫu tìm kiếm có thể là chuỗi hoặc một biểu thức chính quy

```js
const paragraph = 'The quick brown fox jumps over the lazy dog 123. If the dog barked, was it really lazy?';
const regex = /\d/g;

console.log(paragraph.search('dog')); // > 40
console.log(paragraph.search(regex)); // > 44
```

**Cú pháp**
```js
str.search(regexp)

// regexp: 1 biểu thức chính quy
```

### 10. String.prototype.slice()

* Dùng để trích xuất một phần của chuỗi và trả về nó dưới dạng một chuỗi mới mà không thay đổi chuỗi ban đầu
* Phương thức này khá giống với `slice()` trong Array mà mình đã giới thiệu với các bạn ở bài viết trước
```js
const str = 'The quick brown fox jumps over the lazy dog.';
 //=> index  01234...
 //=> index                                         ...-1   
 
console.log(str.slice(31));     // lấy từ index = 31 tới str.length
console.log(str.slice(4, 19));  // lấy từ index = 4 tới index = 19
console.log(str.slice(-4));     // lấy từ index = -4 tới str.length
console.log(str.slice(-9, -5)); // lấy từ index = -9 tới index = -5

> "the lazy dog."
> "quick brown fox"
> "dog."
> "lazy"
```

**Cú pháp**
```js
str.slice(beginIndex[, endIndex])

/* beginIndex: bắt đầu từ 0
+ Nếu là số âm sẽ được tính bằng str.length + beginIndex (ví dụ -3 thì beginIndex = str.length - 3 hoặc bạn có thể đánh chỉ số âm giống mình cho dễ hình dung)
+ Nếu không phải số nguyên sẽ mặc định là 0
+ Nếu lớn hơn str.length thì 1 chuỗi rỗng được trả về */

/* endIndex (Không bắt buộc): giá trị đánh dấu kết thúc trích xuất
+ Nếu endIndex bị bỏ qua hoặc không được xác định, hoặc lớn hơn str.length, thì slice() sẽ trích xuất đến cuối chuỗi.
+ Nếu endIndex được chỉ định và startIndex là âm, thì endIndex phải là số âm, nếu không sẽ trả về một chuỗi rỗng (ví dụ slice(-3, 0) sẽ trả về "")
*/
```

### Tạm kết

Bài viết khá dài rồi mình tạm thời dừng ở đây và sẽ tiếp tục trình bày thêm một số phương thức nữa ở bài viết sau nhé :grinning:

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công !