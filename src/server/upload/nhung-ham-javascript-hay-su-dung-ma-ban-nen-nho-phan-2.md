Trong bài viết chước mình đã đề cập đến những phương thức hay sử dụng khi dùng String [Link](https://viblo.asia/p/nhung-ham-javascript-hay-su-dung-ma-ban-nen-nho-Qbq5QAAR5D8). Và Trong bài viết này mình sẽ giới thiệu thêm những phương thức của Array mà theo mình bạn rất hay sử dụng.
#### Array methods
### 1, forEach()
- Lặp qua từng phần tử trong mảng.

Cú pháp:
``` js
array.forEach(function(currentValue, index, arr), thisValue)
```

VD:
``` js
var arr = [1, 2, 3, 4, 5, 6];

arr.forEach(item => {
  console.log(item); // output: 1 2 3 4 5 6
});
```
### 2, includes()
- Kiểm tra phần tử tồn tại trong mảng.

Cú pháp:
``` js
array.includes(element, start)
```

VD:
``` js
var arr = [1, 2, 3, 4, 5, 6];

arr.includes(2); // output: true
arr.includes(7); // output: false
// Start: Vị trí bắt đầu tìm kiếm phần tử, mặc định là 0
arr.includes(3, 3); // output: false
```
### 3, filter()
- Tạo một mảng mới từ bảng cũ với điều kiện lọc quy định.

Cú pháp:
``` js
array.filter(function(currentValue, index, arr), thisValue)
```

VD:
``` js
var arr = [1, 2, 3, 4, 5, 6];

// Lấy những phần tử lớn hơn 4
arr.filter(num => num > 4); // output: [5, 6]
// Lấy những phần tử lẻ
arr.filter(num => num % 2); // output: [1, 3, 5]
// Lấy những phần tử chẵn
arr.filter(num => !(num % 2)); // output: [2, 4, 6]
// chuỗi ban đầu không bị thay đổi
console.log(arr); // output: [1, 2, 3, 4, 5, 6]
```
### 4, map()
- Tạo một mảng mới từ bảng cũ với hàm được sử dụng cho mỗi phần tử.

Cú pháp:
``` js
array.map(function(currentValue, index, arr), thisValue)
```

VD:
``` js
var arr = [1, 2, 3, 4, 5, 6];

var newArr = arr.map(num => num + 1);
console.log(newArr);  // output [2, 3, 4, 5, 6, 7]
console.log(arr); // output: [1, 2, 3, 4, 5, 6]
```
### 5, reduce()
- Hàm reduce sẽ biến đổi một mảng thành một giá trị đơn giản. Thực hiện một hàm được cung cấp cho mỗi giá trị của mảng, từ trái qua phải.
- Hàm sẽ trả về một kết quả được lưu trữ ( tổng số hoặc kết quả tính toàn). Không thực hiện hàm được cung cấp đối với các phần tử không có giá trị.

Cú pháp:
``` js
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```

VD:
``` js
// Tính tổng số phần tử trong mảng
var arr = [1, 3, 6, 7, 8, 0];
var sum_total = arr.reduce((total, value) => total + value, 0);
console.log(sum_total); // output: 25
```
### 6, some()
- Phương thức array some() Kiểm tra ít nhất một phần tử trong mảng có thỏa mãn điều kiện hay không. Nếu có thì trả về `true` còn không thì trả về `false`.

Cú pháp:
``` js
array.some(function(currentValue, index, arr), thisValue)
```

VD:
``` js
// Kiểm tra các phần tử có thỏa mãn điều kiện hay không
var arr = [1, 2, 3, 4, 5, 6];

// Kiểm tra trong mảng có phần tử nào lơn hơn 4 không?
var checkGreater = arr.some(num => num > 4);
console.log(checkGreater); // output: true

// Kiểm tra trong mảng có phần tử nào bé hơn 0 không?
var checkLess = arr.some(num => num <= 0);
console.log(checkLess); // output: false
```
### 7, every()
- Cũng gần tương tự như **some** nhưng với phương pháp này mọi phần tử trong mản của bạn đều phải thỏa mãn được điều kiện.

Cú pháp: Tương tự **some**
``` js
array.every(function(currentValue, index, arr), thisValue)
```

VD:
``` js
// Kiểm tra các phần tử có thỏa mãn điều kiện hay không
var arr = [1, 2, 3, 4, 5, 6];

// Kiểm tra các phần tử trong mảng có lớn hơn 4 không?
var checkGreater = arr.every(num => num > 4);
console.log(checkGreater); // output: false

// Kiểm tra các phần tử trong mảng có bé hơn 10 không?
var checkLess = arr.some(num => num <= 10);
console.log(checkLess); // output: true
```
### 8, sort()
- Chỉ cần nhìn tên là bạn có thể dễ dàng đoán được hàm này làm gì đúng không.
- Hàm này dùng để sắp xếp, Nhưng bạn có thể biến đổi việc sắp xếp của nó vì mặc định khi gọi arr.sort() thì nó sẽ sắp xếp theo thứ tự tăng dần.

Cú pháp:
``` js
array.sort(compareFunction)
```

VD:
``` js
var arr = [4, 2, 8, 3, 7, 6];
var alpha = ['g', 'f', 'a', 'u', 'z', 'r'];

// Dùng mặc định
arr.sort(); // output: [2, 3, 4, 6, 7, 8]
alpha.sort(); // output: [2, 3, 4, 6, 7, 8]

// Dùng với option để sắp xếp theo thứ tự dảm dần
arr.sort((a, b) => a > b ? -1 : 1); // output: [8, 7, 6, 4, 3, 2]
alpha.sort((a, b) => a > b ? -1 : 1); // output: ['z', 'u', 'r', 'g', 'f', 'a']
```

**Cuối cùng mình muốn chỉ ra 2 hàm đặc biệt mà mình thường hay dùng trong thực tế.**
### 9, Array.from()
- Khi bạn muốn biến một cụm từ hay một từ thành 1 mảng các phần tử của nó bạn thường lưa chọn phương pháp `String.slip('')` như này đúng không. Đó là cách suy nghĩ thông thường khi gặp bài toán dạng này ở mọi ngôn ngữ. Nhưng trong **js** việc này trở nên dễ dàng hơn với phương thức **Array.from()**.

Cú pháp:
``` js
Array.from(arrayLike[, mapFn[, thisArg]])
```

VD:
``` js
Array.from('Pham Anh Tuan');
// output: ["P", "h", "a", "m", " ", "A", "n", "h", " ", "T", "u", "a", "n"]
Array.from([1, 2, 3], x => x + x);
// output: [2, 4, 6]
```
### 10, Array.of()
- Phương thức này khá fun, thay vì bạn phải mài công ngồi khai báo `array = [1, 2, 3, 4, 5, 6]` thì bạn có thể làm theo cách dưới đây.
- Phương thức Array.of() được dùng để tạo ra một mảng mới với các phần tử được truyền vào thông qua tham số truyền vào.

Cú pháp:
``` js
Array.of(element0[, element1[, ...[, elementN]]])
```

VD:
``` js
[1, 2, 3, 4, 5, 6] // output: [1, 2, 3, 4, 5, 6]
Array.of(1, 2, 3, 4, 5, 6); // output: [1, 2, 3, 4, 5, 6]
```
- Vậy nó vẫn giống phần trên tại sao ta lại có 1 phương thức như này nhỉ ??. Để làm rõ vấn đề này ta sét đến một ví dụ sau.

``` js
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```
- Như bạn thấy ở trên khi ta khai báo 1 array bằng cách gọi đơn giá trị `Array(7)` js sẽ tạo cho bạn 1 mảng gồm 7 phần tử trống, trong khi `Array.of(7)` sẽ tạo cho bạn 1 mảng có 1 phần tử duy nhất là 7. Đó là sự khác biệt rất lớn :).

#### Kết luận
Những phương thức kể trên chỉ là 1 trong số rất nhiều phương thức của js nhưng theo ý kiến cá nhân của mình nó là những phương thức hay gặp và sử dụng khi làm việc với js nhất.

Còn đây là nguồn mà mình tham khảo: [Link!](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)