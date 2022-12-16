## Mục lục
- Giới thiệu
- Cài đặt
- Các khái niệm về SSR, SEO khi làm việc với Nuxt.js
- Tìm hiểu về cấu trúc thư mục
- Routing and Route Protection
- Method AsyncData và fetch
- Import dependencies
- Source code

## Nội dụng
#### Giới thiệu
Xin chào tất cả mọi người, hôm nay mình sẽ giới thiệu về một framework. Đó là `Nuxt.js`, một framework sử dụng để xây dựng các ứng dụng từ Vue.js. <br>
Giới thiệu qua một chút thì `Nuxt.js` được ra đời vào 25/10/2016 bởi zeit.co. <br>
Các bạn nếu ai code `ReactJs` rồi, nếu có tìm hiểu chắc cũng sẽ biết đến `Next.js`. Thì thằng `Nuxt.js` này nó cũng gần tương tự như vậy. <br>Vậy điều kiện để tìm hiểu và học được framework này đó là bạn nên tìm hiểu một chút về `Vue.js` trước.
<br>
Hiện này thì phiên bản mới nhất của Nuxt.js là v1.4.2. Các bạn có thể xem thêm một số thông tin về `Nuxt.js` tại [Github about Nuxt.js](https://github.com/nuxt/nuxt.js) hoặc tại trang chủ của [Nuxt.js](https://nuxtjs.org/guide#what-is-nuxt-js-) <br>
Giới thiệu thế thôi =))) giờ mình vào phần cài đặt nào.
#### Cài đặt
Đầu tiên bạn phải cài đặt `vue-cli` như sau:
```shell
$ npm install -g vue-cli
```

Mở ternimal lên, chạy command:
```markdown
$ vue init nuxt-community/starter-template nuxtjs-viblo
```
Với nuxtjs-viblo là tên project của mình. Sau đó bạn tạm thời không cần quan tâm mấy cái nó hỏi kia. Cứ enter mấy cái là được.

Xong rồi, giờ chạy thử nên xem nó có gì nhỉ. 
```shell
$ cd nuxtjs-viblo
$ npm run dev
```
Các bạn mở trình duyệt `localhost:3000` lên xem nhé.
### Ví dụ
#### Cài đặt
```markdown
vue init nuxt-community/starter-template nuxtjs //nuxtjs là tên của project mà mình đặt
```
Sau đó bạn chỉ việc chạy
```shell
$ cd nuxtjs
$ npm install
```
À, nhớ check lại xem trên máy của bạn đã có vue-cli chưa nhé, nếu chưa, hãy cài đặt như sau: 
```markdown
npm install -g @vue/cli @vue/cli-init
```
Xong rồi, giờ chạy 
```shell
$ npm run dev
```
và mở trình duyệt với địa chỉ `localhost:3000`và bạn sẽ thấy ứng dụng của bạn đã được chạy rồi đó. 

