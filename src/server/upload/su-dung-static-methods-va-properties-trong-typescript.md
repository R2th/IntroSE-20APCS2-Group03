**Static properties (thuộc tính tĩnh)**<br>
Một thuộc tính tĩnh được truy cập bởi trực tiếp từ tên class mà không phải khởi tạo đối tượng từ class đó.<br>
Để khai báo một thuộc tính tĩnh, bạn sử dụng từ khóa **static** . Để truy cập một thuộc tính tĩnh, bạn sử dụng cú pháp: **className.propertyName** , ví dụ:<br>
```TypeScript
class Employee {
    static headcount: number = 0;

    constructor(
        private firstName: string,
        private lastName: string,
        private jobTitle: string) {

        Employee.headcount++;
    }
}
```

Trong ví dụ trên, **headcount** là một thuộc tính tĩnh và được khởi tạo giá trị ban đầu là 0. Giá trị của nó được tăng lên 1 bất cứ khi nào một đối tượng mới được tạo, ví dụ. <br>
```TypeScript
let john = new Employee('John', 'Doe', 'Front-end Developer');
let jane = new Employee('Jane', 'Doe', 'Back-end Developer');

console.log(Employee.headcount); // 2

```

**Static methods (phương thức tĩnh)**<br>
Giống như thuộc tính tĩnh , một phương thức tĩnh cũng được truy cập trực tiếp từ tên class mà không cần phải khởi tạo đối tượng. Để khai báo một  phương thức tĩnh, bạn sử dụng từ khóa **static** trước tên phương thức, ví dụ: <br>
```TypeScript
class Employee {
    private static headcount: number = 0;

    constructor(
        private firstName: string,
        private lastName: string,
        private jobTitle: string) {

        Employee.headcount++;
    }

    public static getHeadcount() {
        return Employee.headcount;
    }
}
```

Để gọi một phương thức tĩnh, bạn sử dụng cú pháp: **className.staticMethod()** , ví dụ:<br>
```TypeScript
let john = new Employee('John', 'Doe', 'Front-end Developer');
let jane = new Employee('Jane', 'Doe', 'Back-end Developer');

console.log(Employee.getHeadcount); // 2

```

Tóm tăt:<br>
- Các thuộc tính và phương thức tĩnh thì có thể truy cập trực tiếp từ className.
- Sử dụng từ khóa **static** trước một thuộc tính hoặc phương thức để làm cho nó trở nên tĩnh.