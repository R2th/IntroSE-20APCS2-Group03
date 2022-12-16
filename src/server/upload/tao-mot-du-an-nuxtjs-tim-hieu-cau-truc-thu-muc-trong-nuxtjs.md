# Mở đầu
xin chào các bạn hôm nay mình sex giới thiệu cách tạo một dự án `Nuxtjs` và cấu trúc thư mục của dự án `Nuxtjs`. Vậy `Nuxtjs` là gì ??? . `Nuxtjs` là một framework dựa trên `Vuejs` giúp cho việc xây dựng và phát triển các ứng dụng web một cách nhanh chóng. Vì vậy các bạn cần học `Vue` trước khi tìm hiểu `Nuxjs` nhé :D. Sau đây mình sẽ chuyển sang tạo ra  dự án `Nuxtjs` đầu tiên.
# Cài đặt
Có 2 cách để tạo dự án `Nuxtjs` đó là: 

* npm
* yarn

**Lưu ý**: là khi cài bằng `npm` thì phải là `npm` từ `5.2.0` trở lên để nó có cú pháp là `npx`. Vì thế mình sẽ cài bằng `yarn` (vì mình quen dùng yarn hơn :D). Để cài đặt thì bạn chỉ cần chạy command 
```php
yarn create nuxt-app <project-name>
```
với `<project-name>` là tên project mà bạn muốn đặt. Cần phải đợi một chút để nó down cái `nuxt-app` về, và sẽ có một số câu hỏi như sau:

* Project name: tên project của bạn
* Programming language: ngôn ngữ phát triển có `JavaScript` và `TypeScript` mọi người quen cái nào thì chọn cái đó.
*  Package manager: `npm`, `yarn`, mình chọn `yarn` :D
*   UI framework: có rất nhiều, nhưng mình chọn `Tailwind CSS` vì thấy sử dụng nó khá ngon :v 
*   Nuxt.js modules : module để kết nối, các bạn chọn hết cho mình
*   Linting tools : công cụ để lint, cũng chọn hết
*   Testing framework: chọn cái để test, mình không dùng bao giờ nên chọn là `none`
*   Rendering mode: mình chọn `Universal`
*   Development tools: mình chọn `Jsconfig.json` vì mình dùng vscode
*   Continuous integration: mình chọn `none`
*   Version control system: chọn `git`

Ok thế bầy giờ chỉ cần chờ nó cài đặt nữa là xong. Sau khi nó cài xong thì bạn chỉ cần `cd` đến project đó và chạy 
```php
yarn dev
```
sau đó mở trinhg duyệt với địa chỉ `http://localhost:3000/` để xem kết quả nhé :v:
![](https://images.viblo.asia/d63e6fbb-27d3-4074-8627-ceb314ded907.png)

Đây là kết quả của mình :D. Tiếp theo sẽ là phần tìm hiểu cấu trúc thư mục trong dự án `Nuxtjs` nhé.
# Cấu trúc thư mục 
Đây là cấu trúc thư mục của dự án `Nuxjs` mình vừa tạo được 

![](https://images.viblo.asia/e11aedb3-9657-4008-b8ff-a6e494f891a3.png)

Có thể thấy là rất nhiều thư mục, các bạn có thể tìm hiểu chi tiết ở  [đây](https://nuxtjs.org/guides/get-started/directory-structure) nhé. Còn ở phạm vị bài này mình chỉ giới thiệu những thư mục chính thường gặp thôi.

* Assets directory: Chứa các mục chưa được biên dịch như ảnh, fonts, scss global...
* Components directory: Đơn giản là chứa các components
* Layouts directory: Chứa các layouts (mỗi trang lại có một layout và các layout không nhất thiết giống nhau, vd: layout phần đăng nhập sẽ khác layout phần contact... )
* Middleware directory: hiểu đơn giản là nó chứa các function được chạy trước khi các Components được chạy
* Pages directory: chứa các view của ứng dụng, mỗi một file tương đương  1 routes của ứng dụng.
* Plugins directory: chứa các plugin js thôi
* Static directory: chứa các file static được ánh xạ trực tiếp đến server
* Store directory: chính là phần vuex :v  
* Nuxt.config.js file: file cấu hình cho dự án Nuxtjs (vd như head có gì, title có gì ... các Plugins nào được chạy trước khi render ra trang...)
* Package.json File: quen quen nhỉ hình như trong `Nodejs` cũng có file này :D, tương tự thôi nó cũng chứa các dependencies và scripts cho ứng dụng của bạn.

# Kết luận
Vậy là mình đã giới thiệu xong về cách tạo một dự án Nuxjs và giới thiệu các thư mục trong dự án Nuxtjs vừa tạo. Ở phần tiếp theo mình sẽ giới thiệu về `routes` trong Nuxtjs khá là ảo diệu đấy nhé. Bài viết của mình xin dừng lại ở đây, mọi người có đóng góp hay bổ sung gì thì hãy comment xuống bên dưới để mình hoàn thiện bài viết hơn nhé. Cảm ơn các bạn đã theo dõi.