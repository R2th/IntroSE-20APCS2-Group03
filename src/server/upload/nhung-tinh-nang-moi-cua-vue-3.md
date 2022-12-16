Vue-next (Vue 3) đã ra mắt được một thời gian. Nó hiện đang trong giai đoạn phát hành, có nghĩa là sẽ không có sự thay đổi lớn trong API. Thật tốt khi thấy rằng Vue đã ổn định và sẵn sàng tham gia vào các dự án của chúng ta.

Mình phải nói rằng bản thân Vue 2 đã là rất tuyệt rồi. Nhưng với các tính năng mới của mình, Vue 3 có khả năng nâng cấp các dự án của chúng ta lên tầm cao mới. Mình đoán tính năng hấp dẫn nhất trong Vue 3 sẽ là các API thành phần. Bản thân Evan You đã đề cập rằng các API thành phần được lấy cảm hứng từ Hooks trong React. Mặc dù hook và thành phần API rất giống nhau, nhưng dựa vào code base ta có thể thấy chúng hoàn toàn khác nhau. Chúng ta sẽ không thảo luận về cái nào tốt hơn hay hứa hẹn bởi vì mình thực sự nghĩ cả 2 framework  này đều rất tuyệt vời.

Nói chung, thật hạnh phúc khi thấy Vue cũng có thể làm được những gì React làm. Chúng ta hãy xem xét kỹ các tính năng mới.

# 1. Vite
Đây là một tác phẩm nghệ thuật khác của Evan You nhằm thay thế Webpack trong quá trình phát triển Vue (Hiện chỉ hoạt động cho Vue). Nó được thiết kế để có thể hoạt động một cách nhanh chóng giống như tên tiếng Pháp của nó.

## Bắt đầu với Vite

