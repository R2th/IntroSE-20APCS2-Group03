Lần trước mình đã có [1 bài tương tự thế này](https://viblo.asia/p/cai-dat-google-amp-vao-du-an-nuxtjs-GrLZDe6elk0) nhưng chúng ta sẽ phải tự code, hôm nay cũng với mục đích như thế nhưng chúng ta sử dụng module được build cho nuxt, để xem có đơn giản hơn không. 
À nếu bạn chưa biết Nuxtjs hoặc AMP là gì thì có thể search trên Viblo nha, tài liệu nhiều vô kể :heart_eyes:

## Demo
https://codesandbox.io/s/github/nuxt-community/amp-module/

## Cài đặt
Sử dụng yarn:
```
yarn add @nuxtjs/amp
```
hoặc npm:
```
npm install @nuxtjs/amp
```

Sau đó sửa file `nuxt.config.js`:
```js
modules: [
  '@nuxtjs/amp'
],

amp: {
  // Options
}
```

## Sử dụng
## Tạo Layout
Trước khi tạo pages thì bạn cần tạo layout cho các trang AMP (tạm đặt tên là `default.amp.vue` nhé):
```html
<template>
  <div>
    <Nuxt />
  </div>
</template>
```
## Tạo Page
Cũng giống như page bình thường, chúng ta sẽ tạo page AMP trong folder `pages`. Nếu bạn muốn tạo 1 page vừa support AMP vừa non-AMP (kiểu bình thường), bạn có thể sử dụng biến `$isAMP` để ẩn/hiện components.

`amp-module` inject `$isAMP` vào Vue context để xác định kiểu render của page hiện tại.
```js
<template>
    <div v-if="$isAMP">
        <amp-img src="nuxt.js.svg" >
    </div>
    <div v-else>
        <img src="nuxt.js.svg" >
    </div>
</template>

<script>
export default {
    amp: 'hybrid',
    ampLayout: 'default.amp',
}
</script>
```
Bạn có thể sử dụng `this.$isAMP` bên trong cặp thẻ `<script>` của page để kiểm tra xem có phải đang page hiện tại đang là AMP ko
```js
<template>
    ...
</template>

<script>
export default {
    amp: 'hybrid',
    ampLayout: 'default.amp',
    ...
    mounted() {
        // fetch list of entities on normal page
        // we use `amp-list` to fetch and show these entities
        if (!this.$isAMP) {
            this.fetchList();
        }
    },
    methods: {
        //  fetch list of entities to show
        fetchList() {
            ...
        }
    }
}
</script>
```

## Styling
`amp-module` sẽ thêm class `__amp`  vào tag body của page, bạn có thể sử dụng class này để điều chỉnh style cho trang AMP:
```css
.__amp .my-awesome-element {

}
```

Tuy nhiên, chúng ta nên tạo file style riêng cho AMP pages và import trong AMP layout để dễ dàng quản lý hơn:
```html
// default.vue
...
<style>
@import "~/assets/styles/default.css"
</style>
```
AMP layout:
```html
// default.amp.vue
...
<style>
@import "~/assets/styles/default.amp.css"
</style>
```
<br>
Ngoài ra mời các bạn xem thêm:

* [ amp-module Github](https://github.com/nuxt-community/amp-module)
* [amp-module Options](https://github.com/nuxt-community/amp-module/blob/master/docs/api/options.md)
* [amp-module Components](https://github.com/nuxt-community/amp-module/blob/master/docs/api/components.md)
* [AMP elements](https://github.com/nuxt-community/amp-module/blob/master/docs/api/amp-elements.md)