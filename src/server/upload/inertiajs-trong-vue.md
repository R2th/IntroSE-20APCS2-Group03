Trong bài lần trước mình đã giới thiệu về InertiaJS và giới thiệu cách sử dụng InertiaJs bên phía Server cụ thể là Laravel hôm nay mình sẽ giới thiệu thêm về cách sử dụng Inertia với VueJS từ đó bạn có thể biết cách sử dụng Inertia bên phía client (Vue) và từ đó phát triển trên nhiều loại ngôn ngữ/ framework khác
# Cài đặt
Để sử dụng InertiaJs trong Vue, dùng npm để cài đặt
> npm install inertiajs/inertia-vue --save
>
## Server side
Để sử dụng Inertia bạn phải cài đặt cả ở phía server nữa, mình đã có một bài hướng dẫn các bạn tham khảo nhé (server sử dụng Laravel)
https://viblo.asia/p/inertiajs-trong-laravel-L4x5xEXBKBM

Ngoài ra bạn cần phái thiết lập lại webpack bên Laravel nữa nhé. Trong file webpack của Laravel sửa lại như sau:
```webpack.config.js
const mix = require('laravel-mix')
const path = require('path')

mix
  .js('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css')
  .webpackConfig({
    output: { chunkFilename: 'js/[name].js?id=[chunkhash]' },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.esm.js',
        '@': path.resolve('resources/js'),
      },
    },
  })
```

Trên đây đã định danh thư mực resources/js là @. Nếu sau này bạn muốn truy cập tới các file có dạng đường dẫn `resource/js/` ở file vue hoặc js bạn sử dụng `@/` là được.
## Thiết lập dynamic import
Mặc định, Inertia sẽ sử dụng code split (giúp chia nhỏ file js khi render trong trường hợp file quá dài). Để làm được điều đó, ta phải sử dụng đến dynamic import (dùng babel plugin)

Cài đặt babel plugin sử dụng npm:
> npm install @babel/plugin-syntax-dynamic-import --save
> 
Tiếp đến tại một file để config `.babelrc` với nội dung sau
```.babelrc
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```
Hoặc bạn có thể sử dụng laravel mix:
```webpack.mix.js
mix.babelConfig({
  plugins: ['@babel/plugin-syntax-dynamic-import'],
})
```
Có một lưu ý đó là khi sử dụng import dynamic, bạn không thể viết style của file trong từng component riêng, có một biện pháp thay thế là bỏ file mix hoàn toàn hoặc sử dụng version webpack nhỏ hơn version 3.

## Cài đặt Vue
Sau khi đã hoàn thành thiết lập bên phía server công đoạn tiếp theo là update file js main để khởi động Inertia app
Khởi tạo base component như sau
```app.js
import Inertia from 'inertia-vue'
import Vue from 'vue'

Vue.use(Inertia)

const app = document.getElementById('app')

new Vue({
  render: h => h(Inertia, {
    props: {
      initialPage: JSON.parse(app.dataset.page),
      resolveComponent: name => import(`@/Pages/${name}`).then(module => module.default),
    },
  }),
}).$mount(app)
```

Sử dụng Inertia cho Vue tiếp đó sử dụng import dynamic để tương ứng với từng đường link mà server gọi đến sẽ map với một component cụ thể ở phía Vue. `resolveComponent` là một callback có nhiệm vụ nói với Inertia load page component nào. Nó nhận vào một page name (phía server gọi) và trả về dạng của vue component

# Sử dụng
## Base layout
Mặc dù không bắt buộc, tuy nhiên đối với hầu hết các dự án, việc tạo default layout để các trang có thể extend là cần thiết. Layout này sẽ được lưu dưới folder Shared. Dưới đây là một ví dụ về một layout cho trang trong InertiaJs
```/Shared/Layout.vue
<template>
  <main>
    <header>
      <inertia-link href="/">Home</inertia-link>
      <inertia-link href="/about">About</inertia-link>
      <inertia-link href="/contact">Contact</inertia-link>
    </header>

    <article>
      <slot />
    </article>
  </main>
</template>
```
## Page Components
Với InertiaJs mỗi trang chính là một component, bạn chỉ cần đặt nó dưới thư mục Pages. Dưới đây là một ví dụ về một trang component. Với layout là component Layout.vue trang Welcome sẽ được viết như sau
```/Pages/Welcome.vue
<template>
  <layout>
    <h1>Welcome</h1>
    <p>Welcome to my first Inertia.js app!</p>
  </layout>
</template>

<script>
import Layout from '@/Shared/Layout'

export default {
  components: {
    Layout,
  },
}
</script>
```
## Tạo links
Để tạo một Inertia link, sử dụng  `<inertia-link>` component
```
<template>
  <inertia-link href="/">Home</inertia-link>
</template>
```

Với inertia link bạn có thể định rõ được lịch sử của browser cũng như trạng thái của thanh scroll. Mặc định khi một đường link được click vào thì sẽ đẩy một trạng thái lịch sử mới và reset trạng thái của thanh scroll bar lên đầu trang. Tuy nhiến nếu bạn sử dụng inertia link, bạn có thể orverride bằng cách sử dụng thuộc tính `replace` và `preserve-scroll`
```
<inertia-link href="/" replace preserve-scroll>Home</inertia-link>
```
Bạn có thể sử dụng phương thức khác cho inertialink. Mặc định của các inertialink là sử dụng phương thức `GET`, tuy nhiên bạn có thể sự dụng `POST`, `PUT`, `PATCH` và `DELETE` bằng cách:
```
<inertia-link href="/logout" method="post">Logout</inertia-link>
```
Ví dụ bạn muốn thêm data cho phương thức post:
```
<inertia-link href="/endpoint" method="post" :data="{ foo: bar }">Save</inertia-link>
```
Khá là thú vị !

