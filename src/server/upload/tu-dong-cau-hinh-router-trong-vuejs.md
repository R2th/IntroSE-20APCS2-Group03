Khi xây dựng web app với Vuejs thì router là thành phần không thể thiếu - với vai trò điều hướng ứng dụng.
Thông thường file router sẽ có dạng như sau:

```
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home'
      component: import '@/pages/Home.vue'
    },
    {
      path: '/login',
      name: 'Login'
      component: import '@/pages/Home.vue'
    }
    {
      path: '/',
      name: 'Register'
      component: import '@/pages/Register.vue'
    }
    ...
    // Các page khác
  ]
});
```

Có thể thấy khi nào chúng ta tạo ra một trang mới thì chúng ta phải vào file router để thêm vào và ngược lại, khi xoá một page component nào đó thì chúng ta phải vào file router để xoá route đó đi.
Việc này không ảnh hưởng gì lắm với những app nhỏ, nhưng với app có rất nhiều trang thì cách làm này không thực sự hiệu quả lắm. 

Giải pháp ở đây là chúng ta sẽ sử dụng  ``vue-auto-routing``, plugin này sẽ tự động tạo ra các route trong file router một cách tự động dựa theo thư mục pages mà chúng ta mong muốn. Có nghĩa là lúc tạo ra page mới thì không cần thêm vào file router như lúc đầu đó 🤣.

Sau khi thêm plugin thì chúng ta chỉnh file router thành như sau:

```
import Vue from 'vue';
import Router from 'vue-router';
import routes from 'vue-auto-routing';

Vue.use(Router);

export default new Router({
  mode:'history',
  routes,
});
```

Mặc định nó sẽ trỏ vào thư mục ``src/pages``.
Chúng ta có thể thay đổi bằng cách tạo thêm file ``vue.config.js`` và cấu hình lại như mong muốn.

```
// vue.config.js
const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new VueAutoRoutingPlugin({
        pages: 'src/<tên-thư-mục-trỏ-đến-nè>',
        importPrefix: '@/<tên-thư-mục-trỏ-đến-nè>/'
      })
    ]
  }
}
```

*Bạn có thể xem thêm các option tại https://github.com/ktsn/vue-auto-routing*
Vậy là xong rồi, hihi.

Cảm ơn bạn đã dành thời gian đọc bài viết. :kissing_heart::kissing_heart::kissing_heart: