## **Object Literals**
Một *Object Literals* là một object declaration sử dụng *shorthand syntax*: {}. Ví dụ:

```
var book = {
  title: 'Modular ES6',
  author: 'Nicolas',
  publisher: 'O´Reilly'
}
```

ES6  mang lại một số cải tiến cho **object literal syntax**: *property value shorthands*, *computed property names*, và *method definitions*.  Chúng ta hãy đi lần lượt từng cải tiến, và xem xét  một số trường hợp cụ thể trên thực tế đối với từng  **object literal syntax**  nhé

### **1. Property Value Shorthands**
 Thỉnh thoảng trên thực tế chúng ta khai báo objects với 1 hoặc nhiều properties có value trùng tên với variable. Ở ví dụ sau, ta có 1 array *listeners*, và array này được assign cho biến cũng có tên là  *listeners* trong 1 object literal:
 ```
var listeners = []
function listen() {}
var events = {
  listeners: listeners,
  listen: listen
}
```

Với ES6, chúng ta có thể bỏ *property value* và  dấu : (colon) bởi **property value shorthand syntax**:

```
var listeners = []
function listen() {}
var events = { listeners, listen }
```

### **2. Computed Property Names**
 Thỉnh thoảng, ta cần khai báo 1 object có properties với tên dựa trên một **JavaScript expressions** khác. Như ở ví dụ sau được viết với ES5, giả sử *expertise*  được truyền vào như một **function parameter**, và bạn chưa biết trước giá trị của  *expertise*:
 ```
 var expertise = 'journalism'
var person = {
  name: 'Sharon',
  age: 27
}
person[expertise] = {
  years: 5,
  interests: ['international', 'politics', 'internet']
}
 ```
 **Object literals** trong ES6  bị giới hạn bởi  khai báo với *static names*. Với **computed property names**, bạn có thể đặt bất kỳ một expression trong [] (square brackets),  và sử dụng nó như một *property name*.  Ở ví dụ sau, ta có object **persion** với chỉ 1 step được khai báo, bao gồm cả *expertise*:
 ```
 var expertise = 'journalism'
var person = {
  name: 'Sharon',
  age: 27,
  [expertise]: {
    years: 5,
    interests: ['international', 'politics', 'internet']
  }
}
 ```
 
>  **Note**: Chúng ta không thể kết hợp **property value shorthands** với **computed property names**. 
>  **Value shorthands** được xử lý lúc compile-time nhằm tránh repetition(lặp),  trong khi **computed property names**  được tính toán lúc runtime. Ví dụ:
```var expertise = 'journalism'
var journalism = {
  years: 5,
  interests: ['international', 'politics', 'internet']
}
var person = {
  name: 'Sharon',
  age: 27,
  [expertise] // this is a syntax error!
}
```

 - Một case thường gặp đối với **computed property names** là khi chúng ta muốn thêm 1 entity vào 1 object map, sử dụng *entity.id* như là 1 param. Thay vì cần có một khia báo thứ 3 để thêm *grocery* vào *groceries* map, chúng ta có thể khai báo trực tiếp trên *groceries* object:
 
 ```
 var grocery = {
  id: 'bananas',
  name: 'Bananas',
  units: 6,
  price: 10,
  currency: 'USD'
}
var groceries = {
  [grocery.id]: grocery
}
 ```
 
 - Một trường hợp khác là khi 1 function nhận 1 parameter, và parameter đó có thể được dùng để build 1 object. Với ES5, bạn cần phải cấp phát 1 biến khai báo 1 object iteral, sau đó thêm dynamic property, và return object:
 ```
 function getEnvelope(type, description) {
  var envelope = {
    data: {}
  }
  envelope[type] = description
  return envelope
}
 ```
 
 Với **Computed property names**, ta chỉ cần viết ngắn gọn hơn:
 ```
 function getEnvelope(type, description) {
  return {
    data: {},
    [type]: description
  }
}
```

### **3. Method Definitions**
 Thông thường, ta khai báo methods trong 1 object bằng việc thêm properties cho chúng. Ví dụ  sau, chúng ta tạo một event **emitter** support nhiều loại event. Method `emitter#on`  dùng để register event listeners,  và method  `emitter#emit` dùng để raise events:
```
var emitter = {
  events: {},
  on: function (type, fn) {
    if (this.events[type] === undefined) {
      this.events[type] = []
    }
    this.events[type].push(fn)
  },
  emit: function (type, event) {
    if (this.events[type] === undefined) {
      return
    }
    this.events[type].forEach(function (fn) {
      fn(event)
    })
  }
}
```

Với ES6, chúng ta có thể khai báo methods trong object bằng cách sử dụng method definition syntax mới. Trong TH này, ta có thể bỏ qua dấu `: ` và `function` keyword:
```
var emitter = {
  events: {},
  on(type, fn) {
    if (this.events[type] === undefined) {
      this.events[type] = []
    }
    this.events[type].push(fn)
  },
  emit(type, event) {
    if (this.events[type] === undefined) {
      return
    }
    this.events[type].forEach(function (fn) {
      fn(event)
    })
  }
}
```

### **4. Arrow Functions**
 Trong JS, thông thường ta khai báo function bao gồm name, list parameters và function body:
 ```
 function name(parameters) {
  // function body
}
 ```
 Ta cũng có thể tạo một `anonymous functions` bằng cách bỏ qua name khi gán function cho 1 variable, 1 property hoặc 1 function call:
 ```
 var example = function (parameters) {
  // function body
}
 ```
 
 Với ES6, ta có thể sử dụng `arrow functions` như 1 cách khác để viết `anonymous functions`. Sự khác nhau ở đây, là `arrow functions` bỏ qua keyword `function` và thêm `=>` vào sau parameter list:
 ```
 var example = (parameters) => {
  // function body
}
```

> **Arrow function**  không được dùng như 1 constructor, không có prototype property. Vì vậy bạn không thể dùng `new` đối với 1 arrow funtion, và chúng bị ràng buộc bởi `lexical scope` của chúng, đó là lý do tại sao chúng không thay đổi ý nghĩa của `this`

**Tham khảo:** https://ponyfoo.com/books/practical-modern-javascript/chapters/2#read