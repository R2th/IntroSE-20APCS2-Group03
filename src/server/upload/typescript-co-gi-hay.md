Typescript là ngôn ngữ lập trình do Microsoft sáng lập năm 2012, nó sẽ được biên dịch sang ngôn ngữ javascript và có thể thực thi trên bất cứ browser và hệ điều hành. Lợi ích lớn nhất của typescript đó là kiểm tra dữ liệu đầu vào, dữ liệu truyền sai thì sẽ không thể convert sang javascript được, không giống như javascript truyền kiểu dữ liệu nào cũng được. Typescript hoàn toàn hướng đối tượng như c# và java, mọi người có thể tiếp cận typescript nhanh hơn nếu như có nền tảng java và c#, file typescript có đuôi .ts nhé.
![](https://images.viblo.asia/27fead7e-2cd4-4089-ad43-6da293f18cec.png)
- JavaScript của bạn là TypeScript. Typescript luôn hỗ trợ javascript mới nhất.
cú pháp:
```
let message:string = "Welcome to Typescript!"
console.log(message)
```
convert sang javascript như sau:
```
var message = "Welcome to Typescript!";
console.log(message);
```
### Tính năng của typescript
![](https://images.viblo.asia/6024b7b8-74d8-42ff-a6b3-b537a9840054.png)
- Cross-Platform: TypeScript có thể được cài đặt trên mọi hệ điều hành như Windows, MacOS và Linux.
- Object-Oriented Language: TypeScript cung cấp các tình năng giống classes, interfaces, andmodules.
- Type: hỗ trợ kiểu dữ liệu
- ES 6 Features: hỗ trợ đầy đủ các tính năng của es6
- DOM: TypeScript có thể  add or remove elements.
### TypeScript Types
![](https://images.viblo.asia/9bdb46bb-bd7b-4393-a046-93f29124c805.png)
Built-in: number, string, boolean, void, null và undefined.
User-defined: enum, classes, interfaces, arrays, và tuple.
cú pháp:
```
var [identifier] : [type-annotation] = value;
```
ex:
```
let name:string = "my name is typescript";
```
### Operators
Cũng giống các ngôn ngữ khác typescript cũng hỗ trợ các toán tử như: Arithmetic operators, Logical operators, Relational operators, Bitwise operators, Assignment operators.
### TypeScript Interfaces
Interface giống như trong java vậy, nó  cho phép bạn định nghĩ thuộc tính là gì và phương thức là gì mà đối tượng cần để được thực thi (implement).
```
interface Employee {
empID: number;
empName: string;
getSalary: (number) => number;
getManagerName(number): string;
}
```
### TypeScript Classes
TypeScript đã giới thiệu class để chúng có thể tận dụng lợi ích của các kỹ thuật hướng đối tượng như đóng gói và trừu tượng hóa.
class bao gồm:
- Constructor
- Properties
- Methods
```
class Employee {
    empID: number;
    empName: string;
 
    constructor(ID: number, name: string) {
        this.empName = name;
        this.empID = ID;
    }
 
    getSalary() : number {
        return 40000;
    }
}
```
### Inheritance
Typescript hỗ trợ tính kế thừa một trong nhưng điều mạnh mẽ nhất của hướng đối tượng, nó cũng sử dụng từ khóa extend để kế thừa( giống với java). 
Cú pháp:
```
class child_class_name extends parent_class_name
```
ex:
```
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}
 
class Employee extends Person {
    empID: number;

    constructor(empID: number, name:string) {
        super(name);
        this.empID = empid;
    }

    displayName():void {
        console.log("Name = " + this.name + ", Employee ID = " + this.empID);
    }
}
 
let emp = new Employee(701, "Jason");
emp.displayName(); // Name =Jason, Employee ID = 701
```
That's all.:full_moon_with_face::full_moon_with_face::full_moon_with_face: