ES6 <**ECMAScript**> được ra mắt mang đến cho chúng ta rất nhiều operator tiện lợi trong quá trình làm việc. Trong bài viết này chúng ta sẽ cùng nhau tìm hiểu về Spread, các khái niệm, và khả năng và cách sử dụng của nó

### Spread là gì?
Spread là một toán tử mới được thêm vào từ phiên bản ES6. Spread cho phép duyệt qua lần lượt các phần tử và có thể sử dụng để truyền vào các method như là các đối số.
Nó được biểu thị đơn giản bằng 3 dấu chấm:  ...
```
var newValue = [...value]; 
```
Trong ví dụ trên, thì biến mới có tên newValue sẽ lấy được toàn bộ dữ liệu của biến value bằng cách sử dụng Spread operator. Spread có thể sử dụng trong rất nhiều trường hợp tương tự các method đã có sẵn, ví dụ như khi chúng ta muốn **copy** một mảng dữ liệu, **expand**, **concat**, **math**

### Sử dụng Spread tương tự với concat()
concat() là phương thực được cung cấp trong Js, nó cho phép chúng ta móc nối các mảng lại với nhau để tạo thành một mảng dữ liệu duy nhất hoặc móc nối các biến string lại với nhau. 
Với array, khi chúng ta sử dụng concat(), nó sẽ không làm thay đổi đến dữ liệu hiện tại của mảng. Ví dụ dưới đây
```
let arr = [1,2,3]; 
let arr2 = [4,5]; 
  
const arr3 = arr.concat(arr2); 
console.log(arr);  // [ 1, 2, 3 ]
console.log(arr2);  // [ 4, 5 ]
console.log(arr3); // [ 1, 2, 3, 4, 5 ] 
```
![](https://images.viblo.asia/a014af44-2218-4d47-bab2-56ad333076d1.png)

Thay vì sử dụng concat, chúng ta có thể đạt được điều tương tự bằng cách sử dụng Spread. Mặc dù việc sử dụng Spread có thể giúp chúng ta đạt được kết quả giống với concat(), nhưng với dữ liệu có size lớn thì chúng ta nên sử dụng concat(), vì việc sử dụng Spread gây mất thời gian hơn so với concat() . Ví dụ dưới đây:
```
let arr = [1,2,3]; 
let arr2 = [4,5]; 
  
const arr3 = [...arr, ...arr2];
console.log(arr);  // [ 1, 2, 3 ]
console.log(arr2);  // [ 4, 5 ]
console.log(arr3); // [ 1, 2, 3, 4, 5 ] 
```
![](https://images.viblo.asia/e4c6734e-197b-4dc7-a052-9b98337ddb4f.png)


### Sử dụng Spread tương tự việc copy dữ liệu (splice)
Bình thường, khi chúng ta muốn copy dữ liệu của một variable, chúng ta sẽ có thể khai báo như sau:
```
let arr = [1,2,3,4]; 
let newArr = arr; 
  
console.log(newArr); // [1,2,3,4] 
```
Tuy nhiên, việc copy dữ liệu như thế này sẽ gây ra refercence, nếu như chúng ta thay đổi dữ liệu của newArr thì nó cũng sẽ ảnh hưởng đến arr. Ví dụ như dưới đây:
```
let arr = [1,2,3,4]; 
let newArr = arr; 
newArr.pop();
console.log(newArr); // [1,2,3] 
console.log(arr); // [1,2,3] 
```
![](https://images.viblo.asia/855b4c14-6fd3-424a-8109-70ccad82d3e4.png)

Lúc này, dữ liệu đã có sự sai khác. Để tránh việc này, chúng ta hoàn toàn có thể dử dụng Spread để thực hiện copy value.
```
let arr = [1,2,3,4]; 
let newArr = [...arr]; 
newArr.pop();
console.log(newArr); // [1,2,3] 
console.log(arr); // [1,2,3,4] 
```
![](https://images.viblo.asia/0683deea-328b-446c-b808-cd62e9b00e7d.png)

Thật đơn giản đúng không, bằng cách này, chúng ta sẽ đảm bảo được rằng dữ liệu gốc sẽ không bị ảnh hưởng trong quá trình xử lý.

### Sử dụng Spread để mở rộng (expand)
Như bình thường, khi chúng ta mở rộng mảng chúng ta có thể dùng cách thông thường như dưới đây:
```
let arr = ['a','b']; 
let arr2 = [arr,'c','d']; 
console.log(arr2);
```
![](https://images.viblo.asia/04031557-64f2-4650-b15e-1bff711cbde7.png)
Mặc dù không có báo lỗi, nhưng việc mảng lồng bên trong một mảng khác có vẻ là điều khá gây băn khoăn, chưa kể việc mở rộng này sẽ gây khó khăn trong việc xử lý dữ liệu...
Nếu chúng ta muốn bớt đi sự băn khoăn này, chúng ta có thể sử dụng Spread. Bằng cách copy lần lượt các phần tử bên trong mảng arr sang mảng mới. Và lúc này đoạn code sẽ sửa như sau:
```
let arr = ['a','b']; 
let arr2 = [...arr,'c','d']; 
console.log(arr2);
```
![](https://images.viblo.asia/e77f1a4d-9f89-4631-8a05-f49c24870781.png)

### Spread với Math object
Math object trong JS khá hữu ích trong một số trường hợp ví dụ như chúng ta muốn tìm số lớn nhất, hoặc nhỏ nhất trong một list các số... Ví dụ dưới đây là cơ bản về cách sử dụng của Math để tìm ra số lớn nhất. Ví dụ:
```
console.log(Math.max(1,2,3,-1)); //3
```
Ví dụ như nếu chúng ta có một mảng dữ liệu như sau [1,2,3,-1] . Để có thể tìm giá trị lớn nhất thì lúc này Math sẽ bị lỗi bởi vì Math không thể làm việc được với array.
```
const arr = [1,2,3,-1];
console.log(Math.max(arr));
```
![](https://images.viblo.asia/3fe02c2b-5f2b-4357-a94d-123c809c5727.png)

Để giải quyết vấn đề này, chúng ta cũng có thể dùng Spread. Lúc này, đoạn code trên sẽ được sửa thành:
```
const arr = [1,2,3,-1];
console.log(Math.max(...arr));
```
![](https://images.viblo.asia/13a7bb87-a89b-4c68-b48c-a5b15afc1d49.png)

### Spread với Object
Chúng ta hoàn toàn có thể sử dụng Spread để copy và mở rộng một object. Ví dụ mình sẽ có một object "user" như sau:
```
const user = { 
    name: 'Dung', 
    age: 25 
}; 
```
Tiếp đến, mình có một object khác có tên là "class": 
```
const info = { 
    email: 'khuat.van.dung@abc.xyz',
    address: 'xyz-hanoi
}; 
```

Lúc này, trong trường hợp mình muốn gộp 2 object này lại, mình hoàn toàn có thể thực hiện như sau:
```
const user = { 
    name: 'Dung', 
    age: 25 
}; 

const info = { 
    email: 'khuat.van.dung@abc.xyz',
    address: 'xyz-hanoi'
}; 

const profile = { ...user, ...info };

console.log(profile);
```

![](https://images.viblo.asia/e24af0af-a80e-47fc-9b11-69f0b8990e82.png)

Lúc này, "profile" sẽ là một object mới, bao gồm bản copy của "user" và "info".

### Kết
Cảm ơn các bạn đã chú ý đọc bài viết.

Bài viết tham khảo:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
https://www.geeksforgeeks.org/javascript-spread-operator/