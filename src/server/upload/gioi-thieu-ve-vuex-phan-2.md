Ở [phần trước](https://viblo.asia/p/gioi-thieu-ve-vuex-phan-1-RQqKLEOmZ7z), mình đã đi qua phần lý thuyết cơ bản nhất về Getters, Mutations, Actions trong Vuex. Với những vấn đề cơ bản như vậy thì chúng ta có thể bắt đầu với một ví dụ đơn giản để thực hành với Vuex trong bài này.

Nếu bạn nào đã đọc bài [Một số khác biệt cơ bản giữa Vue và React qua một ví dụ đơn giản](https://viblo.asia/p/mot-so-khac-biet-co-ban-giua-vue-va-react-qua-mot-vi-du-don-gian-YWOZrzkrZQ0) thì có thể bạn đã thực hiện được ví dụ ToDo đơn giản mà không cần dùng đến những khái niệm về Store cũng như Vuex tương đối khó hiểu ở đây. Với ví dụ trong bài này thì mình tiếp tục sử dụng repo github của bài trên để viết lại các phần tương tác với store. Từ đây bạn cũng có thể tiện cho việc theo dõi cũng như những sự khác biệt khi sử dụng Vuex trong dự án.

Repo: [https://github.com/hieubui1195/vue-todoapp](https://github.com/hieubui1195/vue-todoapp/commit/7b889b2eb3fdf4780f5064cf61b3ce8d8f3d04e6)

# Cấu trúc thư mục và cài đặt
So với repo cũ thì mình không thay đổi cấu trúc code nhiều. Mình chỉ thêm 1 thực mục là `store`  vào `src` để thực hiện các logic liên quan đến Vuex. Nếu với 1 dự án to thì trong thư mục sẻ bao gồm các file riêng biệt `actions.js`, `mutations.js` nhưng trong này thì mình viết chung vào file `index.js` vì số lượng code không nhiều.

Với repo hiện tại thì mình chỉ cần cài thêm Vuex và sửa lại `src/main.js` thêm store vào ứng dụng.
```sh
npm install vuex
```
Tạo Vuex store:
```js
// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({})
```
Thêm store vào ứng dụng
```js
// src/main.js
import Vue from 'vue';
import ToDo from './ToDo.vue';
import { store } from '../src/store';

new Vue({
    el: '#app',
    store,
    render: h => h(ToDo),
});
```

# Định nghĩa State
Thay vì như code cũ mình khởi tạo gía trị vào data() của component thì bây giờ mình đã chuyển sang sử dụng store thì việc khởi tạo các giá trị ban đầu sẽ được đưa vào state của store như sau: 
```js
// src/store/index.js
export const store = new Vuex.Store({
    state: {
        todo: '',
        list: [
            {
                todo: 'fix bugs'
            },
            {
                todo: 'write reports'
            }
        ]
    }
}
```
Vì chúng ta đã bỏ các giá trị khởi tạo trong Vue Component và chuyển vào store nên chúng ta cần sửa lại component để nó có thể nhận được dữ liệu trong store (nếu cần). 

Trước tiên chúng ta sử dụng `mapState` để lấy state từ store ra component:
```js
// src/ToDo.vue
computed: {
        ...mapState([
            'todo',
            'list'
        ]),
    },
```
Vì chúng ta định nghĩa biến từ state giống với như code ban đầu cũng bao gồm 2 data là `todo` và `list` nên chúng ta không cần sửa lại biến trong component.

# Getters
Như ở trên thì chúng ta đang sử dụng `mapSate` để trực tiếp lấy dữ liệu trong store. ĐIều này vẫn ổn cho đến khi chúng ta cần tính toán dữ liệu. Và bay giờ chúng ta chuyển sang sử dụng Getters. Với ví dụ chúng ta muốn đến số item có trong todo list, ta dùng getters như sau:
```js
// src/store/index.js
getters: {
    countToDos: state => state.list.length
},
```
Ở trên ta định nghĩa một getter là `countToDos`. Nó truy cập vào state và trả về length của `list` trong state.

Để sử dụng getter này trong component ta lại dùng đến `mapGetters`:
```js
// src/ToDo.vue
computed: {
    ...mapGetters([
        'countToDos'
    ]),
},
```
Hiển thị trong component:
```js
// src/ToDo.vue
<h3>Count To Do: {{ countToDos }}</h3>
```
Kết quả trả về của việc lấy trực tiếp state và sử dụng getter là giống nhau, bạn có thể sử dụng getter để lấy danh sách todo list (mình đã viết getter là getToDos bạn có thể chỉnh sửa lại component để thấy kết quả).

# Mutations
Với 2 phần ở trên thì ta chỉ mới dừng lại ở việc hiển thị dữ liệu từ state. Còn để thực hiện các hành động thay đổi dữ liệu thì cần sử dụng đến mutations.

Ví dụ khi thay đổi giá trị của ô input thì cập nhật lại giá trị của todo trong state:
```js
// src/store/index.js
mutations: {
        ...
        INPUT_CHANGE: (state, todo) => {
            state.todo = todo;
        },
         ...
    },
```
Sử dụng `mapMutations` để import mutation là `INPUT_CHANGE`. Đồng thời thêm method là `inputChange` để input gọi đến mỗi khi thay đổi giá trị:
```js
// src/ToDo.vue
methods: {
    ...mapMutations([
        'INPUT_CHANGE'
    ]),
    inputChange: function(event) {
        this.INPUT_CHANGE(event.target.value);
    }
},
```
Hiện thị giá trị todo ngay khi có sự thay đổi ô input:
```js
// src/ToDo.vue
<input type="text" v-bind:value="todo" @input="inputChange" name="todo" />
```
# Actions
Gọi trực tiếp đến mutations trong component là đối với các sự kiện đồng bộ. Nếu bạn thực hiện chức năng không đồng bộ thì bạn sử dụng actions.

Ta thực hiện ví dụ thêm 1 item vào danh sách todo bằng cách sử dụng actions.

Thêm mutation và action để tạo item mới và xóa ô input sau khi thêm mới thành công:
```js
// src/store/index.js
mutations: {
    CLEAR_INPUT: (state) => {
        state.todo = '';
    },
    ADD_ITEM: (state, todo) => {
        state.list.push({todo});
    }
},
actions: {
    addItem: (context, todo) => {
        context.commit('ADD_ITEM', todo);
        context.commit('CLEAR_INPUT');
    }
}
```
Không có gì đặc biệt đối với mutation là `ADD_ITEM`. Nhưng đối với `actions` thì ta tạo thêm một action là `addItem` trong context và payload là `todo`.

Sau đó, ta gọi `context.commit` tại nơi gọi đến mutaion là `ADD_ITEM` cũng như đưa vào payload là `todo`. 

Chuyển sang ToDo component. Ta lại sử dụng đến `mapActions`:
```js
// src/ToDo.vue
methods: {
    ...mapActions([
        'addItem'
    ]),
    addItem: function() {
        this.$store.dispatch('addItem', this.$store.state.todo);
    },
    handleKeyPress: function() {
        this.addItem();
    }
},
```
Với method là `addItem` thì ta sử dụng `dispatch` để phát đi một action tên `addItem` đã được khai báo trong `mapActions` ở trên. Tại đây nó sẽ thực hiện đến `addItem` được định nghĩa trong acitons và lại gọi đến muations là `ADD_ITEM`.

Kết quả của việc sử dụng actions và chỉ sử dụng muations là giống nhau. Bạn có thể tự viết lại.
# Kết luận
Với lý thuyết ở phần 1, ta chỉ cần chỉnh sửa lại code từ ví dụ không sử dụng đến store là ta đã có thể dễ dàng áp dụng Vuex vào. Việc phân chia nhiều thành phần nhỏ như trên vậy ban đầu có thể hơi khó hiểu hết. Tuy nhiên đây là cách quản lý state tối ưu cũng như mô-đun hóa code để có thể tái sử dụng sau này. Cảm ơn mọi người đã theo dõi bài viết của mình. Xin nhận mọi sự góp ý :smile: .
# Tham khảo 
https://vuex.vuejs.org/