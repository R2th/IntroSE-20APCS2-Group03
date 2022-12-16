Cũng khá là lâu rồi mình không đọc thêm về Vue do toàn làm React :cry:. Nhưng rồi thời tới không cản nổi, giờ mình lại mày mò đọc về Vue để làm dự án mới về nó rồi. Một số bài viết trước mình cũng có nói đến cơ bản về Vue và ở bài này mình lượt qua một lượt các kiến thức về Nuxt. Bài viết sẽ ở dạng tổng quan về Nuxt và mong là mình sẽ không viết quá dài :smiley: . 

> Nuxt is a progressive framework based on Vue.js to create modern web applications. It is based on Vue.js official libraries (vue, vue-router and vuex) and powerful development tools (webpack, Babel and PostCSS). Nuxt's goal is to make web development powerful and performant with a great developer experience in mind.
> 
Tóm gọn về Nuxt chính là một framework dựa vào Vue.js và sử dụng các thư viện của Vue.js như vue, vue-router, vuex và các công cụ phát triển khác như webpack, Babel...

Chúng ta có thể tạo 3 loại ứng dụng Nuxt dựa vào mục đích như sau:
* Server Rendered (Universal SSR): Server-Side Rendering là công nghệ sử dụng để fetch và hiển thị dữ liệu client-site trên server và gửi một trang được hiển thị đầy đủ trên client. Đây là cách làm để cho ứng dụng của bạn được SEO một cách tốt nhất.
* Single Page Applications (SPA): Hầu hết các Javascript framework hiện tại đều là SPA với ưu điểm là chuyển trang nhanh hơn. Hầu hết các SPA sử dụng HTML5 history API hoặc location hasing cho định tuyến.
* Static Generated (Pre Rendering): Các ứng dụng tĩnh không yêu cầu các API để fetch nội dung của các trang mà nội dung đã được bao gồm trong các tệp HTML. 

