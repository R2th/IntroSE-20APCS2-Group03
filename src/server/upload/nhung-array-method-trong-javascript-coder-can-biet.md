Array(mảng) là một cấu trúc dữ liệu rất quen thuộc và được sử dụng thường xuyên. Javascript đã cung cấp cho chúng ta các method để giúp xử lý dữ liệu trong mảng dễ dàng hơn, hãy cùng tìm hiểu về chúng qua bài viết này nhé.
### 1. push(), pop(), shift(), unshift()

  Đây đều là các method giúp thêm hoặc xóa phần tử của mảng, tác dụng của từng method như sau:
* push(): Thêm phần tử vào cuối mảng.
* unshift(): Thêm phần tử vào đầu mảng.
* pop(): Xóa phần tử cuối cùng trong mảng.
* shift(): Xóa phần tử đầu tiên trong mảng.

Ví dụ: 
```
let arr = [];

arr.push(1); // arr = [1]
arr.unshift(2); // arr = [2,1]
arr.pop(); // arr = [1]
arr.shift(); // arr = []
```
### 2. every()

  Method này sẽ có tham số là 1 hàm (ta tạm gọi là testMethod). hàm testMethod sẽ có cấu trúc như sau function(el, index, arr) và luôn trả về giá trị true/false. 

* el: giá trị của phần tử hiện tại.
* index: vị trí của phần tử hiện tại trong mảng.
* arr: mảng chứa phần tử hiện tại.

Method every() sẽ kiểm tra xem toàn bộ phần tử trong mảng có thỏa mãn testMethod không.

Ví dụ:
```
const arr = [2,4,6,8,10];
arr.every(el => el % 2 == 0); // true

const arr = [2,1,6,8,10];
arr.every(el => el % 2 == 0); // false
```

testMethod ở đây chính là hàm kiểm tra xem phần tử có phải số chẵn hay không. Vậy thì ví dụ 1 là true vì toàn bộ mảng là số chẵn, còn ví dụ 2 là false vì có phần tử 1 là số lẻ

### 3. some()

Tương tự, method này cũng nhận vào một tham số là testMethod. Method này sẽ trả về true nếu như có ít nhất 1 phần tử trong mảng thỏa mãn testMethod, nếu không sẽ trả về false.

Ví dụ:
```
const arr = [1, 3, 5, 7, 2];
arr.some(el => el % 2 == 0); // true

const arr = [1, 3, 5, 7, 9];
arr.some(el => el % 2 == 0); // false
```
Ví dụ 1 có phần tử 2 thỏa mãn, còn ở ví dụ 2 thì không có phần tử nào cả.

### 4. map()

Method này sẽ nhận vào tham số là 1 testMethod, tuy nhiên testMethod này không nhất thiết phải trả về giá trị true/false. Method này sẽ trả về một mảng mới, với giá trị được trả về từ testMethod của từng phần tử.

Ví dụ, ta muốn bình phương tất cả phần tử trong mảng:
```
const arr = [1, 3, 5, 7, 2];
arr.map(el => el*el); // [1, 9, 25, 49, 4]
```
### 5. find()

Method này cũng nhận vào tham số là 1 testMethod và trả về phần tử đầu tiên thỏa mãn testMethod, nếu không có phần tử nào thì sẽ trả về undefined

Ví dụ:
```
const arr = [1, 3, 5, 2, 4, 8, 9];
arr.find(el => el % 2 == 0); // 2

const arr = [1, 3, 5, 9];
arr.find(el => el % 2 == 0); // undefined
```
Ở ví dụ 1, ta có phần tử 2 là số chẵn đầu tiên trong mảng. Còn ở ví dụ 2 thì không có số chẵn nào cả.

## Tạm kết
Cảm ơn bạn đã đọc hết bài viết. Vậy là mình đã giới thiệu cho bạn các Array Method vô cùng hữu ích trong Javascript, hy vọng sẽ giúp các bạn cải thiện được kỹ năng code hiệu quả hơn.