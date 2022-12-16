Chào các bạn. Hôm nay chúng ta sẽ cùng tiếp tục tìm hiểu những tính năng mới trong bản ECMAScript 6.

Phần 1 các bạn có thể xem [Tại Đây](https://viblo.asia/p/tim-hieu-ecmascript-6-p2-oOVlYOpyK8W)

Phần 2 các bạn có thể xem [Tại Đây](https://viblo.asia/p/tim-hieu-ecmascript-6-p2-oOVlYOpyK8W)

Phần 3 các bạn có thể xem [Tại Đây](https://viblo.asia/p/tim-hieu-ecmascript-6-p3-vyDZOX6Qlwj)

Phần 4 các bạn có thể xem [Tại Đây](https://viblo.asia/p/tim-hieu-ecmascript-6-p4-1VgZvNXOZAw)

Phần 5 các bạn có thể xem [Tại Đây](https://viblo.asia/p/tim-hieu-ecmascript-6-p5-naQZRwBmlvx)

Hôm nay chúng ta sẽ tiếp tục với series về ES6 nhé mn.
các tư liệu và kiến thức được dịch từ: [](https://developer.mozilla.org)

# classes
## Defining classes
Trên thực tế class là 1 function đặc biệt, và giống như việc define 1 function thì define class cũng có 2 cách:
 -  class expressions
 -  class declarations.
 
###  Class declarations
một trong những cách để khởi tạo 1 class là chúng ta sử dụng Class decclarations bằng cách sử dụng từ khóa class cùng với tên của class
example:

```Javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

### Class expressions
Class expressions là một cách khác để chúng ta khởi tạo một class, chỉ có khác một điều đó là Class expressions có thể ko cần khai báo tên của class (nó sẽ lấy name = với name object sẽ chứa class đó)

example:
```Javascript
var Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle"

// named
var Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
```
## Class body and method definitions
Body của một class được bọc bởi cặp dấu {}, đây sẽ là nơi chúng ta định nghĩa các function, property của class.

### Strict mode
tất cả các thành phần của body của class declarations và class expressions đều được thực thi ở chế độ 'strict mode'

### Constructor
Constructor là một method đặc biệt để tạo và khởi tạo một object đã được định nghĩa trong class, trong một class thì chỉ có duy nhất một function có tên là "constructor", "SyntaxError" sẽ throw ra lỗi khi chúng ta định nghĩa nhiều constructor trong một class.
Nếu class chúng ta được kế thừa từ 1 class khác thì chúng ta có thể sử dụng  từ khóa "super" để gọi constructor của class cha.

### Prototype methods
Example:

```Javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100
```

chúng ta có thể thấy method area đã được sử dụng như một property
để tìm hiểu kỹ hơn các bạn truy cập vào đây: [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions)

### Static methods
từ khóa static sẽ định nghĩa static method cho class, static method sẽ được gọi mà ko cần class được khởi tạo , và khi class được khởi tạo thì ko gọi được static method
static chủ yếu được sử dụng cho các utility function 
Example:

```Javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2)); // 7.0710678118654755
```
### Instance properties
Instance properties sẽ được định nghĩa trong body của class

```Javascript
class Rectangle {
  constructor(height, width) {    
    this.height = height;
    this.width = width;
  }
}

var rect = new Rectangle(5,10);
rect.width             //10
rect.height             //5
```
Static property thì có thể được định nghĩa ở ngoài body 

```Javascript
Rectangle.staticWidth = 20;
Rectangle.prototype.prototypeWidth = 25;
```

## Sub classing with extends
từ khóa extends được sử dụng khi chúng ta muốn tạo ra các class con của class mà chúng ta đã khởi tạo

```Javascript
class Animal { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}

var d = new Dog('Mitzie');
d.speak(); // Mitzie barks.
```

Nếu trong class con có function constructor thì nó cần phải gọi từ khóa supper trước khi sử dụng từ khóa "this"

class thì không thể kế thừa các objects từ class cha, nếu bạn muốn kế thừa các objects đó thì có thể sử dụng function Object.setPrototypeOf()

Example:
```Javascript
var Animal = {
  speak() {
    console.log(this.name + ' makes a noise.');
  }
};

class Dog {
  constructor(name) {
    this.name = name;
  }
}

// If you do not do this you will get a TypeError when you invoke speak
Object.setPrototypeOf(Dog.prototype, Animal);

var d = new Dog('Mitzie');
d.speak(); // Mitzie makes a noise.
```

## Super class calls with super
Example về super

```Javascript
class Cat { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    console.log(this.name + ' roars.');
  }
}

var l = new Lion('Fuzzy');
l.speak(); 
// Fuzzy makes a noise.
// Fuzzy roars.
```

Hôm nay chúng ta sẽ tìm hiểu class thôi nhé,  hẹn bài sau tìm hiểu tiếp nha các bạn