# Giới thiệu
Chào các bạn, hiện tại VueJS đã là một trong những javascript framework lớn nhất hiện nay với hơn 155K :star: trên Github. Hiện tại gần tết rồi, chắc mọi người sẽ mong ngóng tết đến và đếm lùi ngày đến tết =))
Trong bài viết này mình sẽ giới thiệu về Vue-CLI và tạo một landing page đếm lùi ngày đến tết các bạn nhé.

*Note: Mình có viết bài từ trước tết nhưng quên public, các bạn có thể đổi ngày để đếm đến 14/2 cho gần =))*
# Vue-CLI
Vue-CLI là một CLI (CLI – Command Line Interface) giúp xây dựng một Vue template project nhanh chóng thông qua các command line.
## Cài đặt
Chúng ta có thể cài đặt Vue-CLI thông qua NPM hoặc Yarn, tất nhiên là máy đã cài node các bạn nhé :D
Cài đặt thông qua command:
```shell
npm install npm@latest -g
```
Tương tự với Yarn
```shell
yarn add -global vue-cli
```
## Init project
Để tạo project mới qua Vue-CLI chúng sử dụng command:
```shell
vue init webpack project-name
```
Sau khi chạy bạn sẽ được hỏi về một số option như: Tên project, mô tả, sử dụng bộ complie nào, có sử dụng ESlint hay không, có unit test hay không,...?

![](https://images.viblo.asia/707bde55-6846-47a0-93bc-f70fcdc44263.png)

Sau khi tạo xong project:

![](https://images.viblo.asia/a1d15c74-f8a7-4edd-a818-656008d59cdf.png)

## Code flow, Project structure
Một số command được setting sẵn, các bạn có thể tìm thấy ở file README.md
```shell
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### Project structure:
![](https://images.viblo.asia/7850f987-bc11-426a-b141-42692192d958.png)


**build**: Build project thông qua webpack.

**config**: Chứa config về webserver, env.

**node_modules**: Chứa các modules được kéo về qua NPM/Yarn.

**src**: Chúng ta sẽ code Vue tại đây.

**static**: Chứa các static resources.

### Code flow
Sau chạy command `npm run dev`, lúc này một server ảo sẽ chạy tại cổng `8080`, có tác dụng serve file `index.html`.
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>count-down</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
Trong thư mục **src**, file `main.js` sẽ được chạy đầu tiên, Vue app sẽ được tạo tại đây
```js
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```
Vue app khởi tạo đồng thời sẽ render một component có tên là App, chính là file `App.vue`
```js
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

Trong App component, có một component là `<router-view/>`, component này có tác dụng inject các component con dựa vào `router`.
Router của Vue app lúc này sẽ là file `src/router/index.js`
```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
```

Vậy khi bạn truy cập vào `http://localhost:8080/` component `HelloWorld` sẽ được inject vào bên trong component `App`

![](https://images.viblo.asia/ce96a439-f6c6-4be7-bc7a-71fbeedb6ce7.png)
#  Xây dựng landing page đếm ngược
Sau khi hiểu về luồng và cấu trúc thư mục, chúng sẽ bắt đầu xây dựng một component mới các bạn nhé
## Chỉnh sửa lại sample code
Mình vẫn sẽ giữ nguyên luồng chạy của Vue app, tại file `/src/App.vue` mình sẽ bỏ bớt code mẫu đi, chỉ giữ lại:
```js
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
```

Tại `/src/components` chúng ta sẽ tạo component mới tên là `CountDown.vue`, đồng thời sẽ sửa lại router một chút, khi truy cập `/` sẽ render component `CountDown` thay cho `HelloWorld`

```js
import Vue from 'vue'
import Router from 'vue-router'
import CountDown from '../components/CountDown'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'count-down',
      component: CountDown,
    },
  ],
})

```

Mình sẽ template trước khi xử lý logic:

Lưu ý: Những file ảnh chúng ta sẽ đặt tại thư mục `/src/assets`

```js
<template>
  <div class="main">
    <div class="countdown">
      <div class="block">
        <p class="digit">{{ day }}</p>
        <p class="text">Ngày</p>
      </div>
      <div class="block">
        <p class="digit">{{ hour }}</p>
        <p class="text">Giờ</p>
      </div>
      <div class="block">
        <p class="digit">{{ minute }}</p>
        <p class="text">Phút</p>
      </div>
      <div class="block">
        <p class="digit">{{ second }}</p>
        <p class="text">Giây</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CountDown',
    data: function () {
      return {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
      }
    },
  }
</script>

<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:100);

  .main {
    align-items: center;
    bottom: 0;
    width: 100%;
    background-image: url("~@/assets/bg.jpg");
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .countdown {
    display: flex;
  }

  .block {
    display: flex;
    flex-direction: column;
    margin: 20px;
  }

  .text {
    color: #ffffff;
    font-size: 25px;
    font-family: 'Roboto Condensed', serif;
    font-weight: 40;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
  }

  .digit {
    color: #ecf0f1;
    font-size: 130px;
    font-weight: 100;
    font-family: 'Roboto', serif;
    margin: 10px;
    text-align: center;
  }
</style>
```

Sau khi xong template, lúc này bắt đầu xử lý logic các bạn nhé :smiley:

![](https://images.viblo.asia/823d2918-2d49-4a32-9cd5-ede7f4425a68.png)

## Đếm ngược
Trong một Vue component sẽ có các method đại diện cho từng giai đoạn của Lifecycle Hooks.
Tại method `created`:

```js
   created () {
      setInterval(() => {
        const currentDate = new Date()
        this.calculateETA(currentDate)
      }, 1000)
    },
```
Khi component được tạo chúng sẽ sử dụng method `setInterval` với step là 1s với mục đích là 1s sẽ lấy lại thời gian hiện tại 1 lần, sau đó xử lý tính toán tại method `calculateETA`
```js
calculateETA (currentDate) {
        const destinationDate = new Date('2020-01-25').setHours(0, 0, 0, 0)
        let diff = destinationDate - currentDate
        let milliseconds = diff % 1000
        diff = (diff - (milliseconds)) / 1000
        this.second = diff % 60
        diff = (diff - (this.second)) / 60
        this.minute = diff % 60
        diff = (diff - (this.minute)) / 60
        this.hour = diff % 24
        this.day = (diff - (this.hour)) / 24
      },
```
`const destinationDate = new Date('2020-01-25').setHours(0, 0, 0, 0)` chính là mùng 1 Tết, vì Việt Nam ở múi giờ +7, nếu `new Date('2020-01-25')` sẽ trả về kết quả là 7h sáng ngày 25/01/2020, vậy nên cần set thêm `setHours(0, 0, 0, 0)` để thời gian chính là giao thừa các bạn nhé :D

Như vậy xem như đã hoàn thành rồi, nhưng chúng ta sẽ chỉnh lại một chút để cho đồng bộ số degit, vì ngày hiện tại có 2 chữ số, mà giờ, phút, giây nếu <10 chỉ có một, trông không đẹp cho lắm nhỉ =))

Thêm một số computed:
```js
computed: {
      hourETA() {
        return this.hour >= 10 ? this.hour : `0${this.hour}`
      },
      minuteETA() {
        return this.minute >= 10 ? this.minute : `0${this.minute}`
      },
      secondETA() {
        return this.second >= 10 ? this.second : `0${this.second}`
      }
    },
```

Đổi lại template
```js
<template>
  <div class="main">
    <div class="countdown">
      <div class="block">
        <p class="digit">{{ day }}</p>
        <p class="text">Ngày</p>
      </div>
      <div class="block">
        <p class="digit">{{ hourETA }}</p>
        <p class="text">Giờ</p>
      </div>
      <div class="block">
        <p class="digit">{{ minuteETA }}</p>
        <p class="text">Phút</p>
      </div>
      <div class="block">
        <p class="digit">{{ secondETA }}</p>
        <p class="text">Giây</p>
      </div>
    </div>
  </div>
</template>
```

Okay, vậy là đã hoàn thành rồi...
Truy cập vào `http://localhost:8080/` để xem thành quả nào :D

Tại thời điểm mình viết bài hơn 2 tuần nữa mới tết cơ =))

![](https://images.viblo.asia/cee2e655-9732-409c-a403-5606983a1d55.png)

Sau khi hoàn thành, nếu muốn deploy các bạn có thể sử dụng `npm run build`, webpack sẽ build project ra các file tại `/dist`.
Lưu ý file `index.html` cần chạy qua webserver mới có thể hiển thị được các bạn nhé.

Code demo: https://github.com/hoangtm1601/bao-gio-den-tet