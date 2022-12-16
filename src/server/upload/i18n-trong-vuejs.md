Bài viết này sẽ đi hướng dẫn mọi người thiết lập một trang web VueJS với i18n một cách dễ dàng bằng cách sử dụng package VueI18n.

# Thiết lập project
**Tạo một  project mới với vue-cli**
Nếu bạn nào chưa có vue-cli thì sử dụng câu lệnh sau để cài đặt nhé
>  npm install @vue/cli -g
>  
Tiếp theo sử dụng vue-cli để tạo một project vue với có tên i18n
> vue create i18n
> 
Vue CLI sẽ hỏi bạn để chọn cài đặt cho project tự động hoặc cài đặt thủ công. Bạn chỉ cần nhấn enter để chọn cài đặt tự động cho dễ nhé.
![](https://images.viblo.asia/343ed70e-01e9-492e-8770-eff5ff772d95.png)
Bây giờ chuyển thư mục làm việc tới project vừa tạo
> cd i18n
> 
và cài đặt các plugin với npm và chạy thử project để xem project sẽ như thế nào sau khi tạo nhé. nhé
> npm install
> 
> npm run serve
>
Bây giờ thử chạy project với cổng mặc định là 8080 http://localhost:8080/ bạn sẽ được kết quả như dưới đây
![](https://images.viblo.asia/f995a721-cbcb-4fa8-8c7b-2eeea850efff.png)
Nhiệm vụ của chúng ta bây giờ là thử làm đa ngôn ngữ cho cái trang này nhé.
**Vue-i18n Plugin**
Như đã nói ở phía trên để sử dụng đa ngôn ngữ trong vue, mình sử dụng Vue-i18n. Cài đặt nó bằng câu lệnh:
> npm install vue-i18n --save
> 
Như vậy là phần cài đặt cơ bản đã xong, cùng tiến hình thực hiện config và làm thử một trang đa ngôn ngữ thôi nào.
# Đa ngôn ngữ với VueJS
## Config Vue-i18n
**Tiến hành config cho vue-i18n**

Tạo một folder chung để config các plugin trong thư mục src mang tên là plugins sau đó tạo một file i18n.js trong thư mục vừa tạo. Để thực hiện đa ngôn ngữ, mình phải yêu cần vue sử dụng đến plugin i18n này và cung cấp cho nó một đối tượng message. Cũng tương tự như folder lang của laravel thì việc lấy từ ngữ trên website sẽ lấy từ đối tượng message này ra. Tóm lại object message này cung cấp các bản dịch cho mọi ngôn ngữ mà ứng dụng của bạn hỗ trợ.

Bước đầu tiên, thông báo với thằng Vue rằng mình sẽ sử dụng plugin i18n. Trong file i18n.js vừa tạo thêm đoạn code sau
```javascript:i18n.js
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
```
Như vậy là Vue đã biết là mình sử dụng đa ngôn ngữ, bước tiếp theo là tạo các bản dịch cho những loại ngôn ngữ mà ứng dụng sẽ hỗ trợ. Đối với ứng dụng này mình sẽ ví dụ với hai loại ngôn ngữ là Tiếng Việt và Tiếng Anh. Khi bạn đã hiểu cách thức hoạt động của nó rồi thì bạn có thể thêm càng nhiều ngôn ngữ cho ứng dụng của bạn.

Như đã nói ở bên trên, mình cần đến một object message để cung cấp bản dịch cho ứng dụng. Object này cũng được khởi tạo trong file i18n.js
```javascript
const messages = {
    'en': {},
    'vi': {}
};

export default i18n;
```
Cần phải export thằng i18n này để sử dụng nữa.

Ở bên trên thì mình đã bảo với Vue là tao sử dụng đa ngôn ngữ, giờ cần tạo thêm một đối tượng đa ngôn ngữ để Vue lấy mà sử dụng.
```javascript
const i18n = new VueI18n({
    locale: 'vi', // set locale
    fallbackLocale: 'vi', // set fallback locale
    messages, // set locale messages
});
```
Đoạn code trên chúng ta đã thông báo với Vue ngôn ngữ mặc định hiển thị ban đầu, trong trường hợp có bất kỳ vấn đề gì trong việc hiển thị ngôn ngữ, Vue sẽ tìm đến ngôn ngữ được set trong fallbacklocale, còn cuối cùng là đối tượng messages để Vue thực hiện tìm kiếm ngôn ngữ.

Từ nãy đến giờ ta đều làm việc với file i18n.js, nhưng khi bạn tạo một project với vue-cli thì nó sẽ sử dụng js trong file main.js cơ. Vì thế ta cần vào file main.js trong thư mục src để khai báo, import phần đa ngôn ngữ chúng ta đã thiết lập nãy giờ nhé.
```sql:main.js
import i18n from '@/plugins/i18n';
```
*Lưu ý một chút: @ theo mặc định của Vue sẽ trỏ đến thư mục src, điều này giúp chúng ta tránh sử dụng các đường dẫn tương đối*
Nhìn vào file main.js, thằng đối tượng Vue để render component App vẫn chưa hề biết đến việc mình sử dụng i18n. Cần phải thông báo cho nó để nó sử dụng:
``` main.js
import Vue from 'vue';
import App from './App.vue';
import i18n from '@/plugins/i18n';

Vue.config.productionTip = false;

new Vue({
    i18n,
    render: h => h(App),
}).$mount('#app');
```
## Thêm các bản dịch đa ngôn ngữ
Mở file i18n.js thực hiện các bản dịch đầu tiên. Cùng bắt đầu với câu chào "Welcome to Your Vue.js App" nhé. Lưu ý là bản dịch cho mỗi ngôn ngữ trong messages object cũng là một object, gồm các cặp key-value. Key sẽ được sử dụng để gọi trong quá trình code còn value sẽ là những gì hiển thị lên màn hình khi key được gọi. Rồi hãy xem thử cách sử dụng đa ngôn ngữ cho cụm từ mình nói đến nhé.

```javascript:i18n.js
const messages = {
    'en': {
        welcomeMsg:  'Welcome to Your Vue.js App'
    },
    'vi': {
        welcomeMsg:  'Chào mừng đến với ứng dụng Vue.js của bạn'
    }
};
```
Bây giờ cần sử dụng bản dịch này để thay thế vào phần hiển thị của Vue. Mở file App.vue, bạn có thể thấy trong template có truyền một prop là msg đến component HelloWorld. Mình cần thay thế nó bằng welcomeMsg của mình. Để đơn giản nhất, loại bỏ luôn thành phần prop này đi và đặt văn bản này trong component HelloWorld.

Mở HelloWorld component. Trong thẻ h1, thông điệp prop đang được hiển thị ({{ msg }}). Hãy để thay thế nó bằng mã sau đây:
```php
<h1>{{ $t('welcomeMsg') }}</h1>
```
Nhớ xóa luôn thành phần props đi nhé. Tránh dư thừa.

$t chỉ định sử dụng đa ngôn ngữ. Văn bản mà mình muốn hiển thị là giá trị của khóa welcomeMsg trong messages object. Chạy thử luôn để xem kêt quả nhé.
![](https://images.viblo.asia/e36ff2c2-5c8f-4386-9fd1-50041b4f2d5c.png)

Do mình để ngôn ngữ mặc định khi config là vi nên khi mới vào trang nó sẽ hiển thị Tiếng Việt nhé.
## Thay đổi ngôn ngữ. 
Bây giờ chúng a có thể thay đổi ngôn ngữ rồi. Nhưng vấn đề đặt ra là làm thế nào để từ trang web của mình có thể thao tác để chọn ngôn ngữ. Rồi như vậy nhiệm vụ của phần này là bắt tay đi vào làm một button để user có thể lựa chọn ngôn ngữ của họ.

Mình cài thêm một package nho nhỏ để giúp làm cái button này nhé. Package này cấp một bộ sưu tập tất cả các cờ quốc gia dưới định dạng SVG.
> npm install vue-flag-icon --save
> 
Cũng tương tự như i18n sau khi cài đặt xong package này mình cũng cần thông báo với Vue là sẽ sử dụng nó:
```main.js
import Vue from 'vue';
import App from './App.vue';
import i18n from '@/plugins/i18n';
import FlagIcon from 'vue-flag-icon';

Vue.use(FlagIcon);
Vue.config.productionTip = false;

new Vue({
    i18n,
    render: h => h(App),
}).$mount('#app');
```

Rồi bây giờ tiến hành tạo nút để người dùng sử dụng thôi.

Trong bản demo này, mình chỉ hỗ trợ hai ngôn ngữ. Trong một ứng dụng thực tế, thì nó có thể hỗ trợ nhiều ngôn ngữ hơn. Với trường hợp đó, bạn sẽ có một mảng gồm tất cả các ngôn ngữ được hỗ trợ. Mình sẽ sử dụng cách này trong đây luôn như vậy khi chuyển sang ứng dụng thực tế giúp bạn dễ dàng sử dụng hơn.

Trong App component thêm một data mới là languages, nó là một mảng các đối tượng, mỗi đối tượng gồm flag(cờ để FlagIcon hiển thị), language (để phân biệt đâu là ngôn ngữ được lựa chọn), và title (tên ngôn ngữ)
```
data() {
    return {
      languages: [
        { flag: 'us', language: 'en', title: 'English' },
        { flag: 'es', language: 'vi', title: 'Tiếng Việt' }
      ]
    };
  }
```

Ở template, mỗi đối tượng languages sẽ có một nút riêng, dùng v-for để lặp qua tất cả các mục và tạo nút cho mỗi mục. Mình nghĩ để đẹp thì nên cho mấy nút này trước logo Vue nghĩa là trên thẻ img nhé

```
<div>
  <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
    <flag :iso="entry.flag" v-bind:squared=false />
    {{entry.title}}
  </button>
</div>
```

Thêm một chút style cho button nữa.
```css
button {
  padding: 15px;
  border: 1px solid green;
  font-size: 18px;
  margin: 15px;
}
```
Rồi để  nút có thể thay đổi locale thì trong đoạn code trên ta đã có bắt một sự kiện là changeLocale. Và change locale có thể thay đổi ngôn ngữ thì mình lại phải dùng đến thằng i18n rồi. Trong App component tiếp tục import thằng i18n vào script
```sql
import i18n from '@/plugins/i18n';
```
Tiếp đến là thực hiện method này.
``` nh
methods: {
  changeLocale(locale) {
      i18n.locale = locale;
  }
}
```
Cái medthod changeLocale này có nhận vào một biến locale, có thể thấy khi click button này thì biến locale chính là gía trị language của object thành phần trong array languages. Sau đó lấy giá trị đó gán lại cho locale của i18n như vậy khi click vào nút thằng i18n sẽ nhận diện locale mới và thay đổi ngôn ngữ theo locale đó.

Chạy thử và cùng cảm nhận kết quả:
![](https://images.viblo.asia/01b9caa3-509a-4975-af57-d9ecdaf080ad.gif)
Như vậy là ta đã hoàn thành công cuộc thực hiện đa ngôn ngữ trong vue rồi. Mình tiến hành thực hiện nốt với các text còn lại với cách thêm vào object messages và chỉnh sửa lại trong template tương tự như trên là được nhé.
## Hoàn thiện ứng dụng
```html:HelloWorld.vue
<template>
  <div class="hello">
    <h1>{{ $t('welcomeMsg') }}</h1>
    <p>
      {{ $t('guide') }}<br>
      {{ $t('checkout') }}
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>{{ $t('plugins') }}</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>{{ $t('links') }}</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>{{ $t('ecosystem') }}</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>
```

```javascript:i18n.js
const messages = {
    'en': {
        welcomeMsg:  'Welcome to Your Vue.js App',
        guide: 'For a guide and recipes on how to configure / customize this project,',
        checkout: 'check out the',
        plugins: 'Installed CLI Plugins',
        links: 'Essential Links',
        ecosystem: 'Ecosystem'
    },
    'vi': {
        welcomeMsg:  'Chào mừng đến với ứng dụng Vue.js của bạn',
        guide: 'Để xem hướng dẫn và cách config/ tùy chỉnh project,',
        checkout: 'xem tại',
        plugins: 'Cài đặt CLI Plugins',
        links: 'Liên kết cần thiết',
        ecosystem: 'Ecosystem'
    }
};
```
Và kết quả chạy thử của mình đây
![](https://images.viblo.asia/43a1111e-4d32-4b2a-b3bb-09f0f4b34752.gif)

# Tài liệu tham khảo
> https://medium.freecodecamp.org/how-to-add-internationalization-to-a-vue-application-d9cfdcabb03b