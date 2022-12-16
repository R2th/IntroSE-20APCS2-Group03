**Updated:**  Mình đang thực hiện một project về algorithm-visualizer để áp dụng những kiến thức học được. Các bạn có thể tham khảo ở [đây](https://github.com/egd-ngocnd/vuejs-demo)

Bài viết được dịch từ https://qiita.com/
*  [Vue.jsを100時間勉強して分かったこと](https://qiita.com/kskinaba/items/3e8887d45b11f9132012) 
Nội dung học bao gồm:
* Khoá học [Vue JS 2 - The Complete Guide (incl. Vue Router & Vuex)](https://www.udemy.com/vuejs-2-the-complete-guide/) trên Udemy (85h)
* Thực hành code (15h)

Trình độ yêu cầu trước khi bắt đầu, có hiểu biết về javascipt, jquery. Từng học qua về Reactjs

# Cú pháp cơ bản của Vue.js
Các cú pháp cơ bản của Vuejs
## Vue.js instance
Vue.js instance được khởi tạo theo cú pháp dưới đây
```javascript
//app.js
new Vue({
    el: "#app",
    data: {
        name: "Kei",
        age: "30",
        counter: 0
    },
    methods: {
        increase: function() {
        this.counter += 1;
    }
  }
})
```
app.js được import vào cùng với file vue.js vào file template html
```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
<script src="app.js"></script>
```
## {{}}
Cú pháp trên dùng để gọi đến thuộc tính của Vue instance
```html
<p>{{name}}</p>
```
## v-bind
Khi muốn gán giá trị động cho thuộc tính của thẻ html
```html
<a v-bind:href="link">Google</a>
```
## v-one
Được viết bên trong thẻ html, dùng để in ra giá trị cố định(không có khả năng thay đổi, in ra 1 lần lúc load component)
```html
<h1 v-once>{{title}}</h1>
```
## v-html
Dùng khi in giá trị là dạng html
```html
<p v-html="finishedLink"></p>
```
## v-on
Đăng ký hàm xử lý sự kiện 
```html
<button v-on:click="increase(2, $event)">Click me</button>
```
```javascript
//app.js
new Vue({
  methods: {
    increase: function(step, event) {
      this.counter += step;
    }
  }
})
```
`v-on:click=“counter++”` Có thể viết code js kiểu inline, trong code không chứ if hoặc for
Cũng có thể viết dưới dạng `v-on:keyup.enter.space` (khi ấn nút enter ??)
## v-model
Dùng để bind data vào thẻ html có tham chiếu đến thuộc tính của vue instance
```html
<input type="text" v-model="name">
<p>{{name}}</p>
<!-- 入力値によって動的に name が変わる -->
```
```javascript
//app.js
new Vue ({
  el: "#app",
  data: {
    name: "Kei"
  }
})
```
## @
Cách viết ngắn gọn của `v-on:`, `@click="link"`
Thay vì `v-bind:` cũng có thể viết `:`
## :class
Assign thuộc tính class động cho thẻ html
```html
<div 
    class="demo" 
    @click="attachedRed = !attachedRed"
    :class="{red: attachedRed}"></div>
```
Có thể dùng array để assign nhiều class name
```html
<button type="button"
    :class="['btn', 'btn-outline-info', 'btn-sm', {active: isActive}]">
    button
</button>
```
Ngoài ra còn có cách viết
```html
<button type="button"
    :class="['btn btn-outline-info btn-sm', {active: isActive}]">
    button
</button>
```
Sử dụng phép toán điều kiện
```html
<button type="button"
    :class="['btn btn-outline-info btn-sm', isActive ? 'active' : 'disabled']">
    button
</button>
```
## :style
Assign động style cho phần tử html
```html
<div :style="{backgroundColor: color}"></div>
```
*Các tên thuộc tính css được viết ở kiểu cameCase*
## computed
computed là thuộc tính đối tượng của Vuejs instance gần giống với method, tuy nhiên khác với method nó sẽ được dùng khi cần xác định thời điểm thuộc tính trong data được lưu. Một điểm khác nữa là khi gọi đến computed thì không cần dùng ()

```javascript
//app.js
data: function() {
  return {
    counterComputed: 0,
    counterMethod: 0
  };
},
computed: {
  printTextComputed: function() { 
    console.log(“counter printed from computed:”,     
    this.counterComputed);
  }
},
methods: {
  printTextMethod: function() {
    console.log(“counter printed from method:”, this.counterMethod);
  }
},
```
```html
<div>
  <button @click=”counterComputed++”>computed button</button>
  <p>{{counterComputed}}</p><br/>
  <button @click=”counterMethod++”>method button</button>  
  <p>{{counterMethod}}</p><br/>
   {{printTextMethod()}}
   {{printTextComputed}}
</div>
```
**Kết quả**
* Khi ấn *computed button* thì cả 2 hàm *printTextComputed* và *printTextMethod* thực thi
* Khi ấn *method button* thì chỉ có hàm *printTextMethod* được thực thi

**Lý do**
* **methods** Không biết lúc nào giá trị sử dụng trong hàm thay đổi, nên nó chạy liên tục để check (Bất kỳ lúc nào có sự kiện gì)
* **computed properties** Xác định được giá trị sử dụng trong hàm thay đổi, nên nó không cần thiết phải chạy liên tục (Chỉ những sự kiện liên quan đến xử lý giá trị thuộc tính của data mà nó đang tham chiếu)

**Tham khảo thêｍ tại** [The difference between COMPUTED and METHODS in Vue.js](https://medium.com/notonlycss/the-difference-between-computed-and-methods-in-vue-js-9cb05c59ed98)
## watch
Là 1 thuộc tính kiểu đối tượng của  Vuejs instance, dùng cho việc xác định hành vi khi giá trị của 1 thuộc tính cụ thể thay đổi. Không chỉ thuộc tính của *data* , thuộc tính của *computed* cũng có thể được watch
```javascript
//app.js
new Vue ({
  watch: {
    // counter を watch する
    counter: function(value) {
      var vm = this;
      setTimeout(function() {
        vm.counter = 0;
      }, 2000); 
    })
  }
})
```
## v-if, v-else
Xác định tag html có được DOM render hay không
```html
<p v-if="boolean">Hello!</p>
<p v-else>Hello again!</p>
```
## v-show
Xác định tag html có được hiện thị hay không (`display: none;`)
## v-for
Render các phần tử của mảng
```html
<!-- ingredients: ["meat", "fruit", "cookies"] -->
<ul>
　　<li v-for="ingredient in ingredients">{{ingredient}}</li>
</ul>
```
Khi cần index
```html
<li v-for="(ingredient, i) in ingredients">{{ingredient}}</li>
```
Có thể dùng cho kiểu đối tượng. Đối số thứ 2 là key, thứ 3 sẽ là index
```html
<li v-for="person in persons">
  <div v-for="(value, key, index) in person">
     {{key}}:  {{value}} ( {{index}})
  </div>
</li>
```
## TODO
```html
<li v-for="ingredient in ingredients" :key="ingredient"></li>
```
## Vòng đời (Lifecycle) 
-![https://vuejs.org/images/lifecycle.png](https://vuejs.org/images/lifecycle.png)
Vòng đời của 1 vue instance bao gồm các hook sau. Tùy vào mục đích có thể viết thêm xử lý vào thời điểm mong muốn.

* beforeCreate
* Created
* beforeMount
* mounted
* (Render DOM)
* (DOM Changed)
* beforeUpdate
* updated
* ( this.$destroy(); )
* beforeDestroy
* Destroyed

```javascript
//app.js
new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` points to the vm instance
    console.log('a is: ' + this.a)
  }
})
```
# Công cụ hỗ trợ phát triển
Ở các ví dụ phia trên vue instance đều được viết bởi file .js . Tuy nhiên trong thực thế phát triển app sẽ được viết dưới dạng file .vue .
Sau đấy từ những file .vue này sẽ được build thành 1 file js duy nhất và được deploy lên môi trường prod
## Vue CLI
Vue CLI là 1 tool hỗ trợ cho việc tạo template để phát triển app vue.js
### Cài đặt Vue CLI
```shell
$ sudo npm install -g vue-cli
```
Template dùng webpack-simple
```shell
$ vue init webpack-simple [YOUR_APP_NAME]
```
Khởi động môi trường phát triển
```shell
$ npm run dev
```
#### Lỗi 1
```shell
Error: Cannot find module 'webpack-cli/bin/config-yargs'
```
Nếu có lỗi  trên xuất hiện, hãy thực hiện câu lệnh sau đây
[https://github.com/rails/webpacker/issues/1295](https://github.com/rails/webpacker/issues/1295)
```shell
$ yarn add webpack-cli -D
$ npm run dev
```
#### Lỗi 2
```javascript
TypeError: Cannot destructure property `compile` of 'undefined' or 'null'.
```
[https://github.com/vuejs/vue-cli/issues/714](https://github.com/vuejs/vue-cli/issues/714)
Thực hiện câu lệnh sau nếu xảy ra lỗi trên
```markdown
$ yarn remove webpack-dev-server
$ yarn add webpack-dev-server@2.9.1 --dev
$ yarn run dev
```
### Template webpack-simple
Template được tạo bởi webpack-simple sẽ có dạng như sau:
```scala
project_name
├── src
│   ├── assets
│   ├── App.vue
│   └── main.js
├── .babelrc
├── .gitignore
├── index.html
├── package.json
└── webpack.config.js
```
*  src  - Forder chính chứa code. Nơi chứa code các`component` vue.js
    *  App.vue - Vue Component Top
    *  main.js - Biên dich code App.vue, render html code
*  .babelrc - config file của babel. Complile EC6 etc...
*  index.html - View template. Code được viết ở rsc được build bởi webpack và render mã html ở đây.
*  package.json - File setting  Dependencies

## Build
Thực hiện câu lệnh sau để tạo dist file để deploy lên môi trường prod
```shell
$ npm run build
```
# Vue component
Lúc deploy sẽ chỉ có `index.html` và `build.js`, build.js sẽ được chứa ở forder `dist`
Vue componet là 1 file bao gồm các tag `template` `script` `style`
Ví dụ
```html
//scr/Home.vue
<template>
    <div>
        <p>Server Status: {{status}}</p>
        <hr>
        <button @click="changeStatus">Change Status</button>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                status: 'Critical'
            }
        },
        methods: {
            changeStatus() {
                this.status = 'Normal';
            }
        }
    }
