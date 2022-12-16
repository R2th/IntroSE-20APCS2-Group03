Chào các bạn, trong thời gian vừa qua, mình có cơ hội được vọc vạch với 1 số framework mới, trong đó có Vuejs. Cho nên hôm nay, để có tổng hợp nhanh kiến thức của mình đã học được cũng như giúp 1 số bạn gặp khó khăn trong quá trình học Vuejs, mình sẽ làm hướng dẫn tạo 1 app Todo list đơn giản

Trước khi bắt đầu bài viết, mình sẽ mặc định các bạn đã có 1 số kiến thức cơ bản về Vuejs, Vuex. Nếu các bạn quên hoặc chưa từng đụng chạm sờ mó tới Véu (yaoming) thì bấm vào [đây](https://vuejs.org/v2/guide/) để coi nhé. Nếu đã chuẩn bị xong thì mình bắt đầu thôi!!!

**1) Cài đặt:**

Như mọi framework khác, để xài được nó thì bạn phải cài đặt nó đã ``npm install -g @vue/cli``, 

Tạo vue project bằng dòng lệnh sau ``vue create todo-app``, sau đó bạn sẽ tới bước chọn preset, bạn có thể dùng dấu mũi tên lên xuống để lựa chọn, với mình thì mình sẽ chọn là default. Sau đó bạn cứ nhấn enter và mở project và bắt đầu code thôi

**2) Cấu trúc project và phân tích components**

Trong folder src, chúng ta sẽ tạo 1 folder components để chứa những component sẽ được tạo ra.

Trong file main.js, chúng ta sẽ viết như sau:
````
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes';
import stores from './stores';

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
  routes
})

new Vue({
  router,
  stores,
  render: h => h(App),
}).$mount('#app')
````

Tới bước này thì bạn nhớ cài đặt thêm ``vue-router`` và ``vuex`` cho nó nhé. Bạn có thể thấy là chúng ta đã import file routes và stores vào trong main.js để sử dụng. Nội dung trong file cũng rất đơn giản thôi, bạn sẽ define cho  nó 3 route chính mà t sẽ sử dụng ở trong app: listNew, listInprogress và listDone, bạn có thể tham khảo nội dung file routes ở bên dưới: 
````
import ListNew from './components/ListNew.vue'
import ListInprogress from './components/ListInprogress.vue'
import ListDone from './components/ListDone.vue'

export default  const routes = [
  {
    path: '/listNew',
    name: 'ListNew',
    component: ListNew
  },
  {
    path: '/listInprogress',
    name: 'ListInprogress',
    component: ListInprogress
  },
  {
    path: '/listDone',
    name: 'ListDone',
    component: ListDone
  },
];
````

Trong file stores.js, chúng ta sẽ định nghĩa state, mutations, getters , actions cho app, bạn có thể tham khảo nội dung dưới đây,
````
import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client';
const socket = io('localhost:6969');
Vue.use(Vuex);

