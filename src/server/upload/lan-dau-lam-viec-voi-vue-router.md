# Cài đặt Vue
Điều đầu tiên đuơng nhiên là chúng ta phải đi cài đặt **Vue** đã. Ở đây mình hướng dẫn các bạn tạo project vue sử dụng **command**

Các bạn hãy bật Terminal lên và gõ các lệnh sau (các bạn có thể Copy nếu độ lười của khác bạn vượt mức quy định (hehe))
```
# Lệnh này để cài đặt vue-cli
$ npm install --global vue-cli
# Tạo mới 1 project sử dụng webpack template
$ vue init webpack router-app
```
Sau đó ở màn hình Terminal sẽ hiện ra 1 số câu hỏi kiểu như **What is your name?**, **Are you ok?** ... các bạn cứ trả lời theo là được, những cái này mình không trả lời giúp các bạn được :D :D
```
 This will install Vue 2.x version of the template.

 For Vue 1.x use: vue init webpack#1.0 router-app

? Project name router-app <Enter>
? Project description A Vue.js project  <Enter>
? Author  <Enter>
? Vue build standalone  <Enter>
? Install vue-router? Yes
? Use ESLint to lint your code? No
? Setup unit tests with Karma + Mocha? No
? Setup e2e tests with Nightwatch? No
```
Tiếp theo bạn đi tới thư mục chưa project vừa tạo, ở đây mình vừa tạo project tên lè router-app ->  **cd router-app**

Tiếp tục là cài đặt các **package** và start server ở môi trường dev
```
$ npm install
$ npm run dev
```

Bạn vào địa chỉ http://localhost:8080 và chắc chắc nó sẽ hiện thị ra kiểu kiểu như bên dưới (tùy vào phiên bản) còn nếu không thì chắc chắn là bạn chưa cài thành công =))

![](https://images.viblo.asia/e8e63234-8941-4a4d-9bde-933d7cc28b06.png)

OK hơi hơi mất thời gian cho việc cài Vue rồi nhỉ?

OK OK chúng ra sẽ vào phần chính ngay bây giờ.

# Khám phá Vue Router
Bạn mở file `/src/router/index.js` và sẽ thấy nội dụng như lày
```
import Vue from 'vue'
//Dòng này để import vue-router
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [ // bao gồm danh sách route
    {
      path: '/', ///path của route
      name: 'Hello', // tên route
      component: Hello // component route sử dụng
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
```

Tiếp theo bạn mở tiếp file `/src/main.js`

```
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
```

Dòng đầu tiên sẽ import lại vue
Dòng 2 import component App, nó chạy như là root component của ứng dụng
Dòng 3 import vue-router (như trên)

`Vue.config.productionTip = false` kiểu như là có hiện thị `tips` hay `warnings` ra màn hình browser hay không và ở đây mình set là `false`

# Tạo liên kết với Routes
Khi bạn tạo component mà muốn liên kết tới routes khác thì các bạn hãy theo dõi đoạn code bên dưới nhé

```
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link :to="{ name: 'Hello' }">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view></router-view>
  </div>
</template>
```

Ở mình các bạn thấy là có 2 thẻ **<router-link ... >**

**Thẻ thứ nhất**: sử dụng **name** của Route đã được định nghĩa tại `/src/router/index.js`

**Thẻ thứ hai**: chỉ định đường dẫn cố định mà chúng ta muốn liên kết đến.
# Routes động
Để truyền được param lên URL chúng ta sẽ làm như sau:

Mở file `/src/router/index.js` và thêm nội dung như bên dưới:

```
...
import Coins from '@/components/Coins'

...

export default new Router({
  routes: [
    ...
   {
      path: '/coins/:id',
      name: 'Coins',
      component: Coins
    }
  ]
})
```

Tiếp theo tạo file Component  `/src/components/Coins.vue` với nội dung là:

```
<template>
  <div>
    <p>Name: {{ coin.name }}</p>
    <p>Symbol: {{ coin.symbol }}</p>
    <p>Price (USD): {{ coin.price_usd }}</p>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'Coins',

    data() {
      return {
        coin: {}
      }
    },

    created() {
      this.fetchData()
    },

    watch: {
      '$route': 'fetchData'
    },

    methods: {
      fetchData() {
        var list_coins = {
          usd: {
            name: "USD",
            symbol: "$",
            price: "222" 
          }
        }

        this.coin = list_coins[this.$route.params.id]
      }
    }
  }
</script>
```

Method `created` là 1 method đặc biệt nó sẽ được gọi trước khi components được render

Method `watch` nó có nhiệm vụ theo dõi sự thay đổi của dữ liệu và thực thi hành động kèm theo.

Cuôi cùng bạn hãy vào đường dẫn http://localhost:8080/#/coins/usd để xem kết quả nhé :D :D 

# Kết luận
Trên đây là cách đơn giản để bắt đầu với Vue Router. Còn rất nhiều các tính năng hay và đặc biệt khác bạn có thể truy cập https://router.vuejs.org để  đọc và tìm hiểu nhé.

Hy vọng là bài hướng dẫn này của mình sẽ giúp các bạn hiểu hơn 1 chút về Vue và Vue Router.

# Tài liệu tham khảo

https://scotch.io/tutorials/getting-started-with-vue-router
https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes