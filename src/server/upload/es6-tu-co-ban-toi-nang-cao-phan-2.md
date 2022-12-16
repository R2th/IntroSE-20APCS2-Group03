Trong phần trước, mình đã giới thiệu một số tính năng ES6 mà theo bản thân mình thấy nó sử dụng khá nhiều trong khi làm việc. Thì ở phần này sẽ cho các bạn thấy một số thứ hay ho giúp viết code clean hơn

Nội dung

1. Template Literals
2.  for Of
3. Enhanced Object Properties
4. Class
-----

### 1. Template Literals
Trước khi muốn biết Template Literals là gì ? hay quay trở lại JS thuần. Nếu như muốn nối một chuỗi lại với nhau, ta phải sử dụng toán tử ```+``` hoặc cũng có thể sử dụng phương thức ```concat``` của String. Nó sẽ nhìn rất rối khi bạn gặp một bài toán phải nối nhiều chuỗi lại với nhau
```javascript
const fstName1 = 'vi', lastName1 = 'blo';
const message1 = 'My first name is ' + fstName1 + '.\n\n' + 'My last name is ' + lastName1;
console.log(message1);
```
Vì thế Template Literals sẽ giải quyết vấn đề trên.
Template Literals là một chuỗi ký tự bao gồm các câu lệnh được nhúng vào bên trong, có thể bỏ được dẫu trích dẫn dài dòng cùng với những câu lệnh nối chuỗi
```javascript
const fstName1 = 'vi', lastName1 = 'blo';
const message1 = `My first name is ${fstName1}.\n\n My last name is ${lastName1}`;
console.log(message1);
```
Tiếp theo có thể viết gọn những dòng code trên với tính năng Multiline strings mà Template Literals mang lại: 
```javascript
const fstName1 = 'vi', lastName1 = 'blo';
const message1 = `My first name is ${fstName1}
My last name is ${lastName1}`;
console.log(message1);
```
### 2. for Of
Khi nhắc tới vòng lặp for, ta có for, for ... in, forEach thì tới ES6 ta có thêm một loại vòng lặp for là for ... of
Nhắc lại kiến thức về for, for ... in, forEach:

**Vòng lặp for...Of**

Câu lệnh for ... Of lặp qua những giá trị của 1 đối tượng
For ... Of để bạn lặp qua những cấu trúc dữ liệu như là: Arrays, Strings, Map, NodeLists, ...

Cú pháp:
```
for (variable of iterable) {
  // Khối mã lệnh được thực thi
}
```
**variable**: Để mỗi lần lặp lại giá trị của thuộc tính tiếp theo được chỉ định tới biến. Variable có thể được khai báo với ```const``` ,```let``` hoặc ```var```

Ví dụ
```javascript
const cars = ['BMW', 'Volvo', 'Mini'];

for (let x of cars) {
  console.log(x);
}
```
Kết quả sẽ in ra được:

```BMW```

```Volvo```

```Mini```
### 3. Enhanced Object Properties
* Property Shorthand
Nếu như bạn muốn định nghĩa một object mà những key có cùng tên như những biến được truyền vào trong những thuộc tính, bạn có thể biết tắt bằng việc truyền vào tên key.

```javascript
let cat = 'Miaow';
let dog = 'Woof';
let bird = 'Peet peet';

let someObject = {
  cat,
  dog,
  bird
}
```
*  Method Properties
Một function là một thuộc tính của đối tượng được gọi trong một phương thức. Với Method Properties, bạn có thể bỏ qua từ khóa function: 
```javascript
function formatMessage (name, id, avatar) {
  return {
    name,
    id,
    avatar,
    timestamp: Date.now(),
    save: function () {
      // save message
    }
  }
}
```
Viết ngắn gọn lại: 
```javascript
function formatMessage (name, id, avatar) {
  return {
    name,
    id,
    avatar,
    timestamp: Date.now(),
    save () {
      //save message
    }
  }
}
```
### 4. Class
Như các bạn đã được tìm hiểu thì ở trong javascript chúng ta có thể khai báo một đối tượng bằng cách, khai báo một biến có kiểu dữ liệu là object.

