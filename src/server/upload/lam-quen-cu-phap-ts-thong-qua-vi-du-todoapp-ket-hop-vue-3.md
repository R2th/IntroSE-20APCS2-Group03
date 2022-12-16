Có thể các bạn đã biết, vào 18/9/2020 Vuejs đã chính thức trình làng phiên bản mới nhất - đó là [Vue 3](https://v3.vuejs.org/). Và theo như giới thiệu, Vue 3 đã được xây dựng lại hoàn toàn bằng TypeScript. Mặc dù ở phiên bản Vue 2 cũng đã hỗ trợ TypeScript, tuy nhiên đến nay TypeScript ngày càng trở nên phổ biến, và là sự lựa chọn yêu thích của rất nhiều developer.

Trong bài này, chúng ta sẽ cùng đi làm quen cú pháp và tìm hiểu những kiến thức cơ bản của TypeScript thông qua xây dựng ứng dụng **todo-app** kết hợp với Vue 3.

## I. Tạo project Vue 3 kết hợp TypeScript
Để tạo project mới, chúng ta sẽ sử dụng **vue-cli**. Nếu máy nào chưa cài, thì có thể cài đặt nó trên toàn dự án bằng cách sử dụng **npm**. Nếu có lỗi `permission denied` thì ta sử dụng thêm sudo nhé.
```
npm install -g @vue/cli
```

Kiểm tra version:
```
vue --version
```

Sau khi cài xong `vue-cli`, tiến hành tạo mới project:
```
vue create todo-app
```

Nó sẽ hỏi bạn muốn chọn bản cài đặt mặc định hay chọn các tính năng riêng lẻ theo cách thủ công. Ở đây mình sẽ chọn option 2 để chỉ tích những tính năng cần thiết.
```
Vue CLI v4.5.13
? Please pick a preset: 
  Default ([Vue 2] babel, eslint) 
  Default (Vue 3) ([Vue 3] babel, eslint) 
❯ Manually select features 
```

Tiếp theo, chúng ta sẽ lựa chọn những tính năng cần thiết. Đối với ví dụ này, mình sẽ lựa chọn **Choose Vue version, TypeScript, Router, VueX, CSS Pre-processors, Linter / Formatter, Unit Testing**:
```
Vue CLI v4.5.13
? Please pick a preset: Manually select features
? Check the features needed for your project: 
 ◉ Choose Vue version
 ◯ Babel
 ◉ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◉ Router
 ◉ Vuex
 ◉ CSS Pre-processors
 ◉ Linter / Formatter
 ◉ Unit Testing
❯◯ E2E Testing
```

Chọn Vue version. Nhớ chọn version 3 nhé các bạn:
```
Vue CLI v4.5.13
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, TS, Router, Vuex, CSS Pre-processors, Linter, Unit
? Choose a version of Vue.js that you want to start the project with 
  2.x 
❯ 3.x 
```

Cuối cùng, nó sẽ hỏi bạn một loạt câu hỏi. Mình sẽ trả lời như sau (Mình xin phép không giải thích về những câu hỏi, các bạn có thể tìm hiểu để trả lời nhé):
```
Vue CLI v4.5.13
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, TS, Router, Vuex, CSS Pre-processors, Linter, Unit
? Choose a version of Vue.js that you want to start the project with 3.x
? Use class-style component syntax? Yes
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? No
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with node-sass)
? Pick a linter / formatter config: Basic
? Pick additional lint features: Lint on save
? Pick a unit testing solution: Mocha
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No
? Pick the package manager to use when installing dependencies: 
  Use Yarn 
❯ Use NPM 
```

Cuối cùng, **vue-cli** sẽ tạo project, cài đặt tất cả các gói NPM cần thiết, tạo tệp config...
Chạy thử project mới tạo xem sao.
```
cd todo-app
npm run serve
```

Mở trình duyệt, điều hướng đến địa chỉ: http://localhost:8080/
![](https://images.viblo.asia/5da4b933-1470-4cdd-838c-f9fbfb3ece64.png)

## II. Tích hợp Element Plus lib vào project
Mình xin giới thiệu tới các bạn một thư viện để xây dựng UI một cách nhanh chóng. Đó là [Element Plus](https://element-plus.org/#/en-US) - một thư viện component dựa trên Vue 3 dành cho các nhà phát triển, nhà thiết kế và quản lý sản phẩm.

Sau khi cài đặt xong project, chúng ta sẽ cài thêm thư viện này:
```
npm install element-plus --save
```

## III. Bắt đầu "cốt" thôi
Project structure ban đầu sẽ như sau:

![](https://images.viblo.asia/33f1f997-c30a-435c-9fc3-b75fd51d4f12.png)

Để sử dụng được thư viện Element Plus thì ta sẽ config thêm 1 chút. Sửa file `main.ts` thành như sau:
```
import { createApp } from 'vue'

# Use Element Plus lib
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
```

Tạo một file tên là **shims-vuex.d.ts** cùng cấp với file **shims-vue.d.ts**. Mục đích là để có thể sử dụng Vuex ([chi tiết](https://next.vuex.vuejs.org/guide/typescript-support.html))
```
import { Store } from '@/store';// path to store file

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store;
    }
}
```

Bây giờ mình sẽ bắt đầu thao tác với từng module để chỉnh sửa code.

### 1. Tạo trang hiển thị danh sách Task

#### TaskModel.ts
Tạo một folder chung có tên **models** trong folder **src**, đây sẽ là nơi chứa những file model của ứng dụng.

Bắt đầu tạo file **TaskModel.ts** trong thư mục **models này**. Nội dung của file này là khai báo class gồm 2 thuộc tính là **name, completed**;
```
export class TaskModel {
    name: string;
    completed: boolean;

    constructor(name: string) {
        this.name = name;
        this.completed = false;
    }
}

export default TaskModel;
```

> Note: Đây là cách khai báo một class trong TypeScript. Thuộc tính **name** có kiểu dữ liệu là string, **completed** là boolean. Trong TS chia ra làm 7 kiểu dữ liệu cơ bản: boolean, string, number, array, enum, void, any.

#### store/index.ts
Đây là nơi quản lý trạng thái của toàn ứng dụng. Mình đã thêm sẵn 2 bản ghi dữ liệu trong state. **mutations** dùng để thao tác với dữ liệu bên trong store, ở đây là các thao tác thêm, sửa, xóa Task.

```
import { createStore } from 'vuex'
import Task from "../models/TaskModel";
import { findIndex } from "lodash";

export default createStore({
  state: {
    tasks: [
      {
        name: "Demo for Vue 3 with TS",
        completed: false
      },
      {
        name: "Learning about TS basic",
        completed: false
      }
    ] as Task[]
  },
  mutations: {
    setTask: (state, task) => state.tasks.push(task),

    deleteTask(state, task): void {
      let taskIndex = findIndex(state.tasks, task);
      state.tasks.splice(taskIndex, ++taskIndex);
    },

    completeTask(state, task): void {
      const taskIndex = findIndex(state.tasks, task);
      state.tasks[taskIndex].completed = true;
    }
  },

  actions: {
  },

  modules: {
  }
})
```

> Để ý cách khai báo hàm trong **mutations**, đây là một cách khai báo hàm trong TS (cũng giống trong JavaScript) gọi là **Named function**. TS hỗ trợ khai báo với kiểu trả về của hàm cũng như kiểu dữ liệu đầu vào.

#### Tạo file Home.ts

Tạo folder **Home** trong thư mục **components** và tạo file **Home.ts** trong folder đó. Mục đích là để dễ quản lý code thôi các bạn nhé.

Nội dung file **Home.ts** như sau:
```
import { defineComponent } from "vue";
import Task from "../../models/TaskModel";

export default defineComponent({
    name: "Home",
    data() {
        return {
            tasks: [] as Task[]
        };
    },

    methods: {
        setTaskComplete(task: Task): void {
            this.$store.commit("completeTask", task);
        },

        deleteTask(task: Task) {
            this.$store.commit("deleteTask", task);
        },

        formatStatus(task: Task): string {
            return task.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành';
        }
    },

    mounted() {
        this.tasks = this.$store.state.tasks;
    }
});
```

Nhiệm vụ của file này là lấy ra toàn bộ Task có trong store, 2 function **setTaskComplete, deleteTask** xử lý thao tác của update, delete của người dùng.

Sau đó, chúng ta sẽ nhúng file này vào file **Home.vue**

#### Home.vue
```
<template>
  <div class="home">
    <el-table
      :data="tasks"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="Nhiệm vụ"
        width="500">
      </el-table-column>
      <el-table-column
        prop="completed"
        label="Trạng thái"
        :formatter="formatStatus"
        width="200">
      </el-table-column>
      <el-table-column
        label="Thao tác">
        <template #default="scope">
          <el-button @click="setTaskComplete(scope.row)" type="text" size="mini">Completed</el-button>
          <el-button @click="deleteTask(scope.row)" type="text" size="mini" style="color: red">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" src="../../components/Home/Home.ts"></script>
```

Và đây là kết quả:
![](https://images.viblo.asia/f570b1a8-4ed4-4783-9c4f-98e754fc04cc.png)

###  2. Tạo trang để thêm mới Task
####  AddTask.ts
Tạo folder **Task** trong thư mục **components** và tạo file **AddTask.ts** trong folder đó.
```
import { defineComponent } from "vue";
import Task from "../../models/TaskModel";

export default defineComponent({
    name: "AddTask",
    data() {
        return {
            taskName: ""
        };
    },
    methods: {
        addTask(): void {
            if (this.taskName !== "") {
                const newTask = new Task(this.taskName);
                this.$store.commit("setTask", newTask);
                this.taskName = "";
                this.$router.push("/");
            }
        }
    }
});
```

File này đảm nhiệm chức năng thêm mới Task.

Ta sẽ nhúng file này vào trong **AddTask.vue**

#### AddTask.vue
```
<template>
  <div class="add-task">
    <el-card class="box-card">
      <el-input
          type="textarea"
          :rows="2"
          size="small"
          placeholder="Enter your task"
          v-model="taskName"
          @keyup.enter="addTask()"
      >
      </el-input>

      <el-row>
        <el-button type="primary">Submit</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts" src="../../components/Task/AddTask.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
```

#### router/index.ts
Ta sẽ thêm đường dẫn đến trang add task.
```
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home/Home.vue'
import AddTask from "@/views/Task/AddTask.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/add-task',
    name: 'AddTask',
    component: AddTask,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
```

#### App.vue
```
<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/add-task">Add Task</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
```

Và đây là thành quả:
![](https://images.viblo.asia/55e23dee-f8bc-4efe-be88-570ea18c8cef.png)

## IV. Kết luận
Hướng dẫn này dành cho những bạn mới bắt đầu xây dựng ứng dụng web sử dụng Vue 3 và TS. Sự kết hợp của Vue 3 và TS là một khái niệm rất rộng lớn để khám phá và học hỏi, chúng ta sẽ tìm hiểu từ từ nhé.

Cảm ơn các bạn đã đọc.

Github repo: https://github.com/hoangbn-1772/todo-app