![image.png](https://images.viblo.asia/f9d3e16c-fa8c-4d32-b1e3-58cb31652afd.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Trong bài viết này, chúng ta rì viu (review) qua các đặc điểm chính của lập trình hướng đối tượng (OOP) và các ví dụ thực tế về OOP trong JavaScript.

Mình sẽ nói về các khái niệm chính của OOP, tại sao và khi nào nó có thể hữu ích, và mình sẽ cung cấp cho bạn nhiều ví dụ sử dụng trong code JavaScript.

Nếu bạn không quen với các mô hình lập trình, mình khuyên bạn nên xem [phần giới thiệu ngắn gọn mà mình đã viết gần đây](https://tuan200tokyo.blogspot.com/2022/09/blog3-mot-so-mo-hinh-lap-trinh-pho-bien.html) trước khi đi sâu vào phần này.

GÉT GÔ!

Mục lục
-------

*   [Giới thiệu về lập trình hướng đối tượng](#intro-to-object-oriented-programming)
*   [Cách tạo Đối tượng - Lớp](#how-to-create-objects-classes)
    *   [Một số điều cần lưu ý về các lớp](#some-things-to-keep-in-mind-about-classes-)
*   [Bốn nguyên tắc của OOP](#the-four-principles-of-oop)
    *   [Kế thừa](#inheritance)
        *   [Một số điều cần lưu ý về thừa kế](#some-things-to-keep-in-mind-about-inheritance-)
    *   [Đóng gói](#encapsulation)
    *   [Trừu tượng](#abstraction)
    *   [Đa hình](#polymorphism)
*   [Component đối tượng](#object-composition)
*   [Cuối cùng](#roundup)

Giới thiệu về lập trình hướng đối tượng
=======================================

Như đã đề cập trong [bài viết trước của mình về mô hình lập trình](https://tuan200tokyo.blogspot.com/2022/09/blog3-mot-so-mo-hinh-lap-trinh-pho-bien.html), khái niệm cốt lõi của OOP là **tách các mối quan tâm và trách nhiệm** thành **các thực thể.**

Thực thể được code hóa dưới dạng **đối tượng** và mỗi thực thể sẽ nhóm một tập hợp thông tin (**thuộc tính**) và các hành động (**method**) nhất định có thể được thực hiện bởi thực thể.

OOP rất hữu ích trong các dự án quy mô lớn, vì nó tạo điều kiện thuận lợi cho việc tổ chức và mô-đun code.

Bằng cách triển khai tính trừu tượng của các thực thể, bạn có thể suy nghĩ về chương trình theo cách tương tự như thế giới của chúng ta đang hoạt động, với các tác nhân khác nhau thực hiện các hành động nhất định và tương tác với nhau.

Để hiểu rõ hơn về cách bạn có thể triển khai OOP, mình sẽ sử dụng một ví dụ thực tế, trong đó chúng mình sẽ viết code một trò chơi điện tử nhỏ. Ae sẽ tập trung vào việc tạo ra các nhân vật và xem OOP có thể giúp bạn như thế nào.👽 👾 🤖

Cách tạo Đối tượng - Lớp
========================

Vì vậy, bất kỳ trò chơi điện tử nào cũng cần nhân vật, phải không? Và tất cả các nhân vật đều có một số **đặc điểm** (thuộc tính) nhất định như màu sắc, chiều cao, tên, v.v. và các **khả năng** (method) như nhảy, chạy, đấm, v.v. Đối tượng là cấu trúc dữ liệu hoàn hảo để lưu trữ loại thông tin này.👌

Giả sử bạn có sẵn 3 "loài" khác nhau và bạn muốn tạo 6 nhân vật khác nhau, mỗi loài 2 nhân vật.

Cách tạo các nhân vật là chỉ tạo thủ công các đối tượng bằng cách sử dụng các [nhân vật dấu ngoặc {},](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer) theo cách này:

```js
const alien1 = {
  name: 'Ali',
  species: 'alien',
  phrase: () => console.log("I'm Ali the alien!"),
  fly: () => console.log('Zzzzzziiiiiinnnnnggggg!!'),
};

const alien2 = {
  name: 'Lien',
  species: 'alien',
  sayPhrase: () => console.log('Run for your lives!'),
  fly: () => console.log('Zzzzzziiiiiinnnnnggggg!!'),
};

const bug1 = {
  name: 'Buggy',
  species: 'bug',
  sayPhrase: () => console.log("Your debugger doesn't work with me!"),
  hide: () => console.log("You can't catch me now!"),
};

const bug2 = {
  name: 'Erik',
  species: 'bug',
  sayPhrase: () => console.log('I drink decaf!'),
  hide: () => console.log("You can't catch me now!"),
};

const Robot1 = {
  name: 'Tito',
  species: 'robot',
  sayPhrase: () => console.log('I can cook, swim and dance!'),
  transform: () => console.log('Optimus prime!'),
};

const Robot2 = {
  name: 'Terminator',
  species: 'robot',
  sayPhrase: () => console.log('Hasta la vista, baby!'),
  transform: () => console.log('Optimus prime!'),
};
```

Tất cả các nhân vật đều có thuộc tính `name` và thuộc tính `species` và cả method **sayPhrase**. Hơn nữa, mỗi loài có một method chỉ thuộc về loài đó (ví dụ, người ngoài hành tinh alien có method **fly**).

Như bạn có thể thấy, một số dữ liệu được chia sẻ bởi tất cả các nhân vật, một số dữ liệu được chia sẻ bởi từng loài và một số dữ liệu là duy nhất cho từng nhân vật riêng lẻ.

Bạn hoàn toàn có thể truy cập các thuộc tính và method như thế này:

```js
console.log(alien1.name);
// output: "Ali"

console.log(bug2.species);
// output: "bug"

Robot1.sayPhrase();
// output: "I can cook, swim and dance!"

Robot2.transform();
// output: "Optimus prime!"
```

Vấn đề với điều này là nó không mở rộng quy mô tốt và rất dễ xảy ra lỗi. Hãy tưởng tượng rằng trò chơi của bạn có thể có hàng trăm nhân vật. Ae sẽ cần phải thiết lập thủ công các thuộc tính và method cho từng đứa một thì hơi căng!😵

Để giải quyết vấn đề này, bạn cần một cách lập trình khác để tạo các đối tượng và thiết lập các thuộc tính và phương thức khác nhau với một tập hợp các điều kiện. Và đó là các lớp **(class)**. 😉

Các lớp thiết lập một bản thiết kế để tạo các đối tượng với các thuộc tính và method được xác định trước. Bằng cách tạo một lớp, sau này bạn có thể **khởi tạo** các đối tượng từ lớp đó, nó sẽ kế thừa tất cả các thuộc tính và method mà lớp đó có.

Cấu trúc lại code trước đó của chúng mình, bạn có thể tạo các lớp cho từng loại nhân vật của bạn, như sau:

```js
class Alien {
  constructor(name, phrase) {
    this.name = name;
    this.phrase = phrase;
    this.species = 'alien';
  }
  // Đây sẽ là các method của đối tượng.
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
  sayPhrase = () => console.log(this.phrase);
}

class Bug {
  constructor(name, phrase) {
    this.name = name;
    this.phrase = phrase;
    this.species = 'bug';
  }
  hide = () => console.log("You can't catch me now!");
  sayPhrase = () => console.log(this.phrase);
}

class Robot {
  constructor(name, phrase) {
    this.name = name;
    this.phrase = phrase;
    this.species = 'robot';
  }
  transform = () => console.log('Optimus prime!');
  sayPhrase = () => console.log(this.phrase);
}
```

Và sau đó bạn có thể khởi tạo các nhân vật của mình từ các lớp đó như thế này:

```js
const alien1 = new Alien('Ali', "I'm Ali the alien!");
const alien2 = new Alien('Lien', 'Run for your lives!');
const bug1 = new Bug('Buggy', "Your debugger doesn't work with me!");
const bug2 = new Bug('Erik', 'I drink decaf!');
const Robot1 = new Robot('Tito', 'I can cook, swim and dance!');
const Robot2 = new Robot('Terminator', 'Hasta la vista, baby!');
```

Bạn sử dụng keyword "new" theo sau là tên class tương ứng và truyền cho nó các tham số tương ứng theo những gì đã được khai báo trong hàm tạo class.

Sau đó, một lần nữa, bạn có thể truy cập từng thuộc tính và method của các đó đối tượng như sau:

```js
console.log(alien1.name) 
// output: "Ali"

console.log(bug2.species) 
// output: "bug"

Robot1.sayPhrase() 
// output: "I can cook, swim and dance!"

Robot2.transform() 
// output: "Optimus prime!"
```

Điều tốt đẹp về cách tiếp cận này và việc sử dụng các class nói chung là bạn có thể sử dụng các "bản thiết kế" đó để tạo các đối tượng mới nhanh hơn và an toàn hơn so với việc bạn làm "thủ công".

Ngoài ra, code của bạn được tổ chức tốt hơn vì bạn có thể xác định rõ ràng từng thuộc tính và method đối tượng được định nghĩa (trong lớp). Và điều này làm cho những thay đổi hoặc điều chỉnh trong tương lai dễ thực hiện hơn nhiều.

### Một số điều cần lưu ý về các class:

Theo [định nghĩa này,](https://www.bookstack.cn/read/You-Dont-Know-JS-Get-Started-2nd/spilt.6.833b11649d196dea.md?wd=JS) hãy sử dụng các thuật ngữ chính thức hơn,

_"một class trong chương trình là định nghĩa về" loại" cấu trúc dữ liệu tùy chỉnh bao gồm cả dữ liệu và hành vi hoạt động trên dữ liệu đó. Các class xác định cách cấu trúc dữ liệu đó hoạt động, nhưng bản thân các lớp không phải là value cụ thể. Để có được một value cụ thể mà bạn có thể sử dụng trong chương trình, một class phải được khởi tạo (với keyword "new") một hoặc nhiều lần."_

*   Hãy nhớ rằng các class không phải là thực thể hoặc đối tượng thực tế. Các lớp là bản thiết kế hoặc khuôn mẫu mà bạn sẽ sử dụng để tạo ra các đối tượng thực tế.
*   Tên class được khai báo bằng chữ cái đầu tiên viết hoa và theo quy ước là camelCase. Keyword class tạo ra một hằng số, vì vậy nó không thể được định nghĩa lại sau đó.
*   Các lớp phải luôn có một method khởi tạo mà sau này sẽ được sử dụng để khởi tạo lớp đó. Một hàm tạo trong JavaScript chỉ là một hàm cũ đơn thuần trả về một đối tượng. Điều đặc biệt duy nhất về nó là, khi được gọi với từ key "new", nó sẽ gán prototype của nó là prototype của đối tượng được trả về. (Về **prototype** mình sẽ có bài viết chi tiết hãy đăng ký để đón xem nhé)
*   Keyword “**this**” trỏ đến chính class và được sử dụng để xác định các thuộc tính của class trong method khởi tạo.
*   Các method có thể được thêm vào bằng cách xác định tên hàm và code thực thi của nó.
*   JavaScript là một ngôn ngữ dựa trên **prototype** và bên trong các lớp JavaScript chỉ được sử dụng như một cú pháp. Điều này không tạo ra sự khác biệt lớn, nhưng bạn nên biết và ghi nhớ. Ae có thể đọc [bài viết này của mình nếu bạn muốn biết thêm về chủ đề này](https://tuan200tokyo.blogspot.com/2022/09/blog5-nguyen-mau-va-ke-thua-javascript.html) .  
    

Bốn nguyên tắc của OOP
======================

OOP thường được giải thích với 4 nguyên tắc chính và chúng quy định cách thức hoạt động của các chương trình theo hướng OOP🤓. Đó là tính **tính** **kế thừa, tính đóng gói, tính trừu tượng và tính đa hình**.

Tính kế thừa
------------

Kế thừa là khả năng **tạo các lớp dựa trên các lớp khác**. Với kế thừa, bạn có thể định nghĩa một **lớp cha** (với các thuộc tính và method nhất định), và sau đó **các lớp con** sẽ kế thừa từ lớp cha tất cả các thuộc tính và phương thức mà nó có.

Hãy xem điều này với một ví dụ. Hãy tưởng tượng tất cả các nhân vật mà bạn đã xác định trước đây sẽ là kẻ thù của nhân vật chính mà bạn đang điều khiển. Và với tư cách là kẻ thù, tất cả chúng đều sẽ có thuộc tính "power" và phương thức "attack".

Một cách để thực hiện điều đó sẽ chỉ là thêm các thuộc tính và method giống nhau vào tất cả các lớp mà bạn có, như sau:

```js
class Bug {
  constructor(name, phrase, power) {
    this.name = name;
    this.phrase = phrase;
    this.power = power;
    this.species = 'bug';
  }
  hide = () => console.log("You can't catch me now!");
  sayPhrase = () => console.log(this.phrase);
  attack = () => console.log(`I'm attacking with a power of ${this.power}!`);
}

class Robot {
  constructor(name, phrase, power) {
    this.name = name;
    this.phrase = phrase;
    this.power = power;
    this.species = 'robot';
  }
  transform = () => console.log('Optimus prime!');
  sayPhrase = () => console.log(this.phrase);
  attack = () => console.log(`I'm attacking with a power of ${this.power}!`);
}

const bug1 = new Bug('Buggy', "Your debugger doesn't work with me!", 10);
const Robot1 = new Robot('Tito', 'I can cook, swim and dance!', 15);

console.log(bug1.power); //output: 10
Robot1.attack();
// output: "I'm attacking with a power of 15!"
```

Nhưng bạn có thể thấy bạn đang lặp lại code và điều đó không tối ưu. Một cách tốt hơn sẽ là khai báo một lớp cha mẹ "**Enemy**" sau đó được **extends** bởi tất cả các loài kẻ thù, như thế này:

```js
class Enemy {
  constructor(power) {
    this.power = power;
  }

  attack = () => console.log(`I'm attacking with a power of ${this.power}!`);
}

class Alien extends Enemy {
  constructor(name, phrase, power) {
    super(power);
    this.name = name;
    this.phrase = phrase;
    this.species = 'alien';
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
  sayPhrase = () => console.log(this.phrase);
}
```

Vì class kẻ thù trông giống như bất kỳ lớp nào khác. Ae sử dụng method khởi tạo để nhận các tham số và gán chúng dưới dạng thuộc tính, và các method được khai báo giống như các hàm đơn giản khác.

Trên lớp con, bạn sử dụng keyword **extends** để khai báo lớp cha mà bạn muốn kế thừa. Khi đó trên method khởi tạo, bạn phải khai báo tham số "**power**" và sử dụng hàm **super** để chỉ ra thuộc tính đó được khai báo trên lớp cha.

Khi bạn khởi tạo các đối tượng mới, bạn chỉ cần truyền các tham số như chúng đã được khai báo trong hàm khởi tạo tương ứng.

Bây giờ bạn có thể truy cập các thuộc tính và phương thức được khai báo trong lớp cha.😎

```js
const alien1 = new Alien('Ali', "I'm Ali the alien!", 10);
const alien2 = new Alien('Lien', 'Run for your lives!', 15);

alien1.attack();
// output: I'm attacking with a power of 10!

console.log(alien2.power);
// output: 15
```

ú là là!😳😵😱 

Bây giờ, giả sử bạn muốn thêm một lớp cha mới để nhóm tất cả các nhân vật của bạn (bất kể chúng là kẻ thù hay không) và bạn muốn đặt thêm thuộc tính "**speed**" và method "**move**". Thì có thể làm điều đó như thế này:

```js
class Character {
  constructor(speed) {
    this.speed = speed;
  }

  move = () => console.log(`I'm moving at the speed of ${this.speed}!`);
}

class Enemy extends Character {
  constructor(power, speed) {
    super(speed);
    this.power = power;
  }

  attack = () => console.log(`I'm attacking with a power of ${this.power}!`);
}

class Alien extends Enemy {
  constructor(name, phrase, power, speed) {
    super(power, speed);
    this.name = name;
    this.phrase = phrase;
    this.species = 'alien';
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
  sayPhrase = () => console.log(this.phrase);
}
```

Đầu tiên bạn khai báo lớp cha "Character" mới. Sau đó, bạn mở rộng nó trên lớp Enemy. Và cuối cùng, bạn thêm tham số "**speed**" mới vào **constructor** và các hàm `super` trong lớp **Alien.**

Bạn khởi tạo việc truyền các tham số như mọi khi, và một lần nữa có thể truy cập các thuộc tính và phương thức từ lớp "**grandparent** " _._👴 Nhưng trong thực tế thì trên **lớp ông nội** còn có cả lớp **ông Cố, ông cụ, ông kỵ..**

```js
const alien1 = new Alien('Ali', "I'm Ali the alien!", 10, 50);
const alien2 = new Alien('Lien', 'Run for your lives!', 15, 60);

alien1.move();
// output: "I'm moving at the speed of 50!"

console.log(alien2.speed);
// output: 60
```

Bây giờ bạn đã biết thêm về kế thừa, hãy cấu trúc lại code của bạn để tránh lặp lại code càng nhiều càng tốt:

```js
class Character {
  constructor(speed) {
    this.speed = speed;
  }
  move = () => console.log(`I'm moving at the speed of ${this.speed}!`);
}

class Enemy extends Character {
  constructor(name, phrase, power, speed) {
    super(speed);
    this.name = name;
    this.phrase = phrase;
    this.power = power;
  }
  sayPhrase = () => console.log(this.phrase);
  attack = () => console.log(`I'm attacking with a power of ${this.power}!`);
}

class Alien extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = "alien";
  }
  fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!");
}

class Bug extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = "bug";
  }
  hide = () => console.log("You can't catch me now!");
}

class Robot extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = "robot";
  }
  transform = () => console.log("Optimus prime!");
}

const alien1 = new Alien("Ali", "I'm Ali the alien!", 10, 50);

const alien2 = new Alien("Lien", "Run for your lives!", 15, 60);

const bug1 = new Bug("Buggy", "Your debugger doesn't work with me!", 25, 100);

const bug2 = new Bug("Erik", "I drink decaf!", 5, 120);

const Robot1 = new Robot("Tito", "I can cook, swim and dance!", 125, 30);

const Robot2 = new Robot("Terminator", "Hasta la vista, baby!", 155, 40);
```

Bạn có nhận thấy rằng các lớp **Nhân vật** của bạn bây giờ trông nhỏ hơn nhiều, nhờ vào việc là bạn đã chuyển tất cả các thuộc tính và phương thức được chia sẻ sang một lớp cha chung. Đó là kiểu kế thừa hiệu quả phải không.😉

### Một số điều cần lưu ý về thừa kế:

*   Một lớp chỉ có thể có một lớp cha để kế thừa. bạn không thể **extends** nhiều lớp, mặc dù có nhiều cách để giải quyết vấn đề này.
*   Bạn có thể mở rộng string kế thừa bao nhiêu tùy thích, thiết lập các **lớp cha mẹ, ông bà,** **ông Cố, ông cụ, ông kỵ..**, v.v.
*   Nếu một lớp con kế thừa bất kỳ thuộc tính nào từ một lớp cha, trước tiên nó phải gán các thuộc tính cha gọi hàm **super()** trước khi gán các thuộc tính của chính nó.

Ví dụ:

```js
// Hoạt động bình thường:
class Alien extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = 'alien';
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
}

// Cái này sẽ bắn ra lỗi:
class Alien extends Enemy {
  constructor(name, phrase, power, speed) {
    this.species = 'alien';
    // Cái này phải đưa lên đầu tiên
    super(name, phrase, power, speed);
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
}
```

*   Khi kế thừa, tất cả các method và thuộc tính của cha mẹ sẽ được kế thừa bởi con cái. Ae không thể quyết định những gì sẽ thừa hưởng từ lớp cha (giống như bạn không thể chọn những đức tính và khuyết điểm mà bạn thừa hưởng từ cha mẹ của mình. 😅).
*   Các lớp con có thể ghi đè các thuộc tính và phương thức của lớp cha.

Để đưa ra một ví dụ, trong code trước của bạn, lớp **Alien** mở rộng lớp **Enemy** và nó kế thừa method **attack** ghi lại `I'm attacking with a power of ${this.power}!`:

```js
class Enemy extends Character {
  constructor(name, phrase, power, speed) {
    super(speed);
    this.name = name;
    this.phrase = phrase;
    this.power = power;
  }
  sayPhrase = () => console.log(this.phrase);
  attack = () => console.log(`I'm attacking with a power of ${this.power}!`);
}

class Alien extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = 'alien';
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
}

const alien1 = new Alien('Ali', "I'm Ali the alien!", 10, 50);
alien1.attack();
// output: I'm attacking with a power of 10!
```

Giả sử bạn muốn method **attack** thực hiện một điều khác trong lớp **Alien** của bạn. Thì có thể ghi đè nó bằng cách khai báo lại nó, như sau:

```js
class Enemy extends Character {
  constructor(name, phrase, power, speed) {
    super(speed);
    this.name = name;
    this.phrase = phrase;
    this.power = power;
  }
  sayPhrase = () => console.log(this.phrase);
  attack = () => console.log(`I'm attacking with a power of ${this.power}!`);
}

class Alien extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = 'alien';
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
  attack = () => console.log("Now I'm doing a different thing, HA!"); // Override the parent method.
}

const alien1 = new Alien('Ali', "I'm Ali the alien!", 10, 50);
alien1.attack();
// output:
// "Now I'm doing a different thing, HA!"
```

Tính đóng gói
-------------

Đóng gói là một khái niệm quan trọng khác trong OOP, và nó là viết tắt của khả năng "**decide**" thông tin nào mà nó đưa ra "**the outside**" và thông tin nào thì không. Việc đóng gói được thực hiện thông qua **các thuộc tính và phương thức public và private** .

Trong JavaScript, tất cả các thuộc tính và phương thức của đối tượng được **public** theo mặc định. "**public**" có nghĩa là bạn có thể truy cập **thuộc tính/method** của một đối tượng từ bên ngoài scope của nó:

```js
class Alien extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = 'alien';
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
}

// Here's our object
const alien1 = new Alien('Ali', "I'm Ali the alien!", 10, 50);

console.log(alien1.name);
// output: Ali

alien1.sayPhrase();
// output: "I'm Ali the alien!"
```

Để làm rõ hơn điều này, bạn hãy xem các thuộc tính và method **private** trông như thế nào.

Giả sử bạn muốn lớp **Alien** của mình có một thuộc tính **birthYear** và sử dụng thuộc tính đó để thực thi một method **howOld**, nhưng bạn không muốn thuộc tính đó có thể truy cập được từ bất kỳ nơi nào khác ngoài chính đối tượng. Thì có thể triển khai như thế này:

```js
class Alien extends Enemy {
  #birthYear;

  constructor(name, phrase, power, speed, birthYear) {
    super(name, phrase, power, speed);
    this.species = 'alien';
    this.#birthYear = birthYear;
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
  howOld = () => console.log(`I was born in ${this.#birthYear}`);
}

const alien1 = new Alien('Ali', "I'm Ali the alien!", 10, 50, 10000);
```

Đầu tiên bạn cần khai báo thuộc tính **private** bằng cách đăt ký hiệu **'#'** ở trước.

Sau đó, gán value của nó trong hàm khởi tạo

Sau đó, bạn có thể truy cập method **howOld**, như sau:

```js
alien1.howOld() 
// output: "I was born in 10000"
```

Nhưng nếu bạn cố gắng truy cập trực tiếp vào thuộc tính, bạn sẽ gặp lỗi. Và thuộc tính **private** sẽ không hiển thị nếu bạn in đối tượng ra màn hình.

```js
console.log(alien1.#birthYear) 
// This throws an error

console.log(alien1)
// output:
// Alien {
//     move: [Function: move],
//     speed: 50,
//     sayPhrase: [Function: sayPhrase],
//     attack: [Function: attack],
//     name: 'Ali',
//     phrase: "I'm Ali the alien!",
//     power: 10,
//     fly: [Function: fly],
//     howOld: [Function: howOld],
//     species: 'alien'
//   }
```

Tính năng đóng gói rất hữu ích trong những trường hợp bạn cần một số thuộc tính hoặc method cho hoạt động bên trong của đối tượng, nhưng bạn không muốn show nó ra bên ngoài. Việc có các thuộc tính/method **private** đảm bảo bạn không "**vô tình**" làm lộ thông tin mà bạn không muốn.

Tính Trừu tượng
---------------

Tính trừu tượng là một nguyên tắc nói rằng một lớp chỉ nên đại diện cho thông tin có liên quan đến bối cảnh của vấn đề. Đơn giản hơn thì, bạn chỉ instance ra bên ngoài các thuộc tính và phương thức mà bạn sẽ sử dụng. Nếu không cần thiết, đừng để lộ ra ngoài.

Nguyên tắc này có liên quan chặt chẽ đến tính đóng gói, vì bạn có thể sử dụng các **thuộc tính/method** **public** và **private** để quyết định những gì được hiển thị và những gì không.

Tính đa hình
------------

Sau đó là tính đa hình (nghe thật phức tạp phải không? Tên OOP là thú vị nhất ... 🙃). Đa hình có nghĩa là "**many forms**" và thực ra là một khái niệm đơn giản. Đó là khả năng của một method trả về các giá trị khác nhau theo các điều kiện nhất định.

Ví dụ, bạn thấy rằng lớp **Enemy** có method **sayPhrase**. Và tất cả các lớp loài của bạn đều kế thừa từ lớp **Enemy**, có nghĩa là tất cả chúng đều có method **sayPhrase**.

Nhưng bạn có thể thấy rằng khi bạn gọi method trên các loài khác nhau, bạn nhận được các kết quả khác nhau:

```js
const alien2 = new Alien('Lien', 'Run for your lives!', 15, 60);
const bug1 = new Bug('Buggy', "Your debugger doesn't work with me!", 25, 100);

alien2.sayPhrase();
// output: "Run for your lives!"
bug1.sayPhrase();
// output: "Your debugger doesn't work with me!"
```

Và đó là bởi vì bạn đã truyền cho mỗi lớp một tham số khác nhau khi khởi tạo. Đó là một loại đa hình, **dựa trên tham số**. 👌

Một loại đa hình khác là **dựa trên kế thừa** và điều đó đề cập đến khi bạn có một lớp cha có sẵn một method và sau đó lớp con ghi đè method đó để sửa đổi nó theo một cách nào đó. Ví dụ bạn đã thấy trước đây cũng áp dụng hoàn hảo ở đây:

```js
class Enemy extends Character {
  constructor(name, phrase, power, speed) {
    super(speed);
    this.name = name;
    this.phrase = phrase;
    this.power = power;
  }
  sayPhrase = () => console.log(this.phrase);
  attack = () => console.log(`I'm attacking with a power of ${this.power}!`);
}

class Alien extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = 'alien';
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
  attack = () => console.log("Now I'm doing a different thing, HA!");
}

const alien1 = new Alien('Ali', "I'm Ali the alien!", 10, 50);

alien1.attack();
// output: "Now I'm doing a different thing, HA!"
```

Việc triển khai này là đa hình vì nếu bạn xét method attack trong lớp Alien, thì vẫn có thể gọi nó trên đối tượng:

```js
alien1.attack() 
// output: "I'm attacking with a power of 10!"
```

Bạn có cùng một method có thể thực hiện điều này hay điều khác tùy thuộc vào việc nó có bị ghi đè hay không. Đa hình.👌👌

Object Composition
==================

[Object Composition](https://en.wikipedia.org/wiki/Composition_over_inheritance) là một kỹ thuật hoạt động như một sự thay thế cho sự kế thừa.

Khi bạn nói về kế thừa, bạn đã đề cập rằng các lớp con luôn kế thừa tất cả các method và thuộc tính cha. Chà, bằng cách sử dụng **Object Composition**, bạn có thể gán các thuộc tính và phương thức cho các đối tượng theo cách linh hoạt hơn mức kế thừa cho phép, vì vậy các đối tượng chỉ nhận được những gì chúng cần và không có gì khác.

Bạn có thể thực hiện điều này khá đơn giản, bằng cách sử dụng các hàm nhận đối tượng như một tham số và gán cho nó **thuộc tính/phương thức** mong muốn. 

Xem nó trong một ví dụ là rõ ngay.

Giả sử bây giờ bạn muốn thêm khả năng bay cho các nhân vật của bạn. Như bạn đã thấy trong code của mình, chỉ có người ngoài hành tinh mới có method fly này. Vì vậy, một tùy chọn có thể là sao chép cùng một phương thức trong lớp **Bug**:

```js
class Alien extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = 'alien';
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
}

class Bug extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = 'bug';
  }
  hide = () => console.log("You can't catch me now!");
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!'); // Bị lặp code
}
```

Một tùy chọn khác là di chuyển method **fly** lên lớp **Enemy**, để nó có thể được kế thừa bởi cả lớp `Alien` và `Bug`. Nhưng điều đó cũng làm cho method có sẵn cho các lớp không cần nó, chẳng hạn như `Robot`.

```js
class Enemy extends Character {
  constructor(name, phrase, power, speed) {
    super(speed);
    this.name = name;
    this.phrase = phrase;
    this.power = power;
  }
  sayPhrase = () => console.log(this.phrase);
  attack = () => console.log(`I'm attacking with a power of ${this.power}!`);
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
}

class Alien extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = 'alien';
  }
}

class Bug extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = 'bug';
  }
  hide = () => console.log("You can't catch me now!");
}

class Robot extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = 'robot';
  }
  transform = () => console.log('Optimus prime!');
  // Mình không cần bay
}
```

Như bạn có thể thấy, kế thừa gây ra vấn đề khi bạn có cho các lớp của mình thay đổi (điều này trong thế giới thực luôn luôn xảy ra). **Object Composition** đề xuất một cách tiếp cận trong đó các đối tượng chỉ được gán các thuộc tính và phương thức khi chúng cần.

Trong ví dụ của bạn thì có thể tạo một hàm và trách nhiệm duy nhất của nó là thêm method bay vào bất kỳ đối tượng nào nhận dưới dạng tham số:

```js
const bug1 = new Bug('Buggy', "Your debugger doesn't work with me!", 25, 100);

const addFlyingAbility = (obj) => {
  obj.fly = () => console.log(`Now ${obj.name} can fly!`);
};

addFlyingAbility(bug1);
bug1.fly();
// output: "Now Buggy can fly!"
```

Và bạn có thể có các chức năng rất giống nhau cho **power** hoặc khả năng khác mà bạn muốn quái vật của mình có.

Bạn chắc chắn có thể thấy, cách tiếp cận này linh hoạt hơn rất nhiều so với việc có các lớp cha với các thuộc tính và method cố định để kế thừa. Bất cứ khi nào một đối tượng cần một method, bạn chỉ cần gọi hàm tương ứng và thế là xong.👌

Đây là [một video hay so sánh tính kế thừa với Object Composition](https://www.youtube.com/watch?v=wfMtDGfHWpA&t=3s) .

Cuối cùng
=========

OOP là một mô hình lập trình rất mạnh mẽ có thể giúp bạn giải quyết các dự án lớn bằng cách tạo ra sự trừu tượng của các thực thể. Mỗi thực thể sẽ chịu trách nhiệm về một số thông tin và hành động nhất định và các thực thể sẽ có thể tương tác với nhau, giống như cách hoạt động của thế giới thực.

Trong bài này, bạn đã tìm hiểu về các khái niệm như **lớp, kế thừa, đóng gói, trừu tượng, đa hình** và **Object Composition**. Đây là tất cả các khái niệm chính trong OOP. Và bạn cũng đã thấy nhiều ví dụ khác nhau về cách **OOP** có thể được triển khai trong **JavaScript**.

Như mọi khi, mình hy vọng bạn thích bài viết này và học được điều gì đó mới. 

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy thích blog của mình thì nhấn theo dõi để ủng hộ mình nhé. Thank you.😉

# Ref
https://tuan200tokyo.blogspot.com/2022/09/blog4-oop-lap-trinh-huong-oi-tuong.html