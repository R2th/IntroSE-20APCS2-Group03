## Nuxjs là gì
 Nuxt.js là 1 framework của Vue.js (Nuxt.js và Vue.js giống như NextJS và React.js), và nó có hỗ trợ sẵn một số thứ config (cấu hình) cần thiết để tạo một ứng dụng Vue. Vì vậy khi dùng nuxtjs thì một cấu trúc của project đã được khởi tạo rõ ràng, chúng ta không cần phải quan tâm đến xây dựng cấu trúc cho project nữa, chỉ cần tập trung vào phát triển ứng dụng là xong.
 Bài viết hôm nay tôi sẽ giới thiệu từng cấu trúc của thư mục nuxtjs và cách sử dụng của nó.
 
## Cấu trúc thư mục và cách sử dụng

### Assets
Thư mục này chứa các file style của dự án, những file này chưa được biên dịch như Sass file, images hay fonts. Có lẽ thư mục này không cần phải nói nhiều rồi, nó chỉ là style của dự án mà thôi, bạn tạo một file có dạng `styles.scss` sau đó khi build hay run project thì webpack sẽ biên dịch file này ra cho bạn.

### Components
Nó chứ những thành phần components giống như vuejs thôi, những file (thành phần) mà thường xuyên được sử dụng, hay sử dụng ở nhiều trang như `Footer, Header` :
ví dụ có một components là `Footer.vue` như sau:
```vuejs
<template>
  <footer class="app-footer">
    <div class="row footer">
     <h1>This is foooter</h1>
    </div>
  </footer>
</template>
<script>
  export default {}
</script>
```

Ta thêm một file là index.js trong thư mục này:

```js
import Footer from './Footer.vue'

export {
  Footer,
}
```

Khi cần import components này vào một file khác ta dùng như sau:


```js
<template>
  <div>
    <Footer/> // footer sẽ xuất hiện ở đây
  </div>
</template>

<script>
  import {Footer} from '~/components/' # import footer

  export default {
    name: 'full',
    components: {
      Footer,
    }
  }
</script>
```

### Layouts

Thư mục này chưa file  giao diện của ứng dụng:

```vuejs
<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <div class="container-fluid">
          <nuxt/>
        </div>
      </main>
    </div>
      <Footer/>
  </div>
</template>

<script>
  import nav from './menu'
  import {Header as AppHeader, Sidebar, Footer} from '~/components/'

  export default {
    name: 'full',
    components: {
      AppHeader,
      Footer,
      Sidebar,
    },

    data() {
      return {
        nav: nav.items
      }
    },

    computed: {
      name() {
        return this.$route.name
      },

      list() {
        return this.$route.matched
      }
    }
  }
</script>
```

Như các bạn của thể thấy, file này sẽ chứa đựng toàn bộ giao diện của ứng dụng. trong đó có thành phần `<nuxt/>` là body của project sẽ được load từ những thư mục hay thành phần khác. Chúng ta cũng có thể có nhiều file layout cho dự án, bằng cách đặt tên cho layout `name: 'full'` rồi sau đó trong phần `pages` gọi đến layout với tên là full là được. Mặc định nuxt sẽ load layout có tên là `default .vue` neus không chỉ định layout nào.

### Middleware

Phần này nếu ai làm backend có lẽ đều đoán được nó làm gì, chính là kiểm tra một request tới ứng dụng trước khi nó được thự thi:

Gỉa sử tạo một file là: 'auth.js' trong thư mục này:

```js
export default function ({ store, redirect }) {
  if (!store.getters['modules/user/isAuthenticated']) {
    return redirect('/auth/signin')
  }
}
```

cái này chỉ đơn giản check users đang login hay không thôi, nếu chưa thì đẩy ra trang đăng kí.

cần khai báo thêm middleware này trong `config` hoặc `layout` tương ứng

in `nuxt.config.js`

```js
router: {
    middleware: ['auth'] # tên file
  },
```

Toàn bộ sẽ chạy qua file `auth.js`

Nếu khai báo trong `layout` thì chỉ pages nào dùng file đó mới chạy qua:

```js
export default {
  middleware: 'auth'
}
```

### Pages

Đây là thư mục chúng ta cần làm việc nhiều nhất, nó chứa đựng những file `views` và `router` của ứng dụng. nuxt sẽ tự động đọc toàn bộ file `.vue` có trong thư mục này rồi tự động tạo `router`
giả sự ta tạo một file như sau `pages/product/index.vue` thì sẽ có một link là `localhost:3000/product/` . `pages/product/list.vue` sẽ có đường dẫn `localhost:3000/product/list`

