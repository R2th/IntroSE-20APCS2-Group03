## 1. Class là gì?
Trong lập trình hướng đối tượng, class hay còn gọi là lớp được sử dụng để tạo đối tượng có thuộc tính (attribute) và phương thức (method).
Từ phiên bản ECMAScript 6 thì JavaSript hỗ trợ tạo ra class giống các ngôn ngữ lập trình hướng đối tượng khác (Java, C++...).<br>
Ví dụ:
```
class Person {
    constructor(name, age) {
        this.name= name;
        this.age= age;
    }
    show() {
        return `Tối tên là: ${this.name}, ${this.age} tuổi`;
    }
}
```
Khi muốn tạo một đối tượng  `Person` , ta chỉ việc khai báo như sau:
```
let person1 = new Person("Nguyen Van A", 18);
```
## 2. Constructor là gì?
Constructor hay còn gọi là phương thức khởi tạo là hàm dùng để khởi tạo một đối tượng của một lớp. Nó sẽ tự động được tạo khi ta tạo một đối tượng của lớp.
Chú ý là trong một lớp chỉ có một phương thức constructor, Nếu ta cố ý viết nhiều hơn 1 constructor thì sẽ xuất hiện lỗi.
Như vậy trong Javascript chỉ có 1 hàm constructor, không giống như nhiều ngôn ngữ khác như Java, C++...<br>
Ví dụ:
```
constructor(name, age) {
    this.name= name;
    this.age= age;
}
```
Khi gọi đối tượng ta có thể làm như sau:<br>
```
let person1 = new Person("Nguyen Van A", 18);
let person2 = new Person("Nguyen Van A");
let person3 = new Person();
```
Các tham số bị thiếu sẽ trả về underfined. Ta cũng nên đặt tên đối số truyền vào với thên thuộc tính giống nhau để dễ phân biệt. `constructor(name) {this.name= name;}`

## 3. Phương thức Getter và Setter của class
### 3.1 . Phương thức Getter
Nếu các bạn đã từng học qua các ngôn ngữ mạnh về hướng đối tượng như Java hay C++ thì các bạn chẳng còn xa lạ gì với hai phương thức này nữa. Phương thức getter giúp ta lấy thuộc tính của đối tượng class. Trong class có bao nhiêu thuộc tính thì có bấy nhiêu phương thức getter.<br>
Ví dụ:
```
class Person {
    constructor(name, age) {
        this.name= name;
        this.age= age;
    }
    get getName() {
        return this.name;
    }
    get getAge() {
        return this.age;
    }
    show() {
        return `Tối tên là: ${this.name}, ${this.age} tuổi`;
    }
}    
```
Khi sử dụng chúng ta viết như sau:
```
let person1 = new Person("Nguyen Van A", 18);
console.log(person1.getName);
```
Các bạn nhớ là không có cặp ngoặc đơn sau nhé.
```
console.log(person1.getName());
```
Như thế này sẽ tạo ra lỗi nhé.
### 3.2. Phương thức Setter
Cũng giống như phương thức Getter nhưng mục đích của nó là set giá trị cho các thuộc tính..<br>
Ví dụ:
```
class Person {
    constructor(name, age) {
        this.name= name;
        this.age= age;
    }
    set setName(name) {
        this.name = name;
    }
    set setAge() {
       this.age = age;
    }
    show() {
       return `Tối tên là: ${this.name}, ${this.age} tuổi`;
    }
}    
```
Khi sử dụng chúng ta viết như sau:
```
let person1 = new Person("Nguyen Van A", 18);
person1.setName = "Le Van B";
```
## 4. Kế thừa trong class(inheritance)
Cũng như các ngôn ngữ khác, Javascript cũng hỗ trợ tính kế thừa. Chúng ta cùng tìm hiểu nhé..<br>
Ví dụ:
```
//Đây là lớp cha
class Person {
    constructor(name, age) {
        this.name= name;
        this.age= age;
    }
    show() {
       return `Tối tên là: ${this.name}, ${this.age} tuổi`;
    }
 }
 //Đây là lớp con
 class Student extends Person {
     constructor(idSV, name, age) {
         super(name,age);
         this.idSV = idSV;
     }
     showInfo() {
        return `Mã SV: ${this.idSV}` + this.show();
     }
 }
```
Qua đoạn ví dụ trên ta thấy:<br>
Từ khóa super: Phương thức super() này là phương thức tham chiếu đến lớp cha. Khi chúng ta gọi phương thức super() trong hàm khởi tạo thì chúng ta gọi đến phương thức khởi tạo của lớp cha và có quyền truy cập đến các thuộc tính và phương thức khởi tạo của lớp cha.<br>
Chúng ta cũng có thể gọi phương thức của lớp cha thông qua từ khóa super() khi chúng ta overwride phương thức đó.<br>
Ví dụ khi ta muốn Overide lại một phương thức của lớp cha, ta làm như sau:
```
//Đây là lớp cha
class Person {
    constructor(name, age) {
        this.name= name;
        this.age= age;
    }
    show() {
       return `Tối tên là: ${this.name}, ${this.age} tuổi`;
    }
}    
 //Đây là lớp con
 class Student extends Person {
     constructor(idSV, name, age) {
         super(name,age);
         this.idSV = idSV;
     }
     show() {
        return `Mã SV: ${this.idSV}` + super.show();
     }
 }
```

## 5. Một số lưu ý khác:
### 5.1. Hoisting
Không giống như các hàm và các khai báo JavaScript khác, các khai báo class (lớp) không được hoisting.
Nếu ta làm như sau thì sẽ xuất hiện lỗi:<br>
Ví dụ:
```
let person1 = new Person("Nguyen Van A");
class Person {
    constructor(name) {
        this.name = name;
    }
}
```
### 5.2. Từ khóa this
Nếu làm việc với ngôn ngữ C, C++ thì các bạn không còn xa lạ gì với từ khóa this nữa. Nó thể hiện cho một đối tượng class.<br>
Ví dụ:
```
class Person {
    constructor(name) {
        this.name = name;
    }   
}
```
Trong ví dụ trên  this.name thì this đang được hiểu là class Person.

## 6. Lời kết
Trên đây là những kiến thức cơ bản về class trong Javascript. Hi vọng nó có thể giúp các bạn hiểu về class của Javascript để áp dụng cho những kiến thức nâng cao hơn. Cảm ơn các bạn đã xem.

## Tài liệu tham khảo:
-https://niithanoi.edu.vn/class-trong-javascript.html<br>
-https://javascript.info/classes