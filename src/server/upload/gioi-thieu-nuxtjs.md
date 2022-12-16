Xin chào mọi người, hôm nay mình sẽ giới thiệu về nuxt js, nội dung bài viết gồm những phần sau đây
1. Nuxt.js là gì?
2. Tính năng nổi bật của nuxt.js
3. Xây dựng ứng dụng demo
4. Cấu trúc thư mục
# Nuxt.js là gì ?
Nuxt.js là:
* Một framework sử dụng để xây dựng các ứng dụng từ Vue.js.
* Được cấu hình sẵn những thứ cần thiết (Asynchronous Data, Middleware, Layouts...) để giúp cho việc phát triển ứng dụng dễ dàng hơn.
* Có thể chạy trên server lẫn client.
# Tính năng nổi bật
**Cấu trúc thư mục rõ ràng** <br>
Viết code trên các file .vue<br>
Chia website ra thành nhiều trang, mỗi trang là một file riêng<br>
Chia layouts, components, plugins ... giúp code dễ bảo trì và tái sử dụng.<br>
**Server-Side Rendering (SSR) và Routing system**<br>
Hỗ trợ SSR bằng cách cung cấp một số hàm để thao tác khi lấy dữ liệu, render view ...<br>
Routing theo convention là tên file, hỗ trợ dynamic routes, nested routes ... (sử dụng vue-router).<br>
**Transpilation, bundling, minifying**<br>
Biên dịch code ES6/ES7 để có thể chạy được trên các trình duyệt chưa hỗ trợ ( sử dụng Babel ).<br>
Bundling & minifyling code HTML, css & js (sử dụng webpack và một số thư viện đi kèm).<br>
**Một số tính năng khác**<br>
* Môi trường dev với webpack-based hỗ trợ Hot Module Replacement (HMR)<br>
* Có thể implement với Express hoặc những Node.js HTTP server khác<br>
* Dễ dàng customize với Babel và Webpack config<br>
* Automatic Code Splitting<br>
* Đóng gói và nén js, css<br>
* Quản lý các thẻ ở phần head (vue-meta)<br>
* Hot reloading in Development<br>
* Pre-processor: SASS, LESS, Stylus, etc<br>
* ...<br>
# Xây dựng ứng dụng demo
Trước hết bạn cần cài đặt vue-cli, nếu đã cài rồi thì bạn bỏ qua bước này<br>
`npm install -g vue-cli`<br>
Vào thư mục đặt project và chạy lệnh để cài đặt<br>
`vue init nuxt-community/starter-template name-project`<br>
sẽ có vài câu hỏi về tên projetc, và description thì bạn cứ enter thôi:<br>
kết quả sẽ như này :<br>
![](https://images.viblo.asia/8852d162-0233-4f80-ad9b-c282a5435126.png)
Bạn làm theo hướng dẫn để run project lên thôi<br>
```
cd name-project
npm run dev
```
Mặc định prj sẽ chạy ở cổng 3000, bạn mở trình duyệt localhost:3000 lên xem nhé.<br>
# Cấu trúc thư mục
Sau khi cài đặt thành công prj trên thì ta sẽ có cấu trúc thư mục của prj như sau:
![](https://images.viblo.asia/644eecdd-9c3e-43f6-af9f-a4a44e9bea4e.png)
* Thư mục Assets <br>
Chứa những tài nguyên chưa được biên dịch như  Stylus, Sass, images, hoặc fonts
* Thư mục Components<br>
Chứa các components của vue.js
* Thư mục Layouts <br>
Chứa các layout (giao diện) cho ứng dụng
* Thư mục Middleware<br>
Chứa Middleware của ứng dụng, middleware cho phép bạn định nghĩa function bảo vệ cho các page, Middleware sẽ tự động được chạy trước khi giao diện được render ra.
* Thư mục Pages <br>
Thư mục này chứa các view của ứng dụng cũng như định nghĩa routes cho ứng dụng luôn.
* Thư mục Plugins <br>
 Chứa các javascript plugins
* Thư mục Static<br>
Chứa các file tĩnh như các file ảnh chẳng hạn, được map tự động, ví dụ file /static/logo.png sẽ là yoursite/logo.png
* Thư mục Store <br>
Chứa các file của Vuex Store
* File nuxt.config.js<br>
Chứa các cấu hình được thiết đặt cho ứng dụng của bạn
* File package.json<br>
chứa các dependencies và scripts
#  Kết bài
Nếu bạn đã tìm hiểu về Vuejs thì Nuxt.js là framework đáng để bạn học ngay bây giờ. Cảm ơn mn đã đón đọc.