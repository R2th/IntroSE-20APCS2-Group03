# 1. Spread Operator
```
numbers = [1, 2, 3];
numbersCopy = [...numbers];
```

***Lưu ý:***

Điều này không sao chép một cách an toàn các mảng đa chiều. Giá trị mảng / đối tượng được sao chép bằng tham chiếu thay vì theo giá trị.

Cách viết tốt

```
numbersCopy.push(4);
console.log(numbers, numbersCopy);
// [1, 2, 3] and [1, 2, 3, 4]
// numbers is left alone
```

Cách viết không tốt
```
nestedNumbers = [[1], [2]];
numbersCopy = [...nestedNumbers];

numbersCopy[0].push(300);
console.log(nestedNumbers, numbersCopy);
// [[1, 300], [2]]
// [[1, 300], [2]]
// They've both been changed because they share references
```
# 2. for() Loop
```
numbers = [1, 2, 3];
numbersCopy = [];

for (i = 0; i < numbers.length; i++) {
  numbersCopy[i] = numbers[i];
}
```


***Lưu ý:***

Điều này không sao chép một cách an toàn các mảng đa chiều. Vì bạn có thể sử dụng toán tử =, nên nó sẽ gán các đối tượng / mảng theo tham chiếu thay vì theo giá trị.

Cách viết tốt:
```
numbersCopy.push(4);
console.log(numbers, numbersCopy);
// [1, 2, 3] and [1, 2, 3, 4]
// numbers is left alone
```

Cách viết không tốt:
```
nestedNumbers = [[1], [2]];
numbersCopy = [];

for (i = 0; i < nestedNumbers.length; i++) {
  numbersCopy[i] = nestedNumbers[i];
}

numbersCopy[0].push(300);
console.log(nestedNumbers, numbersCopy);
// [[1, 300], [2]]
// [[1, 300], [2]]
// They've both been changed because they share references
```
# 3. while() Loop
```
numbers = [1, 2, 3];
numbersCopy = [];
i = -1;

while (++i < numbers.length) {
  numbersCopy[i] = numbers[i];
}
```

***Lưu ý:***

Điều này cũng gán các đối tượng / mảng theo tham chiếu thay vì theo giá trị.

Cách viết tôt:
```
numbersCopy.push(4);
console.log(numbers, numbersCopy);
// [1, 2, 3] and [1, 2, 3, 4]
// numbers is left alone
```

Cách viết không tốt:
```
nestedNumbers = [[1], [2]];
numbersCopy = [];

i = -1;

while (++i < nestedNumbers.length) {
  numbersCopy[i] = nestedNumbers[i];
}

numbersCopy[0].push(300);
console.log(nestedNumbers, numbersCopy);
// [[1, 300], [2]]
// [[1, 300], [2]]
// They've both been changed because they share references
```
# 4. Array.map
`Array.map` trả về một mảng có cùng độ dài mỗi lần.

Để nhân đôi danh sách các số, sử dụng `map` với  một function `double`.
```
numbers = [1, 2, 3];
double = (x) => x * 2;

numbers.map(double);
```

**Thế còn clone ??**
Đúng, bài viết này về array clone. Để clone một array, chỉ cần trả về phần tử trong lệnh gọi `map` của bạn.
```
numbers = [1, 2, 3];
numbersCopy = numbers.map((x) => x);
```

Nếu bạn thích toán học hơn một chút, (x) => x được gọi là `identity`. Nó trả về bất cứ tham số nào mà nó được đưa ra.

`map(identity)` clone một danh sách.
```
identity = (x) => x;
numbers.map(identity);
// [1, 2, 3]
```


***Lưu ý:***

Điều này cũng gán các đối tượng / mảng theo tham chiếu thay vì theo giá trị.
# 5. Array.filter

Hàm này trả về một mảng, giống như map, nhưng nó không được đảm bảo có cùng độ dài.

Điều gì sẽ xảy ra nếu bạn lọc các số chẵn?
```
[1, 2, 3].filter((x) => x % 2 === 0);
// [2]
```

Độ dài mảng đầu vào là 3, nhưng độ dài kết quả là 1.

Tuy nhiên, nếu `filter's` của bạn luôn trả về giá trị `true`, bạn sẽ nhận được một bản sao!
```
numbers = [1, 2, 3];
numbersCopy = numbers.filter(() => true);
```

Mọi yếu tố đều vượt qua bài kiểm tra, vì vậy nó được trả lại.

***Lưu ý:***

Điều này cũng gán các đối tượng / mảng theo tham chiếu thay vì theo giá trị.
# 6. Array.reduce
```
numbers = [1, 2, 3];

numbersCopy = numbers.reduce((newArray, element) => {
  newArray.push(element);

  return newArray;
}, []);
```

`reduce` biến đổi một giá trị ban đầu khi nó lặp qua một danh sách.

Ở đây, giá trị ban đầu là một mảng trống và chúng tôi sẽ gán nó với từng phần tử khi chúng ta duyệt mảng. Mảng đó phải được trả về từ hàm được sử dụng trong lần lặp tiếp theo.

***Lưu ý:***

Điều này cũng gán các đối tượng / mảng theo tham chiếu thay vì theo giá trị.
# 7. Array.slice
`slice` trả về một bản sao cơ bản của một mảng dựa trên start / end index mà bạn cung cấp.

Nếu chúng ta muốn 3 phần tử đầu tiên:
```
[1, 2, 3, 4, 5].slice(0, 3);
// [1, 2, 3]
// Starts at index 0, stops at index 3
```
Nếu chúng ta muốn lấy tất cả các phần tử, thì không gán bất kỳ tham số nào
```
numbers = [1, 2, 3, 4, 5];
numbersCopy = numbers.slice();
// [1, 2, 3, 4, 5]
```

# 8. JSON.parse and JSON.stringify
`JSON.stringify` biến một đối tượng thành một chuỗi.

`JSON.parse` biến một chuỗi thành một đối tượng.

Kết hợp chúng có thể biến một đối tượng thành một chuỗi, và sau đó đảo ngược quá trình để tạo ra một cấu trúc dữ liệu hoàn toàn mới.
```
nestedNumbers = [[1], [2]];
numbersCopy = JSON.parse(JSON.stringify(nestedNumbers));

numbersCopy[0].push(300);
console.log(nestedNumbers, numbersCopy);

// [[1], [2]]
// [[1, 300], [2]]
// These two arrays are completely separate!
```
# 9. Array.concat
`concat` kết hợp các mảng với các giá trị hoặc các mảng khác.
```
[1, 2, 3].concat(4); // [1, 2, 3, 4]
[1, 2, 3].concat([4, 5]); // [1, 2, 3, 4, 5]
```
Nếu bạn không gán tham số gì, hoặc gán 1 mảng rỗng, thì 1 bản sao được trả về.
```
[1, 2, 3].concat(); // [1, 2, 3]
[1, 2, 3].concat([]); // [1, 2, 3]
```
# 10. Array.from
Điều này có thể biến bất kỳ đối tượng lặp lại thành một mảng. Sử dụng Array.from sẽ trả về một mảng copy
```
numbers = [1, 2, 3];
numbersCopy = Array.from(numbers);
// [1, 2, 3]
```

# Kết
Bài viết về những cách clone một array đến đây là kết thúc. Ở bài viết sau mình sẽ gặp lại các bạn với một chủ để khác.<br>
Cảm ơn các bạn!