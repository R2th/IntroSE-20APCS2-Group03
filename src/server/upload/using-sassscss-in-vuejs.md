Trong bài hướng dẫn này, mình sẽ hướng dẫn mọi người cách viết **SASS/SCSS** trong file vuejs.
Thông thường là chúng ta thường viết **CSS** như file bên dưới.
```javascript
<template>
    <div class='msg'>{{mess}}</div>
</template>
<script>
export default {
     data() { 
         return { 
             mess : 'Trang chủ'
         }
     }
}
</script>
<style scoped>
.msg{
   color: 'green'
}
</style>
```

Nhưng hiện tại bây giờ mọi người sẽ thường viết theo kiểu **SASS/SCSS**. Giúp chúng ta viết css dễ dàng và nhanh hơn, cung cấp nhiều chức năng bổ sung cho css.

Bây giờ các bạn mở terminal lên và copy lệnh phía dưới vào rồi chạy, để cài đặt.
```javascript
npm install sass-loader node-sass style-loader --save-dev
or
yarn add ...
```
hoặc bạn có thể mở file` package.json` lên và thêm như bên dưới
```javascript
"devDependencies": {
    "css-loader": "^0.23.1",
    "node-sass": "^4.1.1",
    "sass-loader": "^3.2.3",
    "style-loader": "^0.13.1"
    "vue-loader": "^9.0.0",
    "vue-router": "^2.1.1",
    "webpack": "^1.12.2",
    "webpack-dev-server": "^1.12.0"
  }
```
sau khi thêm xong thì các bạn chạy lệnh
```javascript
npm i
or
yarn
```
để install tất cả các dependencies trên

Sau khi cài xong các bạn mở file `webpack.config.js` lên và thêm như bên dưới
```javascript
module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      }, 
      {
          test: /\.s[a|c]ss$/,
          loader: 'style!css!sass'
      }
    ]
  },
  vue: {
    loaders: {
      scss: 'style!css!sass'
    }
  }
```

Đến đây chúng ta đã thiết lập xong `SCSS/SASS` trong project của mình. Bây giờ chúng ta vào `src` và mở file `main.js` lên
```javascript
import Vue from "vue";
import App from "./App.vue";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```
và mở file `App.vue`
```javascript
<template>
    <div class='msg'>
      {{mess}}
      <p class='title'>Tutorial</p>
    </div>
</template>
<script>
export default {
     data() { 
         return { 
             mess : 'SASS/SCSS loader'
         }
     }
}
</script>
<style lang="scss" scoped>
   @import 'app.scss'
</style>
```
bây giờ các bạn muốn sử dụng SASS/SCSS thì chỉ cẩn thay đổi `lang="scss"` là được, nếu các bạn không để gì thì sẽ hiểu là chúng ta đang viết css. Có 2 cách viết:
+ Chúng ta tạo một file scss riêng và import vào.
+ Chúng ta sẽ viết trực tiếp vào code vào thẻ `style`

Mình sẽ tạo một file scss riêng vào import file vào, để nhìn cho code đỡ dài. Giờ các bạn tạo một file `app.scss` và copy code bên dưới vào.
```scss
.msg {
    width: 1024px;
    height: 768px;
    background: #919890;
    .title {
        font-size: 15px;
    }
}
```

Bây giờ các bạn mở trình duyệt lên và xem thành quả nhé.

Bài hướng dẫn của mình xin tạm dừng ở đây, Nếu có gì sai sót các bạn comment để mình sửa nhé. Cảm ơn các bạn đã đọc bài viết của mình.