# Tìm hiểu về JavaScript ES6


-----

## 1. ECMAScript là gì?
* Được đề xuất làm tiêu chuẩn hoạt động của ngôn ngữ JavaScript trên các trình duyệt khác nhau
* Tạo ra sự thống nhất, logic và tường minh khi code javascript trên các trình duyệt khác nhau

**Tóm lại:**
* ECMAScript là tiêu chuẩn hoạt động của ngôn ngữ JavaScript trên các browser

## 2. ES6 là gì?
* ES6 là chữ viết tắt của ECMAScript 6
* ES6 ra đời vào năm 2015 nên cái tên ES2015 được lấy làm tên chính thức
* Năm 2017, phiên bản ES7 đang trong quá trình nghiên cứu và phát triển, hứa hẹn sẽ ra mắt với nhiều chức năng mới lạ đáng mong đợi

## 3. Các chức năng của ES6
### 3.1 Arrow function: 
* Cho phép chúng ta viết cú pháp function ngắn hơn

**Cú pháp function:**
```javascript
// Trong ES5

hello = function() {
    return "Hello World!";
};
```
```javascript
// Trong ES6

hello = () => {
    return "Hello World!";
};
```
### 3.2 Multi-line String
*  Cú pháp khai báo một chuỗi có nhiều trong trong JS 

**Ví dụ:**
```javascript
// Trong ES5

var roadPoem = 'Then took the other, as just as fair,\n\t'
    + 'And having perhaps the better claim\n\t'
    + 'Because it was grassy and wanted wear,\n\t'
    + 'Though as for that the passing there\n\t'
    + 'Had worn them really about the same,\n\t'

var fourAgreements = 'You have the right to be you.\n\
    You can only be you when you do your best.'

```
```javascript
// Trong ES6

var roadPoem = `Then took the other, as just as fair,
    And having perhaps the better claim
    Because it was grassy and wanted wear,
    Though as for that the passing there
    Had worn them really about the same,`

var fourAgreements = `You have the right to be you.
    You can only be you when you do your best.`

```
### 3.3 Template Literals
* Hiển thị biến trong chuỗi

**Ví dụ:**
```javascript
// Trong ES5

var name = 'Name is ' + first + ' ' + last + '.';
var url = 'http://localhost:3000/api/messages/' + id;

```
```javascript
// Trong ES6

var name = `Name is ${first} ${last}.`;
var url = `http://localhost:3000/api/messages/${id}`;

```
### 3.4 Block Scoped: 
* Let cho phép chúng ta khai báo biến trong phạm vi các khối lệnh. Các khối lệnh được định nghĩa bởi cặp ngoặc nhọn {}.

**Ví dụ:**
```javascript
// Trong ES5

function calculateTotalAmount () {
  var amount = 0

  for (int i=0; i< 1; i++) {
    var amount = 100
  }

  return amount
}
console.log(calculateTotalAmount(true)); 

// result: 100

```
```javascript
// Trong ES6

function calculateTotalAmount () {
  let amount = 0

  for (int i=0; i< 1; i++) {
    let amount = 100
  }

  return amount
}
console.log(calculateTotalAmount(true)); 

// result: 0

```
### 3.5 Destructuring
* Đơn giản chỉ là cú pháp để hủy cấu trúc mảng, object

**Ví dụ:**
```javascript
// Trong ES5

const example = ["apple", "VietNam", "Mustang"];

const fruits = example[0];
const country = example[1];
const car = example[2];
```
```javascript
// Trong ES6

const example = ["apple", "VietNam", "Mustang"];

const [fruits, country, car] = example;
```
* Nếu chỉ muốn lấy **fruits** và **car** thì hãy làm như sau:
```javascript
// Trong ES6

const example = ["apple", "VietNam", "Mustang"];

const [fruits,, car] = example;
```
* Một số cách áp dụng khác
```javascript
// Trả về một mảng
// Trong ES6

function calculate(a, b, c) {
    const sum = a + b + c;
    const sub = a - b - c;
    const mul = a * b * c;
    const div = (a / b) / c;

    return [sum, sub, mul, div];
}

const [sum, sub, mul, div] = calculate(8, 4, 2);
```
```javascript
// Sử dụng một đối tượng bên trong hàm
// Trong ES6

const example = {
    name: "Thong",
    age: "40",
    college: "Bach Khoa",
    vehicle: "Motobike"
}

DisplayInfo(example);

function DisplayInfo({name, age, college, vehicle}) {
    const message = "I'm " + name + ", " + age + "years old. " + "My college is " + college + ", I go to school by " + vehicle + ".";
    console.log(message);
}

```

### 3.6 Default Parameter
* Thiết lập giá trị mặc định cho tham số

**Ví dụ:**
```javascript
// Trong ES5

var hello = function(height, color, url) {
    var height = height || 50;
    var color = color || 'red';
    var url = url || 'http://viblo.asia';

    return "Complete!";
};
```
```javascript
// Trong ES6

