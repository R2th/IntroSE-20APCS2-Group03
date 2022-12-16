Bài viết này sẽ giới thiệu về một số tính năng mới của Javascript ES6. Dưới đây là những tính năng mĩnh sẽ giới thiệu hôm nay.
1. JavaScript let
2. JavaScript const
3. JavaScript Arrow Functions
4. JavaScript Classes
5. Default parameter values
6. Array.find()
7. Array.findIndex()
8. Exponentiation (**) (EcmaScript 2016)

## Let Javascript
Let tạo ra một biến chỉ có thể truy cập được trong block bao quanh nó, khác với var - tạo ra một biến có phạm vi truy cập xuyên suốt function chứa nó.
* Ví dụ
```
var x = 10;
// Here x is 10
{ 
  let x = 2;
  // Here x is 2
}
// Here x is 10
```
## Const Javascript
Các const cho phép bạn khai báo một hằng số (một biến JavaScript với một giá trị không đổi).
* Ví dụ
```
var x = 10;
// Here x is 10
{ 
  const x = 2;
  // Here x is 2
}
// Here x is 10
```
Lưu ý  khi làm việc với ES6 nhé:

Không dùng var trong bất kì mọi trường hợp<br>
Thay vào đó thì dùng let<br>
Dùng const khi cần định nghĩa một hằng số<br>
# JavaScript Arrow Functions
Arrow Functions cho phép một cú pháp ngắn để viết biểu thức chức năng.
Bạn không cần viết các từ khóa function, từ khóa return hay các dấu ngoặc nhọn nếu function đó chỉ có một sử lý và trả về một giá trị.
```
// ES5
var x = function(x, y) {
   return x * y;
}

// ES6
const x = (x, y) => x * y;
```
## Classes
Một lớp là một loại chức năng, nhưng thay vì sử dụng các từ khóa function để bắt đầu nó, chúng ta sử dụng từ khóa class, và các thuộc tính được gán bên trong một constructor().
    Sử dụng các từ khóa class để tạo ra một lớp, và luôn luôn thêm một phương thức khởi tạo.<br>
Mỗi lần các đối tượng lớp được khởi tạo constructor của lớp đó sẽ được gọi.
* Ví dụ
Định nghĩa một lớp có tên là "car":
```
class Car {
  constructor(brand) {
    this.carname = brand;
  }
}
```
Bây giờ bạn có thể tạo các đối tượng bằng cách sử dụng lớp Car:
```
class Car {
  constructor(brand) {
    this.carname = brand;
  }
}
mycar = new Car("Ford");
```
### Default Parameter Values
ES6 cho phép Parameter có giá trị mặc định.
* Ví dụ
```
function myFunction(x, y = 10) {
  // y is 10 if not passed or undefined
  return x + y;
}
myFunction(5); // will return 15
```
## Array.find ()
Phương thức find() trả về giá trị phần tử mảng đầu tiên thỏa mãn điều kiện.
Ví dụ này tìm thấy (trả về giá trị) phần tử đầu tiên có giá trị lớn hơn 18:
* Ví dụ
```
var numbers = [4, 9, 16, 25, 29];
var first = numbers.find(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
```
kết quả trả về là 25.<br>
* chú ý hàm cần 3 đối số.br>
1. Giá trị
2. Chỉ số 
3. Mảng
## Array.findIndex ()
Phương thức findIndex() trả về chỉ số  phần tử mảng đầu tiên thỏa mãn điều kiện.
Ví dụ này tìm thấy (trả về chỉ số ) phần tử đầu tiên có giá trị lớn hơn 18:
* Ví dụ
```
var numbers = [4, 9, 16, 25, 29];
var first = numbers.findIndex(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
```
kết quả trả về là 3<br>
* chú ý hàm cần 3 đối số.br>
1. Giá trị
2. Chỉ số 
3. Mảng
## Exponentiation (**) (EcmaScript 2016)
Exponentiation ( **) tính kết quả của toán hạng đầu tiên với lũy thừa toán hạng thứ hai.
* Ví dụ
```
var x = 5;
var z = x ** 2;          // result is 25
```
x ** y ra kết quả tương tự như Math.pow(x,y):
* Ví dụ
```
var x = 5;
var z = Math.pow(x,2);   // result is 25
```
## Kết bài
Trên đây là những điều mình hiểu biết về Javascript ES6. Cảm ơn các bạn đã theo dõi.