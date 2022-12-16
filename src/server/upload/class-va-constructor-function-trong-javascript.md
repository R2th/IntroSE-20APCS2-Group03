Trong Javascript, muốn khởi tạo 1 thực thể (instance object), ta sẽ bắt đầu với việc xây dựng 1 bản khuôn mẫu (constructor) và sau đó sử dụng từ khóa `new`.

Bản khuôn mẫu đó, có thể là 1 constructor function (cách cũ) hoặc 1 class (từ ECMAScript 2015).

Ví dụ:

**Cách 1**: Dùng constructor function:

```javascript
// Tạo các thuộc tính (property)
function Dog(name, color, type) {
    this.name = name;
    this.color = color;
    this.type = type
}
// Thêm vào các phương thức (method)
Dog.prototype.bark = function () {
    console.log(`${this.name} barks: Go Go Go`)
}

// Khởi tạo 1 instance object
let milu = new Dog('Milu','Black','Becgie');

milu.bark() // Milu barks: Go Go Go
```

**Cách 2**: Dùng Class

```javascript
class Dog {
    // Tạo các thuộc tính (property)
    constructor(name, color, type) {
        this.name = name;
        this.color = color;
        this.type = type
    }

    // Thêm vào các phương thức (method)
    bark() {
        console.log(`${this.name} barks: Go Go Go`)
    }
}

let milu = new Dog('Milu', 'Black', 'Becgie');

milu.bark() // Milu barks: Go Go Go
```

Nhưng đôi khi, mình cũng bắt gặp 1 cách khởi tạo khác:

**Cách 3**:

```javascript
function Dog(name, color, type) {
    this.name = name;
    this.color = color;
    this.type = type

    this.bark = function () {
        console.log(`${this.name} barks: Go Go Go`)
    }
}

let milu = new Dog('Milu', 'Black', 'Becgie');

milu.bark() // Milu barks: Go Go Go
```

Vậy thì 3 cách làm này có gì giống và khác nhau. Cách làm nào là tiện và chuẩn nhất?

Để trả lời thì chúng ta hiểu rõ điều gì đã xảy ra khi sử dụng từ khóa `new`

Khi dùng `new` để tạo 1 instance object thì xảy ra lần lượt những thứ sau:

1. Tạo một Object mới, trống rỗng
2. Trỏ thuộc tính [[Prototype]] (aka `.__proto__`) của Object rỗng này tới thuộc tính `.prototype` của constructor function
3. Thực hiện constructor function, với giá trị `this` được gán là chính Object rỗng vừa tạo
4. Kết thúc hàm, trả về Object mới vừa tạo nếu như constructor function không trả về 1 non-null Object. Còn nếu có thì sẽ trả về non-null Object đó

Hãy thử kiểm chứng bằng cách thực hiện lần lượt các bước trên để khởi tạo 1 instance object
```javascript
// Vẫn là constructor function con chó:
function Dog(name, color, type) {
    this.name = name;
    this.color = color;
    this.type = type
}
Dog.prototype.bark = function () {
    console.log(`${this.name} barks: Go Go Go`)
}

// 1. Tạo một Object mới, trống rỗng
let milu = {}

// 2. Trỏ thuộc tính [[Prototype]] (aka `.__proto__`) của Object rỗng này tới thuộc tính `.prototype` của constructor function
milu.__proto__ = Dog.prototype

// 3. Thực hiện constructor function, với giá trị this được gán là chính Object rỗng vừa tạo
Dog.call(milu,'Milu','Black','Becgie')

// 4. Kết quả chúng ta có 1 instance object là milu "được tạo ra thủ công"
console.log(milu)
milu.bark()
```

Quy trình trên thể hiện rằng: **instance object kế thừa các methods từ .prototype của constructor function hoặc class. Còn các properties sẽ có được bằng cách thực hiện constructor function với giá trị của** `this` **chính là instance object đó**.

Đây là điểm làm nên sự khác biệt giữa **Cách 1** và **Cách 3**. Ở **Cách 3**, các phương thức được thêm thẳng vào instance object. Do đó nếu thay đổi `.prototype` của constructor function thì các phương thức được thêm trực tiếp như vậy sẽ không thay đổi.

```javascript
function Dog(name, color, type) {
    this.name = name;
    this.color = color;
    this.type = type

    this.bark = function () {
        console.log(`${this.name} barks: Go Go Go`)
    }
}

let milu = new Dog('Milu', 'Black', 'Becgie');

// Thay đổi ở .prototype:
Dog.prototype.bark = function () {
    console.log(`${this.name} barks: Meo meo meo`)
}

milu.bark() // Vẫn sủa go go
```

Vậy **Cách 1** có khác **Cách 2** không? Câu trả lời là không khác gì ngoài cú pháp viết. Instance object được tạo bằng **Cách 1** hay **Cách 2** đều sẽ kế thừa methods từ `.prototype` của bản gốc, với các properties (và giá trị của từng properties) có được bằng cách thực thi constructor function. 

Dễ thấy trong **Cách 2**, không có từ gì liên quan đến .prototype. Tuy nhiên bản chất là tất cả các methods được khai báo trong 1 class đều đã được thêm vào .prototype của class đó. Việc sử dụng cú pháp `class` sẽ tiện lợi hơn, gọn gàng dễ hiểu hơn, nhưng cũng sẽ bớt tường minh hơn.

Dù vậy, vấn đề vẫn chưa dừng ở đó. Từ khóa `this` cùng sự xuất hiện của `arrow function` khiến mọi thứ phức tạp hơn một chút.

Thử viết lại việc khai báo methods ở **Cách 1** và **Cách 3**, sử dụng `arrow function` như sau:

**Cách 1**

```javascript
function Dog('name', 'color', 'type') {
    ....
}

Dog.prototype.bark = () => {
    console.log(`${this.name} barks: Go Go Go`)
}

let milu = new Dog()
milu.bark() // undefined barks: Go Go Go
```
**Cách 3**

```javascript
function Dog('name', 'color', 'type') {
    ....

    this.bark = () => {
        console.log(`${this.name} barks: Go Go Go`)
    }
}

let milu = new Dog()
milu.bark() // Milu barks: Go Go Go
```

Tại sao **Cách 3** lại hoạt động đúng, còn **Cách 1** lại không?

Lí do là bởi `arrow function` không tự define `this`, mà sẽ quay ngược lại tìm giá trị của `this` tại thời điểm `arrow function` được khai báo. Với **Cách 1**, tại thời điểm khai báo, `this` có giá trị là `global` hoặc `window`, do đó `this.name` là `undefined`. Trong khi đó với **Cách 3**, thời điểm khai báo chính là **Bước 3** khi từ khóa `new` làm việc, tại đó `this` được gán giá trị chính là object `milu` rồi. Do đó cách 3 sẽ hoạt động đúng.

Còn với việc khai báo bằng `class` (**Cách 2**) thì sẽ không cần quan tâm vấn đề này, do nó không sử dụng `arrow function`.

Kết luận: Cú pháp `class` tiện lợi hơn nhiều khi lập trình hướng đối tượng trong Javascript. Nếu bạn vẫn quyết định sử dụng các cú pháp cũ, cần nắm rõ nguyên tắc kế thừa bằng prototype và cách sử dụng `this`.

-----


Tham khảo:  
https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Classes <br>
https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Operators/new <br>
https://www.taniarascia.com/understanding-classes-in-javascript/