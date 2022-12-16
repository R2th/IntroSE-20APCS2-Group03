Phần trước mình đã giới thiệu tổng quát về cấu trúc thư mục của một ứng dụng sử dụng VuePress. Trong phần này mình sẽ đề cập tới việc làm thế nào để custom lại giao diện của Blog VuePress theo ý thích của mình.

# Thiết kế giao diện

Như mình đã để cập trong phần trước về cấu trúc thư mục của ứng dụng VuePress, toàn bộ những file config bạn đều lưu trữ ở trong một thư mục tên là .vuepress.

Để có thể xây dựng một theme riêng cho mình, hay tạo một thư mục tên là theme nằm bên trong .vuepress, sau đó khởi tạo một file tên là Layout.vue.

![](https://images.viblo.asia/63fa65b9-5139-4ab5-b2ce-b7a124fde264.png)

## Component Layout.vue 

Component Layout.vue sẽ là file mà VuePress đọc khi tham chiếu tới theme của chúng ta. Component này sẽ được tham chiếu tới tất cả các file markdown hiện có trong ứng dụng VuePress của bạn.

Giả sử hiện nay mình đang có 4 file markdown (.md) như thế này:
![](https://images.viblo.asia/1a7f10ed-bf92-4634-b63f-c018c7dac568.png)

Bạn khởi tạo component Layout.vue như sau:

```html:Layout.vue
<template>
    <div class="theme-container">
        <Content/>
    </div>
</template>
```

<Content/> là một global component được VuePress định danh sẵn, đấy cũng là nơi toàn bộ dữ liệu trong file .md được render trong đó.

## Cấu trúc một VuePress theme

VuePress không ép buộc ta vào một khuôn mẫu nào, viết xây dựng cấu trúc thư mục là tùy ý thích của chúng ta. Nhưng hiện nay có rất nhiều giao diện xây dựng trên một cấu trúc, ta có thể tham khảo:
![](https://images.viblo.asia/bf04c954-502b-4c5b-b390-7bfc7cbd0ff9.png)

Cấu trúc này giúp chúng ta tổ chức bố cục giao diện theo từng trang (Như trang Post và Homepage có 2 layout khác nhau)

## Sử dụng các thư viện VueJS UI để custom lại giao diện 

Bản thân VuePress là một ứng dụng VueJS, do đó ta có thể sử dụng các thư viện UI của VueJS có trên mạng để dùng vào việc thiết kế giao diện. Hiện nay có 2 thư viện UI mạnh là [ElementUI](https://element.eleme.io/#/en-US)  và [Vuetify](https://vuetifyjs.com/en/)

Ở demo này mình sẽ sử dụng Vuetify, cách cài đặt tương đối đơn giản, bạn chỉ cần 
> npm install vuetify  material-design-icons-iconfont  --save 
> 
Sau đó, trong file .vuepress/enhanceApp.js bạn thêm như sau:
```js:.vuepress/enhanceApp.js 
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

export default ({
  Vue, 
  options, 
  router, 
  siteData 
}) => {
  Vue.use(Vuetify);
}
```
Và thế là xong, bạn đã có thể sử dụng các component có sẵn của Vuetify.

Chúng ta bắt tay vào custom theme của VuePress dựa theo cấu trúc thư mục mình để cập ở trên.

```html:.vuepress/theme/layouts/Home.vue
<template>
    <v-app light>
        <v-content>
            <v-container grid-list-xl>
                <v-layout row wrap align-center>
                    <article>
                        <Content />
                    </article>
                </v-layout>
            </v-container>
        </v-content>
    </v-app >
</template>
```

```html:.vuepress/theme/layouts/Post.vue
<template>
    <v-app light>
        <v-container>
            <v-layout row wrap align-center>
                <v-flex xs12>
                    <header >
                        Published on the {{ date }}
                    </header>
                </v-flex>

                <article>
                    <Content :custom="false"/>
                </article>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import moment from 'moment'

export default {
    computed:{
        date(){
            return moment(String(this.$page.frontmatter.date)).format('MM/DD/YYYY')
        }
    }
}
</script>
```

Trong Post.vue, mình có sử dụng thêm 1 package tên là moment giúp hiển thì dữ liệu ngày tháng một cách đẹp mắt hơn, bạn cài đặt bằng dòng lệnh:
> npm install moment
> 
```html:.vuepress/theme/Layout.vue
<template>
    <div class="theme-container">
        <component class="main-cntent" :is="layout" />
    </div>
</template>

<script>

import Home from './layouts/Home.vue'
import Post from './layouts/Post.vue'

export default {
    components:{
        Home,
        Post,
    },

    computed: {
        layout() {
            const { path } = this.$page
    
            if (path === '/'){
                return 'Home'
            }
            return 'Post'
        }
    }
}
</script>
```

Logic việc xử lý tương đối đơn giản, tất cả các file Markdown trước khi hiển thị đều đi qua **Layout.vue**. Ở trong **Layout.vue**, ta kiểm tra đường dẫn trên trình duyệt và sẽ lựa chọn component hiển phù hợp với theo đường dẫn.
## Thêm các theme có sẵn vào VuePress

Hiện nay có rất nhiêu thư viện theme VuePess có sẵn như:

* https://github.com/yscoder/vuepress-theme-indigo
* https://github.com/yliaho/vuepress-theme-valle
* https://github.com/Yubisaki/vuepress-theme-yubisaki

Việc cài đặt rất dễ, bạn chỉ cần 
> npm install  <'package-name'>
> 
Bạn có thể để ý thấy tất cả các package bên trên đều có 1 format là **vuepress-theme-xxx**
Sau đó bạn vào trong **.vuepress/config.js** và thêm option :
```javascript
module.exports = {
  theme: 'xxx'
}
```

Vậy là xong rùi đó, rất dễ dàng phải không :relaxed:. VuePress sẽ tự tìm đến file node_modules/vuepress-theme-xxx/Layout.vue và sử dụng để  theme của ứng dụng bạn.

# Nguồn tham khảo
[https://vuetifyjs.com](https://vuetifyjs.com)

[https://medium.com/vue-mastery/how-to-create-a-custom-vuepress-theme-with-vuetify-651b7d7e5092](https://medium.com/vue-mastery/how-to-create-a-custom-vuepress-theme-with-vuetify-651b7d7e5092)

[https://vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements](https://vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements)

# Repo của mình:
[https://github.com/quanKM/vuepress-demo](https://github.com/quanKM/vuepress-demo)