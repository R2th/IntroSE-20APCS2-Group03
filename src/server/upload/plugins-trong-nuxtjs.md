Xin chào các bạn. Hôm nay mình sẽ tiếp tục series về Nuxt.js. Cụ thể mình sẽ giới thiệu với các bạn về 
Plugins trong Nuxt.js


- [Packages từ bên ngoài](#)
 - [Vue Plugins](#The-Context)
 - [Inject trong $root & context](#)
    - [Inject vào trong  các phiên bản Vue ](#Vue)
    - [Inject vào trong  context](#context)
    - [Kết hợp Inject](#Inject) 
- [Dành cho phía Clienti](#Clienti)
   - [Tên Plugin thông thường](#Plugin) 



## Packages từ bên ngoài

Chúng ta có thể sử dụng được các packages/modules từ bên ngoài vào trong ứng dụng của mình để thực hiện yêu cầu HTTP cho cả phía server và client.

Đầu tiên, cần phải cài đặt nó thông qua npm(ở đây mình đang xử dụng packages axios):

```php
npm install --save axios
```

Sau đó chúng ta có thể sử dụng trực tiếp packages vào trong page của mình.

```php
<template>
  <h1>{{ title }}</h1>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
</script>
```

## Vue Plugins


Nếu như bạn muốn sử dụng Vue plugins, ví dụ như là sử dụng  [vue-notifications](https://github.com/se-panfilov/vue-notifications) để hiện thị ra thông báo trong ứng dụng của mình. Bạn cần thiết lập plugin trước khi chạy ứng dụng.

Chúng ta tạo ra 1 file có tên `plugins/vue-notifications.js`: 

```php
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

Sau đó thêm đường dẫn `plugins` vào bên trong `nuxt.config.js`:

```php
export default {
  plugins: ['~/plugins/vue-notifications']
}
```

## Inject trong $root & context


Đôi khi bạn muốn cung cấp các chức năng hoặc giá trị vào trong ứng dụng.Bạn có thể đưa các biến đó vào các phiên bản Vue(phía client), context(phía server) và thậm chí trong cửa hàng của Vuex.Đó là quy ước các chức năng với một `$`.

### Inject vào trong  các phiên bản Vue

Việc Inject vào các phiên bản Vue hoạt động tương tự như khi thực hiện điều này trong các ứng dụng Vue standard.

`plugins/vue-inject.js`:

```php
import Vue from 'vue'

Vue.prototype.$myInjectedFunction = (string) => console.log("This is an example", string)
```

`nuxt.config.js`:


```php
export default {
  plugins: ['~/plugins/vue-inject.js']
}
```

Bây giờ chúng ta  có thể sử dụng chức năng trong tất cả các thành phần Vue của mình.

`example-component.vue`:

```php
export default {
  mounted(){
    this.$myInjectedFunction('test')
  }
}
```


### Inject vào trong  context

Việc Inject  context  hoạt động tương tự như khi thực hiện điều này trong các ứng dụng Vue standard.

`plugins/ctx-inject.js`:

```php
export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  app.myInjectedFunction = (string) => console.log('Okay, another function', string)
}
```

`nuxt.config.js`:


```php
export default {
  plugins: ['~/plugins/ctx-inject.js']
}
```

Chức năng này hiện có sẵn bất cứ khi nào bạn có quyền truy cập vào `context` (ví dụ như trong `asyncData` and `fetch`).

`ctx-example-component.vue`:

```php
export default {
  asyncData(context){
    context.app.myInjectedFunction('ctx!')
  }
}
```

### Kết hợp Inject

Nếu bạn cần chức năng trong `context`, `Vue` và thậm chí là cả trong store Vuex, bạn có thể sử dụng function `inject`, đây là tham số thứ hai của hàm `plugins`.
`$` sẽ được tự động thêm vào function.

`plugins/combined-inject.js`:

```php
export default ({ app }, inject) => {
  inject('myInjectedFunction', (string) => console.log('That was easy!', string))
}
```


`nuxt.config.js`:


```php
export default {
  plugins: ['~/plugins/combined-inject.js']
}
```

Bây giờ function có thể được sử dụng từ `context`, thông qua `this` trong Vue và thông qua `this` trong store `actions`/`mutations`.

`ctx-example-component.vue`:

```php
export default {
  mounted(){
    this.$myInjectedFunction('works in mounted')
  },
  asyncData(context){
    context.app.$myInjectedFunction('works with context')
  }
}
```

`store/index.js`:

```php
export const state = () => ({
  someValue: ''
})

export const mutations = {
  changeSomeValue(state, newValue) {
    this.$myInjectedFunction('accessible in mutations')
    state.someValue = newValue
  }
}

export const actions = {
  setSomeValueToWhatever ({ commit }) {
    this.$myInjectedFunction('accessible in actions')
    const newValue = "whatever"
    commit('changeSomeValue', newValue)
  }
}
```



## Dành cho phía Client

Một số Plugin có thể chỉ hoạt động trong trình duyệt vì chúng thiếu hỗ trợ `SSR`. Trong những trường hợp này, Bạn có thể sử dụng `mode`: `client` tùy chọn trong `plugins`  để chỉ thêm plugin này ở phía Client.

Ví dụ:

`nuxt.config.js`:

```php
export default {
  plugins: [
    { src: '~/plugins/vue-notifications', mode: 'client' }
  ]
}
```

`plugins/vue-notifications.js`:

```php
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

Trong trường hợp bạn cần thêm một số thứ viện trong một plugin chỉ ở phía server, bạn có thể kiểm tra xem biến `process.server` có đâng được để là `true`.

Ngoài ra nếu bạn cần biết mình đang ở trong một ứng dụng được tạo (thông qua `nuxt generate`), bạn có thể kiểm tra nếu như `process.static` được để là `true`. 
Ví dụ:

`nuxt.config.js`: 

```php
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' },
    { src: '~/plugins/server-only.js', mode: 'server' }
  ]
}
```


### Tên Plugin thông thường

Nếu plugin chỉ chạy ở phía client hoặc server, `.client.js` hoặc `.server.js`  có thể được áp dụng như phần mở rộng của tệp plugin, tệp sẽ được tự động đưa vào bên tương ứng.

Ví dụ: 
`nuxt.config.js`: 

```php
export default {
  plugins: [
    '~/plugins/foo.client.js', // only in client side
    '~/plugins/bar.server.js', // only in server side
    '~/plugins/baz.js' // both client & server
  ]
}
```

Dưới đây mình  đã giới thiệu với các bạn về  Plugin và một số khái niệm cơ bản của Plugion trong Nuxt.js. Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

### Tham Khảo

https://nuxtjs.org/guide/plugins