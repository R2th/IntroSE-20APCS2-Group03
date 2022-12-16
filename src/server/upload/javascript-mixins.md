### Giới thiệu

Javascript là ngôn ngữ đơn thừa kế. Một lớp (class) có thể kế thừa chỉ 1 lớp khác. 


Lấy 1 ví dụ ta có một lớp `Renderer` nó cài chung cho phần hiển thị và một lớp `EventEmitter` cài đặt phần xử lý các sự kiện. Và chúng ta muốn kết hợp các chức năng của 2 lớp này vào lớp tên là `Page`, như vậy một đối tượng page có thể sử dụng cả phần hiển thị giao diện và phần xử lí các sự kiện.

Để làm được việc đó trong `Javascript` ta sử dụng `mixins`. Nó rất giống với việc sử dụng `module` trong `Ruby`.

Theo một định nghĩa ở `Wikipedia`, [mixin]() là một lớp chứa những phương thức dùng để sử dụng cho các lớp khác mà không cần trở thành lớp cha của các class đó.

Hay nói một cách khác, `mixin` cung cấp các phương thức được cài đặt chính xác các hành vi nào đó, nhưng chúng ta không sử dụng nó một cách độc lập mà chúng ta sẽ sử dụng nó như là một hành vi của các lớp khác.

### Một số ví dụ về mixin

Ví dụ đơn giản nhất để tạo ra một mixin trong Javascript là tạo một object với các phương thức có thể sử dụng được, như vậy chúng ta có thể dễ đàng thêm chung vào `prototype` của bất kì một lớp nào khác.

Ta sẽ thử cài đặt một mixin là `sayHiMixin` được sử dụng để  thêm một số phương thức dùng để giao tiếp cho `User`

```javascript
// mixin
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};

// usage:
class User {
  constructor(name) {
    this.name = name;
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!
```

Trong ví dụ trên ta thấy `User` không kế thừa `sayHiMixin` mà chỉ đơn giản là sao chép các phương thức của `sayHiMixin` và sử dụng chúng. Vì vậy `User` vẫn có thể kế thừa một lớp nào đó và cũng bao gồm luôn cả các phương thức từ `mixin`, ví dụ như thế này chẳng hạn

```javascript
class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin)
```

`Mixins` cũng có thể  kế thừa một mixin khác

Ta sẽ cài đặt một ví dụ là `sayHiMixin` sẽ kế thừa từ `sayMixin`

```javascript
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
  __proto__: sayMixin,

  sayHi() {
    // call parent method
    super.say(`Hello ${this.name}`);
  },
  sayBye() {
    super.say(`Bye ${this.name}`);
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!
```

Có một điều chú ý là để gọi phương thức `say` của lớp cha từ `sayHiMixin` ta sẽ gọi `super.say()`. `sayHiMixin` sẽ tìm kiếm method ở trong `prototype` của nó chứ không phải lớp (class).

![](https://images.viblo.asia/f4959f40-fcdb-4e9d-a175-1ec81e260906.png)

Điều đó bởi vì phương thức được gọi từ `sayHiMixin` có `[[HomeObject]]` của nó. Như vậy `super` trong ngữ cảnh này đơn giản là `sayHiMixin.__proto__` chứ không phải `User.prototype`.

```
> sayHiMixin.__proto__
=> {say: ƒ}

> User.prototype
=> {sayHi: ƒ, sayBye: ƒ, constructor: ƒ}
```

Như ta thấy là `User` chỉ thêm các phương thức được cài đặt bởi `sayHiMixin` chứ không hề có phương thức của `sayMixin`. Vì vậy chúng ta sẽ không thể gọi phương thức `say()` từ một đối tượng của lớp `User`

```
> new User("Dude").say('Hi'); 
=> VM725:1 Uncaught TypeError: (intermediate value).say is not a function
    at <anonymous>:1:18
```
### EventMixin

Giờ ta sẽ tạo một mixin có tính ứng dụng cao hơn.

Bạn viết mã Javascript hẳn là đã rất quen thuộc với các sự kiện thường gặp khi thao tác với browser như 'click', 'change' ... . Bạn gặp rất nhiều đối tượng hoạt động theo các sự kiện tương ứng.

Hiểu đơn giản là một đối tượng có thể tạo ra các sự kiện khi có một điều gì đó xảy ra, và một số đối tượng khác có thể lắng nghe được những sự kiện này.

Một sự kiện phải có tên của nó và có thể thêm vào đó một số dữ liệu tương ứng

Lấy một ví dụ như một danh mục sẽ tạo ra sự kiện `select` khi một mục được chọn. Và một số đối tượng nào đó có thể muốn lấy thông tin và tương tác với sự kiện này.

```javsascript
let eventMixin = {
  /**
   * Subscribe to event, usage:
   *  menu.on('select', function(item) { ... }
  */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * Cancel the subscription, usage:
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers && this._eventHandlers[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   * Generate the event and attach the data to it
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      return; // no handlers for that event name
    }

    // call the handlers
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};
```

Trong ví dụ trên ta có 3 phương thức

1. .on(eventName, handler) – dùng để chỉ định một phương thức xử lí (handler) sẽ được chạy khi `eventName` xảy ra. Và các phương thức xử lí sự kiện (handler) sẽ được lưu vào thuộc tính `_eventHandlers`
2. .off(eventName, handler) – dùng để xóa một phương thức (handler) trong danh sách các `handlers`
3. .trigger(eventName, ...args) – Tạo ra một sự kiện tên là `eventName`. Tất cả các `handlers` lắng nghe `eventName` sẽ được gọi với tham số `args`.

Sử dụng
```
// Make a class
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
// Add the mixin
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// call the handler on selection:
menu.on("select", value => alert(`Value selected: ${value}`));

// triggers the event => shows Value selected: 123
menu.choose("123"); // value selected
```

Giờ ta có thể tạo ra các sự kiện với menu thông qua `menu.trigger(...)` hoặc lắng nghe các sự kiện từ menu thông qua `menu.on(...)`. Và ta có thể sử dụng `eventMixin` cho rất nhiều lớp khác nhau mà chúng ta muốn.

### Kết luận

Mixin – là một thuật ngữ cơ bản trong lập trình hướng đối tượng, một lớp có chứa các phương thức để sử dụng cho các lớp khác.

Bởi vì Javascript không hỗ trợ cho việc đa kế thừa, nên `mixins` có thể  giúp cho bạn thêm các phương thức từ một một số lớp khác vào trong prototype của lớp đó. Mixins dường như rất hữu dụng trong nhiều trường hợp làm cho code của bạn trở nên ngắn gọn và sáng sủa hơn

Tuy nhiên có rất nhiều trường hợp xử dụng mixin gây ra xung đột (conflict) với các phương thức có sẵn trong lớp (class) sử dụng mixin, vì vậy bạn cần chú ý đến các trường hợp bị trùng tên và thứ tự ưu tiên trong trường hợp bị ghi đè phương thức.

### Tham khảo

1. [mixins article](https://javascript.info/mixins)
2. [wikipedia](https://en.wikipedia.org/wiki/Mixin)