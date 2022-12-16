# Giới thiệu
Hello, trong bài viết này mình sẽ chia sẻ về sử dụng shorthand trong JS để tiết kiệm thời gian code, hy vọng sẽ hữu ích cho bạn.

# Declaring variables
Bạn có thể khai báo nhiều biến trên cùng 1 dòng:
```js
//Long version
let a; 
let b = 1; 

//Shorthand
let a, b = 1;
```

# Assigning values to multiple variables
Bạn có thể gán giá trị cho nhiều biến bằng array destructuring:
```js
//Long version
x = 1; 
y = 2; 
z = 3; 

//Shorthand
let [x, y, z] = [1, 2, 3];
```

# Assigning default value
Bạn có thể đặt giá trị mặc định bằng toán tử `||`. Nếu giá trị ở bên trái là sai, nó sẽ sử dụng giá trị ở bên phải:
```js
let finalName; 
let name = getName(); 
if(name !== null && name !== undefined && name !== '') {
    finalName = name; 
} else {
    finalName = 'Bach'
}

// Shorthand
let finalName = getName() || 'Bach';
```

# The ternary operator
Bạn có thể viết câu lệnh `if else` trong một dòng bằng toán tử ternary `condition ? val1 : val2`:
```js
//Long version
let points = 70; 
let result; 
if(marks >= 50){
    result = 'Pass'; 
}else{
    result = 'Fail'; 
}

//Shorthand
let points = 70; 
let result = marks >= 50 ? 'Pass' : 'Fail';
```

# Template Literals
Thay vì sử dụng toán tử `+` để nối các chuỗi, chúng ta có thể sử dụng template literals ES6:
```js
// Long version
console.log('Hello ' + name +', it is ' + day); 

//Shorthand
console.log(`Hello ${name}, it is ${day}`);
```

# Swap two variables
Với  arraw destructuring, bạn có thể hoán đổi hai biến mà không cần sử dụng biến thứ ba.
```js
let x = 1, y = 2; 

//Long version
const temp = x; 
x = y; 
y = temp; 

//Shorthand
[x, y] = [y, x];
```

# AND(&&) Short circuit evaluation
Bạn có thể sử dụng toán tử `&&` nếu bạn muốn thực thi một hàm nếu một biến là `true`:
```js
// Long version
if (isLoggedin) { 
    redirectToHomepage(); 
}

//Shorthand
isLoggedin && redirectToHomepage();
```

# Arrow function
Bạn có thể viết các hàm ngắn hơn bằng cách sử dụng cú pháp arrow function:
```js
//Long version
function add(a, b) {
    return a + b; 
}

// Shorthand
const add = (a, b) => a + b;
```

# Multiple condition checking
Khi kiểm tra nhiều giá trị, chúng ta có thể pull tất cả các giá trị trong một mảng và sử dụng phương thức `indexOf ()`  hoặc `include ()`:
```js
//Long version
if (value === 1 || value === 'one' || value === 2 || value === 'two') {
    //Execute code
}

//Shorthand 1
if ([1, 'one', 2, 'two'].indexOf(value) >= 0) {
    //Execute code
}
//Shorthand 2
if ([1, 'one', 2, 'two'].includes(value)) {
    //Execute code
}
```

# String into a number
Bạn có thể chuyển đổi một chuỗi thành một số bằng cách viết một toán tử `+` trước chuỗi:
```js
// Long version
let total = parseInt('45'); 
let average = parseFloat('421.6'); 

//Shorthand
let total = +'45'; 
let average = +'421.6';
```

# Object property Assignment
Nếu tên biến và tên key của một object giống nhau thì chúng ta có thể tạo object như sau:
```js
let firstname = 'Emma'; 
let lastname = 'Turner'; 

//Long version
let obj = {firstname: firstname, lastname: lastname}; 

//shorthand
let obj = {firstname, lastname};
```

# Find max and min number in array
Thay vì viết vòng lặp `for`, bạn có thể sử dụng toán tử `...` của `Array.reduce()`:
```js
// Shorthand
const arr = [2, 8, 15, 4]; 
Math.max(...arr); // 15
Math.min(...arr); // 2
```

# Exponent Power
Thay vì `Math.pow()`, chúng ta có thể sử dụng `**` để tìm lũy thừa của một số:
```js
//Long version
const power = Math.pow(4, 3); // 64

//Shorthand
const power = 4**3; // 64
```

# Doouble NOT bitwise operator
Bạn có thể sử dụng `~~` thay vì `Math.floor()`. Chỉ hoạt động với các số 32 bit, vì vậy hãy sử dụng nó một cách khôn ngoan nhé:
```js
//Long version
const floor = Math.floor(4.8); // 4

//Shorthand
const floor = ~~4.8; // 4
```

# Repeat a string multiple time
Thay vì vòng lặp `for`, bạn có thể sử dụng `repeat()` để lặp lại một chuỗi:
```js
//Long version
let str = ''; 
for(let i = 0; i < 5; i ++) {
    str += 'Hello '; 
}
console.log(str); // Hello Hello Hello Hello Hello 

//Shorthand
'Hello '.repeat(5);
```

# For loop
Chúng ta có thể sử dụng `for of` hoặc `for in` thay vì vòng lặp `for`.
```js
let arr = [1, 2, 3, 4]; 
//Long version
for (let i = 0; 1 < arr.length; i++) {
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

# Deep clong of multi-level object
```js
let obj = {x: 20, y: {z: 30}}; 

//long version
const makeDeepClone = (obj) => {
    let newObject = {}; 
    Object.keys(obj).map(key => {
        if(typeof obj[key] === 'object'){
            newObject[key] = make DeepClone(obj[key]); 
        } else {
            newObject[key] = obj[key]; 
        }
    }); 
    return neObject; 
}
const cloneObj = makeDeepClone(obj); 

//Shorthand
const cloneObj = JSON.parse(JSON.stringify(obj));
```

# Get character from string
Bạn có thể sử dụng toán tử `[]` để lấy một ký tự từ một chuỗi:
```js
let str = 'heelloworld'; 
//Long version
str.charAt(1); // e

//Shorthand
str[1]; // e
```

# Merging arrays
Thay vì sử dụng `Array.concat()`, chúng ta có thể sử dụng `...` để hợp nhất các mảng:
```js
let arr1 = [2, 3]; 
//Long version
let arr2 = arr1.concat([4, 5]); 
// [2, 3, 4, 5]

// Shorthand
let arr2 = [...arr1, 4, 5]; 
// [2, 3, 4, 5]
```

# Tổng kết
Trên đây là một số cách sử dụng shorthand trong JS, Happy coding nhé các bạn <3 <3 <3 !!