hello = (height = 50, color = 'red', url = 'http://azat.co') => {
    return "Complete!";
};
```

### 3.7 Classes
* Trước kia JS không có định nghĩa class chính thống và phải sử dụng prototype trong function để định nghĩa:
```javascript
// Trong ES5

    function Vacation(destination, length) {
      this.destination = destination
      this.length = length
    }

    Vacation.prototype.print = function() {
      console.log(`${this.destination} will take ${this.length} days`)
    }

    let maui = new Vacation("Maui", 7)

    maui.print() // Maui will take 7 days
```
* Nhưng trong ES6 đã có định nghĩa class, nhưng về bản chất thì vẫn xử lý bằng prototype, chỉ là cú pháp tường minh hơn thôi
```javascript
// Trong ES6

        class Vacation {
      constructor(destination, length) {
        this.destination = destination
        this.length = length
      }

      print() {
        console.log(`${this.destination} will take ${this.length} days`)
      }
    }

    let maui = new Vacation("Maui", 7)

    maui.print() // Maui will take 7 days

```
### 3.8 Promises
* Promise là một cơ chế trong JavaScript giúp bạn thực thi các tác vụ bất đồng bộ mà không rơi vào callback hell. [Xem thêm](https://viblo.asia/p/hieu-ve-dong-bo-va-khong-dong-bo-trong-javascript-lxrRXNYpzeO) cách hoạt động của JS để hiểu rõ hơn. Nhưng đơn giản Promise chỉ là thực hiện các câu lệnh tuần tự, chỉ khi **then()** đằng trước thực hiện xong thì **then()** sau mới có thể thực hiện

![](https://images.viblo.asia/1b2f9e5d-2172-4dbb-89d2-3c79a1f866d2.png)

```javascript
// Trong ES6

let myPromise = new Promise(function(myResolve, myReject) {

  myResolve(); // Được thực hiện khi thành công
  myReject();  // Được thực hiện khi thất bại
});

myPromise.then(
  function(value) { /* code nếu thành công */ },
  function(error) { /* code nếu có lỗi */ }
);
```

* Promise có tác dụng rất tuyệt vời, để trở thành một dev web tốt thì sử dụng thành thạo promise là kĩ năng cần thiết. Đây là một số tài liệu tham khảo mình đã từng dùng để học cách sử dụng promise: [Link 1](https://www.w3schools.com/js/js_promise.asp), [Link 2](https://viblo.asia/p/gioi-thieu-ve-promise-trong-javascript-mrDGMJVPezL)

### 3.9 Array Methods
* Việc xử lý thuật toán và dữ liệu bằng array là điều thường xuyên trong JavaScript, các method trong ES hỗ trợ rất tốt việc xử lý này. 
* Trong phiên bản ES6 đã hỗ trợ thêm một method là map(). Về cá nhân mình thấy method này rất hữu ích khi kết hợp với việc xử lý code trong React. 
```javascript
// Trong ES6

const numbers = [2, 3, 4, 5];
const newArr = numbers.map(mulTen)

function mulTen(num) {
  return num * 10;
}

// Ket qua: [20, 30, 40, 50]
```
### 3.10 Spread Operator
* Toán tử trải rộng (...) cho phép chúng ta nhanh chóng **sao chép** tất cả hoặc một phần của một **mảng** hoặc **đối tượng** hiện có vào một mảng hoặc đối tượng khác
```javascript
// Trong ES6

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const numbersCombined = [...arr1, ...arr2];

// Ket qua: [1, 2, 3, 4, 5, 6]
```
* Hoặc
```javascript
// Trong ES6

const numbers = [1, 2, 3, 4, 5, 6];

const [one, two, ...rest] = numbers;

// Ket qua: one = 1; two = 2; rest = [3, 4, 5, 6]
```
* Còn nhiều cách sử dụng hay ho khác bạn hãy thử nghĩ xem nhé!

### 3.11 Ternary Operator
* Toán tử ba ngôi 
* Toán tử bậc ba là một toán tử có điều kiện được đơn giản hóa như if / else.
* Cú pháp: điều kiện? <biểu thức nếu đúng>: <biểu thức nếu sai>

```javascript
// Trong ES5

if (checkName) {
  DisplayName();
} else {
  ThrowError();
}
```
```cpp
// Trong ES6

checkName ? DisplayName() : ThrowError();
```

### 3.12 Modules 
* Cho phép bạn chia nhỏ mã của mình thành các tệp riêng biệt và kết nối chúng với nhau thông qua lệnh import và export
* Điều này làm cho việc sửa đổi và phát triển source code dễ dàng hơn khi dự án của bạn phình to lên
* Nếu bạn đã hoặc đang tiếp xúc với React.Js thì chẳng còn lạ gì với việc import và export file
```javascript
// Trong ES6

// sort.js
export function Hello(user) {
	console.log(`Hello, ${user}`);
}

// index.js
import {Hello} from './sort.js';
Hello('FooBar');
// Hello, Foobar
```

* **NOTE:** Nếu bạn muốn tìm hiểu rõ hơn về import và export trong js thì đây là link dành cho bạn: *[export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) và [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)*

## 4. Lich sử của ECMAScript
* Mình hơi lười viết đoạn này, bạn nào thích tìm hiểu sâu thì đây là [LINK](https://vi.wikipedia.org/wiki/ECMAScript) nhé!!!!



**Chúc mọi người thành công nhé!!!**