</script>

<style>
</style>
```
Khác với cách viết vuejs thông thường  của vuejs instance thông thường, trong vue`component` bắt buộc phải định nghĩ thuộc tính `data` dưới kiểu hàm `data(){}`. Vue`component` kế thừa vue instance nên nếu định nghĩ data dưới kiểu đối tượng thì data cũ sẽ bị ghi đè, phát sinh ra nhiều vấn đề không như mong muốn.
Hơn nữa, nội dung trong template phải được bọc ở trong 1 key element duy nhất, nếu không sẽ sinh ra lỗi
## Import global
Dưới đây là cách viết để Home.vue được đọc ở main.js
```javascript
//src/main.js
import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'

Vue.component('app-server-status', Home)

new Vue({
    el: '#app',
    render: h =>h(App)
})
```
Tại template,`component` Home sẽ được render trong thẻ `<app-server-status></app-server-status>`
## Import local
Import trong file .vue sẽ được viết dưới dạng sau
```html
<template>
  <div>
    <app-server-status></app-server-status>
  </div>
</template>

<script>
    import  Home from './Home'
    export default {
        components: {
            'app-server-status': Home // テンプレート名を上書き
        }
    }
</script>
```
Trong trường hợp chỉ định nghĩ Key là name của component
```javascript
components: {
    Servers // Servers: Servers
}
```
## Thiết kế component
Các`component` sẽ được đặt trong 1 forlder tên là `components` là kiểu thiết kế thông thường.
```scala
project_name
├── src
│   ├── assets
│   ├── components
│   │   ├── Shared
│   │   └── ServerStatus 
│   ├── App.vue
│   └── main.j
```
## Local Style
Viết trong `Style` scope của componet
```html
<style scoped>
    div { 
        border: 1px solid red;
    } 
</style>
```
## filters
Sử dụng để format, điều chỉnh dữ liệu render ra của vue instance, có thể dùng nhiều filter bằng cách ngăn cách bằng dấu `|` lúc gọi
```html
<p>{{text | toUppercase | toLowercase}}</p>
```
```javascript
//app.js
new Vue ({
    filters: {
        toUppercase(value) { // いつも value を引数にとる
            value.toUpperCase();
        } 
    }
})
```
Trong trường hợp define global
```javascript
Vue.filter("name", function(value){
    // 処理
});
```
Khi không muốn dùng filters thì cũng có thể định nghĩa tại thuộc tính `computed`
```javascript
//app.js
computed: {
    filteredFruits() {
        return this.fruits.filter((element) =>{
            return element.match(this.filterText);
        });
    }
} 
```
## mixins
Sử dụng để gom nhiều đoạn mã vào 1 file.
```javascript
import { hogeMixin } from './hogeMixin'; 

export default {
    mixins: [hogeMixin]
}
```
Định nghĩa global
```javascript
Vue.mixin({
    created() {
        // 処理    
    }
});
```
## transition
Các phần tử được bọc trong tag transition, sẽ được dùng cho các hiệu ứng animation
```html
<template>
  <transition name="hoge"></transition>
</template>
```
Đối với các phần tử muốn dùng hiệu animation thì bắt buộc phải viết trong tag  template.
### default class name
với `<transition name="hoge">` sẽ có các default class name sau
```css
<style>
  .hoge-enter {}        /* start animation style */
  .hoge-enter-active {} /* active animation style */
  .hoge-leave {}        /* leave animation style */
  .hoge-leave-active {} /* leaving animation style */
