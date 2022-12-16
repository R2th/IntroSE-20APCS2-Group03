# Giới thiệu 
Nuxtjs là một framework sử dụng để xây dựng các ứng dụng từ Vue.js . Vì vậy điều kiện đầu tiên để tìm hiểu Nuxtjs là bạn phải tìm hiểu về vuejs trước.
Một số tính năng nổi bật của Next.js:
* **Mặc định đã được render phía server**
* **Tự động split code để load page nhanh hơn**
* **Đơn giản hóa routing phía client (page based)**
* **Môi trường dev với webpack-based hỗ trợ Hot Module Replacement (HMR)**
* **Có thể implement với Express hoặc những Node.js HTTP server khác**
* **Dễ dàng customize với Babel và Webpack config**
# Cài đặt
Để Cài đặt thì chúng ta có 2 cách : 
* Dùng tool [create-nuxt-app](https://github.com/nuxt/create-nuxt-app)
* Dùng nxp 

Ở đây mình sẽ dùng nxp để cài đặt nuxtjs: 
```
$ npx create-nuxt-app <project-name>
```
Hoặc qua yarn : 
```
$ yarn create nuxt-app <project-name>
```

Trong quá trình cài đặt nó sẽ hỏi bạn 1 số thông tin như: 

* **Chọn server-side frameworks**
* **Chọn UI framework ưa thích của bạn**
* **Chọn testing framework**
* **Chế độ nuxt mà bạn muốn chọn**
* .....

Sau khi chọn xong các thứ các thứ thì done. Để chạy được app chúng ta cd vào project sau đó chạy lệnh : 
```
npm run dev
```

Sau khi chạy lệnh này xong thì mở trình duyệt và kiểm tra thành quả ở  http://localhost:3000.

![](https://images.viblo.asia/c34af29f-0f21-4c3e-95c2-d5bad76eb4d2.png)

# Cấu trúc thư mục
## Assets Directory
* Thư mục asset Chứa tài nguyên chưa được biên dịch như: Stylus hoặc Sass files, images, hoặc fonts
## Components Directory
* Thư mục components chứa các file vuejs của bạn

## Layouts Directory
* Thư mục Layouts Chứa các layout (giao diện) cho ứng dụng
## Middleware Directory
* Thư mục Middleware Chức Middleware của ứng dụng, middleware cho phép bạn định nghĩa các function được chạy trước khi render 1 page hoặc nhóm page.
## Pages Directory
* Thư mục Pages Thư mục này chứa các view của ứng dụng cũng như định nghĩa routes cho ứng dụng.
## Plugins Directory
* Thư mục Plugins chức các plugin js
## Static Directory
* Thư mục statis Chứa các file tĩnh như các file ảnh chẳng hạn, được map tự động ví dụ file /static/logo.png sẽ là yoursite/logo.png
## Store Directory
* Thư mục store chứa các file vuex store
## nuxt.config.js File
* File nuxt.config.js Chứa các cấu hình được thiết đặt cho ứng dụng của bạn
## package.json File
* File package.json Quá quen thuộc rồi nó chứa các dependencies và scripts.
> Chú ý không được đổi tên file này
## Aliases
| ALIAS | DIRECTORY |
| -------- | -------- |
| ~ or @     | srcDir     |
| ~~ or @@    | rootDir     |

* Trong file vue template của bạn, nếu bạn cần link trong thư mục assets hoặc static chúng ta sẽ sử dụng ***~/assets/yourimage.png*** và **~/static/your_image.png**


> Mình xin tạm dừng bài viết ở đây. bài này mình đã giới thiệu cách cài đặt và giới thiệu qua câu trúc thư mục NUXT . Bài sau mình sẽ tìm hiểu về routing. cảm ơn các bạn đã đọc hết bài viết.
> Yêu hay không yêu xin để lại 1 comment ạ.