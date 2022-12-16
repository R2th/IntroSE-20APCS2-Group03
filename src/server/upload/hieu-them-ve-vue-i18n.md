Xin chào mọi người, hôm nay mình xin tiếp tục chia sẻ cho các bạn về những gì cơ bản nhất của Vuejs, để trở thành 1 Fresher chính hiệu ^^ , hãy ghé qua các bài viết trước của mình [ở đây nhé](https://viblo.asia/s/co-ban-de-tro-thanh-mot-fresher-vuejs-chinh-hieu-nB5pX8XJ5PG). Và lần này mình xin giới thiệu về một thư viện bé nhỏ khi các bạn làm việc với đa ngôn ngữ. Đó là **Vue I18n**, hãy cùng tìm hiểu về thư viện này thôi!

### Cài đặt
- Đơn giản thôi, các bạn có thể cài đặt thông qua download, dùng link CDN hoặc thông qua NPM(Yarn) nhé:
```js
//via NPM
npm install vue-i18n

//via Yarn
yarn add vue-i18n
```

> Một chú ý nhỏ là dùng version Vue.js 2.0.0+ để đảm bảo tương thích.


### Import
- Bước này cũng tương tự cài đặt, rất đơn giản như khi chúng ta cài bất kì thư viện bên ngoài nào.
```js
// Cấu trúc file main.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)


const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
      name: 'Quốc Anh'
    }
  }
})

// Run!
new Vue({ i18n }).$mount('#app')
```

### Sử dụng
- Ở Views, hãy thử gọi giá trị "name" được khai báo xem kết quả thế nào:

```js
//views/index.vue

<template>
  <div class="container">
    Xin chào! {{ $t('name') }} đẹp trai.
  </div>
</template>

<script>
export default {
  name: 'Vue-i18n',
}
</script>
```
- Ta thấy là cú pháp để truy xuất tới giá trị **name** là `$t('...')`, khá đơn giản và trên browser thu được như hình dưới:

![](https://images.viblo.asia/0c44cdce-e14c-46ca-ba12-7d1c5864dae7.PNG)

### Đa ngôn ngữ
- Ta bắt đầu vào 1trong những tính năng chính của thư viện này, hãy nhìn lại file main.js, update thêm như bên dưới nhé:

```js
// Cấu trúc file main.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)


const i18n = new VueI18n({
  locale: 'vi',
  messages: {
    en: {
      car: 'I have {carNumber} car!'
    },
    vi: {
      car: 'Tôi có {carNumber} chiếc xe!'
    }
  }
})

// Run!
new Vue({ i18n }).$mount('#app')
```
- locale là phần ngôn ngữ mặc định (chọn vi), ở đây phần messages mình set có 2 ngôn ngữ là tiếng Anh (en) và tiếng Việt (vi)
- Để truyền 1 hay nhiều biến (ví dụ cardNumber), sử dụng cú pháp {variable}.
- Cập nhật lại file views/index.vue như bên dưới để xem kết quả, hãy để ý cách pass carNumber nhé:
```js
// views/index.vue
<template>
  <div class="container">
   Xin chào! {{ $t('car', { carNumber }) }}
  </div>
</template>

<script>
export default {
  name: 'Vue-i18n',
  data() {
    return {
      carNumber: 10
    }
  }
}
</script>
```
![](https://images.viblo.asia/d695e2b6-2ef8-460c-96e9-499f77f48215.PNG)

- Thử chuyển qua tiếng anh xem chức năng hoạt động không nào :v: 
```js
...
const i18n = new VueI18n({
  locale: 'en', // set lại tiếng anh ở đây
  messages: {
    en: {
      car: 'I have {carNumber} car!'
    },
    vi: {
      car: 'Tôi có {carNumber} chiếc xe!'
    }
  }
})
...
```
![](https://images.viblo.asia/d34a7b73-33d4-428d-9416-f66fdfba21f7.PNG)
- Nhìn cũng OK đó mà hình như có gì đó không ổn :D, trong tiếng anh thì số nhiều thì **car** cần thêm **s** phía sau, khá khoai nhưng thư viện này xử được luôn, thật là báo đạo :v:
```js
...
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
    // Tính năng replace: https://kazupon.github.io/vue-i18n/legacy/#vue-tc-replaced
      car: 'I have {carNumber} car | I have {carNumber} car | I have {carNumber} cars!'
    },
    vi: {
      car: 'Tôi có {carNumber} chiếc xe!'
    }
  }
})
...
```
![](https://images.viblo.asia/445b43c1-d732-44ed-806e-4acc2e1a5375.PNG)
- Chà như vậy là đúng ý rồi, không có gì để chê cả :v: 

### Kết luận
- Còn nhiều tính năng hay ho của bộ thư viện nữa, các bạn có thể xem qua[ ở đây](https://kazupon.github.io/vue-i18n/).
- Hi vọng với bài chia sẻ nhỏ sẽ hữu ích cho các bạn trong các vấn đề về xử lý về đa ngôn ngữ với Vuejs, mình cũng xin tạm dừng bài viết ở đây, cám ơn các bạn đã theo dõi!