#### Các khái niệm về SSR, SEO khi làm việc với Nuxt.js
##### SSR là gì?
SSR - Server Side Rendering chính là việc mà dữ liệu sẽ được render bởi Server.
Ngày nay, các SPA được phát triển từ các JS Framework như Vue hay React thì nhiều vô kể, nhưng SSR hiện tại vẫn có chỗ đứng của nó, vì một số lợi ích mà nó mang lại như load dữ liệu nhanh hơn, và đặc biệt là nó giải quyết được bài toán `SEO`, còn SPA thì không được như vậy.
#### SEO là gì?
Thử lên search gu gồ, thì ta lại thấy được rất nhiều kết quả, vào xem thì lại thấy mấy cái như Craw, Index, Google Bot, bla bla.. :D <br>
Thế thực chất `SEO` nó liên quan gì đến Nuxt.js nhỉ. 
Thì mình xin lấy một cái ví dụ để diễn giải như sau cho nhanh và dễ hiểu. Bây giờ các bạn lên mạng, hoặc kiếm đâu 1 cái SPA do bạn đã có. Các bạn vào xem và chuột phải -> Page view Source thì nó chỉ trả về cho bạn một file html rỗng. Mà cách `SEO` mà Google làm ra thì lại chính là việc sẽ tìm kiếm content trong các trang rồi sau đó sẽ tiếp tục xử lý. Cơ mà content của bạn không có gì cả thì đây chắc chắn là một vấn đề, một bài toán cần phải giải quyết rồi.
<br>
Với Nuxt.js, sử dụng SSR, bạn có thể yên tâm về vấn đề này. Tại Request đầu tiên, nó sẽ trả về cho bạn một file html có đầy đủ thông tin. Từ Request thứ 2, thì dữ liệu sẽ là Json. Vậy là Nuxt.js nó đã giải quyết thành công vấn đề này. Giờ ta sẽ quay lại và tìm hiểu về cấu trúc thư mục của Nuxt.js nhé.
#### Cấu trúc thư mục
##### Assets
Đây là nơi mà bạn sẽ chứa các file được build bởi webpack, các file như css, scss, global JS, hoặc các images.
##### Static
Trái với assets, nơi đây sẽ chứa các tài nguyên không được đóng gói bởi webpack. Nó sẽ được tự động lấy ra và tự động truy cập đến khi gọi. 
Ví dụ: 
```markdown:html
<img src="/images1.png"/> //như này là lấy ra từ static folder
<img src="~/assets/images1.png"/> //còn đâu như này là lấy ra từ assets folder
```
##### Pages
Đây là nơi sẽ chứa các Application Views cũng như route của bạn. Mỗi file `.vue` sẽ tương ứng với một router. 
##### Components
Nơi đây sẽ chứa các file Vue.js components, là các Component mà các file Vue trong thư mục sẽ gọi và sử dụng. 
##### Middleware
Nơi này sẽ chứa các middleware cho ứng dụng của bạn. Bạn có thể custom các middleware này một cách khá đơn giản. Middleware sẽ tự động được chạy trước khi giao diện được render ra. Việc khai báo middleware cũng rất đơn giản.
Ví dụ để khai báo một middleware có tên là test.js, chỉ cần vào page mà bạn muốn sử dụng middleware này và khai báo: 
```javascript
export default {
    middleware: 'test'
}
```
##### Plugins
Ở đây các bạn có thể import các plugins trước khi khai báo chúng trong file root của ứng dụng. 
##### Layouts
Chứa layouts của ứng dụng. Mặc định app của bạn sẽ được extends thì layouts `default.vue`
##### Store
Nuxt.js xây dựng các ứng dựng Vue. Vậy nên vuex là một phần không thể thiếu. Store sẽ chứa các file js. Mỗi file js là một store trong app của bạn. Chỉ cần install vuex là có thể sử dụng được.
##### nuxt.config.js
Đây là nơi chứa các thông tin về cấu hình , khai báo các dependencies trong ứng dụng. 
#### Route and routing and protection
Giờ bạn hãy vào file pages/index.vue và sửa lại như sau:
```javascript
<template>
    <h1>Viblo xin chào mọi người!</h1>
</template>
```
Quay lại trình duyệt xem.
À, Hay nhỉ =)))<br>
Tiếp theo, mình sẽ hướng dẫn các bạn tạo một SPA đơn giản nhé.
Nếu bạn còn nhớ việc sử dụng Vue-router. Việc tạo các page trong một SPA sẽ cơ bản như sau:
```javascript
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/about',
      name: 'About',
      component: ListTeam
    }, {
      path: '/player/list',
      name: 'listPlayer',
      component: ListPlayer
    }, {
      path: '/manager/list',
      name: 'listManager',
      component: ListManager
    }
  ],
  mode: 'history'
})
```
Sau đó bạn sẽ phải tạo các `<router-link/>` để điều hướng chúng.
Bạn có thể tham khảo bài viết về Vue-router của mình [ở đây](https://viblo.asia/p/lam-quen-voi-vue-router-oOVlY1xol8W).
Tuy nhiên với Nuxt.js thì mọi chuyện đã khác hoàn toàn. <br>
Cùng thử tạo một số ví dụ cơ bản nhé các bạn.
```javascript
pages
--| index.vue
--| username
----|index.vue
----|age.vue
--| _fruit/
----| index.vue
```
`pages/index.vue`:
```javascript
<template>
    <h2>Đây là page {{ $route.params.fruit }} </h2>
</template>
```
`pages/username/index.vue`:
```javascript
<template>
    <h2>This is page username</h2>
</template>
```
`pages/username/age.vue`:
```javascript
<template>
    <h2>This is page username/age</h2>
</template>
```
`pages/_fruit/index.vue`:
```javascript
<template>
    <h2>Đây là page {{ $route.params.fruit }} </h2>
</template>
```
Thì nó sẽ được tự động generate như sau:
```javascript
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'username',
      path: '/username',
      component: 'pages/username/index.vue'
    },
    {
      name: 'username',
      path: '/username/age',
      component: 'pages/username/age.vue'
    },
    {
      name: 'fruit',
      path: '/fruit',
      component: 'pages/_fruit/index.vue' //ở đây fruit là params
    }
  ]
}
```
Chính xác là Nuxt.js đã tự động mapping router với từng file trong thư mục pages. <br>
Các bạn chỉ cần mở trình duyệt lên và truy cập theo từng địa chỉ như trên. Mọi thứ thật nhanh chóng phải không!

Có nhiều loại route khác nhau như Basic route, dynamic route, nested route, dynamic nested route. Các bạn có thể tham khảo thêm tại [đây](https://nuxtjs.org/guide/routing).

#### Method AsyncData và fetch
Với Nuxt.js, bạn có thể lấy dữ liệu từ server trước khi xử lý chúng trong các component. Nuxt.js hỗ trợ method `asyncData` để làm điều này. Giả sử bạn muốn lấy dữ liệu từ các 10 bài post trên viblo.
Việc sử dụng khá đơn giản như sau: 
```javascript
export default {
  async asyncData ({ params }) {
    let response = await axios.get('https://viblo.asia/api/posts?limit=10')
    return { posts: response.data }
  }
}
```
Một method khác mình đề cập đến  ở đây đó là `fetch`. Khác với `asyncData` được dùng để làm việc trực tiếp với component, method `fetch` được xử lý để làm việc với `store`.

Trên mỗi method, chúng ta có các loại context khác nhau, các bạn có thể tham khảo tại [đây](https://nuxtjs.org/api/context).
#### Import dependencies
Giả sử mình muốn install `axios`. <br>
Cài đặt:
```shell
npm install axios --save
```
Tiếp đó trong mỗi một page, mình có thể import vào như bình thường. Tuy nhiên, việc này không được khuyến khích, thay vì thế bạn nên import một lần duy nhất bằng cách thêm vào file `nuxt.config.js` như sau:
```javascript
build: {
    vendor: ['axios'],
    ...
    ...
    }
```
#### Source code
Mình có làm một ví dụ cơ bản với Nuxt.js. Các bạn có thể tham khảo tại
[Link Github](https://github.com/vunguyen10111995/nuxtjs-viblo).
## Lời kết
Các bạn nếu có thời gian hãy thử tìm hiểu về Nuxt.js. Mình nghĩ đây là một framework rất hay. Mình cũng đang tiếp tục tìm hiểu nó nên nếu bài chia sẻ của mình có gì chưa đúng, mình hi vọng nhận được sự góp ý của mọi người. Mọi người có thể tìm đọc chi tiết hơn tại [trang chủ của nuxtjs](https://nuxtjs.org) . Tạm biệt!