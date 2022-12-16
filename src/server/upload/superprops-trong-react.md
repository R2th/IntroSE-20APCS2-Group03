Điều này không quan trọng khi bạn sử dụng React hiệu quả nhưng bạn sẽ cảm thấy chúng thú vị hoặc muốn tìm hiểu sâu hơn về cách hoạt động.

## Về super

Nếu như bạn đã code react thì chắc bạn đã sử dụng `super(props)`, thế bạn có hiểu về chúng?

```javascript
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOn: true };
  }
  // ...
}
```

Trong javascript, `super` sẽ refers đến hàm khởi tạo của class cha (parent class constructor). Ví dụ ở trên nó đang trỏ đến **React.Component**

Điều quan trọng là bạn không thể sử dụng `this` ở trong contructor cho tới khi bạn gọi parent constructor.

```javascript
class Checkbox extends React.Component {
  constructor(props) {
    // 🔴 Can’t use `this` yet
    super(props);
    // ✅ Now it’s okay though
    this.state = { isOn: true };
  }
  // ...
}
```

Để cho dễ giải thích tại sao nó phải gọi parent constructor trước khi có thể sử dụng **this** thì hãy xem xét một ví dụ dưới đây:

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}

class PolitePerson extends Person {
  constructor(name) {
    this.greetColleagues(); // 🔴 This is disallowed, read below why
    super(name);
  }
  greetColleagues() {
    alert("Good morning folks!");
  }
}
```

Tỷ dụ như chúng ta được sử dụng biến **this** ở đây, một thời gian sau tôi thay đổi một chút ở hàm `greetColleagues()` như sau:

```javascript
greetColleagues() {
    alert('Good morning folks!');
    alert('My name is ' + this.name + ', nice to meet you!');
  }
```

Nhưng bạn quên rằng `this.greetColleagues()` được gọi trước `super()` vì thế mà cái `this.name` nó không biết là cái nào hay nói cách khác thì `this.name` chưa được định nghĩa. Để tránh như vật thì JavaScript yêu cầu bạn phải gọi **super** ở đầu tiên là vì thế.

```javascript
constructor(props) {
    super(props);
    // ✅ Okay to use `this` now
    this.state = { isOn: true };
  }
```

## Tại sao lại truyền vào props?

Điều gì sẽ xảy ra khi bạn truyền tham số **props** vào `super()`? **React.Component** sẽ khởi tạo `this.props` ở trong constructor và xử lý như sau:

```javascript
// Inside React
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}
```

Nhưng bằng một cách nào đó, thậm chí khi bạn chỉ gọi `super()` mà không truyền **props** vào bạn vẫn có thể dùng `this.props` :)) Nó đã làm như thế nào?

Hoá ra React tự động gán **props** cho instance ngay sau khi gọi constructor của bạn:

```javascript
// Inside React
const instance = new YourComponent(props);
instance.props = props;
```

Đó là lý do mà tại sao bạn quên truyền **props** vào `super()` mà vẫn sử dụng được `this.props`

## Như vậy có thể dùng super() thay thế cho super(props)

**Có lẽ là không vì nó vẫn gây confusing.** Lý do là vì React sẽ gắn `this.props` sau khi contructor của bạn đã chạy. Vì thế nó sẽ dẫn đến `this.props` vẫn là _undifined_ từ lúc `super()` được gọi cho tới khi contructor kết thúc:

```javascript
// Inside React
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}

// Inside your code
class Button extends React.Component {
  constructor(props) {
    super(); // 😬 We forgot to pass props
    console.log(props); // ✅ {}
    console.log(this.props); // 😬 undefined
  }
  // ...
}
```

Thậm chí nó còn có thể gây ra một vài khó khăn khi debug các hàm được gọi trong contructor. Đó là lý do tại sao tôi luôn khuyến khích sử dụng **super(props)**

```javascript
class Button extends React.Component {
  constructor(props) {
    super(props); // ✅ We passed props
    console.log(props); // ✅ {}
    console.log(this.props); // ✅ {}
  }
  // ...
}
```

[Source](https://overreacted.io/why-do-we-write-super-props/)