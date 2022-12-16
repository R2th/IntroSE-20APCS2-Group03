# Giới thiệu
Chào các bạn, mình lại trở lại với VueJs đây :D

Đối với các ứng dụng Web thì các hình ảnh là không thể thiếu. Và việc xử lý hiển thị ảnh sao cho tốc độ load của các trang web tối ưu nhất cũng là một việc vô cùng quan trọng, nhất là đối với các trang web có nhiều hình ảnh.  Vì vậy, sử dụng  lazy loading hình ảnh là một trong những cách giúp cải thiện tốc độ ứng dụng của bạn.

Trong `VueJs` cũng có một package đơn giản, dễ sử dụng, hỗ trợ việc lazy loading hình ảnh đó là `Vue-lazyload`, nó hỗ trợ cho cả Vue 1.0 và 2.0. Vậy trong bài viết này chúng ta cùng tìm hiểu về nó nhé.
# Cài đặt
### Npm
Bạn cần copy và paste lệnh sau vào terminal để cài đặt `Vue-lazyload`:
```
npm i vue-lazyload -S
```
### Cdn
Hoặc bạn có thể dùng link Cdn dưới đây:
```
<script src="https://unpkg.com/vue-lazyload/vue-lazyload.js"></script>
<script>
  Vue.use(VueLazyload)
  ...
</script>
```
# Sử dụng
Sau khi cài đặt `Vue-lazyload`, bạn chỉ cần import nó vào ứng dụng của bạn để sử dụng:
```
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

// Khởi tạo với default option
Vue.use(VueLazyload)

// hoặc khởi tạo với custom option
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'assets/images/error.png',
  loading: 'assets/images/loading.gif',
  attempt: 1
})
```
Sử dụng `Vue-lazyload` trên view:
* Với template:
    ```
    <ul>
      <li v-for="img in list">
        <img v-lazy="img.src" >
      </li>
    </ul>
    ```
* Với Html thuần: (bạn còn có thể sử dụng các option ở đây)
    ```
    <div v-lazy-container="{ selector: 'img', error: 'xxx.jpg', loading: 'xxx.jpg' }">
      <img data-src="//domain.com/img1.jpg">
      <img data-src="//domain.com/img2.jpg">
      <img data-src="//domain.com/img3.jpg">  
    </div>
    ```
