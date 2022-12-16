# Classes

Cấu trúc 'class' cho phép chúng ta định nghĩa một nguyên mẫu(prototype-based) với cú pháp clear và nice-looking. Nó cũng giới thiệu giới thiệu tính năng mới tuyệt vời và hữu ích cho lập trình hướng đối tượng.

# Cú pháp của class

**class** có cú pháp đa dạng, Chúng ta sẽ bắt đầu với một ví dụ đơn giản.

đây là một prototype-based class **User**:

```Javascript
function User(name) {
  this.name = name;
}

User.prototype.sayHi = function() {
  alert(this.name);
}

let user = new User("John");
user.sayHi();
```
Và ở đây chúng ta sẽ dùng **class** với cùng chức năng:
 ```Javascript
 class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

let user = new User("John");
user.sayHi();
 ```

 Chúng ta dễ dàng thấy rằng 2 ví dụ trên là như nhau. Hãy chắc chắn rằng giữa các method trong một class không có dấu ','. Đây là một nhầm lẫn phổ biến với các developer mới và nó sẽ dẫn tới syntax error. đây không phải là một object literals và nó không yêu cầu dấu ','.

 # Class là gì?

Chính xác **class** là gì? Chúng ta có lẽ nghĩ rằng nó đinh nghĩa  một level mới, nhưng đó sẽ là một sai lầm!

Trong Javascript một **class** là một loại của function.

Định nghĩa **class User {...}** tạo ra một function cùng tên và đặt methods trong **User.prototype.** vì vậy cấu trúc là tương tự nhau.

Điều này được thể hiện trong đoạn code sau, và bạn có thể tự chaỵ để xem:

```Javascript
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// proof: User is a function
alert(typeof User); // function

// proof: User is the "constructor" function
alert(User === User.prototype.constructor); // true

// proof: there are two methods in its "prototype"
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

Tóm lại chúng ta có thể minh hoạ quá trình này  của class **User** sẽ tạo ra một hàm như thế này:

![](https://images.viblo.asia/d0a7a8f7-aa07-4926-9ea1-2be6bf003d34.png)

**Class** là một cú pháp đặc biệt để định nghĩa một constructor cùng với các prototype methods của nó. Ngoài tính năng cơ bản "Class" còn mang đến nhiều tính năng khác mà chúng ta sẽ khám phá sau nhé.

# Class Expression

Cũng giống như function, *Class" có thể định nghĩa bên trong một expression khác, được truyền, được return,...

 Đây là function return class - còn được gọi là "class factory":

 ```Javascript
 function makeClass(phrase) {
  // declare a class and return it
  return class {
    sayHi() {
      alert(phrase);
    };
  };
}

let User = makeClass("Hello");

new User().sayHi(); // Hello
 ```

 Điều này khá bình thường nếu chúng ta nhớ lại răng **class** chỉ là một dạng đặc biệt của đinh nghĩa function-with-prototype.

 Và giống như cách đặt tên cho Function Expresstion thì **class** cũng có thể có tên, và chỉ hiển thị bên trong **class**:
 
 ```javascript
 // "Named Class Expression" (alas, no such term, but that's what's going on)
let User = class MyClass {
  sayHi() {
    alert(MyClass); // MyClass is visible only inside the class
  }
};

new User().sayHi(); // works, shows MyClass definition

alert(MyClass); // error, MyClass not visible outside of the class
 ```

 # Sự khác nhau giữ classes và functions

 Classes có một số sự khác biệt so với functions thông thường:

 ## Constructors require *new*

 Không giống function thông thường, một **class constructor** không thể gọi mà không có *new*

 ```javascript
 class User {
  constructor() {}
}

alert(typeof User); // function
User(); // Error: Class constructor User cannot be invoked without 'new'
 ```

 ## String output khác nhau

 Nếu chúng ta output nó với **alert(User)**, một số engines sẽ show **class User...** và các engine khác sẽ show **function User..."

 Và xin đường nhầm lẫn: cách hiển thị string ra có thể khác nhau nhưng nó vẫn là một function không có một thực thể **class** riêng biệt trông Javascript.

 ## class methods là không thể đếm được(non-enumerable)

Một đinh nghĩa class đặt vô số flag 'flase' cho tất cả method trong 'prototype'. Điều đó rất tốt bởi vì nếu chúng ta for..in trong một object, chúng ta sẽ thường không muốn các class method của nó.

## Classes có một constructor() {} mặc định

Nếu không có một **contructor** trong **class**, thì một function rỗng sẽ được tạo ra, giống như chúng ta đã viết ở trên constructor() {}.

## Classes luôn luôn sử dụng **strict**
 
 Tất cả code trông class là tự động ở trong strict mode.

# Getters/setters, other shorthands

**Class** cũng bao gồm getters/setters, generators, computed properties etc.

Đây là một ví dụ **user.name** sử dụng **get/set**:

```javascript
class User {

  constructor(name) {
    // invokes the setter
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Name too short.
```

Đây là ví dụ với computed properties:

```javascript
function f() { return "sayHi"; }

class User {
  [f()]() {
    alert("Hello");
  }

}

new User().sayHi();
```

Với generator method nó cũng tương tự và thêm *.

# Class properties

Trong ví dụ ở trên **User** chỉ có method giờ hãy thêm property cho nó nhé:

```javascript
class User {
  name = "Anonymous";

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi();
```

Property không phải đặt trong **User.prototype** mà nó được tạo bởi **new** riêng biệt cho mỗi đối tượng. Vì vậy property sẽ không bao giờ được chia sẻ giữa các đối tượng khác nhau của cùng một class.

# Tổng kết 

Class syntax cơ bản sẽ nhìn như thế này:

```Javascript
class MyClass {
  prop = value;

  constructor(...) {
    // ...
  }

  method(...) {}

  get something(...) {}
  set something(...) {}

  [Symbol.iterator]() {}
  // ...
}
```

**MyClass** về mặt kĩ thuật là một function, trong đó các method được ghi vào **MyClass.prototype.**

[Bài tham khảo](https://javascript.info/class)