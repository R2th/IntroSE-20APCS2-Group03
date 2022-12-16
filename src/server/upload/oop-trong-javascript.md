Trong bài chia sẻ lần này, mình xin giới thiệu với các bạn tổng quát về khái niệm OOP trong Javascipt, cụ thể là Object, Prototypes, và Classes.

## Khái niệm cơ bản.

Object trong Javascript có dạng tự do và hầu hết không theo bất kỳ cấu trúc nào. Cấu trúc của chúng có thể gần giống với đối tượng *Map* trong Java, gồm các cặp key-value.

Các đối tượng Javascript không cần phải có các thành phần được khai báo trước. Vì các đối tượng trong Javascript không cần được định nghĩa như các bản thiết kế lớp như trong Java, các classes có thể tự do biến đổi; được gán biến giống như các yêu cầu của chương trình.


```
let object = { 'oldProp':'Old Value'};
object.newProp = 'New Value';
console.log(object); 
// { oldProp : 'Old Value', newProp : 'Some Value' }
```

## Hàm khởi tạo - "new".

Javascript có từ khóa *new*, [cho phép các đối tượng tạo ra bằng cách sử dụng hàm khởi tạo](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new), khác với các hàm bình thường. Chúng hoạt động tương tự như các hàm constructors trong Java.

Ví dụ: tạo đối tượng trong Javascript theo cách truyền thống là sử dụng các hàm.

```
function createPerson(name) {
  let person = {};
  person.name = name;
  return person;
}
let myPerson = createPerson("Greg");
console.log(myPerson); // { name : 'Greg' }
```

**Từ khóa *new* loại bỏ sự cần thiết phải sử dụng mã để khai báo và trả về một đối tượng được tạo và cung cấp nó một cách ngầm định**.

Sự khác biệt là sử dụng *this* để chỉ ra đối tượng được xây dựng ẩn trong quá trình gán thuộc tính. Không giống với Java, *new* được sử dụng trên các hàm gần như ngược lại với cấu trúc riêng của class.

```
function createPerson(name) {
  this.name = name;
}
let myPerson = new createPerson("Greg");
console.log(myPerson); // createPerson { name: 'Greg' }
```

Một lưu ý: quy ước mã hóa điển hình cho các hàm đặt tên được thiết kế để được gọi ra với từ khóa *new* là chúng phải ở trong *PascalCase* và không phải là *camelCase*. Điều quan trọng là nhận ra sự khác biệt giữa các hàm cần được thực hiện bình thường và giống như một hàm khởi tạo.

**Việc gọi một hàm được thiết kế tương tự như việc gọi hàm khởi tạo không trả về đối tượng, thay vào đó set các thuộc tính trên đối tượng . Từ khóa *this* trong hàm khởi tạo tham chiếu đến đối tượng mà nó sẽ trả về. Khi gọi bình thường thì nó sẽ tham chiếu đến đối tượng hàm là thuộc tính của nó**.

Ví dụ, nếu chúng ta gọi hàm khởi tạo 1 cách bình thường, chúng ta sẽ thấy từ khóa *this* tham chiếu đến đối tượng cha, nhưng trong ví dụ bên dưới, đối tượng *global* là đối tượng được gọi. Đối tượng global phụ thuộc vào môi trường thực thi của Javascript; *window* cho browsers và *global* cho nodeJS.

```
function Person(name) {
  this.name = name;
}
// RETURNS OBJECT
let myPerson = new Person("Greg");
console.log(myPerson); // Person { name: 'Greg' }
// NO OBJECT RETURNED - PROPERTY ASSIGNED TO PARENT OBJECT (GLOBAL)
let myOtherPerson = Person("Gerg");
console.log(myOtherPerson); // undefined
console.log(this.name); // Gerg

function Dog(name) {
  this.name = name;
  this.giveCollar = function() {
    this.collar = true;
  };
}
// PROPERTY ASSIGNED TO PARENT OBECT (DOG)
let myDog = new Dog("Snuffles");
myDog.giveCollar();
console.log(myDog.collar); // true
```

### Sử dụng "call" để khắc phục vấn đề của "this" phần trên.

Khi chúng ta sử dụng *this* trong function, chúng ta hoặc là tham chiếu đến đối tượng cha/kèm theo trong một lời gọi hàm bình thường, hoặc đối tượng đã tạo được trả về trong một hàm khởi tạo.

Khi chúng ta có đối tượng có các thuộc tính sử dụng từ khóa *this* để tham chiếu đến các đối tượng cha, ngay lập tức, chúng ta sẽ gặp phải các vấn đề khi chúng ta cố gắng truy cập các chức năng bên ngoài đối tượng.

