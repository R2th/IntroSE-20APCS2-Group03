## 1. Mở đầu
<hr>

Trước đây mình có một bài viết giới thiệu về `NextJS` - một framework hỗ trợ chúng ta thực hiện server-side rendering với ReactJS nếu bạn chưa đọc thì có thể xem qua tại [đây](https://viblo.asia/p/tim-hieu-ve-nextjs-p1-djeZ1bNjlWz). Còn trong bài viết hôm nay thì mình sẽ giới thiệu về một framework tương tự với `NextJS` đó là `NuxtJS` - một framework tương tự của VueJS và cũng là framework mà mình đang làm việc cùng nhiều nhất gần đây. Nào chúng ta cùng bắt đầu.

## 2. NuxtJS
<hr>

Khi truy cập vào trang chủ của [NuxtJS](https://nuxtjs.org/) thì chúng ta có thể thấy ngay một lời giới thiệu rằng:

![](https://images.viblo.asia/c34c79c0-9b66-4d46-a4cf-751f7a7159dd.png)

- Modular: Dựa trên kiến trúc module của mình mà NuxtJS mà việc cài đặt và config các thư viện ngoài cho NuxtJS vô cùng đơn giản và dễ dàng chỉ với một hai dòng config. Chi tiết các module phổ biến để dùng với NuxtJS bạn có thể xem thêm tại https://modules.nuxtjs.org/.
- Performant - hiệu năng: Tương tự như NextJS thì bản thân các config mặc định của NuxtJS đã có rất nhiều các config liên quan đến việc tối ưu hóa ứng dụng của bạn giúp cho ứng dụng của bạn có performant tốt hơn đồng thời nó cũng cung cấp cách để bạn có thể thêm các step tối ưu riêng của bạn vào một cách dễ dạng.
- Enjoyable: Đối với cá nhân mình sau khi đã tìm hiểu và có tham gia code một chút về cả `NextJS` và `NuxtJS` thì mình thấy NuxtJS dễ dàng tiếp cận hơn nhiều so với NextJS. Khoan nói về các tính năng nâng cao thì bản thân mình khi mới bắt đầu tìm hiểu và dùng thử NuxtJS thì mình thấy nó dễ dàng config hơn so với NextJS, document cũng được viết rõ ràng hơn, có tích hợp sẵn một sô tính năng cần thiết như middleware, layout, vuex, ... . Nhìn chung hiện tại thì mình khá ưng ý với NuxtJS.

### a. Khởi tạo project NuxtJS

Đối với NuxtJS thì chúng ta có thể dùng [create-nuxt-app](https://github.com/nuxt/create-nuxt-app) để khởi tạo một project mới:

```bash
yarn create nuxt-app <my-project>
```

Đối với NextJS trước kia khi tạo project mới thì ta chỉ cần gõ một lệnh tương tự như trên và đợi giây lát để nó tạo project mới thì với NuxtJS sẽ hỏi chúng ta về các config và cài đặt các third-party library mà thường thường chúng ta sẽ cần cài đặt như sau:

- Chọn tên cho project của bạn
![](https://images.viblo.asia/b7d14a08-f95e-46d9-947d-1931ad36a3b9.png)

- Bạn có thể lưa chọn sử dụng Javascript hoặc Typescript luôn ở đây để nó sẽ tự động config cho bạn luôn.
![](https://images.viblo.asia/1d946cae-5ed2-410e-98af-d9ab7bd87bb4.png)

- Bạn cũng có thề lựa chọn sẽ sử dụng Yarn hay Npm cho dự án của mình.
![](https://images.viblo.asia/64d45e07-ee87-46c3-b618-881057c74e3a.png)

- Ngoài ra bạn có thể chọn ngay thư viện UI mà bạn mong muốn sử dụng trong dự án của mình. Với mình nó sẽ là ElementUI. Lưu ý nếu bạn muốn dùng thêm Tailwind CSS thì có thể config sau còn ở đây bạn nên chọn các thư viện chứa các vuejs component để sử dụng.
![](https://images.viblo.asia/81f261f6-579a-4950-a515-4d2bb5f6a38b.png)

- Tiếp đến ở đây bạn có thể chọn nhiều option thay vì một như ở trên và nó có cung cấp cho chúng ta một số option như cài đặt axios để phục vụ cho việc gọi API lên BE hay thêm luôn mode PWA vào dự án. Ở đây nếu bạn không muộn chọn gì thì có thể bấm enter để bỏ qua hoặc có thể bấm space để chọn các option mong muốn.
![](https://images.viblo.asia/ef182b2c-3389-4b5d-86e5-68157582255a.png)

- Ở bước này bạn có thể chọn linting tool cho project của mình từ việc check code js, css đến cả validate commit message cho git
![](https://images.viblo.asia/72fd3393-00e9-4741-b1ce-9828207f2fad.png)

- Tiếp đó là thư viện phục vụ việc viết test trong project của bạn. Bạn có thể chọn none nếu chưa muốn cài đặt luôn ở đây hoặc muốn cài đặt thư viện khác.
![](https://images.viblo.asia/0e354864-fdd9-46e4-9fd4-ab4b55197f3b.png)

- Tiếp đến là chọn mode. Ở đây sẽ gồm 2 mode là Server side rendering hoặc single page app (client side rendering). Tuy nhiên bạn có thể chọn bất kì ở đây vì việc config qua lại giữa 2 mode này vô cùng đơn giản và mình sẽ chỉ cho các bạn khi chúng ta đến phần đó.
![](https://images.viblo.asia/991fa9f7-c33e-450f-995e-4f40cbf3f709.png)

Ở dưới bước trên sẽ còn một vài option nữa tuy nhiên tùy vào các option bạn chọn nó sẽ sinh ra thêm các config khác luôn nên nếu không có nhu cầu gì khác như muốn thêm pull request template riêng thì có thể config thêm nữa. Còn không thì bạn chỉ cần quan tâm đến đây thôi còn các option sau đó bạn có thể enter để skip hết mà không cần chọn nữa. Sau đó bạn đợi giây lát và chúng ta sẽ thu được cây thư mục như sau:

![](https://images.viblo.asia/bfef3ebb-cb87-4040-8e5f-477505e45179.png)

- Thư mục `assets/` này dùng để code chưa được complie của bạn như LESS, SASS, font chữ,  Javascript, ảnh. Những asset này của bạn sau này khi build lên sẽ được chạy qua webpack để complie lại
- `components/` thư mục dùng để chứa các component trong project của bạn
- `layouts/` là nơi sẽ chứa các file layout cho trang web của bạn như layout cho user, layout cho admin
- `middleware/` sẽ chứa các phần code logic dùng cho việc quyết định xem ai có thể vào trang nào trong ứng dụng của bạn hoặc sẽ làm gì khi user không có quyền cố tình truy cập vào url như `demo.com/admin`. Nếu bạn từng làm việc với backend thì hẳn sẽ biết đến middeware thì ở đây nó cũng tương tự.
- `pages/` đây sẽ là nơi để định nghĩa các page trên trang của bạn. Thay vì phải viết code giống như project VueJS thông thường:
```js
{ path: '/user/:id', component: User }
``` 
Thì ở đây ta chỉ cần tạo ra các file `.vue` và `NuxtJS` sẽ lo phần còn lại để tạo ra phần router cho bạn. Chi tiết thì mình sẽ nói ở phần sau.
- `plugins/` sẽ gồm những phần code javascript bổ sung cho dự án của bạn mà bạn muốn nó được chạy trước khi ứng dụng của bạn chạy lên nó sẽ là nơi để bạn khai báo các function mà trước kia bên VueJS thông thường bạn khai báo sử dụng từ khóa `Vue.use()`
- `static/` chứa các file thuộc dạng static sẽ khong bị ảnh hưởng bởi quá trình complie khi build. Đây là nơi ta sẽ đặt các file như robot.txt hay sitemap.xml, ...
- `store/` là nơi chứa code phục vụ cho bạn khi sử dụng `VueX`. Đặc biệt `NuxtJS` đã config sẵn phần `VueX` cho bạn rồi và ở đây bạn chỉ việc sử dụng thôi
- Nogià ra còn một số file config khác mà bạn có thể đã khá quen thuộc như `.eslintrc.js`, `package.json`, ... và đặc biệt còn file `nuxt.config.js` sẽ là file config riêng cho `NuxJS` trong dự án của bạn. Sơ qua thì về cấu trúc thư mục chúng ta sẽ có như ở trên và bạn hoàn toàn có thể tạo thêm các thư mục khác tùy theo nhu cầu của bạn.

### b.  nuxt.config.js
 
Như đã nói ở trên, đây sẽ là file chứa các config liên quan đến project của bạn và tùy vào các option bạn chọn khi khởi tạo project mà file nó sẽ có dạng như sau:

```nuxt.config.js
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'viblo-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  }
}
```

- Đầu tiên như bạn thấy ở phần `head` sẽ là các config liên quan đến phần header của chung trên trang của bạn. Với config bạn thấy như trên thì khi chuyển lên web browser sẽ được chuyển thành:
```html
<html lang="en" data-n-head="%7B%22lang%22:%7B%22ssr%22:%22en%22%7D%7D"><head>
    <title>viblo-nuxt</title>
    <meta data-n-head="ssr" charset="utf-8">
    <meta data-n-head="ssr" name="viewport" content="width=device-width, initial-scale=1">
    <meta data-n-head="ssr" data-hid="description" name="description" content="">
    <link data-n-head="ssr" rel="icon" type="image/x-icon" href="/favicon.ico">
    ....
```
Tất nhiên bạn vẫn có thể overwrite phần header của page trong từng trang của bạn nhưng đây sẽ là phần header dùng chung và mặc định nó sẽ được import vào toàn bộ các trang. Chính vì thế ở đây ta cũng có thể import vào đó các đường asset bên thứ 3 như google font như sau:
```nuxt.config.js
export default {
    ...
    link: [
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap',
        },
    ]
    ...
}
```

- Tiếp đó chúng ta sẽ có phần config cho global css. Đây sẽ là nơi chúng ta dùng để thêm vào các file style css dùng cho toàn bộ các trang của chúng ta, ở đây vì ta cài ElementUI nên nó sẽ tự động import sẵn file css của element ui vào cho bạn.
- Mục plugin sẽ là nơi để chúng ta khai báo các file js mà chúng ta tự define hoặc các file js theo config của thư viện khác vào cho project. Tất cả các file js mà bọn import ở đây sẽ được chạy trước khi instance của ứng dụng của bạn được chạy lên. Giả sử bạn tạo ra các custom-directive cho VueJS thì đây sẽ là nơi mà chúng ta có thể sử dụng để đăng kí component này như sau:

```v-custom.js
import Vue from 'vue';
import CustomDirective from '~/components/CustomDirective';

Vue.component('v-custom', CustomDirective);
```
Sau đó ta thêm file này vào phần `plugins` như sau:
```nuxt.config.js
plugins: [
    '@/plugins/element-ui',
    '@/plugins/v-custom',
],
```
Cuối cùng trong các file `.vue` ta có thể dùng luôn:
```html
<template>
    <div v-custom="abc">Demo</div>
<template>
```
- Bên dưới phần `plugins` ta sẽ có một phần là `components: true`. Đây là một tính năng khá hay của NuxtJS vì khi bạn set nó về true thì mỗi khi bạn sử dụng các component con trong component cha sẽ không cần phải import và khai báo phần `components {}` như trong VueJS mặc định nữa. Ví dụ ta có cấu trúc thư mục như sau:
```
components/
    --- ComponentA.vue
    --- ComponentB/index.vue
pages/
    --- index.vue
```
Với Vuejs thông thường thì trong  file `index.vue` nếu ta muốn dùng ComponentA và ComponentB thì ta sẽ phải làm như sau:
```html
<template>
    <div>
        <ComponentA />
        <ComponentB />
    </div>
</template>

<script>
    import ComponentA from '~/components/ComponentA.vue';
    import ComponentB from '~/components/ComponentB/index.vue';

    export default {
        components: {
            ComponentA,
            ComponentB
        }
    }
</script>
```
Khá là dài dòng đúng không nào. Tuy nhiên với NuxtJS thì ta chỉ cần viết:
```html
<template>
    <div>
        <ComponentA />
        <ComponentB />
    </div>
</template>
```
Toàn bộ việc import file hay khai báo `components {}` sẽ được Nuxt tự động làm hết cho chúng ta luôn. Việc tự động import này hoạt động ngay cả khi ta import các component trong cùng folder hoặc kể cả trong nested folder.
- Tiếp đó ta có 2 phần là `modules` và `buildModules` đây là nơi để ta import các module bên thứ 3 vào project của chúng ta mà mình đã nhắc đến ở phần giới thiệu về Nuxjs. Tuy nhiên có 1 điều cần chú ý là các modules bạn khai báo trong `modules` sẽ là các thư viện cần sử dụng trong môi trường production còn `buildModules` sẽ dành cho các module chỉ cần khi bạn dev mà thôi. Việc chia như này sẽ giúp giảm bundle size của bản production khi build ra. Để biết module bạn cài đặt nên thêm vào mục nào thì bạn hãy đọc docs của module đó và làm theo nhé.
- Cuối cùng là mục `build {}`, đây sẽ là nơi cho  phép bạn config thêm rất nhiều các bước khác tùy theo mong muốn của bạn giống như bạn config build trong webpack vậy. Chi tiết bạn có thể xem ở [đây](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build).

## 3. Kết bài
<hr>

Vì đây chỉ là phần đầu của bài viết nên mình sẽ chỉ dừng lại ở việc giới thiệu thôi, ở các phần sau chúng ta sẽ đi vào các chứng năng mà NuxtJS cung cấp cho chúng ta mà VueJS mặc định chưa có. Nếu các bạn có câu hỏi hoặc góp ý  gì có thể comment ngay ở bên dưới cho mình biết và đừng quên để lại 1 upvote nhé. Hẹn gặp lại các bạn ở bài sau :D.