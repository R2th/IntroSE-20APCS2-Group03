Nếu như chúng ta đã và đang quen sử dụng Vue.js hiện tại (version 2.x) thì sắp tới, dự kiến vào khoảng đầu năm 2020, Vue.js sẽ cho ra mắt một version mới, được đánh giá là có sự thay đổi và cải tiến rõ rệt: nhanh gọn hơn, khả năng maintain, tái sử dụng tốt hơn và dễ dàng hơn khi tiếp cận với hướng native. 
![](https://images.viblo.asia/45952803-d825-42a0-801d-a92ce2dac9f1.png)

[Composition API](https://vue-composition-api-rfc.netlify.com/api.html#setup?ref=madewithvuejs.com) là một phần thay đổi cực kỳ quan trọng ở đợt "big update" lần này. Là một fan của Vue.js nên mình cũng thi thoảng lên đọc xem nó có thay đổi gì để "chém gió" với ae..
#### I. Setup và Lifecycle Hook:
Đây là sự thay đổi khiến mình cảm thấy thích thú nhất trong Vue 3.0.  Nó mô tả ngắn gọn hơn về Lifecycle Hook trong Vue.

Chắc hẳn các bạn còn nhớ Lifecycle Hook trong Vue.js chứ. Nếu không nhớ xem lại tại [đây](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram).

**setup**: ở đây được gọi ngay sau khi một Vue instance được khởi tạo. Trên Lifecycle Diagrams thì nó chính là phía trước của `beforeCreate`, và dùng để bao bọc tất cả các phần xử lý, khai báo bên trong Component. 
```js
export default {
    setup() {
        //
    }
}
```
Về phần Lifecycle trong Vue 3.0 cũng đã có sự thay đổi. Việc sử dụng các hook thông qua các function như `mounted, updated, destroy, ...` đã được thay thế bằng bảng dưới đây:

    
| Vue 2 | Vue 3 |
| ------------------- | ------------------------|
| beforeCreate     | setup     |
| created     | setup     |
| beforeMount     | onBeforeMount     |
| mounted     | onMounted     |
| beforeUpdate     | onBeforeUpdate     |
| updated     | onUpdated     |
| beforeDestroy     | onBeforeUnmount     |
| destroyed     | onUnmounted     |
| errorCaptured     | onErrorCaptured     |

<br>\
Ngoài ra Vue 3.0 có thêm 2 hook liên quan đến việc debugs đó là: `onRenderTracked` và `onRenderTriggered`

```js
export default {
    onRenderTriggered(e) {
        debugger
        // inspect which dependency is causing the component to re-render
    }
}
```

**setup and props**: Việc sử dụng **props** với **setup()** khá đơn giản.
```js
export default {
  props: {
    name: String
  },

  setup(props) {
    console.log(props.name)
  }
}
```

#### II. Ref

**ref**: Hiểu đơn giản là nó lấy giá trị bên trong một biến. Và giá trị này có thể thay đổi (reactive). Mỗi **ref** của một biến sẽ có một trường `value` chính là giá trị của biến này. 
```js
export default {
    setup() {
        const vue = ref(3);
        console.log(vue.value) // 3
        vue.value += 3;
        console.log(vue.value) // 6
    }
}
```
**isRef**: Kiểm tra xem phần tử này có giá trị hay không.
```js
const vue = ref(react) ? react.value : 'value_expect';
```
**toRefs**: Sử dụng như con trỏ để tham chiếu đến từng giá trị gốc của **reactive**. Ví dụ mình muốn update giá trị của **react** lên 10:
```js
export default {
    setup() {
        const framework = reactive({
            vue: 10,
            react: 9,
        })
        
        const toRefs = toRefs(framework);
        
       framework.react++ // framework is reactive
       console.log(toRefs.react) // 10
// or
       toRefs.react.value++ // không phải toRefs.framework.. đâu nhé
       console.log(framework.react) // 10
    }
}
```
Nó cũng được dùng để retrieve các giá trị trong object:
```js
function useFeatureX() {
    const framework = reactive({
       vue: 10,
       react: 9,
    })

    return toRefs(state) // chỗ này nó sẽ bóc tách vue - react ra nàyyy
}

export default {
    setup() {
        const { vue, react } = useFeatureX() // đoạn này chỉ việc gọi thôi này

        return {
            vue,
            react
        }
    }
}
```
#### III. Reactive, readonly and more...
**reactive**: Tạo ra một object với giá trị "reactive". Trong Vue 2.x thì nó là `Vue.observable()`. 
Thật ra mình cũng chưa từng đọc đến phần này trong Vue.js Api document. Theo mình hiểu thì nó sẽ như sau. Với phiên bản 2.x:
```js
export default {
    data() {
        return {
            vue: 3
        }
    }
}
```
Với Vue 3.0 sẽ trở thành.
```js
export default {
    setup() {
        const object = reactive({ vue: 3 })
    }
}
```
**readonly**: Trái ngược với **reactive**. Với **reactive**, chúng ta có thể thay đổi giá trị bên trong nó, nhưng với option **readonly** thì sẽ chỉ có quyền đọc mà thôi. 
```js
const framework = reactive({ vue: 10 })

const frameworkReadonly = readonly(framework)

framework.count++ //working

frameworkReadonly.count++ // not working!
```
**computed**: Theo cách viết thì mình nghĩ đây là cú pháp dễ hiểu nhất trong các phần mình đã viết.

Vue 2.x
```js
data() {
    return {
        count: 1
    }
}

computed: {
    increment() {
        return this.count++
    }
}
```

Vue 3.0
```js
const count = ref(1)
const increment = computed(() => count.value + 1)

console.log(increment.value) // 2
```

**provide & inject**: 2 thanh niên này mình cũng hay sử dụng.
Với phiên bản cũ.
```js
//parent component
provide() {
    return {
        framework: 'vue',
    }
}
//child component
inject: ['framework'],
```

Với Vue 3.0, inject có thể trả về dữ liệu **default** nếu như giá trị truyền vào không xác định.
```js
import { provide, inject } from 'vue'

// provider
provide(framework, 'vue');

// consumer
const value = inject(framework, 'react'); // dark is default value
```
Tương tự bạn cũng có thể sử dụng **Injection Reactivity**:
```js
// in provider
const count = ref(1)
provide(number, count)

// in consumer
const count2 = inject(number, ref(2))
```
<br>

Bài viết mình xin dừng lại tại đây. Sắp tới bản chính thức ra mắt chắc chắn sẽ còn nhiều điều hấp dẫn khi sử dụng Vue 3.0 này. Cá nhân mình thấy Vue.js càng ngày càng có nét giống React. Riêng Vue 3.0 mình thấy nó có nét giống **React Hook**.  Có thể một tương lai không xa 2 thư viện này sẽ đồng bộ hẳn với nhau như kiểu như chưa hề có cuộc chia ly thật ấy chứ. Xin chào và hẹn gặp lại.!

> Nguồn: [Vue.js 3.0 Composition API](https://vue-composition-api-rfc.netlify.com/api.html)