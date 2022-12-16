Trong JavaScript thì không có khái niệm class như các ngôn ngữ Java, C#. Nhưng trong phiên bản ES5 bạn có thể sử dụng một hàm khởi tạo và kế thừa nguyên mẫu để tạo một class.<br>
### Sử dụng class trong ES5
Ví dụ: <br>
```TypeScript
function Person(ssn, firstName, lastName) {
    this.ssn = ssn;
    this.firstName = firstName;
    this.lastName = lastName;
}
```
Bây giờ, bạn có thể định nghĩa một phương thức prototype  để lấy full name của person như bên dưới.<br>
```TypeScript
Person.prototype.getFullName = function () {
    return `${this.firstName} ${this.lastName}`;
}
```
Tiếp theo, bạn có thể sử dụng class Person bằng cách tạo một new object:<br>
```TypeScript
let person = new Person('171-28-0926','John','Doe');
console.log(person.getFullName());
```
Output:<br>
```
John Doe
```

### Sử dụng class trong ES6, ví dụ:<br>
```TypeScript
class Person {
    ssn;
    firstName;
    lastName;

    constructor(ssn, firstName, lastName) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
```
Trong class Person, hàm constructor được xác định rõ ràng và được đặt bên trong lớp. Phần sau sẽ thêm phương thức getFullName():<br>
```TypeScript
class Person {
    ssn;
    firstName;
    lastName;

    constructor(ssn, firstName, lastName) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
```
Sử dụng lớp Person cũng giống như hàm khởi tạo Person:<br>
```TypeScript
let person = new Person('171-28-0926','John','Doe');
console.log(person.getFullName());
```

### Sử dụng class trong TypeScript
Class trong TypeScript sẽ thêm type annotations(chú thích kiểu) đến các thuộc tính và phương thức trong class. Ví dụ:<br>
```TypeScript
class Person {
    ssn: string;
    firstName: string;
    lastName: string;

    constructor(ssn: string, firstName: string, lastName: string) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
```
Khi thêm chú thích kiểu cho các thuộc tính, constructor, phương thức, Trình biên dịch TypeScript sẽ thực hiện các kiểm tra kiểu tương ứng.<br>
Ví dụ, bạn không thể khởi tạo **ssn** với một **number**. Code bên dưới sẽ hiển thị lỗi:<br>
```TypeScript
let person = new Person(171280926, 'John', 'Doe');
```

Tóm tắt:<br>
- Sử dụng từ khóa **class** để định nghĩa một class trong TypeScript.
- TypeScript tận dùng cú pháp của lớp ES6 và thêm các chú thích kiểu để làm cho lớp chặt chẽ hơn.