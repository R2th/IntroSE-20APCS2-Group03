![](https://images.viblo.asia/8566732e-0e73-4ead-96e7-e162f7bcfce7.png)

## Mở đầu

Khi làm việc với array trong Javascript, chắc hẳn các bạn đã từng làm hoặc biết đến khái niệm "reverse", "reverse" có nghĩa là đảo ngược một array. Vậy có bao nhiêu cách để reverse array, vì sao phải đảm bảo tính chất "Immutable" khi revserse array, mời các bạn cùng xem bài viết nhé.

##  Vấn đề
Hãy xem ví dụ dưới đây:

```javascript
const originalArray = ['a', 'b', 'c'];
const newArray = originalArray.reverse();

console.log(originalArray); // [ 'c', 'b', 'a' ]
console.log(newArray); // [ 'c', 'b', 'a' ]
```

Như ta thấy ở trên, khi dùng phương thức `reverse` của ES6, thật dễ dàng để reverse array `originalArray`, nhưng nó lại không đảm bảo tính "immutable" trong Javascript mà mình có đề cập ở 1 số bài viết trước, phương thức này làm thay đổi array ban đầu. Vì vậy, khi làm việc với các ứng dụng quản lý state là không khả thi.

Vậy để đảm bảo tính "immutable" khi reverse array sẽ có những cách nào? Mình sẽ liệt kê các phương thức thông qua các ví dụ dưới đây nhé :)

### Sử dụng `slice` kết hợp với `reverse`

```javascript
const originalArray = ['a', 'b', 'c'];
const newArray = originalArray.slice().reverse();

console.log(originalArray); // ['a', 'b', 'c']
console.log(newArray); // [ 'c', 'b', 'a' ]
```

### Sử dụng `spread` kết hợp với `reverse`

```javascript
const originalArray = ['a', 'b', 'c'];
const newArray = [...originalArray].reverse();

console.log(originalArray); // ['a', 'b', 'c']
console.log(newArray); // [ 'c', 'b', 'a' ]
```

### Sử dụng `reduce` kết hợp với `spread`

```javascript
const originalArray = ['a', 'b', 'c'];
const newArray = originalArray.reduce((accumulator, value) => {
  return [value, ...accumulator]
}, []);

console.log(originalArray); // ['a', 'b', 'c']
console.log(newArray); // [ 'c', 'b', 'a' ]
```

### Sử dụng `reduceRight` kết hợp với `spread`

```javascript
const originalArray = ['a', 'b', 'c'];
const newArray = originalArray.reduceRight((accumulator, value) => {
  console.log(value);
  return [...accumulator, value]
}, []);

console.log(originalArray); // ['a', 'b', 'c']
console.log(newArray); // [ 'c', 'b', 'a' ]
```

### Sử dụng `push`

```javascript
const originalArray = ['a', 'b', 'c'];
const newArray = originalArray.reduceRight((accumulator, value) => {
  accumulator.push(value);
  return accumulator;
}, []);

console.log(originalArray); // ['a', 'b', 'c']
console.log(newArray); // [ 'c', 'b', 'a' ]
```

Cảm ơn các bạn đã theo dõi bài viết! Xin chào và hẹn gặp lại ở các bài viết tiếp theo!

**Tham khảo:**

- [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
- [www.w3schools.com](https://www.w3schools.com/jsref/jsref_reverse.asp)
- [samanthaming.com](https://www.samanthaming.com/tidbits/74-how-to-reverse-an-array)