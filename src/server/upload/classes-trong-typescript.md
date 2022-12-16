## Introduction
Đối với các bạn từng sử dụng JavaScript có thể thấy JavaScript sử dụng các  functions và prototype-based để xây dựng các thành phần có thể sử dụng lại .Và một điều dễ nhận thấy là JavaScript có cấu trúc khá lỏng lẻo .
Chính điều này đã gây ra khó khăn cho nhưng lập trình viên đã quen với  những ngôn ngữ hướng đối tượng có cấu trúc và những quy định chặt chẽ hơn .
Bắt đầu với ECMAScript 2015 (còn được gọi là ECMAScript 6)  các lập trình viên JavaScript sẽ có thể xây dựng các ứng dụng của họ bằng cách sử dụng phương pháp tiếp cận dựa trên  hướng đối tượng này. 
Chính vì thế  TypeScript  đã ra đời , nhằm cho phép các lập trình viên sử dụng  tiếp cận thep  hướng đối tượng. TypeScript sẽ biên dịch code thành JavaScript hoạt động trên tất cả các trình duyệt và các nền tảng có sử dụng JavaScript

Tiếp theo chúng ta sẽ cùng tìm hiểu một base của  TypeScript mà giống với ngôn ngữ hướng đối tượng 
## Class
Trong TypeScript một class được định nghĩa như sau  :
```
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
```
Syntax của TypeScript trông khá giống với Java , C# hoặc Kotlin 
Ở đây chúng ta khai báo một Class có tên là `Greeter` .Class này có một `property` là `greeting` , một `constructor`  và một method `greet()`

Để xây dựng instance của class `Greeter` này cũng giống như ngôn ngữ hướng đối tượng khác chúng ta chỉ cần gọi 
```
let greeter = new Greeter("world");
```

## Inheritance
Trong TypeScript có có tính kế thừa , điều này được triển khai khá giống với ngôn ngữ khác . 

Như ví dụ dưới đây : 
```
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

Trong ví dụ trên cho thấy tính kế thừa cơ bản nhất: các class con kế thừa các thuộc tính và phương thức từ các class cha. Ở đây, `Dog` là một class dẫn xuất xuất phát từ class `Animal` bằng cách sử dụng từ khóa  `extends`.

Thêm một ví dụ cụ thể hơn 
```
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```
Chúng ta có thể thấy ở đây có 2 class Horse và Snake cùng kế thừa từ Animal 
Điểm khác ở đây là trong mỗi contructor của class con có gọi đến hàm `super(name)`  nó sẽ execute contructor của class cha . Đồng thời cũng có từ khóa `this` giúp gọi đến nội tại của class này .

Nếu các bạn chạy mã lệnh trên sẽ in được kết quả như dưới đây : 
```
Slithering...
Sammy the Python moved 5m.
Galloping...
Tommy the Palomino moved 34m.

```
## Public, private,  protected , readonly
Cũng giống như  ngôn ngữ C# , Java chúng ta cũng có các modifiers là Public, private,  protected .

Với thuộc tính  hoặc phương thức  được định nghĩ là public chúng ta có thể thoải mái gọi thuộc tính này từ bất cứ đâu , trong ngoài class nều được 

Nếu một thuộc tính hoặc phương thức không được modifiers thì mặc định sẽ là public 

Ngược lại nếu là privite thì chúng ta chỉ có thể truy cập từ bên trong class đó 

Ví dụ 
```
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // Error: 'name' is private;
```
Còn đối với protected cũng giống như private chỉ ngoại trừ trường hợp các class con kế thừ từ nó cũng có thể truy cập được 

Ví dụ :
```
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // error
```

Readonly
Ngoài ra chúng ta cũng có thêm một modifier mới là readonly .
Khi một thuộc tính có thêm readonly có nghĩ thuộc tính này chỉ có thế lấy được giá trị của chúng mà không thể thay đổi giá trị . Bạn cần phải gán giá trị cho thuộc tính này mới khởi tạo nó hoặc gán trong hàm  constructor
Ví dụ 
```
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // error! name is readonly.

```

## Kiểu Static 
Chúng ta có thể khởi tạo các thuộc tính là `Static` . Khi đó chúng ta có thể truy cập đến thuộc tính này bằng cách gọi theo tên của class mà không cần phải khởi tạo class đó .
Ví dụ : 
```
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

```

Trên đây là một số kiến thức cơ bản về TypeScript . 
Cảm ơn các bạn đã theo dõi 

Nguồn tham khảo  :  https://www.typescriptlang.org/docs/handbook/classes.html