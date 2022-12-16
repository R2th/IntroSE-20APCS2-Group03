Xin chào các bạn. Hôm nay mình sẽ tiếp tục series về Nuxt.JS. Hôm nay mình sẽ hướng dẫn các bạn cách để tính hợp `Storefrontui` vào trong Nuxt.Js

---
Mình sẽ giới thiệu qua về `Storefrontui` cho các bạn nhé :

![](https://images.viblo.asia/3021a22b-2334-4f8a-99ba-50a378c88ace.png)

[Storefront](https://docs.storefrontui.io/) UI là thư viện khá thân thiện với nhà phát triển,nó dễ sử dụng và có thể tùy chỉnh hiệu quả  giúp bạn thiết kế nhanh chóng và dễ dàng  sử dụng với với thiết bị di động.

Giờ thì chúng ta sẽ bắt đầu tích hợp `Storefrontui` vào trong NuxtJs nhé.


#### Cài đặt `Storefrontui`:
``` html
npm install --save @storefront-ui/vue
# or
yarn add @storefront-ui/vue --save
```


#### Import`Storefrontui css` với file cấu hình NuxtJs của bạn.

Đường dẫn : `<root>/nuxt.config.js`

``` html
export default {
  ...,
  css: [ “@storefront-ui/vue/styles.scss” ]
}
```


 #### Cấu hình `storefront-ui` vào trong file build của NuxtJs
 
Đường dẫn : `<root>/nuxt.config.js`

``` html
export default {
  ...,
  build: {
    transpile: [/^@storefront-ui/],
  }
}
```


#### Bây giờ thì bạn có thể sử dụng bất kì thành phân nào của `storefront-ui` vào trong NuxtJs của bạn.

Ở đây mình sẽ thêm `SfSteps` vào trong project của mình (tên thành phần sẽ là `Checkout.vue` nhé)

``` html
<template>
  <div>
    <SfSteps v-model="active" :steps="steps" :can-go-back="canGoBack">
      <SfStep v-for="(step, key) in steps" :key="key" :name="step">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            height: 18.75rem;
            background-color: #f2f2f2;
          "
        >
          {{ step }}
        </div>
      </SfStep>
    </SfSteps>
  </div>
</template>
<script>
import { SfSteps } from '@storefront-ui/vue'
export default {
  components: {
    SfSteps,
  },
  data() {
    return {
      active: 0
      steps: ['Personal details', 'Shipping', 'Billing address'],
      canGoBack: true,
    }
  }
}
</script>
```

#### Cuối cùng, đây là cấu hình file nuxt.config.js của bạn cho storefront-ui


``` html
export default {
  ...
  /*
   ** Global CSS
   */
  css: ["@storefront-ui/vue/styles.scss"],
  ...
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
      transpile: [/^@storefront-ui/],
  },
}
```

----


Như vậy là mình đã có 1 ví dụ nhanh về việc tích hợp `Storefrontui` vào trong NuxtJs.Cảm ơn các bạn đã đọc bài viết này. Hy vọng các bạn đã hiểu khái niệm để tích hợp storefront-ui với NuxtJs.

Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

---
### Tham Khảo chi tiết hơn
https://docs.storefrontui.io/