</style>
```
### Custom class name
Không cần định nghĩa thuộc tính name cho thẻ `transition`
```html
<transition
    enter-active-class="animated shake"
    leave-active-class></transation>
```
### Chỉ thị type theo độ ưu tiên
### TODO

### Hiệu ứng tại On-load
Sử dụng tag `<transition appear>` Khi muốn áp dụng hiệu ứng tại on load 
### Gán giá trị động
`name` , `type` có thể được assgin giá trị động
```html
<transition :name="hoge" :type="hogehoge">
```
### JS hook
Các js hook được dùng trong transition
* before-enter
* enter（required done）
* after-enter
* after-enter-cancelled
* before-leave
* leave（required done）
* after-leave
* after-leave-cancelled

Sử dụng các js hook này để gán những js animation khi cần
```html
<template>
  <transition @enter="enter"></transition>
</template>

<script>
    export default {
        methods: {
            enter(el, done) {
                done(); // Vue: thông báo khi animation kết thúc（enter, leave ）
        }
    }
</script>
```
# props
Sử dụng khi tiếp nhận data từ 1`component` khác 
## Component cha ->Component con
Được truyền khá đơn giản từ cha sang con bằng cách sử dụng **v-bin:**
```html
//Component cha
<template>
    <div>
        <app-user-deital :name="name"></app-user-detail>
    </div>
</template>

<script>
    import UserDetail from "./UserDetail.vue"
    export default {
        data: function(){
            return {
                name: "Kei" 
            }
        }
    } 
</script>
```
Component cha nhận thông qua **props**
```html
//Component con
<template>
    <div>
        <p>{{name}}</p>
    </div>
</template>

<script>
    export default {
        props: ["name"]
    } 
</script>
```
Dữ liệu nhận đươc qua **props** ở`component` con có thể thao tác như đối tượng **data**

## Component con ->Component cha
Để truyền dữ liệu từ con sang cha thì có 2 cách chính dưới đây
###1. $emit
Truyền sự thay đổi của props của con sang cha thông qua **$emit** function
 **$emit** : Đối số thứ nhất là `event name`, đối số thứ 2 là `event data`
```html
//Con
<template>
    <div>
        <p>{{name}}</p>
    </div>
</template>

<script>
    export default {
        props: ["name’",
        methods: {
            resetName() {
                this.myName = "Kei"
                this.$emit("nameWasReset", this.myName)
            }
        } 
    } 
</script>
```
Tại cha lắng nghe sự kiện phát ra bằng `@` , và  xử lý tương ứng.
```html
//Cha
<template>
    <div>
        <app-user-deital :name="name" @nameWasReset="name = $event"></app-user-detail>
    </div>
</template>

<script>
    import UserDetail from "./UserDetail.vue"
    export default {
        data: function(){
            return {
                name: "Kei" 
            }
        }
    } 
</script>
```
### 2. Callback
Truyền hàm xử lý từ cha sang con thông qua thuộc tính props
```html
//Cha
<template>
    <div>
        <app-user-deital 
            :name="name" 
            :resetFn="resetName()"></app-user-detail>
    </div>
</template>

<script>
    import UserDetail from "./UserDetail.vue"
    export default {
        data: function(){
            return {
                name: "Kei" 
            }
        },
        methods: {
            resetName() {
                this.myName = "Kei";
            }
        } 
    }
</script>
```
## TODO
# Slot
Dùng khi gửi nhận dữ liêu dạng html từ componet cha sang`component` con
```html
//Cha
<template>
    <div>
        <app-child>
            <h2 slot="title">{{title}}</h2>
            <p slot="content">{{content}}</p>
        </app-child>
    </div>
</template>
```
Component con dùng `<slot name="NAME"></slot>` để nhận dữ liệu
```html
<template>
    <div>
        <div class="title">
            <slot name="title"></slot>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>
```
## Từ  `Vue 2.6.0` khuyến cáo dùng `v-slot`
# Component động
Thuộc tính `:is` của `component` cho phép render`component` động
```html
<template>
    <div>
        <component :is="selectedComponent"></component>
    </div>
</template>
<script>
    // selectedComponent = "Component Name"
</script>
```
Môi khi chuyển đổi giữa các`component` ,`component` sẽ bị huỷ và dữ liệu sẽ bị reset. 
Khi không muốn bị destroy thì dùng tag `<keep-alive>` để bọc lại tag `component` . Khi đó`component` sẽ chuyển đổi giữa 2 life cycle `activated` và `deactivated`
# Các thư viện thường dùng
## Axois
[Axois](https://github.com/axios/axios) là thư viện javascript dùng cho việc tạo các http request
Vue.js cũng có thư viện Vue Resource, tuy nhiên khuyến khích dùng Axios vì tính đa dụng cao hơn.
### Install
Thực hiện câu lệnh sau, để cài đặt cho project
```shell
$ npm install --save axios 
```
Import và setting global
```javascript
//main.js
import axios from "axios"; 

axios.defaults.baseURL = "base_url"; 
axios.defaults.headers.common["Authorization"] = "hogehoge"
axios.defaults.headers.get["Accepts"] = "application/json"
```
### GET request
```javascript
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
### POST request
```javascript
axios.post('/users', data)
     .then(res =>console.log(res))
     .catch(error =>console.log(error))
```
### interceptors
Khi muốn có tiền xử lý cho request và reponse ta dùng interceptors
```javascript
axios.interceptors.request.use(config =>{
    console.log(config);
    return config;
})

axios.interceptors.response.use(res =>{
    console.log(res);
    return res;
})
```
## Vue Router
[ Vue Router](https://router.vuejs.org/) Là thư viện dùng cho việc routting trong vuejs
### Install
Thực hiện câu lệnh sau để cài đặt
```shell
$ npm install --save vue-router
```
Routting được định nghĩa như sau
```javascript
//routes.js
import User from "./components/user/User.vue";

export const routes = [
    { path: "", component: Home },         // Root path
    { path: "/user/:id", component: User } // :id は動的なURL
] 
```
File router.js này được import global như sau
```javascript
//app.js
import VueRouter from "vue-router";
import { routes } from "./routes"; 

Vue.use(VueRouter);

const router = new VueRouter({
    routes, // Same as "routes: routes”
    mode: "history" // No hash tag style in URL
});

new Vue({
    el: "#app",
    router // Same as "router: router"
    render: h =>h(App)
})
```
### Router view
Chỉ định vị trí`component` được render với mỗi URL
```html
//app.vue
<template>
  <div>
    <router-view></router-view>// 
  </div>
</template>
```
### router-link
Dùng khi render link. Khi đang ở trang ứng link, nếu có click vào link thì không render lại
```html
<router-link to="/" tag="li" active-class="active" exact>Home</router-link>
<!-- nếu không có "exact", lúc truy cập "/" url thì mọi link đều active-->
<router-link to="/user" tag="li" active-class="active">User</router-link>
```
Chỉ định kiểu động thì dùng `{{}}`
```html
<router-link
    tag="button"
    :to="{ name: 'UserEdit', params: { id: $route.params.id }, query: { locale: 'en' } }"
    class="btn btn-primary">Edit</router-link>
```
### $route.params
access url param
```html
<script>
export default {
    data() {
        return {
            id: this.$route.params.id 
        }
    }
}
</script>
```
### children (routes.js)
Sử dụng cách viết sau để gom các router có quan hệ với nhau
```javascript
//routes.js
import User from "./components/user/User.vue";

export const routes = [
    { path: "", component: Home },
    { path: "/user/", component: User, children: [
        { path: "", component: UserStart },
        { path: ":id", component: UserDetail },
        { path: ":id/edit", component: UserEdit }
    ]}
]
```
### before enter
Khi sử dùng `before enter`, xử lý sẽ được chạy trước khi `router-view` được render.
Sau đây là 3 chỗ có thể viết được
#### 1. Global
```javascript
//main.js
router.beforeEach((to, from, next) =>{
    // Đoạn xử lý thêm
    next();
});
```
#### 2. Local
```javascript
//routes.js
import User from "./components/user/User.vue";

export const routes = [
    { path: "", component: Home },
    { path: "/user/", component: User, children: [
        { path: "", component: UserStart },
        { 
            path: ":id", component: UserDetail, beforeEnter: (to, from, next) =>{
                // ローカルに適用される
                next();
            } 
        },
        { path: ":id/edit", component: UserEdit }
    ]}
]
```
#### 2. Component
```javascript
beforeRouteEnter(to, from, next) {
    next():
}
```
### beforeRouteLeave
Tương tự, beforeRouteLeave xử lý trong hàm được chạy khi thoát khỏi url
# Vuex
Như đã nêu ở trên, có thể dùng `Event Bus` hoặc `Callback` để thực hiện việc update `props` giữa các component, tuy nhiên với những dự án lớn thì các làm này trở nên khó quản lý.
Vì lý do đó `Vuex` thường được sử dung trong trường hợp này như một framework quản lý state.
## Thiết kế
Tư tưởng thiết kế giống với `Redux`, hình dung 1 cách tổng thể như sau
![Udemy Vue JS 2 - The Complete Guide (incl. Vue Router & Vuex)](https://images.viblo.asia/edadb587-3860-4a79-aaf9-36eb89c4696a.png)
Lưu trữ `state` trong `store` và mỗi `component` truy cập giá trị của nó bằng `getters`. Khi update giá trị, Cập nhật trạng thái `store` bằng `mutations`. `mutations` là quá trình xử lý đồng bộ, vì vậy khi cần xử lý bất đồng bộ thì phải chèn `actions`vào.
## Cài đặt
```shell
$ npm install --save vuex
```
Tạo file `store/store.js`
```javascript
//store/store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        counter: 0
    }
});
```
insert code vào `main.js`
```javascript
//main.js
import { store } from "./store/store";

new Vue({
    store
})
```
Tại`component` có thể access dữ liệu từ `$store.state`
```javascript
this.$store.state.counter // Không cần sử dụng emit để lan truyền sự thay đổi
```
## getters
Tại store dùng `getters` để defined các method được sử dụng tại các `component` 
```javascript
//store/store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        counter: 0
    },
    getters: {
        doubleCounter: state =>{
            return state.counter * 2;
        }
    }
});
```
Gọi tại`component` thông qua `$store.getters`
```javascript
export default {
    computed: {
        count() {
            return this.$store.getters.doubleCounter
        }
    }
}
```
## mapGetters
Khi số lương các `getters` tăng lên tại các`component` các gọi trên trở nên dài dòng. Sử dụng `mapGetters`  sẽ trở nên hiệu quả hơn
```html
<template>
  <div>{{doubleCounter}}</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters([
            "doubleCounter"
        ]),
        ownMethod();
    }
}
</script>
```
Tuy nhiên cú pháp `...` yêu cầu cài đặt `babel-preset-stage-2`
## babel-preset-stage-2
Cài đặt theo câu lệnh sau
```shell
$ npm install --save-dev babel-preset-stage-2
```
File `.babelrc` được tạo sẽ có nội dung như sau
```javascript
//.babelrc
{
    "presets": [
        ["ec2015", {"modules": false}],
        ["stage-2"]
    ]
}
```
## mutations
Sử dụng `mutations` khi update giá trị thì của state. Cách dùng thì giống với `getters`
```javascript
//store/store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        counter: 0
    },
    getters: {
        doubleCounter: state =>{
            return state.counter * 2;
        }
    },
    mutations: {
        decrement: state =>{
            state.counter--;
        }
    }
});
```
Gọi tại`component` thông qua `$store.commit`
```javascript
export default {
    methods: {
        decrement() {
            this.$store.commit("decrement");
        }
    }
}
```
`mutations` không hỗ trợ xử lý bất đồng bộ. Nên cần chắc chắn xử lý là đồng bộ hóa
## mapMutations
Giống như `mapGetters`, `mapMutations` là các viết hiệu quả hơn khi số lượng `mutations`nhiều
## actions
Để thực hiện xử lý bất đồng bộ, giữa `component` và `mutations` cần chèn `actions`làm trung gian như sau
```javascript
//store/store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        counter: 0
    },
    getters: {
        doubleCounter: state =>{
            return state.counter * 2;
        }
    },
    mutations: {
        decrement: state =>{
            state.counter--;
        }
    },
    actions: {
        decrement: context =>{
            context.commit("decrement");
        },
        decrement: ({commit}) =>{
            commit("decrement");
        }
        // 2 action trên cùng ý nghĩa
    }
});
```
Tại `component` sẽ dùng `$store.dispatch` để gọi đến
```rust
//component
export default {
    methods: {
        decrement() {
            this.$store.dispatch("decrement");
        }
    }
}
```
# Tham khảo thêm
* [Vue.js: 複数のクラスをバインディングする場合どのような書き方があるか](https://qiita.com/FumioNonaka/items/08ab308cf1e931d4b2eb)
*  [The difference between COMPUTED and METHODS in Vue.js](https://medium.com/notonlycss/the-difference-between-computed-and-methods-in-vue-js-9cb05c59ed98)
*  [vuejs.org](https://vuejs.org/v2/guide/)