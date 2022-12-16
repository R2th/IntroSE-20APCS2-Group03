### 1: Variable scopes(Phạm vi sử dụng của các biến)
Các biến var sẽ thuộc phạm vi toàn cục(global scope) khi bạn định nghĩa chúng bên ngoài function. Ví dụ:<br>
```
var counter;
```
Trong ví dụ trên, counter là biến global scope. Nó có nghĩa là biến counter có thể truy cập từ bất kỳ function nào.<br>
Khi bạn khai báo một biến bên trong một function sử dụng từ khóa var, phạm vi của biến sẽ là local. Ví dụ<br>
```
function increase() {
    var counter = 10;
}
// cannot access the counter variable here
```
Trong ví dụ này, biến counter là local trong function increase(). Nó không thể truy cập bên ngoài function.<br>
Ví dụ tiếp theo hiển thị các số từ 0 đến 4 bên trong vòng lặp for và hiển thì số 5 bên ngoài vòng lặp<br>
```
for (var i = 0; i < 5; i++) {
	console.log("Inside the loop:", i);
}

console.log("Outside the loop:", i);
```
Output:<br>
```
Inside the loop: 0 
Inside the loop: 1 
Inside the loop: 2 
Inside the loop: 3 
Inside the loop: 4 
Outside the loop: 5
```
Trong ví dụ này, biến i là biến global. Vì vậy, Nó có thể truy cập cả bên trong và sau vòng lặp for.<br>
Ví dụ tiếp theo chúng ta sẽ sử dụng từ khòa let thay thế cho từ khóa var:<br>
```
for (let i = 0; i < 5; i++) {
	console.log("Inside the loop:", i);
}

console.log("Outside the loop:", i);
```
Trong trường hợp này, code của chúng ta sẽ hiển thị các số từ 0 đến 4 bên trong vòng lặp for và một lỗi tham chiếu.<br>
```
Inside the loop: 0
Inside the loop: 1
Inside the loop: 2
Inside the loop: 3
Inside the loop: 4
```
The error:<br>
```
Uncaught ReferenceError: i is not defined
```
Vì sử dụng từ khóa let, biến i là một blocked scope. Có nghĩa là biến i chỉ tồn tại và có thể truy cập bên trong block for.<br>
Trong Javascript, một block(một khối) được phân tách bằng một cặp dấu ngoặc nhọn {} như các câu lệnh if...else và for.<br>
```
if(condition) {
   // inside a block
}

for(...) {
  // inside a block
}
```
### 2: Creating global properties(tạo thuộc tính global)
Biến global var được thêm vào global object như những properties. Global object là window trên web browser và global trên Node.js:<br>
```
var counter = 0;
console.log(window.counter); //  0
```
Tuy nhiên, biến let thì không được thêm vào global object:<br>
```
let counter = 0;
console.log(window.counter); // undefined
```
### 3: Redeclaration(Khai báo lại)
Từ kháo var cho phép bạn khai báo lại một biến mà không gặp bất kỳ lỗi nào:<br>
```
var counter = 10;
var counter;
console.log(counter); // 10
```
Tuy nhiên, nếu bạn khai báo lại với từ khóa let, bạn sẽ nhận được một lỗi:<br>
```
let counter = 10;
let counter; // error
```