```
function SavingsPig() {
  this.amount = 100,
  this.addCoins = function(numCoins) {
    this.amount += numCoins;
  }
}
let piggyBank = new SavingsPig();
piggyBank.addCoins(1);
console.log(piggyBank.amount); // 101
let greg = {};
greg.addCoins = piggyBank.addCoins;
greg.addCoins(1);
console.log(piggyBank.amount); // 101
console.log(greg); // { addCoins: [Function], amount: NaN }
```

Trong ví dụ trên, chúng ta có đối tượng *piggyBank*, có function *addCoins*, và thuộc tính *amount*. Khi chúng ta gọi hàm trên đối tượng, số tiền đã được cộng thành công. Tuy nhiên, khi đối tượng *greg* cố thêm tiền bằng cách gán hàm *piggyBank.addCoins(...)* cho chính nó, từ khóa *this* tham chiếu đến đối tượng cha (*greg*) thay vì *piggyBank* (kết quả là *NaN* hoặc not a number bởi vì chúng ta đã cố gắng tăng một thứ chưa được xác định).

Bằng cách sử dụng [*call*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call), chúng ta có thể liên kết một đối tượng với một hàm, thay thế đối tượng cha, để từ khóa this truy cập đến đối tượng ràng buộc của chúng ta.

call là một hàm ẩn, là thuộc tính của đối tượng hàm; (nhớ là tất cả các hàm trong Javascript đều là đối tượng). Nó chấp nhận giống như params object và một danh sách đối số truyền vào.

```
function SavingsPig() {
  this.amount = 100,
  this.addCoins = function(numCoins) {
    this.amount += numCoins;
  }
}
let piggyBank = new SavingsPig();
piggyBank.addCoins(1);
console.log(piggyBank.amount); // 101
let greg = {};
greg.addCoins = piggyBank.addCoins;
greg.addCoins.call(piggyBank, 1);
console.log(piggyBank.amount); // 102
console.log(greg); // { addCoins: [Function] }
```

## Prototypes

Không thể so sánh cấu trúc lớp của Javascript với các ngôn ngữ OOP truyền thống như Java. Các hành vi (methods/functions/..) trong Javascript không thuộc về một lớp giống như chúng trong Java. Các đối tượng Javascript là một tập hợp các thuộc tính, trong đó function được gán cho một thuộc tính.

Tuy nhiên Javascript không có tính kế thừa ( tức là việc chuyển các thuộc tính và hàm từ một tối tượng sang cha đối tượng được con). Bất cứ khi nào một đối tượng được tạo ra trong Javascript, thì sẽ 2 đối tượng sẽ được tạo ngầm là object itself(chính nó) và object's prototype(nguyên mẫu của đối tượng).

```
let someObject = {}
console.log(someObject.__proto__) // { ...lots of properties }
```

Tất cả các đối tượng được tạo có tham chiếu đến đối tượng nguyên mẫu (__proto__), sẽ có một số thuộc tính và hàm của nguyên mẫu này. Các đối tượng là function(các hàm cũng là các đối tượng) cũng có quyền truy cập đến *prototype* từ *prototype* object.

**Prototype bản chất là một tham chiếu đến một đối tượng khác mà nó kế thừa từ đó**. Đối tượng *Date* kế thừa các hàm từ *Date.prototype* sau đó nó lại kế thừa từ *Object.prototype*. Các hàm nguyên mẫu xây dựng có một tham chiếu hai chiều đến chính nó.

