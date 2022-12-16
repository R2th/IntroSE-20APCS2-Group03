# Giới thiệu về VuePress
**VuePress** là một công cụ xây dựng web tĩnh (static page) được phát triển bởi Evan You, tác giả của Vue. VuePress được sinh ra để giảm thiểu thời gian xây dựng lên những trang blog, static web,.. khi mà không cần đến sự tương tác giữa client và server. Về căn bản thì website được xây dựng bằng VuePress là một SPA trên nền của Vue, Vue Router và webpack. Ngoài ra VuePress còn hỗ trợ cả **markdown**. Nếu các bạn đã từng viết Viblo thì chắc hẳn là không còn xa lạ gì với các cú pháp markdown này rồi. 

Những tính năng Vuepress hỗ trợ bao gồm:
- Hỗ trợ đa ngôn ngữ
- Hỗ trợ cú pháp Markdown
- Hỗ trợ Service Worker
- Xây dựng giao diện bằng các template của Vue
- Tích hợp sẵn Google Analytics
- Hỗ trợ PWA

Ngoài ra VuePress còn hỗ trợ nhiều thứ khác nữa, chi tiết hơn bạn có thể xem [ở đây](https://vuepress.vuejs.org/guide/#features).

# Cài đặt và chạy VuePress
## 1. Cài đặt
Để bắt đầu, khởi tạo thư mục và cài đặt VuePress bằng `yarn`:
```php
$ mkdir blog && cd blog
$ yarn init
$ yarn add vuepress
```
Ở trên mình dùng `yarn`, các bạn có thể làm tương tự đối với `npm`:
```shell
$ npm init
$ npm install --save vuepress
```
Sau khi chạy xong, trong thư mục sẽ xuất hiện file `package.json`, bạn hãy thêm vào đoạn code sau:
```swift
{
  ...
  "scripts": {
    "dev": "vuepress dev",
    "build": "vuepress build"
  }
  ...
}
```

Để kiểm tra quá trình cài đặt, chúng ta chạy lệnh sau:
```css
$ yarn dev

...
success [22:36:31] Build f46494 finished in 154 ms! ( http://localhost:8080/ )
```
Như vậy là web đã được chạy trên port 8080, thử truy cập vào http://localhost:8080/ xem sao

![](https://images.viblo.asia/f4445f96-f4f7-4454-9aa1-3e4ff9894155.png)

Sao nó lại như này? Cài bị sai ở đâu ư? Nô nô, lý do là chúng ta chưa có file `README.md`. VuePress có một thứ khá hay ho là nó tự tạo **route** dựa trên cấu trúc thư mục hiện có. Nếu ai đã từng làm việc với **Nuxt** thì sẽ thấy điều này khá là quen thuộc với cấu trúc thư mục trong *pages*. Để hiểu rõ hơn thì cấu trúc của nó sẽ kiểu như này:

| Path | Routing |
| -------- | -------- |
| README.md     | /     |
| posts/README.md     | /posts    |
| posts/vue-press.md     | /posts/vue-press     |

Hoặc để hiểu thêm về cách đánh routing theo cấu trúc thư mục này, bạn có thể đọc thêm docs của **Nuxt** [tại đây](https://nuxtjs.org/docs/2.x/features/file-system-routing).

Như mình đã nói ở trên là VuePress hỗ trợ Markdown, vậy nên chúng sẽ tự chuyển biên dịch toàn bộ các file `markdown` sang file `html`. Và theo mặc định VuePress sẽ đọc các file `README.md` và chuyển thành `index.html` tương ứng. Do đó, chúng ta sẽ tạo một file `README.md` ở thư mục gốc có nội dung như sau:
```markdown
---
home: true
---

# Hello VuePress
```
VuePress sẽ tự động nhận diện được những thay đổi ở thư mục hiện tại và sẽ complie lại. Quay trở lại http://localhost:8080/ chúng ta sẽ không còn gặp lỗi 404 nữa.

![](https://images.viblo.asia/79a4ae72-9f0b-406d-b341-c403475924bc.png)

## 2. Thiết lập cấu hình
VuePress cho phép ta thiết lập một vài thông số cơ bản thông qua file `config.js`, cấu trúc sẽ như sau:
```scala
.
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     └─ config.js
└─ package.json
```
Để tùy chỉnh cấu hình, chúng ta tạo thư mục `.vuepress` và tạo file `config.js` trong đó. Về cơ bản, những thuộc tính chúng ta có thể thay đổi là:
- title: tên của website, thứ sẽ xuất hiện ở trên thanh tab của trình duyệt
- description: giới thiệu về website
- head: danh sách các thẻ sẽ được đưa vào phần *head* của website
- locales: thiết lập chức năng đa ngôn ngữ
- host: mặc định là `0.0.0.0`
- port: port khi chạy dev server
- ...

Còn nhiều thứ nữa các bạn có thể tham khảo thêm [tại đây](https://vuepress.vuejs.org/config/).

Nội dung của file `config.js`:
```javascript
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  head: [
     ['link', { rel: 'icon', href: '/logo.png' }] 
  ],
  host: 'localhost', 
  port: 3000, 
}
```
Sau khi cài đặt thì VuePress đã được gắn sẵn cho một theme mặc định khá là đẹp, nhưng tùy vào mục đích cá nhân, bạn có thể tùy biến lại theo ý thích của mình bằng cách thêm thuộc tính `themeConfig` vào trong file `config.js`:
```javascript
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Viblo', link: 'https://viblo.asia', target:'_blank' }
    ]
  }
}
```
Để xem chi tiết hơn về config theme, các bạn có thể xem chi tiết hơn [tại đây](https://vuepress.vuejs.org/theme/default-theme-config.html#).

## 3. Thêm bài viết mới
Như mình đã nói ở phần trên, VuePress đánh route dựa trên cấu trúc của thư mục, thế nên chúng ta sẽ tạo một thư mục `posts` và tạo các file markdown trong thư mục này và chúng ta sẽ có đường linh như sau `/posts/abc-xyz.html`.
```markdown
// posts/expamle-markdown.md

---
title: A Simple Markdown
---

An h1 header
============

Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists
look like:

  * this one
  * that one
  * the other one

Note that --- not considering the asterisk --- the actual text
content starts at 4-columns in.

> Block quotes are
> written like so.
>
> They can span multiple paragraphs,
> if you like.

Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it's all
in chapters 12--14"). Three dots ... will be converted to an ellipsis.
Unicode is supported. ☺
```
Sau đó chúng ta truy cập vào `http://localhost:8080/posts/simple-markdown.html` để tận hưởng kết quả. Những nội dung trong file markdown đã được chuyển hóa thành `html`.

![](https://images.viblo.asia/cbe6833c-dc70-44cc-9e4b-3643244abbcd.png)

# Github Pages
## Build và publish 
Để build website thành các file html, bạn chạy lệnh:
```swift
$ yarn build
// or npm run build
```

Các file được build ra sẽ được để trong thư mục `.vuepress/dist`. Nhưng để xuất hiện được trên Github Pages, bạn cần thay đổi lại đường dẫn chút xíu, chúng ta sẽ đổi thư mục đích sau khi build thành `docs` thay vì `.vuepress/dist` vì Github Pages hỗ trợ trỏ đến thư mục `docs` nếu trong repo của bạn có thư mục đó. Chúng ta sẽ sửa lại file `config.js` như sau:
```javascript
module.exports  =  {
  dest: 'docs'
}
```
Rồi sau đó bạn chạy lại câu lệnh `yarn build` lúc nãy, các file được build ra giờ đã nằm trong thư mục `docs`.  Tiếp theo vào trang Settings - GitHub Pages - Source và chọn master branch /docs folder để bật tính năng Github Pages cho repo.

# Tổng kết
Trên đây mình đã trình bày sơ lược các tạo một trang static web bằng VuePress và Github Pages. Cách này hơi cồng kềnh trong việc thay đổi content tí khi cứ phải push lại code mới khi có content mới nhưng vì là static web mà, mình thấy hướng này khá là tiện rồi. 

Cảm ơn bạn đã đọc đến cuối bài viết của mình ^^.