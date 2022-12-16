Bài trước chúng ta đã được giới thiệu về state và getters bài hôm nay chúng t sẽ đi vào cách dùng của mutations và actions

## Mutation
Ta thực hiện chức năng xóa 1 bài viết trong danh sách posts

Post.vue
```
<template>
  <div>
    <h1>Danh sách bài viết</h1>
    <ul>
      <li class="mt-2 d-flex justify-content-between" v-for="post in posts" :key="post.id">
        {{ post.title }}
        <button class="btn btn-danger btn-sm" @click="deletePost(post.id)">Xóa</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "list-post",
  computed: {
    ...mapGetters(["posts"])
    // posts() {
    //   return this.$store.getters.posts;
    // }
  },
  methods:{
    deletePost(postId){
      //thực hiện gọi đến mutations
      this.$store.commit('DELETE_POST',postId)
    }
  }
};
</script>
<style scoped></style>
```
posts.js
```js
mutations: {
    DELETE_POST(state, postId) {
      state.posts = state.posts.filter(post => post.id !== postId);
    }
  }
```
Để gọi tới hàm xóa DELETE_POST trong mutations ta dùng this.$store.commit để gọi tới, và hàm DELETE_POST sẽ thực hiện chức năng xóa bài viết cho chúng ta

## Actions
Ta dùng actions thực hiện việc xóa item data trong posts

Post.vue
```js
<template>
  <div>
    <h1>Danh sách bài viết</h1>
    <ul>
      <li class="mt-2 d-flex justify-content-between" v-for="post in posts" :key="post.id">
        {{ post.title }}
        <button class="btn btn-danger btn-sm" @click="deletePost(post.id)">Xóa</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "list-post",
  computed: {
    ...mapGetters(["posts"])
    // posts() {
    //   return this.$store.getters.posts;
    // }
  },
  methods:{
    deletePost(postId){
      this.$store.dispatch('deletePost',postId)
    }
  }
};
</script>
<style scoped></style>
```
Ta có thể gọi actions 1 cách ngắn gọn hơn
```js
  methods:{
   ...mapActions(['deletePost'])
  }
```

posts.js
```js
actions: {
    deletePost(context, postId) {
      context.commit("DELETE_POST", postId);
    }
  },
  mutations: {
    DELETE_POST(state, postId) {
      state.posts = state.posts.filter(post => post.id !== postId);
    }
  }
```

Chú ý actions khá giống mutations, sự khác biệt là
* Thay vì mutations dùng commit, actions dùng dispatch để gọi.
* Actions có thể chứa các hoạt động không đồng bộ. Vì vậy, chúng ta có thể gọi  API gọi trong một actions và kết quả trả về có thể thay lưu lại qua mutation

Để gọi tới hàm xóa DELETE_POST trong actions ta dùng this.$store.dispatch để gọi tới, và hàm deletePost sẽ thực hiện gọi tới hàm DELETE_POST trong mutations và nó thực chức năng xóa bài viết. Trong actions trong hàm deletePost ta có thể thực hiện 1 thao tác, nghiệp vụ nào đó thì sau mới gọi tới mutations để xóa dữ liệu. Để giải thích kỹ cho vấn đề tại sao phải gọi qua mutations qua actions thì chúng ta sẽ đi vào ví dụ bên dưới


## Lấy dữ liệu qua api dùng axios
Phía trên chúng ta đã lấy dữ liệu tĩnh bây giờ mình sẽ lấy dữ liệu posts dùng axios
* Thiết lập package axios `npm i axios` 
* Lấy danh posts qua api
Mình dùng 1 api fake lấy  data posts ở https://jsonplaceholder.typicode.com/ 
Post.vue
```js
<template>
  <div>
    <h1>Danh sách bài viết</h1>
    <ul>
      <li
        class="mt-2 d-flex justify-content-between"
        v-for="post in posts"
        :key="post.id"
      >
        {{ post.title }}
        <button class="btn btn-danger btn-sm" @click="deletePost(post.id)">
          Xóa
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "list-post",
  computed: {
    ...mapGetters(["posts"])
    // posts() {
    //   return this.$store.getters.posts;
    // }
  },
  created() {
    this.getPosts();
  },
  methods: {
    ...mapActions(["deletePost","getPosts"]),
    deletePost(postId) {
      this.$store.dispatch("deletePost", postId);
      // this.$store.commit('DELETE_POST',postId)
    }
  }
};
</script>
<style scoped></style>
```
posts.js
```js
import axios from "axios";

const postModule = {
  state: {
    posts: []
  },
  getters: {
    posts: state => state.posts
  },
  actions: {
    async getPosts({ commit }) {
      const url = "https://jsonplaceholder.typicode.com/posts?_limit=4";
      axios
        .get(url)
        .then(res => {
          // console.log(res);
          commit("SET_POSTS", res.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    deletePost(context, postId) {
      context.commit("DELETE_POST", postId);
    }
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    DELETE_POST(state, postId) {
      state.posts = state.posts.filter(post => post.id !== postId);
    }
  }
};
export default postModule;
```
Ở `posts.js` ta dùng hoạt động không đồng bộ actions  getPosts để gọi api danh sách posts và đẩy data xuống mutations và thiết lập vào state.posts
`Post.vue` ta gọi tới actions `getPosts()`, khởi tạo dữ liệu tại created(), lấy lại dữ liệu từ `...mapGetters(['posts'])`
Ví dụ trên ta đã lấy sử dụng actions để lấy dữ liệu bất đồng bộ data posts đó là lý do tại sao t lại cần dùng đến actions, phần xóa bạn có thể luyện tập làm thêm để nắm bắt thêm kinh nghiệm