# Sơ lược về VuePress
Đối với cá nhân bất cứ ai thì chắc hẳn ai hầu như cũng muốn sở hữu cho mình những trang blog hay những trang giới thiệu CV của bản thân. Trong bài này mình xin giới thiệu với các bạn một công cụ để làm việc này vừa nhanh vừa tiện lại còn xịn đó là **VuePress**.

**VuePress** sinh ra để giảm thiểu thời gian xây dựng những trang blog, static web(những trang web mà không có sự tương tác giữa client-server). VIệc cần thiết nhất để bạn có thể sử dụng được **VuePress** có lẽ là việc sử dụng **markdown**. Nếu như bạn từng viết các bài viết trên **Viblo** rồi chắc các bạn cũng không còn lạ lẫm với **markdown**. Với cú pháp **markdown** này thì **VuePress** biên dịch sang HTML hộ các bạn. Ngoài ra chúng ta cũng có thể tùy chọn ngôn ngữ trên trang web của mình, đồng thời **VuePress** cũng hỗ trợ chúng ta giao diện mặc định khá dễ dùng và bắt mắt.

# Cài đặt
Để cài đặt project **VuePress** các bạn cứ bám theo documents của nó thui.
```bash
mkdir project-vuepress && cd project-vuepress #tạo và di chuyển vào thư mục để khởi tạo project
yarn init
yarn add -D vuepress # cài đặt vuepress vào project
```
Ở trên là mình sử dụng **yarn** để khởi tạo, các bạn cũng có thể làm tương tự đối với **npm**.

Khởi tạo xong project thì điều đầu tiên nghĩ tới là làm sao để chạy được dự án. Có một thứ khá hay ho trong **VuePress** đó là tự động tạo **route** theo cấu trúc file chúng ta tạo. Nếu ai đã từng làm việc với **Nuxt.js** thì nó cũng na ná thế ở phần tạo route. Nôm na nó sẽ như thế này.

|Relative Path | Routing|
|------------------------|------------------|
|`README.md	`|`/`|
|`blogs/README.md`|`/blogs`|
|`config.md`|`/config.html`|


Biết được cách định nghĩa route của nó rồi thì việc chúng ta cần làm là tạo ra file `README.md` để sinh route thôi.
```bash
mkdir docs && echo '# Hello VuePress' > docs/README.md # tạo thư mục chứa các file README và điền dữ liệu vào
```

