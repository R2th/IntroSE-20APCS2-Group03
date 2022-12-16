**Chắc hẳn 500ae đã từng học qua hướng đối tượng với ngôn ngữ lập trình như C, Java, nhưng có lúc nào các bạn thắc mắc Javascript có phải là ngôn ngữ hướng đối tượng ko?**

Theo mình, Javascript không phải là một ngôn ngữ hướng đối tượng dựa vào lớp (class) như C, Java, ... Nhưng có cách để làm việc để làm việc hướng đối tượng với nó.

Trong hướng dẫn này mình sẽ giải thích OOP và làm thế nào để bạn có thể dùng nó.

Theo [Wikipedia](https://en.m.wikipedia.org/wiki/Class-based_programming),  ngôn ngữ lập trình dựa vào lớp (class-based) là:

```
a style of Object-oriented programming (OOP) in which inheritance occurs via defining classes of objects, instead of inheritance occurring via the objects alon
```
Mô hình phổ biến của OOP là class-based. Nhưng như đã nói ở trên, Javascript không phải ngôn ngữ class-based, nó là ngôn ngữ prototype-based.

Theo tài liêu trên trang chủ Mozilla:
```
A prototype-based language has the notion of a prototypical object, an object used as a template from which to get the initial properties for a new object.
```
Để hiểu hơn, các bạn theo dõi đoạn code này
```
let names = {
    fname: "Hung",
    lname: "Phan"
}
console.log(names.fname);
console.log(names.hasOwnProperty("mname"));
```
Chúng ta để thấy trong object ``names`` có 2 thuộc tính là ``fname`` và ``lname``, không có ``phương thức`` nào cả.

Vậy ``hasOwnProperty`` lấy từ đâu ra ?
 
 Hãy cùng ``console.log(names)`` để tìm hiểu nào.
 
 ![](https://images.viblo.asia/983f6809-0be4-4fdf-9021-56e149b3c69e.png)
 
Hãy chú ý vào ``__proto__`` . và mở nó ra xem nhé:

![](https://images.viblo.asia/01d763d4-e621-4ea2-bf73-48d651a492dd.png)

Bạn sẽ nhìn thấy một tập hợp các thuộc tính ở dưới ``Object`` ``contructor``, và nhìn kĩ, bạn sẽ thấy thuộc tính ``hasOwnProperty`` được ẩn đi mà chúng ta có thể gọi ra.
Nói cách khác, tất cả các object có quyền truy cập vào các thuộc tính của ``__proto__`` nhưng lại ko sở hữu chúng.

#### Những thuộc tính ``__proto__``
Đây là thuộc tính trên mọi đối tượng cho truy cập vào thuộc tính nguyên thuỷ của Object.

Mọi đối tượng đều mặc định có thuộc tính này.

#### Sửa đổi thuộc tính ``__proto__``
Thuộc tính ``__proto__`` có thể sửa đổi, sau đây là các cách giúp chúng ta làm điều đó
###### ``Object.create()``
```
function DogCreate(name, age) {
    let dog = Object.create(DogContructor);
    dog.name = name;
    dog.age = age;
}

let DogContructor = {
    speak: function() {
        return 'gau gau'
    }
}

const dog = DogCreate('Kiki', 5);
```

Bây giờ hãy ``log`` nó ra xem nhé:

![](https://images.viblo.asia/76d167c8-383e-4a59-b33a-851bb0bbd40d.png)

``Object.create()`` dùng đối số truyền vào của nó để làm prototype.

###### ``new`` từ khoá

```
function DogCreate(name, age) {
    this.name = name;
    this.age = age;
}

DogCreate.prototype.speak = function() {
    return 'gau gau'
}

const dog = new DogCreate('Kiki', 5);
```

prototype của ``dog`` được điều khiển bởi prototype của ``DogCreate``. Nhưng nên nhớ, DogCreate cũng là một Object do đó nó cũng có một ``__proto__``.
#### Class

Javascript giới thiêu keyword ``class`` trong ES6. Nó làm chúng ta trông giống ngôn ngữ hướng đối tượng hơn. Nó vẫn tạo các ``__proto__`` ngầm, chỉ hình thức thì giống OOP.
Chúng ta cùng xem nó làm như thế nào nhé
```
class Animals {
    constructor(name, specie) {
        this.name = name;
        this.specie = specie;
    }
    sing() {
        return `${this.name} can sing`;
    }
    dance() {
        return `${this.name} can dance`;
    }
}
let bingo = new Animals("Bingo", "Hairy");
console.log(bingo);
```

![](https://images.viblo.asia/30e5aa1c-a18f-41a8-b0b8-bea8317015f1.png)

``__proto__`` sẽ tham chiếu đến prototype của ``Animals`` . Từ đó , chúng ta có thể thấy hàm khởi tạo và các hàm chức năng chính nằm gọn trong ``__proto__`` (``contructor()``, ``sing()``, ``dance()``).

#### Kết luận
Thật thú vị phải không nào, trên đây là một số chia sẽ của mình về ngôn ngữ Javascript, cảm ơn các bạn đã theo dõi.

Bài viết có tham khảo: [Chuyên sâu Javascript](https://www.freecodecamp.org/news/how-javascript-implements-oop/)