### I. Lời mở đầu
Vẫn nằm trong series Vuejs siêu to khổng lồ của mình [Cùng học Vuejs](https://viblo.asia/s/2018-cung-nhau-hoc-vuejs-b85ogvV252G) . Các bài viết gần nhất của mình cũng xoay quanh việc sử dụng hiệu quả, một vài tips hay khi sử dụng vuejs và nuxtjs =)).
Mọi người ơi, mọi người ơi và trong bài viết này mình sẽ giới thiệu cho các bạn một tính năng vô cùng cần thiết cho website. Tèng teng... không quá mới mẻ nhưng mà mình nghĩ khá cần thiết trong thời buổi thương mại điện tử và hòa nhập quốc tế như hiện nay :D :D :D. Đó là ... đa ngôn ngữ cho website mà khi bạn sử dụng nuxtjs.

![](https://images.viblo.asia/f462c697-ecca-4541-bf90-d1b37a8a03b0.jpg)
### II. Nội dung chính
**1. Khởi tạo project:**
- Tạo ngay một nuxt-app cho nóng nào:
```bash
$ npx create-nuxt-app <project-name>
```
Hoặc cài với yarn
```bash
$ yarn create nuxt-app <project-name>
```
Tiếp tục cài đặt nuxt
```bash
$ npm install --save nuxt
```
Sau khi cài xong nuxt-app ta thu được folder như bên dưới:

**2. Cài đặt package hỗ trơ đa ngôn ngữ:**
- Trong bài viết này package mà mình sử dụng là: vue-i18n, các bạn cũng có thể dùng [nuxt-i18n](https://nuxt-community.github.io/nuxt-i18n/basic-usage.html#nuxt-link). Nhưng mình có tìm hiểu thì nuxt-i18n cũng được mở rộng từ vue-i18n. Và một điều nữa là trong quá trình sử dụng, mình thấy việc áp dụng vue-i18n mà mình sắp giới thiệu bên dưới về: cài đặt, cấu trúc folder và viết code thì khá là dễ hiểu, tách bạch và dễ mở rộng khi project ngày một lớn.
- Cài đặt package, mình thì có thói quen dùng yarn, các bạn cũng có thể dùng npm để cài đặt:
```bash
$ yarn add vue-i18n
```
hoặc
```bash
 $ npm install vue-i18n --save
```
Sau khi cài đặt thành công, bạn có thể xem package đã được cài đặt chưa trong package.json
```js
    "vue-i18n": "^8.11.2"
```
Công việc tiếp theo của chúng ta là đi tạo plugins và đăng ký vuej-18n trong nuxtjs:

Tạo folder app:
- Tạo folder locales và lần lượt các file: en.json, vi.json, jp.json các file này chính là nơi viết bản dịch cho các ngôn ngữ. Website hỗ trợ cho bao nhiêu ngôn ngữ thì tương ứng với bấy nhiêu file .json
Mình lấy ví dụ website của mình hỗ trợ 3 ngôn ngữ Anh-Việt-Nhật và mình muốn dịch cho từ "Đăng nhập" thì mình có tạo như sau:

en
```json
{
    "login": "login",
    //Bạn cũng có thể viết lồng nhiều object
    "header" : {
        "home": trang chủ
    }
}
```
vi
```json
{
    "login": "Đăng nhập"
}
```
japan
```json
{
    "login": "ログイン"
}
```
Khi cần thêm bản dịch cho từ hay đoạn văn bản nào thêm lần lượt vào các file này nhé aihihi.
Tạo thêm store để có thể thay đổi ngôn ngữ được dễ dàng: i18n.js
Ở đây mình có dùng hàm find của lodash nên các bạn add thêm lodash vào nhé.
```bash
yarn add lodash
```
```js
import _find from 'lodash/find';

export const state = () => ({
    locales: [
        { value: 'vi', label: 'VI' },
        { value: 'en', label: 'EN' },
        { value: 'jp', label: 'JP' },
    ],
    locale: 'vi',
});

export const mutations = {
    set(state, locale) {
        const isLocale = _find(state.locales, { value: locale });
        if (isLocale) {
            state.locale = locale;
        }
    },
};
```
Trong state mình có tạo locales là list các ngôn ngữ hỗ trợ và locale là ngôn ngữ dùng cho website mình có để default là tiếng việt có value là: 'vi'.
Và tạo hàm set mutations để thay đổi ngôn ngữ nữa.
- Tạo thêm folder plugins và 1 file có tên i18n.js
```js
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default ({ app, store }) => {
    app.i18n = new VueI18n({
        locale: store.state.i18n.locale,
        fallbackLocale: 'vi',
        messages: {
            en: require('~/locales/en.json'),
            vi: require('~/locales/vi.json'),
            jp: require('~/locales/jp.json'),
        },
    });
};
```
- locale: ngôn ngữ đăng ký trong package.
- fallbackLocale: ngôn ngữ dự phòng được chọn nếu locale không tồn tại. 
- messages: require để đọc nội dùng các file json các ngôn ngữ mà ta viết ở trên.

locale nào thì sẽ ứng với messages và nội dung trong đó. Khi store thay đổi thì nội dung ngôn ngữ cũng thay đổi theo các bạn nhé.
Và cuối cùng ta đăng ký plugins trong nuxt.config.js
```js
plugins: [
        '~/plugins/i18n.js',
    ],
```
**3. Tiến hành đa ngôn ngữ**
- Nút thay đổi ngôn ngữ:
```js
<template>
    <select :value="locale" @change="onChangeLanguage">
       <option v-for="(item, index) in locales"
             :key="index"
             :label="item.label"
             :value="item.value"
         />
    </select>
</template>
<script>
    import { mapState } from 'vuex';

        computed: {
            ...mapState('i18n', ['locale', 'locales']),
        },
        methods: {
            onChangeLanguage(locale) {
                    this.$store.commit('i18n/set', locale);
            },
        },
 ```
- Viết code để có thể thay đổi ngôn ngữ:
```js
<button>{{ $t('login') }}</button>
```
Khá là đơn giản đúng không nào, chỉ cần dùng $t và bên trong chính là key của từ được viết trong file json trong foler locales. Và nếu trong file json viết lồng nhiều các object ta cứ viết lần lượt
```js
<h1>{{ $t('header.home') }}</h1>
```
### III. Tạm kết
Đến đây thì bạn đã có thể đa ngôn ngữ một cách dễ dàng cho website có sử dụng nuxtjs rồi đúng không nào. Rất mong được sự góp ý của các bạn để có được những đoạn code đẹp nhất. Đừng quên like và subcribe,... à nhầm vote và follow mình nhé.
![](https://images.viblo.asia/44306c29-91cb-43f1-9ca1-b6ebeb10fb48.jpg)