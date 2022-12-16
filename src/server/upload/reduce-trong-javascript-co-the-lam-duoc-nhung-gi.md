Hi xin chào các bạn, tiếp tục chuỗi chủ để về JavaScript hôm nay chúng ta sẽ cùng tìm hiểu một method có thể coi là loằng ngoằng nhất khi làm việc với array js đó là `reduce()`. Ngoài ví dụ điển hình nhất là "tính tổng" thì liệu `reduce()` có thể làm được những gì,.... Hãy cùng mình tìm hiểu thông qua bài viết này nhé

![](https://images.viblo.asia/6611729b-963a-4846-9fd5-0f74804be878.png)

Nhắc lại một chút thì `reduce()` dùng để **thực thi một hàm lên từng phần tử** của mảng (từ trái sang phải) **với một biến tích lũy để thu về một giá trị duy nhất**
- reduce() **KHÔNG** làm thay đổi mảng ban đầu
- reduce() **trả về giá trị sau khi rút gọn**

**Cú pháp**
```javascript
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])

// callback: Hàm dùng để thực thi với từng phần tử của mảng,
// hàm này nhận vào 4 tham số:

  /* accumulator: Biến tích lũy, truyền giá trị trả về của mỗi lần gọi callback,
  nó là giá trị tích lũy được trả về trong lần gọi callback trước,
  hoặc giá trị của tham số initialValue, nếu được cung cấp */
  
  /* currentValue: Phần tử trong mảng hiện tại đang được xử lý */
  
  /* index (không bắt buộc): Chỉ mục (index) của phần tử đang được xử lý
  Bắt đầu tại 0 nếu giá trị initialValue được cung cấp,
  Bắt đầu tại 1 nếu không có initialValue */
  
  /* array (không bắt buộc): Mảng đang được gọi với reduce() */
  
  /* initialValue (không bắt buộc nhưng NÊN khai báo nó):
  Giá trị cho tham số thứ nhất (accumulator) của hàm callback trong LẦN GỌI ĐẦU TIÊN. 
  Nếu giá trị ban đầu này không được cung cấp, phần tử đầu tiên của mảng sẽ được dùng.
  Do đó, gọi reduce() trên một mảng rỗng và không có giá trị ban đầu sẽ gây ra lỗi */
```

Sau đây sẽ là một số ví dụ cũng có thể gọi là những đoạn snippet vô cùng lợi hại giúp ích cho bạn trong quá trình làm việc.

### 1. Tính tổng, hiệu, tích, thương ...

```js
const accumulation = (...numbers) =>
  numbers.reduce((sum, num) => sum + num, 0);
console.log(accumulation(1, 2, 3, 4, 5)); // > 15
```

### 2. Thay thế `Array.prototype.reverse()`

```js
const reverseArr = (arr = []) =>
  arr.reduceRight((t, v) => (t.push(v), t), []);
console.log(reverseArr([1, 2, 3, 4, 5])); // > Array [5, 4, 3, 2, 1]
```

### 3. Thay thế `Array.prototype.map()`

```js
const arr = [0, 1, 2, 3];

const a = arr.map(v => v * 2);
const b = arr.reduce((t, v) => [...t, v * 2], []);

console.log(a, b); // > Array [0, 2, 4, 6] Array [0, 2, 4, 6]
```

### 4. Thay thế `Array.prototype.filter()`

```js
const a = arr.filter(v => v > 1);
const b = arr.reduce((t, v) => (v > 1) ? [...t, v] : t, []);

console.log(a, b); // > Array [2, 3] Array [2, 3]
```

### 5. Thay thế `Array.prototype.some()`

```js
const arr = [
    { score: 10, subject: "a" },
    { score: 30, subject: "b" },
    { score: 20, subject: "c" }
];

const a = arr.some(v => v.score >= 20);
const b = arr.reduce((t, v) => t || v.score >= 20, false);

console.log(a, b); // > true true
```

### 6. Thay thế `Array.prototype.every()`

```js
const arr = [
    { score: 10, subject: "a" },
    { score: 30, subject: "b" },
    { score: 20, subject: "c" }
];

const a = arr.every(v => v.score >=20);
const b = arr.reduce((t, v) => t && v.score >= 20, true);

console.log(a, b); // > false false
```

### 7. Tìm phần tử khác nhau giữa 2 array

```js
const diffItem = (arr = [], otherArr = []) =>
  arr.reduce((t, v) => (!otherArr.includes(v) && t.push(v), t), []);

const a = [1, 2, 3, 4, 5];
const b = [2, 3, 6];

console.log(diffItem(a, b)); // > Array [1, 4, 5]
```

### 8. Chia nhỏ array

```js
const chunkArr = (arr = [], size = 1) => {
  return arr.length
    ? arr.reduce((t, v) => (
        t[t.length - 1].length === size
          ? t.push([v])
          : t[t.length - 1].push(v), t)
      , [[]])
    : [];
}

const a = [1, 2, 3, 4, 5];

console.log(chunkArr(a, 2)); // > Array [[1, 2], [3, 4], [5]]
```

### 9. Ngược lại với thằng thứ 8

```js
const flatArr = (arr = []) => 
  arr.reduce((t, v) => t.concat(Array.isArray(v) ? flatArr(v) : v), [])

const a = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];

console.log(flatArr(a));
// > Array [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

### 10. Loại bỏ phần tử trùng lặp

```js
const uniq = (arr = []) =>
  arr.reduce((t, v) => t.includes(v) ? t : [...t, v], []);

const a = [2, 1, 0, 3, 2, 1, 2];

console.log(uniq(a)); // > Array [2, 1, 0, 3]
```

### Tạm kết

Cũng khá dài rồi, đọc nhiều cũng đau hết đầu =)) mình tạm dừng bài viết tại đây nhé, hẹn các bạn ở phần tiếp theo với những thứ hay ho với `reduce()` nhé

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công !