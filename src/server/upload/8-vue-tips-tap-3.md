Các bạn nếu chưa xem các Tip Vue từ bài trước mời đọc tại đây nha

* [10 Vue Tips](https://viblo.asia/p/10-vue-tips-ORNZqXQLK0n)
* [8 Vue Tips (Tập 2)](https://viblo.asia/p/8-vue-tips-tap-2-3P0lP6epKox)
## 1. Watching Arrays and Objects
Phần khó nhất của việc sử dụng `watch` là đôi khi nó dường như không kích hoạt đúng cách.

Thông thường, điều này là do bạn đang cố gắng xem một Array hoặc một Object, nhưng không đặt `deep` thành `true`:
```js
export default {
  name: 'ColourChange',
  props: {
    colours: {
      type: Array,
      required: true,
    },
  },
  watch: {
    // Use the object syntax instead of just a method
    colours: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler()
        console.log('The list of colours has changed!');
      }
    }
  }
}
```
Sử dụng react API từ Vue 3 sẽ trông giống như sau:
```js
watch(
  colours,
  () => {
    console.log('The list of colours has changed!');
  },
  {
    deep: true,
  }
);
```

## 2. Liên kết sâu với Bộ định tuyến Vue
Bạn có thể lưu trữ state trong URL, cho phép bạn chuyển ngay đến một trạng thái cụ thể trên trang.

Ví dụ: bạn có thể tải một trang có bộ lọc phạm vi ngày đã được chọn:
```php
someurl.com/edit?date-range=last-week
```
Điều này rất tốt cho các phần của app, nơi người dùng có thể chia sẻ nhiều liên kết, cho một ứng dụng được máy chủ hiển thị hoặc render nhiều thông tin hơn giữa hai app riêng biệt so với một liên kết thông thường thường cung cấp.

Bạn có thể lưu trữ các bộ lọc, giá trị tìm kiếm, cho dù một modal đang mở hay đóng, hoặc vị trí trong danh sách mà chúng ta đã cuộn đến ---> hoàn hảo cho việc phân trang vô hạn.

Lấy truy vấn bằng cách sử dụng `vue-router` các công việc như thế này (cái này cũng sẽ hoạt động trên hầu hết các frameworks Vue như Nuxt và Vuepress):
```js
const dateRange = this.$route.query.dateRange;
```
Để thay đổi nó, chúng tôi sử dụng component `RouterLink` và cập nhật `query`:
```html
<RouterLink :to="{
  query: {
    dateRange: newDateRange
  }
}">
```

Đây là link demo nhé, các bạn có thể tham khảo.

https://codesandbox.io/s/deep-linking-with-vue-router-vhxkq?file=/src/components/DeepLinking.vue

## 3. Một cách sử dụng khác cho thẻ mẫu
Các thẻ `template` có thể được sử dụng bất cứ vị trí nào bên trong template của bạn để organize các mã tốt hơn.

Chúng ta có thể sử dụng nó để đơn giản hóa logic `v-if` và đôi khi `v-for` cũng vậy.

Trong ví dụ này, chúng ta có một số phần tử sử dụng cùng một điều kiện `v-if`
```html
<template>
  <div class="card">
    <img src="imgPath" />
    <h3>
      {{ title }}
    </h3>
    <h4 v-if="expanded">
      {{ subheading }}
    </h4>
    <div
      v-if="expanded"
      class="card-content"
    >
      <slot />
    </div>
    <SocialShare v-if="expanded" />
  </div>
</template>
```
Có một chút phức tạp ở đây, lúc đầu không rõ ràng là các element này đang được hiển thị và ẩn cùng nhau. Trên một component lớn hơn, phức tạp hơn, đây có thể là một tình huống thậm chí còn tồi tệ hơn!

Nhưng chúng ta có thể sửa chữa điều đó.

Chúng ta có thể sử dụng thẻ `template` để nhóm các yếu tố này và nâng cấp `v-if` cho template chính:
```html
<template>
  <div class="card">
    <img src="imgPath" />
    <h3>
      {{ title }}
    </h3>
    <template v-if="expanded">
      <h4>
        {{ subheading }}
      </h4>
      <div class="card-content">
        <slot />
      </div>
      <SocialShare />
    </template>
  </div>
</template>
```
Bây giờ chúng ta có một cái gì đó dễ đọc hơn nhiều rồi. Và sẽ dễ dàng hơn nhiều để hiểu những gì đang diễn ra trong nháy mắt. ^^

## 4. Một cách tốt hơn để xử lý lỗi (và cảnh báo)
Bạn có thể cung cấp một trình xử lý tùy chỉnh cho các lỗi và cảnh báo trong Vue:
```js
// Vue 3
const app = createApp(App);
app.config.errorHandler = (err) => {
  alert(err);
};

// Vue 2
Vue.config.errorHandler = (err) => {
  alert(err);
};
```
Các dịch vụ theo dõi lỗi như Bugsnag và Rollbar kết nối với các trình xử lý này để ghi lại lỗi, nhưng bạn cũng có thể sử dụng chúng để xử lý lỗi một cách dễ dàng hơn nhằm mang lại trải nghiệm người dùng tốt hơn.

Ví dụ: thay vì ứng dụng chỉ bị treo nếu lỗi không được xử lý, bạn có thể hiển thị màn hình lỗi toàn trang và yêu cầu người dùng refresh hoặc thử một cái gì đó khác.

Trong Vue 3, trình xử lý lỗi chỉ hoạt động trên các lỗi template và watch, nhưng trình xử lý lỗi Vue 2 sẽ bắt hầu hết mọi thứ. Trình xử lý cảnh báo trong cả hai phiên bản chỉ hoạt động trong quá trình phát triển.

Dưới đâyt là một bản demo cho thấy nó hoạt động như thế nào. Nó sử dụng Vue 3, nhưng Vue 2 hoạt động gần giống nhau:

[Error Handler Demo](https://codesandbox.io/s/custom-warningerror-handlers-bgwc0?file=/src/main.js:259-312)


Bài viết được mình tìm đọc tại đây nhé.

https://dev.to/michaelthiessen/25-vue-tips-you-need-to-know-2h70