Repo chính thức cung cấp cho chúng ta một cách đơn giản để tạo ứng dụng Vue 3 thông qua [Vite](https://github.com/vitejs/vite).

**Npm**
```
$ npm init vite-app <project-name>
$ cd <project-name>
$ npm install
$ npm run dev
```

**Yarn**
```
$ yarn create vite-app <project-name>
$ cd <project-name>
$ yarn
$ yarn dev
```

**Start Dev Server**

Mọi thứ chỉ diễn ra trong một cái nháy mắt

```
 ❯ yarn dev
yarn run v1.22.4
$ vite
vite v1.0.0-rc.4

  Dev server running at:
  > Local:    http://localhost:3000/
  > Network:  http://192.168.3.2:3000/
  > Network:  http://10.80.67.216:3000/
```

Mở http://localhost:3000/ và ta có thể thấy màn hình wellcome của Vue

### vue-next-features

* [Link repo](https://github.com/daiyanze/vue-next-features)
* [Link Demo](https://daiyanze.com/vue-next-features/dist/)

Mình đã tạo một ứng dụng nhỏ để demo các tính năng mới của Vue 3 (link bên trên). Nếu bạn nhìn vào** package.json**, sự đơn giản của các dependencies của vue-next-features sẽ khiến bạn yêu thích Vite ngay lập tức. (Ý mình là, ai lại không muốn bắt đầu bằng một package.json đơn giản hơn?)

Có một repo Vue 3 "Hello World" khác ([vue-next-webpack-preview](https://github.com/vuejs/vue-next-webpack-preview)) đi kèm với [Webpack](https://webpack.js.org/). Nó cũng là một sân chơi tốt để bạn tìm hiểu về các tính năng mới trong Vue 3.

**vue-next-features**

```
{
  ...,
  "dependencies": {
    "vite": "^1.0.0-rc.4",
    "vue": "^3.0.0-rc.5"
  },
  "devDependencies": {
    "@vue/compiler-sfc": "^3.0.0-rc.5"
  }
}
```

**vue-next-webpack-preview**

```
{
  ...,
  "dependencies": {
    "vue": "^3.0.0-beta.2"
  },
  "devDependencies": {
    "@vue/compiler-sfc": "^3.0.0-beta.2",
    "css-loader": "^3.4.2",
    "file-loader": "^6.0.0",
    "mini-css-extract-plugin": "^0.9.0",
    "url-loader": "^4.0.0",
    "vue-loader": "^16.0.0-alpha.3",
    "webpack": "^4.42.1",
    "webpack-cli": "^3.3.11",¥
    "webpack-dev-server": "^3.10.3"
  }
}
```

# 2. Composition API

Là thay đổi lớn nhất của Vue.js, API thành phần sẽ trở thành tính năng thường xuyên được sử dụng và phổ biến nhất tiếp theo của bạn. Cũng giống như React hooks, với API thành phần Vue sẽ giúp bạn có được nhiều tùy chỉnh hơn.

Đây là danh sách các API cấu thành Vue 3. (Thực ra còn nhiều ...)

* Reactivity:  `computed` `reactive` `ref` `readonly` `watch` `watchEffect` `unref` `toRefs` `isRef` `isProxy` `isReactive` `isReadonly` `customRef` `markRaw` `shallowReactive` `shallowReadonly` `shallowRef` `toRaw`
* Lifecycle Hooks: `onBeforeMount` `onBeforeUnmount` `onBeforeUpdate` `onMounted` `onupdated` `onErrorCapture` `onRenderTracked` `onRenderTriggered` `onUnmount` `onActivated` `onDeactivated`

Bạn hãy vào trang doc chính thức của Vue để tìm hiểu thêm về những APIs này nhé
https://v3.vuejs.org/api/composition-api.html

# 3. Component Style
**Trong Vue2**

Sử dụng template để xác định nội dung component. Trong Vue 3, cách sử dụng cũ này vẫn có sẵn. Nếu bạn thích phong cách này, bạn có thể tiếp tục sử dụng nó.

```
<template>
  <button @click="count++">count: {{ count }}</button>
</template>

<script>
const multiplier = 2

export default {
  data () {
    return {
      count: 0
    }
  },
  computed: {
    result () {
      return this.count * multiplier
    }
  },
  mounted () {
    console.log(this.count)
  },
  watch: {
    count (val, oldVal) {
      console.log(val, oldVal)
    }
  }
}
</script>
```

**Trong Vue3**

Để sử dụng API thành phần, bạn cần thêm **setup** vào export default. Đoạn code dưới đây hoàn toàn tương đương với đoạn code phía trên:
```
<template>
  <button @click="count++">count: {{ count }}</button>
</template>

<script>
import { computed, reactive, toRefs, onMounted, watch } from 'vue'

export default {
  setup () {
    const multiplier = 2

    const state = reactive({
      count: 0
    })

    const result = computed(() => {
      return state.count * multiplier
    })

    onMounted(() => {
      console.log(state.count)
    })

    watch(state.count, (val, oldVal) => {
      console.log(val, oldVal)
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>
```

**Tiếp tục với API mới**

Dưới đây là 4 lý do mà bạn nên sử dung API thành phần thay vì template config mặc định của Vue2:
* Tăng độ dễ đọc hiểu cho code
* Tránh trùng lặp hay dư thừa logics
* Để nhóm các đoạn logic tương tự
* **Để sử dụng lại logic**

So với kiểu cấu hình của Vue 2, logic được chia nhỏ chính xác thành các phần nhỏ hơn để bạn có thể nhóm các logic tương tự lại với nhau một cách dễ dàng. Bằng cách này, nó cũng làm giảm khả năng bị lẫn lộn từ các logic không phù hợp. Điều này sẽ giúp tăng năng suất.

# 4. Reactivity API nâng cao
Cá nhân mình nghĩ điều này không có gì khác so với các API reactivity khác. Nhưng nó thực sự cung cấp những khả năng xử lý các trường hợp tùy biến như **custom hook** và sửa đổi lớp nông (shallow layer). Hiện nó là một phần của [API reactivity](https://v3.vuejs.org/api/basic-reactivity.html) cơ bản theo tài liệu chính thức của Vue 3.

Trong tài liệu [API thành phần Vue](https://composition-api.vuejs.org/), các API sau được liệt kê là APIs reactivity nâng cao.

* customRef:  tùy chỉnh Hook
* markRaw: không thể là một `reactive`
* nôngReactive: Lớp đầu tiên của object `reactive`
* nôngReadonly: Lớp đầu tiên của object `readonly`
* nôngRef: Giá trị của object không phải là `reactive`
* toRaw: khôi phục `reactive` về object bình thường

Đây là bản demo chính thức của `customRef`:
```
import { customRef } from 'vue'

const useDebouncedRef = (value, delay = 200) => {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}

export default {
  setup () {
    return {
      text: useDebouncedRef('some text')
    }
  }
}
```

# 5. v-enter-from / v-leave-from

Trong Vue 2,  `<Transition>` component giúp xử lý animation/transition của cọmponent. Nhưng thuộc tính v-enter-active v-enter v-enter-to đối với mình khá mơ hồ. Đôi khi mình bị nhầm lẫn cái nào sẽ xảy ra trước.

Bây giờ trong Vue 3, các tên thuộc tính chuyển đổi đó trở nên thống nhất và trực quan hơn.
* v-enter => v-enter-from
* v-leave => v-leave-from
 
```
<template>
  <transition name="fade">
    <div v-show="show">fade transition</div>
  </transition>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup () {
    const state = reactive({
      show: true
    })

    setTimeout(() => {
      state.show = false
    }, 1000)

    setTimeout(() => {
      state.show = true
    }, 2000)

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2000ms;
}

</style>
```

Thứ tự sẽ như sau:
* v-enter-from (v-enter)
* v-enter-active
* v-enter-to
* v-leave-from (v-leave)
* v-leave-active
* v-leave-to

Mình tin chắc rằng, tên nhứ trên sẽ dẽ dàng hơn trước rất nhiều

# 6. Cho phép nhiều Root Element
Vue2 sẽ đẩy ra lỗi khi sử dụng multi root element. Tất cả các element phải được lồng vào một element duy nhất

```
<!-- Error -->
<template>
  <div>pitayan</div>
  <div>blog</div>
</template>

<!-- One Root Element only -->
<template>
  <div>
    <div>pitayan</div>
    <div>blog</div>
  </div>
</template>
```

Vue3 đã loại bỏ lỗi khó chịu này. Mình nghĩ điều này sẽ giúp ích rất nhiều khi bạn thật sự không muốn lồng element của mình trong một container cha. Đôi khi tất cả những gì bạn cần chỉ là đặt nhwungx element này vào đúng chỗ.
Nó hoạt động tương tự như [React Fragments](https://reactjs.org/docs/fragments.html), giúp đỡ bạn giảm đi phần nào những vấn đề liên quan đến "lồng":
```
<!-- Vue 3 Multiple Root Element -->
<!-- Okay -->
<template>
  <div>pitayan</div>
  <div>blog</div>
</template>
```

# 7. Filter không còn được chấp nhận (Removed)

Mình cho rằng nhiều người nghĩ **filter** có thể là một tính năng tuyệt vời của Vue.js. Nó thực sự hoạt động tốt trong Vue. (Ví dụ: format data / tính toán, v.v.).

Vậy hãy xem cách 3 giải thích lý do tại sao **filter** bị xóa:

> Mặc dù **filter** có vẻ rất sự tiện lợi, nhưng nó yêu cầu một cú pháp tùy chỉnh phá vỡ quy tắc giả định về các cú pháp bên trong dấu ngoặc nhọn là "chỉ là JavaScript".

Mình tin rằng việc phát triển khi không có **filter** sẽ không bị ảnh hưởng gì, mặc dù bạn có thể mất thêm thời gian khi chuyển sang Vue 3. Trong các dự án của mình, sự xuất hiện của **filter** là một trường hợp khá hiếm vì mình có thể thay thế chức năng đó bằng một **method** hoặc **computed** dễ dàng . Bởi vì theo mình, `method / computed` sẽ dễ dàng đọc hiểu hơn **filter**.
```
<template>
  <!-- Deprecated (removed) & Error -->
  <span>{{ count | double }}</span>

  <!-- If you have to use fiter, make it a function -->
  <span>{{ double(count) }}</span>
</template>

<script>
import { ref } from 'vue'

export default {
  // Not working
  filters: {
    double (val) {
      return val * 2
    }
  },
  setup () {
    const count = ref(1)
    return {
      count,
      double: val => val * 2
    }
  }
}
</script>
```

# 8. Async Component mới: Suspense

Đây có lẽ là tính năng mới duy nhất của Vue 3 có thể được thay đổi ngay cả sau khi phát hành chính thức. Nguồn cảm hứng cũng là từ [React Suspense](https://reactjs.org/docs/concurrent-mode-suspense.html). Do đó, cách sử dụng sẽ giống nhau theo ý kiến của mình.

Bạn có nhớ cách render aynchronous data trứoc đây khi sử dụng Vue2 không? Mình nghĩ `v-if` / `v-else` chính là câu trả lời:

```
<template>
  <div>
    <div v-for="i in items" :key="i">{{ i }}</div>
    <div v-else>loading...<div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: null
    }
  },
  mounted () {
    this.items = await new Promise(resolve => {
      setTimeout(() => {
        return resolve(['one', 'two'])
      }, 3000)
    })
  }
}
</script>
```

Với `Suspense` component, bạn sẽ có khả năng làm việc đó mà không phải tự mình điều chỉnh điều kiện. Bằng cách setup `default` và `fallback`, component `suspense` sẽ điều chỉnh async event một cách tự động

```
<template>
  <suspense>
    <template #default>
      <div v-for="i in items" :key="i">{{ i }}</div>
    </template>

    <template #fallback>
      Loading...
    </template>
  </suspense>
</template>

<script>
export default {
  async setup () {
    const items = await new Promise(resolve => {
      setTimeout(() => {
        return resolve(['one', 'two'])
      }, 3000)
    })

    return {
      items
    }
  }
}
</script>
```

# 9. Hiển thị nó ở một nơi khác: Teleport

Nó là một thứ thú vị khác dựa trên [React Portals](https://reactjs.org/docs/portals.html). Nó cung cấp khả năng chèn component vào một Note DOM.

Những gì chúng ta làm trong Vue 2 để chèn một custom component trong `<body>` (Tất nhiên có một plugin bên thứ 3 của [Vue PortalVue](https://portal-vue.linusb.org/) cung cấp chức năng như vậy):

```
import Vue from 'vue'

const Ctor = Vue.extends({
  template: `<div>hello world</div>`
})

const vm = new Ctor({ ... }).$mount()

document.body.appendChild(vm.$el)
```

Để sử dụng tính năng này trong Vue3, bọc component bạn muốn với `<Teleport>` và định nghĩa điểm đến trong props `to`

```
<template>
  <Teleport to="body">
    <div>Pitayan</div>
  </Teleport>
</template>
```

# 10. Cho phép nhiều v-model

`v-model` được sử dụng cho các ràng buộc hai chiều dữ liệu trong các form element hoặc thậm chí các custom component. Trong Vue 2, một custom component chỉ có thể có một `v-model` trong thẻ.

```
<template>
  <my-input-form v-model="input" />
</template>
```

Vue 3 đã loại bỏ giới hạn và cho phép bạn có nhiều `v-model` để bạn có thể chỉ định các ràng buộc riêng biệt cho nhiều phần tử đầu vào hơn.

```
<template>
  <my-input-form
    v-model:first="inputFirst"
    v-model:second="inputSecond"
    />
</template>
```

# 11. Global APIs

Vue3 cung cấp cho chúng ta một số APIs để giúp chúng ta điều khiểm component và instances tốt hơn.

## createApp

Trong Vue2, `Vue` có thể sử dụng như constructor để trả về một instance Object. Trong Vue3, bạn có thể dùng `createApp` thay thế. Công dụng là hoàn toàn như nhau:

```
// Vue 2
import Vue from 'vue'
import App from '@/src/App'

new Vue({
  el: '#app',
  components: {
    App
  }
})
```
```
// Vue 3
import { createApp } from 'vue'
import App from '@/src/App'

const app = createApp(App)
```

Vậy còn những global method khác như `extend` `component` `mixin` và `directive` thì sao?

Câu trả lời là hoàn toàn tương tự nhưng bạn phải dùng method instance:

```
// Global methods
app.extend()
app.component()
app.mixin()
app.directive()
```

## nextTick

Mình nghĩ `nextTick` là một API thường xuyên được sử dụng vì rất nhiều logic thực sự không đồng bộ và chúng cần được sắp xếp cho chu kỳ cập nhật DOM tiếp theo.

Trong Vue 2, `nextTick` là một instance method.

```
export default {
  ...,
  mounted () {
    this.$nextTick(() => {
      console.log('pitayan')
    })
  }
}
```

Vue3 cho phép bạn dùng `nextTick` như một hàm độc lập:

```
// nextTick function type
export declare function nextTick(fn?: () => void): Promise<void>;
```
```
// An official doc Example
import { nextTick } from 'vue'

export default {
  setup () {
    const message = ref('Hello, Pitayan!')

    const changeMessage = async newMessage => {
      message.value = newMessage
      await nextTick()
      console.log('Now DOM is updated')
    }
  }
}
```

## Một số hàm helper khác

Các API mới này sẽ cực kỳ hữu ích khi bạn cần thêm cách điều khiển cho các tình huống trừu tượng hơn nhiều. Cá nhân mình nghĩ rằng chúng có thể được sử dụng thường xuyên trong các thư viện của bên thứ ba.

* **h**: trả về node ảo
* **createRenderer**: custom render có thể được sử dụng cho cross-environment
* **defineComponent**: nhập Object được truyền vào
* **defineAsyncComponent**: tải async component khi cần thiết
* **resolvedComponent**: giải quyết một component trong instance scope hiện tại
* **ResolutionDirective**: lấy `directive` từ instance scope hiện tại
* **withDirectives**: áp dụng `directive` cho một `VNode`

Bài viết được mình dịch lại của tác giả Yanze Dai. Link bài viết gốc tại đây https://dev.to/daiyanze/vue-3-new-features-summary-2cie