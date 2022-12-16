Trong bài đăng này, chúng ta sẽ xem xét truyền tham trị và truyền tham chiếu trong Javascript.

# Truyền tham trị
Hàm được gọi bằng cách truyền trực tiếp giá trị của biến làm đối số. Thay đổi đối số bên trong hàm không ảnh hưởng đến biến được truyền từ bên ngoài hàm. Javascript luôn luôn truyền tham trị và không bao giờ thay đổi giá trị với kiểu dữ liệu nguyên thủy (String, number hoặc boolen)

```javascript
function callByValue(varOne, varTwo) { 
  console.log("Inside Call by Value Method"); 
  varOne = 100; 
  varTwo = 200; 
  console.log("varOne =" + varOne +"varTwo =" +varTwo); 
} 
let varOne = 10; 
let varTwo = 20; 
console.log("Before Call by Value Method"); 
console.log("varOne =" + varOne +"varTwo =" +varTwo); 
callByValue(varOne, varTwo) 
console.log("After Call by Value Method"); 
console.log("varOne =" + varOne +"varTwo =" +varTwo); 

output will be : 
--------------- 
Before Call by Value Method 
varOne =10 varTwo =20 
Inside Call by Value Method 
varOne =100 varTwo =200 
After Call by Value Method 
varOne =10 varTwo =20
```

Tuy nhiên, khi một biến tham chiếu đến một đối tượng bao gồm mảng, giá trị là tham chiếu đến đối tượng.

# Truyền tham chiếu
Hàm được gọi bằng cách chuyển trực tiếp tham chiếu / địa chỉ của biến làm đối số. Thay đổi đối số bên trong hàm ảnh hưởng đến biến được truyền từ bên ngoài hàm. Trong các đối tượng Javascript và mảng theo sau thông qua tham chiếu.

```markdown
function callByReference(varObj) { 
  console.log("Inside Call by Reference Method"); 
  varObj.a = 100; 
  console.log(varObj); 
} 
let varObj = {a:1};
console.log("Before Call by Reference Method"); 
console.log(varObj);
callByReference(varObj) 
console.log("After Call by Reference Method"); 
console.log(varObj);
output will be : 
--------------- 
Before Call by Reference Method 
{a: 1} 
Inside Call by Reference Method 
{a: 100} 
After Call by Reference Method 
{a: 100}
```

Vì vậy, nếu chúng ta truyền đối tượng hoặc mảng làm đối số cho phương thức, thì các giá trị của đối tượng có thể thay đổi.

# Chuyển đổi từ tham chiếu sang tham trị
Thường thì với những object đơn giản một cấp thế này, bạn có thể sử dụng Object.assign. Ví dụ như 
```javascript
let x1 = {'name': 'John'};
let x2 = Object.assign({}, x1);
x2['name'] = 'Peter';

console.log(x2);
=> {name: 'Peter'}
console.log(x1);
=> {name: 'John'}
```

Tuy nhiên, nếu gán object phức tạp hơn thì Object.assign không thể như mong muốn được. Ví dụ như
```javascript
let x1 = {
    'odd': [1, 3, 5],
    'even': [0, 2, 4]
}

let x2 = Object.assign({}, x1);
x2['odd'].push(7);

console.log(x1);
=>
{
    'odd': [1, 3, 5, 7],
    'even': [0, 2, 4]
}
```
=> Giải pháp
> Đơn giản nhất bạn có thể biến đổi object phức tạp đó sang string(kiểu dữ liệu nguyên thủy), sau đó parse lại để chuyển string đó thành object JSON hoàn toàn mới.

```javascript
let x1 = {
    'odd': [1, 3, 5],
    'even': [0, 2, 4]
}

let x2 = JSON.parse(JSON.stringify(x1));
```
# Kết Luận
Trên đây là một số thông tin mà mình mong muốn các bạn đọc xong có thể nắm được cơ bản hoạt động về các kiểu giá trị truyền/nhận trong javascript, có góp ý vui lòng comment. Chân thành cảm ơn!