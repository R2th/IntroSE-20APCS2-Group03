Trong thời đại càng ngày càng phát triển về công nghệ như hiện nay, việc các website sử dụng các hình ảnh là gần như 100%. Thậm chí có những website mà nó chứa phần lớn là ảnh, hơn nữa kích cỡ của chúng cũng không hề nhỏ. Thử so sánh một website khi vào sẽ tải một lần tất cả ảnh lên trong một trang khi bạn truy cập. Ồ, nếu càng nhiều ảnh thì sao, performance của website sẽ khá là thấp. Hơn nữa, việc tải ảnh lên tiêu tốn rất nhiều tài nguyên, băng thông để xử lý. Như vậy là người dùng sẽ không còn hứng thú quay lại nữa. Thay vì việc xử lý như trên, ta có thể tùy chọn việc tải images bằng cách sử dụng lazy loading images. Chúng ta sẽ cùng tìm hiểu kỹ hơn ở phần dưới nhé. Go go!
![](https://images.viblo.asia/c7cc5ca0-2f8e-423b-9f24-fc9451ffba14.png)
### 1. Lazy loading là gì?
Khái niệm về lazy loading chắc chắn với những developer, đặc biệt là những developer phía front-end chắc chắn đã nghe đến. Hiểu lazy (lường biếng) có nghĩa là việc khi nào cần đến thì ta mới sử dụng. Nó sẽ không ngay lập tức phục vụ cho chúng ta nếu như chúng ta không có một hành động gì đó để nó hiểu được là ta đang cần nó. =))) 

Thí dụ, với Vue.js , chúng ta có một thuộc tính với v-model đó là v-model.lazy. Ý nghĩa của thuộc tính này là khi bạn thay đổi xong văn bản và chuyển sang thành phần khác trong giao diện, khi đó sự kiện change văn bản của ô nhập liệu mới xảy ra và dữ liệu mới được cập nhật xuống model. Nó có khác một chút so với việc bạn không sử dụng lazy =))

