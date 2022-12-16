# 1. Vuex Class Component
Vuex class component(VCC) là 1 thư viện giúp bạn viết Vuex Module hoặc Store sử dụng ES6 Classes và ES7 Decorators. Mục đích chính của VCC là:
- Giúp bạn viết Vuex Modules dễ dàng hơn.
- Cung cấp proxy cho getters, mutations, và actions
- Tạo ra Vuex Manager giúp bạn gọi tất cả các methods của Vuex dễ dàng hơn

Ví dụ khi bạn muốn gọi 1 commit trong vuex, bạn sẽ cần phải nhớ namespace của module:
```js
this.$store.commit('foo/bar/doSomething', var);
```

Khi bạn dùng VCC
```js
vxm.foo_bar.doSomething(var);
```

Có thể dễ dàng thấy được nếu dùng VCC thì code của chúng ta sẽ dễ đọc hơn so với cách truyền thống. Các bạn có thể đọc chi tiết hơn ở đây https://github.com/michaelolof/vuex-class-component

# 2. Cài đặt

- Cài đặt nuxt

```
yarn create nuxt-app nuxt-demo
```
![](https://images.viblo.asia/73657d77-1fc1-4261-830f-82775aa6496d.png)

- Cài đặt Vuex Class Component

```
yarn add vuex-class-component
```

- Tạo folder `user` và file `index.js` trong folder `store`

```js
import { createModule } from 'vuex-class-component';

const VuexModule = createModule({
  namespaced: "user",
  strict: false,
  target: "nuxt",
})

export class UserStore extends VuexModule {
  firstname = "Son";
  lastname = "Le";

  get fullname() {
    return this.firstname + " " + this.lastname;
  }
}

```

- Tạo file `index.js` trong folder `store`

```js
import { Store } from 'vuex';
import { UserStore } from '~/store/user';
import { extractVuexModule } from 'vuex-class-component';

export default function () {
  return new Store({
    modules: {
      ...extractVuexModule( UserStore )
    }
  });
}

```

- Tạo file `store_proxy.js` trong folder `plugins`

```js
import { UserStore } from '~/store/user';
import { createProxy } from 'vuex-class-component';

export let storeProxy;

export default function ({ store }) {
  storeProxy = {
    user: createProxy(store, UserStore)
  }
}

```

- Thêm `store_proxy` vào `nuxt.config,js`

```js
plugins: [
  '~/plugins/store_proxy'
],
```

- Sửa lại file `index.vue` trong folder `pages`

```js
<template>
  <div class="container">
    <input v-model="user.firstname">
    <input v-model="user.lastname">
    <h1>{{ fullname }}</h1>
  </div>
</template>
<script>
import { storeProxy } from '~/plugins/store_proxy';

export default {
  data() {
    return {
      user: storeProxy.user,
    }
  },
  computed: {
    fullname() {
      return storeProxy.user.fullname;
    }
  }
}
</script>

```

Chạy lệnh `yarn dev` và mở http://localhost:3000/ để xem kết quả. Khi bạn sửa `firstname` hoặc `lastname` trên input, state sẽ tự động được update lại mà ko cần phải chạy `commit`.