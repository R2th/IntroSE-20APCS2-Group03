Access modifiers có nhiệm vụ thay đổi quyền truy cập các thuộc tính và phương thức trong **class**. TypeScript  cung cấp 3 mức truy cập là:<br>
- private
- protected
- public

Chú ý: TypeScript sẽ kiểm soát truy cập trong thời gian biên dịch chứ không phải trong thời gian chạy.<br>

### Sử dụng private
Mức truy cập private chỉ giới hạn khả năng hiển thị trong cùng một class. Khi thêm thêm **private** đến các thuộc tính hoặc phương thức, thì bạn có thể truy cập các thuộc tính hoặc phương thức đó bên trong class đó mà thôi. Bất kỳ các truy cập thuộc tính hay phương thức có kiểu là **private** mà nằm bên ngoài class đó ,thì sẽ trả về lỗi ở thời điểm biên dịch code.<br>
Ví dụ:<br>
```TypeScript
class Person {
    private ssn: string;
    private firstName: string;
    private lastName: string;
    // ...
}
```

Khi thuộc tính **private** được sử dụng, bạn có thể truy cập thuộc tính **ssn** bên trong constructor hoặc phương thức của class **Person**. Ví dụ:<br>
```TypeScript
class Person {
    private ssn: string;
    private firstName: string;
    private lastName: string;

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
Nếu bạn truy cập thuộc tính **ssn** bên ngoài class:<br>
```TypeScript
let person = new Person('153-07-3130', 'John', 'Doe');
console.log(person.ssn); // compile error : error TS2341: Property 'ssn' is private and only accessible within class 'Person'.
```

### Sử dụng public
Mức truy cập public phép các thuộc tính và phương thức được truy cập từ tất cả các vị trí. Nếu bạn không chỉ định bất kỳ mức truy cập nào cho các thuộc tính và phương thức, mặc định chúng sẽ có kiểu là **public**.<br>
Ví dụ:<br>
```TypeScript
class Person {
    // ...
    public getFullName(): string {
        return `${this.firstName} ${this.lastName}`; 
    }
    // ...
}
```
Nó có tác dụng tương tự như khi từ khóa **public** bị bỏ qua.<br>

### Sử dụng protected
Mức truy cập protected cho phép các thuộc tính và phương thức của một class được truy cập bên trong class đó và bên trong các subclass.<br>
Khi một class(class con) kế thừa từ class khác( class cha), thì nó được gọi là subclass của class cha.<br>
Trình biên dịch sẽ hiển thị lỗi nếu bạn truy cập thuộc tính hoặc phương thức có kiểu là protected từ bất kỳ nơi nào khác.<br>
ví dụ:<br>
```TypeScript
class Person {

    protected ssn: string;
    
    // other code
}

```
Thuộc tính **ssn** có kiểu protected. Nó có thể được truy cập trong lớp **Person** và trong bất kỳ lớp nào kế thừa từ lớp **Person**.<br>
Khi bạn xem xét khả năng hiển thị của các thuộc tính và phương thức, bạn nên sử dụng kiểu **private**.<br>

**Tóm tắt**:<br>
- TypeScript cung cấp 3 mức truy cập đến các thuộc tính và phương thức trong class: **private**, **protected**, và **public**.
- **private** chỉ cho phép truy cập bên trong class đó
- **protected** chỉ cho phép truy cập bên trong class đó và bên trong class kế thừa(class con)
- **public** cho phép truy cập ở bất kỳ vị trị nào