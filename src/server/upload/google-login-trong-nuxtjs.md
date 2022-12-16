# 1. Auth

Authenticate là thứ rất quen thuộc của mỗi app, trong bài viết này mình sẽ giới thiệu auth module dành cho nuxt giúp bạn xử lý công việc này rất nhanh và dễ dàng.

# 2. Cài đặt

Trước hết là cài nuxt

`yarn create nuxt-app nuxt-project`

Cài đặt auth module

`
yarn add @nuxtjs/auth
yarn add @nuxtjs/axios
`

thêm module vào `nuxt.config.js`

```
modules: [
  '@nuxtjs/axios',
  '@nuxtjs/auth'
],
```

thêm file `index.js` vào thư mục `store` để active vuex cho project

chạy lệnh `yarn dev` và mở link lên xem
![](https://images.viblo.asia/ccbc9f4d-cd06-4178-8fd5-dd016e066913.png)

giờ chúng ta thử thêm middleware vào file pages/index.vue

```
export default {
  middleware: 'auth'
}
```

và kết quả là
![](https://images.viblo.asia/5d1438fa-2ef0-4901-9ee1-34f5ccb3fdb0.png)

vì chúng ta đã set middleware auth nhưng chưa xác thực user nên nuxt đã redirect chúng ta tới trang `/login`. Giờ chúng ta sẽ tiếp tục tạo file pages/login/index.vue

```
<template>
  <button class="login">
    Login with Google
  </button>
</template>
<script>
</script>
<style lang="scss" scoped>
.login {
  box-sizing: border-box;
  position: relative;
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
  background: #DD4B39;
  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
    border-right: #BB3F30 1px solid;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
  }
  &:focus {
    outline: none;
    background: #E74B37;
  }
  &:active {
    box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
```

Tiếp theo chúng ta cần tạo clientId của google https://console.developers.google.com/ chi tiết thì các bạn google sẽ có rất nhiều hướng dẫn. Thêm clientId vừa tạo dc vừa vào `nuxt.config.js`

```
auth: {
  strategies: {
    google: {
      client_id: '...'
    },
  }
}
```

Sửa lại file login/index.vue
```
<template>
  <button class="login" @click="login">
    Login with Google
  </button>
</template>
<script>
export default {
  methods: {
    login() {
      this.$auth.loginWith('google', { params: { prompt: "select_account" } })
    }
  }
}
</script>
...
```

Sửa lại file pages/index.vue
```
<template>
  <div class="container">
    <img :src="user.picture" alt="">
    <p>{{ user.name }}</p>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  computed: {
    user() {
      return this.$auth.user;
    }
  }
}
</script>
<style>
</style>

```
 Giờ bạn hãy mở trình duyệt lên, login và xem kết quả