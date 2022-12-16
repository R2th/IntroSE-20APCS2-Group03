### Giới thiệu 
 ES6 là chữ viết tắt của ECMAScript 6, là phiên bản mới nhất của chuẩn ECMAScript. ECMAScript do hiệp hội các nhà sản xuất máy tính Châu Âu đề xuất làm tiêu chuẩn của ngôn ngữ Javascript, ECMAScript 6 (hay còn được gọi là ES6, ES2015) là phiên bản mới nhất của chuẩn ECMAScript. Chuẩn này được phê duyệt vào tháng 6/2015. Nó là một bản nâng cấp quan trọng cho ES kể từ ES5 đã được chuẩn hoá vào năm 2009
 
**Tính năng của ES6**

Đây là danh sách 10 tính năng tốt nhất của ES6 cho những kỹ sư phần mềm bận rộn (sắp xếp ngẫu nhiên):

* Block - Scoped Constructs Let and Cont
* Arrow Function
* Rest Parameter
* Destructuring Assignment in ES6
* Default Parameters in ES6
* Template Literals in ES6
* Multi-line String in ES6
* Enhanced Object Literals in ES6
* Promises in ES6
* Classes in ES6

 Trong bài hôm nay mình sẽ giới thiệu cho các bạn về  Destructuring Assignment trong ES6 nhé
 
### Destructuring Javascript là gì?
Destructuring assignment là một biểu thức JavaScript dùng để lấy ra (destructure) giá trị của một hay nhiều phần tử rong mảng hoặc đối tượng đồng thời gán các giá trị này cho các biến cho trước.. Điều này có thể làm giảm đáng kể các dòng mã cần thiết để thao tác dữ liệu trong các cấu trúc này. Có hai loại Destructuring: Destructuring Objects và Destructuring Arrays.

Khi nói đến phép gán thông thường, chúng ta thường thấy các cú pháp về mảng hay object xuất hiện ở phía bên phải ) của phép gán và được gọi là assigning values. 
```
let  array = [1, 2, 3]
```

Tuy nhiên như bạn có thể thấy ở ví dụ trên,  khi destructure một mảng hay một đối tượng, các cú pháp trên sẽ xuất hiện phía bên trái (left-hand side - LHS) của phép gán; trong khí đó RHS của phép gán sẽ là giá trị cần destructuring.

```
const [a, b, c] = [1, 2, 3]
// expected output: a: 1, b: 2, c: 3

```

> Như vậy, hiểu một cách đơn giản, Destructuring Assignment sẽ là sự đảo ngược của Normal Assignment? Hay hiểu đơn giản hơn nữa, chúng ta lấy một phép gán thông thường và flip nó, kết quả thu được sẽ là một Destructuring Assignment.
  Với object destructuring, khi không có var/let/const để khai báo, thì ta phải bọc phép gán vào trong một cặp ( ), bởi vì { } ở bên trái phép gán sẽ được hiểu thành một block chứ không phải một object.
  
**Destructuring Objects**

Destructuring Objects cho phép bạn tạo ra một hay nhiều  new variables  sử dụng những property của một Objects. Xem ví dụ dưới đây:

```
let user = {
    name: 'Name',
    age: 20,
    address: 'HN'
}
```

Theo cách truyền thống thì chúng ta sẽ lấy ra những giá trị như cú pháp sau:

```
let name = user.name // name = 'Name'
let age = user.age // age = 20
let  job = user.address // address = 'HN'
```

Nhưng với việc sử dụng object destructuring  chúng ta có thể get được những giá trị ấy miễn là trùng tên của thuộc tính trong object là được:

`let { name, age,address } = user
// name = 'Name', age = 20,  address = 'HN'`

Hai đoạn code trên sẽ cho kết quả tương tự nhau, rõ ràng việc sử dụng Destructuring Assignment là ngắn gọn hơn và nếu chúng ta muốn sử dụng tên biến khác với tên của thuộc tính bên trong Object, chẳng hạn:

```
let userName = user.name
let userAge = user.age
let userJob =  user.address

let { name: userName, age: userAge, job: userJob } = user 
// name = 'Name', age = 24, job='dev'
```

 **Destructuring Arrays**
 
