Hello xin chào các bạn mình đã trở lại và hôm nay mình sẽ chia sẻ đến các bạn cách để xây dựng một ứng dụng Vue trông mới mẻ ngon nghẻ hơn nhé :D Với Vue Components mình sẽ viết theo phong cách **Class Component** sử dụng `vue-property-decorator`, còn với **Store** thì sẽ là **Vuex class modules**. Cùng tìm hiểu xem nó là gì và viết như thế nào nhé !

## Xây dựng Vue Component với vue-class-component
Nhắc đến Vue Component chắc hẳn ai làm việc với Vue đều đã quen thuộc với cách viết này:
```html
<template>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style>
</style>
```

Thế còn với **Vue Class Component** - `vue-property-decorator`  thì sao ?

**vue-property-decorator** là một package của Vue cho phép bạn định nghĩa các Components một cách đơn giản hơn rất nhiều so với cách sử dụng Vue truyền thống
* @Component, @Prop, @Ref, @Watch,... là các decorators đã được định nghĩa sẵn trong thư viện và chúng ta sẽ triển khai nó theo cách mình mong muốn. Muốn tìm hiểu thêm về decorator thì bạn có thể đọc thêm [ở đây](https://viblo.asia/p/hieu-biet-co-ban-ve-decorator-pattern-pVYRPjbVG4ng)
* Các dữ liệu khởi tạo có thể được định nghĩa như một **thuộc tính** của **Class**. Tức là cũng không cần thông của **property data()** như cách truyền thống
* **methods** không cần phải viết trong **property methods: {}** nữa mà có thể viết ngay trong **Class**, bởi vì đơn giản nó chính là **methods** của **Class** trong **OOP**.
* Đối Với **computed** thì nó như là một phương thức Getter trong Class
* Toàn bộ **Lifecycle** của Vue đều có thể được định nghĩa trực tiếp như một **phương thức cùng tên** của **Class**.

Ở đây mình đang có `Button.vue` được viết theo Class component, và có tương đối đầy đủ các thành phần của 1 component cơ bản
```html
<template>
  <a-button :style="widthStyle" v-bind="$attrs" @click="handleClick">
    <slot>{{ buttonText }}</slot>
  </a-button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Button extends Vue {
  private buttonText = "Button";
    
  @Prop()
  readonly width!: number;

  get widthStyle() {
    return this.width ? { width: `${this.width}px` } : {};
  }

  handleClick() {
    this.$emit('click');
  }

  created() {}

  beforeMount() {}

  mounted() {}

  beforeDestroy() {}

  destroyed() {}
}
</script>
```
Chuyển từ cách viết truyền thông sang cách viết này cũng đơn giản nhỉ. Và trông nó PRO hơn hẳn đúng không :D

Với kiểu truyền thống chúng ta sẽ phải viết như thế này:
```html
<template>
  <a-button :style="widthStyle" v-bind="$attrs" @click="handleClick">
    <slot>{{ buttonText }}</slot>
  </a-button>
</template>

<script>
export default {
  props: {
    width: {
      type: Number
    }
  },
  data() {
    return {
      buttonText: 'Button'
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  },
  computed: {
    widthStyle() {
      return this.width ? { width: `${this.width}px` } : {}
    }
  },
  created() {},

  beforeMount() {},

  mounted() {},

  beforeDestroy() {},

  destroyed() {},

}
</script>

```

## Xây dựng Store với Vuex-module-decorators
Khi bạn đã dùng Vue Class Component và cũng muốn làm cho các modules trong Store mang hơi thở Class  :D 

Có ngay ! `vuex-module-decorators` sẽ giúp bạn làm việc đó :D

### **Cùng nhìn lại với cách truyền thống nhé**

**main.js**
```javascript
import Vue from 'vue'
import App from './App.vue'
import store from './store/index'

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
```

**store/index.js**
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

import counter from './modules/counter'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    counter,
  }
})
```

**modules/counter.js**
```javascript
export default {
  namespaced: true,
  state: {
    count: false
  },
  mutations: {
    increment(state, delta) {
      state.count += delta;
    }
    decrement(state, delta) {
      state.count -= delta;
    }
  },
  actions: {
    incr(context) {
      context.commit('increment', 5)
    }
    decr(context) {
      context.commit('decrement', 5)
    }
  }
}
```
**Sử dụng ở Component: Counter.vue** 

```html
<template>
  <div>
    <h2>{{ count }}</h2>
    <a-button class="mr-2" @click="decrement">-5</a-button>
    <a-button type="primary" @click="increment">+5</a-button>
  </div>
</template>

<script>
import { mapState, mapAction } from "vuex";

export default {
  name: 'Counter',
  computed: {
    ...mapState('counter', 'count'),
  },
  methods: {
    ...mapAction('counter', {
      increment: action => action.incr,
      decrement: action => action.decr
    })
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.mr-2 {
  margin-right: 8px;
}
</style>
```

### **Và với vuex-module-decorators**
Tương tự với setup ở file **main.js** và **store/index.js**

Chỉ khác ở file **module**

```typescript
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
  name: "CounterModule",
  namespaced: true,
  stateFactory: true,
})
export default class CounterModule extends VuexModule {
  count = 0;

  @Mutation
  increment(delta: number) {
    this.count += delta;
  }
  @Mutation
  decrement(delta: number) {
    this.count -= delta;
  }

  @Action({ commit: "increment" })
  incr() {
    return 5;
  }
  @Action({ commit: "decrement" })
  decr() {
    return 5;
  }
}
```

**Sử dụng ở Component**

```html
<template>
  <div>
    <h2>{{ counterModuleInstance.count }}</h2>
    <a-button class="mr-2" @click="counterModuleInstance.incr">-5</a-button>
    <a-button type="primary" @click="counterModuleInstance.decr">+5</a-button>
  </div>
</template>

<script lang="ts">
import { getModule } from "vuex-module-decorators";
import { Component, Vue } from "vue-property-decorator";
import CounterModule from "@/store/modules/CounterModule";

@Component({
  name: "Couter",
})
export default class Couter extends Vue {
  private counterModuleInstance: any;

  created() {
    this.counterModuleInstance = getModule(CounterModule, this.$store);
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.mr-2 {
  margin-right: 8px;
}
</style>
```

Vậy là xong rồi nhé :D

Còn rất nhiều các option, decorator khác rất hay các bạn đọc thêm ở nguồn dưới nhé !

## Lời Kết
Vậy là chúng ta đã vừa xây dựng được 1 Vue Project trông "nguy hiểm" hơn rồi đấy :D cũng đơn giản đúng không nào, Hy vọng nó sẽ giúp ích cho các bạn trong công việc, hay là có một cái nhìn mới mẻ hơn về Vue nhé :grinning:.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

Cảm ơn bạn đã ghé thăm :heart_eyes:

Các nguồn tham khảo [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
| [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators)

Mình có post toàn bộ code lên github các bạn có thể xem ở đây nhé: [GITHUB](https://github.com/nhanpv-2250/vue-vuex-decorator)