Hi mọi người<br>
ES6 cung cấp một tính năng mới gọi là **destructuring assignment**, nó có nhiệm vụ tái cấu trúc lại các thuộc tính của một object hoặc một mảng.<br>
Các bạn hãy xem các ví dụ bên dưới để hiểu hơn nhé:<br>
### Sử dụng destructuring với array
Giả sử chúng ta có hàm như bên dưới<br>
```Javascript
function getScores() {
   return [70, 80, 90];
}
```
Tiếp theo gọi hàm getScores() và gán giá trị trả về của hàm vào một biến:<br>
```Javascript
let scores = getScores();
```
Cuối cùng lấy giá trị điểm của mỗi thành phần trong mảng bằng code bên dưới.<br>
```Javascript
let x = scores[0], 
    y = scores[1], 
    z = scores[2];
```
Output:
```Javascript
70 80 90
```
Như các bạn thấy trước đây khi chưa có ES6 chúng ta thường sẽ sử dụng đoạn code trên để truy cập vào từng phần tử của mảng.<br>
Tuy nhiên, từ khi có ES6 bạn có thể sử dụng destructuring assignment để lấy giá trị của từng phần tử trong mảng như code bên dưới.<br>
```Javascript
let [x, y, z] = getScores();

console.log(x); // 70
console.log(y); // 80
console.log(z); // 90
```
Biến x, y, z sẽ lấy các giá trị tương ứng thành phần đầu tiền, thứ hai, thứ ba của mảng trả về.<br>
Nếu hàm getScores () trả về một mảng gồm hai phần tử, thì biến thứ ba sẽ không được xác định, ví dụ:<br>
```Javascript
function getScores() {
   return [70, 80];
}

let [x, y, z] = getScores();

console.log(x); // 70
console.log(y); // 80
console.log(z); // undefined
```
Trường hợp trên biến z là undefined thì bạn có thể gán giá trị mặc định cho biến z như code bên dưới.<br>
```Javascript
let [x, y, z = 100] = getScores();

console.log(x); // 70
console.log(y); // 80
console.log(z); // 100
```
Trong trường hợp hàm getScores () trả về một mảng có nhiều hơn ba phần tử, các phần tử còn lại sẽ bị loại bỏ. Ví dụ:<br>
```Javascript
function getScores() {
   return [70, 80, 90, 100];
}

let [x, y, z] = getScores();

console.log(x); // 70
console.log(y); // 80
console.log(z); // 90
```

### Sử dụng destructuring với object
ví dụ:<br>
```Javascript
let person = {
    firstName: 'John',
    lastName: 'Doe'
};
let { firstName, lastName } = person;

console.log(firstName + '-' + lastName);// John-Doe
```
Hoặc:<br>
```Javascript
let person = {
    firstName: 'John',
    lastName: 'Doe'
};
let { firstName: fname, lastName: lname } = person;

console.log(fname + '-' + fname);
```
Trong ví dụ trên, các thuộc tính firstName và lastName được gán cho các biến fName và lName tương ứng.<br>
Định danh trước dấu hai chấm ( : ) là thuộc tính của đối tượng và định danh sau dấu hai chấm là biến.<br>

### Sử dụng destructuring và Rest parammeter syntax
Chúng ta có thể lấy tất cả các phần tử còn lại của mảng và đặt chúng vào một mảng mới bằng cách sử dụng dấu 3 chấm (...) trong **rest syntax**.<br>
```Javascript
let [x, y ,...args] = getScores();
console.log(x); // 70
console.log(y); // 80
console.log(args); // [90, 100]
```
Biến x, y sẽ nhận giá trị thứ nhất và thứ hai của mảng, còn biến args sẽ nhận tất cả các phần tử còn lại của mảng.<br>