![](https://images.viblo.asia/0de9193c-b780-4d12-a41f-0feee548c4ff.png)

```
function Bread() {};
let sodaBread = new Bread();
sodaBread.__proto__.constructor; // { ƒ Bread() {} }
Object.getPrototypeOf(sodaBread).constructor; // { ƒ Bread() {} }
```

### Prototypes (and Prototype chains) là sự triển khai tính kế thừa đối tượng của Javascript.

Khi trình thông dịch JS kiểm tra thuộc tính đối tượng định nghĩa cho nó, trước tiên nó kiểm kiểm tra object trước. Nếu object không có thuộc tính được định nghĩa, nó sẽ kiểm tra *prototype* của đối tượng với cùng thuộc tính, nếu nó được tìm thấy, nó sẽ trả về thuộc tính đó.

Nó khác với OOP trong Java là prototype object có thể truy cập vào đối tượng tạo ra trước vào sau bất kể khi nào có sự thay đổi nào trên prototype.

```
function Bread() {}; // constructor function
let brownBread = new Bread(); // object of type "Bread"
let sodaBread = new Bread(); // object of type "Bread"
Bread.prototype.toast = function() {
        console.log('I am toasting!');
    }; // set the function on a toast property on the prototype
// inherited prototype is accessible!
brownBread.toast(); // I am toasting!
sodaBread.toast(); // I am toasting!
```

Điều thực sự quan trọng cần lưu ý là tranh luận về việc __proto__ sử dụng trực tiếp thường không được khuyến khích. Bạn có thể sử dụng *Object.getPrototypeOf(obj)* để thay thế. Thay đổi prototype của object được coi là một hành vi slow được cho là nên tránh.

## Class

Trong ES6(2015), cú pháp *class* đã được đưa vào Javascript. Điều này không thay đổi mô hình kế thừa của JS, mà là cung cấp một phương tiện khác để tạo khái niệm về các đối tượng "class". MDN định nghĩa cú pháp trên [sự kế thừa dựa vào các prototype hiện tại của Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

Để thấy được điều này, hãy cùng định nghĩa về đối tượng *Dog* bằng các nguyên mẫu hiện của cửa Javascript.

```
function Dog(name) {
  this.name = name;
}
Dog.prototype.bark = function() {
  console.log(this.name + " is barking");
}
let myDog = new Dog("Snuffles");
myDog.bark();  // Snuffles is barking
let neighboursDog = new Dog("Santos L Halper");
neighboursDog.bark(); // Santos L Halper is barking
```

Sử dụng cú pháp *class*, chúng ta có thể mở rộng nội dung code phía trên:

```
class Dog {
  constructor(name) {
    this.name = name;
  }
  bark() {
    console.log(this.name + " is barking");
  }
}
let myNewDog = new Dog("Laddie");
myNewDog.bark(); // Laddie is barking
```

Có một thay đổi quan trọng trong khi sử dụng cú pháp mới, điều sẽ được làm sáng tỏ ở bên dưới. Để tìm hiểu thêm thông tin về những điều mà bạn có thể làm từ nó, hãy tham khảo tại [Classes on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

### Sự cần thiết của "new"

Đối tượng class yêu cầu được định nghĩa bằng từ khóa *new*. Theo mặc định, classes sẽ được khởi tạo là một đối tượng rỗng nếu nó không được định nghĩa. Nếu bạn cố gắng thiết lập đối tượng mà không sử dụng hàm khởi tạo, bạn sẽ nhận được thông báo lỗi.

```
let Dog = class {
  bark() {
    console.log("Woof");
  }
}
let myDog = Dog(); 
// TypeError: Class constructor Dog cannot be invoked without ‘new'
```

### Named/Unnamed expression

Class có thể đặt tên hoặc không đặt tên, tương tự cú pháp hàm, ví dụ như:

```
let Dog = class {
  bark() {
    console.log("Woof");
  }
}
let myDog = new Dog();
myDog.bark(); // Woof
```

### Strict mode

Các bạn có thể tìm hiểu thêm thông tin về *strict mode* trên [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode), nhưng về cơ bản nó là một biến thể hạn chế của Javascript vì nó làm thay đổi ngữ nghĩa bình thường của Javascript.

### Getters và Setters

Classes có thể sử dụng 2 từ khóa *get* và *set* để sử dụng cho các hàm accessor. Điều này có nghĩa là bạn có thể sử dụng tên thuộc tính khi truy cập vào đối tượng thay vì thực thi hàm.

```
class DogWithGetSet {
  get name() {
    return "Snuffles";
  }
}
class DogWithoutGet {
  name() {
    return "Snuffles";
  }
}
let dogGetter = new DogWithGetSet();
let dogNoGetter = new DogWithoutGet();
console.log(dogGetter.name); // Snuffles
console.log(dogNoGetter.name); // [Function: name]
```


### Functions-only

Classes có thể không chứa các thuộc tính cụ thể. Tất cả các thuộc tính phải được xác định bằng các hàm. Các thể hiện của thuộc tính có thể được trả về thông qua hàm.

```
class Dog {
  constructor(name) {
    this.name = name;
  }
  get colour() {
    return "white";
  }
}
let myDog = new Dog("Snuffles");
console.log(myDog.colour); // white
```

## Tổng kết

Bài viết đã phác thảo một cách cơ bản nhất các khái niệm về khởi tạo đối tượng, kế thừa (thông qua Prototyping)
và cú pháp mới cho việc tạo class. Nếu có thời gian, mọi người có thể tìm hiểu về các tính năng khác của class như subclassing với các extension của nó.

Nguồn tài liệu: https://medium.com/@byrne.greg/oop-digest-in-javascript-807b534a5270