# Constructor Options
`Vue-lazyload` cung cấp cho chúng ta các option khi khởi tạo như sau:
* `preLoad`: Number - tỉ lệ của preloading height (giá trị mặc định là 1.3).
* `error`: String - giá trị thuộc tính src của hình ảnh sẽ hiển thị thay thế khi loading thất bại.
* `loading`: String - giá trị thuộc tính src của hình ảnh sẽ hiển thị khi đang loading.
* `attempt`: Number - số lần load lại nếu thất bại (giá trị mặc định là 3).
* `listenEvents`: Desired Listen Events - Các sự kiện được lắng nghe để thực hiện lazy loading (giá trị mặc định là `['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']`).
* `adapter`: Element Adapter - tùy chọn này cho phép chúng ta thực thi các function  hay tác động đến các phần tử khi các phần tử đó thuộc các trạng thái: `loaded`, `loading` và `error`.
* `filter`: Image listener filter - lắng nge các sự kiện của bộ lọc hình ảnh.
* `lazyComponent`: tùy chọn có sử dụng lazyload component hay không (giá trị mặc định là `false`).
* `dispatchEvent`: Boolean - tùy chọn kích hoạt Dom event (giá trị mặc đinh là `false`).
* `throttleWait`: Number - giá trị throttle wait (giá trị mặc định là 200).
* `observer`: Boolean -  tùy chọn có sử dụng IntersectionObserver hay không (giá trị mặc định là `false`).
* `observerOptions`: IntersectionObserver - Các tùy chọn của IntersectionObserver (giá trị mặc định là `{ rootMargin: '0px', threshold: 0.1 }`).
* `silent`: tùy chọn thiết lập có in thông tin debug hay không (giá trị mặc đinh là `true`).
### Desired Listen Events
Bạn có thể chỉ định các sự kiện mà bạn muốn `Vue-lazyload` lắng nghe để thực hiện việc lazy loading thông qua tùy chọn `listenEvents` như sau:
```
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: [ 'scroll' ]
})
```
### Image listener filter
Bạn có thể thay đổi tự động thuộc tính `src` của hình ảnh với `Image listener filter`:
```
Vue.use(vueLazy, {
    filter: {
      progressive (listener, options) {
          const isCDN = /qiniudn.com/
          if (isCDN.test(listener.src)) {
              listener.el.setAttribute('lazy-progressive', 'true')
              listener.loading = listener.src + '?imageView2/1/w/10/h/10'
          }
      },
      webp (listener, options) {
          if (!options.supportWebp) return
          const isCDN = /qiniudn.com/
          if (isCDN.test(listener.src)) {
              listener.src += '?imageView2/2/format/webp'
          }
      }
    }
})
```
### Element Adapter
`Vue-lazyload` cho phép bạn thực thi các function hay tác động đến các phần tử khi các phần tử đó thuộc các trạng thái: `loaded`, `loading` và `error`:
```
Vue.use(vueLazy, {
    adapter: {
        loaded ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init }) {
            // do something here
            // example for call LoadedHandler
            LoadedHandler(el)
        },
        loading (listender, Init) {
            console.log('loading')
        },
        error (listender, Init) {
            console.log('error')
        }
    }
})
```
### IntersectionObserver
Bạn có thể sử dụng Intersection Observer (đọc thêm [ở đây](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)) để cải thiện performance với số lượng lớn các nodes.
```
Vue.use(vueLazy, {
  // set observer to true
  observer: true,

  // optional
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  }
})
```
### Lazy Component
Ngoài ra bạn còn có thể sử dụng Lazy Component bằng cách thiết lập giá trị cho tùy chọn `lazyComponent` thành `true` (mặc định là `false`):
```
Vue.use(VueLazyload, {
  lazyComponent: true
});
```
```
<lazy-component @show="handler">
  <img class="mini-cover" :src="img.src" width="100%" height="400">
</lazy-component>

<script>
  {
    ...
    methods: {
      handler (component) {
        console.log('this component is showing')
      }
    }

  }
</script>
```
# Implementation
### Basic
Một vài sử dụng đơn giản của `Vue-lazyload`:
```
<template>
  <div ref="container">
     <img v-lazy="imgUrl"/>
     <div v-lazy:background-image="imgUrl"></div>

     <!-- with customer error and loading -->
     <img v-lazy="imgObj"/>
     <div v-lazy:background-image="imgObj"></div>

     <!-- Customer scrollable element -->
     <img v-lazy.container ="imgUrl"/>
     <div v-lazy:background-image.container="img"></div>

    <!-- srcset -->
    <img v-lazy="'img.400px.jpg'" data-srcset="img.400px.jpg 400w, img.800px.jpg 800w, img.1200px.jpg 1200w">
    <img v-lazy="imgUrl" :data-srcset="imgUrl" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgObj: {
        src: 'https://picsum.photos/300/300',
        error: 'https://image.freepik.com/free-vector/404-error-design-with-sign_23-2147735302.jpg',
        loading: 'https://loading.io/spinners/microsoft/lg.rotating-balls-spinner.gif'
      },
      imgUrl: 'https://picsum.photos/300/301' // String
    }
  }
}
</script>
```
### Css state
Bạn có thể tùy chỉnh css của 3 trạng thái khi lazy loading hình ảnh là: `loaded`, `loading` và `error`:
```
<img src="imgUrl" lazy="loading">
<img src="imgUrl" lazy="loaded">
<img src="imgUrl" lazy="error">
```
```
<style>
  img[lazy=loading] {
    /*your style here*/
  }
  img[lazy=error] {
    /*your style here*/
  }
  img[lazy=loaded] {
    /*your style here*/
  }
  /*
  or background-image
  */
  .yourclass[lazy=loading] {
    /*your style here*/
  }
  .yourclass[lazy=error] {
    /*your style here*/
  }
  .yourclass[lazy=loaded] {
    /*your style here*/
  }
</style>
```
# Methods
### Event hook
`Vue-lazyload` cung cấp cho chúng ta các `Event hook` để lắng nghe và xử lý tùy ý các sự kiện `loaded`, `loading` và `error` khi lazy loading hình ảnh. Có 3 loại `Event hook` được cung cấp như sau:
* `vm.$Lazyload.$on(event, callback)`: Lắng nghe các sự kiện `loaded`, `loading` và `error`
    ```
    vm.$Lazyload.$on('loaded', function ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error }, formCache) {
      console.log(el, src)
      // To do something!
    })
    ```
* `vm.$Lazyload.$once(event, callback)`: Lắng nghe các sự kiện `loaded`, `loading` và `error`, tuy nhiên nó chỉ lắng nghe duy nhất lần kích hoạt đầu tiên của sự kiện.
    ```
    vm.$Lazyload.$once('loaded', function ({ el, src }) {
      console.log(el, src)
      // To do something!
    })
    ```
* `vm.$Lazyload.$off(event, callback)`: Xóa tất các listener event đã được thiết lập. Nếu chỉ truyền tham số event thì sẽ xóa tất cả các listeners event đã được thiết lập trước đó
    ```
    function handler ({ el, src }, formCache) {
      console.log(el, src)
    }
    vm.$Lazyload.$on('loaded', handler)
    vm.$Lazyload.$off('loaded', handler)
    vm.$Lazyload.$off('loaded')
    ```
### LazyLoadHandler
`Vue-lazyload` cung cấp cho chúng ta phương thức `vm.$Lazyload.lazyLoadHandler` để tính toán bằng tay vị trí lazyloading (Cái này mình chưa dùng nên mình cũng ko rõ lắm :D)
```
this.$Lazyload.lazyLoadHandler()
```
### Performance
`Vue-lazyload` còn cung cấp cho chúng ta phương thức `performance()` để có thể biết được performance khi lazy loading hình ảnh:
```
this.$Lazyload.$on('loaded', (listener) => {
    console.table(this.$Lazyload.performance())
})
```
![](https://images.viblo.asia/e4718d39-b400-4487-9d57-c2f082b647d3.png)
# Demo
Mình có làm một demo nhỏ sử dụng `Vuejs` + `Vue-lazyload`, và đây là kết quả thu được :D
![](https://images.viblo.asia/df949624-6dfb-4a6a-8544-92704d91ca13.gif)
# Kết luận
Qua bài viết này mình đã giới thiệu cho các bạn về `Vue-lazyload` một package nhẹ, đơn giản, dễ sử dụng khi lazy loading hình ảnh trong các ứng dụng `VueJs`. Hi vọng bài viết này sẽ có ích cho các bạn :D
# Tham khảo
https://github.com/hilongjw/vue-lazyload