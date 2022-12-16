Hiện nay thì JavaScript là một ngôn ngữ rất phổ biến và không thể thiếu trong các ứng dụng web. Môi trường JavaScript đã trở nên khổng lồ. Nó có hệ sinh thái của riêng nó với thư viện, frameworks, công cụ, quản lý package và các ngôn ngữ mới để biên dịch ra JavaScript như React, Vue,... Trong bài viết này mình giới thiệu một số khái niệm tăng khả năng JavaScript, sẽ giúp bạn dễ dàng làm việc với JavaScript cũng như dễ dàng tiếp cận với các thư viện, frameworks,...
## Destructuring Assignment
`Destructuring Assignment`  là cú pháp cho phép lấy dữ liệu được lưu trữ bên trong Arrays hoặc Objects và gán chúng cho các biến riêng biệt
<br>
Ví dụ `Destructuring Assignment` với Object
```javascript
const obj = {
    name: 'huynh',
    city: 'Ha Noi'
}

const { name, city } = obj;

console.log(name, city)
// output tương ứng sẽ là: huynh, Ha Noi
```
Nếu chúng ta muốn khi lấy properties của object với tên khác, chúng ta có thể đặt lại bằng cách như sau:
```javascript
const obj = {
    name: 'huynh',
    city: 'Ha Noi'
}

const { name: myName, city: myCity } = obj;

console.log(myName, myCity)
// output tương ứng sẽ là: huynh, Ha Noi
```
Destructuring Assignment còn được sử dụng lấy các tham số được truyền cho một hàm. Ở trong ReactJs cũng thường xuyên gặp và được sử dụng rất nhiều
```javascript
const obj = {
    name: 'huynh',
    city: 'Ha Noi'
}

const myInfor = ({name, city}) => {
    console.log(`My information: ${name} - ${city}`);
}

myInfor(obj);
// output: My information: huynh - Ha Noi
```
## Cú pháp Spread
Cú pháp `spread` đơn giản được biểu diễn bởi dấu 3 chấm: ...
<br>
Cú pháp Spread cho phép duyệt qua các phần tử và truyền vào phương thức như các đối số có nghĩa là cho phép chuyển đổi một chuỗi thành nhiều argument (trong trường hợp gọi với hàm) hoặc thành nhiều phần tử (cho array)
<br>
```javascript
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));
// output: 6
```
Cú pháp:
- Cho việc gọi hàm: 
```javascript
myFunction(...iterableObj);
```
- Cho array literals hoặc strings:
```javascript
[...iterableObj, '4', 'five', 6];
```
- Cho object literals:
```javascript
let objClone = { ...obj };
```
## Cú pháp Rest
Rest cho phép chúng ta biểu diễn số lượng đối số không xác định dưới dạng một mảng.
```javascript
function sum(...Args) {
  return Args.reduce((previous, current) => {
    return previous + current;
  });
}

console.log(sum(1, 2, 3));
// output: 6
```
Cú pháp:
```javascript
function myFunction(a, b, ...Args) {
  // ...
}
```
## Array Methods
Trong JavaScript thì để thao tác với mảng rất thuận tiện vì JavaScript đã cung cấp cho chúng ta các array methods giúp chúng ta thực hiện biến đổi dữ liệu theo cách chúng ta cần. 
<br>
Trong bài viết này mình giới thiệu với các bạn một số phương thức.<br>
Đầu tiên là: map, filter, reduce. Cả 3 phương thức này đều là những cách hữu ích để chuyển đổi một mảng hoặc trả về một giá trị và có nhiều bạn đã nhầm lẫn các phương thức này. Vậy các phương thức này hoạt động và khác nhau như thế nào
<br>
### map
- Tạo ra một mảng mới với kết quả được xử lý trong hàm cho mỗi phần phần tử mảng
- Không thực thi hàm cho các phần tử mảng không có giá trị
- Phương thức này không thay đổi mảng ban đầu
```javascript
const arr = [1, 2, 3];

const newArr = arr.map(el => el * 2);

console.log(newArr);
// output: [2, 4, 6]
```
### filter
- Tạo ra một mảng chứa đầy tất cả các phần tử mảng qua điều kiện kiểm tra được xử lý trong hàm
- Không thực thi hàm cho các phần tử mảng không có giá trị
- Phương thức này không thay đổi mảng ban đầu
```javascript
const arr = [1, 2, 3];

const filtered = arr.filter(el => el === 1 || el === 3);

console.log(filtered);

// [1, 3]
```
### reduce
- Giảm mảng thành một giá trị duy nhất.
- Thực thi một hàm được cung cấp cho mỗi giá trị của mảng (từ trái sang phải)
- Giá trị trả về của hàm được lưu trữ trong bộ tích lũy
- Không thực thi hàm cho các phần tử mảng không có giá trị
- Phương thức này không thay đổi mảng ban đầu
```javascript
const arr = [1, 2, 3];

const reduced = arr.reduce((total, current) => total + current);

console.log(reduced);
// output: 6
```
### find
- Trả về giá trị của phần tử đầu tiên trong một mảng qua điều kiện kiểm tra được xử lý trong hàm
- Nếu nó tìm thấy một phần tử mảng trong đó hàm trả về một giá trị đúng, `find ()` trả về giá trị của phần tử mảng đó (và không kiểm tra các giá trị còn lại). Nếu không, nó trả về không xác định
```javascript
const arr = [1, 2, 3, 4, 5, 6];

const found = arr.find(el => el > 3);

console.log(found);

// output: 4
```
### findIndex
- Trả về chỉ mục của phần tử đầu tiên trong một mảng  qua điều kiện kiểm tra được xử lý trong hàm
- Nếu nó tìm thấy một phần tử mảng trong đó hàm trả về một giá trị thực, `findIndex ()` trả về chỉ mục của phần tử mảng đó (và không kiểm tra các giá trị còn lại). Nếu không, nó trả về -1
```javascript
const arr = [1, 2, 3, 4, 2, 5, 2];

const foundIndex = arr.findIndex(el => el === 2);

console.log(foundIndex);
// output: 1
```
### indexOf
- Tìm kiếm mảng trong mảng theo điều kiện được chỉ định và trả về vị trí của nó.
- Tìm kiếm sẽ bắt đầu tại vị trí đã chỉ định hoặc ở đầu nếu không có vị trí bắt đầu nào được chỉ định và kết thúc tìm kiếm ở cuối mảng.
- Trả về -1 nếu không tìm thấy theo điều kiện. Nếu theo điều kiện item có mặt nhiều lần, phương thức `indexOf` trả về vị trí xuất hiện đầu tiên
```javascript
const arr = [1, 2, 3, 4, 2, 5, 2];

const foundIndex = arr.indexOf(2);

console.log(foundIndex);

// output: 1

const foundIndex2 = arr.indexOf(2, 2); // indexOf(giá trị muốn tìm, vị trí bắt đầu tìm)

console.log(foundIndex2);
//output: 4
```
### push
- Thêm phần tử mới vào cuối một mảng và trả về độ dài mới
```javascript
let arr = [0, 1, 2, 3, 4];

const pushed = arr.push(5);

console.log(arr);

// [0, 1, 2, 3, 4, 5]

console.log(pushed);

// 6
```
### pop
- Loại bỏ phần tử cuối cùng của một mảng và trả về phần tử đó.
```javascript
let arr = [0, 1, 2, 3, 4, 5];

const popped = arr.pop();

console.log(arr);

// [0, 1, 2, 3, 4]

console.log(popped);

// 5
```
### shift
- Loại bỏ phần tử đầu tiên của một mảng và trả về phần tử đầu tiên đó
```javascript
let arr = [0, 1, 2, 3, 4, 5];

const shifted = arr.shift();

console.log(arr);

// [1, 2, 3, 4, 5]

console.log(shifted);

// 0
```
### unshift
- Thêm các phần tử mới vào đầu một mảng và trả về độ dài mới.
```javascript
let arr = [0, 1, 2, 3, 4, 5];

const unshifted = arr.unshift(6, 7);

console.log(arr);

// [6, 7, 0, 1, 2, 3, 4, 5]

console.log(unshifted);

// 8
```
## Generators
- Generator là một object được trả về bởi một generator function, nó phù hợp với cả iterable protocol và iterator protocol.
- Generator function  là một function, có khả năng tạm ngưng thực thi trước khi hàm kết thúc, và có thể tiếp tục chạy ở 1 thời điểm khác. Giá trị của biến trong các lần gọi được lưu lại trong các lần gọi tiếp theo
- Phương thức:
    + Generator.prototype.next(): <br>
    Trả về giá trị yielded, được khai báo qua câu lệnh yield.
    + Generator.prototype.return(): <br>
    Trả về giá trị và kết thúc generator.
    + Generator.prototype.throw(): <br>
    Throw lỗi vào generator (đồng thời kết thúc generator, trừ khi được bắt lại trong generator đó).
```javascript
function* generator() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = generator();
console.log(gen.next().value);
// 1
console.log(gen.next().value);
// 2
console.log(gen.next().value);
// 3
console.log(gen.next().value);
// undefined
```
##  Identity Operator (===) vs Equality Operator (==)
Toán tử == sẽ thực hiện chuyển đổi kiểu dữ liệu trước khi so sánh các giá trị trong khi toán tử === sẽ không thực hiện bất kỳ chuyển đổi loại nào trước khi so sánh
```javascript
console.log(0 == '0');
// true

console.log(0 === '0');
// false
```
## Callback Functions
 - Là một function được truyền vào một function khác dưới dạng tham số, và được gọi trong function đó.
```javascript
function hello(name) {
  console.log('Hello ' + name);
}

function call(callback) {
  callback('Huynh');
}

call(hello);
// output Hello Huynh
```
## Tài liệu tham khảo
https://developer.mozilla.org/
## Kết luận
Trong bài viết này mình đã giới thiệu tới các bạn một số khái niệm có thể giúp bạn tăng khả năng JavaScript của mình. Cảm ơn các bạn đã theo dõi bài viết <3