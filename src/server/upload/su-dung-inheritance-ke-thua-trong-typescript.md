Một **class** có thể tái sử dụng các thuộc tính và phương thức của class khác. Cái này gọi là sự **inheritance** (kế thừa) trong TypeScript.<br> 
Cái class kế thừa các thuộc tính và phương thức được gọi là **child class**( lớp con). Và class có các thuộc tính và phương thức được kế thừa được gọi là **parent class**( lớp cha).<br>
Inheritance cho phép bạn tái sử dụng lại chức năng của một class hiện có mà không cần viết lại nó.TypeScript cũng hỗ trợ kế thừa như ES6.<br> 
Ví dụ:<br> 
```TypeScript
class Person {
    constructor(private firstName: string, private lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    describe(): string {
        return `This is ${this.firstName} ${this.lastName}.`;
    }
}

```

Để sử dụng kế thừa, bạn sử dụng từ khóa **extends** . Ví dụ, chung ta có lớp **Employee**  kế thừa lớp **Person** như sau:<br>
```TypeScript
class Employee extends Person {
    //..
}
```

Trong ví dụ này, lớp **Employee** là một class con và lớp **Person** là class cha.<br>

**Constructor**<br>
Vì lớp **Person** có một constructor khởi tạo các thuộc tính **firstName** và **lastName**, do đó, bạn cần khởi tạo các thuộc tính này trong constructor của lớp **Employee** bằng cách gọi constructor của lớp cha.<br>
Để gọi constructor của lớp cha trong constructor của lớp con, bạn sử dụng cú pháp **super()**, ví dụ:<br>
```TypeScript
class Employee extends Person {
    constructor(
        firstName: string,
        lastName: string,
        private jobTitle: string) {
        
        // call the constructor of the Person class:
        super(firstName, lastName);
    }
}
```
Bây giờ mình sử dụng lớp **Employee** với code sau:<br>
```TypeScript
let employee = new Employee('John','Doe','Front-end Developer');
```
Vì lớp **Employee**  kế thừa các thuộc tính và phương thức của ớp **Person**, do đó, bạn có thể gọi các phương thức **getFullName()** và **describe()** trên đối tượng **Employee** như sau:<br>
```TypeScript
let employee = new Employee('John', 'Doe', 'Web Developer');

console.log(employee.getFullName());
console.log(employee.describe());

```
Output:<br>
```TypeScript
John Doe
This is John Doe.
```
**Method overriding**<br>
Khi bạn gọi phương thức **employee.describe(**) trên đối tượng **Employee**, phương thức **describe()** của lớp **Person** được thực thi để hiển thị thông báo: **This is John Doe** <br>
Nếu bạn muốn lớp **Employee** có một thay đổi riêng của phương thức **describe()** , bạn có thể định nghĩa nó trong lớp **Employee** như bên dưới: <br>
```TypeScript
class Employee extends Person {
    constructor(
        firstName: string,
        lastName: string,
        private jobTitle: string) {

        super(firstName, lastName);
    }

    describe(): string {
        return super.describe() + `I'm a ${this.jobTitle}.`;
    }
}
```
Trong phương thức **describe()** , chúng ta gọi phương thức **describe()**  của lớp cha sử dụng cú pháp: **super.methodInParentClass()**. <br>
Nếu bạn gọi phương thức **describe()** trên đối tương **Employee**,  phương thức **describe()** trong lớp **Employee** sẽ được gọi:<br>
```TypeScript
let employee = new Employee('John', 'Doe', 'Web Developer');
console.log(employee.describe());
```
Output:<br>
```TypeScript
This is John Doe.I'm a Web Developer.
```

Tóm tăt:<br>
- Sử dụng từ khóa **extends**  để cho phép một lớp kế thừa từ một lớp khác
- Sử dụng **super()** trong constructor  của lớp con để gọi constructor  của lớp cha. Bạn cũng có thể sử dụng cú pháp **super.methodInParentClass()** để gọi **methodInParentClass()** trong phương thức của class con.