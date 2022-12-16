## Giới thiệu.
Phần này giới thiệu một số thành phần cơ bản, hay gặp ở các lớp định nghĩa vue. 

## Options/Data
### data
- Type: Object, Function
- Restriction: Chỉ chấp nhận kiểu *function* khi trong định nghĩa một component 
- Detail: 

Định nghĩa đối tượng dữ liệu cho một thể hiện của vue. Vue sẽ convert đệ quy các thuộc tính của đối tượng object vào các phương thức getter và setter, và làm chúng "renative". 

Nếu là một "object" thì phải rõ ràng, các browser api và các phương thức sẽ được bỏ qua. Một nguyên tắc nhỏ ở đây, là dữ liệu thì chỉ nên là dữ liệu, không nên xây dựng thành các object có những method và thuộc tính riêng của chúng. 


Sau khi vue được định nghĩa, các thể hiện của nó sẽ không thể thêm các thuộc tính khác. Vậy nên một lời khuyên đặt ra là hãy khai báo toàn bộ những thuộc tính cần thiết ở root level trước khi một thể hiện của vue object được sinh ra. 
Sau khi một đối tượng được tạo ra, thì các thuộc tính của nó có thể truy cập thông qua *$vm.data*, và truy cập các thuộc tính của data bằng cách *$vm.data.a* trong đó a là một thuộc tính được định nghĩa trong đối tượng data. 

Các thuộc tính bắ đầu bằng **_** và **\$** sẽ không được phép bởi lẽ, nó có thể gây đến conflict với các thuộc tính hay các api của vue. Bạn cũng có thể truy cập đến các thuộc tính ấy thông qua cú pháp *$vm.a._property*

Khi định nghĩa một component, **data** phải được khai báo như một function và trả về giá trị của data object., bởi vì sẽ có rất nhiều thể hiện sẽ dược tạo bởi 1 định nghĩa data. Nếu chúng ta sử dụng một object **data** một cách tường mình, thì object data đó sẽ được sử dụng một cách chia sẻ bởi các thể hiện được tạo ra bởi một định nghĩa component. Bằng cách định nghĩa một **data function**, thì mỗi khi tạo ra một thể hiện của đối tượng vue đã định nghĩa, ta cũng gọi là hàm 1 định nghĩa data function một lần.  Nếu bắt buộc, thì mọi object data phải chuyển đổi sang kiểu json được. 

Nói chung diễn tả khá là khó hiểu. bây giờ mình sẽ đưa ra một ví dụ. 
```js 
let vm = new Vue({
    data: {
    a : 1,
    b: 2
});

let vm1 = Vue.extend({
    data () => {
        return {
            a: 1, 
            b: 2
        }
    }
});
```
Với ví dụ trên, khi có 2 thể hiện của vm là vm01 và vm02, thì nếu thuộc tính vm01.a = 2 thì vm02 cũng bằng 2. tức là cả vm01 và vm02 đều là 2 thể hiện của vm, và nó chia sẻ cùng 1 đối tượng data.
Tương tự, nếu vm101 và vm102 là các thể hiện của vm1, thì nếu thuộc tính vm101. =2 thì vm102.a vẫn bằng 1, chúng có những đối tượng object data riêng, không xen lẫn với nhau, nên cái này thay đổi, không ảnh hưởng đến cái khác. 
Điều này, theo mình là đáng chủ ý, vì một số anh em mới động đến vue, sẽ không thể hiểu tại sao, dữ liệu lại thay đổi một cách không mong muốn. 

### props
- Type: Array<string> | Object 
- Details: 
Một danh sách hoặc một hash các thuộc tính, lấy từ thuộc tính data của component cha. Nó có thể là một array, cũng có thể là tên và định nghĩa kiểu dữ liệu, hoặc các giá trị default. 

