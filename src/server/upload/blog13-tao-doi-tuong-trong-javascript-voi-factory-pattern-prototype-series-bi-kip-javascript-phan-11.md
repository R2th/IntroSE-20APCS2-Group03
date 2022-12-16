![image.png](https://images.viblo.asia/500e1e59-b1bf-40ae-a7b6-c08b93e5becb.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

JavaScript là một ngôn ngữ lập trình dễ học. Thật dễ dàng để viết các chương trình bằng Javascript. Tuy nhiên, thật khó để giải thích tất cả các trường hợp sử dụng và viết **robust JavaScript code**.

Trong bài viết này, chúng ta sẽ xem xét một số best practices để viết **robust JavaScript code**.

Sử dụng các Factory Functions
=============================

Factory Function là các hàm trả về một instance mới của một hàm khởi tạo hoặc một lớp.

Chúng ta có thể sử dụng chúng để tạo các đối tượng mà không cần viết bất kỳ code nào với `new` keyword để khởi tạo các lớp hoặc constructor.

Các constructor thường là một phần khó hiểu của JavaScript và chắc chắn chúng ta có thể tránh nếu muốn.

Ví dụ, chúng ta có thể tạo factory functions của riêng mình như sau:

```js
const createPerson = (firstName, lastName) => {
  return {
    firstName,
    lastName,
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  };
};
```

Trong đoạn code trên, chúng ta có hàm factory **createPerson** lấy tham số `firstName` và `lastName` và trả về một đối tượng với `firstName`, `lastName` và `fullName` hàm.

Chúng ta đã sử dụng một **arrow function** để không bị nhầm lẫn với giá trị của `this` trong đối tượng trả về. Vì các arrow function không liên kết với `this`, nên chúng ta biết rằng **value** của `this** trong` `fullName` là đối tượng được trả về.

**Factory functions** có thể trả về các đối tượng bằng bất cứ thứ gì, vì vậy khả năng là vô tận.

Để sử dụng factory functions **createPerson** của chúng ta, chúng ta có thể viết code sau:

```js
const person = createPerson("Jane", "Smith");
const fullName = person.fullName();
```

Chúng ta đã tạo một đối tượng **person** với hàm **createPerson** và sau đó gọi hàm **fullName** trên đó.

Sau đó, chúng ta nhận được `fullName` là 'Jane Smith' vì `this` tham chiếu đối tượng **person**.

Nhiều hàm JavaScript giống như `Number` và `Boolean` là các **Factory functions**. Chúng lấy bất kỳ đối tượng nào làm đối số và sau đó trả về **Number** hoặc **Boolean**, tương ứng.

Nó làm cho code JavaScript của chúng ta mạnh mẽ hơn vì chúng ta không phải lo lắng về các trường hợp **class** hoặc **constructor**. Chúng ta chỉ cần suy nghĩ về các **objects** và **composing functions**.

**Composing functions** làm cho code có thể tái sử dụng và test được nhiều hơn...

Tạo Instance Hàm cho Constructors bằng cách đính kèm vào thuộc tính Prototype
=============================================================================

Khi chúng ta muốn tạo các hàm instance của một **constructor**, chúng ta nên gắn các hàm vào thuộc tính **prototype** của constructor.

Bằng cách này, khi chúng ta khởi tạo hàm **constructor**, chúng ta cũng có thể gọi các hàm trên **instance**.

Một hàm được gắn trực tiếp vào hàm là một hàm tĩnh được chia sẻ bởi tất cả các hàm.

Ví dụ, chúng ta có thể thêm các hàm instance vào một phương thức khởi tạo bằng cách gắn nó vào thuộc tính **prototype** của nó như sau:

```js
const Fruit = function (name) {
  this.name = name;
};
Fruit.prototype.grow = function () {
  console.log(`${this.name} grew.`);
};
```

Trong đoạn code trên, chúng ta đã tạo một constructor `Fruit` trả về một `Fruit` instance. Sau đó, chúng ta thêm hàm instance `grow` bằng cách dùng **prototype**:

```js
Fruit.prototype.grow = function () {
  console.log(`$ {this.name} grow.`);
};
```

Sau đó, khi chúng ta khởi tạo nó như sau:

```js
const fruit = new Fruit("apple");
fruit.grow();
```

Các hàm **instance** đóng gói các hàm bên trong hàm khởi tạo **instance**, ngăn nó tiếp xúc với code bên ngoài và cho phép nó thực hiện các thay đổi ngẫu nhiên.

Do đó, điều này làm cho code của chúng ta mạnh mẽ hơn. Ngoài ra, mỗi hàm khởi tạo đều có trách nhiệm riêng vì nó có hàm instance riêng. Điều này ngăn không cho nhiều constructor thực hiện những việc khác nhau cho cùng một đối tượng.

```js
const Fruit = function (name) {
  this.name = name;
  this.grow = function () {
    console.log(`${this.name} grew.`);
  };
};
```

Phương án thay thế (ở trên) tạo một bản sao của hàm **grow** cho mỗi **instance**. Hàm không được lưu trong bộ nhớ cache, vì vậy sẽ chậm hơn khi sử dụng hàm đính kèm phiên bản theo cách này.

Sử dụng thuộc tính .type để tạo các Factory Functions có thể tạo nhiều loại đối tượng
=====================================================================================

Vì các Factory Function có thể được tạo, chúng ta có thể tạo một factory function có thể tạo nhiều loại đối tượng.

Chúng ta có thể phân biệt giữa chúng với thuộc tính **type**, đây là một cách thông thường để phân biệt giữa các loại đối tượng khác nhau mà chúng ta muốn tạo.

Để thực hiện việc này, chúng ta có thể viết đoạn code sau:

```js
const createDog = (name, breed) => {
  return {
    name,
    breed,
  };
};
const createCat = (name, breed) => {
  return {
    name,
    breed,
  };
};
const createPet = (type, name, breed) => {
  if (type === "cat") {
    return createCat(name, breed);
  } else if (type === "dog") {
    return createDog(name, breed);
  } else {
    throw new Error("invalid type");
  }
};
```

Trong đoạn code trên, chúng ta có hàm factory **createPet** gọi hàm `createDog` hoặc `createCat` hàm factory tùy thuộc vào loại (**type**) của pet mà chúng ta truyền vào `createPet`.

Chúng ta cũng tạo ra các hàm factory bằng cách gọi một hàm factory bên trong hàm factory createPet.

Bây giờ chúng ta chỉ cần lo lắng về một hàm factory (`createPet`) thay vì sử dụng nhiều hàm factory để tạo các loại đối tượng khác nhau. Điều này che giấu sự phức tạp đằng sau code và do đó ít có nguy cơ phá vỡ mọi thứ hơn khi chúng ta thực hiện thay đổi.

Kết luận
========

Với các factory function, chúng ta có thể tạo chúng để tạo các đối tượng mới. Chúng ta cũng có thể soạn chúng và gọi những cái khác nhau trong một factory functions để làm những việc khác nhau.

Khi chúng ta có một hàm khởi tạo, chúng ta nên đính kèm các phương thức instance vào thuộc tính **prototype** của constructor để chúng không phải được tạo lại mọi lúc.

Như mọi khi, mình hy vọng bạn thích bài viết này và học được điều gì đó mới. 

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy thích blog của mình thì nhấn theo dõi để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog13-tao-oi-tuong-trong-javascript.html