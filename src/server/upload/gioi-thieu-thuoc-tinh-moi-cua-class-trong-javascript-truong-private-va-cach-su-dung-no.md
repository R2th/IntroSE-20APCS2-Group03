**ES6 đã giới thiệu cho chúng ta về Class trong Javascript, nhưng nó vẫn quá là đơn giản để có thể sử dụng cho các ứng dụng phức tạp. Trường của Class (hay còn được gọi là thuộc tính của Class) có mục đích đem đến các constructor đơn giản hơn với các thuộc tính private và static.**

Hãy cùng điểm lại về Class trong ES6 trước khi xem qua các ví dụ chi tiết hơn.

# Những điều cơ bản về Class trong ES6
Mô hình kế thừa kiểu Prototype có vẻ sẽ gây khó hiểu đối với các lập trình viên đã quen hay hiểu biết nhiều về kế thừa kiểu Class được sử dụng trong các ngôn ngữ như **C++, C#, Java hay PHP.** Class trong JavaScript tuy chủ yếu đơn thuần là những cú pháp được thiết kế giúp cho mọi thứ dễ  hơn, và nó đồng thời giúp cho những người vốn đã quen với khái niệm lập trình hướng đối tượng trở nên quen thuộc hơn.

Class là một template giúp định nghĩa cách hoạt động của các object thuộc class đó. Class `Animal` sau định nghĩa cho các loài động vật nói chung (tên các class thường được viết hoa chữ cái đầu tiên để giúp phân biệt chúng với các object và các type khác):

```
class Animal {

  constructor(name = 'anonymous', legs = 4, noise = 'nothing') {

    this.type = 'animal';
    this.name = name;
    this.legs = legs;
    this.noise = noise;

  }

  speak() {
    console.log(`${this.name} says "${this.noise}"`);
  }

  walk() {
    console.log(`${this.name} walks on ${this.legs} legs`);
  }

}
```

Việc khai báo class được thực hiện ở **strict** mode nên ta không cần thiết phải thêm `use strict`.

Hàm `constructor` sẽ chạy khi một object thuộc loại này được tạo và nó có nhiệm vụ định nghĩa các thuộc tính ban đầu cho object đó. `speak()` và `walk()` là các phương thức giúp thêm các chức năng khác cho object.

Và giờ object của ta đã có thể được tạo từ Class này thông qua từ khóa `new`:

```
const rex = new Animal('Rex', 4, 'woof');
rex.speak();          // Rex says "woof"
rex.noise = 'growl';
rex.speak();          // Rex says "growl"
```

# Getter and Setter
Các `Setter` là các phương thức đặc biệt chỉ được dùng để định nghĩa các giá trị cho object. Tương tự, `Getter` là các phương thức đặc biệt chỉ được dùng để trả về các giá trị. Ví dụ:

```
class Animal {

  constructor(name = 'anonymous', legs = 4, noise = 'nothing') {

    this.type = 'animal';
    this.name = name;
    this.legs = legs;
    this.noise = noise;

  }

  speak() {
    console.log(`${this.name} says "${this.noise}"`);
  }

  walk() {
    console.log(`${this.name} walks on ${this.legs} legs`);
  }

  // setter
  set eats(food) {
    this.food = food;
  }

  // getter
  get dinner() {
    return `${this.name} eats ${this.food || 'nothing'} for dinner.`;
  }

}


const rex = new Animal('Rex', 4, 'woof');
rex.eats = 'anything';
console.log( rex.dinner );  // Rex eats anything for dinner.
```

# Child/Sub-class
Việc sử dụng một Class được xây dựng trên một Class khác có lẽ là điều thường thấy khi lập trình hướng đối tượng. Nếu ta hầu như chỉ tạo các object về `dog`, thì việc sử dụng Class `Animal` sẽ quá tổng quát, và lúc nào ta cũng sẽ phải định nghĩa đi định nghĩa lại việc nó có 4 chân (legs) và kêu "woof" (noise) làm mặc định. 

Class `Dog` có thể kế thừa tất cả các thuộc tính và phương thức từ class `Animal` sử dụng từ khóa `extends`. Tất cả những thuộc tính và phương thức cụ thể cho class `Dog` có thể được thêm hoặc bớt nếu cần:

```
class Dog extends Animal {

  constructor(name) {

    // call the Animal constructor
    super(name, 4, 'woof');
    this.type = 'dog';

  }

  // override Animal.speak
  speak(to) {

    super.speak();
    if (to) console.log(`to ${to}`);

  }

}
```

`super` đại diện cho parent class() và thường được gọi trong hàm `constructor`. Ở ví dụ trên, phương thức `speak()` của class `Dog` đã override phương thức tương ứng được định nghĩa ở class `Animal`.

Giờ ta có thể tạo ra một object instance của class `Dog`:

```
const rex = new Dog('Rex');
rex.speak('everyone');      // Rex says "woof" to everyone

rex.eats = 'anything';
console.log( rex.dinner );  // Rex eats anything for dinner.
```

# Phương thức Static và Thuộc tính
Định nghĩa một phương thức với từ khóa `static` sẽ giúp cho phương thức của class đó có thể được gọi mà không cần phải khởi tạo một object instance. JavaScript không hỗ trợ các thuộc tính static giống như các ngôn ngữ lập trình khác, nhưng việc thêm các thuộc tính vào khi định nghĩa class (một class cũng đồng thời là một JavaScript object) là điều có thể.

Class `Dog` có thể được điều chỉnh lưu trữ được số lần mà các object được tạo từ nó:

