ES6 (ECMAScript2015) là một bản nâng cấp lớn cho JavaScript. Trong bài viết này, chúng ta sẽ tìm hiểu về class es6 trong JavaScript. 

Nếu bạn là một developer javascript thì bạn hẳn phải biết rằng javascript tuân theo sự kế thưà prototypal, nhưng đôi khi nó hơi lộn xộn tuỳ theo từng devjs. Tuy nhiên sự ra đời với class es6 thì cú pháp sẽ đơn giản và trực quan hơn nhiều. 

Trong javascript chúng ta có thể khai báo một đối tượng bằng cách, khai báo một biến có kiểu dữ liệu là object.

VD:
```
var employee = {
    name: null,
    age: null,
    setName: function (name) {
        this.name = name;
    },
    getName: function () {
        return this.name;
    },
    setAge: function (age) {
        this.age = age;
    },
    getAge: function () {
        return this.age;
    }
};
```
Nhưng cách khai báo đó nó đã quá cũ và không có chuẩn về cú pháp, điều đó khiến những người mới lập trình rất khó tiếp cận với javascript. Do đó trong phiên bản ES6 đã cải tiến rất nhiều về class với cú pháp chuẩn OOP.

## Class Definition
Trong ES6 đã hỗ trợ chúng ta khai báo một đối tượng theo chuẩn OOP, bằng cách sử dụng từ khóa `class`.

VD: Đối với VD trên chúng ta có thể chuyển sang dạng ES6 thành như sau:
```
class Employee {
    setName (name) {
        this.name = name;
    }
    getName () {
        return this.name;
    }
    setAge (age) {
        this.age = age;
    }
    getAge () {
        return this.age;
    }
};
```
Như các bạn đã thấy thì về mặt cú pháp của nó rõ ràng hơn hẳn đúng không?

Với ES6 thì bạn không thể khai báo các thuộc tính như bình thường được mà bạn chỉ có thể gán nó vào các phương thức trong đối tượng được thôi.

Để khởi tạo đối tượng được khai báo theo chuẩn ES6 thì các bạn sử dụng từ khóa `new` với cú pháp như sau:
```
new ClassName;
//hoặc
new ClassName();
```
> Trong đó `className` là tên của đối tượng mà các bạn muốn khởi tạo.

VD: Mình sẽ khởi tạo đối tượng Employee được khai báo ở ví dụ trên.

```
new Employee();
```

Và với ES6, nó cũng hỗ trợ chúng ta một phương thức đặc biệt mà bất kỳ ngôn ngữ lập trình nào cũng có đối với class đó là `constructor` - phương thức khởi tạo. `constructor` trong ES6 cũng có tác dụng tương tự, nó sẽ tự động được gọi khi đối tượng được khởi tạo.

Để khai báo `constructor` trong ES6 thì các bạn chỉ cần khai báo một phương thức có tên là `constuctor`.

VD: Mình sẽ khai báo constuctor cho đối tượng Employee ở trên.

```
class Employee {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }
    setName (name) {
        this.name = name;
    }
    getName () {
        return this.name;
    }
    setAge (age) {
        this.age = age;
    }
    getAge () {
        return this.age;
    }
};
```

Như mình cũng đã nói ở trên thì với kiểu khai báo class trong ES6 chúng ta không thể khai báo trực tiếp thuộc tính cho nó được mà phải khởi tạo qua các phương thức và thường thì chúng ta sẽ đặt nó ở trong constructor luôn.

Lúc này khi khởi tạo đối tượng chúng ta có thể truyền luôn tham số cho nó như các ngôn ngữ khác.

VD:

`new Employee("Hoàng Minh Khánh", 22);`

Bạn nào muốn kiểm chứng có thể `console.log()` đối tượng này ra để xem class sẽ xuất hiện ra hai thuộc tính nam và age với giá trị như khởi tạo.

## Class Inheritance
Đã theo chuẩn `OOP-style` thì phải đầy đủ đúng không mọi người? Với ES6, nó cũng đã cung cấp cho chúng ta sử dụng từ khóa `extends` để kế thừa từ đối tượng khác.

Cú Pháp:

```
class A extends B {
    //code
}
```

Trong đó: `A` là class đang được khai báo, và nó kế thừa lại các thuộc tính và phương thức từ class `B`.

VD: Mình sẽ viết một đối tượng MaleEmployee kế thừa từ class Employee ở trên.

```
class MaleEmployee extends Employee {
    constructor (name,age,wifeName) {
        super(name,age);
        this.wifeName = wifeName;
    }
    setWifeName (wifeName) {
        this.setWifeName;
    }
    getWifeName () {
        return this.wifeName;
    }
}
```

