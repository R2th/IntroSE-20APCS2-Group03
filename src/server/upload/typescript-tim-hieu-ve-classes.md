![](https://images.viblo.asia/675e5c02-b36d-474c-8ddf-20be4f421d5a.png)

`TypeScript` là một ngôn ngữ mã nguồn mở miễn phí hiện đang được phát triển và bảo trì bởi Microsoft. Nó là `superset` của JavaScript, với các bổ sung các tuỳ chọn kiểu tĩnh và lớp trên cơ sở lập trình hướng đối tượng cho ngôn ngữ này. Vì TypeScript là tập cha của JavaScript nên bất kì chương trình JavaScript nào đã có cũng đều là chương trình TypeScript hợp lệ. Trong bài viết này, ta hãy cùng đi tìm hiểu về Classes trong TypeScript để thấy được tính `super` của nó so với JavaScript nhé.
# 1. Giới thiệu
`TypeScript` , giống như ES6, hỗ trợ lập trình hướng đối tượng bằng cách sử dụng các lớp. Điều này trái ngược với các phiên bản JavaScript cũ hơn, vốn chỉ hỗ trợ chuỗi kế thừa dựa trên nguyên mẫu (*prototype*). Hỗ trợ về class trong TypeScript tương tự như trong các ngôn ngữ Java hay C#, mà trong đó, các lớp có thể kế thừa từ các lớp khác, trong khi các đối tượng được khởi tạo dưới dạng thể hiện của lớp.

Lớp trong TypeScript được khai báo thêm các chú thích kiểu dữ liệu vào các thuộc tính và phương thức của lớp. Ví dụ sau đây là khai báo cho class `Car` trong TypeScript
```typescript
class Car {
  name: string;
  brand: string;
  price: number;
 
  constructor(name: string, brand: string, price: number) {
    this.name = name;
    this.brand = brand;
    this.price = price;
  }
 
  getCarInfo(): string {
    return `${this.name} ${this.brand} cost ${this.price}`;
  }
}
```

Khi bạn chú thích kiểu dữ liệu cho thuộc tính, hàm khởi tạo (constructor) và phương thức, trình biên dịch TypeScript sẽ thực hiện các **kiểm tra kiểu dữ liệu** tương ứng.
# 2. Access Modifier
Chỉ thị truy cập (*access modifier*) thay đổi **khả năng truy cập** của các thuộc tính và phương thức của một lớp (class). TypeScript cung cấp cho chúng ta `4` từ khóa access modifier

* `public`
* `private`
* `protected`
* `readonly`

Để hiểu rõ hơn, cùng xét một ví dụ sau đây:

```typescript
class Car {
  private name: string;
  protected brand: string;
  readonly price: number;
 
  constructor(name: string, brand: string, price: number) {
    this.name = name;
    this.brand = brand;
    this.price = price;
  }
 
  public getCarInfo(): string {
    return `${this.name} ${this.brand} cost ${this.price}`;
  }
}
```

### Public
Với public , bạn có thể thoải mái gọi thuộc tính (property) hay phương thức (method) từ bất cứ đâu, trong hay ngoài class đều được. 
> Nếu một thuộc tính hoặc phương thức `không được modifier` thì mặc định sẽ là `public`

Ở ví dụ trên, phương thức `getInfo()` là **public** nên bạn hoàn toàn có thể truy cập được vào nó từ bên ngoài class
```typescript
let car = new Car("E450", "Mercedes", 50000);

console.log(car.getInfo());
// E450 Mercedes cost 50000
```
### Private
Ngược lại với public, với private thì bạn chỉ có thể truy cập từ bên trong class đó
Thuộc tính `name` của class `Car` được modifier là private, nên khi ta truy cập từ bên ngoài sẽ báo lỗi như hình dưới đây:
![](https://images.viblo.asia/35e30638-0dbd-429a-b247-631f8dc1f9a1.jpg)

### Protected
Với protected, nó chỉ cho phép truy cập từ bên trong cùng một lớp (giống private) và trong các lớp con kế thừa của nó

Thuộc tính `brand` là protected nên chỉ có thể truy cập từ lớp kế thừa của nó. Ta có thể làm như sau:
```typescript
class MyCar extends Car {
    getMyCar(): string {
        return this.brand;
    }
}

let myCar = new MyCar("I8", "BMW", 45000);

console.log(myCar.getMyCar());
// BMW
```

### Readonly
Ngoài ra, trong TypeScript, bạn còn có thêm một modifier mới là `readonly`. Khi một thuộc tính có thêm readonly, có nghĩa là thuộc tính này chỉ có thể lấy được giá trị của chúng mà **không thể thay đổi giá trị**.
Lưu ý là ta cần **phải gán giá trị** cho thuộc tính có modifier là readonly thì mới khởi tạo nó hoặc gán nó cho hàm constructor, hoặc không nó sẽ báo lỗi

Trong ví dụ trên, thuộc tính `price` được modifier là readonly. Chính vì vậy, ta chỉ có thể lấy giá trị ra mà không thể thay đổi giá trị của nó
![](https://images.viblo.asia/88ce61c8-de3c-4e1a-ac41-85835a63b77f.jpg)


# 3. Getter & Setter
Đối với mỗi thuộc tính:
* `Phương thức getter` trả về giá trị của thuộc tính. Một getter còn được gọi là một **accessor**
* `Phương thức setter` cập nhật giá trị của thuộc tính. Một setter còn được gọi là một **mutator**

Phương thức getter bắt đầu với từ khóa `get` và phương thức setter bắt đầu với từ khóa `set`

**Cách triển khai getter và setter:**
1. Trước hết, cập nhật chỉ thị truy cập (*access modifier*) cho các thuộc tính (properties) từ `public` thành `private`
2. Sau đó, thay đổi tên của thuộc tính từ dạng `nameProperty` sang thành dạng  `_nameProperty`
3. Cuối cùng, tạo phương thức `getter` và `setter` cho thuộc tính

Để hiểu rõ hơn, hãy cùng mình làm thử một ví dụ dưới đây nhé: 

Ta tạo một lớp `Person` đơn giản với 3 thuộc tính: `age`, `firstName` và `lastName`
```typescript
class Person {
  public age: number;
  public firstName: string;
  public lastName: string;
```
Ở đây, thuộc tính `age` hoàn toàn có thể được truy cập từ bên ngoài. Giả sử ta muốn kiểm soát tính hợp lệ đầu vào do người dùng nhập để gán cho thuộc tính `age`. Ta có thể kiểm tra trước khi gán như sau:
```typescript
if(inputAge > 0 && inputAge <= 200) {
    // Thực hiện gán giá trị cho thuộc tính age
}
```

Nhưng, nếu sử dụng đoạn mã này để kiểm tra ở khắp mọi nơi thì rất dư thừa và sẽ rất khó đọc, khó quản lý code. Đây chính là lúc sử dụng sự tối ưu của setter và getter. Ta sẽ có đoạn mã sử dụng `getter` và `setter` cho cả 3 thuộc tính `age`, `firstName` và `lastName`:
```typescript
class Person {
  private _age: number;
  private _firstName: string;
  private _lastName: string;
 
  public get age() {
    return this._age;
  }
 
  public set age(theAge: number) {
    if (theAge <= 0 || theAge >= 200) {
      throw new Error("The age is invalid");
    }
    this._age = theAge;
  }
 
  public get firstName() {
    return this._firstName;
  }
 
  public set firstName(theFirstName: string) {
    if (!theFirstName) {
      throw new Error("Invalid first name.");
    }
    this._firstName = theFirstName;
  }
 
  public get lastName() {
    return this._lastName;
  }
 
  public set lastName(theLastName: string) {
    if (!theLastName) {
      throw new Error("Invalid last name.");
    }
    this._lastName = theLastName;
  }
 
  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

Lúc này, nếu ta muốn gán một giá trị không hợp lệ cho thuộc tính `age` thì sẽ lỗi ngay
```typescript
let person = new Person();
// person.age = 10;
person.age = 0; // Error: The age is invalid
```


# 4. Inheritance (Kế thừa) trong TypeScript
Một lớp có thể sử dụng lại các thuộc tính và phương thức của một lớp khác. Đây gọi là kế thừa (*Inheritance*)
Lớp kế thừa các thuộc tính và phương thức được gọi là lớp con. Và lớp có các thuộc tính và phương thức được kế thừa gọi là lớp cha.
Kế thừa cho phép ta sử dụng lại các thuộc tính và phương thức của một lớp hiện có mà không cần viết lại cho nó.
`JavaScript` hỗ trợ prototype inheritance, không phải dạng kế thừa cổ điển như Java hay C#. `ES6` cung cấp cú pháp class đơn giản là cú pháp kế thừa của prototype. `TypeScript` hỗ trợ kế thừa giống như `ES6`.
Để kể thừa một lớp, ta cũng sử dụng từ khóa quen thuộc là `extends`

```typescript
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

Lớp Employee kế thừa từ lớp Person
```typescript
class Employee extends Person {
  //..
}

let newEmployee = new Employee("Quynh", "Nhu");

console.log(newEmployee.getFullName()); // Quynh Nhu
```

Trong ví dụ trên, `Employee` là lớp con và `Person` là lớp cha

# 5. Constructor 
Vì lớp `Person` có một phương thức khởi tạo (*constructor*) có các thuộc tính `firstName` và `lastName`, ta có thể khởi tạo các thuộc tính này trong phương thức khởi tạo của lớp `Employee` bằng cách gọi phương thức khởi tạo lớp cha của nó
Để gọi hàm khởi tạo của lớp cha trong hàm khởi tạo của lớp con, ta sử dụng cú pháp `super()`
```typescript
class Employee extends Person {
  constructor(firstName: string, lastName: string, private jobTitle: string) {
    // call the constructor of the Person class:
    super(firstName, lastName);
  }
}
```

Đây là một thể hiện của lớp `Employee`
```typescript
let employee = new Employee("Tung", "Hoang", "NodeJSDev");
 
console.log(employee);
/* 
    Employee {
        firstName: 'Tung',
        lastName: 'Hoang',
        jobTitle: 'NodeJSDev'
    }
*/
console.log(employee.getFullName()); // Tung Hoang
console.log(employee.describe()); // This is Tung Hoang.
```

# 6. Method Overriding
Khi ta gọi phương thức `employee.describe()` trên đối tượng Employee, phương thức `describe()` của lớp `Person` sẽ được thực thi và hiển thị ra thông điệp theo cách mà ta đã định nghĩa trong lớp `Person`
Nhưng nếu ta muốn lớp `Employee` có một phiên bản riêng của nó cho phương thức `describe()`, ta có thể ghi đè phương thức (method overriding) trong lớp `Employee` như sau:

```javascript
class Employee extends Person {
  constructor(firstName: string, lastName: string, private jobTitle: string) {
    super(firstName, lastName);
  }
 
  describe(): string {
    return super.describe() + `I'm a ${this.jobTitle}.`;
  }
}
```
Trong phương thức `describe()`, ta sử dụng cú pháp `super.methodInParentClass()`
Lúc này, khi ta gọi phương thức describe() trên đối tượng employee thì phương thức describe() của riêng lớp Employee được gọi đến:
```typescript
let employee = new Employee("Tung", "Hoang", "NodeJSDev");
 
console.log(employee.describe()); // This is Tung Hoang. I'm a NodeJSDev.
```

# 7. Phương thức và thuộc tính static trong TypeScript
### Thuộc tính static
Không giống như thuộc tính thông thường, thuộc tính static được chia sẻ giữa tất cả các thể hiện của một lớp
Để khai báo thuộc tính tĩnh, ta sử dụng từ khóa `static`. Để truy cập thuộc tính tĩnh, ta sử dụng cú pháp `className.propertyName`

```typescript
class Employee {
  static headcount: number = 0;
 
  constructor(
    private firstName: string,
    private lastName: string,
    private jobTitle: string
  ) {
    Employee.headcount++;
  }
}
 
let tung = new Employee("Tung", "Hoang", "NodeJSDev");
let minh = new Employee("Quynh", "Nhu", "QA");
 
console.log(Employee.headcount); // 2
}
```

Trong ví dụ trên, thuộc tính tĩnh `headcount` được khởi tạo bằng 0, giá trị của nó sẽ tăng lên 1 bất cứ khi nào một đối tượng mới được tạo

### Phương thức static
Tương tự như thuộc tính static
```typescript
class Employee {
  private static headcount: number = 0;
 
