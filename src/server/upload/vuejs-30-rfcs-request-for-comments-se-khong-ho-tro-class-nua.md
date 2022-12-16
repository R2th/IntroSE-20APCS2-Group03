Là một fan của Vuejs, mình khá là hào hứng đón chào sự thay đổi tới đây có thể nó sẽ ra mắt trong Q4 2019. https://github.com/vuejs/vue/projects/6
Mình thấy sự thay đổi này khá là quan trọng, sự không hỗ trợ class trong vuejs sẽ có nhiều ý kiến khác nhau tranh luận rất sôi nổi ở các cộng đồng quốc tế. Nhưng Evan You cùng đồng nghiệp đã quyết định loại bỏ nó.
## Những lý do không hỗ trợ Class
Trong React và Angular, chúng ta có thể tạo các thành phần bằng các lớp JavaScript. Một số người thích cách tạo components bằng cách này vì nó có thể dễ đọc hơn. Ngoài ra nó cũng gây khó hiểu sự kế thừa của các class javascript. Tuy nhiên, các class JavaScript chỉ là các hàm tổng hợp trên JavaScript và nó khác biệt với ngôn ngữ khác. 

### Class của vuejs
```javascript
class App extends Vue {
  // options declared via static properties (stage 3)
  // more details below
  static template = `<div @click="increment">
      {{ count }} {{ plusOne }}
    </div>`

  // reactive data declared via class fields (stage 3)
  // more details below
  count = 0

  // lifecycle
  created() {
    console.log(this.count)
  }

  // getters are converted to computed properties
  get plusOne() {
    return this.count + 1
  }

  // a method
  increment() {
    this.count++
  }
}
```
### Dạng phổ biến hơn
```javascript
<template>
  <div @click="increment">
    {{ count }} {{ plusOne }}
    <Foo />
  </div>
</template>

<script>
import Vue from 'vue'
import Foo from './Foo.vue'

export default class App extends Vue {
  static components = {
    Foo
  }

  count = 0

  created() {
    console.log(this.count)
  }

  get plusOne() {
    return this.count + 1
  }

  increment() {
    this.count++
  }
}
</script>
```

### Coder thích TypeScript sự ảnh hưởng của nó
Đa phần người dùng chọn sử dụng Vue với TypeScript thì sẽ biết đến repo này https://github.com/vuejs/vue-class-component
Nghe có vẻ ổn nhưng sâu trong nước mắt mới là biển rộng... (đùa vậy thôi). Người trong cuộc đã có tổng kết lại những lý do ảnh hưởng khá là thú vị sau:

* Vue 2.x đã show cho chúng ta **instance components** với một `Class` bên dưới. Dấu ngoặc kép ở đây vì nó không sử dụng cú pháp ES2015 gốc mà là hàm tạo / nguyên mẫu kiểu ES5.
* `vue-class-component`đã phải triển khai một số cách giải quyết không hiệu quả để cung cấp API mong muốn mà không làm thay đổi cấu trúc bên trong của Vue.
* `vue-class-component` phải duy trì khả năng tương thích với core của Vuejs điều đó, loại bỏ chi phí không cần thiết khi sử dụng trực tiếp với core của Vue.

> Đối tượng mục tiêu bị ảnh hưởng là người dùng TypeScript (RIP).

API cũng được thiết kế để không phụ thuộc vào bất cứ điều gì cụ thể về TypeScript: nó sẽ hoạt động tốt như nhau trong ES, và cũng hướng cho người dùng thích sử dụng các class ES gốc.

### Chúng ta có cách mới để sử dụng component logic dựa theo cảm hứng từ React Hook: Sử dụng composition functions.
Logic trong components sẽ có phương thức mới là setup(). và có data() bên trong nhưng sẽ cho chúng ta được `flexibility-tính mềm dẻo` khi sử dụng hàm gọi bên trong nó

```javascript
// everything tree-shakable
import {
  value,
  computed,
  watch,
  onMounted,
  inject
} from 'vue'

const App = {
  // same as before
  props: {
    a: String,
    b: Number
  },

  // same as before
  components: {
    // ...
  },

  setup(props) {
    // data
    const count = value(1)

    // computed
    const plusOne = computed(() => count.value + 1)

    // methods
    function inc() {
      count.value++
    }

    // watch
    watch(() => props.b + count.value, val => {
      console.log('changed: ', val)
    })

    // lifecycle
    onMounted(() => {
      console.log('mounted!')
    })

    // dependency injection
    const injected = inject(SomeSymbol)

    // other options like el, extends and mixins are no longer necessary

    // expose bindings on render context
    // any value containers will be unwrapped when exposed
    // any non-containers will be exposed as-is, including functions
    return {
      count,
      plusOne,
      inc,
      injected
    }
  },

  // template: `same as before`,

  render({ state, props, slots }) {
    // `this` points to the render context and works same as before (exposes everything)
    // `state` exposes bindings returned from `setup()` (with value wrappers unwrapped)
  }
}
```
###  Kết luận
Team Vue đã hướng tới `composition functions`. Những process này sẽ tương tự cách mà React chuyển sang React Hooks. Với cách này sẽ cho phép TypeScript sẽ support từ đó sẽ mang lại sự trải nghiệm tốt hơn.

### Tham khảo
https://scotch.io/bar-talk/class-components-in-vue-are-no-longer-happening#toc-composition-functions