Hi xin chào các bạn, ở chuỗi bài viết trước mình đã giới thiệu các method được sử dụng phổ biến nhất khi làm việc với Array trong JavaScript. Hôm nay chúng ta sẽ đến một bài viết khá hay ho nữa đó là: Làm thế nào để copy 'an toàn' một Array trong JS, 'an toàn' ở đây tức là ta phải đảm bảo việc copy không làm ảnh hưởng đến array gốc. Nào bắt đầu thôi !

![](https://images.viblo.asia/6611729b-963a-4846-9fd5-0f74804be878.png)

### 1. Sử dụng `Array.slice()`

Việc không truyền đối số vào `slice()` giúp ta tạo ra 1 bản sao từ array gốc

```js
const numbers = [1, 2, 3, 4, 5];
const copy = numbers.slice();

console.log(copy);    // > Array [1, 2, 3, 4, 5]
console.log(numbers); // > Array [1, 2, 3, 4, 5]
```

### 2. Sử dụng `Array.map()`

Nếu bên trong thân hàm `map()` ta không biến đổi gì mà chỉ return item thì đồng nghĩa với việc ta đang copy array

```js
const numbers = [1, 2, 3, 4, 5];

// ES5
const copy = numbers.map(function(number) {
  return number;
});

// ES6
// const copy = numbers.map(number => number);

console.log(copy);    // > Array [1, 2, 3, 4, 5]
console.log(numbers); // > Array [1, 2, 3, 4, 5]
```

### 3. Sử dụng `Array.from()`

`Set` trong JS là tập hợp các giá trị không bị trùng lặp, nghĩa là trong một set không thể có hai giá trị bằng nhau. Việc ta tạo ra 1 đối tượng `Set` chứa array và đặt vào trong `Array.from()` sẽ giúp ta copy được array

```js
const numbers = [1, 2, 3, 4, 5];
const copy = Array.from(new Set(numbers));

console.log(copy);    // > Array [1, 2, 3, 4, 5]
console.log(numbers); // > Array [1, 2, 3, 4, 5]
```

### 4. Sử dụng `spread operator`

Từ khoá này quá quen thuộc với các devjs rồi, thường khi đã làm việc với ES6 thì dấu **3 chấm** này được dùng rất phổ biến để copy array/object

```js
const numbers = [1, 2, 3, 4, 5];
const copy = [...numbers];

console.log(copy);    // > Array [1, 2, 3, 4, 5]
console.log(numbers); // > Array [1, 2, 3, 4, 5]
```

### 5. Sử dụng `Array.of()` kết hợp `spread operator`

`Array.of()` được dùng để tạo ra một mảng mới với các phần tử được truyền vào thông qua tham số truyền vào

```js
const numbers = [1, 2, 3, 4, 5];
const copy = Array.of(...numbers);

console.log(copy);    // > Array [1, 2, 3, 4, 5]
console.log(numbers); // > Array [1, 2, 3, 4, 5]
```

### 6. Sử dụng `Array.push()` kết hợp `spread operator`

Trước tiên ta khởi tạo 1 array rỗng, sau đó push nguyên array ban đầu vào ta sẽ thu được 1 bản sao

```js
const numbers = [1, 2, 3, 4, 5];
let copy = [];
copy.push(...numbers);

console.log(copy);    // > Array [1, 2, 3, 4, 5]
console.log(numbers); // > Array [1, 2, 3, 4, 5]
```

### 7. Sử dụng `Array.unshift()` kết hợp `spread operator`

Có `push()` thì đương nhiên sẽ có `unshift()`

```js
const numbers = [1, 2, 3, 4, 5];
let copy = [];
copy.unshift(...numbers);

console.log(copy);    // > Array [1, 2, 3, 4, 5]
console.log(numbers); // > Array [1, 2, 3, 4, 5]
```

### 8. Sử dụng `array constructor` kết hợp `spread operator`

Con hàng `...` này đúng là lợi hại, chỗ nào cũng thấy mặt :sweat_smile:
```js
const numbers = [1, 2, 3, 4, 5];
const copy = new Array(...numbers);

console.log(copy);    // > Array [1, 2, 3, 4, 5]
console.log(numbers); // > Array [1, 2, 3, 4, 5]
```

### 9. Sử dụng `destructuring`

Ngoài `spread operator` thì trong ES6 cũng giới thiệu thêm `destructuring`, sử dụng nó để copy array như sau

```js
const numbers = [1, 2, 3, 4, 5];
const [...copy] = numbers;

console.log(copy);    // > Array [1, 2, 3, 4, 5]
console.log(numbers); // > Array [1, 2, 3, 4, 5]
```

### 10. Sử dụng `Array.concat()`

Cũng giống như `slice()` việc bạn không truyền đối số vào `concat()` sẽ giúp trả về array mới chính là array ban đầu

```js
const numbers = [1, 2, 3, 4, 5];
const copy = numbers.concat();

console.log(copy);    // > Array [1, 2, 3, 4, 5]
console.log(numbers); // > Array [1, 2, 3, 4, 5]
```

### 11. Sử dụng `Array.forEach()` kết hợp `Array.push()`

```js
const numbers = [1, 2, 3, 4, 5];
let copy = [];

// ES5
numbers.forEach(function(value) {
  copy.push(value);
});

// ES6
// numbers.forEach(value => copy.push(value));

console.log(copy);    // > Array [1, 2, 3, 4, 5]
console.log(numbers); // > Array [1, 2, 3, 4, 5]
```

### 12. Sử dụng vòng lặp `for` truyền thống

```js
const numbers = [1, 2, 3, 4, 5];
let copy = [];
for (let i = 0; i < numbers.length; i++) {
  copy.push(numbers[i]);
}

console.log(copy);    // > Array [1, 2, 3, 4, 5]
console.log(numbers); // > Array [1, 2, 3, 4, 5]
```

### 13. Sử dụng `Array.reduce()`

Tạo một biến tích luỹ là 1 array rỗng sau đó push dần các phần tử vào sẽ giúp ta copy được array 

```js
const numbers = [1, 2, 3, 4, 5];
const copy = numbers.reduce((arr, item) => {
  arr.push(item);
  return arr;
}, []);

console.log(copy);    // > Array [1, 2, 3, 4, 5]
console.log(numbers); // > Array [1, 2, 3, 4, 5]
```

### 14. Sử dụng phương thức `apply`

```js
const numbers = [1, 2, 3, 4, 5];
let copy = [];
Array.prototype.push.apply(copy, numbers);

console.log(copy);    // > Array [1, 2, 3, 4, 5]
console.log(numbers); // > Array [1, 2, 3, 4, 5] 
```

## Kết luận

Trên đây mình đã giới thiệu 14 cách để clone 1 array, hi vọng sẽ giúp ích cho các bạn khi gặp bài toán phải clone array thành nhiều array khác để xử lý

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công !

Hẹn gặp lại ở các bài viết sau !