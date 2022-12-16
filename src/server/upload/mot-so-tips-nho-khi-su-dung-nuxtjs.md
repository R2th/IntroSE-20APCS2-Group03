![](https://images.viblo.asia/3e2afbe9-bc49-4c8e-a4f4-16b1f5582091.jpg)
### I. Giới thiệu về nuxtjs
Chắc hẳn rằng khi tìm hiểu hay sử dụng vuejs, có lẽ đôi lúc chúng ta đã từng nghe thấy 1 framework mang tên Nuxt.js. Có khi nào bạn từng nghĩ mình sẽ tìm hiểu nó hay thậm chí là áp dụng Nuxt.js cho một project nào đó của mình.
Hiểu một cách đơn giản thì: Nuxt.js là một framework cấp cao được xây dựng dựa trên vue nó đơn giản hóa việc phát triển universal hoặc single page application (SPA) trong vue.


Nếu các bạn chưa tìm hiểu về vue.js mà đã vào đọc bài này. Có thể tham khảo tại đây:

- [Tìm hiểu về javascript](-https://viblo.asia/s/tim-hieu-ve-javascript-RNZqg7AG50n)
- [Cùng nhau học VueJS](https://viblo.asia/s/2018-cung-nhau-hoc-vuejs-b85ogvV252G)
### II. Nuxt.js giúp gì cho web
- Universal App: Được xây dựng để mô tả Javascript cả trên máy khách và máy chủ . Một  universal app là về việc có một SPA nhưng thay vì có một trang index.html trống, bạn tải trước ứng dụng trên máy chủ web và gửi html dưới dạng phản hồi cho yêu cầu của trình duyệt cho mọi route để tăng tốc độ tải và cải thiện SEO bằng cách giúp Google thu thập dữ liệu trang web dễ dàng hơn.
- Là một framework, Nuxt.js có nhiều đặc điểm giúp ta trong quá trình phát triển giữa client side và server side nhưu bất đồng bộ dữ liệu (Asynchronous Data), Middleware, layouts,...
- Nuxt cung cấp cho ta quyền truy cập vào các thuộc tính ```isServer``` và ```isClient``` để ta dễ dàng quyết định việc hiển thị các thành phần trên nào đó trên máy khách hay máy chủ. Ngoài ra các thành phần ```no-ssr```  là một thành phần đặc biệt để ngăn chặn các thành phần hiển thị trên máy chủ.
- Nuxt.js cung cấp phương thức ```asyncData``` giúp ta có thể tải và hiển thị dữ liệu ở phía máy chủ. Tuy nhiên sẽ có một chút lưu ý khi sử dụng phương thức này. Mình sẽ chia sẻ ở phía bên dưới.
### III. Một số tips và lưu ý khi sử dụng Nuxt.js
### 1. Customize route đơn giản
Khi các bạn sử dụng Nuxt.js, bạn không cần viết router vì nó đã tự sinh router trong quá trình bạn tạo các page rồi đúng không nào. Nhắc lại một chút. Khi init một Nuxt.js, trong cấu trúc folder của nó đã có sẵn một folder page. Đó chính là các views page cũng chính là router cho views luôn.
```
+ |- pages
+   |- index.vue
+ |- category
+   |- _category.vue
```
Như chúng ta thấy ở trên, trong folder pages mình có tạo 1 folder category trong đó có 1 file ```_category.vue```. Route của nó sẽ là http://localhost:3000/category/1 . Và route chính xác sẽ phụ thuộc vào params mà bạn truyển vào ```_category.vue``` đúng không =)).
Tuy nhiên, một ngày đẹp trời nào đó. Khách hàng của bạn yêu cầu một route khác mà không phải là http://localhost:3000/category/1 mà là http://localhost:3000/category/id/1 chẳng hạn, bạn đang loay hoay khi không biết làm thế nào ??? Nuxt.js có cung cấp cho ta một hàm có tên là ```extendRoutes()```. Nó giúp ta có thể customize route theo ý định. Bạn hãy tạo thêm 1 file index.js
```js
    module.exports = [
       {
         name: 'my-route',
         path: '/category/id/_category',
         component: 'src/pages/category/_category.vue'
       }
    ]
```
và trong nuxt.config.js bạn thêm function
```js
extendRoutes (nuxtRoutes, resolve) {
  nuxtRoutes.splice(0, nuxtRoutes.length, ...routes.map((route) => {
    return { ...route, component: resolve(__dirname, route.component) }
  }))
}
```
Và hãy test lại route bạn vừa customize và xem lại thành quả.

*Lời khuyên: Chúng ta nên sử dụng route tự động của Nuxt.js để tránh việc duplicate route cũng như viết quá nhiều file.*
### 2. Sử dụng Fetch và AsyncData đúng cách
![](https://images.viblo.asia/6f2e4403-655d-4d37-a30c-fb67c39c1370.png)
- Nuxtjs cung cấp cho chúng ta 2 phương thức ```Fetch``` và ```AsyncData```. Cả 2 phương thức này đều được nuxtjs load trước khi hiển thị trang web. Riêng ```AsyncData``` thì được thêm việc tạo các data như một store cho trang web. Các sử dụng thì được gọi trong thành phần pages. File được viết trong folder pages. Trong quá trình sử dụng 2 method này, mình có nhận ra một điều rằng chúng chỉ hoạt động được trong một page.vue, chứ không hoạt động trong components con của page. 
- Có thể giải thích đơn giản thế này: "```Fetch``` và ```AsyncData``` được chạy trước khi page được load, vì vậy khi đặt trong components thì load page components chưa được render nên không thể sử dụng 2 methods này trong components". Tuy nhiên bạn có thể sử dụng chúng ở ngoài page.vue và truyền props vào components đúng không nào. Hoặc bạn có thể dùng methods ```mounted()``` để thay thế chúng trong các components. Vấn đề sử dụng props mình sẽ chia sẻ ngay ở phần bên dưới.
### 3. Sử dụng props đúng cách
- Chúng ta hay sử dung props.sync, .sync sẽ làm cho code của bạn được rút ngắn hơn khi sử dụng nó trong việc cập nhật dữ liệu cho props.
Ví dụ, khi không sử dụng ```props.sync```:
```js
<template>
    <child-component :value="value" @update=update/>
    
    data: {
        return {
            value: 'props'
        }
    },
    
    methods: {
        update(value) {
            console.log(value)
            this.value = value
        }
    }
</template>
 
//child-component
<template>
    <div>
        <input :value="value" @input="handleChange" />
    </div>
    
    methods: {
        handleChange(event)
        {
            this.$emit('update', event.target.value)
        }
    }
</template>
```
Khi sử dụng ```props.sync```
```js
<template>
    <child-component :value.sync="value" />
    
    data: {
        return {
            value: 'props'
        }
    }
</template>
 
//child-component
<template>
    <div>
        <input :value="value" @input="$emit('update:value', $event.target.value)"/>
    </div>
</template>
```
Các bạn có thể thấy việc props.sync giúp việc render lại dữ liệu props cho component cha tại component con được dễ dàng và ít code hơn rất nhiều, tránh việc xảy ra bug trong quá trình code.
### 4. Loading Component
Chúng ta có thể thay đổi default loader của Nuxt bằng các cài đặt loading trong nuxt.config.js. Cụ thể là: Chúng ta sử dụng vuejs và lưu loading trong state.
```js
<template>
  <div class="loader" />
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    loader: null,
    watching: false
  }),
  computed: mapState({
    active: (state) => state.active
  }),
  watch: {
    active (isActive) {
      if (this.watching && !isActive) {
        // clear loader
        this.watching = false
      }
    }
  },
  methods: {
    start () {
      // start loader
      this.watching = true
    },
    finish () {
      if (this.active) {
        this.watching = true
      } else {
        // clear loader
      }
    }
  }
}
</script>
```
### Kết luận
Nuxt.js là một framework là sự lựa chọn tuyệt vời khi sử dụng cho project có ý tưởng Server Side Rendering (SSR). Hy vọng các típs nhỏ và các lưu ý của mình sẽ giúp ích các bạn trong quá trình viết code. Hy vọng được nhiều sự góp ý của các bạn để cùng nhau phát triển và trau dồi kiến thức về Vue và Nuxt.js
![](https://images.viblo.asia/de712910-d0ef-4e55-aaf8-d7cffca1e892.jpg)