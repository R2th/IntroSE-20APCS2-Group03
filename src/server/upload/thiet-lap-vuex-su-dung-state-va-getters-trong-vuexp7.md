Ở bài trước mình đã giới thiệu sơ qua về vuex sang bài này mình sẽ đi chi tiết về cách dùng của state và getters
## Thiết lập sử dụng vuex
Các bạn có thể xem chi tiêt [tại đây](https://vuex.vuejs.org/installation.html#direct-download-cdn)
Mình hướng dẫn thiết lập bằng npm, các bạn mở project chạy lệnh sau để cài đặt vuex
```
npm install vuex --save
```
Sau khi cài đặt ta tạo 1 folder store để lưu trữ 
* Thiết lập file index.js cho 1 module
```js
file index.js cơ bản
import Vue from "vue";
import VueX from "vuex";
...
Vue.use(VueX);
const storeData = {
  state: {},
  getters:{},
  mutations:{},
  actions:{},
};
const store = new VueX.Store(storeData);
export default store;
```
Ta khai báo: state, getters, muations, actions trong storeData, các trạng thái và data sử dụng ta có thể định nghĩa trong từng phần tương ứng
* Thiết lập file index.js khi có nhiều modules
Khi có nhiều modules thiết lập thì chúng ta dùng như sau
```js
import Vue from "vue";
import VueX from "vuex";
Vue.use(VueX);
const moduleUser = {
  state: {},
  mutations: {},
  actions: {},
  getters: {}
};
const modulePost = {
  state: {},
  mutations: {},
  actions: {}
};
const storeData = {
  modules: {
    posts: modulePost,
    users: moduleUser
  }
};
const store = new VueX.Store(storeData);
export default store;

store.state.posts // -> `modulePost`'s state
store.state.users // -> `moduleUser`'s state
```
Chúng ta cũng có thể tách file ra cho gọn gàng dễ nhìn
index.js
```js
import Vue from "vue";
import VueX from "vuex";

// import modules
import auth from "./modules/users";
import todos from "./modules/posts";

Vue.use(VueX);
const storeData = {
  modules: {
    users,
    posts
  },

};
const store = new VueX.Store(storeData);

export default store;
```
tạo folder modules để lưu các module xử lý
posts.js
```js
import axios from "axios";

const postModule = {
  state: {
    posts: []
  },
  getters: {},
  actions: {},
  mutations: {}
};
export default postModule;
```
## State 
* Ví dụ ta có 1 danh sách cách bài viết tĩnh muốn hiển thị lên như sau
Thiết lập data bài viết trong state
po
```js
 state: {
    posts: [
      {
        id: 1,
        title: "Bài viết số 1"
      },
      {
        id: 2,
        title: "Bài viết số 2"
      },
      {
        id: 3,
        title: "Bài viết số 3"
      },
      {
        id: 4,
        title: "Bài viết số 4"
      }
    ]
  },
```
Lấy danh sách bài viết ra render ở component
Post.vue
```vue
<template>
  <div>
    <h1>Danh sách bài viết</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "list-post",
  computed: {
    posts() {
      return this.$store.state.posts.posts;
    }
  }
};
</script>
<style scoped></style>
```
Vậy ta đã lấy được danh sách bài viết dựa vào store và state
## Getters
* Ta có cách khác để lấy được data posts dùng getters để trả về data
posts.js
```js
 getters: {
    posts: state => state.posts
  },
```
Post.vue thay vào computed:
```js
posts() {
  return this.$store.getters.posts;
}
```
Ta có thể gọi getters ngắn gọn như sau
```js
import { mapGetters } from "vuex";
export default {
  name: "list-post",
  computed: {
    ...mapGetters(["posts"]),
    // posts() {
    //   return this.$store.getters.posts;
    // }
  }
};
```
Như vậy mình đã giới thiệu cho mọi người thiết lập vuex cách dùng state và getters bạn cần luyện tập nhiều hơn để hiểu rõ hơn. Bài sau mình sẽ giới thiệu cho các bạn về mutations và actions cách lấy data động