Array destructuring cho phép bạn tạo ra một new variables bằng cách sử dụng giá trị mỗi index của Array. Hãy cùng xem ví dụ dưới đây nhé 
```
let animals = [
    "Dog",
    "Cat",
    "Pig",
];
```

Như ở Object thì ta lần lượt lấy giá trị của mỗi item theo index

```
// Create variables from the Array items
const dog = animals[0]
const cat = animals[1]
const pig = animals[2]
```

Nhưng giờ đây với việc sử dụng Array Destructuring thì công việc sẽ trở nên dế dàng hơn nhiều

```
// Destructure Array values into variables
let [dog, cat, pig] = animals;
// dog: 'Dog', cat: 'Cat', pig: 'Pig'
```

**Spread operator là gì?**

Spread operator là ba dấu chấm ( ...), có thể chuyển đổi một mảng thành một chuỗi các tham số được phân tách bằng dấu phẩy

**Ứng dụng Destructuring Assignment khi làm việc với JS**

*Sử dụng  Destructuring Assignment để merge Objects*

Khi sử dụng Spread thì chúng ta có thể copy và update một object như những gì mà Object.assign() đã làm. Ta có 2 object dưới đây

```
let obj1 = { food: 'pizza', car: 'ford' }
let obj2 = { animal: 'dog' }

let merged = Object.assign(obj1, obj2)
```

Sử dụng Spread syntax  
```

let merged = {...obj1, ...obj2};
console.log(merged) // { food: 'pizza', car: 'ford',  animal: 'dog'}
```


*Sử dụng  Destructuring Assignment để merge Array*
```
let arrayFirst = ['a', 'b', 'c'];
let arraySecond = ['string', 'char'];
```
Ví dụ trường hợp thực tế thì ta có thể merge array sử dụng concat.
```
const merged = arrayFirst.concat(arraySecond)
```

Tuy nhiên bạn cũng có thể sử dụng Spread systax như sau 

```

let merged = [...arrayFirst, ...arraySecond];

console.log(result);
// kết quả: Array ["a", "b", "c", "string", 'char']

```

*Gán các phần tử còn lại cho một biến*

Ta có thể gán các phần tử còn lại của mảng cho một biến bằng cách sử dụng cú pháp spread ...

Ví dụ:
```
let animals = [
    "Dog",
    "Cat",
    "Pig",
];
const [dog, ...others] = animals;
console.log(dog);
console.log(others);
// dog: 'Dog', others: ['Cat', 'Pig']
```

Ở đây, phần tử đầu tiên được gán cho biến dog. Và các phần tử còn lại trong mảng được gán cho biến others.

Ta cũng có thể gán các thuộc tính còn lại có trong đối tượng cho một biến.

Ví dụ:

```
let user = {
    name: 'Name',
    age: 20,
    address: 'HN'
}
let { name, ...others } = user;
console.log(name);
console.log(others);
Kết quả:
name: 'Name';
others: {age  :20, address: 'HN'}
```

*Sử dụng Destructuring Assignment để truyền tham số vào Function*

Khi function nhận object làm tham số, chẳng hạn:
```
let user = {
    name: 'Name',
    age: 20,
    address: 'HN'
}

let printUserInfo = function({ name }) {
   console.log('UserName: ', name)
}

printUserInfo(user) 
// Kết quả; UserName: name
```

Tương tự với Array:
Giả sử chúng ta có một function như thế này

```
function sum(a, b, c) {
  return a + b + c
}
```

Khi sử dụng function sum, chúng ta sẽ phải add từng params vào như thế này

`sum(1, 2, 3)`

Nhưng khi sử dụng Spread trong function calls thì rất đơn giản
```
const numbers = [1, 2, 3]

sum (...numbers);//6
```

### Kết luận
Trên đây là khái niệm và ví dụ cơ bản về phép gán Destructuring trong JavaScript. Hy vọng mọi người có thể áp dụng vào trong chương trình của mình

### Tài liệu tham khảo
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment