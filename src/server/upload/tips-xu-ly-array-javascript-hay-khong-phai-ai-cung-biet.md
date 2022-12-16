Xin chào tất cả mọi người! Đang trong thời đại của Cô Vy, cả nước đang thực hiện nghiêm việc cách ly toàn xã hội. Vậy nên thời gian cũng rảnh rỗi hơn, mình có đi lang thang vài blog IT thì có lượm nhặt được vài tips khá hay về `mảng (Array)` trong `Javascript`, muốn share lại cho mọi người.  Và nếu mọi người biết các tips nào khác hãy share lại với mình để chúng ta cùng nâng cao kiến thức làm việc với `Array` nhé :100: :100: :100: 

Cùng bắt đầu với mình nào!
![](https://images.viblo.asia/8d834ef6-01b1-46f3-ba81-eb1b401ea6a5.jpeg)

# 1. Xóa bỏ giá trị trùng lặp
Đây là một câu hỏi phỏng vấn rất phổ biến về `Array Javascript`, làm thế nào để trích xuất các giá trị duy nhất trong Array. Giải quyết vấn đề này, bạn có thể sử dụng `new Set()`.
```js
let fruits = ['banana', 'apple', 'orange', 'watermelon', 'apple', 'orange', 'grape', 'apple'];

// First method
let uniqueFruits = Array.from(new Set(fruits));
console.log(uniqueFruits); // returns ['banana', 'apple', 'orange', 'watermelon', 'grape']

// Or use Second metho
let uniqueFruits2 = [...new Set(fruits)];
console.log(uniqueFruits2); // returns ['banana', 'apple', 'orange', 'watermelon', 'grape']
```

# 2. Thay đổi giá trị trong mảng
Đôi khi, bạn cần phải thay thế 1 giá trị cụ thể trong mảng và có 1 phương pháp hay và ngắn gọn để làm điều đó. Chúng ta có thể sử dụng `splice()` method.

**Cú pháp:** `Array.splice(index, howmany, item1, ..., itemX)`

**Trong đó:**
* `index` - là vị trí bắt đầu thay thế.
* `howmany` - số phần tử sẽ bị loại bỏ, tính từ vị trí `index` bao gồm cả phần tử index. Nếu `howmany` mang giá trị 0 thì sẽ không có phần tử nào bị loại bỏ.
* `item1, ..., itemX` - các phần tử sẽ được thêm vào từ vị trí `index`. Sau khi thêm, phần tử thứ index của mảng sẽ là item1.

```js
let fruits = ['banana', 'apple', 'orange', 'watermelon', 'apple'];

fruits.splice(0, 2, 'potato', 'tomato');
console.log(fruits); // returns ['potato', 'tomato', 'orange', 'watermelon', 'apple']
```

# 3. Map array without .map()
Có lẽ mọi người đều biết `map()` method trong Array, nhưng có 1 giải pháp khác được sử dụng có kết quả tương tự và code khá sạch sẽ. Đó là ta có thể sử dụng `from()` method cho mục đích này.

```js
let friends = [
    { name: 'John', age: 22 },
    { name: 'Peter', age: 23 },
    { name: 'Mark', age: 24 },
    { name: 'Maria', age: 22 },
    { name: 'Monica', age: 21 },
    { name: 'Martha', age: 19 },
];

// Use Array.from()
let friendsNames = Array.from(friends, ({name}) => name);
console.log(friendsNames); // returns ['John', 'Peter', 'Mark', 'Maria', 'Monica', 'Martha']

// Use Array.map()
let friendsNames2 = friends.map((friend, index) => {
    return friend.name;
});
console.log(friendsNames2); // returns ['John', 'Peter', 'Mark', 'Maria', 'Monica', 'Martha']
```

# 4. Empty an array
Cách khá đơn giản, bạn chỉ cần gán `Array.length = 0` là mọi chuyện được giải quyết. Ngoài ra còn có các cách khác nữa, cùng xem ví dụ nhé.
```js
let fruits = ['banana', 'apple', 'orange', 'watermelon', 'apple', 'orange', 'grape', 'apple'];

fruits.length = 0;

// or
fruits = [];

// or
fruits.splice(0);

// or
while (fruits.length > 0) {
    fruits.pop();
}

console.log(fruits); // returns []
```

# 5. Convert array to an object
Vấn đề này xảy ra rằng chúng ta đang có 1 mảng Array, nhưng với mục đích nào đó, ta cần chuyển thành 1 Object với dữ liệu đó. Cách nhanh nhất để chuyển đổi mảng Array thành Object là sử dụng `Spread Operator (...)` trong `ES6`.

```js
let fruits = ['banana', 'apple', 'orange', 'watermelon'];
let fruitsObj = { ...fruits };

console.log(fruitsObj); // returns {0: 'banana', 1: 'apple', 2: 'orange', 3: 'watermelon'}
```

Nếu bạn nào chưa biết ES6 là gì? Đừng lo lắng về nó, hãy tham khảo [Series ECMAScript - ES6](https://viblo.asia/p/ecmascript-es6-la-gi-overview-es6-gAm5y9RA5db) của anh Trần Văn Mỹ để có kiến thức về nó nhé!
# 6. Merge arrays
Với bài toán này, chúng ta sẽ nghĩ ngay đến việc sử dụng phương thức `concat()`. Ta cũng có thể giải quyết bằng cách lại một lần nữa sử dụng `Spread Operator (...)` trong `ES6`.

```js
let fruits = ['apple', 'banana', 'orange'];
let meats = ['poultry', 'beef', 'fish'];
let vegetables = ['potato', 'tomato', 'cucumber'];

// Use Spread Operator ES6
let foods = [...fruits, ...meats, ...vegetables];
console.log(foods); // returns ['apple', 'banana', 'orange', 'poultry', 'beef', 'fish', 'potato', 'tomato', 'cucumber'];

// Use concat() method
let foods2 = fruits.concat(meats, vegetables);

console.log(foods2); // returns ['apple', 'banana', 'orange', 'poultry', 'beef', 'fish', 'potato', 'tomato', 'cucumber'];
```

# 7. Tìm giá trị giống nhau giữa 2 mảng
Bài toán giả sử được đưa ra phần này, đó là tìm ra các giá trị chung giữa 2 mảng và chúng không được trùng lặp.
```js
let numOne = [0, 2, 4, 6, 8, 8];
let numTwo = [1, 2, 3, 4, 5, 6];

// Use include() method
let duplicatedValues = [...new Set(numOne)].filter(item => numTwo.includes(item));
console.log(duplicatedValues); // returns [2, 4, 6]

// Use has() method
let firstValues = new Set(numOne);
let duplicatedValues2 = numTwo.filter(item => firstValues.has(item));
console.log(duplicatedValues2); // returns [2, 4, 6]
```

# 8. Xóa các giá trị Falsy trong mảng
Đầu tiên, phải xác định giá trị `Falsy`, bạn có thể tìm đọc thêm [tại đây](https://viblo.asia/p/truthy-and-falsy-when-all-is-not-equal-in-javascript-3P0lPEqG5ox). Trong `Javascript`, có các giá trị `Falsy` là `false, 0 hoặc NaN, '' hoặc "", null, undefined`.

Bây giờ, ta có thể tìm hiểu làm thế nào để loại bỏ giá trị này khỏi mảng. Để đạt được điều này, chúng ta sẽ sử dụng phương thức `filter()`

```js
let mixedArr = [0, 'blue', '', NaN, 9, true, undefined, 'white', false, "", null];
let trueArr = mixedArr.filter(Boolean);

console.log(trueArr); // returns ['blue', 9, true, 'white']
```

# 9 . Tìm index của phần tử xuất hiện cuối cùng trong mảng
Bài toán đưa ra là chúng ta có một mảng Array và có giá trị trùng lặp, tìm vị trí xuất hiện cuối cùng. Giải quyết bài toán bằng cách sử dụng phương thức `lastIndexOf()`.
```js
let nums = [1, 5, 2, 6, 3, 5, 2, 3, 6, 5, 2, 7];
let lastIndex = nums.lastIndexOf(5);

console.log(lastIndex); // returns 9
```

# 10. Tính toán các giá trị trong mảng
Điều này ta có thể sử dụng `for()` hoặc `foreach()`, khai báo 1 biến `sum` rồi cộng với từng giá trị trong mảng. Với ES6, ta có phương thức `reduce()` giúp cho việc tính tổng ngắn gọn và sạch sẽ code hơn.

```js
let numbers = [5, 15, 20];
 
let sum = numbers.reduce(function(a, b) {
    return a + b;
});
 
let sub = numbers.reduce((a, b) => {
    return a - b;
});
 
let mul = numbers.reduce((a, b) => {
    return a * b;
});

let div = numbers.reduce((a, b) => {
    return a / b;
});
 
console.log(sum); // 40
console.log(sub); // -30
console.log(mul); // 1500
console.log(div); // 0.016666666666666666
```

# 11. Reversing an array
Khi chúng ta cần đảo ngược mảng, không cần phải tạo nó thông qua các vòng lặp và hàm phức tạp. Hãy sử dụng phương thức `reverse()` dễ dàng thực hiện tất cả cho chúng ta.
```js
let colors = ['white', 'green', 'navy', 'pink', 'purple'];

let reversedColors = colors.reverse();

console.log(reversedColors); // returns ['purple', 'pink', 'navy', 'green', 'white']
console.log(colors); // returns ['purple', 'pink', 'navy', 'green', 'white']
```
Với cách sử dụng trên, mảng ban đầu `colors[]` cũng sẽ bị thay đổi theo. Nếu bạn không muốn thay đổi mảng ban đầu của nó, bạn có thể viết:
```js
let colors = ['white', 'green', 'navy', 'pink', 'purple'];

let reversedColors = [...colors].reverse();
// or
let reversedColors2 = colors.slice().reverse();

console.log(colors); // returns ['purple', 'pink', 'navy', 'green', 'white']

console.log(reversedColors); // returns ['purple', 'pink', 'navy', 'green', 'white']
console.log(reversedColors2); // returns ['purple', 'pink', 'navy', 'green', 'white']
```

# 12. Tìm số nhỏ nhất trong mảng
Sử dụng phương thức `Math.min()`
```js
let numbers = [80, 300, 1500];
 
let min = Math.min(...numbers);
 // Or
let min = Math.min.apply(null, numbers);
 
console.log(min); // 80
```

# Tổng kết
Trong bài viết này, mình đã chia sẻ cho bạn vài tips mình biết. Hy vọng những tips trên sẽ phần nào giúp đỡ các bạn trong khi làm việc với Javascript.

Cảm ơn bạn đã đọc bài viết của mình!

## Tài liệu tham khảo
https://www.w3schools.com/js/js_es6.asp

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

https://www.freecodecamp.org/news/https-medium-com-gladchinda-hacks-for-creating-javascript-arrays-a1b80cb372b/