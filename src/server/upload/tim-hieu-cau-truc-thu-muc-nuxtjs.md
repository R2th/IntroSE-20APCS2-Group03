Vừa qua mình cũng có chút va chạm với NuxtJs từ con số 0 nên tiện đây cũng muốn hiểu hơn cấu trúc thư mục được dùng trong Nuxt sẽ như thế nào? Mục đích của từng thư mục dùng để làm gì? Và giờ mình cùng tìm hiểu nhé.
## NuxtJs là gì?
Nuxt là một framwork được phát triển dựa trên Vue.js để tạo các ứng dụng web tốt hơn. Nó dựa trên các thư viện chính thức của Vue.js (vue, vue-router và vuex) và các công cụ phát triển mạnh mẽ (webpack, Babel và PostCSS). 

Mục đích chính của nó là làm cho sự phát triển web trở nên mạnh mẽ và tạo ra một quy trình phát triển hợp lý hơn dành cho các Developers. Về bản chất, nó hỗ trợ các mục tiêu khác nhau (máy chủ, không máy chủ hoặc tĩnh) và kết xuất phía máy chủ có thể chuyển đổi được, đặc biệt có thể mở rộng với hệ sinh thái module mạnh mẽ.

![](https://images.viblo.asia/4248ceb6-8b85-4dc8-95dc-0bde3e7ab0c4.jpeg)

## Cấu trúc thư mục trong NuxtJs
Cấu trúc ứng dụng Nuxt.js mặc định nhằm cung cấp một điểm khởi đầu tuyệt vời cho cả các ứng dụng nhỏ và lớn. Tất nhiên, bạn có thể tự do sắp xếp ứng dụng của mình theo cách bạn muốn.
### Assets
Thư mục `assets`, đúng như với tên của nó. Assets chứa các nội dung un-compiled của bạn, chẳng hạn như JavaScript, SCSS và images. Nuxt.js sử dụng webpack để xử lý và compile các nội dung này.

Nuxt sẽ config webpack để xử lý các file URL ASSET bằng file-loader and url-loader. Lợi ích của file-loader là đảm bảo băm các file tốt hơn sẽ có lợi cho tổng thể trong quá trình sản xuất, trong khi url-loader sẽ hỗ trợ giảm các yêu cầu của HTTP đối với các file URL ASSET không vượt quá một ngưỡng nhất định bằng cách đặt chúng dưới dạng URL base-64.
### Static
Đối với các nội dung sẽ không thay đổi, bạn có thể đặt chúng vào thư mục `static`  và webpack sẽ bỏ qua thư mục `static` và sẽ không xử lý bất cứ thứ gì trong đó (ví dụ: file favicon).

Trong code của bạn, sau đó bạn có thể tham chiếu các file từ root (/):

Xem sự khác biệt về cú pháp truy cập giữa thư mục static và thư mục assets:
```html
<!-- How to access static image from static directory --> 
<img src="/image.jpg"/> 

<!-- How to access webpacked image from assets directory --> 
<img src="~/assets/image.jpg"/>
 ```
### Pages
Có thể nói đây là một trong những thư mục quan trọng nhất của Nuxt, vì nó sẽ tự động tạo các route bất kỳ theo từng file `.vue` trong đó. Thư mục `pages` chứa các Views và Routers  cho ứng dụng của bạn. Nó sẽ mô tả tất cả những gì bạn cần để cấu hình dữ liệu và view cho một route cụ thể trong ứng dụng của bạn App Template, Layouts, Pages and HTML Head).

Tất cả các file .vue trong thư mục này đều cung cấp các tùy chọn như **asyncData, layout, middleware, auth, fetch, head, validate, scrollToTop** là tất cả những gì bạn cần để cấu hình dữ liệu và view cho bất kỳ route nào.

Đặc biệt, mặc định Nuxt CLI tạo ra file `pages/index.vue` và nó đóng vai trò là trang chủ của ứng dụng (trang index). Với sức mạnh này thì nó có thể tạo ra các URL thân thiện với SEO.
### Middleware
Middleware về cơ bản, nó chứa các hàm JavaScript tùy chỉnh chạy ngay trước khi một trang hoặc nhóm trang được hiển thị.
Ví dụ: Hãy tưởng tượng bạn muốn kiểm tra xem người dùng có thông tin đăng nhập phù hợp để truy cập một trang hay không. Trong trường hợp này, bạn có thể có thể tạo một file có tên `middleware/auth.js` chứa đoạn code bên dưới.

```javascript:js
export default function({ store }) {
  // some code to check user authentication
}
```

Tuy nhiên, nếu chỉ tạo một chức năng tùy chỉnh trong thư mục `middleware` sẽ không có tác dụng gì. Bạn phải cho Nuxt.js biết nơi mà bạn muốn áp dụng nó, nghĩa là trên tất cả các trang hoặc một vài trang được chọn hoặc một trang duy nhất.

