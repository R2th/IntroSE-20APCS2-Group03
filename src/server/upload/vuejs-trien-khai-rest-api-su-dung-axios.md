Hiện tại có rất nhiều Frameworks có tích hợp HTTP APIs như Angular 2 có `http` module, JQuery có `$.ajax` và Vue.js 2.0 có `vue-resource`. Nhưng trong Vue 2.0 thì các developer đã cho rằng `http client` module đó là dư thừa và có 1 thư viện bên thứ ba hỗ trợ tốt hơn đó chính là `Axios`.

Axios là một thư viện `http client` (HTTP client là gì các bạn? Nói nôm na ví dụ bạn muốn truy cập vào một website nào đó thì bạn chính là một client ) tuyệt vời. Nó sử dụng mặc định `Promise` và chạy trên cả máy khách và máy chủ (điều này làm cho nó thích hợp để `fetching data` trong khi phía máy chủ đang `render`). Nó rất dễ sử dụng với Vue. Vì sao, bởi vì nó sử dụng `Promise`, bạn có thể kết hợp nó với async/await, đó chính là nội dung của bài viết này :D

Nếu bạn nào chưa biết `Promise` là gì thì hãy đọc qua bài viết này nhé: https://kipalog.com/posts/Promise-la-khi-gi-

# Cài đặt
Bạn nên dùng NPM hoặc Yarn để cài đặt `Axios`

```
# Dùng Yarn
$ yarn add axios

# Dùng NPM
$ npm install axios --save
```

# Sử dụng GET method để lấy dữ liệu
Bạn có thể sử dụng `Axios` trực tiếp trong các `component` của bạn để tìm nạp dữ liệu từ một phương thức, lifecycle hook hoặc bất cứ khi nào.

```
ExampleComponent.vue
=========================================

<template>
  <ul v-if="posts && posts.length">
    <li v-for="post of posts">
      <p><strong>{{post.title}}</strong></p>
      <p>{{post.body}}</p>
    </li>
  </ul>

  <ul v-if="errors && errors.length">
    <li v-for="error of errors">
      {{error.message}}
    </li>
  </ul>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      errors: []
    }
  },

  // lấy dữ liệu khi component được tạo thành công
  created() {
    axios.get(`http://jsonplaceholder.typicode.com/posts`)
    .then(response => {
      this.posts = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
```

# Sử dùng method POST để gửi dữ liệu
Chúng ra cũng có thể sử dụng method `PUT`, `PATCH` và `DELETE`.

```
ExampleComponent.vue
=========================================

<template>
  <input type="text" v-model="postBody" @change="postPost()"/>
  <ul v-if="errors && errors.length">
    <li v-for="error of errors">
      {{error.message}}
    </li>
  </ul>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      postBody: '',
      errors: []
    }
  },

  // Gửi request lên server khi mà postPost() được gọi
  postPost() {
    axios.post(`http://jsonplaceholder.typicode.com/posts`, {
      body: this.postBody
    })
    .then(response => {})
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
```

# Khởi tạo Base Instance chung

Cái này thường được bỏ qua nhưng nó rất hữu ích mà `Axios` cung cấp khả năng có thể tạo `base instance` và nó cho phép bạn chia sẻ một base URL và cấu hình trên tất cả nơi gọi tới `instance` đó.
Điều này có ích nếu bạn có gọi đến một `server` cụ thể hoặc cần chia sẻ tiêu đề, chẳng hạn như `authorization header`.

```
http-common.js
=========================================

import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `http://jsonplaceholder.typicode.com/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})
```

Bạn có thể dụng nó như sau:

```
<script>
import {HTTP} from './http-common';

export default {
  data() {
    return {
      posts: [],
      errors: []
    }
  },

  created() {
    HTTP.get(`posts`)
    .then(response => {
      this.posts = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
```

# Kết luận và tài liệu tham khảo
Đó là những điều cơ bản nhất mà `Axios` có thể làm và nó có thể làm được nhiều thứ nó kinh khủng hơn.

Xem thêm thông tin tại `GitHub` https://github.com/mzabriskie/axios