# Cấu trúc thư mục
Từ đây mình sẽ sử dụng `create-nuxt-app` để tạo một dự án Nuxt để demo. Bằng cách này thì source code của ta đã có một cấu trúc hoàn chỉnh và chúng ta sẽ đi qua các thành phần của nó nhé.
## Assets
Những file mà bạn sẽ import trong dự án (ảnh, font, CSS...). Bạn có thể dùng alias ~/assets để import các file trong này.
## Components
Thư mục chứa các file Vue component (.vue). Bạn có thể import component với alias ~/components. Các component trong thư mục này sẽ không thể truy cập đến `asyncData`. Thư mục này chính là chứa các component với mục đích có thể tái sử dụng.
## Layouts
Thư mục chứa cái file layout. Nó đặc biệt hữu ích trong việc ứng dụng của bạn sử dụng nhiều loại bố cục khác nhau. Để tự tạo cho mình một layout riêng thì ta chỉ cần thêm 1 file .vue vào thư mục `layouts` và sử dụng thuộc tính `layout` để áp dụng layout vừa tạo. Thư mục này không thể đổi tên nếu không cấu hình thêm.
## Middleware
Nơi chứa các middleware, là các function được chạy trước khi page được render (tương tự beforeEnter guard của vue router).
## Pages
Nơi chứa các page component (tương tự router-view component của vue router).
## Plugins
Thư mục chứa các plugin. Tương tự vue plugin. Bạn có thể register filter, directive, component vue plugin ở đây. Đây là nơi bạn lưu trữ các tệp mà bạn muốn chạy trước khi bắt đầu ứng dụng Vue.js. Nó là thư mục không bắt buộc cho nên bạn có thể xóa.
## Static
Nơi chứa các static assets. Tương tự như folder public. Các file trong này có thể được truy cập trực tiếp từ URL. Ví dụ file `images/icon.png` có thể được truy cập trực tiếp với URL `<app_url>/images/icon.png`.
## Store
Nơi chứa các store module của vuex. Về vuex thì mình cũng có bài viết giới thiệu và thực hiện ví dụ ở [đây](https://viblo.asia/p/gioi-thieu-ve-vuex-phan-1-RQqKLEOmZ7z).
## nuxt.config.js
Tập tin dùng để cấu hình ứng dụng của bạn. Nó thường được điền trước dựa trên cấu hình khi tạo ứng dụng của bạn. Một số thông tin quan trọng cần lưu ý là:
* `mode`: Loại của ứng dụng, có thể là `universal` hoặc `spa`. Mặc định giá trị của nó là `universal`. Bằng cách chọn `universal` thì chính là bạn muốn ứng dụng của mình có thể chạy trên cả server và client.
* `env`: env cho app, tương tự `WebpackDefinePlugin`. Env định nghĩa ở đây có thể được truy cập bằng `process.env.<ENV_NAME>`. Lưu ý là env không thể thay đổi được sau khi đã build.
* `head`: Đây chính là tất cả những thứ ở trong thẻ `head` của trang web. Điều này là do Nuxt.js không có `index.html` mặc định giống như Vue.js.
* `loading`: Taatr các ứng dụng Nuxt đi kèm với một component loader mặc định và `color` có thể được tùy chỉnh ở đây.
* `css`: Bạn có mong muốn sử dụng file css chung cho toàn ứng dụng khi cài đặt ứng dụng. Chúng ta sẽ thêm liên kết tạp tin css vào đây và thực hiện khởi động lại ứng dụng.
```js
 /*
   ** Global CSS
   */
  css: ["~/assets/styles/main.css"]

```
* `plugins`: Các plugin được import, có thể là từ npm package hoặc 1 file js. 
```js
modules: [
    '~/modules/plugin_name',
]
```
* `build`: Đây là nơi để config cho `loaders`, `filenamé`, `webpack` và `transpilation`.
# Pages và Routing
Thư mục `pages` trong ứng dụng Nuxt.js chính là cấu hình định tuyến cho ứng dụng. Điều này có thể hiểu là routing của bạn phụ thuộc và tên của từng tệp trong thư mục `pages`. Ví dụ: Nếu bạn có tên là `about.vue` bên trong thư mục `pages` thì bây giờ bạn có một route là `/about` trong ứng dụng. Tuy vậy, vẫn còn những vấn đế như là dynamic route hay nested route. Hãy tìm hiểu xem chúng được trình bày như nào nhé.
## Basic routes
Basic routes có thể được phân loại là các route không yêu cầu cấu hình bổ sung để chúng có thể hoạt động. Ví dụ: `about` hoặc `contact`. Giả sử chúng ta có một thư mục dạng như sau:
```js
pages/
--| me/
 -----| index.vue
 -----| about.vue
--| work.vue
--| contact.vue
--| index.vue
```
Kết qủa của Nuxt sẽ cho chúng ta những route như sau:
```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'work',
      path: '/work',
      component: 'pages/work'
    },
    {
      name: 'contact',
      path: '/contact',
      component: 'pages/contact'
    },
    {
      name: 'me',
      path: '/me',
      component: 'pages/me/index.vue'
    },
    {
      name: 'me-about',
      path: '/me/about',
      component: 'pages/me/about.vue'
    }
  ]
}
```
Những route này có thể được sử dụng để truy cập các component gắn liền với chúng. Như bạn thấy thì các đường dẫn không chứa `pages`. Và Nuxt xử lý các component có tên `index.vue` nếu không có cầu hình bổ sung nào khác.
## Nested routes
Chúng ta tiếp tục với một ví dụ để tạo nested route. Tạo một thư mục tên `dashboard` trong thư mục `pages`. Trong thư mục `dashboard` này chung ta thêm 2 tệp là `user.vue` và `setting.vue`. Ngoài ra ở thư mục `pages` ta thêm một tệp `dashboard.vue`.
```js
pages/
 --| dashboard/
 -----| user.vue
 -----| settings.vue
 --| dashboard.vue
 --| index.vue
```
Kết quả đạt được
```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'pages/dashboard.vue',
      children: [
        {
          name: 'dashboard-user',
          path: '/dashboard/user',
          component: 'pages/dashboard/user.vue'
        },
        {
          name: 'dashboard-settings',
          path: '/dashboard/settings',
          component: 'pages/dashboard/settings.vue'
        }
      ]
    }
  ]
}
```
Chúng ta cần lưu ý về tên của route sẽ tuần theo quy luật như sau:
```js
name of the folder + '-' + name of the file
```
## Dynamic routes
Dynamic route là các route được định nghĩa bởi `biến`. Biến này có thể là tên, số, hoặc id nhận được từ dữ liệu trên ứng dụng. Trong Nuxt, các dynamic route được xác định bằng cách nối thêm `_` vào tên tệp hoặc tên thư mục trong thư mục `pages`. Hãy cùng xem xét ví dụ sau:
```js
pages/
--| me/
-----| index.vue
-----| about.vue
-----| _job
-------| index.vue
-------| info.vue
--| _id.vue
--| index.vue
```
Chúng ta được danh sách các route như sau:
```js
{
  [
    {
      name: 'id',
      path: '/:id',
      component: 'pages/_id.vue'
    }
    {
      name: 'me',
      path: '/me',
      component: 'pages/me/index.vue'
    },
    {
      name: 'me-about',
      path: '/me/about',
      component: 'pages/me/about.vue'
    },
    {
      name: 'me-job',
      path: '/me/:job',
      component: 'pages/me/_job/index.vue'
    },
    {
      name: 'me-job-info',
      path: '/me/:job/info',
      component: 'pages/me/route.vue'
    },
  ]
}
```
Mặc dù một số router tag của Vue.js hoạt động được trong Nuxt.js và có thể được sử dụng để thay thế cho nhau. Tuy nhiên, chúng ta khuyến khích sử dụng các router component của Nuxt. Dưới đây là một số khác biệt giữa Nuxt router tag và Vue router tag.

| Vue.js | Nuxt.js |
| -------- | -------- |
| router-link     | nuxt-link     |
| router-view (nested route)     | nuxt-child     |
| router-view (default)     | nuxt     |

Để bạn có thể thực sự thấy các route của Nuxt hoạt động như nào thì bạn có thể chạy thử source code này của mình nhé. Link github ở [đây](https://github.com/hieubt-1409/init-nuxt/commit/4dabe76b3422509551c5359712583aa289723811).
# Sử dụng Vuex trong Nuxt
Vuex có thể được truy cập trong Nuxt bằng 2 mode:
* Modules: Mỗi tệp `.js` bên trong thư mục `store` được chuyển đổi dưới dạng namespaced module (`index` là root module).
* Classic (deprecates): `store/index.js` trả về phương thức để tạo store instance.

Vì classic mode sẽ bị loại bỏ trong Nuxt 3 cho nên ở đây chúng ta chỉ quan tâm đến modules mode.

Nuxt tự động tạo thư mục `store` ngay khi bạn tạo ứng dụng. Trong chế độ modules, Nuxt sẽ coi mọi tệp trong thư mục này là một mô-đun. Tuy nhiên, tệp `index.js` là bắt buộc để Vuex store được khởi tạo trong ứng dụng. Vì vậy, bây giờ chúng ta tạo ra một tệp `index.js` trong thư mục `store` và sử dụng nó. Chúng ta giả sử nội dung của tệp `store/index.js` như sau:
```js
export const state = () => ({

})

export const getters = {

}

export const mutations = {

}

export const actions = {

}

```
Đây là cách mà ta định nghĩa các thành phần của store trong cùng 1 file. Tuy vậy, với một dự án lớn thì ta nên chia theo dạng module files để dễ dàng quản lý. Đấy chính là cách mà bạn tạo ra các tệp riêng biệt `state.js`, `actions.js`, `mutations.js` và `getters.js` để mô-đun hóa từng thành phần của Vuex mục đích quản lý dễ dàng hơn. Đối với nhu cầu của bạn muốn sử dụng plugin thì bạn cần import nó vào `store/index.js`.

Trong doc của Nuxt có ví dụ tương đổi dễ hiểu cho phần này cho nên mình sẽ không trình bày thêm phần code nữa. Bạn có thể xem chi tiết ở [đây](https://nuxtjs.org/guide/vuex-store#modules-mode).

Đây là source code phần Vuex mà mình copy từ doc về để chạy thử cho bạn nào cần. Link github ở [đây](https://github.com/hieubt-1409/init-nuxt/commit/3fd6137232634fab36b5b6d32ba96b0c0971c437).

# Tạm kết
Có vẻ bài viết cũng ...... không quá dài :smiley: . Tuy nhiên, mình cũng chỉ đang đọc thêm về Nuxt cho nên là ở phần sau mình sẽ nói thêm về Nuxt. Bài viết tương đối là cơ bản và bạn có thể dễ dàng tự mình đào sâu phần doc của Nuxt. Mong là bài viết không gây nhàm chán với bạn. Hẹn mọi người ở bài tiếp theo :bowing_woman: .

**Tham khảo**

https://nuxtjs.org/guide