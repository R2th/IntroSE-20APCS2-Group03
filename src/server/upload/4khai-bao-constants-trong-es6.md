### Giới thiệu về từ khóa const trong JavaScript
ES6 cung cấp một cách để khai báo một constant bằng việc sử dụng kerword const. Keyword const tạo một tham chiếu chỉ đọc cho một giá trị.<br>
```php
const CONSTANT_NAME = value;
```
Theo quy ước thì các constants sẽ được viết hoa và cách nhau giữa các từ bởi dấu gạch chân.<br>
Giống như keyword let, keyword const khai báo biến kiểu blocked-scope. Tuy nhiên, biến blocked-scope khi khai báo bằng const thì không thể gán lại giá trị.<br>
Khai báo biến sử dụng keyword let thì bạn có thể thay đổi giá trị của chúng bất kỳ lúc nào bạn muốn như ví dụ sau:
```php
let a = 10;
a = 20;
a = a + 5;
console.log(a); // 25
```
Tuy nhiên, biến sử dụng keyword const thì không thể thay đổi giá trị. Có nghĩa là bạn không thể gán lại giá trị cho chúng một giá trị khác.<br>
```php
const RATE = 0.1;
RATE = 0.2; // TypeError
```
Khi khai báo biến sử dụng keyword const bạn bắt buộc phải khởi tạo giá trị ban đầu cho chúng,nếu không nó sẽ hiển thị lỗi<br>
```php
const RED; // SyntaxError
```
### JavaScript const and Objects
Keyword const đảm bảo rằng giá trị của nó chỉ có thể ở trạng thái read-only.Tuy nhiên chúng ta có thể thay đổi giá trị thuộc tính của chúng trong Object như ví dụ bên dưới.<br>
```php
const PERSON = {age: 35};
PERSON.age = 40 //OK
console.log(PERSON); //OK
```
Tuy nhiên bạn không thể gán lại giá trị cho biến PERSON nhé.<br>
```php
const PERSON = {age: 35};
PERSON = {age: 40} // TypeError
```
Trong trường hợp bạn muốn không cho phép thay đổi giá trị thuộc tính trong biến PERSON thì bạn phải sử dụng method Object.freeze().<br>
```php
const PERSON = Object.freeze({age: 35});
PERSON.age = 40 // TypeError
console.log(PERSON); // Output 35
```
Ví dụ, khai báo biến company với từ khóa constant và sử dụng Object.freeze() <br>
```php
const company = Object.freeze({
    name: 'ABC corp',
    address: {
        street: 'North 1st street',
        city: 'San Jose',
        state: 'CA',
        zipcode: 95134
    }
});
```
Nhưng object company.address có thể thay đổi được, bạn có thể thêm mới hoặc cập nhật một thuộc tính vào object company.address như bên dưới.<br>
```php
company.address.country = 'USA'; // OK
company.address.street = 'North 1st street 123'; // OK
```
### JavaScript const and Arrays
Hãy theo dõi ví dụ bên dưới<br>
```php
const colors = ['red'];
colors.push('green');
console.log(colors); // ["red", "green"]

colors.pop();
colors.pop();
console.log(colors); // []

colors = []; // TypeError
```
Ví dụ trên mình khai báo array colors  sử dụng từ khóa constant và bạn có thể thêm 1 thành phần vào mảng đó. Những bạn không thể gán lại array colors bằng một giá trị khác.<br>
### JavaScript const in a for loop
ES6 cung cấp một cấu trúc mới được gọi là for......of cho phép bạn tạo một vòng lặp lặp qua các đối tượng có thể lặp lại như  arrays, maps,.<br>
```php
let scores = [75, 80, 95];

for (let score of scores) {
	console.log(score);
}
```
Nếu bạn không có ý định sửa đổi biến score bên trong vòng lặp, bạn có thể sử dụng từ khóa const để thay thế:<br>
```php
let scores = [75, 80, 95];
for (const score of scores) {
    console.log(score);
}
```
Trong ví dụ này, for ... of tạo ra một ràng buộc mới cho từ khóa const trong mỗi lần lặp vòng lặp. Nói cách khác, một const score mới được tạo ra trong mỗi lần lặp.<br>
Lưu ý rằng const sẽ không hoạt động trong vòng lặp for bắt buộc.<br>
```php
for (const i = 0; i < scores.length; i++) { // TypeError
    console.log(scores[i]);
}
```
### Summary
* Từ khóa const tạo một tham chiếu chỉ đọc cho một giá trị. Tham chiếu chỉ đọc không thể gán lại giá trị nhưng giá trị có thể thay đổi.<br>
* Các biến khai báo sử dụng từ khóa const thuộc kiểu blocked-scope và không thể khai báo lại.<br>