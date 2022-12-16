Vue.js có thể dễ dàng sử dụng để phát triển các ứng dụng giao diện người dùng tương tác.
Trong bài viết này, chúng ta sẽ xem xét cách các package tốt nhất để thêm calendars, overlays và xử lý local storage.
## 1. vue-fullcalendar
vue-fullcalendar cung cấp cho chúng ta một calendar component đơn giản để hiển thị các sự kiện.

Để sử dụng nó, trước tiên chúng ta cài đặt nó bằng cách chạy:

```php
npm i vue-fullcalendar
```

Sau đó, chúng ta sử dụng nó bằng cách viết như sau:

**main.js**

```php
import Vue from "vue";
import App from "./App.vue";
import fullCalendar from "vue-fullcalendar";
Vue.component("full-calendar", fullCalendar);
Vue.config.productionTip = false;
new Vue({
  render: h => h(App)
}).$mount("#app");
```

**App.vue**

```php
<template>
  <div id="app">
    <full-calendar :events="fcEvents" lang="en"></full-calendar>
  </div>
</template>
<script>
const fcEvents = [
  {
    title: "eat",
    start: "2020-05-25",
    end: "2020-05-27"
  }
];
export default {
  data() {
    return {
      fcEvents
    };
  }
};
</script>
```

Chúng tôi đăng ký component. Sau đó, sử dụng nó trong `App` component.

`full-calendar` nhận một`events` prop, là một mảng các objects.

Objects có thuộc tính `title`,` start` và `end`.

`title` là tiêu đề sự kiện.

`start` là chuỗi ngày bắt đầu. `end` là chuỗi ngày kết thúc.

Nó tạo ra các sự kiện khi tháng được thay đổi và một sự kiện clicked.
## 2. v-calendar
`v-calendar` là một calendar component khác.
Để cài đặt, chạy lệnh:
```php
npm i v-calendar
```

Bây giở sử dụng nó, ta viết code như sau:

**main.js**
```php
import Vue from "vue";
import App from "./App.vue";
import Calendar from "v-calendar/lib/components/calendar.umd";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
Vue.component("calendar", Calendar);
Vue.component("date-picker", DatePicker);
Vue.config.productionTip = false;
new Vue({
  render: h => h(App)
}).$mount("#app");
```

**App.vue**

để add một date picker
```php
<template>
  <div id="app">
    <date-picker :mode="mode" v-model="selectedDate"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mode: "single",
      selectedDate: null
    };
  }
};
</script>
```


để add calendar:

```php
<template>
  <div id="app">
    <calendar></calendar>
  </div>
</template>
<script>
export default {};
</script>
```



## 3. VueLocalStorage
VueLocalStorage  là một Vue plugin cho phép xử lý local storage trong ứng dụng Vue.

Để cài đặt, chạy lệnh:
```php
npm i vue-localstorage
```


Sau đó, để sử dụng nó, chúng ta viết code như sau:
**main.js**
```php
import Vue from "vue";
import App from "./App.vue";
import VueLocalStorage from "vue-localstorage";
Vue.use(VueLocalStorage);
Vue.config.productionTip = false;
new Vue({
  render: h => h(App)
}).$mount("#app");
```

**App.vue**

```php
<template>
  <div id="app">
  </div>
</template>
<script>
export default {
  mounted() {
    this.$localStorage.set('foo', 'bar')
  }
};
</script>
```

Chúng ta đăng ký plugin.

Sau đó, chúng ta có thể thao tác lưu trữ cục bộ với thuộc tính ` this.$localStorage`.

Chúng ta có thể gọi  `get` để lấy một giá trị:

```php
this.$localStorage.get('foo')
```

Để xóa một mục nhập, chúng ta gọi  `remove` :
```php
this.$localStorage.remove('foo')
```

## 4. vue-loading-overlay
vue-loading-overlay cung cấp cho chúng ta overlay để hiển thị khi một thứ gì đó được tải (load)

Để cài đặt, chạy lệnh:
```php
npm i vue-loading-overlay
```
Sau đó, để sử dụng ta viết code như sau:

```php
<template>
  <div>
    <loading active can-cancel :on-cancel="onCancel" is-full-page></loading>
  </div>
</template>
 
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: {
    Loading
  },
  methods: {
    onCancel() {}
  }
};
</script>
```

Chúng ta sử dụng `loading` component để thêm overlay để hiển thị khi dữ liệu được tải.

`active` là một prop được set là `true` nếu bạn muốn hiển thị overlay.

`can-cancel` làm cho overlay có thể bị hủy.

Sau đó, khi chúng ta hủy bỏ phương thức `onCancel` được gọi, bởi vì chúng ta đặt nó làm giá trị của  `on-cancel` prop.

Chúng ta có thể sử dụng nó như một plugin.

Ví dụ, chúng ta có thể viết:

**main.js**

```php
import Vue from "vue";
import App from "./App.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading);
Vue.config.productionTip = false;
new Vue({
  render: h => h(App)
}).$mount("#app");
```

**App.vue**
```php
<template>
  <div ref="container"></div>
</template>
 
<script>
export default {
  mounted() {
    this.$loading.show({
      container: this.$refs.container,
      canCancel: true,
      onCancel: this.onCancel
    });
  },
  methods: {
    onCancel() {}
  }
};
</script>
```

Chúng ta gọi phương thức `this.$loading.show` để hiển thị overlay.

Thuộc tính `container`  được đặt thành ref (tham chiếu) của container mà chúng ta muốn hiển thị overlay.

`onCancel` có phương thức để gọi khi nó bị hủy.

## 5. Kết luận
vue-fullcalendar là một component bộ chọn lịch và ngày.

vue-loading-overlay là một overlay component sử dụng khi load dữ liệu.

VueLocalStorage là một plugin để xử lý local storage trong ứng dụng Vue.

Bài viết được dịch từ: https://medium.com/javascript-in-plain-english/top-vue-packages-for-adding-calendars-local-storage-overlays-and-resizing-caee66817cc