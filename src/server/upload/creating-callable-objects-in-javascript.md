Bài viết được dịch từ nguồn: https://hackernoon.com/creating-callable-objects-in-javascript-d21l3te1

`Callable object` là cấu trúc dữ liệu hoạt động như cả `object` và `function`. Bạn có thể `access` và gán thuộc tính `obj.bar`, gọi hàm `obj.foo ()`, gọi trực tiếp `obj ()`, như thể đó là một `function`.

Cách gọi trực tiếp giống như gọi một `function` của `obj` thay đổi các thuộc tính của đối tượng thông qua `context`.

Nếu bạn có kinh nghiệm với `Python`, bạn sẽ nhận ra điều này, có một giao thức Python dựng sẵn bằng cách sử dụng `__call__ class method`. Bất kỳ phương pháp nào được gán cho `__call__` có thể được gọi  theo cách `obj.__call __ ()` hoặc `obj()`.

`Callable Objects` cũng có thể được coi là `stateful function`. Các chức năng vốn dĩ là `instance statless procedures`. 

Trong `JavaScript` hầu hết mọi thứ đều là `object`, bao gồm các hàm, vì vậy chắc chắn chúng ta có thể làm điều này, nhưng bằng cách nào? Nó không được tích hợp sẵn trong ngôn ngữ như `Python`, nhưng có một số cách để làm cho nó hoạt động.

## The Challenge

Lấy cảm hứng từ `Python`, tạo một `Class constructor` mà có thể sử dụng để tạo các đối tượng có thể gọi được để chuyển hướng sang một phương thức có tên `_call`. Chuyển hướng này để có thể kế thừa từ `Class` và dễ dàng `override` và `extend` `_call` `method` với chức năng mới, mà không phải lo lắng về hoạt động bên trong của đối tượng có thể gọi được.

Để làm điều này, chúng tôi sẽ cần phải kế thừa từ hàm tạo `Function`, kế thừa từ `Object` và cho phép tạo cả `object` và `dynamic function`.

Trở ngại chính là đưa ra một đối tượng chức năng tham chiếu đến chính nó.

Để có `reference` cho `__call method`, phần `function` của đối tượng hàm được tạo bởi `Callable class constructor`, phải có `reference` cho chính nó.

## The Solutions

Tạo một `extensible Callable class` duy trì sự kế thừa đúng và chính xác trong `JavaScript` và cho phép gọi các đối tượng mà nó xây dựng là các hàm, với tham chiếu đến chính chúng, chuyển hướng tới `overridable method _call`.

```
'use strict'

class Callable extends Function {
  constructor() {
    super('...args', 'return this._bound._call(...args)')
    // Or without the spread/rest operator:
    // super('return this._bound._call.apply(this._bound, arguments)')
    this._bound = this.bind(this)

    return this._bound
  }
  
  _call(...args) {
    console.log(this, args)
  }
}
```

Bởi vì thừa kế từ `Function`, có thể tạo `dynamic function` từ `string`, sử dụng `super` trong hàm tạo. Vì vậy, chuỗi được chuyển đến `super` sẽ là `body` của `fucntion`. `Fucntion` đó có thể truy cập vào đối tượng của chính nó và gọi một phương thức `_call`, truyền vào `argument` của nó. Làm điều này bằng cách sử dụng `bind`.

`Bind method` sẽ cho `set this context` của một hàm cho bất cứ điều gì chúng ta muốn, bằng cách gói hàm đó trong một hàm bị ràng buộc. Vì vậy, `bind` chức năng cho chính nó bằng cách `this.bind(this)`.

`Callable object` có `reference` tới chính nó, ngoại trừ đối tượng trả về từ `constructor` , được trả về bởi `this`. Vì vậy, tất cả các thuộc tính sẽ được gắn vào nó, hàm của chúng ta có tham chiếu đến đối tượng cũ được truyền cho `bind`.

Một giải pháp dễ dàng cho vấn đề này là đính kèm một tham chiếu đến `object` mới được gói trên `object` cũ bởi `_bound`. Và `body` của `function`, trong `string` chuyển đến `super`, chỉ cần gọi `_call`,  sử dụng `this._bound reference`.

## The Callee Way

```
'use strict'

class Callable extends Function {
  constructor() {
    super('return arguments.callee._call.apply(arguments.callee, arguments)')
    // We can't use the rest operator because of the strict mode rules.
    // But we can use the spread operator instead of apply:
    // super('return arguments.callee._call(...arguments)')
  }
  
  _call(...args) {
    console.log(this, args)
  }
}
```

Một lần nữa sử dụng `super` gọi để tạo một hàm động, được tham chiếu đến chính hàm đó bằng cách tận dụng một biến ẩn khác bên trong một hàm.

Đối tượng đối số có thuộc tính `argument.callee` là tham chiếu đến hàm được gọi. Dùng `reference` này làm đối số đầu tiên để liên kết các chức năng.

Vì vậy, bên trong thân hàm, chuỗi được truyền cho `super`, chỉ cần gọi `_call`  trong `arguments.callee`.

## The Closure & Prototype Way

```
'use strict'

class Callable extends Function {
  constructor() {
    var closure = function(...args) { return closure._call(...args) }
    // Or without the spread/rest operator:
    // var closure = function() {
    //   return closure._call.apply(closure, arguments)
    // }
    return Object.setPrototypeOf(closure, new.target.prototype)
  }
  
  _call(...args) {
    console.log(this, args)
  }
}
```

Ở đây thay vì tạo một hàm động với `siêu`, ta loại bỏ đối tượng hàm được tạo bởi `constructor` (`this object`) và thay thế nó bằng `closure`, bằng cách trả lại thay vì `this` từ `constructor`.

`closure` cũng là một `function object` và có thể tham chiếu chính nó trong `body` thông qua biến `closure`. Sử dụng `closure` tham chiếu để chuyển hướng gọi đến phương thức `__call` của nó.

Nhưng chúng tôi đã phá vỡ chuỗi bằng cách thay thế `this` với `closure`, và gắn lại `prototype` của `constructor` để `closure` sử dụng `Object.setPrototypeOf` và `new.target` (là tham chiếu đến hàm tạo) để lấy `prototype`.

Bạn có thể dùng `this.constructor.prototype` thay vì `new.target.prototype`. Nhưng khi gọi lần đầu để tạo `object`, nó khá vo nghĩa.

## The Proxy Way

```
'use strict'

class Callable extends Function {
  constructor() {
    super()    
    return new Proxy(this, {
      apply: (target, thisArg, args) => target._call(...args)
    })
  }
  
  _call(...args) {
    console.log(this, args)
  }
}
```

Sử dụng Proxy, chúng tôi có thể chặn gọi đến `fucntion`, bằng cách sử dụng `apply`, và chuyển hướng nó đến một chức năng khác. Các `apply` cho phép gọi nó là một tham chiếu đến chính nó như là `target argument`.

Vì vậy, chúng tôi tạo `Class` kế thừa `Fucntion`, `Callable`, gói các đối tượng có thể gọi được tạo trong một `Proxy` , bất kỳ việc gọi nào được thực hiện cho các đối tượng đó và chuyển hướng chúng đến hàm `_call` trên chính đối tượng, sử dụng `target`.

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn.