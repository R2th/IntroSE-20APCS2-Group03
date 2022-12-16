# Mở Đầu
Hello các bạn xin chào các bạn mình đã trở lại rồi đây :v lâu quá rồi mình cũng chưa viết bài rồi nhân dịp Viblo đang có sự kiện Mayfest mà mình cũng đã hoàn thành được các thử thách khác trên Viblo code với ctf rồi nên phải quyết tâm hoàn thành 2 bài viết để còn nhận quà chứ :D. Thôi không lan man nữa vào việc luôn nhé hôm nay mình sẽ nói đến việc tích hợp đa ngôn ngữ cho dự án vue và nuxtjs bằng vue-i18n và nuxt-i18n. Quá quen thuộc rồi đúng không :v bắt đầu luôn nhé.
# Tích hợp vue-i18n cho project vue
tích hợp cho project vue thì đầu tiên phải tạo project đã  đúng không. Mình tạo project với lệnh
```js
vue create vue-i18n
```
với "vue-i18n" là tên project, mình chọn default là Vue2 và eslint, rồi để nó tạo project thôi :D, sau khi tạo xong thì cd vào "vue-i18n" vì mình dùng yarn lên sẽ chạy `yarn serve` để xem project có hoạt động không nào :v, ok vậy là đã tạo xong project rồi. Tiếp theo là cài "vue-i18n" các bạn chỉ cần chạy 
```
yarn add vue-i18n
```
Sau khi add xong `vue-i18n` thì chúng ta tiến hành thêm một folder "locale" bên trong folder "src" của dự án, bên trong "locale" lại tạo thêm 3 file vi.js, en.js, index.js như hình bên dưới đây.

![](https://images.viblo.asia/41f24058-b3a8-40aa-9449-74d2133d833c.png)

Trong file vi.js, en.js sẽ chứa data theo ngôn ngữ tương ứng và chúng ta cần export nó ra, nội dung file như sau: 
```js
const vi = {
    welcome: 'Chào mừng bạn đến với ứng dụng Vue.js',
}

export default vi;
```
tương tự với file en.js. Tiếp theo ở file index.js mình sẽ gọi đến 2 file trên và cũng export nó ra (phần sau sẽ gọi đến nó :D) như sau:
```js
import en from './en';
import vi from './vi';

export default {
    en,
    vi,
};
```

Tiếp theo là sẽ gọi nó ở main.js. Mình cần import vue-i18n và messages của ngôn ngữ tương ứng vào, khởi tạo nó kèm ngôn ngữ mặc định và cuối cùng là render ra, file main.js của mình sẽ như thế này:
```js
import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n';
import messages from '../src/locale/index';

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'vi', // locale mặc định
    messages,
});

Vue.config.productionTip = false

const app = new Vue({
  i18n,
  render: h => h(App),
});

app.$mount('#app');
```
Tiếp theo là cần có 1 component để có thể chuyển đổi qua lại giữa các ngôn ngữ, mình có component như sau:
```html
      <div>
        <select v-model="$i18n.locale" class="switch-locale">
            <option
                v-for="lang in langs"
                :key="lang.key"
                :value="lang.key"
            >
                {{ lang.lable }}
            </option>
        </select>
      </div>
```

với phần data 
```js
data() {
    return {
        langs: [
            {
                key: 'vi',
                lable: 'Tiếng việt',
            },
            {
                key: 'en',
                lable: 'English',
            },
        ],
    };
  }
```
và thêm 1 chút css :D
```css
.switch-locale {
    width: 130px;
    height: 35px;
    outline: 0;
    border-radius: 4px;
    border: 1px solid #909399d9;
    background: white;
}
```
các bạn cũng có thể style thêm cờ cho từng ngôn ngữ chẳng hạn. Và cuối cùng là thay những đoạn text cần đã ngôn ngữ bằng `{ $t('welcome') }}` với `welcome` là cái mà chúng ta đã khai báo trong file vi.js và en.js đó. Cùng xem kết quả nhé :D 

![Peek 2022-05-27 22-02.gif](https://images.viblo.asia/0da54365-07bf-4186-8303-c45413e3d05e.gif)

oke vậy là đã xong phần tích hợp vue-i18n cho project vue, bây giờ chúng ta cùng chuyển sang tích hợp nuxt-i18n cho project nuxt nhé gét gô :v: 

# Tích hợp nuxt-i18n cho project nuxtjs
Cũng như project vue thôi đầu tiên chúng ta cũng tạo một project nuxtjs mình dùng yarn nên câu lệnh tạo sẽ là 
```
yarn create nuxt-app nuxt-i18n
```
với `nuxt-i18n` là tên project, mình cũng có 1 bài giới thiệu  mọi người có thể xem lại kỹ hơn về một project nuxtjs ở [đây](https://viblo.asia/p/tao-mot-du-an-nuxtjs-tim-hieu-cau-truc-thu-muc-trong-nuxtjs-6J3Zg30PZmB). Tiếp theo sẽ là cài `nuxt-i18n` cũng tương tự như vue-i18n mình chạy câu lệnh
```
yarn add nuxt-i18n
```
Sau khi cài xong chúng ta  cũng cần tạo 1 folder "lang" để chứa ngôn ngữ trong folder mình có 2 file là vi.js và en.js như hình bên dưới ![](https://images.viblo.asia/61fdc3b0-53a7-4fb1-bd77-93a1aabf7a81.png)
với nội dung file vi.js như sau 
```js
export default {
    hi: 'xin chào'
}
```
Tương tự với file en.js. Tiếp theo bạn vào file "nuxt.config.js" ở phần "modules" để import nuxt i18n với nội dung như sau: 
```js
[
      'nuxt-i18n',
      {
          locales: [
              {
                  code: 'vi',
                  file: 'vi.js',
                  name: 'Tiếng Việt',
              },
              {
                  code: 'en',
                  file: 'en.js',
                  name: 'english',
              },
          ],
          detectBrowserLanguage: {
              useCookie: true,
              cookieKey: 'i18n_redirected',
          },
          langDir: 'lang/',
          vueI18nLoader: true,
          defaultLocale: 'vi',

          vueI18n: {
              fallbackLocale: 'vi',
          },
      },
    ],
```
như vậy là đã gần hoàn thành rồi đó :v, chúng ta cũng cần thêm một component để chuyển giữa các ngôn ngữ với nhau: 
```html
<select v-model="locale" class="language">
    <option value="en">
        English
    </option>
    <option value="vi">
        Tiếng Việt
    </option>
</select>
```
với Data là 
```js
  data() {
      const lang = 'vi'
      this.$i18n.locale = lang
      return { locale: 'vi' }
  },
```
mình sử dụng watch để phát hiện sự thay đổi ngôn ngữ và cập nhật theo đúng sự thay đổi đó 
```js
  watch: {
    locale(val) {
        this.$i18n.locale = val
    },
  },
```

cũng thay các đoạn text cần đa ngôn ngữ tương tự với vue-i18n `{{ $t('text') }},  oke vậy là đã xong cùng chạy thử nhé :D

![Peek 2022-05-27 23-21.gif](https://images.viblo.asia/fc61280c-483b-45c5-8cf1-9cf202daee07.gif)
# Kết Luận
Như vậy là mình đã giới thiệu về đa ngôn ngữ cho dự án vue, và nuxt dùng vue, nuxt-i18n, nếu mọi người thấy bài viết hưu ích thì hãy cho mình một upvote nhé, biết là muộn nhưng  biết đâu nhờ các bạn mà mình lại có thể đua vào top 10 của Mayfest :D. Có thắc mắc hay góp ý gì thì mọi người hay commnent xuống dưới bài viết nhé, cảm ơn các bạn đã đọc