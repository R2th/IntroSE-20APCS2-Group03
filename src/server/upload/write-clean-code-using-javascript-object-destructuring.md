Write Clean Code Using JavaScript Object
### Introduction 
Trong bài hướng dẫn này chúng ta sẽ so sánh các phương pháp viết code truyền thống và sử dụng ES6.
Cho phép bạn giải nén các đối tượng phức tạp từ objects and arrays. Điều này sẽ giúp clean code và ít số dòng hơn.
Dễ bảo trì code hơn.
### Object Destructuring
Chúng ta sẽ cùng ví dụ về một object là `customer`.  Object `customer` có các thuộc tính như `name` và `address` lồng nhau.
```
const customer = {
     name: 'Sherlock',
     email: 's.h.@gmail.com',
     age: 34,
     address: {
         streetNo: '221b Baker Street',
         city: 'London',
         country: 'UK' 
    }
}
```

### Basic variable assignment

Theo cách tiếp cận truyền thống chúng ta có thể sử dụng `.`(dot) hoặc `[key-name]` để lấy dữ liệu.

```
const name = customer.name;
const email = customer['email']; 

console.log(name) // Sherlock
console.log(email) // s.h.@gmail.com
```
Đó là một việc làm trên 2 dòng nhưng chúng ta có thể thực hiện nó trên 1 dòng như sau:
```

const { name, email } = customer;

console.log(name) // Sherlock
console.log(email) // s.h.@gmail.com
```

Nếu bạn muốn giải nén variable bằng một tên khác, điều đó cũng có thể thực hiện được. Lưu ý rằng tên thuộc tính luôn ở bên trái:

```
const { name: customerName, email } = customer;

console.log(customerName) // Sherlock
```

### Assigning values for declared variables

Đây là quy trình gần như giống nhau, nhưng cú pháp có một chút khác biệt. Chúng ta phải sử dụng `()` xung quanh câu lệnh gán:
```
let name, email;

({ name, email } = customer);

console.log(name)
console.log(email)
```
Chúng ta cần thêm `()` bởi vì `{` ở bên trái sẽ được coi là 1 khối chứ không phải là 1 object theo đúng nghĩa đen.
Nếu bỏ qua `()` bạn sẽ gặp lỗi.
```
{ name, email } = customer;
                ^
SyntaxError: Unexpected token '='
```
### Nested objects
Đây là trường hợp sử dụng cơ bản. Nếu bạn muốn truy cập một thuộc tính như: `city` và `country`.
Bạn cần phải truy xuất qua từng key một.
```
constưng name = customer.name;
const streetNo = customer.address.streetNo;
const city = customer['address']['city'];

console.log(name) // Sherlock
console.log(streetNo) // 221b Baker Street
console.log(city) // London
```

Nếu bạn sử dụng object destructuring bạn có thể viết nó trên 1 dòng duy nhất và truy cập lồng nhau. Chúng ta sử dụng `{}` đằng sau gốc.
```
const { name,  address: {  streetNo, city } } = customer;

console.log(name) // Sherlock
console.log(streetNo) // 221b Baker Street
console.log(city) // UK
```
### Destructuring with default values
Ví dụ trong trường hợp mà `customer` object có thuộc tính gọi `married`. Và có các tùy chọn là `yes` và `no`.
Nhưng một vài `customer` không cung cấp giá trị này. Vì vậy chúng ta phải gán giá trị mặc định cho nó. Nếu không sẽ bị `undefined`.
Nếu không có cấu trúc destructuring trườngh hợp đó sẽ được xử lý như sau:
```
let married = customer.married;

console.log(married); // undefined

if (!married) {
   married = 'N/A';
}
console.log(married); // N/A
```
Nhưng với cấu trúc destructuring chúng ta có thể viết nó trên 1 dòng như sau:
```
const { name, married = 'N/A' } = customer;

console.log(name) // Sherlock
console.log(married) // N/A
```
### Using rest in object destructuring