  constructor(
    private firstName: string,
    private lastName: string,
    private jobTitle: string
  ) {
    Employee.headcount++;
  }
 
  public static getHeadCount() {
    return Employee.headcount;
  }
}
 
let tung = new Employee("Tung", "Hoang", "NodeJSDev");
let minh = new Employee("Quynh", "Nhu", "QA");
 
console.log(Employee.getHeadCount); // 2
```
Trong ví dụ này, ta đã thay đổi chỉ thị truy cập của thuộc tính tĩnh `headcount` từ **public** thành **private** để giá trị của nó không thể thay đổi bên ngoài lớp mà không tạo một đối tượng Employee mới. Sau đó, thêm phương thức static `getHeadCount()` trả về giá trị của thuộc tính static `headcount`

# 8. Abstract Class
Một `abstract class` (lớp trừu tượng) thường được sử dụng để định nghĩa hành vi chung cho các lớp dẫn xuất mở rộng. Không giống như một lớp thông thường, một lớp trừu tượng **không thể được khởi tạo trực tiếp**
Để khai báo một lớp trừu tượng, ta sử dụng từ khóa `abstract`
Thông thường, một abstract class chứa một hoặc nhiều **phương thức trừu tượng** (abstract method)
Một abstract method **không chứa mã thực thi**. Nó chỉ định nghĩa chữ ký của phương thức mà không bao gồm phần thân của phương thức. Một abstract method phải được **triển khai trong lớp dẫn xuất**

```typescript
abstract class Employee {
  constructor(private firstName: string, private lastName: string) {}
  abstract getSalary(): number;
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  compensationStatement(): string {
    return `${this.fullName} makes ${this.getSalary()} a month.`;
  }
}
```

Ta không thể khởi tạo abstract class
![](https://images.viblo.asia/13fb32a4-b97b-4a9a-b9dd-eb479cc1eab6.jpg)

Lớp `FullTimeEmployee` và `Contractor` kế thừa abstract class `Employee`:
```typescript
class FullTimeEmployee extends Employee {
  constructor(firstName: string, lastName: string, private salary: number) {
    super(firstName, lastName);
  }
  getSalary(): number {
    return this.salary;
  }
}

