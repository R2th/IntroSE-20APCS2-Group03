Một abstract class(lớp trừu tượng) là một lớp cơ sở, thường được sử dụng để định nghĩa các hành vi chung cho các lớp dẫn xuất(lớp kế thừa). Không giống như lớp bình thường, một lớp abstract không thể được khởi tạo trực tiếp.<br>
Để khai báo một lớp abstract, bạn sử dụng từ khóa **abstract** :<br>
```TypeScript
abstract class Employee {
    //...
}

```
Thông thường, một lớp abstract chứa một hoặc nhiều phương thức abstract .<br>
Một phương thức của lớp abstract không chứa các thực thi code bên trong. Nó chỉ định nghĩa tên của phương thức mà không thực thi gì. Các thực thi của phương thức abstract sẽ được thực hiện bên trong lớp dẫn xuất.<br>
Ví dụ hiển thị lớp abstract là **Employee**  cái có phương thức  abstract là **getSalary()**.<br>
```TypeScript
abstract class Employee {
    constructor(private firstName: string, private lastName: string) {
    }
    abstract getSalary(): number
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    compensationStatement(): string {
        return `${this.fullName} makes ${this.getSalary()} a month.`;
    }
}
```
Giải thích lớp **Employee**  <br>
- Constructor khai báo các thuộc tính **firstName** và **lastName**.
- Phương thức **getSalary()** là một phương thức abstract. Lớp dẫn xuất sẽ thực thi logic dựa trên loại của employee.
- Phương thức **getFullName()** và **compensationStatement()** chứa chi tiết các thực thi. Lưu ý rằng phương thức **compensationStatement ()** gọi phương thức **getSalary()**.

Vì lớp **Employee**  là một abstract, bạn không thể khởi tạo một new object từ nó. Câu lệnh sau đây gây ra lỗi:<br>
```TypeScript
let employee = new Employee('John','Doe');
```
Error:<br>
```TypeScript
error TS2511: Cannot create an instance of an abstract class.
```
Lớp **FullTimeEaffee** sau đây kế thừa từ lớp **Employee**:<br>
```TypeScript
class FullTimeEmployee extends Employee {
    constructor(firstName: string, lastName: string, private salary: number) {
        super(firstName, lastName);
    }
    getSalary(): number {
        return this.salary;
    }
}
```
Trong class **FullTimeEmployee** , salary  được đặt trong constructor.  Vì **getSalary()** là một phương thức trừu tượng của lớp **Employee**, dó đó bạn cũng cần tạo một phương thức getSalary() trong lớp **FullTimeEprisee** và  thực hiện logic trong phương thức này.Trong ví dụ này, nó chỉ trả về tiền lương mà không cần bất kỳ phép tính nào.<br>

Phần sau cho thấy class **Contractor**  cũng kế thừa từ lớp **Employee** :<br>
```TypeScript
class Contractor extends Employee {
    constructor(firstName: string, lastName: string, private rate: number, private hours: number) {
        super(firstName, lastName);
    }
    getSalary(): number {
        return this.rate * this.hours;
    }
}
```
Trong lớp **Contractor**, hàm khởi tạo khởi tạo rate(tỷ lệ) và hours(giờ). Phương thức **getSalary()** tính toán mức lương bằng cách nhân tỷ lệ với giờ.<br>
Tiếp tục tạo một đối tượng **FullTimeEaffee** và một đối tượng **Contractor**:<br>
```TypeScript
let john = new FullTimeEmployee('John', 'Doe', 12000);
let jane = new Contractor('Jane', 'Doe', 100, 160);

console.log(john.compensationStatement());
console.log(jane.compensationStatement());
```
Output:<br>
```
John Doe makes 12000 a month.
Jane Doe makes 16000 a month.
```

Tóm tắt:<br>
- Các lớp trừu tượng không thể được khởi tạo.
- Một lớp trừu tượng có ít nhất một phương thức trừu tượng.
- Để sử dụng một lớp trừu tượng, bạn cần kế thừa nó và cung cấp thực hiện các xử lý cho các phương thức trừu tượng