Như thường lệ thì các bạn ủng hộ bài viết gốc ở blog của mình [tại đây](http://duthaho.com/blogs/prototype-in-javascript-2) nhé

----------

Chào mừng các bạn trở lại với series _tìm hiểu Prototype trong Javascript_. Ở [phần 1](https://duthaho.com/blogs/prototype-in-javascript) chúng ta đã được tìm hiểu về:

1.  Cách để tạo ra một _constructor function_ như thế nào?
2.  Prototype của function là gì? và cách thêm hàm vào prototype.
3.  Cách sử dụng _Object.create_ để chia sẽ các hàm dùng chung cho các đối tượng khác nhau.

Bạn nào chưa xem qua phần 1 thì nên đọc trước, trước khi tiếp tục với bài viết hôm nay nhé!

Dưới đây là ví dụ chúng ta đã hoàn thành ở phần 1. Nhìn vào `Person` constructor, có thể thấy có 2 dòng quan trọng nhất là tạo ra đối tượng person dùng `Object.create` và return nó. Nếu không tạo person với `Object.create` thì các đối tượng được tạo ra từ `Person` constructor không thể dùng chung các function trong prototype, và nếu thiếu dòng return thì chúng ta cũng không thể lấy được đối tượng person vừa tạo.

```js
function Person (name, mana) {
  let person = Object.create(Person.prototype)
  person.name = name
  person.mana = mana

  return person
}

let teo = Person('Tèo', 7)
```

Hôm nay mình sẽ tiếp tục với ví dụ trên. Chắc có bạn sẽ thắc mắc tại sao ở trên lại cần _return person_ và khi tạo mới đối tượng lại không dùng từ khóa _new_. Vâng, khi bạn gọi 1 function với từ khóa _new_, 2 dòng mà mình commented dưới đây được gọi 1 cách ngầm định (“under the hood”) và đối tượng được tạo ra gọi là  `this`.

```js
function Person (name, mana) {
  // const this = Object.create(Person.prototype)

  this.name = name
  this.mana = mana

  // return this
}

const ti = new Person('Tí', 7)
const teo = new Person('Tèo', 10)
```

Không có lỗi nào đúng không? Khi chúng ta gọi 1 constructor function với từ khóa _new_, 1 đối tượng `this` được tạo và tự động return. Nhưng nếu bạn quên từ khóa _new_ khi gọi function trên thì sẽ xảy ra lỗi đấy nhé, lúc đó chẳng có `this` nào được tạo ra và trả về ngầm định cả. Xem ví dụ dưới đây sẽ rõ:

```js
function Person (name, mana) {
  this.name = name
  this.mana = mana
}

const ti = Person('Tí', 7)
console.log(ti) // undefined

```

Pattern này được gọi là  `Pseudoclassical Instantiation`.

### ES6 Classes

Nếu bạn là 1 tín đồ của ES6, thì chắc bạn cũng chẳng cần quan tâm đến Prototype là gì đúng ko? ES6 giới thiệu từ khóa _Class_ cho phép chúng ta tạo ra class và đối tượng của nó 1 cách dễ dàng và khỏi đau đầu với những phức cmn tạp của prototype. Bạn có thể xem chi tiết về Class [tại đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

```js
class Person {
  constructor(name, mana) {
    this.name = name
    this.mana = mana
  }
  eat(amount) {
    console.log(`${this.name} đang ăn`)
    this.mana += amount
  }
  sleep(hours) {
    console.log(`${this.name} đi ngủ.`)
    this.mana += hours
  }
  play(hours) {
    console.log(`${this.name} đi chơi với gái.`)
    this.mana -= hours
  }
}

const ti = new Person('Tí', 7)
const teo = new Person('Tèo', 10)
```

Rõ ràng và dễ hiểu hơn đúng không nào? Vậy thì tại sao chúng ta còn phải tìm hiểu Prototype nữa làm gì, tốn thời gian mà chả được tích sự chi. Vì Javascript là _prototype based_, nên để hiểu rõ cách class hoạt động, chúng ta phải nắm vững Prototype. Bạn có thể đọc thêm _prototype based_ ở [đây](https://www.freecodecamp.org/news/a-guide-to-prototype-based-class-inheritance-in-javascript-84953db26df0/)

----------

Vậy là chúng ta đã tìm hiểu về **Prototype trong Javascript**, chúng hoạt động như thế nào và sử dụng chúng ra sao. Sau đây là một vài ví dụ liên quan đến Prototype trong Javascript.

----------

### Get một prototype của một Object

Khi bạn muốn get prototype của một object, hãy dùng hàm `Object.getPrototypeOf`.

```js
function Person (name, mana) {
  this.name = name
  this.mana = mana
}

Person.prototype.eat = function (amount) {
  console.log(`${this.name} đang ăn`)
  this.mana += amount
}

Person.prototype.sleep = function (hours) {
  console.log(`${this.name} đi ngủ.`)
  this.mana += hours
}

Person.prototype.play = function (hours) {
  console.log(`${this.name} đi chơi với gái.`)
  this.mana -= hours
}

const ti = new Person('Tí', 7)
const prototype = Object.getPrototypeOf(ti)

console.log(prototype)
// {constructor: ƒ, eat: ƒ, sleep: ƒ, play: ƒ}

prototype === Person.prototype // true

```

Mặc định, `prototype` của object sẽ có một property gọi là `constructor` trỏ đến constructor function hoặc class (ES6) đã tạo ra object đó. Đó cũng là lý do vì sao bất kỳ đối tượng nào chúng ta cũng có thể truy cập `constructor` của nó thông qua `instance.constructor`.

```js
function Person (name, mana) {
  this.name = name
  this.mana = mana
}

const ti = new Person('Tí', 7)
console.log(ti.constructor) // constructor function
```

> Bạn cũng có thể dùng property `__proto__` để get prototype của 1 object, nhưng đây là cách cũ, hiện tại nên dùng hàm  **Object.getPrototypeOf(instance)** nhé.

### Kiểm tra 1 property có phải của protype hay không

Trong một số trường hợp cụ thể thì bạn muốn biết một property của object là của chính object đó hay là được lấy từ protype của nó. Bài toán là hãy log tất cả các key và value có trong 1 object, xem ví dụ bên dưới để hiểu hơn, đơn giản mình dùng `for in` để lặp qua tất cả các key trong object:

```js
function Person (name, mana) {
  this.name = name
  this.mana = mana
}

Person.prototype.eat = function (amount) {
  console.log(`${this.name} đang ăn`)
  this.mana += amount
}

Person.prototype.sleep = function (hours) {
  console.log(`${this.name} đi ngủ.`)
  this.mana += hours
}

Person.prototype.play = function (hours) {
  console.log(`${this.name} đi chơi với gái.`)
  this.mana -= hours
}

const ti = new Person('Tí', 7)

for(let key in ti) {
  console.log(`Key: ${key}. Value: ${ti[key]}`)
}
```

Và mình mong đợi kết quả là:

```js
Key: name. Value: Tí
Key: mana. Value: 7
```

Nhưng đời không như là mơ, run kết quả:

```js
Key: name. Value: Tí
Key: mana. Value: 7
Key: eat. Value: function (amount) {
  console.log(`${this.name} đang ăn`)
  this.mana += amount
}
Key: sleep. Value: function (hours) {
  console.log(`${this.name} đi ngủ.`)
  this.mana += hours
}
Key: play. Value: function (hours) {
  console.log(`${this.name} đi chơi với gái.`)
  this.mana -= hours
}
```

Tại sao lại như vậy? Vì loop `for in` sẽ lặp qua tất cả các property có trong chính object và kể cả những property trong prototype của nó nữa. Vì vậy, không những chúng ta thấy giá trị của `name` và `mana`, mà còn có các hàm của prototype `eat`, `sleep` và `play` nữa. Để giải quyết vấn đề này, có thể dùng hàm `hasOwnProperty` để kiểm tra xem 1 property có phải là của chính object đó hay không?

```js
...

const ti = new Person('Tí', 7)

for(let key in ti) {
  if (ti.hasOwnProperty(key)) {
    console.log(`Key: ${key}. Value: ${ti[key]}`)
  }
}
```

Kết quả bây giờ đúng như chúng ta mong muốn:

```js
Key: name. Value: Tí
Key: mana. Value: 7
```

Bạn có thể test thêm để kiểm chứng:

```js
function Person (name, mana) {
  this.name = name
  this.mana = mana
}

Person.prototype.eat = function (amount) {
  console.log(`${this.name} đang ăn`)
  this.mana += amount
}

Person.prototype.sleep = function (hours) {
  console.log(`${this.name} đi ngủ.`)
  this.mana += hours
}

Person.prototype.play = function (hours) {
  console.log(`${this.name} đi chơi với gái.`)
  this.mana -= hours
}

const ti = new Person('Tí', 7)

ti.hasOwnProperty('name') // true
ti.hasOwnProperty('mana') // true
ti.hasOwnProperty('eat') // false
ti.hasOwnProperty('sleep') // false
ti.hasOwnProperty('play') // false
```

### Kiểm tra object là thể hiện của Class nào?

Có lúc bạn muốn biết thèn Tí có phải là con mình hay không? Hay nó là sản phẩm của thèn hàng xóm. Bạn phải nhờ đến bác sĩ để kiểm tra ADN, và ông bác sĩ đưa cho bạn 1 hàm `instanceof` và công thức của nó như sau:

```js
object instanceof Class
```

Bạn là dân coder chuyên nghiệp, và thế là về kiểm tra ngay:

```js
function Person (name, mana) {
  this.name = name
  this.mana = mana
}

function User () {}

const ti = new Person('Tí', 7)

ti instanceof Person // true
ti instanceof User // false
```

May quá, Tí là con của mình rồi, nhưng bạn muốn chắc chắn hơn, bạn cần biết công thức `instanceof` hoạt động như thế nào? Vâng, nó sẽ kiểm tra xem prototype của đối tượng có đúng là prototype của constructor function hay class hay không?  `Object.getPrototypeOf(ti) === Person.prototype`.

### Nghĩ sâu một chút

Bạn có nhận ra lỗi ở đoạn code bên dưới không?

```js
function Person (name, mana) {
  this.name = name
  this.mana = mana
}

const ti = Person('Tí', 7)
```

Đệt, troll bố à? Tạo object dùng constructor function mà dell dùng từ khóa _new_. Vâng nếu bạn có câu trả lời như trên thì bạn hoàn toàn hiểu bài rồi đấy. Nhưng không phải ai cũng thông minh như bạn, nhất là mấy thèn IQ thấp và lười biếng như mình.

Chắc bạn nghĩ, ngu thì chịu chứ liên quan gì đến tao :D. Nhưng lỡ đâu 1 ngày trong team bạn có 1 thèn như thế, khởi tạo đối tượng với constructor function mà bạn đã tạo ra trước đó. Thế là lỗi ở đâu ập đến, crash mẹ con server mà bạn cũng chẳng biết lỗi từ đâu tới nữa, tốn công debug cả ngày, biết đâu bạn lại nhớ đến vấn đề ngày hôm nay.

Như đã đề cập ở trên, nếu chúng ta gọi 1 constructor function với từ khóa _new_, 1 đối tượng `this` sẽ được tạo ngầm định, và instance của `this` này chính là constructor function đó:

```js
function Person (name, mana) {
  if (this instanceof Person === false) {
    console.warn(`${name} quên gọi Person với từ khóa new rồi`)
  }

  this.name = name
  this.mana = mana
}
```

Thay vì bắn ra lỗi thì bạn có thể gọi luôn function với từ khóa _new_ luôn:

```js
function Person (name, mana) {
  if (this instanceof Person === false) {
    return new Person(name, mana)
  }

  this.name = name
  this.mana = mana
}
```

Giờ cho dù bạn có quên gọi _new_ đi chăng nữa, thì chương trình vẫn hoạt động đúng.

### Arrow Functions

Nếu bạn đã tìm hiểu về [Arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) trong ES6, thì `this` được auto binding chứ chúng không chứa `this` của chính nó. Vì vậy Arrow functions không được dùng để làm constructor function, nếu bạn cố gắng gọi 1 arrow function với từ khóa _new_, nó sẽ báo lỗi:
```js
const Person = () => {}

const ti = new Person() // Uncaught TypeError: a is not a constructor
```

Chính vì thế, 1 arrow function cũng không có `prototype`.

```js
const Person = () => {}
console.log(Person.prototype) // undefined
```

----------

Vậy là chúng ta đã tìm hiểu qua **Prototype trong Javascript** và một số ứng dụng thực tiễn. Mong các bạn thấy có ích thì like, share để ủng hộ mình nhé. Hẹn gặp lại các bạn trong các bài viết tiếp theo!