class Contractor extends Employee {
  constructor(
    firstName: string,
    lastName: string,
    private rate: number,
    private hours: number
  ) {
    super(firstName, lastName);
  }
  getSalary(): number {
    return this.rate * this.hours;
  }
}
```

Thể hiện của 2 lớp  `FullTimeEmployee` và `Contractor`
```typescript
let tung = new FullTimeEmployee("Tung", "Hoang", 12000);
let minh = new Contractor("Quynh", "Nhu", 100, 200);
 
console.log(tung.compensationStatement());
// Tung Hoang makes 12000 a month.
console.log(minh.compensationStatement());
// Quynh Nhu makes 20000 a month.
```
# 9. Kết luận
Trên đây là những kiến thức cơ bản về Classes trong TypeScript. Hy vọng bài viết này sẽ giúp bạn hiểu và sử dụng được classes trong dự án của mình, và đồng thời, sẽ giúp bạn hiểu được lý do tại sao TypeScript được gọi là superset của JavaScript. Mình cũng chỉ mới tìm hiểu về TypeScript nên có lẽ bài viết sẽ không tránh khỏi sai sót, rất mong nhận được các ý kiến đóng góp từ bạn trong phần comments dưới bài viết để chúng ta cùng học thêm được những kiến thức hay ho nhé.

Cảm ơn bạn đã đọc bài viết của mình. Happy Coding :smiley:
# 10. Tham khảo
* https://www.typescriptlang.org/docs/handbook/classes.html
* https://www.tutorialspoint.com/typescript/typescript_classes.htm