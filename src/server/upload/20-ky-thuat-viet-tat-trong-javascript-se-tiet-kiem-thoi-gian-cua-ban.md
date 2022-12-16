Các kỹ thuật viết tắt của bất kỳ ngôn ngữ lập trình nào giúp bạn viết mã rõ ràng và tối ưu hơn, đồng thời cho phép bạn đạt được mục tiêu của mình với ít mã hóa hơn. Hãy thảo luận từng kỹ thuật viết tắt của JavaScript.
# 1. Khai báo biến
```php
//Longhand 
let x; 
let y = 20; 

//Shorthand 
let x, y = 20;
```

# 2. Gán giá trị cho nhiều biến
Chúng ta có thể gán giá trị cho nhiều biến trong một dòng bằng cách cấu trúc mảng.

```php
//Longhand 
let a, b, c; 
a = 5; 
b = 8; 
c = 12;
 
//Shorthand 
let [a, b, c] = [5, 8, 12];
```

# 3. Toán tử bậc ba
Chúng ta có thể lưu 5 dòng code ở đây với toán tử bậc ba (có điều kiện).
```php
//Longhand 
let marks = 26; 
let result; 
if (marks >= 30){
 result = 'Pass'; 
} else { 
 result = 'Fail'; 
} 

//Shorthand 
let result = marks >= 30 ? 'Pass' : 'Fail';
```

# 4. Gán giá trị mặc định
Chúng ta có thể sử dụng toán tử `OR(||)`  để gán giá trị mặc định cho một biến trong trường hợp giá trị mong đợi được tìm thấy là sai.
```php
//Longhand 
let imagePath; 
let path = getImagePath(); 
if(path !== null && path !== undefined && path !== '') { 
  imagePath = path; 
} else { 
  imagePath = 'default.jpg'; 
} 

//Shorthand 
let imagePath = getImagePath() || 'default.jpg';
```

# 5. Toán tử AND(&&)
Nếu bạn chỉ gọi một hàm nếu một biến là true, thì bạn có thể sử dụng `AND(&&)` để thay thế cho điều này.

```php
//Longhand 
if (isLoggedin) {
 goToHomepage(); 
} 

//Shorthand 
isLoggedin && goToHomepage();
```

# 6. Hoán đổi hai biến
Để hoán đổi hai biến, chúng ta thường sử dụng một biến thứ ba. Chúng ta có thể hoán đổi hai biến một cách dễ dàng với phép gán cấu trúc mảng.
```php
let x = 'Hello', y = 55; 
//Longhand 
const temp = x; 
x = y; 
y = temp; 

//Shorthand 
[x, y] = [y, x];
```

# 7. Arrow Function

```php
//Longhand 
function add(num1, num2) { 
   return num1 + num2; 
} 

//Shorthand 
const add = (num1, num2) => num1 + num2;
```

