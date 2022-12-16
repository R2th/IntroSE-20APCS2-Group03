Hello các bạn, ở bài viết lần trước, mình đã giới thiệu cho các bạn vè cách tạo một [Custom directive trong Vuejs](https://viblo.asia/p/custom-directive-trong-vuejs-WAyK8DrkKxX). Thì lần này, mình xin được gửi tới các bạn một nội dung khác, không mới, không khó và không thể không dùng trong các dự án. Đó chính là `Filter`, chúng ta cùng tìm hiểu xem nó là gì thôi nào!

### Filter là gì?
- Chắc hẳn với cái tên thôi thì chúng ta dễ dàng đoán được Filter là gì rồi. Vâng, dịch đơn giản thì `filter` chính là bộ lọc, dùng để định dạng (format) các văn bản thường gặp, các nội dung mà chúng ta cần phải xử lý trước khi render ra view.

- Khái niệm thật đơn giản như tên gọi của nó vậy, trên trang chủ chính thức của Vue cũng có ví dụ đơn giản về filter, các bạn có thể [click vào để xem](https://vuejs.org/v2/guide/filters.html). Còn trong phạm vi bài viết lần này, mình xin chia sẻ 1 ví dụ khác về filter, chúng ta bắt đầu thôi :D

### Define filter
- Vue cho phép bạn định nghĩa filter ở 2 dạng là **local (cục bộ) trong components** và **globally (toàn cục)**, tùy vào mục đích sử dụng của mình.
- Lại một lần nữa chúng ta tận dụng source code của các bài viết trước mà mình đã chia sẻ nhé, lần này mình đã tạo series cho các bài viết để tránh bị thất lạc rồi, link series ở cuối bài nhé :D
- Đầu tiên, hãy tạo 1 file filter **index.js** có cấu trúc thư mục như hình dưới:

![](https://images.viblo.asia/7cda0d6a-14a9-45a4-8303-48ea33e5bb75.PNG)

- OK đã xong, chúng ta bắt đầu vào những dòng code đầu tiên thôi nào.
```js
import Vue from 'vue'

const formatSize = Vue.filter('formatSize', function (size) {
  if (size > 1024 * 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
  } else if (size > 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
  } else if (size > 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + ' MB'
  } else if (size > 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  }
  return size.toString() + ' B'
})

export default { formatSize }
```

- Để định nghĩa 1 filter, Vue sử dụng cú pháp **Vue.filter**, trong đó gồm các thành phần tham số như **tên filter** ('formatSize), một hàm với giá trị nhận vào và trả về giá trị format mong muốn.

- Phần xử lý bên trong thì mình mượn tạm trên [nguồn Internet](https://github.com/lian-yue/vue-upload-component/blob/master/docs/index.js#L112) nhé các bạn, đã số các thư viện, UI framework đều có phần xử lý này rồi. Rất nhanh và chúng ta đã tạo thành công 1 filter đơn giản để format kích thước file của mình.

### Sử dụng
- Cũng như [cusom directive](https://viblo.asia/p/custom-directive-trong-vuejs-WAyK8DrkKxX) trong Vue, thì định nghĩa filter đơn giản bao nhiêu thì sử dụng cũng đơn giản bấy nhiêu.
- Ở phần view, mình đã tạo 1 file có tên là filter.vue với vài dòng code đơn giản:

![](https://images.viblo.asia/925effbb-6938-4d1b-9a87-e294da357b36.PNG)


- Dễ thấy hàm filter được sử dụng trong  **mustache interpolations** cách giá trị cần format bởi dấu "|". Tuy nhiên chúng ta cũng có thể sử dụng ở biểu thức **v-bind** (the latter supported in 2.1.0+). 
- Trong phạm vi bài viết này thì mình chỉ giới thiệu về Filter toàn cục (globally) và sử dụng trong **mustache interpolations**, còn trường hợp filter **cục bộ và v-bind** mọi người có thể tự tìm hiểu thêm nhé.

### Kết quả
- Run serve và cùng xem kết quả nào!

![](https://images.viblo.asia/b4a8d331-3581-44b1-adc0-8ff46daa406a.PNG)

- Và đừng quên import filter ở file main.js của chúng ta để code chạy đúng và không báo lỗi nhé.
```js
import Vue from 'vue'
import App from './App'
import vuetify from './plugins/vuetify';
import router from './router/index'
import store from './store/index.js'
import filters from './filters'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  filters,
  vuetify,
  render: h => h(App)
})
```

### Tổng Kết
- Như vậy với chỉ mấy dòng code mà chúng ta có được một filter hay ho cho dự án, khi cần xử lý format, định dạng file upload mà BE lỡ "bàn giao" công việc đó cho frontend chúng ta :D
- Bài viết của mình cũng xin được tạm dừng ở đây, cám ơn mọi người đã ghé qua và xem nó, chúc các bạn học tốt
- [Link series để trở thành 1 fresher vuejs chính hiệu](https://viblo.asia/s/co-ban-de-tro-thanh-mot-fresher-vuejs-chinh-hieu-nB5pX8XJ5PG)