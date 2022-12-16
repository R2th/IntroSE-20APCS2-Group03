## Giới thiệu
Chào mọi người, hôm nay mình xin giới thiệu cho mọi người một vài lưu ý nho nhỏ để dần cải thiện hơn trong việc viết code javascript. <br/>
Giúp việc code javascript trở nên dễ dàng và trình bày code gọn gàng hơn bằng những cú pháp rút gọn code và đa phần là những tính năng của ES6 cung cấp cho chúng ta .<br/>
### 1. Toán tử 3 ngôi
Có khá là nhiều ngôn ngữ hỗ trợ cú pháp này như java, c++ , c#, php, ruby,... Đơn giản đây chỉ là cách viết gọn hơn của `if...else` chỉ trên 1 dòng code.
##### Longhand:
```javascript
const x = 20;
let answer;

if (x > 10) {
    answer = "Lớn hơn 10";
} else {
    answer = "Nhỏ hơn 10";
}
```
##### Shorthand:
```javascript
const answer = x > 10 ? "Lớn hơn 10" : "Nhỏ hơn 10";
```
### 2. Định nghĩa biến 
Sẽ nhanh hơn và gọn hơn nếu chúng ta khai báo nhiều biến cũng một lúc.
##### Longhand:
```javascript
let x;
let y;
let z = 3;
```
##### Shorthand:
```javascript
let x, y, z = 3;
```
### 3. So sánh với giá trị kiểu boolean
Trong trường hợp giá trị so sánh được so sánh với giá trị `true` thì ta có thể bỏ qua toán tử so sánh đó.
##### Longhand:
```javascript
if (likeJavaScript === true)
```
##### Shorthand:
```javascript
if (likeJavascript)
```
>>  Note:  Thực tế thì  2 cú pháp trên không hoàn toàn giống nhau. Với cú pháp rút gọn thì chỉ cần `likeJavascript` là `truthy value` thì sẽ đúng do mình khuyên bạn chỉ nên sử dụng với trường hợp so sánh điều kiện kiểu `boolean`.


