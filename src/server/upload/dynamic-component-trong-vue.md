Hôm nay mình xin giới thiệu tới các bạn một khái niệm nâng cao về Vue(**`Dynamic Component`**). Cùng nhau đi qua những phần sau:
1. `Dynamic Component` là gì?
2. Tạo sao `Dynamic Component` lại quan trọng ?
3. Syntax + demo

### 1. `Dynamic Component` là gì?
`Dynamic Component` cho phép user chuyển đổi 2 hoặc nhiều component không routing. Thậm chí có thể giữ state khi chuyển đổi trở lại component.

Đây như là một idea để user mount hoặc unmount component về UI mà không sử dụng routes.

### 2. Tạo sao `Dynamic Component` lại quan trọng ?
Khi bạn thiết kế UI, nếu bạn muốn có form linh động để hiện hoặc ẩn components dựa vào state. `Dynamic Components` xử lý việc này đơn giản và hiệu quả.

Tín năng giúp bạn giảm thiểu số lượng dòng code, bạn cũng có thể không cần `Dynamic Component` bằng việc sử dụng những `conditional directive` như là `v-if` `v-else`.

### 3. Syntax + demo

##### 1. Cú pháp
Vue đưa ra một element để `Dynamic Component` được gọi là **component**. Xem cú pháp nó nhé.

```javascript
<component v-bind:is=”currentComponent”/>
```
##### 2. Demo
Các bước tạo nhanh dự án:
1. `vue create vue-dynamic-component`
2. `cd vue-dynamic-component`

Dự án gồm 2 component `Test.vue` và `Test2.vue` được import vào trong `App.vue`.

```javascript
// Test.vue
<template>
  <div>
    <h1>I am Test 1</h1>
    <form>
      First name:<br />
      <input type="text" name="firstname" /><br />
      Last name:<br />
      <input type="text" name="lastname" />
    </form>
  </div>
</template>
```

```javascript
// Test2.vue
<template>
  <div><h1>I am Test 2</h1></div>
</template>
<script>
export default {
  name: "Test2",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```

```javascript
// App.vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <component v-bind:is="currentComponent" /> // (1)
    <button v-on:click="toggle">Toggle</button>
  </div>
</template>

<script>
import Test from "./Test.vue";
import Test2 from "./Test2.vue";

export default {
  name: "App",
  components: {
    Test,
    Test2,
  },
  data() {
    return {
      component: "Test2",
    };
  },
  methods: {
    toggle() {
      if (this.currentComponent === Test) {
        this.currentComponent = Test2;
      } else {
        this.currentComponent = Test;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```
(1): Ở `component` sẽ dựa vào `currentComponent` để render `Test` hoặc `Test2`

##### 3. Giữ data khi chuyển đổi giữa những component.
Bạn có thể thấy rõ khi :
1. `Test` nhập form
2. Click `Toggle` sang `Test2`
3. Click `Toggle` về lại `Test`

=> Dữ liệu bạn nhập ở form sẽ bị mất. Vì nó rerender component mới khi bạn chuyển đổi component. Nếu trong một số trường hợp, yêu cầu bài toán của bạn là giữ nguyên dữ liệu khi chuyển đổi component. Bạn hãy sử dụng `keep-alive` component.

Hãy thử sửa đổi file `App.vue` và làm lại những bước trên xem có sự khác biệt gì nhé.
```javascript
// App.vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <keep-alive>
      <component v-bind:is="currentComponent" />
    </keep-alive>
    <button v-on:click="toggle">Toggle</button>
  </div>
</template>
...
```

Nguồn tham khảo: https://blog.logrocket.com/how-to-make-your-components-dynamic-in-vue-js/

Nếu thấy không hiểu hoặc có những góp ý cho bài viết thì mong các bạn để lại comment nhé !@#$%^&*