# Mở Đầu

Slideshow hay slider là một phần rất quan trọng trong website hiện nay, thực chất thì chúng là một bộ chứa những hình ảnh hoặc các item tương tự nhau có thể trượt qua lại , chúng thường được đặt ở đầu trang để mô tả những nội dung đáng chú ý của trang vào thời điểm đó. Vì thế hôm nay mình sẽ giới thiệu đến mọi người một package để có thể tạo được sildeshow một cách đơn giản nhất với nhiều tùy chọn khác nhau đó là [vue-awesome-swiper](https://www.npmjs.com/package/vue-awesome-swiper). Bắt đầu luôn nhé 
# Cài Đặt
Bạn có thể cài đặt thông qua  npm hoặc yarn như sau
```js
npm install swiper vue-awesome-swiper --save
 
# or
yarn add swiper vue-awesome-swiper
```
Tiếp theo là import thì có 2 lựa chọn là import global hoặc là import local. 

Với import global
```js
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
 
import 'swiper/css/swiper.css'
 
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
```
Với import local 
```js
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
 
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  }
}
```
Các bạn có thể lên [đây](https://github.surmon.me/vue-awesome-swiper/) để tham khảo về cách hiển thị, số lượng slide, hiệu ứng chuyển slide.  Đây là một ví dụ về sử dụng SwiperSlide trong component.

![Peek 2021-10-22 14-33.gif](https://images.viblo.asia/9816c24e-abf6-4f92-a742-4234f5267636.gif)
```js
<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 6</swiper-slide>
    <swiper-slide>Slide 7</swiper-slide>
    <swiper-slide>Slide 8</swiper-slide>
    <swiper-slide>Slide 9</swiper-slide>
    <swiper-slide>Slide 10</swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: 'swiper-example-multiple-slides-per-biew',
    title: 'Multiple slides per view',
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    }
  }
</script>
```
Các bạn có thể thấy phần data có một số thuộc tính chúng ta có thể tùy chỉnh đề phù hợp với nhu cầu của mình hơn ví dụ như: 

* slidesPerView: số lượng slides hiển thị trên màn hình mặc định sẽ là 1
*  slidesPerColumn: số côt slides hiển thị trên màn hình mặc định sẽ là 1
* spaceBetween: khoảng cách giữa các slides
* pagination: nút hiển thị số lượng trượt hết các slide được tính bằng (tổng số slides/ slidesPerGroup) mặc định "slidesPerGroup" bằng 1. Mặc đinh thì các nút sẽ hiển thị ngang, có thể điều chỉnh hiện thị dọc bằng cách thêm thuộc tính 
    ```
     direction: 'vertical',
    ```
    ngoài ra nó còn có kiểu hiển thị khác như hiện ở slide bao nhiêu trên tổng số slide bằng cách thêm thuộc tính 
    ```
         pagination: {
            type: 'fraction'
          },
    ```
    hay hiển thị bằng số 
    ```
         pagination: {
            renderBullet(index, className) {
              return `<span class="${className} swiper-pagination-bullet-custom">${index + 1}</span>`
            }
          }
  ```
     các bạn có thể tìm hiểu thêm.
 * navigation: button để next hay prev slides
 ```js
<template>
  <swiper class="swiper" :options="swiperOption">
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>
  data() {
      return {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    }
 ```
Nó còn cung cấp các hiệu ứng chuyển slide 3D mình thấy có khá nhiều hiệu ứng đẹp mắt mọi người chỉ việc lên đó xem và đã có code mẫu rất dễ sử dụng .
# Kết Luận
Như vậy là mình đã giới thiệu đến các bạn về một package để có thể tạo ra nhưng slideshow một cách dễ dàng rồi. bài viết của mình chỉ mạng tính chất tham khảo giới thiệu các bạn muốn tìm hiểu sâu hơn thì hãy lên trang chủ chủ của nó để đọc nhé có sẵn code và ví dụ minh họa luôn rất dễ để làm theo. Nếu thấy bài viết hữu ích thì hãy cho mình một up vote nhé. Một lầ nữa cảm ơn các bạn

Tham khảo 

[https://github.com/surmon-china/vue-awesome-swiper](https://github.com/surmon-china/vue-awesome-swiper)

[https://www.npmjs.com/package/vue-awesome-swiper](https://www.npmjs.com/package/vue-awesome-swiper)

Các bạn hãy vào [đây](https://github.surmon.me/vue-awesome-swiper/) để xem ví dụ nhé :D