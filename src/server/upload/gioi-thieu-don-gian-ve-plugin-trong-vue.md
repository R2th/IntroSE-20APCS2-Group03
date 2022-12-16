Hello mọi người, tiếp tục [chủ đề Vuejs](https://viblo.asia/s/co-ban-de-tro-thanh-mot-fresher-vuejs-chinh-hieu-nB5pX8XJ5PG) thì hôm này, mình xin chia sẻ tiếp về một tính năng nhỏ nữa trong ngôn ngữ Frontend hót hòt họt này. Đó chính là Plugin, cái tên không quá xa lạ trong bất kì ngôn ngữ nào và ý nghĩa cũng không khác nhau là bao :D. Chúng ta bắt đầu tìm hiểu tính năng này nhé!


### Khái niệm
- Theo như lời giới thiệu trên trang chủ thì việc sử dụng plugin sẽ giúp chúng ta thêm những tính năng ở tầng global (cấp toàn cục).
- Việc dùng plugin cũng trở nên thuận tiện khi chúng ta có thể sử dụng những tính năng bên ngoài mà không cần phải viết trực tiếp vào ứng dụng của mình. Nếu không cần sử dụng nữa, chúng ta có thể gỡ bỏ dễ dàng.
- Không ràng buộc chúng ta phải viết Plugin theo kiểu nào, tuỳ vào mục đích hay yêu cầu của dự án mà bạn có thể viết theo một vài kiểu như:
    - Thêm phương thức, thuộc tính toàn cục
    - Thêm directive/filter/transition...
    - Thêm component options global thông qua mixin...
    - Thêm một số phương thức đối tượng (instance method) bằng cách đính kèm vào Vue.prototype.
- Một plugin cho Vue nên cung cấp một phương thức install. Phương thức này sẽ được gọi với tham số đầu tiên là hàm dựng Vue, cùng với các tùy chọn khác:
```js
MyPlugin.install = function (Vue, options) {
  // 1. Thêm phương thức hoặc thuộc tính cấp toàn cục
  Vue.myGlobalMethod = function () {
  }

  // 2. Thêm một directive cấp toàn cục
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
    }
    ...
  })

  // 3. Thêm một số tùy chọn cho component
  Vue.mixin({
    created: function () {
    }
    ...
  })

  // 4. Thêm một phương thức đối tượng
  Vue.prototype.$myMethod = function (methodOptions) {
  }
}
```

### Sử dụng Plugin
- Ở đây mình xem demo chức năng  thông báo (notification) thông qua Plugin với thư viện [Notie](https://github.com/jaredreich/notie), các bước install mình xin phép được bỏ qua.
- Đầu tiên hãy tạo 1 file `plugins/notie-global.js` với đoạn code như sau:
```js
export default {
  install (Vue, options) {
    Vue.mixin({
      // code here
    })
  }
}
```

- Ở file main.js thì chỉ cần import để sử dụng, Vue.use tự động ngăn không cho sử dụng một plugin nhiều lần, vì vậy cho dù chúng ta có gọi Vue.use(NotieGlobal) bao nhiêu lần thì NotieGlobal cũng sẽ chỉ được cài đặt một lần duy nhất.
- Một số plugin tự động gọi Vue.use() nếu phát hiện thấy biến toàn cục Vue. Tuy nhiên trong một môi trường module, ví dụ như CommonJS, bạn cần phải gọi Vue.use() một cách tường minh:
```js
import Vue from 'vue'
import NotieGlobal from './plugins/notie-global'
Vue.use(NotieGlobal, { tham_so: neu_co })
```

- Tiếp theo, khai báo methods trong mixin.
```js
import { alert } from 'notie'

export default {
  install (Vue, options) {
    Vue.mixin({
      methods: {
        notie_success(message) {
          alert({
            type: 1,
            text: message
          })
        },
        
        notie_warning(message) {
          alert({
            type: 2,
            text: message
          })
        },
        
        notie_error(message) {
          alert({
            type: 3,
            text: message
          })
        },
        
        // add more here
      }
    })
  }
}
```

- Cuối cùng là phần action để hiển thị thông báo, phần này viết trong `template` nhé:
```html
<template>
  <div class="notifications">
    <button @click="notie_success('Success!')">Click Success</button>
    <button @click="notie_warning('Warning!')">Click Warning</button>
    <button @click="notie_error('Error!')">Click Error</button>
  </div>
</template>
```

- Chúng ta có 1 vài kết quả như sau, hoặc bạn có thêm xem demo [ở đây](https://codesandbox.io/s/notification-plugin-00x0h)

![](https://images.viblo.asia/131e7520-23e9-4312-a499-003db7ecbc89.png)
![](https://images.viblo.asia/913fddf5-2ced-4bd2-849d-b35f9be72f2a.png)
![](https://images.viblo.asia/2dce2034-9dc4-4156-b7d2-cfc05cc9f7a9.png)

### Kết luận
- Trên đây là ví dụ nhỏ về cách tạo và sử dụng 1 plugin, hi vọng qua bài chia sẻ nhỏ, sẽ giúp bạn hiểu hơn về tính năng thú vị này và áp dụng và các dự án sắp tới của mình.
- Cám ơn các bạn đã theo dõi, hẹn gặp lại!