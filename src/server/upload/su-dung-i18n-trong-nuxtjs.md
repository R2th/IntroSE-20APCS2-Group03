***Trong bài viết này sẽ sử dụng Vue-i18n để xây dựng ứng dụng đa ngôn ngữ với NuxtJS***
# Cài đặt
Bài viết này sẽ bỏ qua phần xây dựng ứng dụng với Nuxt.  
Giả sử mình đã có một project sử dụng Nuxt rồi, việc đầu tiên mình cần làm là cài Vue-i18n với `npm` hoặc `yarn`
> npm install Vue-i18n
> 
> yarn add Vue-i18n

# Tích hợp i18n vào trong ứng dụng
## State
Sử dụng Vuex để lưu giữ ngôn ngữ mà người dùng chọn
Trong thư mục store tạo một file i18n.js
```store/i18n.js
export const state = () => ({
  locales: ['en', 'vi'],
  locale: 'en',
});

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale;
    }
  },
};
```
`locale` trong state để lưu trữ ngôn ngữ hiện tại của người dùng, `locales` là danh sách tất cả các ngôn ngữ hỗ trợ trong hệ thống.
## Khai báo với Vue
Để tích hợp một external package, chúng ta định nghĩa Vue-i18n trong thư mục `plugins`  
Tại thư mục `plugins` tạo một file `i18n.js` để thực hiện khai báo với Vue rằng mình sẽ sử dụng i18n.

```plugins/i18n.js
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n)

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'vi',
    messages: {
      'en': require('~/locales/en.json'), 
      'vi': require('~/locales/vi.json')
    },
  });
}
```

Giải thích một chút về đọan code trên nhé. Đầu tiên là đưa i18n vào thư mục gốc để có thể sử dụng trong middleware.

Khởi tạo một đối tượng Vuei18n với locale là locale lấy được từ trong vuex state, Set ngôn ngữ mặc định khi không lấy được bản dịch tiếng Anh tương ứng thì sẽ trở về tiếng Việt. Ngôn ngữ sẽ được lấy từ hai file ở dạng json là `en.json` và `vi.json` nằm trong thư mục `locales` dưới thư mục `app`
## Middleware
Bởi vì cần biên dịch ngôn ngữ trước khi trang được render nên chúng ta cần định nghĩa một middleware.

Trong thư mục `middleware` tạo một file i18n.js
```middleware/i18n.js
export default function ({ isHMR, app, store, route, params, error, redirect }) {
  const defaultLocale = app.i18n.fallbackLocale
  if (isHMR) return
  const locale = route.query.lang || defaultLocale
  if (store.state.locales.indexOf(locale) === -1) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }
  store.commit('SET_LANG', locale)
  app.i18n.locale = store.state.locale  
}
```

Locale sẽ được lấy từ query trên route (`?lang={locale}`) . Nếu ngôn ngữ truyền vào trên route không nằm trong danh sách các ngôn ngữ được ứng dụng hỗ trợ nó sẽ đưa ra lỗi. Nếu không nó sẽ đẩy ngôn ngữ đó vào state và Vuei18n sẽ thực hiện biên dịch ngôn ngữ hiển thị ra cho người dùng.

Cuối cùng tất cả các trang của chúng ta đều sử dụng middleware này nên include nó trong file nuxt config luôn mà không cần mất công gọi lại ở mỗi trang
```nuxt.config.js
  plugins: ['plugins/i18n.js'],
  router: {
    middleware: ['i18n']
  },
```
## Vue component
Bây giờ mình thử làm một cái dropdown để chọn ngôn ngữ và hiển thị nội dung theo ngôn ngữ mình đã chọn nhé
```
<template>
  <el-dropdown @command="changeLang" split-button>
    <span class="el-dropdown-link">
      {{$t('home.lang')}}
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command='en'>English</el-dropdown-item>
      <el-dropdown-item command='vi'>Tiếng Việt</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</teamplate>

<script>
export default {
  methods: {
    changeLang (lang) {
      this.$store.commit('SET_LANG', lang)
      this.$router.push({ path: `${this.$router.currentRoute.path}?lang=${lang}` })
    }
  }
} 
</script>
```
Khi thay đổi ngôn ngữ bằng cách chọn ngôn ngữ trong dropdown, set lại state là ngôn ngữ vừa chọn và dùng router push lại trang hiện tại với query lang.

## Thư mục locales
Cuối cùng là phải tạo hai file en.json và vi.json để Nuxt còn có cái mà biên dịch.
```locales/vi.json
"home": {
  "lang": "Tiếng Việt"
}
```

```locales/en.json
"home": {
  "lang": "English"
}
```

Rồi, khi bên vuecomponent sử dụng phương thức $t(...) nó sẽ tìm theo đường dẫn  và lấy ra bản dịch tương ứng.

Ví dụ ở trên khi gọi {{ $t('home.lang') }} mà ta đang chọn ngôn ngữ là tiếng Việt thì sẽ hiển thị là `Tiếng Việt`.
# Kết luật
Chúc bạn thành công tích hợp đa ngôn ngữ vào trong ứng dụng của mình
## Tài liệu tham khảo
> https://medium.com/@helena.wuv/how-to-internationalize-your-next-nuxt-project-using-vue-i18n-d9c51e28a564
>