Cú pháp `rest` sẽ thu thập các khóa thuộc tính có thể liệt kê còn lại chưa được chọn bởi mẫu cấu trúc. Lưu ý rằng `rest` không phải là
một từ khóa bạn có thể sử dụng bất cứ khi nào bằng dấu `...`
```
const { name, ...rest } = customer;
console.log(name) // Sherlock
console.log(rest) // {
                  //    email: 's.h.@gmail.com',
                  //    age: null,
                  //    address: { streetNo: '221b Baker Street', city: 'London', country: 'UK' }
                  // }
```
### Handling null objects
Nếu object là `null` nó sẽ tạo ra lỗi. Nhưng chúng ta có thể tránh được. 
```
function getCustomer() {
    return null;
}

let { name, email } = getCustomer();

console.log(name, email);
view rawcustomer.js hosted with ❤ by GitHub

```

let { name, email } = getCustomer();
      ^

TypeError: Cannot destructure property `name` of 'undefined' or 'null'.
Để xử lý trường hợp như vậy chúng ta có thể sử dụng toán tử OR (||) để làm cho đối tượng null trở lại một đối `{}`.
```
let { name, email } = getCustomer() || {};

console.log(name, email); // undefined undefined
```

### Destructuring function arguments
Chúng ta có thể sử dụng destructure objects. Được truyền vào một hàm trước tiên hãy xem nó khi chưa sử dụng.

```
let display = (customer) => console.log(`${customer.name} ${customer.address.city}`);

display(customer);
```

Với destructuring bạn có thể viết mã như sau:
```
let display = ( { name, address: {city} } ) => console.log(`${name} ${city}`);

display(customer);
```

### Array Destructuring

Tất cả các cú pháp trong cấu trúc đối tượng cũng có thể được áp dụng cho arrays. Chúng ta sẽ cùng ví trên array `fruits`
```
const fruits = ["Banana", "Orange", "Apple", "Mango"];
```

### Basic array destructuring
Chúng ta có thể truy xuất thông tin mảng như sau:
```

let firstFruit = fruits [0];
let secondFruit = fruits [1];

console.log(firstFruit); // Banana
console.log(secondFruit); // Orange
```

Nhưng với destructuring chúng ta có thể khai báo và gán biến 1 cách dễ dàng.
```
let [firstFruit, secondFruit] = fruits;

console.log(firstFruit); // Banana
console.log(secondFruit); // Orange
```
### Skipping items and assigning rest
Ví dụ trong mảng fruits phần tử đầu tiên là trái cây chúng ta yêu thích, phần tử thứ 3 là trái cây bạn bè yêu thích . Chúng
ta cần bỏ qua phần tử thứ 2.
```
let [yourFav, , ...friendsFav] = fruits;

console.log(yourFav); // Banana
console.log(friendsFav); // [ 'Apple', 'Mango' ]
```

Bạn cũng có thể sử dụng `,` để bỏ qua các item của array

### Swapping values using destructuring assignment

Bây giờ chúng ta sẽ tìm hiểu hoán đổi các vị trí của array. Nếu không có `destructuring` chúng ta cần
biến thứ 3 và hoán đỏi giá trị. Nhưng với `destructuring` nó sẽ dễ dàng hơn.
```
let [firstFruit, secondFruit] = fruits;

console.log(firstFruit); // Banana
console.log(secondFruit); // Orange

[firstFruit, secondFruit] = [secondFruit, firstFruit]

console.log(firstFruit); // Orange
console.log(secondFruit); // Banana

```
### Conclusion

Trong bài viết này chúng ta đã tìm hiểu clean code hơn bằng cách sử dụng `JavaScript Object Destructuring`.

### References

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

https://www.javascripttutorial.net/es6/javascript-object-destructuring/

https://betterprogramming.pub/write-clean-code-using-javascript-object-destructuring-3551302130e7