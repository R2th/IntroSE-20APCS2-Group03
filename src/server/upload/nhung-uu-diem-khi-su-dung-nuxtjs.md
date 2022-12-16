![Nuxt.js](https://images.viblo.asia/696c5301-3440-45a6-a9e9-0972725f3c5f.png)

Theo định nghĩa của wiki:
>Nuxt.js là một web framework mã nguồn mở miễn phí dựa trên Vue.js, Node.js, Express.js, Webpack và Babel.js. Framework này được quảng cáo là "siêu framework cho các universal app". [Wikipedia](https://g.co/kgs/vaELhm)
>


Thực tế, Nuxt.js là một framework bậc cao của Vue. Nó giúp đơn giản hóa việc phát triển các universal hoặc single page Vue app.

Nuxt.js tối giản hóa từng chi tiết phía client và server, vì vậy bạn có thể tập trung vào việc phát triển ứng dụng một cách xuyên suốt và uyển chuyển nhất. Do đó, bạn có thể lựa chọn nuxt như là một project chính. Chúng ta hãy tìm hiểu các ưu điểm của Nuxt trong bài này.

# 1. Tạo universal app một cách nhanh chóng.

*Universal app là gì?*
> Universal app để miêu tả code Javascript có thể chạy được trên cả 2 phía client lẫn server, nó cũng được coi là Single-page Application, nhưng thay vì chỉ có một file rỗng `index.html`, bạn phải preload app của mình trên một web server, web server này trả về các HTML element cho mọi route để tăng thời gian tải trang cũng như cải thiện SEO.

Phát triển universal app khá tẻ nhạt vì bạn phải thực hiện rất nhiều cấu hình ở cả phía server và phía client.

Đây là vấn đề mà Nuxt.js nhắm đến để giải quyết cho các ứng dụng Vue. Nuxt.js giúp bạn dễ dàng chia sẻ code giữa client và server để bạn có thể tập trung vào logic của ứng dụng.

Nuxt.js cung cấp cho bạn quyền truy cập vào các thuộc tính như `isServer` và `isClient` trên các component để bạn có thể dễ dàng quyết định xem bạn đang hiển thị nội dung nào đó trên client hay trên server. Ngoài ra còn có các component đặc biệt như `no-ssr` được sử dụng để chặn component render phía server.

Nuxt cung cấp cho bạn quyền truy cập vào phương thức `asyncData` bên trong các component của bạn, bạn có thể sử dụng để lấy dữ liệu và hiển thị nó ở phía server.

# 2. Generate static version của Vue app


Bạn có thể tạo ra 1 static webpage từ Vue app của mình chỉ với câu lệnh `nuxt generate`.
Ví dụ bạn có các `pages` sau ở Nuxt:
```
-| pages/
----| about.vue
----| index.vue
```

Sau khi chạy câu lệnh generate static file, bạn sẽ có các static page ở thư mục sau:
```
-| dist/
----| about/
------| index.html
----| index.html
```

# 3. Cài đặt Nuxt app dễ dàng, thống nhất với cộng đồng.

Đối với những người bắt đầu với react, bạn sẽ bối rối về việc sắp xếp các thư mục trong project làm sao cho chuẩn chỉnh và khoa học, nếu bạn tìm thấy `react-boilerplate`, nó cũng tốn của bạn một khoảng thời gian để làm quen với cấu trúc thư mục. Nhưng với Nuxt, ngay từ khi bắt đầu bạn đã có một boilerplate với cấu trúc thư mục rất dễ tiếp cận cũng như mở rộng thêm.

Để bắt đầu project mới, bạn cài `vue-cli` và chạy câu lệnh sau:
```
$ vue init nuxt-community/starter-template <project-name>
```

Cấu trúc thư mục như sau:
```
-| assets
-| components
-| layouts
-| middleware
-| pages
-| plugins
-| static
-| store
-| .editorconfig
-| .eslintrc.js
-| .gitignore
-| README.md
-| nuxt.config.js
-| package.json
```

Bạn có thể thấy, cấu trúc thư mục so với một Vue application thực sự rất dễ hiểu cho tất cả mọi người:

![](https://images.viblo.asia/3130c27e-a50f-4987-af47-8de99883713c.png)

# 4. Vue + webpack + Babel = Nuxt.js

Bạn không cần phải config nhiều với Nuxt app, tất cả đều đã có sẵn trong Nuxt, xem thêm các features mặc định tại chính repo của Nuxt ở đây: https://github.com/nuxt/nuxt.js#features

* Automatic transpilation and bundling (with webpack and babel)
* Hot code reloading
* Server-side rendering OR Single Page App OR Static Generated, you choose fire
* Static file serving. `./static/` is mapped to `/`
* Configurable with a `nuxt.config.js` file
* Custom layouts with the `layouts/` directory
* Middleware
* Code splitting for every `pages/`


![](https://images.viblo.asia/3fad48a6-d453-4a79-92cd-8aef0d6367c1.png)

# Kết

Tất cả các tính năng trên làm cho việc phát triển các ứng dụng Vue.js trở nên nhanh chóng và dễ tiếp cận với mọi người hơn. Ngay cả khi bạn không cần universal app và muốn sử dụng SPA, Nuxt.js vẫn đáp ứng đủ nhu cầu của bạn.