# Đôi nét về VueJS
Chúng ta hiện nay đang ở trong ở trong các kỉ nguyên của các framework Javascript. Công nghệ Web front-end hiện nay đang làm các developer ngày càng có nhiều sự lựa chọn hơn trong việc xây dựng lên các dự án từ lớn cho tới nhỏ.Với tốc độ phát triển nhanh chóng mặt. Rất nhiều người trong số chúng ta đang thực sự sống trong hệ sinh thái của Google (Angular) hay Facebook (React JS). Nhưng mình lại lựa chọn Vue JS với API cực kì đơn giản nhưng mạnh mẽ hiện suất tuyệt vời.😀
# Cài đặt Vue JS
Trước khi bắt đầu một dự án dù nhỏ hay to ta cũng phải cài đặt Vue cái đã nhỉ 😂Có 2 cách để thiết lập Vue đó là chèn trực tiếp vào file HTML cài đặt Vue-CLI thông qua `npm` hoặc `yarn`.
```
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```
Sau đó chúng ta tạo dự án bằng câu Command:
```
vue create my-project
```
Với cách chèn trực tiếp ta có thể sử dụng cdn của Vue qua thẻ script:
```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```
Ở đây mình sẽ không đi sâu về việc sử dụng hay các API của **Vue**, mà trong phạm vi của bài viết này mình chình nói đến đó là bộ định tuyến chính thức của **Vue** đó là **Vue Router**. Nó được tích hợp sâu vào bộ lõi của Vue để xây dựng *Single Page Applications (SPA)* một cách dễ dàng.
# Cài đặt Vue Router
Đầu tiên, giống như việc chúng ta cài đặt Vue thì Vue Router cũng 2 cách tương tự:

```html
<!-- Chèn trực tiếp cdn vào file HTML bằng thẻ <script> -->
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
```

Cách thứ 2 chúng ta cài qua *terminal*:

```
cd my-project
npm install vue-router --save
```
# Khởi tạo một Route mới
Sau đó chúng ta cần đó là tạo một file `routes.js` file này có nhiệm vụ khởi tạo tất cả định tuyến cho project:

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import About from './components/About.vue'
import Home from './components/HelloWorld.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    routes: [
        {path: '/', component: Home},
        {path: '/about', component: About}
    ]
})
```
Đưa Vue Router vào *src/main.js*:
```javascript
import Vue from 'vue'
import App from './App'
import { router } from './routes'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
```

Mình đã sử dụng component `HelloWorld.vue `có sẵn mặc định khi mới tạo 1 webpack lười quá mà 😁
Để hiểu rõ hơn thì mình sẽ tạo thêm 1 router nữa là */about* tạo file About.vue với nội dung đơn giản:

```html
<template>
        <h2>About Something...</h2>
</template>

<script>
    export default {

    }
</script>
```

Để hiển thì các thành phần mà chúng ta đã thiết đặt routes ta dùng thẻ `<router-view>` tại nơi chúng ta muốn hiển thị. Thẻ `<router-link>` giống như thẻ `<a>` vậy đó. Mở file App.vue :

```html
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <br/>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

Việc thiết đặt đã xong, tiếp theo đến là khởi chạy project mà chúng ta vừa tạo:

```
npm run serve
```

Lên hình nào: 
Hãy để ý kĩ đường dẫn cho biết chúng ta đã tạo thành công *router*:
![](https://images.viblo.asia/ae097007-a3ca-450a-a37b-f5286e97b56a.png)
Vue Router có hai chế độ cho URL đó là ở dạng *hash mode* (mặc định) và *history*:
* Hash Mode: mô phỏng URL ở dạng hash (#)
* History: dạng rất quen thuộc khi đường dẫn tới các path bằng '/'
Để thay đổi sang history mode ta chỉ cần thêm vào VueRouter:

```javascript
export const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/about', component: About}
    ]
})
```

Cá nhân mình thì mình thích dùng hash mode hơn vì nó giống kiểu SPA. 😁
Khi nhấn vào About ta sẽ lập tức thấy thành phần trên trang thay đổi chứ trang sẽ không reload.
Github project Vue: [https://github.com/hypnguyen1209/vue-router-example](https://github.com/hypnguyen1209/vue-router-example)
# Tổng kết
Trong phạm vi của bài viết này mình chỉ đưa ra những gì cơ bản nhất về Vue Router và không đi sâu về Vue, bạn nào có hứng thứ với framework này thì có thể tự tìm hiểu nhé, mình thấy việc làm front-end nên biết Vue vì nó cực kì thú vị đó 😉.
## Tài liệu tham khảo
https://github.com/vuejs/vue-router
<br>
https://router.vuejs.org