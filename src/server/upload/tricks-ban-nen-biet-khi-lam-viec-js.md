Khi bắt đầu học `Javascript`, mình đã tìm kiếm được 1 số những trick và hôm nay mình sẽ chia sẻ cho các bạn những thứ hay ho đó, mình nghĩ nó sẽ giúp ích rất nhiều cho các bạn trong quá trình code.

## 1. Filter Unique Values
`Set` được đưa vào trong es6, cùng với ... `spread operator`, chúng ta có thể sử dụng nó để tạo ra một `array` mới với giá trị duy nhất.

```javascript
const array = [1, 1, 2, 3, 5, 5, 1]
const uniqueArray = [...new Set(array)];

console.log(uniqueArray); // Result: [1, 2, 3, 5]
```

Trick này làm việc đối với những `array` có giá trị nguyên thuỷ (`primitive type`): `undefined`, `null`, `boolean`, `string` và `number` (Nếu bạn có `array` chứa những `object`, `function`, `array` thì không áp dụng Set được nhé !!!)

## 2. Every and Some
Hàm `every` và `some` không phải là 2 hàm thường sử dụng nhiều. Nhưng nó lại rất hữu ích trong một vài trường hợp nhất định. 

`every`: chạy qua từng phần tử và kiểm tra một điều kiện nhất định. Nếu pass qua hết phần tử trong mảng sẽ trả về `true`. Nếu một phần tử không thoả màn điều kiện trả về `false`

```javascript
const random_numbers = [ 13, 2, 37, 18, 5 ]
const more_random_numbers = [ 0, -1, 30, 22 ]

const isPositive = (number) => {
  return number > 0
}

random_numbers.every(isPositive); // returns true
more_random_numbers.every(isPositive); // returns false
```

`some`: chạy qua từng phần tử và kiểm tra một điều kiện nhất định. Nếu tìm thấy được phần tử nào đủ điều kiện thì trả về `true`. Nếu chạy hết phần tử trong mảng mà vẫn không tìm thấy phần tử phù hợp điều kiện thì trả về `false` 

```javascript
const random_numbers = [ 13, 2, 37, 18, 5 ]
const more_random_numbers = [ 0, -1, 30, 22 ]

const isPositive = (number) => {
  return number > 0
}

random_numbers.some(isPositive); // returns true
more_random_numbers.some(isPositive); // returns true
```
## 3. Convert to Boolean
Ngoài những giá trị `boolean` thuần `true` và `false`, tất cả giá trị trong `Javascript` là `truthy` ngoại trừ `0`,  `''`, `null`, `undefined`, `NaN` là `falsy`

Chúng ta có thể chuyển đổi giữa `true` và `false` bằng việc sử dụng  `!` (`negative operator`), toán tử `!` có thể chuyển một `type` thành `boolean`

```javascript
const isTrue  = !0;
const isFalse = !1;
const alsoFalse = !!0;

console.log(isTrue); // Result: true
console.log(typeof true); // Result: "boolean"
```
Kiểu chuyển đổi này rất tiện trong những câu lệnh điều kiện.
## 4. Convert to String
Chuyển đổi nhanh một `number` thành một `string`, chúng ta có thể sử dụng toán tử `+ ''`
```javascript
const val = 1 + "";

console.log(val); // Result: "1"
console.log(typeof val); // Result: "string"
```
## 5. Get the Last Item(s) in an Array
Method slice() trong `array` có thể nhận một số nguyên âm, và nếu bạn đưa vào đó là số nguyên âm thì nó sẽ lấy từ điểm cuối của một `array` thay vì điểm bắt đầu

```javascript
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(array.slice(-1)); // Result: [9]
console.log(array.slice(-2)); // Result: [8, 9]
console.log(array.slice(-3)); // Result: [7, 8, 9]
```


Nguồn tham khảo: https://morioh.com/p/2a323b4a7909