```vuejs
<template>
  <div class="row">
    <div class="full-box">
      <div class="table-responsive">
        <table class="table table-striped table-bordered table-hover dataTables-example dataTable dtr-inline">
          <thead>
          <tr class="headings">
            <th>Scenario id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Created datetime</th>
            <th>Updated datetime</th>
            <th>Action</th>
          </tr>
          </thead>

          <tbody>
          <tr v-if="products[0]" v-for="product in products" v-bind:key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.created_datetime }}</td>
            <td>{{ product.updated_datetime }}</td>
          </tr>
          <tr class="no-data" v-if="!scenarios[0]">
            <td colspan="7" class="center">no data found</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        products: [],
      };
    },

    head: {
      title: 'List products',
    },

    async mounted() {
      let response = await this.$axios.get('api/products/');
      this.products = response.data.products;
    },
    methods: {}
  };
</script>
```

File này có cấu trước khá đơn giản, chỉ là gọi vào api rồi hiển thị danh sách product lên màn hình.


### Plugins
Chứa những file bạn tự viết hay đơn giản chỉ là load một thư viện từ bên thứ 3 vào

```js
import Vue from 'vue'
import VeeValidate from 'vee-validate';

let moment = require('moment');

// add filter của vuejs
Vue.filter('datetime', date => {
  return moment(date).format('YYYY-MM-DD (ddd) HH:MM');
});

// hay load một thư viện
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: 'veeFields',
  errorBagName: 'veeErrors'
});
```

> Cần khai báo trong `nuxt.config.js` để file này được thực thi, xem phần dưới.

### Static
thư mục này chỉ đơn giản là chứa những file tỉnh kiểu như `robots.txt`, `sitemap.xml` hay những file ảnh, cách sử dụng có khác đôi chút so với phấn assets:

```js
<!-- với thư múc static -->
<img src="/my-image.png"/>

<!-- với assets -->
<img src="~/assets/my-image-2.png"/>
```

### Store

Phần này chứa `Vuex Store files`, để sử dụng phần này ta cần tạo một file là `index.js`:

```js
export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user;
  }
}
```

chúng ta có 2 hàm để getUser và check user đã login hay chưa:
Khi gọi cần import vuex vào để gọi
```js
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'header-dropdown',
    computed: {
      ...mapGetters(['loggedInUser'])
    },
  }
</script>
```

```vuejs
<span class="hidden-sm hidden-xs">{{ loggedInUser.username }}</span>
```

### nuxt.config.js

Nó chứ config của ứng dụng của bạn như `mode` (spa hay universal), Head, loadding, css, plugins, modules


```js

module.exports = {
  mode: 'spa', // spa or universal

  /*
  ** Headers of the page
  */
  head: {
    title: 'viblo title',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: 'viblo content'
      }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'}
    ],
  },

  /*
  ** Customize the progress bar color
  */
  loading: {color: '#42A5CC'},

  /**
   * Import CSS
   */
  css: [
    /* Import Font Awesome Icons Set */
    '~/node_modules/flag-icon-css/css/flag-icon.min.css',
    /* Import Font Awesome Icons Set */
    '~/node_modules/font-awesome/css/font-awesome.min.css',
    /* Import Simple Line Icons Set */
    '~/node_modules/simple-line-icons/css/simple-line-icons.css',
    /* Import Bootstrap Vue Styles */
    '~/node_modules/bootstrap-vue/dist/bootstrap-vue.css',
    /* Import Core SCSS */
    {src: '~/assets/scss/style.scss', lang: 'scss'}
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/axios',
    '~plugins/vee-validate',
    '~plugins/filters.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://github.com/bootstrap-vue/bootstrap-vue
    'bootstrap-vue/nuxt',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: process.env.API_URL,
    debug: process.env.DEBUG || false,
    proxyHeaders: false,
    credentials: false,
  },

  /*
  ** Style resources configuration
  */
  styleResources: {
    scss: './assets/scss/style.scss'
  },

  router: {
    middleware: ['auth']
  },
 }
```


### package.json

Khai báo thư viện của script hay `dependencies` của ứng dụng

EX:
```sh
yarn add basse64
```

## Tài liệu

- https://nuxtjs.org/guide/directory-structure/