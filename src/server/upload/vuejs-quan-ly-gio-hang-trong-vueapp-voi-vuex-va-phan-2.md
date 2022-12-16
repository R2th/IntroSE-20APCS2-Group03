Chào mọi người, hôm nay mình lại tiếp tục viết về VueJS với chủ đề: Giỏ hàng trong VueJS.

## I. Giới thiệu:
### 1. Thao tác với giỏ hàng qua ?
Tiếp tục là [Lazada](https://www.lazada.vn/#), chúng ta có thể dễ dàng nhận thấy 1 `user` sẽ phải login để có thể thao tác với giỏ hàng cũng như cho lần sử dụng kế tiếp. Vậy nếu không cần `login` mà vẫn có thể thao tác với giỏ hàng và đặt hàng thì phải làm sao? Chưa `login` thì lưu giỏ hàng cho các lần truy cập web sau kiểu gì?

Chúng ta có thể lưu dữ liệu giỏ hàng tạm thời vào [`Windows LocalStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) , trong trường hợp người dùng không muốn `login`, và cách này đã được sử dụng ở khá nhiều trang web bán hàng, ví dụ như trang [Coolmate](https://www.coolmate.me/).

### 2. Một vấn đề nhỏ của việc giao tiếp LocalStorage trong VueJS:
Trong VueJs, chúng ta có khái niệm [`reactivity`](https://vi.vuejs.org/v2/guide/reactivity.html), được sơ lược thông qua bức hình sau:

![](https://images.viblo.asia/c0672566-5e8a-4411-a641-c7790bbede82.png)

Giải thích ngắn gọn cho ý nghĩa của bức hình cũng như `reactivity`: Mỗi khi chúng ta tạo 1 đối tượng `data` bên trong VueJS, VueJS sẽ đồng thời tạo ra `setter - thay đổi dữ liệu, getter - nhận dữ liệu` cho đối tượng `data` đó, đồng thời cũng có thêm 1 `watcher` để lắng nghe sự thay đổi (`setter`) và tiếp nhận xử lý (đôi khi là `re-render component`).

Nhưng đối với `LocalStorage`, Vue không thể biến `LocalStorage` thành 1 đối tượng con trong `Vue instance` để sử dụng khả năng `reactivity`, chúng ta chỉ có thể copy `LocalStorage` sang 1 biến trong VueApp và thao tác trên biến này để có thể sử dụng:

File Home.vue:
```html
<template>
  <div class="home">
    <div>Dữ liệu localStorage hiện tại: {{ valueLocalStorage }}</div>
    <button @click="setValue">Update value</button>
  </div>
</template>

<script>
import localStorage from "@/plugins/localStorage";

export default {
  name: "Home",
  computed: {
    valueLocalStorage() {
      return Number(localStorage.get());
    }
  },
  methods: {
    setValue() {
      return localStorage.set(this.valueLocalStorage + 1);
    }
  }
};
</script>
```

![](https://images.viblo.asia/744c7e34-a3f8-4272-aae8-b5dbf11dd0cf.gif)

Ảnh: `LocalStorage` được update nhưng giá trị [`computed`](https://vi.vuejs.org/v2/guide/computed.html) trong VueApp không được update theo.

Link code: [Here](https://github.com/trdbau/vue-demo-package/tree/vue_with_localStorage)

## II. Config:
### 1. Basic:
Như đã giới thiệu ở trên, để thao tác với `localStorage`, ta sẽ sử dụng một biến phụ để lắng nghe và thay đổi dữ liệu.
Trong hầu hết dự án, chúng ta sẽ sử dụng 1 `module/variable` của Vuex để theo dõi sự thay đổi này, song bạn cũng có thể sử dụng 1 biến `data` bình thường, như ví dụ đơn giản mà mình làm ở phía dưới.

Về cơ bản, ta sẽ tạo 1 biến phụ, copy dữ liệu của `localStorage` khi build trang web, và sử dụng biến mới như 1 `reactivity localStorage`, đồng thời update `localStorage` khi có update trong biến vừa tạo.

File Home.vue sau khi update:
```html
<template>
  <div class="home">
    <div>Dữ liệu localStorage hiện tại: {{ store }}</div>
    <button @click="setValue">Update value</button>
  </div>
</template>

<script>
import localStorage from "@/plugins/localStorage";

export default {
  name: "Home",
  data: () => ({
    store: localStorage.get()
  }),
  watch: {
    store() {
      localStorage.set(this.store);
    }
  },
  methods: {
    setValue() {
      return (this.store += 1);
    }
  }
};
</script>
```

![](https://images.viblo.asia/c8c03951-0e23-4cb6-a9e5-1add1a545d5e.gif)

Trong thực tế khi làm việc với `localStorage` kết hợp với Vuex, bạn cũng làm tương tự nhưng khi `dispatch action`, sẽ thêm dòng `localStorage.set` để update ở cả `localStorage`.

### 2. vuex-persist:
Ngoài việc tự tay tạo localStorage và setting các hàm `get/set`, chúng ta có thể sử dụng [`vuex-persist`](https://www.npmjs.com/package/vuex-persist). `vuex-persist` hỗ trợ `Cookies` và `localStorage`, tự động update các store cho chúng ta. Việc sử dụng `vuex-persist` cũng rất đơn giản, bạn chỉ cần install từ `npm`, sau đó config theo trình tự sau:

Tạo module làm việc của bạn:  (mình sử dụng module cho mọi dự án Vuex thay vì dùng state từ stores/index.js, vì việc scale của dữ liệu cũng như việc chia nhỏ thành từng module sẽ quản lý dễ dàng hơn)
```js
const state = {
  name: "localStorage",
  count: 0
};

const getters = {};

const mutations = {
  incrementLocalCount(state) {
    state.count++;
  }
};

const actions = {
  incrementLocalCount({ commit }) {
    commit("incrementLocalCount");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
```

Tiếp theo, ta sẽ nạp Module vào store:

```js
import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import localStorage from "./modules/localStorage";

const KEY = "vue-demo";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: KEY, // key của localStorage
  modules: ["localStorage"]
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { localStorage },
  plugins: [vuexLocal.plugin]
});
```

Kết quả tương tự như khi sử dụng `localStorage` bình thường:

![](https://images.viblo.asia/c992ef64-d1b5-4024-8525-a70c204a21af.gif)

Link code demo với `vuex-persist`: [Here!](https://github.com/trdbau/vue-demo-package/tree/vue_with_localStorage_and_vuex_persist)

## III. Kết bài:
Qua 2 bài viết, mình đã giới thiệu 1 case study đơn giản, đó là làm việc với giỏ hàng ở 2 trường hợp:

* Multiple tabs
* Lưu giỏ hàng cho User khi User chưa đăng nhập.

Mình cảm ơn các bạn đã đọc qua bài viết của mình. Nếu có thắc mắc hoặc bất cứ vấn đề liên quan, xin đừng ngần ngại mà hãy mạnh dạn phát biểu ở phần comment nhé ;).

Hẹn gặp lại các bạn ở những bài viết sau.