Trong bài viết này mình sẽ chia sẻ cho các bạn **10 thủ thuật thú vị và hữu dụng trong JavaScript**,  các mẹo và thủ thuật sau đây có thể sẽ giúp các bạn giảm số lượng code phải viết đồng thời tối ưu đoạn code của bạn

### 1, Convert sang kiểu Boolean bằng toán tử !!

Đôi khi chúng ta phải kiểm tra xem 1 biến có tồn tại hay không, hay là biến có chứa một giá trị valid hay không. Để thực hiện việc này chúng ta có thể sử dụng toán tử `!!` một cách đơn giản như `!!variable` , nó sẽ chuyển toàn bộ kiểu dữ liệu của biến thành kiểu Boolean và biến này sẽ trả về `false` khi  nó có một trong các giá trị: `0`, `null`, `""`, `undefined`, hoặc `NaN`, còn lại sẽ trả về `true`. Một ví dụ khá đơn giản: 
```
function Classroom(student) {  
    this.student = student;
    this.hasStudent = !!student;
}
var classroom = new Classroom(20);  
console.log(classroom.student); // 20
console.log(classroom.hasStudent); // true

var empty_classroom = new Classroom(0);  
console.log(empty_classroom.student); // 0
console.log(empty_classroom.hasStudent); // false
```
Trong trường hợp này, nếu giá trị của `classroom.student` lớn hơn 0 thì ` classroom.hasStudent` sẽ có giá trị là `true`

### 2, Convert sang số bằng toán tử +

Thủ thuật này khá đơn giản,  nhưng chỉ sử dụng được cho 1 `String` chứa toàn số, còn lại sẽ trả về `NaN`
```
function to_number(str_number) {  
    return +str_number;
}
console.log(to_number("1234")); // 1234  
console.log(to_number("ACB")); // NaN  
```
Thủ thuật này còn có thể áp dụng cho kiểu `Date`, trong trường hợp này sẽ trả về Timestamp
```
console.log(+new Date()) //1521080043502
```

### 3, Câu lệnh điều kiện rút gọn

Một đoạn code quen thuộc: 
```
if (conected) {  
    login();
}
```
Đoạn code trên có thể viết ngắn gọn thành một dòng bằng cách sử dùng `&&` như sau: 
```
conected && login();
```
Bạn cũng có thể là tương tự để kiểm tra sự tồn tại của 1 thuộc tính hay 1 function trong một Object
```
user && user.login();
```

### 4, Gán giá trị mặc định bằng toán tử ||

Hiện nay trong ES6 có tính năng gán giá trị mặc định. Để sử dụng tính năng này ở các Browsers cũ hơn bạn có thể sử dụng toán tử `||` bằng cách dùng giá trị mặc định như là tham số thứ 2. Nếu tham số đầu trả về `false` thì tham số thứ hai sẽ được dùng làm giá trị mặc định.

```
function User(name, age) {  
    this.name = name || "Pham Van A";
    this.age = age || 27;
}
var user1 = new User();  
console.log(user1.name); // Pham Van A
console.log(user1.age); // 27

var user2 = new User("Le Thi C", 20);  
console.log(user2.name); // Le Thi C 
console.log(user2.age); // 20
```

### 5, Caching array.length trong vòng lặp

Một vòng lặp `for` thường gặp:
```
for (var i = 0; i < array.length; i++) {  
    console.log(array[i]);
}
```
Nếu bạn làm việc với mảng nhỏ  thì ko có vẫn đề gì nhưng khi làm việc với mảng lớn, đoạn code này sẽ tính lại kích thước của mảng trong mỗi lần lặp. Điều này sẽ khiến mỗi vòng lặp chậm đi một chút. Để tránh điều này, ta có thể cache `array.length` vào một biến như sau: 
```
for (var i = 0, length = array.length; i < length; i++) {  
    console.log(array[i]);
}
```

### 6, Trộn mảng

Nếu bạn muốn xáo trộn vị trí của các phần tử trong mảng mà không cần đoạn code quá phức tạp thì chỉ cần chạy 1 đoạn code nhỏ này: 
```
var list = [1, 2, 3, 4, 5];  
console.log(list.sort(function() {  
    return Math.random() - 0.5
})); // [3, 1, 2, 5, 4]
```

### 7, Lấy phần tử cuối của mảng

Một hàm của JS là `slice(begin, end)` có khả năng cắt mảng  khi truyền vào hai tham số `begin` và `end` . Nếu bạn không truyền vào tham số `end` thì hàm sẽ tự động lấy giá trị max của mảng. Tuy nhiên hàm này cũng có thể nhận giá trị âm, nếu truyền giá trị âm vào tham số `begin`  thì hàm sẽ trả về các phần tử tính từ cuối mảng.
```
var array = [1, 2, 3, 4, 5, 6];
console.log(array.slice(1)); // [2,3,4,5,6]  
console.log(array.slice(-1)); // [6]
console.log(array.slice(-2)); // [5,6]  
console.log(array.slice(-3)); // [4,5,6]  
```
### 8, Cắt mảng

Thủ thuật này có thể cắt được mảng theo số lượng phần tử bạn muốn lấy, ví dụ bạn có 1 mảng có 6 phần tử, nhưng bạn chỉ muốn lấy 3 phần tử đầu tiên. Bạn có thể cắt mảng bằng cách gán `array.length = 3`
```
var array = [1, 2, 3, 4, 5, 6];  
console.log(array.length); // 6  
array.length = 3;  
console.log(array.length); // 3  
console.log(array); // [1,2,3]  
```

### 9, Thay thế toàn bộ

Hàm `replace()` giúp chúng ta thay thế chuỗi bằng cách sử dụng String và Regex, về cơ bản hàm này chỉ thay thế kết quả đầu tiên. Chúng ta có thể khiến nó thay thế toàn bộ kết quả trong chuỗi bằng các dùng `/g` ở cuối đoạn REGEX:

```
var string = "john john";  
console.log(string.replace(/hn/, "ana")); // "joana john"  
console.log(string.replace(/hn/g, "ana")); // "joana joana"  
```

### 10, Merge mảng
Nếu bạn muốn hợp 2 mảng lại với nhau có thể dùng hàm `concat()`
```
var array1 = [1, 2, 3];  
var array2 = [4, 5, 6];  
console.log(array1.concat(array2)); // [1,2,3,4,5,6];  
```
Tuy nhiên cách này không phù hợp với các mảng lớn vì nó sẽ tốn khá nhiều bộ nhớ bằng cách tạo ra một mảng mới. Bạn có thể dùng hàm `push.apply(arr1, arr2) ` để nối 2 mảng lại với nhau, thay vì tạo 1 mảng mới như cách đầu tiên.
```
var array1 = [1, 2, 3];  
var array2 = [4, 5, 6];  
console.log(array1.push.apply(array1, array2)); // [1,2,3,4,5,6]; 
```

Cảm ơn các bạn đã đọc bài viết của mình. Hẹn gặp lại. (F)