Để chạy được các bạn vào file `package` thêm đoạn nhỏ này 
```json
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
}
```
sau đó chạy `yarn dev` và vào [http://localhost:8080/](http://localhost:8080/) lên sẽ thấy chữ `Hello VuePress` được in ngay ngắn trên trình duyệt nhé. Đây cũng sẽ là giao diện mặc định mà **VuePress** làm cho chúng ta, để cấu hình thêm những thứ khác cho trang web hãy chúng ta sẽ xem lần lượt các thứ dưới đây.

# Vài thứ hay ho

## Cấu hình cơ bản
Nếu không có những cấu hình thì trang web của chúng ta sẽ khá thô sơ và đơn giản, để làm những điều đặc biệt hơn chúng ta cần phải cấu hình cho chúng.

Trong **VuePress** để cấu hình cần tạo thư mục `.vuepress`, bên trong thư mục này tạo file `config.js` để viết config. Cùng điểm qua một lượt các cấu hình đáng chú ý.

> Chú ý : Mình sẽ tham khảo luôn giao diện của trang chủ của VuePress để làm luôn cho có cái nhìn trực quan nhé.


```javascript:config.js
module.exports = {
    title: 'My blogs write by VuePress',
    description: 'My description', 
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }] 
    ],
    host: 'localhost', 
    port: 3000, 
}
```
* **title**: Tiêu đề của trang web sẽ được đặt mặc định ở thanh nav menu trên cùng
* **description**: định nghĩa thẻ meta tag trong thẻ head
* **head**: định nghĩa thêm các thẻ bên trong thẻ head, tương ứng với các giá trị truyền vào là [tagName, { attrName: attrValue }, innerHTML?]
* **host**: định nghĩa host được sử dụng ở môi trường dev
* **port**: định nghĩa port được sử dụng để chạy môi trường.
## Sử dụng Vue trong Markdown
Vì **VuePress** được thiết kế dựa trên **Vue.js** thì tất nhiên là chúng ta sẽ có những tính năng viết dựa trên **Vue.js**.  Chúng ta có thể sử dụng các **interpolation**, **directive**, **escaping** hay thậm chí là cả **components**.
```javascript
{{ 1 + 1 }}
/* Kết quả */
2
-----------------------------------
<span v-for="i in 3">{{ i }} </span>
/* Kết quả */
1 2 3
```

Để sử dụng **components** trong **VuePress**, chúng ta định nghĩa các file **\*.vue** ở bên trong `.vuepress/components`.
```
└─ .vuepress
   └─ components
      ├─ demo-1.vue
      ├─ OtherComponent.vue
      └─ Foo
         └─ Bar.vue
```
thì khi gọi các **component** trong **markdown** sẽ như thế này
```
<demo-1/>
<OtherComponent/>
<Foo-Bar/>
```

## Đa ngôn ngữ
Cũng như bao trang web khác thì việc có thể sử dụng được nhiều ngôn ngữ trong website cũng là một điều khá thú vị, chúng ta có thể có được nhiều traffic hơn nếu như trang web của mình có nhiều ngôn ngữ để tiếp cận tới nhiều người. **VuePress** cũng sẽ giúp chúng ta làm điều này.
```javascript:config.js
module.exports = {
  locales: {
    '/': { // link mặc định sẽ sử dụng ngôn ngữ này
      lang: 'en-US', //
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器'
    }
  }
}
```
để có thể sử dụng được đa ngôn ngữ trong **VuePress** bạn cần phải đáp ứng được cấu trúc file như sau, đó là cần phải tạo ra những file tương ứng với ngôn ngữ đã cấu hình.
```
docs
├─ README.md
├─ foo.md
├─ nested
│  └─ README.md
└─ zh
   ├─ README.md
   ├─ foo.md
   └─ nested
      └─ README.md
```
## Cấu hình giao diện mặc định
### Nav menu
Chúng ta có thể thêm các items khác trên **nav menu**
```javascript:config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
      { text: 'help', link: '/help/' },
    ]
  },
}
```
Chúng ta cũng có thể sử dụng các thuộc tính khác như trong thẻ `a` bình thường như `target="_blank"`, `target:'_self'`, `rel: false`...
```
{ text: 'help', link: '/help/',  target="_blank"}
```
Hay hơn nữa cũng có thể tạo thêm các dropdown menu
```javascript:config.js
{
        text: 'Product',
        items: [ /* Tạo dropdown menu */
          { text: 'Book', link: '/' },
          { text: 'Pen', link: '/' },
        ]
 }
```

### Sidebar
Tạo thêm một chút **side bar** thêm sinh động
```javascript:config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Group 1', 
        path: '/foo/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/'
        ]
      },
    ]
  }
}
```
* **title**: Tên của item menu, cái này bắt buộc có
* **path**: Link tới item menu đó
* **collapsable**: Mặc định sẽ tự động thu gọn các nested link, nếu bạn để là false thì nó sẽ luôn luôn mở các nested link ra
* **sidebarDepth**: Mặc định là 1, đây là chiều sâu của các nested link bên trong cái page đó, tương ứng các giá trị như h2, h3. Nếu bạn nào viết viblo sẽ để ý đến các nested link này ở phần **Table of contents**.

![](https://images.viblo.asia/f2ff02c5-ea8b-4da6-ab1a-cdeb45aa12b8.png)


### Search Box
Mặc định khi bạn chạy ứng dụng lên thì **VuePress** đã tích hợp sẵn ô tìm kiếm này.
```javascript:config.js
module.exports = {
  themeConfig: {
    search: false, /* Set bằng false nếu bạn muốn disable cái search box đi */
    searchMaxSuggestions: 10 /* Hiển thị số lượng các gợi ý tìm kiếm */
  }
}
```
Cũng có thể tạo **placeholder** cho **box search** này
```javascript:config.js
module.exports = {
  themeConfig: {
    searchPlaceholder: 'Enter your keyword'
  }
}
```
### Last updated dựa trên Git
**VuePress** sẽ tự động lấy timestamp của file commit cuối cùng trên repo của bạn để hiển thị giống ở phần footer trang chủ của **VuePress** giống như thế này.
![](https://images.viblo.asia/ed92977b-1ec4-4012-a4ec-afe2e4235462.png)
Khá là hay ho ở tính năng này nhỉ. Để làm được điều này bạn chỉ cần đoạn nhỏ config như sau là ngon ngay.
```javascript:config.js
module.exports = {
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
  }
}
```
Mắc định sẽ không có tính năng này, nếu như bạn đặt giá trị của **lastUpdated** là một string, nó sẽ hiển thị phía trước thời gian thay đổi theo như trên git của bạn.

## Plugins
Ngoài ra **VuePress** cung cấp cho chúng ta khá nhiều **plugins** hay ho khác mà các bạn có thể tìm hiểu thêm ở [đây](https://vuepress.vuejs.org/plugin/#examples) nếu như các bạn muốn tìm hiểu.

Giả sử bạn sử dụng plugin [@vuepress/plugin-back-to-top](https://vuepress.vuejs.org/plugin/official/plugin-back-to-top.html).
Để add plugin vào dự án 
```bash
yarn add -D @vuepress/plugin-back-to-top
```
sau đó thêm vào `config.js` để sử dụng nó.
```javascript:config.js
module.exports = {
  plugins: ['@vuepress/back-to-top']
}
```

## Thành quả
Cuối cùng, bạn chỉ cần lấy một bài ví dụ trên **Viblo** và copy vào file trong project của bạn là có một trang web đẹp như tranh rồi, cải thiện tí nữa là giống hệt trang document của **VuePress** luôn =))
![](https://images.viblo.asia/b60eb2ef-9a01-423a-b640-650ca83e89b4.png)

Và đây sẽ là thành quả.
# Kết luận
Trên đây mình chỉ demo sương sương một vài các tính năng phổ biến trong **VuePress** làm sao để xây dựng một trang blog nhanh nhất có thể. Để có thể hiểu sâu xa hơn các bạn hãy đọc documents của nó và tìm tòi thêm các tính năng hay ho nhé.
Source code mình để tại đây cho những ai muốn tham khảo nhé : [https://github.com/imphunq/vuepress-demo](https://github.com/imphunq/vuepress-demo)