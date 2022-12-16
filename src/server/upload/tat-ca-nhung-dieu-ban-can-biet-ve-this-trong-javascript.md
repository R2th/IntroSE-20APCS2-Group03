# Tất cả những điều bạn cần biết về “This” trong Javascript

##  1.Đặt vấn đề

 Mình thấy có rất nhiều bạn cảm thấy từ khoá this trong javascript rất khó nắm bắt, khó làm quen và tiếp cận cho dù các bạn cũng đã tìm các bài viết, video trên mạng giải thích về từ khoá này, nhưng trong nhiều trường hợp, các bạn vẫn không hiểu và giải thích được vì sao this lại trả về giá trị này thay vì giá trị kia,… @.@. Vậy nên, hôm nay mình quyết định sẽ viết một bài ghi chú đầy đủ những gì các bạn cần biết về this trong js.
>
## 2.Một số thuật ngữ được sử dụng trong bài viết

### Constructure function:

 Tương tự với class trong các ngôn ngữ OOP, hướng đối tượng, được sử dụng để khởi tạo các object có chung một đặc điểm. Có điều là, bất cứ function nào trong js (trừ arrow function – cái mình sẽ nói sau ở phần lưu ý) cũng có thể trở thành một constructure function.
> 
### Method:

Các bạn có thể hiểu một method là một function của một object.

### 1. Okay, vậy this là gì ?

Rất ngắn gọn !

this chỉ đơn giản là một biến và biến này trả về object gần nhất chứa nó.
```

// *** constructor function
function ConstFunc() {
    return this;
}
 
console.log(ConstFunc()); // *** => trả về window
console.log(new ConstFunc()); // *** => trả về obj
```

Chúng ta hãy cùng phân tích ví dụ trên nhé. Ở ví dụ trên, mình có tạo một constructor function tên là ConstFunc, function này khi chạy sẽ trả về biến this khi nó được chạy.

1. Ở lần chạy thứ 1, this trả về window do object gần nhất chứa từ khoá this khi này là window.
1. Ở lần chạy thứ 2, do mình đã khởi tạo một object từ ConstFunc, nên object gần nhất chứa this lúc này là ConstFunc chứ không còn là window nữa.

![](https://images.viblo.asia/0f76916f-3bdc-4a9e-a7a0-29edb068003e.JPG)

Khá là rắc rối phải không 😅😅😅, bây giờ mọi người hãy cùng xem tiếp các mục dưới đây để hiểu hơn về những gì mình viết nhé.
### 1. This trả về window (global object)

Nếu các bạn chưa biết thì tất cả code của ta viết đều được bao bởi window ( global object ), nên khi ta gọi this mà nó không được bao bởi một object khác thì this sẽ trả về window.

```
console.log(this); // *** trả về window
 
function func() { 
    console.log(this);
}
 
func(); // *** trả về window
 
```

### 2. This trả về một object khác window

Như mình đã nói thì this sẽ trả về gần nhất chứa nó, điều này cũng đúng khi this được đặt bên trong một method của một object.

```
 
// *** this nằm bên trong một method của một object
const obj = {
    method: function() {
        return this;
    }
}
 
console.log(obj.method()); // *** this sẽ trả về obj
```

```
 
// *** this nằm bên trong một object được khởi tạo từ một constructor function
function ConstFunc() {
    return this;
}
 
console.log(new ConstFunc()); // *** => trả về obj
```

### 4. This trong các Event

This trong các event sẽ trả về element được đính kèm với event đó.

```

document.getElementById("btn").onclick = function() {
    console.log(this); // *** => <div id="test">test</div> (html element)
};
```

### 5. Lưu ý

### Strict mode
Nếu ta dùng strict mode thì this trong các function sẽ trả về undefined (trừ method).

```
"use strict"
 
function func() {
    return this;
}
 
console.log(func()); // *** this sẽ trả về undefined
```

```
"use strict"
 
const obj = {
    method: function() {
        return this;
    }
}
 
console.log(obj.method()); // *** this của method vẫn sẽ trả về obj
```

### Arrow function

Giá trị mà this nằm trong một arrow function trả về sẽ được kế thừa từ this của function/method, nơi mà arrow function đó được khai báo chứ không còn trả trả về object gần nhất chứa nó nữa. Trong trường hợp một arrow function không được khai báo bên trong bất kỳ một function nào, thì this của arrow function đó sẽ trả về window.

```
const obj = {
    methoddd: function() {
        console.log(this); // *** trả về obj
        
        const arrowFunc = () => {
            console.log(this);
       }
       arrowFunc(); // *** arrowFunc đc khai báo bên trong method methoddd
                    //     nên giá trị this của arrowFunc sẽ được kế thừa từ this của methoddd
                    //     và trả về obj
    }
}
 
console.log(obj.methoddd());
 
```

```
const arrowFunc = () => {
    console.log(this); // *** giá trị của this của arrowFunc lần này sẽ là window
}
 
const obj = {
    methoddd: function() {
        console.log(this); // *** trả về obj
        
       arrowFunc(); // *** this lần này sẽ trả về window do arrowFunc không còn được 
                    //     khai báo bên trong methoddd nữa
    }
}
 
console.log(obj.methoddd());
```

> Có một lưu ý nữa về arrow function mà mình muốn chia sẻ với các bạn đó là vì this của arrow function sẽ trả về undefined nếu như nó không được khai báo bên trong bất kỳ một function nào, nên arrow function không bao giờ được sử dụng để làm constructure function hay method của một object được khởi tạo bằng object initializer (các bạn cứ hiểu cái này nghĩa là các object được khai báo như thế này nhé: var obj = { ... })😅😅😅.

```
// *** dùng arrow function làm constructure function
const Human = (name, age) => {
    this.name = name;
    this.age = age;
}
 
const man = new Human('Hunq', 20); // *** => Uncaught TypeError: Human is not a constructor
```

```
/ *** dùng arrow function làm method của một object được khởi tạo bằng object inintializer
const obj = {
    method: () => this
}
 
console.log(obj.method()) // *** => this của method sẽ trả về window vì trên thực tế,
                          //     method đang được khai báo độc lập (không nằm trong bất cứ function nào)
 
```
### Lời kết
Trong bài viết này, mình không liệt kê ra các trường hợp cụ thể mà các bạn phải nhớ khi sử dụng this như trong các bài viết khác để đem đến cho mọi người có một các nhìn khác về từ khóa này. Qua bài viết này, mình mong mọi người có thể thực sự hiểu và làm chủ được this mà không phải học thuộc hay nhớ bất cứ trường hợp nào của this nhé. Chúc các bạn một ngày tốt lành. Cheers!