Ví dụ:
```javascript
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

* **Class Definition**

Trong ES6 hỗ trỡ chúng ta khai báo một đối tượng theo chuẩn OOP, bằng cách sử dụng từ khóa ```class```

Ví dụ: Đối với ví dụ trên chúng ta có thể chuyển sang dạng ES6 thành như sau

```javascript
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

Để khởi tạo đối tượng được khai báo theo chuẩn ES6 thì các bạn sử dụng từ khóa new với cú pháp như sau:
```javascript
new ClassName;
//hoặc
new ClassName();
```

* **Class Inheritance.**

Đã theo chuẩn OOP-style thì phải đầy đủ đúng không mọi người? Với ES6, nó cũng đã cung cấp cho chúng ta sử dụng từ khóa extends để kế thừa từ đối tượng khác.
Cú pháp:
```javascript
class A extends B {
    //code
}
```
Trong đó: A là class đang được khai báo, và nó kế thừa lại các thuộc tính và phương thức từ class B.

Ví dụ:
```javascript
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
Trong ví dụ này mình có sử dụng super() - viết với cú pháp như này thì là gọi lại constructor của lớp cha, còn chi tiết về nó phần dưới mình sẽ nói rõ hơn.
* **Base class access.**

Trong ES6, để thực hiện gọi các phương thức trong lớp cha khi đang ở lớp con, mà phương thức đó đã bị rewrite trong lớp con rồi thì các bạn sử dụng keyword super với cú pháp như sau:
```javascript
super.methodName();
```
Trong đó, methodName là phương thức của lớp cha mà bạn muốn gọi.
```javascript
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
```javascript
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
* **Static Members.**

Trong ES6 cũng hỗ trợ chúng ta khai báo các thành phần tĩnh cho đối tượng, bằng cách sử dụng từ khóa static ở trước tên phương thức.
Ví dụ:
```javascript
class Employee {
    static defaultEmployee () {
        return "Đây là phương thức defaultEmployee";
    }
};
```
Và khi một phương thức được khai báo là static methods thì chúng ta sẽ không thể gọi phương thức đó một cách thông thường được nữa, mà chúng ta sẽ gọi theo cú pháp sau:
```javacsript
className.staticMethodName();
```

* **Setter and Getter**

Nếu như bạn đã học qua hướng đối tượng rồi thì chắc hẳn bạn sẽ không còn gì lạ lẫm với các setter và getter nữa. Và trong ES6 cũng hỗ trợ chúng ta thiết lập các setter và getter cho các thuộc tính.
Để khai báo các setter và getter trong ES6 chúng ta sử dụng keyword set và get trước tên các phương thức mà bạn muốn thiết lập nó là setter hoặc getter.

Ví dụ: Mình sẽ chuyển đổi các phương thức setName, getName, setAge, getAge trong đối tượng employee ở trên về dạng setter getter.
```javascript
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
```javascript
//khởi tạo đối tượng
var employee = new Employee();
//setter
employee.employeeName = "Viblo"
//getter
employee.employeeName;
//kết quả: Viblo
```
Hoặc bạn cũng có thể thực hiện setter, getter bằng cách truy cập trực tiếp vào class mà không cần khởi tạo.
```javascript
//setter
Employee.employeeName = "Viblo"
//getter
Employee.employeeName;
//kết quả: Viblo
```
### Tổng kết:
Hy vọng những thứ mình chia sẻ trên sẽ giúp ích nhiều cho các bạn mới bắt đầu học Javascript và ES6<br>

Tài liệu tham khảo:
- http://es6-features.org/#ParameterContextMatching
- https://dev.to/mkhy19/do-you-know-es6-part-2-596e