**Reference**: [JavaScript Arrow function](https://jscurious.com/javascript-arrow-function/)


# 8. Ký tự mẫu mẫu
Chúng ta thường sử dụng toán tử + để nối các giá trị chuỗi với các biến. 
Với các ký tự mẫu của ES6, chúng ta có thể làm điều đó theo cách đơn giản hơn.

```php
//Longhand 
console.log('You got a missed call from ' + number + ' at ' + time); 

//Shorthand 
console.log(`You got a missed call from ${number} at ${time}`);
```

# 9. Chuỗi nhiều dòng
Đối với chuỗi nhiều dòng, chúng ta thường sử dụng toán tử `+` với chuỗi thoát dòng mới `(\n)`. 
Chúng ta có thể làm điều đó theo cách dễ dàng hơn bằng cách sử dụng dấu gạch ngược (`)

```php
//Longhand 
console.log('JavaScript, often abbreviated as JS, is a\n'
+ 'programming language that conforms to the \n' + 
'ECMAScript specification. JavaScript is high-level,\n' + 
'often just-in-time compiled, and multi-paradigm.' ); 

//Shorthand 
console.log(`JavaScript, often abbreviated as JS, is a programming 
language that conforms to the ECMAScript specification. JavaScript is 
high-level, often just-in-time compiled, and multi-paradigm.`);
```

# 10. Kiểm tra nhiều điều kiện
Để đối sánh nhiều giá trị, chúng ta có thể đặt tất cả các giá trị trong mảng và sử dụng phương thức `indexOf()` hoặc `include()`.

```php
//Longhand 
if (value === 1 || value === 'one' || value === 2 || value === 'two') { 
     // Execute some code 
} 

// Shorthand 1
if ([1, 'one', 2, 'two'].indexOf(value) >= 0) { 
    // Execute some code 
}
// Shorthand 2
if ([1, 'one', 2, 'two'].includes(value)) { 
    // Execute some code 
}
```

# 11. Gán thuộc tính object
Nếu tên biến và tên khóa đối tượng giống nhau thì chúng ta có thể đề cập đến tên biến trong các ký tự đối tượng thay vì cả khóa và giá trị. JavaScript sẽ tự động đặt khóa giống như tên biến và gán giá trị dưới dạng giá trị biến.

```php
let firstname = 'Amitav'; 
let lastname = 'Mishra'; 
//Longhand 
let obj = {firstname: firstname, lastname: lastname}; 

//Shorthand 
let obj = {firstname, lastname};
```

# 12. Chuyển chuỗi thành một số
  Có sẵn các phương thức như `parseInt` và `parseFloat` để chuyển đổi một chuỗi thành số. Chúng ta cũng có thể làm điều này bằng cách chỉ cần cung cấp một toán tử một ngôi (+) trước giá trị chuỗi.
  
```php
//Longhand 
let total = parseInt('453'); 
let average = parseFloat('42.6'); 

//Shorthand 
let total = +'453'; 
let average = +'42.6';
```

# 13. Lặp lại một chuỗi nhiều lần
Để lặp lại một chuỗi trong một số thời gian nhất định, bạn có thể sử dụng vòng lặp for. Nhưng bằng cách sử dụng phương thức `repeat()`, chúng ta có thể thực hiện nó trong một dòng duy nhất.
```php
//Longhand 
let str = ''; 
for(let i = 0; i < 5; i ++) { 
  str += 'Hello '; 
} 
console.log(str); // Hello Hello Hello Hello Hello 

// Shorthand 
'Hello '.repeat(5);
```

> **Ví dụ**: Bạn muốn xin lỗi ai đó bằng cách gửi 100 lần "sorry"? Hãy thử nó với phương thức `repeat()`. Nếu bạn muốn lặp lại từng chuỗi trong một dòng mới, hãy thêm `\n` vào chuỗi.

```php
'sorry\n'.repeat(100);
```

# 14. Lũy thừa
Chúng ta có thể sử dụng phương thức `Math.pow()` để tìm lũy thừa của một số. Có một cú pháp ngắn hơn để thực hiện điều đó với là (**).
```php
//Longhand 
const power = Math.pow(4, 3); // 64 

// Shorthand 
const power = 4**3; // 64
```

# 15. Toán tử kép (~~)
Toán tử kép (~~) là một thay thế cho phương thức `Math.floor()` dùng để làm tròn dưới.

```php
//Longhand 
const floor = Math.floor(6.8); // 6 

// Shorthand 
const floor = ~~6.8; // 6
```

>**Chú ý:** Toán tử kép ( ~~ ) chỉ hoạt động với số nguyên 32 bit, tức là (2^31) -1 = 2147483647. Vì vậy, đối với bất kỳ số nào cao hơn 2147483647, toán tử ( ~~ ) sẽ cho kết quả sai, vì vậy nên sử dụng `Math.floo()` trong trường hợp đó.

# 16. Tìm số lớn nhất và số nhỏ nhất trong mảng
Chúng ta có thể sử dụng vòng lặp for để lặp qua từng giá trị của mảng và tìm giá trị max hoặc min. Chúng ta cũng có thể sử dụng phương thức [Array.reduce()](https://jscurious.com/a-guide-to-array-reduce-method-in-javascript/) để tìm số max và min trong mảng.

Nhưng sử dụng toán tử spread, chúng ta có thể thực hiện nó trong một dòng duy nhất.
```php
// Shorthand 
const arr = [2, 8, 15, 4]; 
Math.max(...arr); // 15 
Math.min(...arr); // 2
```

# 17. Vòng lặp for
Để lặp qua một mảng, chúng ta thường sử dụng vòng lặp `for` truyền thống. 

Chúng ta có thể sử dụng vòng lặp `for...of` để lặp qua các mảng. Để truy cập index của mỗi giá trị, chúng ta có thể sử dụng vòng lặp `for...in`.
```php
let arr = [10, 20, 30, 40]; 
//Longhand 
for (let i = 0; i < arr.length; i++) { 
  console.log(arr[i]); 
} 

//Shorthand 
//for of loop 
for (const val of arr) { 
  console.log(val); 
} 
//for in loop 
for (const index in arr) { 
  console.log(arr[index]); 
}
```

Chúng ta cũng có thể lặp qua các thuộc tính đối tượng bằng cách sử dụng vòng lặp `for...in`.

```php
let obj = {x: 20, y: 50}; 
for (const key in obj) { 
  console.log(obj[key]); 
}
```

**Reference**: [Different ways to iterate through objects and arrays in JavaScript](https://jscurious.com/different-ways-to-iterate-through-objects-and-arrays-in-javascript/)


# 18. Merging các mảng
```php
let arr1 = [20, 30]; 
//Longhand 
let arr2 = arr1.concat([60, 80]); 
// [20, 30, 60, 80] 

//Shorthand 
let arr2 = [...arr1, 60, 80]; 
// [20, 30, 60, 80]
```

# 19. Clone đối tượng nhiều cấp
Để clone một đối tượng nhiều cấp, chúng ta có thể lặp qua từng thuộc tính và kiểm tra xem thuộc tính hiện tại có chứa một đối tượng hay không. Nếu có, sau đó thực hiện một cuộc gọi đệ quy đến cùng một hàm bằng cách chuyển giá trị thuộc tính hiện tại (tức là đối tượng lồng nhau).

Chúng ta cũng có thể làm điều đó bằng cách sử dụng `JSON.stringify()` và `JSON.parse()` nếu đối tượng của chúng ta không chứa các function, undefined, NaN hoặc Date dưới dạng giá trị.

Nếu chúng ta có đối tượng mức đơn, tức là không có đối tượng lồng nhau nào, thì chúng ta cũng có thể clone bằng cách sử dụng toán tử spread.

```php
let obj = {x: 20, y: {z: 30}}; 

//Longhand 
const makeDeepClone = (obj) => { 
  let newObject = {}; 
  Object.keys(obj).map(key => { 
    if(typeof obj[key] === 'object'){ 
      newObject[key] = makeDeepClone(obj[key]); 
    } else { 
      newObject[key] = obj[key]; 
    } 
  }); 
 return newObject; 
} 
const cloneObj = makeDeepClone(obj); 

//Shorthand 
const cloneObj = JSON.parse(JSON.stringify(obj));

//Shorthand for single level object
let obj = {x: 20, y: 'hello'};
const cloneObj = {...obj};
```

**Chú ý:** Kỹ thuật viết tắt `JSON.parse(JSON.stringify (obj))`  không hoạt động nếu thuộc tính đối tượng của bạn chứa function, undefined or NaN dưới dạng giá trị. Bởi vì khi bạn JSON.stringify đối tượng, thuộc tính chứa function, undefined or NaN dưới dạng giá trị sẽ bị xóa khỏi đối tượng.

Vì vậy, hãy sử dụng `JSON.parse(JSON.stringify (obj))` khi đối tượng của bạn chỉ chứa chuỗi và số.

**Reference**: [JSON.parse() and JSON.stringify()](https://jscurious.com/difference-between-json-parse-and-json-stringify/)

# 20. Lấy ký tự từ chuỗi

```php
let str = 'jscurious.com'; 
//Longhand 
str.charAt(2); // c 

//Shorthand 
str[2]; // c
```


Bài viết được dịch từ: https://medium.com/javascript-in-plain-english/20-javascript-shorthand-techniques-that-will-save-your-time-f1671aab405f