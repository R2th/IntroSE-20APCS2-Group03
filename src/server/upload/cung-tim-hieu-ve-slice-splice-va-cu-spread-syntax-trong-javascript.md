Bài viết đc dịch lại từ: https://medium.freecodecamp.org/lets-explore-slice-splice-spread-syntax-in-javascript-e242a6f21e60

Tác giả: Parathan Thiyagalingam

Cả slice và splice đều dùng để thao tác với mảng, hãy cùng tìm hiểu xem chúng hoạt động thế nào nhé.

### Slice

Hàm slice nhận vào 2 tham số
**Tham số thứ 1**: là vị trí bắt đầu lựa chọn.
Ví dụ

```js
var arr1 = [1,5,8,9];
arr1.slice(1); // [5,8,9]
```

Nó sẽ trả về các phần tử từ vị trí thứ nhất ( số 5 )
**Tham số thứ 2**: là vị trí kết thúc lựa chọn. Nếu bạn ko truyền tham số này, nó sẽ trả về các phần tử từ vị trí bắt đầu đến vị trí cuối cùng của mảng.

```js
var arr1 = [1,5,8,9];
console.log(arr1.slice(1,3));
//[ 5, 8 ]
```

Nếu bạn truyền vào một số âm, vị trí sẽ đc đếm từ cuối mảng đổ xuống

```js
var arr1 = [1,5,8,9];
console.log(arr1.slice(-2));
//[ 8, 9 ]
```

**Lưu ý: Slice luôn trả về các phần tử đc lựa chọn từ mảng và ko làm thay đổi mảng đó.**

```js
var arr1 = [1,5,8,9];
arr1.slice(2);
console.log(arr1);
// [ 1, 5, 8, 9 ]
```

### Splice

Hàm splice có thể nhận nhiều tham số cùng lúc.

**Tham số thứ 1**: vị trí mà phần tử mới hoặc phần tử đã tồn tại sẽ đc thêm vào/xóa đi. Nếu giá trị này là âm, vị trí đó sẽ đc đếm từ cuối mảng đổ xuống.
**Tham số thứ 2**: Số các phần tử để xóa bỏ khỏi mảng bắt đầu từ vị trí ở trên. Nếu là 0 thì sẽ ko xóa phần tử nào cả, còn nếu ko đc truyền thì nó sẽ xóa tất cả các phần tử bắt đầu từ vị trí ở trên.

```js
var arr1 = [1,5,8,9];
console.log(arr1.splice(1,2));
// [ 5, 8 ]
```

**Tham số thứ 3 đến thứ n**: Giá trị của phần tử mà bạn muốn thêm vào mảng.

```js
var arr1 = [1,5,8,9];
console.log(arr1.splice(1,2,'Hi','Medium'));
// [5,8]
```

**Lưu ý:**
-  Splice chỉ trả về những phần tử đã đc xóa khỏi mảng.
-  Splice sẽ làm thay đổi mảng gốc

```js
var arr1 = [1,5,8,9];
arr1.splice(1,2,'Hi','Medium');
console.log(arr1);
// [ 1, 'Hi', 'Medium', 9 ]
```

### Spread syntax

Cho phép một đối tượng kiểu iterable như array epxression hoặc string có thể đc trải ra ở những chỗ mà có thể truyền 0 hoặc nhiều nhiều tham số ( lúc gọi hàm ) hoặc phần tử ( trong array ). Hoặc một object expression có thể đc trải ra để truyền 0 hoặc nhiều cặp key-value

Ví dụ:

```js
var arr1 = [1,3,6,7];
var arr2 = [5,arr1,8,9];
console.log(arr2);
// [ 5, [ 1, 3, 6, 7 ], 8, 9 ]
```

Ví dụ tôi muốn nó thành một mảng kiểu như ```[ 5, 1, 3, 6, 7, 8, 9 ]```
Tôi có thể dùng spread syntax để làm như sau:

```js
var arr1 = [1,3,6,7];
var arr2 = [5,...arr1,8,9];
console.log(arr2);
//[ 5, 1, 3, 6, 7, 8, 9 ]
```

Một cách sử dụng rất thông dụng khác là để copy một mảng:

```js
var arr = [1, 2, 3];
var arr2 = arr;
arr2.push(4);
console.log(arr2);
// [ 1, 2, 3, 4 ]
console.log(arr);
// [ 1, 2, 3, 4 ]
```

Tôi đã thêm 4 vào arr2, nhưng nó cũng khiến arr bị thay đổi theo.
Chúng ta có thể sử dụng spread syntax để xử lý vấn đề này:

```js
var arr = [1, 2, 3];
var arr2 = [...arr]; // giống arr.slice()
arr2.push(4);
console.log(arr2);
// [ 1, 2, 3, 4 ]
console.log(arr);
// [ 1, 2, 3]
```

### Kết luận:
Hàm slice sẽ:
- Trả về những phần tử đã đc chọn từ mảng
- Nhận vào 2 tham số
- Ko làm thay đổi mảng gốc

Hàm splice sẽ:
- Trả về những phần tử đã đc xóa khỏi mảng
- Nhận vào nhiều tham số
- Làm thay đổi mảng gốc

Cám ơn các bạn đã đọc!