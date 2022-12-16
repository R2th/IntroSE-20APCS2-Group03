Tiếp tục với loạt bài về Vue.js & Rails API, hôm nay mình sẽ giới thiệu với mọi người về một thư viện rất `quyền lực` của Vue.js đó là `Vuex`. Nó cũng tương tự như `Redux` của `React`. Vậy `Vuex` là gì? Và tại sao nó lại `thần thánh` như vậy?<br><br>
![](https://images.viblo.asia/94073edf-40f8-4dee-ab6d-7100a97a59f7.png)
## Vuex là gì?
Theo tài liệu chính thức về Vuex thì:<br>
>Vuex is **a state management pattern + library** for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. It also integrates with Vue's official devtools extension to provide advanced features such as zero-config time-travel debugging and state snapshot export/import.

<br>
Nói dễ hiểu, Vuex là thư viện mẫu giúp quản lý trạng thái các component trong ứng dụng
Vue.js, đây là nơi lưu trữ tập trung tất cả các component trong một ứng dụng, với
nguyên tắc trạng thái chỉ có thể được thay đổi theo kiểu có thể dự đoán.

## Tại sao nên sử dụng Vuex?
Như chúng ta đã biết thành phần chính trong các ứng dụng có sử dụng Vue.js là các `component`. Và luồng xử lý của Vue.js là ***luồng dữ liệu một chiều***, nghĩa là:
- Dữ liệu đi từ component cha xuống component con (qua *props*, *watch*, ...)
- Nếu component con muốn tác động để thay đổi dữ liệu của component cha thì phải tạo một `event` để thằng cha lắng nghe, cha thay đổi dữ liệu của mình rồi mới thay đổi dữ liệu của component con.

Vậy nên, những ứng dụng đơn giản thường chỉ có `state`, `view` và `action`.

![](https://images.viblo.asia/17096598-8e6a-4ccd-993b-8e3594eeb0a0.png)
- ***State:*** nơi bắt đầu thực hiện ứng dụng.
- ***View:*** các khai báo ánh xạ của state.
- ***Actions:*** là những hành động làm thay đổi state với đầu vào từ view.

*Tóm lại:* Nếu có một `action` làm thay đổi `state` thì sẽ dẫn đến thay đổi dữ liệu thực hiện ở `view`.<br><br>
Cách hoạt động đơn giản trên có thể dễ dàng bị phá vỡ khi nhiều component cùng chia
sẻ một state chung.

![](https://images.viblo.asia/bd5f4df2-3baf-4868-a7df-4be04905be02.png)

Nhiều `view` có thể cùng phụ thuộc vào một trạng thái. Các `actions` từ nhiều `view` khác nhau có thể biến đổi cùng một `state`, gây ra xung đột. Hay chỉ đơn giản khi quy mô ứng dụng lớn, tác động tới hàng trăm `components`, đường dẫn khác nhau.<br><br>
Vậy tại sao chúng ta không `tách state` được chia sẻ ra khỏi các component và quản lý nó trong một `bộ máy toàn cục` `lưu trữ tập trung` (a singleton global)? <br>
Và đó chính là nguyên nhân cho sự ra đời của `Vuex`.

Với Vuex các component sẽ trở thành các `view` và có thể truy xuất `state` hoặc thực
thi các `actions`.

![](https://images.viblo.asia/eea7cc77-54c0-44ea-acd4-1368fefdbf07.png)
## Các khái niệm trong Vuex
### State 
Vuex sử dụng một `cây trạng thái` duy nhất, nó sẽ chứa tất cả các trạng thái của ứng dụng. Do vậy, sẽ chỉ có một vị trí lưu trữ tập trung, giúp việc xác định các trạng thái dễ dàng và đơn giản hơn.
Để sử dụng `state` trong component, chúng ta có thể gọi nó qua `function() data`:
```javascript
const CommentStore = {
  namespaced: true,
  state: {
    comments: [],
    comment: {},
    current_user: {}
  },
  ...
 }
```
```javascript
export default {
  data: function() {
    return this.$store.state.CommentStore;
  },
  ...  
}
```
### Mutations 
Chứa các chức năng để thực hiện thay đổi trạng thái. `Mutation` tương tự như các `event`, nó gồm một String và một `handler function`.
```javascript
mutations: {
   getComments(state, comments) {
     state.comments = comments;
       return state.comments;
   },
   getComment(state, comment) {
     state.comment = comment;
       return state.comment;
   }
    ...
  },
 ```
`Handler function` là nơi thực hiện thay đổi các trạng thái và nó cần tham số `đầu tiên` là `state`.<br>
State sẽ không thể thay đổi trực tiếp mà cần phải được thay đổi thông qua việc thực thi các `handler function` khi gọi method `commit` ở `actions`.
```js
actions: {
  index(context, postId) {
    $.ajax({
      url: `posts/${postId}/comments`,
      type: 'GET',
      success: function(data) {
        context.commit('getComments', data)
      }
    })
  },
  ...
}
```
### Actions
Đây cũng là các chức năng tương tự như `mutations` nhưng có hai sự khác biệt. 
- Đầu tiên, các `actions` được sử dụng cho các hoạt động không đồng bộ, vì vậy chúng rất phù hợp để thực hiện các yêu cầu `HTTP` (gọi API để lấy dữ liệu từ server, hành động thay đổi dữ liệu trong database, ...). 
- Thứ hai, các `actions` chỉ lên state bằng cách gọi các `mutations`.


Và các actions sẽ được thực thi khi sử dụng method `dispatch`
```js
export default {
  data: function() {
    return this.$store.state.CommentStore;
  },
  created: function() {
    this.$store.dispatch('CommentStore/index', this.$route.params.id)
  },
  components: {
    Comment: Comment
  }
}
```
### Getters
Thỉnh thoảng chúng ta cần lấy các trạng thái dựa vào việc tính toán, loại bỏ, filter các trạng thái được cung cấp. Nếu nhiều component cần làm điều này, thì có thể định nghĩa `getters` trong `store` để thực hiện.
```js
state: {
  comments: [
    { id: 1, content: '...', post: 'Post 1' },
    { id: 2, content: '...', post: 'Post 2' }
  ]
},
getters: {
  getPosts: state => {
    return state.comments.filter(comment => comment.post)
  }
}
```
### Modules
Do chỉ sử dụng một cây trạng thái duy nhất nên tất cả các trạng thái của ứng dụng đều được chứa trong một đối tượng. Do vậy, khi quy mô của ứng dụng tăng thì `store` chắc chắn sẽ phình to.<br>
Và Vuex cho phép chúng ta `chia nhỏ` store thành các `module` bé hơn. Mỗi module nhỏ hơn đều có **state**, **mutations**, **actions**, **getters** hay cả các **module lồng nhau** khác.
```js
const CommentStore = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}
const PostStore = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}
const store = new Vuex.Store({
  modules: {
    CommentStore,
    PostStore,
    ...
  }
});
```
## Khi nào nên sử dụng Vuex?
Vuex là sự lựa chọn hoàn hảo cho các ứng dụng SPA tầm trung đến lớn với mã nguồn có cấu trúc rõ ràng và nâng cao khả năng duy trì, mở rộng.<br>
Vuex giúp giải quyết việc `quản lý` state được chia sẻ có hiệu quả với chi phí cho nhiều khái niệm và bản tóm tắt hơn. Cân bằng giữa tốc độ và hiệu năng của dự án. Đó là sự đánh đổi giữa hiệu năng ngắn hạn và dài hạn.

Bây giờ, mình sẽ thực hiện setup Vuex cho ứng dụng đã tạo ở [phần 1](https://viblo.asia/p/vuejs-rails-api-phan-1-tich-hop-vuejs-vao-ung-dung-rails-gAm5yWoXZdb) trước khi bắt tay vào thực hiện một `TODO list` đơn giản với Vuex.
- Install Vuex (qua yarn/npm)
```js
npm install --save vuex
```
Có thể cần chạy thêm lệnh `yarn install --check-files`
- Tạo và sắp xếp các thư mục như hình sau:

![](https://images.viblo.asia/3d0b91c5-e1e1-47db-8257-0a7e3d6abf3b.png)

- Thêm vào **index.js**
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
  }
});

export default store;
```
- Thêm Vuex store vào **application.js**
```js
import Vue from 'vue'
import App from 'src/components/app.vue'
import store from 'src/vuex'

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app', 
    store,     
    render: h => h(App)
  }).$mount()
  document.body.appendChild(app.$el)
})
```
Bây giờ khi cần tạo store mới chúng ta chỉ cần thêm file mới trong thư mục `stores` và `import` nó trong **index.js**.
Và tất cả đã sẵn sàng :D .
## Kết luận
- `State` được lưu trữ dưới dạng một `JSON Object` lớn.
- `Getters` được sử dụng để truy cập các giá trị được lưu trữ trong state.
- `Mutations` sẽ cập nhật state. Cần nhớ rằng `mutations` là `synchronous`.
- Tất cả các hoạt động bất đồng bộ phải được thực hiện trong `actions`. `actions` thay đổi trạng thái bằng cách `commit` một mutation.
- Luôn luôn chỉ thực hiện `mutation` thông qua một `action`.
- Các `module` có thể được sử dụng để tổ chức `store` thành nhiều tệp lưu trữ nhỏ hơn.

<br>
 
***Tham khảo***

1. [Vuex](https://vuex.vuejs.org/)
2. [Mastering Vuex — Zero to Hero](https://medium.com/dailyjs/mastering-vuex-zero-to-hero-e0ca1f421d45)