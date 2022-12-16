Thật ra từ khi ES6 ra đời thì tôi càng yêu thích lập trình javascipt hơn bất kỳ các ngôn ngữ nào tôi biết. Nhưng chỉ riêng thiếu một thứ của ES6 đó là việc kế thừa nhiều class. Việc đó khiến các devjs đặt ra câu hỏi rất nhiều trên stackoverflow. Chính vì lẽ đó tôi sẽ giới thiệu cho devjs một cách tuyệt vời để làm được điều đó.

# Yêu cầu người đọc: 
1 - ES6 là gì? 

2 - ES6 Inheritance Class? 

** [Click about me](https://anonystick.com)**

**Các bạn có thể đọc thêm series về javascript es6 ở đây: ** : ["Tổng hợp các bài học về Javascript ES6" ](https://anonystick.com/search?key=es6)
# Tại sao lại cần thừa kế trong class ES6 
Một câu hỏi hơi thừa nhưng cũng phải sơ lược một chút xem như ôn lại khái niệm. Thừa kế trong class (java, php, C#, javascript) đều rất quan trọng trong việc lập trình. Nó giúp chúng ta giảm được lượng code, và quản lý code dễ dàng hơn. Điều quan trọng nhất đó là khi triển khai một application lớn thì cần team và team xé nhỏ ra để mỗi người làm một class rồi sau đó sẽ kế thừa nhau. Nôm na là hiểu như vậy Sử dụng việc kế thừa với extends trong ES6. Từ khóa extends được sử dụng trong class declarations hoặc class expressions để tạo ra một class con kế thừa từ một class sẵn có (class cha).
```
Ví dụ:

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

Vậy câu hỏi ở đây nếu việc kế thừa nhiều class thì như thế nào? Chẳng hạn

`class Dog extends Animal, Person, Blala.. {}`
# Làm sao kế thừa nhiều class trong ES6
Sau khi search trên google tôi đã có khá nhiều câu trả lời ví dụ như này:

Theo [stackoverflow](https://stackoverflow.com/questions/29879267/es6-class-multiple-inheritance)

```
// base class
class A {  
  foo() {
    console.log(`from A -> inside instance of A: ${this instanceof A}`);
  }
}

// B mixin, will need a wrapper over it to be used
const B = (B) => class extends B {
  foo() {
    if (super.foo) super.foo(); // mixins don't know who is super, guard against not having the method
    console.log(`from B -> inside instance of B: ${this instanceof B}`);
  }
};

// C mixin, will need a wrapper over it to be used
const C = (C) => class extends C {
  foo() {
    if (super.foo) super.foo(); // mixins don't know who is super, guard against not having the method
    console.log(`from C -> inside instance of C: ${this instanceof C}`);
  }
};
```

Các bạn thấy thế nào? Thật sự là khó hiểu cho việc triển khai thủ công như trên. Rất tiếc ES6 không support cho bạn điều này, nhưng rất may các nhà devjs đá tìm tòi và tự phát minh cho minh một điều trông dễ dàng hơn nhiều.

# Phần quan trọng của bài viết.
Step1: Tạo Class for creating multi inheritance.

```
// Class for creating multi inheritance.
class multi
{
  // Inherit method to create base classes.
  static inherit(..._bases)
  {
    class classes {

      // The base classes
        get base() { return _bases; }

      constructor(..._args)
      {
        var index = 0;

        for (let b of this.base) 
        {
          let obj = new b(_args[index++]);
            multi.copy(this, obj);
        }
      }
    
    }

    // Copy over properties and methods
    for (let base of _bases) 
    {
        multi.copy(classes, base);
        multi.copy(classes.prototype, base.prototype);
    }

    return classes;
  }

  // Copies the properties from one class to another
  static copy(_target, _source) 
  {
        for (let key of Reflect.ownKeys(_source)) 
      {
            if (key !== "constructor" && key !== "prototype" && key !== "name") 
        {
                let desc = Object.getOwnPropertyDescriptor(_source, key);
                Object.defineProperty(_target, key, desc);
            }
        }
  }
}
```


***Làm thế nào sử dụng multi kế thừa trong class. Giả sử chúng ta có hai class Dog và Pig***

```
class Dog{
  constructor(hands){
    this.hand = hands;
  }
  
  callHandDog(){
    console.log('callHandDog>>', this.hand);
  }
}

class Pig{
  constructor(hands){
    this.hand = hands;
  }
  
  callHandPig(){
    console.log('callHandPig>>', this.hand);
  }
  
}
```
Giờ ta muốn kế thừa hai class trên thì sử dụng multi class trên

Code:

```
class Animal extends multi.inherit(Dog, Pig){
  constructor(hands){
    super(hands, hands)
  }
  
  init(){
    super.callHandPig();
    super.callHandDog();
  }
  
}

const _animal = new Animal(4);
_animal.init();
//(index):97 callHandPig>> 4
//(index):87 callHandDog>> 4
```
Xem full code ở đây: https://jsfiddle.net/anonystick/j67L4xuh/10/

**Các bạn có thể đọc thêm series về javascript es6 ở đây: ** : ["Tổng hợp các bài học về Javascript ES6" ](https://anonystick.com/search?key=es6)
# Kết Luận

Với việc thừ kế nhiều class thì rất tiện khi làm việc nhóm và quan trọng nó giúp bạn xây dựng một cấu trúc tuyệt vời trong những dự án lớn hơn nữa. Tôi hy vọng rằng qua những bài viết chia sẻ này, chí ít cũng giúp các bạn có những thủ thuật cần thiết lúc khi cần. 
Tôi dám chắc sẽ có rất nhiều devjs đang sử dụng một phương án khác hay hơn tôi mong rằng các bạn nên share cho các devjs khác biết để sử dụng tốt hơn. Cảm ơn!

Xong! 
Happy coding!
** [Click about me](https://anonystick.com)**