export default const store = new Vuex.Store({
  state: function () {
  const todolist = {
      listNew: [
          {
              id: 0,
              value: "Đi ngủ",
          },
      ],
      listInprogress: [
          {
          id: 0,
              value: "Làm việc",
          },
      ],
      listDone: [
          {
              id: 0,
              value: "Đi tè",
          },
      ]
  }
    return todolist;
  },
  mutations: {
      // function để add thêm task vào cho listNew
    addNew: (state, {value}) => state.listNew.push(value), //
    
    // Xóa task được chọn
    deleteTask: (state, {listType, index}) => state[listType].splice(index, 1
    
    // chuyển task qua giai đoạn tiếp theo
    transferTask: (state, {currentList, nextList, index }) => {
      const taskTransfered =  state[currentList].splice(index, 1);
      state[nextList].push(taskTransfered[0]);
    },
    
    // lưu lại những chỉnh sửa của task
    saveEdit: (state, {listType, value, index}) => state[listType][index] = value,
  }
})
actions: {}
getters: {}
````

Trong file App.vue, chúng ta sẽ tạo giao diện cơ bản cho app todolist, 
````
<template>
  <div id="app">
    <AddTodo />
    <div class='containerTab'>
      <router-link to="/listNew">List New</router-link>
      <router-link to="/listInprogress">List Inprogress</router-link>
      <router-link to="/listDone">List Done</router-link>
    </div>
    <div class='containerContent'>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AddTodo from './components/AddTodo.vue'
export default {
  name: 'app',
  components: {
    AddTodo,
  }
}
</script>

<style>
p, ul, li, a {
  margin: 0;
  padding: 0;
}
button, a {
  cursor: pointer;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.containerTab {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 500px;
  margin-top: 30px;
  margin-bottom: 2px;
  border-radius: 10px;
}
.containerTab > a {
  width: calc(100% / 3 - (4px / 3));
  padding: 10px 20px;
  margin-left: 2px;
  text-decoration: none;
  font-size: 16px;
  border-radius: 10px 10px 0 0;
  color: #ffffff;
  background: #4267b2;
}
.containerTab > a:first-child {
  margin-left: 0;
}
.containerTab a.router-link-active,
.containerTab a.router-link-exact-active,
.containerTab a:hover {
  background-color: #3578e5;
}
.containerContent {
  width: 500px;
}
</style>
````

Trong folder components, chúng ta sẽ tạo ra 4 file là AddTodo.vue, ListNew.vue, ListInprogress.vue và ListDone.vue

Trong file AddTodo thực chất là 1 input để chúng ta nhập task mới để add vào ListNew, bạn có thể tham khảo code dưới đây
````
<template>
  <div class="container">
    <input
      id='inputNew'
      placeholder="Công việc muốn thêm"
      v-model="inputNew"
      @keydown.enter='addNew(inputNew)'
    />
    <button
    v-on:click='addNew(inputNew)'
    >Thêm vào</button>
  </div>
</template>

<script>
export default {
  name: 'AddTodo',
  methods: {
    addNew (value) {
      this.$stores.commit('addNew', {value})
      this.inputNew = ''
    },
  },
  data: function() {
    return {
      inputNew: '',
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  width: 500px;
}
input {
  padding: 0 10px;
  border: none;
  border-bottom: 1px solid black;
  width: calc(100% - 100px);
}
button {
  width: 100px;
  border-radius: 10px;
  box-shadow: 0 0 3px 5px rgba(0,0,0,0.03);
  padding: 5px 10px;
  background: #4267b2;
  color: #ffffff
}
</style>
````

Trong ListNew.vue, ListInprogress.vue và ListDone.vue lần lượt chính là 3 bảng thể hiện list task, về cơ bản UI của cả 3 folder đều giống hết nhau, vì vậy chúng ta có thể để phần style của 3 file vào chung với App, bạn có thể tham khảo ở dưới, file ListNew.vue
````
<template>
  <div>
    <div v-for='(item, index) in listNew' :key="item" class='listItem'>
      <p v-show='indexItemEdited !== index'>{{item}}</p>
      <input
        class="inputEdit"
        type="text"
        v-show='indexItemEdited === index' 
        :placeholder='item'
        v-model='item.index'
        @blur='saveEdit("listNew", $item[index], index)'
      />
      <div class='buttonSection'>
        <button 
          v-show='indexItemEdited !== index'
          @click='toggleEdit(index)'
        >
          Sửa
        </button>
        <button
          v-show='indexItemEdited === index'
          @click='toggleEdit(index), saveEdit("listNew", item, index)'
        >
          Lưu
        </button>
        <button
          @click='transferTask("listNew", "listInprogress", index)'
        >Làm</button>
        <button v-on:click='deleteTask("listNew", index)' >Xóa</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListNew',
  data: function() {
    return {
      indexItemEdited: -1,
      item: '',
    };
  },
  computed: {
    listNew() {
      return this.$stores.state.listNew;
    }
  },
  methods: {
    toggleEdit: function (index) {
      if(this.indexItemEdited === index) {
        return this.indexItemEdited = -1;
      }
      return this.indexItemEdited = index;
    },
    deleteTask: function (listType, index) {
      this.$stores.commit('deleteTask', {listType, index})
    },
    saveEdit: function (listType, value, index) {
      this.$stores.commit('saveEdit', {listType, value, index})
    },
    transferTask: function (currentList, nextList, index) {
      this.$stores.commit('transferTask', {currentList, nextList, index})
    }
  }
}
</script>
````

Riêng về css, bạn có thể thêm nó vào chung với css ở file App.js

````
.listItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  padding-left: 16px;
  margin-bottom: 2px;
  font-size: 16px;
  background: #4267b2;
  color: #fff;
}
.listItem:last-child {
  border-radius: 0 0 10px 10px;
  margin-bottom: 0;
}
.inputEdit {
  padding: 2.5px 10px;
  font-size: 16px;
  color: #4267b2;
  background: #ffffff;
}
.buttonSection {
  background: transparent;
}
.buttonSection > button {
  color: #4267b2;
  font-weight: bold;
  margin-right: 10px;
  background: #ffffff;
  border: none;
  padding: 5px 10px;
}
````

file ListInprogress:
````
<template>
  <div>
    <div v-for='(item, index) in listInprogress' :key="item" class='listItem'>
      <p>{{item}}</p>
      <div class='buttonSection'>
        <button
          @click='transferTask("listInprogress", "listDone", index)'
        >Hoàn thành</button>
        <button v-on:click='deleteTask("listInprogress", index)' >Xóa</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListInprogress',
  computed: {
    listInprogress() {
      return this.$stores.state.listInprogress;
    }
  },
  methods: {
    deleteTask (listType, index) {
      this.$stores.commit('deleteTask', {listType, index})
    },
    transferTask (currentList, nextList, index) {
      this.$stores.commit('transferTask', {currentList, nextList, index})
    }
  }
}
</script>
````

Riêng về file ListDone thì khá giống với ListInprogress, nên mình sẽ không để tham khảo ở đây, các bạn có thể xem nó như 1 bài tập nhỏ cho bản thân.

Giờ bạn có thể yên tâm và chạy thử app của mình với lệnh là ``npm run server``.

**3) Kết luận**

Trên đây là app todo cực kỳ đơn giản của mình để có thể ôn lại kiến thức đã học và giúp đỡ một số bạn gặp khó khăn trong việc tiếp cận với Vuejs. Với app trên bạn có thể cải thiện thêm bằng cách sử dụng và tìm hiểu thêm về các khái niệm như actions, getters , mapActions,... Sau đó có thể tạo 1 server json nho nhỏ để làm việc với api, bạn có thể sử dụng axios để xử lý với dữ liệu ở server.

Nếu các bạn có hứng thú với bài viết của mình, xin hãy upvote và comment ý kiến của bạn về app hoặc bài viết. Nếu bài viết này có upvote trên 10 hoặc trong thời gian tới mình rảnh rỗi, sẽ phát triển tiếp app todo này với realtime bằng cách sử dụng socket.io, refactor code để app todo này càng hoàn thiện hơn.

Cảm ơn các bạn đã theo dõi bài viết của mình