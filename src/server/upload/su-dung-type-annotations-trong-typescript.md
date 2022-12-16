### Type Annotation là gì?
TypeScript sử dụng **type annotations**(chú thích kiểu dữ liệu)  để chỉ định rõ ràng các kiểu dữ liệu cho các định danh như variables, function, objects, etc.<br>
TypeScript sử dụng cú pháp **: type** sau một định danh để làm type annotations, và  **type** có thể là bất kỳ loại dữ liệu hợp lệ nào.<br>
Một định danh được chú thích với một loại dữ liệu, nó chỉ có thể sử dụng loại dữ liệu đó. Nếu định danh sử dụng một loại khác, trình biên dịch sẽ thông báo lỗi.<br>
### Type annotations với variables và constants
Bên dưới là cú pháp hiển thị type annotations cho  variables và constants:<br>
```TypeScript
let variableName: type;
let variableName: type = value;
const constantName: type = value;
```
Trong cú pháp này, type annotation đứng sau tên biến hoặc hằng số và đứng trước dấu hai chấm ( : ) <br>
Ví dụ sử dụng **number** annotation cho biến:<br>
```TypeScript
let counter: number;
```
Sau đó, bạn có thể gán một số đến biến counter:<br>
```TypeScript
counter = 1;
```
Nếu bạn gán một string đến biến counter, bạn sẽ nhận một thông báo lỗi:<br>
```TypeScript
let counter: number;
counter = 'Hello'; // compile error 
```
Error:<br>
```TypeScript
Type 'string' is not assignable to type 'number'.
```
Bạn có thể vừa sử dụng một type annotation cho một biến và vừa khởi tạo một giá trị cho biến đó như sau:<br>
```TypeScript
let counter: number = 1;
```
Các ví dụ khác về primitive type annotations(chú thích kiểu nguyên thủy):<br>
```TypeScript
let name: string = 'John';
let age: number = 25;
let active: boolean = true;
```
Trong ví dụ này, biến name có kiểu string, biến age có kiểu number, và biến active có kiểu boolean.<br>

### Các ví dụ về Type annotation
**Arrays**<br>
Để chú thích loại mảng, chúng tả sử dụng một ngoặc vuông : type[]
```TypeScript
let arrayName: type[];
```
Ví dụ, phần sau khai báo một mảng các chuỗi:<br>
```TypeScript
let names: string[] = ['John', 'Jane', 'Peter', 'David', 'Mary'];
```
**Objects**<br>
Để chỉ định kiểu cho một đối tượng, bạn sử dụng chú thích kiểu đối tượng. Ví dụ:<br>
```TypeScript
let person: {
   name: string;
   age: number
};

person = {
   name: 'John',
   age: 25
}; // valid
```
Trong ví dụ trên, đối tượng person chỉ chấp nhận một đối tượng có 2 thuộc tính name có kiểu string và age có kiểu là number.<br>
### Function arguments & return types
Bên dưới là một hàm chú thích với parameter type annotation và trả về type annotation:<br>
```TypeScript
let greeting : (name: string) => string;
```
Trong ví dụ này, bạn có thể gán bất kỳ hàm nào chấp nhận một chuỗi và trả về một chuỗi cho biến greeting :
```TypeScript
greeting = function (name: string) {
    return `Hi ${name}`;
};
```
Điều sau đây gây ra lỗi vì hàm được gán cho biến greeting  không khớp với loại hàm của nó.
```TypeScript
greeting = function () {
    console.log('Hello');
};
```
Error:<br>
```TypeScript
Type '() => void' is not assignable to type '(name: string) => string'. Type 'void' is not assignable to type 'string'.
```

Kiến thức cần nhớ:<br>
Sử dụng type annotations với cú pháp **: [type]** để chỉ định một loại đặc biệt cho một variable, function, function return value, etc.