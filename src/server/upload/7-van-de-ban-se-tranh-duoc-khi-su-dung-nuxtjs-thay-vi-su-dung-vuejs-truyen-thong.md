## Mở đầu
Chào các bạn, [Vue.js](https://vuejs.org/) đang là một trong những sự lựa chọn tuyệt vời cho các **Web Application**. Tuy nhiên, có những trở ngại mà bạn sẽ gặp phải nếu bạn là người mới sử dụng Vue.js, chẳng hạn như:
* Làm thế nào để kết hợp và cấu hình các thư viện JavaScript với Vue.js để hoạt động một cách hiệu quả?
* Cấu trúc và đặt tên các thư mục trong dự án như thế nào cho hợp lý?
* Làm cách nào để đảm bảo website của bạn được lập chỉ mục chính xác bởi các công cụ tìm kiếm (Google, Bing, ...)?
* Làm cách nào để tối ưu hóa tốc độ tải trang?

Tất cả những vấn đề trên đều có thể giải quyết nhanh chóng với [Nuxt.js](https://nuxtjs.org/) (một framework cấp cao được xây dựng dựa trên Vue.js). Bạn có thể tìm hiểu rõ hơn về Nuxt.js trong bài viết dưới đây nhé:
> https://viblo.asia/p/tim-hieu-ve-nuxtjs-ORNZqgjb50n

Trong bài viết này, mình muốn chia sẻ cho các bạn biết 7 vấn đề mà bạn có thể sẽ gặp phải trong quá trình xây dựng ứng dụng Vue và cho bạn biết Nuxt sẽ giải quyết chúng như thế nào nhé.

## 1. Mất nhiều thời gian để xây dựng từ đầu một ứng dụng Vue hoàn chỉnh
Với một ứng dụng Vue hoàn chỉnh thì bạn sẽ cần phải cài đặt các thư viện Vue đi kèm như Vuex, Vue Router, Vue Meta, ... . Khá là lằng nhằng và mất thời gian, trong khi bạn lại muốn bắt tay vào làm các components và các chức năng cho ứng dụng luôn. Tuy nhiên, khi bạn dùng Nuxt thì mặc định các thư viện cần thiết để xây dựng một ứng dụng Vue hoàn chỉnh sẽ được thêm vào. Ngoài ra, Nuxt không chỉ được cấu hình sẵn với Vuex, Vue Router và Vue Meta, mà nó còn thiết lập dự án của bạn với các tuỳ chọn mặc định thông minh dựa trên các thực tiễn tốt nhất được nghiên cứu kỹ lưỡng mà Vue giành cho bạn.

Tạo một ứng dụng Nuxt chỉ với một câu lệnh:
```
yarn create nuxt-app <project-name>
```

Hệ thống cài đặt của Nuxt sẽ hỏi bạn về các thư viện mà bạn muốn tích hợp với dự án của mình. Chẳng hạn đối với CSS framework thì bạn muốn dùng framework nào (Vuetify, Bootstrap, ...), đối với Testing thì bạn muốn dùng thư viện nào để test (Jest hay là Ava). Tất cả những gì bạn cần làm là chọn cho mình những tuỳ chọn mặc định và nhấn Enter, Nuxt sẽ lưu lại kết quả này vào một file có tên là **nuxt.config.js** để bạn có thể sửa lại các tuỳ chọn này trong tương lai. Rất tiện và đơn giản phải không nào!

## 2. Không có cấu trúc thư mục rõ ràng và hợp lý
Khi ứng dụng Vue của bạn phát triển thì cấu trúc mã nguồn lại càng được chú trọng hơn. Điều đó là hiển nhiên, vì sẽ có hàng tá các file code lớn nhỏ được sinh ra mà bạn lại không có một cấu trúc thư mục rõ ràng thì dự án của bạn sẽ trở nên rối rắm và khó bảo trì hơn. Và Nuxt đã giải quyết vấn đề này rất tốt, nó có một cấu trúc rất rõ ràng và dễ hiểu ngay cả với những người vừa mới sử dụng Nuxt.

Khi bạn cài đặt Vue với công cụ Vue CLI thì Vue sẽ cung cấp cho bạn 2 thư mục là **assets** và **components**, tuy nhiên với Nuxt thì nó còn cung cấp cho bạn nhiều hơn thế nữa, chẳng hạn như:
* **Thư mục Pages:** nơi chứa các Application Views và Routes của bạn. Mỗi file **.vue** sẽ tương ứng với một router.
* **Thư mục Layouts:** nơi lưu trữ các Layout Templates của bạn. Nuxt sẽ sử dụng **default.vue** làm template mặc định.
* **Thư mục Middleware:** nơi chứa các Application Middleware của bạn. Middleware cho phép bạn định nghĩa các functions sẽ chạy trước khi render ra page.

## 3. Việc cấu hình Routes sẽ khó khăn hơn khi ứng dụng Vue trở nên lớn dần
Khi ứng dụng Vue của bạn trở nên lớn dần thì phần code cấu hình Routes sẽ ngày càng dài hơn, đến một lúc nào đó bạn sẽ thấy nó khó kiểm soát. Với Nuxt, bạn đơn giản chỉ cần tạo các Vue Components trong thư mục pages, Nuxt sẽ tự động biên dịch thành các Routes mà bạn không cần phải viết các đoạn cấu hình Route dài dòng.

Ví dụ đối với cấu trúc thư mục pages như sau:
```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```
thì Nuxt sẽ tự động biên dịch thành:
```javascript
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

## 4. Không có một tiêu chuẩn chung để cấu hình mọi thứ cùng nhau
May mắn thay, Nuxt đã cung cấp cho chúng ta một file **nuxt.config.js** và bạn có thể viết các đoạn code cấu hình vào trong file này:
```javascript:nuxt.config.js
module.exports = {
  /*
  ** Nơi định nghĩa ứng dụng là Universal Application hay là Single-Page Application
  */
  mode: 'universal',

  /*
  ** Nơi thiết lập giá trị cho các thẻ <title>, <link>, <meta>, ...
  */
  head: {
    title: 'My App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'This is my first app' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Nơi định nghĩa kiểu style cho thanh loading bar (sẽ hiển thị khi tải trang)
  */
  loading: {
    color: '#67e559',
    height: '5px'
  },

  /*
  ** Nơi khai báo các đường dẫn tới file .css cũng như .scss
  */
  css: [
    '@/assets/css/main.scss',
    '@/assets/css/style.css'
  ],

  /*
  ** Nơi khai báo các plugins sẽ được load trước khi khởi chạy ứng dụng
  */
  plugins: [
    '~/plugins/axios'
  ],

  /*
  ** Nơi khai báo các modules đi kèm với ứng dụng của bạn
  */
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa'
  ]
}
```

## 5. Không thân thiện với SEO
Có thể bạn sẽ muốn ứng dụng Vue của bạn được lập chỉ mục chính xác bởi các công cụ tìm kiếm để chúng có thể dễ dàng tìm ra. Nhưng đối với một **Single-Page Application (SPA)** thì làm thế nào để được các công cụ tìm kiếm lập chỉ mục trong khi dữ liệu trang web của bạn trống trơn và chỉ có các đường dẫn tới file JavaScript? Trong trường hợp này giải pháp tốt nhất là sử dụng cơ chế **Server-Side Rendering (SSR)**, cơ chế này sẽ cho phép các Vue pages trong ứng dụng của bạn được render trước trên server. Lúc này ứng dụng của bạn không còn được gọi là SPA nữa mà thay vào đó nó sẽ được gọi với cái tên là **Universal Application (hay  Isomorphic Application)**.

Tuy nhiên để tích hợp được cơ chế SSR vào một SPA thì sẽ tốn kha khá thời gian để đọc tài liệu và cài đặt. Nhưng với Nuxt thì mọi thứ trở nên rất đơn giản khi mà cơ chế SSR đã được tích hợp sẵn, đồng thời nó còn được kết hợp với một thư viện có tên là [Vue Meta](https://github.com/nuxt/vue-meta), nó sẽ tự động render ra các thẻ **meta** cần thiết để giúp website của bạn trở nên tốt với SEO. Ngoài ra, bạn còn có thể "bật/tắt" tính năng này dễ dàng chỉ với thao tác thay đổi thuộc tính **mode** trong file **nuxt.config.js**, ví dụ:

Khi bạn muốn ứng dụng của bạn thân thiện với SEO:
```javascript:nuxt.config.js
module.exports = {
  mode: 'universal'
}
```

Còn khi không muốn thì sao nhỉ? Cũng rất đơn giản, thay **universal** thành **spa** là xong:
```javascript:nuxt.config.js
module.exports = {
  mode: 'spa'
}
```

## 6. Tốc độ tải ban đầu của ứng dụng có thể bị chậm
Nếu ứng dụng Vue của bạn là một SPA thì khi tải lúc ban đầu, nó sẽ mất một khoảng thời gian để tải các file JavaScript rồi sau đấy mới render ra giao diện. Nhưng với Nuxt.js nếu bạn chọn hiển thị ứng dụng như một **Universal Application**, thì ngay tại request đầu tiên các file HTML sẽ được khởi tạo trước trên server, sau khi tải xuống nó sẽ bắt đầu chạy như một SPA bình thường. Tính năng này sẽ khiến ứng dụng của bạn tải nhanh hơn trên trình duyệt. Ngoài ra, với tính năng **code-splitting**, nó chỉ tải các đoạn JavaScript cần thiết để thực hiện các chức năng định tuyến. Điều này làm cho trải nghiệm người dùng được tối ưu.
![](https://images.viblo.asia/ddf79fbf-ce40-4f9d-a78a-1b6029ff4675.gif)

## 7. Khó thay đổi các hành vi nằm trong lõi của Vue
Khi bạn đang phát triển các ứng dụng Vue ở cấp production, đến một lúc nào đó, bạn sẽ cần phải thay đổi các hành vi nằm trong chính mã nguồn của Vue. Để thực hiện điều này, đòi hỏi bạn cần có một kiến thức chuyên sâu về Vue.js cũng như cách thức hoạt động của một JavaScript Framework. Tuy nhiên, Nuxt đã cung cấp cho chúng ta một hệ thống modules cấp cao hơn giúp bạn có thể dễ dàng tùy chỉnh mọi khía cạnh của Nuxt.

## Kết luận
Trên đây là một số vấn đề mà bạn có thể sẽ gặp phải khi xây dựng một ứng dụng Vue và với sự tiện ích của Nuxt thì các vấn đề này đã được giải quyết. Như bạn có thể thấy, Nuxt cho phép chúng ta dành ít thời gian hơn để tiến hành cài đặt và nhiều thời gian hơn cho việc xây dựng ứng dụng Vue. Bên cạnh đó, còn rất nhiều điều thú vị bên trong Nuxt nữa, hy vọng trong các bài tới mình sẽ có thời gian để chia sẻ cho các bạn. Cám ơn các bạn đã đọc bài viết của mình! :wink:

-----

***Tài liệu tham khảo:***
* https://medium.com/vue-mastery/7-problems-you-can-avoid-by-using-nuxt-js-for-your-next-vue-app-963afd5047d3
* https://nuxtjs.org/