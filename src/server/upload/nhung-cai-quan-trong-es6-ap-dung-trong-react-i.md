# **Những cái quan trọng ES6 áp dụng trong React I**
Trong bài viết này, tôi muốn giới thiệu các bạn những cái quan trọng trong ES6 để các bạn có thể áp dụng trong React. Nếu các bạn là một người bắt đầu học React, các bạn luôn luôn tự hỏi mình rằng **Tại sao cách code javascript của React khác với code khác nhiều thế ?**, **Tại sao cách viết hàm có cách viết như vậy ?**, **Tại sao mình phải dùng const hoặc let thay thế với dùng var ?**...Để trả lời những cấu hỏi trước là tại sao, trước mặt mình phải tìm rõ trước về  **ES6**, nhưng đối với **ES6** rất nhiều cái, nhiều lúc các bạn phải tự hỏi mình rằng mình phải học từ đâu, và kết thúc đến đâu, và học bao nhiều mới đủ vừa để bắt đầu code **React**, có những người đã nói là cứ học React đi sau đó bạn sẽ dẫn học và hiểu biết ES6 sau đây, nếu chỉ nghe một cấu như vậy cùng gọi đúng,nhưng có nhiều lúc bạn phải mất thời gian rất là nhiều trả lợi câu hỏi trên của mình. Như vậy đối với bài viết này có mục tích để  cho các bạn nghiên cứu về ES6 mà có thể đọc được về cách viết trong React nhanh nhất có thể.


## **const và let**
Đối với ES6 bạn sẽ gặp những cách khai báo biến mới trong javascript đó là **const** và **let**. Tại sao ES6 lại bỏ ```var``` ? Một cấu trả có thể dễ hiểu nhất là trong javascript ```var``` có thể  bị dùng không thế biết được ở chỗ nào trong code của bạn (accident to use) và tạo những cái không cần thiết.

- Vấn đề : cách khai bao biến lặp nhau
```
var nameVar = 'Samnang';
var nameVar = 'Dam';
console.log('nameVar', nameVar);
```

- ```let```: tên của biến chỉ khái bảo một lần không thế  khai báo thêm lần nữa nhưng có pháp gán lại giá trị
```
let nameLet = 'Samnang';
let nameLet = 'Dam'; // sẽ bị lỗi, duplicate declaration errors
nameLet = 'Dam Samnang'; // có thể  gán lại giá trị
console.log('nameLet', nameLet)
```
- ```const```: tên của biến chỉ khai báo một lần không thế  khai báo thêm lần nữa nhưng có pháp gán lại giá trị
```
const nameConst = 'Samnang';
const nameConst = 'Dam'; // sẽ bị lỗi, duplicate declaration errors
nameConst = 'Dam Samnang'; // sẽ bị lỗi, 
console.log('nameConst', nameConst);
```
- Lexical scope đối với ```let```và ```const```
let và const cùng có function scope như sau:
```
function getFirstName() {
   let firstName = 'Dam';
   return firstName;
}

function getLastName() {
   let lastName = 'SamNang';
   return lastName;
}

getFirstName();
getLastName();

console.log(firstName);  // sẽ bị lỗi, Không tìm thấy firstName 
console.log(lastName);   // sẽ bị lỗi, không tìm thấy lastName
```
- Block scoping: là không gian biến được khai báo giữa 1 cặp dấu ngoặc nhọn “{…}”.
```
let fullName = 'Dam SamNang';

if (fullName) {
    const firstNameConst = fullName.split(' ')[0];
    console.log(firstNameConst); // chạy OK
    
    let firstNameLet = fullName.split(' ')[0];
    console.log(firstNameLet); // chạy OK
}

console.log(firstNameConst); // sẽ bị lỗi
console.log(firstNameLet); // sẽ bị lỗi
```
- Sự khác biết quan trọng đối với ```let``` và ```const```:
  - khai báo ```let``` có thể không cần giá trị
  - khai báo ```const``` bắt buộc phải có giá trị
 ```
 let firstname; // chạy OK
 const lastName; // sẽ bị errors, Syntax error: missing initialization
 ```
 ## **Arrow function**
Đối với phần này, là một phần thất sự nhiều có thể bạn sẽ bị đau đầu nếu bạn mới bắt đầu đọc code hàm của ES6 đó là **Arrow function**.
```
// ES5
const square  = function(x) {
   return x*x;
};
console.log(square(8)); // kết quả 64

// ES6
// function keyword sẽ mất đi
const square = (x) => {
    return x*x;
};
console.log(square(3)); // kết quả 9
```
- **Arrow function Syntax**: sẽ giúp bạn viết một hàn càng nhanh hơn và sẽ đọc hơn bằng cách xóa ```keyword return```
```
const square = (x) => {
    return x*x;
};

const square = (x) => (x*x);
```
- **Arguments object**: đối với arrow function sẽ không còn bị ràng buộc ```arguments object```
```
// ES5 
const add = function(a, b) {
    console.log(arguments); // chạy OK
    return a + b;
};
add(1, 2);

// ES6 
const add = (a, b) =>  {
    console.log(arguments); // sẽ bị lỗi, argument is not defined
    return a + b;
};
add(1, 2);
```
- **this keyword**: đối với arrow function sẽ không còn bị ràng buộn ```this```
```
// ES5
const user = {
     name: 'SamNang',
     countries: ['Cambodia', 'Vietnam'],
     printPlacesLived: function() {
         console.log(this.name); // chạy OK
         console.log(this.countries); // chạy OK
         
         this.countries.forEach(function(country) {
             console.log(this.name + 'has lived in ' +  country); // sẽ bị lỗi, không tìm thấy được name
         });
     }
};

// ES6
const user = {
     name: 'SamNang',
     countries: ['Cambodia', 'Vietnam'],
     printPlacesLived: function() {
         console.log(this.name); // chạy OK
         console.log(this.countries); // chạy OK
         
         this.countries.forEach((country) => {
             console.log(this.name + 'has lived in ' +  country); // chạy OK
         });
     }
};

const user = {
     name: 'SamNang',
     countries: ['Cambodia', 'Vietnam'],
     printPlacesLived() {
         console.log(this.name); // chạy OK
         console.log(this.countries); // chạy OK
         
         this.countries.forEach((country) => {
             console.log(this.name + 'has lived in ' +  country); // chạy OK
         });
     }
};
```
## Kết luận
Đối với bài viết này là phần một đối với những cái quan trọng trong ES6 cần phải chú ý lúc bạn viết code trong React, đối với phần hai, mình sẽ đưa cho các bạn những phần thật là hấp dẫn hơn nữa, đó là ```class``` và ```destructuring array```.

## Tài Liệu:
- [Const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [Let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [Arrow Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)