```
class Dog extends Animal {

  constructor(name) {

    // call the Animal constructor
    super(name, 4, 'woof');
    this.type = 'dog';

    // update count of Dog objects
    Dog.count++;

  }

  // override Animal.speak
  speak(to) {

    super.speak();
    if (to) console.log(`to ${to}`);

  }

  // return number of dog objects
  static get COUNT() {
    return Dog.count;
  }

}

// static property (added after class is defined)
Dog.count = 0;
```

Hàm static getter `COUNT` của class sẽ trả về số lần mà object dog được tạo:

```
console.log(`Dogs defined: ${Dog.COUNT}`); // Dogs defined: 0

const don = new Dog('Don');

console.log(`Dogs defined: ${Dog.COUNT}`); // Dogs defined: 1

const kim = new Dog('Kim');

console.log(`Dogs defined: ${Dog.COUNT}`); // Dogs defined: 2
```

# Các trường được mong chờ trong các chuẩn ES tiếp theo
Một trong các đề xuất về trường của class đó là cho phép chúng được khởi tạo ở ngay đầu Class:

```
class MyClass {
  a = 1;
  b = 2;
  c = 3;
}
```

Điều này cũng tương tự với việc:

```
class MyClass {

  constructor() {
    this.a = 1;
    this.b = 2;
    this.c = 3;
  }

}
```

## Trường Static của Class
Các trường trong class cho phép thuộc tính static được khai báo ngay bên trong `class`. Ví dụ:

```
class MyClass {

  x = 1;
  y = 2;
  static z = 3;

}

console.log( MyClass.z ); // 3
```

Và tương tự trong ES6 ta đã có một cách không gọn ghẽ cho lắm:

```
class MyClass {

  constructor() {
    this.x = 1;
    this.y = 2;
  }

}

MyClass.z = 3;

console.log( MyClass.z ); // 3
```

## Trường Private của class
Tất cả các thuộc tính trong class của ES6 đều mặc định là public và có thể được xem, chỉnh sửa từ bên ngoài class. Trong ví dụ về class `Animal` trên, không có gì có thể ngăn cản việc thuộc tính `food` có thể sẽ bị thay đổi mà không cần thông qua hàm setter `eats`:

```
class Animal {

  constructor(name = 'anonymous', legs = 4, noise = 'nothing') {

    this.type = 'animal';
    this.name = name;
    this.legs = legs;
    this.noise = noise;

  }

  set eats(food) {
    this.food = food;
  }

  get dinner() {
    return `${this.name} eats ${this.food || 'nothing'} for dinner.`;
  }

}

const rex = new Animal('Rex', 4, 'woof');
rex.eats = 'anything';      // standard setter
rex.food = 'tofu';          // bypass the eats setter altogether
console.log( rex.dinner );  // Rex eats tofu for dinner.
```

Các ngôn ngữ khác cho phép khai báo thuộc tính `private`. Nhưng đó là điều không thể trong ES6, mặc dù các lập trình viên có thể tạm thời giải quyết vấn đề này bằng cách sử dụng underscore convention (`_propertyName`).

Trong các chuẩn ES tiếp theo, các trường private của class có thể được định nghĩa sử dụng dấu thăng `#` làm prefix:

```
class MyClass {

  a = 1;          // .a is public
  #b = 2;         // .#b is private
  static #c = 3;  // .#c is private and static

  incB() {
    this.#b++;
  }

}

const m = new MyClass();

m.incB(); // runs OK
m.#b = 0; // error - private property cannot be modified outside class
```

Hãy chú ý rằng không có cách nào để định nghĩa các phương thức, hàm getter settter private, mặc dù đang có những [đề xuất](https://github.com/tc39/proposal-private-methods) sử dụng dấu thăng `#` làm tiền tố cho tên. Ví dụ:

```
class MyClass {

  // private property
  #x = 0;

  // private method (can only be called within the class)
  #incX() {
    this.#x++;
  }

  // private setter (can only be called within the class)
  set #setX(x) {
    this.#x = x;
  }

  // private getter (can only be called within the class)
  get #getX() {
    return this.$x;
  }

}

```

# Lợi ích: Code React trông gọn gàng hơn
Các component React thường có những phương thức gắn với các sự kiện DOM. Để đảm bảo ngữ cảnh `this` hoạt động đúng cho component hiện tại, việc phải `bind` tất cả các phương thức tương ứng là cần thiết. VÍ dụ:

```
class App extends Component {

  constructor() {

    super();

    state = { count: 0 };

    // bind all methods
    this.incCount = this.incCount.bind(this);
  }

  incCount() {
    this.setState(ps => ({ count: ps.count + 1 }));
  }

  render() {

    return (
      <div>
        <p>{ this.state.count }</p>
        <button onClick={this.incCount}>add one</button>
      </div>
    );

  }
}
```

Nếu `incCount` được định nghĩa là trường của class, nó có thể được set cho một hàm bằng cách dùng chuẩn arrow `=>` từ ES6, điều này sẽ giúp nó được bind một cách tự động vào object được định nghĩa. `state` cũng có thể được khai báo như một trường của Class nên ta không cần phải có constructor:

```
class App extends Component {

  state = { count: 0 };

  incCount = () => {
    this.setState(ps => ({ count: ps.count + 1 }));
  };

  render() {

    return (
      <div>
        <p>{ this.state.count }</p>
        <button onClick={this.incCount}>add one</button>
      </div>
    );

  }
}
```

# References
* https://www.sitepoint.com/javascript-private-class-fields/
* https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/