Bạn còn có thể giữ local state của một page component bằng cách sử dụng `preserve-state`. Điều này giúp cho việc hạn chế một page component phải tải lại hoàn toàn. Nó thực sự hữu ích với form, bạn có thể duy trì các ô input mà mình đã nhập trước đó
```
<input v-model="query" type="text" />
<inertia-link href="/search" :data="{ query }" preserve-state>Search</inertia-link>
```

## Gọi đến server bằng cách thủ công
Bên cạnh việc nhấn vào link liên kết, còn có cách dùng chung khác để từ phía client gọi đến server.
```
$inertia.visit(url, { method: 'get', data: {}, replace: false, preserveScroll: false, preserveState: false })
$inertia.replace(url, { method: 'get', data: {}, preserveScroll: false, preserveState: true })
$inertia.reload({ method: 'get', data: {}, preserveScroll: false, preserveState: false })
$inertia.post(url, data, { replace: false, preserveScroll: false, preserveState: true })
$inertia.put(url, data, { replace: false, preserveScroll: false, preserveState: true })
$inertia.patch(url, data, { replace: false, preserveScroll: false, preserveState: true })
$inertia.delete(url, { replace: false, preserveScroll: false, preserveState: false })
```

Cũng tương tự như inertia-link, bạn hoàn toàn có thể điều khiển được trạng thái lịch sử sử dụng `replace` cũng như trạng thái của scroll sử dụng `preserveScroll` và local state với `preserveState`
## Truy cập dữ liệu của một component khác

Đôi khi bạn muốn truy cập dữ liệu từ một component không phải trang. Một trường hợp sử dụng cực kì phổ biến là layout. Ví dụ, bạn có thể muốn hiển thị người dùng hiện tại trên phần header của trang. Điều này có thể được thực hiện bằng cách sử dụng thuộc tính `$page`. Dưới đây là một ví dụ:
```
<template>
  <main>
    <header>
      You are logged in as: {{ $page.auth.user.name }}

      <nav>
        <inertia-link href="/">Home</inertia-link>
        <inertia-link href="/about">About</inertia-link>
        <inertia-link href="/contact">Contact</inertia-link>
      </nav>
    </header>

    <article>
      <slot />
    </article>
  </main>
</template>
```

Ngoài ra nó còn rất hữu dụng trong các trường hợp như errors hoặc flash messages

## Ghi nhớ trạng thái của local component

Khi điều hướng lịch sử của trình duyệt. Inertia sẽ load lại trang sử dụng prop data đã được cache trong trạng thái lịch sử. tuy nhiên Inertia sẽ không lưu giữ cache trạng thái của các local component,  vì điều này nằm ngoài tầm với của nó. Điều này có thể dẫn đến các outdate page trong lịch sử trình duyệt. Ví dụ đơn giản nếu người dùng hoàn thiện xong một form, sau đó được điều hướng đi và back lại, form đó sẽ bị reset và phần form data đó sẽ bị mất.

Để giảm thiểu vấn đề này, bạn có thể sử dụng thuộc tính `remember` để báo với Inertia trạng thái của local component để cache. Cần phải cung cấp một mảng các keys tương ứng với dữ liệu:
```
{
  remember: {
    data: ['form'],
  },
  data() {
    return {
      form: {
        first_name: null,
        last_name: null,
        // ...
      },
    }
  },
}
```
Nếu trang của bạn có nhiều component sửa dụng chức năng ghi nhớ này, bạn cần phải cung cấp khóa duy nhất cho từng component. Ví dụ với `Users/Create`. Nếu bạn có nhiều component trong trang, phải đảm bảo rằng nó đã gồm một định danh duy nhất cho từng component đó. `Users/Edit:{id}`
```
{
  remember: {
    data: ['form'],
    key: () => `Users/Edit:${this.user.id}`,
  },
  data() {
    return {
      form: {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        // ...
      },
    }
  },
}
```

Cũng có thể định dạng ngắn gọn các giá trị cần ghi nhớ
```
{
  // array of data keys
  remember: ['form'],

  // single data key
  remember: 'form',
}
```
## Chuyển đổi props client-side
Đôi khi có thể rất hữu dụng để chuyển đổi props phía client trước khi nó đến được page component. Ví dụ, bạn có thể có một collection errors muốn convert thành Error object. Bạn có thể sử dụng `ransformProps` callback
```
import Inertia from 'inertia-vue'
import Vue from 'vue'

Vue.use(Inertia)

const app = document.getElementById('app')

new Vue({
  render: h => h(Inertia, {
    props: {
      initialPage: JSON.parse(app.dataset.page),
      resolveComponent: name => import(`@/Pages/${name}`).then(module => module.default),
      transformProps: ({errors, ...props}) => ({
        ...props,
        errors: new Errors(errors),
      }),
    },
  }),
}).$mount(app)
```