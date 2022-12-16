Hôm nay mình sẽ giới thiệu một số cách viết ngắn gọn code trong JS để trông ngắn gọn và đẹp hơn.
###  Khai báo biến
```php
// viết dài (đây là cách mình thấy nhiều ng hay dùng nhất :)
let x; 
let y = 2; 

// viết gọn 
let x, y = 2;
```
### Gán giá trị cho nhiều biến
Ta có thể gán giá trị cho nhiều biến sử dụng cấu trúc mảng.
```php
// viết dài 
let x, y, z; 
x = 1; 
y = 2; 
z = 3;
 
// viết gọn  
let [x, y, z] = [1, 2, 3];
```
### Toán tử bậc 3
Thay vì dùng câu lệnh if-else ta có thể dùng toán tử bậc 3 để viết ngắn gọn hơn 
```php
// viết dài
let age = 24; 
let result; 

if (age >= 30) {
   result = 'Old'; 
} else { 
  result = 'Young'; 
} 

// viết gọn 
let result = age >= 30 ? 'Old' : 'Young';
```
### Gán giá trị mặc định
Ta có thể dùng OR (||) để gán giá trị mặc định cho 1 biến trong trường hợp giá trị mong đợi trả về là rỗng
```php
// viết dài 
let imagePath; 
let path = getImagePath(); 

if (path !== null && path !== undefined && path !== '') { 
  imagePath = path; 
} else { 
   imagePath = 'default.jpg'; 
} 

// viết gọn  
let imagePath = getImagePath() || 'default.jpg';
```
### AND (&&)
Nếu chúng ta muốn gọi 1 hàm khi mà 1 biến nào đó là true.
```php
// viết dài  
if (loggedIn) {
     homePage(); 
} 

// viết gọn 
loggedIn && homePage();
```
### Hoán đổi
Thông thường khi hoán đổi 2 giá trị cho nhau chúng ta thường sử dụng thêm 1 phần tử thứ 3 nữa để gán (cách cổ điển ngày xưa hay làm:joy:). Nhưng trong JS việc hoán đổi dễ dàng hơn với phép gán cấu trúc mảng
```php
let x = 'Hello', y = 'Viet nam'; 

// viết dài 
const temp = x; 
x = y; 
y = temp; 

// viết gọn 
[x, y] = [y, x];
```
### Arrow Function
```php
// viết dài  
function add (num1, num2) { 
   return num1 + num2; 
} 

// viết gọn  
const add = (num1, num2) => num1 + num2;
```
### Nối giá trị vào string
Ta sẽ sử dụng toán tử + để nối các giá trị string với các biến.
```php
// viết dài  
console.log('My identity is' + number + 'and my phone is' + phone); 

// viết gọn   
console.log(`My identity is ${number} and my phone is ${phone}`);
```
### Kiểm tra nhiều điều kiện
```php
// viết dài   
if (value === 1 || value === 'one' || value === 2 || value === 'two') { 
     // Execute some code 
} 

// viết gọn cách 1 
const array = [1, 'one', 2, 'two'];

if (array.indexOf(value) >= 0) { 
    // Execute some code 
}
// viết gọn cách 2
if (array.includes(value)) { 
    // Execute some code 
}
```
### Object Property Assignment
Nếu tên biến và tên object key trùng nhau, ta có thể chỉ cần viết tên biến, JavaScript sẽ tự động tạo key giống như tên biến và gán giá trị dưới dạng giá trị biến.
```php
let firstname = 'Hero', lastname = 'Red'; 

//viết dài 
let obj = {firstname: firstname, lastname: lastname}; 

//viết gọn 
let obj = {firstname, lastname};
```
### Convert chuỗi thành số
Thông thường ta sẽ hay dùng hàm *parseInt* và *parseFloat* để chuyển đổi kiểu chuỗi sang số. Tuy nhiên cách ngắn hơn là ta dùng dấu **+** đằng trước chuỗi đó.
```php
// viết dài  
let integer = parseInt('123'); 
let float = parseFloat('12.3'); 

// viết gọn
let integer = +'123'; 
let float = +'12.3';

// kiểm tra kiểu dữ liệu
console.log(typeof integer);
console.log(typeof float);
```
### Lặp lại chuỗi nhiều lần
Thay vì dùng vòng lặp *for* ta có thể dùng hàm **repeat()** để nhanh vào gọn hơn
```php
// viết dài   
let str = ''; 

for (let i = 0; i < 5; i ++) { 
   str += 'Hello '; 
} 
console.log(str); // Hello Hello Hello Hello Hello 

// viết gọn   
'Hello '.repeat(5);
```
### Mũ lũy thừa
Bình thường mọi người hay dùng hàm **Math.pow()** để tính mũ lũy thừa, nhưng thay vào đó ta có thể dùng cú pháp (**) để trong dòng code trong gọn nhẹ hơn
```php
// viết dài 
const power = Math.pow(3, 4); // 81 

// viết gọn 
const power = 3**4; // 81
```
### Toán tử kép (~~)
Toán tử naỳ thay cho phương thức **Math.floor()**
```php
// viết dài  
const floor = Math.floor(2.8); // 2 

// viết gọn  
const floor = ~~2.8; // 2
```
> Phương pháp toán tử kép ( ~~ ) chỉ hoạt động với số nguyên 32 bit, tức là (2 ^31) - 1 = 2147483647. Vì vậy, đối với số lớn hơn 2147483647, toán tử này sẽ cho kết quả sai, khi đó chúng ta nên sử dụng **Math.floor()** trong trường hợp đó.

### Tìm Max, Min trong mảng
Chúng ta có thể sử dụng vòng lặp for để lặp qua từng giá trị của mảng và tìm giá trị max hoặc min.  Hoặc cũng có thể sử dụng method Array.reduce() để tìm max và min trong mảng. Nhưng có cách nhanh hơn nữa đó là sử dụng spread operator nhìn sẽ gọn hơn rất nhiều
```php
const arr = [2, 0, 15, 10]; 
Math.max(...arr); // 15 
Math.min(...arr); // 0
```
### Merge mảng
```php
let arr1 = [10, 20]; 

// viết dài   
let arr2 = arr1.concat([30, 40]); 
// [10, 20, 30, 40] 

//viết gọn 
let arr2 = [...arr1, 30, 40]; 
// [10, 20, 30, 40] 
```


Thanks for reading:sparkling_heart:

Nguồn tham khảo: https://medium.com/javascript-in-plain-english/20-javascript-shorthand-techniques-that-will-save-your-time-f1671aab405f