Từ đây, bạn có thể sử dụng chúng theo những cách sau:
* Global middleware - (Thông qua file cấu hình Nuxt và ảnh hưởng đến tất cả các route)
```javascript:js
// nuxt.config.js 
export default {
  router: {
    middleware: 'auth'
  }
}
```
* Layout middleware (Thông qua layouts và ảnh hưởng đến nhóm các route tương ứng, tức là các trang sử dụng layouts đó chỉ được xem và truy cập bởi người dùng đã xác thực)
```markdown:js
// layouts/default.vue
export default { 
  middleware: 'authenticated-basic-plan-user' 
}
```
* Page middleware (Thông qua từng page và ảnh hưởng trên route gọi đến page đó)
```javascript:js
// pages/index.vue
export default { 
  middleware: 'subscribed'
}
```
### Components
Các components là các bit code độc lập và có thể tái sử dụng. Để nhập một component được lưu dưới dạng BarChart (tức là components/BarChart.vue) và sau đó gọi nó bằng tên BarChart trong một page (tức là pages/posts.vue), bạn viết như này:

```js
import BarChart from "~/components/BarChart";

export default {
    components: { 
    	BarChart
    },
}
```
Lưu ý rằng các thành phần trong thư mục này không có quyền truy cập vào asyncData.
### Layouts
Layouts được sử dụng để thay đổi giao diện ứng dụng của bạn. Một ứng dụng có thể có nhiều layouts ví dụ: admin layout, guest layout và registered clients layout. Các bố cục này sẽ được sử dụng lại trong các trang khác nhau để xử lý giao diện của chúng (sidebar, menu, footer, v.v.). Trong khi cài đặt, Nuxt CLI cung cấp mặc định `layouts/default.vue` layout và được sử dụng trong tất cả các trang.

Mỗi dự án được tạo Nuxt có một file default.vue trong thư mục layouts, với cấu trúc mẫu tối thiểu sau:
```html:html
<template>
  <nuxt/>
</template>
```
Thành phần </nuxt> rất quan trọng vì nó hiển thị các thành phần trang, tức là các file .vue của bạn từ thư mục pages.

Tất nhiên, bạn cũng có thể tạo layout tùy chỉnh của riêng mình, bao gồm cả trang lỗi. Do đó, để sử dụng  một instance layout có tên là admin (layouts/admin.vue) tại một page post (pages/posts.vue) , bạn sẽ viết:
```html:js
<template>
  <!-- Your template -->
</template>

<script>
export default {
  layout: 'admin'
  // page component definitions
}
</script>
```
### Plugins
Trong bất kỳ dự án Vue thông thường nào, bạn có thể đăng ký global các thư viện Vue trong file main.js. Tuy nhiên, file này không tồn tại trong ứng dụng Nuxt.js và do đó thư mục `plugins` sẽ làm điều này. 

Ví dụ: Vue plugin vue-notifications, cho phép bạn hiển thị thông báo trong ứng dụng của mình. Sau khi cài đặt qua npm hoặc yarn, bạn tạo file plugins/vue-notification.js chứa đoạn code bên dưới:
```python:js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

Nhìn cú pháp quen chưa kìa :D Sau đó, bạn phải tìm cách thông báo cho Nuxt.js rằng bạn đã cài đặt xong rồi và muốn sử dụng plugin này, bằng cách chỉnh sửa file `nuxt.config.js`. Dấu ~ có chức năng giống như ký tự @, nghĩa là nó tham chiếu đến thư mục gốc:
```javascript:js
export default {
  plugins: ['~/plugins/vue-notifications']
}

```
Vậy là xong rồi đó, về cơ bản thì bạn muốn dùng plugin nào thì cũng sẽ làm như bên trên vậy đó.
### Store
Nuxt được đóng gói sẵn với Vuex, nhưng nó sẽ không được kích hoạt trừ khi bạn tạo một store Vuex trong thư mục `store`.
Đây là thư mục rất đặc biệt cho bất kỳ data-driven project nào. Đây là nơi bạn có thể tạo một kho lưu trữ dữ liệu, cũng như xác định hành động `nuxtServerInit`. Đây cũng là vòng đời đầu tiên!
```go:js
const createStore = () => {
  return new Vuex.Store({
     ...
  })
}
```
Khi người dùng truy cập ban đầu vào ứng dụng của bạn, điều này giúp fill/update dữ liệu vào store. Nó cho phép bạn sử dụng modules, state, getters, mutations and actions giống như tiêu chuẩn trên ứng dụng Vue.js và cũng duy trì trạng thái dữ liệu của bạn trong suốt ứng dụng.
### Nuxt Configuration File
File `nuxt.config.js` chứa cấu hình tùy chỉnh Nuxt của bạn và cho phép bạn config cấu hình ứng dụng của mình, những cấu hình này bao gồm head title và associated styles và scripts, middlewares, plugins, authentication, modules và thậm chí cả các API.

-----

Như vậy qua bài này mình đã giới thiệu qua về cấu trúc thư mục cũng như các công dụng của từng thư mục trong NuxtJs. Qua bài nếu có thời gian nhiều hơn thì mình sẽ tìm hiểu sâu hơn về một số phần quan trọng của nó.
Cảm ơn các bạn đã đọc bài của mình, thank you!

-----

Tài liệu tham khảo:
https://nuxtjs.org/guide/directory-structure/