Lại lấy một ví dụ nữa. Các bạn có thể nghe đến cái gọi là **Lazy Loading Routes** hay **Async Components** trong Vue.js rồi nhỉ. Bản chất ở của chúng đó là thay vì load toàn bộ nội dung thì trình duyệt sẽ chỉ load những file khi phía client gọi cần đến.
Mình có đọc và tham khảo thì có thấy một số bài khá nay và rõ ràng về phần này. Mình xin được phép chia sẻ:
- [Docs Lazy Loading Routes Vue.js](https://router.vuejs.org/guide/advanced/lazy-loading.html)
- [Lazy Loading Routes on Viblo](https://viblo.asia/p/vue-router-lazy-loading-routes-Qbq5QvpRKD8)

### 2. Lazy Loading Images - Vue.js
Đến phần này mình nghĩ các bạn cũng hiểu phần nào về Lazy loading rồi. Giờ mình sẽ vào phần chính mà mình nói ngày hôm nay, đó là mình sẽ giới thiệu về lazy loading images trong **Vue.js**. <br>

**Cài đặt**
```bash
npx create-nuxt-app image-lazy-loading

Generating Nuxt.js project in /home/vu/Desktop/image-lazy-loading
? Project name image-lazy-loading
? Project description My lovely Nuxt.js project
? Use a custom server framework none
? Choose features to install (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Use a custom UI framework none
? Use a custom test framework none
? Choose rendering mode Single Page App
? Author name Vu Nguyen
? Choose a package manager yarn

To get started:

	cd image-lazy-loading
	yarn run dev

  To build & start for production:

	cd image-lazy-loading
	yarn run build
	yarn start

```

Mình sẽ dùng **Nuxt.js**, một framework để tạo các ứng dụng **Universal** **Vue.js**. Mình cũng có link một số tài liệu về Nuxt.js tại:
- [Giới thiệu về Nuxt.js - Viblo](https://viblo.asia/p/tim-hieu-ve-nuxtjs-ORNZqgjb50n)
- [Docs Nuxt.js](nuxtjs.org)

Tất cả phần cài đặt mình đã show rất chi tiết rồi nhé. 

**Package Vue-lazyload for lazy-loading images**

Có rất nhiều package hỗ trợ cho việc xử lý lazy loading images như [vue-lazyload](https://github.com/hilongjw/vue-lazyload), [lozad](https://github.com/ApoorvSaxena/lozad.js), [lazyload](https://github.com/verlok/lazyload) . Tuy nhiên mình chọn package **vue-lazyload** để xử lý. <br>

**Cài đặt**
```
yarn add vue-lazyload
```

```javascript
* plugins/vue-lazyload *
import Vue from 'vue';
import Lazyload from 'vue-lazyload';

Vue.use(Lazyload, {
	preLoad: 1.3,
	error: '/404.png',
	loading: '/loading.png',
	attempt: 1,
	listenEvents: [ 'scroll' ]
})
```
``` js
* nuxt.config.js *
plugins: [
  '~/plugins/vue-lazyload',
],
```
Các options ở đây các bạn có thể tham khảo tại [Github vue-lazyload](https://github.com/hilongjw/vue-lazyload). Khá là dễ hiểu =)))) <br> Ngoài ra các bạn có thể tìm hiểu thêm về các options khác nữa để có thể custom theo cách mà bạn mong muốn. <br>
Đến đây mình đã cài đặt xong, giờ test thử thôi. Mình sẽ lấy tạm 10 ảnh và đặt vào thư mục static nhé. Những ảnh của mình hiển thị ra có kích thước xấp xỉ 900kb/1 ảnh.
```js
* pages/index.vue *

<template>
    <div class="lazy-loading">
        <div class="lazy-loading__item">
            <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </span>
            <img v-lazy="`/1-1.jpg`">
        </div>
        <div class="lazy-loading__item">
            <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </span>
            <img v-lazy="`/1-2.png`">
        </div>
        <div class="lazy-loading__item">
            <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </span>
            <img v-lazy="`/1-2-2.png`">
        </div>
        <div class="lazy-loading__item">
            <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </span>
            <img v-lazy="`/1-2-3.png`">
        </div>
        <div class="lazy-loading__item">
            <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </span>
            <img v-lazy="`/1-2-4.png`">
        </div>
        <div class="lazy-loading__item">
            <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </span>
            <img v-lazy="`/1-2-5.png`">
        </div>
        <div class="lazy-loading__item">
            <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </span>
            <img v-lazy="`/1-2-6.png`">
        </div>
        <div class="lazy-loading__item">
            <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </span>
            <img v-lazy="`/1-2-7.png`">
        </div>
        <div class="lazy-loading__item">
            <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </span>
            <img v-lazy="`/1-2-8.png`">
        </div>
        <div class="lazy-loading__item">
            <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </span>
            <img v-lazy="`/1-3-1.jpg`">
        </div>
    </div>
</template>

<script>

export default {
    components: {

    }
}
</script>

<style lang="scss">
    .lazy-loading {
        &__item {
            width: 750px;
            margin: auto;
        }
    }
</style>
```
Lưu ý là nếu bạn muốn lazy loading images thông qua thuộc tính background-image thì vue-lazyload cũng sẽ hỗ trợ cho bạn nhé.
```js
<div v-lazy:background-image="src"></div>
```
Dưới đây là kết quả của việc mình đã thử test việc trình duyệt sử dụng lazy loading images và không sử dụng xem kết quả như thế nào. Chúng ta sẽ disable cache từ trình duyệt. Hãy để ý phần network bạn sẽ thấy khi scroll đến đâu thì ảnh sẽ load đến đó - thay vì load một lần tất cả. Và đây là kết quả. <br>
Sử dụng lazy loading: 

![](https://images.viblo.asia/def4e974-8bff-4656-9397-4b019134e97d.png)

Không sử dụng lazy loading:
![](https://images.viblo.asia/d4eb0e96-68fd-45e4-adb1-c4384c2fdc4b.png)

Rõ ràng là việc sử dụng lazy loading có tác dụng rất lớn trong việc tiết kiệm resource,(transferred, requests, timing, ...), kéo TTFB trở xuống thấp hơn. Hơn nữa nó còn hỗ trợ rất tốt trong việc cải thiện UX cho người dùng. Ở đây ảnh của mình rất nhỏ, chỉ khoảng vài trăm kb, hơn nữa số lượng ảnh cũng chỉ là 10 cái. Vậy tự hỏi nếu tự hỏi website của bạn có nhiều ảnh thì mọi thứ sẽ như thế nào. 
<br>
Ngoài ra thì package này còn hỗ trợ việc lazy loading component như mình nói ở phần đầu nữa. Các bạn có thể sử dụng 2 trong 1 được nhé. Nếu có thời gian rảnh hãy nghiên cứu nó. Mình nghĩ nó là một package khá tuyệt vời.
### Kết
Bài viết của mình có thể khá là nhạt về phần văn vở, vì vậy nếu đọc thì mọi người cố gắng đọc hết nhé. 
Cảm ơn các bạn đã theo dõi bài viết của mình. Hẹn gặp lại các bạn trong bài viết tiếp theo. Mình xin cảm ơn.
<br>Link github: https://github.com/vunguyen10111995/image-lazy-loading

![](https://images.viblo.asia/a1e8ea17-12b6-4f23-90ea-e04a270989ad.jpg)