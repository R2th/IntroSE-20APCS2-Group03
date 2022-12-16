Xin chào mọi người! :wave::wave::wave:

Chào mừng bạn đã đến với series/tutorial ***Lập trình Chrome extension với Typescript + Vue.js theo phong cách Viblo***. Mình tên là Kim, cũng là một trong các thành viên trong [Viblo Team](https://viblo.asia/o/viblo).  Rất hân hạnh được đồng hành cùng các bạn trong series này. Hãy cùng mình điểm qua lại các chức năng chính mà chúng ta sẽ xây dựng theo kế hoạch trong [bài viết trước](https://viblo.asia/p/GrLZDOmwKk0) nhé!

1. Hiển thị badge cảnh báo ngay trên Icon trên toolbar của browser.
2. Người dùng define các website cần waning, tên môi trường (production, staging, development).
3. Hiển thị warning bên trong các website đã được người dùng define.
4. Người dùng có thể chọn các kiểu hiển thị warning


Bây giờ, hãy cùng khởi tạo project để các bạn mường tượng được mọi thứ nhé!

##  Khởi tạo project với Vue CLI

Vue CLI là một command line tool giúp developer nhanh chóng cài đặt và tiếp cận Vue.js hơn. Phiên bản sử dụng trong bài viết này là version 4.x. Nếu bạn chưa cài đặt, hãy cài đặt nó thông qua NPM hoặc YARN nhé. Trong suốt series này mình sẽ sử dụng Yarn.

```bash
npm install -g @vue/cli@^4.0.0
# OR
yarn global add @vue/cli@^4.0.0

# Vertify
vue --version
@vue/cli 4.1.1
```

Bây giờ, chúng ta sẽ thực hiện tạo mới project Vue.js + Typescript nhanh chóng với Vue CLI, chạy lệnh sau:

```bash
vue create prodwarn
```

Trong đó, `prodwarn` là tên thư mục của project này, với ý tưởng từ cụm từ ***Production Environment Warning***. Bạn có thể gọi project này là *Prodwarn* nếu muốn.

Chúng ta cần lựa chọn một số feature mà Vue CLI support để generate ra code cho project. Chúng ta sẽ mất một vài phút cho các thiết lập này. Các phím tắt sẽ sử dụng gồm:
- Nhấn phím `SPACE` để chọn / bỏ chọn các feature đang.
- Nhấn `ENTER` để chuyển sang bước tiếp theo.
- Nhập `Y` tương ứng câu trả lời `YES` và `N` tương ứng với `NO` cho các lần confirm. Các lần confirm (`y/n`) sẽ có các câu trả lời mặc định được in hoa. VD: (y/N) thì nếu không nhập gì và nhấn `ENTER` tương ứng với chúng ta nhập là `N`.
- Di các tùy chọn qua phím điều hướng lên xuống.

Sau khi chạy lệnh, màn hình sẽ hiển thị:

![](https://images.viblo.asia/2fe8efce-2ca0-4821-9063-2ef4d8e184d0.png)


Do chúng ta sẽ sử dụng thêm TypeScript nên hãy chọn preset là **Mannually select features** và tích chọn các mục như sau cho mỗi step:
![](https://images.viblo.asia/ef7d4684-d74b-435f-b007-1fe630bbed91.png)

Theo đó:
- Chúng ta chọn các feature gồm:
    -  Babel, TS (TypeScript)
    -  CSS Pre-processors (SASS with dark-sass) để dùng SASS giúp việc viết CSS nhanh hơn
    -  Linter (Lint on commit) - Chạy eslint khi commit, các bạn có thể để là On save nếu muốn tự động check eslint ngay sau khi lưu file
- Use class-style component syntax: Vue.js có syntax để khai báo component bằng cách sử dụng `Vue.component` hoặc `Vue.extend` - tham khảo [tại đây](https://vuejs.org/v2/guide/typescript.html)

Sau khi các bạn thực hiện khởi tạo với các thông tin như trên thành công, hãy di chuyển vào thư mục root của project và run thử app này để đảm bảo là project đã được tạo thành công.

```bash
# move into project folder
cd prodwarn

# serve vue.js application in the browser with port 3000
yarn serve
```

![](https://images.viblo.asia/141381f9-1469-4098-bffe-2a05d6ec80ea.png)
![](https://images.viblo.asia/cc9f5b8d-fac7-4ec0-9638-f4fe5010d631.png)

Truy cập browser ở địa chỉ web mà terminal đã hiển thị: http://localhost:8080 bạn thấy nội dung như trên là đã thành công bước đầu tiên. Về cơ bản, chrome extension cũng là một JavaScript app, thế nên chúng ta chỉ cần đóng gói các file js, css lại thành file zip rồi publish lên Chrome WebStore. Khi cài đặt thì browser sẽ tải file zip này từ store về rồi giải nén trên máy người dùng để chạy.

## Build extension

Chúng ta tiếp tục build thử app Vue.js trên để chạy thử như một extension đúng nghĩa nhé! Chạy lệnh build `yarn build`:

```bash
$ yarn build
yarn run v1.19.1
$ vue-cli-service build

⠙  Building for production...Starting type checking service...
Using 1 worker with 2048MB memory limit
⠸  Building for production...

 DONE  Compiled successfully in 2239ms                                                                       10:40:25 PM

  File                                 Size               Gzipped

  dist/js/chunk-vendors.9b9db0da.js    102.17 KiB         36.27 KiB
  dist/js/app.9605921e.js              5.24 KiB           1.79 KiB
  dist/css/app.8b9b1f8b.css            0.35 KiB           0.24 KiB

  Images and other types of assets omitted.

 DONE  Build complete. The dist directory is ready to be deployed.
 INFO  Check out deployment instructions at https://cli.vuejs.org/guide/deployment.html
      
Done in 5.17s.

```

Các bạn sẽ nhận thấy một thư mục mới `dist` chứa toàn bộ các file js, css với cấu trúc như sau:

```bash
$ tree dist
dist
├── css
│   └── app.8b9b1f8b.css
├── favicon.ico
├── img
│   └── logo.82b9c7a5.png
├── index.html
└── js
    ├── app.9605921e.js
    ├── app.9605921e.js.map
    ├── chunk-vendors.9b9db0da.js
    └── chunk-vendors.9b9db0da.js.map

3 directories, 8 files

```

Các file bên trong chính là kết quả của quá trình build Vue.js. Chính vì thế nên chúng ta sẽ chỉ định browser tìm tới đây và nạp code của extension. Để kích hoạt extension, chỉ cần làm các bước theo hướng dẫn sau:
- Bật chế độ dành cho nhà phát triển (Developer Mode)
- Duyệt tới thư mục `prodwarn/dist` ở trên

![](https://images.viblo.asia/adc1800f-68f6-4082-87a1-fe0a6b90cd38.png)

Bạn sẽ nhận được một lỗi sau khi thự hiện do thiếu một file rất quan trọng với browser extension đó là `manifest.json`:

![](https://images.viblo.asia/00016ef8-0996-49a8-97bf-87a1fc8cfc12.png)

`manifest.json` là file chứa các thông tin quan trọng của một extension mà chúng ta khai báo để browser đọc. Hãy cùng mình chuyển sang phần tiếp theo để tạo file `manifest.json` nhé!


### Tạo file manifest.json

Để trình duyệt hiểu code Vue.js app trong thư mục `dist` của chúng ta ở trên là một browser extension thì chúng ta cần khai báo các thông tin bắt buộc về extension vào một file có tên là `manifest.json` ở root của project. Hãy tạo một file `/templates/manifest.json` với nội dung tạm thời như dưới đây nhé. MÌnh sẽ đi chi tiết về nó trong bài viết tiếp theo để các bạn hiểu rõ hơn về vai trò của nó:

```json:/templates/manifest.json
{
  "name": "Production Environment Warning",
  "description": "Warning when you are in the production site",
  "version": "0.1.0",
  "manifest_version": 2,

  "browser_action": {
    "default_icon": "static/images/logo-48.png",
    "default_popup": "index.html"
  },

  "icons": {
    "16": "static/images/logo-16.png",
    "32": "static/images/logo-32.png",
    "48": "static/images/logo-48.png",
    "128": "static/images/logo-128.png"
  }
}
```

Trong đó:
- `name`: Là tên của extension
- `description`: Là mô tả ngắn của extension
- `version`: Phiên bản
- `manifest_version`: Đây là khai báo bạn rằng nội dung file `manifest.json` tuân theo cấu trúc của version 2.
- `browser_action`: Khai báo *popup* của extension - là phần nội dung hiển thị khi click vào icon của extension trên thanh toolbar

![](https://images.viblo.asia/2dace4ad-7b01-4186-adaf-c8e12afb9ffa.png)

Vì `dist` là thư mục build nên chúng ta sẽ bị ignore khi dùng git. Do đó, các ảnh logo mình sẽ để trong thư mục `static/images`. Các bạn có thể tải các logo về [tại đây](https://github.com/kimyvgy/prodwarn/releases/download/69e0ad4/static.zip) và giải nén ra.

```bash
[22:37] prodwarn (master) $ tree ./ -I node_modules\|dist
./
├── babel.config.js
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── README.md
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   ├── main.ts
│   ├── shims-tsx.d.ts
│   └── shims-vue.d.ts
├── static
│   └── images
│       ├── logo-128.png
│       ├── logo-16.png
│       ├── logo-32.png
│       └── logo-48.png
├── templates
│   └── manifest.json
├── tsconfig.json
├── vue.config.js
└── yarn.lock

7 directories, 19 files

```

### Kích hoạt và chạy thử extension

Bây giờ hãy copy thư mục `static` chứa ảnh logo và file `templates/manifest.json` vào `dist` rồi thực hiện lại bước kích hoạt extension ở trên nha:

```
yarn build && cp -rf templates/manifest.json static/ dist/
```

![](https://images.viblo.asia/adc1800f-68f6-4082-87a1-fe0a6b90cd38.png)

Kết quả sau khi thực hiện, chúng ta đã kích hoạt thành công extension trên browser và một icon biểu tượng *warning* cũng sẽ hiển thị trên thành toolbar.

![](https://images.viblo.asia/a5dcc032-5f91-4983-aaa8-f55ceac11008.png)
![](https://images.viblo.asia/8ef86a24-f906-4fd0-9da2-086fdfb29526.png)

Trong quá trình develop, bạn có thể ***Rê chuột vào trong popup > click chuột phải > Inspect Element*** để bật Chrome Dev Tool như trong hình bên trên.

Như bạn thấy, app Vue.js của chúng ta đã hoạt động tốt khá tốt đẹp sau khi mình có bổ sung `min-width` của popup:

```javascript:src/App.vue
<style lang="scss">
#app {
  // ...
  min-width: 350px;
}
</style>
```

Tuy nhiên có một số vấn đề phát sinh đó là:
- Sau mỗi lần sửa code mình phải chạy lệnh `yarn build` để build lại Vue.js App hơi mất thời gian, nên nó tự động build mỗi khi file source code bị sửa thì sẽ hữu ích hơn.
- Sau khi build, file `manifest.json` và thư mục ảnh logo `static/images` đều sẽ bị xóa mất. Chẳng có lẽ anh em mình phải tự đi copy lại lần nữa. Nó nên là tự động copy luôn sau khi build thì tốt hơn.

Để khắc phục các vấn đề trên, mời các bạn đón đọc phần tiếp theo của mình nhé!

## TL;DR

Tiếp đây là một số tài liệu tham khảo cho anh em:
- [Chrome extension documentation](https://developer.chrome.com/extensions)
- [Vue CLI - Creating a project](https://cli.vuejs.org/guide/creating-a-project.html)
- [Source code - Lesson 01](https://github.com/kimyvgy/prodwarn/releases/tag/69e0ad4)


Nếu bạn thấy series này hay và hữu ích thì đừng quên [share](https://www.facebook.com/sharer.php?u=https%3A%2F%2Fviblo.asia%2Fs%2Ftao-chrome-extension-voi-typescript-vue-theo-phong-cach-viblo-pmleB8G95rd&title=Tạo%20Chrome%20extension%20với%20Typescript%20%2B%20Vue%20theo%20phong%20cách%20Viblo), upvote, follow mình để đón đọc các bài viết tiếp theo của mình trên Viblo nhé!

Bạn cũng có thể subscribe các tag về [Vue](https://viblo.asia/tags/vue) và [Typescript](https://viblo.asia/tags/typescript) trên Viblo để nhận được nhiều hơn nữa các bài viết mới nhất về các topic này trên Viblo nhé! Viblo sử dụng các dữ liệu mà bạn follow, quan tâm cho hệ thống gợi ý nên các bạn hãy follow những topic bạn yêu thích để hệ thống recommend thêm nhiều bài hay và bổ ích từ hàng nghìn bài viết trên Viblo mà bạn còn chưa từng đọc!

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***