Ngoài ra còn có cũng có thể áp dụng đối với trường hợp `KHÔNG PHẢI` là `true`
##### Longhand:
```javascript
if (isRobot !== true)
```
##### Shorthand:
```javascript
if (!isRobot)
```
### 4. Vòng lặp For
Mẹo này giúp bạn thật sự hữu ích đối với những người muốn viết JS thuần và không muốn dựa vào các thư viện bên ngoài như JQuery hay Lodash.
##### Longhand:
```javascript
const fruits = ['mango', 'peach', 'banana'];
for (let i = 0; i < fruits.length; i++)
```
##### Shorthand:
```javascript
for (let fruit of fruits)
```
Nếu bạn muốn lặp theo index thì có thể sử dụng cú pháp: 
```javascript
for (let index in fruits)
   console.log(key) // output: mango, peach, banana
```
### 5. Arrow functions
Một trong những tính năng phải gọi là cực kỳ hữu ích của ES6 mà bạn không nên bỏ qua. Thay vì phải sử dụng cú pháp rờm rà để định nghĩa một funtion thì giờ đây ta có thể sử dụng dấu `=>` nhìn trực quan và ngắn gọn hơn hẳn.<br/>
Thay vì bạn viết:
```javascript
// cách 1
function name(var1, var2){
  ...
};
// cách 2
const Name = function(var1, var2){
  ...
};
```
Thì hãy viết thành:
```javascript
const nameFunction = (var1, var2) => {
  ...    
};
// nếu không truyền vào tham số nào thì
const nameFunction = () => {
  ...
};
// nếu chỉ truyền vào 1 tham số thì
const nameFunction = var1 => {
  ...
};
```
Ví dụ:
```javascript
function sayHi() { 
    console.log('Hi'); 
};

function sayHello(name) {
  console.log('Hello', name);
}

function multiply(x, y) {
    return x * y;
};

// shorthand
const sayHi = () => console.log('Hi');
const sayHello = name => console.log('Hello', name);
const multiply = (x, y) => { return x * y };
```
### 6. Implicit Return
Nếu bạn sử dụng cú pháp của arrow function thì sẽ không cần sử dụng từ khóa `return` vẫn có thể trả về kết quả mà ta mong muốn:
##### Longhand
```javascript
function calcCircumference(diameter) {
  return Math.PI * diameter
}
```
##### Shorthand
```javascript
calcCircumference = diameter => Math.PI * diameter;
```
### 7. Default Parameter Values
Cũng là một tính năng của ES6, việc này giúp bạn tránh giá trị của tham số truyền vào là `undefined`. Việc khởi tạo những tham số mặc định trong function cũng khá là quan trọng đấy.
##### Longhand
```javascript
function volume(l, w, h) {
  if (w === undefined)
    w = 3;
  if (h === undefined)
    h = 4;
  return l * w * h;
}
```
##### Shorthand
```javascript
const volume = (l, w = 3, h = 4 ) => (l * w * h);
```
### 8. Template Literals
Bạn đã gặp khó khăn trong việc lấy là một đoạn chuỗi mà vừa có cả biến vừa có cả string chưa? Để giải quyết vấn đề này thì ES6 có đưa ra cú pháp `${}` giúp việc thao tác với chuỗi trở nên đơn giản hơn.
```javascript
// Longhand
const welcome = 'You have logged in as ' + first + ' ' + last + '.'
// Shorthand
const welcome = `You have logged in as ${first} ${last}`;
```
### 9. Multi-line String
Bạn đã bao giờ viết một chuỗi trên nhiều dòng chưa, mình nghĩ là vẫn còn nhiều bạn vẫn viết theo cách sau:
```javascript
const lorem = 'Lorem ipsum dolor sit amet, consectetur\n\t'
    + 'adipisicing elit, sed do eiusmod tempor incididunt\n\t'
    + 'ut labore et dolore magna aliqua. Ut enim ad minim\n\t'
    + 'veniam, quis nostrud exercitation ullamco laboris\n\t'
    + 'nisi ut aliquip ex ea commodo consequat. Duis aute\n\t'
    + 'irure dolor in reprehenderit in voluptate velit esse.\n\t'
```
thay vào đó hãy viết như sau nhé:
```javascript
const lorem = `Lorem ipsum dolor sit amet, consectetur
    adipisicing elit, sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse.`
```
### 10. Spread Operator Shorthand (...)
Đây là cú pháp khá là mới và có thể nhiều bạn còn chưa từng biết và cú pháp này. Trong bài các phương thức xử lý về mảng mình cũng đã từng giới thiệu qua rồi. Về cơ bản Spread Operator cho phép ta chuyển 1 mảng thành nhiều phần tử đơn lẻ, một chuỗi thành nhiều kỹ tự rồi chúng ta có thể tùy ý thao tác với từng phần tử hoặc ký tự đó.
##### Longhand
```javascript
// joining arrays
const odd = [1, 3, 5];
const nums = [2 ,4 , 6].concat(odd);

// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = arr.slice()
```
##### Shorthand
```javascript
// joining arrays
const odd = [1, 3, 5 ];
const nums = [2 ,4 , 6, ...odd];
console.log(nums); // [ 2, 4, 6, 1, 3, 5 ]

// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = [...arr];
```
Note: Không giống như `concat()` bạn có thể sử dụng spread operator để chèn vào bất kỳ vị trí vào bạn muốn chứ không phải nhất thiết ở cuối một mảng.
```javascript
const odd = [1, 3, 5 ];
const nums = [2, ...odd, 4 , 6];
```
### 11.  Double Bitwise NOT (~~ )
Double bitwise NOT (~~ ) có thể dùng thay thế cho hàm làm tròn xuống Math.floor().
```javascript
Math.floor(4.9) === 4  //true
~~4.9 === 4  //true
```
### 12. Exponent Power (** )
Đây là cách viết tắt của hàm pow() 
```javascript
Math.pow(2,3); // 8
Math.pow(2,2); // 4
Math.pow(4,3); // 64
```
##### Shorthand
```javascript
2**3 // 8
2**4 // 4
4**3 // 64
```
### 13. Chuyển đổi qua lại giữa chuỗi và số
Việc chuyển đổi này có vẻ không mấy là phức tạp cho lắm.
```javascript
const num1 = parseInt("100");
const num2 =  parseFloat("100.01");
```
nhưng bạn có thể sử dụng cú pháp sau vừa đơn giản và dễ nhớ nữa:
```javascript
const num1 = +"100"; // converts to int data type
const num2 =  +"100.01"; // converts to float data type
```
## Kết luận
Trên đây chỉ là một cách giúp bạn rút gọn code hơn và không hẳn phải áp dụng hết trong mọi trường hợp, vì có thể việc mình rút gọn code nhiều quá dẫn đến khi đọc lại code sẽ trở thành khó khăn vậy nên bạn thận trọng và linh hoạt trong việc trình bày code. 
## Tham khảo
https://www.sitepoint.com/shorthand-javascript-techniques/ <br/>