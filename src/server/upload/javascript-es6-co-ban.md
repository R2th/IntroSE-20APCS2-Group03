JavaScript là ngôn ngữ lập trình phổ biến nhất trong lập trình web hiện nay. Hiện tại đã có rất nhiều phiên bản được ra mắt, xong phiên bản JS 2015 (ES6) lại là phiên bản được chú ý rất nhiều.   
Trong bài viết này, mình sẽ giới thiệu với các bạn những tính năng mới có trong ES6.
### 1.  let/var/const
![](https://images.viblo.asia/1237d5a4-e84c-4cb3-bc9c-bd4a6e7b67dc.png)
const - cho phép bạn khai báo một hằng số  
let -  tạo ra một biến chỉ có thể truy cập được trong block bao quanh nó  
var - tạo ra một biến có phạm vi truy cập xuyên suốt function chứa nó.  
* Ví dụ:
```js
{//block
    const a = '1';
    a = '10';
}
console.log(a); //Assignment to constant variable
```
```js
{//block
    let b = '2';
    b = '20';
}
console.log(b);// b is not defined
```
```js
{//block
    var b = '3';
    b = '30';
}
console.log(b);//30
``` 

### 2. Template literals
Trong javascript, khi khai báo giá trị của các biến là chuỗi ta thường sử dụng dấu nháy ' hoặc nháy ".  
Trong  phiên bản ES6 Temaplate Literals ( \`\`) là một cú pháp mới được thêm vào cũng dùng để khai báo biến nhưng nó có ưu điểm hơn so với cách khai báo thông thường.  
Cùng xem ví dụ dưới đây để thấy rõ hơn sự khác biệt nhé.  
```js
// ví dụ 1
console.log(" line 1
 line 2");
 ```
```js
// ví dụ 2
console.log(` line 1
 line 2`);
```
Nếu bạn chạy thử sẽ thấy ví dụ 1 bị lỗi còn ví dụ 2 sẽ cho kết quả là   
line 1  
line 2  
*Ngoài ra ta còn có thể Binding biến vào trong template một cách dễ dàng.*
* Ví dụ:
```js
  // ví dụ 1
        var a = 3;
        var b = 8;
        console.log("Eight is " + (a + b) + " \nnot " + (2 * a + b) + ".");
```
```js
  // ví dụ 2
        var a = 3;
        var b = 8;
        console.log(`Eight is ${a + b} \nnot ${2 * a + b}.`);
```
Cả hai ví dụ trên đều cho cùng một kết quả xong ta có thể thấy ngay rằng bằng việc sử dụng \`\` thì code đã ngắn gọn hơn
### 3. Arrow Functions
Arrow function là khai báo function bằng các sử dụng mũi tên (tương đương với =>).
* Ví dụ:
```js
// function thông thường
 var sum = function (a, b) {
            var result = a + b;
            return result;
        }
```
```js
// arrow function
var sum = (a, b) => {
            var result = a + b;
            return result;
        }
```
### 4. Default parameter values
Giá trị mặc định cho tham số hàm   
Khi không có parameter truyền vào thì nó sẽ truyền vào giá trị đã được chỉ định sẵn  
Trong trường hợp parameter mặc định không được chỉ định thì nó sẽ trả về undefined 
* Ví dụ:
```js
function test(a, b = 'number') {
    console.log(a, b);
}
test();         // undefined 'number'
test(10);      // 10 'number'
test(10, 20); // 10 20
```
### 5. Rest parameter
Tham số được coi như một mảng tuần tự truyền  vào
* Ví dụ:
```js
function test(a, b = 'number', ...c) {
    console.log(a, b, c);
}

test();               // undefined 'number'
test(10);             // 10 'number
test(10, 20);         // 10 20
test(10, 20, 30, 40); // 10 20 [30,40]
```
Cũng nhờ cơ chế này mà bạn có thể push 1 mảng vào trong khai báo một mảng
* Ví dụ:
 ```js
 listData = [1, 2, 3];
newListData = [...listData, 4, 5, 6];
console.log(newListData); // 1 2 3 4 5 6
```
### 6. Symbol
Là kiểu dữ liệu giống với các kiểu dữ liệu nguyên thủy như Number, String, Boolean...  
Mỗi một symbol là duy nhất (thuận tiện trong việc sinh ra các key cho đối tượng)  
* Ví dụ:
 ```js
let sym1 = Symbol();
let sym2 = Symbol('name');
let sym3 = Symbol('name');
console.log(sym1);        // Symbol
console.log(sym2);        // Symbol(name)
console.log(sym3);        // Symbol(name)

console.log(sym1 == sym1);//true
console.log(sym2 == sym2);//true
console.log(sym2 == sym3);//false
```
### 7. Array.find()
Phương thức này duyệt mảng và trả về giá trị đầu tiên thỏa mãn điều kiện
* Ví dụ:
```js
const numbers = [1, 2, 3, 4, 5, 6];

numbers.find(function (number) {
    return number % 2 == 0;
})
// 2
```

### 8. Array.findIndex()
Phương thức này trả về chỉ số phần tử mảng đầu tiên thỏa mãn điều kiện
* Ví dụ:
```js
const numbers = [1, 2, 3, 4, 5, 6];

numbers.findIndex(function(number){
  return number % 2 == 0;
})
// 1
```
### 9. Property Shorthand
Chúng ta  có thể binding biến vào trong object và nó sẽ nhận luôn tên của biến đó là thuộc tính trong object 
* Trước đây
```js
        const name = "Hieu";
        const age = 24;
        const person = { name: name, age: age };
```
* Khi có ES6
```js
        const name = "Hieu";
        const age = 24;
        const person = { name, age };
```
### 10. Classes
Cuối cùng trong bài viết này mình sẽ nói về Classes trong ES6. Lí do để nó cuối cùng là bởi vì nó khó hiểu (đối với mình)  
Đối với những ai đã từng học Java hay bất kỳ ngôn ngữ hướng đối tượng nào khác thì khái niệm classes đã không còn quá xa lạ. Xong đối với những người mới tìm hiểu về javascript sẽ thấy khó khăn với nó  
Vậy class là gì?  
Class là bản thiết kế của đối tượng  
Việc một object được tạo ra từ class được gọi là Instance  
Khi tạo một Instance thì ta dùng từ khóa *new*  
* Cú pháp:
```js
class ClassName{
    // code here
}
```
```js
var instanceName = new className()
}
```
* Ví dụ:
```js
        class User {
            constructor(name, age) {
                this.name = name;
                this.age = age;
            }
        }
        var anh = new User('Anh', 32);
        console.log(anh);
        // Kết quả : User{name:'Anh', age:'32'}
```
* Instance method
```js
 class User {
                constructor(name, age) {
                    this.name = name;
                    this.age = age;
                }
                getName() {
                    return this.name;
                }
            }
           
            var anh = new User('Anh', 32);
            console.log(anh.getName());
```
### Tổng kết
Trên đây, mình đã giới thiệu những tính năng cơ bản có trong ES6. Hy vọng nó hữu ích với những bạn mới bắt đầu !!!!