Trong ví dụ này mình có sử dụng `super() `- viết với cú pháp như này thì là gọi lại constructor của lớp cha, còn chi tiết về nó phần dưới mình sẽ nói rõ hơn.

## Base class access
Trong ES6, để thực hiện gọi các phương thức trong lớp cha khi đang ở lớp con, mà phương thức đó đã bị `rewrite` trong lớp con rồi thì các bạn sử dụng keyword `super` với cú pháp như sau:

`super.methodName();`

Trong đó, `methodName` là phương thức của lớp cha mà bạn muốn gọi.

VD: 

```
class Employee {
    getClassName () {
        return "Class Employee";
    }
};
class MaleEmployee extends Employee {
    getClassName () {
        return "Class MaleEmployee";
    }
    classClassName () {
        return super.getClassName();
    }
}
var employee = new MaleEmployee();
console.log(employee.classClassName());
//kết quả: Class Employee
```

Và bạn cũng có thể gọi lại phương thức của lớp cha khi đang đứng trong phương thức đó ở lớp con (trong phương thức rewrite chính nó).

VD:

```
class Employee {
    getClassName () {
        return "Class Employee";
    }
};
class MaleEmployee extends Employee {
    getClassName () {
        return "Class MaleEmployee - " + super.getClassName();
    }
    classClassName () {
        return super.getClassName();
    }
}
var employee = new MaleEmployee();
console.log(employee.getClassName());
//kết quả: main.js:15 Class MaleEmployee - Class Employee
```

## Static Members
Trong ES6 cũng hỗ trợ chúng ta khai báo các thành phần tĩnh cho đối tượng, bằng cách sử dụng từ khóa `static` ở trước tên phương thức.

VD:

```
class Employee {
    static defaultEmployee () {
        return "Đây là phương thức defaultEmployee";
    }
};
```

Và khi một phương thức được khai báo là `static methods` thì chúng ta sẽ không thể gọi phương thức đó một cách thông thường được nữa, mà chúng ta sẽ gọi theo cú pháp sau:

```
className.staticMethodName();
```

Trong đó:

`className` là tên của class chứa static methods mà bạn muốn gọi..

`staticMethodName` là tên của static methods mà bạn muốn gọi.


VD: Mình sẽ gọi phương thức defaultEmployee của class Employee ở trên. 

```
console.log(Employee.defaultEmployee());
//kết quả: Đây là phương thức defaultEmployee
```

## Setter and Getter
Nếu như bạn đã học qua hướng đối tượng rồi thì chắc hẳn bạn sẽ không còn gì lạ lẫm với các `setter` và `getter` nữa. Và trong ES6 cũng hỗ trợ chúng ta thiết lập các `setter` và `getter` cho các thuộc tính.

> setter và getter là những phương thức đặc biệt (magic method) chúng được gọi khi chúng ta tác động lên các thuộc tính trong đối tượng (Mình giải thích qua loa cho những ai chưa biết thôi còn chi tiết các bạn chịu khó google hoặc comment mình sẽ khái niệm chi tiết lại).

Để khai báo các setter và getter trong ES6 chúng ta sử dụng keyword `set` và `get` trước tên các phương thức mà bạn muốn thiết lập nó là setter hoặc getter.

VD: Mình sẽ chuyển đổi các phương thức setName, getName, setAge, getAge trong đối tượng employee ở trên về dạng setter getter.

```
class Employee {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }
    set employeeName (name) {
        this.name = name;
    }
    get employeeName () {
        return this.name;
    }
    set employeeAge (age) {
        this.age = age;
    }
    get employeeAge () {
        return this.age;
    }
};
```

Lúc này chúng ta sẽ sử dụng setter getter như làm với một thuộc tính thông thường.

VD:

```
//khởi tạo đối tượng
var employee = new Employee();
//setter
employee.employeeName = "Hoàng Minh Khánh"
//getter
employee.employeeName;
//kết quả: Hoàng Minh Khánh
```

Hoặc bạn cũng có thể thực hiện setter, getter bằng cách truy cập trực tiếp vào class mà không cần khởi tạo.

```
//setter
Employee.employeeName = "Hoàng Minh Khánh"
//getter
Employee.employeeName;
//kết quả: Hoàng Minh Khánh
```

##  Lời kết
ES6 đã hỗ trợ chúng ta rất mạnh về class, cho đến thời điểm hiện tại thì thì nó đã hỗ trợ hầu hết các trình duyệt web rồi chỉ có IE, Opera và android browser là chưa hỗ trợ thôi, nên mọi người cũng cần phải cân nhắc khi sử dụng.

Các bạn có thể xem chi tiết [tại đây](https://caniuse.com/#search=Class%20Es6)

Bài viết tham khảo https://toidicode.com/classes-trong-es6-340.html