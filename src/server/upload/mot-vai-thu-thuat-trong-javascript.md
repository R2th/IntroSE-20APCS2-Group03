# Một vài thủ thuật trong javascript
1. Giới thiệu
2. Arrow functions
3. Spread syntax
4. Rest parameters
5. Array fill method
6. Kết 
## 1. Giới thiệu
Hiện nay javascript cung cấp rất hiều thủ thuật hữu ích có thể cấu trúc lại code và đơn giản hóa làm cho nó ngắn gọn và dễ hiểu hơn cách viết cũ.

Ở bài viết này mình sẽ chia sẻ một vài thủ thuật thưởng sử dụng.
## 2. Arrow functions
Trong ES6 arrow functions là một cú pháp mới, giúp function code trông gọn gàng hơn rất nhiều và khá ngắn gọn so với cách viết function thông thường

ví dụ:
```
const calculation = function(x, y) {
  return x * y;
};
```

với ES6 cú pháp sẽ ngắn gọn hơn:

```
const calculation = (x, y) => {
  return x * y;
};
```

nó sẽ còn ngắn gọn hơn nữa vì trong function chỉ có một biểu thức:

```
const calculation = (x, y) => x * y;
```
## 3. Spread syntax
Cho phép một phép lặp có thể được mở rộng, chẳng hạn như một array hoặc string được mở rộng ở function không có hoặc có nhiều đối số(khi gọi function) hoặc các phần tử(đối với ký tự mảng) hoặc một object được mở rộng khi không có hoặc có nhiều hơn các cặp key-value được mong đợi.

ví dụ 1:
```
function sum(a, b, c) {
  return a + b + c;
}

const numbers = [4, 1, 3];

console.log(sum(...numbers));
//kết quả: 8

console.log(sum.apply(null, numbers));
// kết quả: 8

```

ví dụ 2: Nối mảng

```
let array1 = [0, 1, 2];
let array2 = [3, 4, 5];

array1 = [...array1, ...array2];
console.log(array1) // kết quả: [0, 1, 2, 3, 4, 5]
```

ví dụ 3: Sử dụng các phần tử của một mảng làm đối số cho hàm

```
const add_more = (x, y, z) => x + y + z;
let array = [1,2,3];
console.log(add_more(...array)); // kết quả: 6
```

## 4. Rest parameters
Giống hệt với spread syntax nhưng được sử dụng để phá hủy mảng và đối tượng, rest parameters ngược với spread syntax. Spead syntax mở rộng một mảng thành các phần tử của nó, trong khi rest parameters gộp nhiều phần tử thành một phần tử.

ví dụ: 
```
function sum(...args) {
  return args.reduce((prev, crt) => {
    return prev + crt;
  });
}

console.log(sum(4, 1, 3));
// kết quả: 8

console.log(sum(1, 2, 3, 4));
// kết quả: 10

```
## 5. Array fill method
Dễ dàng để tạo một mảng trên cùng một dòng

ví dụ 1: 
```
let array = Array(5).fill('abc');
console.log(array);
// kết quả: ['abc', 'abc', 'abc', 'abc', 'abc']

```

ví dụ 2:
```
let array = Array.from(Array(5).keys());
console.log(array);
// kết quả: [0, 1, 2, 3, 4]
// Với spread parameters
let array = [...Array(5).keys()]
console.log(array);
// kết quả: [0, 1, 2, 3, 4]
```
## 6. Kết
Đây là những kiến thức mình tìm hiểu được về một số thủ thuật javascript, các bạn có thể tự tìm hiểu thêm các thủ thuật khác trong ES7,8,...