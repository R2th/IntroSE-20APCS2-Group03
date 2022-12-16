Giống như JavaScript, bạn sử dụng từ khóa **function** để khai báo một function trong TypeScript:<br>
```go:TypeScript
function name(parameter: type, parameter:type,...): returnType {
   // do something
}
```
Không giống như JavaScript, TypeScript cho phép bạn sử dụng các loại chú thích cho các tham số và kiểu giá trị trả về của hàm.ví dụ:<br>
```javascript:TypeScript
function add(a: number, b: number): number {
    return a + b;
}
```
Hàm **add()** chấp nhận 2 tham số với loại chú thích là kiểu **number**.<br>
Khi bạn gọi hàm **add()**, trình biên dịch TypeScript sẽ kiểm trả từng đối số được truyền vào hàm để đảm bảo rằng chúng là những giá trị số.<br>
Trong ví dụ về hàm **add()**, bạn chỉ có thể truyền các số vào nó, không thể chuyển các giá trị của các kiểu khác.<br>
Nếu bạn truyền vào 2 đối số là các strings vào hàm **add()**,  nó sẽ trả về lỗi:<br>
```rust:TypeScript
let sum = add('10', '20');
```
Error:<br>
```sql:TypeScript
error TS2345: Argument of type '"10"' is not assignable to parameter of type 'number'
```
**: number** sau dấu ngoặc đơn là loại trả về của hàm. Hàm **add()** trả về một giá trị loại number.<br>
Khi một hàm có kiểu trả về, trình biên dịch TypeScript sẽ kiểm tra mọi câu lệnh trả về so với kiểu trả về để đảm bảo rằng giá trị trả về tương thích với nó.<br>
Nếu một hàm không trả về giá trị, bạn có thể sử dụng kiểu **void** làm kiểu trả về. Từ khóa **void** cho biết rằng hàm không trả về bất kỳ giá trị nào. Ví dụ:<br>
```css:TypeScript
function echo(message: string): void {
    console.log(message.toUpperCase());
}
```
Khi bạn không chú thích kiểu trả về, TypeScript sẽ cố gắng suy ra một kiểu thích hợp. Ví dụ:<br>
```javascript:TypeScript
function add(a: number, b: number) {
    return a + b;
}
```
Trong ví dụ này, trình biên dịch TypeScript cố gắng suy ra kiểu trả về của hàm **add ()** thành kiểu số, cái được mong đợi.<br>
Tuy nhiên, nếu một hàm có các nhánh khác nhau trả về các kiểu khác nhau, thì trình biên dịch TypeScript có thể suy ra kiểu **union** hoặc kiểu **any**.<br>
Do đó, điều quan trọng là phải thêm chú thích kiểu vào một hàm càng nhiều càng tốt..<br>

Ví dụ về một số loại khai báo hàm và sử dụng **arrow function** :<br>
```javascript:TypeScript
function add(x: number, y: number): number {
    return x + y;
}

let add2 = function (x: number, y: number): number {
    return x + y;
};
console.log(add(10, 20)); //output 30
console.log(add2(10, 20)); //output 30

//Sử dụng với arrow function(mũi tên (=>) xuất hiện giữa các tham số và kiểu trả về.)
let add3 = (x: number, y: number) : number => { return x + y; }

let add4 = (x: number, y: number) => { return x + y; }

let add5 = (x: number, y: number) => x + y; 

let add6: (a: number, b: number) => number =
    function (x: number, y: number) {
        return x + y;
    };

console.log(add3(10, 20)); //output 30
console.log(add4(10, 20)); //output 30
console.log(add5(10, 20)); //output 30
console.log(add6(10, 20)); //output 30
```