Đơn giản, là định nghĩa các dữ liệu mà component lấy của component cha, nó đơn giản là tên thuộc tính, hay là object mang các thuộc tính định nghĩa kiểu. 
```js
// simple syntax
Vue.component('props-demo-simple', {
  props: ['size', 'myMessage']
})var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5
      }
    }
  },
  watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // string method name
    b: 'someMethod',
    // deep watcher
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
    // the callback will be called immediately after the start of the observation
    d: {
      handler: function (val, oldVal) { /* ... */ },
      immediate: true
    },
    e: [
      'handle1',
      function handle2 (val, oldVal) { /* ... */ },
      {
        handler: function handle3 (val, oldVal) { /* ... */ },
        /* ... */
      }
    ],
    // watch vm.e.f's value: {g: 5}
    'e.f': function (val, oldVal) { /* ... */ }
  }
})
vm.a = 2 // => new: 2, old: 1

// object syntax with validation
Vue.component('props-demo-advanced', {
  props: {
    // type check
    height: Number,
    // type check plus other validations
    age: {
      type: Number,
      default: 0,
      required: true,
      validator: function (value) {
        return value >= 0
      }
    }
  }
})
```
### propsData 
- Type: { [key:string]: any }
- Hạn chế (Restriction) chỉ áp dụng được với các thể hiện được tạo ra thông qua câu lệnh **new**
- Chi tiết(Details)
đưa props và một thể hiện trong quá trình nó tạo ra, điều này giúp việc viết unit test dễ dàng hơn.
```js
var Comp = Vue.extend({
  props: ['msg'],
  template: '<div>{{ msg }}</div>'
})

var vm = new Comp({
  propsData: {
    msg: 'hello'
  }
})
```

### computed
- Type: { [key: string]: Function | { get: Function, set: Function } }
- Chi tiết: 
Thường được sử dụng để tính toán các thuộc tính. Khi các thành phần trong việc tính toán bị thay đổi, thì thuộc tính sẽ được tính toán lại, nó tương đối giống với việc renative. 
```js
var vm = new Vue({
  data: { a: 1 },
  computed: {
    // get only
    aDouble: function () {
      return this.a * 2
    },
    // both get and set
    aPlus: {
      get: function () {
        return this.a + 1
      },
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
vm.aPlus   // => 2
vm.aPlus = 3
vm.a       // => 2
vm.aDouble // => 4
```

#### methods 
- Type: { [key: string]: Function }
- Details: 
Nơi định nghĩa các phương thức của class Vue. giống như hướng đối tượng, method là các hành vi có thể sử dụng của class. 
```js
var vm = new Vue({
  data: { a: 1 },
  methods: {
    plus: function () {
      this.a++
    }
  }var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5
      }
    }
  },
  watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // string method name
    b: 'someMethod',
    // deep watcher
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
    // the callback will be called immediately after the start of the observation
    d: {
      handler: function (val, oldVal) { /* ... */ },
      immediate: true
    },
    e: [
      'handle1',
      function handle2 (val, oldVal) { /* ... */ },
      {
        handler: function handle3 (val, oldVal) { /* ... */ },
        /* ... */
      }
    ],
    // watch vm.e.f's value: {g: 5}
    'e.f': function (val, oldVal) { /* ... */ }
  }
})
vm.a = 2 // => new: 2, old: 1
})
vm.plus()
vm.a // 2
```
#### watch
- Type: [key: string]: string | Function | Object | Array}
- Details: Định nghĩa việc cần làm khi có sự thay đổi dữ liệu. 
```js
var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5
      }
    }
  },
  watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // string method name
    b: 'someMethod',
    // deep watcher
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
    // the callback will be called immediately after the start of the observation
    d: {
      handler: function (val, oldVal) { /* ... */ },
      immediate: true
    },
    e: [
      'handle1',
      function handle2 (val, oldVal) { /* ... */ },
      {
        handler: function handle3 (val, oldVal) { /* ... */ },
        /* ... */
      }
    ],
    // watch vm.e.f's value: {g: 5}
    'e.f': function (val, oldVal) { /* ... */ }
  }
})
vm.a = 2 // => new: 2, old: 1
```