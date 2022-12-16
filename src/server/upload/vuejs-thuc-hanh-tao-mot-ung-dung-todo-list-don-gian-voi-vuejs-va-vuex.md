# Lời mở đầu: 
Loạt series của mình đã giới thiệu và đi qua những kiến thức cơ bản về Vue.js, VueX. Học phải đi đôi với hành. Ngày hôm nay mình 
xin được hướng dẫn mọi người tạo một app To Do đơn giản như hình dưới,  kết hợp những kiến thức cơ bản trong series  để chúng ta quen với việc sử dụng Vue kết hợp với VueX nhé. Nào Start nhé! 
![](https://images.viblo.asia/82e32390-af46-4235-b270-2d9f6090fdfa.png)

# Cài đặt
 Đầu tiên chúng ta sẽ kiểm tra xem máy mình có Vue CLI hay chưa : 
 
  ```linux
    $ vue --version
    @vue/cli 4.5.4
 ```
 
Nếu trả về kết quả như trên thì đã có Vue CLI và chúng ta có khởi tạo được một project thông qua CLI. Nếu chưa các bạn có dùng command ở dưới đây:\
(Ở đây mình đã cài sắn Nodejs và Node Package Manager  rồi nhé nếu các bạn chưa cài thì hãy cài trước khi xem hướng dẫn này nhé) 

Cài đặt vue cli cấp toàn cục (global) để chúng ta có thể init một project vue ở mọi nơi trong máy bạn.

```
$ npm install -g vue-cli
```

Nếu bắt đầu học mọi người sẽ thấy có phần cài đặt Vue thông qua cách nhúng link trực tiếp vào thẻ script của file html. Nhưng thực tế chúng ta ít khi làm như vậy. Chúng ta sẽ tạo luôn một cấu trúc thư mục cho vue để làm một ứng dụng bằng câu lệnh thông qua CLI như sau: 

```
vue init webpack your_project_name
```
![](https://images.viblo.asia/e9423187-3067-4a60-9136-84d1f36de4ed.png)

Các bạn có thể tùy chọn sử dụng Npm hoặc Yarn để chạy và quản lý các library. Nhưng mình đang dùng npm nên mình sẽ chọn sử dụng NPM luôn (Mọi người lên google tim hiểu thêm về Yarn nhé, nó cũng là một công cụ quản lý các thư viện trong javascript khả năng sắp thay thế cả npm :) nghe nói yarn ổn định và tốc độ hơn npm ) . 
OK, ấn enter để tiếp tục cài nào --- 
Cấu trúc thư mục thì mình đã giới thiệu như bài về Component của mình : https://viblo.asia/p/vuejs-component-ly-thuyet-va-cach-su-dung-Eb85oLbOK2G
Tuy nhiên chúng ta sẽ cài thêm VueX để quản lý state chung cho ứng dụng. :  
```
npm install vuex --save
```

Nếu các bạn muốn sử dụng Sweet  Alert trong Vue để thay thế cái alert nhàm chán mặc định của trình duyệt hãy sử dụng:
``` 
npm install -S vue-sweetalert2
```
Bài này mình sử dụng thêm boostrap nữa. Tiếp theo là câu lệnh để cài đặt boostrap vào 
```
npm install vue bootstrap-vue bootstrap
```
Tham khảo thêm: 
- https://bootstrap-vue.org/docs, 
- https://www.npmjs.com/package/vue-sweetalert2
# Làm thôi

Như vậy chúng ta đã cài đặt những package cần thiết cho bài này. 

Trước khi làm được ứng dụng này, các bạn nếu mới chỉ đọc bài này hãy dành chút thời gian đọc những bài trước của mình để có những kiến thức cơ bản về Vue.js, Vue-X (state, getters, mutations, actions) phục vụ cho việc thực hành nhé.

Đầu tiên ngoài những thư mục có sẵn trong folder src khi tạo mới ứng dụng. Mọi người hãy thêm vào một folder ``store`` trong src để sử dụng VueX nhé. Store là gì gì mời mọi người xem lại bài VueX của mình nhé (https://viblo.asia/p/vuejs-vuex-su-dung-co-ban-jvElayOdlkw).

Bước đầu tiên, bên trong file main.js chúng ta phải import tất cả các module trên (bắt buộc phải import mới sử dụng đc nhé): 
```javascript 
import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store/store.js' // file này mình tạo ở cuối bài nhé 
import VueSweetalert2 from 'vue-sweetalert2'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'sweetalert2/dist/sweetalert2.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)


Vue.config.productionTip = false

Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')

```

Mình sẽ tạo ra một Component chứa tất cả những thứ liên quan đến Todo và đặt trong components có tên là TodoList.vue : 

```html
<template>
    <div class="hello">
    {{ count }}
        <div class="box p-4" >   
            <div class="form-group ml-5 mr-5 row">
                <div class="col-10"> 
                    <input class="form-control" autofocus 
                        v-model.trim="newTodo" 
                        @keyup.enter="Add"  
                        placeholder="Nhập việc cần làm và ấn Enter để thêm"> 
                </div>
                <div class="col-2"> 
                    <button @click="Add" class="btn btn-primary">
                        Add task
                    </button>
                </div>
            </div>
            <div>
                <table class="mt-3 listTodo">  
                    <p v-if="toDos.length <= 0"> 
                        Danh sách trống 
                    </p>
                    <tr v-for="item in toDos" 
                        :key="item.id" 
                        :class="{completed: item.completed}">
                        <td>
                            <input 
                              class="mark" 
                              type="checkbox"
                              v-model="item.completed"> 
                            <span class="checkmark">
                            </span>
                        </td>
                        <td>
                            <div class="ok"> 
                                <label @click="edit(item)"> 
                                    {{ item.title | capitalize }} 
                                </label>
                                <input v-if="editting == item && item.completed!=true" 
                                    v-model="item.title" 
                                    :class="{}"
                                    @keyup.escape="doneEdit"
                                    @keyup.enter="doneEdit"
                                >
                            </div>
                        </td>
                        <td width="20%">
                            <a @click="Delete(item)" 
                              title="Xóa" 
                              class="delete badge badge-danger"
                            >
                               x
                            </a> 
                        </td>
                    </tr>
                </table> 
                <div class="m-5 text-left" >
                    <b> Bạn có {{ allTasks }} task </b>
                    <span class="badge badge-warning">
                        Task còn lại: {{ notDone }} 
                    </span> 
                    <span class="badge badge-success"> 
                        Task đã xong: {{ Done }} 
                    </span> 
                </div>
            </div> 
        </div>
        <br>
        <span> Click vào task để sửa, ấn Enter để submit </span>
    </div>
</template>
```

- script: 
```javascript
<script>
const LOCAL_STORAGE_KEY = 'todo-app'

export default {
  name: 'ToDoList',
  data: function() {
    return {
      toDos: this.$store.state.toDos,
      newTodo: this.$store.state.newToDo,
      editting: this.$store.state.editting
    }
  },
  methods: {
    Add () {
      this.$store.dispatch('addTask', this.newTodo)
    },
    Delete (item) {
      this.$swal.fire({
        title: 'are you sure?',
        icon: 'warning',
        showCancelButton: true
      }).then((result) => {
        if(result.isConfirmed) {
          this.$store.dispatch('deleteToDo', item)
          this.$swal('Done it')
        }
      })
    },
    edit (item) {
      this.editting = item;
    },
    doneEdit () {
      this.$swal('Done')
      this.editting = null;
    }    
  },
  computed: {
    notDone () {
      return this.$store.getters.notDone
    },
    Done () {
      return this.$store.getters.Done
    },
    allTasks () {
      return this.$store.getters.allTasks
    }, 
    count () {
      return this.$store.getters.count
    }
  },
  filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
  }, 
   watch: {
    toDos: {
      deep: true,
      handler (newValue) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue))
      }
    }
  }
}
```

Bên trong thư mục store mình sẽ chia thành các module tương ứng với actions, getter, mutations, và file quan trọng nhất là store.js
actions
```javascript 
// store/actions.js

export default {
    addTask ({commit}, newToDo) {
        commit('addTask', newToDo)
    },
    deleteToDo ({commit}, item) {
        commit('deleteToDo', item)
    },
    doneEdit ({commit}, item) {
        commit('doneEdit', item)
    }
}
```

```javascript
// store/getter.js

    export default {
        notDone: (state) => {
            return state.toDos.filter(m => m.completed == false).length 
          },
        Done: (state) => {
            return state.toDos.filter(m => m.completed == true).length
        },
        allTasks: (state) =>  {
            return state.toDos.length
        }, 
        count: (state) => {
            return state.count
        }
    }
```
```js
// store/mutations.js

export default {
    addTask (state, newToDo) {
        if (newToDo.length) {
            state.toDos.push({ 
                title: newToDo, 
                completed: false 
            })
            state.newTodo = null
        }
    },
    deleteToDo (state, item) {
        const index = state.toDos.indexOf(item)
        state.toDos.splice(index, 1)
    },
    doneEdit (state) {
        state.editting = null
    }
}
```

Quan trọng nhất chúng ta import tất cả module trên vào store.js

```js
// store/mutations.js

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getter from './getter'

Vue.use(Vuex)
const LOCAL_STORAGE_KEY = 'todo-app'

export default new Vuex.Store({
  state: {  
      toDos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {},
      newTodo: null,
      editting: null,
  },
  mutations: mutations,
  getters: getter,
  actions: actions
})

```

Bài này mình có sử dụng localStorage, các bạn cứ hiểu nó là một kho lưu trữ ngay trên trình duyệt của bạn để khi reload lại trang sẽ không mất dữ liệu. Kết quả  khi chạy ```$ npm run dev ```
![](https://images.viblo.asia/1876308f-8d5c-4e39-8cde-5e8079ae765f.gif)

Link github: https://github.com/hieupv-2320/todo-vuejs
# Tổng kết 
Qua bài viết này mong mọi người có thể tận dụng được những kiến thức đã đọc qua về Vue.js VueX cơ bản trong series của mình để có thể tạo ra được một ứng dụng nhỏ , có thể phục vụ được việc lưu công việc thường ngày cho mọi người. Mọi người có thể phát triển và sửa đổi lại thêm nhiều chức năng, thực hành thêm về VueJS để ứng dụng được nó một cách thuần thục nhé. Bài viết và ứng dụng này của mình không thể tránh khỏi sai sót do mình cũng mới quen với VueJS. Nếu có ý kiến góp ý, hãy để lại ở phía dưới comment nhé. Cảm ơn mọi người đã theo dõi bài viết. Hẹn gặp lại mọi người trong bài viết tới.

 ```"Read Less, Do More"```